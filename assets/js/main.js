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

  // Active link — works for relative hrefs like ../, ./, projects/, etc.
  document.querySelectorAll('[data-nav-links] a').forEach(a=>{
    try{
      const url = new URL(a.getAttribute('href'), location.href);
      const linkPath = url.pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'') || '/';
      const curPath = location.pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'') || '/';
      if(linkPath === curPath || (linkPath !== '/' && curPath === linkPath) || (linkPath !== '/' && curPath.startsWith(linkPath + '/'))) {
        a.classList.add('active');
      }
      // also catch /projects/super-block-blast/ -> highlight "Game"
      if(curPath.startsWith('/projects') && linkPath.includes('/projects')) a.classList.add('active');
      if(curPath.startsWith('/privacy') && linkPath.includes('/privacy')) a.classList.add('active');
    }catch(e){}
  });
  // deduplicate — keep only best match (longest path)
  const actives = document.querySelectorAll('[data-nav-links] a.active');
  if(actives.length > 1){
    // if home "/" and another both active, remove home
    actives.forEach(el=>{
      const href = el.getAttribute('href');
      if(href === './' || href === '../' || href === '/' || href === 'index.html'){
        if(location.pathname.replace(/\/$/,'') !== '/' && location.pathname.replace(/\/$/,'') !== '') el.classList.remove('active');
      }
    });
  }

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

  // Lightbox — click any game image to enlarge + swipe
  (function(){
    const selectors = '.shot img, .hero-gallery img, .polaroid img, .card-media img';
    const imgs = Array.from(document.querySelectorAll(selectors)).filter(img => img.src && !img.src.includes('placeholder') && img.naturalWidth !== 0);
    // also use live query on click delegation for dynamically loaded or placeholder fallback
    const getGroup = () => Array.from(document.querySelectorAll('.shot img, .hero-gallery img')).filter(i=> i.src && i.closest('.shot, .hero-gallery'));
    let current = 0;
    let group = [];
    // create lightbox DOM once
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Close">✕</button><button class="lb-prev" aria-label="Previous">‹</button><img alt=""><button class="lb-next" aria-label="Next">›</button><div class="lb-cap"></div>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const lbCap = lb.querySelector('.lb-cap');
    const update = () => {
      if(!group.length) return;
      const el = group[current];
      lbImg.src = el.src;
      lbImg.alt = el.alt || '';
      lbCap.textContent = (current+1) + ' / ' + group.length + (el.alt ? ' — ' + el.alt : '');
    };
    const open = (idx) => {
      group = getGroup();
      if(!group.length) group = [document.querySelector(selectors)];
      current = Math.max(0, Math.min(idx, group.length-1));
      update();
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
    lb.querySelector('.lb-prev').addEventListener('click', ()=>{ current = (current-1+group.length)%group.length; update(); });
    lb.querySelector('.lb-next').addEventListener('click', ()=>{ current = (current+1)%group.length; update(); });
    document.addEventListener('keydown', e=>{
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowLeft'){ current = (current-1+group.length)%group.length; update(); }
      if(e.key==='ArrowRight'){ current = (current+1)%group.length; update(); }
    });
    // swipe
    let sx=0;
    lb.addEventListener('touchstart', e=> sx=e.touches[0].clientX, {passive:true});
    lb.addEventListener('touchend', e=>{
      const dx = e.changedTouches[0].clientX - sx;
      if(Math.abs(dx) > 40){ if(dx<0){ current=(current+1)%group.length; } else { current=(current-1+group.length)%group.length; } update(); }
    }, {passive:true});
    // delegate clicks
    document.addEventListener('click', e=>{
      const img = e.target.closest('.shot img, .hero-gallery img');
      if(!img) return;
      e.preventDefault();
      group = getGroup();
      const idx = group.indexOf(img);
      open(idx>=0?idx:0);
    });
  })();

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
      const to = (window.NOVA_DATA && window.NOVA_DATA.studio.email) || 'studionovepeak@gmail.com';
      // Use an anchor click — more reliable than location.href for mailto
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
      const anchor = document.createElement('a');
      anchor.href = mailto;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      // fallback
      setTimeout(()=>{ try{ window.location.href = mailto; }catch(e){} }, 200);
      setTimeout(()=>{ btn.textContent = prev; btn.disabled=false; anchor.remove(); }, 1200);
    });
  }
})();
