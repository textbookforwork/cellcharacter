// 用程式畫五顆形狀與四個功能變體：主形狀、眼睛、眉毛、視線，全部依 05-2 視覺規格總表。
// 抽象圓團，無嘴、無手腳。viewBox 200×200，底線 y=190。
(function () {
  const INK = '#0b0c0e';

  // 身體：回傳 { fill, body(svg 字串), eyeY, eyeX:[左,右], eyeR 縮放 }
  const BODIES = {
    base: {
      fill: '#f2b31c', tint: '#fdf3d8',
      body: (f) => `<path d="M20 148 C12 110 46 80 100 78 C160 76 192 104 190 142 C188 178 150 192 96 190 C50 189 28 180 20 148 Z" fill="${f}"/>`,
      eyeY: 128, eyeX: [68, 132], scale: 1.15
    },
    coach: {
      fill: '#3ab4f0', tint: '#e2f3fd',
      body: (f) => `<path d="M48 58 C72 44 132 42 160 54 C172 60 170 110 168 150 C166 178 150 190 100 190 C52 190 34 180 34 150 C33 110 36 68 48 58 Z" fill="${f}"/>`,
      eyeY: 108, eyeX: [72, 128], scale: 1
    },
    peer: {
      fill: '#f26322', tint: '#fde8de',
      body: (f) => `<path d="M86 62 C92 42 96 32 104 20 C104 40 112 50 120 62 Z" fill="${f}"/><path d="M30 122 C26 82 60 48 104 48 C150 48 178 84 174 126 C170 166 140 190 100 190 C58 190 34 160 30 122 Z" fill="${f}"/>`,
      eyeY: 112, eyeX: [70, 130], scale: 1.25
    },
    guard: {
      fill: '#2e9a5a', tint: '#e1f3e7',
      body: (f) => `<path d="M54 24 C70 10 134 12 148 22 C158 30 156 100 156 150 C156 178 150 190 100 190 C52 190 44 180 44 150 C44 100 42 36 54 24 Z" fill="${f}"/>`,
      eyeY: 70, eyeX: [78, 122], scale: 0.75
    },
    mirror: {
      fill: '#ef5fa7', tint: '#fde4f0',
      body: (f) => `<path d="M100 62 C136 56 172 84 180 120 C188 156 160 190 100 190 C44 190 14 160 20 122 C26 86 64 66 100 62 Z" fill="${f}"/>`,
      eyeY: 124, eyeX: [70, 130], scale: 1.1
    },
    explain: {
      fill: '#2a7fc0', tint: '#e0eef8',
      body: (f) => `<path d="M44 36 C70 24 130 22 152 34 C162 40 160 110 158 150 C156 180 146 190 96 190 C44 190 30 180 30 150 C29 110 30 50 44 36 Z" fill="${f}"/><path d="M148 62 C164 58 190 58 196 62 C198 84 198 112 196 132 C180 136 160 136 148 132 C146 110 146 84 148 62 Z" fill="#f7f7f4"/>`,
      eyeY: 92, eyeX: [64, 118], scale: 0.95
    },
    review: {
      fill: '#e8f23a', tint: '#f6fad4',
      body: (f) => `<path d="M48 92 C70 84 136 84 154 90 C160 110 160 170 154 186 C130 192 66 192 46 186 C40 170 40 110 48 92 Z" fill="${f}"/><circle cx="138" cy="106" r="7" fill="#f26322"/>`,
      eyeY: 134, eyeX: [78, 118], scale: 0.8
    },
    challenge: {
      fill: '#ff4d1f', tint: '#ffe4db',
      body: (f) => `<path d="M86 62 C92 42 96 32 104 20 C104 40 112 50 120 62 Z" fill="${f}"/><path d="M36 90 C24 76 14 66 8 58 C26 60 38 64 50 70 Z" fill="${f}"/><path d="M164 90 C176 76 186 66 192 58 C174 60 162 64 150 70 Z" fill="${f}"/><path d="M30 122 C26 82 60 48 104 48 C150 48 178 84 174 126 C170 166 140 190 100 190 C58 190 34 160 30 122 Z" fill="${f}"/>`,
      eyeY: 112, eyeX: [70, 130], scale: 1.2
    },
    story: {
      fill: '#7b5be6', tint: '#ebe6fb',
      body: (f) => `<path d="M100 26 C132 24 158 60 158 110 C158 160 134 192 100 192 C66 192 42 160 42 110 C42 60 70 28 100 26 Z" fill="${f}"/>`,
      eyeY: 96, eyeX: [76, 124], scale: 0.95
    }
  };

  // 眼睛樣式：都是墨色實心點，「眼瞼」用身體色蓋上去。side = -1 左眼、1 右眼。
  // 眼睛：白眼白＋黑瞳孔，沒有眉毛。side = -1 左眼、1 右眼。f = 身體色（眼瞼用）
  const W = '#ffffff';
  const sclera = (r) => `<circle r="${r || 14}" fill="${W}"/>`;
  const pupil = (r, dx, dy) => `<circle cx="${dx || 0}" cy="${dy || 0}" r="${r || 7}" fill="${INK}"/>`;
  const stroke = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const EYES = {
    round: () => sclera() + pupil(),
    calm: () => stroke('M-11 -3 Q0 9 11 -3'),
    sleepy: (f) => sclera() + pupil(7, 0, 2) + `<path d="M-15 -15 h30 v15 h-30 Z" fill="${f}"/>`,
    serious: (f) => sclera() + pupil(7, 0, 2) + `<path d="M-15 -15 h30 v10 h-30 Z" fill="${f}"/>`,
    peek: () => sclera() + pupil(7, 6, 0),
    question: (f, side) => side < 0 ? sclera(15) + pupil(8) : sclera(10) + pupil(5),
    focus: () => sclera() + pupil(4),
    smile: () => stroke('M-11 3 Q0 -9 11 3'),
    surprised: () => sclera(16) + pupil(5),
    lazy: () => stroke('M-10 0 L10 0'),
    strain: (f, side) => stroke(side < 0 ? 'M-7 -8 L5 0 L-7 8' : 'M7 -8 L-5 0 L7 8'),
    teary: () => sclera(15) + pupil(8) + `<circle cx="4" cy="-4" r="3" fill="${W}"/>`,
    aggrieved: (f, side) => sclera() + pupil(7, 0, 2) + `<path d="M${-16 * side} -16 L${16 * side} -16 L${16 * side} -2 Z" fill="${f}"/>`,
    dizzy: () => stroke('M-7 -7 L7 7 M7 -7 L-7 7'),
    look: () => sclera() + pupil(7, 7, -2),
    sleep: () => stroke('M-10 -1 Q0 5 10 -1'),
    square: () => sclera(12) + `<rect x="-5" y="-5" width="10" height="10" rx="2" fill="${INK}"/>`
  };

  // 眉毛：在眼睛上方的墨色弧線。
  const BROWS = {
    relaxed: (side) => `<path d="M-13 0 Q0 -7 13 0" />`,
    arc: (side) => `<path d="M-13 2 Q0 -9 13 2" />`,
    think: (side) => `<path d="M-13 ${side < 0 ? 0 : -6} L13 ${side < 0 ? -6 : 0}" />`,
    flat: () => `<path d="M-13 0 L13 0" />`,
    droop: (side) => `<path d="M${-13 * side} -2 Q0 -6 ${13 * side} 4" />`,
    raise: (side) => `<path d="M${-13 * side} 2 Q0 -4 ${13 * side} -8" />`,
    none: () => ''
  };

  // 視線：瞳孔的位移（px，viewBox 座標）
  const GAZE = {
    front: [0, 0], aside: [8, 0], task: [-4, 6], board: [9, 2], work: [0, 7], timer: [8, -4]
  };

  // 狀態名稱 → 眼睛樣式（05-2「15 款眼睛分配」）
  const STATE_EYE = {
    '靜置': 'round', '聆聽': 'calm', '安慰': 'calm', '睡著': 'sleep',
    '閱讀': 'peek', '思考': 'question', '筆記': 'focus', '慶祝': 'smile',
    '卡住': 'strain', '再試': 'round', '提醒': 'square',
    '講解': 'serious', '示範': 'focus', '換你說': 'round', '交棒': 'smile',
    '出現': 'surprised', '回顧': 'look', '記錄': 'smile',
    '預備': 'strain', '比賽中': 'focus', '輸了': 'dizzy', '贏了': 'smile',
    '說故事': 'lazy', '離開': 'sleep'
  };

  function svg(kind, opt) {
    const o = Object.assign({ eye: 'round', brow: 'relaxed', gaze: 'front', size: null, cls: '', title: '' }, opt || {});
    const b = BODIES[kind] || BODIES.base;
    const eyeFn = EYES[o.eye] || EYES.round;
    const [gx, gy] = GAZE[o.gaze] || GAZE.front;
    const s = b.scale;
    const eyes = b.eyeX.map((x, i) => {
      const side = i === 0 ? -1 : 1;
      return `<g transform="translate(${x} ${b.eyeY}) scale(${s})">` +
        `<g class="eye"><g class="gz">${eyeFn(b.fill, side)}</g></g></g>`;
    }).join('');
    const sizeAttr = o.size ? ` width="${o.size}" height="${o.size}"` : '';
    const titleEl = o.title ? `<title>${o.title}</title>` : '';
    const aria = o.title ? ' role="img"' : ' aria-hidden="true"';
    return `<svg class="shape ${o.cls}" viewBox="0 0 200 200"${sizeAttr}${aria} style="--gx:${gx}px;--gy:${gy}px">${titleEl}${b.body(b.fill)}<g class="face">${eyes}</g></svg>`;
  }

  // 五顆形狀站成一排（英雄區與頁尾用）。高度依規格：守護者最高、鷹架中、共學齊平、安全基地最矮、情緒調節矮。
  // 站成一群（像合照）：後排高的、前排矮的，底線對齊，填滿直式的舞台。
  function lineup(roles, opt) {
    const o = Object.assign({ eyes: null }, opt || {});
    const W = 1000, H = 1000;
    const slots = [
      { id: 'guardian', x: 330, size: 720 },
      { id: 'coach', x: 40, size: 640 },
      { id: 'peer', x: 520, size: 520 },
      { id: 'safe-base', x: 200, size: 560 },
      { id: 'mirror', x: -20, size: 470 }
    ];
    const parts = slots.map((sl) => {
      const r = roles.find((q) => q.id === sl.id);
      const eye = o.eyes ? (o.eyes[sl.id] || r.eye) : r.eye;
      const inner = svg(r.shape, { eye, brow: r.brow, gaze: r.gaze });
      return `<svg x="${sl.x}" y="${H - sl.size}" width="${sl.size}" height="${sl.size}" viewBox="0 0 200 200">${inner.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>`;
    });
    return `<svg class="lineup" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${parts.join('')}</svg>`;
  }

  window.Shape = { svg, lineup, BODIES, STATE_EYE };
})();
