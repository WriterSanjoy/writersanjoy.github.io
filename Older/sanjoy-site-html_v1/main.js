/* main.js — সঞ্জয় মণ্ডল */

function toggleMenu() {
  var nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

/* Close menu when a link is clicked */
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  /* Contact form feedback */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      var btn = document.getElementById('submitBtn');
      var msg = document.getElementById('formMsg');
      if (btn) {
        btn.textContent = 'পাঠানো হচ্ছে...';
        btn.disabled = true;
      }
      /* Show success message after a moment */
      setTimeout(function() {
        if (msg) {
          msg.style.display = 'block';
        }
      }, 1500);
    });
  }

  /* Subscribe form feedback */
  var subForms = document.querySelectorAll('.subscribe-form');
  subForms.forEach(function(form) {
    form.addEventListener('submit', function() {
      var btn = form.querySelector('button');
      if (btn) {
        btn.textContent = 'ধন্যবাদ!';
        btn.disabled = true;
      }
    });
  });
});
