document.addEventListener('DOMContentLoaded', function() {

    // 1. Animasi Ketikan (Typed.js)
    const typed = new Typed('#typed-text', {
        strings: ['Web Developer', 'UI/UX'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // 2. Animasi Muncul Saat Scroll (Intersection Observer)
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah elemen terlihat
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 3. Highlight Navigasi Aktif Saat Scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    const allSections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // Beri sedikit offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

});

// =================================== //
// ===== FUNGSI UNTUK SERTIFIKAT ===== //
// =================================== //

// Kita bungkus semua dalam satu event listener agar tidak bentrok
document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIKA UNTUK SLIDER SERTIFIKAT ---
    const sliderContainer = document.querySelector('.certificate-slider-container');
    
    // Hanya jalankan kode slider jika containernya ada di halaman
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slider img');
        const prevBtn = sliderContainer.querySelector('#prevBtn');
        const nextBtn = sliderContainer.querySelector('#nextBtn');

        const counterElement = sliderContainer.querySelector('.slide-counter'); 
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
        if (slider && slider.parentElement) {
            const slideWidth = slider.parentElement.clientWidth;
            slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === (totalSlides - 1);
        }
        // TAMBAHKAN BARIS BARU INI UNTUK UPDATE TEKS
        if (counterElement) {
            counterElement.textContent = `${currentIndex + 1} / ${totalSlides}`;
        }
    }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }

        // Update slider saat ukuran window berubah untuk menjaga responsivitas
        window.addEventListener('resize', updateSlider);
        
        // Panggil pertama kali untuk set posisi dan status tombol yang benar
        updateSlider(); 
    }

});