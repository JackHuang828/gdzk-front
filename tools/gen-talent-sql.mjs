/* 一次性脚本：从 people.js 生成 blade_talent 建表与种子数据 SQL */
import fs from 'node:fs';
import { P } from '../src/data/talent/people.js';

const esc = (v) => `'${String(v).replace(/'/g, "''")}'`;
const num = (v) => `CAST(${Number(v) || 0} AS DECIMAL(5,2))`;
const now = 'NOW()';

let sql = `/*
 Z智库 - 科技人才主数据表
 数据库：blade
 说明：前端科技人才库「人才列表区」的人才主数据
 注意：id 为雪花式 bigint 主键；code 存放前端原始人才编号（t1-t7）
 生成自 zwrite-vue3/src/data/talent/people.js
*/

SET NAMES utf8mb4;
USE \`blade\`;

DROP TABLE IF EXISTS \`blade_talent\`;
CREATE TABLE \`blade_talent\` (
  \`id\` bigint(20) NOT NULL COMMENT '主键',
  \`code\` varchar(16) NOT NULL COMMENT '人才编号（t1-t7，兼容前端引用）',
  \`name\` varchar(64) NOT NULL COMMENT '姓名',
  \`institution\` varchar(128) NOT NULL COMMENT '所属机构',
  \`title\` varchar(32) NULL COMMENT '职称/职务',
  \`field\` varchar(64) NOT NULL COMMENT '所属领域（人工智能/量子计算/生物技术/新材料）',
  \`type\` varchar(32) NOT NULL COMMENT '人才类别（领军人才/青年人才/项目人才）',
  \`region\` varchar(32) NULL COMMENT '地域',
  \`project\` varchar(64) NULL COMMENT '项目类别',
  \`outcome\` varchar(64) NULL COMMENT '成果类别',
  \`impact\` decimal(5,2) NOT NULL DEFAULT 0 COMMENT '学术影响力综合指数',
  \`tertiary\` varchar(64) NULL COMMENT '三级学科名称',
  \`secondary\` varchar(64) NULL COMMENT '二级学科名称',
  \`project_detail\` varchar(512) NULL COMMENT '项目经历详情',
  \`outcome_detail\` varchar(512) NULL COMMENT '代表性成果详情',
  \`quaternary\` varchar(64) NULL COMMENT '四级学科名称',
  \`create_user\` bigint(20) NULL COMMENT '创建人',
  \`create_time\` datetime NULL COMMENT '创建时间',
  \`update_user\` bigint(20) NULL COMMENT '修改人',
  \`update_time\` datetime NULL COMMENT '修改时间',
  \`status\` int(2) NULL DEFAULT 1 COMMENT '状态',
  \`is_deleted\` int(2) NOT NULL DEFAULT 0 COMMENT '是否已删除',
  PRIMARY KEY (\`id\`),
  KEY \`idx_field\` (\`field\`),
  KEY \`idx_institution\` (\`institution\`),
  KEY \`idx_region\` (\`region\`),
  KEY \`idx_type\` (\`type\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技人才主数据表';

INSERT INTO \`blade_talent\` (\`id\`, \`code\`, \`name\`, \`institution\`, \`title\`, \`field\`, \`type\`, \`region\`, \`project\`, \`outcome\`, \`impact\`, \`tertiary\`, \`secondary\`, \`project_detail\`, \`outcome_detail\`, \`quaternary\`, \`create_time\`, \`status\`, \`is_deleted\`) VALUES
`;

sql += P.map((p, i) => `(${i + 1},${esc(p.id)},${esc(p.name)},${esc(p.institution)},${esc(p.title)},${esc(p.field)},${esc(p.type)},${p.region ? esc(p.region) : 'NULL'},${p.project ? esc(p.project) : 'NULL'},${p.outcome ? esc(p.outcome) : 'NULL'},${num(p.impact)},${p.tertiary ? esc(p.tertiary) : 'NULL'},${p.secondary ? esc(p.secondary) : 'NULL'},${p.projectDetail ? esc(p.projectDetail) : 'NULL'},${p.outcomeDetail ? esc(p.outcomeDetail) : 'NULL'},${p.quaternary ? esc(p.quaternary) : 'NULL'},${now},1,0)`).join(',\n');
sql += ';\n';

fs.writeFileSync('D:/byu/code/SpringBlade-master/doc/sql/blade/blade-zwrite-talent.sql', sql, 'utf8');
console.log('生成完成，人才行数:', P.length);
P.forEach((p) => console.log('  ' + p.id + ' ' + p.name + ' field=' + p.field));
