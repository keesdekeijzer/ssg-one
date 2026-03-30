import re
import html

# {{ gallery images="img1.jpg,img2.jpg,img3.jpg" }}

def apply(html_text):
    pattern = re._compile(
        r'\{\{\s*gallery\s*+images="(.*?)"\s*\}\}', re.DOTALL
    )

    def replacer(match):
        images = match.group(1).split(",")
        images = [img.strip() for img in images]

        # HTML-output: een container met data-aatributen

        # De daadwerkelijke responsive <picture> tags worden door de build gegenereerd

        items = "".join(
            f'\n<div class="gallery-item" data-image="{html.escape(img)}"></div>\n'
            for img in images
        )

        return f'\n<div class="gallery">{items}</div>\n'
    
    return pattern.sub(replacer, html_text)

