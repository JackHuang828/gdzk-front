import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'vue/no-unused-components': 'warn',
      // ↓ 原型迁移代码的历史遗留问题，先降为 warn 保持 lint 通过，后续逐步清理
      'no-irregular-whitespace': 'warn',
      'no-redeclare': 'warn',
      'no-useless-assignment': 'off',
      'no-useless-escape': 'warn',
    },
  },
  {
    // Node 环境文件：构建配置 + tools 下的脚本（sourceType 由 ESLint 按扩展名自动识别）
    files: ['vite.config.js', 'eslint.config.js', 'tools/**', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
