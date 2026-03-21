import os
from pydoc import html
import re
import shutil
from tempfile import template
from jinja2 import Environment, FileSystemLoader
import markdown
import frontmatter
from datetime import datetime
from livereload import Server
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import yaml
import hashlib
import json
import importlib.util


# Laad configuratie

with open('config.yaml', 'r', encoding='utf-8') as f:
    CONFIG = yaml.safe_load(f)

'''
CONFIG["site"]["title"]
CONFIG["paths"]["posts"]
CONFIG["blog"]["post_url"]
'''



CONTENT_DIR = CONFIG['paths']['content']
OUTPUT_DIR = CONFIG['paths']['output']
TEMPLATE_DIR = CONFIG['paths']['templates']
STATIC_DIR = CONFIG['paths']['static']
POSTS_DIR = CONFIG['paths']['posts']
PAGES_DIR = CONFIG  ['paths']['pages']

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

SHORTCODES = []

# helper functies

def ensure_dir(path):
    print(f"Zorg dat map bestaat: {path}")
    if not os.path.exists(path):
        os.makedirs(path)

def write_file(path, content):
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# paginatie

def paginate(items, per_page):
    pages = []
    for i in range(0, len(items), per_page):
        pages.append(items[i:i + per_page])
    return pages


# shortcodes

def load_shortcodes():
    modules = []
    folder = "shortcodes"

    for filename in os.listdir(folder):
        if filename.endswith(".py"):
            path = os.path.join(folder, filename)
            spec = importlib.util.spec_from_file_location(filename, path)
            mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(mod)
            modules.append(mod)

    return modules

def apply_shortcodes(html, shortcode_modules):
    print("apply_shortcodes: ",shortcode_modules)
    for mod in shortcode_modules:
        print("apply shortcodes: ",mod)
        if hasattr(mod, "apply"):
            html = mod.apply(html)
    return html



# Laad alle posts en sorteer ze op datum

def load_posts(SHORTCODES):
    posts = []
    for filename in os.listdir(POSTS_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(POSTS_DIR, filename)
        post = frontmatter.load(path)

        html = markdown.markdown(post.content)
        html = apply_shortcodes(html, SHORTCODES)
        slug = filename.replace('.md', '')

        date = datetime.fromisoformat(str(post.get('date')))

        posts.append({
            'title': post.get('title'),
            'date': date,
            'slug': slug,
            'html': html,
            'tags': post.get('tags', [])
        })

    

    # Sorteer op datum (nieuwste eerst)
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts


def render_post(post):
    template = env.get_template('post.html')
    html = template.render(title=post['title'], site=CONFIG['site'], menu=CONFIG['menu'],
                           content=post['html'], 
                           date=post['date'].strftime('%Y-%m-%d'), tags=post["tags"])
    
    url_pattern = CONFIG['blog']['post_url']
    out_dir = os.path.join(OUTPUT_DIR, url_pattern.format(slug=post["slug"]))
    write_file(os.path.join(out_dir, 'index.html'), html)


def render_index(posts):

    template = env.get_template('index.html')
    per_page = CONFIG['blog']['index_limit']
    pages = paginate(posts, per_page)

    for i, page_posts in enumerate(pages, start=1):
        if i == 1:
            out_dir = OUTPUT_DIR
        else:
            pattern = CONFIG['blog']['pagination_url']

            out_dir = os.path.join(OUTPUT_DIR, pattern.format(num=i))
        print("page:",i)
        html = template.render(posts=page_posts, 
                               page=i, 
                               total_pages=len(pages),
                               site=CONFIG['site'], 
                               menu=CONFIG['menu'], 
                               title=f"Blog - Pagina {i}",
                               )

        write_file(os.path.join(out_dir, 'index.html'), html)


def render_tags(posts):
    tags = {}
    for post in posts:
        for tag in post['tags']:
            tags.setdefault(tag, []).append(post)

    template = env.get_template('tags.html')

    for tag, tag_posts in tags.items():

        tag_pattern = CONFIG['blog']['tag_url']
        out_dir = os.path.join(OUTPUT_DIR, tag_pattern.format(tag=tag))
        

        html = template.render(posts=tag_posts, site=CONFIG['site'], menu=CONFIG['menu'], 
                               title=f"Posts tagged '{tag}'")
        write_file(os.path.join(out_dir, 'index.html'), html)


def render_pages(SHORTCODES):
    template = env.get_template('page.html')

    for filename in os.listdir(PAGES_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(PAGES_DIR, filename)
        page = frontmatter.load(path)

        html_content = markdown.markdown(page.content)
        html_content = apply_shortcodes(html_content, SHORTCODES)

        rendered = template.render(title=page.get('title'), content=html_content, site=CONFIG['site'], menu=CONFIG['menu'])

        slug = filename.replace('.md', '')

        out_dir = os.path.join(OUTPUT_DIR, slug)
        write_file(os.path.join(out_dir, 'index.html'), rendered)


def build():
    SHORTCODES = load_shortcodes()
    print(SHORTCODES)
    plugins = load_plugins()
    for plugin in plugins:
        plugin.run({"posts": posts, "config": CONFIG, "output": OUTPUT_DIR})

    # Clean output directory

    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    ensure_dir(OUTPUT_DIR)

    # Kopieer statische bestanden
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'static')):
        os.makedirs(os.path.join(OUTPUT_DIR, 'static'))

    shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, 'static'), dirs_exist_ok=True)

    posts = load_posts(SHORTCODES)
    for post in posts:
        render_post(post)
    
    render_index(posts)
    render_tags(posts)
    render_pages(SHORTCODES)
    render_rss(posts)
    render_sitemap(posts)

    print("Site gegenereerd in de map 'output'.")


