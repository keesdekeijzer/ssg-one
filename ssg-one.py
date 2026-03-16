import os
from pydoc import html
import shutil
from jinja2 import Environment, FileSystemLoader
import markdown
import frontmatter
from datetime import datetime

CONTENT_DIR = 'content'
OUTPUT_DIR = 'output'
TEMPLATE_DIR = 'templates'
STATIC_DIR = 'static'
POSTS_DIR = os.path.join(CONTENT_DIR, 'posts')
PAGES_DIR = os.path.join(CONTENT_DIR, 'pages')

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

def load_posts():
    posts = []
    for filename in os.listdir(POSTS_DIR):
        if not filename.endswith('.md'):
            continue

        html = markdown.markdown(post.content)
        slug = filename.replace('.md', '')
        path = os.path.join(POSTS_DIR, filename)
        post = frontmatter.load(path)

        date = datetime.fromisoformat(post.get('date'))

        posts.append({
            'title': post.get('title', 'Untitled'),
            'date': date,
            'slug': slug,
            'html': html,
            'slug': slug
        })

    

    # Sorteer op datum (nieuwste eerst)
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts


def render_post(post):
    template = env.get_template('post.html')
    html = template.render(title=post['title'], content=post['html'], 
                           date=post['date'].strftime('%Y-%m-%d'), tags=post["tags"])
    
    out_dir = os.path.join(OUTPUT_DIR, 'posts', post['slug'])
    os.makedirs(out_dir, exist_ok=True)

    with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)


def render_index(posts):
    template = env.get_template('index.html')
    html = template.render(posts=posts)

    out_dir = os.path.join(OUTPUT_DIR)
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)


def render_tags(posts):
    tags = {}
    for post in posts:
        for tag in post['tags']:
            tags.setdefault(tag, []).append(post)

    template = env.get_template('index.html')

    for tag, tag_posts in tags.items():

        out_dir = os.path.join(OUTPUT_DIR, 'tags', tag)
        os.makedirs(out_dir, exist_ok=True)

        html = template.render(posts=tag_posts)
        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)


def render_pages():
    template = env.get_template('page.html')

    for filename in os.listdir(PAGES_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(PAGES_DIR, filename)
        page = frontmatter.load(path)

        html_content = markdown.markdown(page.content)

        rendered = template.render(title=page.get('title'), content=html_content)

        slug = filename.replace('.md', '')

        out_dir = os.path.join(OUTPUT_DIR, slug)
        os.makedirs(out_dir, exist_ok=True)

        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(rendered)


def build():
    # Clean output directory

    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR)

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

if __name__ == "__main__":
    build()

