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
                modal.style.animation = 'fadeInUp 0.4s ease';
                document.body.style.overflow = 'hidden'; // prevent background scroll
            }
        });
    });

    // Close modal (×)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.animation = 'fadeOutDown 0.3s ease';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 250);
        });
    });

    // Close modal by clicking outside
    window.addEventListener('click', e => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOutDown 0.3s ease';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 250);
            }
        });
    });

    // Close modal with ESC key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });

// ---------- IMAGE + VIDEO CAROUSEL ----------
    document.querySelectorAll('.carousel').forEach(carousel => {
        const main = carousel.querySelector('.carousel-main');
        const thumbs = carousel.querySelectorAll('.carousel-thumbs img, .carousel-thumbs video');
    
        if (!main || thumbs.length === 0) return;
    
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Clear the main viewer completely and reset any video state
                main.innerHTML = '';
    
                let mediaElement;
                let mediaPromise;
    
                if (thumb.tagName.toLowerCase() === 'video') {
                    // Create a playable video
                    mediaElement = document.createElement('video');
                    const source = thumb.getAttribute('src');
                    mediaElement.src = source;
                    mediaElement.controls = false;
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.muted = true;
                    mediaElement.playsInline = true;
                    
                    // Video ready promise
                    mediaPromise = new Promise(resolve => {
                        mediaElement.addEventListener('loadeddata', resolve, { once: true });
                        mediaElement.addEventListener('error', resolve, { once: true });
                    });
    
                } else {
                    // Create a standard image
                    mediaElement = document.createElement('img');
                    mediaElement.alt = thumb.alt || 'carousel image';
                    
                    // Image load promise
                    mediaPromise = new Promise(resolve => {
                        mediaElement.addEventListener('load', resolve, { once: true });
                        mediaElement.addEventListener('error', resolve, { once: true });
                    });
                    
                    mediaElement.src = thumb.src;
                }
    
                // Apply universal styling
                mediaElement.classList.add('carousel-media');
                mediaElement.style.opacity = '0';
                mediaElement.style.width = '100%';
                mediaElement.style.height = '100%';
                mediaElement.style.objectFit = 'contain';
                mediaElement.style.borderRadius = '8px';
                mediaElement.style.backgroundColor = '#000';
                
                main.appendChild(mediaElement);
    
                // Wait for media to be ready before showing
                mediaPromise.then(() => {
                    // Force repaint for smooth transition
                    requestAnimationFrame(() => {
                        mediaElement.style.transition = 'opacity 0.3s ease';
                        requestAnimationFrame(() => {
                            mediaElement.style.opacity = '1';
                        });
                    });
    
                    // Highlight active thumbnail
                    thumbs.forEach(t => t.classList.remove('active-thumb'));
                    thumb.classList.add('active-thumb');
                }).catch(() => {
                    // Fallback: show immediately even if load fails
                    mediaElement.style.opacity = '1';
                    thumbs.forEach(t => t.classList.remove('active-thumb'));
                    thumb.classList.add('active-thumb');
                });
            });
        });
    
        // Auto-click the first thumbnail to initialize each carousel
        if (thumbs.length > 0) {
            thumbs[0].click();
        }
    });
});
