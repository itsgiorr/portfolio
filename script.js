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

    // Add fadeOut animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bubbleFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

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
                // Clear the main viewer completely
                main.innerHTML = '';
    
                let mediaElement;
                let mediaPromise; // Promise to track media loading
    
                if (thumb.tagName.toLowerCase() === 'video') {
                    // Create a playable video
                    mediaElement = document.createElement('video');
                    const source = thumb.querySelector('source') ? thumb.querySelector('source').src : thumb.src;
                    mediaElement.src = source;
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.muted = true;
                    mediaElement.playsInline = true;

                        // Video load is usually fast enough, resolve immediately for now
                        mediaPromise = Promise.resolve();

                } else {
                    // Create a standard image
                    mediaElement = document.createElement('img');
                    mediaElement.alt = thumb.alt || 'carousel image';
                    
                    // Create a promise that resolves when the image is loaded
                    mediaPromise = new Promise(resolve => {
                        mediaElement.addEventListener('load', resolve, { once: true });
                        mediaElement.addEventListener('error', resolve, { once: true }); // Resolve even on error
                    });
                    
                    // Set the src AFTER attaching the listener
                    mediaElement.src = thumb.src; 
                }
    
                // Apply universal styling
                mediaElement.classList.add('carousel-media');
                // Set initial opacity to 0 to hide it until it's ready to fade in
                mediaElement.style.opacity = '0'; 
                main.appendChild(mediaElement);
    
                // Wait for the media (image or video) to be ready before fading in
                mediaPromise.then(() => {
                    // Force repaint using requestAnimationFrame for smooth transition
                    requestAnimationFrame(() => {
                        // Apply the transition property here (or in CSS)
                        mediaElement.style.transition = 'opacity 0.3s ease'; 
                        requestAnimationFrame(() => {
                            mediaElement.style.opacity = '1';
                        });
                    });

                    // Highlight active thumbnail
                    thumbs.forEach(t => t.classList.remove('active-thumb'));
                    thumb.classList.add('active-thumb');
                });
            });
        });
    });
});
// Ensure the closing '});' for document.addEventListener('DOMContentLoaded', function() { is still at the very end of the file.
