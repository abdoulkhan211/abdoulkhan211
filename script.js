document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Animation des liens de navigation
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Effet de changement de page
    const pageContent = document.querySelector('.page-content');
    window.addEventListener('load', function() {
        pageContent.style.opacity = '1';
    });
    
    // Animation de texte
    if (document.querySelector('.animated-text')) {
        const words = ["Mobile", "Web", "Cloud", "Innovante"];
        let currentWordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeEffect() {
            const currentWord = words[currentWordIndex];
            const animatedText = document.querySelector('.animated-text');
            
            if (isDeleting) {
                animatedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                animatedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(typeEffect, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
            } else {
                const typingSpeed = isDeleting ? 100 : 200;
                setTimeout(typeEffect, typingSpeed);
            }
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // Effet parallax sur les éléments flottants
    if (window.innerWidth > 992) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const floatingPhone = document.querySelector('.floating-phone');
            const floatingDesktop = document.querySelector('.floating-desktop');
            
            if (floatingPhone) {
                floatingPhone.style.transform = `translateY(${scrollPosition * 0.1}px) rotate(-5deg)`;
            }
            
            if (floatingDesktop) {
                floatingDesktop.style.transform = `translateY(${scrollPosition * 0.05}px) rotate(3deg)`;
            }
        });
    }
    
    // Animation au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .app-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialisation des éléments animés
    const animatedElements = document.querySelectorAll('.feature-card, .app-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appel initial pour les éléments déjà visibles
});


// FAQ Accordéon
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Animation des cartes d'information (page contact)
const infoCards = document.querySelectorAll('.info-card');
if (infoCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    infoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Animation du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Envoyer le message';
                submitBtn.disabled = false;
                this.reset();
                
                // Notification
                const notification = document.createElement('div');
                notification.className = 'form-notification success';
                notification.innerHTML = 'Votre message a été envoyé avec succès! Nous vous répondrons bientôt.';
                this.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 5000);
            }, 3000);
        }, 2000);
    });
}
