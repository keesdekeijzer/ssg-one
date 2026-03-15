import os
import shutil
from jinja2 import Environment, FileSystemLoader
import markdown
import frontmatter

CONTENT_DIR = 'content'
OUTPUT_DIR = 'output'
TEMPLATE_DIR = 'templates'
STATIC_DIR = 'static'

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

def build():
    # Clean output directory

    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR)

    # Kopieer statische bestanden
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'static')):
        os.makedirs(os.path.join(OUTPUT_DIR, 'static'))

    shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, 'static'), dirs_exist_ok=True)

    # Verwerk markdown bestanden

    for filename in os.listdir(CONTENT_DIR):
        if not filename.endswith('.md'):
            continue

        path = os.path.join(CONTENT_DIR, filename)
        post = frontmatter.load(path)

        html_content = markdown.markdown(post.content)
        template = env.get_template('page.html')

        rendered = template.render(title=post.get('title', 'Untitled'), content=html_content)

        # Schrijf output naar bestand

        name = filename.replace(".md", "")
        out_dir = os.path.join(OUTPUT_DIR, name)
        os.makedirs(out_dir, exist_ok=True)

        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(rendered)

    print("Site gegenereerd in de map 'output'.")

if __name__ == "__main__":
    build()

