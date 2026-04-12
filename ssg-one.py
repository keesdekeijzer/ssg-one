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
from PIL import Image
from bs4 import BeautifulSoup

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
    # print("apply_shortcodes: ",shortcode_modules)
    for mod in shortcode_modules:
        # print("apply shortcodes: ",mod)
        if hasattr(mod, "apply"):
            html = mod.apply(html)
    return html

# thumbnails generen

def create_thumbnail(input_path, output_base, width=400):
    img = Image.open(input_path)
    ratio = width / img.width
    height = int(img.height * ratio)
    img = img.resize((width, height), Image.LANCZOS)

    # jpg-versie
    jpg_path = output_base + ".jpg"
    os.makedirs(os.path.dirname(jpg_path), exist_ok=True)
    img.save(jpg_path, optimize=True, quality=85)

    # WebP-versie
    webp_path = output_base + ".webp"
    img.save(webp_path, format="WEBP", quality=80)

    return jpg_path, webp_path

# responsive images

def create_responsive_images(input_path, output_base, sizes):
    # print("input_path: ", input_path)
    img = Image.open(input_path)

    results = {}

    for label, width in sizes.items():
        ratio = width / img.width
        height = int(img.height * ratio)
        resized = img.resize((width, height), Image.LANCZOS)

        # jpg

        jpg_path = f"{output_base}-{label}.jpg"
        os.makedirs(os.path.dirname(jpg_path), exist_ok=True)
        resized.save(jpg_path, optimize=True, quality=85)

        # WebP

        webp_path = f"{output_base}-{label}.webp"
        resized.save(webp_path, format="WEBP", quality=80)

        results[label] = {
            "jpg": jpg_path,
            "webp": webp_path
        }

    return results

def process_gallery_images(html, post_slug):
    soup = BeautifulSoup(html, "html.parser")

    gallery_items = soup.select(".gallery-item")

    for i, item in enumerate(gallery_items):
        filename = item["data-image"]
        input_path = os.path.join(STATIC_DIR, filename)

        output_base = os.path.join(
            OUTPUT_DIR, "static/gallery", f"{post_slug}-{i}"
        )

        sizes = {
            "small": 300,
            "medium": 600,
            "large": 1200
        }

        generated = create_responsive_images(input_path, output_base, sizes)

        # HTML vervangen door <picture>

        # in de onderstaande paden moet 'output/' verwijderd worden omdat de uiteindelijke URL anders is dan het pad op schijf

        src10 = f"/{generated['small']['webp']}".replace("output/", "")
        src11 = f"/{generated['medium']['webp']}".replace("output/", "")
        src12 = f"/{generated['large']['webp']}".replace("output/", "")

        src20 = f"/{generated['small']['jpg']}".replace("output/", "")
        src21 = f"/{generated['medium']['jpg']}".replace("output/", "")
        src22 = f"/{generated['large']['jpg']}".replace("output/", "")

        src3 = f"/{generated['medium']['jpg']}".replace("output/", "")


        picture_html = f"""
<picture>
    <source type="image/webp"
        srcset="{src10} 300w,
                {src11} 600w,
                {src12} 1200w"
        sizes="(max-width: 600px) 100vw, 300px">

    <source type="image/jpeg"
        srcset="{src20} 300w,
                {src21} 600w,
                {src22} 1200w"
        sizes="(max-width: 600px) 100vw, 300px">

    <img src="{src3}" loading="lazy" alt="">
</picture>
"""
        
        item.replace_with(BeautifulSoup(picture_html, "html.parser"))

    return str(soup)


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

        post['slug'] = slug

        date = datetime.fromisoformat(str(post.get('date')))

        # hero = metadata.get("hero")
        hero = post.get("hero")
        if not hero :
            hero = "images/posts/default.jpg"

        post["hero"] = hero

        if hero:
            #print("post", slug)
            # Pad naar originele afbeelding
            input_path = os.path.join(STATIC_DIR, hero.lstrip("/"))
            #print("STATIC_DIR", STATIC_DIR)
            #print("hero.lstrip(/)", hero.lstrip("/"))


            # Pad naar thumbnail

            output_base = os.path.join(OUTPUT_DIR, "static/thumbs", post["slug"])

            sizes = {
                "small": 300,
                "medium": 600,
                "large": 1200
            }

            generated = create_responsive_images(input_path, output_base, sizes)

            post["images"] = {
                size: {
                    "jpg": "/static/thumbs/" + post["slug"] + f"-{size}.jpg",
                    "webp": "/static/thumbs/" + post["slug"] + f"-{size}.webp"
                }
                for size in generated
            }

        #print("post:", post["slug"], "images:", post["images"] if "images" in post else "geen images")




        posts.append({
            'title': post.get('title'),
            'date': date,
            'slug': slug,
            'html': html,
            'tags': post.get('tags', [],),
            'hero': post.get('hero'),
            'images': post.get('images', {}),
            'draft': post.get('draft', False),
            'publish_date': post.get('publish_date'),
            'summary': post.get('summary', "")
        })

        # post["hero"] = metadata.get("hero", "/static/images/default.jpg")

    

    # Sorteer op datum (nieuwste eerst)
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts


