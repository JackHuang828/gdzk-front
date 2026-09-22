<script setup>
// 科技实体详情（1.1.1.1）：技术研判服务 → 研究需求分析 → 科技实体清单 → 详情。
// 1:1 还原 HTML 原型 1.1.1.1实体详情页.html。
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 实体基础信息（与原型 1.1.1.1 entityData 逐字对齐）
const ENTITY_BASIC = {
  '中国科学院': { avatar: '中', avatarColor: 'linear-gradient(135deg,#667eea,#764ba2)', location: '北京 - 海淀', score: '95', type: '科研院所', intro: '中国科学院成立于1949年，是中国自然科学最高学术机构、科学技术最高咨询机构。', tags: ['量子计算', '人工智能', '半导体', '生物医药', '新能源'] },
  '华为技术有限公司': { avatar: '华', avatarColor: 'linear-gradient(135deg,#f093fb,#f5576c)', location: '广东 - 深圳', score: '98', type: '企业', intro: '华为是全球领先的ICT基础设施和智能终端提供商。', tags: ['5G/6G', '半导体', '云计算', '人工智能'] },
  '清华大学': { avatar: '清', avatarColor: 'linear-gradient(135deg,#4facfe,#00f2fe)', location: '北京 - 海淀', score: '92', type: '高等院校', intro: '清华大学是中国著名高等学府。', tags: ['人工智能', '类脑计算', '新能源', '量子计算'] },
  '腾讯科技': { avatar: '腾', avatarColor: 'linear-gradient(135deg,#fa709a,#fee140)', location: '广东 - 深圳', score: '88', type: '企业', intro: '腾讯以技术丰富互联网用户的生活。', tags: ['人工智能', '云计算', '大数据', '区块链'] },
  '北京大学': { avatar: '北', avatarColor: 'linear-gradient(135deg,#a8edea,#fed6e3)', location: '北京 - 海淀', score: '90', type: '高等院校', intro: '北京大学创办于1898年，是中国第一所国立综合性大学。', tags: ['量子材料', '生物医学', '环境科学', '人工智能'] },
  '比亚迪': { avatar: '比', avatarColor: 'linear-gradient(135deg,#ffecd2,#fcb69f)', location: '广东 - 深圳', score: '91', type: '企业', intro: '比亚迪是一家高新技术企业的业务涵盖汽车、轨道交通、新能源和电子等领域。', tags: ['新能源', '动力电池', '电动汽车', '轨道交通'] },
  '具身智能': { avatar: '具', avatarColor: 'linear-gradient(135deg,#5ee7df,#b490ca)', location: '广东 - 深圳', score: '88', type: '技术方向', intro: '融合人工智能、机器人与环境感知能力的前沿技术方向，面向复杂场景的自主交互与任务执行。', tags: ['人工智能', '机器人', '具身智能', '自主系统'] },
  '具身智能科研团队': { avatar: '团', avatarColor: 'linear-gradient(135deg,#f6d365,#fda085)', location: '广东 - 深圳', score: '86', type: '科研团队', intro: '围绕智能感知、认知决策与运动控制开展协同研究的具身智能科研团队。', tags: ['具身智能', '机器人', '智能感知', '运动控制'] },
  '人形机器人': { avatar: '人', avatarColor: 'linear-gradient(135deg,#84fab0,#8fd3f4)', location: '广东 - 深圳', score: '86', type: '技术方向', intro: '面向制造、服务与特种作业场景的人形机器人关键技术方向。', tags: ['人工智能', '机器人', '人形机器人'] },
  '深圳湾实验室': { avatar: '湾', avatarColor: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)', location: '广东 - 深圳', score: '89', type: '科研机构', intro: '面向前沿科学与产业关键问题开展交叉研究的科研机构。', tags: ['人工智能', '生物医药', '交叉研究'] },
  '南方科技大学': { avatar: '南', avatarColor: 'linear-gradient(135deg,#d4fc79,#96e6a1)', location: '广东 - 深圳', score: '87', type: '高等院校', intro: '聚焦基础研究与新兴技术人才培养的高水平研究型大学。', tags: ['人工智能', '半导体', '基础研究'] },
  '王海峰': { avatar: '王', avatarColor: 'linear-gradient(135deg,#fccb90,#d57eeb)', location: '广东 - 深圳', score: '85', type: '科技人才', intro: '人工智能与机器人领域专家，长期从事智能感知与自主系统研究。', tags: ['人工智能', '机器人', '智能感知'] }
};

