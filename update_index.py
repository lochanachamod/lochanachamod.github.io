import re

with open('E:/My profiles/my-portfolio/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Corestream
text = text.replace(
    '<p class="flagship-desc">Distributed event-streaming engine focusing on low-level performance, memory-mapped I/O, zero-copy reads, and fault tolerance across nodes.</p>',
    '<p class="flagship-desc">Distributed event-streaming engine exploring low-level performance, memory-mapped I/O and fault tolerance across nodes.</p>'
)

text = text.replace('<span>Zero-Copy</span>\n', '')
text = text.replace('                        <span>Zero-Copy</span>\n', '')
text = text.replace('<span>Zero-Copy</span>', '')

# LOC-AI
text = text.replace(
    '<p class="flagship-desc">Cross-platform desktop AI coding assistant balancing cloud inference power with private local LLM inference via Ollama, secured through strict IPC sandboxing. Includes OCR and PDF context extraction.</p>',
    '<p class="flagship-desc">Cross-platform desktop AI coding assistant combining cloud inference with local Ollama inference, document-context extraction and secure IPC.</p>'
)

# How I work
text = text.replace('<p class="path-desc">Deeply grasp the problem space and business logic.</p>', '<p class="path-desc">Goals, users and constraints.</p>')
text = text.replace('<p class="path-desc">Architect the data flow, endpoints, and interface.</p>', '<p class="path-desc">UX, architecture and data.</p>')
text = text.replace('<p class="path-desc">Engineer the core systems with scalable code.</p>', '<p class="path-desc">Frontend, backend and integrations.</p>')
text = text.replace('<p class="path-desc">Test rigorously for performance and security.</p>', '<p class="path-desc">Functionality, performance, accessibility and security.</p>')
text = text.replace('<p class="path-desc">Deploy, hand over and iterate on reliable software.</p>', '<p class="path-desc">Deploy, hand over and iterate.</p>')

with open('E:/My profiles/my-portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
