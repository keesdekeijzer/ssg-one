import re

def apply(html):
    # Voorbeeld: {{ youtube(id="abc123") }}
    # Vervang dit door de juiste embed code
    return re.sub(
        r'\{\{\s*youtube\(id="([^"]+)"\)\s*\}\}', 
        r'<div class="youtube-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/\1" frameborder="0" allowfullscreen></iframe></div>', 
        html
    )