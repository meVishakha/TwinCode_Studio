// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(202, 220, 174, 0.3)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.borderBottom = '1px solid rgba(202, 220, 174, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.section-header',
        '.about-text',
        '.about-image',
        '.service-card',
        '.project-card',
        '.contact-info',
        '.contact-form'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    });

    // Set up skill progress bars for hover animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--progress-width', width);
    });

});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1500);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #CADCAE 0%, #0A400C 100%);
        color: #000000;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(202, 220, 174, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
});

// Loading screen functionality
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const navbarLogo = document.querySelector('.logo-icon');
    const loadingLogo = document.querySelector('.loading-logo');
    
    if (loadingScreen && navbarLogo && loadingLogo) {
        // Hide navbar logo initially
        navbarLogo.style.opacity = '0';
        
        // Calculate navbar logo position
        const navbarRect = navbarLogo.getBoundingClientRect();
        const loadingRect = loadingLogo.getBoundingClientRect();
        
        // Calculate the offset needed to move from center to navbar position
        const offsetX = navbarRect.left - (window.innerWidth / 2) + (navbarRect.width / 2);
        const offsetY = navbarRect.top - (window.innerHeight / 2) + (navbarRect.height / 2);
        
        // Apply the calculated offset to the animation
        const logoCircle = document.querySelector('.logo-circle');
        logoCircle.style.setProperty('--offset-x', `${offsetX}px`);
        logoCircle.style.setProperty('--offset-y', `${offsetY}px`);
        
        // After animation completes, show navbar logo and hide loading screen
        setTimeout(() => {
            navbarLogo.style.opacity = '1';
            navbarLogo.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }, 2500); // Wait for animation to complete
    }
    document.body.classList.add('loaded');
});

// Custom Magic Stick Cursor (Desktop only)
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('customCursor');
    
    // Check if screen is desktop size (768px or larger)
    const isDesktop = window.innerWidth >= 768;
    
    if (customCursor && isDesktop) {
        // Show cursor immediately for desktop
        customCursor.style.display = 'block';
        customCursor.style.opacity = '1';
        customCursor.style.transition = 'opacity 0.3s ease';
        
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
        
        // Mouse enter/leave events for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .service-card, .project-card, .about-card, .skill-item, .stat-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
            });
        });
        
        // Click events
        document.addEventListener('mousedown', () => {
            customCursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('click');
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
        });
    } else if (customCursor) {
        // Hide cursor element on mobile/tablet
        customCursor.style.display = 'none';
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newIsDesktop = window.innerWidth >= 768;
        if (customCursor) {
            if (newIsDesktop) {
                // Show cursor when switching to desktop
                customCursor.style.display = 'block';
                customCursor.style.opacity = '1';
            } else {
                // Hide cursor when switching to mobile
                customCursor.style.display = 'none';
            }
        }
    });
    
    // Fallback: Ensure cursor is visible after a short delay
    setTimeout(() => {
        if (customCursor && isDesktop) {
            customCursor.style.display = 'block';
            customCursor.style.opacity = '1';
        }
    }, 100);
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(202, 220, 174, 0.3)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.borderBottom = '1px solid rgba(202, 220, 174, 0.1)';
    }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

