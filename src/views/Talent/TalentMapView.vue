<!-- 科技人才地图（原型 2.3.1科技人才地图.html）：结构 1:1 迁移；内联事件为原生 onclick（Vue 以 attribute 透传），逻辑见 talent-map-engine.js -->
<template>
<div class="talent-map-page">
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
        <div class="navbar-nav">
            <div class="nav-link active" onclick="switchTab('distribution', this)">
                <i class="fas fa-map-marked-alt"></i>人才分布与动态趋势分析
            </div>
            <div class="nav-link" onclick="switchTab('index', this)">
                <i class="fas fa-chart-line"></i>人才指数
            </div>
            <div class="nav-link" onclick="switchTab('search', this)">
                <i class="fas fa-search"></i>人才检索
            </div>
            <div class="nav-link" onclick="switchTab('cockpit', this)">
                <i class="fas fa-tachometer-alt"></i>人才驾驶舱
            </div>
            <div class="nav-link" onclick="switchTab('subscription', this)">
                <i class="fas fa-bell"></i>人才库订阅
            </div>
        </div>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
        <div class="page-title">科技人才地图</div>

        <!-- 人才分布与动态趋势分析模块 -->
        <div class="module-content active" id="module-distribution">
            <!-- 统计指标卡片 -->
            <div class="stats-cards">
                <div class="stat-card" onclick="filterByStat('total', this)">
                    <div class="stat-card-title">人才总量</div>
                    <div class="stat-card-value">128,456</div>
                    <div class="stat-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>同比增长 12.5%</span>
                    </div>
                </div>
                <div class="stat-card" onclick="filterByStat('institutions', this)">
                    <div class="stat-card-title">覆盖机构数</div>
                    <div class="stat-card-value">3,847</div>
                    <div class="stat-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>同比增长 8.3%</span>
                    </div>
                </div>
                <div class="stat-card" onclick="filterByStat('growth', this)">
                    <div class="stat-card-title">年度增长率</div>
                    <div class="stat-card-value">15.7%</div>
                    <div class="stat-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>较去年提升 3.2%</span>
                    </div>
                </div>
                <div class="stat-card" onclick="filterByStat('fields', this)">
                    <div class="stat-card-title">重点领域数量</div>
                    <div class="stat-card-value">56</div>
                    <div class="stat-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>同比增长 4.8%</span>
                    </div>
                </div>
                <div class="stat-card" onclick="filterByStat('mobility', this)">
                    <div class="stat-card-title">跨区域流动率</div>
                    <div class="stat-card-value">23.6%</div>
                    <div class="stat-card-trend negative">
                        <i class="fas fa-arrow-down"></i>
                        <span>较去年下降 1.5%</span>
                    </div>
                </div>
            </div>

            <!-- 筛选与对比分析区 -->
            <div class="filter-bar">
                <div class="filter-title">
                    <span><i class="fas fa-filter" style="margin-right: 8px;"></i>多维筛选与对比分析</span>
                    <button class="btn btn-primary" onclick="showCompareModal()">
                        <i class="fas fa-balance-scale"></i>对比分析
                    </button>
                </div>
                <div class="filter-content">
                    <div class="filter-group">
                        <label class="filter-label">地域范围</label>
                        <select class="filter-select" id="regionFilter" onchange="applyDistributionFilters()">
                            <option value="global">全球范围</option>
                            <option value="china">中国</option>
                            <option value="asia-pacific">亚太地区</option>
                            <option value="north-america">北美地区</option>
                            <option value="europe">欧洲地区</option>
                            <option value="all">全国范围</option>
                            <option value="north">华北地区</option>
                            <option value="east">华东地区</option>
                            <option value="south">华南地区</option>
                            <option value="west">西部地区</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">机构类型</label>
                        <select class="filter-select" id="institutionFilter" onchange="applyDistributionFilters()">
                            <option value="all">全部类型</option>
                            <option value="university">高校科研类</option>
                            <option value="research">研究院所类</option>
                            <option value="enterprise">企业研发类</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">研究领域</label>
                        <select class="filter-select" id="fieldFilter" onchange="applyDistributionFilters()">
                            <option value="all">全部领域</option>
                            <option value="ai">人工智能</option>
                            <option value="biotech">生物技术</option>
                            <option value="newenergy">新能源</option>
                            <option value="materials">新材料</option>
                            <option value="quantum">量子技术</option>
                            <option value="aerospace">航空航天</option>
                            <option value="marine">海洋技术</option>
                            <option value="information">信息技术</option>
                            <option value="environment">环境科学</option>
                            <option value="manufacturing">智能制造</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">人才类别</label>
                        <select class="filter-select" id="talentFilter" onchange="applyDistributionFilters()">
                            <option value="all">全部人才</option>
                            <option value="academic">学术型人才</option>
                            <option value="industry">产业型人才</option>
                            <option value="leadership">领军人才</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">时间区间</label>
                        <button type="button" class="filter-select time-range-trigger" id="distributionTimeRange" onclick="showDistributionTimeRangeModal()">
                            <span><i class="fas fa-calendar-alt"></i> 2022-01-01 至 2024-12-31</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-primary" onclick="applyDistributionFilters()">
                            <i class="fas fa-search"></i>应用筛选
                        </button>
                        <button class="btn btn-secondary" onclick="resetDistributionFilters()">
                            <i class="fas fa-redo"></i>重置条件
                        </button>
                    </div>
                </div>
                <!-- 快速筛选标签 -->
                <div class="quick-filters" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #f0f0f0;">
                    <label style="font-size: 13px; color: #666; margin-bottom: 12px; display: block;">
                        <i class="fas fa-bolt" style="margin-right: 6px;"></i>快速筛选
                    </label>
                    <div class="quick-filter-tags">
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="university-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-graduation-cap"></i>
                            高校科研类人才
                        </label>
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="newenergy-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-solar-panel"></i>
                            新能源领域人才
                        </label>
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="ai-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-robot"></i>
                            人工智能领域人才
                        </label>
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="biotech-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-dna"></i>
                            生物技术领域人才
                        </label>
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="leadership-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-star"></i>
                            领军人才
                        </label>
                        <label class="quick-filter-tag">
                            <input type="checkbox" value="research-talent" onchange="toggleQuickFilter(this)">
                            <i class="fas fa-flask"></i>
                            研究院所人才
                        </label>
                    </div>
                </div>
            </div>

            <!-- 研究领域热点图 - 移动到多维筛选与对比分析下方 -->
            <div class="hotfields-section">
                <div class="section-header hotfields-section-header">
                    <div class="section-title">
                        <i class="fas fa-fire" style="margin-right: 8px; color: #ff4d4f;"></i>
                        研究领域热点
                    </div>
                    <div class="hotfield-tools">
                        <label class="hotfield-search">
                            <i class="fas fa-search"></i>
                            <input type="text" id="hotfieldKeywordSearch" placeholder="筛选关键词" oninput="filterHotfieldKeywords(this.value)">
                        </label>
                        <button class="hotfield-mode-btn active" onclick="setHotfieldMode('aggregate', this)">领域聚合</button>
                        <button class="hotfield-mode-btn" onclick="setHotfieldMode('compare', this)">趋势对比</button>
                    </div>
                </div>
                <div class="hotfields-cloud" id="hotfieldsCloud">
                    <div class="hotfield-tag" onclick="filterByField('人工智能', this)">
                        人工智能 <span>2,345</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('生物技术', this)">
                        生物技术 <span>1,987</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('新能源', this)">
                        新能源 <span>1,654</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('新材料', this)">
                        新材料 <span>1,432</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('量子技术', this)">
                        量子技术 <span>987</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('航空航天', this)">
                        航空航天 <span>876</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('海洋技术', this)">
                        海洋技术 <span>765</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('信息技术', this)">
                        信息技术 <span>2,123</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('环境科学', this)">
                        环境科学 <span>1,123</span>
                    </div>
                    <div class="hotfield-tag" onclick="filterByField('智能制造', this)">
                        智能制造 <span>1,654</span>
                    </div>
                </div>
                <div class="hotfield-insight" id="hotfieldInsight">
                    <div class="hotfield-insight-heading">
                        <div><i class="fas fa-chart-line"></i> 研究方向趋势 <span id="hotfieldInsightTitle">全部领域</span></div>
                        <span class="hotfield-insight-note">支持查看人才增长曲线与活跃度变化</span>
                    </div>
                    <div class="hotfield-insight-body">
                        <div class="hotfield-trend-chart" id="hotfieldTrendChart"></div>
                        <div class="hotfield-metric-list" id="hotfieldMetricList"></div>
                    </div>
                </div>
            </div>

            <!-- 主内容布局 -->
            <div class="main-layout">
                <!-- 左侧：地图区域 -->
                <div class="left-panel">
                    <!-- 地图模块 -->
                    <div class="map-section">
                        <div class="map-header">
                            <div class="map-title">
                                <i class="fas fa-map-marked-alt" style="margin-right: 8px; color: #1890ff;"></i>
                                人才地域分布地图
                            </div>
                            <div class="map-controls">
                                <button class="map-btn active" onclick="switchMapView('heatmap', this)">热力图</button>
                                <button class="map-btn" onclick="switchMapView('bubble', this)">气泡图</button>
                                <button class="map-btn" onclick="resetMap()">重置</button>
                                <button class="map-btn map-export-btn" onclick="showMapExportModal()" style="background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); color: #fff; border-color: #1890ff;">
                                    <i class="fas fa-download"></i> 导出报告
                                </button>
                            </div>
                        </div>
                        <div class="map-container">
                            <div class="china-map" id="chinaMap">
                                <!-- 中国省域示意图：保留原有省份单击/双击入口，改为 SVG 省域形状与热力填色 -->
                                <svg class="china-svg" viewBox="0 0 900 560" role="img" aria-label="中国人才地域分布热力图">
                                    <path class="china-outline" d="M66 168 L58 139 L92 120 L113 82 L161 87 L186 58 L236 69 L272 49 L329 60 L360 44 L420 62 L467 42 L521 50 L556 74 L611 78 L651 104 L691 110 L713 139 L753 153 L761 188 L786 208 L774 242 L790 276 L773 297 L781 330 L749 344 L738 376 L707 391 L678 416 L636 408 L609 424 L570 414 L541 441 L497 431 L455 447 L424 429 L383 439 L341 419 L309 433 L279 414 L243 420 L221 390 L187 390 L169 367 L133 359 L131 334 L102 318 L112 286 L91 264 L103 235 L83 218 L95 194 Z"></path>

                                    <path class="china-secondary" d="M82 145 L203 106 L278 129 L267 201 L180 224 L92 196 Z"></path>
                                    <path class="china-secondary" d="M239 91 L388 77 L535 104 L574 149 L509 181 L402 159 L328 174 L244 143 Z"></path>
                                    <path class="china-secondary" d="M289 174 L388 162 L433 216 L369 261 L302 235 Z"></path>
                                    <path class="china-secondary" d="M388 121 L486 116 L516 177 L468 215 L407 188 Z"></path>
                                    <path class="china-secondary" d="M164 222 L303 208 L367 245 L335 333 L223 323 L148 281 Z"></path>
                                    <path class="china-secondary" d="M407 256 L500 237 L548 285 L514 338 L431 329 Z"></path>
                                    <path class="china-secondary" d="M264 322 L383 333 L415 398 L322 397 L254 365 Z"></path>
                                    <path class="china-secondary" d="M421 398 L528 385 L582 426 L529 455 L438 448 Z"></path>
                                    <text class="secondary-label" x="157" y="164">新疆</text>
                                    <text class="secondary-label" x="390" y="132">内蒙古</text>
                                    <text class="secondary-label" x="342" y="211">青海</text>
                                    <text class="secondary-label" x="449" y="164">甘肃</text>
                                    <text class="secondary-label" x="251" y="273">西藏</text>
                                    <text class="secondary-label" x="476" y="292">四川</text>
                                    <text class="secondary-label" x="329" y="363">云南</text>
                                    <text class="secondary-label" x="498" y="424">广西</text>

                                    <path class="province" data-name="山西" data-base-fill="#9ecae1" style="fill:#9ecae1" d="M518 196 L558 184 L583 201 L584 245 L558 260 L531 242 L514 216 Z" onclick="selectProvince('山西', 4321, event)" ondblclick="drilldownProvince('山西', event)"></path>
                                    <path class="province" data-name="河北" data-base-fill="#74a9cf" style="fill:#74a9cf" d="M578 159 L622 166 L626 190 L642 193 L627 213 L641 218 L637 241 L608 243 L594 223 L574 215 L561 191 Z" onclick="selectProvince('河北', 8756, event)" ondblclick="drilldownProvince('河北', event)"></path>
                                    <path class="province" data-name="北京" data-base-fill="#3182bd" style="fill:#3182bd" d="M625 185 L641 181 L651 193 L644 207 L628 204 Z" onclick="selectProvince('北京', 15432, event)" ondblclick="drilldownProvince('北京', event)"></path>
                                    <path class="province" data-name="天津" data-base-fill="#6baed6" style="fill:#6baed6" d="M649 202 L664 201 L671 214 L660 225 L650 220 Z" onclick="selectProvince('天津', 5678, event)" ondblclick="drilldownProvince('天津', event)"></path>
                                    <path class="province" data-name="山东" data-base-fill="#4292c6" style="fill:#4292c6" d="M665 224 L709 211 L748 220 L737 243 L699 251 L671 240 Z" onclick="selectProvince('山东', 12345, event)" ondblclick="drilldownProvince('山东', event)"></path>
                                    <path class="province" data-name="河南" data-base-fill="#6baed6" style="fill:#6baed6" d="M575 247 L625 241 L659 252 L651 294 L614 304 L579 284 Z" onclick="selectProvince('河南', 9876, event)" ondblclick="drilldownProvince('河南', event)"></path>
                                    <path class="province" data-name="江苏" data-base-fill="#2171b5" style="fill:#2171b5" d="M660 259 L709 256 L737 272 L729 311 L695 322 L668 301 Z" onclick="selectProvince('江苏', 18765, event)" ondblclick="drilldownProvince('江苏', event)"></path>
                                    <path class="province" data-name="上海" data-base-fill="#08519c" style="fill:#08519c" d="M738 313 L753 312 L760 324 L749 337 L736 330 Z" onclick="selectProvince('上海', 15678, event)" ondblclick="drilldownProvince('上海', event)"></path>
                                    <path class="province" data-name="湖北" data-base-fill="#74a9cf" style="fill:#74a9cf" d="M589 302 L645 294 L680 313 L665 348 L624 359 L590 339 Z" onclick="selectProvince('湖北', 11234, event)" ondblclick="drilldownProvince('湖北', event)"></path>
                                    <path class="province" data-name="浙江" data-base-fill="#3182bd" style="fill:#3182bd" d="M703 322 L747 331 L760 351 L736 383 L699 366 Z" onclick="selectProvince('浙江', 14321, event)" ondblclick="drilldownProvince('浙江', event)"></path>
                                    <path class="province" data-name="湖南" data-base-fill="#9ecae1" style="fill:#9ecae1" d="M592 346 L630 357 L647 389 L622 419 L590 400 L575 370 Z" onclick="selectProvince('湖南', 8654, event)" ondblclick="drilldownProvince('湖南', event)"></path>
                                    <path class="province" data-name="江西" data-base-fill="#74a9cf" style="fill:#74a9cf" d="M647 348 L690 345 L705 377 L684 412 L651 399 L635 372 Z" onclick="selectProvince('江西', 5432, event)" ondblclick="drilldownProvince('江西', event)"></path>
                                    <path class="province" data-name="福建" data-base-fill="#6baed6" style="fill:#6baed6" d="M697 382 L735 378 L753 409 L733 442 L703 429 L690 403 Z" onclick="selectProvince('福建', 6789, event)" ondblclick="drilldownProvince('福建', event)"></path>
                                    <path class="province" data-name="广东" data-base-fill="#08519c" style="fill:#08519c" d="M669 425 L711 428 L756 446 L744 471 L692 476 L654 454 Z" onclick="selectProvince('广东', 23456, event)" ondblclick="drilldownProvince('广东', event)"></path>

                                    <text class="province-label" x="640" y="196">北京</text>
                                    <text class="province-label small" x="659" y="216">天津</text>
                                    <text class="province-label" x="603" y="198">河北</text>
                                    <text class="province-label" x="545" y="220">山西</text>
                                    <text class="province-label" x="708" y="232">山东</text>
                                    <text class="province-label" x="616" y="274">河南</text>
                                    <text class="province-label" x="698" y="286">江苏</text>
                                    <text class="province-label small" x="748" y="324">上海</text>
                                    <text class="province-label" x="635" y="329">湖北</text>
                                    <text class="province-label" x="728" y="352">浙江</text>
                                    <text class="province-label" x="611" y="380">湖南</text>
                                    <text class="province-label" x="671" y="379">江西</text>
                                    <text class="province-label" x="724" y="410">福建</text>
                                    <text class="province-label" x="708" y="453">广东</text>
                                </svg>
                                <div class="map-legend"><span>人才密度</span><span>低</span><span class="map-legend-gradient"></span><span>高</span></div>
                            </div>
                            <!-- 地区信息面板 -->
                            <div class="region-info-panel" id="regionInfoPanel">
                                <div class="region-info-title" id="regionInfoTitle">地区详情</div>
                                <div class="region-info-item">
                                    <span>人才总数</span>
                                    <span id="regionTalentCount">-</span>
                                </div>
                                <div class="region-info-item">
                                    <span>高校数量</span>
                                    <span id="regionUniversityCount">-</span>
                                </div>
                                <div class="region-info-item">
                                    <span>研究院数量</span>
                                    <span id="regionResearchCount">-</span>
                                </div>
                                <div class="region-info-item">
                                    <span>企业数量</span>
                                    <span id="regionEnterpriseCount">-</span>
                                </div>
                                <div class="region-info-item">
                                    <span>人才流入</span>
                                    <span id="regionInflow">-</span>
                                </div>
                                <div class="region-info-item">
                                    <span>人才流出</span>
                                    <span id="regionOutflow">-</span>
                                </div>
                                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e8e8e8;">
                                    <p style="font-size: 11px; color: #999; margin-bottom: 8px;">提示：双击省份可查看详细机构构成</p>
                                    <button class="btn btn-primary" style="width: 100%; font-size: 12px;" onclick="viewRegionDetail()">
                                        <i class="fas fa-arrow-right"></i>查看详情
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 时间轴与动态播放 - 移动到地图内部 -->
                        <div class="timeline-section" id="timelineSection">
                            <div class="section-title" style="margin-bottom: 20px;">
                                <i class="fas fa-history" style="margin-right: 8px; color: #1890ff;"></i>
                                时间轴动态播放
                            </div>
                            <div class="timeline-controls">
                                <button class="timeline-play-btn" id="playBtn" onclick="togglePlay()">
                                    <i class="fas fa-play"></i>
                                </button>
                                <div class="timeline-slider-container">
                                    <input type="range" class="timeline-slider" min="2020" max="2024" value="2024" id="timelineSlider" oninput="updateYear(this.value)">
                                    <div class="timeline-years">
                                        <span class="timeline-year" onclick="selectYear(2020)">2020</span>
                                        <span class="timeline-year" onclick="selectYear(2021)">2021</span>
                                        <span class="timeline-year" onclick="selectYear(2022)">2022</span>
                                        <span class="timeline-year" onclick="selectYear(2023)">2023</span>
                                        <span class="timeline-year active" onclick="selectYear(2024)">2024</span>
                                    </div>
                                </div>
                                <div class="timeline-label" id="currentYear">2024年</div>
                            </div>

                            <!-- 播放速度控制 -->
                            <div class="timeline-speed-control">
                                <span class="timeline-speed-label">
                                    <i class="fas fa-tachometer-alt" style="margin-right: 6px;"></i>播放速度
                                </span>
                                <button class="timeline-speed-btn" onclick="setSpeed(2000, this)">慢速</button>
                                <button class="timeline-speed-btn active" onclick="setSpeed(1000, this)">正常</button>
                                <button class="timeline-speed-btn" onclick="setSpeed(500, this)">快速</button>
                                <button class="timeline-speed-btn" onclick="setSpeed(200, this)">极速</button>
                            </div>

                            <!-- 时间轴信息 -->
                            <div class="timeline-info">
                                <div class="timeline-info-item">
                                    <i class="fas fa-info-circle"></i>
                                    <span>拖动滑块或点击播放按钮查看人才分布变化</span>
                                </div>
                                <div class="timeline-info-item">
                                    <i class="fas fa-clock"></i>
                                    <span id="animationStatus">准备就绪</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 人才流动趋势图 -->
                    <div class="flow-section">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-route" style="margin-right: 8px; color: #1890ff;"></i>
                                人才流动趋势图
                            </div>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <select class="filter-select" style="width: 150px;" onchange="updateFlowChart(this.value)">
                                    <option value="all">全部流动</option>
                                    <option value="regional">区域流动</option>
                                    <option value="institutional">机构流动</option>
                                </select>
                                <div class="flow-time-selector">
                                    <span style="font-size: 13px; color: #666;">时间范围：</span>
                                    <select class="filter-select" style="width: 140px;" id="flowTimeRange" onchange="updateFlowTimeRange(this.value)">
                                        <option value="2020-2024">全部 (2020-2024)</option>
                                        <option value="2020-2021">2020-2021</option>
                                        <option value="2021-2022">2021-2022</option>
                                        <option value="2022-2023">2022-2023</option>
                                        <option value="2023-2024">2023-2024</option>
                                        <option value="custom">自定义范围...</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flow-chart" id="flowChart">
                            <!-- 第一层: 北京 -->
                            <div class="flow-node" style="top: 15%; left: 15%;">北京</div>
                            
                            <!-- 第二层: 上海、西安 -->
                            <div class="flow-node" style="top: 15%; left: 75%;">上海</div>
                            <div class="flow-node" style="top: 45%; left: 15%;">西安</div>
                            
                            <!-- 第三层: 武汉 -->
                            <div class="flow-node" style="top: 45%; left: 45%;">武汉</div>
                            
                            <!-- 第四层: 杭州、成都、深圳 -->
                            <div class="flow-node" style="top: 45%; left: 75%;">杭州</div>
                            <div class="flow-node" style="top: 75%; left: 15%;">成都</div>
                            <div class="flow-node" style="top: 75%; left: 45%;">深圳</div>

                            <!-- 流动线: 北京→上海 -->
                            <div class="flow-line" style="top: 18%; left: 22%; width: 50%;" onclick="showFlowDetail('北京', '上海', 1234)">
                                <span class="flow-number">1,234</span>
                            </div>
                            
                            <!-- 流动线: 北京→武汉 -->
                            <div class="flow-line" style="top: 30%; left: 20%; width: 25%; transform: rotate(35deg); transform-origin: left center;" onclick="showFlowDetail('北京', '武汉', 876)">
                                <span class="flow-number">876</span>
                            </div>
                            
                            <!-- 流动线: 西安→武汉 -->
                            <div class="flow-line" style="top: 48%; left: 22%; width: 20%;" onclick="showFlowDetail('西安', '武汉', 654)">
                                <span class="flow-number">654</span>
                            </div>
                            
                            <!-- 流动线: 西安→成都 -->
                            <div class="flow-line" style="top: 62%; left: 18%; width: 8%; transform: rotate(90deg); transform-origin: left center;" onclick="showFlowDetail('西安', '成都', 543)">
                                <span class="flow-number">543</span>
                            </div>
                            
                            <!-- 流动线: 武汉→杭州 -->
                            <div class="flow-line" style="top: 48%; left: 52%; width: 20%;" onclick="showFlowDetail('武汉', '杭州', 765)">
                                <span class="flow-number">765</span>
                            </div>
                            
                            <!-- 流动线: 武汉→深圳 -->
                            <div class="flow-line" style="top: 62%; left: 48%; width: 8%; transform: rotate(90deg); transform-origin: left center;" onclick="showFlowDetail('武汉', '深圳', 987)">
                                <span class="flow-number">987</span>
                            </div>
                            
                            <!-- 流动线: 上海→杭州 -->
                            <div class="flow-line" style="top: 30%; left: 78%; width: 8%; transform: rotate(90deg); transform-origin: left center;" onclick="showFlowDetail('上海', '杭州', 1123)">
                                <span class="flow-number">1,123</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧面板 -->
                <div class="right-panel">
                    <!-- 机构排名列表 -->
                    <div class="institutions-section">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-building" style="margin-right: 8px; color: #1890ff;"></i>
                                机构排行榜
                            </div>
                            <select class="filter-select" style="width: 120px;" onchange="sortInstitutions(this.value)">
                                <option value="talent">按人才数</option>
                                <option value="achievement">按成果数</option>
                                <option value="influence">按影响力</option>
                            </select>
                        </div>
                        <div class="institutions-list" id="institutionsList">
                            <div class="institution-item" onclick="viewInstitutionDetail('清华大学')">
                                <span class="institution-rank">1</span>
                                <span class="institution-name">清华大学</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>2,345</b></span>
                                    <span class="institution-stat">成果: <b>5,678</b></span>
                                </div>
                            </div>
                            <div class="institution-item" onclick="viewInstitutionDetail('北京大学')">
                                <span class="institution-rank">2</span>
                                <span class="institution-name">北京大学</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>2,123</b></span>
                                    <span class="institution-stat">成果: <b>5,234</b></span>
                                </div>
                            </div>
                            <div class="institution-item" onclick="viewInstitutionDetail('浙江大学')">
                                <span class="institution-rank">3</span>
                                <span class="institution-name">浙江大学</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>1,987</b></span>
                                    <span class="institution-stat">成果: <b>4,876</b></span>
                                </div>
                            </div>
                            <div class="institution-item" onclick="viewInstitutionDetail('复旦大学')">
                                <span class="institution-rank">4</span>
                                <span class="institution-name">复旦大学</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>1,765</b></span>
                                    <span class="institution-stat">成果: <b>4,321</b></span>
                                </div>
                            </div>
                            <div class="institution-item" onclick="viewInstitutionDetail('上海交通大学')">
                                <span class="institution-rank">5</span>
                                <span class="institution-name">上海交通大学</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>1,654</b></span>
                                    <span class="institution-stat">成果: <b>4,123</b></span>
                                </div>
                            </div>
                            <div class="institution-item" onclick="viewInstitutionDetail('中国科学院')">
                                <span class="institution-rank">6</span>
                                <span class="institution-name">中国科学院</span>
                                <div class="institution-stats">
                                    <span class="institution-stat">人才: <b>1,543</b></span>
                                    <span class="institution-stat">成果: <b>3,987</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 代表性成果列表 -->
                    <div class="achievements-section">
                        <div class="section-header">
                            <div class="section-title">
                                <i class="fas fa-award" style="margin-right: 8px; color: #fa8c16;"></i>
                                代表性成果
                            </div>
                            <span class="achievement-context" id="achievementContext">全国 · 全部领域</span>
                        </div>
                        <div class="representative-achievements" id="representativeAchievements"></div>
                    </div>

                </div>
            </div>
        </div>

        <!-- 对比分析弹窗 -->
        <div class="compare-modal" id="compareModal">
            <div class="compare-content">
                <div class="compare-header">
                    <div class="compare-title">对比分析</div>
                    <div class="compare-close" onclick="closeCompareModal()">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="compare-content-inner">
                    <!-- 选择对比对象 -->
                    <div class="compare-section">
                        <div class="compare-section-title">
                            <i class="fas fa-check-square" style="margin-right: 8px; color: #1890ff;"></i>
                            选择对比对象
                        </div>
                        <div class="compare-select-area">
                            <div class="compare-select-group">
                                <div class="compare-select-label">选择地区（多选）</div>
                                <div class="compare-select-items" id="compareRegionItems">
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '北京', this)">北京</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '上海', this)">上海</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '江苏', this)">江苏</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '浙江', this)">浙江</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '广东', this)">广东</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '山东', this)">山东</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '湖北', this)">湖北</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('region', '四川', this)">四川</div>
                                </div>
                            </div>
                            <div class="compare-select-group">
                                <div class="compare-select-label">选择机构（多选）</div>
                                <div class="compare-select-items" id="compareInstitutionItems">
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '清华大学', this)">清华大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '北京大学', this)">北京大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '浙江大学', this)">浙江大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '复旦大学', this)">复旦大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '上海交通大学', this)">上海交通大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '中国科学院', this)">中国科学院</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '华中科技大学', this)">华中科技大学</div>
                                    <div class="compare-select-item" onclick="toggleCompareItem('institution', '中山大学', this)">中山大学</div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align: center; margin-bottom: 20px;">
                            <button class="btn btn-primary" onclick="generateCompareResult()">
                                <i class="fas fa-chart-bar"></i>生成对比分析
                            </button>
                        </div>
                    </div>

                    <!-- 对比结果 -->
                    <div class="compare-section" id="compareResultSection" style="display: none;">
                        <div class="compare-section-title">
                            <i class="fas fa-chart-bar" style="margin-right: 8px; color: #1890ff;"></i>
                            对比结果分析
                        </div>
                        <div class="compare-chart-area">
                            <div class="compare-chart" id="compareChart">
                                <!-- 动态生成柱状图 -->
                            </div>
                        </div>
                        <table class="compare-table" id="compareTable">
                            <thead>
                                <tr>
                                    <th>对比指标</th>
                                    <th id="compareHeader1">对象1</th>
                                    <th id="compareHeader2">对象2</th>
                                    <th>差异</th>
                                </tr>
                            </thead>
                            <tbody id="compareTableBody">
                                <!-- 动态生成表格内容 -->
                            </tbody>
                        </table>
                        <div class="compare-actions">
                            <button class="btn btn-primary" onclick="exportCompareResult()">
                                <i class="fas fa-download"></i>导出对比报告
                            </button>
                            <button class="btn btn-secondary" onclick="resetCompare()">
                                <i class="fas fa-redo"></i>重新选择
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 流动详情弹窗 -->
        <div class="flow-detail-modal" id="flowDetailModal">
            <div class="flow-detail-title" id="flowDetailTitle">流动详情</div>
            <div class="flow-detail-item">人才数量：<b id="flowDetailCount">-</b></div>
            <div class="flow-detail-item">主要机构：<b id="flowDetailInstitutions">-</b></div>
            <div class="flow-detail-item">研究领域：<b id="flowDetailFields">-</b></div>
            <div style="margin-top: 16px; text-align: right;">
                <button class="btn btn-secondary" onclick="closeFlowDetailModal()">关闭</button>
            </div>
        </div>

        <!-- 分布筛选的精确时间区间弹窗 -->
        <div class="distribution-time-overlay" id="distributionTimeModal" onclick="if (event.target === this) closeDistributionTimeRangeModal()">
            <div class="distribution-time-modal" onclick="event.stopPropagation()">
                <div class="distribution-time-modal-header">
                    <h3><i class="fas fa-calendar-alt" style="color: #1890ff; margin-right: 8px;"></i>选择时间区间</h3>
                    <button class="distribution-time-modal-close" onclick="closeDistributionTimeRangeModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="distribution-time-fields">
                    <div>
                        <label for="distributionStartDate">开始日期</label>
                        <input type="date" id="distributionStartDate" value="2022-01-01">
                    </div>
                    <div>
                        <label for="distributionEndDate">结束日期</label>
                        <input type="date" id="distributionEndDate" value="2024-12-31">
                    </div>
                </div>
                <div class="distribution-time-actions">
                    <button class="btn btn-secondary" onclick="closeDistributionTimeRangeModal()">取消</button>
                    <button class="btn btn-primary" onclick="applyDistributionTimeRange()">应用时间区间</button>
                </div>
            </div>
        </div>

        <!-- 流动趋势的自定义时间范围弹窗 -->
        <div class="flow-detail-modal" id="customTimeModal" style="min-width: 400px;">
            <div class="flow-detail-title">自定义时间范围</div>
            <div style="margin: 16px 0;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #333;">开始年份</label>
                <select class="filter-select" id="startYear" style="width: 100%;">
                    <option value="2020">2020年</option>
                    <option value="2021">2021年</option>
                    <option value="2022">2022年</option>
                    <option value="2023">2023年</option>
                </select>
            </div>
            <div style="margin: 16px 0;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #333;">结束年份</label>
                <select class="filter-select" id="endYear" style="width: 100%;">
                    <option value="2021">2021年</option>
                    <option value="2022">2022年</option>
                    <option value="2023">2023年</option>
                    <option value="2024" selected>2024年</option>
                </select>
            </div>
            <div style="margin-top: 20px; text-align: right; display: flex; gap: 10px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeCustomTimeModal()">取消</button>
                <button class="btn btn-primary" onclick="applyCustomTimeRange()">应用</button>
            </div>
        </div>

        <!-- 下钻详情弹窗 -->
        <div class="drilldown-modal" id="drilldownModal">
            <div class="drilldown-content">
                <div class="drilldown-header">
                    <div class="drilldown-title" id="drilldownTitle">地区人才构成详情</div>
                    <div class="drilldown-close" onclick="closeDrilldownModal()">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="drilldown-body">
                    <!-- 统计卡片 -->
                    <div class="drilldown-stats">
                        <div class="drilldown-stat-card">
                            <div class="drilldown-stat-value" id="drilldownTotalTalent">-</div>
                            <div class="drilldown-stat-label">人才总数</div>
                        </div>
                        <div class="drilldown-stat-card">
                            <div class="drilldown-stat-value" id="drilldownUniversities">-</div>
                            <div class="drilldown-stat-label">高校数量</div>
                        </div>
                        <div class="drilldown-stat-card">
                            <div class="drilldown-stat-value" id="drilldownResearch">-</div>
                            <div class="drilldown-stat-label">研究院数量</div>
                        </div>
                        <div class="drilldown-stat-card">
                            <div class="drilldown-stat-value" id="drilldownEnterprises">-</div>
                            <div class="drilldown-stat-label">企业数量</div>
                        </div>
                    </div>

                    <!-- 高校机构 -->
                    <div class="drilldown-section">
                        <div class="drilldown-section-title">
                            <i class="fas fa-graduation-cap"></i>
                            高校机构
                        </div>
                        <div class="drilldown-institutions" id="drilldownUniversitiesList">
                            <!-- 动态生成 -->
                        </div>
                    </div>

                    <!-- 研究院 -->
                    <div class="drilldown-section">
                        <div class="drilldown-section-title">
                            <i class="fas fa-microscope"></i>
                            科研院所
                        </div>
                        <div class="drilldown-institutions" id="drilldownResearchList">
                            <!-- 动态生成 -->
                        </div>
                    </div>

                    <!-- 企业 -->
                    <div class="drilldown-section">
                        <div class="drilldown-section-title">
                            <i class="fas fa-building"></i>
                            企业机构
                        </div>
                        <div class="drilldown-institutions" id="drilldownEnterprisesList">
                            <!-- 动态生成 -->
                        </div>
                    </div>

                    <!-- 人才构成分析 -->
                    <div class="drilldown-section">
                        <div class="drilldown-section-title">
                            <i class="fas fa-chart-pie"></i>
                            人才构成分析
                        </div>
                        <div class="drilldown-talent-pie">
                            <div class="drilldown-pie-chart" id="drilldownPieChart">
                                <svg width="200" height="200" viewBox="0 0 200 200">
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1890ff" stroke-width="30" stroke-dasharray="251.2" stroke-dashoffset="0"/>
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#52c41a" stroke-width="30" stroke-dasharray="251.2" stroke-dashoffset="100.48" transform="rotate(90 100 100)"/>
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#fa8c16" stroke-width="30" stroke-dasharray="251.2" stroke-dashoffset="175.84" transform="rotate(180 100 100)"/>
                                </svg>
                            </div>
                            <div class="drilldown-pie-legend">
                                <div class="drilldown-legend-item">
                                    <div class="drilldown-legend-color" style="background: #1890ff;"></div>
                                    <div class="drilldown-legend-label">高校人才</div>
                                    <div class="drilldown-legend-value" id="drilldownUniversityPercent">40%</div>
                                </div>
                                <div class="drilldown-legend-item">
                                    <div class="drilldown-legend-color" style="background: #52c41a;"></div>
                                    <div class="drilldown-legend-label">研究院人才</div>
                                    <div class="drilldown-legend-value" id="drilldownResearchPercent">35%</div>
                                </div>
                                <div class="drilldown-legend-item">
                                    <div class="drilldown-legend-color" style="background: #fa8c16;"></div>
                                    <div class="drilldown-legend-label">企业人才</div>
                                    <div class="drilldown-legend-value" id="drilldownEnterprisePercent">25%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 优势研究领域 -->
                    <div class="drilldown-section">
                        <div class="drilldown-section-title">
                            <i class="fas fa-lightbulb"></i>
                            优势研究领域
                        </div>
                        <div class="drilldown-field-tags" id="drilldownFieldTags">
                            <div class="drilldown-field-tag">人工智能</div>
                            <div class="drilldown-field-tag">生物技术</div>
                            <div class="drilldown-field-tag">新材料</div>
                            <div class="drilldown-field-tag">新能源</div>
                            <div class="drilldown-field-tag">信息技术</div>
                            <div class="drilldown-field-tag">智能制造</div>
                        </div>
                    </div>
                </div>

                <!-- 底部操作按钮 -->
                <div class="drilldown-actions">
                    <button class="btn btn-secondary" onclick="exportDrilldownData('excel')">
                        <i class="fas fa-file-excel"></i>导出Excel
                    </button>
                    <button class="btn btn-secondary" onclick="exportDrilldownData('pdf')">
                        <i class="fas fa-file-pdf"></i>导出PDF
                    </button>
                    <button class="btn btn-outline" onclick="closeDrilldownModal()">
                        <i class="fas fa-times"></i>关闭
                    </button>
                </div>
            </div>
        </div>

        <!-- 人才指数模块 -->
        <div class="module-content" id="module-index">
            <!-- 筛选与导出功能 -->
            <div class="index-filter-export">
                <div class="filter-bar-section" style="position: relative;">
                    <div class="filter-row" style="padding-right: 120px;">
                        <div class="filter-item">
                            <label class="filter-label">地域范围</label>
                            <select class="filter-select" id="indexRegionFilter" onchange="applyIndexFilters()">
                                <option value="all">全国范围</option>
                                <option value="north">华北地区</option>
                                <option value="east">华东地区</option>
                                <option value="south">华南地区</option>
                            </select>
                        </div>
                        <div class="filter-item">
                            <label class="filter-label">产业类别</label>
                            <select class="filter-select" id="indexIndustryFilter" onchange="applyIndexFilters()">
                                <option value="all">全部产业</option>
                                <option value="high-manufacturing">高端制造业</option>
                                <option value="ai">人工智能</option>
                                <option value="biotech">生物技术</option>
                                <option value="newenergy">新能源</option>
                            </select>
                        </div>
                        <div class="filter-item">
                            <label class="filter-label">时间段</label>
                            <select class="filter-select" id="indexTimeFilter" onchange="applyIndexFilters()">
                                <option value="all">全部年份</option>
                                <option value="2020-2022">2020-2022</option>
                                <option value="2023-2024">2023-2024</option>
                            </select>
                        </div>
                    </div>
                    <div class="export-dropdown" style="position: absolute; top: 0; right: 0;">
                        <button class="btn btn-primary export-main-btn" onclick="showIndexExportScopeModal()">
                            <i class="fas fa-download"></i>导出
                            <i class="fas fa-chevron-down" style="margin-left: 8px;"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 综合指数概览区 -->
            <div class="index-stats-cards">
                <div class="index-card" onclick="filterByIndex('total', this)" data-index="total" onmouseenter="showIndexTooltip(this, 'total')" onmouseleave="hideIndexTooltip()">
                    <div class="index-card-header">
                        <div class="index-card-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="index-card-title">人才总量指数</div>
                    <div class="index-card-value">92.5</div>
                    <div class="index-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>较上年 +8.3%</span>
                    </div>
                    <div class="index-card-footer">
                        <span class="index-card-rank">排名: 全国第3</span>
                        <span class="index-card-weight">权重: 30%</span>
                    </div>
                    <div class="index-tooltip" id="tooltip-total" style="display: none;">
                        <div class="tooltip-header">
                            <i class="fas fa-users"></i> 人才总量指数
                        </div>
                        <div class="tooltip-content">
                            <div class="tooltip-section">
                                <div class="tooltip-label">计算方式</div>
                                <div class="tooltip-desc">基于地区高层次人才数量（院士、长江学者、杰青等）、人才密度（每万人中高层次人才数）、人才增长率等指标综合评估</div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">指标权重</div>
                                <div class="tooltip-weights">
                                    <span class="weight-tag">高层次人才数量 40%</span>
                                    <span class="weight-tag">人才密度 30%</span>
                                    <span class="weight-tag">人才增长率 20%</span>
                                    <span class="weight-tag">人才结构 10%</span>
                                </div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">数据来源</div>
                                <div class="tooltip-desc">教育部人才数据库、科技部科技人才信息平台、人社部专业技术人才统计、各省市人才白皮书</div>
                            </div>
                            <div class="tooltip-footer">
                                <span class="tooltip-icon"><i class="fas fa-database"></i></span>
                                多源数据融合 · 年度更新
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-card" onclick="filterByIndex('output', this)" data-index="output" onmouseenter="showIndexTooltip(this, 'output')" onmouseleave="hideIndexTooltip()">
                    <div class="index-card-header">
                        <div class="index-card-icon" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                            <i class="fas fa-flask"></i>
                        </div>
                    </div>
                    <div class="index-card-title">科研产出指数</div>
                    <div class="index-card-value">88.7</div>
                    <div class="index-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>较上年 +12.1%</span>
                    </div>
                    <div class="index-card-footer">
                        <span class="index-card-rank">排名: 全国第5</span>
                        <span class="index-card-weight">权重: 25%</span>
                    </div>
                    <div class="index-tooltip" id="tooltip-output" style="display: none;">
                        <div class="tooltip-header">
                            <i class="fas fa-flask"></i> 科研产出指数
                        </div>
                        <div class="tooltip-content">
                            <div class="tooltip-section">
                                <div class="tooltip-label">计算方式</div>
                                <div class="tooltip-desc">基于论文发表数量及质量（SCI/SSCI/EI收录数、影响因子）、专利申请与授权量、科研成果获奖情况、科研项目经费等指标综合评估</div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">指标权重</div>
                                <div class="tooltip-weights">
                                    <span class="weight-tag">论文数量 30%</span>
                                    <span class="weight-tag">论文质量 25%</span>
                                    <span class="weight-tag">专利授权 20%</span>
                                    <span class="weight-tag">科研获奖 15%</span>
                                    <span class="weight-tag">项目经费 10%</span>
                                </div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">数据来源</div>
                                <div class="tooltip-desc">Web of Science、Scopus、CNKI数据库、中国专利公布公告系统、国家科学技术奖数据库、国家自然科学基金委项目库</div>
                            </div>
                            <div class="tooltip-footer">
                                <span class="tooltip-icon"><i class="fas fa-chart-line"></i></span>
                                实时更新 · 国际标准
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-card" onclick="filterByIndex('influence', this)" data-index="influence" onmouseenter="showIndexTooltip(this, 'influence')" onmouseleave="hideIndexTooltip()">
                    <div class="index-card-header">
                        <div class="index-card-icon" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                            <i class="fas fa-quote-right"></i>
                        </div>
                    </div>
                    <div class="index-card-title">学术影响力指数</div>
                    <div class="index-card-value">85.3</div>
                    <div class="index-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>较上年 +6.7%</span>
                    </div>
                    <div class="index-card-footer">
                        <span class="index-card-rank">排名: 全国第4</span>
                        <span class="index-card-weight">权重: 20%</span>
                    </div>
                    <div class="index-tooltip" id="tooltip-influence" style="display: none;">
                        <div class="tooltip-header">
                            <i class="fas fa-quote-right"></i> 学术影响力指数
                        </div>
                        <div class="tooltip-content">
                            <div class="tooltip-section">
                                <div class="tooltip-label">计算方式</div>
                                <div class="tooltip-desc">基于论文被引用次数、H指数、国际学术影响力（高被引论文数、热点论文数）、学术任职情况（期刊编委、学会理事）等指标综合评估</div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">指标权重</div>
                                <div class="tooltip-weights">
                                    <span class="weight-tag">论文引用 35%</span>
                                    <span class="weight-tag">H指数 25%</span>
                                    <span class="weight-tag">高被引论文 25%</span>
                                    <span class="weight-tag">学术任职 15%</span>
                                </div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">数据来源</div>
                                <div class="tooltip-desc">Clarivate Analytics高被引论文数据库、Essential Science Indicators、Google Scholar、Elsevier Scopus、各学术期刊编委会信息</div>
                            </div>
                            <div class="tooltip-footer">
                                <span class="tooltip-icon"><i class="fas fa-globe"></i></span>
                                国际对标 · 每月更新
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-card" onclick="filterByIndex('contribution', this)" data-index="contribution" onmouseenter="showIndexTooltip(this, 'contribution')" onmouseleave="hideIndexTooltip()">
                    <div class="index-card-header">
                        <div class="index-card-icon" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                    </div>
                    <div class="index-card-title">产业贡献度指数</div>
                    <div class="index-card-value">79.8</div>
                    <div class="index-card-trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>较上年 +9.2%</span>
                    </div>
                    <div class="index-card-footer">
                        <span class="index-card-rank">排名: 全国第6</span>
                        <span class="index-card-weight">权重: 15%</span>
                    </div>
                    <div class="index-tooltip" id="tooltip-contribution" style="display: none;">
                        <div class="tooltip-header">
                            <i class="fas fa-chart-pie"></i> 产业贡献度指数
                        </div>
                        <div class="tooltip-content">
                            <div class="tooltip-section">
                                <div class="tooltip-label">计算方式</div>
                                <div class="tooltip-desc">基于产学研合作项目数、技术合同成交额、科技成果转化收益、企业研发人员占比、产业技术攻关项目参与度等指标综合评估</div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">指标权重</div>
                                <div class="tooltip-weights">
                                    <span class="weight-tag">产学研合作 30%</span>
                                    <span class="weight-tag">技术转化 30%</span>
                                    <span class="weight-tag">产业收益 20%</span>
                                    <span class="weight-tag">企业研发 20%</span>
                                </div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">数据来源</div>
                                <div class="tooltip-desc">全国技术合同认定登记系统、教育部产学研合作平台、国家统计局科技统计、企业研发投入年报、产业技术攻关项目库</div>
                            </div>
                            <div class="tooltip-footer">
                                <span class="tooltip-icon"><i class="fas fa-building"></i></span>
                                产业导向 · 季度更新
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-card" onclick="filterByIndex('mobility', this)" data-index="mobility" onmouseenter="showIndexTooltip(this, 'mobility')" onmouseleave="hideIndexTooltip()">
                    <div class="index-card-header">
                        <div class="index-card-icon" style="background: linear-gradient(135deg, #fa709a, #fee140);">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                    </div>
                    <div class="index-card-title">流动活跃度指数</div>
                    <div class="index-card-value">76.4</div>
                    <div class="index-card-trend negative">
                        <i class="fas fa-arrow-down"></i>
                        <span>较上年 -3.5%</span>
                    </div>
                    <div class="index-card-footer">
                        <span class="index-card-rank">排名: 全国第7</span>
                        <span class="index-card-weight">权重: 10%</span>
                    </div>
                    <div class="index-tooltip" id="tooltip-mobility" style="display: none;">
                        <div class="tooltip-header">
                            <i class="fas fa-exchange-alt"></i> 流动活跃度指数
                        </div>
                        <div class="tooltip-content">
                            <div class="tooltip-section">
                                <div class="tooltip-label">计算方式</div>
                                <div class="tooltip-desc">基于人才流入流出比例、跨地区流动频率、人才流动意愿、流动成功率、流动后满意度等指标综合评估</div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">指标权重</div>
                                <div class="tooltip-weights">
                                    <span class="weight-tag">流动比例 30%</span>
                                    <span class="weight-tag">流动频率 25%</span>
                                    <span class="weight-tag">流动意愿 20%</span>
                                    <span class="weight-tag">成功率 15%</span>
                                    <span class="weight-tag">满意度 10%</span>
                                </div>
                            </div>
                            <div class="tooltip-section">
                                <div class="tooltip-label">数据来源</div>
                                <div class="tooltip-desc">人社部人才流动监测系统、教育部就业与人才流动数据、各省市人才交流中心统计、人才流动问卷调查、社会招聘平台大数据</div>
                            </div>
                            <div class="tooltip-footer">
                                <span class="tooltip-icon"><i class="fas fa-sync"></i></span>
                                动态监测 · 月度更新
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 指标权重设置面板 -->
            <div class="weight-panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <i class="fas fa-sliders-h" style="margin-right: 8px;"></i>
                        指标权重设置
                    </div>
                    <button class="btn btn-primary" onclick="showWeightSettings()">
                        <i class="fas fa-edit"></i>编辑权重
                    </button>
                </div>
                <div class="current-weights">
                    <div class="weight-item">
                        <span class="weight-label">人才总量</span>
                        <div class="weight-bar">
                            <div class="weight-bar-fill" style="width: 30%;"></div>
                        </div>
                        <span class="weight-value">30%</span>
                    </div>
                    <div class="weight-item">
                        <span class="weight-label">科研产出</span>
                        <div class="weight-bar">
                            <div class="weight-bar-fill" style="width: 25%;"></div>
                        </div>
                        <span class="weight-value">25%</span>
                    </div>
                    <div class="weight-item">
                        <span class="weight-label">学术影响力</span>
                        <div class="weight-bar">
                            <div class="weight-bar-fill" style="width: 20%;"></div>
                        </div>
                        <span class="weight-value">20%</span>
                    </div>
                    <div class="weight-item">
                        <span class="weight-label">产业贡献度</span>
                        <div class="weight-bar">
                            <div class="weight-bar-fill" style="width: 15%;"></div>
                        </div>
                        <span class="weight-value">15%</span>
                    </div>
                    <div class="weight-item">
                        <span class="weight-label">流动活跃度</span>
                        <div class="weight-bar">
                            <div class="weight-bar-fill" style="width: 10%;"></div>
                        </div>
                        <span class="weight-value">10%</span>
                    </div>
                </div>
            </div>

            <!-- 趋势分析图表区 -->
            <div class="chart-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-chart-line" style="margin-right: 8px; color: #1890ff;"></i>
                        趋势分析
                    </div>
                    <div class="chart-controls">
                        <button class="chart-btn active" onclick="switchChartType('line', this)">折线图</button>
                        <button class="chart-btn" onclick="switchChartType('bar', this)">柱状图</button>
                    </div>
                </div>
                <div class="chart-controls-row">
                    <div class="time-range-selector">
                        <label class="selector-label">
                            <i class="fas fa-calendar-alt"></i> 时间区间
                        </label>
                        <select class="time-range-select" id="timeRangeSelect" onchange="applyTimeRange()">
                            <option value="all">全部年份 (2020-2024)</option>
                            <option value="2020-2021">2020-2021</option>
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                            <option value="2023-2024" selected>2023-2024</option>
                        </select>
                    </div>
                    <div class="custom-range">
                        <label class="selector-label">
                            <i class="fas fa-calendar-check"></i> 自定义区间
                        </label>
                        <select class="year-select" id="startYear" onchange="updateCustomRange()">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023" selected>2023</option>
                            <option value="2024">2024</option>
                        </select>
                        <span class="range-separator">至</span>
                        <select class="year-select" id="endYear" onchange="updateCustomRange()">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024" selected>2024</option>
                        </select>
                        <button class="btn-apply-range" onclick="applyCustomRange()">
                            <i class="fas fa-check"></i> 应用
                        </button>
                    </div>
                    <div class="range-info" id="rangeInfo">
                        <i class="fas fa-info-circle"></i>
                        <span>当前显示：2023-2024年</span>
                    </div>
                </div>
                <div class="chart-container" id="trendChart">
                    <div class="chart-legend">
                        <div class="legend-item active" data-metric="total" onclick="toggleLegend('total', this)">
                            <span class="legend-color" style="background: #1890ff;"></span>
                            <span class="legend-label">综合指数</span>
                        </div>
                        <div class="legend-item active" data-metric="talent" onclick="toggleLegend('talent', this)">
                            <span class="legend-color" style="background: #52c41a;"></span>
                            <span class="legend-label">人才总量</span>
                        </div>
                        <div class="legend-item active" data-metric="output" onclick="toggleLegend('output', this)">
                            <span class="legend-color" style="background: #fa8c16;"></span>
                            <span class="legend-label">科研产出</span>
                        </div>
                        <div class="legend-item active" data-metric="influence" onclick="toggleLegend('influence', this)">
                            <span class="legend-color" style="background: #eb2f96;"></span>
                            <span class="legend-label">学术影响力</span>
                        </div>
                        <div class="legend-item active" data-metric="contribution" onclick="toggleLegend('contribution', this)">
                            <span class="legend-color" style="background: #722ed1;"></span>
                            <span class="legend-label">产业贡献度</span>
                        </div>
                    </div>
                    <div class="chart-canvas" id="trendChartCanvas">
                        <!-- 动态生成图表 -->
                    </div>
                    <div class="index-trend-tooltip" id="indexTrendTooltip" role="status" aria-live="polite"></div>
                </div>
            </div>

            <!-- 指标对比雷达图区 -->
            <div class="compare-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-chart-bar" style="margin-right: 8px; color: #1890ff;"></i>
                        指标对比雷达图
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <select class="filter-select" id="compareType" onchange="switchCompareType(this.value)" style="width: 120px;">
                            <option value="region">区域对比</option>
                            <option value="industry">产业对比</option>
                        </select>
                        <button class="btn btn-primary" onclick="exportCompareReport()">
                            <i class="fas fa-download"></i>导出报告
                        </button>
                    </div>
                </div>
                <div class="compare-layout">
                    <div class="compare-filter">
                        <div class="filter-title">选择对比对象</div>
                        <div class="filter-subtitle" id="compareSubtitle">最多选择5个区域进行对比</div>
                        <div class="region-checkboxes" id="compareCheckboxes">
                            <label class="region-checkbox">
                                <input type="checkbox" value="北京" checked onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #1890ff;"></div>
                                <span>北京</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="上海" checked onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #52c41a;"></div>
                                <span>上海</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="江苏" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #faad14;"></div>
                                <span>江苏</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="浙江" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #f5222d;"></div>
                                <span>浙江</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="广东" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #722ed1;"></div>
                                <span>广东</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="湖北" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #13c2c2;"></div>
                                <span>湖北</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="山东" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #eb2f96;"></div>
                                <span>山东</span>
                            </label>
                            <label class="region-checkbox">
                                <input type="checkbox" value="四川" onchange="updateCompareRegions()">
                                <div class="region-color" style="background: #fa8c16;"></div>
                                <span>四川</span>
                            </label>
                        </div>
                    </div>
                    <div class="compare-charts">
                        <div class="radar-chart-container">
                            <div class="chart-subtitle">雷达图对比（五大维度）</div>
                            <div class="radar-chart" id="radarChart">
                                <!-- 动态生成 -->
                            </div>
                        </div>
                        <div class="bar-chart-container">
                            <div class="chart-subtitle">并列柱状图对比</div>
                            <div class="compare-bar-chart" id="compareBarChart">
                                <!-- 动态生成 -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-radar-detail-panel" id="indexRadarDetailPanel" aria-hidden="true">
                    <div class="index-radar-detail-header">
                        <div>
                            <div class="index-radar-detail-title">指标对比详细分析</div>
                            <div class="index-radar-detail-subtitle">展示各维度得分来源、样本数量及全国排名趋势</div>
                        </div>
                        <button class="index-radar-detail-close" type="button" onclick="hideIndexRadarDetails()" aria-label="关闭详细分析">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="index-radar-detail-grid" id="indexRadarDetailGrid"></div>
                </div>
            </div>

            <!-- 雷达图节点详情弹窗 -->
            <div class="radar-detail-overlay" id="radarDetailOverlay" onclick="closeRadarDetail()">
                <div class="radar-node-detail" id="radarNodeDetail" onclick="event.stopPropagation()">
                    <div class="radar-detail-header">
                        <div class="radar-detail-title" id="radarDetailTitle">地区详情</div>
                        <button class="radar-detail-close" onclick="closeRadarDetail()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="radar-detail-content">
                        <div class="radar-detail-item">
                            <div class="radar-detail-label">人才数量</div>
                            <div class="radar-detail-value" id="radarDetailTalentCount">-</div>
                        </div>
                        <div class="radar-detail-item">
                            <div class="radar-detail-label">科研产出</div>
                            <div class="radar-detail-value" id="radarDetailResearchOutput">-</div>
                        </div>
                        <div class="radar-detail-item">
                            <div class="radar-detail-label">代表机构数</div>
                            <div class="radar-detail-value" id="radarDetailInstitutions">-</div>
                        </div>
                        <div class="radar-detail-item">
                            <div class="radar-detail-label">重点产业</div>
                            <div class="radar-detail-value" id="radarDetailIndustries">-</div>
                        </div>
                    </div>
                    <div class="radar-detail-list">
                        <div class="radar-detail-list-title">代表机构</div>
                        <div id="radarDetailInstitutionList">
                            <!-- 动态生成 -->
                        </div>
                    </div>
                    <div class="radar-detail-list">
                        <div class="radar-detail-list-title">重点产业方向</div>
                        <div id="radarDetailIndustryList">
                            <!-- 动态生成 -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- 人才支撑指数动态分析（合并热力图和播放控制） -->
            <div class="heatmap-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-fire" style="margin-right: 8px; color: #1890ff;"></i>
                        人才支持指数热力图分布视图
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <!-- 播放控制按钮组 -->
                        <div class="inline-playback-controls">
                            <button class="inline-play-btn secondary" onclick="resetPlayback()" title="重置">
                                <i class="fas fa-undo"></i>
                            </button>
                            <button class="inline-play-btn secondary" onclick="stepBackward()" title="上一帧">
                                <i class="fas fa-step-backward"></i>
                            </button>
                            <button class="inline-play-btn" id="indexPlayBtn" onclick="toggleIndexPlay()" title="播放/暂停">
                                <i class="fas fa-play" id="playIcon"></i>
                            </button>
                            <button class="inline-play-btn secondary" onclick="stepForward()" title="下一帧">
                                <i class="fas fa-step-forward"></i>
                            </button>
                        </div>
                        <!-- 年份显示 -->
                        <div class="year-display">
                            <i class="fas fa-calendar-alt"></i>
                            <span id="indexYearLabel">2024</span>年
                        </div>
                        <!-- 状态标签 -->
                        <span class="playback-status-badge paused" id="playbackStatus">已暂停</span>
                        <select class="filter-select" id="heatmapIndustryFilter" onchange="updateHeatmapByIndustry()" style="width: 140px;">
                            <option value="all">全部产业</option>
                            <option value="ai">人工智能</option>
                            <option value="biotech">生物医药</option>
                            <option value="newenergy">新能源</option>
                            <option value="manufacturing">高端制造</option>
                            <option value="materials">新材料</option>
                        </select>
                        <div class="map-zoom-controls">
                            <button class="map-zoom-btn" onclick="zoomMap('in')" title="放大">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="map-zoom-btn" onclick="zoomMap('out')" title="缩小">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="map-zoom-btn" onclick="resetZoom()" title="重置视角">
                                <i class="fas fa-redo"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 热力图容器 -->
                <div class="heatmap-container" id="heatmapContainer" onmousedown="startDrag(event)" onmousemove="onDrag(event)" onmouseup="endDrag()" onmouseleave="endDrag()">
                    <div class="heatmap-map" id="heatmapMap">
                        <!-- 动态生成热力图区域 -->
                    </div>

                    <!-- 热力图图例 -->
                    <div class="heatmap-legend">
                        <div class="legend-title">
                            <i class="fas fa-chart-line"></i>
                            人才指数强度
                        </div>
                        <div class="legend-scale">
                            <div class="legend-item">
                                <div class="legend-color" style="background: linear-gradient(135deg, #ff4d4f, #ff7875);"></div>
                                <span>90-100 优秀</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: linear-gradient(135deg, #ff9c6e, #ffc069);"></div>
                                <span>80-89 良好</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: linear-gradient(135deg, #ffc53d, #ffec3d);"></div>
                                <span>70-79 中等</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: linear-gradient(135deg, #73d13d, #95de64);"></div>
                                <span>60-69 一般</span>
                            </div>
                        </div>
                    </div>

                    <!-- 操作提示 -->
                    <div style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 10px 14px; border-radius: 8px; font-size: 11px; color: #666; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <i class="fas fa-info-circle" style="margin-right: 4px;"></i>
                        单击查看详情 | 双击下钻产业 | 拖拽平移 | 滚轮缩放
                    </div>
                </div>
                
                <!-- 年份滑块和进度条 -->
                <div class="playback-footer">
                    <div class="playback-progress">
                        <div class="playback-progress-bar" id="playbackProgressBar" style="width: 100%;"></div>
                    </div>
                    <div class="playback-slider-row">
                        <input type="range" class="playback-slider" min="2020" max="2024" value="2024" id="indexSlider" oninput="updateIndexYear(this.value)">
                        <div class="playback-years">
                            <span class="playback-year" onclick="selectIndexYear(2020)">2020</span>
                            <span class="playback-year" onclick="selectIndexYear(2021)">2021</span>
                            <span class="playback-year" onclick="selectIndexYear(2022)">2022</span>
                            <span class="playback-year" onclick="selectIndexYear(2023)">2023</span>
                            <span class="playback-year active" onclick="selectIndexYear(2024)">2024</span>
                        </div>
                    </div>
                    <!-- 速度控制 -->
                    <div class="playback-footer-bottom">
                        <div class="playback-speed-inline">
                            <span class="speed-label">速度:</span>
                            <button class="speed-btn" onclick="setPlaybackSpeed(0.5)">0.5x</button>
                            <button class="speed-btn active" onclick="setPlaybackSpeed(1)">1x</button>
                            <button class="speed-btn" onclick="setPlaybackSpeed(2)">2x</button>
                        </div>
                        <!-- 统计数据 -->
                        <div class="inline-stats">
                            <div class="inline-stat">
                                <span class="stat-label">人才总量</span>
                                <span class="stat-value" id="statTotalTalent">128,456</span>
                                <span class="stat-change positive" id="statTotalTalentChange">+12.5%</span>
                            </div>
                            <div class="inline-stat">
                                <span class="stat-label">综合指数</span>
                                <span class="stat-value" id="statCompositeIndex">92.5</span>
                                <span class="stat-change positive" id="statCompositeIndexChange">+8.3%</span>
                            </div>
                            <div class="inline-stat">
                                <span class="stat-label">科研产出</span>
                                <span class="stat-value" id="statResearchOutput">88.3</span>
                                <span class="stat-change positive" id="statResearchOutputChange">+5.2%</span>
                            </div>
                            <div class="inline-stat">
                                <span class="stat-label">产业贡献</span>
                                <span class="stat-value" id="statIndustryContribution">85.6</span>
                                <span class="stat-change negative" id="statIndustryContributionChange">-2.1%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 热力图详情弹窗 -->
            <div class="heatmap-detail-overlay" id="heatmapDetailOverlay" onclick="closeHeatmapDetail()">
                <div class="heatmap-detail-panel" onclick="event.stopPropagation()">
                    <div class="heatmap-detail-header">
                        <div class="heatmap-detail-title">
                            <span id="heatmapDetailRegionName">地区详情</span>
                            <span class="heatmap-detail-score" id="heatmapDetailScore">92.5</span>
                        </div>
                        <button class="heatmap-detail-close" onclick="closeHeatmapDetail()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="heatmap-detail-content">
                        <div class="heatmap-detail-item">
                            <div class="heatmap-detail-label">人才总量</div>
                            <div class="heatmap-detail-value" id="heatmapDetailTalentCount">15,432</div>
                            <div class="heatmap-detail-trend positive">
                                <i class="fas fa-arrow-up"></i> 同比增长 12.5%
                            </div>
                        </div>
                        <div class="heatmap-detail-item">
                            <div class="heatmap-detail-label">科研产出指数</div>
                            <div class="heatmap-detail-value" id="heatmapDetailResearchOutput">88.3</div>
                            <div class="heatmap-detail-trend positive">
                                <i class="fas fa-arrow-up"></i> 较上年 +5.2
                            </div>
                        </div>
                        <div class="heatmap-detail-item">
                            <div class="heatmap-detail-label">学术影响力</div>
                            <div class="heatmap-detail-value" id="heatmapDetailAcademicImpact">90.1</div>
                            <div class="heatmap-detail-trend positive">
                                <i class="fas fa-arrow-up"></i> 全国第2
                            </div>
                        </div>
                        <div class="heatmap-detail-item">
                            <div class="heatmap-detail-label">产业贡献度</div>
                            <div class="heatmap-detail-value" id="heatmapDetailIndustryContribution">85.6</div>
                            <div class="heatmap-detail-trend negative">
                                <i class="fas fa-arrow-down"></i> 较上年 -2.1
                            </div>
                        </div>
                        <div class="heatmap-detail-item ranking-detail-item">
                            <div class="heatmap-detail-label">全国排名</div>
                            <div class="heatmap-detail-value" id="heatmapDetailNationalRanking">-</div>
                            <div class="heatmap-detail-trend positive">
                                <i class="fas fa-trophy"></i> 按人才支持指数排序
                            </div>
                        </div>
                    </div>
                    <div class="heatmap-detail-section">
                        <div class="heatmap-detail-section-title">
                            <i class="fas fa-university"></i> 代表机构
                        </div>
                        <div class="heatmap-detail-list" id="heatmapDetailInstitutions">
                            <!-- 动态生成 -->
                        </div>
                    </div>
                    <div class="heatmap-detail-section">
                        <div class="heatmap-detail-section-title">
                            <i class="fas fa-chart-pie"></i> 重点产业方向
                        </div>
                        <div class="heatmap-detail-list" id="heatmapDetailIndustries">
                            <!-- 动态生成 -->
                        </div>
                    </div>
                    <div class="heatmap-detail-actions">
                        <button class="heatmap-detail-btn secondary" onclick="closeHeatmapDetail()">
                            <i class="fas fa-times"></i> 关闭
                        </button>
                        <button class="heatmap-detail-btn primary" onclick="drilldownFromDetail()">
                            <i class="fas fa-search-plus"></i> 下钻查看产业
                        </button>
                    </div>
                </div>
            </div>

            <!-- 下钻产业弹窗 -->
            <div class="drilldown-overlay" id="drilldownOverlay" onclick="closeDrilldown()">
                <div class="drilldown-panel" onclick="event.stopPropagation()">
                    <div class="heatmap-detail-header">
                        <div class="heatmap-detail-title">
                            <i class="fas fa-layer-group"></i>
                            <span id="drilldownRegionName">地区</span> - 产业细分
                        </div>
                        <button class="heatmap-detail-close" onclick="closeDrilldown()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <button class="drillback-btn" onclick="closeDrilldown()">
                        <i class="fas fa-arrow-left"></i> 返回地图视图
                    </button>
                    <div class="industry-grid" id="industryGrid">
                        <!-- 动态生成产业卡片 -->
                    </div>
                </div>
            </div>

            <!-- 报告生成与策略建议 -->
            <div class="report-section">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-lightbulb" style="margin-right: 8px; color: #1890ff;"></i>
                        分析报告与策略建议
                    </div>
                    <button class="btn btn-primary" onclick="showReportSettings()">
                        <i class="fas fa-plus"></i>生成报告
                    </button>
                </div>
                <div class="report-content">
                    <div class="report-summary">
                        <h4>数据摘要</h4>
                        <div class="index-report-field">
                            <label for="indexReportTitle">报告标题</label>
                            <input id="indexReportTitle" type="text" value="全国科技人才支撑能力分析报告" maxlength="60">
                        </div>
                        <div class="index-report-field">
                            <label>报告封面</label>
                            <div class="index-report-cover-options" id="indexReportCoverOptions">
                                <button type="button" class="index-report-cover active" data-cover="蓝色科技" onclick="selectIndexReportCover(this)">
                                    <span class="cover-preview cover-blue"></span><span>蓝色科技</span>
                                </button>
                                <button type="button" class="index-report-cover" data-cover="深海蓝" onclick="selectIndexReportCover(this)">
                                    <span class="cover-preview cover-navy"></span><span>深海蓝</span>
                                </button>
                                <button type="button" class="index-report-cover" data-cover="活力橙" onclick="selectIndexReportCover(this)">
                                    <span class="cover-preview cover-orange"></span><span>活力橙</span>
                                </button>
                                <button type="button" class="index-report-cover" data-cover="生态绿" onclick="selectIndexReportCover(this)">
                                    <span class="cover-preview cover-green"></span><span>生态绿</span>
                                </button>
                            </div>
                        </div>
                        <div class="index-report-field">
                            <label for="indexReportSummary">摘要描述</label>
                            <textarea id="indexReportSummary" rows="3">本分析基于2020-2024年人才发展数据，综合评估人才总量、科研产出、学术影响力、产业贡献度和流动活跃度五个维度，当前综合指数为92.5，较上年增长8.3%。</textarea>
                        </div>
                    </div>
                    <div class="report-suggestions">
                        <h4>策略建议</h4>
                        <ul class="suggestion-list">
                            <li class="suggestion-item">
                                <i class="fas fa-check-circle" style="color: #52c41a;"></i>
                                <strong>加大高端人才引进力度</strong>:建议针对科研产出和学术影响力薄弱环节,制定专项引才计划
                            </li>
                            <li class="suggestion-item">
                                <i class="fas fa-check-circle" style="color: #52c41a;"></i>
                                <strong>优化产业人才配置</strong>:根据产业贡献度指数,调整人才结构,提升产业转化效率
                            </li>
                            <li class="suggestion-item">
                                <i class="fas fa-exclamation-circle" style="color: #faad14;"></i>
                                <strong>提升人才流动活力</strong>:流动活跃度指数下降3.5%,建议优化人才流动政策和激励机制
                            </li>
                            <li class="suggestion-item">
                                <i class="fas fa-check-circle" style="color: #52c41a;"></i>
                                <strong>加强产学研合作</strong>:促进高校、研究院与企业深度合作,提升产业贡献度
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 人才检索模块 -->
        <div class="module-content" id="module-search">
            <div class="search-page-header">
                <div class="page-title" style="margin-bottom: 0;">
                    <i class="fas fa-search" style="color: #1890ff; margin-right: 8px;"></i>
                    人才检索
                </div>
                <button class="search-favorites-btn" type="button" onclick="showTalentFavorites()">
                    <i class="fas fa-bookmark"></i> 收藏夹
                </button>
            </div>

            <!-- 功能区1：搜索框与语义检索区 -->
            <div class="search-section">
                <div class="search-main">
                    <div class="search-input-box">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" class="search-input" placeholder="请输入专家姓名、研究方向、机构名称或以自然语言描述您的需求..." id="talentSearchInput">
                        <!-- 功能区9：智能提示与查询记录 -->
                        <div class="search-history-panel" id="searchHistoryPanel">
                            <div class="history-header">
                                <span>最近搜索</span>
                                <span style="color: #1890ff; cursor: pointer; font-size: 12px;" onclick="clearSearchHistory()">清除记录</span>
                            </div>
                            <div id="searchHistoryList">
                                <div class="history-item" data-history-index="0" onclick="useSearchHistory('人工智能')">
                                    <i class="fas fa-history"></i><span class="history-keyword">人工智能</span>
                                    <span class="history-actions">
                                        <button type="button" class="history-lock-btn" onclick="event.stopPropagation(); setSearchHistoryLock(0, true, this)" title="锁定"><i class="fas fa-lock"></i></button>
                                        <button type="button" class="history-lock-btn" onclick="event.stopPropagation(); setSearchHistoryLock(0, false, this)" title="解锁"><i class="fas fa-unlock"></i></button>
                                    </span>
                                </div>
                                <div class="history-item" data-history-index="1" onclick="useSearchHistory('清华大学')">
                                    <i class="fas fa-history"></i><span class="history-keyword">清华大学</span>
                                    <span class="history-actions">
                                        <button type="button" class="history-lock-btn" onclick="event.stopPropagation(); setSearchHistoryLock(1, true, this)" title="锁定"><i class="fas fa-lock"></i></button>
                                        <button type="button" class="history-lock-btn" onclick="event.stopPropagation(); setSearchHistoryLock(1, false, this)" title="解锁"><i class="fas fa-unlock"></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="search-btn" onclick="performTalentSearch()">
                        <i class="fas fa-search"></i> 搜索
                    </button>
                    <!-- 功能区2：高级筛选按钮 -->
                    <button class="btn btn-secondary" onclick="showAdvancedFilterModal()" style="white-space: nowrap;">
                        <i class="fas fa-sliders-h"></i> 高级筛选
                    </button>
                    <div class="semantic-switch active" onclick="toggleSemanticSearch()">
                        <div class="switch-box"></div>
                        <span>语义检索</span>
                    </div>
                </div>
            </div>

            <!-- 功能区10：可视化分析与统计概览 -->
            <!-- 功能区5：标签与关键词导航区 -->
            <div class="tags-section">
                <div class="tags-title">
                    <i class="fas fa-tags"></i>
                    热门研究领域
                </div>
                <div class="tags-container">
                    <span class="tag-item">人工智能</span>
                    <span class="tag-item">机器学习</span>
                    <span class="tag-item">深度学习</span>
                    <span class="tag-item">计算机视觉</span>
                    <span class="tag-item">自然语言处理</span>
                    <span class="tag-item">数据挖掘</span>
                    <span class="tag-item">知识图谱</span>
                    <span class="tag-item">强化学习</span>
                </div>
            </div>

            <!-- 主内容区域 -->
            <div class="main-layout">
                <!-- 左侧：结果列表区 -->
                <div class="experts-results">
                    <!-- 功能区6：结果视图与排序切换 -->
                    <div class="results-toolbar">
                        <div class="results-count">
                            找到 <span id="resultCount">24</span> 位相关专家
                        </div>
                        <div class="view-controls">
                            <div class="view-toggle">
                                <button class="view-btn active" onclick="switchTalentView('grid')" title="卡片视图">
                                    <i class="fas fa-th-large"></i>
                                </button>
                                <button class="view-btn" onclick="switchTalentView('list')" title="列表视图">
                                    <i class="fas fa-list"></i>
                                </button>
                                <button class="view-btn" onclick="switchTalentView('graph')" title="图谱视图">
                                    <i class="fas fa-project-diagram"></i>
                                </button>
                            </div>
                            <select class="sort-select" onchange="sortTalentResults()">
                                <option>按相关度排序</option>
                                <option>按影响力排序</option>
                                <option>按论文数排序</option>
                                <option>按引用量排序</option>
                            </select>
                            <button class="btn btn-secondary" onclick="toggleExportMenu()">
                                <i class="fas fa-download"></i> 导出
                            </button>
                        </div>
                    </div>

                    <!-- 功能区3：专家结果列表区 -->
                    <div class="results-container" id="talentResultsContainer">
                        <div class="experts-grid" id="talentGridContainer">
                            <!-- 专家卡片示例1 -->
                            <div class="expert-card" onclick="showTalentDetail(1)">
                                <div class="expert-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); toggleTalentFavorite(1)" title="收藏">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                    <button class="action-btn" onclick="event.stopPropagation(); addToTalentCompare(1)" title="对比">
                                        <i class="fas fa-balance-scale"></i>
                                    </button>
                                </div>
                                <div class="expert-header">
                                    <div class="expert-avatar">张</div>
                                    <div class="expert-info">
                                        <div class="expert-name">张伟</div>
                                        <div class="expert-title">教授 / 博士生导师</div>
                                        <div class="expert-institution">
                                            <i class="fas fa-university"></i> 清华大学
                                        </div>
                                    </div>
                                </div>
                                <div class="expert-research">
                                    <div class="research-label">研究方向</div>
                                    <div class="research-tags">
                                        <span class="research-tag">人工智能</span>
                                        <span class="research-tag">机器学习</span>
                                    </div>
                                </div>
                                <div class="expert-achievement">
                                    <div class="achievement-title">
                                        <i class="fas fa-trophy"></i> 代表成果
                                    </div>
                                    <div class="achievement-item">
                                        基于深度学习的图像识别算法研究
                                    </div>
                                </div>
                                <div class="expert-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">156</div>
                                        <div class="stat-label">论文数</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">8,924</div>
                                        <div class="stat-label">引用量</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">45</div>
                                        <div class="stat-label">H指数</div>
                                    </div>
                                </div>
                            </div>

                            <!-- 专家卡片示例2 -->
                            <div class="expert-card" onclick="showTalentDetail(2)">
                                <div class="expert-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); toggleTalentFavorite(2)" title="收藏">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                    <button class="action-btn" onclick="event.stopPropagation(); addToTalentCompare(2)">
                                        <i class="fas fa-balance-scale"></i>
                                    </button>
                                </div>
                                <div class="expert-header">
                                    <div class="expert-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">李</div>
                                    <div class="expert-info">
                                        <div class="expert-name">李娜</div>
                                        <div class="expert-title">研究员</div>
                                        <div class="expert-institution">
                                            <i class="fas fa-university"></i> 中国科学院
                                        </div>
                                    </div>
                                </div>
                                <div class="expert-research">
                                    <div class="research-label">研究方向</div>
                                    <div class="research-tags">
                                        <span class="research-tag">计算机视觉</span>
                                        <span class="research-tag">图像处理</span>
                                    </div>
                                </div>
                                <div class="expert-achievement">
                                    <div class="achievement-title">
                                        <i class="fas fa-trophy"></i> 代表成果
                                    </div>
                                    <div class="achievement-item">
                                        实时视频目标跟踪系统设计与实现
                                    </div>
                                </div>
                                <div class="expert-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">134</div>
                                        <div class="stat-label">论文数</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">7,652</div>
                                        <div class="stat-label">引用量</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">41</div>
                                        <div class="stat-label">H指数</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 功能区4：专家推荐与关联展示区 -->
                <div class="recommend-section">
                    <div class="recommend-header">
                        <div class="section-title">
                            <i class="fas fa-lightbulb" style="color: #fa8c16;"></i>
                            智能推荐
                        </div>
                    </div>
                    <div class="recommend-content">
                        <div class="recommend-card" onclick="showTalentDetail(5)">
                            <div class="recommend-header-content">
                                <div class="recommend-avatar">刘</div>
                                <div class="recommend-info">
                                    <div class="recommend-name">刘芳</div>
                                    <div class="recommend-institution">
                                        <i class="fas fa-university"></i> 清华大学
                                    </div>
                                </div>
                            </div>
                            <span class="recommend-tag high">
                                <i class="fas fa-fire"></i> 高相关
                            </span>
                            <div class="recommend-reason">
                                与当前搜索"人工智能"高度相关，研究方向与张伟教授相似。
                            </div>
                        </div>
                        <div class="recommend-card" onclick="showTalentDetail(6)">
                            <div class="recommend-header-content">
                                <div class="recommend-avatar" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">赵</div>
                                <div class="recommend-info">
                                    <div class="recommend-name">赵强</div>
                                    <div class="recommend-institution">
                                        <i class="fas fa-university"></i> 浙江大学
                                    </div>
                                </div>
                            </div>
                            <span class="recommend-tag potential">
                                <i class="fas fa-handshake"></i> 潜在合作
                            </span>
                            <div class="recommend-reason">
                                研究方向与当前搜索高度匹配，建议重点关注。
                            </div>
                        </div>
                    </div>
                    <button type="button" class="recommend-more-btn" id="recommendMoreBtn" onclick="loadMoreRecommendations()">
                        <i class="fas fa-plus-circle" style="margin-right: 6px;"></i>查看更多推荐
                    </button>
                </div>
            </div>
            <!-- 功能区10：当前结果统计图表 -->
            <div class="statistics-section" id="talentDistributionStatistics">
                <div class="section-header">
                    <div class="section-title">
                        <i class="fas fa-chart-pie"></i>
                        当前结果分布分析
                    </div>
                    <div class="statistics-tabs" role="tablist" aria-label="专家分布维度">
                        <button type="button" class="statistics-tab active" data-stat-dimension="institution" onclick="switchTalentDistribution('institution', this)">机构分布</button>
                        <button type="button" class="statistics-tab" data-stat-dimension="title" onclick="switchTalentDistribution('title', this)">职称分布</button>
                        <button type="button" class="statistics-tab" data-stat-dimension="research" onclick="switchTalentDistribution('research', this)">研究领域</button>
                    </div>
                </div>
                <div class="talent-distribution-chart" id="talentDistributionChart"></div>
                <div class="distribution-actions">
                    <button type="button" class="distribution-action-btn" onclick="exportTalentDistribution('report')"><i class="fas fa-file-alt"></i> 导出至报告</button>
                    <button type="button" class="distribution-action-btn" onclick="exportTalentDistribution('image')"><i class="fas fa-image"></i> 保存为图像</button>
                </div>
            </div>
            <div class="talent-favorites-overlay" id="talentFavoritesOverlay" onclick="if (event.target === this) closeTalentFavorites()">
                <div class="talent-favorites-modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3><i class="fas fa-bookmark" style="color: #1890ff;"></i> 我的收藏夹</h3>
                        <button type="button" class="modal-close" onclick="closeTalentFavorites()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="talent-favorites-body">
                        <div class="favorites-search-row">
                            <input type="search" id="favoriteExpertSearch" placeholder="搜索姓名、机构或研究方向" oninput="renderTalentFavorites()">
                            <button type="button" class="btn btn-primary" onclick="renderTalentFavorites()"><i class="fas fa-search"></i> 搜索</button>
                        </div>
                        <div id="favoriteExpertList"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 人才驾驶舱模块 -->
        <div class="module-content" id="module-cockpit" style="position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div class="page-title" style="margin-bottom: 0;">
                    <i class="fas fa-tachometer-alt" style="color: #1890ff; margin-right: 8px;"></i>
                    人才驾驶舱
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="showCockpitExportModal()" style="padding: 10px 20px; background: #fff; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; cursor: pointer; color: #666; display: flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onmouseover="this.style.borderColor='#1890ff'; this.style.color='#1890ff';" onmouseout="this.style.borderColor='#d9d9d9'; this.style.color='#666';">
                        <i class="fas fa-download" style="color: #1890ff;"></i> 导出
                    </button>
                    <button onclick="showCockpitShowcase()" style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 6px; font-size: 14px; cursor: pointer; color: #fff; display: flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102,126,234,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102,126,234,0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102,126,234,0.3)';">
                        <i class="fas fa-trophy"></i> 成果展示
                    </button>
                </div>
            </div>

            <div class="cockpit-container">
                <!-- 左侧筛选面板 -->
                <div class="cockpit-sidebar">
                    <div class="cockpit-filter-title">
                        <i class="fas fa-filter"></i>
                        产业/学科联动筛选
                    </div>

                    <div class="cockpit-filter-group">
                        <label class="cockpit-filter-label">产业领域</label>
                        <select class="cockpit-filter-select" id="cockpitIndustryFilter" onchange="applyCockpitFilter()">
                            <option value="all">全部产业</option>
                            <option value="ai">人工智能</option>
                            <option value="biotech">生物技术</option>
                            <option value="newenergy">新能源</option>
                            <option value="newmaterial">新材料</option>
                            <option value="integrated">集成电路</option>
                            <option value="aerospace">航空航天</option>
                        </select>
                    </div>

                    <div class="cockpit-filter-group">
                        <label class="cockpit-filter-label">学科方向</label>
                        <select class="cockpit-filter-select" id="cockpitDisciplineFilter" onchange="applyCockpitFilter()">
                            <option value="all">全部学科</option>
                            <option value="cs">计算机科学</option>
                            <option value="ee">电子工程</option>
                            <option value="math">数学</option>
                            <option value="physics">物理学</option>
                            <option value="biology">生物学</option>
                            <option value="chemistry">化学</option>
                        </select>
                    </div>

                    <div class="cockpit-filter-group">
                        <label class="cockpit-filter-label">机构类型</label>
                        <select class="cockpit-filter-select" id="cockpitInstitutionFilter" onchange="applyCockpitFilter()">
                            <option value="all">全部类型</option>
                            <option value="university">高等院校</option>
                            <option value="research">科研院所</option>
                            <option value="enterprise">企业研发</option>
                            <option value="government">政府机构</option>
                        </select>
                    </div>

                    <div class="cockpit-filter-group">
                        <label class="cockpit-filter-label">人才层级</label>
                        <div class="cockpit-filter-tags">
                            <span class="cockpit-filter-tag active" onclick="toggleCockpitTag(this)" data-value="top">顶尖人才</span>
                            <span class="cockpit-filter-tag" onclick="toggleCockpitTag(this)" data-value="senior">领军人才</span>
                            <span class="cockpit-filter-tag" onclick="toggleCockpitTag(this)" data-value="middle">骨干人才</span>
                            <span class="cockpit-filter-tag" onclick="toggleCockpitTag(this)" data-value="young">青年人才</span>
                        </div>
                    </div>

                    <div class="cockpit-filter-group">
                        <label class="cockpit-filter-label">时间范围</label>
                        <select class="cockpit-filter-select" id="cockpitTimeFilter" onchange="applyCockpitFilter()">
                            <option value="year">近一年</option>
                            <option value="three">近三年</option>
                            <option value="five" selected>近五年</option>
                            <option value="ten">近十年</option>
                        </select>
                    </div>

                    <div class="cockpit-filter-actions">
                        <button class="cockpit-filter-btn" onclick="resetCockpitFilters()">
                            <i class="fas fa-redo"></i> 重置
                        </button>
                        <button class="cockpit-filter-btn primary" onclick="applyCockpitFilter()">
                            <i class="fas fa-check"></i> 应用
                        </button>
                    </div>
                </div>

                <!-- 主内容区 -->
                <div class="cockpit-main">
                    <!-- 统计卡片 -->
                    <div class="cockpit-stats">
                        <div class="cockpit-stat-card" onclick="showStatDetail('total')">
                            <div class="cockpit-stat-icon blue">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="cockpit-stat-content">
                                <div class="cockpit-stat-value" id="cockpitTotalTalent">12,456</div>
                                <div class="cockpit-stat-label">人才总量</div>
                                <div class="cockpit-stat-trend">
                                    <i class="fas fa-arrow-up"></i> 12.5% 同比增长
                                </div>
                            </div>
                        </div>

                        <div class="cockpit-stat-card" onclick="showStatDetail('inflow')">
                            <div class="cockpit-stat-icon green">
                                <i class="fas fa-sign-in-alt"></i>
                            </div>
                            <div class="cockpit-stat-content">
                                <div class="cockpit-stat-value" id="cockpitInflow">1,892</div>
                                <div class="cockpit-stat-label">流入人才</div>
                                <div class="cockpit-stat-trend">
                                    <i class="fas fa-arrow-up"></i> 8.3% 同比增长
                                </div>
                            </div>
                        </div>

                        <div class="cockpit-stat-card" onclick="showStatDetail('outflow')">
                            <div class="cockpit-stat-icon orange">
                                <i class="fas fa-sign-out-alt"></i>
                            </div>
                            <div class="cockpit-stat-content">
                                <div class="cockpit-stat-value" id="cockpitOutflow">756</div>
                                <div class="cockpit-stat-label">流出人才</div>
                                <div class="cockpit-stat-trend down">
                                    <i class="fas fa-arrow-down"></i> 5.2% 同比下降
                                </div>
                            </div>
                        </div>

                        <div class="cockpit-stat-card" onclick="showStatDetail('institution')">
                            <div class="cockpit-stat-icon purple">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="cockpit-stat-content">
                                <div class="cockpit-stat-value" id="cockpitInstitution">287</div>
                                <div class="cockpit-stat-label">合作机构</div>
                                <div class="cockpit-stat-trend">
                                    <i class="fas fa-arrow-up"></i> 15.8% 同比增长
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 可视化区域 -->
                    <div class="cockpit-charts">
                        <!-- 热力图和流向图 -->
                        <div class="cockpit-chart-box">
                            <div class="cockpit-chart-header">
                                <div class="cockpit-chart-title">
                                    <i class="fas fa-map-marked-alt"></i>
                                    人才分布热力图
                                </div>
                                <div class="cockpit-chart-tools">
                                    <button class="cockpit-tool-btn active" onclick="switchHeatmapView('all', this)">
                                        全部
                                    </button>
                                    <button class="cockpit-tool-btn" onclick="switchHeatmapView('industry', this)">
                                        按产业
                                    </button>
                                    <button class="cockpit-tool-btn" onclick="switchHeatmapView('discipline', this)">
                                        按学科
                                    </button>
                                    <button class="cockpit-tool-btn" onclick="switchHeatmapView('institution', this)">
                                        按机构
                                    </button>
                                    <button class="cockpit-tool-btn diff-report-btn" id="heatmapDifferenceReportBtn" type="button" disabled onclick="downloadHeatmapDifferenceReport()">
                                        <i class="fas fa-file-download"></i> 下载差异分析报告
                                    </button>
                                </div>
                            </div>
                            <div class="cockpit-heatmap" id="cockpitHeatmap">
                                <!-- 热力图区域将由JS生成 -->
                                <div class="heatmap-region" style="left: 15%; top: 10%; width: 18%; height: 15%; background: rgba(255, 77, 79, 0.85);" onclick="showRegionDetail('北京', 2847, this)" data-region="beijing">北京 2,847</div>
                                <div class="heatmap-region" style="left: 65%; top: 30%; width: 18%; height: 15%; background: rgba(255, 77, 79, 0.75);" onclick="showRegionDetail('上海', 2156, this)" data-region="shanghai">上海 2,156</div>
                                <div class="heatmap-region" style="left: 18%; top: 55%; width: 16%; height: 14%; background: rgba(250, 173, 20, 0.8);" onclick="showRegionDetail('广东', 1893, this)" data-region="guangdong">广东 1,893</div>
                                <div class="heatmap-region" style="left: 10%; top: 35%; width: 14%; height: 12%; background: rgba(250, 173, 20, 0.7);" onclick="showRegionDetail('四川', 1456, this)" data-region="sichuan">四川 1,456</div>
                                <div class="heatmap-region" style="left: 42%; top: 15%; width: 15%; height: 13%; background: rgba(250, 173, 20, 0.65);" onclick="showRegionDetail('江苏', 1234, this)" data-region="jiangsu">江苏 1,234</div>
                                <div class="heatmap-region" style="left: 38%; top: 38%; width: 14%; height: 12%; background: rgba(82, 196, 26, 0.8);" onclick="showRegionDetail('湖北', 1089, this)" data-region="hubei">湖北 1,089</div>
                                <div class="heatmap-region" style="left: 55%; top: 55%; width: 13%; height: 11%; background: rgba(82, 196, 26, 0.7);" onclick="showRegionDetail('浙江', 967, this)" data-region="zhejiang">浙江 967</div>
                                <div class="heatmap-region" style="left: 20%; top: 72%; width: 12%; height: 10%; background: rgba(82, 196, 26, 0.6);" onclick="showRegionDetail('陕西', 814, this)" data-region="shaanxi">陕西 814</div>
                                
                                <!-- 图例 -->
                                <div class="heatmap-legend">
                                    <div class="heatmap-legend-title">人才密度</div>
                                    <div class="heatmap-legend-bar">
                                        <div class="heatmap-legend-gradient"></div>
                                    </div>
                                    <div class="heatmap-legend-labels">
                                        <span>低</span>
                                        <span>中</span>
                                        <span>高</span>
                                    </div>
                                </div>

                                <!-- 区域详情弹窗 -->
                                <div class="heatmap-detail-popup" id="heatmapDetailPopup">
                                    <div class="heatmap-detail-header" id="heatmapDetailTitle">北京市</div>
                                    <div class="heatmap-detail-item">
                                        <span class="heatmap-detail-label">人才总量</span>
                                        <span class="heatmap-detail-value" id="heatmapDetailCount">2,847人</span>
                                    </div>
                                    <div class="heatmap-detail-item">
                                        <span class="heatmap-detail-label">主要机构</span>
                                        <span class="heatmap-detail-value" id="heatmapDetailInstitution">清华大学、北京大学</span>
                                    </div>
                                    <div class="heatmap-detail-item">
                                        <span class="heatmap-detail-label">重点领域</span>
                                        <span class="heatmap-detail-value" id="heatmapDetailField">人工智能、集成电路</span>
                                    </div>
                                    <div class="heatmap-detail-item">
                                        <span class="heatmap-detail-label">流入人数</span>
                                        <span class="heatmap-detail-value" id="heatmapDetailInflow">+156人</span>
                                    </div>
                                    <div class="heatmap-detail-item">
                                        <span class="heatmap-detail-label">流出人数</span>
                                        <span class="heatmap-detail-value" id="heatmapDetailOutflow">-89人</span>
                                    </div>
                                    <button class="heatmap-detail-btn" onclick="viewRegionAnalysis()">
                                        <i class="fas fa-chart-line"></i> 查看详细分析
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 雷达图 -->
                        <div class="cockpit-chart-box cockpit-radar-box">
                            <div class="cockpit-chart-header">
                                <div class="cockpit-chart-title">
                                    <i class="fas fa-chart-pie"></i>
                                    趋势雷达图
                                </div>
                            </div>
                            <div class="cockpit-radar" id="cockpitRadar">
                                <svg width="100%" height="100%" viewBox="0 0 400 360" id="radarChartSvg" preserveAspectRatio="xMidYMid meet">
                                    <!-- 雷达图背景网格 -->
                                    <polygon points="200,40 340,120 340,240 200,320 60,240 60,120" fill="none" stroke="#e8e8e8" stroke-width="1"/>
                                    <polygon points="200,70 310,130 310,230 200,290 90,230 90,130" fill="none" stroke="#e8e8e8" stroke-width="1"/>
                                    <polygon points="200,100 280,140 280,220 200,260 120,220 120,140" fill="none" stroke="#e8e8e8" stroke-width="1"/>
                                    <polygon points="200,130 250,150 250,210 200,230 150,210 150,150" fill="none" stroke="#e8e8e8" stroke-width="1"/>
                                    
                                    <!-- 雷达图轴线 -->
                                    <line x1="200" y1="160" x2="200" y2="40" stroke="#d9d9d9" stroke-width="1"/>
                                    <line x1="200" y1="160" x2="340" y2="120" stroke="#d9d9d9" stroke-width="1"/>
                                    <line x1="200" y1="160" x2="340" y2="240" stroke="#d9d9d9" stroke-width="1"/>
                                    <line x1="200" y1="160" x2="200" y2="320" stroke="#d9d9d9" stroke-width="1"/>
                                    <line x1="200" y1="160" x2="60" y2="240" stroke="#d9d9d9" stroke-width="1"/>
                                    <line x1="200" y1="160" x2="60" y2="120" stroke="#d9d9d9" stroke-width="1"/>
                                    
                                    <!-- 雷达图数据区域 -->
                                    <polygon id="radarDataPolygon" points="200,60 320,125 310,235 200,280 85,230 80,130" fill="rgba(24, 144, 255, 0.2)" stroke="#1890ff" stroke-width="2"/>
                                    
                                    <!-- 雷达图数据点 -->
                                    <circle cx="200" cy="60" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('talent')" onmouseover="showRadarTooltip('talent', 85, this)" onmouseout="hideRadarTooltip()"/>
                                    <circle cx="320" cy="125" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('output')" onmouseover="showRadarTooltip('output', 78, this)" onmouseout="hideRadarTooltip()"/>
                                    <circle cx="310" cy="235" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('influence')" onmouseover="showRadarTooltip('influence', 72, this)" onmouseout="hideRadarTooltip()"/>
                                    <circle cx="200" cy="280" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('project')" onmouseover="showRadarTooltip('project', 88, this)" onmouseout="hideRadarTooltip()"/>
                                    <circle cx="85" cy="230" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('stability')" onmouseover="showRadarTooltip('stability', 65, this)" onmouseout="hideRadarTooltip()"/>
                                    <circle cx="80" cy="130" r="6" fill="#1890ff" stroke="#fff" stroke-width="2" class="radar-point" onclick="showRadarDetail('mobility')" onmouseover="showRadarTooltip('mobility', 58, this)" onmouseout="hideRadarTooltip()"/>
                                    
                                    <!-- 雷达图标签 -->
                                    <text x="200" y="20" text-anchor="middle" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('talent')" style="cursor:pointer;">人才增速</text>
                                    <text x="355" y="125" text-anchor="start" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('output')" style="cursor:pointer;">科研产出</text>
                                    <text x="355" y="245" text-anchor="start" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('influence')" style="cursor:pointer;">学术影响</text>
                                    <text x="200" y="348" text-anchor="middle" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('project')" style="cursor:pointer;">项目参与</text>
                                    <text x="45" y="245" text-anchor="end" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('stability')" style="cursor:pointer;">流动稳定</text>
                                    <text x="45" y="125" text-anchor="end" fill="#666" font-size="13" class="radar-axis-label" onclick="showRadarDetail('mobility')" style="cursor:pointer;">合作活跃</text>
                                </svg>
                                
                                <!-- 雷达图提示框 -->
                                <div class="radar-tooltip" id="radarTooltip">
                                    <div class="radar-tooltip-title" id="radarTooltipTitle">人才增速</div>
                                    <div class="radar-tooltip-row">
                                        <span>当前值</span>
                                        <span id="radarTooltipValue">85分</span>
                                    </div>
                                    <div class="radar-tooltip-row">
                                        <span>同比</span>
                                        <span id="radarTooltipTrend" style="color: #52c41a;">↑ 12.5%</span>
                                    </div>
                                    <div class="radar-tooltip-row">
                                        <span>全国排名</span>
                                        <span id="radarTooltipRank">第3位</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 趋势雷达图指标详情 -->
                    <div class="cockpit-radar-detail-overlay" id="cockpitRadarDetailOverlay" onclick="closeCockpitRadarDetail()">
                        <div class="cockpit-radar-detail-card" onclick="event.stopPropagation()">
                            <div class="cockpit-radar-detail-header">
                                <div class="cockpit-radar-detail-title"><i class="fas fa-chart-line" style="color:#1890ff;margin-right:8px"></i><span id="cockpitRadarDetailTitle">人才增速</span>指标分析</div>
                                <button class="cockpit-radar-detail-close" type="button" onclick="closeCockpitRadarDetail()"><i class="fas fa-times"></i></button>
                            </div>
                            <div class="cockpit-radar-detail-metrics">
                                <div class="cockpit-radar-detail-metric"><span>当前得分</span><strong id="cockpitRadarDetailValue">85分</strong></div>
                                <div class="cockpit-radar-detail-metric"><span>同比变化</span><strong id="cockpitRadarDetailTrend">↑ 12.5%</strong></div>
                                <div class="cockpit-radar-detail-metric"><span>全国排名</span><strong id="cockpitRadarDetailRank">第3位</strong></div>
                            </div>
                            <div class="cockpit-radar-detail-section-title">时间序列变化</div>
                            <div class="cockpit-radar-trend-chart" id="cockpitRadarTrendChart"></div>
                            <div class="cockpit-radar-detail-section-title">对比分析</div>
                            <table class="cockpit-radar-compare-table">
                                <thead><tr><th>年度</th><th>本区域</th><th>全国基准</th><th>差值</th></tr></thead>
                                <tbody id="cockpitRadarCompareBody"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 人才流向图 -->
                    <div class="cockpit-chart-box">
                        <div class="cockpit-chart-header">
                            <div class="cockpit-chart-title">
                                <i class="fas fa-random"></i>
                                人才流向图
                            </div>
                            <div class="cockpit-chart-tools">
                                <button class="cockpit-tool-btn" onclick="toggleFlowDirection('in')">
                                    <i class="fas fa-sign-in-alt"></i> 流入
                                </button>
                                <button class="cockpit-tool-btn" onclick="toggleFlowDirection('out')">
                                    <i class="fas fa-sign-out-alt"></i> 流出
                                </button>
                                <button class="cockpit-tool-btn active" onclick="toggleFlowDirection('all')">
                                    <i class="fas fa-exchange-alt"></i> 全部
                                </button>
                            </div>
                        </div>
                        <div class="cockpit-flow" id="cockpitFlow">
                            <!-- 流向节点 -->
                            <div class="flow-node" style="left: 15%; top: 20%;" onclick="showFlowNodeDetail('北京', 1892, 'in')" data-city="beijing">
                                <div class="flow-node-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="flow-node-label">北京</div>
                                <div class="flow-node-count">+1,892</div>
                            </div>
                            
                            <div class="flow-node" style="left: 65%; top: 15%;" onclick="showFlowNodeDetail('上海', 1456, 'in')" data-city="shanghai">
                                <div class="flow-node-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="flow-node-label">上海</div>
                                <div class="flow-node-count">+1,456</div>
                            </div>
                            
                            <div class="flow-node" style="left: 40%; top: 50%;" onclick="showFlowNodeDetail('广东', 1234, 'in')" data-city="guangdong">
                                <div class="flow-node-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="flow-node-label">广东</div>
                                <div class="flow-node-count">+1,234</div>
                            </div>
                            
                            <div class="flow-node" style="left: 75%; top: 55%;" onclick="showFlowNodeDetail('浙江', 876, 'in')" data-city="zhejiang">
                                <div class="flow-node-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="flow-node-label">浙江</div>
                                <div class="flow-node-count">+876</div>
                            </div>
                            
                            <div class="flow-node" style="left: 25%; top: 70%;" onclick="showFlowNodeDetail('四川', 654, 'in')" data-city="sichuan">
                                <div class="flow-node-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="flow-node-label">四川</div>
                                <div class="flow-node-count">+654</div>
                            </div>

                            <!-- 流向线条 (SVG) -->
                            <svg class="flow-lines-layer" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none;">
                                <!-- 北京 -> 上海 -->
                                <line x1="23%" y1="30%" x2="65%" y2="25%" stroke="rgba(24, 144, 255, 0.6)" stroke-width="3" stroke-dasharray="5,5" class="flow-line-svg flow-interactive" onclick="showFlowLineDetail('beijing-shanghai')">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                                </line>
                                <!-- 上海 -> 广东 -->
                                <line x1="73%" y1="35%" x2="50%" y2="60%" stroke="rgba(82, 196, 26, 0.6)" stroke-width="2" stroke-dasharray="5,5" class="flow-interactive" onclick="showFlowLineDetail('shanghai-guangdong')">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite"/>
                                </line>
                                <!-- 北京 -> 广东 -->
                                <line x1="23%" y1="35%" x2="45%" y2="55%" stroke="rgba(24, 144, 255, 0.6)" stroke-width="2" stroke-dasharray="5,5" class="flow-interactive" onclick="showFlowLineDetail('beijing-guangdong')">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite"/>
                                </line>
                                <!-- 广东 -> 浙江 -->
                                <line x1="55%" y1="60%" x2="75%" y2="60%" stroke="rgba(250, 173, 20, 0.6)" stroke-width="2" stroke-dasharray="5,5" class="flow-interactive" onclick="showFlowLineDetail('guangdong-zhejiang')">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.3s" repeatCount="indefinite"/>
                                </line>
                            </svg>

                            <!-- 时间轴控制器 -->
                            <div class="flow-timeline">
                                <div class="timeline-controls">
                                    <button class="timeline-btn" onclick="timelinePlay()" title="播放">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="timeline-btn" onclick="timelinePause()" title="暂停">
                                        <i class="fas fa-pause"></i>
                                    </button>
                                    <button class="timeline-btn" onclick="timelineReset()" title="重置">
                                        <i class="fas fa-redo"></i>
                                    </button>
                                </div>
                                <div style="flex: 1; position: relative;">
                                    <div class="timeline-slider" onclick="timelineSeek(event)">
                                        <div class="timeline-progress" id="timelineProgress"></div>
                                    </div>
                                    <div class="timeline-labels">
                                        <span>2020</span>
                                        <span>2021</span>
                                        <span>2022</span>
                                        <span>2023</span>
                                        <span>2024</span>
                                    </div>
                                </div>
                                <div class="timeline-current" id="timelineCurrent">2024年</div>
                            </div>

                            <!-- 流向详情卡片 -->
                            <div class="flow-detail-card" id="flowDetailCard">
                                <div class="flow-detail-header">
                                    <div class="flow-detail-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="flow-detail-title" id="flowDetailTitle">北京市</div>
                                </div>
                                <div class="flow-detail-row">
                                    <span class="flow-detail-label" id="flowDetailCountLabel">流入人数</span>
                                    <span class="flow-detail-value highlight" id="flowDetailInflow">+1,892人</span>
                                </div>
                                <div class="flow-detail-row">
                                    <span class="flow-detail-label" id="flowDetailOutflowLabel">流出人数</span>
                                    <span class="flow-detail-value" id="flowDetailOutflow">-756人</span>
                                </div>
                                <div class="flow-detail-row">
                                    <span class="flow-detail-label" id="flowDetailNetLabel">净流入</span>
                                    <span class="flow-detail-value highlight" id="flowDetailNet">+1,136人</span>
                                </div>
                                <div class="flow-detail-row">
                                    <span class="flow-detail-label" id="flowDetailSourceLabel">主要来源</span>
                                    <span class="flow-detail-value" id="flowDetailSource">计算机科学、人工智能</span>
                                </div>
                                <div class="flow-detail-row">
                                    <span class="flow-detail-label" id="flowDetailReasonLabel">流动原因</span>
                                    <span class="flow-detail-value" id="flowDetailReason">科研机会、薪资待遇</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- 框选对比弹窗 -->
            <div class="compare-modal" id="compareModal">
                <div class="compare-modal-content">
                    <div class="compare-modal-header">
                        <div class="compare-modal-title">
                            <i class="fas fa-balance-scale" style="color: #1890ff; margin-right: 8px;"></i>
                            跨区域人才分布对比分析
                        </div>
                        <button class="compare-modal-close" onclick="closeCompareModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="compare-modal-body">
                        <table class="compare-table">
                            <thead>
                                <tr>
                                    <th>指标</th>
                                    <th>北京</th>
                                    <th>上海</th>
                                    <th>广东</th>
                                    <th>差异分析</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>人才总量</td>
                                    <td>2,847人</td>
                                    <td>2,156人</td>
                                    <td>1,893人</td>
                                    <td style="color: #52c41a;">北京领先32%</td>
                                </tr>
                                <tr>
                                    <td>顶尖人才</td>
                                    <td>456人</td>
                                    <td>312人</td>
                                    <td>278人</td>
                                    <td style="color: #52c41a;">北京领先46%</td>
                                </tr>
                                <tr>
                                    <td>科研机构</td>
                                    <td>89家</td>
                                    <td>67家</td>
                                    <td>54家</td>
                                    <td style="color: #52c41a;">北京领先33%</td>
                                </tr>
                                <tr>
                                    <td>年增长率</td>
                                    <td>12.5%</td>
                                    <td>10.8%</td>
                                    <td>15.2%</td>
                                    <td style="color: #faad14;">广东增速最快</td>
                                </tr>
                                <tr>
                                    <td>人才密度</td>
                                    <td>高</td>
                                    <td>高</td>
                                    <td>中</td>
                                    <td style="color: #1890ff;">北京上海集聚度高</td>
                                </tr>
                                <tr>
                                    <td>主要领域</td>
                                    <td>AI、集成电路</td>
                                    <td>生物医药、金融</td>
                                    <td>智能制造、新能源</td>
                                    <td style="color: #666;">领域差异明显</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="compare-modal-footer">
                        <button class="compare-btn secondary" onclick="closeCompareModal()">
                            关闭
                        </button>
                        <button class="compare-btn primary" onclick="exportCompareReport()">
                            <i class="fas fa-download"></i> 导出对比报告
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 人才库订阅模块 -->
        <div class="module-content" id="module-subscription">
            <div class="page-title" style="margin-bottom: 20px;">
                <i class="fas fa-bell" style="color: #1890ff; margin-right: 8px;"></i>
                人才库订阅
            </div>

            <div class="subscription-container">
                <div style="width: 100%;">
                    <!-- 搜索与筛选区 -->
                    <div class="subscription-search">
                        <div class="subscription-search-header">
                            <div class="subscription-search-input-box">
                                <i class="fas fa-search subscription-search-icon"></i>
                                <input type="text" class="subscription-search-input" placeholder="输入关键词搜索人才、机构、研究领域..." id="subscriptionSearchInput" oninput="handleSubscriptionSearch(this.value)">
                            </div>
                            <button class="subscription-filter-toggle" onclick="toggleAdvancedFilter()">
                                <i class="fas fa-sliders-h"></i> 高级筛选
                            </button>
                        </div>

                        <!-- 高级筛选面板 -->
                        <div class="subscription-advanced-filter" id="subscriptionAdvancedFilter">
                            <div class="subscription-filter-grid">
                                <div class="subscription-filter-item">
                                    <label class="subscription-filter-label">奖项类型</label>
                                    <select class="subscription-filter-select" id="filterAwardType">
                                        <option value="all">全部奖项</option>
                                        <option value="academician">院士</option>
                                        <option value="ieee_fellow">IEEE Fellow</option>
                                        <option value="acm_fellow">ACM Fellow</option>
                                        <option value="nsfc">国家杰青</option>
                                        <option value="changjiang">长江学者</option>
                                        <option value="qianren">千人计划</option>
                                    </select>
                                </div>
                                <div class="subscription-filter-item">
                                    <label class="subscription-filter-label">所属机构</label>
                                    <select class="subscription-filter-select" id="filterInstitution">
                                        <option value="all">全部机构</option>
                                        <option value="tsinghua">清华大学</option>
                                        <option value="pku">北京大学</option>
                                        <option value="cas">中科院</option>
                                        <option value="mit">MIT</option>
                                        <option value="stanford">Stanford</option>
                                    </select>
                                </div>
                                <div class="subscription-filter-item">
                                    <label class="subscription-filter-label">研究领域</label>
                                    <select class="subscription-filter-select" id="filterField">
                                        <option value="all">全部领域</option>
                                        <option value="ai">人工智能</option>
                                        <option value="biotech">生物技术</option>
                                        <option value="quantum">量子计算</option>
                                        <option value="newenergy">新能源</option>
                                        <option value="material">新材料</option>
                                    </select>
                                </div>
                                <div class="subscription-filter-item">
                                    <label class="subscription-filter-label">国家/地区</label>
                                    <select class="subscription-filter-select" id="filterCountry">
                                        <option value="all">全部地区</option>
                                        <option value="china">中国</option>
                                        <option value="usa">美国</option>
                                        <option value="uk">英国</option>
                                        <option value="germany">德国</option>
                                        <option value="japan">日本</option>
                                    </select>
                                </div>
                            </div>
                            <div class="subscription-filter-actions">
                                <button class="subscription-filter-btn secondary" onclick="saveFilterConditions()">
                                    <i class="fas fa-bookmark"></i> 保存条件
                                </button>
                                <button class="subscription-filter-btn secondary" onclick="resetSubscriptionFilters()">
                                    <i class="fas fa-redo"></i> 重置
                                </button>
                                <button class="subscription-filter-btn primary" onclick="applySubscriptionFilters()">
                                    <i class="fas fa-check"></i> 应用筛选
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 主内容布局 -->
                    <div class="subscription-main">
                        <!-- 左侧：专家列表区（页面打开即加载10位专家） -->
                        <aside class="subscription-expert-panel">
                            <div class="subscription-expert-panel-header">
                                <div class="subscription-expert-panel-title">
                                    <i class="fas fa-user-friends"></i>
                                    专家列表
                                </div>
                                <span class="subscription-expert-count" id="subscriptionExpertCount">10位专家</span>
                            </div>
                            <div class="subscription-expert-panel-tip">
                                输入关键词可实时匹配姓名、机构或研究领域
                            </div>
                            <div class="subscription-expert-list" id="subscriptionExpertList"></div>
                        </aside>

                        <!-- 左侧：订阅管理面板 -->
                        <div class="subscription-manage">
                            <div class="subscription-manage-header">
                                <div class="subscription-manage-title">
                                    <i class="fas fa-list-alt"></i>
                                    订阅管理
                                </div>
                                <button class="subscription-add-btn" onclick="showAddSubscriptionModal()">
                                    <i class="fas fa-plus"></i> 新增订阅
                                </button>
                            </div>
                            <div class="subscription-list">
                                <!-- 订阅项1 -->
                                <div class="subscription-item">
                                    <div class="subscription-item-header">
                                        <div class="subscription-item-name">人工智能领域顶尖专家</div>
                                        <span class="subscription-item-status active">订阅中</span>
                                    </div>
                                    <div class="subscription-item-meta">
                                        <span><i class="fas fa-globe"></i> 全球范围</span>
                                        <span><i class="fas fa-bell"></i> 实时推送</span>
                                        <span><i class="fas fa-users"></i> 已订阅 128 人</span>
                                    </div>
                                    <div class="subscription-item-tags">
                                        <span class="subscription-tag">人工智能</span>
                                        <span class="subscription-tag">深度学习</span>
                                        <span class="subscription-tag">IEEE Fellow</span>
                                    </div>
                                    <div class="subscription-item-actions">
                                        <button class="subscription-item-btn" onclick="editSubscription(1)">
                                            <i class="fas fa-edit"></i> 编辑
                                        </button>
                                        <button class="subscription-item-btn" onclick="pauseSubscription(1)">
                                            <i class="fas fa-pause"></i> 暂停
                                        </button>
                                        <button class="subscription-item-btn danger" onclick="deleteSubscription(1)">
                                            <i class="fas fa-trash"></i> 删除
                                        </button>
                                    </div>
                                </div>

                                <!-- 订阅项2 -->
                                <div class="subscription-item">
                                    <div class="subscription-item-header">
                                        <div class="subscription-item-name">量子计算研究团队</div>
                                        <span class="subscription-item-status active">订阅中</span>
                                    </div>
                                    <div class="subscription-item-meta">
                                        <span><i class="fas fa-globe"></i> 中国</span>
                                        <span><i class="fas fa-bell"></i> 每日推送</span>
                                        <span><i class="fas fa-users"></i> 已订阅 56 人</span>
                                    </div>
                                    <div class="subscription-item-tags">
                                        <span class="subscription-tag">量子计算</span>
                                        <span class="subscription-tag">中科院</span>
                                        <span class="subscription-tag">院士</span>
                                    </div>
                                    <div class="subscription-item-actions">
                                        <button class="subscription-item-btn" onclick="editSubscription(2)">
                                            <i class="fas fa-edit"></i> 编辑
                                        </button>
                                        <button class="subscription-item-btn" onclick="pauseSubscription(2)">
                                            <i class="fas fa-pause"></i> 暂停
                                        </button>
                                        <button class="subscription-item-btn danger" onclick="deleteSubscription(2)">
                                            <i class="fas fa-trash"></i> 删除
                                        </button>
                                    </div>
                                </div>

                                <!-- 订阅项3 -->
                                <div class="subscription-item">
                                    <div class="subscription-item-header">
                                        <div class="subscription-item-name">生物技术领军人才</div>
                                        <span class="subscription-item-status paused">已暂停</span>
                                    </div>
                                    <div class="subscription-item-meta">
                                        <span><i class="fas fa-globe"></i> 美国</span>
                                        <span><i class="fas fa-bell"></i> 每周推送</span>
                                        <span><i class="fas fa-users"></i> 已订阅 89 人</span>
                                    </div>
                                    <div class="subscription-item-tags">
                                        <span class="subscription-tag">生物技术</span>
                                        <span class="subscription-tag">基因编辑</span>
                                        <span class="subscription-tag">ACM Fellow</span>
                                    </div>
                                    <div class="subscription-item-actions">
                                        <button class="subscription-item-btn" onclick="editSubscription(3)">
                                            <i class="fas fa-edit"></i> 编辑
                                        </button>
                                        <button class="subscription-item-btn" onclick="resumeSubscription(3)">
                                            <i class="fas fa-play"></i> 恢复
                                        </button>
                                        <button class="subscription-item-btn danger" onclick="deleteSubscription(3)">
                                            <i class="fas fa-trash"></i> 删除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧面板 -->
                        <div class="subscription-sidebar">
                            <!-- 人才动态推送卡片 -->
                            <div class="subscription-dynamics">
                                <div class="subscription-dynamics-header">
                                    <div class="subscription-dynamics-title">
                                        <i class="fas fa-rss"></i>
                                        人才动态
                                    </div>
                                    <span class="subscription-dynamics-badge">5条新消息</span>
                                </div>
                                <div class="subscription-dynamics-list">
                                    <!-- 动态卡片1 -->
                                    <div class="dynamic-card unread" onclick="viewDynamicDetail(1)">
                                        <div class="dynamic-card-header">
                                            <span class="dynamic-card-type paper">
                                                <i class="fas fa-file-alt"></i> 论文发表
                                            </span>
                                            <span class="dynamic-card-time">2小时前</span>
                                        </div>
                                        <div class="dynamic-card-title">张伟教授团队发表Nature封面论文</div>
                                        <div class="dynamic-card-content">在人工智能可解释性研究方向取得重大突破，提出新型神经网络架构...</div>
                                        <div class="dynamic-card-footer">
                                            <div class="dynamic-card-expert">
                                                <div class="dynamic-card-avatar">张</div>
                                                <span class="dynamic-card-name">张伟</span>
                                            </div>
                                            <div class="dynamic-card-actions">
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); followExpert('张伟', this)">
                                                    <i class="fas fa-heart"></i> 关注
                                                </button>
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); markAsRead(1)">
                                                    <i class="fas fa-check"></i> 已读
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 动态卡片2 -->
                                    <div class="dynamic-card unread" onclick="viewDynamicDetail(2)">
                                        <div class="dynamic-card-header">
                                            <span class="dynamic-card-type award">
                                                <i class="fas fa-trophy"></i> 获奖消息
                                            </span>
                                            <span class="dynamic-card-time">5小时前</span>
                                        </div>
                                        <div class="dynamic-card-title">李娜教授当选2024年IEEE Fellow</div>
                                        <div class="dynamic-card-content">因在计算机视觉领域的杰出贡献，成功当选IEEE Fellow...</div>
                                        <div class="dynamic-card-footer">
                                            <div class="dynamic-card-expert">
                                                <div class="dynamic-card-avatar" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">李</div>
                                                <span class="dynamic-card-name">李娜</span>
                                            </div>
                                            <div class="dynamic-card-actions">
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); followExpert('李娜', this)">
                                                    <i class="fas fa-heart"></i> 关注
                                                </button>
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); markAsRead(2)">
                                                    <i class="fas fa-check"></i> 已读
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 动态卡片3 -->
                                    <div class="dynamic-card" onclick="viewDynamicDetail(3)">
                                        <div class="dynamic-card-header">
                                            <span class="dynamic-card-type cooperation">
                                                <i class="fas fa-handshake"></i> 国际合作
                                            </span>
                                            <span class="dynamic-card-time">1天前</span>
                                        </div>
                                        <div class="dynamic-card-title">王强教授与MIT达成联合研究项目</div>
                                        <div class="dynamic-card-content">双方将在量子计算领域开展为期3年的深度合作...</div>
                                        <div class="dynamic-card-footer">
                                            <div class="dynamic-card-expert">
                                                <div class="dynamic-card-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">王</div>
                                                <span class="dynamic-card-name">王强</span>
                                            </div>
                                            <div class="dynamic-card-actions">
                                                <button class="dynamic-card-action followed" onclick="event.stopPropagation(); unfollowExpert('王强', this)">
                                                    <i class="fas fa-heart"></i> 已关注
                                                </button>
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); collectDynamic(3)">
                                                    <i class="fas fa-bookmark"></i> 收藏
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 动态卡片4 -->
                                    <div class="dynamic-card" onclick="viewDynamicDetail(4)">
                                        <div class="dynamic-card-header">
                                            <span class="dynamic-card-type position">
                                                <i class="fas fa-briefcase"></i> 任职变动
                                            </span>
                                            <span class="dynamic-card-time">2天前</span>
                                        </div>
                                        <div class="dynamic-card-title">刘明教授出任清华大学计算机系主任</div>
                                        <div class="dynamic-card-content">从北京大学调任清华大学，负责计算机学科建设工作...</div>
                                        <div class="dynamic-card-footer">
                                            <div class="dynamic-card-expert">
                                                <div class="dynamic-card-avatar" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">刘</div>
                                                <span class="dynamic-card-name">刘明</span>
                                            </div>
                                            <div class="dynamic-card-actions">
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); followExpert('刘明', this)">
                                                    <i class="fas fa-heart"></i> 关注
                                                </button>
                                                <button class="dynamic-card-action" onclick="event.stopPropagation(); collectDynamic(4)">
                                                    <i class="fas fa-bookmark"></i> 收藏
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 智能推荐区 -->
                            <div class="subscription-recommend">
                                <div class="subscription-recommend-header">
                                    <div class="subscription-recommend-title">
                                        <i class="fas fa-magic"></i>
                                        智能推荐
                                    </div>
                                    <span class="subscription-more-link" onclick="viewMoreRecommendations()">
                                        查看更多 <i class="fas fa-arrow-right"></i>
                                    </span>
                                </div>
                                <div class="subscription-recommend-list">
                                    <!-- 推荐专家1 -->
                                    <div class="recommend-expert-card" onclick="viewExpertProfile(1)">
                                        <div class="recommend-expert-header">
                                            <div class="recommend-expert-avatar">陈</div>
                                            <div class="recommend-expert-info">
                                                <div class="recommend-expert-name">陈立教授</div>
                                                <div class="recommend-expert-title">中科院院士 / 北京大学</div>
                                            </div>
                                            <span class="recommend-expert-reason">
                                                <i class="fas fa-lightbulb"></i> 研究方向相似
                                            </span>
                                        </div>
                                        <div class="recommend-expert-tags">
                                            <span class="recommend-expert-tag">量子计算</span>
                                            <span class="recommend-expert-tag">量子通信</span>
                                            <span class="recommend-expert-tag">量子密码</span>
                                        </div>
                                        <div class="recommend-expert-stats">
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">256</div>
                                                <div class="recommend-stat-label">论文数</div>
                                            </div>
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">12.5K</div>
                                                <div class="recommend-stat-label">引用量</div>
                                            </div>
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">52</div>
                                                <div class="recommend-stat-label">H指数</div>
                                            </div>
                                        </div>
                                        <div class="recommend-expert-actions">
                                            <button class="recommend-action-btn primary" onclick="event.stopPropagation(); subscribeExpert(1)">
                                                <i class="fas fa-plus"></i> 订阅
                                            </button>
                                            <button class="recommend-action-btn secondary" onclick="event.stopPropagation(); giveFeedback(1, this)">
                                                <i class="fas fa-comment"></i> 反馈
                                            </button>
                                        </div>
                                    </div>

                                    <!-- 推荐专家2 -->
                                    <div class="recommend-expert-card" onclick="viewExpertProfile(2)">
                                        <div class="recommend-expert-header">
                                            <div class="recommend-expert-avatar" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">周</div>
                                            <div class="recommend-expert-info">
                                                <div class="recommend-expert-name">周婷教授</div>
                                                <div class="recommend-expert-title">IEEE Fellow / 清华大学</div>
                                            </div>
                                            <span class="recommend-expert-reason">
                                                <i class="fas fa-users"></i> 合作潜力高
                                            </span>
                                        </div>
                                        <div class="recommend-expert-tags">
                                            <span class="recommend-expert-tag">深度学习</span>
                                            <span class="recommend-expert-tag">计算机视觉</span>
                                            <span class="recommend-expert-tag">自动驾驶</span>
                                        </div>
                                        <div class="recommend-expert-stats">
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">189</div>
                                                <div class="recommend-stat-label">论文数</div>
                                            </div>
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">8.9K</div>
                                                <div class="recommend-stat-label">引用量</div>
                                            </div>
                                            <div class="recommend-stat-item">
                                                <div class="recommend-stat-value">45</div>
                                                <div class="recommend-stat-label">H指数</div>
                                            </div>
                                        </div>
                                        <div class="recommend-expert-actions">
                                            <button class="recommend-action-btn primary" onclick="event.stopPropagation(); subscribeExpert(2)">
                                                <i class="fas fa-plus"></i> 订阅
                                            </button>
                                            <button class="recommend-action-btn secondary" onclick="event.stopPropagation(); giveFeedback(2, this)">
                                                <i class="fas fa-comment"></i> 反馈
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 通知中心 -->
                            <div class="subscription-notifications">
                                <div class="subscription-notifications-header">
                                    <div class="subscription-notifications-title">
                                        <i class="fas fa-bell"></i>
                                        通知中心
                                        <span class="notification-settings-link" onclick="event.stopPropagation(); showNotificationSettings()">通知设置</span>
                                    </div>
                                    <div class="subscription-notifications-actions">
                                        <button class="notification-filter-btn active" onclick="filterNotifications('all', this)">全部</button>
                                        <button class="notification-filter-btn" onclick="filterNotifications('paper', this)">论文</button>
                                        <button class="notification-filter-btn" onclick="filterNotifications('award', this)">获奖</button>
                                        <button class="notification-filter-btn" onclick="filterNotifications('institution', this)">机构变动</button>
                                    </div>
                                </div>
                                <div class="subscription-notifications-list">
                                    <div class="notification-item unread" onclick="viewNotificationDetail(1)">
                                        <div class="notification-item-header">
                                            <span class="notification-item-type">
                                                <i class="fas fa-file-alt"></i> 论文更新
                                            </span>
                                            <span class="notification-item-time">30分钟前</span>
                                        </div>
                                        <div class="notification-item-content">张伟教授新发表2篇顶会论文</div>
                                    </div>
                                    <div class="notification-item" onclick="viewNotificationDetail(2)">
                                        <div class="notification-item-header">
                                            <span class="notification-item-type">
                                                <i class="fas fa-trophy"></i> 获奖信息
                                            </span>
                                            <span class="notification-item-time">2小时前</span>
                                        </div>
                                        <div class="notification-item-content">李娜教授获得IEEE最佳论文奖</div>
                                    </div>
                                    <div class="notification-item" onclick="viewNotificationDetail(3)">
                                        <div class="notification-item-header">
                                            <span class="notification-item-type">
                                                <i class="fas fa-building"></i> 机构变动
                                            </span>
                                            <span class="notification-item-time">1天前</span>
                                        </div>
                                        <div class="notification-item-content">王强教授加入清华大学任教授</div>
                                    </div>
                                </div>
                            </div>

                            <!-- 订阅统计 -->
                            <div class="subscription-stats">
                                <div class="subscription-stats-header">
                                    <div class="subscription-stats-title">
                                        <i class="fas fa-chart-bar"></i>
                                        订阅统计
                                    </div>
                                    <div class="subscription-stats-actions">
                                        <button class="subscription-export-btn" onclick="showSubscriptionReportSettings()">
                                            <i class="fas fa-download"></i> 导出报告设置
                                        </button>
                                        <button class="subscription-history-download" type="button" onclick="showSubscriptionReportHistory()">
                                            <i class="fas fa-history"></i> 历史报告
                                        </button>
                                    </div>
                                </div>
                                <div class="subscription-stats-content">
                                    <div class="subscription-stats-grid">
                                        <div class="subscription-stat-card" onclick="showSubscriptionStatDetail('total')">
                                            <div class="subscription-stat-value">273</div>
                                            <div class="subscription-stat-label">订阅专家总数</div>
                                        </div>
                                        <div class="subscription-stat-card" onclick="showSubscriptionStatDetail('active')">
                                            <div class="subscription-stat-value">89%</div>
                                            <div class="subscription-stat-label">活跃度</div>
                                        </div>
                                        <div class="subscription-stat-card" onclick="showSubscriptionStatDetail('updates')">
                                            <div class="subscription-stat-value">156</div>
                                            <div class="subscription-stat-label">本月更新</div>
                                        </div>
                                        <div class="subscription-stat-card" onclick="showSubscriptionStatDetail('regions')">
                                            <div class="subscription-stat-value">12</div>
                                            <div class="subscription-stat-label">覆盖国家</div>
                                        </div>
                                    </div>
                                    <div class="subscription-chart-container">
                                        <svg width="100%" height="100%" viewBox="0 0 400 200" id="subscriptionChartSvg">
                                            <!-- 折线图背景网格 -->
                                            <line x1="50" y1="20" x2="50" y2="180" stroke="#e8e8e8" stroke-width="1"/>
                                            <line x1="50" y1="180" x2="380" y2="180" stroke="#e8e8e8" stroke-width="1"/>
                                            <line x1="50" y1="100" x2="380" y2="100" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="5,5"/>
                                            <line x1="50" y1="60" x2="380" y2="60" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="5,5"/>
                                            <line x1="50" y1="140" x2="380" y2="140" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="5,5"/>
                                            
                                            <!-- Y轴标签 -->
                                            <text x="40" y="25" text-anchor="end" fill="#999" font-size="11">100</text>
                                            <text x="40" y="65" text-anchor="end" fill="#999" font-size="11">75</text>
                                            <text x="40" y="105" text-anchor="end" fill="#999" font-size="11">50</text>
                                            <text x="40" y="145" text-anchor="end" fill="#999" font-size="11">25</text>
                                            <text x="40" y="185" text-anchor="end" fill="#999" font-size="11">0</text>
                                            
                                            <!-- X轴标签 -->
                                            <text x="100" y="198" text-anchor="middle" fill="#999" font-size="11">1月</text>
                                            <text x="160" y="198" text-anchor="middle" fill="#999" font-size="11">2月</text>
                                            <text x="220" y="198" text-anchor="middle" fill="#999" font-size="11">3月</text>
                                            <text x="280" y="198" text-anchor="middle" fill="#999" font-size="11">4月</text>
                                            <text x="340" y="198" text-anchor="middle" fill="#999" font-size="11">5月</text>
                                            
                                            <!-- 数据折线 -->
                                            <polyline points="100,140 160,120 220,100 280,80 340,60" fill="none" stroke="#1890ff" stroke-width="2"/>
                                            
                                            <!-- 数据点 -->
                                            <circle cx="100" cy="140" r="4" fill="#1890ff" onmouseover="showChartTooltip(this, '1月', 40)" onmouseout="hideChartTooltip()"/>
                                            <circle cx="160" cy="120" r="4" fill="#1890ff" onmouseover="showChartTooltip(this, '2月', 60)" onmouseout="hideChartTooltip()"/>
                                            <circle cx="220" cy="100" r="4" fill="#1890ff" onmouseover="showChartTooltip(this, '3月', 80)" onmouseout="hideChartTooltip()"/>
                                            <circle cx="280" cy="80" r="4" fill="#1890ff" onmouseover="showChartTooltip(this, '4月', 100)" onmouseout="hideChartTooltip()"/>
                                            <circle cx="340" cy="60" r="4" fill="#1890ff" onmouseover="showChartTooltip(this, '5月', 120)" onmouseout="hideChartTooltip()"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 新增订阅弹窗 -->
            <div class="subscription-modal" id="addSubscriptionModal">
                <div class="subscription-modal-content">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title" id="subscriptionModalTitle">
                            <i class="fas fa-plus-circle" style="color: #1890ff; margin-right: 8px;"></i>
                            新增订阅
                        </div>
                        <button class="subscription-modal-close" onclick="closeAddSubscriptionModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="subscription-modal-body">
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">订阅名称</label>
                            <input type="text" class="subscription-form-input" placeholder="请输入订阅名称" id="subscriptionName">
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">订阅范围</label>
                            <select class="subscription-form-select" id="subscriptionScope">
                                <option value="global">全球范围</option>
                                <option value="country">国家级</option>
                                <option value="institution">机构级</option>
                            </select>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">人才类别（多选）</label>
                            <div class="subscription-checkbox-group" id="subscriptionCategoryOptions">
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="academician"> 院士
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="ieee_fellow"> IEEE Fellow
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="acm_fellow"> ACM Fellow
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="nsfc"> 国家杰青
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="changjiang"> 长江学者
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="qianren"> 千人计划
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="international_award"> 国际奖项获得者
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="leading_university"> 知名高校
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="research_backbone"> 科研机构骨干人才
                                </label>
                            </div>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">主题标签</label>
                            <input type="text" class="subscription-form-input" placeholder="输入研究领域标签，用逗号分隔" id="subscriptionTags">
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">通知频率</label>
                            <select class="subscription-form-select" id="subscriptionFrequency">
                                <option value="realtime">实时推送</option>
                                <option value="daily">每日推送</option>
                                <option value="weekly">每周推送</option>
                            </select>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">推送渠道（多选）</label>
                            <div class="subscription-checkbox-group" id="subscriptionChannelOptions">
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="web" checked> 站内信
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="email"> 邮件
                                </label>
                                <label class="subscription-checkbox-item">
                                    <input type="checkbox" value="api"> API回调
                                </label>
                            </div>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">备注说明</label>
                            <textarea class="subscription-form-textarea" placeholder="选填，添加订阅说明..." id="subscriptionNote"></textarea>
                        </div>
                        <div class="subscription-form-actions">
                            <button class="subscription-form-btn secondary" onclick="closeAddSubscriptionModal()">取消</button>
                            <button class="subscription-form-btn primary" onclick="saveSubscription()">保存订阅</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 暂停订阅确认弹窗 -->
            <div class="subscription-modal" id="pauseSubscriptionModal">
                <div class="subscription-modal-content" style="width: 420px;">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title"><i class="fas fa-pause-circle" style="color:#faad14;margin-right:8px;"></i>暂停订阅</div>
                        <button class="subscription-modal-close" onclick="closePauseSubscriptionModal()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="subscription-modal-body">
                        <p style="margin:0;color:#526171;font-size:14px;line-height:1.7;">确定暂停订阅吗？暂停后将不再接收该订阅的更新通知。</p>
                        <div class="subscription-form-actions" style="margin-top:24px;justify-content:flex-end;">
                            <button class="subscription-form-btn secondary" onclick="closePauseSubscriptionModal()">取消</button>
                            <button class="subscription-form-btn primary" onclick="confirmPauseSubscription()">确定</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 通知详情弹窗 -->
            <div class="subscription-modal" id="notificationDetailModal">
                <div class="subscription-modal-content" style="width: 560px;">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title"><i class="fas fa-bell" style="color:#1890ff;margin-right:8px;"></i>通知详情</div>
                        <button class="subscription-modal-close" onclick="closeNotificationDetail()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="subscription-modal-body subscription-notification-detail" id="notificationDetailBody"></div>
                </div>
            </div>

            <!-- 通知设置弹窗 -->
            <div class="subscription-modal" id="notificationSettingsModal">
                <div class="subscription-modal-content" style="width: 520px;">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title"><i class="fas fa-cog" style="color:#1890ff;margin-right:8px;"></i>通知设置</div>
                        <button class="subscription-modal-close" onclick="closeNotificationSettings()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="subscription-modal-body">
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">订阅方式（可多选）</label>
                            <div class="subscription-choice-grid" id="notificationChannelOptions">
                                <label class="subscription-choice-card"><input type="checkbox" value="web" checked> <i class="fas fa-inbox"></i> 站内信</label>
                                <label class="subscription-choice-card"><input type="checkbox" value="email" checked> <i class="fas fa-envelope"></i> 邮件</label>
                                <label class="subscription-choice-card"><input type="checkbox" value="api"> <i class="fas fa-code"></i> API回调</label>
                            </div>
                        </div>
                        <div class="subscription-form-actions" style="justify-content:flex-end;">
                            <button class="subscription-form-btn secondary" onclick="closeNotificationSettings()">取消</button>
                            <button class="subscription-form-btn primary" onclick="saveNotificationSettings()">保存</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 订阅报告设置弹窗 -->
            <div class="subscription-modal subscription-wide-modal" id="subscriptionReportSettingsModal">
                <div class="subscription-modal-content">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title"><i class="fas fa-file-export" style="color:#1890ff;margin-right:8px;"></i>导出报告设置</div>
                        <button class="subscription-modal-close" onclick="closeSubscriptionReportSettings()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="subscription-modal-body">
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">报告名称</label>
                            <input class="subscription-form-input" id="subscriptionReportName" type="text" value="人才库订阅动态报告" placeholder="请输入报告名称">
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">报告周期</label>
                            <select class="subscription-form-select" id="subscriptionReportPeriod">
                                <option value="day">按日</option><option value="week">按周</option><option value="month" selected>按月</option><option value="quarter">按季度</option><option value="year">按年</option>
                            </select>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">报告内容（可多选）</label>
                            <div class="subscription-choice-grid" id="subscriptionReportContents">
                                <label class="subscription-choice-card"><input type="checkbox" value="paper" checked> 论文</label>
                                <label class="subscription-choice-card"><input type="checkbox" value="award" checked> 获奖</label>
                                <label class="subscription-choice-card"><input type="checkbox" value="institution" checked> 机构变动</label>
                            </div>
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">第一份报告生成时间</label>
                            <input class="subscription-form-input" id="subscriptionReportStartDate" type="date" value="2026-09-15">
                        </div>
                        <div class="subscription-form-group">
                            <label class="subscription-form-label">选择模板</label>
                            <div class="subscription-choice-grid">
                                <label class="subscription-report-template"><input type="radio" name="subscriptionReportTemplate" value="brief" checked><strong>简明速览</strong><span>适合日常动态摘要</span></label>
                                <label class="subscription-report-template"><input type="radio" name="subscriptionReportTemplate" value="analysis"><strong>深度分析</strong><span>包含趋势与重点解读</span></label>
                                <label class="subscription-report-template"><input type="radio" name="subscriptionReportTemplate" value="executive"><strong>决策简报</strong><span>突出风险与行动建议</span></label>
                                <label class="subscription-report-template"><input type="radio" name="subscriptionReportTemplate" value="custom"><strong>可视化综合</strong><span>图表与明细完整呈现</span></label>
                            </div>
                        </div>
                        <div class="subscription-form-actions" style="justify-content:flex-end;">
                            <button class="subscription-form-btn secondary" onclick="closeSubscriptionReportSettings()">取消</button>
                            <button class="subscription-form-btn primary" onclick="saveSubscriptionReportSettings()">确定</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 历史报告弹窗 -->
            <div class="subscription-modal" id="subscriptionReportHistoryModal">
                <div class="subscription-modal-content" style="width: 620px;">
                    <div class="subscription-modal-header">
                        <div class="subscription-modal-title"><i class="fas fa-history" style="color:#1890ff;margin-right:8px;"></i>历史报告</div>
                        <button class="subscription-modal-close" onclick="closeSubscriptionReportHistory()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="subscription-modal-body">
                        <div class="subscription-history-list" id="subscriptionHistoryList"></div>
                    </div>
                </div>
            </div>

            <!-- 反馈弹窗 -->
            <div class="feedback-modal" id="feedbackModal">
                <div class="feedback-title">该推荐是否相关？</div>
                <div class="feedback-options">
                    <button class="feedback-option" onclick="submitFeedback('relevant')">非常相关</button>
                    <button class="feedback-option" onclick="submitFeedback('somewhat')">一般相关</button>
                    <button class="feedback-option" onclick="submitFeedback('not')">不相关</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 权重设置弹窗 -->
    <div class="modal-overlay" id="weightSettingsModal" style="display: none;">
        <div class="modal-content weight-modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-sliders-h"></i> 编辑权重</h3>
                <button class="modal-close" onclick="closeWeightSettings()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="weight-description">
                    <i class="fas fa-info-circle"></i>
                    <p>请为五个核心维度分配权重，总权重必须等于100%。权重将影响综合指数计算和排序结果。</p>
                </div>

                <div class="weight-items">
                    <div class="weight-item-edit">
                        <div class="weight-item-header">
                            <div class="weight-item-icon">
                                <i class="fas fa-users" style="color: #667eea;"></i>
                            </div>
                            <div class="weight-item-info">
                                <label class="weight-item-label">人才总量指数</label>
                                <span class="weight-item-desc">高层次人才数量与密度</span>
                            </div>
                            <div class="weight-item-value">
                                <span id="weight-total-display">30</span>%
                            </div>
                        </div>
                        <div class="weight-item-control">
                            <input type="range" class="weight-slider" id="weight-total-slider" min="0" max="100" value="30" oninput="onWeightChange('total')">
                            <input type="number" class="weight-input" id="weight-total-input" min="0" max="100" value="30" oninput="onWeightChange('total')">
                        </div>
                    </div>

                    <div class="weight-item-edit">
                        <div class="weight-item-header">
                            <div class="weight-item-icon">
                                <i class="fas fa-flask" style="color: #f093fb;"></i>
                            </div>
                            <div class="weight-item-info">
                                <label class="weight-item-label">科研产出指数</label>
                                <span class="weight-item-desc">专家意见与项目经费</span>
                            </div>
                            <div class="weight-item-value">
                                <span id="weight-output-display">25</span>%
                            </div>
                        </div>
                        <div class="weight-item-control">
                            <input type="range" class="weight-slider" id="weight-output-slider" min="0" max="100" value="25" oninput="onWeightChange('output')">
                            <input type="number" class="weight-input" id="weight-output-input" min="0" max="100" value="25" oninput="onWeightChange('output')">
                        </div>
                    </div>

                    <div class="weight-item-edit">
                        <div class="weight-item-header">
                            <div class="weight-item-icon">
                                <i class="fas fa-quote-right" style="color: #4facfe;"></i>
                            </div>
                            <div class="weight-item-info">
                                <label class="weight-item-label">学术影响力指数</label>
                                <span class="weight-item-desc">论文引用与学术任职</span>
                            </div>
                            <div class="weight-item-value">
                                <span id="weight-influence-display">20</span>%
                            </div>
                        </div>
                        <div class="weight-item-control">
                            <input type="range" class="weight-slider" id="weight-influence-slider" min="0" max="100" value="20" oninput="onWeightChange('influence')">
                            <input type="number" class="weight-input" id="weight-influence-input" min="0" max="100" value="20" oninput="onWeightChange('influence')">
                        </div>
                    </div>

                    <div class="weight-item-edit">
                        <div class="weight-item-header">
                            <div class="weight-item-icon">
                                <i class="fas fa-chart-pie" style="color: #43e97b;"></i>
                            </div>
                            <div class="weight-item-info">
                                <label class="weight-item-label">产业贡献度指数</label>
                                <span class="weight-item-desc">产学研合作与技术转化</span>
                            </div>
                            <div class="weight-item-value">
                                <span id="weight-contribution-display">15</span>%
                            </div>
                        </div>
                        <div class="weight-item-control">
                            <input type="range" class="weight-slider" id="weight-contribution-slider" min="0" max="100" value="15" oninput="onWeightChange('contribution')">
                            <input type="number" class="weight-input" id="weight-contribution-input" min="0" max="100" value="15" oninput="onWeightChange('contribution')">
                        </div>
                    </div>

                    <div class="weight-item-edit">
                        <div class="weight-item-header">
                            <div class="weight-item-icon">
                                <i class="fas fa-exchange-alt" style="color: #fa709a;"></i>
                            </div>
                            <div class="weight-item-info">
                                <label class="weight-item-label">流动活跃度指数</label>
                                <span class="weight-item-desc">人才流动与交流活跃程度</span>
                            </div>
                            <div class="weight-item-value">
                                <span id="weight-mobility-display">10</span>%
                            </div>
                        </div>
                        <div class="weight-item-control">
                            <input type="range" class="weight-slider" id="weight-mobility-slider" min="0" max="100" value="10" oninput="onWeightChange('mobility')">
                            <input type="number" class="weight-input" id="weight-mobility-input" min="0" max="100" value="10" oninput="onWeightChange('mobility')">
                        </div>
                    </div>
                </div>

                <div class="weight-summary">
                    <div class="summary-item">
                        <span class="summary-label">当前总权重：</span>
                        <span class="summary-value" id="totalWeightDisplay" style="color: #52c41a;">100%</span>
                    </div>
                    <div class="summary-status valid" id="weightStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>权重分配合理</span>
                    </div>
                </div>

                <div class="weight-presets">
                    <label class="preset-label">快速预设：</label>
                    <div class="preset-buttons">
                        <button class="preset-btn" onclick="applyWeightPreset('balanced')">
                            <i class="fas fa-balance-scale"></i> 均衡型
                        </button>
                        <button class="preset-btn" onclick="applyWeightPreset('research')">
                            <i class="fas fa-graduation-cap"></i> 科研导向
                        </button>
                        <button class="preset-btn" onclick="applyWeightPreset('industry')">
                            <i class="fas fa-building"></i> 产业导向
                        </button>
                        <button class="preset-btn" onclick="applyWeightPreset('innovation')">
                            <i class="fas fa-lightbulb"></i> 创新导向
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" onclick="restoreIndexDefaultWeights()">
                    <i class="fas fa-undo"></i> 恢复默认
                </button>
                <button class="btn btn-default" onclick="showIndexWeightPlanModal()">
                    <i class="fas fa-save"></i> 保存方案
                </button>
                <button class="btn btn-default" onclick="closeWeightSettings()">取消</button>
                <button class="btn btn-primary" onclick="applyWeights()">
                    <i class="fas fa-check"></i> 应用权重
                </button>
            </div>
        </div>
    </div>

    <!-- 指数权重方案名称弹窗 -->
    <div class="modal-overlay" id="indexWeightPlanModal" style="display: none;">
        <div class="modal-content index-small-modal" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3><i class="fas fa-save" style="color: #1890ff;"></i> 保存权重方案</h3>
                <button class="modal-close" onclick="closeIndexWeightPlanModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="index-report-field">
                    <label for="indexWeightPlanName">方案名称</label>
                    <input id="indexWeightPlanName" type="text" placeholder="请输入方案名称，例如：科研导向方案" maxlength="30">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" onclick="closeIndexWeightPlanModal()">取消</button>
                <button class="btn btn-primary" onclick="confirmIndexWeightPlan()">确认保存</button>
            </div>
        </div>
    </div>

    <!-- 指数导出范围弹窗 -->
    <div class="modal-overlay" id="indexExportScopeModal" style="display: none;">
        <div class="modal-content index-export-modal" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3><i class="fas fa-file-export" style="color: #1890ff;"></i> 选择导出内容</h3>
                <button class="modal-close" onclick="closeIndexExportScopeModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p class="index-modal-hint">请选择本次报告需要包含的分析内容，默认全部选中。</p>
                <div class="index-export-scope-list">
                    <label class="index-export-scope-item"><input type="checkbox" value="综合指数" checked><span><i class="fas fa-star"></i>综合指数</span></label>
                    <label class="index-export-scope-item"><input type="checkbox" value="趋势分析" checked><span><i class="fas fa-chart-line"></i>趋势分析</span></label>
                    <label class="index-export-scope-item"><input type="checkbox" value="指标对比雷达图" checked><span><i class="fas fa-bullseye"></i>指标对比雷达图</span></label>
                    <label class="index-export-scope-item"><input type="checkbox" value="人才支持指数热力图分布视图" checked><span><i class="fas fa-fire"></i>人才支持指数热力图分布视图</span></label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" onclick="closeIndexExportScopeModal()">取消</button>
                <button class="btn btn-primary" onclick="confirmIndexExportScope()">下一步</button>
            </div>
        </div>
    </div>

    <!-- 指数导出格式弹窗 -->
    <div class="modal-overlay" id="indexExportFormatModal" style="display: none;">
        <div class="modal-content index-export-modal" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3><i class="fas fa-download" style="color: #1890ff;"></i> 选择报告格式</h3>
                <button class="modal-close" onclick="closeIndexExportFormatModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p class="index-modal-hint">已选择：<span id="indexExportScopeSummary">全部分析内容</span></p>
                <div class="index-export-format-list">
                    <button type="button" class="index-export-format" onclick="startIndexExport('pdf')"><i class="fas fa-file-pdf"></i><span>导出PDF报告</span></button>
                    <button type="button" class="index-export-format" onclick="startIndexExport('excel')"><i class="fas fa-file-excel"></i><span>导出Excel报告</span></button>
                    <button type="button" class="index-export-format" onclick="startIndexExport('csv')"><i class="fas fa-file-csv"></i><span>导出csv报告</span></button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" onclick="closeIndexExportFormatModal()">取消</button>
            </div>
        </div>
    </div>

    <div class="index-toast" id="indexToast" role="status" aria-live="polite"></div>

    <!-- 成果悬浮提示 -->
    <div class="achievement-tooltip" id="achievementTooltip">
        <div class="achievement-tooltip-header"></div>
        <div class="achievement-tooltip-desc"></div>
        <div class="achievement-tooltip-stats">
            <div class="achievement-tooltip-stat citations">
                <i class="fas fa-quote-right"></i>
                <span></span>
            </div>
            <div class="achievement-tooltip-stat journal">
                <i class="fas fa-book"></i>
                <span></span>
            </div>
        </div>
    </div>

    <!-- 专家详情弹窗 -->
    <div class="modal-overlay" id="expertDetailModal">
        <div class="modal-content expert-detail-content">
            <div class="expert-detail-header" id="expertDetailHeader">
                <div class="expert-detail-avatar" id="expertDetailAvatar"></div>
                <div class="expert-detail-info">
                    <h2 id="expertDetailName"></h2>
                    <div class="expert-detail-title" id="expertDetailTitle"></div>
                    <div class="expert-detail-institution" id="expertDetailInstitution"></div>
                </div>
                <button class="modal-close" onclick="closeExpertDetail()" style="background: rgba(255, 255, 255, 0.3);">
                    <i class="fas fa-times" style="color: white;"></i>
                </button>
            </div>
            <div class="expert-detail-research" id="expertDetailResearch"></div>
            <div class="expert-detail-section">
                <h4><i class="fas fa-chart-bar"></i> 学术统计</h4>
                <div class="expert-detail-stats-grid">
                    <div class="expert-detail-stat-card">
                        <div class="expert-detail-stat-value" id="expertDetailPapers"></div>
                        <div class="expert-detail-stat-label">论文数</div>
                    </div>
                    <div class="expert-detail-stat-card">
                        <div class="expert-detail-stat-value" id="expertDetailCitations"></div>
                        <div class="expert-detail-stat-label">引用量</div>
                    </div>
                    <div class="expert-detail-stat-card">
                        <div class="expert-detail-stat-value" id="expertDetailHIndex"></div>
                        <div class="expert-detail-stat-label">H指数</div>
                    </div>
                    <div class="expert-detail-stat-card">
                        <div class="expert-detail-stat-value" id="expertDetailAvgCitations"></div>
                        <div class="expert-detail-stat-label">篇均引用</div>
                    </div>
                </div>
            </div>
            <div class="expert-detail-section">
                <h4><i class="fas fa-file-alt"></i> 代表性论文</h4>
                <div id="expertDetailPapersList"></div>
            </div>
            <div class="expert-detail-section">
                <h4><i class="fas fa-project-diagram"></i> 项目经历</h4>
                <div id="expertDetailProjectsList"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" onclick="toggleTalentFavorite(currentExpertId)">
                    <i class="fas fa-heart"></i> 收藏
                </button>
                <button class="btn btn-primary" onclick="addToTalentCompare(currentExpertId)">
                    <i class="fas fa-balance-scale"></i> 加入对比
                </button>
            </div>
        </div>
    </div>

    <!-- 对比栏 -->
    <div class="compare-bar" id="compareBar">
        <div class="compare-bar-header">
            <div class="compare-bar-title">
                <i class="fas fa-balance-scale" style="color: #1890ff;"></i>
                专家对比 (<span id="compareCount">0</span>/3)
            </div>
            <div class="compare-bar-actions">
                <button class="btn btn-default" onclick="clearCompare()">
                    <i class="fas fa-times"></i> 清空对比
                </button>
                <button class="btn btn-primary" onclick="showCompareResult()">
                    <i class="fas fa-chart-bar"></i> 开始对比
                </button>
            </div>
        </div>
        <div class="compare-experts" id="compareExperts">
            <div class="compare-empty">请添加专家到对比列表（最多3位）</div>
        </div>
    </div>

    <!-- 高级筛选弹窗 -->
    <div class="modal-overlay" id="advancedFilterModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: #fff; border-radius: 12px; width: 90%; max-width: 700px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">
                    <i class="fas fa-sliders-h" style="color: #1890ff; margin-right: 8px;"></i>
                    高级筛选
                </h3>
                <button onclick="closeAdvancedFilterModal()" style="width: 36px; height: 36px; border: none; background: #f5f5f5; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #666;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" style="padding: 24px;">
                <!-- 基础筛选条件 -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">姓名</label>
                        <input type="text" class="filter-input" id="modalFilterName" placeholder="请输入姓名" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; transition: all 0.3s;">
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">机构</label>
                        <select class="filter-select" id="modalFilterInstitution" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; background: #fff; cursor: pointer;">
                            <option value="">全部机构</option>
                            <option value="tsinghua">清华大学</option>
                            <option value="peking">北京大学</option>
                            <option value="cas">中国科学院</option>
                            <option value="fudan">复旦大学</option>
                            <option value="sjtu">上海交通大学</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">研究方向</label>
                        <select class="filter-select" id="modalFilterField" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; background: #fff; cursor: pointer;">
                            <option value="">全部方向</option>
                            <option value="ai">人工智能</option>
                            <option value="ml">机器学习</option>
                            <option value="cv">计算机视觉</option>
                            <option value="nlp">自然语言处理</option>
                            <option value="dm">数据挖掘</option>
                            <option value="kg">知识图谱</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">职称</label>
                        <select class="filter-select" id="modalFilterTitle" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; background: #fff; cursor: pointer;">
                            <option value="">全部职称</option>
                            <option value="professor">教授</option>
                            <option value="associate">副教授</option>
                            <option value="researcher">研究员</option>
                            <option value="senior">高级工程师</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">代表成果</label>
                        <input type="text" class="filter-input" id="modalFilterAchievement" placeholder="请输入成果关键词" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" style="display: block; margin-bottom: 8px; font-size: 13px; color: #666; font-weight: 500;">项目经历</label>
                        <input type="text" class="filter-input" id="modalFilterProject" placeholder="请输入项目名称关键词" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;">
                    </div>
                </div>
                
                <!-- 展开更多筛选项按钮 -->
                <div style="margin-bottom: 20px;">
                    <button onclick="toggleMoreFilters()" id="toggleMoreBtn" style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: #f0f5ff; border: 1px solid #1890ff; border-radius: 6px; color: #1890ff; font-size: 14px; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-chevron-down" id="toggleMoreIcon"></i>
                        <span id="toggleMoreText">展开更多筛选项</span>
                    </button>
                </div>
                
                <!-- 更多筛选项（默认隐藏） -->
                <div id="moreFiltersPanel" style="display: none; padding: 20px; background: #fafafa; border-radius: 8px; margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div class="filter-group">
                            <label class="filter-label" style="display: block; margin-bottom: 10px; font-size: 13px; color: #666; font-weight: 500;">成果类型</label>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; color: #666;">
                                    <input type="checkbox" class="filter-checkbox" value="paper" data-type="achievementType" onchange="updateActiveFilters()" style="cursor: pointer;"> 论文
                                </label>
                                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; color: #666;">
                                    <input type="checkbox" class="filter-checkbox" value="patent" data-type="achievementType" onchange="updateActiveFilters()" style="cursor: pointer;"> 专利
                                </label>
                                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; color: #666;">
                                    <input type="checkbox" class="filter-checkbox" value="project" data-type="achievementType" onchange="updateActiveFilters()" style="cursor: pointer;"> 项目
                                </label>
                            </div>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label" style="display: block; margin-bottom: 10px; font-size: 13px; color: #666; font-weight: 500;">学术影响力等级</label>
                            <select class="filter-select" id="modalFilterInfluence" onchange="updateActiveFilters()" style="width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; background: #fff; cursor: pointer;">
                                <option value="">全部等级</option>
                                <option value="top">顶尖 (H-index ≥ 50)</option>
                                <option value="high">高 (H-index 30-49)</option>
                                <option value="medium">中 (H-index 15-29)</option>
                                <option value="emerging">新兴 (H-index &lt; 15)</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- 已选条件展示 -->
                <div style="border-top: 1px solid #f0f0f0; padding-top: 20px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                        <span style="font-size: 13px; color: #666; font-weight: 500;">已选条件</span>
                        <span id="filterCount" style="font-size: 12px; color: #999;">共 0 个条件</span>
                    </div>
                    <div class="active-filters-box" id="modalActiveFilters" style="min-height: 40px; padding: 12px; background: #f9f9f9; border-radius: 6px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <span style="font-size: 12px; color: #999;">暂无筛选条件</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid #f0f0f0; background: #fafafa; border-radius: 0 0 12px 12px;">
                <button class="btn btn-secondary" onclick="resetModalFilters()" style="padding: 10px 20px; background: #fff; border: 1px solid #d9d9d9; border-radius: 6px; color: #666; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.3s;">
                    <i class="fas fa-redo"></i> 重置筛选
                </button>
                <button class="btn btn-primary" onclick="applyModalFilters()" style="padding: 10px 24px; background: #1890ff; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.3s;">
                    <i class="fas fa-check"></i> 应用筛选
                </button>
            </div>
        </div>
    </div>

    <!-- 地图导出模态框 -->
    <div class="modal-overlay" id="mapExportModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: #fff; border-radius: 12px; width: 90%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">
                    <i class="fas fa-file-export" style="color: #1890ff; margin-right: 8px;"></i>
                    导出报告
                </h3>
                <button onclick="closeMapExportModal()" style="width: 36px; height: 36px; border: none; background: #f5f5f5; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #666;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" style="padding: 24px;">
                <p style="color: #666; margin-bottom: 20px; font-size: 14px;">选择导出格式，系统将生成包含地图截图、图表及数据摘要的综合报告。</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <button class="map-export-option" onclick="exportMapReport('excel')">
                        <i class="fas fa-file-excel" style="color: #217346; font-size: 28px;"></i>
                        <span>Excel</span>
                    </button>
                    <button class="map-export-option" onclick="exportMapReport('csv')">
                        <i class="fas fa-file-csv" style="color: #0064a0; font-size: 28px;"></i>
                        <span>CSV</span>
                    </button>
                    <button class="map-export-option" onclick="exportMapReport('pdf')">
                        <i class="fas fa-file-pdf" style="color: #dc2626; font-size: 28px;"></i>
                        <span>PDF报告</span>
                    </button>
                    <button class="map-export-option" onclick="exportMapReport('report')">
                        <i class="fas fa-file-alt" style="color: #1890ff; font-size: 28px;"></i>
                        <span>可视化报告</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 人才驾驶舱导出模态框 -->
    <div class="modal-overlay" id="cockpitExportModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: #fff; border-radius: 12px; width: 90%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">
                    <i class="fas fa-download" style="color: #1890ff; margin-right: 8px;"></i>
                    导出选项
                </h3>
                <button onclick="closeCockpitExportModal()" style="width: 36px; height: 36px; border: none; background: #f5f5f5; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #666;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" style="padding: 24px;">
                <p style="color: #666; margin-bottom: 20px; font-size: 14px;">选择导出格式，系统将生成包含人才驾驶舱数据、图表及分析的综合报告。</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                    <button class="cockpit-export-option" onclick="exportCockpitReport('pdf')" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 16px; background: #fff; border: 2px solid #e8e8e8; border-radius: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#dc2626'; this.style.background='#fef2f2'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e8e8e8'; this.style.background='#fff'; this.style.transform='translateY(0)';">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #ff6b6b 0%, #dc2626 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-file-pdf" style="color: #fff; font-size: 24px;"></i>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">PDF报告</div>
                            <div style="font-size: 12px; color: #999;">专业排版报告</div>
                        </div>
                    </button>
                    <button class="cockpit-export-option" onclick="exportCockpitReport('image')" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 16px; background: #fff; border: 2px solid #e8e8e8; border-radius: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#52c41a'; this.style.background='#f6ffed'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e8e8e8'; this.style.background='#fff'; this.style.transform='translateY(0)';">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #95de64 0%, #52c41a 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-image" style="color: #fff; font-size: 24px;"></i>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">图片导出</div>
                            <div style="font-size: 12px; color: #999;">高清可视化图表</div>
                        </div>
                    </button>
                    <button class="cockpit-export-option" onclick="exportCockpitReport('link')" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 16px; background: #fff; border: 2px solid #e8e8e8; border-radius: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='#1890ff'; this.style.background='#e6f7ff'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e8e8e8'; this.style.background='#fff'; this.style.transform='translateY(0)';">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-link" style="color: #fff; font-size: 24px;"></i>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">在线分享</div>
                            <div style="font-size: 12px; color: #999;">生成分享链接</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 人才驾驶舱成果展示模态框 -->
    <div class="modal-overlay" id="cockpitShowcaseModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 2000; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: #fff; border-radius: 16px; width: 90%; max-width: 900px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; border-bottom: 1px solid #f0f0f0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h3 style="margin: 0; font-size: 20px; font-weight: 600; color: #fff;">
                    <i class="fas fa-trophy" style="margin-right: 10px;"></i>
                    成果汇总展示
                </h3>
                <button onclick="closeCockpitShowcase()" style="width: 40px; height: 40px; border: none; background: rgba(255,255,255,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.2)';">
                    <i class="fas fa-times" style="font-size: 18px;"></i>
                </button>
            </div>
            <div class="modal-body" style="padding: 32px;">
                <!-- 关键发现 -->
                <div style="margin-bottom: 32px;">
                    <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-lightbulb" style="color: #faad14;"></i>
                        关键发现
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        <div style="padding: 20px; background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%); border-radius: 12px; border-left: 4px solid #1890ff;">
                            <div style="font-size: 28px; font-weight: 700; color: #1890ff; margin-bottom: 8px;">12,456</div>
                            <div style="font-size: 14px; color: #666; margin-bottom: 4px;">人才总量</div>
                            <div style="font-size: 12px; color: #52c41a;"><i class="fas fa-arrow-up"></i> 同比增长 12.5%</div>
                        </div>
                        <div style="padding: 20px; background: linear-gradient(135deg, #f6ffed 0%, #f0f5ff 100%); border-radius: 12px; border-left: 4px solid #52c41a;">
                            <div style="font-size: 28px; font-weight: 700; color: #52c41a; margin-bottom: 8px;">2,847</div>
                            <div style="font-size: 14px; color: #666; margin-bottom: 4px;">北京人才集聚</div>
                            <div style="font-size: 12px; color: #666;">占全国总量 22.9%</div>
                        </div>
                        <div style="padding: 20px; background: linear-gradient(135deg, #fff7e6 0%, #fff1f0 100%); border-radius: 12px; border-left: 4px solid #fa8c16;">
                            <div style="font-size: 28px; font-weight: 700; color: #fa8c16; margin-bottom: 8px;">AI</div>
                            <div style="font-size: 14px; color: #666; margin-bottom: 4px;">最热门领域</div>
                            <div style="font-size: 12px; color: #666;">人才占比 35.2%</div>
                        </div>
                    </div>
                </div>

                <!-- 可视化报告 -->
                <div style="margin-bottom: 32px;">
                    <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-chart-pie" style="color: #1890ff;"></i>
                        可视化报告
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <!-- 人才分布图 -->
                        <div style="padding: 24px; background: #f8f9fa; border-radius: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 16px;">区域人才分布</div>
                            <div style="height: 200px; display: flex; align-items: flex-end; justify-content: space-around; padding: 20px; background: #fff; border-radius: 8px;">
                                <div style="text-align: center;">
                                    <div style="width: 40px; height: 140px; background: linear-gradient(to top, #1890ff, #40a9ff); border-radius: 4px 4px 0 0;"></div>
                                    <div style="margin-top: 8px; font-size: 12px; color: #666;">北京</div>
                                    <div style="font-size: 11px; color: #999;">28%</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 40px; height: 110px; background: linear-gradient(to top, #52c41a, #95de64); border-radius: 4px 4px 0 0;"></div>
                                    <div style="margin-top: 8px; font-size: 12px; color: #666;">上海</div>
                                    <div style="font-size: 11px; color: #999;">22%</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 40px; height: 90px; background: linear-gradient(to top, #faad14, #ffc53d); border-radius: 4px 4px 0 0;"></div>
                                    <div style="margin-top: 8px; font-size: 12px; color: #666;">广东</div>
                                    <div style="font-size: 11px; color: #999;">18%</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 40px; height: 70px; background: linear-gradient(to top, #722ed1, #b37feb); border-radius: 4px 4px 0 0;"></div>
                                    <div style="margin-top: 8px; font-size: 12px; color: #666;">其他</div>
                                    <div style="font-size: 11px; color: #999;">32%</div>
                                </div>
                            </div>
                        </div>
                        <!-- 领域分布图 -->
                        <div style="padding: 24px; background: #f8f9fa; border-radius: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 16px;">领域人才占比</div>
                            <div style="height: 200px; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 20px; background: #fff; border-radius: 8px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 80px; font-size: 12px; color: #666;">人工智能</div>
                                    <div style="flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                        <div style="width: 75%; height: 100%; background: linear-gradient(to right, #1890ff, #40a9ff); border-radius: 10px;"></div>
                                    </div>
                                    <div style="width: 40px; font-size: 12px; color: #333; font-weight: 500;">35%</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 80px; font-size: 12px; color: #666;">生物医药</div>
                                    <div style="flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                        <div style="width: 55%; height: 100%; background: linear-gradient(to right, #52c41a, #95de64); border-radius: 10px;"></div>
                                    </div>
                                    <div style="width: 40px; font-size: 12px; color: #333; font-weight: 500;">25%</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 80px; font-size: 12px; color: #666;">新能源</div>
                                    <div style="flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                        <div style="width: 40%; height: 100%; background: linear-gradient(to right, #faad14, #ffc53d); border-radius: 10px;"></div>
                                    </div>
                                    <div style="width: 40px; font-size: 12px; color: #333; font-weight: 500;">18%</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 80px; font-size: 12px; color: #666;">集成电路</div>
                                    <div style="flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                        <div style="width: 30%; height: 100%; background: linear-gradient(to right, #722ed1, #b37feb); border-radius: 10px;"></div>
                                    </div>
                                    <div style="width: 40px; font-size: 12px; color: #333; font-weight: 500;">12%</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 80px; font-size: 12px; color: #666;">其他</div>
                                    <div style="flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                        <div style="width: 25%; height: 100%; background: linear-gradient(to right, #999, #bbb); border-radius: 10px;"></div>
                                    </div>
                                    <div style="width: 40px; font-size: 12px; color: #333; font-weight: 500;">10%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 核心洞察 -->
                <div style="margin-bottom: 32px;">
                    <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-star" style="color: #faad14;"></i>
                        核心洞察
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="padding: 16px 20px; background: #f6ffed; border-radius: 8px; border-left: 4px solid #52c41a; display: flex; align-items: flex-start; gap: 12px;">
                            <i class="fas fa-check-circle" style="color: #52c41a; margin-top: 2px;"></i>
                            <div>
                                <div style="font-weight: 600; color: #333; margin-bottom: 4px;">人才集聚效应显著</div>
                                <div style="font-size: 13px; color: #666;">北京、上海、广东三地集中了全国68%的高端人才，形成明显的人才高地。</div>
                            </div>
                        </div>
                        <div style="padding: 16px 20px; background: #e6f7ff; border-radius: 8px; border-left: 4px solid #1890ff; display: flex; align-items: flex-start; gap: 12px;">
                            <i class="fas fa-chart-line" style="color: #1890ff; margin-top: 2px;"></i>
                            <div>
                                <div style="font-weight: 600; color: #333; margin-bottom: 4px;">人工智能领域持续火热</div>
                                <div style="font-size: 13px; color: #666;">AI领域人才占比达35.2%，年增长率高达18.5%，远超其他领域。</div>
                            </div>
                        </div>
                        <div style="padding: 16px 20px; background: #fff7e6; border-radius: 8px; border-left: 4px solid #fa8c16; display: flex; align-items: flex-start; gap: 12px;">
                            <i class="fas fa-exchange-alt" style="color: #fa8c16; margin-top: 2px;"></i>
                            <div>
                                <div style="font-weight: 600; color: #333; margin-bottom: 4px;">人才流动活跃</div>
                                <div style="font-size: 13px; color: #666;">年度人才流入1,892人，流出756人，净流入1,136人，人才吸引力持续增强。</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 导出选项 -->
                <div style="display: flex; justify-content: center; gap: 16px; padding-top: 24px; border-top: 1px solid #f0f0f0;">
                    <button onclick="exportShowcaseReport('pdf')" style="padding: 12px 28px; background: #fff; border: 1px solid #d9d9d9; border-radius: 8px; font-size: 14px; cursor: pointer; color: #666; display: flex; align-items: center; gap: 8px; transition: all 0.3s;" onmouseover="this.style.borderColor='#1890ff'; this.style.color='#1890ff';" onmouseout="this.style.borderColor='#d9d9d9'; this.style.color='#666';">
                        <i class="fas fa-file-pdf" style="color: #dc2626;"></i> 导出PDF报告
                    </button>
                    <button onclick="exportShowcaseReport('ppt')" style="padding: 12px 28px; background: #fff; border: 1px solid #d9d9d9; border-radius: 8px; font-size: 14px; cursor: pointer; color: #666; display: flex; align-items: center; gap: 8px; transition: all 0.3s;" onmouseover="this.style.borderColor='#1890ff'; this.style.color='#1890ff';" onmouseout="this.style.borderColor='#d9d9d9'; this.style.color='#666';">
                        <i class="fas fa-file-powerpoint" style="color: #d24726;"></i> 导出PPT
                    </button>
                    <button onclick="exportShowcaseReport('dashboard')" style="padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; font-size: 14px; cursor: pointer; color: #fff; display: flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 2px 8px rgba(102,126,234,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102,126,234,0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102,126,234,0.3)';">
                        <i class="fas fa-chart-area"></i> 查看交互式仪表盘
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../stores/ui';
import { initTalentMap, disposeTalentMap } from '../../data/talent/talent-map-engine';
import '../../assets/styles/talent-map.css';

const router = useRouter();
const ui = useUiStore();

// 原型内跨页跳转桥接：地图内部所有 window.location 跳转已改写为 __mapGoto
window.__mapGoto = (target, arg) => {
  if (target === 'talentList') router.push('/talent/list');
  else if (target === 'talentLibrary') router.push('/talent/library');
  else if (target === 'map') router.push('/talent/map');
  else if (target === 'profile' && arg) router.push('/talent/list/' + arg);
  else ui.showToast('该模块为智库系统其他页面，暂未包含在本期原型范围内');
};

onMounted(() => {
  initTalentMap();
});
onBeforeUnmount(() => {
  disposeTalentMap();
  try { delete window.currentExpertId; } catch (e) { /* noop */ }
});
</script>
