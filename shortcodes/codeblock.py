import re
import html

'''
voorbeeld:
{{ code lang="python" }}
def hello():
    print("Hallo Wereld!")
{{ endcode }}
'''

def apply(html_text):
    # Regex voor multiline shortcode:

    # {{ code lang="python" }} ... {{ endcode }}

    pattern = re.compile(
        r"\{\{\s*code(?:\s+lang=\"(.*?)\")?\s*\}\}(.*?)\{\{\s*endcode\s*\}\}",
        re.DOTALL
    )

    def replacer(match):
        lang = match.group(1) or ""  # taal kan ontbreken

        code = match.group(2).strip("\n")
        escaped = html.escape(code)

        # HTML-output

        return (
            f'<pre class="code-block"><code class="{lang}">'
            f'{escaped}'
            f'</code></pre>'
        )
    
    return pattern.sub(replacer, html_text)

