import { defineStore } from 'pinia';
import { formatTimestamp } from '../utils/taskReport.js';

/**
 * 任务报告跨视图状态：四个表单的「开始写作任务」生成后，
 * 携带报告类型/标题进入任务详情（taskReportDetail）视图。
 * 版本记录在任务详情与报告编辑器间共享（对应原型单一 #versionList）。
 */
export const useReportStore = defineStore('report', {
  state: () => ({
    taskType: '研究报告',       // 研究报告 | 战略咨询报告 | 洞察报告 | 其它报告
    taskTitle: '',              // 任务详情标题
    taskReturnView: 'home',     // home | documents（详情页返回去向）
    taskOptions: {},            // 附加选项（如校验异常分支 validationAnomaly）
    // 版本管理 Modal 的版本记录（icon: 当前 | 历史）
    versions: [
      { icon: '当前', time: '2026-06-08 16:20', author: 'Lianzhihui · 当前版本' },
      { icon: '历史', time: '2026-06-08 15:42', author: 'Lianzhihui · 可恢复' },
      { icon: '历史', time: '2026-06-08 14:35', author: '系统自动保存 · 可恢复' }
    ]
  }),
  actions: {
    setTaskReport({ type, title, returnView = 'home', options = {} }) {
      this.taskType = type;
      this.taskTitle = title;
      this.taskReturnView = returnView;
      this.taskOptions = options;
    },
    /** 新建版本：旧「当前」降级为「历史」，返回时间戳 */
    addVersion(authorLabel) {
      const ts = formatTimestamp(new Date());
      this.versions.forEach(item => { item.icon = '历史'; });
      this.versions.unshift({ icon: '当前', time: ts, author: authorLabel });
      return ts;
    }
  }
});
