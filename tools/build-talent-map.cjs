// 从 2.3.1科技人才地图.html 生成 Vue 页面三件套（一次性构建脚本，可重复执行）
// 产出：
//   src/styles/talent-map.css            —— 原型 CSS 1:1 作用域化（.talent-map-page）+ Vue 布局适配段
//   src/data/talent/talent-map-engine.js —— 原型 7 段内联脚本 + optimization/dedup 脚本近乎原样移植
//   src/views/TalentMapView.vue          —— 原型 body 结构 1:1（去除原型自带侧边栏/面包屑）
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EX = path.join(__dirname, '.map-extract');
const read = f => fs.readFileSync(path.join(EX, f), 'utf8');

/* ---------------- 1. CSS 作用域化 ---------------- */
function scopeCss(input, scope) {
  function mapSelectorList(sel) {
    const parts = sel.split(',').map(s => s.trim()).filter(Boolean);
    const mapped = [];
    for (let s of parts) {
      if (s === ':root') { mapped.push(scope); continue; }
      if (/^(html|body)([\s.{:>[]|$)/.test(s)) continue; // 丢弃原型 body 级规则（Vue 布局由适配段接管）
      if (s === scope || s.startsWith(scope + ' ') || s.startsWith(scope + ':')) { mapped.push(s); continue; }
      mapped.push(scope + ' ' + s);
    }
    return mapped.length ? mapped.join(', ') : null;
  }
  function process(src) {
    let out = '', i = 0;
    while (i < src.length) {
      if (src.startsWith('/*', i)) {
        const e = src.indexOf('*/', i);
        const end = e === -1 ? src.length : e + 2;
        out += src.slice(i, end); i = end; continue;
      }
      const b = src.indexOf('{', i);
      if (b === -1) { out += src.slice(i); break; }
      let header = src.slice(i, b).trim();
      let j = b + 1, depth = 1;
      while (j < src.length && depth > 0) {
        const ch = src[j];
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
        else if (ch === '"' || ch === "'") {
          const q = ch; j++;
          while (j < src.length && src[j] !== q) { if (src[j] === '\\') j++; j++; }
        }
        j++;
      }
      const body = src.slice(b + 1, j - 1);
      if (header.startsWith('@')) {
        if (/^@(media|supports|container|layer)\b/.test(header)) out += header + ' {\n' + process(body) + '}\n';
        else out += header + ' {\n' + body + '\n}\n'; // keyframes/font-face 等原样保留
      } else {
        const sel = mapSelectorList(header);
        if (sel) out += sel + ' {\n' + body + '\n}\n';
      }
      i = j;
    }
    return out;
  }
  return process(input);
}

const cssMain = read('css-main.css');
const cssExtra = read('css-extra.css').replace(/^\s*<style>\s*/, '').replace(/\s*<\/style>\s*$/, '');
const cssLate = read('css-late.css').replace(/^\s*<style>\s*/, '').replace(/\s*<\/style>\s*$/, '');
const cssOpt = read('talent-map-optimization.css');
const cssMenuTopbar = read('menu.css');

let cssOut = '/* ============================================================\n' +
  ' * 由 tools/build-talent-map.cjs 从原型 2.3.1科技人才地图.html 自动生成，请勿手工编辑。\n' +
  ' * 来源：页面内联样式 + talent-map-optimization.css；所有选择器限定在 .talent-map-page。\n' +
  ' * ============================================================ */\n\n';
cssOut += scopeCss(cssMain, '.talent-map-page') + '\n';
cssOut += scopeCss(cssExtra, '.talent-map-page') + '\n';
cssOut += scopeCss(cssLate, '.talent-map-page') + '\n';
cssOut += scopeCss(cssOpt, '.talent-map-page') + '\n';
// menu.css 中与页面相关的少量规则（top-navbar 主题化），作用域化
cssOut += scopeCss(cssMenuTopbar.split('.breadcrumb-nav {')[1] ? '/* noop */' : '', '.talent-map-page');
cssOut += `
/* ===== Vue 迁移适配：解除原型 body 级固定布局（面包屑/顶栏由 App 提供，随页滚动） ===== */
.talent-map-page { display: block; background: #d8e7fc; }
.talent-map-page .main-content { padding: 0 0 20px; }
.talent-map-page .top-navbar { position: relative; top: auto !important; right: auto !important; left: auto !important; margin-bottom: 20px; }
.talent-map-page .top-navbar .nav-link { width: auto; height: auto; margin-left: 0; }
`;
fs.writeFileSync(path.join(ROOT, 'src/styles/talent-map.css'), cssOut);

/* ---------------- 2. JS 引擎移植 ---------------- */
// 切片含 <script>/</script> 标签行，剥离首尾
function stripTags(src) {
  return src.replace(/^\s*<script>\s*/, '').replace(/\s*<\/script>\s*$/, '');
}
const s1 = stripTags(read('script-1.js')), s2 = stripTags(read('script-2.js')), s3 = stripTags(read('script-3.js')),
  s4 = stripTags(read('script-4.js')), s5 = stripTags(read('script-5.js')), s6 = stripTags(read('script-6.js')),
  s7 = stripTags(read('script-7.js'));
const optJs = read('talent-map-optimization.js');
const dedupJs = read('talent-map-dedup.js');

// 2.1 提取 DOMContentLoaded 包裹体为命名初始化函数（s1×3、s2、s6），script-7 的就地改为立即执行
function extractDomInit(src, name) {
  const marker = "document.addEventListener('DOMContentLoaded', function() {";
  const start = src.indexOf(marker);
  if (start === -1) throw new Error('DOMContentLoaded not found: ' + name);
  const openBrace = src.indexOf('{', start);
  let depth = 0, i = openBrace;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) break; }
    else if (ch === '"' || ch === "'") {
      const q = ch; i++;
      while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
    }
  }
  // i 指向匹配的 '}'，其后应为 ');'
  let after = i + 1;
  while (/[\s]/.test(src[after])) after++;
  if (src.slice(after, after + 2) !== ');') throw new Error('unexpected tail after DOMContentLoaded block: ' + name);
  const bodyStart = openBrace + 1;
  const body = src.slice(bodyStart, i);
  const replaced = src.slice(0, start) + 'function ' + name + '() {' + body + '};' + src.slice(after + 2);
  return replaced;
}
let t1 = s1;
t1 = extractDomInit(t1, '__domInit_1a');
t1 = extractDomInit(t1, '__domInit_1b');
t1 = extractDomInit(t1, '__domInit_1c');
const t2 = extractDomInit(s2, '__domInit_2');
const t6 = extractDomInit(s6, '__domInit_6');
// script-7：DOMContentLoaded 包裹就地执行
const t7 = s7.replace(
  "document.addEventListener('DOMContentLoaded', function () {",
  'void function () {'
).replace(/(\r?\n\s*)\}\);(\s*\}\)\(\);?\s*)$/, '$1}();$2');

