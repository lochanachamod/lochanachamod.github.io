import re

with open('e:/My profiles/my-portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head
head_match = re.search(r'<head>.*?</head>', html, flags=re.DOTALL)
head = head_match.group(0)

# Extract nav
header_match = re.search(r'<nav class="sticky-nav">.*?</nav>', html, flags=re.DOTALL)
header = header_match.group(0)

# Modify head for 404
head = head.replace('<title>Lochana Chamod — Software Developer | Full-Stack & Backend Engineering</title>', '<title>404 - Page Not Found | Lochana Chamod</title>')
head = re.sub(r'<script type="application/ld\+json">.*?</script>', '', head, flags=re.DOTALL)

# Build 404 body
body = f'''<body>
    {header}
    
    <main class="site-wrapper" style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
        <div style="text-align: center;">
            <h1 class="hero-statement" style="font-size: 5rem; margin-bottom: 1rem;">404</h1>
            <p style="font-size: 1.25rem; color: var(--text-light); margin-bottom: 2rem;">This route doesn\\'t exist.</p>
            <a href="/" class="primary-btn">Return to Lochana Chamod &rarr;</a>
        </div>
    </main>
</body>
</html>'''

with open('e:/My profiles/my-portfolio/404.html', 'w', encoding='utf-8') as f:
    f.write('<!DOCTYPE html>\n<html lang="en">\n' + head + '\n' + body)
