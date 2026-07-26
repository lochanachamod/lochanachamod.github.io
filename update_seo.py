import re

with open('e:/My profiles/my-portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

head_content = '''    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lochana Chamod — Software Developer | Full-Stack & Backend Engineering</title>
    <meta name="description" content="Lochana Chamod is a Software Developer at Eternal Hosting building modern web platforms, full-stack products and backend systems. Explore selected work across product engineering, distributed systems, AI and security.">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0a0a0a">
    
    <link rel="canonical" href="https://lochanachamod.github.io/">
    
    <!-- Open Graph -->
    <meta property="og:type" content="profile">
    <meta property="og:url" content="https://lochanachamod.github.io/">
    <meta property="og:title" content="Lochana Chamod — Software Developer">
    <meta property="og:description" content="Software Developer at Eternal Hosting building modern web platforms, full-stack products and backend systems.">
    <meta property="og:image" content="https://lochanachamod.github.io/assets/images/og-lochana-chamod.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Lochana Chamod — Software Developer">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Lochana Chamod — Software Developer">
    <meta name="twitter:description" content="Software Developer at Eternal Hosting building modern web platforms, full-stack products and backend systems.">
    <meta name="twitter:image" content="https://lochanachamod.github.io/assets/images/og-lochana-chamod.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    
    <!-- Preloads -->
    <link rel="preload" href="assets/images/dot-me.png" as="image">
    <link rel="preload" href="assets/images/profile.png" as="image">
        
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="assets/css/hero-identity.css">

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://lochanachamod.github.io/#profile",
      "url": "https://lochanachamod.github.io/",
      "name": "Lochana Chamod — Software Developer",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://lochanachamod.github.io/#person",
        "name": "Lochana Chamod",
        "url": "https://lochanachamod.github.io/",
        "image": "https://lochanachamod.github.io/assets/images/profile.png",
        "jobTitle": "Software Developer",
        "description": "Software Developer focused on full-stack engineering, web platforms and backend systems.",
        "worksFor": {
          "@type": "Organization",
          "name": "Eternal Hosting",
          "url": "https://eternalhosting.cloud/"
        },
        "sameAs": [
          "https://www.linkedin.com/in/lochana-chamod",
          "https://github.com/lochanachamod"
        ],
        "knowsAbout": [
          "Full-Stack Engineering",
          "Web Platforms",
          "Backend Systems",
          "Distributed Systems",
          "Software Engineering"
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://lochanachamod.github.io/#website",
      "url": "https://lochanachamod.github.io/",
      "name": "Lochana Chamod",
      "description": "Portfolio of Lochana Chamod, Software Developer.",
      "inLanguage": "en"
    }
    </script>
</head>'''

html = re.sub(r'<head>.*?</head>', '<head>\n' + head_content, html, flags=re.DOTALL)

with open('e:/My profiles/my-portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