def render_post(post):
    template = env.get_template('post.html')
    # print("post:", post)

    hero = post.get("hero")
    if hero:
        post["html"] = process_gallery_images(post["html"], post["slug"])
        #print("hero:", hero)
    else:
        #print("geen hero voor post:", post["slug"])
        hero = '/static/images/default.jpg'

    html = template.render(title=post['title'], site=CONFIG['site'], menu=CONFIG['menu'],
                            menu_footer=CONFIG['menu_footer'],
                           content=post['html'], 
                           date=post['date'].strftime('%Y-%m-%d'), tags=post["tags"], post=post, hero=hero)
    
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
        #print("page:",i)
        html = template.render(posts=page_posts, 
                               page=i, 
                               total_pages=len(pages),
                               site=CONFIG['site'], 
                               menu=CONFIG['menu'], 
                               menu_footer=CONFIG['menu_footer'],
                               title=f"Blog - Pagina {i}",
                               )

        write_file(os.path.join(out_dir, 'index.html'), html)


def render_blog(posts):

    template = env.get_template('blog.html')
    per_page = CONFIG['blog']['index_limit']
    pages = paginate(posts, per_page)

    for i, page_posts in enumerate(pages, start=1):
        if i == 1:
            out_dir = OUTPUT_DIR + "/blog"
        else:
            pattern = CONFIG['blog']['pagination_url']

            out_dir = os.path.join(OUTPUT_DIR, pattern.format(num=i))
        #print("page:",i)
        html = template.render(posts=page_posts, 
                               page=i, 
                               total_pages=len(pages),
                               site=CONFIG['site'], 
                               menu=CONFIG['menu'], 
                               menu_footer=CONFIG['menu_footer'],
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
                               menu_footer=CONFIG['menu_footer'],
                               title=f"Posts tagged '{tag}'")
        write_file(os.path.join(out_dir, 'index.html'), html)


