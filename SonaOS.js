document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.querySelector('.starfield');
    const initStarfield = () => {
        if (!starfield) return;
        const starCount = window.innerWidth < 768 ? 60 : 120;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${3 + Math.random() * 7}s`);
            star.style.animationDelay = `${Math.random() * 10}s`;
            starfield.appendChild(star);
        }
    };

    initStarfield();

    document.addEventListener('mousemove', (e) => {
        if (!starfield) return;
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        starfield.style.transform = `translate(${x}px, ${y}px)`;
    });

    const createComet = () => {
        if (!starfield) return;
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.top = `${-10 + (Math.random() * 40)}%`;
        comet.style.left = `${70 + (Math.random() * 40)}%`;
        starfield.appendChild(comet);
        setTimeout(() => comet.remove(), 10000);
    };

    setInterval(createComet, 20000);
    setTimeout(createComet, 3000);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    const overlay = document.querySelector('.page-overlay');
    const handleNavigation = (e) => {
        const href = e.currentTarget.getAttribute('href');

        if (href.endsWith('.html') || (href.includes('/') && !href.includes('#'))) {
            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    };

    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('index.html') || href.includes('blog.html'))) {
            link.addEventListener('click', handleNavigation);
        }
    });

    window.addEventListener('load', () => {
        if (overlay) {
            overlay.classList.remove('active');
        }
    });

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.padding = '1.25rem 8%';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.4)';
            navbar.style.padding = '1.5rem 8%';
        }
    });

    const initMobileMenu = () => {
        if (document.querySelector('.hamburger-btn')) return;
        const nav = document.querySelector('.navbar');
        const menu = document.querySelector('.menu');
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-btn';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            menu.classList.toggle('mobile-open');
        });
    };

    initMobileMenu();
});