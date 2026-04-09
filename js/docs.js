/* ============================================
   Tools That Work — Interactive API Docs
   ============================================ */

(function () {
  'use strict';

  // --- Sidebar active link tracking ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.endpoint[id], [id].docs-section');

  if (sidebarLinks.length && sections.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sidebarLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    sections.forEach(s => obs.observe(s));
  }

  // --- Try-It panels ---
  document.querySelectorAll('.try-it-send').forEach(btn => {
    btn.addEventListener('click', async () => {
      const panel = btn.closest('.try-it');
      const responseBox = panel.querySelector('.try-it-response');
      const urlInput = panel.querySelector('[data-field="url"]');
      const bodyInput = panel.querySelector('[data-field="body"]');
      const methodSpan = panel.querySelector('[data-field="method"]');
      const apiKeyInput = panel.querySelector('[data-field="api-key"]');

      if (!responseBox) return;

      const method = methodSpan ? methodSpan.textContent.trim() : 'GET';
      const url = urlInput ? urlInput.value.trim() : '';
      const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';

      if (!url) {
        responseBox.textContent = '// Please enter a valid API URL';
        responseBox.classList.add('visible');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending...';
      responseBox.textContent = '// Sending request...';
      responseBox.classList.add('visible');

      try {
        const opts = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          }
        };

        if (apiKey) {
          opts.headers['Authorization'] = `Bearer ${apiKey}`;
        }

        if (bodyInput && bodyInput.value.trim() && method !== 'GET') {
          opts.body = bodyInput.value.trim();
        }

        const res = await fetch(url, opts);
        const contentType = res.headers.get('content-type') || '';
        let data;
        if (contentType.includes('application/json')) {
          data = await res.json();
          responseBox.textContent = `// HTTP ${res.status} ${res.statusText}\n\n${JSON.stringify(data, null, 2)}`;
        } else {
          data = await res.text();
          responseBox.textContent = `// HTTP ${res.status} ${res.statusText}\n\n${data}`;
        }
      } catch (err) {
        responseBox.textContent = `// Error: ${err.message}\n\n// This is expected for demo purposes.\n// In production, point this to your running API server.`;
      }

      btn.disabled = false;
      btn.textContent = 'Send Request';
    });
  });

  // --- Sidebar toggle on mobile ---
  const sidebarToggle = document.querySelector('.docs-sidebar-toggle');
  const sidebar = document.querySelector('.docs-sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

})();
