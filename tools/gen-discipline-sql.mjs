/* 一次性脚本：从 taxonomy.js 生成 blade_discipline 建表与种子数据 SQL */
import fs from 'node:fs';
import { disciplineTree, tertiaryTree, quaternaryTree, secondaryToField } from '../src/data/talent/taxonomy.js';

const rows = [];
const add = (id, parentId, ancestors, level, name, field, sort) => {
  rows.push({ id, parentId, ancestors, level, name, field, sort });
};

// 一级：1001..1013，父 0
const primaries = Object.keys(disciplineTree);
primaries.forEach((pName, pi) => {
  const pId = 1000 + pi + 1;
  add(pId, 0, '0', 1, pName, '', pi + 1);
  // 二级：父id*100+序号
  disciplineTree[pName].forEach((sName, si) => {
    const sId = pId * 100 + si + 1;
    add(sId, pId, `0,${pId}`, 2, sName, secondaryToField[sName] || '', si + 1);
    // 三级：量子算法等重名节点按父各存一行
    const tNames = tertiaryTree[sName] || [];
    tNames.forEach((tName, ti) => {
      const tId = sId * 100 + ti + 1;
      add(tId, sId, `0,${pId},${sId}`, 3, tName, '', ti + 1);
      // 四级
      const qNames = quaternaryTree[tName] || [];
      if (!qNames.length) throw new Error('四级缺失: ' + tName);
      qNames.forEach((qName, qi) => {
        const qId = tId * 100 + qi + 1;
        add(qId, tId, `0,${pId},${sId},${tId}`, 4, qName, '', qi + 1);
      });
    });
    if (!tNames.length) throw new Error('三级缺失: ' + sName);
  });
});

const esc = (v) => `'${String(v).replace(/'/g, "''")}'`;
const tuple = (r) => `(${r.id}, ${r.parentId}, ${esc(r.ancestors)}, ${r.level}, ${esc(r.name)}, ${r.field ? esc(r.field) : 'NULL'}, ${r.sort}, NOW(), 1, 0)`;

let sql = `/*
 Z智库 - 学科分类树
 数据库：blade
 说明：科技人才库「一级/二级/三级/四级学科」级联数据（含二级学科所属领域 field）
 生成自 zwrite-vue3/src/data/talent/taxonomy.js，修改学科体系后重新生成
*/

SET NAMES utf8mb4;
USE \`blade\`;

DROP TABLE IF EXISTS \`blade_discipline\`;
CREATE TABLE \`blade_discipline\` (
  \`id\` bigint(20) NOT NULL COMMENT '主键',
  \`parent_id\` bigint(20) NOT NULL DEFAULT 0 COMMENT '父级id，一级学科为0',
  \`ancestors\` varchar(500) NOT NULL DEFAULT '' COMMENT '祖先路径，如 0,1001,100101',
  \`level\` int(11) NOT NULL COMMENT '层级：1一级 2二级 3三级 4四级',
  \`name\` varchar(64) NOT NULL COMMENT '学科名称',
  \`field\` varchar(64) NULL COMMENT '所属领域（仅二级填写）',
  \`sort\` int(11) NOT NULL DEFAULT 0 COMMENT '同级排序',
  \`create_user\` bigint(20) NULL COMMENT '创建人',
  \`create_time\` datetime NULL COMMENT '创建时间',
  \`update_user\` bigint(20) NULL COMMENT '修改人',
  \`update_time\` datetime NULL COMMENT '修改时间',
  \`status\` int(2) NULL DEFAULT 1 COMMENT '状态',
  \`is_deleted\` int(2) NOT NULL DEFAULT 0 COMMENT '是否已删除',
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_parent_name\` (\`parent_id\`, \`name\`),
  KEY \`idx_level\` (\`level\`),
  KEY \`idx_ancestors\` (\`ancestors\`(50))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技人才学科分类树';

INSERT INTO \`blade_discipline\` (\`id\`, \`parent_id\`, \`ancestors\`, \`level\`, \`name\`, \`field\`, \`sort\`, \`create_time\`, \`status\`, \`is_deleted\`) VALUES
`;

for (let i = 0; i < rows.length; i += 40) {
  sql += rows.slice(i, i + 40).map(tuple).join(',\n') + (i + 40 < rows.length ? ',' : '') + '\n';
}

fs.writeFileSync('D:/byu/code/SpringBlade-master/doc/sql/blade/blade-zwrite-discipline.sql', sql, 'utf8');
const byLevel = {};
rows.forEach((r) => { byLevel[r.level] = (byLevel[r.level] || 0) + 1; });
console.log('生成完成，总行数:', rows.length, '分层:', JSON.stringify(byLevel));
