(function () {
  const D = window.PERSONA;
  const S = window.Shape;
  const root = document.getElementById('app');
  const ROLES = D.roles.filter((r) => r.kind === 'role');
  const MODES = D.roles.filter((r) => r.kind === 'mode');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  /* ---------- 共用：導覽（四個分頁）、色條、頁尾 ---------- */
  const TABS = [
    { id: 'roles', href: '#/', label: '五個角色' },
    { id: 'modes', href: '#/modes', label: '四種功能' },
    { id: 'order', href: '#/order', label: '出場順序' },
    { id: 'rules', href: '#/rules', label: '共用規則' }
  ];
  function nav(cur) {
    return `<nav class="bar wrap" aria-label="主要">
      <a class="mark" href="#/">陪伴者角色設定</a>
      <div class="links">${TABS.map((t) => `<a href="${t.href}"${t.id === cur ? ' class="is-on" aria-current="page"' : ''}>${t.label}</a>`).join('')}</div>
    </nav>`;
  }

  function stripe(n) {
    const cols = ROLES.map((r) => S.BODIES[r.shape].fill);
    let out = '';
    for (let i = 0; i < (n || 20); i++) out += `<i style="background:${cols[i % 5]}"></i>`;
    return `<div class="stripe" aria-hidden="true">${out}</div>`;
  }

  function footer() {
    const blocks = ROLES.map((r) => ({ id: r.id, c: S.BODIES[r.shape].fill, h: { 'safe-base': 0.6, mirror: 0.7, peer: 0.82, coach: 0.9, guardian: 1 }[r.id] }));
    const W = 1200, H = 320, gap = 4, bw = (W - gap * 4) / 5;
    let x = 0;
    const svg = blocks.map((b) => {
      const h = H * b.h; const y = H - h;
      const el = b.id === 'coach' ? `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="40" fill="${b.c}"/>`
        : b.id === 'guardian' ? `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="18" fill="${b.c}"/>`
        : b.id === 'peer' ? `<circle cx="${x + bw / 2}" cy="${H - bw / 2}" r="${bw / 2}" fill="${b.c}"/>`
        : `<ellipse cx="${x + bw / 2}" cy="${H - h / 2}" rx="${bw / 2}" ry="${h / 2}" fill="${b.c}"/>`;
      x += bw + gap; return el;
    }).join('');
    return `<footer class="foot" id="foot">
      <div class="wrap">
        <div class="foot-grid">
          <div data-reveal><p class="foot-h">五個角色</p>${ROLES.map((r) => `<a href="#/role/${r.id}">${r.name}</a>`).join('')}</div>
          <div data-reveal><p class="foot-h">四種功能</p>${MODES.map((r) => `<a href="#/role/${r.id}">${r.name}</a>`).join('')}</div>
          <div data-reveal><p class="foot-h">系統</p><a href="#/order">出場優先順序</a><a href="#/rules">共用規則</a></div>
        </div>
        <div class="foot-last"><span>陪伴者角色設定網站</span><a class="btn btn-sm" href="#top">回到頂端</a></div>
      </div>
    </footer>`;
  }

  /* ---------- 分頁一：五個角色（首頁） ---------- */
  function rolesPage() {
    return `${nav('roles')}
    <header class="ohero" id="top">
      <div class="ohero-text">
        <h1 class="dhero-h">孩子可以選的五顆形狀</h1>
        <p class="dhero-tag">數位學習陪伴者的角色設定手冊</p>
      </div>
    </header>
    <section class="menu wrap" id="roles" aria-labelledby="roles-h">
      <h2 id="roles-h" class="sr-only">角色清單</h2>
      <ul class="menu-list">
        ${ROLES.map((r) => `<li>
          <a class="menu-item" href="#/role/${r.id}" style="background:${S.BODIES[r.shape].tint}">
            <div>
              <p class="menu-name"><span>${r.name}</span><span class="menu-owner">${r.tagline}</span></p>
              <p class="menu-desc">${r.intro[0]}</p>
            </div>
          </a>
        </li>`).join('')}
      </ul>
    </section>
    ${footer()}`;
  }
  function bindRoles() {}

  /* ---------- 分頁二：四種功能 ---------- */
  function modesPage() {
    return `${nav('modes')}
    <header class="ohero" id="top">
      <div class="ohero-text">
        <h1 class="dhero-h" data-reveal>四種延伸功能</h1>
        <p class="dhero-tag" data-reveal>某個時刻才出現的動作，由核心角色執行。</p>
        <p class="dhero-p" data-reveal>講解在完全不會時、回顧在孩子想看時、挑戰在熟練後、故事在想放棄時。它們沒有常駐的關係，所以做成模式與物件，孩子只需要認識五顆形狀。</p>
      </div>
    </header>
    <section class="menu wrap" id="modes" aria-labelledby="modes-h">
      <h2 id="modes-h" class="sr-only">功能清單</h2>
      <ul class="menu-list">
        ${MODES.map((m) => `<li data-reveal>
          <a class="menu-item" href="#/role/${m.id}" style="background:${S.BODIES[m.shape].tint}">
            <div>
              <p class="menu-name"><span>${m.name}</span><span class="menu-owner">負責：${m.owner}</span></p>
              <p class="menu-desc">${m.intro[0]}</p>
            </div>
          </a>
        </li>`).join('')}
      </ul>
    </section>
    ${footer()}`;
  }

  /* ---------- 分頁三：出場順序 ---------- */
  function orderPage() {
    return `${nav('order')}
    <header class="ohero" id="top">
      <div class="ohero-text">
        <h1 class="dhero-h" data-reveal>誰先說話</h1>
        <p class="dhero-tag" data-reveal>同一時刻只有一個角色或功能在說話。</p>
        <p class="dhero-p" data-reveal>衝突時依這個順序讓位：安全第一，孩子自己按的停排在系統任何判斷之前，情緒先於教學，結構先於認知，肯定最後。點每一格看規則。</p>
      </div>
      <div class="acc" id="acc">
        ${D.priority.map((p, i) => `<div class="acc-panel${i === 0 ? ' is-open' : ''}" data-i="${i}">
          <button class="acc-btn" aria-expanded="${i === 0}"><span class="acc-name">${p.name}</span></button>
          <div class="acc-body"><p>${p.text}</p></div>
        </div>`).join('')}
      </div>
    </header>

    <section class="dsec wrap" aria-labelledby="h-sig">
      <div class="dsec-grid">
        <div><h2 id="h-sig">什麼算可靠訊號</h2></div>
        <p class="osay" data-reveal>${D.signals}</p>
      </div>
    </section>

    <section class="dsec wrap" aria-labelledby="h-hand">
      <div class="dsec-grid">
        <div><h2 id="h-hand">交接條件</h2></div>
        <ul class="hand">${D.handover.map(([a, b, c]) => `<li data-reveal>
          <p class="hand-ab"><span>${a}</span><span class="hand-arrow" aria-hidden="true"></span><span>${b}</span></p>
          <p class="hand-c">${c}</p>
        </li>`).join('')}</ul>
      </div>
    </section>

    <section class="dsec wrap" aria-labelledby="h-int">
      <div class="dsec-grid">
        <div><h2 id="h-int">被打斷後怎麼回來</h2></div>
        <p class="osay" data-reveal>${D.interrupt}</p>
      </div>
    </section>
    ${footer()}`;
  }
  function bindOrder() {
    document.querySelectorAll('.acc-panel').forEach((p) => p.querySelector('.acc-btn').addEventListener('click', () => {
      document.querySelectorAll('.acc-panel').forEach((x) => { const on = x === p; x.classList.toggle('is-open', on); x.querySelector('.acc-btn').setAttribute('aria-expanded', on); });
    }));
  }

  /* ---------- 分頁四：共用規則 ---------- */
  function rulesPage() {
    return `${nav('rules')}
    <header class="ohero" id="top">
      <div class="ohero-text">
        <h1 class="dhero-h" data-reveal>五個角色共用的規則</h1>
        <p class="dhero-tag" data-reveal>回饋、拒絕、禁用詞、撤除、資料、年齡。</p>
        <p class="dhero-p" data-reveal>這些規則寫在台詞庫與互動邏輯的最上層，每一型都要遵守。</p>
      </div>
    </header>
    <section class="faq wrap" id="rules" aria-labelledby="rules-h">
      <h2 id="rules-h" class="sr-only">規則問答</h2>
      <div class="faq-grid">
        <div class="qlist" role="tablist" aria-label="共用規則">${D.rules.map((q, i) => `<button role="tab" data-reveal aria-selected="${i === 0}" data-i="${i}"${i === 0 ? ' class="is-on"' : ''}><span>${q.tab}</span><span>${q.q}</span></button>`).join('')}</div>
        <div class="answer" id="answer" data-reveal><div class="answer-in"><h3>${D.rules[0].q}</h3>${D.rules[0].a.map((a) => `<p>${a}</p>`).join('')}</div></div>
      </div>
    </section>
    <section class="principles" id="principles" aria-labelledby="pr-h">
      <div class="wrap pr-grid">
        <h2 id="pr-h">所有角色都要遵守的五條原則</h2>
        <ol class="pr-list">${D.principles.map((p) => `<li data-reveal>${p}</li>`).join('')}</ol>
      </div>
    </section>
    ${footer()}`;
  }
  function bindRules() {
    const qs = document.querySelectorAll('.qlist [role=tab]');
    qs.forEach((b) => b.addEventListener('click', () => {
      qs.forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
      const q = D.rules[Number(b.dataset.i)];
      const box = document.querySelector('#answer .answer-in');
      box.classList.add('hidden');
      later(() => { box.innerHTML = `<h3>${q.q}</h3>${q.a.map((a) => `<p>${a}</p>`).join('')}`; box.classList.remove('hidden'); }, 200);
    }));
  }

  /* ---------- 角色頁 ---------- */
  function dl(rows) {
    return `<dl class="dl">${rows.map(([t, d]) => `<div data-reveal><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;
  }
  function dots(v) {
    if (!v) return '';
    let s = '';
    for (let i = 1; i <= 5; i++) s += `<i class="${i <= v ? 'on' : ''}"></i>`;
    return `<span class="dots" aria-hidden="true">${s}</span>`;
  }

  function detail(r) {
    const b = S.BODIES[r.shape];
    const group = r.kind === 'role' ? ROLES : MODES;
    const idx = group.indexOf(r);
    const prev = group[(idx + group.length - 1) % group.length];
    const next = group[(idx + 1) % group.length];
    return `${nav(r.kind === 'role' ? 'roles' : 'modes')}
    <header class="dhero" id="top" style="background:${b.tint}">
      <div class="dhero-text" data-reveal>
        <p class="dhero-kicker">${r.kind === 'role' ? '核心角色' : '延伸功能'}<span>${r.en}</span></p>
        <h1 class="dhero-h" data-reveal>${r.name}</h1>
        <p class="dhero-tag" data-reveal>${r.tagline}</p>
        ${r.intro.map((x) => `<p class="dhero-p" data-reveal>${x}</p>`).join('')}
        <a class="btn" href="#talk">聽它說話</a>
      </div>
    </header>

    <section class="dsec wrap" aria-labelledby="h-pos">
      <div class="dsec-grid">
        <div><h2 id="h-pos">${r.kind === 'role' ? '角色定位' : '功能定位'}</h2>${r.positionNote ? `<p class="dsec-note">${r.positionNote}</p>` : ''}</div>
        ${dl(r.position)}
      </div>
    </section>

    <section class="dsec wrap" aria-labelledby="h-ref">
      <div class="dsec-grid">
        <div><h2 id="h-ref">文獻來源</h2></div>
        <ul class="refs">${(window.REFS[r.id] || []).map((f) => `<li data-reveal${f.risk ? ' class="risk"' : ''}><p class="ref-who">${f.who}${f.risk ? '<span>負面效果的依據</span>' : ''}</p><p class="ref-theory">${f.theory}</p><p class="ref-what">${f.what}</p></li>`).join('')}</ul>
      </div>
    </section>

    <section class="dsec wrap" aria-labelledby="h-knob">
      <div class="dsec-grid">
        <div><h2 id="h-knob">個性特徵</h2>${r.character ? `<p class="dsec-note">${r.character}</p>` : ''}</div>
        <ul class="knobs">${r.knobs.map(([n, v, k]) => `<li data-reveal><span class="knob-n">${n}</span>${dots(k)}<span class="knob-v">${v}</span></li>`).join('')}</ul>
      </div>
    </section>

    <section class="dsec wrap vis" aria-labelledby="h-vis" style="--tint:${b.tint}">
      <div class="dsec-grid">
        <div><h2 id="h-vis">視覺表現</h2><p class="dsec-note">必備狀態：${r.states.join('、')}</p></div>
        ${dl(r.visual)}
      </div>
    </section>

    ${r.behaviour.length ? `<section class="dsec wrap" aria-labelledby="h-beh">
      <div class="dsec-grid">
        <div><h2 id="h-beh">互動方式</h2></div>
        <ul class="plain">${r.behaviour.map((x) => `<li data-reveal>${x}</li>`).join('')}</ul>
      </div>
    </section>` : ''}

    <section class="talk" id="talk" aria-labelledby="h-talk" style="--tint:${b.tint}">
      <div class="wrap talk-grid">
        <div class="talk-side">
          <h2 id="h-talk">情境與台詞</h2>
          <div class="scenes" role="tablist" aria-label="情境">${r.scenes.map((sc, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}"${i === 0 ? ' class="is-on"' : ''}>${sc.when}</button>`).join('')}</div>
        </div>
        <div class="chat" id="chat" aria-live="polite"></div>
      </div>
    </section>

    <section class="dsec wrap exit" aria-labelledby="h-exit">
      <div class="dsec-grid">
        <div><h2 id="h-exit">設計界線</h2></div>
        <div>
          <ul class="plain">${r.care.map((x) => `<li data-reveal>${x}</li>`).join('')}</ul>
          ${dl(r.exit)}
        </div>
      </div>
    </section>

    <nav class="pager wrap" aria-label="上一個與下一個">
      <a href="#/role/${prev.id}"><span class="pager-k">上一個</span><span class="pager-n">${prev.name}</span></a>
      <a href="#/role/${next.id}"><span class="pager-k">下一個</span><span class="pager-n">${next.name}</span></a>
    </nav>
    ${footer()}`;
  }

  function playScene(r, i, instant) {
    clearTimers();
    const sc = r.scenes[i];
    const chat = document.getElementById('chat');
    const wait = instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2400;
    chat.innerHTML = `
      <p class="chat-scene"><span>情境</span>${sc.when}</p>
      <p class="chat-does">${r.name}會：${sc.does}</p>
      <div class="bubble bubble-wait" id="wait"><span class="dots-wait"><i></i><i></i><i></i></span></div>
      ${sc.say.map((s, k) => `<div class="msg hidden" data-k="${k}"><div class="bubble">${s}</div></div>`).join('')}
      <div class="msg msg-wrong hidden" data-k="${sc.say.length}"><div class="bubble bubble-wrong"><span>最容易踩的錯</span>${sc.wrong}</div></div>`;
    const reveal = () => {
      const w = document.getElementById('wait'); if (w) w.remove();
      chat.querySelectorAll('.msg').forEach((m, k) => later(() => m.classList.remove('hidden'), k * 700));
    };
    if (wait) later(reveal, wait); else reveal();
  }

  function bindDetail(r, talk) {
    const btns = document.querySelectorAll('.scenes [role=tab]');
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
      playScene(r, Number(b.dataset.i));
    }));
    playScene(r, 0, true);
    if (talk) later(() => document.getElementById('talk').scrollIntoView(), 50);
  }

  function reveals() { document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in')); }

  /* ---------- 路由：#/ 五個角色、#/modes、#/order、#/rules、#/role/:id ---------- */
  let current = '';
  function show(key, title, html, bind) {
    document.title = title;
    root.innerHTML = html;
    current = key;
    window.scrollTo(0, 0);
    if (bind) bind();
    reveals();
  }
  function route() {
    clearTimers();
    const h = location.hash || '#/';
    // 頁內錨點（#top、#talk、#roles）：只捲動，頁面不重畫
    if (!h.startsWith('#/')) {
      const el = document.getElementById(h.slice(1)); if (el) el.scrollIntoView(); return;
    }
    const m = h.match(/^#\/role\/([a-z-]+)(\/talk)?/);
    if (m) {
      const r = D.roles.find((q) => q.id === m[1]);
      if (r) { show('role:' + r.id, r.name + ' · 陪伴者角色設定', detail(r), () => bindDetail(r, !!m[2])); return; }
    }
    if (/^#\/modes/.test(h)) { show('modes', '四種延伸功能 · 陪伴者角色設定', modesPage()); return; }
    if (/^#\/order/.test(h)) { show('order', '出場優先順序 · 陪伴者角色設定', orderPage(), bindOrder); return; }
    if (/^#\/rules/.test(h)) { show('rules', '共用規則 · 陪伴者角色設定', rulesPage(), bindRules); return; }
    if (current !== 'roles') show('roles', '陪伴者角色設定', rolesPage(), bindRoles);
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
