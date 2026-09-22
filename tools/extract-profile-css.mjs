/* ============================================================
 * 一次性脚本：从 2.1.1科技人才画像.html 内联 <style> 抽取 CSS，
 * 给所有选择器加 .talent-profile-page 前缀，避免全局污染。
 *
 * 规则：
 *   - @keyframes / @font-face / @import / @charset：保持原样（全局）
 *   - @media / @supports / @container / @layer：保留外层 at-rule，
 *     仅对其内部规则的选择器加前缀
 *   - 普通规则：选择器列表逐个加前缀
 *   - :root / html / body 直接替换为 .talent-profile-page
 *   - 已经以 .talent-profile-page 开头的选择器不重复加前缀
 * 运行：node tools/extract-profile-css.mjs
 * 输出：src/styles/talent-profile.css
 * ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_HTML = String.raw`D:\byu\projects\zhiku0917\2.1.1科技人才画像.html`;
const OUT_CSS = path.join(ROOT, 'src', 'styles', 'talent-profile.css');

const PREFIX = '.talent-profile-page';

const html = fs.readFileSync(SRC_HTML, 'utf8');
const m = html.match(/<style>([\s\S]*?)<\/style>/);
if (!m) {
  console.error('未找到 <style> 标签');
  process.exit(1);
}
const css = m[1];

/* 把一个选择器列表字符串加上前缀 */
function prefixSelectorList(selectorList) {
  return selectorList
    .split(',')
    .map((sel) => sel.trim())
    .filter(Boolean)
    .map((sel) => {
      // 去掉前导组合符空白
      const trimmed = sel.replace(/^\s+/, '');
      // 已经带前缀的不重复
      if (trimmed.startsWith(PREFIX)) return sel;
      // :root / html / body 整体替换
      if (/^(html|body|:root)\b/.test(trimmed)) {
        return sel.replace(/^(html|body|:root)\b/, PREFIX);
      }
      // 以 * 开头（通用选择器）：* { ... } -> .talent-profile-page *
      if (trimmed.startsWith('*')) {
        return `${PREFIX} ${sel}`;
      }
      // 其它普通选择器直接拼前缀
      return `${PREFIX} ${sel}`;
    })
    .join(', ');
}

/* 把一段 CSS 文本（可能含多条规则/at-rule）加前缀 */
function prefixBlock(block) {
  let out = '';
  let i = 0;
  while (i < block.length) {
    // 跳过空白与注释
    const wsMatch = block.slice(i).match(/^(\s+)/);
    if (wsMatch) {
      out += wsMatch[1];
      i += wsMatch[1].length;
      continue;
    }
    const commentMatch = block.slice(i).match(/^\/\*[\s\S]*?\*\//);
    if (commentMatch) {
      out += commentMatch[0];
      i += commentMatch[0].length;
      continue;
    }
    // 读取到下一个 { 或 } 或 ;
    const headMatch = block.slice(i).match(/^([^{};]+)/);
    if (!headMatch) {
      out += block[i];
      i += 1;
      continue;
    }
    const head = headMatch[1];
    i += head.length;
    const trailing = block[i];
    if (trailing === '{') {
      // 找到匹配的 }
      let depth = 1;
      let j = i + 1;
      while (j < block.length && depth > 0) {
        if (block[j] === '{') depth += 1;
        else if (block[j] === '}') depth -= 1;
        if (depth > 0) j += 1;
      }
      const inner = block.slice(i + 1, j);
      i = j + 1; // 跳过 }
      const headTrim = head.trim();
      // at-rule 处理
      const atRuleMatch = headTrim.match(/^@([a-zA-Z-]+)/);
      if (atRuleMatch) {
        const atName = atRuleMatch[1];
        // 这些 at-rule 内部不是普通选择器，保持原样
        if (atName === 'keyframes' || atName === 'font-face' || atName === 'import' || atName === 'charset' || atName === 'namespace' || atName === 'page') {
          out += `${head}{${inner}}`;
        } else if (atName === 'media' || atName === 'supports' || atName === 'container' || atName === 'layer' || atName === 'starting-style') {
          // 递归处理内部规则
          out += `${head}{${prefixBlock(inner)}}`;
        } else {
          // 其它未知 at-rule：保守处理，递归内部
          out += `${head}{${prefixBlock(inner)}}`;
        }
      } else {
        // 普通规则：head 是选择器列表
        const newSel = prefixSelectorList(head);
        out += `${newSel} {${inner}}`;
      }
    } else if (trailing === ';') {
      // 无 body 的 at-rule（如 @import）
      out += `${head};`;
      i += 1;
    } else {
      // 不完整片段，原样输出
      out += head;
    }
  }
  return out;
}

const prefixed = prefixBlock(css);

const banner = `/* ============================================================
 * 由 tools/extract-profile-css.mjs 从 2.1.1科技人才画像.html 内联样式自动生成，请勿手工编辑。
 * 所有选择器限定在 .talent-profile-page 作用域内。
 * @keyframes / @font-face 保持全局。
 * ============================================================ */
`;

fs.mkdirSync(path.dirname(OUT_CSS), { recursive: true });
fs.writeFileSync(OUT_CSS, banner + prefixed, 'utf8');
console.log(`已生成 ${path.relative(ROOT, OUT_CSS)}（${prefixed.length} 字符）`);
