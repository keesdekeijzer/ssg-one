import re

def apply(html):
    # Waarschuwing shortcode
    # {{ warning text="..." }}
    return re.sub(r"\{\{\s*warning text=\"(.*?)\"\s*\}\}",
                  r'<div class="warning">\1</div>',
                  html)
