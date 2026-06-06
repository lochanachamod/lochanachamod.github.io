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
        problem: "Users needed a highly capable local AI companion running efficiently without relying entirely on expensive cloud APIs, ensuring data privacy and fast responses.",
        architecture: "Built an Electron Desktop App utilizing React and Node.js. Integrated local LLM capabilities via Llama.cpp and ONNX Runtime for CPU/GPU acceleration.",
        tech: ["Electron", "React", "Node.js", "Llama.cpp", "AI"]
    },
    "Ammehula ERP Software": {
        problem: "A manufacturing enterprise struggled with siloed data across inventory, HR, and production. They needed a high-performance, unified dashboard to prevent stock-outs.",
        architecture: "Engineered a massive Full-Stack ERP. Frontend built with Next.js & Zustand for complex state management. Backend runs on Node.js/Express with a highly normalized PostgreSQL database.",
        tech: ["Next.js", "PostgreSQL", "Express", "Zustand"]
    },
    "Ceylon Taste Cuisine Web": {
        problem: "A high-end restaurant chain required a dynamic, visually stunning e-commerce platform with real-time order tracking and secure payment gateways.",
        architecture: "Developed using React for a fast SPA experience. Integrated Stripe for payments and Firebase Realtime Database for live kitchen ticket tracking.",
        tech: ["React", "Firebase", "Stripe API"]
    },
    "FilmFolio App": {
        problem: "Movie enthusiasts needed a way to track, rate, and discover films with instant trailers and cloud sync across devices.",
        architecture: "Built a native Android application in Java. Utilized Retrofit to consume TMDb and YouTube APIs, storing user preferences seamlessly in Firebase Firestore.",
        tech: ["Android Java", "Firebase", "Retrofit", "TMDb API"]
    },
    "Readify App": {
        problem: "Readers lacked a unified platform to discover books, scan ISBNs, and maintain a personal digital library.",
        architecture: "Native Android App (Java). Integrated Google Books API for rich metadata and a local SQLite database (Room) for offline access.",
        tech: ["Android Java", "SQLite", "Google Books API"]
    },
    "Valentine Surprise": {
        problem: "Required a highly interactive, animated, and physics-driven frontend UI to create a memorable web experience.",
        architecture: "Leveraged React with Framer Motion for complex micro-animations and fluid physics. Styled with Tailwind CSS for pixel-perfect responsiveness.",
        tech: ["React", "Framer Motion", "Tailwind CSS"]
    }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close-btn');
const projectCards = document.querySelectorAll('.project-card');

if (modal && projectCards.length > 0) {
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalArch = document.getElementById('modal-architecture');
    const modalTech = document.getElementById('modal-tech');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('.project-title');
            if (titleEl) {
                const title = titleEl.innerText;
                const data = projectData[title];
                
                if (data) {
                    modalTitle.innerText = title;
                    modalProblem.innerText = data.problem;
                    modalArch.innerText = data.architecture;
                    
                    // Render tags
                    modalTech.innerHTML = '';
                    data.tech.forEach(t => {
                        modalTech.innerHTML += `<span>${t}</span>`;
                    });
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}