def serve():
    build()
    server = Server()
    server.watch(CONTENT_DIR, build)
    server.watch(TEMPLATE_DIR, build)
    server.watch(STATIC_DIR, build)

    print("Ontwikkelserver gestart op http://localhost:5500")
    server.serve(root=OUTPUT_DIR, port=5500)




# sitemap

def render_sitemap(posts):
    base = CONFIG['site']['base_url'].rstrip('/')
    urls = set()

    # homepage

    urls.add('/')

    # paginatie

    per_page = CONFIG['blog']['index_limit']
    total_pages = (len(posts) + per_page - 1) // per_page

    for i in range(1, total_pages + 1):
        if i == 1:
            urls.add('/')
        else:
            pattern = CONFIG['blog']['pagination_url']
            urls.add("/" + pattern.format(num=i))

    # posts

    for post in posts:
        pattern = CONFIG['blog']['post_url']
        urls.add("/" + pattern.format(slug=post['slug']))

    # tags

    all_tags = set(tag for post in posts for tag in post['tags'])
    for tag in all_tags:
        pattern = CONFIG['blog']['tag_url']
        urls.add("/" + pattern.format(tag=tag))

    # pages

    for filename in os.listdir(PAGES_DIR):
        if not filename.endswith('.md'):
            continue
        slug = filename.replace('.md', '')
        urls.add(f"/{slug}/")

    # genereer XML

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for url in sorted(urls):
        xml += f"<url><loc>{base}{url}</loc></url>\n"
    xml += "</urlset>"

    write_file(os.path.join(OUTPUT_DIR, 'sitemap.xml'), xml)


# rss feed

def render_rss(posts):
    # base = CONFIG['site']['base_url']

    items = ""
    for post in posts[:10]:  # Laatste 10 posts
        items += f"""
        <item>
            <title>{post['title']}</title>
            <link>{CONFIG['site']['base_url']}/posts/{post['slug']}/</link>
            <pubDate>{post['date'].strftime('%a, %d %b %Y %H:%M:%S +0000')}</pubDate>
            <description><![CDATA[{post['html']}]]></description>
        </item>
        """

    rss = f"""<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
        <title>{CONFIG['site']['title']}</title>
        <link>{CONFIG['site']['base_url']}</link>
        <description>{CONFIG['site']['description']}</description>
        {items}
    </channel>
    </rss>"""

    write_file(os.path.join(OUTPUT_DIR, 'feed.xml'), rss)



# caching

def file_hash(path):
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()
    
def load_cache():
    if os.path.exists('.cache.json'):
        return json.load(open('.cache.json'))
    return {}

def save_cache(cache):
    json.dump(cache, open('.cache.json', 'w'))

def should_render(path, cache):
    h = file_hash(path)
    if cache.get(path) != h:
        cache[path] = h
        return True
    return False

# plugins

def load_plugins():
    plugins = []
    for filename in os.listdir('plugins'):
        if filename.endswith('.py'):
            spec = importlib.util.spec_from_file_location(filename[:-3], os.path.join('plugins', filename))
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            plugins.append(module)
    return plugins


class RebuildHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return
        print(f"Bestand gewijzigd: {event.src_path}. Site opnieuw genereren...")
        build()


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'serve':
        serve()
    else:
        build()

