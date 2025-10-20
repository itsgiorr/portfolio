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

    // ---------- SIMPLE CAROUSEL ----------
    document.querySelectorAll('.carousel').forEach(carousel => {
        const main = carousel.querySelector('.carousel-main');
        const thumbs = carousel.querySelectorAll('.carousel-thumbs img, .carousel-thumbs video');
        
        if (!main || thumbs.length === 0) return;

        // Get all media elements that are already in the main area (hidden)
        const mainMedia = main.querySelectorAll('img, video');
        
        // Hide all main media initially (except the active one)
        mainMedia.forEach(media => {
            if (!media.classList.contains('active')) {
                media.style.display = 'none';
            }
        });

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const thumbSrc = this.src;
                
                // Find the corresponding main media element
                let targetMedia = null;
                mainMedia.forEach(media => {
                    if (media.src === thumbSrc || media.querySelector('source')?.src === thumbSrc) {
                        targetMedia = media;
                    }
                });

                // If we found a matching media element, show it
                if (targetMedia) {
                    // Hide all media
                    mainMedia.forEach(media => {
                        media.style.display = 'none';
                        media.classList.remove('active');
                    });
                    
                    // Show the target media
                    targetMedia.style.display = 'block';
                    targetMedia.classList.add('active');
                    
                    // If it's a video, play it
                    if (targetMedia.tagName.toLowerCase() === 'video') {
                        targetMedia.play().catch(e => console.log('Video play failed:', e));
                    }
                } else {
                    // Fallback: create and show the media
                    let mediaElement;
                    if (this.tagName.toLowerCase() === 'video') {
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
                    
                    mediaElement.style.width = '100%';
                    mediaElement.style.height = '100%';
                    mediaElement.style.objectFit = 'contain';
                    
                    main.innerHTML = '';
                    main.appendChild(mediaElement);
                }

                // Update active thumbnail
                thumbs.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });
        });

        // Auto-click first thumbnail
        if (thumbs.length > 0) {
            thumbs[0].click();
        }
    });
});
