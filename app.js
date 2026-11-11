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
  let selectedMoment = 0;
  function momentCards(index) {
    return ROLES.map((r) => {
      const moment = r.platform[index];
      const quiet = !moment.say.length;
      const eye = index === 1 || index === 3 ? 'smile' : r.eye;
      return `<article class="moment-role" style="--moment-tint:${S.BODIES[r.shape].tint}" aria-labelledby="moment-name-${r.id}">
        <div class="moment-figure">${S.svg(r.shape, { eye, gaze: r.gaze })}</div>
        <h3 id="moment-name-${r.id}">${esc(r.name)}</h3>
        <div class="moment-bubble${quiet ? ' is-quiet' : ''}">${quiet ? '<span>（不說話）</span>' : esc(moment.say.join(' '))}</div>
      </article>`;
    }).join('');
  }
  function momentCompare() {
    return `<section class="moments wrap" id="moments" aria-labelledby="moments-h">
      <h2 id="moments-h">同一個時刻，五種反應</h2>
      <div class="moments-layout">
        <div class="moment-tabs" role="tablist" aria-label="選擇課堂情境" aria-orientation="vertical">${ROLES[0].platform.map((p, i) => `<button type="button" role="tab" id="moment-tab-${i}" aria-controls="moment-panel" aria-selected="${i === selectedMoment}" tabindex="${i === selectedMoment ? 0 : -1}" data-moment="${i}"><span class="moment-number" aria-hidden="true">0${i + 1}</span><span>${esc(p.when)}</span></button>`).join('')}</div>
        <div class="moment-scroll" id="moment-panel" role="tabpanel" aria-labelledby="moment-tab-${selectedMoment}" tabindex="0">
          <div class="moment-lineup" aria-live="polite" aria-atomic="true">${momentCards(selectedMoment)}</div>
        </div>
      </div>
    </section>`;
  }
  function compareTable() {
    const C = D.compare;
    const head = ROLES.map((r) => `<th scope="col" style="background:${S.BODIES[r.shape].tint}"><a href="#/role/${r.id}"><span class="cmp-name">${r.name}</span><span class="cmp-en">${r.en}</span></a></th>`).join('');
    const body = C.rows.map((row) => `<tr>
      <th scope="row">${row.name}</th>
      ${row.cells.map((c, i) => `<td>${row.dots ? dots(row.dots[i]) : ''}<span>${c}</span></td>`).join('')}
    </tr>`).join('');
    return `<section class="cmp wrap" id="compare" aria-labelledby="cmp-h">
      <div class="cmp-head">
        <h2 id="cmp-h">五顆放在一起看</h2>
        <p>${C.lead}</p>
      </div>
      <div class="cmp-scroll" tabindex="0">
        <table class="cmp-table">
          <thead><tr><th scope="col"><span class="sr-only">比較項目</span></th>${head}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>`;
  }
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
      <div class="role-menu-scroll" tabindex="0" role="region" aria-label="五個角色入口">
      <ul class="menu-list role-menu-list">
        ${ROLES.map((r) => `<li>
          <a class="menu-item" href="#/role/${r.id}" style="background:${S.BODIES[r.shape].tint}">
            <div>
              <p class="menu-name"><span>${r.name}</span><span class="menu-owner">${r.tagline}</span></p>
              <p class="menu-desc">${r.intro[0]}</p>
            </div>
          </a>
        </li>`).join('')}
      </ul>
      </div>
    </section>
    ${compareTable()}
    ${momentCompare()}
    ${footer()}`;
  }
  function bindRoles() {
    const buttons = Array.from(document.querySelectorAll('[data-moment]'));
    const panel = document.getElementById('moment-panel');
    const choose = (index) => {
      selectedMoment = index;
      buttons.forEach((button, i) => {
        button.setAttribute('aria-selected', String(i === index));
        button.tabIndex = i === index ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', buttons[index].id);
      panel.querySelector('.moment-lineup').innerHTML = momentCards(index);
    };
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => choose(index));
      button.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowDown') next = (index + 1) % buttons.length;
        else if (event.key === 'ArrowUp') next = (index + buttons.length - 1) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        choose(next);
        buttons[next].focus();
      });
    });
  }

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
  function ruleAnswer(q) {
    const refs = q.refs && q.refs.length
      ? `<div class="rule-sources"><h4>研究與理論來源</h4><ul class="refs">${q.refs.map((f) => `<li><p class="ref-who">${f.who}</p><p class="ref-theory">${f.theory}</p><p class="ref-what">${f.what}</p></li>`).join('')}</ul></div>`
      : '';
    return `<h3>${q.q}</h3>${q.a.map((a) => `<p>${a}</p>`).join('')}${refs}`;
  }
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
        <div class="answer" id="answer" data-reveal><div class="answer-in">${ruleAnswer(D.rules[0])}</div></div>
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
      later(() => { box.innerHTML = ruleAnswer(q); box.classList.remove('hidden'); }, 200);
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

  const folderSelections = new Map();
  const FOLDER_TABS = [
    { id: 'profile', label: '角色設定' },
    { id: 'reference', label: '文獻來源' },
    { id: 'dialogue', label: '情境台詞' },
    { id: 'boundaries', label: '設計界線' }
  ];
  function detail(r, openTalk) {
    const b = S.BODIES[r.shape];
    const group = r.kind === 'role' ? ROLES : MODES;
    const idx = group.indexOf(r);
    const prev = group[(idx + group.length - 1) % group.length];
    const next = group[(idx + 1) % group.length];
    const activeFolder = openTalk ? 'dialogue' : (folderSelections.get(r.id) || 'profile');
    return `${nav(r.kind === 'role' ? 'roles' : 'modes')}
    <header class="dhero dossier-hero" id="top">
      <div class="dossier-avatar">${S.svg(r.shape, { eye: r.eye, gaze: r.gaze })}</div>
      <div class="dhero-text">
        <p class="dhero-kicker">${r.kind === 'role' ? '核心角色' : '延伸功能'}<span>${r.en}</span></p>
        <h1 class="dhero-h">${r.name}</h1>
        <p class="dhero-tag">${r.tagline}</p>
      </div>
    </header>

    <section class="role-folder wrap" style="--folder-tint:${b.tint};--folder-color:${b.fill}" aria-label="${r.name}的設定資料夾">
      <div class="folder-tabs" role="tablist" aria-label="設定資料分類">${FOLDER_TABS.map((tab) => `<button type="button" role="tab" id="folder-tab-${tab.id}" data-folder-tab="${tab.id}" aria-controls="folder-panel-${tab.id}" aria-selected="${tab.id === activeFolder}" tabindex="${tab.id === activeFolder ? 0 : -1}">${tab.id === 'profile' && r.kind === 'mode' ? '功能設定' : tab.label}</button>`).join('')}</div>
      <div class="folder-sheets">
      <div class="folder-panel" id="folder-panel-profile" role="tabpanel" aria-labelledby="folder-tab-profile" tabindex="0"${activeFolder !== 'profile' ? ' hidden' : ''}>
    <section class="dsec" aria-labelledby="h-pos">
      <div class="dsec-grid">
        <div><h2 id="h-pos">${r.kind === 'role' ? '角色定位' : '功能定位'}</h2>${r.positionNote ? `<p class="dsec-note">${r.positionNote}</p>` : ''}</div>
        <div class="folder-profile">
        ${r.intro.map((x) => `<p>${x}</p>`).join('')}
        ${dl(r.position)}
        </div>
      </div>
    </section>

    <section class="dsec" aria-labelledby="h-knob">
      <div class="dsec-grid">
        <div><h2 id="h-knob">個性特徵</h2>${r.character ? `<p class="dsec-note">${r.character}</p>` : ''}</div>
        <ul class="knobs">${r.knobs.map(([n, v, k]) => `<li data-reveal><span class="knob-n">${n}</span>${dots(k)}<span class="knob-v">${v}</span></li>`).join('')}</ul>
      </div>
    </section>

    ${r.behaviour.length ? `<section class="dsec" aria-labelledby="h-beh">
      <div class="dsec-grid">
        <div><h2 id="h-beh">互動方式</h2></div>
        <ul class="plain">${r.behaviour.map((x) => `<li data-reveal>${x}</li>`).join('')}</ul>
      </div>
    </section>` : ''}
      </div>

      <div class="folder-panel" id="folder-panel-reference" role="tabpanel" aria-labelledby="folder-tab-reference" tabindex="0"${activeFolder !== 'reference' ? ' hidden' : ''}>
    <section class="dsec" aria-labelledby="h-ref">
      <div class="dsec-grid">
        <div><h2 id="h-ref">文獻來源</h2></div>
        <ul class="refs">${(window.REFS[r.id] || []).map((f) => `<li data-reveal${f.risk ? ' class="risk"' : ''}><p class="ref-who">${f.who}${f.risk ? '<span>負面效果的依據</span>' : ''}</p><p class="ref-theory">${f.theory}</p><p class="ref-what">${f.what}</p></li>`).join('')}</ul>
      </div>
    </section>
      </div>

      <div class="folder-panel" id="folder-panel-dialogue" role="tabpanel" aria-labelledby="folder-tab-dialogue" tabindex="0"${activeFolder !== 'dialogue' ? ' hidden' : ''}>
    ${r.platform && r.platform.length ? `<section class="dsec plat" aria-labelledby="h-plat">
      <div class="dsec-grid">
        <div><h2 id="h-plat">平台上的五個時刻</h2><p class="dsec-note">同樣的課堂事件，${r.name}怎麼回應、什麼時候開口？以下台詞搭配各項動作與觸發條件；沒有台詞的時刻，以表情或動作回應。</p></div>
        <ol class="plat-list">${r.platform.map((p) => `<li data-reveal>
          <p class="plat-when">${p.when}</p>
          <div class="plat-body">
            <p class="plat-does">${r.name}會：${p.does}</p>
            ${p.say.map((s) => `<div class="bubble">${s}</div>`).join('')}
            <p class="plat-wrong"><span>最容易踩的錯</span>${p.wrong}</p>
          </div>
        </li>`).join('')}</ol>
      </div>
    </section>` : ''}

    <section class="talk" id="talk" aria-labelledby="h-talk" style="--tint:${b.tint}">
      <div class="talk-grid">
        <div class="talk-side">
          <h2 id="h-talk">情境與台詞</h2>
          <div class="scenes" role="tablist" aria-label="情境">${r.scenes.map((sc, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}"${i === 0 ? ' class="is-on"' : ''}>${sc.when}</button>`).join('')}</div>
        </div>
        <div class="chat" id="chat" aria-live="polite"></div>
      </div>
    </section>
      </div>

      <div class="folder-panel" id="folder-panel-boundaries" role="tabpanel" aria-labelledby="folder-tab-boundaries" tabindex="0"${activeFolder !== 'boundaries' ? ' hidden' : ''}>
    <section class="dsec exit" aria-labelledby="h-exit">
      <div class="dsec-grid">
        <div><h2 id="h-exit">設計界線</h2></div>
        <div>
          <ul class="plain">${r.care.map((x) => `<li data-reveal>${x}</li>`).join('')}</ul>
          ${dl(r.exit)}
        </div>
      </div>
    </section>

      </div>
      <div class="folder-page-mark"><span>${r.name}的設定資料夾</span><span id="folder-page-number" aria-live="polite">0${FOLDER_TABS.findIndex((tab) => tab.id === activeFolder) + 1} / 04</span></div>
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
    let selectedScene = 0;
    const folderTabs = Array.from(document.querySelectorAll('[data-folder-tab]'));
    const chooseFolder = (id) => {
      clearTimers();
      folderSelections.set(r.id, id);
      folderTabs.forEach((button) => {
        const selected = button.dataset.folderTab === id;
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        document.getElementById(button.getAttribute('aria-controls')).hidden = !selected;
      });
      document.getElementById('folder-page-number').textContent = `0${FOLDER_TABS.findIndex((tab) => tab.id === id) + 1} / 04`;
      if (id === 'dialogue') playScene(r, selectedScene, true);
    };
    folderTabs.forEach((button, index) => {
      button.addEventListener('click', () => chooseFolder(button.dataset.folderTab));
      button.addEventListener('keydown', (event) => {
        const next = event.key === 'ArrowRight' ? (index + 1) % folderTabs.length
          : event.key === 'ArrowLeft' ? (index + folderTabs.length - 1) % folderTabs.length
          : event.key === 'Home' ? 0 : event.key === 'End' ? folderTabs.length - 1 : null;
        if (next === null) return;
        event.preventDefault();
        chooseFolder(folderTabs[next].dataset.folderTab);
        folderTabs[next].focus();
      });
    });
    const btns = document.querySelectorAll('.scenes [role=tab]');
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
      selectedScene = Number(b.dataset.i);
      playScene(r, selectedScene);
    }));
    chooseFolder(talk ? 'dialogue' : (folderSelections.get(r.id) || 'profile'));
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
      if (r) { show('role:' + r.id, r.name + ' · 陪伴者角色設定', detail(r, !!m[2]), () => bindDetail(r, !!m[2])); return; }
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
