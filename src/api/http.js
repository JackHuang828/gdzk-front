/* ===== 统一 HTTP 封装 =====
 * 基于浏览器原生 fetch（项目未引 axios），统一处理：
 *   - 基础 URL（vite dev 由代理把 /api 转发到 127.0.0.1:8107）
 *   - HTTP 状态码校验（非 2xx 抛错）
 *   - 响应解包（后端 R<T> 包装：{ code, data, msg }，取 .data）
 *   - 超时（默认 15s）
 */

const BASE_URL = ''; // vite dev 代理相对路径，生产部署同域也留空
const DEFAULT_TIMEOUT = 15000;

// 多环境支持：.env.production 可设 VITE_API_BASE（如网关按服务名路由时设为 /blade-zwrite），
// 会把请求里的 /api 前缀改写为该值；未设置则原样发出
const API_BASE = import.meta.env.VITE_API_BASE || '';
function resolveUrl(url) {
  if (API_BASE && url.startsWith('/api/')) return API_BASE + url.slice(4);
  return url;
}

/**
 * 通用请求
 * @param {string} url    请求路径（以 /api 开头）
 * @param {object} opts   fetch init 选项 { method, headers, body, timeout }
 * @returns {Promise<any>} 解包后的 data 字段（MyBatis-Plus IPage 或普通对象/数组）
 */
export async function request(url, opts = {}) {
  const { timeout = DEFAULT_TIMEOUT, ...init } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(BASE_URL + resolveUrl(url), {
      headers: { 'Content-Type': 'application/json', ...init.headers },
      signal: controller.signal,
      ...init,
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    // 后端统一 R<T> 包装：{ code, data, msg }
    return json && json.data !== undefined ? json.data : json;
  } finally {
    clearTimeout(timer);
  }
}

/** GET 快捷方法，自动把 params 拼成 query string */
export function get(url, params) {
  if (!params || typeof params !== 'object') return request(url, { method: 'GET' });
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  }
  const qsStr = qs.toString();
  return request(qsStr ? url + '?' + qsStr : url, { method: 'GET' });
}

/** POST 快捷方法，body 自动 JSON 序列化 */
export function post(url, body) {
  return request(url, {
    method: 'POST',
    body: body != null ? JSON.stringify(body) : undefined,
  });
}
