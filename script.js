document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const robotSpeech = document.getElementById('robotSpeech');
    const robotGuide = document.getElementById('robotGuide');

    // Mobile menu toggle
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

    // Enhanced navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Robot interactions
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

    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Robot speech rotation
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

    // Change robot message every 5 seconds
    setInterval(updateRobotSpeech, 5000);

    // Robot click interaction
    if (robotGuide) {
        robotGuide.addEventListener('click', function() {
            updateRobotSpeech();
        });

        // Add hover effect
        robotGuide.style.cursor = 'pointer';
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bubbleFadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
