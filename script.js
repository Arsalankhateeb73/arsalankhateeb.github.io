// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a:not(.theme-toggle)');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset for better timing
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Set initial active link on page load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        navLinksList.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    } else {
        // Default to the first link if no hash is present
        if (navLinksList.length > 0) {
            navLinksList[0].classList.add('active');
        }
    }
});

// Scroll Progress Bar functionality
const scrollProgressBar = document.getElementById('scroll-progress-bar');

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = document.documentElement.scrollTop;
    const progress = (scrollPosition / totalHeight) * 100;
    scrollProgressBar.style.width = progress + '%';
});

// Tilt effect for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (cardRect.height / 2)) * -10; // Max tilt 10deg
        const rotateY = (mouseX / (cardRect.width / 2)) * 10;   // Max tilt 10deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        card.style.boxShadow = `0 ${Math.abs(rotateX) + Math.abs(rotateY)}px ${Math.abs(rotateX) + Math.abs(rotateY) + 20}px rgba(0, 0, 0, 0.4), 0 0 0 3px var(--neon-glow-color)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = '0 8px 32px 0 var(--card-shadow-glass)';
    });
});

// Hide preloader when page loads
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// Display contact form success message if redirected from FormSubmit
window.addEventListener('load', () => {
    if (window.location.hash === '#contact-success') {
        const successMessage = document.getElementById('contact-success');
        if (successMessage) {
            successMessage.style.display = 'block';
            // Optionally, remove the hash from the URL after a short delay
            setTimeout(() => {
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }, 5000);
        }
    }
});

// Initialize Swiper
const swiper = new Swiper('.projects-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});


// Initialize AOS
AOS.init({
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;
const profileImage = document.getElementById('profile-image');

const lightModeProfileImage = 'Assets/profile-light.png'; // Define light mode image path
const darkModeProfileImage = 'Assets/profile-dark.png';  // Define dark mode image path

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeIcon.src = "Assets/sun.svg";
        if (profileImage) profileImage.src = darkModeProfileImage;
    } else {
        if (profileImage) profileImage.src = lightModeProfileImage;
    }
} else {
    // Default to dark mode if no preference is saved
    body.classList.add('dark-mode');
    themeIcon.src = "Assets/sun.svg";
    if (profileImage) profileImage.src = darkModeProfileImage;
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.src = "Assets/moon.svg";
        if (profileImage) profileImage.src = lightModeProfileImage; // Set light mode image
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.src = "Assets/sun.svg";
        if (profileImage) profileImage.src = darkModeProfileImage; // Set dark mode image
        localStorage.setItem('theme', 'dark-mode');
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Show button after scrolling down 300px
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Responsive Navbar Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close navbar when a link is clicked (for mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
