import re
import html

'''
voorbeeld:
{{ button text="Lees meer" url="/about/" }}

voorbeeld met stijl:
{{ button text="Download" url="/files/app.zip" style="primary" }}
'''

def apply(html_text):
    # herkent:

    # {{ button text="..." url="..." style="..." }}

    pattern = re.compile(
        r'\{\{\s*button\s+text="(.*?)"\s+url="(.*?)"(?:\s+style="(.*?)")?\s*\}\}'
    )

    def replacer(match):
        text = html.escape(match.group(1))
        url = html.escape(match.group(2))
        style = match.group(3) or "default"
        style = html.escape(style)

        return (
            f'<a href="{url}" class="btn btn-{style}">{text}</a>'
        )
    
    return pattern.sub(replacer, html_text)
