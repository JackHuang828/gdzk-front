// 从 2.3.1科技人才地图.html 提取 CSS/HTML/JS 分块，便于迁移阅读（一次性工具）
const fs = require('fs');
const path = require('path');

const SRC_DIR = 'D:/byu/projects/zhiku0917-1150';
const SRC = path.join(SRC_DIR, '2.3.1科技人才地图.html');
const OUT = path.join(__dirname, '.map-extract');

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);
const slice = (a, b) => lines.slice(a - 1, b).join('\n'); // 1-based 闭区间

fs.mkdirSync(OUT, { recursive: true });
const parts = {
  'css-main.css': [10, 7657],
  'css-extra.css': [7658, 7773],
  'css-late.css': [17479, 17505],
  'body-head.html': [7775, 11069],
  'gap-1.html': [14184, 14500],
  'gap-2.html': [16847, 16969],
  'gap-3.html': [17233, 17478],
  'script-1.js': [11070, 14183],
  'script-2.js': [14501, 16846],
  'script-3.js': [16970, 17232],
  'script-4.js': [17507, 17655],
  'script-5.js': [17657, 17978],
  'script-6.js': [17980, 18242],
  'script-7.js': [18244, 18573]
};
for (const [name, [a, b]] of Object.entries(parts)) {
  fs.writeFileSync(path.join(OUT, name), slice(a, b));
}
for (const f of ['menu.css', 'menu.js', 'talent-map-optimization.css', 'talent-map-optimization.js', 'talent-map-dedup.js']) {
  const p = path.join(SRC_DIR, f);
  if (fs.existsSync(p)) fs.writeFileSync(path.join(OUT, f), fs.readFileSync(p, 'utf8'));
  else console.log('MISSING:', f);
}
for (const f of fs.readdirSync(OUT)) {
  const st = fs.statSync(path.join(OUT, f));
  console.log(f, (st.size / 1024).toFixed(1) + 'KB', fs.readFileSync(path.join(OUT, f), 'utf8').split('\n').length + 'L');
}
