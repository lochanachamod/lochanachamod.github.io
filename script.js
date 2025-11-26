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