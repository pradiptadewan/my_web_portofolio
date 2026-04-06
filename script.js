document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const closeMenu = () => {
        if (!navToggle || !navMenu) return;
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }

    const roles = [
        'Aktif Mencari Posisi Fullstack Developer',
        'Terbuka untuk Posisi Frontend Developer',
        'Terbuka untuk Posisi Backend Developer',
        'Siap Berkontribusi untuk Tim Produk'
    ];
    const roleText = document.getElementById('role-text');

    if (roleText) {
        let roleIndex = 0;
        roleText.textContent = roles[roleIndex];

        setInterval(() => {
            roleText.style.opacity = '0';
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                roleText.textContent = roles[roleIndex];
                roleText.style.opacity = '1';
            }, 180);
        }, 2500);
    }

    const revealTargets = document.querySelectorAll('.reveal');

    revealTargets.forEach((target) => {
        const delay = target.dataset.delay;
        if (delay) {
            target.style.setProperty('--delay', `${delay}ms`);
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    const sectionNodes = Array.from(document.querySelectorAll('main section[id]'));

    const setActiveNav = () => {
        const marker = window.scrollY + 160;
        let activeId = sectionNodes[0]?.id || '';

        sectionNodes.forEach((section) => {
            if (marker >= section.offsetTop) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            const isActive = href === `#${activeId}`;
            link.classList.toggle('active', isActive);
        });
    };

    setActiveNav();
    window.addEventListener('scroll', setActiveNav);

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach((card) => {
                const category = card.dataset.category || '';
                const shouldHide = filter !== 'all' && category !== filter;
                card.classList.toggle('is-hidden', shouldHide);
            });
        });
    });

    const sliderTrack = document.getElementById('certificateTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('slideCounter');

    if (sliderTrack && prevBtn && nextBtn) {
        const slides = Array.from(sliderTrack.querySelectorAll('img'));
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoplayId;

        const renderSlider = () => {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            }
        };

        const goNext = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            renderSlider();
        };

        const goPrev = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            renderSlider();
        };

        const startAutoplay = () => {
            if (totalSlides <= 1) return;
            autoplayId = window.setInterval(goNext, 5200);
        };

        const stopAutoplay = () => {
            window.clearInterval(autoplayId);
        };

        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            goNext();
            startAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            goPrev();
            startAutoplay();
        });

        sliderTrack.addEventListener('mouseenter', stopAutoplay);
        sliderTrack.addEventListener('mouseleave', startAutoplay);

        renderSlider();
        startAutoplay();
    }
});


