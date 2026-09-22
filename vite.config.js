import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// 多环境支持：通过 --mode 切换（npm run dev → development，npm run build → production）
// 环境变量定义在 .env.development / .env.production
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    server: {
      host: '127.0.0.1',
      port: 5174,
      strictPort: true,
      proxy: {
        // 后端 blade-zwrite 服务（开发环境直连，生产走网关）
        '/api': {
          target: env.VITE_API_TARGET || 'http://127.0.0.1:8107',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    preview: {
      host: '127.0.0.1',
      port: 4174,
      strictPort: true
    }
  };
});
