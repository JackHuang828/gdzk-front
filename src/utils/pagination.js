/* 分页条页码窗口化：数据量增长时避免页码行过长。
 * 规则：总页数 ≤ 7 全部显示；否则显示首尾页 + 当前页±1，中间折叠为省略号（'…'）。
 * 返回数组元素为数字页码或 '…'，调用方按类型分别渲染。 */
export function windowedPageItems(total, current) {
  const totalPages = Math.max(1, total);
  const cur = Math.min(Math.max(1, current), totalPages);
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const items = [];
  const push = (v) => { if (items[items.length - 1] !== v) items.push(v); };
  const midStart = Math.max(2, cur - 1);
  const midEnd = Math.min(totalPages - 1, cur + 1);
  push(1);
  if (midStart > 3) push('…');
  else if (midStart === 3) push(2);
  for (let p = midStart; p <= midEnd; p++) push(p);
  if (midEnd < totalPages - 2) push('…');
  else if (midEnd === totalPages - 2) push(totalPages - 1);
  push(totalPages);
  return items;
}
