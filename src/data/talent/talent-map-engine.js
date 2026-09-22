/* ============================================================
 * 由 tools/build-talent-map.cjs 从原型 2.3.1科技人才地图.html 自动生成，请勿手工编辑。
 * 移植策略：7 段内联脚本 + talent-map-optimization/dedup 近乎原样并入 buildEngine 作用域；
 *  - 内联 onclick 依赖的全局函数在初始化时挂到 window（含 optimization 层的覆写，顺序与原型一致）
 *  - DOMContentLoaded 初始化体改为显式按原型注册顺序调用
 *  - 跨原型页跳转改写为 window.__mapGoto（Vue 路由桥接）
 * ============================================================ */

const __mapIntervalIds = [];
function __mapSetInterval(fn, ms) {
  const id = setInterval(fn, ms);
  __mapIntervalIds.push(id);
  return id;
}

function buildEngine() {
  /* ---- 顶层函数挂载 window（供内联 onclick 与动态 innerHTML 使用） ---- */
  window.__domInit_1a = __domInit_1a;
  window.__domInit_1b = __domInit_1b;
  window.__domInit_1c = __domInit_1c;
  window.__domInit_2 = __domInit_2;
  window.__domInit_6 = __domInit_6;
  window.addToTalentCompare = addToTalentCompare;
  window.applyCockpitFilter = applyCockpitFilter;
  window.applyCustomRange = applyCustomRange;
  window.applyCustomTimeRange = applyCustomTimeRange;
  window.applyDistributionFilters = applyDistributionFilters;
  window.applyDistributionTimeRange = applyDistributionTimeRange;
  window.applyFilters = applyFilters;
  window.applyIndexFilters = applyIndexFilters;
  window.applyModalFilters = applyModalFilters;
  window.applySubscriptionFilters = applySubscriptionFilters;
  window.applyTalentTagFilters = applyTalentTagFilters;
  window.applyTimeRange = applyTimeRange;
  window.applyWeightPreset = applyWeightPreset;
  window.applyWeights = applyWeights;
  window.calculateRelevance = calculateRelevance;
  window.clearCompare = clearCompare;
  window.clearSearchHistory = clearSearchHistory;
  window.closeAddSubscriptionModal = closeAddSubscriptionModal;
  window.closeAdvancedFilterModal = closeAdvancedFilterModal;
  window.closeCockpitExportModal = closeCockpitExportModal;
  window.closeCockpitRadarDetail = closeCockpitRadarDetail;
  window.closeCockpitShowcase = closeCockpitShowcase;
  window.closeCompareModal = closeCompareModal;
  window.closeCustomTimeModal = closeCustomTimeModal;
  window.closeDistributionTimeRangeModal = closeDistributionTimeRangeModal;
  window.closeDrilldown = closeDrilldown;
  window.closeDrilldownModal = closeDrilldownModal;
  window.closeExpertDetail = closeExpertDetail;
  window.closeFlowDetailModal = closeFlowDetailModal;
  window.closeHeatmapDetail = closeHeatmapDetail;
  window.closeIndexExportFormatModal = closeIndexExportFormatModal;
  window.closeIndexExportScopeModal = closeIndexExportScopeModal;
  window.closeIndexWeightPlanModal = closeIndexWeightPlanModal;
  window.closeMapExportModal = closeMapExportModal;
  window.closeRadarDetail = closeRadarDetail;
  window.closeTalentFavorites = closeTalentFavorites;
  window.closeWeightSettings = closeWeightSettings;
  window.collectDynamic = collectDynamic;
  window.confirmIndexExportScope = confirmIndexExportScope;
  window.confirmIndexWeightPlan = confirmIndexWeightPlan;
  window.deleteSubscription = deleteSubscription;
  window.downloadHeatmapDifferenceReport = downloadHeatmapDifferenceReport;
  window.drilldownFromDetail = drilldownFromDetail;
  window.drilldownHeatmap = drilldownHeatmap;
  window.drilldownProvince = drilldownProvince;
  window.editSubscription = editSubscription;
  window.endDrag = endDrag;
  window.exportCockpitReport = exportCockpitReport;
  window.exportCompareReport = exportCompareReport;
  window.exportCompareResult = exportCompareResult;
  window.exportData = exportData;
  window.exportDrilldownData = exportDrilldownData;
  window.exportIndexReport = exportIndexReport;
  window.exportMapReport = exportMapReport;
  window.exportShowcaseReport = exportShowcaseReport;
  window.exportSubscriptionReport = exportSubscriptionReport;
  window.exportTalentDistribution = exportTalentDistribution;
  window.fillDrilldownData = fillDrilldownData;
  window.filterByField = filterByField;
  window.filterByIndex = filterByIndex;
  window.filterByStat = filterByStat;
  window.filterExpertResults = filterExpertResults;
  window.filterHotfieldKeywords = filterHotfieldKeywords;
  window.filterNotifications = filterNotifications;
  window.filterTalentByDistribution = filterTalentByDistribution;
  window.filterTalentExpertsByTags = filterTalentExpertsByTags;
  window.followExpert = followExpert;
  window.generateCompareResult = generateCompareResult;
  window.generateIndexReport = generateIndexReport;
  window.generateProvinceData = generateProvinceData;
  window.generateSearchSuggestions = generateSearchSuggestions;
  window.getActiveTalentTags = getActiveTalentTags;
  window.getDistributionFieldName = getDistributionFieldName;
  window.getDistributionRegionName = getDistributionRegionName;
  window.getFlowDataByTimeRange = getFlowDataByTimeRange;
  window.getGradientByIndex = getGradientByIndex;
  window.getIndexDraftWeights = getIndexDraftWeights;
  window.getIndexHeatmapRanking = getIndexHeatmapRanking;
  window.getTalentDistributionEntries = getTalentDistributionEntries;
  window.giveFeedback = giveFeedback;
  window.handleIndexHeatmapClick = handleIndexHeatmapClick;
  window.handleIndexHeatmapDoubleClick = handleIndexHeatmapDoubleClick;
  window.handleSearchInput = handleSearchInput;
  window.handleSearchKeydown = handleSearchKeydown;
  window.handleSubscriptionSearch = handleSubscriptionSearch;
  window.hexToRgb = hexToRgb;
  window.hideAchievementTooltip = hideAchievementTooltip;
  window.hideCandidateExperts = hideCandidateExperts;
  window.hideChartTooltip = hideChartTooltip;
  window.hideIndexRadarDetails = hideIndexRadarDetails;
  window.hideIndexTooltip = hideIndexTooltip;
  window.hideIndexTrendTooltip = hideIndexTrendTooltip;
  window.hideRadarTooltip = hideRadarTooltip;
  window.hideSearchHistory = hideSearchHistory;
  window.hideSearchSuggestions = hideSearchSuggestions;
  window.highlightKeyword = highlightKeyword;
  window.initCompareCharts = initCompareCharts;
  window.initHeatmap = initHeatmap;
  window.loadMoreRecommendations = loadMoreRecommendations;
  window.markAsRead = markAsRead;
  window.notifyDistribution = notifyDistribution;
  window.onDrag = onDrag;
  window.onWeightChange = onWeightChange;
  window.pauseSubscription = pauseSubscription;
  window.performTalentSearch = performTalentSearch;
  window.recalculateCompositeIndex = recalculateCompositeIndex;
  window.removeFilter = removeFilter;
  window.removeFromCompare = removeFromCompare;
  window.removeTalentFavorite = removeTalentFavorite;
  window.renderCockpitRadarTrend = renderCockpitRadarTrend;
  window.renderExpertCards = renderExpertCards;
  window.renderExpertGraph = renderExpertGraph;
  window.renderExpertList = renderExpertList;
  window.renderHeatmap = renderHeatmap;
  window.renderHotfieldInsight = renderHotfieldInsight;
  window.renderIndustryCheckboxes = renderIndustryCheckboxes;
  window.renderRecommendations = renderRecommendations;
  window.renderRegionCheckboxes = renderRegionCheckboxes;
  window.renderRepresentativeAchievements = renderRepresentativeAchievements;
  window.renderTalentDistribution = renderTalentDistribution;
  window.renderTalentFavorites = renderTalentFavorites;
  window.renderTrendChart = renderTrendChart;
  window.resetAllFilters = resetAllFilters;
  window.resetCockpitFilters = resetCockpitFilters;
  window.resetCompare = resetCompare;
  window.resetDistributionFilters = resetDistributionFilters;
  window.resetFilters = resetFilters;
  window.resetGraphZoom = resetGraphZoom;
  window.resetMap = resetMap;
  window.resetModalFilters = resetModalFilters;
  window.resetPlayback = resetPlayback;
  window.resetSubscriptionFilters = resetSubscriptionFilters;
  window.resetZoom = resetZoom;
  window.restoreIndexDefaultWeights = restoreIndexDefaultWeights;
  window.resumeSubscription = resumeSubscription;
  window.saveFilterConditions = saveFilterConditions;
  window.saveSubscription = saveSubscription;
  window.selectCandidateExpert = selectCandidateExpert;
  window.selectIndexReportCover = selectIndexReportCover;
  window.selectIndexYear = selectIndexYear;
  window.selectProvince = selectProvince;
  window.selectYear = selectYear;
  window.setHotfieldMode = setHotfieldMode;
  window.setPlaybackSpeed = setPlaybackSpeed;
  window.setSearchHistoryLock = setSearchHistoryLock;
  window.setSpeed = setSpeed;
  window.setTalentFavoriteTag = setTalentFavoriteTag;
  window.showAchievementTooltip = showAchievementTooltip;
  window.showAddSubscriptionModal = showAddSubscriptionModal;
  window.showAdvancedFilterModal = showAdvancedFilterModal;
  window.showCandidateExperts = showCandidateExperts;
  window.showChartTooltip = showChartTooltip;
  window.showCockpitExportModal = showCockpitExportModal;
  window.showCockpitShowcase = showCockpitShowcase;
  window.showCompareModal = showCompareModal;
  window.showCompareResult = showCompareResult;
  window.showDistributionTimeRangeModal = showDistributionTimeRangeModal;
  window.showFlowDetail = showFlowDetail;
  window.showFlowLineDetail = showFlowLineDetail;
  window.showFlowNodeDetail = showFlowNodeDetail;
  window.showHeatmapDetail = showHeatmapDetail;
  window.showIndexExportScopeModal = showIndexExportScopeModal;
  window.showIndexInfo = showIndexInfo;
  window.showIndexRadarDetails = showIndexRadarDetails;
  window.showIndexToast = showIndexToast;
  window.showIndexTooltip = showIndexTooltip;
  window.showIndexTrendTooltip = showIndexTrendTooltip;
  window.showIndexWeightPlanModal = showIndexWeightPlanModal;
  window.showIndustryDetail = showIndustryDetail;
  window.showMapExportModal = showMapExportModal;
  window.showRadarDetail = showRadarDetail;
  window.showRadarNodeDetail = showRadarNodeDetail;
  window.showRadarTooltip = showRadarTooltip;
  window.showRegionDetail = showRegionDetail;
  window.showReportSettings = showReportSettings;
  window.showSearchHistory = showSearchHistory;
  window.showSearchSuggestions = showSearchSuggestions;
  window.showShowcase = showShowcase;
  window.showStatDetail = showStatDetail;
  window.showSubscriptionStatDetail = showSubscriptionStatDetail;
  window.showTalentDetail = showTalentDetail;
  window.showTalentFavorites = showTalentFavorites;
  window.showToast = showToast;
  window.showWeightSettings = showWeightSettings;
  window.sortInstitutions = sortInstitutions;
  window.sortTalentResults = sortTalentResults;
  window.startDrag = startDrag;
  window.startIndexExport = startIndexExport;
  window.startIndexPlayback = startIndexPlayback;
  window.startPlay = startPlay;
  window.stepBackward = stepBackward;
  window.stepForward = stepForward;
  window.stopIndexPlayback = stopIndexPlayback;
  window.stopPlay = stopPlay;
  window.submitFeedback = submitFeedback;
  window.subscribeExpert = subscribeExpert;
  window.switchChartType = switchChartType;
  window.switchCompareType = switchCompareType;
  window.switchHeatmapView = switchHeatmapView;
  window.switchMapView = switchMapView;
  window.switchTab = switchTab;
  window.switchTalentDistribution = switchTalentDistribution;
  window.switchTalentView = switchTalentView;
  window.syncIndexWeightOverview = syncIndexWeightOverview;
  window.syncTalentFavoriteButtons = syncTalentFavoriteButtons;
  window.talentEscapeHtml = talentEscapeHtml;
  window.talentNotify = talentNotify;
  window.timelinePause = timelinePause;
  window.timelinePlay = timelinePlay;
  window.timelineReset = timelineReset;
  window.timelineSeek = timelineSeek;
  window.toggleAdvancedFilter = toggleAdvancedFilter;
  window.toggleCockpitRegionSelection = toggleCockpitRegionSelection;
  window.toggleCockpitTag = toggleCockpitTag;
  window.toggleCompareItem = toggleCompareItem;
  window.toggleExportDropdown = toggleExportDropdown;
  window.toggleExportMenu = toggleExportMenu;
  window.toggleFlowDirection = toggleFlowDirection;
  window.toggleIndexPlay = toggleIndexPlay;
  window.toggleLegend = toggleLegend;
  window.toggleMoreFilters = toggleMoreFilters;
  window.togglePlay = togglePlay;
  window.toggleQuickFilter = toggleQuickFilter;
  window.toggleRepeat = toggleRepeat;
  window.toggleSemanticSearch = toggleSemanticSearch;
  window.toggleTalentFavorite = toggleTalentFavorite;
  window.unfollowExpert = unfollowExpert;
  window.updateActiveFilters = updateActiveFilters;
  window.updateActiveFiltersDisplay = updateActiveFiltersDisplay;
  window.updateAllVisualizations = updateAllVisualizations;
  window.updateCockpitStats = updateCockpitStats;
  window.updateCompareBar = updateCompareBar;
  window.updateCompareBarChart = updateCompareBarChart;
  window.updateCompareRegions = updateCompareRegions;
  window.updateCustomRange = updateCustomRange;
  window.updateDataByYear = updateDataByYear;
  window.updateExpertResults = updateExpertResults;
  window.updateFlowChart = updateFlowChart;
  window.updateFlowData = updateFlowData;
  window.updateFlowTimeRange = updateFlowTimeRange;
  window.updateFlowVisualization = updateFlowVisualization;
  window.updateHeatmapByIndustry = updateHeatmapByIndustry;
  window.updateHeatmapDifferenceReportButton = updateHeatmapDifferenceReportButton;
  window.updateHeatmapForYear = updateHeatmapForYear;
  window.updateIndexYear = updateIndexYear;
  window.updateIndexYearEnhanced = updateIndexYearEnhanced;
  window.updateMapTransform = updateMapTransform;
  window.updatePieChart = updatePieChart;
  window.updatePlaybackProgress = updatePlaybackProgress;
  window.updateRadarChart = updateRadarChart;
  window.updateRadarLegend = updateRadarLegend;
  window.updateRangeInfo = updateRangeInfo;
  window.updateStatChange = updateStatChange;
  window.updateTalentResultDisplay = updateTalentResultDisplay;
  window.updateTotalWeightDisplay = updateTotalWeightDisplay;
  window.updateTrendChartByIndex = updateTrendChartByIndex;
  window.updateWeightInputs = updateWeightInputs;
  window.updateYear = updateYear;
  window.updateYearlyStats = updateYearlyStats;
  window.useSearchHistory = useSearchHistory;
  window.useSuggestion = useSuggestion;
  window.viewDynamicDetail = viewDynamicDetail;
  window.viewExpertProfile = viewExpertProfile;
  window.viewInstitutionDetail = viewInstitutionDetail;
  window.viewMoreRecommendations = viewMoreRecommendations;
  window.viewNotificationDetail = viewNotificationDetail;
  window.viewRegionAnalysis = viewRegionAnalysis;
  window.viewRegionDetail = viewRegionDetail;
  window.zoomMap = zoomMap;

  /* ---- script-1：分布 + 指数（前半） ---- */
function navigateTo(pageName, element) {
            // 移除所有submenu-item和submenu-item3的active状态
            document.querySelectorAll('.submenu-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.submenu-item3').forEach(item => {
                item.classList.remove('active');
            });

            // 如果传入了element，则添加active状态
            if (element) {
                element.classList.add('active');
            }

            // 页面跳转
            if (pageName === '科技人才画像') {
                window.__mapGoto('talentList');
            } else if (pageName === '科技人才库') {
                window.__mapGoto('external');
            } else if (pageName === '领域人才分类') {
                window.__mapGoto('talentLibrary');
            } else if (pageName === '人才TOP100') {
                window.__mapGoto('external');
            } else if (pageName === '列表筛选') {
                window.__mapGoto('external');
            } else if (pageName === '科技人才地图') {
                window.__mapGoto('map');
            } else if (pageName === '科技人才动态') {
                window.__mapGoto('external');
            } else if (pageName === '基础研究问题清单') {
                window.__mapGoto('external');
            }
        }

        // 切换顶部导航标签
        function switchTab(tabName, element) {
            // 移除所有导航标签的active状态
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // 为当前点击的标签添加active状态
            element.classList.add('active');

            // 隐藏所有模块内容
            document.querySelectorAll('.module-content').forEach(module => {
                module.classList.remove('active');
            });
            // 显示对应模块
            document.getElementById('module-' + tabName).classList.add('active');
        }

        // 统计卡片筛选
        function filterByStat(type, element) {
            // 切换激活状态
            document.querySelectorAll('.stat-card').forEach(card => {
                card.classList.remove('active');
            });
            element.classList.add('active');

            // 根据类型筛选数据（这里模拟筛选效果）
            console.log('按统计指标筛选：', type);

            // 可以在这里添加实际的数据筛选逻辑
            alert('已按' + type + '类型筛选数据');
        }

        // 分布与动态趋势模块状态
        var currentDistributionProvince = '全国';
        var currentDistributionField = '全部领域';
        var currentDistributionRegionFilter = '全球范围';
        var currentDistributionTimeRange = { start: '2022-01-01', end: '2024-12-31' };
        var currentHotfieldMode = 'aggregate';

        var distributionFieldNameMap = {
            all: '全部领域',
            ai: '人工智能',
            biotech: '生物技术',
            newenergy: '新能源',
            materials: '新材料',
            quantum: '量子技术',
            aerospace: '航空航天',
            marine: '海洋技术',
            information: '信息技术',
            environment: '环境科学',
            manufacturing: '智能制造'
        };

        var hotfieldTrendData = {
            '全部领域': { talent: [82000, 91500, 103800, 116400, 128456], active: [68, 71, 75, 79, 84] },
            '人工智能': { talent: [24800, 29600, 35400, 42100, 48900], active: [72, 76, 81, 87, 92] },
            '生物技术': { talent: [16400, 18200, 21100, 24600, 28600], active: [64, 68, 72, 77, 82] },
            '新能源': { talent: [12600, 14800, 17600, 21300, 25400], active: [61, 67, 73, 79, 85] },
            '新材料': { talent: [11300, 12800, 14900, 17500, 20100], active: [59, 63, 69, 74, 80] },
            '量子技术': { talent: [4200, 5100, 6400, 8200, 10300], active: [55, 61, 68, 76, 86] },
            '航空航天': { talent: [7600, 8200, 9300, 10600, 12100], active: [58, 62, 67, 72, 77] },
            '海洋技术': { talent: [6200, 7100, 8300, 9700, 11200], active: [54, 59, 64, 70, 76] },
            '信息技术': { talent: [21800, 24600, 27900, 31500, 35400], active: [69, 73, 78, 83, 88] },
            '环境科学': { talent: [8800, 9600, 10800, 12100, 13700], active: [52, 57, 63, 68, 73] },
            '智能制造': { talent: [13700, 15800, 18400, 21600, 24900], active: [63, 68, 74, 81, 87] }
        };

        var representativeAchievementData = {
            '全部领域': [
                { title: '国家重点研发计划科技人才协同创新专项', institution: '中国科学院', year: '2024', type: '重大项目' },
                { title: '高端科技人才跨区域协同培养机制研究', institution: '清华大学', year: '2024', type: '研究报告' },
                { title: '面向国家战略的科技人才图谱与评价方法', institution: '北京大学', year: '2023', type: '代表论文' },
                { title: '科技人才流动与创新产出关联分析平台', institution: '浙江大学', year: '2023', type: '平台成果' },
                { title: '战略性新兴产业人才引育白皮书', institution: '中国工程院', year: '2022', type: '咨询成果' }
            ],
            '人工智能': [
                { title: '可信人工智能关键技术与应用示范', institution: '中国科学院自动化所', year: '2024', type: '重大项目' },
                { title: '多模态基础模型安全评测方法', institution: '清华大学', year: '2024', type: '代表论文' },
                { title: '面向复杂场景的智能决策系统', institution: '北京大学', year: '2023', type: '技术成果' },
                { title: '大模型人才协同创新联合实验室', institution: '浙江大学', year: '2023', type: '平台成果' },
                { title: '人工智能产业人才发展年度报告', institution: '中国信息通信研究院', year: '2022', type: '研究报告' }
            ],
            '生物技术': [
                { title: '基因组学数据驱动的精准医疗研究', institution: '上海交通大学', year: '2024', type: '重大项目' },
                { title: '新型生物医药研发平台建设', institution: '中山大学', year: '2024', type: '平台成果' },
                { title: '面向复杂疾病的多组学分析方法', institution: '中国科学院', year: '2023', type: '代表论文' },
                { title: '生物技术成果转化与人才协同机制', institution: '复旦大学', year: '2023', type: '研究报告' },
                { title: '医学人工智能辅助诊断示范应用', institution: '北京大学', year: '2022', type: '技术成果' }
            ],
            '新能源': [
                { title: '新型储能与新能源系统协同优化项目', institution: '中国科学院', year: '2024', type: '重大项目' },
                { title: '固态电池关键材料与界面调控技术', institution: '清华大学', year: '2024', type: '技术成果' },
                { title: '高比例可再生能源消纳路径研究', institution: '浙江大学', year: '2023', type: '研究报告' },
                { title: '智能电网与储能联合实验室', institution: '上海交通大学', year: '2023', type: '平台成果' },
                { title: '新能源产业人才结构与需求预测', institution: '中国工程院', year: '2022', type: '咨询成果' }
            ],
            '新材料': [
                { title: '先进复合材料设计与制备技术', institution: '中国科学院', year: '2024', type: '重大项目' },
                { title: '面向芯片制造的高性能材料体系', institution: '复旦大学', year: '2024', type: '技术成果' },
                { title: '纳米材料绿色制备与规模化应用', institution: '清华大学', year: '2023', type: '代表论文' },
                { title: '新材料产业协同创新平台', institution: '浙江大学', year: '2023', type: '平台成果' },
                { title: '关键材料领域人才发展趋势报告', institution: '中国工程院', year: '2022', type: '研究报告' }
            ]
        };

        function getDistributionFieldName() {
            return currentDistributionField || '全部领域';
        }

        function getDistributionRegionName() {
            if (currentDistributionProvince && currentDistributionProvince !== '全国') return currentDistributionProvince;
            return currentDistributionRegionFilter || '全球范围';
        }

        function notifyDistribution(message, type) {
            if (typeof showToast === 'function') {
                showToast(message, type || 'info');
            } else {
                alert(message);
            }
        }

        function applyDistributionFilters() {
            var region = document.getElementById('regionFilter').value;
            var institution = document.getElementById('institutionFilter').value;
            var field = document.getElementById('fieldFilter').value;
            var talent = document.getElementById('talentFilter').value;
            currentDistributionRegionFilter = document.getElementById('regionFilter').options[document.getElementById('regionFilter').selectedIndex].textContent;
            currentDistributionField = distributionFieldNameMap[field] || '全部领域';
            document.querySelectorAll('.hotfield-tag').forEach(function(tag) {
                tag.classList.toggle('active', currentDistributionField !== '全部领域' && tag.textContent.indexOf(currentDistributionField) !== -1);
            });

            console.log('应用分布筛选条件：', { region, institution, field, talent, time: currentDistributionTimeRange });
            renderRepresentativeAchievements();
            renderHotfieldInsight(getDistributionFieldName());
            notifyDistribution('筛选条件已应用：' + currentDistributionRegionFilter + ' · ' + currentDistributionField, 'success');
        }

        // 重置分布模块筛选条件
        function resetDistributionFilters() {
            document.getElementById('regionFilter').value = 'global';
            document.getElementById('institutionFilter').value = 'all';
            document.getElementById('fieldFilter').value = 'all';
            document.getElementById('talentFilter').value = 'all';
            currentDistributionRegionFilter = '全球范围';
            currentDistributionField = '全部领域';
            currentDistributionProvince = '全国';
            currentDistributionTimeRange = { start: '2022-01-01', end: '2024-12-31' };
            var timeTrigger = document.getElementById('distributionTimeRange');
            if (timeTrigger) timeTrigger.querySelector('span').innerHTML = '<i class="fas fa-calendar-alt"></i> 2022-01-01 至 2024-12-31';
            document.querySelectorAll('.hotfield-tag').forEach(function(tag) { tag.classList.remove('active', 'filtered-out'); });
            var keywordInput = document.getElementById('hotfieldKeywordSearch');
            if (keywordInput) keywordInput.value = '';
            document.querySelectorAll('.stat-card').forEach(function(card) { card.classList.remove('active'); });
            document.querySelectorAll('.province').forEach(function(province) {
                province.classList.remove('active');
                province.style.fill = province.getAttribute('data-base-fill') || '';
            });
            var regionInfoPanel = document.getElementById('regionInfoPanel');
            if (regionInfoPanel) regionInfoPanel.classList.remove('active');
            renderRepresentativeAchievements();
            renderHotfieldInsight('全部领域');
            notifyDistribution('分布筛选条件已重置', 'info');
        }

        // 选择省份/城市
        function selectProvince(provinceName, talentCount, eventArg) {
            // 移除其他省份的激活状态
            document.querySelectorAll('.province').forEach(province => {
                province.classList.remove('active');
            });

            // 激活当前省份
            var target = eventArg && eventArg.target ? eventArg.target : document.querySelector('.province[data-name="' + provinceName + '"]');
            if (target) target.classList.add('active');
            currentDistributionProvince = provinceName;

            // 更新信息面板
            document.getElementById('regionInfoPanel').classList.add('active');
            document.getElementById('regionInfoTitle').textContent = provinceName + ' 详情';
            document.getElementById('regionTalentCount').textContent = talentCount.toLocaleString();
            document.getElementById('regionUniversityCount').textContent = Math.floor(talentCount * 0.05);
            document.getElementById('regionResearchCount').textContent = Math.floor(talentCount * 0.03);
            document.getElementById('regionEnterpriseCount').textContent = Math.floor(talentCount * 0.08);
            document.getElementById('regionInflow').textContent = Math.floor(talentCount * 0.12);
            document.getElementById('regionOutflow').textContent = Math.floor(talentCount * 0.08);
            renderRepresentativeAchievements();

            console.log('选择省份：', provinceName, '人才数：', talentCount);
        }

        // 查看地区详情
        function viewRegionDetail() {
            alert('跳转到地区详情页面');
        }

        // 切换地图视图
        function switchMapView(viewType, element) {
            // 切换按钮状态
            document.querySelectorAll('.map-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            element.classList.add('active');
            var map = document.getElementById('chinaMap');
            if (map) map.classList.toggle('bubble-mode', viewType === 'bubble');

            console.log('切换地图视图：', viewType);

            if (viewType === 'heatmap') {
                // 热力图模式
                document.querySelectorAll('.province').forEach(province => {
                    province.style.stroke = 'rgba(255, 255, 255, .95)';
                    province.style.strokeWidth = '2';
                });
            } else if (viewType === 'bubble') {
                // 气泡图模式
                document.querySelectorAll('.province').forEach(province => {
                    province.style.stroke = '#fff';
                    province.style.strokeWidth = '3';
                });
            }
        }

        // 重置地图
        function resetMap() {
            document.querySelectorAll('.province').forEach(province => {
                province.classList.remove('active');
                province.style.fill = province.getAttribute('data-base-fill') || '';
                province.style.stroke = 'rgba(255, 255, 255, .95)';
                province.style.strokeWidth = '2';
            });

            var map = document.getElementById('chinaMap');
            if (map) map.classList.remove('bubble-mode');
            currentDistributionProvince = '全国';
            renderRepresentativeAchievements();

            document.getElementById('regionInfoPanel').classList.remove('active');

            console.log('地图已重置');
        }

        // 按研究领域筛选
        function filterByField(fieldName, element) {
            // 切换激活状态
            document.querySelectorAll('.hotfield-tag').forEach(tag => {
                tag.classList.remove('active');
            });
            if (element) element.classList.add('active');
            currentDistributionField = fieldName;
            currentDistributionProvince = currentDistributionProvince || '全国';
            var fieldValueMap = {
                '人工智能': 'ai', '生物技术': 'biotech', '新能源': 'newenergy', '新材料': 'materials',
                '量子技术': 'quantum', '航空航天': 'aerospace', '海洋技术': 'marine',
                '信息技术': 'information', '环境科学': 'environment', '智能制造': 'manufacturing'
            };
            var fieldSelect = document.getElementById('fieldFilter');
            if (fieldSelect && fieldValueMap[fieldName]) fieldSelect.value = fieldValueMap[fieldName];
            renderHotfieldInsight(fieldName);
            renderRepresentativeAchievements();
            notifyDistribution('已按【' + fieldName + '】领域筛选数据', 'success');
        }

        function filterHotfieldKeywords(keyword) {
            var normalizedKeyword = (keyword || '').trim().toLowerCase();
            document.querySelectorAll('#hotfieldsCloud .hotfield-tag').forEach(function(tag) {
                var isMatch = !normalizedKeyword || tag.textContent.toLowerCase().indexOf(normalizedKeyword) !== -1;
                tag.classList.toggle('filtered-out', !isMatch);
            });
        }

        function setHotfieldMode(mode, element) {
            currentHotfieldMode = mode;
            document.querySelectorAll('.hotfield-mode-btn').forEach(function(button) {
                button.classList.remove('active');
            });
            if (element) element.classList.add('active');
            renderHotfieldInsight(getDistributionFieldName());
        }

        function renderHotfieldInsight(fieldName) {
            var chart = document.getElementById('hotfieldTrendChart');
            var metricList = document.getElementById('hotfieldMetricList');
            var title = document.getElementById('hotfieldInsightTitle');
            if (!chart || !metricList || !title) return;

            var years = ['2020', '2021', '2022', '2023', '2024'];
            var selectedField = fieldName || '全部领域';
            var selectedData = hotfieldTrendData[selectedField] || hotfieldTrendData['全部领域'];
            title.textContent = selectedField;
            var left = 42, right = 590, top = 17, bottom = 118;
            var xStep = (right - left) / (years.length - 1);
            var maxTalent = Math.max.apply(null, selectedData.talent) * 1.08;
            var point = function(value, index, maxValue) {
                var x = left + xStep * index;
                var y = bottom - (value / maxValue) * (bottom - top);
                return { x: x, y: y };
            };
            var pointsFor = function(values, maxValue) {
                return values.map(function(value, index) {
                    var p = point(value, index, maxValue);
                    return p.x.toFixed(1) + ',' + p.y.toFixed(1);
                }).join(' ');
            };
            var chartHtml = '<svg viewBox="0 0 620 145" preserveAspectRatio="none" aria-label="人才增长与活跃度变化趋势图">';
            [0, .25, .5, .75, 1].forEach(function(ratio) {
                var y = bottom - ratio * (bottom - top);
                chartHtml += '<line x1="' + left + '" y1="' + y + '" x2="' + right + '" y2="' + y + '" stroke="#e8f0f7" stroke-width="1" />';
            });
            years.forEach(function(year, index) {
                var x = left + xStep * index;
                chartHtml += '<text x="' + x + '" y="137" text-anchor="middle" fill="#9aa7b7" font-size="10">' + year + '</text>';
            });

            if (currentHotfieldMode === 'compare') {
                var compareFields = ['人工智能', '生物技术', '新能源', '新材料'];
                var compareColors = ['#1677ff', '#13a8a8', '#fa8c16', '#9254de'];
                compareFields.forEach(function(compareField, fieldIndex) {
                    var compareData = hotfieldTrendData[compareField];
                    var normalizedValues = compareData.talent.map(function(value, index) {
                        return value / Math.max.apply(null, compareData.talent) * 100;
                    });
                    var points = normalizedValues.map(function(value, index) {
                        var p = point(value, index, 108);
                        return p.x.toFixed(1) + ',' + p.y.toFixed(1);
                    }).join(' ');
                    chartHtml += '<polyline points="' + points + '" fill="none" stroke="' + compareColors[fieldIndex] + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".9" />';
                    var last = point(normalizedValues[normalizedValues.length - 1], normalizedValues.length - 1, 108);
                    chartHtml += '<circle cx="' + last.x + '" cy="' + last.y + '" r="3.3" fill="' + compareColors[fieldIndex] + '" />';
                });
                chartHtml += '<text x="42" y="12" fill="#718096" font-size="10">人才规模指数（各领域归一化）</text>';
            } else {
                var talentPoints = pointsFor(selectedData.talent, maxTalent);
                var activePoints = pointsFor(selectedData.active, 100);
                chartHtml += '<polyline points="' + talentPoints + '" fill="none" stroke="#1677ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />';
                chartHtml += '<polyline points="' + activePoints + '" fill="none" stroke="#52c41a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 4" />';
                selectedData.talent.forEach(function(value, index) {
                    var p = point(value, index, maxTalent);
                    chartHtml += '<circle cx="' + p.x + '" cy="' + p.y + '" r="3.2" fill="#fff" stroke="#1677ff" stroke-width="2" />';
                });
                selectedData.active.forEach(function(value, index) {
                    var p = point(value, index, 100);
                    chartHtml += '<circle cx="' + p.x + '" cy="' + p.y + '" r="2.8" fill="#52c41a" />';
                });
                chartHtml += '<text x="42" y="12" fill="#1677ff" font-size="10">人才增长曲线</text><text x="154" y="12" fill="#52c41a" font-size="10">活跃度变化</text>';
            }
            chart.innerHTML = chartHtml + '</svg>';

            var latestTalent = selectedData.talent[selectedData.talent.length - 1];
            var previousTalent = selectedData.talent[selectedData.talent.length - 2];
            var growth = ((latestTalent - previousTalent) / previousTalent * 100).toFixed(1);
            var latestActive = selectedData.active[selectedData.active.length - 1];
            var previousActive = selectedData.active[selectedData.active.length - 2];
            metricList.innerHTML =
                '<div class="hotfield-metric"><div class="hotfield-metric-label">2024人才规模</div><div class="hotfield-metric-value">' + latestTalent.toLocaleString() + '</div></div>' +
                '<div class="hotfield-metric"><div class="hotfield-metric-label">年度增长</div><div class="hotfield-metric-value">+' + growth + '%</div></div>' +
                '<div class="hotfield-metric"><div class="hotfield-metric-label">当前活跃度</div><div class="hotfield-metric-value">' + latestActive + '</div></div>' +
                '<div class="hotfield-metric"><div class="hotfield-metric-label">活跃度变化</div><div class="hotfield-metric-value">+' + (latestActive - previousActive) + ' pts</div></div>';
        }

        function renderRepresentativeAchievements() {
            var container = document.getElementById('representativeAchievements');
            var context = document.getElementById('achievementContext');
            if (!container || !context) return;
            var fieldName = getDistributionFieldName();
            var regionName = getDistributionRegionName();
            var records = representativeAchievementData[fieldName];
            if (!records) {
                records = representativeAchievementData['全部领域'].map(function(record, index) {
                    var generatedTitles = [
                        fieldName + '领域人才协同创新专项',
                        fieldName + '关键技术人才培养与评价研究',
                        fieldName + '前沿人才网络与成果转化机制',
                        fieldName + '跨区域联合实验室建设成果',
                        fieldName + '产业人才发展趋势年度报告'
                    ];
                    return {
                        title: generatedTitles[index],
                        institution: record.institution,
                        year: record.year,
                        type: record.type
                    };
                });
            }
            var displayRegion = regionName === '全国范围' ? '全国' : regionName;
            context.textContent = displayRegion + ' · ' + fieldName;
            container.innerHTML = records.map(function(record) {
                var title = displayRegion === '全国' ? record.title : displayRegion + '·' + record.title;
                return '<div class="achievement-item">' +
                    '<span class="achievement-title" title="' + title + '">' + title + '</span>' +
                    '<div class="achievement-meta"><span><i class="fas fa-building"></i> ' + record.institution + '</span><span class="achievement-type">' + record.type + ' · ' + record.year + '</span></div>' +
                    '</div>';
            }).join('');
        }

        function showDistributionTimeRangeModal() {
            var modal = document.getElementById('distributionTimeModal');
            if (!modal) return;
            document.getElementById('distributionStartDate').value = currentDistributionTimeRange.start;
            document.getElementById('distributionEndDate').value = currentDistributionTimeRange.end;
            modal.classList.add('active');
        }

        function closeDistributionTimeRangeModal() {
            var modal = document.getElementById('distributionTimeModal');
            if (modal) modal.classList.remove('active');
        }

        function applyDistributionTimeRange() {
            var start = document.getElementById('distributionStartDate').value;
            var end = document.getElementById('distributionEndDate').value;
            if (!start || !end) {
                alert('请选择开始日期和结束日期');
                return;
            }
            if (start > end) {
                alert('开始日期不能晚于结束日期');
                return;
            }
            currentDistributionTimeRange = { start: start, end: end };
            var trigger = document.getElementById('distributionTimeRange');
            if (trigger) trigger.querySelector('span').innerHTML = '<i class="fas fa-calendar-alt"></i> ' + start + ' 至 ' + end;
            closeDistributionTimeRangeModal();
            applyDistributionFilters();
        }

        function __domInit_1a() {
            renderHotfieldInsight('全部领域');
            renderRepresentativeAchievements();
        };

        // 查看机构详情
        function viewInstitutionDetail(institutionName) {
            console.log('查看机构详情：', institutionName);

            // 跳转到机构画像页面,传递机构名称参数
            window.__mapGoto('institution', institutionName);
        }

        // 机构排序
        function sortInstitutions(sortBy) {
            console.log('机构排序方式：', sortBy);

            var institutions = [
                { name: '清华大学', talent: 2345, achievement: 5678, influence: 89.5 },
                { name: '北京大学', talent: 2123, achievement: 5234, influence: 88.2 },
                { name: '浙江大学', talent: 1987, achievement: 4876, influence: 87.1 },
                { name: '复旦大学', talent: 1765, achievement: 4321, influence: 86.3 },
                { name: '上海交通大学', talent: 1654, achievement: 4123, influence: 85.8 },
                { name: '中国科学院', talent: 1543, achievement: 3987, influence: 85.2 }
            ];

            // 根据排序维度排序
            if (sortBy === 'talent') {
                institutions.sort(function(a, b) { return b.talent - a.talent; });
            } else if (sortBy === 'achievement') {
                institutions.sort(function(a, b) { return b.achievement - a.achievement; });
            } else if (sortBy === 'influence') {
                institutions.sort(function(a, b) { return b.influence - a.influence; });
            }

            // 更新列表
            var listHtml = institutions.map(function(inst, index) {
                return `
                    <div class="institution-item" onclick="viewInstitutionDetail('${inst.name}')">
                        <span class="institution-rank">${index + 1}</span>
                        <span class="institution-name">${inst.name}</span>
                        <div class="institution-stats">
                            <span class="institution-stat">人才: <b>${inst.talent.toLocaleString()}</b></span>
                            <span class="institution-stat">成果: <b>${inst.achievement.toLocaleString()}</b></span>
                        </div>
                    </div>
                `;
            }).join('');

            var list = document.getElementById('institutionsList');
            list.style.opacity = '0.3';

            setTimeout(function() {
                list.innerHTML = listHtml;
                list.style.opacity = '1';
            }, 300);
        }

        // 显示流动详情
        function showFlowDetail(from, to, count) {
            document.getElementById('flowDetailModal').classList.add('active');
            document.getElementById('flowDetailTitle').textContent = from + ' → ' + to;
            document.getElementById('flowDetailCount').textContent = count.toLocaleString() + ' 人';
            document.getElementById('flowDetailInstitutions').textContent = '主要高校及研究院';
            document.getElementById('flowDetailFields').textContent = '人工智能、生物技术等';

            event.stopPropagation();
        }

        // 关闭流动详情弹窗
        function closeFlowDetailModal() {
            document.getElementById('flowDetailModal').classList.remove('active');
        }

        // 更新流动图表
        function updateFlowChart(type) {
            console.log('更新流动图表类型：', type);
            var timeRange = document.getElementById('flowTimeRange').value;
            alert('已切换到' + type + '流动视图\n当前时间范围：' + timeRange);
            updateFlowData(timeRange);
        }

        // 更新流动数据（根据时间范围）
        function updateFlowData(timeRange) {
            console.log('更新流动数据，时间范围：', timeRange);
            
            // 根据时间范围生成不同的流动数据
            var flowData = getFlowDataByTimeRange(timeRange);
            
            // 更新流动线和数字显示
            updateFlowVisualization(flowData);
        }

        // 根据时间范围获取流动数据
        function getFlowDataByTimeRange(timeRange) {
            // 模拟不同时间范围的流动数据
            var data = {
                '2020-2024': [
                    { from: '北京', to: '上海', count: 1234 },
                    { from: '北京', to: '武汉', count: 876 },
                    { from: '西安', to: '武汉', count: 654 },
                    { from: '西安', to: '成都', count: 543 },
                    { from: '武汉', to: '杭州', count: 765 },
                    { from: '武汉', to: '深圳', count: 987 },
                    { from: '上海', to: '杭州', count: 1123 }
                ],
                '2020-2021': [
                    { from: '北京', to: '上海', count: 520 },
                    { from: '北京', to: '武汉', count: 380 },
                    { from: '西安', to: '武汉', count: 280 },
                    { from: '武汉', to: '深圳', count: 420 }
                ],
                '2021-2022': [
                    { from: '北京', to: '上海', count: 580 },
                    { from: '西安', to: '成都', count: 310 },
                    { from: '武汉', to: '杭州', count: 410 },
                    { from: '上海', to: '杭州', count: 520 }
                ],
                '2022-2023': [
                    { from: '北京', to: '上海', count: 650 },
                    { from: '北京', to: '武汉', count: 420 },
                    { from: '武汉', to: '深圳', count: 510 },
                    { from: '武汉', to: '杭州', count: 480 }
                ],
                '2023-2024': [
                    { from: '北京', to: '上海', count: 720 },
                    { from: '武汉', to: '深圳', count: 580 },
                    { from: '上海', to: '杭州', count: 610 },
                    { from: '西安', to: '成都', count: 320 }
                ]
            };
            
            return data[timeRange] || data['2020-2024'];
        }

        // 更新流动可视化
        function updateFlowVisualization(flowData) {
            console.log('更新流动可视化：', flowData);
            
            // 更新第一条流动线的显示（示例）
            if (flowData.length > 0) {
                var firstFlow = flowData[0];
                var flowLines = document.querySelectorAll('.flow-line');
                if (flowLines.length > 0) {
                    flowLines[0].onclick = function() {
                        showFlowDetail(firstFlow.from, firstFlow.to, firstFlow.count);
                    };
                    var flowNumber = flowLines[0].querySelector('.flow-number');
                    if (flowNumber) {
                        flowNumber.textContent = firstFlow.count.toLocaleString();
                    }
                }
            }
            
            showToast('已更新流动数据（' + flowData.length + '条流动路径）', 'info');
        }

        // 更新流动时间范围
        function updateFlowTimeRange(value) {
            if (value === 'custom') {
                // 显示自定义时间范围弹窗
                document.getElementById('customTimeModal').classList.add('active');
            } else {
                // 直接更新流动数据
                updateFlowData(value);
                showToast('时间范围已切换至：' + value, 'info');
            }
        }

        // 关闭自定义时间范围弹窗
        function closeCustomTimeModal() {
            document.getElementById('customTimeModal').classList.remove('active');
            // 重置选择器为当前值
            document.getElementById('flowTimeRange').value = '2020-2024';
        }

        // 应用自定义时间范围
        function applyCustomTimeRange() {
            var startYear = document.getElementById('startYear').value;
            var endYear = document.getElementById('endYear').value;
            
            if (parseInt(startYear) > parseInt(endYear)) {
                alert('开始年份不能大于结束年份');
                return;
            }
            
            var timeRange = startYear + '-' + endYear;
            document.getElementById('customTimeModal').classList.remove('active');
            
            // 更新选择器显示（可选）
            showToast('已应用自定义时间范围：' + timeRange, 'success');
            
            // 更新流动数据
            updateFlowData(timeRange);
        }

        // 时间轴播放控制
        var isPlaying = false;
        var playInterval = null;
        var playSpeed = 1000; // 默认1秒切换一次

        function togglePlay() {
            var btn = document.getElementById('playBtn');
            isPlaying = !isPlaying;

            if (isPlaying) {
                btn.innerHTML = '<i class="fas fa-pause"></i>';
                btn.classList.add('playing');
                document.getElementById('animationStatus').textContent = '播放中...';
                startPlay();
            } else {
                btn.innerHTML = '<i class="fas fa-play"></i>';
                btn.classList.remove('playing');
                document.getElementById('animationStatus').textContent = '已暂停';
                stopPlay();
            }
        }

        function startPlay() {
            var currentYear = parseInt(document.getElementById('timelineSlider').value);
            var maxYear = 2024;
            var minYear = 2020;

            playInterval = __mapSetInterval(function() {
                if (currentYear >= maxYear) {
                    currentYear = minYear;
                } else {
                    currentYear++;
                }
                document.getElementById('timelineSlider').value = currentYear;
                updateYear(currentYear);
            }, playSpeed);
        }

        function stopPlay() {
            if (playInterval) {
                clearInterval(playInterval);
                playInterval = null;
            }
        }

        // 设置播放速度
        function setSpeed(speed, element) {
            playSpeed = speed;

            // 更新按钮状态
            document.querySelectorAll('.timeline-speed-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            element.classList.add('active');

            // 如果正在播放,重新启动以应用新速度
            if (isPlaying) {
                stopPlay();
                startPlay();
            }

            console.log('设置播放速度：', speed + 'ms');
        }

        function updateYear(year) {
            document.getElementById('currentYear').textContent = year + '年';
            document.querySelectorAll('.timeline-year').forEach(y => {
                y.classList.remove('active');
                if (y.textContent === year.toString()) {
                    y.classList.add('active');
                }
            });

            console.log('更新年份：', year);

            // 模拟数据更新 - 根据年份生成不同的人才分布
            updateDataByYear(year);
        }

        // 根据年份更新数据
        function updateDataByYear(year) {
            var yearMultiplier = (year - 2019) / 5; // 2020=0.2, 2024=1.0

            // 更新地图省份颜色深浅(模拟人才分布变化)
            var provinces = document.querySelectorAll('.province');
            var baseOpacities = {
                '北京': 0.3, '天津': 0.2, '河北': 0.25, '山东': 0.4,
                '江苏': 0.35, '上海': 0.38, '浙江': 0.3, '山西': 0.2,
                '河南': 0.28, '湖北': 0.25, '湖南': 0.22, '江西': 0.3,
                '福建': 0.2, '广东': 0.3
            };

            provinces.forEach(function(province) {
                var provinceName = province.getAttribute('data-name') || province.textContent.trim();
                var baseOpacity = baseOpacities[provinceName] || 0.25;
                var opacity = baseOpacity * yearMultiplier;
                province.style.fill = 'rgba(24, 144, 255, ' + opacity.toFixed(2) + ')';
            });

            renderRepresentativeAchievements();

            // 更新统计卡片数值
            var stats = {
                total: Math.floor(100000 * yearMultiplier + 20000),
                institutions: Math.floor(3000 * yearMultiplier + 500),
                growth: (10 + yearMultiplier * 6).toFixed(1),
                fields: Math.floor(40 * yearMultiplier + 10),
                mobility: (25 - yearMultiplier * 3).toFixed(1)
            };

            document.querySelectorAll('.stat-card-value').forEach(function(valueEl, index) {
                var keys = ['total', 'institutions', 'growth', 'fields', 'mobility'];
                var key = keys[index];
                if (key) {
                    var value = stats[key];
                    if (key === 'growth' || key === 'mobility') {
                        valueEl.textContent = value + '%';
                    } else {
                        valueEl.textContent = value.toLocaleString();
                    }
                }
            });

            // 更新机构排名
            var institutions = [
                { name: '清华大学', baseTalent: 2345 },
                { name: '北京大学', baseTalent: 2123 },
                { name: '浙江大学', baseTalent: 1987 },
                { name: '复旦大学', baseTalent: 1765 },
                { name: '上海交通大学', baseTalent: 1654 },
                { name: '中国科学院', baseTalent: 1543 }
            ];

            var listHtml = institutions.map(function(inst, index) {
                var talent = Math.floor(inst.baseTalent * yearMultiplier);
                var achievement = Math.floor(talent * 2.5);
                return `
                    <div class="institution-item" onclick="viewInstitutionDetail('${inst.name}')">
                        <span class="institution-rank">${index + 1}</span>
                        <span class="institution-name">${inst.name}</span>
                        <div class="institution-stats">
                            <span class="institution-stat">人才: <b>${talent.toLocaleString()}</b></span>
                            <span class="institution-stat">成果: <b>${achievement.toLocaleString()}</b></span>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('institutionsList').innerHTML = listHtml;
        }

        function selectYear(year) {
            document.getElementById('timelineSlider').value = year;
            updateYear(year);

            // 如果正在播放,暂停并跳转到选中年份
            if (isPlaying) {
                togglePlay();
            }
        }

        // 导出数据
        function exportData(format) {
            console.log('导出数据格式：', format);

            var formatNames = {
                'excel': 'Excel表格',
                'csv': 'CSV格式',
                'pdf': 'PDF报告',
                'report': '可视化报告'
            };

            alert('正在生成' + formatNames[format] + '...');
            setTimeout(function() {
                alert(formatNames[format] + '已导出！');
            }, 1000);
        }

        // 对比分析弹窗
        var selectedRegions = [];
        var selectedInstitutions = [];

        function showCompareModal() {
            document.getElementById('compareModal').classList.add('active');
        }

        function closeCompareModal() {
            document.getElementById('compareModal').classList.remove('active');
        }

        // 快速筛选标签切换
        function toggleQuickFilter(checkbox) {
            var filterTag = checkbox.closest('.quick-filter-tag');

            if (checkbox.checked) {
                filterTag.classList.add('active');
                console.log('启用快速筛选:', checkbox.value);

                // 根据选择的快速筛选标签,自动设置下拉框的值
                if (checkbox.value === 'university-talent') {
                    document.getElementById('institutionFilter').value = 'university';
                } else if (checkbox.value === 'newenergy-talent') {
                    document.getElementById('fieldFilter').value = 'newenergy';
                } else if (checkbox.value === 'ai-talent') {
                    document.getElementById('fieldFilter').value = 'ai';
                } else if (checkbox.value === 'biotech-talent') {
                    document.getElementById('fieldFilter').value = 'biotech';
                } else if (checkbox.value === 'leadership-talent') {
                    document.getElementById('talentFilter').value = 'leadership';
                } else if (checkbox.value === 'research-talent') {
                    document.getElementById('institutionFilter').value = 'research';
                }

                applyDistributionFilters();
            } else {
                filterTag.classList.remove('active');
                console.log('取消快速筛选:', checkbox.value);
            }
        }

        // 切换对比项目
        function toggleCompareItem(type, name, element) {
            var list = type === 'region' ? selectedRegions : selectedInstitutions;
            var index = list.indexOf(name);

            if (index > -1) {
                list.splice(index, 1);
                element.classList.remove('selected');
            } else {
                if (list.length >= 2) {
                    alert('最多只能选择2个对象进行对比');
                    return;
                }
                list.push(name);
                element.classList.add('selected');
            }

            console.log('已选择的' + (type === 'region' ? '地区' : '机构') + ':', list);
        }

        // 生成对比结果
        function generateCompareResult() {
            if (selectedRegions.length + selectedInstitutions.length < 2) {
                alert('请至少选择2个对比对象');
                return;
            }

            // 获取对比对象数据
            var items = [...selectedRegions, ...selectedInstitutions];
            var compareData = items.map(function(item) {
                return {
                    name: item,
                    talent: Math.floor(Math.random() * 10000) + 5000,
                    achievements: Math.floor(Math.random() * 5000) + 2000,
                    influence: (Math.random() * 30 + 70).toFixed(1),
                    growth: (Math.random() * 20 + 5).toFixed(1),
                    projects: Math.floor(Math.random() * 500) + 100,
                    papers: Math.floor(Math.random() * 3000) + 1000
                };
            });

            // 更新表头
            document.getElementById('compareHeader1').textContent = compareData[0].name;
            document.getElementById('compareHeader2').textContent = compareData[1].name;

            // 生成柱状图
            var maxTalent = Math.max(compareData[0].talent, compareData[1].talent);
            var chartHtml = compareData.map(function(item) {
                var height = (item.talent / maxTalent) * 180;
                return `
                    <div class="compare-bar-group">
                        <div class="compare-bar" style="height: ${height}px;" data-value="${item.talent.toLocaleString()}"></div>
                        <div class="compare-bar-label">${item.name}</div>
                    </div>
                `;
            }).join('');
            document.getElementById('compareChart').innerHTML = chartHtml;

            // 生成对比表格
            var metrics = [
                { key: 'talent', label: '人才总数' },
                { key: 'achievements', label: '成果数量' },
                { key: 'influence', label: '影响力指数' },
                { key: 'growth', label: '年增长率(%)' },
                { key: 'projects', label: '科研项目' },
                { key: 'papers', label: '论文数量' }
            ];

            var tableBodyHtml = metrics.map(function(metric) {
                var value1 = compareData[0][metric.key];
                var value2 = compareData[1][metric.key];
                var diff = (value2 - value1).toFixed(1);
                var diffClass = diff > 0 ? 'compare-diff-up' : (diff < 0 ? 'compare-diff-down' : '');
                var diffIcon = diff > 0 ? '↑' : (diff < 0 ? '↓' : '-');

                return `
                    <tr>
                        <td>${metric.label}</td>
                        <td class="${parseFloat(value1) > parseFloat(value2) ? 'compare-highlight' : ''}">${typeof value1 === 'number' ? value1.toLocaleString() : value1}</td>
                        <td class="${parseFloat(value2) > parseFloat(value1) ? 'compare-highlight' : ''}">${typeof value2 === 'number' ? value2.toLocaleString() : value2}</td>
                        <td class="${diffClass}">${diffIcon} ${Math.abs(diff)}</td>
                    </tr>
                `;
            }).join('');

            document.getElementById('compareTableBody').innerHTML = tableBodyHtml;

            // 显示对比结果
            document.getElementById('compareResultSection').style.display = 'block';
            document.getElementById('compareResultSection').scrollIntoView({ behavior: 'smooth' });
        }

        // 导出对比结果
        function exportCompareResult() {
            alert('正在生成对比分析报告...\n报告已导出为PDF格式');
        }

        // 重置对比
        function resetCompare() {
            selectedRegions = [];
            selectedInstitutions = [];

            // 清除所有选中状态
            document.querySelectorAll('.compare-select-item').forEach(function(item) {
                item.classList.remove('selected');
            });

            // 隐藏对比结果
            document.getElementById('compareResultSection').style.display = 'none';
        }

        // 点击弹窗外部关闭
        document.addEventListener('click', function(event) {
            var flowModal = document.getElementById('flowDetailModal');
            if (flowModal.classList.contains('active') && !flowModal.contains(event.target)) {
                flowModal.classList.remove('active');
            }

            var compareModal = document.getElementById('compareModal');
            if (event.target === compareModal) {
                closeCompareModal();
            }

            var drilldownModal = document.getElementById('drilldownModal');
            if (event.target === drilldownModal) {
                closeDrilldownModal();
            }
        });

        // 双击省份下钻查看详情
        function drilldownProvince(provinceName, eventArg) {
            var actionEvent = eventArg || window.event;
            if (actionEvent) {
                actionEvent.preventDefault();
                actionEvent.stopPropagation();
            }

            console.log('下钻查看省份详情：', provinceName);

            // 生成模拟数据
            var provinceData = generateProvinceData(provinceName);

            // 填充数据到弹窗
            fillDrilldownData(provinceName, provinceData);

            // 显示弹窗
            document.getElementById('drilldownModal').classList.add('active');
        }

        // 生成省份数据（模拟）
        function generateProvinceData(provinceName) {
            var base = Math.floor(Math.random() * 5000) + 3000;

            return {
                totalTalent: base,
                universities: Math.floor(base * 0.4),
                research: Math.floor(base * 0.35),
                enterprises: Math.floor(base * 0.25),
                universityCount: Math.floor(Math.random() * 50) + 20,
                researchCount: Math.floor(Math.random() * 30) + 10,
                enterpriseCount: Math.floor(Math.random() * 100) + 50,
                universitiesList: [
                    { name: provinceName + '大学', talents: Math.floor(base * 0.15), achievements: Math.floor(base * 0.3) },
                    { name: provinceName + '理工大学', talents: Math.floor(base * 0.12), achievements: Math.floor(base * 0.25) },
                    { name: provinceName + '师范大学', talents: Math.floor(base * 0.08), achievements: Math.floor(base * 0.18) }
                ],
                researchList: [
                    { name: provinceName + '科学院', talents: Math.floor(base * 0.15), achievements: Math.floor(base * 0.2) },
                    { name: provinceName + '科技研究院', talents: Math.floor(base * 0.1), achievements: Math.floor(base * 0.15) },
                    { name: provinceName + '技术研究所', talents: Math.floor(base * 0.1), achievements: Math.floor(base * 0.12) }
                ],
                enterpriseList: [
                    { name: provinceName + '科技集团', talents: Math.floor(base * 0.1), achievements: Math.floor(base * 0.15) },
                    { name: provinceName + '创新公司', talents: Math.floor(base * 0.08), achievements: Math.floor(base * 0.1) },
                    { name: provinceName + '产业公司', talents: Math.floor(base * 0.07), achievements: Math.floor(base * 0.08) }
                ],
                fields: ['人工智能', '生物技术', '新材料', '新能源', '信息技术', '智能制造']
            };
        }

        // 填充下钻数据
        function fillDrilldownData(provinceName, data) {
            // 标题
            document.getElementById('drilldownTitle').textContent = provinceName + ' - 人才构成详情';

            // 统计卡片
            document.getElementById('drilldownTotalTalent').textContent = data.totalTalent.toLocaleString();
            document.getElementById('drilldownUniversities').textContent = data.universityCount;
            document.getElementById('drilldownResearch').textContent = data.researchCount;
            document.getElementById('drilldownEnterprises').textContent = data.enterpriseCount;

            // 饼图百分比
            var universityPercent = Math.round((data.universities / data.totalTalent) * 100);
            var researchPercent = Math.round((data.research / data.totalTalent) * 100);
            var enterprisePercent = Math.round((data.enterprises / data.totalTalent) * 100);

            document.getElementById('drilldownUniversityPercent').textContent = universityPercent + '%';
            document.getElementById('drilldownResearchPercent').textContent = researchPercent + '%';
            document.getElementById('drilldownEnterprisePercent').textContent = enterprisePercent + '%';

            // 更新饼图
            updatePieChart(universityPercent, researchPercent, enterprisePercent);

            // 高校列表
            var universitiesHtml = data.universitiesList.map(function(inst) {
                return `
                    <div class="drilldown-institution-card" onclick="viewInstitutionDetail('${inst.name}')">
                        <div class="drilldown-institution-type university">高校</div>
                        <div class="drilldown-institution-name">${inst.name}</div>
                        <div class="drilldown-institution-stats">
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.talents}</div>
                                <div class="drilldown-institution-stat-label">人才数</div>
                            </div>
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.achievements}</div>
                                <div class="drilldown-institution-stat-label">成果数</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            document.getElementById('drilldownUniversitiesList').innerHTML = universitiesHtml;

            // 研究院列表
            var researchHtml = data.researchList.map(function(inst) {
                return `
                    <div class="drilldown-institution-card" onclick="viewInstitutionDetail('${inst.name}')">
                        <div class="drilldown-institution-type research">研究院</div>
                        <div class="drilldown-institution-name">${inst.name}</div>
                        <div class="drilldown-institution-stats">
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.talents}</div>
                                <div class="drilldown-institution-stat-label">人才数</div>
                            </div>
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.achievements}</div>
                                <div class="drilldown-institution-stat-label">成果数</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            document.getElementById('drilldownResearchList').innerHTML = researchHtml;

            // 企业列表
            var enterpriseHtml = data.enterpriseList.map(function(inst) {
                return `
                    <div class="drilldown-institution-card" onclick="viewInstitutionDetail('${inst.name}')">
                        <div class="drilldown-institution-type enterprise">企业</div>
                        <div class="drilldown-institution-name">${inst.name}</div>
                        <div class="drilldown-institution-stats">
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.talents}</div>
                                <div class="drilldown-institution-stat-label">人才数</div>
                            </div>
                            <div class="drilldown-institution-stat">
                                <div class="drilldown-institution-stat-value">${inst.achievements}</div>
                                <div class="drilldown-institution-stat-label">成果数</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            document.getElementById('drilldownEnterprisesList').innerHTML = enterpriseHtml;

            // 研究领域标签
            var fieldsHtml = data.fields.map(function(field) {
                return `<div class="drilldown-field-tag">${field}</div>`;
            }).join('');
            document.getElementById('drilldownFieldTags').innerHTML = fieldsHtml;
        }

        // 更新饼图
        function updatePieChart(universityPercent, researchPercent, enterprisePercent) {
            var total = 100;
            var circumference = 2 * Math.PI * 80; // 251.2

            var universityDash = (universityPercent / 100) * circumference;
            var researchDash = (researchPercent / 100) * circumference;
            var enterpriseDash = (enterprisePercent / 100) * circumference;

            var universityOffset = 0;
            var researchOffset = universityDash;
            var enterpriseOffset = universityDash + researchDash;

            var svg = document.getElementById('drilldownPieChart');
            svg.innerHTML = `
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1890ff" stroke-width="30"
                        stroke-dasharray="${universityDash} ${circumference}" stroke-dashoffset="0"
                        transform="rotate(-90 100 100)"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#52c41a" stroke-width="30"
                        stroke-dasharray="${researchDash} ${circumference}" stroke-dashoffset="-${universityDash}"
                        transform="rotate(-90 100 100)"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#fa8c16" stroke-width="30"
                        stroke-dasharray="${enterpriseDash} ${circumference}" stroke-dashoffset="-${universityDash + researchDash}"
                        transform="rotate(-90 100 100)"/>
                    <circle cx="100" cy="100" r="50" fill="#fff"/>
                    <text x="100" y="95" text-anchor="middle" font-size="24" font-weight="bold" fill="#333">${universityPercent}%</text>
                    <text x="100" y="115" text-anchor="middle" font-size="12" fill="#999">高校占比</text>
                </svg>
            `;
        }

        // 关闭下钻详情弹窗
        function closeDrilldownModal() {
            document.getElementById('drilldownModal').classList.remove('active');
        }

        // 导出下钻数据
        function exportDrilldownData(format) {
            var formatNames = {
                'excel': 'Excel表格',
                'pdf': 'PDF报告'
            };

            alert('正在生成' + formatNames[format] + '...');
            setTimeout(function() {
                alert(formatNames[format] + '已导出！');
            }, 1000);
        }

        // ==================== 人才指数模块功能 ====================

        // (1) 综合指数概览区 - 点击指标卡片筛选
        function filterByIndex(indexType, element) {
            // 切换激活状态
            document.querySelectorAll('.index-card').forEach(card => {
                card.classList.remove('active');
            });
            element.classList.add('active');

            console.log('按指标筛选：', indexType);

            // 更新趋势图表,仅显示该指标
            updateTrendChartByIndex(indexType);

            // 显示提示
            var indexNames = {
                'talent': '人才总量指数',
                'output': '科研产出指数',
                'influence': '学术影响力指数',
                'contribution': '产业贡献度指数',
                'mobility': '流动活跃度指数'
            };
            alert('已切换至【' + indexNames[indexType] + '】视图');
        }

        // 显示指标信息
        function showIndexInfo(indexType) {
            var infoData = {
                'talent': {
                    title: '人才总量指数',
                    formula: '区域内高层次人才数量 / 全国总量 × 100',
                    weight: '30%',
                    source: '人才数据库'
                },
                'output': {
                    title: '科研产出指数',
                    formula: '论文数×0.4 + 专利数×0.3 + 项目数×0.3',
                    weight: '25%',
                    source: '科研数据库'
                },
                'influence': {
                    title: '学术影响力指数',
                    formula: '引用次数×0.5 + h指数×0.3 + 奖项数×0.2',
                    weight: '20%',
                    source: '学术数据库'
                },
                'contribution': {
                    title: '产业贡献度指数',
                    formula: '产学研项目×0.4 + 技术转化×0.3 + 企业合作×0.3',
                    weight: '15%',
                    source: '产业数据库'
                },
                'mobility': {
                    title: '流动活跃度指数',
                    formula: '流入率×0.5 + 流出率×0.3 + 流动频次×0.2',
                    weight: '10%',
                    source: '流动监测数据库'
                }
            };

            var info = infoData[indexType];
            alert(info.title + '\n\n计算方式：' + info.formula + '\n指标权重：' + info.weight + '\n数据来源：' + info.source);
        }

        // 显示指数Tooltip
        function showIndexTooltip(card, indexType) {
            var tooltip = card.querySelector('.index-tooltip');
            if (tooltip) {
                tooltip.style.display = 'block';
            }
        }

        // 隐藏指数Tooltip
        function hideIndexTooltip() {
            var tooltips = document.querySelectorAll('.index-tooltip');
            tooltips.forEach(function(tooltip) {
                tooltip.style.display = 'none';
            });
        }

        // (2) 指标权重设置面板
        function showWeightSettings() {
            var weights = prompt('请设置各项指标权重（用逗号分隔，总和需为100）：\n人才总量,科研产出,学术影响,产业贡献,流动活跃\n\n当前权重：30,25,20,15,10');

            if (weights) {
                var weightArray = weights.split(',').map(w => parseInt(w.trim()));
                var total = weightArray.reduce((a, b) => a + b, 0);

                if (total !== 100) {
                    alert('权重总和必须等于100%，当前总和为' + total + '%');
                    return;
                }

                // 更新权重显示
                var labels = ['人才总量', '科研产出', '学术影响力', '产业贡献度', '流动活跃度'];
                var weightItems = document.querySelectorAll('.weight-item');

                weightItems.forEach((item, index) => {
                    if (weightArray[index]) {
                        var bar = item.querySelector('.weight-bar-fill');
                        var value = item.querySelector('.weight-value');
                        if (bar) bar.style.width = weightArray[index] + '%';
                        if (value) value.textContent = weightArray[index] + '%';
                    }
                });

                alert('权重设置已更新！');
            }
        }

        // (3) 趋势分析图表区
        function switchChartType(type, element) {
            // 切换按钮状态
            document.querySelectorAll('.chart-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            element.classList.add('active');

            // 重新渲染图表
            renderTrendChart(type);
        }

        function toggleLegend(metric, element) {
            element.classList.toggle('active');
            var isActive = element.classList.contains('active');

            // 更新图表显示
            console.log('切换指标显示：', metric, isActive ? '显示' : '隐藏');

            // 重新渲染图表
            var currentType = document.querySelector('.chart-btn.active')?.textContent === '柱状图' ? 'bar' : 'line';
            renderTrendChart(currentType);
        }

        function updateTrendChartByIndex(indexType) {
            // 根据选中的指标更新图表
            renderTrendChart('line');
        }

        function renderTrendChart(type) {
            var canvas = document.getElementById('trendChartCanvas');
            if (!canvas) return;

            // 完整数据（2020-2024）
            var allYears = ['2020', '2021', '2022', '2023', '2024'];
            var allData = {
                total: [75.2, 78.5, 82.1, 86.3, 92.5],
                talent: [70.1, 73.5, 77.2, 81.8, 85.6],
                output: [72.3, 75.8, 79.5, 83.2, 88.7],
                influence: [68.5, 71.2, 74.8, 79.1, 85.3],
                contribution: [65.2, 68.7, 72.3, 75.9, 79.8],
                mobility: [71.8, 73.2, 74.5, 75.8, 76.4]
            };

            // 根据选择的时间区间过滤数据
            var years = allYears;
            var data = allData;

            if (window.selectedTimeRange) {
                var range = window.selectedTimeRange;
                var startIndex = allYears.indexOf(range.start.toString());
                var endIndex = allYears.indexOf(range.end.toString());

                if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
                    years = allYears.slice(startIndex, endIndex + 1);
                    data = {};

                    for (var key in allData) {
                        data[key] = allData[key].slice(startIndex, endIndex + 1);
                    }
                }
            }

            var colors = {
                total: '#1890ff',
                talent: '#52c41a',
                output: '#fa8c16',
                influence: '#eb2f96',
                contribution: '#722ed1',
                mobility: '#13c2c2'
            };

            // 获取激活的图例
            var activeMetrics = [];
            document.querySelectorAll('.legend-item.active').forEach(item => {
                activeMetrics.push(item.dataset.metric);
            });

            if (type === 'line') {
                // 渲染折线图
                var svgContent = `
                    <svg width="100%" height="300" viewBox="0 0 600 300">
                        <!-- 网格线 -->
                        ${years.map((_, i) => `<line x1="${60 + i * (540 / (years.length - 1) || 540)}" y1="20" x2="${60 + i * (540 / (years.length - 1) || 540)}" y2="250" stroke="#f0f0f0" stroke-width="1"/>`).join('')}
                        ${[0, 50, 100].map(y => `<line x1="60" y1="${250 - y * 2.3}" x2="540" y2="${250 - y * 2.3}" stroke="#f0f0f0" stroke-width="1"/>`).join('')}

                        <!-- X轴标签 -->
                        ${years.map((year, i) => `<text x="${60 + i * (540 / (years.length - 1) || 540)}" y="275" text-anchor="middle" font-size="12" fill="#666">${year}</text>`).join('')}

                        <!-- Y轴标签 -->
                        ${[0, 50, 100].map(y => `<text x="50" y="${255 - y * 2.3}" text-anchor="end" font-size="12" fill="#666">${y}</text>`).join('')}

                        <!-- 折线 -->
                        ${activeMetrics.map(metric => {
                            var points = data[metric].map((val, i) => `${60 + i * (540 / (years.length - 1) || 540)},${250 - val * 2.3}`).join(' ');
                            return `<polyline points="${points}" fill="none" stroke="${colors[metric]}" stroke-width="2"/>`;
                        }).join('')}

                        <!-- 数据点 -->
                        ${activeMetrics.map(metric => {
                            return data[metric].map((val, i) => {
                                var allYearIndex = allYears.indexOf(years[i]);
                                var previousValue = allYearIndex > 0 ? allData[metric][allYearIndex - 1] : null;
                                var growth = previousValue ? (((val - previousValue) / previousValue) * 100).toFixed(1) + '%' : '—';
                                return `<circle cx="${60 + i * (540 / (years.length - 1) || 540)}" cy="${250 - val * 2.3}" r="4" fill="${colors[metric]}" stroke="#fff" stroke-width="2" data-year="${years[i]}" data-metric="${metric}" data-value="${val.toFixed(1)}" data-growth="${growth}" onmouseenter="showIndexTrendTooltip(event, this)" onmouseleave="hideIndexTrendTooltip()"><title>${years[i]}年 · ${val.toFixed(1)}分 · 同比${growth}</title></circle>`;
                            }).join('');
                        }).join('')}

                        <!-- 数据点数值标签 -->
                        ${activeMetrics.map(metric => {
                            return data[metric].map((val, i) =>
                                `<text x="${60 + i * (540 / (years.length - 1) || 540)}" y="${240 - val * 2.3}" text-anchor="middle" font-size="11" fill="#666">${val.toFixed(1)}</text>`
                            ).join('');
                        }).join('')}
                    </svg>
                `;
                canvas.innerHTML = svgContent;
            } else {
                // 渲染柱状图
                var barWidth = 15;
                var groupWidth = activeMetrics.length * barWidth + 10;
                var svgContent = `
                    <svg width="100%" height="300" viewBox="0 0 600 300">
                        <!-- 网格线 -->
                        ${[0, 50, 100].map(y => `<line x1="60" y1="${250 - y * 2.3}" x2="540" y2="${250 - y * 2.3}" stroke="#f0f0f0" stroke-width="1"/>`).join('')}

                        <!-- X轴标签 -->
                        ${years.map((year, i) => `<text x="${90 + i * (450 / (years.length - 1) || 450)}" y="275" text-anchor="middle" font-size="12" fill="#666">${year}</text>`).join('')}

                        <!-- Y轴标签 -->
                        ${[0, 50, 100].map(y => `<text x="50" y="${255 - y * 2.3}" text-anchor="end" font-size="12" fill="#666">${y}</text>`).join('')}

                        <!-- 柱状图 -->
                        ${years.map((year, yearIndex) => {
                            return activeMetrics.map((metric, metricIndex) => {
                                var val = data[metric][yearIndex];
                                var x = 60 + yearIndex * (450 / (years.length - 1) || 450) + metricIndex * barWidth;
                                var height = val * 2.3;
                                var y = 250 - height;
                                var allYearIndex = allYears.indexOf(year);
                                var previousValue = allYearIndex > 0 ? allData[metric][allYearIndex - 1] : null;
                                var growth = previousValue ? (((val - previousValue) / previousValue) * 100).toFixed(1) + '%' : '—';
                                return `<rect x="${x}" y="${y}" width="${barWidth - 2}" height="${height}" fill="${colors[metric]}" rx="2" data-year="${year}" data-metric="${metric}" data-value="${val.toFixed(1)}" data-growth="${growth}" onmouseenter="showIndexTrendTooltip(event, this)" onmouseleave="hideIndexTrendTooltip()"><title>${year}年 · ${val.toFixed(1)}分 · 同比${growth}</title></rect>`;
                            }).join('');
                        }).join('')}

                        <!-- 柱状图数值标签 -->
                        ${years.map((year, yearIndex) => {
                            return activeMetrics.map((metric, metricIndex) => {
                                var val = data[metric][yearIndex];
                                var x = 60 + yearIndex * (450 / (years.length - 1) || 450) + metricIndex * barWidth + (barWidth - 2) / 2;
                                var y = 250 - val * 2.3 - 15;
                                return `<text x="${x}" y="${y}" text-anchor="middle" font-size="10" fill="#666">${val.toFixed(1)}</text>`;
                            }).join('');
                        }).join('')}
                    </svg>
                `;
                canvas.innerHTML = svgContent;
            }
        }

        // 应用预设时间区间
        function applyTimeRange() {
            var select = document.getElementById('timeRangeSelect');
            var value = select.value;

            if (value === 'all') {
                window.selectedTimeRange = { start: 2020, end: 2024 };
                updateRangeInfo('全部年份 (2020-2024)');
            } else {
                var range = value.split('-');
                window.selectedTimeRange = {
                    start: parseInt(range[0]),
                    end: parseInt(range[1])
                };
                updateRangeInfo(value.replace('-', '-'));
            }

            // 同步自定义区间选择器
            document.getElementById('startYear').value = window.selectedTimeRange.start;
            document.getElementById('endYear').value = window.selectedTimeRange.end;

            // 重新渲染图表
            var currentType = document.querySelector('.chart-btn.active')?.textContent === '柱状图' ? 'bar' : 'line';
            renderTrendChart(currentType);
        }

        // 应用自定义时间区间
        function applyCustomRange() {
            var startYear = parseInt(document.getElementById('startYear').value);
            var endYear = parseInt(document.getElementById('endYear').value);

            if (startYear > endYear) {
                alert('开始年份不能大于结束年份！');
                return;
            }

            window.selectedTimeRange = { start: startYear, end: endYear };
            updateRangeInfo(`${startYear}-${endYear}年`);

            // 将预设选择器设为custom
            document.getElementById('timeRangeSelect').value = 'custom';

            // 重新渲染图表
            var currentType = document.querySelector('.chart-btn.active')?.textContent === '柱状图' ? 'bar' : 'line';
            renderTrendChart(currentType);
        }

        // 更新自定义区间时重置预设选择器
        function updateCustomRange() {
            document.getElementById('timeRangeSelect').value = 'custom';
        }

        // 更新时间区间信息显示
        function updateRangeInfo(text) {
            var rangeInfo = document.getElementById('rangeInfo');
            rangeInfo.querySelector('span').textContent = '当前显示：' + text;
        }

        // (4) 指标对比雷达图区
        // 区域对比数据
        var regionCompareData = {
            '北京': {
                talentCount: 15432,
                researchOutput: 88.3,
                academicImpact: 90.1,
                industryContribution: 85.6,
                mobility: 78.4,
                dimensions: [92, 88, 90, 85, 78],
                institutions: [
                    { name: '清华大学', count: 3421 },
                    { name: '北京大学', count: 2897 },
                    { name: '中科院', count: 4125 }
                ],
                industries: [
                    { name: '人工智能', score: 92.5 },
                    { name: '信息技术', score: 88.3 },
                    { name: '生物医药', score: 85.2 }
                ]
            },
            '上海': {
                talentCount: 15678,
                researchOutput: 85.7,
                academicImpact: 87.2,
                industryContribution: 88.1,
                mobility: 82.3,
                dimensions: [89, 85, 87, 88, 82],
                institutions: [
                    { name: '复旦大学', count: 2654 },
                    { name: '上海交通大学', count: 2891 },
                    { name: '中科院上海分院', count: 1987 }
                ],
                industries: [
                    { name: '集成电路', score: 89.5 },
                    { name: '生物医药', score: 87.3 },
                    { name: '人工智能', score: 86.8 }
                ]
            },
            '江苏': {
                talentCount: 18765,
                researchOutput: 80.2,
                academicImpact: 78.5,
                industryContribution: 85.3,
                mobility: 75.2,
                dimensions: [82, 80, 78, 85, 75],
                institutions: [
                    { name: '南京大学', count: 2341 },
                    { name: '东南大学', count: 1987 },
                    { name: '苏州大学', count: 1654 }
                ],
                industries: [
                    { name: '新材料', score: 84.5 },
                    { name: '高端制造', score: 82.3 },
                    { name: '生物医药', score: 80.8 }
                ]
            },
            '浙江': {
                talentCount: 14321,
                researchOutput: 78.5,
                academicImpact: 76.4,
                industryContribution: 83.1,
                mobility: 76.8,
                dimensions: [80, 78, 76, 83, 77],
                institutions: [
                    { name: '浙江大学', count: 2895 },
                    { name: '西湖大学', count: 654 },
                    { name: '之江实验室', count: 892 }
                ],
                industries: [
                    { name: '数字经济', score: 86.2 },
                    { name: '人工智能', score: 84.5 },
                    { name: '新材料', score: 79.8 }
                ]
            },
            '广东': {
                talentCount: 23456,
                researchOutput: 82.3,
                academicImpact: 80.5,
                industryContribution: 90.2,
                mobility: 80.1,
                dimensions: [85, 82, 80, 90, 80],
                institutions: [
                    { name: '中山大学', count: 2876 },
                    { name: '华南理工大学', count: 2134 },
                    { name: '深圳大学', count: 1654 }
                ],
                industries: [
                    { name: '电子信息', score: 91.5 },
                    { name: '新能源', score: 88.7 },
                    { name: '生物医药', score: 85.3 }
                ]
            },
            '湖北': {
                talentCount: 11234,
                researchOutput: 72.5,
                academicImpact: 74.3,
                industryContribution: 70.8,
                mobility: 73.5,
                dimensions: [75, 72, 74, 70, 73],
                institutions: [
                    { name: '武汉大学', count: 2456 },
                    { name: '华中科技大学', count: 2187 },
                    { name: '中科院武汉分院', count: 1234 }
                ],
                industries: [
                    { name: '光电子', score: 78.5 },
                    { name: '生物医药', score: 74.3 },
                    { name: '高端制造', score: 71.2 }
                ]
            },
            '山东': {
                talentCount: 12345,
                researchOutput: 75.8,
                academicImpact: 73.6,
                industryContribution: 78.5,
                mobility: 76.2,
                dimensions: [78, 76, 74, 78, 76],
                institutions: [
                    { name: '山东大学', count: 2134 },
                    { name: '中国海洋大学', count: 987 },
                    { name: '中科院青岛分院', count: 1234 }
                ],
                industries: [
                    { name: '海洋科技', score: 82.5 },
                    { name: '新材料', score: 76.8 },
                    { name: '高端制造', score: 74.5 }
                ]
            },
            '四川': {
                talentCount: 9876,
                researchOutput: 73.2,
                academicImpact: 71.8,
                industryContribution: 72.5,
                mobility: 74.8,
                dimensions: [76, 73, 72, 72, 75],
                institutions: [
                    { name: '四川大学', count: 1987 },
                    { name: '电子科技大学', count: 1765 },
                    { name: '中科院成都分院', count: 1123 }
                ],
                industries: [
                    { name: '电子信息', score: 78.9 },
                    { name: '航空航天', score: 75.4 },
                    { name: '生物医药', score: 72.1 }
                ]
            }
        };

        // 产业对比数据
        var industryCompareData = {
            '人工智能': {
                talentCount: 12543,
                researchOutput: 89.5,
                academicImpact: 88.2,
                industryContribution: 86.7,
                growthRate: 15.8,
                dimensions: [90, 89, 88, 87, 86]
            },
            '生物医药': {
                talentCount: 10876,
                researchOutput: 82.3,
                academicImpact: 85.6,
                industryContribution: 83.4,
                growthRate: 12.3,
                dimensions: [85, 82, 86, 83, 82]
            },
            '新能源': {
                talentCount: 9876,
                researchOutput: 85.7,
                academicImpact: 78.9,
                industryContribution: 88.5,
                growthRate: 18.5,
                dimensions: [86, 86, 79, 88, 84]
            },
            '高端制造': {
                talentCount: 14321,
                researchOutput: 78.9,
                academicImpact: 75.4,
                industryContribution: 90.2,
                growthRate: 14.2,
                dimensions: [82, 79, 75, 90, 85]
            },
            '新材料': {
                talentCount: 8765,
                researchOutput: 80.2,
                academicImpact: 76.8,
                industryContribution: 82.5,
                growthRate: 11.8,
                dimensions: [80, 80, 77, 82, 80]
            },
            '集成电路': {
                talentCount: 7654,
                researchOutput: 84.5,
                academicImpact: 82.3,
                industryContribution: 85.8,
                growthRate: 16.5,
                dimensions: [83, 84, 82, 86, 83]
            }
        };

        var regionColors = {
            '北京': '#1890ff',
            '上海': '#52c41a',
            '江苏': '#faad14',
            '浙江': '#f5222d',
            '广东': '#722ed1',
            '湖北': '#13c2c2',
            '山东': '#eb2f96',
            '四川': '#fa8c16'
        };

        var industryColors = {
            '人工智能': '#1890ff',
            '生物医药': '#52c41a',
            '新能源': '#faad14',
            '高端制造': '#f5222d',
            '新材料': '#722ed1',
            '集成电路': '#13c2c2'
        };

        var currentCompareType = 'region';

        function switchCompareType(type) {
            currentCompareType = type;
            var subtitle = document.getElementById('compareSubtitle');
            var checkboxes = document.getElementById('compareCheckboxes');

            if (type === 'region') {
                subtitle.textContent = '最多选择5个区域进行对比';
                renderRegionCheckboxes();
            } else {
                subtitle.textContent = '最多选择5个产业进行对比';
                renderIndustryCheckboxes();
            }

            updateCompareRegions();
        }

        function renderRegionCheckboxes() {
            var checkboxes = document.getElementById('compareCheckboxes');
            var html = '';
            var regions = Object.keys(regionCompareData);

            regions.forEach((region, index) => {
                var color = regionColors[region] || '#1890ff';
                html += `
                    <label class="region-checkbox">
                        <input type="checkbox" value="${region}" ${index < 2 ? 'checked' : ''} onchange="updateCompareRegions()">
                        <div class="region-color" style="background: ${color};"></div>
                        <span>${region}</span>
                    </label>
                `;
            });

            checkboxes.innerHTML = html;
        }

        function renderIndustryCheckboxes() {
            var checkboxes = document.getElementById('compareCheckboxes');
            var html = '';
            var industries = Object.keys(industryCompareData);

            industries.forEach((industry, index) => {
                var color = industryColors[industry] || '#1890ff';
                html += `
                    <label class="region-checkbox">
                        <input type="checkbox" value="${industry}" ${index < 2 ? 'checked' : ''} onchange="updateCompareRegions()">
                        <div class="region-color" style="background: ${color};"></div>
                        <span>${industry}</span>
                    </label>
                `;
            });

            checkboxes.innerHTML = html;
        }

        function updateCompareRegions() {
            var checkedItems = [];
            document.querySelectorAll('.region-checkbox input:checked').forEach(cb => {
                checkedItems.push(cb.value);
            });

            // 限制最多选择5个
            if (checkedItems.length > 5) {
                alert('最多只能选择5个对比对象！');
                var checkboxes = document.querySelectorAll('.region-checkbox input:checked');
                checkboxes[checkboxes.length - 1].checked = false;
                checkedItems.pop();
            }

            updateRadarChart(checkedItems);
            updateCompareBarChart(checkedItems);
            updateRadarLegend(checkedItems);
        }

        function updateRadarChart(checkedItems) {
            var radarChart = document.getElementById('radarChart');
            if (!radarChart || checkedItems.length === 0) return;

            var dimensions = currentCompareType === 'region'
                ? ['人才总量', '科研产出', '学术影响力', '产业贡献度', '流动活跃度']
                : ['人才总量', '科研产出', '学术影响力', '产业贡献度', '增长率'];

            var dataMap = currentCompareType === 'region' ? regionCompareData : industryCompareData;
            var colorMap = currentCompareType === 'region' ? regionColors : industryColors;

            // 生成SVG
            var svg = `<svg width="400" height="400" viewBox="0 0 400 400">`;

            // 绘制背景网格
            for (var i = 1; i <= 4; i++) {
                var radius = i * 40;
                var points = '';
                for (var j = 0; j < 5; j++) {
                    var angle = (Math.PI / 2) - (j * 2 * Math.PI / 5);
                    var x = 200 + radius * Math.cos(angle);
                    var y = 200 - radius * Math.sin(angle);
                    points += `${x},${y} `;
                }
                svg += `<polygon points="${points}" fill="none" stroke="#e8e8e8" stroke-width="1"/>`;
            }

            // 绘制轴线
            for (var j = 0; j < 5; j++) {
                var angle = (Math.PI / 2) - (j * 2 * Math.PI / 5);
                var x = 200 + 160 * Math.cos(angle);
                var y = 200 - 160 * Math.sin(angle);
                svg += `<line x1="200" y1="200" x2="${x}" y2="${y}" stroke="#e8e8e8" stroke-width="1"/>`;

                // 维度标签
                var labelX = 200 + 175 * Math.cos(angle);
                var labelY = 200 - 175 * Math.sin(angle);
                svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="11" fill="#666" style="font-weight: 500;">${dimensions[j]}</text>`;
            }

            // 绘制数据多边形
            checkedItems.forEach((item, index) => {
                var data = dataMap[item];
                if (!data) return;

                var points = '';
                var dimensions = data.dimensions || [80, 80, 80, 80, 80];
                var color = colorMap[item] || '#1890ff';

                for (var j = 0; j < 5; j++) {
                    var angle = (Math.PI / 2) - (j * 2 * Math.PI / 5);
                    var radius = (dimensions[j] / 100) * 160;
                    var x = 200 + radius * Math.cos(angle);
                    var y = 200 - radius * Math.sin(angle);
                    points += `${x},${y} `;
                }

                svg += `<polygon points="${points}" fill="rgba(${hexToRgb(color)}, 0.2)" stroke="${color}" stroke-width="2"/>`;

                // 绘制节点（可点击）
                for (var j = 0; j < 5; j++) {
                    var angle = (Math.PI / 2) - (j * 2 * Math.PI / 5);
                    var radius = (dimensions[j] / 100) * 160;
                    var x = 200 + radius * Math.cos(angle);
                    var y = 200 - radius * Math.sin(angle);

                    svg += `<circle cx="${x}" cy="${y}" r="6" fill="${color}" cursor="pointer" onclick="showRadarNodeDetail('${item}', ${j})"/>`;
                }
            });

            // 中心点
            svg += `<circle cx="200" cy="200" r="4" fill="#1890ff"/>`;

            svg += `</svg>`;
            radarChart.innerHTML = svg + '<button type="button" class="index-radar-action-btn" onclick="showIndexRadarDetails()"><i class="fas fa-search-plus"></i>查看详情</button>';
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
                : '24, 144, 255';
        }

        function updateCompareBarChart(checkedItems) {
            var chart = document.getElementById('compareBarChart');
            if (!chart || checkedItems.length === 0) return;

            var dataMap = currentCompareType === 'region' ? regionCompareData : industryCompareData;
            var colorMap = currentCompareType === 'region' ? regionColors : industryColors;

            var dimensionNames = currentCompareType === 'region'
                ? ['人才总量', '科研产出', '学术影响力', '产业贡献度', '流动活跃度']
                : ['人才总量', '科研产出', '学术影响力', '产业贡献度', '增长率'];

            var html = '';

            dimensionNames.forEach((dimension, dimIndex) => {
                html += `<div class="compare-dimension-group">`;
                html += `<div class="dimension-title">${dimension}</div>`;
                html += `<div class="compare-bars">`;

                checkedItems.forEach(item => {
                    var data = dataMap[item];
                    if (!data) return;

                    var value = data.dimensions ? data.dimensions[dimIndex] : 75;
                    var color = colorMap[item] || '#1890ff';
                    var colorRgb = hexToRgb(color);

                    html += `
                        <div class="compare-bar-item">
                            <span class="bar-label">${item}</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: ${value}%; background: ${color};"></div>
                            </div>
                            <span class="bar-value" style="color: ${color};">${value}</span>
                        </div>
                    `;
                });

                html += `</div></div>`;
            });

            chart.innerHTML = html;
        }

        function updateRadarLegend(checkedItems) {
            var legend = document.getElementById('radarLegend');
            if (!legend) return;

            var colorMap = currentCompareType === 'region' ? regionColors : industryColors;

            var html = checkedItems.map(item => {
                var color = colorMap[item] || '#1890ff';
                return `
                    <div class="radar-legend-item">
                        <div class="radar-legend-color" style="background: ${color};"></div>
                        <span>${item}</span>
                    </div>
                `;
            }).join('');

            legend.innerHTML = html;
        }

        function showRadarNodeDetail(item, dimensionIndex) {
            var overlay = document.getElementById('radarDetailOverlay');
            var detail = document.getElementById('radarNodeDetail');
            var dimensionNames = ['人才总量', '科研产出', '学术影响力', '产业贡献度', '流动活跃度'];

            document.getElementById('radarDetailTitle').textContent = item + ' - 详细数据';

            if (currentCompareType === 'region') {
                var data = regionCompareData[item];
                if (data) {
                    document.getElementById('radarDetailTalentCount').textContent = data.talentCount.toLocaleString() + '人';
                    document.getElementById('radarDetailResearchOutput').textContent = data.researchOutput + '分';
                    document.getElementById('radarDetailInstitutions').textContent = data.institutions.length + '家';
                    document.getElementById('radarDetailIndustries').textContent = data.industries.length + '个';

                    // 生成机构列表
                    var institutionHtml = data.institutions.map(inst => `
                        <div class="radar-detail-list-item">
                            <span class="radar-detail-list-name">${inst.name}</span>
                            <span class="radar-detail-list-value">${inst.count.toLocaleString()}人</span>
                        </div>
                    `).join('');
                    document.getElementById('radarDetailInstitutionList').innerHTML = institutionHtml;

                    // 生成产业列表
                    var industryHtml = data.industries.map(ind => `
                        <div class="radar-detail-list-item">
                            <span class="radar-detail-list-name">${ind.name}</span>
                            <span class="radar-detail-list-value">${ind.score}分</span>
                        </div>
                    `).join('');
                    document.getElementById('radarDetailIndustryList').innerHTML = industryHtml;
                }
            } else {
                var data = industryCompareData[item];
                if (data) {
                    document.getElementById('radarDetailTalentCount').textContent = data.talentCount.toLocaleString() + '人';
                    document.getElementById('radarDetailResearchOutput').textContent = data.researchOutput + '分';
                    document.getElementById('radarDetailInstitutions').textContent = '-';
                    document.getElementById('radarDetailIndustries').textContent = data.growthRate + '%';

                    document.getElementById('radarDetailInstitutionList').innerHTML = '<div class="radar-detail-list-item"><span class="radar-detail-list-name">产业对比模式</span><span class="radar-detail-list-value">-</span></div>';
                    document.getElementById('radarDetailIndustryList').innerHTML = '<div class="radar-detail-list-item"><span class="radar-detail-list-name">点击区域对比查看详细机构</span><span class="radar-detail-list-value">-</span></div>';
                }
            }

            overlay.classList.add('show');
            detail.classList.add('show');
        }

        function closeRadarDetail() {
            var overlay = document.getElementById('radarDetailOverlay');
            var detail = document.getElementById('radarNodeDetail');
            overlay.classList.remove('show');
            detail.classList.remove('show');
        }

        function exportCompareReport() {
            var checkedItems = [];
            document.querySelectorAll('.region-checkbox input:checked').forEach(cb => {
                checkedItems.push(cb.value);
            });

            if (checkedItems.length === 0) {
                alert('请先选择对比对象！');
                return;
            }

            alert(`正在生成对比分析报告...\n\n对比对象: ${checkedItems.join(', ')}\n\n报告将包含：\n1. 雷达图对比\n2. 五大维度详细数据\n3. 机构与产业分析\n4. 可视化图表\n\n报告格式: PDF`);
        }

        // (5) 热力图分布视图
        // 热力图数据
        var heatmapData = {
            'all': {
                '北京': { top: '15%', left: '65%', score: 92.5, color: 'rgba(255, 77, 79, 0.85)', talentCount: 15432, researchOutput: 88.3, academicImpact: 90.1, industryContribution: 85.6, trend: 12.5, ranking: '全国第2' },
                '天津': { top: '18%', left: '70%', score: 78.3, color: 'rgba(255, 152, 149, 0.75)', talentCount: 5678, researchOutput: 75.2, academicImpact: 76.8, industryContribution: 82.3, trend: 8.5, ranking: '全国第15' },
                '河北': { top: '18%', left: '50%', score: 72.5, color: 'rgba(255, 190, 184, 0.65)', talentCount: 8756, researchOutput: 70.1, academicImpact: 71.5, industryContribution: 75.8, trend: 6.3, ranking: '全国第22' },
                '山西': { top: '25%', left: '45%', score: 68.2, color: 'rgba(255, 229, 220, 0.55)', talentCount: 4321, researchOutput: 65.3, academicImpact: 67.8, industryContribution: 71.5, trend: 5.2, ranking: '全国第28' },
                '山东': { top: '30%', left: '60%', score: 76.5, color: 'rgba(255, 152, 149, 0.7)', talentCount: 12345, researchOutput: 74.8, academicImpact: 75.2, industryContribution: 79.6, trend: 9.8, ranking: '全国第12' },
                '江苏': { top: '35%', left: '68%', score: 86.7, color: 'rgba(255, 114, 114, 0.78)', talentCount: 18765, researchOutput: 84.5, academicImpact: 85.8, industryContribution: 89.2, trend: 11.2, ranking: '全国第5' },
                '上海': { top: '38%', left: '72%', score: 89.2, color: 'rgba(255, 77, 79, 0.82)', talentCount: 15678, researchOutput: 86.7, academicImpact: 87.5, industryContribution: 93.5, trend: 10.8, ranking: '全国第4' },
                '浙江': { top: '45%', left: '70%', score: 82.1, color: 'rgba(255, 152, 149, 0.73)', talentCount: 14321, researchOutput: 80.5, academicImpact: 81.2, industryContribution: 84.8, trend: 9.5, ranking: '全国第7' },
                '河南': { top: '50%', left: '55%', score: 72.3, color: 'rgba(255, 190, 184, 0.63)', talentCount: 9876, researchOutput: 69.8, academicImpact: 71.5, industryContribution: 75.6, trend: 7.2, ranking: '全国第20' },
                '湖北': { top: '50%', left: '45%', score: 74.8, color: 'rgba(255, 152, 149, 0.68)', talentCount: 11234, researchOutput: 72.5, academicImpact: 73.8, industryContribution: 78.2, trend: 8.1, ranking: '全国第16' },
                '湖南': { top: '58%', left: '65%', score: 70.5, color: 'rgba(255, 190, 184, 0.6)', talentCount: 8654, researchOutput: 68.3, academicImpact: 69.5, industryContribution: 73.8, trend: 6.8, ranking: '全国第24' },
                '江西': { top: '65%', left: '68%', score: 66.8, color: 'rgba(255, 229, 220, 0.5)', talentCount: 5432, researchOutput: 64.5, academicImpact: 65.8, industryContribution: 70.2, trend: 5.5, ranking: '全国第30' },
                '福建': { top: '70%', left: '65%', score: 75.2, color: 'rgba(255, 152, 149, 0.67)', talentCount: 6789, researchOutput: 73.5, academicImpact: 74.2, industryContribution: 78.5, trend: 7.8, ranking: '全国第18' },
                '广东': { top: '75%', left: '62%', score: 90.1, color: 'rgba(255, 77, 79, 0.83)', talentCount: 23456, researchOutput: 88.5, academicImpact: 86.8, industryContribution: 95.2, trend: 13.2, ranking: '全国第3' },
                '四川': { top: '70%', left: '40%', score: 78.9, color: 'rgba(255, 114, 114, 0.76)', talentCount: 9876, researchOutput: 76.8, academicImpact: 78.2, industryContribution: 81.5, trend: 8.6, ranking: '全国第11' }
            }
        };

        // 产业热力图数据
        var industryHeatmapData = {
            'ai': {
                '北京': { score: 95.2, color: 'rgba(255, 77, 79, 0.9)' },
                '上海': { score: 91.5, color: 'rgba(255, 77, 79, 0.85)' },
                '广东': { score: 93.8, color: 'rgba(255, 77, 79, 0.88)' },
                '浙江': { score: 86.2, color: 'rgba(255, 114, 114, 0.78)' },
                '江苏': { score: 84.5, color: 'rgba(255, 152, 149, 0.75)' },
                '湖北': { score: 78.3, color: 'rgba(255, 152, 149, 0.7)' },
                '四川': { score: 75.6, color: 'rgba(255, 190, 184, 0.68)' }
            },
            'biotech': {
                '北京': { score: 90.5, color: 'rgba(255, 77, 79, 0.85)' },
                '上海': { score: 94.2, color: 'rgba(255, 77, 79, 0.88)' },
                '江苏': { score: 88.7, color: 'rgba(255, 114, 114, 0.8)' },
                '广东': { score: 86.5, color: 'rgba(255, 114, 114, 0.78)' },
                '山东': { score: 79.8, color: 'rgba(255, 152, 149, 0.72)' },
                '浙江': { score: 77.2, color: 'rgba(255, 190, 184, 0.68)' }
            },
            'newenergy': {
                '江苏': { score: 91.5, color: 'rgba(255, 77, 79, 0.86)' },
                '广东': { score: 88.3, color: 'rgba(255, 77, 79, 0.83)' },
                '浙江': { score: 85.7, color: 'rgba(255, 114, 114, 0.78)' },
                '山东': { score: 83.2, color: 'rgba(255, 114, 114, 0.75)' },
                '北京': { score: 80.5, color: 'rgba(255, 152, 149, 0.72)' },
                '四川': { score: 76.8, color: 'rgba(255, 190, 184, 0.68)' }
            },
            'manufacturing': {
                '广东': { score: 95.8, color: 'rgba(255, 77, 79, 0.9)' },
                '江苏': { score: 92.3, color: 'rgba(255, 77, 79, 0.87)' },
                '浙江': { score: 88.5, color: 'rgba(255, 114, 114, 0.8)' },
                '山东': { score: 86.7, color: 'rgba(255, 114, 114, 0.78)' },
                '上海': { score: 84.2, color: 'rgba(255, 152, 149, 0.75)' },
                '湖北': { score: 79.5, color: 'rgba(255, 152, 149, 0.71)' }
            },
            'materials': {
                '江苏': { score: 89.5, color: 'rgba(255, 77, 79, 0.85)' },
                '浙江': { score: 86.2, color: 'rgba(255, 114, 114, 0.78)' },
                '山东': { score: 84.8, color: 'rgba(255, 114, 114, 0.76)' },
                '北京': { score: 82.5, color: 'rgba(255, 152, 149, 0.74)' },
                '上海': { score: 80.3, color: 'rgba(255, 152, 149, 0.72)' },
                '广东': { score: 78.6, color: 'rgba(255, 190, 184, 0.7)' }
            }
        };

        // 地区详细信息数据
        var regionDetailData = {
            '北京': {
                institutions: [
                    { name: '清华大学', count: 3421 },
                    { name: '北京大学', count: 2897 },
                    { name: '中科院', count: 4125 },
                    { name: '北京航空航天大学', count: 1876 }
                ],
                industries: [
                    { name: '人工智能', score: 92.5, talentCount: 3254 },
                    { name: '信息技术', score: 88.3, talentCount: 4532 },
                    { name: '生物医药', score: 85.2, talentCount: 2876 }
                ]
            },
            '上海': {
                institutions: [
                    { name: '复旦大学', count: 2654 },
                    { name: '上海交通大学', count: 2891 },
                    { name: '中科院上海分院', count: 1987 },
                    { name: '同济大学', count: 1456 }
                ],
                industries: [
                    { name: '集成电路', score: 89.5, talentCount: 3456 },
                    { name: '生物医药', score: 87.3, talentCount: 2876 },
                    { name: '人工智能', score: 86.8, talentCount: 2765 }
                ]
            },
            '江苏': {
                institutions: [
                    { name: '南京大学', count: 2341 },
                    { name: '东南大学', count: 1987 },
                    { name: '苏州大学', count: 1654 },
                    { name: '南京理工大学', count: 1234 }
                ],
                industries: [
                    { name: '新材料', score: 84.5, talentCount: 3245 },
                    { name: '高端制造', score: 82.3, talentCount: 4567 },
                    { name: '生物医药', score: 80.8, talentCount: 2890 }
                ]
            },
            '浙江': {
                institutions: [
                    { name: '浙江大学', count: 2895 },
                    { name: '西湖大学', count: 654 },
                    { name: '之江实验室', count: 892 },
                    { name: '浙江工业大学', count: 1234 }
                ],
                industries: [
                    { name: '数字经济', score: 86.2, talentCount: 3876 },
                    { name: '人工智能', score: 84.5, talentCount: 2567 },
                    { name: '新材料', score: 79.8, talentCount: 2134 }
                ]
            },
            '广东': {
                institutions: [
                    { name: '中山大学', count: 2876 },
                    { name: '华南理工大学', count: 2134 },
                    { name: '深圳大学', count: 1654 },
                    { name: '南方科技大学', count: 1234 }
                ],
                industries: [
                    { name: '电子信息', score: 91.5, talentCount: 5234 },
                    { name: '新能源', score: 88.7, talentCount: 3456 },
                    { name: '生物医药', score: 85.3, talentCount: 2789 }
                ]
            },
            '湖北': {
                institutions: [
                    { name: '武汉大学', count: 2456 },
                    { name: '华中科技大学', count: 2187 },
                    { name: '中科院武汉分院', count: 1234 },
                    { name: '武汉理工大学', count: 987 }
                ],
                industries: [
                    { name: '光电子', score: 78.5, talentCount: 2134 },
                    { name: '生物医药', score: 74.3, talentCount: 1876 },
                    { name: '高端制造', score: 71.2, talentCount: 2345 }
                ]
            },
            '山东': {
                institutions: [
                    { name: '山东大学', count: 2134 },
                    { name: '中国海洋大学', count: 987 },
                    { name: '中科院青岛分院', count: 1234 },
                    { name: '中国石油大学', count: 876 }
                ],
                industries: [
                    { name: '海洋科技', score: 82.5, talentCount: 1876 },
                    { name: '新材料', score: 76.8, talentCount: 2134 },
                    { name: '高端制造', score: 74.5, talentCount: 2456 }
                ]
            },
            '四川': {
                institutions: [
                    { name: '四川大学', count: 1987 },
                    { name: '电子科技大学', count: 1765 },
                    { name: '中科院成都分院', count: 1123 },
                    { name: '西南交通大学', count: 987 }
                ],
                industries: [
                    { name: '电子信息', score: 78.9, talentCount: 2134 },
                    { name: '航空航天', score: 75.4, talentCount: 1654 },
                    { name: '生物医药', score: 72.1, talentCount: 1432 }
                ]
            }
        };

        // 地图缩放和平移
        var mapScale = 1;
        var mapTranslateX = 0;
        var mapTranslateY = 0;
        var isDragging = false;
        var dragStartX = 0;
        var dragStartY = 0;

        function zoomMap(direction) {
            var map = document.getElementById('heatmapMap');
            if (!map) return;

            if (direction === 'in') {
                mapScale = Math.min(mapScale * 1.2, 3);
            } else {
                mapScale = Math.max(mapScale * 0.8, 0.5);
            }

            updateMapTransform();
        }

        function resetZoom() {
            mapScale = 1;
            mapTranslateX = 0;
            mapTranslateY = 0;
            updateMapTransform();
        }

        function updateMapTransform() {
            var map = document.getElementById('heatmapMap');
            if (map) {
                map.style.transform = `translate(${mapTranslateX}px, ${mapTranslateY}px) scale(${mapScale})`;
            }
        }

        function startDrag(e) {
            if (e.target.classList.contains('heatmap-region')) return;
            isDragging = true;
            dragStartX = e.clientX - mapTranslateX;
            dragStartY = e.clientY - mapTranslateY;
            e.preventDefault();
        }

        function onDrag(e) {
            if (!isDragging) return;
            mapTranslateX = e.clientX - dragStartX;
            mapTranslateY = e.clientY - dragStartY;
            updateMapTransform();
        }

        function endDrag() {
            isDragging = false;
        }

        // 初始化热力图
        function initHeatmap() {
            renderHeatmap('all');
        }

        function renderHeatmap(industry) {
            var map = document.getElementById('heatmapMap');
            if (!map) return;

            var data = industry === 'all' ? heatmapData['all'] : industryHeatmapData[industry] || {};
            var allData = heatmapData['all'];

            var html = '';
            for (var region in data) {
                var regionInfo = data[region];
                var position = allData[region] || { top: '50%', left: '50%' };
                html += `
                    <div class="heatmap-region"
                         style="top: ${position.top}; left: ${position.left}; background: ${regionInfo.color};"
                         onclick="handleIndexHeatmapClick(event, '${region}', ${regionInfo.score})"
                         ondblclick="handleIndexHeatmapDoubleClick(event, '${region}')">
                        <span class="heatmap-label">${region}</span>
                        <span class="heatmap-score">${regionInfo.score}</span>
                    </div>
                `;
            }

            map.innerHTML = html;
        }

        function updateHeatmapByIndustry() {
            var industry = document.getElementById('heatmapIndustryFilter').value;
            renderHeatmap(industry);
        }

        // 显示热力图详情
        var currentDetailRegion = '';

        function showHeatmapDetail(region, score) {
            currentDetailRegion = region;
            var overlay = document.getElementById('heatmapDetailOverlay');
            var data = regionDetailData[region] || heatmapData['all'][region];

            if (data) {
                var detailData = heatmapData['all'][region] || {};
                document.getElementById('heatmapDetailRegionName').textContent = region;
                document.getElementById('heatmapDetailScore').textContent = detailData.score || score;
                var rankingElement = document.getElementById('heatmapDetailNationalRanking');
                if (rankingElement) rankingElement.textContent = detailData.ranking || getIndexHeatmapRanking(region);
                document.getElementById('heatmapDetailTalentCount').textContent = (detailData.talentCount || 0).toLocaleString();
                document.getElementById('heatmapDetailResearchOutput').textContent = detailData.researchOutput || '-';
                document.getElementById('heatmapDetailAcademicImpact').textContent = detailData.academicImpact || '-';
                document.getElementById('heatmapDetailIndustryContribution').textContent = detailData.industryContribution || '-';

                // 生成机构列表
                var institutionHtml = '';
                if (regionDetailData[region] && regionDetailData[region].institutions) {
                    institutionHtml = regionDetailData[region].institutions.map(inst => `
                        <div class="heatmap-detail-list-item">
                            <span class="heatmap-detail-list-name">
                                <i class="fas fa-university" style="color: #1890ff;"></i>
                                ${inst.name}
                            </span>
                            <span class="heatmap-detail-list-value">${inst.count.toLocaleString()}人</span>
                        </div>
                    `).join('');
                }
                document.getElementById('heatmapDetailInstitutions').innerHTML = institutionHtml || '<div class="heatmap-detail-list-item"><span class="heatmap-detail-list-name">暂无数据</span></div>';

                // 生成产业列表
                var industryHtml = '';
                if (regionDetailData[region] && regionDetailData[region].industries) {
                    industryHtml = regionDetailData[region].industries.map(ind => `
                        <div class="heatmap-detail-list-item">
                            <span class="heatmap-detail-list-name">
                                <i class="fas fa-chart-pie" style="color: #52c41a;"></i>
                                ${ind.name}
                            </span>
                            <span class="heatmap-detail-list-value">${ind.score}分</span>
                        </div>
                    `).join('');
                }
                document.getElementById('heatmapDetailIndustries').innerHTML = industryHtml || '<div class="heatmap-detail-list-item"><span class="heatmap-detail-list-name">暂无数据</span></div>';
            }

            overlay.classList.add('show');
        }

        function closeHeatmapDetail() {
            document.getElementById('heatmapDetailOverlay').classList.remove('show');
        }

        function drilldownFromDetail() {
            closeHeatmapDetail();
            drilldownHeatmap(currentDetailRegion);
        }

        // 下钻查看产业
        function drilldownHeatmap(region) {
            var overlay = document.getElementById('drilldownOverlay');
            var grid = document.getElementById('industryGrid');
            var data = regionDetailData[region];

            if (data && data.industries) {
                document.getElementById('drilldownRegionName').textContent = region;

                var html = data.industries.map(industry => `
                    <div class="industry-card" onclick="showIndustryDetail('${region}', '${industry.name}')">
                        <div class="industry-card-name">
                            <i class="fas fa-industry" style="color: #1890ff;"></i>
                            ${industry.name}
                        </div>
                        <span class="industry-card-score">${industry.score}分</span>
                        <div class="industry-card-stats">
                            <div class="industry-card-stat">
                                <i class="fas fa-users"></i>
                                ${industry.talentCount.toLocaleString()}人
                            </div>
                            <div class="industry-card-stat">
                                <i class="fas fa-chart-line"></i>
                                优秀
                            </div>
                        </div>
                        <div class="industry-card-support">
                            <span>人才支撑状况</span>
                            <strong>${industry.score >= 90 ? '重点集聚' : industry.score >= 80 ? '稳步提升' : '加快培育'}</strong>
                        </div>
                        <div class="industry-card-note">覆盖人才引育、科研平台与成果转化等支撑环节</div>
                    </div>
                `).join('');

                grid.innerHTML = html;
                overlay.classList.add('show');
            }
        }

        function closeDrilldown() {
            document.getElementById('drilldownOverlay').classList.remove('show');
        }

        function showIndustryDetail(region, industry) {
            alert(`${region} - ${industry}产业详情\n\n人才数量: ${regionDetailData[region]?.industries?.find(i => i.name === industry)?.talentCount || '-'}\n人才指数: ${regionDetailData[region]?.industries?.find(i => i.name === industry)?.score || '-'}`);
        }

        // 导出下拉菜单控制
        function toggleExportDropdown() {
            var menu = document.getElementById('exportDropdownMenu');
            menu.classList.toggle('show');
        }

        // 点击外部关闭下拉菜单
        document.addEventListener('click', function(e) {
            var dropdown = document.querySelector('.export-dropdown');
            if (dropdown && !dropdown.contains(e.target)) {
                var menu = document.getElementById('exportDropdownMenu');
                if (menu) menu.classList.remove('show');
            }
        });

        // (7) 筛选与导出功能
        function applyIndexFilters() {
            var region = document.getElementById('indexRegionFilter')?.value;
            var industry = document.getElementById('indexIndustryFilter')?.value;
            var time = document.getElementById('indexTimeFilter')?.value;

            console.log('应用筛选条件：', { region, industry, time });

            // 重新渲染图表
            renderTrendChart('line');
            var checkedItems = Array.from(document.querySelectorAll('#compareCheckboxes input:checked')).map(function(input) {
                return input.value;
            });
            updateCompareBarChart(checkedItems);

            alert('筛选条件已应用！');
        }

        function exportIndexReport(format) {
            var formatNames = {
                'pdf': 'PDF报告',
                'excel': 'Excel表格',
                'csv': 'CSV文件'
            };

            alert(`正在生成${formatNames[format]}...\n包含折线图、雷达图、热力图等可视化结果`);

            setTimeout(() => {
                alert(`${formatNames[format]}已导出！`);
            }, 1500);
        }

        function generateIndexReport() {
            alert('正在生成人才支撑能力分析报告...\n\n报告包含：\n1. 数据摘要\n2. 图表说明\n3. 策略建议');

            setTimeout(() => {
                alert('分析报告已生成！');
            }, 2000);
        }

        // (8) 动态展示与自动播放
        var indexPlayInterval = null;
        var indexIsPlaying = false;
        
        // 年度数据（用于播放时更新显示）
        var yearlyData = {
            2020: {
                totalTalent: 125680,
                totalTalentChange: '+3.2%',
                compositeIndex: '72.5',
                compositeIndexChange: '+2.1%',
                researchOutput: '28.3',
                researchOutputChange: '+4.5%',
                industryContribution: '35.2',
                industryContributionChange: '+2.8%'
            },
            2021: {
                totalTalent: 138540,
                totalTalentChange: '+10.2%',
                compositeIndex: '76.8',
                compositeIndexChange: '+5.9%',
                researchOutput: '31.5',
                researchOutputChange: '+11.3%',
                industryContribution: '38.7',
                industryContributionChange: '+9.9%'
            },
            2022: {
                totalTalent: 152890,
                totalTalentChange: '+10.4%',
                compositeIndex: '81.2',
                compositeIndexChange: '+5.7%',
                researchOutput: '35.8',
                researchOutputChange: '+13.7%',
                industryContribution: '42.3',
                industryContributionChange: '+9.3%'
            },
            2023: {
                totalTalent: 168750,
                totalTalentChange: '+10.4%',
                compositeIndex: '85.6',
                compositeIndexChange: '+5.4%',
                researchOutput: '39.2',
                researchOutputChange: '+9.5%',
                industryContribution: '46.8',
                industryContributionChange: '+10.6%'
            },
            2024: {
                totalTalent: 185420,
                totalTalentChange: '+9.9%',
                compositeIndex: '89.3',
                compositeIndexChange: '+4.3%',
                researchOutput: '43.5',
                researchOutputChange: '+11.0%',
                industryContribution: '51.2',
                industryContributionChange: '+9.4%'
            }
        };

        function toggleIndexPlay() {
            var btn = document.getElementById('indexPlayBtn');
            var playIcon = document.getElementById('playIcon');
            var statusBadge = document.getElementById('playbackStatus');
            indexIsPlaying = !indexIsPlaying;

            if (indexIsPlaying) {
                playIcon.className = 'fas fa-pause';
                btn.title = '暂停';
                if (statusBadge) {
                    statusBadge.textContent = '播放中';
                    statusBadge.className = 'playback-status-badge playing';
                }
                startIndexPlayback();
            } else {
                playIcon.className = 'fas fa-play';
                btn.title = '播放/暂停';
                if (statusBadge) {
                    statusBadge.textContent = '已暂停';
                    statusBadge.className = 'playback-status-badge paused';
                }
                stopIndexPlayback();
            }
        }

        function startIndexPlayback() {
            var slider = document.getElementById('indexSlider');
            // 重置为起始年份，确保从2020年开始播放
            var year = 2020;
            var intervalTime = 2000 / enhancedPlaybackSpeed;

            // 立即更新显示
            if (slider) slider.value = year;
            updateIndexYearEnhanced(year);

            indexPlayInterval = __mapSetInterval(() => {
                year++;

                if (year > 2024) {
                    if (isRepeatPlayback) {
                        year = 2020;
                    } else {
                        toggleIndexPlay();
                        return;
                    }
                }

                if (slider) slider.value = year;
                updateIndexYearEnhanced(year);
            }, intervalTime);
        }

        function stopIndexPlayback() {
            if (indexPlayInterval) {
                clearInterval(indexPlayInterval);
                indexPlayInterval = null;
            }
        }

        function updateIndexYear(year) {
            var label = document.getElementById('indexYearLabel');
            if (label) label.textContent = year;

            // 更新年份标签样式
            document.querySelectorAll('.playback-year').forEach(y => {
                y.classList.remove('active');
                if (y.textContent === year.toString()) {
                    y.classList.add('active');
                }
            });

            // 根据年份更新数据
            console.log('更新年份数据：', year);

            // 重新渲染图表
            renderTrendChart('line');
        }

        function selectIndexYear(year) {
            var slider = document.getElementById('indexSlider');
            if (slider) slider.value = year;
            updateIndexYear(year);
        }

        // 增强的播放功能
        var enhancedPlaybackSpeed = 1;
        var isRepeatPlayback = false;
        var currentPlaybackYearEnhanced = 2024;

        // 增强的播放控制函数
        function setPlaybackSpeed(speed) {
            enhancedPlaybackSpeed = speed;
            document.querySelectorAll('.playback-speed-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === speed + 'x') {
                    btn.classList.add('active');
                }
            });
            document.getElementById('playbackSpeedDisplay').textContent = '速度: ' + speed + 'x';

            if (indexIsPlaying) {
                stopIndexPlayback();
                startIndexPlayback();
            }
        }

        function resetPlayback() {
            stopIndexPlayback();
            if (indexIsPlaying) {
                toggleIndexPlay();
            }
            selectIndexYear(2020);
        }

        function stepBackward() {
            var slider = document.getElementById('indexSlider');
            var year = parseInt(slider?.value || 2024);
            if (year > 2020) {
                selectIndexYear(year - 1);
            }
        }

        function stepForward() {
            var slider = document.getElementById('indexSlider');
            var year = parseInt(slider?.value || 2024);
            if (year < 2024) {
                selectIndexYear(year + 1);
            }
        }

        function toggleRepeat() {
            isRepeatPlayback = !isRepeatPlayback;
            var icon = document.getElementById('repeatIcon');
            if (isRepeatPlayback) {
                icon.style.color = '#1890ff';
                alert('已开启循环播放');
            } else {
                icon.style.color = '#666';
                alert('已关闭循环播放');
            }
        }

        function updatePlaybackProgress() {
            var slider = document.getElementById('indexSlider');
            if (slider) {
                var progress = ((parseInt(slider.value) - 2020) / 4) * 100;
                var progressBar = document.getElementById('playbackProgressBar');
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
            }
        }

        function updateIndexYearEnhanced(year) {
            currentPlaybackYearEnhanced = year;
            var data = yearlyData[year];
            if (data) {
                // 更新年份显示
                document.getElementById('indexYearLabel').textContent = year;

                // 更新年份标签样式
                document.querySelectorAll('.playback-year').forEach(y => {
                    y.classList.remove('active');
                    if (y.textContent === year.toString()) {
                        y.classList.add('active');
                    }
                });

                // 更新统计数据
                updateYearlyStats(data);

                // 更新进度条
                updatePlaybackProgress();

                // 更新热力图
                updateHeatmapForYear(year);

                console.log('年份数据已更新:', year, data);
            }
        }

        function updateYearlyStats(data) {
            document.getElementById('statTotalTalent').textContent = data.totalTalent.toLocaleString();
            document.getElementById('statCompositeIndex').textContent = data.compositeIndex;
            document.getElementById('statResearchOutput').textContent = data.researchOutput;
            document.getElementById('statIndustryContribution').textContent = data.industryContribution;

            // 更新变化率
            updateStatChange('statTotalTalentChange', data.totalTalentChange);
            updateStatChange('statCompositeIndexChange', data.compositeIndexChange);
            updateStatChange('statResearchOutputChange', data.researchOutputChange);
            updateStatChange('statIndustryContributionChange', data.industryContributionChange);
        }

        function updateStatChange(elementId, changeValue) {
            var element = document.getElementById(elementId);
            if (element) {
                element.textContent = changeValue;
                element.className = 'playback-stat-change ' + (changeValue.startsWith('+') ? 'positive' : 'negative');
            }
        }
        
        // 根据年份更新热力图数据
        function updateHeatmapForYear(year) {
            console.log('更新热力图年份:', year);
            // 这里可以添加根据年份更新地图颜色的逻辑
            // 如果有ECharts实例，可以使用 setOption 更新地图数据
        }
        
        // (9) 报告生成与策略建议
        function showReportSettings() {
            var title = prompt('请输入报告标题：', '人才支撑能力分析报告');
            if (title) {
                alert(`正在生成【${title}】...\n\n报告将包含：\n- 数据摘要\n- 图表说明\n- 策略建议\n- 发展路径提示`);

                setTimeout(() => {
                    alert('报告生成完成！');
                }, 2000);
            }
        }

        // 页面加载完成后初始化图表
        function __domInit_1b() {
            // 初始化默认时间区间
            window.selectedTimeRange = { start: 2023, end: 2024 };
            updateRangeInfo('2023-2024年');

            // 初始化趋势图表
            renderTrendChart('line');

            // 初始化对比分析图表
            initCompareCharts();

            // 初始化热力图
            initHeatmap();

            // 添加鼠标滚轮缩放
            var heatmapContainer = document.getElementById('heatmapContainer');
            if (heatmapContainer) {
                heatmapContainer.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    if (e.deltaY < 0) {
                        zoomMap('in');
                    } else {
                        zoomMap('out');
                    }
                });
            }
        };

        // 初始化对比分析图表
        function initCompareCharts() {
            renderRegionCheckboxes();
            var checkedItems = ['北京', '上海'];
            updateRadarChart(checkedItems);
            updateCompareBarChart(checkedItems);
            updateRadarLegend(checkedItems);
        }

        // 权重设置弹窗功能
        var currentWeights = {
            total: 30,
            output: 25,
            influence: 20,
            contribution: 15,
            mobility: 10
        };

        function showWeightSettings() {
            var modal = document.getElementById('weightSettingsModal');
            if (modal) {
                modal.style.display = 'flex';
                updateWeightInputs();
            }
        }

        function closeWeightSettings() {
            var modal = document.getElementById('weightSettingsModal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        function updateWeightInputs() {
            // 将当前权重同步到弹窗
            document.getElementById('weight-total-slider').value = currentWeights.total;
            document.getElementById('weight-total-input').value = currentWeights.total;
            document.getElementById('weight-total-display').textContent = currentWeights.total;

            document.getElementById('weight-output-slider').value = currentWeights.output;
            document.getElementById('weight-output-input').value = currentWeights.output;
            document.getElementById('weight-output-display').textContent = currentWeights.output;

            document.getElementById('weight-influence-slider').value = currentWeights.influence;
            document.getElementById('weight-influence-input').value = currentWeights.influence;
            document.getElementById('weight-influence-display').textContent = currentWeights.influence;

            document.getElementById('weight-contribution-slider').value = currentWeights.contribution;
            document.getElementById('weight-contribution-input').value = currentWeights.contribution;
            document.getElementById('weight-contribution-display').textContent = currentWeights.contribution;

            document.getElementById('weight-mobility-slider').value = currentWeights.mobility;
            document.getElementById('weight-mobility-input').value = currentWeights.mobility;
            document.getElementById('weight-mobility-display').textContent = currentWeights.mobility;

            updateTotalWeightDisplay();
        }

        function onWeightChange(dimension) {
            var slider = document.getElementById('weight-' + dimension + '-slider');
            var input = document.getElementById('weight-' + dimension + '-input');
            var display = document.getElementById('weight-' + dimension + '-display');

            var value;
            if (event.target === slider) {
                value = parseInt(slider.value);
                input.value = value;
            } else {
                value = parseInt(input.value) || 0;
                if (value < 0) value = 0;
                if (value > 100) value = 100;
                input.value = value;
                slider.value = value;
            }

            display.textContent = value;
            updateTotalWeightDisplay();
        }

        function updateTotalWeightDisplay() {
            var total = 0;
            var dimensions = ['total', 'output', 'influence', 'contribution', 'mobility'];

            dimensions.forEach(function(dim) {
                total += parseInt(document.getElementById('weight-' + dim + '-input').value) || 0;
            });

            var display = document.getElementById('totalWeightDisplay');
            var status = document.getElementById('weightStatus');

            display.textContent = total + '%';

            if (total === 100) {
                display.style.color = '#52c41a';
                status.className = 'summary-status valid';
                status.innerHTML = '<i class="fas fa-check-circle"></i><span>权重分配合理</span>';
            } else {
                display.style.color = '#ff4d4f';
                status.className = 'summary-status invalid';
                status.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>总权重必须为100%（当前' + total + '%）</span>';
            }
        }

        function applyWeightPreset(preset) {
            var presets = {
                'balanced': { total: 30, output: 25, influence: 20, contribution: 15, mobility: 10 },
                'research': { total: 25, output: 30, influence: 25, contribution: 10, mobility: 10 },
                'industry': { total: 20, output: 20, influence: 15, contribution: 30, mobility: 15 },
                'innovation': { total: 25, output: 25, influence: 30, contribution: 10, mobility: 10 }
            };

            var weights = presets[preset];
            if (!weights) return;

            for (var key in weights) {
                document.getElementById('weight-' + key + '-slider').value = weights[key];
                document.getElementById('weight-' + key + '-input').value = weights[key];
                document.getElementById('weight-' + key + '-display').textContent = weights[key];
            }

            updateTotalWeightDisplay();
        }

        function applyWeights() {
            var total = 0;
            var dimensions = ['total', 'output', 'influence', 'contribution', 'mobility'];

            dimensions.forEach(function(dim) {
                var value = parseInt(document.getElementById('weight-' + dim + '-input').value) || 0;
                total += value;
                currentWeights[dim] = value;
            });

            if (total !== 100) {
                alert('总权重必须等于100%，当前为' + total + '%，请调整后重试。');
                return;
            }

            // 更新权重显示
            var weightItems = document.querySelectorAll('.weight-item');
            weightItems.forEach(function(item, index) {
                var dim = dimensions[index];
                var bar = item.querySelector('.weight-bar-fill');
                var valueSpan = item.querySelector('.weight-value');
                if (bar) bar.style.width = currentWeights[dim] + '%';
                if (valueSpan) valueSpan.textContent = currentWeights[dim] + '%';
            });

            // 更新权重标签
            var weightLabels = document.querySelectorAll('.index-card-weight');
            if (weightLabels.length >= 5) {
                weightLabels[0].textContent = '权重: ' + currentWeights.total + '%';
                weightLabels[1].textContent = '权重: ' + currentWeights.output + '%';
                weightLabels[2].textContent = '权重: ' + currentWeights.influence + '%';
                weightLabels[3].textContent = '权重: ' + currentWeights.contribution + '%';
                weightLabels[4].textContent = '权重: ' + currentWeights.mobility + '%';
            }

            // 重新计算综合指数
            recalculateCompositeIndex();

            // 更新所有可视化结果
            updateAllVisualizations();

            alert('权重设置已应用！\n\n' +
                '• 人才总量：' + currentWeights.total + '%\n' +
                '• 科研产出：' + currentWeights.output + '%\n' +
                '• 学术影响力：' + currentWeights.influence + '%\n' +
                '• 产业贡献度：' + currentWeights.contribution + '%\n' +
                '• 流动活跃度：' + currentWeights.mobility + '%\n\n' +
                '综合指数已重新计算，所有可视化图表已更新。');

            closeWeightSettings();
        }

        function recalculateCompositeIndex() {
            // 模拟重新计算综合指数
            var baseValues = {
                total: 92.5,
                output: 88.7,
                influence: 85.3,
                contribution: 79.8,
                mobility: 76.4
            };

            var compositeIndex = 0;
            compositeIndex += baseValues.total * (currentWeights.total / 100);
            compositeIndex += baseValues.output * (currentWeights.output / 100);
            compositeIndex += baseValues.influence * (currentWeights.influence / 100);
            compositeIndex += baseValues.contribution * (currentWeights.contribution / 100);
            compositeIndex += baseValues.mobility * (currentWeights.mobility / 100);

            // 更新综合指数卡片（假设有显示综合指数的卡片）
            console.log('重新计算的综合指数：' + compositeIndex.toFixed(1));
        }

        function updateAllVisualizations() {
            var checkedItems = Array.from(document.querySelectorAll('#compareCheckboxes input:checked')).map(function(input) {
                return input.value;
            });

            // 更新趋势图表
            var chartType = document.querySelector('.chart-btn.active')?.textContent === '柱状图' ? 'bar' : 'line';
            renderTrendChart(chartType);

            // 更新横向对比图表
            updateCompareBarChart(checkedItems);
            updateRadarChart(checkedItems);
            updateRadarLegend(checkedItems);

            // 更新热力图（如果存在）
            // updateHeatmap();

            // 更新雷达图（如果存在）
            // updateRadarChart();
        }

        // ========== 人才检索模块交互功能 ==========
        
        // 功能区1：语义检索开关
        function toggleSemanticSearch() {
            const semanticSwitch = document.querySelector('.semantic-switch');
            semanticSwitch.classList.toggle('active');
        }

        // 功能区1：执行搜索
        function performTalentSearch() {
            const searchInput = document.getElementById('talentSearchInput');
            const keyword = searchInput.value.trim();
            if (!keyword) {
                alert('请输入搜索关键词');
                return;
            }
            console.log('执行人才检索：' + keyword);
            // TODO: 实现实际的搜索逻辑
        }

        // 功能区2：切换更多筛选项
        function toggleMoreFilters() {
            alert('展开更多筛选项');
        }

        // 功能区2：重置筛选
        function resetFilters() {
            document.querySelectorAll('.filter-select, .filter-input').forEach(el => {
                if (el.tagName === 'SELECT') {
                    el.selectedIndex = 0;
                } else {
                    el.value = '';
                }
            });
            alert('筛选条件已重置');
        }

        // 功能区2：应用筛选
        function applyFilters() {
            alert('筛选条件已应用');
        }

        // 功能区6：切换视图
        function switchTalentView(viewType) {
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.closest('.view-btn').classList.add('active');
            console.log('切换到视图：' + viewType);
        }

        // 功能区6：排序结果
        function sortTalentResults() {
            const sortSelect = event.target;
            const sortType = sortSelect.options[sortSelect.selectedIndex].text;
            console.log('排序方式：' + sortType);
        }

        // 功能区6：导出菜单
        function toggleExportMenu() {
            alert('导出功能：\n• Excel格式\n• CSV格式\n• PDF格式');
        }

        // 功能区7：显示专家详情
        function showTalentDetail(id) {
            alert('查看专家详情：' + id + '\n\n功能开发中...');
        }

        // 功能区8：收藏专家
        function toggleTalentFavorite(id) {
            const icon = event.target.closest('.action-btn').querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            if (icon.classList.contains('fas')) {
                alert('已收藏专家');
            } else {
                alert('已取消收藏');
            }
        }

        // 功能区8：添加到对比
        function addToTalentCompare(id) {
            alert('已添加到对比列表：' + id);
        }

        // 功能区9：搜索历史
        function __domInit_1c() {
            const searchInput = document.getElementById('talentSearchInput');
            const historyPanel = document.getElementById('searchHistoryPanel');

            if (searchInput && historyPanel) {
                searchInput.addEventListener('focus', function() {
                    if (typeof showSearchHistory === 'function') showSearchHistory();
                    historyPanel.classList.add('show');
                });

                searchInput.addEventListener('blur', function() {
                    setTimeout(() => {
                        historyPanel.classList.remove('show');
                    }, 200);
                });
            }

            // 功能区10：统计标签切换
            document.querySelectorAll('.statistics-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.statistics-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // 功能区10：按机构筛选
            window.filterByInstitution = function(institution) {
                alert('筛选机构：' + institution);
            };
        };

  /* ---- script-2：检索 + 驾驶舱 + 订阅（基础版） ---- */
// ========== 人才检索模块交互功能 ==========

        // 语义映射表（用于关键词扩展）
        const semanticMapping = {
            'ai': '人工智能',
            'cv': '计算机视觉',
            'nlp': '自然语言处理',
            'ml': '机器学习',
            'dl': '深度学习',
            'kg': '知识图谱',
            'cnn': '卷积神经网络',
            'rnn': '循环神经网络',
            'gan': '生成对抗网络',
            'rl': '强化学习'
        };

        // 专家数据库
        const expertDatabase = [
            {
                id: 1,
                name: '张伟',
                title: '教授 / 博士生导师',
                institution: '清华大学',
                research: ['人工智能', '机器学习'],
                achievements: '基于深度学习的图像识别算法研究',
                papers: 156,
                citations: 8924,
                hIndex: 45,
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                representativePapers: [
                    { title: '基于深度学习的图像识别算法研究', journal: 'IEEE TPAMI', year: 2023, citations: 245 },
                    { title: '卷积神经网络在目标检测中的应用', journal: 'CVPR', year: 2022, citations: 189 },
                    { title: '深度强化学习在机器人控制中的探索', journal: 'ICML', year: 2021, citations: 167 }
                ],
                projects: [
                    { name: '国家自然科学基金重点项目', role: '主持', period: '2020-2024', funding: '300万元' },
                    { name: '科技创新2030重大项目', role: '核心成员', period: '2021-2025', funding: '500万元' }
                ]
            },
            {
                id: 2,
                name: '李娜',
                title: '研究员',
                institution: '中国科学院',
                research: ['计算机视觉', '图像处理'],
                achievements: '实时视频目标跟踪系统设计与实现',
                papers: 134,
                citations: 7652,
                hIndex: 41,
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                representativePapers: [
                    { title: '实时视频目标跟踪系统设计与实现', journal: 'CVPR', year: 2022, citations: 189 },
                    { title: '多模态信息融合技术', journal: 'ECCV', year: 2021, citations: 145 },
                    { title: '视觉注意力机制研究', journal: 'NeurIPS', year: 2020, citations: 132 }
                ],
                projects: [
                    { name: '中科院先导专项', role: '负责人', period: '2019-2023', funding: '400万元' },
                    { name: '国家重点研发计划', role: '课题负责人', period: '2020-2024', funding: '250万元' }
                ]
            },
            {
                id: 3,
                name: '王强',
                title: '副教授',
                institution: '北京大学',
                research: ['自然语言处理', '知识图谱'],
                achievements: '大语言模型知识增强方法研究',
                papers: 98,
                citations: 5432,
                hIndex: 36,
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                representativePapers: [
                    { title: '大语言模型知识增强方法研究', journal: 'ACL', year: 2023, citations: 178 },
                    { title: '知识图谱构建与应用', journal: 'AAAI', year: 2022, citations: 156 },
                    { title: '多语言预训练模型', journal: 'EMNLP', year: 2021, citations: 134 }
                ],
                projects: [
                    { name: '国家自然科学基金青年项目', role: '主持', period: '2021-2023', funding: '30万元' },
                    { name: '企业合作项目', role: '技术负责人', period: '2022-2024', funding: '150万元' }
                ]
            },
            {
                id: 4,
                name: '陈明',
                title: '教授',
                institution: '浙江大学',
                research: ['深度学习', '数据挖掘'],
                achievements: '大规模图神经网络算法优化',
                papers: 167,
                citations: 9456,
                hIndex: 48,
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                representativePapers: [
                    { title: '大规模图神经网络算法优化', journal: 'ICLR', year: 2023, citations: 234 },
                    { title: '图表示学习前沿技术', journal: 'NeurIPS', year: 2022, citations: 198 },
                    { title: '深度学习在推荐系统中的应用', journal: 'KDD', year: 2021, citations: 176 }
                ],
                projects: [
                    { name: '国家自然科学基金面上项目', role: '主持', period: '2020-2024', funding: '60万元' },
                    { name: '华为校企合作项目', role: '负责人', period: '2021-2025', funding: '800万元' }
                ]
            },
            {
                id: 5,
                name: '赵强',
                title: '研究员',
                institution: '复旦大学',
                research: ['机器学习', '强化学习'],
                achievements: '多智能体协同决策算法',
                papers: 112,
                citations: 6234,
                hIndex: 38,
                gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                representativePapers: [
                    { title: '多智能体协同决策算法', journal: 'ICML', year: 2023, citations: 145 },
                    { title: '深度强化学习探索效率提升', journal: 'NeurIPS', year: 2022, citations: 123 },
                    { title: '联邦学习隐私保护机制', journal: 'AAAI', year: 2021, citations: 98 }
                ],
                projects: [
                    { name: '科技部重点研发计划', role: '子课题负责人', period: '2020-2024', funding: '200万元' },
                    { name: '上海市科委项目', role: '负责人', period: '2022-2025', funding: '120万元' }
                ]
            },
            {
                id: 6,
                name: '刘芳',
                title: '教授 / 博士生导师',
                institution: '清华大学',
                research: ['人工智能', '计算机视觉'],
                achievements: '图像语义理解与生成研究',
                papers: 145,
                citations: 7890,
                hIndex: 43,
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                representativePapers: [
                    { title: '图像语义理解与生成研究', journal: 'CVPR', year: 2023, citations: 198 },
                    { title: '视觉-语言多模态学习', journal: 'ECCV', year: 2022, citations: 167 },
                    { title: '图像生成质量评估方法', journal: 'IEEE TPAMI', year: 2021, citations: 145 }
                ],
                projects: [
                    { name: '国家自然科学基金重点项目', role: '主持', period: '2021-2025', funding: '320万元' },
                    { name: '腾讯优图联合实验室项目', role: '负责人', period: '2020-2024', funding: '500万元' }
                ]
            },
            {
                id: 7,
                name: '孙浩',
                title: '副教授',
                institution: '北京大学',
                research: ['自然语言处理', '机器翻译'],
                achievements: '神经机器翻译优化方法',
                papers: 89,
                citations: 4567,
                hIndex: 33,
                gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                representativePapers: [
                    { title: '神经机器翻译优化方法', journal: 'ACL', year: 2022, citations: 123 },
                    { title: '低资源语言翻译技术', journal: 'EMNLP', year: 2021, citations: 98 },
                    { title: '多模态机器翻译研究', journal: 'AAAI', year: 2020, citations: 87 }
                ],
                projects: [
                    { name: '国家自然科学基金青年项目', role: '主持', period: '2022-2025', funding: '28万元' },
                    { name: '字节跳动合作项目', role: '核心成员', period: '2021-2024', funding: '200万元' }
                ]
            },
            {
                id: 8,
                name: '周杰',
                title: '研究员',
                institution: '中国科学院',
                research: ['数据挖掘', '大数据分析'],
                achievements: '分布式机器学习框架设计',
                papers: 124,
                citations: 6789,
                hIndex: 40,
                gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                representativePapers: [
                    { title: '分布式机器学习框架设计', journal: 'VLDB', year: 2023, citations: 156 },
                    { title: '大规模数据流处理技术', journal: 'SIGMOD', year: 2022, citations: 134 },
                    { title: '知识图谱问答系统', journal: 'WWW', year: 2021, citations: 112 }
                ],
                projects: [
                    { name: '中科院战略性先导专项', role: '核心成员', period: '2020-2024', funding: '600万元' },
                    { name: '阿里巴巴合作项目', role: '负责人', period: '2022-2025', funding: '300万元' }
                ]
            },
            {
                id: 9,
                name: '吴敏',
                title: '教授',
                institution: '上海交通大学',
                research: ['人工智能', '模式识别'],
                achievements: '生物特征识别技术创新',
                papers: 138,
                citations: 7234,
                hIndex: 42,
                gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
                representativePapers: [
                    { title: '生物特征识别技术创新', journal: 'IEEE TIP', year: 2023, citations: 167 },
                    { title: '多模态生物识别研究', journal: 'CVPR', year: 2022, citations: 145 },
                    { title: '人脸识别隐私保护方法', journal: 'ICCV', year: 2021, citations: 123 }
                ],
                projects: [
                    { name: '国家自然科学基金面上项目', role: '主持', period: '2021-2025', funding: '55万元' },
                    { name: '商汤科技联合实验室', role: '负责人', period: '2020-2024', funding: '450万元' }
                ]
            },
            {
                id: 10,
                name: '郑涛',
                title: '副教授',
                institution: '浙江大学',
                research: ['深度学习', '计算机视觉'],
                achievements: '三维视觉重建方法研究',
                papers: 102,
                citations: 5123,
                hIndex: 35,
                gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                representativePapers: [
                    { title: '三维视觉重建方法研究', journal: 'ICCV', year: 2022, citations: 134 },
                    { title: '神经渲染技术探索', journal: 'NeurIPS', year: 2021, citations: 112 },
                    { title: '点云处理深度学习方法', journal: 'CVPR', year: 2020, citations: 98 }
                ],
                projects: [
                    { name: '国家自然科学基金青年项目', role: '主持', period: '2022-2025', funding: '30万元' },
                    { name: '之江实验室合作项目', role: '核心成员', period: '2021-2024', funding: '180万元' }
                ]
            }
        ];

        // 推荐专家数据
        const recommendExperts = [
            { id: 5, name: '赵强', title: '研究员', institution: '复旦大学', research: ['机器学习', '强化学习'], papers: 112, citations: 6234, hIndex: 38, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', relevance: 95, tags: ['high'], reason: '与当前搜索"人工智能"高度相关，研究方向与张伟教授相似。' },
            { id: 6, name: '刘芳', title: '教授/博士生导师', institution: '清华大学', research: ['人工智能', '计算机视觉'], papers: 145, citations: 7890, hIndex: 43, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', relevance: 88, tags: ['same-institution'], reason: '与您关注的专家同属清华大学，研究方向互补。' },
            { id: 7, name: '孙浩', title: '副教授', institution: '北京大学', research: ['自然语言处理', '机器翻译'], papers: 89, citations: 4567, hIndex: 33, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', relevance: 82, tags: ['potential'], reason: '研究方向与当前查询匹配度较高，建议关注。' },
            { id: 8, name: '周杰', title: '研究员', institution: '中国科学院', research: ['数据挖掘', '大数据分析'], papers: 124, citations: 6789, hIndex: 40, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', relevance: 76, tags: ['research-similar'], reason: '研究背景与当前领域专家相似，具有合作潜力。' },
            { id: 9, name: '吴敏', title: '教授', institution: '上海交通大学', research: ['人工智能', '模式识别'], papers: 138, citations: 7234, hIndex: 42, gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', relevance: 71, tags: ['high'], reason: '在模式识别领域有重要贡献，研究成果丰富。' },
            { id: 10, name: '郑涛', title: '副教授', institution: '浙江大学', research: ['深度学习', '计算机视觉'], papers: 102, citations: 5123, hIndex: 35, gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', relevance: 65, tags: ['potential'], reason: '深度学习方向的新兴学者，发展潜力巨大。' },
            { id: 1, name: '张伟', title: '教授 / 博士生导师', institution: '清华大学', research: ['人工智能', '机器学习'], papers: 156, citations: 8924, hIndex: 45, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', relevance: 63, tags: ['high'], reason: '在深度学习与智能感知方向持续产出高质量成果。' },
            { id: 2, name: '李娜', title: '研究员', institution: '中国科学院', research: ['计算机视觉', '图像处理'], papers: 134, citations: 7652, hIndex: 41, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', relevance: 61, tags: ['research-similar'], reason: '长期开展视觉理解与智能分析研究，成果转化基础扎实。' },
            { id: 3, name: '王强', title: '副教授', institution: '北京大学', research: ['自然语言处理', '知识图谱'], papers: 98, citations: 5432, hIndex: 36, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', relevance: 58, tags: ['potential'], reason: '在知识增强与语言智能方向具有较好的合作潜力。' },
            { id: 4, name: '陈明', title: '教授', institution: '浙江大学', research: ['深度学习', '数据挖掘'], papers: 167, citations: 9456, hIndex: 48, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', relevance: 55, tags: ['same-institution'], reason: '关注图神经网络与复杂数据建模，研究成果具有代表性。' }
        ];

        // 语义检索状态
        let semanticSearchEnabled = true;
        let searchInputDebounce = null;

        // 筛选状态管理
        let activeFilters = {
            name: '',
            institution: '',
            research: '',
            title: '',
            achievement: '',
            project: '',
            achievementTypes: [],
            impactLevels: []
        };

        // 搜索历史与推荐分页状态
        let searchHistory = ['人工智能', '清华大学'];
        let lockedSearchHistory = new Set();
        let recommendationVisibleCount = 2;
        let recommendationLoadCount = 0;

        // 渲染推荐专家
        function renderRecommendations() {
            const recommendContent = document.querySelector('.recommend-content');
            if (!recommendContent) return;

            recommendContent.innerHTML = recommendExperts.slice(0, recommendationVisibleCount).map(expert => {
                const tagClass = {
                    'high': 'high',
                    'potential': 'potential',
                    'same-institution': 'institution',
                    'research-similar': 'similar'
                }[expert.tags[0]] || '';

                const tagName = {
                    'high': '<i class="fas fa-fire"></i> 高相关',
                    'potential': '<i class="fas fa-handshake"></i> 潜在合作',
                    'same-institution': '<i class="fas fa-building"></i> 同机构',
                    'research-similar': '<i class="fas fa-project-diagram"></i> 研究相似'
                }[expert.tags[0]] || '<i class="fas fa-star"></i> 推荐';

                return `
                    <div class="recommend-card" onclick="showTalentDetail(${expert.id})">
                        <div class="recommend-header-content">
                            <div class="recommend-avatar" style="background: ${expert.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                                ${expert.name.charAt(0)}
                            </div>
                            <div class="recommend-info">
                                <div class="recommend-name">${expert.name}</div>
                                <div class="recommend-institution">
                                    <i class="fas fa-university"></i> ${expert.institution}
                                </div>
                            </div>
                        </div>
                        <span class="recommend-tag ${tagClass}">
                            ${tagName}
                        </span>
                        <div class="recommend-reason">
                            ${expert.reason}
                        </div>
                    </div>
                `;
            }).join('');

            const moreButton = document.getElementById('recommendMoreBtn');
            if (moreButton) {
                const canLoadMore = recommendationLoadCount < 2 && recommendationVisibleCount < recommendExperts.length;
                moreButton.disabled = !canLoadMore;
                moreButton.innerHTML = canLoadMore
                    ? '<i class="fas fa-plus-circle" style="margin-right: 6px;"></i>查看更多推荐'
                    : '<i class="fas fa-check-circle" style="margin-right: 6px;"></i>已展示全部推荐';
            }
        }

        // 更新专家结果列表
        function updateExpertResults(experts) {
            const gridContainer = document.getElementById('talentGridContainer');
            if (!gridContainer) return;

            if (experts.length === 0) {
                gridContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #999;">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                        <div style="font-size: 16px; margin-bottom: 8px;">暂无匹配的专家</div>
                        <div style="font-size: 13px;">请尝试调整搜索条件或筛选条件</div>
                    </div>
                `;
                return;
            }

            gridContainer.innerHTML = experts.map(expert => `
                <div class="expert-card" onclick="showTalentDetail(${expert.id})">
                    <div class="expert-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); toggleTalentFavorite(${expert.id})" title="收藏">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); addToTalentCompare(${expert.id})" title="对比">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>
                    <div class="expert-header">
                        <div class="expert-avatar" style="background: ${expert.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                            ${expert.name.charAt(0)}
                        </div>
                        <div class="expert-info">
                            <div class="expert-name">${expert.name}</div>
                            <div class="expert-title">${expert.title}</div>
                            <div class="expert-institution">
                                <i class="fas fa-university"></i> ${expert.institution}
                            </div>
                        </div>
                    </div>
                    <div class="expert-research">
                        <div class="research-label">研究方向</div>
                        <div class="research-tags">
                            ${expert.research.map(r => `<span class="research-tag">${r}</span>`).join('')}
                        </div>
                    </div>
                    <div class="expert-achievement">
                        <div class="achievement-title">
                            <i class="fas fa-trophy"></i> 代表成果
                        </div>
                        <div class="achievement-item" onmouseenter="showAchievementTooltip(event, '${expert.achievements}')" onmouseleave="hideAchievementTooltip()">
                            ${expert.achievements}
                        </div>
                    </div>
                    <div class="expert-stats">
                        <div class="stat-item">
                            <div class="stat-value">${expert.papers}</div>
                            <div class="stat-label">论文数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${expert.citations.toLocaleString()}</div>
                            <div class="stat-label">引用量</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${expert.hIndex}</div>
                            <div class="stat-label">H指数</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 计算专家相关度
        function calculateRelevance(keyword, expert) {
            let score = 0;
            const lowerKeyword = keyword.toLowerCase();

            // 姓名匹配（最高权重）
            if (expert.name.toLowerCase().includes(lowerKeyword)) {
                score += 50;
            }

            // 机构匹配
            if (expert.institution.toLowerCase().includes(lowerKeyword)) {
                score += 30;
            }

            // 研究方向匹配
            if (expert.research.some(r => r.toLowerCase().includes(lowerKeyword))) {
                score += 15;
            }

            // 成果匹配
            if (expert.achievements.toLowerCase().includes(lowerKeyword)) {
                score += 8;
            }

            // 语义映射匹配
            const mappedKeyword = semanticMapping[lowerKeyword];
            if (mappedKeyword) {
                if (expert.research.some(r => r.toLowerCase().includes(mappedKeyword.toLowerCase()))) {
                    score += 12;
                }
                if (expert.achievements.toLowerCase().includes(mappedKeyword.toLowerCase())) {
                    score += 5;
                }
            }

            return score;
        }

        function getGradientByIndex(index) {
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
                'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
            ];
            return gradients[index % gradients.length];
        }

        // 功能区1：语义检索开关
        function toggleSemanticSearch() {
            const semanticSwitch = document.getElementById('semanticSwitch');
            semanticSearchEnabled = !semanticSearchEnabled;

            if (semanticSearchEnabled) {
                semanticSwitch.classList.add('active');
                showToast('已切换至语义检索模式，支持智能理解', 'success');
            } else {
                semanticSwitch.classList.remove('active');
                showToast('已切换至关键词匹配模式，精确匹配', 'info');
            }

            // 如果有输入内容，重新搜索
            const searchInput = document.getElementById('talentSearchInput');
            if (searchInput && searchInput.value.trim()) {
                handleSearchInput();
            }
        }

        // 功能区1：处理搜索输入
        function handleSearchInput() {
            const searchInput = document.getElementById('talentSearchInput');
            if (!searchInput) return;
            const keyword = searchInput.value.trim();

            // 防抖处理
            clearTimeout(searchInputDebounce);
            searchInputDebounce = setTimeout(() => {
                if (keyword.length > 0) {
                    showSearchSuggestions(keyword);
                    showCandidateExperts(keyword);
                } else {
                    hideSearchSuggestions();
                    hideCandidateExperts();
                }
            }, 300);
        }

        // 功能区1：显示搜索建议
        function showSearchSuggestions(keyword) {
            const suggestionSection = document.getElementById('searchSuggestionSection');
            const suggestionList = document.getElementById('searchSuggestionList');
            if (!suggestionSection || !suggestionList) return;

            // 根据关键词生成搜索建议
            const suggestions = generateSearchSuggestions(keyword);

            if (suggestions.length > 0) {
                suggestionList.innerHTML = suggestions.map(s => `
                    <div class="suggestion-item" onclick="useSuggestion('${s}')">
                        <i class="fas fa-lightbulb"></i>
                        ${highlightKeyword(s, keyword)}
                    </div>
                `).join('');
                suggestionSection.style.display = 'block';
            } else {
                suggestionSection.style.display = 'none';
            }
        }

        // 功能区1：生成搜索建议
        function generateSearchSuggestions(keyword) {
            const suggestions = [];
            const lowerKeyword = keyword.toLowerCase();

            // 研究方向建议
            const researchAreas = ['人工智能', '机器学习', '深度学习', '计算机视觉', '自然语言处理', '知识图谱', '数据挖掘', '强化学习'];
            researchAreas.forEach(area => {
                if (area.toLowerCase().includes(lowerKeyword) || lowerKeyword.includes(area.toLowerCase())) {
                    if (!suggestions.includes(area)) {
                        suggestions.push(area);
                    }
                }
            });

            // 机构建议
            const institutions = ['清华大学', '北京大学', '浙江大学', '复旦大学', '中国科学院', '上海交通大学'];
            institutions.forEach(inst => {
                if (inst.toLowerCase().includes(lowerKeyword)) {
                    if (!suggestions.includes(inst)) {
                        suggestions.push(inst);
                    }
                }
            });

            // 组合建议
            const combinations = [
                '人工智能专家',
                '机器学习研究',
                '计算机视觉应用',
                '自然语言处理',
                '深度学习算法'
            ];
            combinations.forEach(comb => {
                if (comb.toLowerCase().includes(lowerKeyword)) {
                    if (!suggestions.includes(comb)) {
                        suggestions.push(comb);
                    }
                }
            });

            return suggestions.slice(0, 5);
        }

        // 功能区1：高亮关键词
        function highlightKeyword(text, keyword) {
            if (!keyword) return text;
            const regex = new RegExp(`(${keyword})`, 'gi');
            return text.replace(regex, '<span style="color: #1890ff; font-weight: 600;">$1</span>');
        }

        // 功能区1：显示候选专家
        function showCandidateExperts(keyword) {
            const candidateSection = document.getElementById('candidateSection');
            const candidateList = document.getElementById('candidateExpertList');
            if (!candidateSection || !candidateList) return;

            // 计算相关度并排序
            const candidates = expertDatabase.map(expert => ({
                ...expert,
                relevance: calculateRelevance(keyword, expert)
            })).filter(expert => expert.relevance > 0)
              .sort((a, b) => b.relevance - a.relevance)
              .slice(0, 4);

            if (candidates.length > 0) {
                candidateList.innerHTML = candidates.map(expert => `
                    <div class="candidate-expert-card" onclick="selectCandidateExpert(${expert.id})">
                        <div class="candidate-avatar" style="background: ${getGradientByIndex(expert.id)}">${expert.name.charAt(0)}</div>
                        <div class="candidate-info">
                            <div class="candidate-name">${highlightKeyword(expert.name, keyword)}</div>
                            <div class="candidate-details">
                                <span><i class="fas fa-university"></i> ${expert.institution}</span>
                                <span>${expert.research[0]}</span>
                                <div class="candidate-relevance">
                                    <i class="fas fa-star"></i> ${expert.relevance}%
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                candidateSection.style.display = 'block';
            } else {
                candidateSection.style.display = 'none';
            }
        }

        // 功能区1：选择候选专家
        function selectCandidateExpert(id) {
            showTalentDetail(id);
            hideSearchHistory();
        }

        // 功能区1：使用搜索建议
        function useSuggestion(suggestion) {
            const searchInput = document.getElementById('talentSearchInput');
            if (!searchInput) return;
            searchInput.value = suggestion;
            hideSearchSuggestions();
            hideCandidateExperts();
            performTalentSearch();
        }

        // 功能区1：隐藏搜索建议
        function hideSearchSuggestions() {
            const el = document.getElementById('searchSuggestionSection');
            if (el) el.style.display = 'none';
        }

        // 功能区1：隐藏候选专家
        function hideCandidateExperts() {
            const el = document.getElementById('candidateSection');
            if (el) el.style.display = 'none';
        }

        // 功能区1：显示搜索历史
        function showSearchHistory() {
            const historyPanel = document.getElementById('searchHistoryPanel');
            const historyList = document.getElementById('searchHistoryList');
            if (!historyPanel || !historyList) return;

            if (searchHistory.length > 0) {
                historyList.innerHTML = searchHistory.slice(0, 2).map((keyword, index) => `
                    <div class="history-item" data-history-index="${index}" onclick="useSearchHistory('${keyword}')">
                        <i class="fas fa-history"></i>
                        <span class="history-keyword">${keyword}</span>
                        <span class="history-actions">
                            <button type="button" class="history-lock-btn${lockedSearchHistory.has(keyword) ? ' active' : ''}" onclick="event.stopPropagation(); setSearchHistoryLock(${index}, true, this)" title="锁定"><i class="fas fa-lock"></i></button>
                            <button type="button" class="history-lock-btn" onclick="event.stopPropagation(); setSearchHistoryLock(${index}, false, this)" title="解锁"><i class="fas fa-unlock"></i></button>
                        </span>
                    </div>
                `).join('');
                historyPanel.classList.add('show');
            }
        }

        // 功能区1：隐藏搜索历史
        function hideSearchHistory() {
            const el = document.getElementById('searchHistoryPanel');
            if (el) el.classList.remove('show');
            hideSearchSuggestions();
            hideCandidateExperts();
        }

        // 功能区1：使用搜索历史
        function useSearchHistory(keyword) {
            const searchInput = document.getElementById('talentSearchInput');
            if (!searchInput) return;
            searchInput.value = keyword;
            hideSearchHistory();
            performTalentSearch();
        }

        // 功能区1：清除搜索历史
        function clearSearchHistory() {
            searchHistory = searchHistory.filter(keyword => lockedSearchHistory.has(keyword));
            showSearchHistory();
            showToast('搜索历史已清除', 'success');
        }

        // 功能区1：处理搜索框键盘事件
        function handleSearchKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                hideSearchHistory();
                performTalentSearch();
            } else if (event.key === 'Escape') {
                hideSearchHistory();
            }
        }

        // 功能区1：执行搜索
        function performTalentSearch() {
            const searchInput = document.getElementById('talentSearchInput');
            if (!searchInput) return;
            const keyword = searchInput.value.trim();
            if (!keyword) {
                showToast('请输入搜索关键词', 'warning');
                return;
            }

            // 添加到搜索历史
            if (!searchHistory.includes(keyword)) {
                searchHistory.unshift(keyword);
                if (searchHistory.length > 10) searchHistory.pop();
            }

            // 计算每个专家的相关度
            const scoredExperts = expertDatabase.map(expert => ({
                ...expert,
                relevance: calculateRelevance(keyword, expert)
            })).filter(expert => expert.relevance > 0);

            // 如果启用了语义检索，使用语义相关度
            // 如果未启用，只进行严格的关键词匹配
            let finalExperts = scoredExperts;
            if (!semanticSearchEnabled) {
                finalExperts = scoredExperts.filter(expert => {
                    // 严格匹配：姓名、机构、研究方向、成果
                    return expert.name.toLowerCase().includes(keyword.toLowerCase()) ||
                           expert.institution.toLowerCase().includes(keyword.toLowerCase()) ||
                           expert.research.some(r => r.toLowerCase().includes(keyword.toLowerCase())) ||
                           expert.achievements.toLowerCase().includes(keyword.toLowerCase());
                });
            }

            // 按相关度排序
            finalExperts.sort((a, b) => b.relevance - a.relevance);

            // 更新结果
            updateExpertResults(finalExperts);
            const resultCount = document.getElementById('resultCount');
            if (resultCount) resultCount.textContent = finalExperts.length;

            // 滚动到结果区
            const resultsSection = document.querySelector('.experts-results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // 刷新推荐
            renderRecommendations();

            const mode = semanticSearchEnabled ? '语义检索' : '关键词匹配';
            showToast(`${mode}完成，找到 ${finalExperts.length} 位相关专家`, 'success');
        }

        // 功能区2：切换更多筛选项
        function toggleMoreFilters() {
            const moreFiltersBox = document.getElementById('moreFiltersBox');
            const expandBtn = document.querySelector('.filter-actions button[onclick="toggleMoreFilters()"]');
            if (!moreFiltersBox || !expandBtn) return;

            if (moreFiltersBox.style.display === 'none') {
                moreFiltersBox.style.display = 'block';
                expandBtn.innerHTML = '<i class="fas fa-minus"></i> 收起更多';
                showToast('已展开更多筛选项', 'info');
            } else {
                moreFiltersBox.style.display = 'none';
                expandBtn.innerHTML = '<i class="fas fa-plus"></i> 展开更多';
            }
        }

        // 功能区2：更新已选条件显示
        function updateActiveFiltersDisplay() {
            const activeFiltersBox = document.getElementById('activeFiltersBox');
            const activeFiltersText = document.getElementById('activeFiltersText');
            if (!activeFiltersBox || !activeFiltersText) return;

            const filters = [];
            if (activeFilters.name) filters.push(`姓名: ${activeFilters.name}`);
            if (activeFilters.institution) filters.push(`机构: ${activeFilters.institution}`);
            if (activeFilters.research) filters.push(`研究方向: ${activeFilters.research}`);
            if (activeFilters.title) filters.push(`职称: ${activeFilters.title}`);
            if (activeFilters.achievement) filters.push(`成果: ${activeFilters.achievement}`);

            if (filters.length > 0) {
                activeFiltersText.innerHTML = filters.map(f => `
                    <span class="active-filter-tag">${f} <i class="fas fa-times" onclick="removeFilter('${f.split(':')[0]}')"></i></span>
                `).join('');
                activeFiltersBox.style.display = 'block';
            } else {
                activeFiltersBox.style.display = 'none';
            }
        }

        // 功能区2：移除单个筛选条件
        function removeFilter(filterType) {
            switch(filterType) {
                case '姓名':
                    activeFilters.name = '';
                    document.getElementById('filterName').value = '';
                    break;
                case '机构':
                    activeFilters.institution = '';
                    document.getElementById('filterInstitution').value = '';
                    break;
                case '研究方向':
                    activeFilters.research = '';
                    document.getElementById('filterResearch').value = '';
                    break;
                case '职称':
                    activeFilters.title = '';
                    document.getElementById('filterTitle').value = '';
                    break;
                case '成果':
                    activeFilters.achievement = '';
                    document.getElementById('filterAchievement').value = '';
                    break;
            }
            applyFilters();
        }

        // 功能区2：重置所有筛选
        function resetAllFilters() {
            activeFilters = {
                name: '',
                institution: '',
                research: '',
                title: '',
                achievement: '',
                project: '',
                achievementTypes: [],
                impactLevels: []
            };

            // 重置表单
            const filterName = document.getElementById('filterName');
            const filterInstitution = document.getElementById('filterInstitution');
            const filterResearch = document.getElementById('filterResearch');
            const filterTitle = document.getElementById('filterTitle');
            const filterAchievement = document.getElementById('filterAchievement');
            const filterProject = document.getElementById('filterProject');

            if (filterName) filterName.value = '';
            if (filterInstitution) filterInstitution.value = '';
            if (filterResearch) filterResearch.value = '';
            if (filterTitle) filterTitle.value = '';
            if (filterAchievement) filterAchievement.value = '';
            if (filterProject) filterProject.value = '';

            // 重置复选框
            document.querySelectorAll('.achievement-type-checkbox, .impact-level-checkbox').forEach(cb => {
                cb.checked = false;
            });

            // 更新显示
            updateExpertResults(expertDatabase);
            const resultCount = document.getElementById('resultCount');
            if (resultCount) resultCount.textContent = expertDatabase.length;
            updateActiveFiltersDisplay();

            showToast('筛选条件已重置', 'success');
        }

        // 功能区2：应用筛选
        function applyFilters() {
            // 收集筛选条件
            const filterName = document.getElementById('filterName');
            const filterInstitution = document.getElementById('filterInstitution');
            const filterResearch = document.getElementById('filterResearch');
            const filterTitle = document.getElementById('filterTitle');
            const filterAchievement = document.getElementById('filterAchievement');
            const filterProject = document.getElementById('filterProject');

            activeFilters = {
                name: filterName ? filterName.value.trim() : '',
                institution: filterInstitution ? filterInstitution.value.trim() : '',
                research: filterResearch ? filterResearch.value.trim() : '',
                title: filterTitle ? filterTitle.value.trim() : '',
                achievement: filterAchievement ? filterAchievement.value.trim() : '',
                project: filterProject ? filterProject.value.trim() : '',
                achievementTypes: [],
                impactLevels: []
            };

            // 收集成果类型
            document.querySelectorAll('.achievement-type-checkbox:checked').forEach(cb => {
                activeFilters.achievementTypes.push(cb.value);
            });

            // 收集影响力等级
            document.querySelectorAll('.impact-level-checkbox:checked').forEach(cb => {
                activeFilters.impactLevels.push(cb.value);
            });

            // 过滤专家
            const filteredExperts = filterExpertResults(expertDatabase, activeFilters);

            // 更新显示
            updateExpertResults(filteredExperts);
            updateActiveFiltersDisplay();
            const resultCount = document.getElementById('resultCount');
            if (resultCount) resultCount.textContent = filteredExperts.length;

            // 滚动到结果区
            const resultsSection = document.querySelector('.experts-results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            showToast(`筛选完成，找到 ${filteredExperts.length} 位专家`, 'success');
        }

        // 过滤专家结果
        function filterExpertResults(experts, filters) {
            return experts.filter(expert => {
                // 姓名过滤
                if (filters.name && !expert.name.includes(filters.name)) return false;

                // 机构过滤
                if (filters.institution && expert.institution !== filters.institution) return false;

                // 研究方向过滤
                if (filters.research && !expert.research.includes(filters.research)) return false;

                // 职称过滤（包含匹配）
                if (filters.title && !expert.title.includes(filters.title)) return false;

                // 成果关键词过滤
                if (filters.achievement && !expert.achievements.includes(filters.achievement)) return false;

                // 成果类型过滤（简化处理，实际需要更详细的数据）
                if (filters.achievementTypes.length > 0) {
                    // 这里简化处理，实际需要根据专家的成果类型数据
                    // 暂时假设都有论文、专利、项目
                }

                // 影响力等级过滤
                if (filters.impactLevels.length > 0) {
                    let levelMatch = false;
                    filters.impactLevels.forEach(level => {
                        if (level === '高影响力' && expert.hIndex >= 40) levelMatch = true;
                        if (level === '中高影响力' && expert.hIndex >= 30 && expert.hIndex < 40) levelMatch = true;
                        if (level === '中等影响力' && expert.hIndex >= 20 && expert.hIndex < 30) levelMatch = true;
                        if (level === '新兴学者' && expert.hIndex < 20) levelMatch = true;
                    });
                    if (!levelMatch) return false;
                }

                return true;
            });
        }

        // 功能区3：显示专家详情
        let currentExpertId = null;

        function showTalentDetail(id) {
            const expert = expertDatabase.find(e => e.id === id);
            if (!expert) return;

            currentExpertId = id;

            // 填充基本信息
            const expertDetailAvatar = document.getElementById('expertDetailAvatar');
            const expertDetailName = document.getElementById('expertDetailName');
            const expertDetailTitle = document.getElementById('expertDetailTitle');
            const expertDetailInstitution = document.getElementById('expertDetailInstitution');

            if (expertDetailAvatar) expertDetailAvatar.textContent = expert.name.charAt(0);
            if (expertDetailName) expertDetailName.textContent = expert.name;
            if (expertDetailTitle) expertDetailTitle.textContent = expert.title;
            if (expertDetailInstitution) expertDetailInstitution.innerHTML = `<i class="fas fa-university"></i> ${expert.institution}`;

            // 填充研究方向
            const expertDetailResearch = document.getElementById('expertDetailResearch');
            if (expertDetailResearch) {
                expertDetailResearch.innerHTML = `
                    <h4><i class="fas fa-microscope"></i> 研究方向</h4>
                    <div class="expert-detail-research-tags">
                        ${expert.research.map(r => `<span class="expert-detail-research-tag">${r}</span>`).join('')}
                    </div>
                `;
            }

            // 填充学术统计
            const expertDetailPapers = document.getElementById('expertDetailPapers');
            const expertDetailCitations = document.getElementById('expertDetailCitations');
            const expertDetailHIndex = document.getElementById('expertDetailHIndex');
            const expertDetailAvgCitations = document.getElementById('expertDetailAvgCitations');

            if (expertDetailPapers) expertDetailPapers.textContent = expert.papers;
            if (expertDetailCitations) expertDetailCitations.textContent = expert.citations.toLocaleString();
            if (expertDetailHIndex) expertDetailHIndex.textContent = expert.hIndex;
            if (expertDetailAvgCitations) expertDetailAvgCitations.textContent = (expert.citations / expert.papers).toFixed(1);

            // 填充代表性论文
            const papersList = document.getElementById('expertDetailPapersList');
            if (papersList) {
                if (expert.representativePapers && expert.representativePapers.length > 0) {
                    papersList.innerHTML = expert.representativePapers.map(paper => `
                        <div class="expert-detail-paper-item">
                            <div class="expert-detail-paper-title">${paper.title}</div>
                            <div class="expert-detail-paper-meta">${paper.journal} • ${paper.year} • 引用: ${paper.citations}</div>
                        </div>
                    `).join('');
                } else {
                    papersList.innerHTML = `
                        <div class="expert-detail-paper-item">
                            <div class="expert-detail-paper-title">${expert.achievements}</div>
                            <div class="expert-detail-paper-meta">发表于IEEE TPAMI 2023 • 引用: ${Math.floor(expert.citations * 0.1)}</div>
                        </div>
                    `;
                }
            }

            // 填充项目经历
            const projectsList = document.getElementById('expertDetailProjectsList');
            if (projectsList) {
                if (expert.projects && expert.projects.length > 0) {
                    projectsList.innerHTML = expert.projects.map(proj => `
                        <div class="expert-detail-project-item">
                            <div class="expert-detail-project-name">${proj.name}</div>
                            <div class="expert-detail-project-meta">
                                <span><i class="fas fa-user"></i> ${proj.role}</span>
                                <span><i class="fas fa-calendar"></i> ${proj.period}</span>
                                <span><i class="fas fa-money-bill"></i> ${proj.funding}</span>
                            </div>
                        </div>
                    `).join('');
                } else {
                    projectsList.innerHTML = `
                        <div class="expert-detail-project-item">
                            <div class="expert-detail-project-name">国家自然科学基金重点项目</div>
                            <div class="expert-detail-project-meta">
                                <span><i class="fas fa-user"></i> 主持</span>
                                <span><i class="fas fa-calendar"></i> 2020-2024</span>
                                <span><i class="fas fa-money-bill"></i> 300万元</span>
                            </div>
                        </div>
                    `;
                }
            }

            // 显示弹窗
            const modal = document.getElementById('expertDetailModal');
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
            }
        }

        function closeExpertDetail() {
            const modal = document.getElementById('expertDetailModal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    currentExpertId = null;
                }, 300);
            }
        }

        // 点击弹窗外部关闭
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('expertDetailModal');
            if (e.target === modal) {
                closeExpertDetail();
            }
        });

        // 功能区4：收藏专家
        function toggleTalentFavorite(id) {
            const btn = event.target.closest('.action-btn');
            if (!btn) return;

            const icon = btn.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');

            if (icon.classList.contains('fas')) {
                icon.style.color = '#ff4d4f';
                showToast('已收藏专家', 'success');
            } else {
                icon.style.color = '';
                showToast('已取消收藏', 'info');
            }
        }

        // 功能区5：添加到对比
        let compareList = [];
        const MAX_COMPARE = 3;

        function addToTalentCompare(id) {
            const expert = expertDatabase.find(e => e.id === id);
            if (!expert) return;

            // 检查是否已在对比列表中
            if (compareList.find(e => e.id === id)) {
                showToast('该专家已在对比列表中', 'warning');
                return;
            }

            // 检查是否达到最大数量
            if (compareList.length >= MAX_COMPARE) {
                showToast(`最多只能对比${MAX_COMPARE}位专家`, 'warning');
                return;
            }

            // 添加到对比列表
            compareList.push(expert);
            updateCompareBar();
            showToast('已添加到对比列表', 'success');
        }

        function removeFromCompare(id) {
            compareList = compareList.filter(e => e.id !== id);
            updateCompareBar();
            showToast('已从对比列表移除', 'info');
        }

        function updateCompareBar() {
            const compareBar = document.getElementById('compareBar');
            const compareCount = document.getElementById('compareCount');
            const compareExperts = document.getElementById('compareExperts');

            if (!compareBar || !compareCount || !compareExperts) return;

            compareCount.textContent = compareList.length;

            if (compareList.length === 0) {
                compareExperts.innerHTML = '<div class="compare-empty">请添加专家到对比列表（最多3位）</div>';
                compareBar.classList.remove('show');
            } else {
                compareExperts.innerHTML = compareList.map(expert => `
                    <div class="compare-expert-card">
                        <div class="compare-expert-avatar" style="background: ${expert.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}">
                            ${expert.name.charAt(0)}
                        </div>
                        <div class="compare-expert-info">
                            <div class="compare-expert-name">${expert.name}</div>
                            <div class="compare-expert-institution">${expert.institution}</div>
                        </div>
                        <button class="compare-expert-remove" onclick="removeFromCompare(${expert.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
                compareBar.classList.add('show');
            }
        }

        function clearCompare() {
            compareList = [];
            updateCompareBar();
            showToast('已清空对比列表', 'info');
        }

        function showCompareResult() {
            if (compareList.length < 2) {
                showToast('请至少选择2位专家进行对比', 'warning');
                return;
            }

            // 生成对比结果
            let html = `
                <div style="padding: 20px;">
                    <h3 style="text-align: center; margin-bottom: 20px;">专家对比结果</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 12px; text-align: left; border: 1px solid #e8e8e8;">对比维度</th>
                                ${compareList.map(e => `<th style="padding: 12px; border: 1px solid #e8e8e8;">${e.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">所属机构</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8;">${e.institution}</td>`).join('')}
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">职称</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8;">${e.title}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">研究方向</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8;">${e.research.join('、')}</td>`).join('')}
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">论文数</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8; text-align: center;">${e.papers}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">引用量</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8; text-align: center;">${e.citations.toLocaleString()}</td>`).join('')}
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">H指数</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8; text-align: center;">${e.hIndex}</td>`).join('')}
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #e8e8e8; font-weight: 500;">代表成果</td>
                                ${compareList.map(e => `<td style="padding: 12px; border: 1px solid #e8e8e8;">${e.achievements}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;

            // 创建对比结果弹窗
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal-content" style="width: 900px; max-width: 95%;">
                    <div class="modal-header">
                        <h3><i class="fas fa-balance-scale"></i> 专家对比</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body" style="max-height: 70vh;">
                        ${html}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" onclick="this.closest('.modal-overlay').remove()">关闭</button>
                        <button class="btn btn-primary" onclick="exportCompareReport()">
                            <i class="fas fa-download"></i> 导出对比报告
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 10);
        }

        function exportCompareReport() {
            showToast('正在生成对比报告...', 'info');
            setTimeout(() => {
                showToast('对比报告已导出！', 'success');
            }, 1500);
        }

        // 成果悬浮提示功能
        const achievementData = {
            '基于深度学习的图像识别算法研究': {
                desc: '该研究提出了一种基于深度卷积神经网络的图像识别算法，在ImageNet数据集上取得了state-of-the-art的性能。',
                citations: 245,
                journal: 'IEEE TPAMI 2023'
            },
            '实时视频目标跟踪系统设计与实现': {
                desc: '设计并实现了一个实时视频目标跟踪系统，采用改进的Siamese网络架构，在多个基准数据集上表现出色。',
                citations: 189,
                journal: 'CVPR 2022'
            }
        };

        function showAchievementTooltip(event, achievementTitle) {
            const tooltip = document.getElementById('achievementTooltip');
            if (!tooltip) return;

            // 获取或生成成果数据
            let data = achievementData[achievementTitle];
            if (!data) {
                // 为未知成果生成数据
                data = {
                    desc: '该成果在相关领域具有重要贡献，被学术界广泛关注和引用。',
                    citations: Math.floor(Math.random() * 200) + 50,
                    journal: '相关期刊 2023'
                };
                achievementData[achievementTitle] = data;
            }

            // 设置提示内容
            const header = tooltip.querySelector('.achievement-tooltip-header');
            const desc = tooltip.querySelector('.achievement-tooltip-desc');
            const citationsStat = tooltip.querySelector('.achievement-tooltip-stat.citations span');
            const journalStat = tooltip.querySelector('.achievement-tooltip-stat.journal span');

            if (header) header.textContent = achievementTitle;
            if (desc) desc.textContent = data.desc;
            if (citationsStat) citationsStat.textContent = `${data.citations}次引用`;
            if (journalStat) journalStat.textContent = data.journal;

            // 显示提示
            const rect = event.target.getBoundingClientRect();
            const tooltipWidth = 400;
            const tooltipHeight = 150;
            let top = rect.top - tooltipHeight - 10;
            let left = rect.left + rect.width / 2 - tooltipWidth / 2;

            // 如果上方空间不足，显示在下方
            if (top < 10) {
                top = rect.bottom + 10;
            }

            // 如果左侧空间不足，调整位置
            if (left < 10) {
                left = 10;
            }
            // 如果右侧空间不足，调整位置
            if (left + tooltipWidth > window.innerWidth - 10) {
                left = window.innerWidth - tooltipWidth - 10;
            }

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
            tooltip.style.width = tooltipWidth + 'px';

            setTimeout(() => {
                tooltip.classList.add('show');
            }, 100);
        }

        function hideAchievementTooltip() {
            const tooltip = document.getElementById('achievementTooltip');
            if (tooltip) tooltip.classList.remove('show');
        }

        // 功能区6：切换视图
        function switchTalentView(viewType) {
            // 更新按钮状态
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            if (event && event.target) {
                event.target.closest('.view-btn').classList.add('active');
            }
            
            // 切换视图显示
            const container = document.getElementById('talentResultsContainer');
            const gridContainer = document.getElementById('talentGridContainer');
            
            if (viewType === 'grid') {
                // 卡片视图 - 恢复网格布局
                gridContainer.className = 'experts-grid';
                gridContainer.style.display = 'grid';
                renderExpertCards(expertDatabase);
            } else if (viewType === 'list') {
                // 列表视图 - 改为列表布局
                gridContainer.className = 'experts-list';
                gridContainer.style.display = 'flex';
                gridContainer.style.flexDirection = 'column';
                renderExpertList(expertDatabase);
            } else if (viewType === 'graph') {
                // 图谱视图 - 显示关系图谱
                gridContainer.className = 'experts-graph';
                gridContainer.style.display = 'block';
                renderExpertGraph(expertDatabase);
            }
            
            console.log('切换到视图：' + viewType);
        }

        // 渲染卡片视图
        function renderExpertCards(experts) {
            const container = document.getElementById('talentGridContainer');
            container.innerHTML = experts.map(expert => `
                <div class="expert-card" onclick="showTalentDetail(${expert.id})">
                    <div class="expert-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); toggleTalentFavorite(${expert.id})" title="收藏">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); addToTalentCompare(${expert.id})" title="对比">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>
                    <div class="expert-header">
                        <div class="expert-avatar" style="background: ${expert.avatarColor};">${expert.name.charAt(0)}</div>
                        <div class="expert-info">
                            <div class="expert-name">${expert.name}</div>
                            <div class="expert-title">${expert.title}</div>
                            <div class="expert-institution">
                                <i class="fas fa-university"></i> ${expert.institution}
                            </div>
                        </div>
                    </div>
                    <div class="expert-research">
                        <div class="research-label">研究方向</div>
                        <div class="research-tags">
                            ${expert.researchAreas.map(area => `<span class="research-tag">${area}</span>`).join('')}
                        </div>
                    </div>
                    <div class="expert-achievements">
                        <div class="achievement-label">
                            <i class="fas fa-trophy"></i> 代表成果
                        </div>
                        <div class="achievement-list">
                            ${expert.achievements.slice(0, 1).map(ach => `
                                <div class="achievement-item" onmouseenter="showAchievementTooltip(this, '${ach.title}', '${ach.desc}', ${ach.citations}, '${ach.journal}')" onmouseleave="hideAchievementTooltip()">
                                    ${ach.title}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="expert-stats">
                        <div class="stat-item">
                            <div class="stat-value">${expert.papers}</div>
                            <div class="stat-label">论文数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${expert.citations}</div>
                            <div class="stat-label">引用量</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${expert.hIndex}</div>
                            <div class="stat-label">H指数</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 渲染列表视图
        function renderExpertList(experts) {
            const container = document.getElementById('talentGridContainer');
            container.innerHTML = `
                <div class="list-table-header" style="display: grid; grid-template-columns: 60px 2fr 1.5fr 2fr 1fr 1fr 1fr 100px; gap: 12px; padding: 12px 16px; background: #f5f5f5; border-radius: 8px; margin-bottom: 12px; font-size: 13px; font-weight: 500; color: #666;">
                    <div>头像</div>
                    <div>姓名/职称</div>
                    <div>机构</div>
                    <div>研究方向</div>
                    <div style="text-align: center;">论文数</div>
                    <div style="text-align: center;">引用量</div>
                    <div style="text-align: center;">H指数</div>
                    <div style="text-align: center;">操作</div>
                </div>
                ${experts.map(expert => `
                    <div class="expert-list-item" style="display: grid; grid-template-columns: 60px 2fr 1.5fr 2fr 1fr 1fr 1fr 100px; gap: 12px; padding: 16px; background: #fff; border: 1px solid #e8e8e8; border-radius: 8px; margin-bottom: 8px; align-items: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#1890ff'; this.style.boxShadow='0 2px 8px rgba(24,144,255,0.1)';" onmouseout="this.style.borderColor='#e8e8e8'; this.style.boxShadow='none';" onclick="showTalentDetail(${expert.id})">
                        <div class="expert-avatar" style="width: 48px; height: 48px; border-radius: 50%; background: ${expert.avatarColor}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: 600;">${expert.name.charAt(0)}</div>
                        <div>
                            <div style="font-weight: 600; color: #333; margin-bottom: 4px;">${expert.name}</div>
                            <div style="font-size: 12px; color: #999;">${expert.title}</div>
                        </div>
                        <div style="font-size: 13px; color: #666;">
                            <i class="fas fa-university" style="color: #1890ff; margin-right: 4px;"></i>${expert.institution}
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                            ${expert.researchAreas.slice(0, 3).map(area => `<span style="padding: 2px 8px; background: #f0f5ff; color: #1890ff; border-radius: 4px; font-size: 11px;">${area}</span>`).join('')}
                        </div>
                        <div style="text-align: center; font-weight: 600; color: #1890ff;">${expert.papers}</div>
                        <div style="text-align: center; color: #666;">${expert.citations}</div>
                        <div style="text-align: center; font-weight: 600; color: #52c41a;">${expert.hIndex}</div>
                        <div style="display: flex; gap: 8px; justify-content: center;">
                            <button onclick="event.stopPropagation(); toggleTalentFavorite(${expert.id})" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid #e8e8e8; background: #fff; cursor: pointer; color: #666; transition: all 0.3s;" onmouseover="this.style.color='#ff4d4f'; this.style.borderColor='#ff4d4f';" onmouseout="this.style.color='#666'; this.style.borderColor='#e8e8e8';">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button onclick="event.stopPropagation(); addToTalentCompare(${expert.id})" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid #e8e8e8; background: #fff; cursor: pointer; color: #666; transition: all 0.3s;" onmouseover="this.style.color='#1890ff'; this.style.borderColor='#1890ff';" onmouseout="this.style.color='#666'; this.style.borderColor='#e8e8e8';">
                                <i class="fas fa-balance-scale"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            `;
        }

        // 渲染图谱视图
        function renderExpertGraph(experts) {
            const container = document.getElementById('talentGridContainer');
            const width = container.clientWidth || 800;
            const height = 500;
            
            // 构建节点和关系数据
            const nodes = experts.map((expert, index) => ({
                id: expert.id,
                name: expert.name,
                institution: expert.institution,
                hIndex: expert.hIndex,
                x: width / 2 + Math.cos(index * 2 * Math.PI / experts.length) * 200,
                y: height / 2 + Math.sin(index * 2 * Math.PI / experts.length) * 150,
                color: expert.avatarColor
            }));
            
            // 生成关系连线（同机构的专家之间有连线）
            const links = [];
            for (let i = 0; i < experts.length; i++) {
                for (let j = i + 1; j < experts.length; j++) {
                    if (experts[i].institution === experts[j].institution) {
                        links.push({
                            source: experts[i].id,
                            target: experts[j].id,
                            institution: experts[i].institution
                        });
                    }
                }
            }
            
            container.innerHTML = `
                <div style="position: relative; width: 100%; height: ${height}px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); border-radius: 12px; overflow: hidden;">
                    <div style="position: absolute; top: 16px; left: 16px; z-index: 10;">
                        <div style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;">
                            <i class="fas fa-project-diagram" style="color: #1890ff; margin-right: 6px;"></i>专家关系图谱
                        </div>
                        <div style="font-size: 12px; color: #666;">
                            <span style="display: inline-block; width: 12px; height: 12px; background: #1890ff; border-radius: 50%; margin-right: 4px;"></span>专家节点
                            <span style="display: inline-block; width: 20px; height: 2px; background: #999; margin: 0 4px 0 12px; vertical-align: middle;"></span>同机构关联
                        </div>
                    </div>
                    <svg width="${width}" height="${height}" style="position: absolute; top: 0; left: 0;">
                        <!-- 连线 -->
                        ${links.map(link => {
                            const sourceNode = nodes.find(n => n.id === link.source);
                            const targetNode = nodes.find(n => n.id === link.target);
                            return `<line x1="${sourceNode.x}" y1="${sourceNode.y}" x2="${targetNode.x}" y2="${targetNode.y}" stroke="#bfbfbf" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6" />`;
                        }).join('')}
                        
                        <!-- 节点 -->
                        ${nodes.map(node => `
                            <g class="graph-node" onclick="showTalentDetail(${node.id})" style="cursor: pointer;">
                                <circle cx="${node.x}" cy="${node.y}" r="${25 + node.hIndex / 3}" fill="${node.color}" opacity="0.9" stroke="#fff" stroke-width="3" />
                                <text x="${node.x}" y="${node.y + 5}" text-anchor="middle" fill="#fff" font-size="14" font-weight="600">${node.name.charAt(0)}</text>
                                <text x="${node.x}" y="${node.y + 35 + node.hIndex / 3}" text-anchor="middle" fill="#333" font-size="12" font-weight="500">${node.name}</text>
                                <text x="${node.x}" y="${node.y + 50 + node.hIndex / 3}" text-anchor="middle" fill="#666" font-size="10">${node.institution}</text>
                            </g>
                        `).join('')}
                    </svg>
                    <div style="position: absolute; bottom: 16px; right: 16px; display: flex; gap: 8px;">
                        <button onclick="resetGraphZoom()" style="padding: 8px 16px; background: #fff; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 13px; cursor: pointer; color: #666;" onmouseover="this.style.color='#1890ff'; this.style.borderColor='#1890ff';" onmouseout="this.style.color='#666'; this.style.borderColor='#d9d9d9';">
                            <i class="fas fa-compress-arrows-alt"></i> 重置视图
                        </button>
                    </div>
                </div>
            `;
        }

        // 重置图谱视图
        function resetGraphZoom() {
            renderExpertGraph(expertDatabase);
            showToast('图谱视图已重置', 'info');
        }

        // 功能区6：排序结果
        function sortTalentResults() {
            const sortSelect = event.target;
            const sortType = sortSelect.options[sortSelect.selectedIndex].text;
            console.log('排序方式：' + sortType);
        }

        // 功能区6：导出菜单
        function toggleExportMenu() {
            showToast('导出功能：\n• Excel格式\n• CSV格式\n• PDF格式', 'info');
        }

        // 功能区9：搜索历史
        function __domInit_2() {
            const searchInput = document.getElementById('talentSearchInput');
            const historyPanel = document.getElementById('searchHistoryPanel');

            if (searchInput && historyPanel) {
                searchInput.addEventListener('focus', function() {
                    if (typeof showSearchHistory === 'function') showSearchHistory();
                    historyPanel.classList.add('show');
                });

                searchInput.addEventListener('blur', function() {
                    setTimeout(() => {
                        historyPanel.classList.remove('show');
                    }, 200);
                });
            }

            // 功能区4：初始化推荐专家
            renderRecommendations();

            // 功能区5：标签筛选
            document.querySelectorAll('#module-search .tag-item').forEach(tag => {
                tag.addEventListener('click', function() {
                    this.classList.toggle('active');
                    if (typeof applyTalentTagFilters === 'function') applyTalentTagFilters();
                });
            });

            // 功能区10：统计标签切换
            document.querySelectorAll('.statistics-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.statistics-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // 功能区10：按机构筛选
            window.filterByInstitution = function(institution) {
                showToast('筛选机构：' + institution, 'info');
            };

            // 初始化专家列表
            const talentGridContainer = document.getElementById('talentGridContainer');
            const resultCount = document.getElementById('resultCount');
            if (talentGridContainer) {
                updateExpertResults(expertDatabase);
            }
            if (resultCount) {
                resultCount.textContent = expertDatabase.length;
            }
        };

        // Toast提示函数
        function showToast(message, type = 'info') {
            // 创建toast元素
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;

            // 根据类型设置样式
            switch(type) {
                case 'success':
                    toast.style.background = '#f6ffed';
                    toast.style.border = '1px solid #b7eb8f';
                    toast.style.color = '#52c41a';
                    break;
                case 'warning':
                    toast.style.background = '#fffbe6';
                    toast.style.border = '1px solid #ffe58f';
                    toast.style.color = '#faad14';
                    break;
                case 'error':
                    toast.style.background = '#fff2f0';
                    toast.style.border = '1px solid #ffccc7';
                    toast.style.color = '#ff4d4f';
                    break;
                default:
                    toast.style.background = '#e6f7ff';
                    toast.style.border = '1px solid #91d5ff';
                    toast.style.color = '#1890ff';
            }

            toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i> ${message}`;

            document.body.appendChild(toast);

            // 3秒后自动移除
            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // ========== 人才驾驶舱交互功能 ==========

        // 筛选面板功能
        function toggleCockpitTag(element) {
            element.classList.toggle('active');
        }

        function applyCockpitFilter() {
            const industry = document.getElementById('cockpitIndustryFilter').value;
            const discipline = document.getElementById('cockpitDisciplineFilter').value;
            const institution = document.getElementById('cockpitInstitutionFilter').value;
            const time = document.getElementById('cockpitTimeFilter').value;
            
            const activeTags = [];
            document.querySelectorAll('.cockpit-filter-tag.active').forEach(tag => {
                activeTags.push(tag.dataset.value);
            });

            console.log('应用筛选：', { industry, discipline, institution, time, talentLevel: activeTags });
            showToast('筛选条件已应用', 'success');
            
            // 更新统计数据
            updateCockpitStats({ industry, discipline, institution, time, talentLevel: activeTags });
        }

        function resetCockpitFilters() {
            document.getElementById('cockpitIndustryFilter').value = 'all';
            document.getElementById('cockpitDisciplineFilter').value = 'all';
            document.getElementById('cockpitInstitutionFilter').value = 'all';
            document.getElementById('cockpitTimeFilter').value = 'five';
            
            document.querySelectorAll('.cockpit-filter-tag').forEach((tag, index) => {
                if (index === 0) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });

            showToast('筛选条件已重置', 'info');
        }

        function updateCockpitStats(filters) {
            // 模拟根据筛选条件更新统计数据
            const multiplier = filters.industry === 'all' ? 1 : 0.3;
            document.getElementById('cockpitTotalTalent').textContent = Math.floor(12456 * multiplier).toLocaleString();
            document.getElementById('cockpitInflow').textContent = Math.floor(1892 * multiplier).toLocaleString();
            document.getElementById('cockpitOutflow').textContent = Math.floor(756 * multiplier).toLocaleString();
            document.getElementById('cockpitInstitution').textContent = Math.floor(287 * multiplier).toLocaleString();
        }

        // 统计卡片点击
        function showStatDetail(type) {
            const messages = {
                'total': '人才总量详情：\n• 顶尖人才：456人\n• 领军人才：1,234人\n• 骨干人才：3,567人\n• 青年人才：7,199人',
                'inflow': '流入人才详情：\n• 海外引进：567人\n• 省际流动：892人\n• 校企合作：433人',
                'outflow': '流出人才详情：\n• 海外流失：234人\n• 省际流动：389人\n• 退休退出：133人',
                'institution': '合作机构详情：\n• 高等院校：156所\n• 科研院所：89家\n• 企业研发：42家'
            };
            showToast(messages[type], 'info');
        }

        // 热力图功能
        function switchHeatmapView(viewType, element) {
            // 切换按钮状态
            document.querySelectorAll('.cockpit-chart-tools .cockpit-tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            element.classList.add('active');

            // 更新热力图显示
            const regions = document.querySelectorAll('.heatmap-region');
            const viewConfigs = {
                'all': [
                    { region: 'beijing', count: 2847, color: 'rgba(255, 77, 79, 0.85)' },
                    { region: 'shanghai', count: 2156, color: 'rgba(255, 77, 79, 0.75)' },
                    { region: 'guangdong', count: 1893, color: 'rgba(250, 173, 20, 0.8)' },
                    { region: 'sichuan', count: 1456, color: 'rgba(250, 173, 20, 0.7)' },
                    { region: 'jiangsu', count: 1234, color: 'rgba(250, 173, 20, 0.65)' },
                    { region: 'hubei', count: 1089, color: 'rgba(82, 196, 26, 0.8)' },
                    { region: 'zhejiang', count: 967, color: 'rgba(82, 196, 26, 0.7)' },
                    { region: 'shaanxi', count: 814, color: 'rgba(82, 196, 26, 0.6)' }
                ],
                'industry': [
                    { region: 'beijing', count: 1892, color: 'rgba(255, 77, 79, 0.85)' },
                    { region: 'shanghai', count: 1567, color: 'rgba(255, 77, 79, 0.75)' },
                    { region: 'guangdong', count: 1345, color: 'rgba(250, 173, 20, 0.8)' },
                    { region: 'sichuan', count: 987, color: 'rgba(250, 173, 20, 0.7)' },
                    { region: 'jiangsu', count: 876, color: 'rgba(250, 173, 20, 0.65)' },
                    { region: 'hubei', count: 654, color: 'rgba(82, 196, 26, 0.8)' },
                    { region: 'zhejiang', count: 543, color: 'rgba(82, 196, 26, 0.7)' },
                    { region: 'shaanxi', count: 432, color: 'rgba(82, 196, 26, 0.6)' }
                ],
                'discipline': [
                    { region: 'beijing', count: 2234, color: 'rgba(255, 77, 79, 0.85)' },
                    { region: 'shanghai', count: 1876, color: 'rgba(255, 77, 79, 0.75)' },
                    { region: 'guangdong', count: 1567, color: 'rgba(250, 173, 20, 0.8)' },
                    { region: 'sichuan', count: 1234, color: 'rgba(250, 173, 20, 0.7)' },
                    { region: 'jiangsu', count: 1098, color: 'rgba(250, 173, 20, 0.65)' },
                    { region: 'hubei', count: 876, color: 'rgba(82, 196, 26, 0.8)' },
                    { region: 'zhejiang', count: 765, color: 'rgba(82, 196, 26, 0.7)' },
                    { region: 'shaanxi', count: 654, color: 'rgba(82, 196, 26, 0.6)' }
                ],
                'institution': [
                    { region: 'beijing', count: 1567, color: 'rgba(255, 77, 79, 0.85)' },
                    { region: 'shanghai', count: 1234, color: 'rgba(255, 77, 79, 0.75)' },
                    { region: 'guangdong', count: 1098, color: 'rgba(250, 173, 20, 0.8)' },
                    { region: 'sichuan', count: 876, color: 'rgba(250, 173, 20, 0.7)' },
                    { region: 'jiangsu', count: 765, color: 'rgba(250, 173, 20, 0.65)' },
                    { region: 'hubei', count: 543, color: 'rgba(82, 196, 26, 0.8)' },
                    { region: 'zhejiang', count: 432, color: 'rgba(82, 196, 26, 0.7)' },
                    { region: 'shaanxi', count: 321, color: 'rgba(82, 196, 26, 0.6)' }
                ]
            };

            const config = viewConfigs[viewType];
            const regionNames = {
                'beijing': '北京',
                'shanghai': '上海',
                'guangdong': '广东',
                'sichuan': '四川',
                'jiangsu': '江苏',
                'hubei': '湖北',
                'zhejiang': '浙江',
                'shaanxi': '陕西'
            };

            regions.forEach(region => {
                const regionKey = region.dataset.region;
                const configItem = config.find(c => c.region === regionKey);
                if (configItem) {
                    region.style.background = configItem.color;
                    region.innerHTML = `${regionNames[regionKey]} ${configItem.count.toLocaleString()}`;
                }
            });

            showToast(`已切换到${viewType === 'all' ? '全部' : viewType === 'industry' ? '按产业' : viewType === 'discipline' ? '按学科' : '按机构'}视图`, 'info');
        }

        let selectedCockpitRegions = [];

        function updateHeatmapDifferenceReportButton() {
            const button = document.getElementById('heatmapDifferenceReportBtn');
            if (!button) return;
            const enabled = selectedCockpitRegions.length >= 2;
            button.disabled = !enabled;
            button.title = enabled
                ? '已选择：' + selectedCockpitRegions.map(item => item.name).join('、')
                : '请先选择两个区域';
        }

        function toggleCockpitRegionSelection(regionName, talentCount, element) {
            const regionKey = element && element.dataset ? element.dataset.region : regionName;
            const existingIndex = selectedCockpitRegions.findIndex(item => item.key === regionKey);
            if (existingIndex >= 0) {
                selectedCockpitRegions.splice(existingIndex, 1);
            } else {
                if (selectedCockpitRegions.length >= 2) selectedCockpitRegions.shift();
                selectedCockpitRegions.push({ key: regionKey, name: regionName, count: talentCount });
            }

            document.querySelectorAll('#cockpitHeatmap .heatmap-region').forEach(region => {
                const active = selectedCockpitRegions.some(item => item.key === region.dataset.region);
                region.classList.toggle('selected', active);
            });
            updateHeatmapDifferenceReportButton();
        }

        function downloadHeatmapDifferenceReport() {
            if (selectedCockpitRegions.length < 2) return;
            const names = selectedCockpitRegions.map(item => item.name).join('、');
            showToast('报告下载完成：' + names + '差异分析报告', 'success');
        }

        function showRegionDetail(regionName, talentCount, element) {
            toggleCockpitRegionSelection(regionName, talentCount, element);
            const popup = document.getElementById('heatmapDetailPopup');
            const regionData = {
                '北京': { institutions: '清华大学、北京大学、中科院', fields: '人工智能、集成电路', inflow: 156, outflow: 89 },
                '上海': { institutions: '复旦大学、上海交大', fields: '生物医药、金融科技', inflow: 134, outflow: 67 },
                '广东': { institutions: '中山大学、华南理工', fields: '智能制造、新能源', inflow: 145, outflow: 78 },
                '四川': { institutions: '四川大学、电子科大', fields: '电子信息、新材料', inflow: 98, outflow: 45 },
                '江苏': { institutions: '南京大学、东南大学', fields: '纳米材料、生物医药', inflow: 87, outflow: 56 },
                '湖北': { institutions: '武汉大学、华中科大', fields: '光电子、智能制造', inflow: 76, outflow: 43 },
                '浙江': { institutions: '浙江大学、西湖大学', fields: '数字经济、人工智能', inflow: 65, outflow: 38 },
                '陕西': { institutions: '西安交大、西北工大', fields: '航空航天、新材料', inflow: 54, outflow: 32 }
            };

            const data = regionData[regionName] || { institutions: '-', fields: '-', inflow: 0, outflow: 0 };

            document.getElementById('heatmapDetailTitle').textContent = regionName + '市';
            document.getElementById('heatmapDetailCount').textContent = talentCount.toLocaleString() + '人';
            document.getElementById('heatmapDetailInstitution').textContent = data.institutions;
            document.getElementById('heatmapDetailField').textContent = data.fields;
            document.getElementById('heatmapDetailInflow').textContent = '+' + data.inflow + '人';
            document.getElementById('heatmapDetailOutflow').textContent = '-' + data.outflow + '人';

            // 定位弹窗
            popup.style.left = '40%';
            popup.style.top = '35%';
            popup.classList.add('show');
        }

        function viewRegionAnalysis() {
            showToast('跳转到地区详细分析页面...', 'info');
            document.getElementById('heatmapDetailPopup').classList.remove('show');
        }

        // 雷达图功能
        const radarData = {
            'talent': { name: '人才增速', value: 85, trend: '↑ 12.5%', rank: '第3位' },
            'output': { name: '科研产出', value: 78, trend: '↑ 8.7%', rank: '第5位' },
            'influence': { name: '学术影响', value: 72, trend: '↑ 15.3%', rank: '第4位' },
            'project': { name: '项目参与', value: 88, trend: '↑ 10.2%', rank: '第2位' },
            'stability': { name: '流动稳定', value: 65, trend: '↓ 3.5%', rank: '第8位' },
            'mobility': { name: '合作活跃', value: 58, trend: '↑ 6.8%', rank: '第6位' }
        };

        const cockpitRadarSeries = {
            'talent': { values: [61, 67, 72, 78, 85], baseline: [58, 62, 66, 70, 76] },
            'output': { values: [57, 63, 68, 73, 78], baseline: [54, 58, 62, 67, 71] },
            'influence': { values: [49, 55, 61, 66, 72], baseline: [51, 53, 56, 59, 64] },
            'project': { values: [64, 69, 73, 81, 88], baseline: [60, 64, 68, 73, 79] },
            'stability': { values: [72, 70, 69, 67, 65], baseline: [68, 68, 67, 66, 65] },
            'mobility': { values: [42, 45, 49, 53, 58], baseline: [39, 42, 45, 49, 53] }
        };

        function showRadarTooltip(key, value, element) {
            const tooltip = document.getElementById('radarTooltip');
            const data = radarData[key];

            document.getElementById('radarTooltipTitle').textContent = data.name;
            document.getElementById('radarTooltipValue').textContent = value + '分';
            document.getElementById('radarTooltipTrend').textContent = data.trend;
            document.getElementById('radarTooltipTrend').style.color = data.trend.includes('↑') ? '#52c41a' : '#ff4d4f';
            document.getElementById('radarTooltipRank').textContent = data.rank;

            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.classList.add('show');
        }

        function hideRadarTooltip() {
            document.getElementById('radarTooltip').classList.remove('show');
        }

        function renderCockpitRadarTrend(key) {
            const series = cockpitRadarSeries[key] || cockpitRadarSeries.talent;
            const years = [2020, 2021, 2022, 2023, 2024];
            const width = 700;
            const height = 190;
            const left = 42;
            const right = 18;
            const top = 16;
            const bottom = 30;
            const chartWidth = width - left - right;
            const chartHeight = height - top - bottom;
            const x = index => left + index * chartWidth / (years.length - 1);
            const y = value => top + (100 - value) * chartHeight / 100;
            const points = values => values.map((value, index) => x(index) + ',' + y(value)).join(' ');
            const grid = [0, 25, 50, 75, 100].map(value => '<line x1="' + left + '" y1="' + y(value) + '" x2="' + (width - right) + '" y2="' + y(value) + '" stroke="#edf1f5" stroke-width="1"/><text x="8" y="' + (y(value) + 4) + '">' + value + '</text>').join('');
            const yearLabels = years.map((year, index) => '<text x="' + x(index) + '" y="' + (height - 8) + '" text-anchor="middle">' + year + '</text>').join('');
            const currentPoints = series.values.map((value, index) => '<circle class="current-point" cx="' + x(index) + '" cy="' + y(value) + '" r="4"></circle>').join('');
            const comparePoints = series.baseline.map((value, index) => '<circle class="compare-point" cx="' + x(index) + '" cy="' + y(value) + '" r="3"></circle>').join('');
            return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + radarData[key].name + '时间序列变化图">' + grid + '<polyline class="compare-line" points="' + points(series.baseline) + '"></polyline><polyline class="current-line" points="' + points(series.values) + '"></polyline>' + comparePoints + currentPoints + yearLabels + '</svg><div class="cockpit-radar-trend-legend"><span><i></i>当前区域</span><span><i class="compare"></i>全国基准</span></div>';
        }

        function showRadarDetail(key) {
            const data = radarData[key];
            const series = cockpitRadarSeries[key] || cockpitRadarSeries.talent;
            const overlay = document.getElementById('cockpitRadarDetailOverlay');
            if (!data || !overlay) return;
            document.getElementById('cockpitRadarDetailTitle').textContent = data.name;
            document.getElementById('cockpitRadarDetailValue').textContent = data.value + '分';
            document.getElementById('cockpitRadarDetailTrend').textContent = data.trend;
            document.getElementById('cockpitRadarDetailTrend').style.color = data.trend.includes('↓') ? '#ff4d4f' : '#1890ff';
            document.getElementById('cockpitRadarDetailRank').textContent = data.rank;
            document.getElementById('cockpitRadarTrendChart').innerHTML = renderCockpitRadarTrend(key);
            document.getElementById('cockpitRadarCompareBody').innerHTML = [2020, 2021, 2022, 2023, 2024].map((year, index) => {
                const difference = series.values[index] - series.baseline[index];
                return '<tr><td>' + year + '</td><td>' + series.values[index] + '分</td><td>' + series.baseline[index] + '分</td><td>' + (difference >= 0 ? '+' : '') + difference + '分</td></tr>';
            }).join('');
            hideRadarTooltip();
            overlay.classList.add('show');
        }

        function closeCockpitRadarDetail() {
            const overlay = document.getElementById('cockpitRadarDetailOverlay');
            if (overlay) overlay.classList.remove('show');
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') closeCockpitRadarDetail();
        });

        // 流向图功能
        function toggleFlowDirection(direction) {
            document.querySelectorAll('.cockpit-flow .cockpit-tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.closest('.cockpit-tool-btn').classList.add('active');

            const nodes = document.querySelectorAll('.flow-node');
            const directions = {
                'in': { prefix: '+', opacity: 1 },
                'out': { prefix: '-', opacity: 0.5 },
                'all': { prefix: '+', opacity: 1 }
            };

            const config = directions[direction];
            nodes.forEach(node => {
                node.style.opacity = config.opacity;
            });

            showToast(`已切换到${direction === 'in' ? '流入' : direction === 'out' ? '流出' : '全部'}视图`, 'info');
        }

        function showFlowNodeDetail(cityName, count, type) {
            const card = document.getElementById('flowDetailCard');
            const flowData = {
                '北京': { inflow: 1892, outflow: 756, source: '计算机科学、人工智能', reason: '科研机会、薪资待遇' },
                '上海': { inflow: 1456, outflow: 543, source: '生物医药、金融科技', reason: '产业发展、政策支持' },
                '广东': { inflow: 1234, outflow: 456, source: '智能制造、新能源', reason: '企业需求、产业集群' },
                '浙江': { inflow: 876, outflow: 321, source: '数字经济、电子商务', reason: '创业环境、互联网产业' },
                '四川': { inflow: 654, outflow: 234, source: '电子信息、新材料', reason: '西部开发、政策引进' }
            };

            const data = flowData[cityName] || { inflow: 0, outflow: 0, source: '-', reason: '-' };

            document.getElementById('flowDetailCountLabel').textContent = '流入人数';
            document.getElementById('flowDetailOutflowLabel').textContent = '流出人数';
            document.getElementById('flowDetailNetLabel').textContent = '净流入';
            document.getElementById('flowDetailSourceLabel').textContent = '主要来源';
            document.getElementById('flowDetailReasonLabel').textContent = '流动原因';
            document.getElementById('flowDetailTitle').textContent = cityName + '市';
            document.getElementById('flowDetailInflow').textContent = '+' + data.inflow + '人';
            document.getElementById('flowDetailOutflow').textContent = '-' + data.outflow + '人';
            document.getElementById('flowDetailNet').textContent = '+' + (data.inflow - data.outflow) + '人';
            document.getElementById('flowDetailSource').textContent = data.source;
            document.getElementById('flowDetailReason').textContent = data.reason;

            card.style.left = '55%';
            card.style.top = '15%';
            card.classList.add('show');
        }

        const cockpitFlowLineData = {
            'beijing-shanghai': { title: '北京 → 上海', count: 1128, source: '计算机科学、人工智能', reason: '科研平台合作与跨区域项目引进', target: '上海', net: '+1128人' },
            'shanghai-guangdong': { title: '上海 → 广东', count: 864, source: '生物医药、金融科技', reason: '产业集群机会与成果转化需求', target: '广东', net: '+864人' },
            'beijing-guangdong': { title: '北京 → 广东', count: 792, source: '人工智能、集成电路', reason: '企业研发岗位增加与产业协同', target: '广东', net: '+792人' },
            'guangdong-zhejiang': { title: '广东 → 浙江', count: 536, source: '智能制造、新能源', reason: '创新创业环境与人才激励政策', target: '浙江', net: '+536人' }
        };

        function showFlowLineDetail(lineKey) {
            const card = document.getElementById('flowDetailCard');
            const data = cockpitFlowLineData[lineKey];
            if (!card || !data) return;

            document.getElementById('flowDetailCountLabel').textContent = '流动人数';
            document.getElementById('flowDetailOutflowLabel').textContent = '流向地区';
            document.getElementById('flowDetailNetLabel').textContent = '流动规模';
            document.getElementById('flowDetailSourceLabel').textContent = '主要来源学科';
            document.getElementById('flowDetailReasonLabel').textContent = '流动原因分析';
            document.getElementById('flowDetailTitle').textContent = data.title;
            document.getElementById('flowDetailInflow').textContent = data.count.toLocaleString() + '人';
            document.getElementById('flowDetailOutflow').textContent = data.target;
            document.getElementById('flowDetailNet').textContent = data.net;
            document.getElementById('flowDetailSource').textContent = data.source;
            document.getElementById('flowDetailReason').textContent = data.reason;
            card.style.left = '42%';
            card.style.top = '22%';
            card.classList.add('show');
        }

        // 时间轴控制
        let timelinePlaying = false;
        let timelineInterval = null;
        let currentYear = 2024;

        function timelinePlay() {
            if (timelinePlaying) return;
            timelinePlaying = true;

            timelineInterval = __mapSetInterval(() => {
                currentYear++;
                if (currentYear > 2024) currentYear = 2020;
                
                document.getElementById('timelineCurrent').textContent = currentYear + '年';
                const progress = ((currentYear - 2020) / 4) * 100;
                document.getElementById('timelineProgress').style.width = progress + '%';
            }, 1000);
        }

        function timelinePause() {
            timelinePlaying = false;
            if (timelineInterval) {
                clearInterval(timelineInterval);
                timelineInterval = null;
            }
        }

        function timelineReset() {
            timelinePause();
            currentYear = 2024;
            document.getElementById('timelineCurrent').textContent = '2024年';
            document.getElementById('timelineProgress').style.width = '100%';
        }

        function timelineSeek(event) {
            const slider = event.target.closest('.timeline-slider');
            const rect = slider.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const percentage = x / rect.width;
            
            currentYear = 2020 + Math.round(percentage * 4);
            document.getElementById('timelineCurrent').textContent = currentYear + '年';
            document.getElementById('timelineProgress').style.width = (percentage * 100) + '%';
        }

        // 导出功能
        function exportCockpitReport(type) {
            const messages = {
                'pdf': '正在生成PDF报告，请稍候...',
                'image': '正在导出高清图片，请稍候...',
                'interactive': '正在生成交互式图表，请稍候...'
            };
            showToast(messages[type], 'info');

            setTimeout(() => {
                if (type === 'pdf') {
                    showToast('PDF报告已生成！\n文件：人才驾驶舱分析报告_2024.pdf', 'success');
                } else if (type === 'image') {
                    showToast('图片已导出！\n文件：人才驾驶舱可视化_2024.png', 'success');
                } else if (type === 'interactive') {
                    showToast('交互式图表已生成！\n链接：https://example.com/cockpit/2024', 'success');
                }
            }, 1500);
        }

        function showShowcase() {
            showToast('跳转到成果展示页面...', 'info');
        }

        // 对比功能
        function showCompareModal() {
            document.getElementById('compareModal').classList.add('show');
        }

        function closeCompareModal() {
            document.getElementById('compareModal').classList.remove('show');
        }

        function exportCompareReport() {
            showToast('对比报告已导出！\n文件：跨区域人才对比分析报告.pdf', 'success');
            closeCompareModal();
        }

            // 点击热力图外部关闭详情弹窗
            document.addEventListener('click', function(e) {
                const popup = document.getElementById('heatmapDetailPopup');
                const flowCard = document.getElementById('flowDetailCard');
                
                if (popup && !e.target.closest('.heatmap-region') && !e.target.closest('.heatmap-detail-popup')) {
                    popup.classList.remove('show');
                }
                
                if (flowCard && !e.target.closest('.flow-node') && !e.target.closest('.flow-detail-card') && !e.target.closest('.flow-interactive')) {
                    flowCard.classList.remove('show');
                }
            });

        // ========== 人才库订阅交互功能 ==========

        // 高级筛选
        function toggleAdvancedFilter() {
            const filterPanel = document.getElementById('subscriptionAdvancedFilter');
            const toggleBtn = document.querySelector('.subscription-filter-toggle');
            
            filterPanel.classList.toggle('show');
            toggleBtn.classList.toggle('active');
        }

        function handleSubscriptionSearch(keyword) {
            if (!keyword) return;
            console.log('搜索关键词：', keyword);
            // 实时搜索逻辑
        }

        function saveFilterConditions() {
            const conditions = {
                awardType: document.getElementById('filterAwardType').value,
                institution: document.getElementById('filterInstitution').value,
                field: document.getElementById('filterField').value,
                country: document.getElementById('filterCountry').value
            };
            
            // 保存到本地存储
            localStorage.setItem('subscriptionFilterConditions', JSON.stringify(conditions));
            showToast('筛选条件已保存！下次可快速使用', 'success');
        }

        function resetSubscriptionFilters() {
            document.getElementById('filterAwardType').value = 'all';
            document.getElementById('filterInstitution').value = 'all';
            document.getElementById('filterField').value = 'all';
            document.getElementById('filterCountry').value = 'all';
            showToast('筛选条件已重置', 'info');
        }

        function applySubscriptionFilters() {
            const conditions = {
                awardType: document.getElementById('filterAwardType').value,
                institution: document.getElementById('filterInstitution').value,
                field: document.getElementById('filterField').value,
                country: document.getElementById('filterCountry').value
            };
            
            console.log('应用筛选条件：', conditions);
            showToast('筛选条件已应用', 'success');
            // 刷新结果列表
        }

        // 订阅管理
        function showAddSubscriptionModal() {
            document.getElementById('addSubscriptionModal').classList.add('show');
        }

        function closeAddSubscriptionModal() {
            document.getElementById('addSubscriptionModal').classList.remove('show');
            // 清空表单
            document.getElementById('subscriptionName').value = '';
            document.getElementById('subscriptionScope').value = 'global';
            document.querySelectorAll('#addSubscriptionModal input[type="checkbox"]').forEach(cb => cb.checked = false);
            document.getElementById('subscriptionTags').value = '';
            document.getElementById('subscriptionFrequency').value = 'realtime';
            document.getElementById('subscriptionNote').value = '';
        }

        function saveSubscription() {
            const name = document.getElementById('subscriptionName').value;
            if (!name) {
                showToast('请输入订阅名称', 'warning');
                return;
            }
            
            showToast('订阅创建成功！', 'success');
            closeAddSubscriptionModal();
        }

        function editSubscription(id) {
            showToast('编辑订阅 #' + id, 'info');
            // 打开编辑弹窗
        }

        function pauseSubscription(id) {
            showToast('订阅已暂停', 'info');
            // 更新状态
        }

        function resumeSubscription(id) {
            showToast('订阅已恢复', 'success');
            // 更新状态
        }

        function deleteSubscription(id) {
            if (confirm('确定要删除该订阅吗？')) {
                showToast('订阅已删除', 'info');
            }
        }

        // 动态推送
        function viewDynamicDetail(id) {
            showToast('查看动态详情 #' + id, 'info');
            // 跳转到专家详情页
        }

        function followExpert(expertName, element) {
            element.classList.add('followed');
            element.innerHTML = '<i class="fas fa-heart"></i> 已关注';
            showToast(`已将 ${expertName} 加入重点关注库`, 'success');
        }

        function unfollowExpert(expertName, element) {
            element.classList.remove('followed');
            element.innerHTML = '<i class="fas fa-heart"></i> 关注';
            showToast(`已取消关注 ${expertName}`, 'info');
        }

        function markAsRead(id) {
            const card = document.querySelector(`.dynamic-card[onclick="viewDynamicDetail(${id})"]`);
            if (card) {
                card.classList.remove('unread');
            }
            showToast('已标记为已读', 'info');
        }

        function collectDynamic(id) {
            showToast('已收藏到个人中心', 'success');
        }

        // 智能推荐
        function viewExpertProfile(id) {
            showToast('查看专家完整画像 #' + id, 'info');
            // 跳转到专家画像页
        }

        function viewMoreRecommendations() {
            showToast('进入推荐中心页面', 'info');
            // 跳转到推荐中心
        }

        function subscribeExpert(id) {
            showToast('专家订阅成功！', 'success');
        }

        let currentFeedbackExpertId = null;
        function giveFeedback(id, element) {
            currentFeedbackExpertId = id;
            const modal = document.getElementById('feedbackModal');
            const rect = element.getBoundingClientRect();
            modal.style.top = rect.bottom + 10 + 'px';
            modal.style.left = rect.left + 'px';
            modal.classList.add('show');
        }

        function submitFeedback(feedback) {
            document.getElementById('feedbackModal').classList.remove('show');
            showToast('感谢您的反馈！这将帮助我们优化推荐', 'success');
            currentFeedbackExpertId = null;
        }

        // 通知中心
        function filterNotifications(type, element) {
            document.querySelectorAll('.notification-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            element.classList.add('active');
            
            const notifications = document.querySelectorAll('.notification-item');
            notifications.forEach(item => {
                if (type === 'all') {
                    item.style.display = 'block';
                } else {
                    const itemType = item.querySelector('.notification-item-type i');
                    if (type === 'paper' && itemType.classList.contains('fa-file-alt')) {
                        item.style.display = 'block';
                    } else if (type === 'award' && itemType.classList.contains('fa-trophy')) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        }

        function viewNotificationDetail(id) {
            showToast('查看通知详情 #' + id, 'info');
        }

        // 统计
        function showSubscriptionStatDetail(type) {
            const messages = {
                'total': '订阅专家详情：\n• 顶尖人才：56人\n• 领军人才：78人\n• 骨干人才：89人\n• 青年人才：50人',
                'active': '活跃度分析：\n• 日活跃：67%\n• 周活跃：89%\n• 月活跃：95%',
                'updates': '本月更新：\n• 论文发表：89篇\n• 获奖信息：34项\n• 机构变动：23次\n• 合作动态：10项',
                'regions': '覆盖国家：中国、美国、英国、德国、日本、法国、加拿大、澳大利亚、新加坡、瑞士、荷兰、瑞典'
            };
            showToast(messages[type], 'info');
        }

        function exportSubscriptionReport() {
            showToast('正在生成订阅统计报告...', 'info');
            setTimeout(() => {
                showToast('报告已生成！\n文件：人才库订阅统计报告_2024.pdf', 'success');
            }, 1500);
        }

        // 图表提示框
        function showChartTooltip(element, label, value) {
            // 创建提示框
            let tooltip = document.getElementById('chartTooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'chartTooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.85);
                    color: #fff;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 100;
                    pointer-events: none;
                    transition: opacity 0.2s;
                `;
                document.body.appendChild(tooltip);
            }
            
            tooltip.innerHTML = `${label}：${value}人`;
            tooltip.style.opacity = '1';
            
            // 定位
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        }

        function hideChartTooltip() {
            const tooltip = document.getElementById('chartTooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        }

        // 点击反馈弹窗外部关闭
        document.addEventListener('click', function(e) {
            const feedbackModal = document.getElementById('feedbackModal');
            if (feedbackModal && !e.target.closest('.feedback-modal') && !e.target.closest('.recommend-action-btn.secondary')) {
                feedbackModal.classList.remove('show');
            }
        });

  /* ---- script-3：高级筛选弹窗 ---- */
// 筛选条件配置
        const filterConfig = {
            name: { label: '姓名', type: 'input' },
            institution: { 
                label: '机构', 
                type: 'select',
                options: {
                    tsinghua: '清华大学',
                    peking: '北京大学',
                    cas: '中国科学院',
                    fudan: '复旦大学',
                    sjtu: '上海交通大学'
                }
            },
            field: { 
                label: '研究方向', 
                type: 'select',
                options: {
                    ai: '人工智能',
                    ml: '机器学习',
                    cv: '计算机视觉',
                    nlp: '自然语言处理',
                    dm: '数据挖掘',
                    kg: '知识图谱'
                }
            },
            title: { 
                label: '职称', 
                type: 'select',
                options: {
                    professor: '教授',
                    associate: '副教授',
                    researcher: '研究员',
                    senior: '高级工程师'
                }
            },
            achievement: { label: '代表成果', type: 'input' },
            project: { label: '项目经历', type: 'input' },
            influence: { 
                label: '学术影响力', 
                type: 'select',
                options: {
                    top: '顶尖 (H-index ≥ 50)',
                    high: '高 (H-index 30-49)',
                    medium: '中 (H-index 15-29)',
                    emerging: '新兴 (H-index < 15)'
                }
            },
            achievementType: {
                label: '成果类型',
                type: 'checkbox',
                options: {
                    paper: '论文',
                    patent: '专利',
                    project: '项目'
                }
            }
        };

        // 显示高级筛选弹窗
        function showAdvancedFilterModal() {
            document.getElementById('advancedFilterModal').style.display = 'flex';
            updateActiveFilters();
        }

        // 关闭高级筛选弹窗
        function closeAdvancedFilterModal() {
            document.getElementById('advancedFilterModal').style.display = 'none';
        }

        // 展开/收起更多筛选项
        function toggleMoreFilters() {
            const panel = document.getElementById('moreFiltersPanel');
            const icon = document.getElementById('toggleMoreIcon');
            const text = document.getElementById('toggleMoreText');
            
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                text.textContent = '收起更多筛选项';
            } else {
                panel.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                text.textContent = '展开更多筛选项';
            }
        }

        // 更新已选条件展示
        function updateActiveFilters() {
            const activeFilters = [];
            
            // 收集所有筛选条件
            const name = document.getElementById('modalFilterName').value;
            if (name) activeFilters.push({ key: 'name', value: name, display: name });
            
            const institution = document.getElementById('modalFilterInstitution').value;
            if (institution) activeFilters.push({ 
                key: 'institution', 
                value: institution, 
                display: filterConfig.institution.options[institution] 
            });
            
            const field = document.getElementById('modalFilterField').value;
            if (field) activeFilters.push({ 
                key: 'field', 
                value: field, 
                display: filterConfig.field.options[field] 
            });
            
            const title = document.getElementById('modalFilterTitle').value;
            if (title) activeFilters.push({ 
                key: 'title', 
                value: title, 
                display: filterConfig.title.options[title] 
            });
            
            const achievement = document.getElementById('modalFilterAchievement').value;
            if (achievement) activeFilters.push({ key: 'achievement', value: achievement, display: achievement });
            
            const project = document.getElementById('modalFilterProject').value;
            if (project) activeFilters.push({ key: 'project', value: project, display: project });
            
            const influence = document.getElementById('modalFilterInfluence').value;
            if (influence) activeFilters.push({ 
                key: 'influence', 
                value: influence, 
                display: filterConfig.influence.options[influence] 
            });
            
            // 收集成果类型复选框
            const achievementTypes = [];
            document.querySelectorAll('.filter-checkbox[data-type="achievementType"]:checked').forEach(cb => {
                achievementTypes.push({
                    key: 'achievementType',
                    value: cb.value,
                    display: filterConfig.achievementType.options[cb.value]
                });
            });
            
            const allFilters = [...activeFilters, ...achievementTypes];
            
            // 更新计数
            document.getElementById('filterCount').textContent = `共 ${allFilters.length} 个条件`;
            
            // 渲染已选条件
            const container = document.getElementById('modalActiveFilters');
            if (allFilters.length === 0) {
                container.innerHTML = '<span style="font-size: 12px; color: #999;">暂无筛选条件</span>';
            } else {
                container.innerHTML = allFilters.map(filter => `
                    <span class="filter-tag" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
                        ${filterConfig[filter.key].label}: ${filter.display}
                        <i class="fas fa-times" onclick="removeFilter('${filter.key}', '${filter.value}')" style="cursor: pointer; color: #1890ff; opacity: 0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'"></i>
                    </span>
                `).join('');
            }
        }

        // 移除单个筛选条件
        function removeFilter(key, value) {
            if (key === 'achievementType') {
                // 复选框类型
                document.querySelectorAll('.filter-checkbox[data-type="achievementType"]').forEach(cb => {
                    if (cb.value === value) cb.checked = false;
                });
            } else {
                // 输入框或下拉框类型
                const element = document.getElementById(`modalFilter${key.charAt(0).toUpperCase() + key.slice(1)}`);
                if (element) {
                    element.value = '';
                }
            }
            updateActiveFilters();
        }

        // 重置弹窗筛选条件
        function resetModalFilters() {
            document.getElementById('modalFilterName').value = '';
            document.getElementById('modalFilterInstitution').value = '';
            document.getElementById('modalFilterField').value = '';
            document.getElementById('modalFilterTitle').value = '';
            document.getElementById('modalFilterAchievement').value = '';
            document.getElementById('modalFilterProject').value = '';
            document.getElementById('modalFilterInfluence').value = '';
            
            // 取消所有复选框
            document.querySelectorAll('.filter-checkbox[data-type="achievementType"]').forEach(cb => {
                cb.checked = false;
            });
            
            // 收起更多筛选项
            document.getElementById('moreFiltersPanel').style.display = 'none';
            document.getElementById('toggleMoreIcon').classList.remove('fa-chevron-up');
            document.getElementById('toggleMoreIcon').classList.add('fa-chevron-down');
            document.getElementById('toggleMoreText').textContent = '展开更多筛选项';
            
            updateActiveFilters();
        }

        // 应用弹窗筛选条件
        function applyModalFilters() {
            const filters = {};
            
            const name = document.getElementById('modalFilterName').value;
            if (name) filters.name = name;
            
            const institution = document.getElementById('modalFilterInstitution').value;
            if (institution) filters.institution = institution;
            
            const field = document.getElementById('modalFilterField').value;
            if (field) filters.field = field;
            
            const title = document.getElementById('modalFilterTitle').value;
            if (title) filters.title = title;
            
            const achievement = document.getElementById('modalFilterAchievement').value;
            if (achievement) filters.achievement = achievement;
            
            const project = document.getElementById('modalFilterProject').value;
            if (project) filters.project = project;
            
            const influence = document.getElementById('modalFilterInfluence').value;
            if (influence) filters.influence = influence;
            
            // 收集成果类型
            const achievementTypes = [];
            document.querySelectorAll('.filter-checkbox[data-type="achievementType"]:checked').forEach(cb => {
                achievementTypes.push(cb.value);
            });
            if (achievementTypes.length > 0) filters.achievementTypes = achievementTypes;
            
            console.log('应用筛选条件：', filters);
            
            closeAdvancedFilterModal();
            
            // 显示提示
            const filterCount = Object.keys(filters).length + (filters.achievementTypes ? filters.achievementTypes.length - 1 : 0);
            if (typeof showToast === 'function') {
                if (filterCount > 0) {
                    showToast(`已应用 ${filterCount} 个筛选条件`, 'success');
                } else {
                    showToast('已恢复默认结果列表', 'info');
                }
            }
        }

        // 点击弹窗外部关闭
        document.getElementById('advancedFilterModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAdvancedFilterModal();
            }
        });

        // ESC键关闭弹窗
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAdvancedFilterModal();
            }
        });

  /* ---- script-4：地图/驾驶舱导出与成果展示 ---- */
// 显示地图导出模态框
        function showMapExportModal() {
            document.getElementById('mapExportModal').style.display = 'flex';
        }

        // 关闭地图导出模态框
        function closeMapExportModal() {
            document.getElementById('mapExportModal').style.display = 'none';
        }

        // 导出地图报告
        function exportMapReport(format) {
            var formatNames = {
                'excel': 'Excel表格',
                'csv': 'CSV格式',
                'pdf': 'PDF报告',
                'report': '可视化报告'
            };

            closeMapExportModal();

            // 使用Toast提示（如果页面有showToast函数）或使用alert
            if (typeof showToast === 'function') {
                showToast('正在生成' + formatNames[format] + '，包含地图截图和统计数据...', 'info');
                setTimeout(function() {
                    showToast(formatNames[format] + '已生成！', 'success');
                }, 1500);
            } else {
                alert('正在生成' + formatNames[format] + '...\n包含地图截图、图表及数据摘要');
            }
        }

        // 点击模态框外部关闭
        document.getElementById('mapExportModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeMapExportModal();
            }
        });

        // ESC键关闭地图导出模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMapExportModal();
            }
        });

        // 显示人才驾驶舱导出模态框
        function showCockpitExportModal() {
            document.getElementById('cockpitExportModal').style.display = 'flex';
        }

        // 关闭人才驾驶舱导出模态框
        function closeCockpitExportModal() {
            document.getElementById('cockpitExportModal').style.display = 'none';
        }

        // 导出人才驾驶舱报告
        function exportCockpitReport(format) {
            var formatNames = {
                'pdf': 'PDF报告',
                'image': '高清图片',
                'link': '在线分享链接'
            };

            closeCockpitExportModal();

            if (typeof showToast === 'function') {
                if (format === 'link') {
                    // 生成分享链接
                    var shareLink = 'https://example.com/share/cockpit/' + Date.now();
                    navigator.clipboard.writeText(shareLink).then(function() {
                        showToast('分享链接已复制到剪贴板！', 'success');
                    }).catch(function() {
                        showToast('链接：' + shareLink, 'info');
                    });
                } else {
                    showToast('正在生成' + formatNames[format] + '...', 'info');
                    setTimeout(function() {
                        showToast(formatNames[format] + '已生成！', 'success');
                    }, 1500);
                }
            } else {
                if (format === 'link') {
                    alert('分享链接已生成：\nhttps://example.com/share/cockpit/' + Date.now());
                } else {
                    alert('正在生成' + formatNames[format] + '...');
                }
            }
        }

        // 点击人才驾驶舱导出模态框外部关闭
        document.addEventListener('click', function(e) {
            var modal = document.getElementById('cockpitExportModal');
            if (modal && e.target === modal) {
                closeCockpitExportModal();
            }
        });

        // ESC键关闭人才驾驶舱导出模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCockpitExportModal();
            }
        });

        // 显示人才驾驶舱成果展示
        function showCockpitShowcase() {
            document.getElementById('cockpitShowcaseModal').style.display = 'flex';
        }

        // 关闭人才驾驶舱成果展示
        function closeCockpitShowcase() {
            document.getElementById('cockpitShowcaseModal').style.display = 'none';
        }

        // 导出成果报告
        function exportShowcaseReport(type) {
            closeCockpitShowcase();
            var typeNames = {
                'pdf': 'PDF报告',
                'ppt': 'PPT演示文稿',
                'dashboard': '交互式仪表盘'
            };
            
            if (typeof showToast === 'function') {
                showToast('正在生成' + typeNames[type] + '...', 'info');
                setTimeout(function() {
                    showToast(typeNames[type] + '已生成！', 'success');
                }, 1500);
            } else {
                alert('正在生成' + typeNames[type] + '...');
            }
        }

        // 点击模态框外部关闭
        document.getElementById('mapExportModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeMapExportModal();
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMapExportModal();
            }
        });

  /* ---- script-5：指数增强（权重/导出/悬浮提示） ---- */
// ========== 人才指数新增交互 ========== 
        var indexDefaultWeights = {
            total: 30,
            output: 25,
            influence: 20,
            contribution: 15,
            mobility: 10
        };
        var indexHeatmapClickTimer = null;
        var indexToastTimer = null;
        var selectedIndexExportScope = [];
        var selectedIndexReportCover = '蓝色科技';

        function showIndexToast(message) {
            var toast = document.getElementById('indexToast');
            if (!toast) return;
            window.clearTimeout(indexToastTimer);
            toast.textContent = message;
            toast.classList.add('show');
            indexToastTimer = window.setTimeout(function() {
                toast.classList.remove('show');
            }, 2400);
        }

        function getIndexDraftWeights() {
            var dimensions = ['total', 'output', 'influence', 'contribution', 'mobility'];
            var draft = {};
            dimensions.forEach(function(dimension) {
                var input = document.getElementById('weight-' + dimension + '-input');
                draft[dimension] = input ? parseInt(input.value, 10) || 0 : indexDefaultWeights[dimension];
            });
            return draft;
        }

        function syncIndexWeightOverview(weights) {
            if (typeof currentWeights !== 'undefined') Object.assign(currentWeights, weights);
            var dimensions = ['total', 'output', 'influence', 'contribution', 'mobility'];
            document.querySelectorAll('#module-index .weight-item').forEach(function(item, index) {
                var dimension = dimensions[index];
                if (!dimension || weights[dimension] === undefined) return;
                var bar = item.querySelector('.weight-bar-fill');
                var value = item.querySelector('.weight-value');
                if (bar) bar.style.width = weights[dimension] + '%';
                if (value) value.textContent = weights[dimension] + '%';
            });
            document.querySelectorAll('#module-index .index-card-weight').forEach(function(label, index) {
                var dimension = dimensions[index];
                if (dimension && weights[dimension] !== undefined) label.textContent = '权重: ' + weights[dimension] + '%';
            });
        }

        function showIndexWeightPlanModal() {
            var modal = document.getElementById('indexWeightPlanModal');
            var input = document.getElementById('indexWeightPlanName');
            if (!modal) return;
            if (input) input.value = '';
            modal.style.display = 'flex';
            window.setTimeout(function() {
                if (input) input.focus();
            }, 0);
        }

        function closeIndexWeightPlanModal() {
            var modal = document.getElementById('indexWeightPlanModal');
            if (modal) modal.style.display = 'none';
        }

        function confirmIndexWeightPlan() {
            var input = document.getElementById('indexWeightPlanName');
            var name = input ? input.value.trim() : '';
            var weights = getIndexDraftWeights();
            var total = Object.keys(weights).reduce(function(sum, key) { return sum + weights[key]; }, 0);
            if (!name) {
                alert('请输入方案名称');
                if (input) input.focus();
                return;
            }
            if (total !== 100) {
                alert('当前权重总和必须等于100%，请调整后再保存。');
                return;
            }
            try {
                var savedPlans = JSON.parse(localStorage.getItem('indexWeightPlans') || '{}');
                savedPlans[name] = { weights: weights, savedAt: new Date().toISOString() };
                localStorage.setItem('indexWeightPlans', JSON.stringify(savedPlans));
            } catch (error) {
                console.warn('权重方案保存到本地存储失败，仍按演示流程继续：', error);
            }
            syncIndexWeightOverview(weights);
            closeIndexWeightPlanModal();
            closeWeightSettings();
            ['indexExportScopeModal', 'indexExportFormatModal', 'heatmapDetailOverlay', 'drilldownOverlay', 'radarDetailOverlay'].forEach(function(id) {
                var overlay = document.getElementById(id);
                if (overlay) {
                    overlay.style.display = 'none';
                    overlay.classList.remove('show');
                }
            });
            showIndexToast('方案“' + name + '”保存成功');
        }

        function restoreIndexDefaultWeights() {
            Object.keys(indexDefaultWeights).forEach(function(dimension) {
                var value = indexDefaultWeights[dimension];
                var slider = document.getElementById('weight-' + dimension + '-slider');
                var input = document.getElementById('weight-' + dimension + '-input');
                var display = document.getElementById('weight-' + dimension + '-display');
                if (slider) slider.value = value;
                if (input) input.value = value;
                if (display) display.textContent = value;
                if (typeof currentWeights !== 'undefined') currentWeights[dimension] = value;
            });
            if (typeof updateTotalWeightDisplay === 'function') updateTotalWeightDisplay();

            var dimensions = ['total', 'output', 'influence', 'contribution', 'mobility'];
            document.querySelectorAll('#module-index .weight-item').forEach(function(item, index) {
                var dimension = dimensions[index];
                var bar = item.querySelector('.weight-bar-fill');
                var value = item.querySelector('.weight-value');
                if (bar) bar.style.width = indexDefaultWeights[dimension] + '%';
                if (value) value.textContent = indexDefaultWeights[dimension] + '%';
            });
            document.querySelectorAll('#module-index .index-card-weight').forEach(function(label, index) {
                var dimension = dimensions[index];
                if (dimension) label.textContent = '权重: ' + indexDefaultWeights[dimension] + '%';
            });
            if (typeof updateAllVisualizations === 'function') updateAllVisualizations();
            showIndexToast('已恢复默认权重设置');
        }

        function showIndexTrendTooltip(event, element) {
            var tooltip = document.getElementById('indexTrendTooltip');
            if (!tooltip || !element) return;
            var metricNames = {
                total: '综合指数',
                talent: '人才总量',
                output: '科研产出',
                influence: '学术影响力',
                contribution: '产业贡献度',
                mobility: '流动活跃度'
            };
            var year = element.getAttribute('data-year') || '';
            var metric = element.getAttribute('data-metric') || '';
            var value = element.getAttribute('data-value') || '-';
            var growth = element.getAttribute('data-growth') || '—';
            tooltip.innerHTML = '<strong>' + year + '年</strong><br>' +
                metricNames[metric] + '：' + value + '分<br>同比增长：' + growth;
            tooltip.style.display = 'block';

            var rect = element.getBoundingClientRect();
            var left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
            var top = rect.top - tooltip.offsetHeight - 12;
            if (top < 8) top = rect.bottom + 12;
            left = Math.max(8, Math.min(left, window.innerWidth - tooltip.offsetWidth - 8));
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        }

        function hideIndexTrendTooltip() {
            var tooltip = document.getElementById('indexTrendTooltip');
            if (tooltip) tooltip.style.display = 'none';
        }

        function getIndexHeatmapRanking(region) {
            var allData = typeof heatmapData !== 'undefined' && heatmapData.all ? heatmapData.all : {};
            if (allData[region] && allData[region].ranking) return allData[region].ranking;
            var sortedRegions = Object.keys(allData).sort(function(a, b) {
                return (allData[b].score || 0) - (allData[a].score || 0);
            });
            var position = sortedRegions.indexOf(region);
            return position >= 0 ? '全国第' + (position + 1) : '-';
        }

        function handleIndexHeatmapClick(event, region, score) {
            if (event) event.stopPropagation();
            window.clearTimeout(indexHeatmapClickTimer);
            indexHeatmapClickTimer = window.setTimeout(function() {
                showHeatmapDetail(region, score);
            }, 240);
        }

        function handleIndexHeatmapDoubleClick(event, region) {
            if (event) event.stopPropagation();
            window.clearTimeout(indexHeatmapClickTimer);
            closeHeatmapDetail();
            drilldownHeatmap(region);
        }

        function showIndexRadarDetails() {
            var panel = document.getElementById('indexRadarDetailPanel');
            var grid = document.getElementById('indexRadarDetailGrid');
            if (!panel || !grid) return;
            var checkedItems = Array.from(document.querySelectorAll('#compareCheckboxes input:checked')).map(function(input) { return input.value; });
            var dimensions = ['人才总量', '科研产出', '学术影响力', '产业贡献度', '流动活跃度'];
            var sources = ['人才库与人才密度统计', '论文、专利及项目成果库', '引用、H指数与学术任职数据', '产学研项目及成果转化数据', '人才流动与跨机构合作数据'];
            var samples = ['12.8万名人才样本', '8.6万项科研成果样本', '6.2万名高层次人才样本', '2.4万项产学研项目样本', '18.7万条流动记录样本'];
            var rankTrends = ['第3 → 第2', '第5 → 第4', '第4 → 第3', '第6 → 第5', '第7 → 第8'];
            var dataMap = typeof currentCompareType !== 'undefined' && currentCompareType === 'industry' ? industryCompareData : regionCompareData;
            var selectedNames = checkedItems.length ? checkedItems.join('、') : '当前对比对象';
            grid.innerHTML = dimensions.map(function(dimension, index) {
                var values = checkedItems.map(function(item) {
                    var data = dataMap && dataMap[item];
                    return data && data.dimensions ? Number(data.dimensions[index]) : 0;
                }).filter(function(value) { return value > 0; });
                var average = values.length ? (values.reduce(function(sum, value) { return sum + value; }, 0) / values.length).toFixed(1) : '-';
                return '<div class="index-radar-detail-card">' +
                    '<h5>' + dimension + ' <span style="float:right; color:#1890ff;">' + average + '分</span></h5>' +
                    '<p><strong>得分来源：</strong>' + sources[index] + '</p>' +
                    '<p><strong>样本数量：</strong>' + samples[index] + '</p>' +
                    '<p><strong>排名趋势：</strong>' + rankTrends[index] + '</p>' +
                    '<p style="color:#999;">对比对象：' + selectedNames + '</p>' +
                    '</div>';
            }).join('');
            panel.classList.add('show');
            panel.setAttribute('aria-hidden', 'false');
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function hideIndexRadarDetails() {
            var panel = document.getElementById('indexRadarDetailPanel');
            if (panel) {
                panel.classList.remove('show');
                panel.setAttribute('aria-hidden', 'true');
            }
        }

        function showIndexExportScopeModal() {
            var modal = document.getElementById('indexExportScopeModal');
            if (!modal) return;
            document.querySelectorAll('#indexExportScopeModal input[type="checkbox"]').forEach(function(input) {
                input.checked = true;
            });
            var oldMenu = document.getElementById('exportDropdownMenu');
            if (oldMenu) oldMenu.classList.remove('show');
            modal.style.display = 'flex';
        }

        function closeIndexExportScopeModal() {
            var modal = document.getElementById('indexExportScopeModal');
            if (modal) modal.style.display = 'none';
        }

        function confirmIndexExportScope() {
            selectedIndexExportScope = Array.from(document.querySelectorAll('#indexExportScopeModal input[type="checkbox"]:checked')).map(function(input) { return input.value; });
            if (!selectedIndexExportScope.length) {
                alert('请至少选择一项导出内容');
                return;
            }
            var summary = document.getElementById('indexExportScopeSummary');
            if (summary) summary.textContent = selectedIndexExportScope.join('、');
            closeIndexExportScopeModal();
            var formatModal = document.getElementById('indexExportFormatModal');
            if (formatModal) formatModal.style.display = 'flex';
        }

        function closeIndexExportFormatModal() {
            var modal = document.getElementById('indexExportFormatModal');
            if (modal) modal.style.display = 'none';
        }

        function startIndexExport(format) {
            var formatNames = { pdf: 'PDF报告', excel: 'Excel报告', csv: 'csv报告' };
            closeIndexExportFormatModal();
            showIndexToast('正在生成' + formatNames[format] + '，请稍候…');
            window.setTimeout(function() {
                showIndexToast(formatNames[format] + '已导出');
            }, 1300);
        }

        function selectIndexReportCover(button) {
            if (!button) return;
            document.querySelectorAll('.index-report-cover').forEach(function(item) { item.classList.remove('active'); });
            button.classList.add('active');
            selectedIndexReportCover = button.getAttribute('data-cover') || '蓝色科技';
        }

        // 生成报告时读取用户编辑的标题、封面和摘要
        function showReportSettings() {
            var titleInput = document.getElementById('indexReportTitle');
            var summaryInput = document.getElementById('indexReportSummary');
            var title = titleInput ? titleInput.value.trim() : '全国科技人才支撑能力分析报告';
            var summary = summaryInput ? summaryInput.value.trim() : '';
            if (!title) {
                alert('请输入报告标题');
                if (titleInput) titleInput.focus();
                return;
            }
            if (!summary) {
                alert('请输入摘要描述');
                if (summaryInput) summaryInput.focus();
                return;
            }
            showIndexToast('正在生成《' + title + '》（' + selectedIndexReportCover + '封面）…');
            window.setTimeout(function() {
                showIndexToast('分析报告已生成');
            }, 1500);
        }

        function generateIndexReport() {
            showReportSettings();
        }

        ['indexWeightPlanModal', 'indexExportScopeModal', 'indexExportFormatModal'].forEach(function(id) {
            var modal = document.getElementById(id);
            if (modal) {
                modal.addEventListener('click', function(event) {
                    if (event.target !== modal) return;
                    if (id === 'indexWeightPlanModal') closeIndexWeightPlanModal();
                    if (id === 'indexExportScopeModal') closeIndexExportScopeModal();
                    if (id === 'indexExportFormatModal') closeIndexExportFormatModal();
                });
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key !== 'Escape') return;
            closeIndexWeightPlanModal();
            closeIndexExportScopeModal();
            closeIndexExportFormatModal();
        });

  /* ---- script-6：检索增强（收藏/分布统计） ---- */
// 人才检索页增强交互：历史记录、结果联动、收藏夹与分布分析
        let favoriteTalentIds = new Set();
        let favoriteTalentTags = {};
        let talentBaseResultSet = [];
        let talentDisplayedResultSet = [];
        let activeTalentDistribution = { dimension: '', value: '' };

        function talentNotify(message, type) {
            if (typeof showToast === 'function') {
                showToast(message, type || 'info');
            } else {
                console.log(message);
            }
        }

        function talentEscapeHtml(value) {
            return String(value == null ? '' : value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function setSearchHistoryLock(index, locked) {
            const keyword = searchHistory[index];
            if (!keyword) return;
            if (locked) {
                lockedSearchHistory.add(keyword);
                talentNotify('已锁定该搜索记录', 'success');
            } else {
                lockedSearchHistory.delete(keyword);
                talentNotify('已解除该搜索记录的锁定', 'info');
            }
            showSearchHistory();
        }

        function loadMoreRecommendations() {
            if (recommendationLoadCount >= 2) return;
            recommendationLoadCount += 1;
            recommendationVisibleCount = Math.min(2 + recommendationLoadCount * 4, recommendExperts.length);
            renderRecommendations();
            talentNotify('已新增4位专家推荐', 'success');
        }

        function getActiveTalentTags() {
            return Array.from(document.querySelectorAll('#module-search .tag-item.active'))
                .map(item => item.textContent.trim())
                .filter(Boolean);
        }

        function filterTalentExpertsByTags(experts, tags) {
            if (!tags || tags.length === 0) return experts.slice();
            return experts.filter(expert => tags.some(tag => (expert.research || []).includes(tag)));
        }

        function updateTalentResultDisplay(experts, options) {
            const list = Array.isArray(experts) ? experts.slice() : [];
            talentDisplayedResultSet = list;
            if (typeof originalTalentUpdateExpertResults === 'function') {
                originalTalentUpdateExpertResults(list);
            }
            const resultCount = document.getElementById('resultCount');
            if (resultCount) resultCount.textContent = list.length;
            if (!(options && options.keepDistribution)) {
                activeTalentDistribution = { dimension: '', value: '' };
            }
            renderTalentDistribution(list);
            syncTalentFavoriteButtons();
        }

        function applyTalentTagFilters() {
            const tags = getActiveTalentTags();
            const filtered = filterTalentExpertsByTags(talentBaseResultSet, tags);
            updateTalentResultDisplay(filtered);
        }

        function getTalentDistributionEntries(experts, dimension) {
            const counts = {};
            experts.forEach(expert => {
                const values = dimension === 'research'
                    ? (expert.research || [])
                    : [dimension === 'institution' ? expert.institution : expert.title];
                values.filter(Boolean).forEach(value => {
                    counts[value] = (counts[value] || 0) + 1;
                });
            });
            return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN'));
        }

        function switchTalentDistribution(dimension, button) {
            document.querySelectorAll('#talentDistributionStatistics .statistics-tab').forEach(tab => tab.classList.remove('active'));
            if (button) button.classList.add('active');
            renderTalentDistribution(talentDisplayedResultSet);
        }

        function renderTalentDistribution(experts) {
            const chart = document.getElementById('talentDistributionChart');
            if (!chart) return;
            const activeTab = document.querySelector('#talentDistributionStatistics .statistics-tab.active');
            const dimension = activeTab ? activeTab.dataset.statDimension : 'institution';
            const total = experts.length || 1;
            const entries = getTalentDistributionEntries(experts, dimension).slice(0, 8);

            if (entries.length === 0) {
                chart.innerHTML = '<div class="distribution-empty"><i class="fas fa-chart-pie"></i><span>暂无可分析的专家数据</span></div>';
                return;
            }

            chart.innerHTML = entries.map(([value, count]) => {
                const percent = Math.round(count / total * 100);
                const isActive = activeTalentDistribution.dimension === dimension && activeTalentDistribution.value === value;
                return `
                    <button type="button" class="distribution-block${isActive ? ' active' : ''}" onclick="filterTalentByDistribution('${dimension}', '${talentEscapeHtml(value)}')">
                        <span class="distribution-block-name">${talentEscapeHtml(value)}</span>
                        <span class="distribution-block-value">${count}人</span>
                        <span class="distribution-block-percent">${percent}%</span>
                        <span class="distribution-block-bar"><span style="width:${Math.max(percent, 8)}%"></span></span>
                    </button>
                `;
            }).join('');
        }

        function filterTalentByDistribution(dimension, value) {
            const decodedValue = String(value).replace(/&#39;/g, "'").replace(/&quot;/g, '\"');
            const tags = getActiveTalentTags();
            const tagged = filterTalentExpertsByTags(talentBaseResultSet, tags);
            const sameSelection = activeTalentDistribution.dimension === dimension && activeTalentDistribution.value === decodedValue;
            const activeTab = document.querySelector(`#talentDistributionStatistics .statistics-tab[data-stat-dimension="${dimension}"]`);
            document.querySelectorAll('#talentDistributionStatistics .statistics-tab').forEach(tab => tab.classList.remove('active'));
            if (activeTab) activeTab.classList.add('active');
            const filtered = sameSelection
                ? tagged
                : tagged.filter(expert => dimension === 'research'
                    ? (expert.research || []).includes(decodedValue)
                    : expert[dimension] === decodedValue);
            activeTalentDistribution = sameSelection ? { dimension: '', value: '' } : { dimension, value: decodedValue };
            updateTalentResultDisplay(filtered, { keepDistribution: true });
        }

        function exportTalentDistribution(format) {
            const label = format === 'image' ? '图像' : '报告';
            talentNotify(`正在生成当前分布${label}，已包含当前筛选结果`, 'info');
            window.setTimeout(() => talentNotify(`当前分布${label}已准备完成`, 'success'), 700);
        }

        function syncTalentFavoriteButtons() {
            document.querySelectorAll('#module-search .action-btn[title="收藏"]').forEach(button => {
                const match = (button.getAttribute('onclick') || '').match(/toggleTalentFavorite\((\d+)\)/);
                if (!match) return;
                const icon = button.querySelector('i');
                if (!icon) return;
                const active = favoriteTalentIds.has(Number(match[1]));
                icon.classList.toggle('fas', active);
                icon.classList.toggle('far', !active);
                icon.style.color = active ? '#ff4d4f' : '';
            });
        }

        function toggleTalentFavorite(id) {
            const numericId = Number(id);
            if (favoriteTalentIds.has(numericId)) {
                favoriteTalentIds.delete(numericId);
                talentNotify('已取消收藏', 'info');
            } else {
                favoriteTalentIds.add(numericId);
                talentNotify('已收藏专家，可在收藏夹中查看', 'success');
            }
            syncTalentFavoriteButtons();
            if (document.getElementById('talentFavoritesOverlay')?.classList.contains('show')) renderTalentFavorites();
        }

        function showTalentFavorites() {
            const overlay = document.getElementById('talentFavoritesOverlay');
            if (!overlay) return;
            overlay.classList.add('show');
            renderTalentFavorites();
        }

        function closeTalentFavorites() {
            const overlay = document.getElementById('talentFavoritesOverlay');
            if (overlay) overlay.classList.remove('show');
        }

        function renderTalentFavorites() {
            const list = document.getElementById('favoriteExpertList');
            if (!list) return;
            const query = (document.getElementById('favoriteExpertSearch')?.value || '').trim().toLowerCase();
            const experts = Array.from(favoriteTalentIds)
                .map(id => expertDatabase.find(expert => expert.id === id))
                .filter(Boolean)
                .filter(expert => !query || [expert.name, expert.institution, ...(expert.research || [])].join(' ').toLowerCase().includes(query));

            if (experts.length === 0) {
                list.innerHTML = '<div class="favorites-empty"><i class="far fa-bookmark"></i><p>暂无符合条件的收藏专家</p><span>在专家结果卡片点击心形图标即可收藏</span></div>';
                return;
            }
            list.innerHTML = experts.map(expert => `
                <div class="favorite-expert-row">
                    <div class="favorite-expert-avatar" style="background:${expert.gradient || '#1890ff'}">${talentEscapeHtml(expert.name.charAt(0))}</div>
                    <div class="favorite-expert-main" onclick="showTalentDetail(${expert.id})">
                        <div class="favorite-expert-name">${talentEscapeHtml(expert.name)} <span>${talentEscapeHtml(expert.title)}</span></div>
                        <div class="favorite-expert-meta"><i class="fas fa-university"></i>${talentEscapeHtml(expert.institution)} · ${talentEscapeHtml((expert.research || []).join('、'))}</div>
                    </div>
                    <input class="favorite-tag-input" type="text" maxlength="12" value="${talentEscapeHtml(favoriteTalentTags[expert.id] || '')}" placeholder="添加标签" onchange="setTalentFavoriteTag(${expert.id}, this.value)">
                    <button type="button" class="favorite-remove-btn" onclick="removeTalentFavorite(${expert.id})" title="取消收藏"><i class="fas fa-trash-alt"></i></button>
                </div>
            `).join('');
        }

        function setTalentFavoriteTag(id, value) {
            favoriteTalentTags[Number(id)] = String(value || '').trim();
            talentNotify('收藏标签已更新', 'success');
        }

        function removeTalentFavorite(id) {
            favoriteTalentIds.delete(Number(id));
            renderTalentFavorites();
            syncTalentFavoriteButtons();
            talentNotify('已从收藏夹移除', 'info');
        }

        // 检索卡片及推荐卡片统一进入独立详情页，详情页不显示编辑/删除操作。
        function showTalentDetail(id) {
            window.__mapGoto('external');
        }

        const originalTalentUpdateExpertResults = window.updateExpertResults;
        if (typeof originalTalentUpdateExpertResults === 'function') {
            window.updateExpertResults = function(experts) {
                talentBaseResultSet = Array.isArray(experts) ? experts.slice() : [];
                updateTalentResultDisplay(filterTalentExpertsByTags(talentBaseResultSet, getActiveTalentTags()));
            };
        }

        const originalTalentRenderExpertCards = window.renderExpertCards;
        if (typeof originalTalentRenderExpertCards === 'function') {
            window.renderExpertCards = function(experts) {
                originalTalentRenderExpertCards(talentDisplayedResultSet.length ? talentDisplayedResultSet : experts);
                syncTalentFavoriteButtons();
            };
        }

        const originalTalentRenderExpertList = window.renderExpertList;
        if (typeof originalTalentRenderExpertList === 'function') {
            window.renderExpertList = function(experts) {
                originalTalentRenderExpertList(talentDisplayedResultSet.length ? talentDisplayedResultSet : experts);
                syncTalentFavoriteButtons();
            };
        }

        function __domInit_6() {
            talentBaseResultSet = Array.isArray(expertDatabase) ? expertDatabase.slice() : [];
            talentDisplayedResultSet = talentBaseResultSet.slice();
            renderTalentDistribution(talentDisplayedResultSet);
            syncTalentFavoriteButtons();
        };

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') closeTalentFavorites();
        });

  /* ---- script-7：订阅增强（IIFE，含就地初始化） ---- */
// ========== 人才库订阅增强交互 ==========
        (function () {
            const subscriptionDetailPage = '2.3.1.1人才检索专家详情.html';
            const getExperts = () => {
                try {
                    return (typeof expertDatabase !== 'undefined' && Array.isArray(expertDatabase)) ? expertDatabase : [];
                } catch (error) {
                    return [];
                }
            };

            const escapeSubscriptionHtml = (value) => String(value ?? '')
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

            const highlightSubscriptionText = (value, keyword) => {
                const text = escapeSubscriptionHtml(value);
                const query = String(keyword || '').trim();
                if (!query) return text;
                const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                return text.replace(new RegExp(escapedQuery, 'ig'), match => `<mark class="subscription-highlight">${match}</mark>`);
            };

            function renderSubscriptionExperts(keyword) {
                const list = document.getElementById('subscriptionExpertList');
                const count = document.getElementById('subscriptionExpertCount');
                if (!list) return;
                const query = String(keyword || '').trim();
                const source = getExperts();
                const matched = source.filter(expert => {
                    const searchable = [expert.name, expert.title, expert.institution, expert.achievements, ...(expert.research || [])].join(' ');
                    return !query || searchable.toLowerCase().includes(query.toLowerCase());
                });
                if (count) count.textContent = `${matched.length}位专家`;
                if (!matched.length) {
                    list.innerHTML = '<div class="subscription-empty"><i class="fas fa-search" style="font-size:22px;margin-bottom:10px;display:block;"></i>未找到匹配的专家</div>';
                    return;
                }
                list.innerHTML = matched.map(expert => `
                    <div class="subscription-expert-card" onclick="openSubscriptionExpertProfile(${Number(expert.id)})">
                        <div class="subscription-expert-card-head">
                            <div class="subscription-expert-avatar" style="background:${expert.gradient || '#1890ff'}">${highlightSubscriptionText((expert.name || '').charAt(0), query)}</div>
                            <div class="subscription-expert-card-main">
                                <div class="subscription-expert-name">${highlightSubscriptionText(expert.name, query)}</div>
                                <span class="subscription-expert-title">${highlightSubscriptionText(expert.title, query)}</span>
                                <span class="subscription-expert-institution"><i class="fas fa-university" style="margin-right:4px;"></i>${highlightSubscriptionText(expert.institution, query)}</span>
                            </div>
                        </div>
                        <div class="subscription-expert-tags">${(expert.research || []).slice(0, 3).map(tag => `<span class="subscription-expert-tag">${highlightSubscriptionText(tag, query)}</span>`).join('')}</div>
                        <div class="subscription-expert-stats">
                            <span class="subscription-expert-stat"><strong>${expert.papers || 0}</strong>论文</span>
                            <span class="subscription-expert-stat"><strong>${Number(expert.citations || 0).toLocaleString()}</strong>引用</span>
                            <span class="subscription-expert-stat"><strong>${expert.hIndex || 0}</strong>H指数</span>
                        </div>
                    </div>
                `).join('');
            }

            window.openSubscriptionExpertProfile = function (id) {
                window.__mapGoto('external');
            };
            window.handleSubscriptionSearch = function (keyword) {
                renderSubscriptionExperts(keyword);
            };

            // 订阅管理数据用于支持新增、编辑、暂停和恢复的演示闭环。
            let subscriptionState = [
                { id: 1, name: '人工智能领域顶尖专家', scope: '全球范围', categories: ['academician', 'international_award'], tags: ['人工智能', '深度学习', 'IEEE Fellow'], frequency: '实时推送', status: 'active', count: 128 },
                { id: 2, name: '量子计算研究团队', scope: '中国', categories: ['academician', 'research_backbone'], tags: ['量子计算', '中科院', '院士'], frequency: '每日推送', status: 'active', count: 56 },
                { id: 3, name: '生物技术领军人才', scope: '美国', categories: ['acm_fellow', 'leading_university'], tags: ['生物技术', '基因编辑', 'ACM Fellow'], frequency: '每周推送', status: 'paused', count: 89 }
            ];
            let editingSubscriptionId = null;
            let pendingPauseSubscriptionId = null;

            const categoryLabels = {
                academician: '院士', ieee_fellow: 'IEEE Fellow', acm_fellow: 'ACM Fellow', nsfc: '国家杰青',
                changjiang: '长江学者', qianren: '千人计划', international_award: '国际奖项获得者',
                leading_university: '知名高校', research_backbone: '科研机构骨干人才'
            };

            function renderSubscriptionItems() {
                const list = document.querySelector('#module-subscription .subscription-list');
                if (!list) return;
                list.innerHTML = subscriptionState.map(item => `
                    <div class="subscription-item">
                        <div class="subscription-item-header">
                            <div class="subscription-item-name">${escapeSubscriptionHtml(item.name)}</div>
                            <span class="subscription-item-status ${item.status === 'active' ? 'active' : 'paused'}">${item.status === 'active' ? '订阅中' : '已暂停'}</span>
                        </div>
                        <div class="subscription-item-meta">
                            <span><i class="fas fa-globe"></i> ${escapeSubscriptionHtml(item.scope)}</span>
                            <span><i class="fas fa-bell"></i> ${escapeSubscriptionHtml(item.frequency)}</span>
                            <span><i class="fas fa-users"></i> 已订阅 ${item.count} 人</span>
                        </div>
                        <div class="subscription-item-tags">${(item.tags || []).map(tag => `<span class="subscription-tag">${escapeSubscriptionHtml(tag)}</span>`).join('')}</div>
                        <div class="subscription-item-actions">
                            <button class="subscription-item-btn" onclick="editSubscription(${item.id})"><i class="fas fa-edit"></i> 编辑</button>
                            ${item.status === 'active'
                                ? `<button class="subscription-item-btn" onclick="pauseSubscription(${item.id})"><i class="fas fa-pause"></i> 暂停</button>`
                                : `<button class="subscription-item-btn" onclick="resumeSubscription(${item.id})"><i class="fas fa-play"></i> 恢复</button>`}
                            <button class="subscription-item-btn danger" onclick="deleteSubscription(${item.id})"><i class="fas fa-trash"></i> 删除</button>
                        </div>
                    </div>
                `).join('');
            }

            function resetSubscriptionForm() {
                const name = document.getElementById('subscriptionName');
                const scope = document.getElementById('subscriptionScope');
                const tags = document.getElementById('subscriptionTags');
                const frequency = document.getElementById('subscriptionFrequency');
                if (name) name.value = '';
                if (scope) scope.value = 'global';
                if (tags) tags.value = '';
                if (frequency) frequency.value = 'realtime';
                document.querySelectorAll('#subscriptionCategoryOptions input[type="checkbox"]').forEach(cb => cb.checked = false);
                document.querySelectorAll('#subscriptionChannelOptions input[type="checkbox"]').forEach(cb => cb.checked = cb.value === 'web');
            }

            function setSubscriptionForm(item) {
                resetSubscriptionForm();
                if (!item) return;
                document.getElementById('subscriptionName').value = item.name || '';
                document.getElementById('subscriptionScope').value = item.scope === '中国' ? 'country' : item.scope === '美国' ? 'institution' : 'global';
                document.getElementById('subscriptionTags').value = (item.tags || []).join('、');
                const frequencyMap = { '实时推送': 'realtime', '每日推送': 'daily', '每周推送': 'weekly' };
                document.getElementById('subscriptionFrequency').value = frequencyMap[item.frequency] || 'realtime';
                (item.categories || []).forEach(value => {
                    const checkbox = document.querySelector(`#subscriptionCategoryOptions input[value="${value}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }

            window.showAddSubscriptionModal = function () {
                editingSubscriptionId = null;
                resetSubscriptionForm();
                document.getElementById('subscriptionModalTitle').innerHTML = '<i class="fas fa-plus-circle" style="color:#1890ff;margin-right:8px;"></i>新增订阅';
                document.getElementById('addSubscriptionModal').classList.add('show');
            };
            window.closeAddSubscriptionModal = function () {
                const modal = document.getElementById('addSubscriptionModal');
                if (modal) modal.classList.remove('show');
                editingSubscriptionId = null;
            };
            window.editSubscription = function (id) {
                const item = subscriptionState.find(subscription => subscription.id === Number(id));
                if (!item) return;
                editingSubscriptionId = item.id;
                setSubscriptionForm(item);
                document.getElementById('subscriptionModalTitle').innerHTML = '<i class="fas fa-edit" style="color:#1890ff;margin-right:8px;"></i>编辑订阅';
                document.getElementById('addSubscriptionModal').classList.add('show');
            };
            window.saveSubscription = function () {
                const name = document.getElementById('subscriptionName')?.value.trim();
                if (!name) {
                    showToast('请输入订阅名称', 'warning');
                    return;
                }
                const scopeValue = document.getElementById('subscriptionScope').value;
                const scopeLabels = { global: '全球范围', country: '中国', institution: '机构级' };
                const frequencyValue = document.getElementById('subscriptionFrequency').value;
                const frequencyLabels = { realtime: '实时推送', daily: '每日推送', weekly: '每周推送' };
                const categories = Array.from(document.querySelectorAll('#subscriptionCategoryOptions input:checked')).map(cb => cb.value);
                const selectedLabels = categories.map(value => categoryLabels[value]).filter(Boolean);
                const tagValues = document.getElementById('subscriptionTags').value.split(/[、,，]/).map(value => value.trim()).filter(Boolean);
                const tags = Array.from(new Set([...tagValues, ...selectedLabels.slice(0, 2)])).slice(0, 4);
                if (editingSubscriptionId) {
                    const item = subscriptionState.find(subscription => subscription.id === editingSubscriptionId);
                    Object.assign(item, { name, scope: scopeLabels[scopeValue] || '全球范围', frequency: frequencyLabels[frequencyValue] || '实时推送', categories, tags });
                    showToast('订阅已更新！', 'success');
                } else {
                    subscriptionState.push({ id: Date.now(), name, scope: scopeLabels[scopeValue] || '全球范围', categories, tags, frequency: frequencyLabels[frequencyValue] || '实时推送', status: 'active', count: 0 });
                    showToast('订阅创建成功！', 'success');
                }
                renderSubscriptionItems();
                window.closeAddSubscriptionModal();
            };
            window.pauseSubscription = function (id) {
                pendingPauseSubscriptionId = Number(id);
                document.getElementById('pauseSubscriptionModal').classList.add('show');
            };
            window.closePauseSubscriptionModal = function () {
                document.getElementById('pauseSubscriptionModal')?.classList.remove('show');
                pendingPauseSubscriptionId = null;
            };
            window.confirmPauseSubscription = function () {
                const item = subscriptionState.find(subscription => subscription.id === pendingPauseSubscriptionId);
                if (item) item.status = 'paused';
                renderSubscriptionItems();
                window.closePauseSubscriptionModal();
                showToast('暂定成功！', 'success');
            };
            window.resumeSubscription = function (id) {
                const item = subscriptionState.find(subscription => subscription.id === Number(id));
                if (item) item.status = 'active';
                renderSubscriptionItems();
                showToast('订阅已恢复', 'success');
            };
            window.deleteSubscription = function (id) {
                if (!window.confirm('确定要删除该订阅吗？')) return;
                subscriptionState = subscriptionState.filter(subscription => subscription.id !== Number(id));
                renderSubscriptionItems();
                showToast('订阅已删除', 'info');
            };

            // 动态卡片与智能推荐统一跳转到人才检索使用的专家详情页。
            window.viewDynamicDetail = function (id) {
                window.openSubscriptionExpertProfile(Number(id));
            };
            window.viewExpertProfile = function (id) {
                window.openSubscriptionExpertProfile(Number(id));
            };
            window.viewMoreRecommendations = function () {
                window.__mapGoto('external');
            };

            const notificationDetails = {
                1: { type: '论文更新', time: '30分钟前', title: '张伟教授新发表2篇顶会论文', source: '人工智能领域顶尖专家订阅', body: '张伟教授团队围绕可解释深度学习完成两项研究成果，分别发表于 NeurIPS 与 IEEE TPAMI。成果提出分层注意力归因方法，可提升复杂视觉模型的可追溯性，建议重点关注其后续开源模型和工程转化进展。' },
                2: { type: '获奖信息', time: '2小时前', title: '李娜教授获得IEEE最佳论文奖', source: '人工智能领域顶尖专家订阅', body: '李娜教授团队凭借多模态视觉理解方向的论文获得 IEEE 最佳论文奖。该成果在跨模态检索和小样本场景中表现突出，已进入实验验证阶段，后续可能形成新的合作项目或技术转移机会。' },
                3: { type: '机构变动', time: '1天前', title: '王强教授加入清华大学任教授', source: '量子计算研究团队订阅', body: '王强教授已加入清华大学相关研究团队，主要负责量子算法与量子信息交叉方向建设。此次任职将加强原团队与清华大学在人才培养、联合实验室和重大项目申报方面的协同。' }
            };
            window.filterNotifications = function (type, element) {
                document.querySelectorAll('#module-subscription .notification-filter-btn').forEach(btn => btn.classList.remove('active'));
                if (element) element.classList.add('active');
                document.querySelectorAll('#module-subscription .notification-item').forEach(item => {
                    const icon = item.querySelector('.notification-item-type i');
                    const matched = type === 'all' || (type === 'paper' && icon?.classList.contains('fa-file-alt')) || (type === 'award' && icon?.classList.contains('fa-trophy')) || (type === 'institution' && icon?.classList.contains('fa-building'));
                    item.style.display = matched ? '' : 'none';
                });
            };
            window.viewNotificationDetail = function (id) {
                const detail = notificationDetails[id] || notificationDetails[1];
                document.getElementById('notificationDetailBody').innerHTML = `
                    <p><span class="detail-label">消息类型：</span>${escapeSubscriptionHtml(detail.type)}　<span class="detail-label">${escapeSubscriptionHtml(detail.time)}</span></p>
                    <p style="font-size:16px;font-weight:600;color:#26384e;">${escapeSubscriptionHtml(detail.title)}</p>
                    <p>${escapeSubscriptionHtml(detail.body)}</p>
                    <p><span class="detail-label">来源订阅：</span>${escapeSubscriptionHtml(detail.source)}</p>`;
                document.getElementById('notificationDetailModal').classList.add('show');
            };
            window.closeNotificationDetail = function () { document.getElementById('notificationDetailModal')?.classList.remove('show'); };
            window.showNotificationSettings = function () { document.getElementById('notificationSettingsModal').classList.add('show'); };
            window.closeNotificationSettings = function () { document.getElementById('notificationSettingsModal')?.classList.remove('show'); };
            window.saveNotificationSettings = function () {
                const channels = Array.from(document.querySelectorAll('#notificationChannelOptions input:checked')).map(input => input.value);
                if (!channels.length) {
                    showToast('请至少选择一种订阅方式', 'warning');
                    return;
                }
                window.closeNotificationSettings();
                showToast('保存成功', 'success');
            };

            const reportHistory = [
                { name: '人才库订阅月度动态报告', date: '2026-09-01', format: 'PDF' },
                { name: '人工智能专家周报', date: '2026-08-24', format: 'Excel' },
                { name: '全球人才获奖与机构变动简报', date: '2026-08-01', format: 'PDF' }
            ];
            window.showSubscriptionReportSettings = function () { document.getElementById('subscriptionReportSettingsModal').classList.add('show'); };
            window.closeSubscriptionReportSettings = function () { document.getElementById('subscriptionReportSettingsModal')?.classList.remove('show'); };
            window.saveSubscriptionReportSettings = function () {
                const reportName = document.getElementById('subscriptionReportName')?.value.trim();
                const contents = Array.from(document.querySelectorAll('#subscriptionReportContents input:checked'));
                const date = document.getElementById('subscriptionReportStartDate')?.value;
                if (!reportName || !contents.length || !date) {
                    showToast('请完善报告名称、报告内容和生成时间', 'warning');
                    return;
                }
                reportHistory.unshift({ name: reportName, date, format: 'PDF' });
                window.closeSubscriptionReportSettings();
                showToast('设置成功', 'success');
            };
            window.showSubscriptionReportHistory = function () {
                const list = document.getElementById('subscriptionHistoryList');
                list.innerHTML = reportHistory.map(report => `
                    <div class="subscription-history-row">
                        <div class="subscription-history-info"><div class="subscription-history-name">${escapeSubscriptionHtml(report.name)}</div><div class="subscription-history-meta">${escapeSubscriptionHtml(report.date)} · ${escapeSubscriptionHtml(report.format)} · 已生成</div></div>
                        <button type="button" class="subscription-history-download" onclick="downloadSubscriptionHistoryReport('${escapeSubscriptionHtml(report.name)}')"><i class="fas fa-download"></i> 下载</button>
                    </div>`).join('');
                document.getElementById('subscriptionReportHistoryModal').classList.add('show');
            };
            window.closeSubscriptionReportHistory = function () { document.getElementById('subscriptionReportHistoryModal')?.classList.remove('show'); };
            window.downloadSubscriptionHistoryReport = function (name) { showToast(`报告下载完成：${name}`, 'success'); };

            // SVG 节点提示框放在图表容器内，按照容器坐标定位，避免漂到页面顶部。
            window.showChartTooltip = function (element, label, value) {
                const container = element?.closest('.subscription-chart-container');
                if (!container) return;
                let tooltip = container.querySelector('.subscription-chart-tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'subscription-chart-tooltip';
                    tooltip.style.cssText = 'position:absolute;z-index:20;pointer-events:none;min-width:116px;padding:8px 10px;border-radius:6px;background:rgba(31,45,61,.94);color:#fff;font-size:12px;line-height:1.6;box-shadow:0 4px 12px rgba(0,0,0,.16);transition:opacity .15s;';
                    container.appendChild(tooltip);
                }
                const containerRect = container.getBoundingClientRect();
                const pointRect = element.getBoundingClientRect();
                const numericValue = Number(value) || 0;
                const growth = label === '1月' ? '—' : `+${Math.round((numericValue / 40 - 1) * 100)}%`;
                tooltip.innerHTML = `<div style="font-weight:600;">${escapeSubscriptionHtml(label)}</div><div>订阅专家：${numericValue}人</div><div>环比增长：${growth}</div>`;
                tooltip.style.opacity = '1';
                tooltip.style.left = `${pointRect.left - containerRect.left + pointRect.width / 2 - 58}px`;
                tooltip.style.top = `${pointRect.top - containerRect.top - 72}px`;
            };
            window.hideChartTooltip = function () {
                document.querySelectorAll('.subscription-chart-tooltip').forEach(tooltip => tooltip.style.opacity = '0');
            };

            function arrangeSubscriptionLayout() {
                const main = document.querySelector('#module-subscription .subscription-main');
                const sidebar = document.querySelector('#module-subscription .subscription-sidebar');
                const manage = document.querySelector('#module-subscription .subscription-manage');
                const stats = sidebar?.querySelector('.subscription-stats');
                if (!main || !sidebar || !manage) return;
                // 订阅管理按要求插入通知中心与订阅统计之间。
                if (stats && manage.parentElement === main) sidebar.insertBefore(manage, stats);
            }

            void function () {
                arrangeSubscriptionLayout();
                renderSubscriptionExperts(document.getElementById('subscriptionSearchInput')?.value || '');
                renderSubscriptionItems();
                document.querySelectorAll('#module-subscription .subscription-modal').forEach(modal => {
                    modal.addEventListener('click', event => {
                        if (event.target === modal) modal.classList.remove('show');
                    });
                });
            }();
        })();

  /* ---- optimization 层（注入统一分析范围导航并覆写 switchTab 等） ---- */
/* 全局分析上下文：复用现有分布、指数、检索、驾驶舱、订阅模块的数据与入口。 */
(function () {
    'use strict';

    var selected = { scope: 'global', field: 'all', type: 'all', period: '2022-2024' };

    function option(value, label) { return '<option value="' + value + '">' + label + '</option>'; }

    function contextMarkup() {
        return '<section class="map-analysis-context" aria-label="统一分析范围">' +
            '<div class="map-context-main">' +
                '<div class="map-context-heading"><strong>全球人才态势分析</strong><span>先定义范围，再进入分布、研判与行动</span></div>' +
                '<div class="map-context-controls">' +
                    '<div class="map-context-control"><label for="mapScope">地域范围</label><select id="mapScope">' +
                        option('global', '全球范围') + option('china', '中国') + option('asia-pacific', '亚太地区') + option('north-america', '北美地区') + option('europe', '欧洲地区') + '</select></div>' +
                    '<div class="map-context-control"><label for="mapField">产业 / 研究方向</label><select id="mapField">' +
                        option('all', '全部领域') + option('ai', '人工智能') + option('biotech', '生物技术') + option('newenergy', '新能源') + option('materials', '新材料') + option('quantum', '量子技术') + option('manufacturing', '智能制造') + '</select></div>' +
                    '<div class="map-context-control"><label for="mapTalentType">人才类别</label><select id="mapTalentType">' +
                        option('all', '全部人才') + option('academic', '学术型人才') + option('industry', '产业型人才') + option('leadership', '领军人才') + '</select></div>' +
                        '<div class="map-context-control"><label for="mapInstitutionType">机构类型</label><select id="mapInstitutionType">' +
                        option('all', '全部机构') + option('university', '高校科研类') + option('research', '科研院所类') + option('enterprise', '企业研发类') + '</select></div>' +
                        '<div class="map-context-control"><label for="mapPeriod">时间区间</label><select id="mapPeriod">' +
                        option('2022-2024', '2022—2024年') + option('2020-2022', '2020—2022年') + option('2018-2020', '2018—2020年') + '</select></div>' +
                '</div>' +
                '<div class="map-context-actions"><button class="map-context-btn" id="applyMapScope"><i class="fas fa-check"></i> 应用范围</button><button class="map-context-btn secondary" id="compareMapScope"><i class="fas fa-balance-scale"></i> 对比分析</button><button class="map-context-btn secondary" id="exportMapScope"><i class="fas fa-file-export"></i> 导出摘要</button></div>' +
            '</div>' +
            '<div class="map-context-foot"><div class="map-context-status" id="mapContextStatus"><i class="fas fa-circle"></i>当前正在查看：全球范围 · 全部领域 · 全部人才 · 2022—2024年</div></div>' +
        '</section>';
    }

    function primaryNavMarkup() {
        return '<nav class="map-primary-nav" aria-label="科技人才地图功能切换">' +
            '<button class="map-task-link active" data-map-tab="distribution"><i class="fas fa-chart-pie"></i> 态势研判</button>' +
            '<button class="map-task-link" data-map-tab="search"><i class="fas fa-search"></i> 人才发现</button>' +
            '<button class="map-task-link" data-map-tab="subscription"><i class="fas fa-bell"></i> 订阅服务</button>' +
        '</nav>';
    }

    function globalMarkup() {
        return '<div class="map-analysis-modes" aria-label="态势研判方式"><span>研判方式</span><button class="map-mode-link active" data-map-tab="distribution"><i class="fas fa-map-marked-alt"></i> 分布与流动</button><button class="map-mode-link" data-map-tab="index"><i class="fas fa-chart-line"></i> 人才指数</button><button class="map-mode-link" data-map-tab="cockpit"><i class="fas fa-tachometer-alt"></i> 驾驶舱</button><span class="map-mode-note">在任一研判页面均可切换分析方式。</span></div>';
    }

    function distributionDetailMarkup() {
        return '<div class="map-detail-actions" aria-label="分布与流动补充分析"><span>补充查看</span><button data-map-detail="hotfields"><i class="fas fa-tags"></i> 领域热点与趋势</button><button data-map-detail="flow"><i class="fas fa-exchange-alt"></i> 人才流动与时序</button><button data-map-detail="achievements"><i class="fas fa-award"></i> 代表性成果</button></div>';
    }

    function label(id) {
        var input = document.getElementById(id);
        return input && input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : '';
    }

    function updateStatus(action) {
        var status = document.getElementById('mapContextStatus');
        if (!status) return;
        var prefix = action ? action + '：' : '当前正在查看：';
        status.innerHTML = '<i class="fas fa-circle"></i>' + prefix + label('mapScope') + ' · ' + label('mapField') + ' · ' + label('mapTalentType') + ' · ' + label('mapInstitutionType') + ' · ' + label('mapPeriod');
    }

    function toast(message) {
        var old = document.querySelector('.map-export-feedback');
        if (old) old.remove();
        var node = document.createElement('div');
        node.className = 'map-export-feedback';
        node.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
        document.body.appendChild(node);
        window.setTimeout(function () { node.remove(); }, 3200);
    }

    function syncLegacyFilters() {
        var mapping = [['mapScope', 'regionFilter'], ['mapField', 'fieldFilter'], ['mapTalentType', 'talentFilter'], ['mapInstitutionType', 'institutionFilter']];
        mapping.forEach(function (pair) {
            var source = document.getElementById(pair[0]);
            var target = document.getElementById(pair[1]);
            if (source && target && Array.prototype.some.call(target.options, function (o) { return o.value === source.value; })) target.value = source.value;
        });
        var periods = { '2022-2024': ['2022-01-01', '2024-12-31'], '2020-2022': ['2020-01-01', '2022-12-31'], '2018-2020': ['2018-01-01', '2020-12-31'] };
        var span = periods[document.getElementById('mapPeriod').value];
        if (span) {
            window.currentDistributionTimeRange = { start: span[0], end: span[1] };
            var trigger = document.getElementById('distributionTimeRange');
            if (trigger) trigger.querySelector('span').innerHTML = '<i class="fas fa-calendar-alt"></i> ' + span[0] + ' 至 ' + span[1];
        }
        if (typeof window.applyDistributionFilters === 'function') window.applyDistributionFilters();
        syncStatCards();
    }

    function syncStatCards() {
        var data = {
            global: ['241,800', '7,920', '14.2%', '71', '26.8%'],
            china: ['128,456', '3,847', '15.7%', '56', '23.6%'],
            'asia-pacific': ['43,210', '1,536', '13.6%', '42', '24.1%'],
            'north-america': ['32,480', '1,124', '11.8%', '38', '29.4%'],
            europe: ['27,190', '968', '10.9%', '35', '25.6%']
        }[selected.scope] || [];
        document.querySelectorAll('.stats-cards .stat-card-value').forEach(function (card, index) {
            if (data[index]) card.textContent = data[index];
        });
    }

    function applyScope() {
        selected.scope = document.getElementById('mapScope').value;
        selected.field = document.getElementById('mapField').value;
        selected.type = document.getElementById('mapTalentType').value;
        selected.period = document.getElementById('mapPeriod').value;
        syncLegacyFilters();
        updateStatus('已应用分析范围');
        toast('分析范围已同步至当前模块，图表与地图已更新。');
    }

    function exportSummary() {
        var rows = [
            ['科技人才地图分析摘要'],
            ['地域范围', label('mapScope')], ['产业 / 研究方向', label('mapField')],
            ['人才类别', label('mapTalentType')], ['时间区间', label('mapPeriod')],
            ['包含模块', '人才分布与动态趋势分析、人才指数、人才检索、人才驾驶舱、人才库订阅']
        ];
        var csv = '\ufeff' + rows.map(function (row) { return row.map(function (cell) { return '"' + String(cell).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
        var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        var anchor = document.createElement('a');
        anchor.href = url; anchor.download = '科技人才地图分析摘要.csv'; anchor.click();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        updateStatus('已生成分析摘要');
        toast('已生成当前范围的 CSV 分析摘要。');
    }

    function tabElement(tab) { return document.querySelector('.nav-link[onclick*="\\\'' + tab + '\\\'"]'); }
    function goToTab(tab) {
        var nav = tabElement(tab);
        if (nav && typeof window.switchTab === 'function') window.switchTab(tab, nav);
        var primaryTab = (tab === 'index' || tab === 'cockpit') ? 'distribution' : tab;
        document.querySelectorAll('.map-task-link').forEach(function (button) { button.classList.toggle('active', button.dataset.mapTab === primaryTab); });
        document.querySelectorAll('.map-mode-link').forEach(function (button) { button.classList.toggle('active', button.dataset.mapTab === tab); });
        updateStatus('已进入' + (nav ? nav.textContent.trim() : '相关模块'));
    }

    function toggleDetail(name, button) {
        var target = { hotfields: '.hotfields-section', flow: '.flow-section', achievements: '.achievements-section' }[name];
        var section = target && document.querySelector('#module-distribution ' + target);
        if (!section) return;
        var opening = section.classList.contains('map-secondary-hidden');
        section.classList.toggle('map-secondary-hidden', !opening);
        if (name === 'flow') {
            var timeline = document.querySelector('#module-distribution .timeline-section');
            if (timeline) timeline.classList.toggle('map-secondary-hidden', !opening);
        }
        button.classList.toggle('active', opening);
        button.innerHTML = opening ? '<i class="fas fa-chevron-up"></i> 收起' + (name === 'hotfields' ? '领域热点与趋势' : name === 'flow' ? '人才流动与时序' : '代表性成果') : button.dataset.original;
        if (opening) {
            updateStatus('已展开补充分析');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function setup() {
        var main = document.querySelector('.main-content');
        var title = main && main.querySelector(':scope > .page-title');
        var distribution = document.getElementById('module-distribution');
        if (!main || !title || !distribution) return;
        title.insertAdjacentHTML('afterend', primaryNavMarkup() + contextMarkup() + globalMarkup());
        distribution.insertAdjacentHTML('afterbegin', distributionDetailMarkup());

        document.getElementById('applyMapScope').addEventListener('click', applyScope);
        document.getElementById('compareMapScope').addEventListener('click', function () { if (typeof window.showCompareModal === 'function') window.showCompareModal(); });
        document.getElementById('exportMapScope').addEventListener('click', exportSummary);
        document.querySelectorAll('.map-task-link').forEach(function (button) { button.addEventListener('click', function () { goToTab(button.dataset.mapTab); }); });
        document.querySelectorAll('.map-mode-link').forEach(function (button) { button.addEventListener('click', function () { goToTab(button.dataset.mapTab); }); });
        document.querySelectorAll('.map-detail-actions button').forEach(function (button) {
            button.dataset.original = button.innerHTML;
            button.addEventListener('click', function () { toggleDetail(button.dataset.mapDetail, button); });
        });
        ['.hotfields-section', '.flow-section', '.achievements-section', '.timeline-section'].forEach(function (selector) {
            var section = document.querySelector('#module-distribution ' + selector);
            if (section) section.classList.add('map-secondary-hidden');
        });
        ['mapScope', 'mapField', 'mapTalentType', 'mapInstitutionType', 'mapPeriod'].forEach(function (id) {
            document.getElementById(id).addEventListener('change', function () { updateStatus('待应用的分析范围'); });
        });

        /* 让统计卡片从“提示框”变成可追溯的分析动作。 */
        window.filterByStat = function (type, element) {
            document.querySelectorAll('.stat-card').forEach(function (card) { card.classList.remove('active'); });
            if (element) element.classList.add('active');
            var action = { total: '人才总量', institutions: '覆盖机构数', growth: '年度增长率', fields: '重点领域数量', mobility: '跨区域流动率' }[type] || '统计指标';
            updateStatus('已按“' + action + '”聚焦');
            toast('已聚焦“' + action + '”，可继续查看下方分布、热点与流动趋势。');
            if (typeof window.applyDistributionFilters === 'function') window.applyDistributionFilters();
        };
        var legacyReset = window.resetDistributionFilters;
        window.resetDistributionFilters = function () {
            if (typeof legacyReset === 'function') legacyReset();
            document.getElementById('mapScope').value = 'global';
            document.getElementById('mapField').value = 'all';
            document.getElementById('mapTalentType').value = 'all';
            document.getElementById('mapInstitutionType').value = 'all';
            document.getElementById('mapPeriod').value = '2022-2024';
            selected = { scope: 'global', field: 'all', type: 'all', period: '2022-2024' };
            syncStatCards();
            updateStatus('已恢复默认分析范围');
        };

        var legacySwitchTab = window.switchTab;
        window.switchTab = function (tab, element) {
            if (typeof legacySwitchTab === 'function') legacySwitchTab(tab, element);
            var context = document.querySelector('.map-analysis-context');
            if (context) context.classList.toggle('map-context-compact', tab === 'search' || tab === 'subscription');
            /* 全局态势指标仅服务于空间研判；发现与订阅不重复呈现这些指标。 */
            if (main) main.classList.toggle('map-non-analysis-view', tab === 'search' || tab === 'subscription');
            var primaryTab = (tab === 'index' || tab === 'cockpit') ? 'distribution' : tab;
            document.querySelectorAll('.map-task-link').forEach(function (button) { button.classList.toggle('active', button.dataset.mapTab === primaryTab); });
        };
    }

    window.__mapOptSetup = setup;
})();


  /* ---- dedup 层（检索/订阅职责收敛与跳转桥接） ---- */
/* 科技人才地图的职责收敛：空间研判为主，人才发现和订阅通过共享能力衔接人才库与人才动态。 */
(function () {
  'use strict';
  var subscriptions = [
    { name: '全球人工智能人才流动', scope: '全球范围 · 人工智能', freq: '每周', count: 12 },
    { name: '粤港澳大湾区生物医药态势', scope: '粤港澳大湾区 · 生物技术', freq: '实时', count: 8 },
    { name: '量子信息重点机构变化', scope: '中国 · 量子技术', freq: '每周', count: 6 }
  ];
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]; }); }
  function message(text) { var n = document.querySelector('.map-dedup-toast'); if (!n) { n = document.createElement('div'); n.className = 'map-dedup-toast'; document.body.appendChild(n); } n.textContent = text; n.classList.add('show'); clearTimeout(message.timer); message.timer = setTimeout(function () { n.classList.remove('show'); }, 2600); }
  function scopeText() { var parts = [['mapScope','全球范围'],['mapField','全部领域'],['mapTalentType','全部人才'],['mapPeriod','2022—2024年']]; return parts.map(function (pair) { var el = document.getElementById(pair[0]); return el && el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : pair[1]; }); }
  function handoffLibrary() { var s = scopeText(); sessionStorage.setItem('gkxMapHandoff', JSON.stringify({ scope:s[0], field:s[1], type:s[2], period:s[3], at:Date.now() })); window.__mapGoto('talentLibrary'); }
  function discoveryMarkup() {
    return '<section class="map-discovery-workspace"><header class="map-workspace-head"><div><span class="map-eyebrow">地图上下文人才检索</span><h2>区域人才发现</h2><p>基于当前地域、领域和时间范围识别代表人才与团队；完整筛选、比较和入池在科技人才库完成。</p></div><button class="map-primary-action" data-to-library>在科技人才库继续检索 <i class="fas fa-arrow-right"></i></button></header><div class="map-scope-chips" data-discovery-scope></div><div class="map-discovery-grid"><article class="map-discovery-summary"><h3>本次发现</h3><ul class="map-discovery-insights"><li><i class="fas fa-check-circle"></i><span><b>区域引领人才</b>：优先关注具有跨区域合作网络的领军专家。</span></li><li><i class="fas fa-check-circle"></i><span><b>潜力研究团队</b>：识别研究活跃度上升、与当前方向匹配的团队。</span></li><li><i class="fas fa-check-circle"></i><span><b>热点方向样本</b>：从当前空间分布中提取可进一步验证的代表对象。</span></li></ul><p>此处仅提供地图研判的重点样本；具体名单、条件比较与入池操作在科技人才库完成。</p><button class="map-outline-action" data-to-library>带入筛选条件</button></article><section class="map-representatives"><div class="map-section-label"><h3>代表人才</h3><span>仅展示地图研判中的重点样本</span></div><div class="map-person-list"><article><span class="map-avatar">张</span><div><b>张伟</b><small>中国科学院 · 人工智能</small></div><span class="map-person-tag">区域引领</span><button data-profile="t1">查看画像</button></article><article><span class="map-avatar">刘</span><div><b>刘洋</b><small>浙江大学 · AI for Science</small></div><span class="map-person-tag">潜力推荐</span><button data-profile="t6">查看画像</button></article><article><span class="map-avatar">陈</span><div><b>陈明</b><small>中国科学院 · 量子计算</small></div><span class="map-person-tag">热点方向</span><button data-profile="t4">查看画像</button></article></div></section></div><footer class="map-handoff-footer"><i class="fas fa-route"></i><span>下一步：进入科技人才库补充学科、机构、项目与成果条件，再批量加入我的专属人才池。</span><button data-to-library>前往科技人才库</button></footer></section>';
  }
  function subscriptionCards() { return subscriptions.map(function (item, i) { return '<article class="map-subscription-card"><div><b>' + esc(item.name) + '</b><small>' + esc(item.scope) + ' · ' + esc(item.freq) + '推送</small></div><span>' + item.count + ' 条待关注</span><button data-view-dynamic="' + i + '">查看动态</button></article>'; }).join(''); }
  function subscriptionMarkup() {
    return '<section class="map-subscription-workspace"><header class="map-workspace-head"><div><span class="map-eyebrow">人才库订阅</span><h2>区域主题订阅</h2><p>订阅区域、产业和机构的人才态势变化；个人和人才池更新统一在科技人才动态中处理。</p></div><button class="map-primary-action" data-new-subscription><i class="fas fa-plus"></i> 新增订阅</button></header><div class="map-subscription-intro"><div><i class="fas fa-map-marked-alt"></i><b>订阅对象</b><span>区域人才分布、流动、重点机构与热点领域变化</span></div><div><i class="fas fa-bell"></i><b>消息去向</b><span>科技人才动态通知中心，支持论文、获奖、任职与流动分类查看</span></div><button data-dynamic>打开科技人才动态</button></div><div class="map-subscription-list"><div class="map-section-label"><h3>我的区域主题订阅</h3><span>共 ' + subscriptions.length + ' 个订阅主题</span></div><div data-subscription-cards>' + subscriptionCards() + '</div></div></section><div class="map-subscription-modal" id="mapSubscriptionModal"><section><h3>新增区域主题订阅</h3><p>以当前地图分析范围为基础设置监测主题。</p><label>订阅名称<input id="mapSubName" placeholder="例如：全球人工智能人才流动" /></label><label>推送频率<select id="mapSubFreq"><option>实时</option><option selected>每周</option><option>每月</option></select></label><div class="map-modal-footer"><button data-close-sub>取消</button><button class="map-primary-action" data-save-sub>保存订阅</button></div></section></div>';
  }
  function installStyles() {
    var style = document.createElement('style'); style.textContent = '#module-search.map-compact-search > :not(.map-discovery-workspace),#module-subscription.map-compact-subscription > :not(.map-subscription-workspace):not(.map-subscription-modal){display:none!important}.map-discovery-workspace,.map-subscription-workspace{margin:0 auto;max-width:1320px;padding:20px;border:1px solid #e5e6eb;border-radius:8px;background:#fff}.map-workspace-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding-bottom:16px;border-bottom:1px solid #e5e6eb}.map-workspace-head h2{margin:3px 0 5px;color:#1d2129;font-size:20px}.map-workspace-head p{margin:0;color:#86909c;font-size:13px}.map-eyebrow{color:#165dff;font-size:12px;font-weight:600}.map-primary-action,.map-outline-action,.map-handoff-footer button{height:34px;padding:0 12px;border:1px solid #165dff;border-radius:4px;color:#fff;background:#165dff;white-space:nowrap;cursor:pointer}.map-scope-chips{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}.map-scope-chips span{padding:4px 8px;border-radius:3px;color:#165dff;background:#edf4ff;font-size:12px}.map-discovery-grid{display:grid;grid-template-columns:minmax(240px,.7fr) minmax(0,1.3fr);gap:16px}.map-discovery-summary{padding:16px;border:1px solid #e5e6eb;border-radius:6px;background:#f7faff}.map-discovery-summary h3,.map-representatives h3,.map-section-label h3{margin:0;font-size:15px}.map-discovery-summary p{color:#4e5969;font-size:13px;line-height:1.7}.map-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0}.map-kpis div{padding:8px;border-radius:4px;background:#fff}.map-kpis b,.map-kpis span{display:block}.map-kpis b{font-size:18px}.map-kpis span{color:#86909c;font-size:11px}.map-outline-action{color:#165dff;background:#fff}.map-section-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.map-section-label span{color:#86909c;font-size:12px}.map-person-list{border:1px solid #e5e6eb;border-radius:6px;overflow:hidden}.map-person-list article{display:grid;grid-template-columns:32px minmax(150px,1fr) auto auto;align-items:center;gap:10px;padding:11px;border-bottom:1px solid #e5e6eb}.map-person-list article:last-child{border:0}.map-avatar{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;color:#165dff;background:#e8f3ff;font-weight:600}.map-person-list b,.map-person-list small{display:block}.map-person-list small{margin-top:2px;color:#86909c;font-size:12px}.map-person-tag{padding:3px 7px;border-radius:3px;color:#4e5969;background:#f2f3f5;font-size:11px}.map-person-list button{border:0;color:#165dff;background:transparent;cursor:pointer}.map-handoff-footer{display:flex;align-items:center;gap:8px;margin-top:16px;padding:12px;border-radius:5px;color:#4e5969;background:#f7f8fa;font-size:13px}.map-handoff-footer i{color:#165dff}.map-handoff-footer button{margin-left:auto;height:30px}.map-subscription-intro{display:grid;grid-template-columns:1fr 1fr auto;align-items:center;gap:12px;margin:16px 0;padding:14px;border:1px solid #d8e7fc;border-radius:6px;background:#f7faff}.map-subscription-intro div{display:grid;grid-template-columns:22px 1fr;column-gap:7px}.map-subscription-intro i{grid-row:span 2;color:#165dff}.map-subscription-intro b{font-size:13px}.map-subscription-intro span{color:#86909c;font-size:12px}.map-subscription-intro button,.map-subscription-card button{height:30px;padding:0 9px;border:1px solid #bed5ff;border-radius:4px;color:#165dff;background:#fff;cursor:pointer}.map-subscription-card{display:grid;grid-template-columns:minmax(200px,1fr) auto auto;align-items:center;gap:12px;padding:12px;border-top:1px solid #e5e6eb}.map-subscription-card:first-child{border-top:0}.map-subscription-card b,.map-subscription-card small{display:block}.map-subscription-card small{margin-top:3px;color:#86909c;font-size:12px}.map-subscription-card>span{color:#fa8c16;font-size:12px}.map-subscription-modal{position:fixed;inset:0;z-index:99;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.38)}.map-subscription-modal.show{display:flex}.map-subscription-modal section{width:min(460px,calc(100vw - 32px));padding:20px;border-radius:8px;background:#fff}.map-subscription-modal h3{margin:0}.map-subscription-modal p{color:#86909c;font-size:13px}.map-subscription-modal label{display:grid;gap:6px;margin-top:12px;color:#4e5969;font-size:13px}.map-subscription-modal input,.map-subscription-modal select{height:34px;padding:0 9px;border:1px solid #e5e6eb;border-radius:4px}.map-modal-footer{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}.map-modal-footer>button:first-child{height:34px;padding:0 12px;border:1px solid #e5e6eb;border-radius:4px;background:#fff}.map-dedup-toast{position:fixed;right:24px;bottom:28px;z-index:100;display:none;padding:11px 14px;border-radius:5px;color:#fff;background:#1d2129}.map-dedup-toast.show{display:block}@media(max-width:900px){.map-discovery-grid{grid-template-columns:1fr}.map-subscription-intro{grid-template-columns:1fr}.map-workspace-head{flex-direction:column}.map-person-list article{grid-template-columns:32px 1fr auto}.map-person-tag{display:none}}'; document.head.appendChild(style);
  }
  function setup() {
    var search = document.getElementById('module-search'), subscription = document.getElementById('module-subscription'); if (!search || !subscription) return;
    installStyles();
    var cleanupStyle = document.createElement('style');
    cleanupStyle.textContent = '#module-distribution .map-redundant-filter{display:none!important}.main-content.map-non-analysis-view>.map-distribution-stats{display:none!important}.map-discovery-workspace,.map-subscription-workspace{width:100%;max-width:none;margin:0;padding:24px;box-sizing:border-box}.map-discovery-grid{grid-template-columns:minmax(300px,.7fr) minmax(0,1.3fr);gap:20px}.map-discovery-summary{padding:18px}.map-discovery-insights{display:grid;gap:12px;margin:16px 0;padding:0;list-style:none}.map-discovery-insights li{display:flex;gap:8px;color:#4e5969;font-size:13px;line-height:1.55}.map-discovery-insights i{margin-top:3px;color:#165dff}.map-discovery-insights b{color:#1d2129}.map-person-list article{padding:13px 12px}.map-handoff-footer{margin-top:18px;padding:13px 14px}.map-subscription-intro{padding:16px}.map-subscription-card{padding:14px 12px}';
    document.head.appendChild(cleanupStyle);
    search.classList.add('map-compact-search'); subscription.classList.add('map-compact-subscription');
    var context = document.querySelector('.map-analysis-context'), stats = distributionStats();
    var legacyFilter = document.querySelector('#module-distribution .filter-bar');
    var modes = document.querySelector('.map-analysis-modes');
    if (context && stats) { stats.classList.add('map-distribution-stats'); (modes || context).insertAdjacentElement('afterend', stats); }
    if (legacyFilter) legacyFilter.classList.add('map-redundant-filter');
    search.insertAdjacentHTML('afterbegin', discoveryMarkup()); subscription.insertAdjacentHTML('afterbegin', subscriptionMarkup());
    var nav = document.querySelector('.map-primary-nav'); if (nav) { var links = nav.querySelectorAll('.map-task-link'); if (links[1]) links[1].innerHTML = '<i class="fas fa-search"></i> 区域人才发现'; if (links[2]) links[2].innerHTML = '<i class="fas fa-bell"></i> 态势订阅'; }
    function refreshDiscovery() { var box = document.querySelector('[data-discovery-scope]'); if (box) box.innerHTML = scopeText().map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''); }
    refreshDiscovery();
    document.addEventListener('click', function (event) { var go = event.target.closest('[data-to-library]'); if (go) handoffLibrary(); var profile = event.target.closest('[data-profile]'); if (profile) window.__mapGoto('profile', profile.dataset.profile); var dynamic = event.target.closest('[data-dynamic],[data-view-dynamic]'); if (dynamic) window.__mapGoto('external'); var add = event.target.closest('[data-new-subscription]'); if (add) document.getElementById('mapSubscriptionModal').classList.add('show'); var close = event.target.closest('[data-close-sub]'); if (close || event.target.id === 'mapSubscriptionModal') document.getElementById('mapSubscriptionModal').classList.remove('show'); var save = event.target.closest('[data-save-sub]'); if (save) { var name = document.getElementById('mapSubName').value.trim(); if (!name) { message('请先填写订阅名称。'); return; } subscriptions.unshift({ name:name, scope:scopeText()[0] + ' · ' + scopeText()[1], freq:document.getElementById('mapSubFreq').value, count:0 }); document.querySelector('[data-subscription-cards]').innerHTML = subscriptionCards(); document.getElementById('mapSubscriptionModal').classList.remove('show'); message('已创建区域主题订阅，后续变化将推送至科技人才动态。'); } });
    document.querySelectorAll('#mapScope,#mapField,#mapTalentType,#mapPeriod').forEach(function (el) { el.addEventListener('change', refreshDiscovery); });
  }
  function distributionStats() { return document.querySelector('#module-distribution .stats-cards'); }
  window.__mapDedupSetup = setup;
})();


  /* ---- 原型 DOMContentLoaded 初始化（保持注册顺序） ---- */
  __domInit_1a();
  __domInit_1b();
  __domInit_1c();
  __domInit_2();
  __domInit_6();
  if (window.__mapOptSetup) window.__mapOptSetup();
  if (window.__mapDedupSetup) window.__mapDedupSetup();

  /* ---- currentExpertId 与内联 onclick 的实时桥接（gap-1 专家详情弹窗使用） ---- */
  try {
    Object.defineProperty(window, 'currentExpertId', {
      configurable: true,
      get() { return currentExpertId; },
      set(v) { currentExpertId = v; }
    });
  } catch (e) { /* 已定义时忽略 */ }
}

export function initTalentMap() {
  __mapIntervalIds.length = 0;
  buildEngine();
}

export function disposeTalentMap() {
  __mapIntervalIds.forEach(id => { try { clearInterval(id); } catch (e) { /* noop */ } });
  __mapIntervalIds.length = 0;
}
