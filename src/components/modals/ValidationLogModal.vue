<template>
  <!-- 校验日志文档 Modal（validationLog，宽幅）：内容为固定校验结果表 -->
  <div class="content-card card" style="padding:18px;">
    <h3 style="margin-bottom:8px;">洞察报告数据校验日志</h3>
    <p class="muted">校验规则遵循内置校验模板，记录本次生成后的校验过程、结果与异常信息。</p>
    <table class="trace-table">
      <thead><tr><th>校验阶段</th><th>内置规则</th><th>结果</th><th>异常信息</th></tr></thead>
      <tbody>
        <tr><td>引用数字抽取</td><td>数值一致性</td><td>异常</td><td>报告正文“37 个新增试点城市”未在引用来源中找到对应参照数值。</td></tr>
        <tr><td>来源表核验</td><td>外键完整性</td><td>通过</td><td>引用 [1]、[2]、[3] 均可回溯至数据集主键。</td></tr>
        <tr><td>指标字段扫描</td><td>空值检查</td><td>通过</td><td>核心指标字段无空值，样本维度完整。</td></tr>
        <tr><td>异常处理</td><td>人工复核流转</td><td>待复核</td><td>异常已输出日志，待人工复核审核。</td></tr>
      </tbody>
    </table>
  </div>
</template>