// 用户描述（与原型 userDescriptions 对齐）
const USER_DESCRIPTIONS = {
  '中国科学院': '从国家战略科技力量和基础研究布局角度看，中国科学院覆盖人工智能、量子计算、半导体等重点方向，适合作为科研资源统筹、重大任务论证和前沿技术监测的重要分析对象。',
  '华为技术有限公司': '从产业链安全和关键核心技术攻关角度看，华为在通信、芯片、云计算和智能终端领域具有较强研发与产业化能力，可用于研判技术自主可控水平、产业协同机会及国际竞争态势。',
  '清华大学': '从高校科研布局和人才培养角度看，清华大学在人工智能、类脑计算、量子计算等方向积累深厚，可作为重点学科评估、创新人才识别和产学研合作研判的重要参考。',
  '腾讯科技': '从数字经济和平台型科技企业观察角度看，腾讯在人工智能、云计算和大数据等领域具备较强应用转化能力，可用于分析数字技术赋能公共服务、产业升级及生态治理的路径。',
  '具身智能': '从前沿技术布局和应用示范角度看，具身智能融合人工智能、机器人与环境感知，是推动智能制造、特种作业和公共服务升级的重要技术方向，值得纳入重点技术跟踪与政策研判。',
  '具身智能科研团队': '从科研组织和创新人才评价角度看，该团队聚焦智能感知、认知决策与运动控制，具备开展交叉协同攻关的特征，可作为观察具身智能科研力量、团队协作和成果转化潜力的分析对象。',
  '比亚迪': '从新能源产业链和先进制造布局角度看，比亚迪覆盖动力电池、电动汽车和轨道交通等领域，可用于研判产业链韧性、技术迭代速度和区域产业集群培育方向。',
  '人形机器人': '从先进制造和未来产业培育角度看，人形机器人面向制造、服务与特种作业等场景，适合用于评估关键零部件、系统集成和应用示范进展，为产业政策和试点布局提供参考。',
  '深圳湾实验室': '从区域科研平台建设角度看，深圳湾实验室面向前沿科学与产业关键问题开展交叉研究，可作为观察深圳前沿科研组织、成果转化协同和重点产业技术供给能力的参考对象。',
  '南方科技大学': '从新型研发型高校和科技人才培养角度看，南方科技大学聚焦基础研究、半导体和人工智能等方向，可为区域学科布局、青年人才引育和高校创新能力评估提供参考。',
  '王海峰': '从科技人才和产业技术带头人识别角度看，王海峰长期深耕人工智能与机器人相关方向，可作为观察领域专家影响力、技术路线判断和高层次人才服务需求的示例对象。'
};

