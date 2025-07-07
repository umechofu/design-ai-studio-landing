// Fluid background color change on scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Organic color generation using mathematical functions
    function generateFluidColor(scrollPercent) {
        // Multiple sine waves for organic variation
        const time = scrollPercent * Math.PI * 3; // 3 full cycles over page
        const time2 = scrollPercent * Math.PI * 5; // 5 cycles
        const time3 = scrollPercent * Math.PI * 2.7; // Irregular cycle
        
        // More vibrant base colors that change throughout scroll
        const baseR = 245 + Math.sin(time) * 15;
        const baseG = 245 + Math.sin(time + Math.PI/3) * 15;
        const baseB = 245 + Math.sin(time + Math.PI*2/3) * 15;
        
        // Enhanced color variations for more vibrant effect
        const rVariation = Math.sin(time) * 20 + Math.sin(time2) * 12 + Math.sin(time3) * 8;
        const gVariation = Math.sin(time + 0.8) * 18 + Math.sin(time2 + 1.2) * 10 + Math.cos(time3) * 12;
        const bVariation = Math.cos(time + 1.5) * 22 + Math.cos(time2 + 0.5) * 14 + Math.sin(time3 + 1.8) * 9;
        
        // Additional organic complexity with more pronounced effects
        const complexR = Math.sin(scrollPercent * Math.PI * 8.3) * 8;
        const complexG = Math.cos(scrollPercent * Math.PI * 11.7) * 6;
        const complexB = Math.sin(scrollPercent * Math.PI * 13.1) * 10;
        
        return {
            r: Math.round(Math.max(200, Math.min(255, baseR + rVariation + complexR))),
            g: Math.round(Math.max(200, Math.min(255, baseG + gVariation + complexG))),
            b: Math.round(Math.max(200, Math.min(255, baseB + bVariation + complexB)))
        };
    }
    
    // Throttle function for performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // Continuous background color update
    const updateBackgroundColor = throttle(() => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = documentHeight > 0 ? scrollTop / documentHeight : 0;
        
        const color = generateFluidColor(scrollPercent);
        
        // Update body background
        document.body.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        // Update header background with fluid color integration
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.95)`;
        }
    }, 16); // ~60fps
    
    // Listen to scroll events
    window.addEventListener('scroll', updateBackgroundColor);
    
    // Initialize background color
    updateBackgroundColor();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced fade-in animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Quick animation for all elements
    const animatedElements = document.querySelectorAll('.solution-item, .value-item, .achievement-item, .faq-item, .pain-list, .pricing-card');
    
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        fadeObserver.observe(el);
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active navigation on scroll (throttled)
    const throttledNavUpdate = throttle(updateActiveNavigation, 100);
    window.addEventListener('scroll', throttledNavUpdate);
    
    // Initialize active navigation
    updateActiveNavigation();
    
    // CTA button click tracking (placeholder for analytics)
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA button clicked:', this.textContent);
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
});