def render_pages(SHORTCODES):
    template = env.get_template('page.html')

    for filename in os.listdir(PAGES_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(PAGES_DIR, filename)
        page = frontmatter.load(path)

        # page_data["hero"] = page.get("hero", None)

        html_content = markdown.markdown(page.content)
        html_content = apply_shortcodes(html_content, SHORTCODES)

        rendered = template.render(title=page.get('title'), content=html_content, site=CONFIG['site'], menu=CONFIG['menu'],
                                   menu_footer=CONFIG['menu_footer'], page=page)

        slug = filename.replace('.md', '')

        out_dir = os.path.join(OUTPUT_DIR, slug)
        write_file(os.path.join(out_dir, 'index.html'), rendered)

def render_search_index(posts):
    items = []
    words_index = {}

    # posts

    for post in posts:
        items.append({
            "title": post["title"],
            "url": f"/posts/{post['slug']}/",
            "content": post["html"],
            "tags": post.get("tags", []),
            "date": post["date"].isoformat(),
            "summary": post.get("summary", ""),
            "hero": post.get("hero")
        })


        title_words = post["title"].split()
        content_words = re.findall(r'\w+', BeautifulSoup(post["html"], "html.parser").get_text())
        summary_words = post.get("summary", "").split()
        for word in title_words:
            word = word.lower()
            combo = (post["slug"], word)
            if combo in words_index:
                words_index[combo] = words_index[combo] +3
            else:
                words_index[combo] = 3
        for word in summary_words:
            word = word.lower()
            combo = (post["slug"], word)
            if combo in words_index:
                words_index[combo] = words_index[combo] + 2
            else:
                words_index[combo] = 2
        for word in content_words:
            word = word.lower()
            combo = (post["slug"], word)
            if combo in words_index:
                words_index[combo] = words_index[combo] + 1
            else:
                words_index[combo] = 1

    
    #for _, __ in words_index.items():
        #print("\n woorden in index:", _, __)


    # pages

    for filename in os.listdir(PAGES_DIR):
        if filename.endswith(".md"):
            path = os.path.join(PAGES_DIR, filename)
            page = frontmatter.load(path)
            slug = filename.replace(".md", "")
            html = markdown.markdown(page.content)

            items.append({
                "title": page.get("title"),
                "url": f"/{slug}/",
                "content": html,
                "tags": page.get("tags", []),
                "summary": page.get("summary", "")
            })

    write_file(os.path.join(OUTPUT_DIR, "search.json"), json.dumps(items))

    return words_index


def create_search_js(words_index):
    search_js ="""
document.getElementById("searchForm").addEventListener("submit", search);
function search() {var terms = new Array();
var pages = new Array();
var notfoundtext = "No results found";
var foundtext = "Resultaten:";
"""
    pages_set = set(slug for slug, _ in words_index.keys())
    pages_numbered = {slug: i for i, slug in enumerate(pages_set)}
    #print("\n\npages in search index:", pages_set)
    #print("\n\npages numbered:", pages_numbered)
    term_nr = 0
    for pagina_woord, aantal in words_index.items(): # (pagina, woord) aantal
        term_nr += 1
        slug, woord = pagina_woord
        page_num = pages_numbered[slug]
        #print(f"\npagina: {slug} (page num: {page_num}), woord: {woord}, aantal: {aantal}")
        regel = (f"terms[{term_nr}] = new Array();terms[{term_nr}]['word'] = '{woord}';terms[{term_nr}]['count'] = {aantal};terms[{term_nr}]['page'] = '{page_num}';")
        #print(regel)
        search_js += regel + "\n"
    for slug, page_num in pages_numbered.items():
        #print(f"pages[{page_num}] = '{slug}';")
        regel = (f"pages[{page_num}] = new Array();pages[{page_num}]['page'] = '/posts/{slug}/';pages[{page_num}]['title'] = '{slug}';")
        #print(regel)
        search_js += regel + "\n"

    search_js += """

        var input = document.getElementById('searchbar').value.toLowerCase();
        const input_array = input.split(" ");
        var number_of_search_items = input_array.length;
        var item=0;
        var i=0;
        var list="";
        var pos=-1;
        var max = terms.length;
        var results = new Array();
        var number_of_results=0;
        var final_results = new Array();
        var page_titles = new Array();
        event.preventDefault();
        for(item=0; item<number_of_search_items; item++){
            if(input_array[item]!="") {
                for(i=1; i<max; i++) { 
                    if(input_array[item]==terms[i]['word']){
                        number_of_results +=1;
                        if (!final_results[terms[i]['page']]){
                            final_results[terms[i]['page']] = 0
                        }
                        final_results[terms[i]['page']] = final_results[terms[i]['page']] + terms[i]['count']
                        results[terms[i]['page']] = terms[i]['count']
                        page_titles[terms[i]['page']] = pages[terms[i]['page']]['title'];
                    }   
                    pos=-1;
                }
            }
        }
        // determine highest score
        var highest = 0;
        for (var k in final_results){
            if (final_results.hasOwnProperty(k)) {
                 if (final_results[k] > highest) {
                    highest = final_results[k];
                 }
            }
        }
       
        list = ""
        for (i=highest; i>0; i--) {
            for (var k in final_results){
                if (final_results.hasOwnProperty(k)) {
                    if (final_results[k] == i) {
                         list= list + '(' + final_results[k] + ') <a href="' + pages[k]['page'] + '">'+ page_titles[k] + '</a><br>' + '<br>';
                    }
                 }
            }
        }
        if(list==""){ 
            document.getElementById("listing").innerHTML = "<span class='red_msg'>" + notfoundtext + "</span>";
            document.getElementById("listing").style.display = "block";
        } else { 
            results = '<h2>' + foundtext + '</h2>' + list;
            document.getElementById("listing").innerHTML = results;
            document.getElementById("listing").style.display = "block";
        }
    }
    """    
    # Schrijf de gegenereerde JavaScript naar een bestand
    out_dir = os.path.join(OUTPUT_DIR, "search")
    ensure_dir(out_dir)

    write_file(os.path.join(out_dir, "search.js"), search_js)


def render_search(words_index):
    template = env.get_template("search.html")
    html = template.render(site=CONFIG['site'], menu=CONFIG['menu'], menu_footer=CONFIG['menu_footer'], 
                           title="Search", words_index=words_index)
    out_dir = os.path.join(OUTPUT_DIR, "search")
    write_file(os.path.join(out_dir, "index.html"), html)


def build():
    SHORTCODES = load_shortcodes()
    # print(SHORTCODES)
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
    render_blog(posts)
    render_tags(posts)
    render_pages(SHORTCODES)
    render_rss(posts)
    render_sitemap(posts)
    words_index = render_search_index(posts)
    render_search(words_index)
    create_search_js(words_index)

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

