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

// Tilt effect for project cards removed as requested.

// Project rotation functionality
let currentProjectIndex = 0;
const projects = [
    {
        type: "AI",
        image: "Assets/code-explainer_image.png",
        title: "Code Explainer Project",
        description: "An AI model leveraging CodeLlama to explain complex code snippets.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/CODE-EXPLAIN"
    },
    {
        type: "ML",
        image: "Assets/Netflix-stock_image.jpeg",
        title: "Netflix Stock Data Analysis Agent",
        description: "An agent designed to analyze Netflix stock data for insights and predictions.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/Netflix_Stock-data_Analysis"
    },
    {
        type: "AI",
        image: "Assets/content-suggestion-agent_image.jpeg",
        title: "Content Suggestion Agent",
        description: "An intelligent agent that suggests personalized content based on user preferences.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/Content-Suggestion-Agent"
    },
    {
        type: "Web",
        image: "Assets/Fitty_image.jpg",
        title: "Fitty: A fitness tracking companion",
        description: "A responsive web application for fitness tracking online with a user-friendly interface.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/-Fitty-simple-fitness-tracker"
    },
    {
        type: "Web",
        image: "Assets/Smart-attendance-curriculum-image.JPG",
        title: "(SCAS)Smart Curriculum and Attendance System",
        description: "A Smart Curriculum and Attendance System for the University.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/Smart-curriculum-Attendance"
    },
    {
        type: "ML",
        image: "Assets/Spam_email_image.png",
        title: "Spam Email Classifier (ML)",
        description: "A machine learning model to accurately classify and filter out spam emails.",
        viewLink: "#",
        githubLink: "https://github.com/Arsalankhateeb73/Spam-email-detection"
    }
];

function rotateProject(direction) {
    const rotatingCard = document.querySelector('.rotating-project-card');
    const projectCard = document.querySelector('.project-card');
    
    if (direction === 'next') {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    } else {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    }
    
    const currentProject = projects[currentProjectIndex];
    
    // Add rotation animation
    rotatingCard.style.transform = 'rotateY(90deg)';
    
    // After half rotation, update content
    setTimeout(() => {
        updateProjectCard(projectCard, currentProject);
        // Complete the rotation
        rotatingCard.style.transform = 'rotateY(0deg)';
    }, 300);
}

function updateProjectCard(card, project) {
    const typeLabel = card.querySelector('.project-type-label');
    const image = card.querySelector('.project-image');
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const viewBtn = card.querySelector('.view-project-btn');
    const githubBtn = card.querySelector('.github-button');
    
    typeLabel.textContent = project.type;
    image.src = project.image;
    image.alt = project.title + ' Screenshot';
    title.textContent = project.title;
    description.textContent = project.description;
    viewBtn.href = project.viewLink;
    githubBtn.href = project.githubLink;
}

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

// Swiper removed - now using custom rotation system


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

