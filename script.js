// Existing AOS code...
AOS.init({
    duration: 1200,
    once: true,
});

// NEW: Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // 1. Toggle the menu
    navLinks.classList.toggle('nav-active');

    // 2. Animate the Links (fade in one by one)
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // 3. Burger Animation (Optional: Turn lines into X)
    hamburger.classList.toggle('toggle');
});

/* --- PROJECTS INFINITE AUTO-SCROLL --- */
const projectContainer = document.getElementById('projects-container');

if (projectContainer) {
    // 1. DUPLICATE CONTENT FOR INFINITE LOOP
    // We clone the projects so the list looks infinite
    const originalContent = projectContainer.innerHTML;
    projectContainer.innerHTML += originalContent;

    let scrollSpeed = 0.5; // Adjust speed: higher = faster
    let isHovered = false;

    // 2. PAUSE LOGIC (Desktop Hover + Mobile Touch)
    const pauseScroll = () => isHovered = true;
    const resumeScroll = () => isHovered = false;

    // Desktop
    projectContainer.addEventListener('mouseenter', pauseScroll);
    projectContainer.addEventListener('mouseleave', resumeScroll);

    // Mobile (Touch)
    // We pause immediately on touch, and resume shortly after touch ends
    projectContainer.addEventListener('touchstart', pauseScroll);
    projectContainer.addEventListener('touchend', () => {
        setTimeout(resumeScroll, 2000); // Wait 2 seconds before moving again
    });

    // 3. THE ANIMATION LOOP
    function autoScrollProjects() {
        if (!isHovered) {
            // Move scrollbar
            projectContainer.scrollLeft += scrollSpeed;

            // INFINITE LOOP LOGIC:
            // If we have scrolled past half the width (the original set),
            // instantly jump back to 0. Because the content is duplicated,
            // 0 looks exactly the same as the start of the duplicate set.
            if (projectContainer.scrollLeft >= (projectContainer.scrollWidth / 2)) {
                projectContainer.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScrollProjects);
    }

    // Start the loop
    autoScrollProjects();
}

/* --- ULTIMATE INTERVIEW UPGRADES --- */

/* 1. Terminal Typing Animation */
const terminalBody = document.getElementById('terminal-body');
if (terminalBody) {
    const lines = [
        "> init lochana_profile.exe",
        "> Loading enterprise modules... [OK]",
        "> Booting AI & Data Systems... [OK]",
        "> Injecting Security Protocols... [OK]",
        "> Fetching System Architectures...",
        "> ------------------------------------",
        "> {",
        ">   \"status\": \"Engineer Ready\",",
        ">   \"focus\": [\"Full-Stack\", \"AI/Data\", \"Mobile\"]",
        "> }",
        "> ------------------------------------",
        "> System Online. Awaiting Commands_"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let terminalTriggered = false;

    function typeTerminal() {
        if (lineIndex < lines.length) {
            if (charIndex === 0) {
                terminalBody.innerHTML += '<div></div>';
            }
            
            const currentLine = lines[lineIndex];
            const divElements = terminalBody.querySelectorAll('div');
            const currentDiv = divElements[divElements.length - 1];
            
            currentDiv.innerHTML = currentLine.substring(0, charIndex + 1) + (lineIndex === lines.length -1 && charIndex === currentLine.length -1 ? '<span class="terminal-cursor"></span>' : '');
            
            charIndex++;
            if (charIndex >= currentLine.length) {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeTerminal, 400); // Wait before next line
            } else {
                setTimeout(typeTerminal, 30); // Typing speed
            }
        }
    }

    // Trigger terminal when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !terminalTriggered) {
            terminalTriggered = true;
            terminalBody.innerHTML = '';
            setTimeout(typeTerminal, 500);
        }
    }, { threshold: 0.5 });
    
    observer.observe(document.getElementById('terminal-section'));
}

/* 2. Impact Counters */
const counters = document.querySelectorAll('.counter');
let countersTriggered = false;

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersTriggered) {
            countersTriggered = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        const plus = counter.innerText.includes('+') || counter.getAttribute('data-target') === '15' || counter.getAttribute('data-target') === '2' ? '+' : '';
                        counter.innerText = Math.ceil(current) + plus;
                        requestAnimationFrame(updateCounter);
                    } else {
                        const plus = counter.getAttribute('data-target') === '15' || counter.getAttribute('data-target') === '2' ? '+' : '';
                        counter.innerText = target + plus;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    
    counterObserver.observe(document.getElementById('impact'));
}

