document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI UNTUK MENU HAMBURGER ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle kelas 'nav-active' untuk menampilkan/menyembunyikan menu
            navLinks.classList.toggle('nav-active');
            
            // Animasi ikon hamburger
            hamburger.classList.toggle('toggle');
        });

        // Menutup menu saat link di-klik (berguna untuk navigasi halaman tunggal)
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
            });
        });
    }


    // --- FUNGSI UNTUK EFEK KETIK (TYPED.JS) ---
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const options = {
            strings: ['Web Developer', 'UI/UX'],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true,
            backDelay: 1500,
        };
        new Typed('#typed-text', options);
    }


    // --- FUNGSI UNTUK ANIMASI SAAT SCROLL ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Pemicu animasi saat 10% bagian terlihat
    });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    // --- FUNGSI UNTUK SLIDER SERTIFIKAT ---
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.querySelector('.slide-counter');

    if (slider && prevBtn && nextBtn && slideCounter) {
        let currentIndex = 0;
        const slides = slider.querySelectorAll('img');
        const totalSlides = slides.length;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update penomoran slide
            slideCounter.textContent = `${currentIndex + 1} / ${totalSlides}`;

            // Menonaktifkan tombol jika di awal atau akhir
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalSlides - 1;
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

        // Inisialisasi slider saat pertama kali dimuat
        updateSlider();
    }


    // --- FUNGSI UNTUK LINK NAVIGASI AKTIF SAAT SCROLL ---
    const navLinksList = document.querySelectorAll('nav ul li a');
    const allSections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

});