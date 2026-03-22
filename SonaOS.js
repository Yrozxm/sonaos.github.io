document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        console.log('Botão clicado:', this.textContent);
        this.style.backgroundColor = '#5e5e5e';
        this.style.color = '#000';
        setTimeout(() => {
            this.style.backgroundColor = '#383d43';
            this.style.color = '#fff';
        }, 500);
    });
button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('h2, h3, ul, li, p').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    navbar.style.transition = 'transform 0.3s ease';
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down - esconde navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - mostra navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}
document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'transform 0.3s ease';
    img.style.cursor = 'pointer';
    
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const menu = document.querySelector('.menu');
    
    if (!navbar || !menu) return;
    if (document.querySelector('.hamburger')) return;
    
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'white';
    hamburger.style.fontSize = '1.5em';
    hamburger.style.cursor = 'pointer';
    hamburger.style.marginRight = '10px';
    
    hamburger.addEventListener('click', function() {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    navbar.appendChild(hamburger);
}

if (window.innerWidth <= 768) {
    createMobileMenu();
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
});