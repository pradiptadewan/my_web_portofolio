document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Hamburger Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Tutup menu saat link diklik
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    /* --- 2. Typed.js Effect (Efek Ketik) --- */
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: ['Web Developer', 'Fullstack Engineer', 'UI/UX Enthusiast'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        });
    }

    /* --- 3. Scroll Animation (Fade In) --- */
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    /* --- 4. Certificate Slider --- */
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.querySelector('.slide-counter');

    if (slider && prevBtn && nextBtn) {
        const slides = slider.querySelectorAll('img');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (slideCounter) {
                slideCounter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            }
            
            // Atur status tombol
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
            prevBtn.style.cursor = currentIndex === 0 ? "default" : "pointer";
            
            nextBtn.style.opacity = currentIndex === totalSlides - 1 ? "0.5" : "1";
            nextBtn.style.cursor = currentIndex === totalSlides - 1 ? "default" : "pointer";
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        updateSlider(); // Init pertama kali
    }

    /* --- 5. Active Link Highlight on Scroll --- */
    const links = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sectionsList = document.querySelectorAll('section');
        
        sectionsList.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 100px offset untuk header
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});