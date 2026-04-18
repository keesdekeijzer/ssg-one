---
question: Een gebruiker sudo maken
---
# Een gebruiker de mogelijkheid geven om opdrachten via sudo uit te voeren

Voorwaarde is wel dat sudo is geinstalleerd.

{{ code lang="bash" }}
\# voorbeeld voor gebruiker "kees"
usermod -aG sudo kees
{{ endcode }}
