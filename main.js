// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initBlogFiltering();
    initDownloads();
    initScrollAnimations();
    initTypingEffect();
    initHeroAnimation();
});

// Hero text animation on scroll/return
function initHeroAnimation() {
    const heroTitle = document.querySelector('#home h1');
    
    if (!heroTitle) return;
    
    // Store original text as data attribute
    const originalText = heroTitle.getAttribute('data-original-text') || "Cybersecurity Professional";
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Clear any existing timeouts
                if (heroTitle.typewriterTimeout) {
                    clearTimeout(heroTitle.typewriterTimeout);
                }
                
                // Start fresh typing animation
                heroTitle.textContent = '';
                typeWriter(heroTitle, originalText, 150);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    // Observe the hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        }
    });
}

// Blog filtering functionality
function initBlogFiltering() {
    // Only select category navigation links, not blog posts
    const categoryLinks = document.querySelectorAll('.category-list a[data-category]');
    const blogPosts = document.querySelectorAll('.blog-post, .blog-post-full');
    
    if (categoryLinks.length === 0) return;
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Remove active class from all links
            categoryLinks.forEach(l => {
                l.classList.remove('active');
                l.style.color = '#ccc';
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            this.style.color = '#00ff41';
            
            // Filter blog posts
            blogPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                if (category === 'all' || postCategory === category) {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    setTimeout(() => {
                        post.style.opacity = '1';
                    }, 100);
                } else {
                    post.style.opacity = '0';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set default active category
    const defaultCategory = document.querySelector('.category-list a[data-category="all"]');
    if (defaultCategory) {
        defaultCategory.classList.add('active');
        defaultCategory.style.color = '#00ff41';
    }
}

// Set default active category
const defaultCategory = document.querySelector('[data-category="all"]');
if (defaultCategory) {
    defaultCategory.classList.add('active');
    defaultCategory.style.color = '#00ff41';
}

// Downloads functionality
function initDownloads() {
    // Download button interactions
    document.querySelectorAll('.download-btn.primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only prevent default if it's not an actual download link
            if (!this.hasAttribute('download') && !this.href.includes('.')) {
                e.preventDefault();
            }
            
            // Add download animation
            const originalText = this.innerHTML;
            const originalBg = this.style.background;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.background = '#00cc33';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = originalBg || 'linear-gradient(45deg, #00ff41, #00cc33)';
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }, 1000);
            
            // Log download for analytics
            const fileName = this.closest('.download-card').querySelector('h3').textContent;
            console.log('Download initiated for:', fileName);
        });
    });

    // Download category filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const downloadCards = document.querySelectorAll('.download-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Filter downloads
            downloadCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .download-card, .achievement-card, .blog-post, .blog-post-full'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    // Store the original text immediately
    const originalText = "Cybersecurity Professional"; // Fixed text instead of reading from DOM
    heroTitle.setAttribute('data-original-text', originalText);
    
    // Start typing effect after a short delay
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 150);
    }, 500);
}

// Updated typewriter function with better cleanup
function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    // Clear any existing timeout
    if (element.typewriterTimeout) {
        clearTimeout(element.typewriterTimeout);
    }
    
    let i = 0;
    element.textContent = ''; // Clear content first
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            element.typewriterTimeout = setTimeout(type, speed);
        }
    }
    
    type();
}

// Utility functions
function debounce(func, wait) {
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

// Smooth reveal for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}

// Copy to clipboard functionality (for code blocks)
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy to clipboard';
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#00ff41';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            });
        });
        
        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(button);
    });
}

// Initialize copy buttons when page loads
window.addEventListener('load', addCopyButtons);

// Back to top functionality
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.title = 'Back to top';
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));
    
    document.body.appendChild(backToTop);
}

// Add back-to-top button
window.addEventListener('load', addBackToTop);

// Form handling (if you add contact forms later)
function handleForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form handling logic here
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#00ff41';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        });
    });
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', handleForms);
