<template>
  <!-- 人才画像详情子页面（路由组件 /talent/profile/:id） -->
  <div class="talent-profile-page view-mode-detail">

    <!-- 详情工具栏 -->
    <div class="profile-detail-toolbar">
      <button class="profile-detail-back" @click="closeProfileDetail">
        <i class="fas fa-arrow-left"></i>返回人才列表
      </button>
      <div class="profile-detail-heading">
        <span>人才画像详情</span>
        <strong>{{ activeExpert.name }}</strong>
      </div>
      <div class="profile-detail-actions">
        <button @click="$router.push({ name: 'talentLibrary', query: { expert: activeExpert.name, action: 'add-to-pool' } })">
          <i class="fas fa-plus-circle"></i> 加入专属人才池
        </button>
        <button><i class="fas fa-map-marker-alt"></i> 在人才地图中查看</button>
        <button><i class="fas fa-bell"></i> 订阅人才动态</button>
      </div>
    </div>

    <div class="main-content">
      <div class="profile-split profile-detail-split">
        <div class="profile-body">
          <!-- 共享画像头部卡片 -->
          <div class="expert-profile-header profile-summary">
            <div class="expert-profile-avatar">{{ activeExpert.avatar }}</div>
            <div class="expert-profile-info">
              <div class="expert-profile-name">{{ activeExpert.name }}</div>
              <div class="expert-profile-title">{{ activeExpert.organization }} · {{ activeExpert.title }}</div>
              <div class="expert-profile-tags">
                <span v-for="tag in activeExpert.tags" :key="tag"
                      class="profile-tag" :class="{ active: tag === activeTag }"
                      @click="selectProfileTag(tag)">{{ tag }}</span>
              </div>
            </div>
            <div class="expert-profile-header-actions">
              <button class="profile-header-action" @click="editExpert(activeExpertId)"><i class="fas fa-edit"></i> 编辑</button>
              <button class="profile-header-action danger" @click="deleteExpert(activeExpertId)"><i class="fas fa-trash-alt"></i> 删除</button>
            </div>
          </div>

          <!-- 模块导航（盒式） -->
          <nav class="profile-section-nav">
            <a href="#basic-info" :class="{ active: activeModule === 'basic-info' }" @click.prevent="switchModule('basic-info')">
              <i class="fas fa-id-card"></i>基础信息
            </a>
            <a href="#relation-info" :class="{ active: activeModule === 'relation-info' }" @click.prevent="switchModule('relation-info')">
              <i class="fas fa-project-diagram"></i>关联信息
            </a>
            <a href="#behavior-info" :class="{ active: activeModule === 'behavior-info' }" @click.prevent="switchModule('behavior-info')">
              <i class="fas fa-chart-line"></i>行为信息
            </a>
            <a href="#psychology-info" :class="{ active: activeModule === 'psychology-info' }" @click.prevent="switchModule('psychology-info')">
              <i class="fas fa-brain"></i>心理信息
            </a>
          </nav>

          <!-- ===================== 模块一：基础信息 ===================== -->
          <section id="basic-info" class="module-content profile-content-section" :class="{ active: activeModule === 'basic-info' }">
            <div class="profile-card-head"><i class="fas fa-id-card"></i>基础信息</div>
            <!-- 专家详情面板 -->
            <div class="expert-detail-panel">
              <div class="profile-selection-note"><i class="fas fa-link"></i> 当前画像来自“人才分类与检索”筛选结果，可继续查看科研成果、合作网络、论文专利与参与项目。</div>

            <!-- 6 个详情子页签 -->
            <div class="profile-detail-tabs">
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-basic-panel' }" @click="switchDetailTab('profile-basic-panel')">个人基本信息</button>
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-education-panel' }" @click="switchDetailTab('profile-education-panel')">教育背景</button>
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-work-panel' }" @click="switchDetailTab('profile-work-panel')">工作经历</button>
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-network-panel' }" @click="switchDetailTab('profile-network-panel')">合作关系网络</button>
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-output-panel' }" @click="switchDetailTab('profile-output-panel')">论文专利</button>
              <button class="profile-detail-tab" :class="{ active: activeDetailTab === 'profile-project-panel' }" @click="switchDetailTab('profile-project-panel')">参与项目</button>
            </div>

            <!-- 个人基本信息 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-basic-panel' }">
              <div class="info-grid">
                <div class="info-item"><div class="info-label">姓名</div><div class="info-value">{{ activeExpert.name }}</div></div>
                <div class="info-item"><div class="info-label">性别</div><div class="info-value">{{ activeExpert.gender || '男' }}</div></div>
                <div class="info-item"><div class="info-label">出生年份</div><div class="info-value">{{ activeExpert.birthYear ? activeExpert.birthYear + '年' : '1978年' }}</div></div>
                <div class="info-item"><div class="info-label">职称</div><div class="info-value">{{ activeExpert.profileTitle || '教授、博士生导师' }}</div></div>
                <div class="info-item"><div class="info-label">所属机构</div><div class="info-value clickable" @click="viewOrganization(activeExpert.organization)">{{ activeExpert.organization }}</div></div>
                <div class="info-item"><div class="info-label">研究方向</div><div class="info-value">{{ activeExpert.researchDirections || '人工智能、机器学习、深度学习' }}</div></div>
                <div class="info-item"><div class="info-label">荣誉称号</div><div class="info-value">{{ activeExpert.honors || '长江学者特聘教授、国家杰出青年科学基金获得者' }}</div></div>
                <div class="info-item"><div class="info-label">个人主页</div><div class="info-value clickable" @click="viewPersonalHomepage()">查看个人主页</div></div>
                <div class="info-item"><div class="info-label">电子邮箱</div><div class="info-value">{{ activeExpert.email }}</div></div>
                <div class="info-item"><div class="info-label">联系电话</div><div class="info-value">{{ activeExpert.phone }}</div></div>
              </div>
            </div>

            <!-- 教育背景 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-education-panel' }">
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-graduation-cap"></i> 教育背景</div>
                <template v-if="educationList">
                  <div class="timeline-item" v-for="edu in educationList" :key="edu.period">
                    <div class="timeline-year">{{ edu.period }}</div>
                    <div class="timeline-title">{{ edu.degree }}</div>
                    <div class="timeline-organization clickable" @click="viewOrganization(edu.school)">{{ edu.school }}</div>
                    <div class="timeline-description">{{ edu.description }}</div>
                  </div>
                </template>
                <template v-else>
                  <div class="timeline-item">
                    <div class="timeline-year">2003年 - 2006年</div>
                    <div class="timeline-title">博士研究生 · 计算机科学与技术</div>
                    <div class="timeline-organization clickable" @click="viewOrganization('清华大学')">清华大学</div>
                    <div class="timeline-description">研究方向：人工智能、机器学习算法</div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-year">2000年 - 2003年</div>
                    <div class="timeline-title">硕士研究生 · 计算机软件与理论</div>
                    <div class="timeline-organization clickable" @click="viewOrganization('北京大学')">北京大学</div>
                    <div class="timeline-description">研究方向：算法设计与分析</div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-year">1996年 - 2000年</div>
                    <div class="timeline-title">本科 · 计算机科学与技术</div>
                    <div class="timeline-organization clickable" @click="viewOrganization('浙江大学')">浙江大学</div>
                    <div class="timeline-description">本科毕业，获学士学位</div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 工作经历 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-work-panel' }">
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-briefcase"></i> 工作经历</div>
                <template v-if="careerList">
                  <div class="timeline-item" v-for="job in careerList" :key="job.period">
                    <div class="timeline-year">{{ job.period }}</div>
                    <div class="timeline-title">{{ job.position }}</div>
                    <div class="timeline-organization clickable" @click="viewOrganization(job.organization)">{{ job.organization }}</div>
                    <div class="timeline-description" v-if="job.description">{{ job.description }}</div>
                    <div class="timeline-achievement" v-if="job.achievements.length">
                      <div class="achievement-item" v-for="ach in job.achievements" :key="ach" @click="viewProject(ach)">{{ ach }}</div>
                    </div>
                  </div>
                </template>
                <template v-else>
                <div class="timeline-item">
                  <div class="timeline-year">2012年至今</div>
                  <div class="timeline-title">教授 · 清华大学计算机科学与技术系</div>
                  <div class="timeline-organization clickable" @click="viewOrganization('清华大学')">清华大学</div>
                  <div class="timeline-description">计算机科学与技术系教授、博士生导师</div>
                  <div class="timeline-achievement">
                    <div class="achievement-item" @click="viewProject('深度学习平台建设')">深度学习平台建设</div>
                    <div class="achievement-item" @click="viewProject('智能医疗影像分析系统')">智能医疗影像分析系统</div>
                    <div class="achievement-item" @click="viewProject('自动驾驶算法研究')">自动驾驶算法研究</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-year">2009年 - 2012年</div>
                  <div class="timeline-title">副教授 · 清华大学计算机科学与技术系</div>
                  <div class="timeline-organization clickable" @click="viewOrganization('清华大学')">清华大学</div>
                  <div class="timeline-description">计算机科学与技术系副教授</div>
                  <div class="timeline-achievement">
                    <div class="achievement-item" @click="viewProject('机器学习算法优化')">机器学习算法优化</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-year">2006年 - 2009年</div>
                  <div class="timeline-title">博士后研究员 · 斯坦福大学人工智能实验室</div>
                  <div class="timeline-organization clickable" @click="viewOrganization('斯坦福大学')">斯坦福大学</div>
                  <div class="timeline-description">研究方向：深度学习与计算机视觉</div>
                </div>
                </template>
              </div>
            </div>

            <!-- 合作关系网络 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-network-panel' }">
              <div class="profile-section">
                <div class="profile-section-title">
                  <i class="fas fa-project-diagram"></i>
                  <span>{{ activeTag }}</span>合作关系网络</div>
                <div class="network-card" @click="handleNetworkClick">
                  <svg class="network-svg" viewBox="0 0 700 360" v-html="buildNetworkSvg(activeProfileTagData)"></svg>
                </div>
                <!--div class="network-note">{{ activeProfileTagData.note }}</div-->
                <div class="network-note">该网络展示{{ activeExpert.name }}{{ activeExpert.profileTitle || '教授、博士生导师' }}在{{ activeTag }}标签下的主要合作机构、平台和科研协作关系。连线粗细用于表示合作频次。</div>
              </div>
            </div>

            <!-- 论文专利 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-output-panel' }">
              <div class="profile-section">
                <div class="profile-section-title">
                  <i class="fas fa-file-alt"></i>
                  <span>{{ activeTag }}</span>相关论文与专利</div>
                <div class="tag-data-layout">
                  <div class="tag-data-list">
                    <div class="tag-data-title">论文列表</div>
                    <div v-for="(paper, i) in papersList" :key="i" class="tag-data-item">
                      <div class="tag-data-item-title">{{ i + 1 }}. {{ paper[0] }}<span class="tag-data-badge">{{ paper[3] }}次引用</span></div>
                      <div class="tag-data-item-meta">{{ paper[1] }} · {{ paper[2] }}</div>
                    </div>
                  </div>
                  <div class="tag-data-list">
                    <div class="tag-data-title">专利列表</div>
                    <div v-for="(patent, i) in patentsList" :key="i" class="tag-data-item">
                      <div class="tag-data-item-title">{{ i + 1 }}. {{ patent[0] }}</div>
                      <div class="tag-data-item-meta">{{ patent[1] }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 参与项目 -->
            <div class="profile-detail-panel" :class="{ active: activeDetailTab === 'profile-project-panel' }">
              <div class="profile-section">
                <div class="profile-section-title">
                  <i class="fas fa-project-diagram"></i>
                  <span>{{ activeTag }}</span>参与项目</div>
                <div class="tag-data-list">
                  <div v-for="(project, i) in projectsList" :key="i" class="tag-data-item tag-project-item">
                    <div>
                      <div class="tag-data-item-title">{{ project[0] }}</div>
                      <div class="tag-data-item-meta">{{ project[1] }} · {{ project[2] }}</div>
                    </div>
                    <div class="tag-project-status">{{ project[3] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- ===================== 模块二：关联信息 ===================== -->
      <section id="relation-info" class="module-content profile-content-section" :class="{ active: activeModule === 'relation-info' }">
        <div class="profile-card-head"><i class="fas fa-project-diagram"></i>关联信息</div>
        <div class="expert-detail-panel">

            <!-- 1. 学者头衔 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-crown"></i>学者头衔</div>
              <div class="title-list">
                <div class="title-card" v-for="card in titleCardList" :key="card.name" @click="viewTitleDetail(card.name)">
                  <div class="title-card-label">{{ card.category }}</div>
                  <div class="title-card-title">{{ card.title }}</div>
                </div>
              </div>
            </div>

            <!-- 2. 关键学术指标 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-chart-line"></i>关键学术指标</div>
              <div class="relation-header">
                <div class="relation-card" @click="viewAcademicDetail('papers')">
                  <div class="relation-card-icon"><i class="fas fa-file-alt"></i></div>
                  <div class="relation-card-number">{{ activeRelationTagData.papers }}</div>
                  <div class="relation-card-label">发表论文</div>
                </div>
                <div class="relation-card" @click="viewAcademicDetail('citations')">
                  <div class="relation-card-icon"><i class="fas fa-quote-right"></i></div>
                  <div class="relation-card-number">{{ activeRelationTagData.citations }}</div>
                  <div class="relation-card-label">总引用数</div>
                </div>
                <div class="relation-card" @click="viewAcademicDetail('hindex')">
                  <div class="relation-card-icon"><i class="fas fa-chart-line"></i></div>
                  <div class="relation-card-number">{{ activeRelationTagData.hIndex }}</div>
                  <div class="relation-card-label">H指数</div>
                </div>
                <div class="relation-card" @click="viewAcademicDetail('patents')">
                  <div class="relation-card-icon"><i class="fas fa-lightbulb"></i></div>
                  <div class="relation-card-number">{{ activeRelationTagData.patents }}</div>
                  <div class="relation-card-label">发明专利</div>
                </div>
              </div>
            </div>

            <!-- 3. 研究主题分布 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-chart-pie"></i>研究主题分布</div>
              <div class="topic-distribution">
                <div class="topic-chart-container">
                  <div class="relation-topic-pie" v-html="buildTopicPieSvg(activeRelationTagData.topics)"></div>
                </div>
                <div class="topic-legend">
                  <div v-for="(topic, i) in activeRelationTagData.topics" :key="i"
                       class="topic-legend-item" :class="{ active: activeRelationTopic === topic[0] }"
                       @click="selectRelationTopic(topic[0])">
                    <span class="topic-legend-color" :style="{ background: topic[2] }"></span>
                    <span>{{ topic[0] }} ({{ topic[1] }}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. 代表成果 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-star"></i>代表成果</div>
              <div v-if="filteredRelationPapers.length" class="paper-list">
                <div v-for="(paper, i) in filteredRelationPapers" :key="i" class="paper-card" @click="viewPaperDetail(paper[0])">
                  <div class="paper-title">{{ i + 1 }}. {{ paper[0] }}</div>
                  <div class="paper-venue">{{ paper[1] }}</div>
                  <div class="paper-meta">
                    <div class="paper-meta-item"><i class="fas fa-user"></i> {{ paper[3] }}</div>
                    <div class="paper-meta-item"><i class="fas fa-quote-right"></i> 引用: {{ paper[2] }}</div>
                    <div class="paper-meta-item"><i class="fas fa-fire"></i> 高被引</div>
                  </div>
                  <div class="paper-abstract">{{ paper[4] }}</div>
                </div>
              </div>
              <div v-else class="tag-empty">该主题下暂无代表成果</div>
            </div>

            <!-- 5. 合作网络 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-project-diagram"></i>合作网络</div>
              <div class="network-card" @click="handleNetworkClick">
                <svg class="network-svg" viewBox="0 0 700 350" v-html="buildNetworkSvg(activeProfileTagData)"></svg>
              </div>
              <div class="network-note">{{ activeRelationTagData.networkNote }}</div>
              <div class="info-grid" style="margin-top: 16px;">
                <div class="info-item"><div class="info-label">合作专家</div><div class="info-value">{{ activeRelationTagData.network[0] }}</div></div>
                <div class="info-item"><div class="info-label">合作机构</div><div class="info-value">{{ activeRelationTagData.network[1] }}</div></div>
                <div class="info-item"><div class="info-label">国际合作</div><div class="info-value">{{ activeRelationTagData.network[2] }}</div></div>
                <div class="info-item"><div class="info-label">合作强度</div><div class="info-value">{{ activeRelationTagData.network[3] }}</div></div>
              </div>
            </div>

            <!-- 6. 合作学者 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-users"></i>合作学者</div>
              <div class="scholar-list">
                <div v-for="(scholar, i) in activeRelationScholars" :key="i" class="scholar-card" @click="viewScholarDetail(scholar[0])">
                  <div class="scholar-card-header">
                    <div class="scholar-card-avatar">{{ scholar[0].charAt(0) }}</div>
                    <div>
                      <div class="scholar-card-name">{{ scholar[0] }}</div>
                      <div class="scholar-card-meta">{{ scholar[1] }} · 合作论文: {{ scholar[2] }}</div>
                    </div>
                  </div>
                  <div class="scholar-card-tags">
                    <span v-for="(t, j) in scholar[3]" :key="j" class="scholar-card-tag">{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 7. 相似学者 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-user-friends"></i>相似学者</div>
              <div class="scholar-list">
                <div class="scholar-card" @click="viewScholarDetail('陈教授')">
                  <div class="scholar-card-header">
                    <div class="scholar-card-avatar">陈</div>
                    <div>
                      <div class="scholar-card-name">陈教授</div>
                      <div class="scholar-card-meta">斯坦福大学教授 · 相似度: 92%</div>
                    </div>
                  </div>
                  <div class="scholar-card-tags">
                    <span class="scholar-card-tag">计算机视觉</span>
                    <span class="scholar-card-tag">深度学习</span>
                  </div>
                </div>
                <div class="scholar-card" @click="viewScholarDetail('刘博士')">
                  <div class="scholar-card-header">
                    <div class="scholar-card-avatar">刘</div>
                    <div>
                      <div class="scholar-card-name">刘博士</div>
                      <div class="scholar-card-meta">MIT研究员 · 相似度: 88%</div>
                    </div>
                  </div>
                  <div class="scholar-card-tags">
                    <span class="scholar-card-tag">机器学习</span>
                    <span class="scholar-card-tag">强化学习</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 8. 人才动态（服务端 talent_dynamic 优先，无数据回退内置演示） -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-bell"></i>人才动态</div>
              <template v-if="dynamicList">
                <div class="timeline-item" v-for="d in dynamicList" :key="d.period + d.title">
                  <div class="timeline-year">{{ d.period }}</div>
                  <div class="timeline-title">{{ d.title }}</div>
                  <div class="timeline-organization">{{ d.organization }}</div>
                </div>
              </template>
              <template v-else>
                <div class="timeline-item">
                  <div class="timeline-year">2024年3月</div>
                  <div class="timeline-title">入选2024年度AI全球最具影响力学者榜单</div>
                  <div class="timeline-organization">AMiner</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-year">2024年1月</div>
                  <div class="timeline-title">担任IEEE TPAMI副主编</div>
                  <div class="timeline-organization">IEEE</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-year">2023年12月</div>
                  <div class="timeline-title">获CCF自然科学奖一等奖</div>
                  <div class="timeline-organization">中国计算机学会</div>
                </div>
              </template>
            </div>
          </div>
      </section>

      <!-- ===================== 模块三：行为信息 ===================== -->
      <section id="behavior-info" class="module-content profile-content-section" :class="{ active: activeModule === 'behavior-info' }">
        <div class="profile-card-head"><i class="fas fa-chart-line"></i>行为信息</div>
        <div class="expert-detail-panel">
            <div class="behavior-detail-tabs">
              <button class="behavior-detail-tab" :class="{ active: activeBehaviorTab === 'behavior-migration-panel' }" @click="switchBehaviorTab('behavior-migration-panel')"><i class="fas fa-route"></i> 人才迁徙路径</button>
              <button class="behavior-detail-tab" :class="{ active: activeBehaviorTab === 'behavior-growth-panel' }" @click="switchBehaviorTab('behavior-growth-panel')"><i class="fas fa-chart-line"></i> 科研成长轨迹</button>
              <button class="behavior-detail-tab" :class="{ active: activeBehaviorTab === 'behavior-company-panel' }" @click="switchBehaviorTab('behavior-company-panel')"><i class="fas fa-building"></i> 合作企业</button>
            </div>

            <!-- 人才迁徙路径 -->
            <div class="profile-detail-panel" :class="{ active: activeBehaviorTab === 'behavior-migration-panel' }" style="background: transparent; padding: 0;">
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-route"></i>人才迁徙路径</div>
                <div style="background:#f5f7fa; padding:24px; border-radius:8px;">
                  <div class="migration-timeline">
                    <div v-for="m in migrationItems" :key="m.id"
                         class="migration-item" :class="{ active: expandedMigrationId === m.id }"
                         @click="toggleMigration(m.id)">
                      <div class="migration-dot" :class="{ active: m.dotActive }"></div>
                      <div class="migration-location">{{ m.location }}</div>
                      <div class="migration-organization">{{ m.organization }}</div>
                      <div class="migration-duration">{{ m.duration }}</div>
                      <div class="migration-role">{{ m.role }}</div>
                      <div class="migration-detail" :class="{ show: expandedMigrationId === m.id }">
                        <div class="migration-detail-content">
                          <p style="margin-bottom:10px; line-height:1.7; color:#666;">{{ m.description }}</p>
                          <div style="margin-bottom:10px;">
                            <div style="font-weight:600; color:#333; margin-bottom:6px;">任职岗位</div>
                            <div style="font-size:13px; color:#666;">{{ m.position }}</div>
                          </div>
                          <div style="margin-bottom:10px;">
                            <div style="font-weight:600; color:#333; margin-bottom:6px;">参与项目</div>
                            <ul style="list-style:none; padding:0; margin:0;">
                              <li v-for="(p, j) in m.projects" :key="j" style="font-size:13px; color:#666; padding:4px 0; display:flex; align-items:flex-start; gap:8px;">
                                <i class="fas fa-check-circle" style="color:#52c41a; margin-top:2px; flex-shrink:0;"></i>
                                <span>{{ p }}</span>
                              </li>
                            </ul>
                          </div>
                          <div style="margin-bottom:10px;">
                            <div style="font-weight:600; color:#333; margin-bottom:6px;">主要成就</div>
                            <div v-for="(a, j) in m.achievements" :key="j" style="font-size:13px; color:#666; padding:4px 0; display:flex; align-items:center; gap:8px;">
                              <i :class="['fas', a.icon]" :style="{ color: a.color, width: '14px' }"></i>
                              <span>{{ a.text }}</span>
                            </div>
                          </div>
                          <div>
                            <div style="font-weight:600; color:#333; margin-bottom:6px;">{{ m.outputLabel }}</div>
                            <div style="font-size:13px; color:#666; line-height:1.7;">{{ m.outputText }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 科研成长轨迹 -->
            <div class="profile-detail-panel" :class="{ active: activeBehaviorTab === 'behavior-growth-panel' }" style="background: transparent; padding: 0;">
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-chart-line"></i>科研成长轨迹</div>
                <div class="milestone-timeline">
                  <div v-for="m in milestoneItems" :key="m.key"
                       class="milestone-item" :class="{ active: m.active }"
                       @click="showMilestoneDetail(m.key)">
                    <div class="milestone-dot" :class="{ active: m.active }" :style="{ background: m.color }"></div>
                    <div class="milestone-year">{{ m.year }}</div>
                    <div class="milestone-title">{{ m.title }}</div>
                    <div class="milestone-score">影响力评分: {{ m.score }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 合作企业 -->
            <div class="profile-detail-panel" :class="{ active: activeBehaviorTab === 'behavior-company-panel' }" style="background: transparent; padding: 0;">
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-building"></i>合作企业</div>
                <div class="collaboration-metrics">
                  <template v-if="companyMetricList">
                    <div v-for="m in companyMetricList" :key="m.label" class="collab-metric-card clickable" @click="showMetricDetail(m.metricKey)">
                      <div class="collab-metric-value">{{ m.value }}</div>
                      <div class="collab-metric-label">{{ m.label }}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="collab-metric-card clickable" @click="showMetricDetail('合作指数')">
                      <div class="collab-metric-value">85%</div>
                      <div class="collab-metric-label">合作指数</div>
                    </div>
                    <div class="collab-metric-card clickable" @click="showMetricDetail('专利')">
                      <div class="collab-metric-value">28项</div>
                      <div class="collab-metric-label">专利</div>
                    </div>
                    <div class="collab-metric-card clickable" @click="showMetricDetail('项目')">
                      <div class="collab-metric-value">15个</div>
                      <div class="collab-metric-label">项目</div>
                    </div>
                    <div class="collab-metric-card clickable" @click="showMetricDetail('资金')">
                      <div class="collab-metric-value">2800万</div>
                      <div class="collab-metric-label">合作资金</div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="profile-section">
                <div class="profile-section-title"><i class="fas fa-handshake"></i>合作企业列表</div>
                <div class="company-list">
                  <div v-for="c in companyCards" :key="c.name" class="company-card" @click="viewCompanyDetail(c.name)">
                    <div class="company-header">
                      <div class="company-name clickable">{{ c.name }}</div>
                      <div class="company-logo"><i :class="['fas', c.icon]" :style="{ color: c.iconColor }"></i></div>
                    </div>
                    <div class="company-info-grid">
                      <div class="info-item"><div class="info-label">合作项目</div><div class="info-value">{{ c.projects }}个</div></div>
                      <div class="info-item"><div class="info-label">合作金额</div><div class="info-value">{{ c.budgetWan }}万</div></div>
                      <div class="info-item"><div class="info-label">联合专利</div><div class="info-value">{{ c.patents }}项</div></div>
                      <div class="info-item"><div class="info-label">合作论文</div><div class="info-value">{{ c.papers }}篇</div></div>
                    </div>
                    <div class="company-tags">
                      <span v-for="(t, j) in c.tags" :key="j" class="scholar-card-tag">{{ t }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- ===================== 模块四：心理信息 ===================== -->
      <section id="psychology-info" class="module-content profile-content-section" :class="{ active: activeModule === 'psychology-info' }">
        <div class="profile-card-head"><i class="fas fa-brain"></i>心理信息</div>
        <div class="expert-detail-panel">
            <!-- 1. 科研诚信奖项（服务端 talent_award 优先，无数据回退模板硬编码 3 卡） -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-award"></i>科研诚信奖项<span class="section-score">诚信评分: {{ awardInfo.score }}% ({{ awardInfo.grade }})</span></div>
              <div class="award-list">
                <div v-for="(a, i) in awardCardList" :key="i" class="award-card" @click="viewAwardDetail(a)">
                  <div class="award-icon"><i :class="['fas', a.icon]" :style="{ color: a.iconColor }"></i></div>
                  <div class="award-info">
                    <div class="award-name">{{ a.name }}</div>
                    <div class="award-year">{{ a.year }}</div>
                    <div class="award-reason">{{ a.reason }}</div>
                  </div>
                  <i class="fas fa-chevron-right award-arrow" style="color:#1890ff;"></i>
                </div>
              </div>
            </div>

            <!-- 2. 意识形态指标（服务端 talent_ideology 优先，无数据回退静态 75/95/88/82/78） -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-balance-scale"></i>意识形态指标<span class="section-score">政治评分: {{ ideologyInfo.political }}% ({{ ideologyInfo.political >= 80 ? '正面' : ideologyInfo.political >= 60 ? '中立' : '需关注' }})</span></div>
              <div class="ideology-chart">
                <div v-for="d in ideologyDimensions" :key="d.key" class="ideology-dimension" @click="viewIdeologyDetail(d.name)">
                  <div class="dimension-header"><div class="dimension-name">{{ d.name }}</div><div class="dimension-score">{{ d.score }}%</div></div>
                  <div class="dimension-progress"><div class="dimension-bar" :style="{ width: d.score + '%', background: d.grad }"></div></div>
                  <div style="font-size:13px; color:#666;">{{ d.desc }}</div>
                </div>
              </div>
            </div>

            <!-- 3. 舆情指标详情（服务端 talent_sentiment 优先，无数据回退静态 85/12/3） -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-newspaper"></i>舆情指标详情<span class="section-score">情感评分: {{ sentimentInfo.score }}% ({{ sentimentInfo.score >= 70 ? '正面' : sentimentInfo.score >= 40 ? '中性' : '负面' }})</span></div>
              <div class="sentiment-analysis">
                <div class="sentiment-chart">
                  <div class="sentiment-item positive">
                    <div class="sentiment-label">正面</div>
                    <div class="sentiment-bar-container"><div class="sentiment-bar" :style="{ width: sentimentInfo.positive + '%' }"></div></div>
                    <div class="sentiment-value">{{ sentimentInfo.positive }}%</div>
                  </div>
                  <div class="sentiment-item neutral">
                    <div class="sentiment-label">中性</div>
                    <div class="sentiment-bar-container"><div class="sentiment-bar" :style="{ width: sentimentInfo.neutral + '%' }"></div></div>
                    <div class="sentiment-value">{{ sentimentInfo.neutral }}%</div>
                  </div>
                  <div class="sentiment-item negative">
                    <div class="sentiment-label">负面</div>
                    <div class="sentiment-bar-container"><div class="sentiment-bar" :style="{ width: sentimentInfo.negative + '%' }"></div></div>
                    <div class="sentiment-value">{{ sentimentInfo.negative }}%</div>
                  </div>
                </div>
              </div>
              <div class="media-reports" :class="{ expanded: expandedMedia }" @click="toggleMedia()">
                <div class="media-header">
                  <i class="fas fa-newspaper"></i>
                  <span>媒体报道</span>
                  <span class="media-count">共 {{ mediaReports.length }} 篇相关报道</span>
                  <i class="fas fa-chevron-right" style="margin-left:auto;"></i>
                </div>
                <div class="media-expand-list" :class="{ expanded: expandedMedia }">
                  <div class="media-expand-header">
                    <div class="media-expand-stats">
                      <span>全部 {{ mediaReports.length }} 篇</span>
                      <span>正面 {{ positiveReportCount }} 篇</span>
                    </div>
                  </div>
                  <div class="expand-reports-grid">
                    <div v-for="(report, i) in mediaReports" :key="i" class="expand-report-card">
                      <div class="expand-report-header">
                        <div class="expand-report-index">{{ i + 1 }}</div>
                        <div class="expand-report-title">{{ report.title }}</div>
                      </div>
                      <div class="expand-report-meta">
                        <span><i class="fas fa-newspaper"></i> {{ report.source }}</span>
                        <span><i class="fas fa-calendar"></i> {{ report.date }}</span>
                      </div>
                      <div class="expand-report-summary">{{ report.summary }}</div>
                      <a :href="report.url" class="report-link" target="_blank">查看原文</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. 热点话题与价值观表述 -->
            <div class="profile-section">
              <div class="profile-section-title"><i class="fas fa-comments"></i>热点话题与价值观表述</div>
              <div class="topics-section">
                <h4 style="font-size:14px; color:#666; margin-bottom:16px;">关注热点话题</h4>
                <div class="topic-tags" style="margin-bottom:24px;">
                  <div class="topic-tag" @click="viewTopicDetail('人工智能伦理')"><span class="topic-name">人工智能伦理</span><span class="topic-count">提及 15 次</span></div>
                  <div class="topic-tag" @click="viewTopicDetail('深度学习')"><span class="topic-name">深度学习</span><span class="topic-count">提及 28 次</span></div>
                  <div class="topic-tag" @click="viewTopicDetail('医疗AI')"><span class="topic-name">医疗AI</span><span class="topic-count">提及 12 次</span></div>
                  <div class="topic-tag" @click="viewTopicDetail('科研诚信')"><span class="topic-name">科研诚信</span><span class="topic-count">提及 8 次</span></div>
                  <div class="topic-tag" @click="viewTopicDetail('产学研合作')"><span class="topic-name">产学研合作</span><span class="topic-count">提及 20 次</span></div>
                </div>
              </div>
              <div class="values-section">
                <h4 style="font-size:14px; color:#666; margin-bottom:16px;">核心价值观表述</h4>
                <div class="value-quotes" style="display:flex; flex-direction:column; gap:12px;">
                  <div class="value-quote" @click="viewValueDetail('科研价值观')">
                    <i class="fas fa-quote-left" style="color:#1890ff; margin-right:8px;"></i>
                    <span>科学研究应该服务于社会，解决实际问题，而不是为了发论文而发论文。</span>
                    <div class="value-source" style="font-size:12px; color:#999; margin-top:8px; padding-left:24px;">—— 2023年科技论坛访谈</div>
                  </div>
                  <div class="value-quote" @click="viewValueDetail('人才培养观')">
                    <i class="fas fa-quote-left" style="color:#1890ff; margin-right:8px;"></i>
                    <span>培养学生要注重创新思维和实践能力的结合，让他们敢于挑战权威。</span>
                    <div class="value-source" style="font-size:12px; color:#999; margin-top:8px; padding-left:24px;">—— 2024年教育峰会发言</div>
                  </div>
                  <div class="value-quote" @click="viewValueDetail('AI发展观')">
                    <i class="fas fa-quote-left" style="color:#1890ff; margin-right:8px;"></i>
                    <span>AI技术的发展必须以人为本，确保技术向善，避免算法歧视。</span>
                    <div class="value-source" style="font-size:12px; color:#999; margin-top:8px; padding-left:24px;">—— 2023年人工智能大会主题演讲</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
        </div>
      </div>
    </div>

    <!-- 快捷操作浮窗 -->
    <div class="gkx-quick">
      <button class="gkx-btn" @click="$router.push({ name: 'talentLibrary', query: { expert: activeExpert.name } })">＋ 加入人才集合</button>
      <button class="gkx-btn primary">订阅人才动态</button>
    </div>

    <!-- ===================== 弹窗一：话题/价值观详情 ===================== -->
    <div v-if="dialog.type === 'topicValue'" class="modal-overlay active" @click.self="closeDialog()">
      <div class="modal-container" style="max-width: 700px;">
        <div class="modal-header">
          <div class="modal-title"><i class="fas fa-file-alt"></i> {{ dialog.data.title }}</div>
          <button class="modal-close" @click="closeDialog()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div v-if="dialog.data.subtype === 'topic' && dialog.data.payload">
            <div style="margin-bottom: 16px;">
              <div style="font-size:14px; color:#333; font-weight:600; margin-bottom:8px;">核心观点</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.views }}</div>
              <div style="font-size:12px; color:#999; margin-top:4px;">提及次数: {{ dialog.data.payload.mentions }}</div>
            </div>
            <div class="profile-section-title" style="font-size:14px;"><i class="fas fa-link"></i> 来源</div>
            <div class="source-list" style="margin-top:12px;">
              <div v-for="(src, i) in dialog.data.payload.sources" :key="i" class="source-item"
                   style="padding:14px; border:1px solid #e8e8e8; border-radius:8px; margin-bottom:10px; background:#fafafa;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span style="padding:2px 8px; background:#e6f7ff; color:#1890ff; border-radius:3px; font-size:11px;">{{ src.type }}</span>
                  <span style="font-size:13px; font-weight:600; color:#333;">{{ src.title }}</span>
                </div>
                <div style="font-size:12px; color:#999; margin-bottom:8px;">{{ src.author }} · {{ src.journal }} · {{ src.year }} · {{ src.date }}</div>
                <div style="font-size:13px; color:#666; line-height:1.7; padding:10px; background:#fff; border-left:3px solid #1890ff; border-radius:4px;">{{ src.quote }}</div>
              </div>
            </div>
          </div>
          <div v-else-if="dialog.data.subtype === 'value' && dialog.data.payload">
            <div style="margin-bottom: 16px; padding:16px; background:#f5f7fa; border-left:4px solid #1890ff; border-radius:6px;">
              <div style="font-size:14px; color:#333; font-weight:600; margin-bottom:8px;">核心观点</div>
              <div style="font-size:15px; color:#333; line-height:1.7; font-style:italic;">"{{ dialog.data.payload.quote }}"</div>
              <div style="font-size:12px; color:#999; margin-top:8px;">— {{ dialog.data.payload.source }}</div>
            </div>
            <div style="margin-bottom: 16px;">
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.views }}</div>
            </div>
            <div class="profile-section-title" style="font-size:14px;"><i class="fas fa-link"></i> 来源</div>
            <div class="source-list" style="margin-top:12px;">
              <div v-for="(src, i) in dialog.data.payload.sources" :key="i" class="source-item"
                   style="padding:14px; border:1px solid #e8e8e8; border-radius:8px; margin-bottom:10px; background:#fafafa;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span style="padding:2px 8px; background:#e6f7ff; color:#1890ff; border-radius:3px; font-size:11px;">{{ src.type }}</span>
                  <span style="font-size:13px; font-weight:600; color:#333;">{{ src.title }}</span>
                </div>
                <div style="font-size:12px; color:#999; margin-bottom:8px;">{{ src.author }} · {{ src.journal }} · {{ src.year }} · {{ src.date }}</div>
                <div style="font-size:13px; color:#666; line-height:1.7; padding:10px; background:#fff; border-left:3px solid #1890ff; border-radius:4px;">{{ src.quote }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== 弹窗二：通用指标/详情 ===================== -->
    <div v-if="dialog.type === 'metric'" class="modal-overlay active" @click.self="closeDialog()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title"><i class="fas fa-info-circle"></i> {{ dialog.data.title }}</div>
          <button class="modal-close" @click="closeDialog()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <!-- 合作节点证据（合作关系网节点点击溯源） -->
          <div v-if="dialog.data.subtype === 'collabEvidence' && dialog.data.payload">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
              <span style="font-size:15px; font-weight:600; color:#333;">{{ dialog.data.payload.label }}</span>
              <span v-if="dialog.data.payload.type && dialog.data.payload.type !== 'self'" style="padding:2px 10px; background:#e6f7ff; color:#1890ff; border-radius:10px; font-size:12px;">{{ dialog.data.payload.type }}</span>
              <span style="font-size:12px; color:#999;">「{{ dialog.data.payload.tag }}」标签 · 按 collab_key 溯源</span>
            </div>
            <template v-if="dialog.data.payload.evidence">
              <div v-if="dialog.data.payload.evidence.education && dialog.data.payload.evidence.education.length" style="margin-bottom:16px;">
                <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">教育背景</div>
                <div v-for="(r, i) in dialog.data.payload.evidence.education" :key="'e' + i" style="padding:8px 12px; background:#f8f9fb; border-radius:6px; margin-bottom:8px;">
                  <div style="font-size:13px; color:#333; font-weight:600;">{{ r.period }} · {{ r.degreeMajor }}</div>
                  <div style="font-size:13px; color:#666; margin-top:2px;">{{ r.school }}<span v-if="r.description"> — {{ r.description }}</span></div>
                </div>
              </div>
              <div v-if="dialog.data.payload.evidence.career && dialog.data.payload.evidence.career.length" style="margin-bottom:16px;">
                <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">工作经历</div>
                <div v-for="(r, i) in dialog.data.payload.evidence.career" :key="'c' + i" style="padding:8px 12px; background:#f8f9fb; border-radius:6px; margin-bottom:8px;">
                  <div style="font-size:13px; color:#333; font-weight:600;">{{ r.period }} · {{ r.position }}</div>
                  <div style="font-size:13px; color:#666; margin-top:2px;">{{ r.organization }}<span v-if="r.description"> — {{ r.description }}</span></div>
                </div>
              </div>
              <div v-if="dialog.data.payload.evidence.papers && dialog.data.payload.evidence.papers.length" style="margin-bottom:16px;">
                <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">论文 / 专利</div>
                <div v-for="(r, i) in dialog.data.payload.evidence.papers" :key="'p' + i" style="padding:8px 12px; background:#f8f9fb; border-radius:6px; margin-bottom:8px; display:flex; align-items:flex-start; gap:8px;">
                  <span :style="{ padding: '2px 8px', borderRadius: '10px', fontSize: '12px', flexShrink: 0, background: r.type === 'patent' ? '#fff7e6' : '#e6f7ff', color: r.type === 'patent' ? '#fa8c16' : '#1890ff' }">{{ r.type === 'patent' ? '专利' : '论文' }}</span>
                  <div>
                    <div style="font-size:13px; color:#333; font-weight:600;">{{ r.title }}</div>
                    <div style="font-size:13px; color:#666; margin-top:2px;">{{ r.source }}<span v-if="r.year">（{{ r.year }}<span v-if="r.type !== 'patent' && r.citations">，被引 {{ r.citations }}</span>）</span></div>
                  </div>
                </div>
              </div>
              <div v-if="dialog.data.payload.evidence.projects && dialog.data.payload.evidence.projects.length" style="margin-bottom:16px;">
                <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">参与项目</div>
                <div v-for="(r, i) in dialog.data.payload.evidence.projects" :key="'j' + i" style="padding:8px 12px; background:#f8f9fb; border-radius:6px; margin-bottom:8px;">
                  <div style="font-size:13px; color:#333; font-weight:600;">{{ r.title }}</div>
                  <div style="font-size:13px; color:#666; margin-top:2px;">{{ r.role }}<span v-if="r.period"> · {{ r.period }}</span><span v-if="r.status"> · {{ r.status }}</span></div>
                </div>
              </div>
              <div v-if="!((dialog.data.payload.evidence.education || []).length) && !((dialog.data.payload.evidence.career || []).length) && !((dialog.data.payload.evidence.papers || []).length) && !((dialog.data.payload.evidence.projects || []).length)" style="font-size:13px; color:#999;">该节点暂未关联教育/工作/论文/项目记录（子表 collab_key 未挂载）。</div>
            </template>
            <div v-else style="font-size:13px; color:#999;">暂无关联记录（证据接口不可用）。</div>
          </div>

          <!-- 机构画像 -->
          <div v-else-if="dialog.data.subtype === 'organization' && dialog.data.payload">
            <div v-if="dialog.data.payload.homepage" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">主页地址</div>
              <div style="font-size:13px; word-break:break-all;"><a :href="dialog.data.payload.homepage" target="_blank" rel="noopener" style="color:#1890ff;">{{ dialog.data.payload.homepage }}</a></div>
            </div>
            <div v-if="dialog.data.payload.type" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:20px;">
              <div><div style="font-size:12px; color:#999;">类型</div><div style="font-size:14px;">{{ dialog.data.payload.type }}</div></div>
              <div><div style="font-size:12px; color:#999;">所在地</div><div style="font-size:14px;">{{ dialog.data.payload.location }}</div></div>
              <div><div style="font-size:12px; color:#999;">成立时间</div><div style="font-size:14px;">{{ dialog.data.payload.founded }}</div></div>
              <div><div style="font-size:12px; color:#999;">综合排名</div><div style="font-size:14px;">{{ dialog.data.payload.ranking }}</div></div>
              <div><div style="font-size:12px; color:#999;">学生数</div><div style="font-size:14px;">{{ dialog.data.payload.students }}</div></div>
              <div><div style="font-size:12px; color:#999;">教师数</div><div style="font-size:14px;">{{ dialog.data.payload.teachers }}</div></div>
            </div>
            <div style="margin-bottom:16px;" v-if="dialog.data.payload.intro">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">机构简介</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.intro }}</div>
            </div>
            <div v-if="dialog.data.payload.strengths" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">优势学科</div>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <span v-for="(s, i) in dialog.data.payload.strengths" :key="i" style="padding:4px 10px; background:#e6f7ff; color:#1890ff; border-radius:4px; font-size:12px;">{{ s }}</span>
              </div>
            </div>
            <div v-if="dialog.data.payload.achievements">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">代表性成果</div>
              <ul style="list-style:none; padding:0; margin:0;">
                <li v-for="(a, i) in dialog.data.payload.achievements" :key="i" style="padding:6px 0; font-size:13px; color:#666; display:flex; align-items:flex-start; gap:8px;">
                  <i class="fas fa-check-circle" style="color:#52c41a; margin-top:2px;"></i><span>{{ a }}</span>
                </li>
              </ul>
            </div>
            <div v-if="!dialog.data.payload.type && !dialog.data.payload.homepage" style="font-size:13px; color:#999;">暂无机构详细信息。</div>
          </div>

          <!-- 学者详情 -->
          <div v-else-if="dialog.data.subtype === 'scholar' && dialog.data.payload">
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:20px;">
              <div><div style="font-size:12px; color:#999;">所属机构</div><div style="font-size:14px;">{{ dialog.data.payload.institution }}</div></div>
              <div><div style="font-size:12px; color:#999;">职称</div><div style="font-size:14px;">{{ dialog.data.payload.title }}</div></div>
              <div><div style="font-size:12px; color:#999;">发表论文</div><div style="font-size:14px;">{{ dialog.data.payload.papers }}</div></div>
              <div><div style="font-size:12px; color:#999;">总引用</div><div style="font-size:14px;">{{ dialog.data.payload.citations }}</div></div>
              <div><div style="font-size:12px; color:#999;">H指数</div><div style="font-size:14px;">{{ dialog.data.payload.hIndex }}</div></div>
              <div><div style="font-size:12px; color:#999;">邮箱</div><div style="font-size:14px;">{{ dialog.data.payload.email }}</div></div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">研究方向</div>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <span v-for="(f, i) in dialog.data.payload.fields" :key="i" style="padding:4px 10px; background:#e6f7ff; color:#1890ff; border-radius:4px; font-size:12px;">{{ f }}</span>
              </div>
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">学者简介</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.intro }}</div>
            </div>
          </div>

          <!-- 学者头衔详情 -->
          <div v-else-if="dialog.data.subtype === 'title' && dialog.data.payload">
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:20px;">
              <div><div style="font-size:12px; color:#999;">获奖时间</div><div style="font-size:14px;">{{ dialog.data.payload.awardDate }}</div></div>
              <div><div style="font-size:12px; color:#999;">授予机构</div><div style="font-size:14px;">{{ dialog.data.payload.awardingOrg }}</div></div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">头衔简介</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.description }}</div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">获得荣誉</div>
              <ul style="list-style:none; padding:0; margin:0;">
                <li v-for="(h, i) in dialog.data.payload.honors" :key="i" style="padding:6px 0; font-size:13px; color:#666; display:flex; align-items:flex-start; gap:8px;">
                  <i class="fas fa-check-circle" style="color:#52c41a; margin-top:2px;"></i><span>{{ h }}</span>
                </li>
              </ul>
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">申报条件</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.eligibility }}</div>
            </div>
          </div>

          <!-- 学术指标详情（含子页签） -->
          <div v-else-if="dialog.data.subtype === 'academic' && dialog.data.payload">
            <!-- 引用趋势 summary -->
            <div v-if="dialog.data.payload.summary" style="display:flex; gap:16px; margin-bottom:20px; padding:16px; background:linear-gradient(135deg,#1890ff 0%,#722ed1 100%); border-radius:8px;">
              <div v-for="(s, i) in dialog.data.payload.summary" :key="i" style="flex:1; text-align:center; padding:8px; background:rgba(255,255,255,0.15); border-radius:6px;">
                <div style="font-size:22px; font-weight:700; color:#fff;">{{ s.value }}</div>
                <div style="font-size:12px; color:rgba(255,255,255,0.8); margin-top:4px;">{{ s.label }}</div>
              </div>
            </div>
            <!-- H指数特有 -->
            <div v-if="dialog.data.payload.hindexValue">
              <div style="text-align:center; padding:20px; background:#f5f7fa; border-radius:8px; margin-bottom:16px;">
                <div style="font-size:48px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.hindexValue }}</div>
                <div style="font-size:13px; color:#666;">{{ dialog.data.payload.desc }}</div>
              </div>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:16px;">
                <div v-for="(s, i) in dialog.data.payload.stats" :key="i" style="text-align:center; padding:12px; background:#f5f7fa; border-radius:6px;">
                  <div style="font-size:18px; font-weight:700; color:#333;">{{ s.value }}</div>
                  <div style="font-size:12px; color:#999;">{{ s.label }}</div>
                </div>
              </div>
              <div>
                <div v-for="(r, i) in dialog.data.payload.ranks" :key="i" style="display:flex; align-items:center; gap:12px; padding:10px; background:#f5f7fa; border-radius:6px; margin-bottom:8px;">
                  <i :class="['fas', r.icon]" style="color:#1890ff; font-size:18px;"></i>
                  <div style="flex:1; font-size:13px; color:#666;">{{ r.label }}</div>
                  <div style="font-size:14px; font-weight:600; color:#1890ff;">{{ r.value }}</div>
                </div>
              </div>
            </div>
            <!-- 含 tabs 的 papers / citations / patents -->
            <div v-else-if="dialog.data.payload.tabs">
              <div style="display:flex; gap:8px; margin-bottom:16px; border-bottom:1px solid #e8e8e8; padding-bottom:12px;">
                <button v-for="t in dialog.data.payload.tabs" :key="t.id"
                        @click="activeMetricTab = t.id"
                        :class="['filter-btn', { active: activeMetricTab === t.id }]"
                        style="padding:6px 14px; border:1px solid #e8e8e8; background:#fff; border-radius:20px; font-size:13px; color:#666; cursor:pointer;">
                  <i :class="['fas', t.icon]"></i> {{ t.label }}
                </button>
              </div>
              <div v-for="t in dialog.data.payload.tabs" :key="t.id" v-show="activeMetricTab === t.id">
                <!-- 论文/专利列表 -->
                <div v-if="t.type === 'paper-list' || t.type === 'patent-list'">
                  <div v-for="(item, i) in t.items" :key="i" style="padding:12px; border:1px solid #e8e8e8; border-radius:6px; margin-bottom:8px; background:#fafafa;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                      <span v-if="item.rank" style="padding:2px 8px; background:#1890ff; color:#fff; border-radius:3px; font-size:11px; font-weight:600;">{{ item.rank }}</span>
                      <span style="font-size:13px; font-weight:600; color:#333; flex:1;">{{ item.title }}</span>
                    </div>
                    <div style="font-size:12px; color:#999;">{{ item.venue }} · {{ item.year }} · 引用 {{ item.citations }} 次</div>
                  </div>
                </div>
                <!-- 柱状图类列表 -->
                <div v-else-if="t.type === 'bars' || t.type === 'trend-bars'">
                  <div v-for="(item, i) in t.items" :key="i" style="margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; font-size:13px; color:#666; margin-bottom:4px;">
                      <span>{{ item.label }}</span>
                      <span style="font-weight:600; color:#333;">{{ item.value }}</span>
                    </div>
                    <div style="height:8px; background:#e8e8e8; border-radius:4px; overflow:hidden;">
                      <div :style="{ width: item.percent + '%', height: '100%', background: 'linear-gradient(90deg, #1890ff, #36cfc9)', borderRadius: '4px' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 奖项详情 -->
          <div v-else-if="dialog.data.subtype === 'award' && dialog.data.payload">
            <div style="text-align:center; padding:40px 20px 24px; color:#666;">
              <i :class="['fas', dialog.data.payload.icon || 'fa-trophy']" :style="{ fontSize: '48px', color: dialog.data.payload.iconColor || '#faad14', marginBottom: '12px' }"></i>
              <div style="font-size:18px; font-weight:600; color:#333; margin-bottom:4px;">{{ dialog.data.payload.name }}</div>
              <div style="font-size:13px; color:#999;">{{ dialog.data.payload.year }}<template v-if="dialog.data.payload.category"> · {{ dialog.data.payload.category }}</template></div>
            </div>
            <div v-if="dialog.data.payload.reason" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">获奖理由</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.reason }}</div>
            </div>
            <div v-if="dialog.data.payload.description" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">奖项简介</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.description }}</div>
            </div>
            <div v-if="dialog.data.payload.awardingOrg" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">授予机构</div>
              <div style="font-size:13px; color:#666;">{{ dialog.data.payload.awardingOrg }}</div>
            </div>
            <div v-if="dialog.data.payload.category" style="margin-bottom:8px;">
              <span style="display:inline-block; padding:4px 10px; background:#e6f7ff; color:#1890ff; border-radius:4px; font-size:12px;">{{ dialog.data.payload.category }}</span>
            </div>
          </div>

          <!-- 意识形态详情 -->
          <div v-else-if="dialog.data.subtype === 'ideology' && dialog.data.payload">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; padding:16px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:14px; color:#666;">综合评分</div>
              <div style="font-size:24px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.score }}</div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">维度说明</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.description }}</div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">评估指标</div>
              <div v-for="(ind, i) in dialog.data.payload.indicators" :key="i" style="padding:10px; background:#f5f7fa; border-radius:6px; margin-bottom:8px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                  <span style="font-size:13px; font-weight:600; color:#333;">{{ ind.name }}</span>
                  <span style="font-size:13px; color:#1890ff; font-weight:600;">{{ ind.score }}</span>
                </div>
                <div style="font-size:12px; color:#999; line-height:1.6;">{{ ind.basis }}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">代表性言论</div>
              <div v-for="(st, i) in dialog.data.payload.statements" :key="i" style="padding:10px; background:#fafafa; border-left:3px solid #1890ff; border-radius:4px; margin-bottom:8px;">
                <div style="font-size:13px; color:#333; line-height:1.7;">"{{ st.text }}"</div>
                <div style="font-size:12px; color:#999; margin-top:4px;">— {{ st.source }} · {{ st.date }}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">评估依据</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.evidence }}</div>
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">数据来源</div>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <span v-for="(d, i) in dialog.data.payload.dataSources" :key="i" style="padding:4px 10px; background:#e6f7ff; color:#1890ff; border-radius:4px; font-size:12px;">{{ d }}</span>
              </div>
            </div>
          </div>

          <!-- 里程碑详情 -->
          <div v-else-if="dialog.data.subtype === 'milestone' && dialog.data.payload">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
              <i :class="['fas', dialog.data.payload.icon]" style="font-size:32px; color:#1890ff;"></i>
              <div>
                <div style="font-size:18px; font-weight:600; color:#333;">{{ dialog.data.payload.event }}</div>
                <div style="font-size:13px; color:#999;">{{ dialog.data.payload.date }}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">主要贡献</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.contribution }}</div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">获得荣誉</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.honor }}</div>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">重要事件</div>
              <ul style="list-style:none; padding:0; margin:0;">
                <li v-for="(e, i) in dialog.data.payload.events" :key="i" style="padding:6px 0; font-size:13px; color:#666; display:flex; align-items:flex-start; gap:8px;">
                  <i class="fas fa-check-circle" style="color:#52c41a; margin-top:2px;"></i><span>{{ e }}</span>
                </li>
              </ul>
            </div>
            <div style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">相关标签</div>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <span v-for="(t, i) in dialog.data.payload.tags" :key="i" style="padding:4px 10px; background:#e6f7ff; color:#1890ff; border-radius:4px; font-size:12px;">{{ t }}</span>
              </div>
            </div>
            <div style="padding:14px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:13px; color:#333; font-weight:600; margin-bottom:4px;">相关报道</div>
              <div style="font-size:13px; color:#666;">{{ dialog.data.payload.newsTitle }}</div>
              <div style="font-size:12px; color:#999; margin-top:4px;">来源: {{ dialog.data.payload.newsSource }} · {{ dialog.data.payload.newsDate }}</div>
            </div>
          </div>

          <!-- 合作指标详情 -->
          <div v-else-if="dialog.data.subtype === 'metric' && dialog.data.payload">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; padding:16px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:14px; color:#666;">{{ dialog.data.payload.summary.label }}</div>
              <div style="font-size:24px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.summary.value }}</div>
            </div>
            <div v-if="dialog.data.payload.desc" style="margin-bottom:16px;">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">指标说明</div>
              <div style="font-size:13px; color:#666; line-height:1.7;">{{ dialog.data.payload.desc }}</div>
            </div>
            <div v-if="dialog.data.payload.breakdowns">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">指标分解</div>
              <div v-for="(row, i) in dialog.data.payload.breakdowns" :key="i" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:12px;">
                <div v-for="(b, j) in row" :key="j" style="padding:12px; background:#f5f7fa; border-radius:6px; text-align:center;">
                  <div style="font-size:16px; font-weight:600; color:#1890ff;">{{ b.value }}</div>
                  <div style="font-size:12px; color:#999;">{{ b.label }}</div>
                </div>
              </div>
            </div>
            <div v-if="dialog.data.payload.patents">
              <div style="font-size:14px; font-weight:600; color:#333; margin-bottom:8px;">专利列表</div>
              <div v-for="(p, i) in dialog.data.payload.patents" :key="i" style="padding:10px; border:1px solid #e8e8e8; border-radius:6px; margin-bottom:8px;">
                <div style="font-size:13px; font-weight:600; color:#333; margin-bottom:4px;">{{ p.name }}</div>
                <div style="font-size:12px; color:#999;">{{ p.type }} · {{ p.date }} · <span :style="{ color: p.statusClass === 'granted' ? '#52c41a' : '#fa8c16' }">{{ p.status }}</span></div>
              </div>
            </div>
          </div>

          <!-- 编辑/删除/论文占位 -->
          <div v-else-if="dialog.data.subtype === 'edit'">
            <div style="text-align:center; padding:40px 20px; color:#666;">
              <i class="fas fa-edit" style="font-size:40px; color:#1890ff; margin-bottom:12px;"></i>
              <div style="font-size:16px; color:#333; margin-bottom:8px;">编辑专家：{{ dialog.data.payload.name }}</div>
              <div style="font-size:13px;">该功能为原型占位，尚未实现。</div>
            </div>
          </div>
          <div v-else-if="dialog.data.subtype === 'delete'">
            <div style="text-align:center; padding:40px 20px; color:#666;">
              <i class="fas fa-trash-alt" style="font-size:40px; color:#ff4d4f; margin-bottom:12px;"></i>
              <div style="font-size:16px; color:#333; margin-bottom:8px;">确认删除专家：{{ dialog.data.payload.name }}？</div>
              <div style="font-size:13px;">该功能为原型占位，尚未实现。</div>
            </div>
          </div>
          <div v-else-if="dialog.data.subtype === 'paper'">
            <div style="text-align:center; padding:40px 20px; color:#666;">
              <i class="fas fa-file-alt" style="font-size:40px; color:#1890ff; margin-bottom:12px;"></i>
              <div style="font-size:16px; color:#333; margin-bottom:8px;">论文：{{ dialog.data.payload.name }}</div>
              <div style="font-size:13px;">论文详情页跳转为原型占位，尚未实现。</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== 弹窗三：企业合作详情 ===================== -->
    <div v-if="dialog.type === 'company'" class="modal-overlay active" @click.self="closeDialog()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title"><i class="fas fa-building"></i> {{ dialog.data.title }}</div>
          <button class="modal-close" @click="closeDialog()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body" v-if="dialog.data.payload">
          <div class="company-detail-header">
            <div class="company-detail-logo"><i :class="['fas', dialog.data.payload.icon]" :style="{ color: dialog.data.payload.iconColor, fontSize: '32px' }"></i></div>
            <div class="company-detail-info">
              <h3 style="font-size:20px; font-weight:700; color:#333;">{{ dialog.data.name }}</h3>
              <p style="font-size:13px; color:#999;">合作年限: {{ dialog.data.payload.cooperationYears }}</p>
            </div>
          </div>
          <div class="cooperation-stats" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:20px;">
            <div style="text-align:center; padding:14px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:20px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.projects }}</div>
              <div style="font-size:12px; color:#999;">合作项目</div>
            </div>
            <div style="text-align:center; padding:14px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:20px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.budget }}</div>
              <div style="font-size:12px; color:#999;">合作金额</div>
            </div>
            <div style="text-align:center; padding:14px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:20px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.patents }}</div>
              <div style="font-size:12px; color:#999;">联合专利</div>
            </div>
            <div style="text-align:center; padding:14px; background:#f5f7fa; border-radius:8px;">
              <div style="font-size:20px; font-weight:700; color:#1890ff;">{{ dialog.data.payload.papers }}</div>
              <div style="font-size:12px; color:#999;">合作论文</div>
            </div>
          </div>
          <div v-for="(p, i) in dialog.data.payload.projectDetails" :key="i" class="project-detail-card" style="padding:16px; border:1px solid #e8e8e8; border-radius:8px; margin-bottom:14px;">
            <div class="project-detail-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:600; color:#333;">{{ p.name }}</div>
              <div style="display:flex; gap:12px; font-size:12px; color:#999; align-items:center;">
                <span><i class="fas fa-calendar"></i> {{ p.time }}</span>
                <span :style="{ color: p.status === '进行中' ? '#52c41a' : '#999', fontWeight: '500' }">{{ p.status }}</span>
                <span style="color:#1890ff; font-weight:600;">{{ p.budget }}</span>
              </div>
            </div>
            <div class="project-detail-desc" style="font-size:13px; color:#666; line-height:1.7; margin-bottom:12px;">{{ p.description }}</div>
            <div class="project-output-section" style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div>
                <div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;"><i class="fas fa-lightbulb" style="color:#faad14;"></i> 产出专利</div>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li v-for="(pat, j) in p.patents" :key="j" style="font-size:12px; color:#666; padding:3px 0; display:flex; align-items:flex-start; gap:6px;">
                    <i class="fas fa-check" style="color:#52c41a; margin-top:2px;"></i><span>{{ pat }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;"><i class="fas fa-file-alt" style="color:#1890ff;"></i> 产出论文</div>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li v-for="(paper, j) in p.papers" :key="j" style="font-size:12px; color:#666; padding:3px 0; display:flex; align-items:flex-start; gap:6px;">
                    <i class="fas fa-check" style="color:#52c41a; margin-top:2px;"></i><span>{{ paper }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="fund-usage-chart" style="margin-top:14px;">
              <div style="font-size:13px; font-weight:600; color:#333; margin-bottom:8px;">经费使用</div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:12px; color:#666; width:80px;">设备采购</span>
                  <div style="flex:1; height:8px; background:#e8e8e8; border-radius:4px; overflow:hidden;">
                    <div :style="{ width: p.fundUsage.equipment + '%', height: '100%', background: 'linear-gradient(90deg, #1890ff, #36cfc9)' }"></div>
                  </div>
                  <span style="font-size:12px; color:#666; width:40px;">{{ p.fundUsage.equipment }}%</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:12px; color:#666; width:80px;">人员费用</span>
                  <div style="flex:1; height:8px; background:#e8e8e8; border-radius:4px; overflow:hidden;">
                    <div :style="{ width: p.fundUsage.personnel + '%', height: '100%', background: 'linear-gradient(90deg, #52c41a, #73d13d)' }"></div>
                  </div>
                  <span style="font-size:12px; color:#666; width:40px;">{{ p.fundUsage.personnel }}%</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:12px; color:#666; width:80px;">材料费用</span>
                  <div style="flex:1; height:8px; background:#e8e8e8; border-radius:4px; overflow:hidden;">
                    <div :style="{ width: p.fundUsage.materials + '%', height: '100%', background: 'linear-gradient(90deg, #fa8c16, #ffa940)' }"></div>
                  </div>
                  <span style="font-size:12px; color:#666; width:40px;">{{ p.fundUsage.materials }}%</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:12px; color:#666; width:80px;">其他费用</span>
                  <div style="flex:1; height:8px; background:#e8e8e8; border-radius:4px; overflow:hidden;">
                    <div :style="{ width: p.fundUsage.others + '%', height: '100%', background: 'linear-gradient(90deg, #722ed1, #9254de)' }"></div>
                  </div>
                  <span style="font-size:12px; color:#666; width:40px;">{{ p.fundUsage.others }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== 弹窗四：项目详情 ===================== -->
    <div v-if="dialog.type === 'project'" class="project-modal" @click.self="closeDialog()">
      <div class="project-modal-content">
        <div class="project-modal-header">
          <h3><i class="fas fa-folder-open"></i> {{ dialog.data.title }}</h3>
          <button class="project-modal-close" @click="closeDialog()"><i class="fas fa-times"></i></button>
        </div>
        <div class="project-modal-body" v-if="dialog.data.payload">
          <div class="project-section">
            <h4><i class="fas fa-info-circle"></i> 项目背景</h4>
            <p>{{ dialog.data.payload.background }}</p>
          </div>
          <div class="project-section">
            <h4><i class="fas fa-bullseye"></i> 项目目标</h4>
            <p>{{ dialog.data.payload.goal }}</p>
          </div>
          <div class="project-section">
            <h4><i class="fas fa-trophy"></i> 主要成果</h4>
            <ul>
              <li v-for="(a, i) in dialog.data.payload.achievements" :key="i"><i class="fas fa-check-circle"></i><span>{{ a }}</span></li>
            </ul>
          </div>
          <div class="project-section">
            <h4><i class="fas fa-user-tie"></i> 个人贡献</h4>
            <p>{{ dialog.data.payload.contribution }}</p>
          </div>
        </div>
        <div class="project-modal-footer">
          <button class="btn-secondary" @click="closeDialog()">关闭</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// 人才画像详情子页面（路由组件 /talent/profile/:id）
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import '../../assets/styles/talent-profile.css';
import { useTalentProfile, fetchExpertBasic, fetchTalentExperience, educationTimeline, careerTimeline, fetchTalentDynamics, serverDynamics, fetchTalentCompanies, serverCompanies, serverCompanyMetrics, fetchTalentSentiment, serverSentiment, fetchTalentIdeology, serverIdeology, fetchTalentMedia, serverMediaReports, fetchTalentMigration, serverMigrationList, fetchTalentMilestone, serverMilestoneList, fetchTalentRelationPapers, fetchTalentTopicShares, fetchTalentAcademicMetrics, fetchTalentTitles, serverTitleList, fetchTalentAwards, serverAwardList, fetchTalentCollaborators, serverCollaboratorList, fetchTalentOutputs, serverPapers, serverPatents, serverProjects, fetchTalentCollaboration, handleNetworkClick } from '../../hooks/talent-profile';

// 教育背景/工作经历：服务端 talent_education / talent_career 两表数据（null 时模板回退静态演示数据）
const educationList = educationTimeline;
const careerList = careerTimeline;
// 人才动态：服务端 talent_dynamic 表数据（null 时模板回退静态演示数据）
const dynamicList = serverDynamics;
// 合作企业统计卡：服务端 talent_company 聚合（专利/项目/资金=SUM，合作指数=AVG），null 时模板回退静态
const companyMetricList = serverCompanyMetrics;
// 舆情指标：服务端 talent_sentiment 单行数据，无数据回退静态 85/12/3（评级文案按 score 派生）
const sentimentInfo = computed(() => serverSentiment.value ?? { score: 85, positive: 85, neutral: 12, negative: 3 });
// 意识形态指标：服务端 talent_ideology 单行数据，无数据回退静态 75/95/88/82/78（评级文案按 political 派生）
const ideologyInfo = computed(() => serverIdeology.value ?? { political: 75, science: 95, norm: 88, responsibility: 82, cooperation: 78 });
// 意识形态维度渲染列表：分数取服务端（回退静态），渐变色/描述文案为前端固定元数据
const IDEOLOGY_DIMENSIONS = [
  { key: 'science', name: '科学精神', grad: 'linear-gradient(90deg, #52c41a, #73d13d)', desc: '坚持实事求是的科学态度，追求真理，勇于创新。' },
  { key: 'norm', name: '学术规范', grad: 'linear-gradient(90deg, #1890ff, #36cfc9)', desc: '严格遵守学术道德规范，杜绝学术不端行为。' },
  { key: 'responsibility', name: '社会责任', grad: 'linear-gradient(90deg, #722ed1, #9254de)', desc: '积极承担科研人员社会责任，关注技术伦理。' },
  { key: 'cooperation', name: '国际合作', grad: 'linear-gradient(90deg, #fa8c16, #ffa940)', desc: '开放包容的国际合作理念，推动全球学术交流。' }
];
const ideologyDimensions = computed(() => IDEOLOGY_DIMENSIONS.map((d) => ({ ...d, score: ideologyInfo.value[d.key] })));
// 媒体报道：服务端 talent_media 表数据，无数据/接口失败回退静态演示数据
const mediaReports = computed(() => serverMediaReports.value ?? mediaReportsData);
// "正面 X 篇"真实统计：服务端数据按 sentiment='positive' 计数；静态回退无情感字段，保持旧行为（=全部数）
const positiveReportCount = computed(() => {
  if (serverMediaReports.value) return serverMediaReports.value.filter((r) => r.sentiment === 'positive').length;
  return mediaReportsData.length;
});
// 迁徙路径/成长轨迹：服务端 talent_migration / talent_milestone 表数据，无数据/接口失败回退静态演示数据
const migrationItems = computed(() => serverMigrationList.value ?? migrationList);
const milestoneItems = computed(() => serverMilestoneList.value ?? milestoneList);
// 学者头衔：服务端 talent_title 表数据，无数据/接口失败回退原模板硬编码 4 卡（name 用短键以命中静态 titleData 详情）
const staticTitleCards = [
  { name: '长江学者', title: '长江学者特聘教授', category: '人才计划' },
  { name: '国家杰青', title: '国家杰出青年科学基金获得者', category: '人才计划' },
  { name: 'IEEE Fellow', title: 'IEEE Fellow', category: '学术荣誉' },
  { name: 'CCF Fellow', title: 'CCF Fellow', category: '学术荣誉' }
];
const titleCardList = computed(() => serverTitleList.value ?? staticTitleCards);
// 科研诚信奖项卡片：服务端 talent_award 表优先，无数据回退模板原硬编码 3 卡
const staticAwardCards = [
  { name: 'ACM Prize in Computing', year: '2023年', reason: '在计算机视觉领域的突出贡献', icon: 'fa-trophy', iconColor: '#faad14' },
  { name: 'IEEE Computer Society Award', year: '2022年', reason: '深度学习技术创新', icon: 'fa-medal', iconColor: '#1890ff' },
  { name: 'CCF科学技术奖', year: '2021年', reason: '人工智能理论与方法研究', icon: 'fa-star', iconColor: '#52c41a' }
];
const awardCardList = computed(() => serverAwardList.value ?? staticAwardCards);
// 诚信评分：服务端 talent_ideology.integrityScore，无数据回退 92
const awardInfo = computed(() => {
  const score = (serverIdeology.value && serverIdeology.value.integrityScore) ?? 92;
  const grade = score >= 90 ? '优秀' : score >= 75 ? '良好' : score >= 60 ? '合格' : '需关注';
  return { score, grade };
});
// 合作企业卡片：服务端优先；静态回退时把 companyList+companyData 映射成统一字段结构
const companyCards = computed(() => {
  if (serverCompanies.value) return serverCompanies.value;
  return companyList.map((c) => {
    const d = companyData[c.name] || {};
    return { name: c.name, tags: c.tags, icon: d.icon, iconColor: d.iconColor, projects: d.projects, budgetWan: parseInt(d.budget) || 0, patents: d.patents, papers: d.papers };
  });
});
// 论文/专利/项目：服务端三表数据，无数据时回退领域演示数据（activeProfileTagData）
const papersList = computed(() => serverPapers.value ?? activeProfileTagData.value.papers);
const patentsList = computed(() => serverPatents.value ?? activeProfileTagData.value.patents);
const projectsList = computed(() => serverProjects.value ?? activeProfileTagData.value.projects);

const router = useRouter();
const route = useRoute();

// 从 composable 解构（detail 页所需全部状态和方法）
const {
  setTalentRouter,
  activeModule, activeExpertId, activeTag, activeDetailTab, activeBehaviorTab,
  activeRelationTopic, expandedMigrationId, expandedMedia,
  dialog,
  activeExpert, activeProfileTagData, activeRelationTagData, activeRelationScholars,
  filteredRelationPapers,
  switchModule, closeProfileDetail, selectProfileTag, switchDetailTab, switchBehaviorTab,
  selectRelationTopic, toggleMigration, toggleMedia, openDialog, closeDialog,
  viewOrganization, viewProject, viewPaperDetail, viewScholarDetail, viewTitleDetail,
  viewAcademicDetail, viewAwardDetail, viewIdeologyDetail, viewCompanyDetail,
  showMilestoneDetail, showMetricDetail, viewTopicDetail, viewValueDetail,
  editExpert, deleteExpert,
  buildNetworkSvg, buildTopicPieSvg,
  fetchProfileList,
  // 数据
  profileTagData, relationTagData, relationScholarData, expertData,
  projectDetails, titleData, scholarData, orgData, milestoneDetails,
  companyData, ideologyDetails, mediaReportsData, academicDetailContents,
  metricDetailData, topicDetails, valueDetails
} = useTalentProfile();

// 注入 router 到 composable
setTalentRouter(router);

// 从路由参数同步 activeExpertId（服务端 talent 表 code 为 t1-t108，超出静态演示数据范围时由服务端数据补齐）
onMounted(() => {
  if (route.params.id) {
    const m = String(route.params.id).match(/\d+/);
    const idx = m ? Number(m[0]) : NaN;
    const ids = Object.keys(expertData).map(Number);
    activeExpertId.value = (Number.isInteger(idx) && idx >= 1) ? idx : ids[0];
  }
  // 个人基本信息从服务端 talent 表获取，失败回退内置演示数据
  fetchExpertBasic(activeExpertId.value);
  // 教育背景/工作经历从服务端两张子表获取，失败或无数据回退内置演示数据
  fetchTalentExperience(activeExpertId.value);
  // 人才动态从服务端 talent_dynamic 表获取，失败或无数据回退内置演示数据
  fetchTalentDynamics(activeExpertId.value);
  // 合作企业从服务端 talent_company 表获取（统计卡由企业记录聚合），失败或无数据回退内置演示数据
  fetchTalentCompanies(activeExpertId.value);
  // 舆情指标从服务端 talent_sentiment 表获取，失败或无数据回退内置演示数据
  fetchTalentSentiment(activeExpertId.value);
  // 意识形态指标从服务端 talent_ideology 表获取，失败或无数据回退内置演示数据
  fetchTalentIdeology(activeExpertId.value);
  // 媒体报道从服务端 talent_media 表获取，失败或无数据回退内置演示数据
  fetchTalentMedia(activeExpertId.value);
  // 迁徙路径/成长轨迹从服务端 talent_migration / talent_milestone 表获取，失败或无数据回退内置演示数据
  fetchTalentMigration(activeExpertId.value);
  fetchTalentMilestone(activeExpertId.value);
  // 代表成果论文从服务端 talent_relation_paper 表获取，失败或无数据回退内置演示数据
  fetchTalentRelationPapers(activeExpertId.value);
  // 研究主题分布从服务端 talent_topic_share 表获取（独立数据源），失败或无数据回退内置演示数据
  fetchTalentTopicShares(activeExpertId.value);
  // 关键学术指标从服务端 talent_academic_metric 表获取，失败或无数据回退内置演示数据
  fetchTalentAcademicMetrics(activeExpertId.value);
  // 学者头衔从服务端 talent_title 表获取，失败或无数据回退内置演示数据
  fetchTalentTitles(activeExpertId.value);
  // 科研诚信奖项从服务端 talent_award 表获取，失败或无数据回退模板硬编码
  fetchTalentAwards(activeExpertId.value);
  // 合作学者从服务端 talent_collaborator 表获取，失败或无数据回退静态 relationScholarData
  fetchTalentCollaborators(activeExpertId.value);
  // 论文/专利/项目从服务端三张子表获取，失败或无数据回退领域演示数据
  fetchTalentOutputs(activeExpertId.value);
  // 合作关系网从服务端两表获取（节点+连线），失败或无数据回退领域演示数据
  fetchTalentCollaboration(activeExpertId.value);
  // 确保列表数据已加载（从列表页跳转时已有，但直接访问 URL 时可能没有）
  fetchProfileList();
});

// activeMetricTab（学术指标弹窗子页签）
const activeMetricTab = ref('papers-list');
watch(() => dialog.type, () => {
  if (dialog.type === 'metric' && dialog.data && dialog.data.subtype === 'academic' && dialog.data.payload && dialog.data.payload.tabs) {
    activeMetricTab.value = dialog.data.payload.tabs[0].id;
  }
});

// viewPersonalHomepage
function viewPersonalHomepage() {
  openDialog('metric', { subtype: 'organization', title: '个人主页', payload: { name: activeExpert.value.name, homepage: activeExpert.value.homepage || '' } });
}

// 静态数据：行为信息·人才迁徙路径（原型内联，未在 data 文件中）
const migrationList = [
  {
    id: 'zju', location: '中国·杭州', organization: '浙江大学', duration: '1996-2000年（4年）', role: '本科·计算机科学与技术', dotActive: false,
    description: '师从李德毅教授学习计算机基础，GPA年级前5%，多次获得校奖学金，参与多项学科竞赛。',
    position: '计算机科学与技术专业本科生',
    projects: ['图像处理算法研究', '数据库系统设计'],
    achievements: [
      { icon: 'fa-star', color: '#faad14', text: '浙江省优秀毕业生' },
      { icon: 'fa-medal', color: '#faad14', text: 'ACM大学生程序设计竞赛铜奖' },
      { icon: 'fa-file-alt', color: '#52c41a', text: '发表核心期刊论文1篇' }
    ],
    outputLabel: '本科毕业论文', outputText: '本科毕业论文《基于小波变换的图像压缩算法研究》获评优秀论文'
  },
  {
    id: 'pku', location: '中国·北京', organization: '北京大学', duration: '2000-2003年（3年）', role: '硕士·计算机软件与理论', dotActive: false,
    description: '师从梅宏院士从事分布式系统与软件工程研究，参与863计划项目，发表多篇核心期刊论文。',
    position: '计算机软件与理论专业硕士研究生',
    projects: ['973计划软件项目', '分布式计算平台'],
    achievements: [
      { icon: 'fa-file-alt', color: '#52c41a', text: '发表SCI论文2篇（其中1区1篇）' },
      { icon: 'fa-award', color: '#faad14', text: '北京大学优秀硕士论文' },
      { icon: 'fa-trophy', color: '#faad14', text: '国家自然科学二等奖（排名第五）' }
    ],
    outputLabel: '硕士毕业论文', outputText: '硕士论文《面向服务的软件体系结构及其支撑平台研究》'
  },
  {
    id: 'tsinghua-phd', location: '中国·北京', organization: '清华大学', duration: '2003-2006年（3年）', role: '博士·计算机科学与技术', dotActive: false,
    description: '师从张亚勤教授从事人工智能与机器学习研究，在国际顶会发表多篇高影响力论文。',
    position: '人工智能方向博士研究生',
    projects: ['863重点项目', '深度学习平台'],
    achievements: [
      { icon: 'fa-file-alt', color: '#52c41a', text: '发表CCF A类论文5篇，B类3篇' },
      { icon: 'fa-award', color: '#faad14', text: '清华大学优秀博士论文' },
      { icon: 'fa-trophy', color: '#faad14', text: '微软学者称号' }
    ],
    outputLabel: '博士毕业论文', outputText: '博士论文《深度学习在大规模图像识别中的应用研究》'
  },
  {
    id: 'stanford', location: '美国·加州', organization: '斯坦福大学', duration: '2006-2009年（3年）', role: '博士后·人工智能实验室', dotActive: false,
    description: '加入Fei-Fei Li教授实验室，参与ImageNet项目，建立国际合作网络，发表多篇顶会论文。',
    position: '人工智能实验室博士后研究员',
    projects: ['ImageNet项目', '视觉识别研究'],
    achievements: [
      { icon: 'fa-file-alt', color: '#52c41a', text: 'CVPR/ICCV顶会论文4篇' },
      { icon: 'fa-globe', color: '#1890ff', text: '国际视觉认知竞赛冠军' },
      { icon: 'fa-handshake', color: '#722ed1', text: '建立国际合作网络' }
    ],
    outputLabel: '重要成果', outputText: '参与提出深度卷积神经网络在图像分类中的应用方法'
  },
  {
    id: 'tsinghua-ap', location: '中国·北京', organization: '清华大学', duration: '2009-2012年（3年）', role: '副教授·计算机科学与技术系', dotActive: false,
    description: '回国任教，建设机器学习课程体系，组建研究团队，主持多项科研项目。',
    position: '计算机科学与技术系副教授',
    projects: ['课程建设', '团队建设'],
    achievements: [
      { icon: 'fa-user-graduate', color: '#52c41a', text: '培养硕士生8名，博士生3名' },
      { icon: 'fa-file-alt', color: '#52c41a', text: '发表SCI论文12篇' },
      { icon: 'fa-money-bill', color: '#faad14', text: '获得科研经费500万元' }
    ],
    outputLabel: '重要事件', outputText: '获清华大学学术新人奖'
  },
  {
    id: 'tsinghua-prof', location: '中国·北京', organization: '清华大学', duration: '2012年-至今（12年）', role: '教授·博士生导师', dotActive: true,
    description: '现任清华大学计算机科学与技术系教授，智能技术与系统国家重点实验室副主任，带领团队开展前沿研究。',
    position: '计算机科学与技术系教授、博士生导师',
    projects: ['科技部重大项目', '国家自然科学基金', '企业合作项目'],
    achievements: [
      { icon: 'fa-file-alt', color: '#52c41a', text: '发表CCF A类论文86篇，引用超12000次' },
      { icon: 'fa-trophy', color: '#faad14', text: '国家自然科学二等奖（排名第一）' },
      { icon: 'fa-crown', color: '#ff4d4f', text: '入选国家高层次人才计划' }
    ],
    outputLabel: '团队规模', outputText: '带领团队40余人，其中教授3人、副教授5人、博硕士生30余人'
  }
];

// 静态数据：科研成长轨迹里程碑（键名对应 milestoneDetails，颜色/评分在原型内联）
const milestoneList = [
  { key: '本科毕业', year: '2000年', title: '浙江大学 · 本科毕业', score: 65, color: '#52c41a', active: false },
  { key: '硕士毕业', year: '2003年', title: '北京大学 · 硕士毕业', score: 75, color: '#722ed1', active: false },
  { key: '博士毕业', year: '2006年', title: '清华大学 · 博士毕业', score: 82, color: '#1890ff', active: false },
  { key: '博士后研究', year: '2009年', title: '斯坦福大学 · 博士后研究员', score: 88, color: '#fa8c16', active: false },
  { key: '副教授', year: '2012年', title: '清华大学 · 晋升副教授', score: 92, color: '#eb2f96', active: false },
  { key: '长江学者', year: '2015年', title: '入选长江学者特聘教授', score: 95, color: '#f5222d', active: false },
  { key: '国家杰青', year: '2017年', title: '获国家杰出青年科学基金', score: 97, color: '#cf1322', active: false },
  { key: 'IEEE Fellow', year: '2020年', title: '当选IEEE Fellow', score: 99, color: '#a8071a', active: true }
];

// 静态数据：合作企业卡片（标签在原型内联，详情数据在 companyData 中）
const companyList = [
  { name: '百度', tags: ['自动驾驶', '自然语言处理', '计算机视觉'] },
  { name: '阿里巴巴', tags: ['推荐系统', '机器学习', '数据挖掘'] },
  { name: '华为', tags: ['边缘计算', '深度学习'] }
];
</script>
