/* Extra JS for Sanjoy Mondal site */

document$.subscribe(function() {

  /* ── Giscus comments on blog posts ───────────────────── */
  var isPost = document.querySelector('.md-content article');
  var isBlogPost = window.location.pathname.indexOf('/blog/') !== -1
                && window.location.pathname !== '/blog/'
                && window.location.pathname.indexOf('/blog/index') === -1;

  if (isPost && isBlogPost) {
    var existing = document.querySelector('.giscus-frame');
    if (!existing) {
      var container = document.createElement('div');
      container.className = 'giscus-frame';

      /*
       * SETUP GISCUS:
       * 1. Go to https://giscus.app
       * 2. Enter your repo: writersanjoy/writersanjoy.github.io
       * 3. Choose "pathname" mapping
       * 4. Choose a Discussions category (create "Reader Comments" first)
       * 5. Copy the data-repo-id and data-category-id values below
       */
      var script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'writersanjoy/writersanjoy.github.io');
      script.setAttribute('data-repo-id', 'YOUR_REPO_ID');        /* ← fill from giscus.app */
      script.setAttribute('data-category', 'Reader Comments');
      script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); /* ← fill from giscus.app */
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', 'light');
      script.setAttribute('data-lang', 'bn');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      container.appendChild(script);

      var content = document.querySelector('.md-content__inner');
      if (content) content.appendChild(container);
    }
  }

  /* ── Newsletter form feedback ─────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var btn = form.querySelector('button');
      if (btn) {
        btn.textContent = 'পাঠানো হচ্ছে...';
        btn.disabled = true;
      }
    });
  });

  /* ── Contact form feedback ────────────────────────────── */
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'পাঠানো হচ্ছে...';
        btn.disabled = true;
      }
    });
  }

});
