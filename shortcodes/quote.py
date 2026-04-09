import re

def apply(html):
    # Quote shortcode
    # {{ quote text="..." }}
    return re.sub(r"\{\{\s*quote text=\"(.*?)\"\s*\}\}",
                  r'<div class="quotes">\1</div>',
                  html)