// 原型中固定的详情区块数据（所有实体共用，与原型 1.1.1.1实体详情页.html 一致）
const SHARED_DETAIL = {
  patents: [
    { name: '一种基于深度学习的图像识别方法及装置', no: 'CN202110123456.7', status: '有效' },
    { name: '量子密钥分发系统及方法', no: 'CN202010987654.3', status: '有效' }
  ],
  papers: [
    { title: 'Quantum Key Distribution over 4600 km of Fiber', meta: 'Nature Photonics | 2023-06 | 引用: 328' },
    { title: 'Deep Learning for Image Recognition', meta: 'IEEE | 2022-11 | 引用: 1256' }
  ],
  achievements: [
    { icon: 'fa-atom', title: '量子通信技术突破', desc: '成功实现千公里级量子密钥分发' },
    { icon: 'fa-microchip', title: '人工智能芯片研发', desc: '研制成功新一代AI训练芯片' },
    { icon: 'fa-subway', title: '深海探测装备研制', desc: '自主研发万米级载人潜水器' }
  ],
  reviews: [
    { name: '王研究员', meta: '高校用户 · 2024-03-15', rating: 5, content: '数据全面，覆盖了国内外主要科研机构，专利分析功能非常实用。' },
    { name: '李分析师', meta: '企业用户 · 2024-03-10', rating: 4, content: '技术图谱功能强大，但希望增加更多自定义分析维度。' },
    { name: '张教授', meta: '科研用户 · 2024-03-05', rating: 5, content: '人才画像功能帮助我们快速定位领域专家，节省了大量调研时间。' }
  ],
  cases: [
    { icon: 'fa-lightbulb', title: '半导体产业链分析', desc: '通过该平台对国内外半导体企业进行全方位分析，为政府制定产业政策提供决策支撑。', tags: ['政策研究', '产业分析'] },
    { icon: 'fa-users', title: '顶尖人才引进评估', desc: '利用人才画像和论文分析功能，为某省引进海外高层次人才提供科学评估依据。', tags: ['人才服务', '引才决策'] },
    { icon: 'fa-chart-line', title: '技术发展趋势预测', desc: '基于专利和论文大数据，预测人工智能领域未来5年技术演进路线。', tags: ['趋势预测', '技术路线'] }
  ],
  news: [
    { date: '2024-03-18', title: '量子计算技术突破：科研团队取得重大进展', meta: '来源：科技日报 | 浏览：1.2万' },
    { date: '2024-03-15', title: '人工智能芯片国产化进程加速', meta: '来源：经济参考报 | 浏览：8,560' },
    { date: '2024-03-12', title: '国家发布新一代人工智能发展规划', meta: '来源：新华网 | 浏览：2.3万' },
    { date: '2024-03-08', title: '半导体行业投资热度持续上升', meta: '来源：证券时报 | 浏览：5,780' }
  ],
  recommendations: [
    { name: '华为技术有限公司', meta: '创新指数: 98 | 企业', tags: ['5G/6G', '半导体'], avatar: '华', color: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { name: '清华大学', meta: '创新指数: 92 | 高等院校', tags: ['人工智能', '量子计算'], avatar: '清', color: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
    { name: '北京大学', meta: '创新指数: 90 | 高等院校', tags: ['生物医药', '量子材料'], avatar: '北', color: 'linear-gradient(135deg,#a8edea,#fed6e3)' }
  ]
};

// 默认兜底数据（未命中的实体使用通用模板）
function buildDefault(name) {
  return {
    avatar: name.charAt(0), avatarColor: 'linear-gradient(135deg,#667eea,#764ba2)',
    location: '—', score: '—', type: '—',
    intro: `${name} 的详细介绍信息。`,
    tags: [],
    userDescription: '该实体可作为政府科技管理和科研机构用户开展技术布局、创新资源与合作机会研判的参考对象。',
    ...SHARED_DETAIL
  };
}

// 编辑弹窗保存的字段覆盖（对应原型 saveEdit 直接改写 DOM）
const overrides = ref({});
const editVisible = ref(false);
const editForm = ref({ name: '', type: '', location: '', score: '', intro: '' });

const entityName = computed(() => route.params.name || '中国科学院');
const detail = computed(() => {
  const basic = ENTITY_BASIC[entityName.value];
  const base = basic
    ? { ...basic, userDescription: USER_DESCRIPTIONS[entityName.value] || '该实体可作为政府科技管理和科研机构用户开展技术布局、创新资源与合作机会研判的参考对象。', ...SHARED_DETAIL }
    : buildDefault(entityName.value);
  return { ...base, ...overrides.value };
});

// 显示名（编辑保存后可被覆盖，对应原型 entityName/breadcrumbName 同步改写）
const displayName = computed(() => detail.value.name || entityName.value);

// 路由切换（实体推荐跳转）时清空编辑覆盖
watch(() => route.params.name, () => { overrides.value = {}; });

function goRecommend(name) { router.push({ name: 'entityDetail', params: { name } }); }
function goMediaFocus() { router.push({ name: 'mediaFocus' }); }
function exportReport() { alert('正在生成报告，请稍候...'); setTimeout(() => alert('报告导出成功！'), 1500); }

// 编辑弹窗（对应原型 openEditModal / closeEditModal / saveEdit）
function openEditModal() {
  editForm.value = {
    name: detail.value.name || entityName.value,
    type: detail.value.type,
    location: detail.value.location,
    score: detail.value.score,
    intro: detail.value.intro
  };
  editVisible.value = true;
}
function closeEditModal() { editVisible.value = false; }
function saveEdit() {
  if (!editForm.value.name.trim()) { alert('请输入实体名称！'); return; }
  overrides.value = { ...overrides.value, ...editForm.value, name: editForm.value.name.trim() };
  alert('实体信息已更新！');
  closeEditModal();
}

onMounted(() => { window.scrollTo(0, 0); });
</script>

<template>
  <div class="entity-detail-page">
    <div class="main-content">
      <!-- 详情头部 -->
      <div class="detail-header">
        <div class="header-top">
          <div class="entity-avatar" :style="{ background: detail.avatarColor, color: detail.avatarColorText || '#fff' }">{{ detail.avatar }}</div>
          <div class="entity-info">
            <div class="entity-name">{{ displayName }}</div>
            <div class="entity-meta">
              <div class="entity-meta-item"><i class="fas fa-map-marker-alt"></i> <span>{{ detail.location }}</span></div>
              <div class="entity-meta-item"><i class="fas fa-star"></i> 创新指数: <span>{{ detail.score }}</span></div>
              <div class="entity-meta-item"><i class="fas fa-building"></i> <span>{{ detail.type }}</span></div>
            </div>
            <div class="entity-tags">
              <span v-for="tag in detail.tags" :key="tag" class="entity-tag">{{ tag }}</span>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-action btn-primary" @click="exportReport"><i class="fas fa-download"></i> 导出报告</button>
            <button class="btn-action btn-secondary" @click="openEditModal"><i class="fas fa-edit"></i> 编辑</button>
          </div>
        </div>
      </div>

      <!-- 内容区 -->
      <div class="content-grid">
        <div class="left-panel">
          <!-- 机构简介 -->
          <div class="section-card">
            <div class="section-title">机构简介</div>
            <p class="intro-text">{{ detail.intro }}</p>
          </div>

          <!-- 代表性成果 -->
          <div class="section-card">
            <div class="section-title">代表性成果</div>
            <div class="achievement-list">
              <div v-for="(ach, i) in detail.achievements" :key="i" class="achievement-item">
                <div class="achievement-icon"><i :class="['fas', ach.icon]"></i></div>
                <div class="achievement-content">
                  <div class="achievement-title">{{ ach.title }}</div>
                  <div class="achievement-desc">{{ ach.desc }}</div>
                </div>
              </div>
              <div v-if="!detail.achievements.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 核心专利 -->
          <div class="section-card">
            <div class="section-title">核心专利</div>
            <div class="patent-list">
              <div v-for="(p, i) in detail.patents" :key="i" class="patent-item">
                <div>
                  <div class="patent-name">{{ p.name }}</div>
                  <div class="patent-info">申请号: {{ p.no }}</div>
                </div>
                <span class="patent-status">{{ p.status }}</span>
              </div>
              <div v-if="!detail.patents.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 代表性论文 -->
          <div class="section-card">
            <div class="section-title">代表性论文</div>
            <div class="paper-list">
              <div v-for="(p, i) in detail.papers" :key="i" class="paper-item">
                <div class="paper-title">{{ p.title }}</div>
                <div class="paper-meta">{{ p.meta }}</div>
              </div>
              <div v-if="!detail.papers.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 用户描述 -->
          <div class="section-card">
            <div class="section-title">用户描述</div>
            <p class="user-description">{{ detail.userDescription }}</p>
          </div>

          <!-- 用户评价 -->
          <div class="section-card">
            <div class="section-title">用户评价</div>
            <div class="review-list">
              <div v-for="(r, i) in detail.reviews" :key="i" class="review-item">
                <div class="review-header">
                  <div class="review-avatar"><i class="fas fa-user"></i></div>
                  <div class="review-info">
                    <div class="review-name">{{ r.name }}</div>
                    <div class="review-meta">{{ r.meta }}</div>
                  </div>
                  <div class="review-rating">
                    <i v-for="n in 5" :key="n" :class="n <= r.rating ? 'fas fa-star' : 'far fa-star'"></i>
                  </div>
                </div>
                <div class="review-content">{{ r.content }}</div>
              </div>
              <div v-if="!detail.reviews.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 典型案例 -->
          <div class="section-card">
            <div class="section-title">典型案例</div>
            <div class="case-list">
              <div v-for="(c, i) in detail.cases" :key="i" class="case-item">
                <div class="case-icon"><i :class="['fas', c.icon]"></i></div>
                <div class="case-content">
                  <div class="case-title">{{ c.title }}</div>
                  <div class="case-desc">{{ c.desc }}</div>
                  <div class="case-tags">
                    <span v-for="t in c.tags" :key="t" class="case-tag">{{ t }}</span>
                  </div>
                </div>
              </div>
              <div v-if="!detail.cases.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 新闻舆情 -->
          <div class="section-card">
            <div class="section-title">新闻舆情</div>
            <div class="news-list">
              <a v-for="(n, i) in detail.news" :key="i" href="#" class="news-item" @click.prevent="goMediaFocus">
                <div class="news-date">{{ n.date }}</div>
                <div class="news-content">
                  <div class="news-title">{{ n.title }}</div>
                  <div class="news-meta">{{ n.meta }}</div>
                </div>
              </a>
              <div v-if="!detail.news.length" class="empty">暂无数据</div>
            </div>
          </div>

          <!-- 实体推荐 -->
          <div class="section-card">
            <div class="section-title">实体推荐</div>
            <div class="recommend-list">
              <div v-for="(r, i) in detail.recommendations" :key="i" class="recommend-item" @click="goRecommend(r.name)">
                <div class="recommend-avatar" :style="{ background: r.color }">{{ r.avatar }}</div>
                <div class="recommend-info">
                  <div class="recommend-name">{{ r.name }}</div>
                  <div class="recommend-meta">{{ r.meta }}</div>
                </div>
                <div class="recommend-tags">
                  <span v-for="t in r.tags" :key="t" class="recommend-tag">{{ t }}</span>
                </div>
              </div>
              <div v-if="!detail.recommendations.length" class="empty">暂无数据</div>
            </div>
          </div>
        </div>

        <div class="right-panel"></div>
      </div>
    </div>

    <!-- 编辑科技实体弹窗（与原型 editModal 一致） -->
    <div v-if="editVisible" class="modal" @click.self="closeEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>编辑科技实体</h3>
          <span class="close" @click="closeEditModal">&times;</span>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">实体名称 *</label>
            <input type="text" class="form-input" v-model="editForm.name" placeholder="请输入实体名称">
          </div>
          <div class="form-group">
            <label class="form-label">实体类型 *</label>
            <select class="form-input" v-model="editForm.type">
              <option value="高校/研究机构">高校/研究机构</option>
              <option value="企业">企业</option>
              <option value="政府机构">政府机构</option>
              <option value="非营利组织">非营利组织</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">所在地区 *</label>
            <select class="form-input" v-model="editForm.location">
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="广东">广东</option>
              <option value="浙江">浙江</option>
              <option value="江苏">江苏</option>
              <option value="四川">四川</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">创新能力指数</label>
            <input type="number" class="form-input" v-model="editForm.score" min="0" max="100" placeholder="0-100">
          </div>
          <div class="form-group">
            <label class="form-label">实体简介</label>
            <textarea class="form-textarea" v-model="editForm.intro" rows="4" placeholder="请输入实体简介"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeEditModal">取消</button>
          <button class="btn-confirm" @click="saveEdit">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entity-detail-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #d8e7fc}

/* 让出固定面包屑栏高度（48px - App .content 顶部 20px） */
.main-content { padding: 28px 0 0; }
.detail-header { background: #fff; border-radius: 4px; padding: 24px; margin-bottom: 20px; }
.header-top { display: flex; align-items: flex-start; gap: 20px; }
.entity-avatar { width: 80px; height: 80px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 600; color: #fff; flex-shrink: 0; }
.entity-info { flex: 1; }
.entity-name { font-size: 24px; font-weight: 600; color: #333; margin-bottom: 8px; }
.entity-meta { display: flex; gap: 20px; font-size: 14px; color: #666; flex-wrap: wrap; }
.entity-meta-item { display: flex; align-items: center; gap: 6px; }
.entity-tags { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.entity-tag { padding: 4px 12px; background: #e6f7ff; color: #1890ff; border-radius: 4px; font-size: 12px; }
.header-actions { display: flex; gap: 12px; flex-shrink: 0; }
.btn-action { height: 36px; padding: 0 20px; border-radius: 4px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; }
.btn-primary { background: #1890ff; color: #fff; border: none; }
.btn-primary:hover { background: #40a9ff; }
.btn-secondary { background: #fff; color: #666; border: 1px solid #d9d9d9; }
.btn-secondary:hover { border-color: #1890ff; color: #1890ff; }

/* 内容区 */
.content-grid { display: block; }
.left-panel, .right-panel { display: flex; flex-direction: column; gap: 20px; }
.section-card { background: #fff; border-radius: 4px; padding: 24px; }
.section-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 16px; padding-left: 12px; border-left: 3px solid #1890ff; }
.intro-text { font-size: 14px; color: #666; line-height: 1.8; }
.empty { color: #999; font-size: 13px; text-align: center; padding: 12px; }

/* 用户描述 */
.user-description { margin: 0; padding: 14px 16px; background: #f5f9ff; border: 1px solid #d9e8fa; border-radius: 6px; color: #4b5b6b; font-size: 14px; line-height: 1.8; }

/* 代表性成果 */
.achievement-list { display: flex; flex-direction: column; gap: 12px; }
.achievement-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: #fafafa; border-radius: 4px; }
.achievement-icon { width: 36px; height: 36px; background: #e6f7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #1890ff; flex-shrink: 0; }
.achievement-content { flex: 1; }
.achievement-title { font-size: 14px; font-weight: 600; color: #333; }
.achievement-desc { font-size: 12px; color: #999; margin-top: 4px; }

/* 专利 */
.patent-list { display: flex; flex-direction: column; gap: 10px; }
.patent-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #fafafa; border-radius: 4px; gap: 12px; }
.patent-name { font-size: 13px; color: #333; }
.patent-info { font-size: 12px; color: #999; }
.patent-status { padding: 2px 8px; background: #f6ffed; color: #52c41a; border-radius: 4px; font-size: 11px; flex-shrink: 0; }

/* 论文 */
.paper-list { display: flex; flex-direction: column; gap: 10px; }
.paper-item { padding: 12px; background: #fafafa; border-radius: 4px; }
.paper-title { font-size: 13px; font-weight: 500; color: #333; margin-bottom: 4px; }
.paper-meta { font-size: 12px; color: #999; }

/* 用户评价 */
.review-list { display: flex; flex-direction: column; gap: 16px; }
.review-item { padding: 16px; background: #fafafa; border-radius: 8px; }
.review-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.review-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #1890ff, #36cfc9); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; flex-shrink: 0; }
.review-info { flex: 1; }
.review-name { font-size: 14px; font-weight: 500; color: #333; }
.review-meta { font-size: 12px; color: #999; }
.review-rating { color: #faad14; font-size: 12px; }
.review-rating i { margin-left: 2px; }
.review-content { font-size: 13px; color: #666; line-height: 1.6; }

/* 典型案例 */
.case-list { display: flex; flex-direction: column; gap: 16px; }
.case-item { display: flex; gap: 12px; padding: 16px; background: #fafafa; border-radius: 8px; border-left: 3px solid #1890ff; }
.case-icon { width: 40px; height: 40px; border-radius: 8px; background: #e6f7ff; display: flex; align-items: center; justify-content: center; color: #1890ff; flex-shrink: 0; }
.case-content { flex: 1; }
.case-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px; }
.case-desc { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 8px; }
.case-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.case-tag { padding: 2px 8px; background: #e6f7ff; color: #1890ff; border-radius: 4px; font-size: 11px; }

/* 新闻舆情 */
.news-list { display: flex; flex-direction: column; gap: 12px; }
.news-item { display: flex; gap: 12px; padding: 12px; background: #fafafa; border-radius: 4px; transition: background 0.2s; cursor: pointer; }
.news-item:hover { background: #e6f7ff; }
.news-date { width: 70px; font-size: 12px; color: #999; flex-shrink: 0; }
.news-content { flex: 1; }
.news-title { font-size: 13px; color: #333; margin-bottom: 4px; }
.news-meta { font-size: 11px; color: #999; }

/* 实体推荐 */
.recommend-list { display: flex; flex-direction: column; gap: 12px; }
.recommend-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #fafafa; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.recommend-item:hover { background: #e6f7ff; transform: translateX(4px); }
.recommend-avatar { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: 600; flex-shrink: 0; }
.recommend-info { flex: 1; min-width: 0; }
.recommend-name { font-size: 14px; font-weight: 500; color: #333; margin-bottom: 4px; }
.recommend-meta { font-size: 12px; color: #999; }
.recommend-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.recommend-tag { padding: 2px 8px; background: #f0f5ff; color: #1890ff; border-radius: 4px; font-size: 11px; }

/* 编辑科技实体弹窗（与原型 editModal 样式一致） */
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background: white; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e0e6ed; }
.modal-header h3 { margin: 0; color: #2c3e50; font-size: 18px; }
.modal-header .close { font-size: 28px; color: #999; cursor: pointer; line-height: 1; }
.modal-header .close:hover { color: #333; }
.modal-body { padding: 20px; }
.form-group { margin-bottom: 20px; }
.form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px; }
.form-input, .form-textarea { width: 100%; padding: 10px 12px; border: 1px solid #dcdfe6; border-radius: 4px; font-size: 14px; transition: border-color 0.3s; font-family: inherit; }
.form-input:focus, .form-textarea:focus { outline: none; border-color: #3498db; }
.form-textarea { resize: vertical; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 20px; border-top: 1px solid #e0e6ed; }
.btn-cancel, .btn-confirm { padding: 10px 20px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; transition: all 0.3s; }
.btn-cancel { background: #ecf0f1; color: #7f8c8d; }
.btn-cancel:hover { background: #dde4e6; }
.btn-confirm { background: #3498db; color: white; }
.btn-confirm:hover { background: #2980b9; }
</style>
