import re

with open('e:/My profiles/my-portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove debug scripts
html = re.sub(r'<script>\s*window\.onerror.*?<\/script>', '', html, flags=re.DOTALL)
html = re.sub(r'<script>\s*window\.onload.*?<\/script>', '', html, flags=re.DOTALL)

# How I work
html = html.replace('Business goals, user constraints and technical requirements.', 'Goals, users and constraints.')
html = html.replace('System architecture, data flow and UX patterns.', 'UX, architecture and data.')
html = html.replace('Scalable backend logic and responsive frontend interfaces.', 'Frontend, backend and integrations.')
html = html.replace('Testing functionality, performance, accessibility and security.', 'Functionality, performance, accessibility and security.')
html = html.replace('CI/CD deployment, hand over and continuous iteration.', 'Deploy, hand over and iterate.')

# Beyond the browser
html = html.replace('Developing native-feeling desktop applications with deep OS integration, local LLM execution, and cross-platform IPC.', 'Building cross-platform desktop AI applications with secure IPC, document-context extraction, and local/cloud inference.')
html = html.replace('Building performant mobile applications with robust offline capabilities, cloud synchronization, and responsive material interfaces.', 'Building native Android applications with cloud synchronisation, API integrations and responsive Material interfaces.')

# Tabindex
html = html.replace('class=\"tab-btn active\" data-target=\"desktop\"', 'class=\"tab-btn active\" data-target=\"desktop\" tabindex=\"0\"')
html = html.replace('class=\"tab-btn\" data-target=\"mobile\"', 'class=\"tab-btn\" data-target=\"mobile\" tabindex=\"-1\"')

with open('e:/My profiles/my-portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
