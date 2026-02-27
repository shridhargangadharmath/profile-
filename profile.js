// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== FORM VALIDATION =====
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let errorElement = document.getElementById("error");

    // Clear previous message
    errorElement.textContent = "";
    errorElement.classList.remove('success', 'error');

    // Validation
    if (name === "") {
        showError("Please enter your name.", errorElement);
        return;
    }

    if (!isValidEmail(email)) {
        showError("Please enter a valid email address.", errorElement);
        return;
    }

    if (message === "") {
        showError("Please enter a message.", errorElement);
        return;
    }

    if (message.length < 10) {
        showError("Message must be at least 10 characters long.", errorElement);
        return;
    }

    // Success message
    showSuccess("Message sent successfully! Thank you for reaching out.", errorElement);
    
    // Reset form
    document.getElementById("contactForm").reset();
    
    // Clear message after 3 seconds
    setTimeout(() => {
        errorElement.textContent = "";
        errorElement.classList.remove('success');
    }, 3000);
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error
function showError(message, element) {
    element.textContent = message;
    element.classList.add('error');
}

// Helper function to show success
function showSuccess(message, element) {
    element.textContent = message;
    element.classList.add('success');
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== INITIALIZE ACTIVE LINK ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
});