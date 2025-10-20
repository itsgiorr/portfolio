document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // ---------- MOBILE MENU ----------
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // ---------- PROJECT MODALS ----------
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Initialize carousel for this modal if it has one
                initializeCarousel(modal);
            }
        });
    });

    // Close modal (×)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Close modal by clicking outside
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close modal with ESC key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ---------- CAROUSEL FUNCTION ----------
    function initializeCarousel(modal) {
        const carousel = modal.querySelector('.carousel');
        if (!carousel) return; // Some modals don't have carousels

        const main = carousel.querySelector('.carousel-main');
        const thumbs = carousel.querySelectorAll('.carousel-thumbs img, .carousel-thumbs video');

        if (!main || thumbs.length === 0) return;

        // Clear main area first
        main.innerHTML = '';

        // Add click listeners to thumbnails
        thumbs.forEach((thumb, index) => {
            // Remove existing listeners by cloning
            const newThumb = thumb.cloneNode(true);
            thumb.parentNode.replaceChild(newThumb, thumb);

            newThumb.addEventListener('click', function() {
                // Clear main area
                main.innerHTML = '';

                let mediaElement;
                const isVideo = this.tagName.toLowerCase() === 'video';

                if (isVideo) {
                    mediaElement = document.createElement('video');
                    mediaElement.src = this.src;
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.muted = true;
                    mediaElement.playsInline = true;
                    mediaElement.controls = false;
                } else {
                    mediaElement = document.createElement('img');
                    mediaElement.src = this.src;
                    mediaElement.alt = this.alt || 'Carousel image';
                }

                // Apply styles
                mediaElement.style.width = '100%';
                mediaElement.style.height = '100%';
                mediaElement.style.objectFit = 'contain';
                mediaElement.style.borderRadius = '8px';
                mediaElement.style.backgroundColor = '#000';

                main.appendChild(mediaElement);

                // Update active thumbnails
                thumbs.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });

            // Auto-click first thumbnail
            if (index === 0) {
                newThumb.click();
            }
        });
    }
});
