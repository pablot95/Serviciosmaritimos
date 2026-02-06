document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll behavior
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 100) {
                header.classList.add('scrolled');
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent');
                header.classList.remove('scrolled');
            }
        });

        // Initial check
        if (window.scrollY > 0) {
            header.classList.add('transparent');
        } else {
            header.classList.add('transparent');
        }
    } else {
        // No hero section, ensure header is solid (scrolled style)
        header.classList.add('scrolled');
        header.classList.remove('transparent');
    }

    // Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init("nQMhHcewPMYzsFULE");

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Send form with EmailJS
            emailjs.sendForm('service_bbc8zty', 'template_cc5ky83', this)
                .then(function() {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.');
                    console.error('Error al enviar:', error);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }

    // Service items animation on scroll
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length > 0) {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        serviceItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            itemObserver.observe(item);
        });
    }

    // Console message
    console.log('%c Galeon Consultora Marítima ', 'background: #003f7f; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Sitio web profesional de servicios marítimos ', 'color: #4da6d4; font-size: 14px;');

    // Parallax cards 3D effect
    const parallaxCards = document.querySelectorAll('.parallax-card');
    parallaxCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Parallax background scroll effect
    window.addEventListener('scroll', () => {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrolled = window.scrollY;
            const parallaxSection = document.querySelector('.services-parallax');
            if (parallaxSection) {
                const sectionTop = parallaxSection.offsetTop;
                const sectionHeight = parallaxSection.offsetHeight;
                
                if (scrolled >= sectionTop - window.innerHeight && scrolled <= sectionTop + sectionHeight) {
                    const offset = (scrolled - sectionTop + window.innerHeight) * 0.05;
                    parallaxBg.style.transform = `translateY(${offset}px)`;
                }
            }
        }
    });
});