// 2.2 跨页跳转 → window.__mapGoto（由 TalentMapView.vue 提供，接 Vue 路由）
function remap(src, pairs) {
  let out = src;
  for (const [from, to] of pairs) {
    if (!out.includes(from)) throw new Error('remap miss: ' + from.slice(0, 60));
    out = out.split(from).join(to);
  }
  return out;
}
const t1r = remap(t1, [
  ["window.location.href = '2.1.1科技人才画像.html';", "window.__mapGoto('talentList');"],
  ["window.location.href = '2.2.3列表筛选.html';", "window.__mapGoto('external');"],
  ["window.location.href = '2.2.1领域人才分类.html';", "window.__mapGoto('talentLibrary');"],
  ["window.location.href = '2.2.2人才TOP100.html';", "window.__mapGoto('external');"],
  ["window.location.href = '2.3.1科技人才地图.html';", "window.__mapGoto('map');"],
  ["window.location.href = '2.4.1科技人才动态.html';", "window.__mapGoto('external');"],
  ["window.location.href = '3.1.1基础研究问题清单.html';", "window.__mapGoto('external');"],
  ["window.location.href = '2.1.1机构画像.html?name=' + encodeURIComponent(institutionName);", "window.__mapGoto('institution', institutionName);"]
]);
const t6r = remap(t6, [
  ["window.location.href = `2.3.1.1人才检索专家详情.html?id=${encodeURIComponent(id)}`;", "window.__mapGoto('external');"]
]);
const t7r = remap(t7, [
  ["window.location.href = `${subscriptionDetailPage}?id=${encodeURIComponent(id)}`;", "window.__mapGoto('external');"],
  ["window.location.href = '2.3.1.3人才库订阅推荐中心.html';", "window.__mapGoto('external');"]
]);
const dedupR = remap(dedupJs, [
  ["window.location.href = '2.2.1领域人才分类.html?from=map';", "window.__mapGoto('talentLibrary');"],
  ["window.location.href = '2.1.1科技人才画像.html?talent=' + encodeURIComponent(profile.dataset.profile);", "window.__mapGoto('profile', profile.dataset.profile);"],
  ["window.location.href = '2.4.1科技人才动态.html?from=map';", "window.__mapGoto('external');"]
]);