/* 4. Deep Dive Project Modals */
const projectData = {
    "LOC-AI Assistant": {
        problem: "LOC-AI was built to solve a critical problem for modern developers: balancing the immense reasoning power of cloud-based AI with the strict privacy requirements of enterprise coding. The objective was to create a tool with a <strong>God Mode</strong> (online API) and a <strong>Bunker Mode</strong> (offline inference) for sensitive code.",
        architecture: "<ul><li>Built a production-ready, cross-platform desktop application using <strong>Electron and Node.js</strong>.</li><li>Engineered a custom Extraction Engine utilizing native OCR via <strong>Tesseract.js</strong> and PDF parsing via <strong>pdf-parse</strong>.</li><li>Implemented enterprise-grade security via strict IPC bridging and frontend sandboxing.</li></ul>",
        tech: ["Electron", "Node.js", "React", "Groq API", "Ollama", "Tesseract.js"]
    },
    "LocAI Trade Risk Monitor": {
        problem: "Smugglers evade detection by spreading illicit cargo across multiple 'Low Risk' shipments utilizing dummy 'Shell Companies'. The objective was to build a system that automatically links disparate entities based on shared attributes to reveal hidden syndicates.",
        architecture: "<ul><li>Engineered a high-performance ETL pipeline using <strong>Python and Polars</strong> to ingest raw customs declarations into a <strong>Neo4j Knowledge Graph</strong>.</li><li>Built a real-time, dark-themed command center using <strong>Streamlit</strong>.</li><li>Integrated physics-based graph visualizations via <strong>Streamlit-Agraph</strong> to track criminal connections.</li></ul>",
        tech: ["Python", "Neo4j", "Polars", "Streamlit", "NetworkX"]
    },
    "RMDB Syndicate Hunter": {
        problem: "Developed to modernize data extraction and risk profiling for the Risk Management Unit. Replaced manual reporting with an automated, near real-time intelligence platform capable of identifying anomalies and global risk concentrations.",
        architecture: "<ul><li>Engineered a highly scalable multi-threaded <strong>Java ETL pipeline</strong> syncing live ASYCUDA data from legacy Oracle/SQL servers to MySQL.</li><li>Developed a visual dashboard using <strong>Python & Streamlit</strong>.</li><li>Integrated <strong>Scikit-Learn (Isolation Forest)</strong> for AI anomaly detection and <strong>NetworkX</strong> for Entity Link Analysis.</li></ul>",
        tech: ["Java ETL", "Python", "Streamlit", "Scikit-Learn", "MySQL"]
    },
    "CusDec Document Creator": {
        problem: "Built to solve the manual, error-prone process of categorizing imported electronics and determining their correct Harmonized System (HS) Codes for Sri Lanka Customs clearance operations.",
        architecture: "<ul><li>Architected a Data Normalization Pipeline in <strong>Python/Pandas</strong> to clean raw CSV exports using complex RegEx.</li><li>Developed a dynamic <strong>React/Vite</strong> frontend to map user inputs to HS Codes automatically.</li><li>Engineered a purely client-side JavaScript XML Assembler that instantly generates valid Customs Declaration XML files.</li></ul>",
        tech: ["Python", "Pandas", "React", "Google Sheets API", "Regex"]
    },
    "RMS Simulator": {
        problem: "Provided the Risk Management Directorate with a powerful engine to simulate the statistical impact of new or modified selectivity rules before deploying them into the live ASYCUDA World production environment.",
        architecture: "<ul><li>Architected a high-throughput Java simulation engine using <strong>JDBC batch operations</strong> processing 10,000+ records per transaction.</li><li>Engineered a custom <strong>Regex-driven pseudocode parser</strong> to read textual Customs selectivity rules and evaluate complex logical constraints on the fly.</li></ul>",
        tech: ["Java", "Custom Parser", "JDBC", "MySQL", "Maven"]
    },
    "Ammehula Restaurant ERP": {
        problem: "A massive group project where I took full ownership of architecture to replace traditional, manual management workflows of a real-world client with a highly scalable, digitized, and cloud-ready software ecosystem.",
        architecture: "<ul><li>Architected an enterprise ERP featuring 6 specialized subsystems (POS, Smart Inventory, KDS, Logistics).</li><li>Frontend built with <strong>Next.js 16</strong> and React Query. Backend runs on <strong>Node.js/Express</strong> with a <strong>PostgreSQL</strong> database managed via Prisma ORM (40 models).</li><li>Implemented real-time synchronization via <strong>Socket.io</strong> and GIS routing with Leaflet/Turf.js.</li></ul>",
        tech: ["Next.js", "PostgreSQL", "Express", "Socket.io", "Prisma", "Cypress"]
    },
    "Sri Lanka Customs AEO": {
        problem: "Developed to replace the older Authorized Economic Operator (AEO) website with a faster, more interactive, content-managed, and visually polished digital platform for international businesses.",
        architecture: "<ul><li>Developed the frontend using <strong>Next.js, Tailwind CSS, and Shadcn UI</strong>.</li><li>Engineered a 3D Global Reach visualization utilizing <strong>Three.js</strong> and React Three Fiber.</li><li>Integrated <strong>Payload CMS</strong> backed by SQLite to allow authorized officers to manage content dynamically without code deployments.</li></ul>",
        tech: ["Next.js", "Payload CMS", "Three.js", "Tailwind CSS", "SQLite"]
    },
    "Clothes Manager": {
        problem: "Developed to solve a personal logistics challenge: managing a distributed wardrobe across two distinct locations. The goal was a mobile-first web app tracking clothing without relying on backend infrastructure.",
        architecture: "<ul><li>Architected a responsive SPA using <strong>React 19 and Vite</strong>.</li><li>Built a 'Travel Wizard' utilizing <strong>Zustand</strong> for lightweight, global state management.</li><li>Persisted complex inventory data directly to the browser's <strong>LocalStorage</strong> to completely eliminate database latency.</li></ul>",
        tech: ["React 19", "TypeScript", "Vite", "Zustand", "Tailwind CSS"]
    },
    "FilmFolio App": {
        problem: "Built to solve fragmented movie discovery by providing users with a single, unified mobile platform to browse trending films, watch official trailers, and curate a personal watchlist.",
        architecture: "<ul><li>Developed a fully native Android application using <strong>Java</strong>.</li><li>Engineered a dual-API integration consuming the <strong>TMDb API</strong> and <strong>YouTube Data API v3</strong> via Retrofit.</li><li>Developed a real-time cloud-synced watchlist leveraging <strong>Firebase Cloud Firestore</strong>.</li></ul>",
        tech: ["Android Java", "Firebase", "Retrofit", "TMDb API", "Glide"]
    },
    "Readify App": {
        problem: "Conceptualized to provide book enthusiasts with a seamless, mobile-first platform to discover new books, read daily motivational quotes, and manage their personal reading lists via cloud-sync.",
        architecture: "<ul><li>Native Android App built with <strong>Java</strong> and Material Design UI.</li><li>Integrated the <strong>Google Books API</strong> and ZenQuotes API via a custom Volley HTTP Singleton.</li><li>Architected a real-time cloud database using <strong>Firebase Firestore</strong> with SnapshotListeners for instant UI updates.</li></ul>",
        tech: ["Android Java", "Firebase", "Google Books API", "Volley", "Material Design"]
    },
    "Valentine Surprise": {
        problem: "The objective was to transform a traditional Valentine's Day proposal into a modern, gamified web application featuring interactive questions, physics animations, and a dynamic photo gallery.",
        architecture: "<ul><li>Engineered a single-page React 19 application built on a finite state machine.</li><li>Utilized <strong>Framer Motion</strong> for an evasive 'No' button algorithm calculating randomized X/Y escapes.</li><li>Integrated Canvas Confetti and persistent background audio with auto-play browser policy workarounds.</li></ul>",
        tech: ["React", "Framer Motion", "Tailwind CSS", "Canvas Confetti"]
    },
    "Ceylon Taste Cuisine Web": {
        problem: "A high-end restaurant chain required a dynamic, visually stunning e-commerce platform with real-time order tracking and secure payment gateways.",
        architecture: "<ul><li>Developed using React for a fast SPA experience.</li><li>Integrated Stripe for seamless online payments.</li><li>Utilized Firebase Realtime Database for live kitchen ticket tracking and order fulfillment.</li></ul>",
        tech: ["React", "Firebase", "Stripe API"]
    }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close-btn');
const projectCards = document.querySelectorAll('.project-card');
const timelineTriggers = document.querySelectorAll('.project-trigger');

if (modal) {
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalArch = document.getElementById('modal-architecture');
    const modalTech = document.getElementById('modal-tech');

    const openModal = (title) => {
        const data = projectData[title];
        if (data) {
            modalTitle.innerHTML = title;
            modalProblem.innerHTML = data.problem;
            modalArch.innerHTML = data.architecture;
            
            // Render tags
            modalTech.innerHTML = '';
            data.tech.forEach(t => {
                modalTech.innerHTML += `<span>${t}</span>`;
            });
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('.project-title');
                if (titleEl) {
                    openModal(titleEl.innerText);
                }
            });
        });
    }

    if (timelineTriggers.length > 0) {
        timelineTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const title = e.target.getAttribute('data-project');
                if (title) {
                    openModal(title);
                }
            });
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}