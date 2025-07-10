// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.menu-item, .testimonial-item, .about-text, .contact-info');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !phone || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial carousel effect (if needed)
    let currentTestimonial = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0.7';
                item.style.transform = 'translateY(10px)';
            }
        });
    }

    // Auto-rotate testimonials on mobile
    if (window.innerWidth <= 768) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 4000);
    }

    // Phone number click to call
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"], .contact-bar span, .contact-item p');
    phoneNumbers.forEach(phone => {
        if (phone.textContent.includes('0812-3525-2585')) {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', function() {
                window.open('tel:+6281235252585');
            });
        }
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Counter animation for stats (if needed in future)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Loading screen (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading screens if they exist
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('onclick');
            if (target) {
                // Extract section name from onclick attribute
                const match = target.match(/scrollToSection\('(.+)'\)/);
                if (match) {
                    scrollToSection(match[1]);
                }
            }
        });
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// Menu Carousel Functionality
const carousel = document.getElementById('menuCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const cardWidth = 300; // Card width + gap
const visibleCards = getVisibleCards();

function getVisibleCards() {
    const containerWidth = carousel.parentElement.offsetWidth;
    return Math.floor(containerWidth / cardWidth);
}

function updateCarousel() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const scrollPosition = currentIndex * cardWidth;
    
    if (scrollPosition <= maxScroll) {
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

function updateButtons() {
    const maxIndex = Math.max(0, carousel.children.length - visibleCards);
    
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        updateButtons();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, carousel.children.length - visibleCards);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
        updateButtons();
    }
});

// Touch/Swipe Support
// let startX = 0;
// let startY = 0;
// let distX = 0;
// let distY = 0;
// let threshold = 150;
// let restraint = 100;
// let allowedTime = 500;
// let elapsedTime = 0;
// let startTime = 0;

carousel.addEventListener('touchstart', (e) => {
    const touchobj = e.changedTouches[0];
    distX = 0;
    distY = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
});

carousel.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

carousel.addEventListener('touchend', (e) => {
    const touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    
    if (elapsedTime <= allowedTime && Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
            // Swipe right - go to previous
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                updateButtons();
            }
        } else {
            // Swipe left - go to next
            const maxIndex = Math.max(0, carousel.children.length - visibleCards);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
                updateButtons();
            }
        }
    }
    e.preventDefault();
});


// Handle window resize
window.addEventListener('resize', () => {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
        currentIndex = 0;
        updateCarousel();
        updateButtons();
    }
});

// Auto-play functionality (optional)
let autoPlayInterval;
const autoPlayDelay = 4000; // 4 seconds

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const maxIndex = Math.max(0, carousel.children.length - visibleCards);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
        updateButtons();
    }, autoPlayDelay);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play when page loads
// startAutoPlay();

// Stop auto-play when user interacts
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Smooth scroll behavior for carousel
carousel.addEventListener('scroll', () => {
    // Update current index based on scroll position
    const scrollLeft = carousel.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateButtons();
    }
});


// Intersection Observer for scroll animations
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

// Observe menu cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});


// Tambahkan di script.js
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
        logoImg.onerror = function() {
            console.log('Logo gagal dimuat:', this.src);
        };
        logoImg.onload = function() {
            console.log('Logo berhasil dimuat');
        };
    }
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const phone = document.getElementById('userPhone').value;
            const message = document.getElementById('userMessage').value;
            
            // Validate form data
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Format WhatsApp message
            const whatsappMessage = `Halo! Saya ingin menghubungi Pawon Djanganan.

*Nama:* ${name}
*Email:* ${email}
*Telepon:* ${phone}

*Pesan:*
${message}

Terima kasih!`;
            
            // WhatsApp phone number (without + and spaces)
            const whatsappNumber = '6281235252585'; // Format: country code + phone number
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Optional: Clear form after submission
            document.getElementById('contactForm').reset();
            
            // Show success message
            alert('Redirecting to WhatsApp...');
        });