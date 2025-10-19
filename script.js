document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const robotSpeech = document.getElementById('robotSpeech');
    const robotGuide = document.getElementById('robotGuide');

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

    // ---------- ROBOT SPEECH ----------
    const robotMessages = {
        'index.html': [
            "Welcome! I'm your guide through Jorge's portfolio. Click on the navigation above to explore!",
            "Jorge is passionate about humanoid robotics - just like me!",
            "Want to learn more? Check out the About or Projects pages!"
        ],
        'about.html': [
            "Learn about Jorge's background and passion for robotics!",
            "Jorge brings a unique Venezuelan perspective to engineering!",
            "Did you know Jorge is interested in humanoid robotics? That's why I'm here!"
        ],
        'projects.html': [
            "Check out Jorge's engineering projects and innovations!",
            "These projects showcase Jorge's technical skills and creativity!",
            "Impressed? Wait until you see what's coming next!"
        ],
        'contact.html': [
            "Ready to connect? Reach out to Jorge here!",
            "Jorge loves collaborating on robotics projects!",
            "Don't be shy - send Jorge a message!"
        ]
    };

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let messageIndex = 0;
    const messages = robotMessages[currentPage] || robotMessages['index.html'];

    function updateRobotSpeech() {
        if (robotSpeech && messages) {
            robotSpeech.style.animation = 'bubbleFadeOut 0.3s ease-out';
            setTimeout(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                robotSpeech.textContent = messages[messageIndex];
                robotSpeech.style.animation = 'bubbleFadeIn 0.5s ease-in';
            }, 300);
        }
    }

    setInterval(updateRobotSpeech, 5000);

    if (robotGuide) {
        robotGuide.addEventListener('click', updateRobotSpeech);
        robotGuide.style.cursor = 'pointer';
    }

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
                // Clear existing main content
                main.innerHTML = '';

                // Handle video thumbnails
                if (thumb.tagName.toLowerCase() === 'video') {
                    const newVid = document.createElement('video');
                    newVid.src = thumb.src;
                    newVid.autoplay = true;
                    newVid.loop = true;
                    newVid.muted = true;
                    newVid.playsInline = true;
                    newVid.style.width = '100%';
                    newVid.style.height = '100%';
                    newVid.style.objectFit = 'cover';
                    main.appendChild(newVid);
                }
                // Handle image thumbnails
                else {
                    const newImg = document.createElement('img');
                    newImg.src = thumb.src;
                    newImg.alt = thumb.alt || 'carousel image';
                    newImg.classList.add('active');
                    newImg.style.width = '100%';
                    newImg.style.height = '100%';
                    newImg.style.objectFit = 'cover';
                    main.appendChild(newImg);
                }

                // Highlight active thumbnail
                thumbs.forEach(t => t.classList.remove('active-thumb'));
                thumb.classList.add('active-thumb');
            });
        });
    });
});
