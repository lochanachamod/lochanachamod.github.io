/**
 * THE ENGINEERING INDEX - SCRIPT
 * Refined interactions & accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. HERO IDENTITY RECONSTRUCTION ---
    const initHeroIdentity = () => {
        const stage = document.querySelector('.hero-identity-stage');
        if (!stage) return;
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion && window.innerWidth > 640) {
            stage.classList.add('fx-ready');
            
            window.requestAnimationFrame(() => {
                stage.classList.add('animate-start');
            });
            
            setTimeout(() => {
                stage.classList.remove('animate-start');
                stage.classList.add('idle');
                illuminatePipeline();
            }, 2200);
            
            stage.addEventListener('mousemove', (e) => {
                const rect = stage.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                window.requestAnimationFrame(() => {
                    stage.style.setProperty('--px', x);
                    stage.style.setProperty('--py', y);
                });
            });
            
            stage.addEventListener('mouseleave', () => {
                window.requestAnimationFrame(() => {
                    stage.style.setProperty('--px', 0);
                    stage.style.setProperty('--py', 0);
                });
            });
        } else {
            stage.classList.add('idle');
            illuminatePipeline();
        }
    };

    const illuminatePipeline = () => {
        const nodes = document.querySelectorAll('.hero-pipeline .pipe-node, .hero-pipeline .pipe-line');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('active');
            }, index * 250); // 250ms stagger per node/line
            
            setTimeout(() => {
                node.classList.add('settled');
            }, (index * 250) + 1500); // 1.5s after lighting up, settle down
        });
    };

    initHeroIdentity();

    // --- 1. SCROLL REVEALS (INTERSECTION OBSERVER) ---
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        document.querySelectorAll('.reveal, .career-rail, .process-path').forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.reveal, .career-rail, .process-path').forEach(el => el.classList.add('active'));
    }

    // --- 2. ACTIVE NAVIGATION STATE & SMOOTH SCROLL ---
    const navItems = document.querySelectorAll('.nav-item');
    const navMapping = [
        { id: 'work', href: '#work' },
        { id: 'experience', href: '#experience' },
        { id: 'services', href: '#services' },
        { id: 'workflow', href: '#services' },
        { id: 'beyond', href: '#beyond' },
        { id: 'additional-work', href: '#beyond' },
        { id: 'capabilities', href: '#beyond' },
        { id: 'about', href: '#about' },
        { id: 'contact', href: '#contact' }
    ];

    let isScrolling = false;
    function updateNav() {
        const scrollPos = window.scrollY;
        // Activation line roughly nav height (80px) + 30% of viewport
        const activationLine = window.innerHeight * 0.3 + 80; 
        const pageBottom = (window.innerHeight + scrollPos) >= document.body.offsetHeight - 50;

        let activeHref = null;

        if (pageBottom) {
            activeHref = '#contact';
        } else {
            // Find the last section whose top is above the activation line
            for (let i = navMapping.length - 1; i >= 0; i--) {
                const sec = document.getElementById(navMapping[i].id);
                if (sec) {
                    const rect = sec.getBoundingClientRect();
                    const top = rect.top + window.scrollY;
                    if (top <= scrollPos + activationLine) {
                        activeHref = navMapping[i].href;
                        break;
                    }
                }
            }
        }
        
        if (!activeHref) activeHref = '#work';

        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('href') === activeHref) {
                nav.classList.add('active');
            }
        });
        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(updateNav);
            isScrolling = true;
        }
    }, { passive: true });
    
    // Initial call
    updateNav();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                scrollTo(targetId, false, 'start');
                this.blur();
            }
            closeCmdPalette();
        });
    });

    // --- 3. AMMEHULA HOVER/CLICK LOGIC ---
    const ammehulaBlocks = document.querySelectorAll('.vis-ammehula .arch-node');
    const ammehulaMedia = document.querySelectorAll('.vis-ammehula .flag-img');
    
    function setAmmehulaMedia(mediaId) {
        ammehulaBlocks.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
            if (b.getAttribute('data-media') === mediaId) {
                b.classList.add('active');
                b.setAttribute('aria-pressed', 'true');
            }
        });
        
        ammehulaMedia.forEach(img => {
            img.classList.remove('visible');
            img.style.zIndex = '';
        });
        
        const targetImg = document.getElementById(`img-ammehula-${mediaId}`);
        if(targetImg) {
            targetImg.classList.add('visible');
            targetImg.style.zIndex = '10';
        }
    }

    ammehulaBlocks.forEach(block => {
        const mediaId = block.getAttribute('data-media');
        
        block.addEventListener('mouseenter', () => setAmmehulaMedia(mediaId));
        block.addEventListener('focus', () => setAmmehulaMedia(mediaId));
        block.addEventListener('click', () => setAmmehulaMedia(mediaId));
    });

    // Reset Ammehula on container leave to prevent getting stuck
    const ammehulaVisual = document.querySelector('.vis-ammehula');
    if (ammehulaVisual) {
        ammehulaVisual.addEventListener('mouseleave', () => setAmmehulaMedia('main'));
    }

    // --- 3.5 LOC-AI HOVER/CLICK LOGIC ---
    const locaiPanes = document.querySelectorAll('.vis-locai .split-pane');
    const locaiContainer = document.querySelector('.vis-locai');
    function setLocAiPane(paneNode) {
        locaiPanes.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('aria-pressed', 'false');
        });
        paneNode.classList.add('active');
        paneNode.setAttribute('aria-pressed', 'true');
        
        if (paneNode.classList.contains('cloud-pane')) {
            if (locaiContainer) locaiContainer.classList.add('show-context');
        } else {
            if (locaiContainer) locaiContainer.classList.remove('show-context');
        }
    }
    
    locaiPanes.forEach(pane => {
        pane.addEventListener('mouseenter', () => setLocAiPane(pane));
        pane.addEventListener('focus', () => setLocAiPane(pane));
        pane.addEventListener('click', () => setLocAiPane(pane));
    });

    // --- 3.6 BEYOND THE BROWSER TABS ---
    const techTabs = document.querySelectorAll('.tech-tab');
    const techPanels = document.querySelectorAll('.tech-panel');

    function setTechTab(tabId) {
        techTabs.forEach(tab => {
            if (tab.id === tabId) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
            }
        });

        techPanels.forEach(panel => {
            if (panel.getAttribute('aria-labelledby') === tabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    techTabs.forEach(tab => {
        tab.addEventListener('click', () => setTechTab(tab.id));
        tab.addEventListener('keydown', (e) => {
            let nextTab = null;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                nextTab = tab.nextElementSibling || techTabs[0];
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                nextTab = tab.previousElementSibling || techTabs[techTabs.length - 1];
            }
            if (nextTab) {
                nextTab.focus();
                setTechTab(nextTab.id);
            }
        });
    });

    // --- 4. COMMAND PALETTE (CTRL+K / CMD+K) ---
    const cmdPalette = document.getElementById('cmd-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
    const cmdTrigger = document.getElementById('cmd-trigger');
    const cmdBackdrop = document.getElementById('cmd-backdrop');
    let cmdLastFocusedElement = null;

    // Grouped Commands
    const groupedCommands = {
        'NAVIGATE': [
            { title: 'Work', desc: 'Flagship engineering projects', action: () => scrollTo('#work') },
            { title: 'Experience', desc: 'Professional timeline', action: () => scrollTo('#experience') },
            { title: 'Services', desc: 'Full-Stack, Backend, Modernisation', action: () => scrollTo('#services') },
            { title: 'Beyond the Browser', desc: 'Systems, Desktop, Mobile, Data', action: () => scrollTo('#beyond') },
            { title: 'Additional Work', desc: 'Selected project archive', action: () => scrollTo('#additional-work') },
            { title: 'About', desc: 'Professional story and education', action: () => scrollTo('#about') },
            { title: 'Contact', desc: 'Get in touch for opportunities', action: () => scrollTo('#contact') }
        ],
        'PROJECTS': [
            { title: 'Ammehula', desc: 'Full-Stack Product Engineering', action: () => scrollTo('#proj-ammehula', false, 'start') },
            { title: 'CoreStream Engine', desc: 'Distributed Systems', action: () => scrollTo('#proj-corestream', false, 'start') },
            { title: 'LOC-AI Assistant', desc: 'Desktop AI', action: () => scrollTo('#proj-locai', false, 'start') },
            { title: 'Sentinel-eBPF', desc: 'Security / Systems', action: () => scrollTo('#proj-sentinel', false, 'start') },
            { title: 'Clothes Manager', desc: 'React, TypeScript', action: () => scrollTo('#proj-clothes-manager', true, 'center') },
            { title: 'Cricket Match Predictor', desc: 'Python, ML', action: () => scrollTo('#proj-cricket-match-predictor', true, 'center') },
            { title: 'FilmFolio', desc: 'Android Java', action: () => scrollTo('#proj-filmfolio', true, 'center') },
            { title: 'GameSpotter', desc: 'PHP, MySQL', action: () => scrollTo('#proj-gamespotter', true, 'center') },
            { title: 'Patient Record System', desc: 'Node.js, MongoDB', action: () => scrollTo('#proj-patient-record-system', true, 'center') },
            { title: 'Phone Number Analyzer', desc: 'Python, OSINT', action: () => scrollTo('#proj-advanced-phone-number-analyzer', true, 'center') },
            { title: 'Readify', desc: 'Android Java', action: () => scrollTo('#proj-readify', true, 'center') },
            { title: 'ShipMate', desc: 'Java Swing', action: () => scrollTo('#proj-shipmate', true, 'center') }
        ],
        'ACTIONS': [
            { title: 'Email', desc: 'lochanachamod3@gmail.com', action: () => window.location.href = 'mailto:lochanachamod3@gmail.com' },
            { title: 'GitHub', desc: 'lochanachamod', action: () => window.open('https://github.com/lochanachamod', '_blank') },
            { title: 'LinkedIn', desc: 'lochana-chamod', action: () => window.open('https://linkedin.com/in/lochana-chamod', '_blank') }
        ]
    };

    let flatResults = [];
    let selectedIndex = 0;

    function renderCommands(query = '') {
        cmdResults.innerHTML = '';
        flatResults = [];
        let indexCounter = 0;

        for (const [groupName, groupItems] of Object.entries(groupedCommands)) {
            const filtered = groupItems.filter(cmd => 
                cmd.title.toLowerCase().includes(query.toLowerCase()) || 
                cmd.desc.toLowerCase().includes(query.toLowerCase())
            );

            if (filtered.length > 0) {
                const groupTitle = document.createElement('div');
                groupTitle.className = 'cmd-group-title';
                groupTitle.textContent = groupName;
                cmdResults.appendChild(groupTitle);

                filtered.forEach(cmd => {
                    const currentIndex = indexCounter;
                    const div = document.createElement('div');
                    div.id = `cmd-option-${currentIndex}`;
                    div.className = `cmd-item ${currentIndex === selectedIndex ? 'selected' : ''}`;
                    div.setAttribute('role', 'option');
                    div.setAttribute('aria-selected', currentIndex === selectedIndex);
                    div.setAttribute('data-index', currentIndex);
                    
                    div.innerHTML = `
                        <span>${cmd.title}</span>
                        <span class="cmd-item-desc">${cmd.desc}</span>
                    `;
                    
                    div.addEventListener('click', () => {
                        closeCmdPalette();
                        cmd.action();
                    });
                    
                    div.addEventListener('mousemove', () => {
                        if (selectedIndex !== currentIndex) {
                            updateSelectionVisually(currentIndex);
                        }
                    });
                    
                    cmdResults.appendChild(div);
                    flatResults.push(cmd);
                    indexCounter++;
                });
            }
        }

        if (flatResults.length === 0) {
            cmdResults.innerHTML = '<div class="cmd-item" style="justify-content: center; color: var(--text-dark);" role="option">No results found</div>';
            cmdInput.removeAttribute('aria-activedescendant');
        } else {
            updateSelectionVisually(selectedIndex);
        }
    }

    function updateSelectionVisually(newIndex) {
        if (newIndex >= 0 && newIndex < flatResults.length) {
            selectedIndex = newIndex;
            const items = cmdResults.querySelectorAll('.cmd-item');
            items.forEach(item => {
                const itemIdx = parseInt(item.getAttribute('data-index'), 10);
                if (itemIdx === selectedIndex) {
                    item.classList.add('selected');
                    item.setAttribute('aria-selected', 'true');
                    cmdInput.setAttribute('aria-activedescendant', `cmd-option-${selectedIndex}`);
                    // Ensure it scrolls into view within the listbox
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                    item.setAttribute('aria-selected', 'false');
                }
            });
        }
    }

    function openCmdPalette() {
        cmdLastFocusedElement = document.activeElement;
        cmdPalette.setAttribute('aria-hidden', 'false');
        cmdInput.setAttribute('aria-expanded', 'true');
        cmdInput.value = '';
        selectedIndex = 0;
        renderCommands();
        cmdPalette.classList.add('active');
        setTimeout(() => cmdInput.focus(), 50);
        document.body.style.overflow = 'hidden';
    }

    function closeCmdPalette() {
        cmdPalette.classList.remove('active');
        cmdPalette.setAttribute('aria-hidden', 'true');
        cmdInput.setAttribute('aria-expanded', 'false');
        cmdInput.blur();
        cmdInput.value = '';
        document.body.style.overflow = '';
        if (cmdLastFocusedElement) {
            cmdLastFocusedElement.focus();
        }
    }

    function scrollTo(selector, highlight = false, blockPosition = 'start') {
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: blockPosition });
            if (highlight) {
                target.classList.add('highlight');
                setTimeout(() => target.classList.remove('highlight'), 2000);
            }
        }
    }

    cmdTrigger.addEventListener('click', openCmdPalette);
    cmdBackdrop.addEventListener('click', closeCmdPalette);

    // Focus trap for command palette modal
    cmdPalette.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Since this is a combobox, we trap Tab to stay on the input or close it.
            // A more standard approach for a modal dialog is to allow tab if there are other focusables,
            // but here we just keep focus on input and prevent escaping to the background.
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdPalette.getAttribute('aria-hidden') === 'true') {
                openCmdPalette();
            } else {
                closeCmdPalette();
            }
        }

        if (e.key === 'Escape' && cmdPalette.getAttribute('aria-hidden') === 'false') {
            closeCmdPalette();
        }
    });

    cmdInput.addEventListener('input', (e) => {
        selectedIndex = 0;
        renderCommands(e.target.value);
    });

    cmdInput.addEventListener('keydown', (e) => {
        if (flatResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = (selectedIndex + 1) % flatResults.length;
            updateSelectionVisually(newIndex);
            const selectedEl = cmdResults.querySelector('.cmd-item.selected');
            selectedEl?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = (selectedIndex - 1 + flatResults.length) % flatResults.length;
            updateSelectionVisually(newIndex);
            const selectedEl = cmdResults.querySelector('.cmd-item.selected');
            selectedEl?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (flatResults[selectedIndex]) {
                closeCmdPalette();
                flatResults[selectedIndex].action();
            }
        }
    });
});