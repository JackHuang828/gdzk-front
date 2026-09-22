/* 人才清单展示用的指标与文案（原 talent-library-page.js 内置）。 */
export const talentListMetrics = {
  t1: { years: '20年', projects: '12个重点项目', activity: '2024-02' },
  t2: { years: '18年', projects: '10个重点项目', activity: '2024-01' },
  t3: { years: '15年', projects: '8个重点项目', activity: '2024-02' },
  t4: { years: '20年', projects: '12个重点项目', activity: '2024-02' },
  t5: { years: '16年', projects: '9个重点项目', activity: '2024-01' },
  t6: { years: '14年', projects: '7个重点项目', activity: '2023-12' },
  t7: { years: '13年', projects: '6个重点项目', activity: '2024-02' },
};

export function talentOutcomeSummary(person) {
  if (person.outcome === '国家级奖项') return '国家级科技奖获得者';
  if (person.outcome === '发明专利') return '授权发明专利成果';
  return '高被引论文成果';
}

export function talentListMetric(person) {
  return talentListMetrics[person.id] || { years: '10年', projects: '5个重点项目', activity: '2024-01' };
}
