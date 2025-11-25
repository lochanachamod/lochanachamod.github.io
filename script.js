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