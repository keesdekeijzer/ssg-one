import os
from pydoc import html
import shutil
from jinja2 import Environment, FileSystemLoader
import markdown
import frontmatter
from datetime import datetime
from livereload import Server
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import yaml


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

# helper functies

def ensure_dir(path):
    print(f"Zorg dat map bestaat: {path}")
    if not os.path.exists(path):
        os.makedirs(path)

def write_file(path, content):
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Laad alle posts en sorteer ze op datum

def load_posts():
    posts = []
    for filename in os.listdir(POSTS_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(POSTS_DIR, filename)
        post = frontmatter.load(path)

        html = markdown.markdown(post.content)
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
    limit = CONFIG["blog"]["index_limit"]
    html = template.render(posts=posts[:limit], site=CONFIG['site'], menu=CONFIG['menu'])

    write_file(os.path.join(OUTPUT_DIR, 'index.html'), html)


def render_tags(posts):
    tags = {}
    for post in posts:
        for tag in post['tags']:
            tags.setdefault(tag, []).append(post)

    template = env.get_template('index.html')

    for tag, tag_posts in tags.items():

        tag_pattern = CONFIG['blog']['tag_url']
        out_dir = os.path.join(OUTPUT_DIR, tag_pattern.format(tag=tag))
        

        html = template.render(posts=tag_posts, site=CONFIG['site'], menu=CONFIG['menu'], title=f"Posts tagged '{tag}'")
        write_file(os.path.join(out_dir, 'index.html'), html)


def render_pages():
    template = env.get_template('page.html')

    for filename in os.listdir(PAGES_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(PAGES_DIR, filename)
        page = frontmatter.load(path)

        html_content = markdown.markdown(page.content)

        rendered = template.render(title=page.get('title'), content=html_content, site=CONFIG['site'], menu=CONFIG['menu'])

        slug = filename.replace('.md', '')

        out_dir = os.path.join(OUTPUT_DIR, slug)
        write_file(os.path.join(out_dir, 'index.html'), rendered)


def build():
    # Clean output directory

    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    ensure_dir(OUTPUT_DIR)

    # Kopieer statische bestanden
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'static')):
        os.makedirs(os.path.join(OUTPUT_DIR, 'static'))

    shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, 'static'), dirs_exist_ok=True)

    posts = load_posts()
    for post in posts:
        render_post(post)
    
    render_index(posts)
    render_tags(posts)
    render_pages()

    print("Site gegenereerd in de map 'output'.")


def serve():
    build()
    server = Server()
    server.watch(CONTENT_DIR, build)
    server.watch(TEMPLATE_DIR, build)
    server.watch(STATIC_DIR, build)

    print("Ontwikkelserver gestart op http://localhost:5500")
    server.serve(root=OUTPUT_DIR, port=5500)


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

