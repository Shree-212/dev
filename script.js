// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'rotate(0) translateY(0)';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'rotate(0) translateY(0)';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.card, .variant-card, .feature-card, .feature-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.style.color = 'var(--primary)';
            navLink.style.background = 'var(--light-gray)';
        } else if (navLink) {
            navLink.style.color = 'var(--dark)';
            navLink.style.background = 'transparent';
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Variant card hover effect enhancement
const variantCards = document.querySelectorAll('.variant-card');
variantCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Table row highlight on mobile
if (window.innerWidth <= 768) {
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.style.background = '');
            this.style.background = 'rgba(255, 107, 53, 0.1)';
        });
    });
}

// Add loading state for images (if any added later)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(highlightNavigation));

// Add print optimization
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.querySelectorAll('.nav-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.nav-menu').forEach(menu => {
        menu.style.display = '';
    });
});

// Copy to clipboard for variant details (optional enhancement)
const detailValues = document.querySelectorAll('.detail-value');
detailValues.forEach(detail => {
    detail.style.cursor = 'pointer';
    detail.title = 'Click to copy';
    
    detail.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.color = 'var(--primary)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 1000);
        });
    });
});

// Add hover effect for tech tags
const techTags = document.querySelectorAll('.tech-tag, .tech-item');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Console branding
console.log('%c🕉️ Dev Poojaan', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cTechnical Execution Plan', 'font-size: 14px; color: #6B6B6B;');
console.log('%cजहाँ भाव, वहीं देव', 'font-size: 12px; font-style: italic; color: #FF6B35;');
