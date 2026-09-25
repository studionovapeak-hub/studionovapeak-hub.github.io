// Nova Peak Studio — shared interactivity
(function(){
  // Mobile nav
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav-links]');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'));
    document.addEventListener('click', e=>{
      if(!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
    });
  }

  // Active link
  const path = location.pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'') || '/';
  document.querySelectorAll('[data-nav-links] a').forEach(a=>{
    const href = a.getAttribute('href') || '';
    // normalize
    const clean = href.replace(/\/index\.html$/,'/').replace(/^\.\.?\//,'/').replace(/\/$/,'') || '/';
    // simple contains check for projects/privacy
    if(clean === path || (clean !== '/' && path.startsWith(clean))) a.classList.add('active');
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in');
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal, .stagger').forEach(el=> io.observe(el));

  // Current year
  document.querySelectorAll('[data-year]').forEach(el=> el.textContent = new Date().getFullYear());

  // Render project cards if container exists
  const grid = document.querySelector('[data-project-grid]');
  if(grid && window.NOVA_DATA){
    const projects = window.NOVA_DATA.projects;
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit,10) : projects.length;
    const list = limit ? projects.slice(0, limit) : projects;
    grid.innerHTML = list.map(p=>{
      const isLive = p.status === 'Live';
      const dot = isLive ? '#2ee5b6' : '#ffb84d';
      const statusLabel = isLive ? 'Live on Play' : p.status;
      // compute relative paths depending on page depth
      // grid is on either root or /projects/ — data URLs are already relative from project pages
      // For cards we need correct hrefs: from root: projects/<slug>/ , from /projects/: <slug>/
      const depth = (location.pathname.match(/\//g)||[]).length;
      // simpler: use absolute-from-root without leading slash? We'll use relative logic
      const isProjectsIndex = location.pathname.includes('/projects/');
      const href = isProjectsIndex ? p.slug + '/' : 'projects/' + p.slug + '/';
      const privacyHref = isProjectsIndex ? '../privacy/' + p.slug + '/' : 'privacy/' + p.slug + '/';
      return `
        <article class="card">
          <div class="card-media">
            <div class="placeholder">Replace with ${p.name} hero — 1200×680</div>
            <div class="card-icon"><span>${p.type==='App' ? '◍' : '◆'}</span></div>
          </div>
          <div class="card-body">
            <div class="card-kicker"><i style="background:${dot}"></i> ${p.type} · ${p.platform} · ${statusLabel}</div>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
          </div>
          <div class="card-foot">
            <span class="tag">${p.type}</span>
            <a class="link-arrow" href="${href}">View project <span aria-hidden="true">→</span></a>
          </div>
        </article>
      `;
    }).join('');
    // re-observe
    grid.querySelectorAll('.card').forEach((c,i)=>{
      c.style.transitionDelay = (i*60)+'ms';
      c.classList.add('reveal');
      io.observe(c);
    });
  }

  // Fill studio email/placeholders
  if(window.NOVA_DATA){
    document.querySelectorAll('[data-studio-email]').forEach(el=>{
      el.textContent = window.NOVA_DATA.studio.email;
      if(el.tagName==='A') el.href = 'mailto:'+ window.NOVA_DATA.studio.email;
    });
    document.querySelectorAll('[data-play-dev]').forEach(el=>{
      el.href = window.NOVA_DATA.studio.playDeveloperUrl;
    });
  }

  // Contact form — static demo (no backend)
  const form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const prev = btn.textContent;
      btn.textContent = 'Opening email…';
      btn.disabled = true;
      const data = new FormData(form);
      const subject = encodeURIComponent('[Nova Peak] ' + (data.get('subject')||'Website inquiry'));
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`);
      const to = (window.NOVA_DATA && window.NOVA_DATA.studio.email) || 'hello@YOUR_DOMAIN.com';
      location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setTimeout(()=>{ btn.textContent = prev; btn.disabled=false; }, 1200);
    });
  }
})();