// 2.3 optimization / dedup 的自启动改为显式挂载
function deferSetup(src, globalName) {
  const re = /if \(document\.readyState === 'loading'\)\s*document\.addEventListener\('DOMContentLoaded', setup\);\s*else setup\(\);/;
  if (!re.test(src)) throw new Error('setup tail not found for ' + globalName);
  return src.replace(re, 'window.' + globalName + ' = setup;');
}
const optR = deferSetup(optJs, '__mapOptSetup');
const dedupR2 = deferSetup(dedupR, '__mapDedupSetup');

// 2.4 setInterval 收集（便于卸载清理）
const patchIntervals = src => src.split('setInterval(').join('__mapSetInterval(');

// 2.5 收集顶层函数名 → 挂 window（保持内联 onclick / 动态 innerHTML 处理器可用）
const fnNames = new Set();
for (const src of [t1r, t2, s3, s4, s5, t6r]) {
  const re = /^ {8}function ([A-Za-z_$][\w$]*)\s*\(/mg;
  let m; while ((m = re.exec(src))) fnNames.add(m[1]);
}
['extractDomInit', 'remap', 'deferSetup'].forEach(n => fnNames.delete(n));
const assignLines = [...fnNames].sort().map(n => '  window.' + n + ' = ' + n + ';').join('\n');

// 2.6 顶层 let/const 重名检测（同一函数作用域会抛 SyntaxError）
{
  const decl = {};
  for (const [tag, src] of [['s1', t1r], ['s2', t2], ['s3', s3], ['s4', s4], ['s5', s5], ['s6', t6r]]) {
    const re = /^ {8}(?:let|const) ([A-Za-z_$][\w$]*)/mg;
    let m; while ((m = re.exec(src))) {
      if (decl[m[1]]) throw new Error('顶层 ' + m[0].trim() + ' 重名: ' + decl[m[1]] + ' vs ' + tag);
      decl[m[1]] = tag;
    }
  }
}

const engine = `/* ============================================================
 * 由 tools/build-talent-map.cjs 从原型 2.3.1科技人才地图.html 自动生成，请勿手工编辑。
 * 移植策略：7 段内联脚本 + talent-map-optimization/dedup 近乎原样并入 buildEngine 作用域；
 *  - 内联 onclick 依赖的全局函数在初始化时挂到 window（含 optimization 层的覆写，顺序与原型一致）
 *  - DOMContentLoaded 初始化体改为显式按原型注册顺序调用
 *  - 跨原型页跳转改写为 window.__mapGoto（Vue 路由桥接）
 * ============================================================ */

const __mapIntervalIds = [];
function __mapSetInterval(fn, ms) {
  const id = setInterval(fn, ms);
  __mapIntervalIds.push(id);
  return id;
}

function buildEngine() {
  /* ---- 顶层函数挂载 window（供内联 onclick 与动态 innerHTML 使用） ---- */
${assignLines}

  /* ---- script-1：分布 + 指数（前半） ---- */
${patchIntervals(t1r)}

  /* ---- script-2：检索 + 驾驶舱 + 订阅（基础版） ---- */
${patchIntervals(t2)}

  /* ---- script-3：高级筛选弹窗 ---- */
${patchIntervals(s3)}

  /* ---- script-4：地图/驾驶舱导出与成果展示 ---- */
${patchIntervals(s4)}

  /* ---- script-5：指数增强（权重/导出/悬浮提示） ---- */
${patchIntervals(s5)}

  /* ---- script-6：检索增强（收藏/分布统计） ---- */
${patchIntervals(t6r)}

  /* ---- script-7：订阅增强（IIFE，含就地初始化） ---- */
${patchIntervals(t7r)}

  /* ---- optimization 层（注入统一分析范围导航并覆写 switchTab 等） ---- */
${optR}

  /* ---- dedup 层（检索/订阅职责收敛与跳转桥接） ---- */
${dedupR2}

  /* ---- 原型 DOMContentLoaded 初始化（保持注册顺序） ---- */
  __domInit_1a();
  __domInit_1b();
  __domInit_1c();
  __domInit_2();
  __domInit_6();
  if (window.__mapOptSetup) window.__mapOptSetup();
  if (window.__mapDedupSetup) window.__mapDedupSetup();

  /* ---- currentExpertId 与内联 onclick 的实时桥接（gap-1 专家详情弹窗使用） ---- */
  try {
    Object.defineProperty(window, 'currentExpertId', {
      configurable: true,
      get() { return currentExpertId; },
      set(v) { currentExpertId = v; }
    });
  } catch (e) { /* 已定义时忽略 */ }
}

export function initTalentMap() {
  __mapIntervalIds.length = 0;
  buildEngine();
}

export function disposeTalentMap() {
  __mapIntervalIds.forEach(id => { try { clearInterval(id); } catch (e) { /* noop */ } });
  __mapIntervalIds.length = 0;
}
`;
fs.writeFileSync(path.join(ROOT, 'src/data/talent/talent-map-engine.js'), engine);

/* ---------------- 3. Vue SFC（模板 1:1） ---------------- */
function trimBlank(s) { return s.replace(/^\s*\n+/, '').replace(/\n\s*$/, '\n'); }
const bodyLines = read('body-head.html').split(/\r?\n/);
// 去掉 <body>、原型侧边栏注释+容器、面包屑注释+块（extract L1/L2/L3/L5-L15，1-based）
const kept = bodyLines.slice(15).join('\n'); // 1-based L16 起保留（顶部导航栏及主内容）
const template = trimBlank(kept) + '\n' + trimBlank(read('gap-1.html')) + '\n' + trimBlank(read('gap-2.html')) + '\n' + trimBlank(read('gap-3.html'));

if (/\{\{/.test(template)) throw new Error('模板含 {{，会被 Vue 当作插值');
{
  const dup = template.match(/<[a-z]+[^>]*\b(class|id|style)([^>]*)\1/gi);
  // 粗查重复属性（同一标签两个 class= 等）
  const tagRe = /<([a-z][a-z0-9-]*)((?:"[^"]*"|'[^']*'|[^"'>])*)>/gi;
  let m, dups = [];
  while ((m = tagRe.exec(template))) {
    const attrs = m[2].match(/\s([a-zA-Z-]+)=/g) || [];
    const seen = new Set();
    for (const a of attrs) {
      const name = a.trim().slice(0, -1).toLowerCase();
      if (seen.has(name)) dups.push(name + ' @' + m[1] + ' #' + template.slice(0, m.index).split('\n').length);
      seen.add(name);
    }
  }
  if (dups.length) console.log('重复属性警告:\n' + dups.join('\n'));
}

const sfc = `<!-- 科技人才地图（原型 2.3.1科技人才地图.html）：结构 1:1 迁移；内联事件为原生 onclick（Vue 以 attribute 透传），逻辑见 talent-map-engine.js -->
<template>
<div class="talent-map-page">
${template}
</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../stores/ui';
import { initTalentMap, disposeTalentMap } from '../data/talent/talent-map-engine';
import '../styles/talent-map.css';

const router = useRouter();
const ui = useUiStore();

// 原型内跨页跳转桥接：地图内部所有 window.location 跳转已改写为 __mapGoto
window.__mapGoto = (target, arg) => {
  if (target === 'talentList') router.push('/talent/list');
  else if (target === 'talentLibrary') router.push('/talent/library');
  else if (target === 'map') router.push('/talent/map');
  else if (target === 'profile' && arg) router.push('/talent/list/' + arg);
  else ui.showToast('该模块为智库系统其他页面，暂未包含在本期原型范围内');
};

onMounted(() => {
  initTalentMap();
});
onBeforeUnmount(() => {
  disposeTalentMap();
  try { delete window.currentExpertId; } catch (e) { /* noop */ }
});
</script>
`;
fs.writeFileSync(path.join(ROOT, 'src/views/TalentMapView.vue'), sfc);

console.log('done:', [
  'src/styles/talent-map.css',
  'src/data/talent/talent-map-engine.js',
  'src/views/TalentMapView.vue'
].map(f => { const st = fs.statSync(path.join(ROOT, f)); return f + ' ' + (st.size / 1024).toFixed(1) + 'KB'; }).join(', '));
