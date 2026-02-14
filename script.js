// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Counter Animation
function animateCounter(elementId, target, suffix = '') {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 20);
}

// Start counter animation when page loads
window.addEventListener('load', () => {
    animateCounter('participants-count', 150000, '+');
    animateCounter('regions-count', 50);
    animateCounter('accuracy-count', 98, '%');
});

// Modal functions
function openModal() {
    document.getElementById('surveyModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('surveyModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('surveyModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Form submissions
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate survey submission
    alert('Thank you for participating in our health survey! Your responses help improve community health outcomes.');
    this.reset();
    closeModal();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .insight-card');
    animateElements.forEach(el => observer.observe(el));
});

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when section is visible
const dataSection = document.getElementById('data');
const dataSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            dataSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (dataSection) {
    dataSectionObserver.observe(dataSection);
}

// Simple chart creation for disease data
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diseaseChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 400;
        canvas.height = 300;
        
        // Sample data
        const diseases = ['Diabetes', 'Hypertension', 'Heart Disease', 'Obesity', 'Depression'];
        const percentages = [12, 45, 8, 36, 22];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
        
        // Draw bars
        const barWidth = 60;
        const barSpacing = 20;
        const maxHeight = 200;
        const startX = 40;
        const startY = canvas.height - 40;
        
        diseases.forEach((disease, index) => {
            const barHeight = (percentages[index] / 50) * maxHeight;
            const x = startX + index * (barWidth + barSpacing);
            const y = startY - barHeight;
            
            // Draw bar
            ctx.fillStyle = colors[index];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw percentage
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${percentages[index]}%`, x + barWidth/2, y - 10);
            
            // Draw label
            ctx.save();
            ctx.translate(x + barWidth/2, startY + 15);
            ctx.rotate(-Math.PI/4);
            ctx.textAlign = 'right';
            ctx.fillText(disease, 0, 0);
            ctx.restore();
        });
        
        // Draw title
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Chronic Disease Prevalence (%)', canvas.width/2, 20);
    }
});

// Add active state to navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation to page elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.hero-content, .feature-card, .service-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});
