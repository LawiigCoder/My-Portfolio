window.addEventListener('scroll', function() {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navContent');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (navbarToggler) {
          navbarToggler.click();
        }
      }
    });
  });
  const clickableContacts = document.querySelectorAll('.clickable-contact');
  clickableContacts.forEach(contact => {
    contact.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const value = this.getAttribute('data-value');
      switch(type) {
        case 'email':
          window.location.href = `mailto:${value}`;
          break;
        case 'phone':
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `tel:${value}`;
          } else {
            navigator.clipboard.writeText(value)
              .then(() => {
                showNotification('Phone number copied to clipboard!');
              })
              .catch(err => {
                console.error('Failed to copy: ', err);
                alert(`Phone: ${value}`);
              });
          }
          break;
      }
    });
  });
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: rgba(58, 134, 255, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  document.querySelector('a[href="#home"]').classList.add('active');
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.experience-card, .project-card, .glass-card');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };
  const animatedElements = document.querySelectorAll('.experience-card, .project-card, .glass-card');
  animatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
  const skillCards = document.querySelectorAll('.glass-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.skill-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.skill-icon i');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });
});
document.getElementById('year').textContent = new Date().getFullYear();