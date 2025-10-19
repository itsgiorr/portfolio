document.addEventListener('DOMContentLoaded', () => {
  /* ==============================
     NAVBAR + MOBILE MENU
  =============================== */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  // Toggle menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 2px 20px rgba(0, 0, 0, 0.15)'
      : '0 2px 10px rgba(0, 0, 0, 0.1)';
  });

  /* ==============================
     PROJECT MODALS
  =============================== */
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
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal (× button)
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

  // Close modal with Escape key
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
  });

  /* ==============================
     IMAGE + VIDEO CAROUSEL
  =============================== */
  document.querySelectorAll('.carousel').forEach(carousel => {
    const main = carousel.querySelector('.carousel-main');
    const thumbs = carousel.querySelectorAll('.carousel-thumbs img, .carousel-thumbs video');
    if (!main || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Clear previous media
        main.innerHTML = '';

        if (thumb.tagName.toLowerCase() === 'video') {
          // Video thumbnail clicked
          const newVid = document.createElement('video');
          newVid.src = thumb.querySelector('source') ? thumb.querySelector('source').src : thumb.src;
          newVid.autoplay = true;
          newVid.loop = true;
          newVid.muted = true;
          newVid.playsInline = true;
          newVid.classList.add('carousel-media');
          main.appendChild(newVid);
        } else {
          // Image thumbnail clicked (includes GIFs)
          const newImg = document.createElement('img');
          newImg.src = thumb.src;
          newImg.alt = thumb.alt || 'carousel image';
          newImg.classList.add('carousel-media');
          main.appendChild(newImg);
        }

        // Highlight active thumbnail
        thumbs.forEach(t => t.classList.remove('active-thumb'));
        thumb.classList.add('active-thumb');
      });
    });
  });
});
