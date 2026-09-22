(function () {
    'use strict';

    const STORAGE_KEY = 'gkx_research_workspace_v1';
    const page = decodeURIComponent((location.pathname.split('/').pop() || '').split('?')[0]);
    const params = new URLSearchParams(location.search);

    const defaultState = {
        context: {
            topic: '大规模语言模型推理优化与效率提升研究',
            technologyId: 'TECH-AI-001',
            problemId: 'BRQ-2026-001',
            problemTitle: '大规模语言模型推理优化与效率提升研究',
            deploymentId: '',
            resultId: ''
        },
        tasks: [
            {
                id: 'TASK-20260822-001', type: '技术趋势研判',
                title: '人工智能前沿技术发展与深圳布局研究', source: '技术趋势分析',
                status: '运行中', progress: 62, algorithm: '科技趋势分析模型', version: 'v2.3',
                dataRange: '论文、专利、项目｜截至2026-08-22', createdAt: '2026-08-22 10:26'
            },
            {
                id: 'TASK-BR-20260821-002', type: '基础研究部署分析',
                title: '量子材料基础研究问题部署分析', source: '基础研究组织实施分析',
                status: '运行中', progress: 78, algorithm: '科研资源能力评估模型', version: 'v1.6',
                dataRange: '问题、机构、人才、科研条件｜截至2026-08-21', createdAt: '2026-08-21 16:18'
            },
            {
                id: 'TASK-TAL-20260820-003', type: '人才与机构研判',
                title: '低空经济关键人才与机构研判', source: '科技人才智慧服务',
                status: '已完成', progress: 100, algorithm: '人才与科研机构分析模型', version: 'v2.0',
                dataRange: '人才画像、论文、项目、机构关系｜截至2026-08-20', createdAt: '2026-08-20 14:05'
            }
        ],
        evidence: [],
        talents: [],
        subscriptions: []
    };

    function clone(value) { return JSON.parse(JSON.stringify(value)); }
    function loadState() {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (!stored) return clone(defaultState);
            const storedTasks = Array.isArray(stored.tasks) ? stored.tasks : [];
            const mergedTasks = storedTasks.slice();
            defaultState.tasks.forEach(seed => {
                if (!mergedTasks.some(task => task.id === seed.id)) mergedTasks.push(clone(seed));
            });
            return {
                context: Object.assign({}, defaultState.context, stored.context || {}),
                tasks: mergedTasks,
                evidence: Array.isArray(stored.evidence) ? stored.evidence : [],
                talents: Array.isArray(stored.talents) ? stored.talents : [],
                subscriptions: Array.isArray(stored.subscriptions) ? stored.subscriptions : []
            };
        } catch (error) {
            return clone(defaultState);
        }
    }

    let state = loadState();
    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        window.dispatchEvent(new CustomEvent('gkx-flow-updated', { detail: clone(state) }));
        renderDrawer();
    }
    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[char]));
    }
    function nowText() {
        return new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
    }
    function makeId(prefix) {
        const date = new Date();
        const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('');
        return `${prefix}-${stamp}-${String(Date.now()).slice(-4)}`;
    }
    function currentTitle() {
        const raw = (document.querySelector('h1, .page-title, .header-title, title') || {}).textContent || document.title || page;
        return raw.replace(/\s+/g, ' ').trim().slice(0, 80);
    }

    function addStyles() {
        if (document.getElementById('gkx-priority-style')) return;
        const style = document.createElement('style');
        style.id = 'gkx-priority-style';
        style.textContent = `
            .gkx-journey{position:fixed;right:24px;top:76px;z-index:8800;width:min(720px,calc(100vw - 320px));background:#fff;border:1px solid #dbe7f5;border-radius:10px;box-shadow:0 8px 28px rgba(31,61,104,.13);padding:11px 14px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif}
            .gkx-journey-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.gkx-journey-title{font-size:13px;font-weight:700;color:#183b66;margin-right:auto}.gkx-step{font-size:12px;color:#667085;white-space:nowrap}.gkx-step.active{color:#1677ff;font-weight:700}.gkx-step.done{color:#16a065}.gkx-arrow{color:#b6c2d2;font-size:11px}
            .gkx-btn{border:1px solid #cdd9e8;background:#fff;color:#31506f;border-radius:6px;padding:7px 11px;font-size:12px;cursor:pointer}.gkx-btn:hover{border-color:#1677ff;color:#1677ff}.gkx-btn.primary{border-color:#1677ff;background:#1677ff;color:#fff}.gkx-btn.success{border-color:#16a065;background:#16a065;color:#fff}
            .gkx-fab{position:fixed;right:24px;bottom:24px;z-index:9001;border:0;border-radius:24px;padding:12px 17px;background:linear-gradient(135deg,#185adb,#1677ff);color:#fff;box-shadow:0 8px 24px rgba(22,119,255,.32);font-weight:700;cursor:pointer}.gkx-fab-count{display:inline-flex;min-width:19px;height:19px;border-radius:10px;background:#fff;color:#1677ff;align-items:center;justify-content:center;margin-left:7px;font-size:11px}
            .gkx-quick{position:fixed;right:24px;bottom:78px;z-index:9000;display:flex;gap:8px;flex-direction:column;align-items:flex-end}.gkx-quick .gkx-btn{background:#fff;box-shadow:0 4px 16px rgba(31,61,104,.14)}
            .gkx-mask{position:fixed;inset:0;background:rgba(14,30,50,.32);z-index:9100;display:none}.gkx-mask.open{display:block}.gkx-drawer{position:absolute;right:0;top:0;height:100%;width:min(460px,92vw);background:#f6f8fb;box-shadow:-12px 0 30px rgba(19,40,67,.18);overflow:auto}.gkx-drawer-head{position:sticky;top:0;background:#fff;padding:20px;border-bottom:1px solid #e5eaf1;display:flex;justify-content:space-between;align-items:center;z-index:2}.gkx-drawer-body{padding:16px}.gkx-card{background:#fff;border:1px solid #e4eaf2;border-radius:10px;padding:14px;margin-bottom:12px}.gkx-card h4{font-size:13px;margin:0 0 9px;color:#253b53}.gkx-context-title{font-size:15px;font-weight:700;color:#17395f;line-height:1.5}.gkx-meta{font-size:12px;color:#78889b;margin-top:5px}.gkx-chip{display:inline-block;padding:3px 8px;border-radius:10px;background:#edf5ff;color:#1677ff;font-size:11px;margin:3px 4px 3px 0}.gkx-empty{color:#98a2b3;font-size:12px;padding:6px 0}.gkx-list-item{padding:9px 0;border-bottom:1px solid #edf0f4}.gkx-list-item:last-child{border-bottom:0}.gkx-close{border:0;background:transparent;font-size:22px;color:#667085;cursor:pointer}
            .gkx-modal-mask{position:fixed;inset:0;background:rgba(14,30,50,.38);z-index:9300;display:flex;align-items:center;justify-content:center}.gkx-modal{width:min(520px,90vw);background:#fff;border-radius:12px;box-shadow:0 20px 60px rgba(13,33,56,.25);overflow:hidden}.gkx-modal-head{padding:17px 20px;border-bottom:1px solid #e7ebf0;font-weight:700;color:#203a56}.gkx-modal-body{padding:20px}.gkx-field{margin-bottom:14px}.gkx-field label{display:block;font-size:12px;color:#526579;margin-bottom:6px}.gkx-field input,.gkx-field textarea,.gkx-field select{box-sizing:border-box;width:100%;border:1px solid #ccd7e4;border-radius:7px;padding:9px 10px;font:inherit}.gkx-modal-foot{padding:14px 20px;border-top:1px solid #e7ebf0;display:flex;justify-content:flex-end;gap:9px}
            .gkx-toast{position:fixed;left:50%;top:24px;z-index:9500;transform:translateX(-50%);background:#17395f;color:#fff;border-radius:7px;padding:10px 16px;box-shadow:0 7px 24px rgba(15,35,60,.22);font-size:13px}
            .gkx-research-shell{margin:0 0 18px;padding:0 0 14px;border-bottom:1px solid #e5eaf1}.gkx-research-title{font-size:20px;line-height:1.4;color:#1d3958;font-weight:700;margin:0 0 14px}.gkx-research-tabs{display:flex;gap:4px;border-bottom:1px solid #dfe7f0;overflow-x:auto}.gkx-research-tab{display:inline-flex;align-items:center;min-height:36px;padding:0 14px;color:#66788a;text-decoration:none;font-size:14px;white-space:nowrap;border-bottom:2px solid transparent}.gkx-research-tab:hover{color:#1677ff}.gkx-research-tab.active{color:#1677ff;font-weight:700;border-bottom-color:#1677ff}
            body.gkx-research-has-local-nav .gkx-research-shell{position:fixed;top:48px;left:220px;right:0;z-index:94;height:94px;margin:0;padding:10px 20px 0;background:#fff;border-bottom:1px solid #e5eaf1}body.gkx-research-has-local-nav .gkx-research-title{font-size:18px;margin-bottom:7px}body.gkx-research-has-local-nav .top-navbar{top:142px;z-index:90}body.gkx-research-has-local-nav .main-content{padding-top:198px}
            .gkx-path-nav{position:fixed;top:0;left:220px;right:0;z-index:95;display:flex;align-items:center;gap:8px;height:48px;padding:0 20px;border-bottom:1px solid #e8e8e8;color:#333;background:#fff;font-size:14px;font-weight:500}.gkx-path-nav i{color:#999;font-size:12px}body.gkx-path-visible .main-content{padding-top:68px!important}body.gkx-path-visible .content-wrapper{padding-top:68px!important}
            @media(max-width:900px){.gkx-journey{left:12px;right:12px;top:64px;width:auto}.gkx-quick,.gkx-fab{right:14px}}
        `;
        document.head.appendChild(style);
    }

    function toast(message) {
        const old = document.querySelector('.gkx-toast');
        if (old) old.remove();
        const node = document.createElement('div');
        node.className = 'gkx-toast';
        node.textContent = message;
        document.body.appendChild(node);
        setTimeout(() => node.remove(), 2400);
    }

    function addEvidence(title, type, sourcePage) {
        const item = {
            id: makeId('EV'), title: title || currentTitle(), type: type || '页面证据',
            source: sourcePage || page, addedAt: nowText(), contextId: state.context.problemId || state.context.technologyId
        };
        if (!state.evidence.some(entry => entry.title === item.title && entry.source === item.source)) {
            state.evidence.unshift(item);
            saveState();
        }
        toast('已加入研究证据篮');
        return item;
    }

    function addTalent(name) {
        const talent = { id: makeId('TAL'), name: name || '当前候选人才', source: page, addedAt: nowText() };
        if (!state.talents.some(item => item.name === talent.name)) state.talents.unshift(talent);
        saveState();
        toast('已加入本次研究人才集合');
    }

    function subscribe(title, type) {
        const subscription = { id: makeId('SUB'), title: title || state.context.topic, type: type || '动态监测', status: '生效中', createdAt: nowText() };
        if (!state.subscriptions.some(item => item.title === subscription.title && item.type === subscription.type)) state.subscriptions.unshift(subscription);
        saveState();
        toast('订阅已创建，将在工作台统一提醒');
    }

    function createTask(type, title, source) {
        const task = {
            id: makeId('TASK'), type: type || '综合分析', title: title || currentTitle(), source: source || page,
            status: '排队中', progress: 10, algorithm: algorithmFor(type), version: 'v1.0',
            dataRange: `当前研究上下文｜截至${new Date().toLocaleDateString('zh-CN')}`,
            createdAt: nowText(), context: clone(state.context), evidenceIds: state.evidence.map(item => item.id)
        };
        state.tasks.unshift(task);
        saveState();
        toast(`任务已创建：${task.id}`);
        return task;
    }

    function algorithmFor(type) {
        const value = String(type || '');
        if (value.includes('专利')) return '专利分析与实体归并模型';
        if (value.includes('趋势')) return '科技趋势检测模型';
        if (value.includes('竞争')) return '竞争格局分析模型';
        if (value.includes('能力')) return '科研资源能力评估模型';
        if (value.includes('路线')) return '技术路线生成模型';
        return '综合情报分析模型';
    }

    function openForm(config) {
        const mask = document.createElement('div');
        mask.className = 'gkx-modal-mask';
        const fields = (config.fields || []).map(field => `
            <div class="gkx-field"><label>${escapeHtml(field.label)}</label>
            ${field.type === 'textarea'
                ? `<textarea name="${escapeHtml(field.name)}" rows="3" placeholder="${escapeHtml(field.placeholder || '')}">${escapeHtml(field.value || '')}</textarea>`
                : `<input name="${escapeHtml(field.name)}" value="${escapeHtml(field.value || '')}" placeholder="${escapeHtml(field.placeholder || '')}">`}
            </div>`).join('');
        mask.innerHTML = `<div class="gkx-modal"><div class="gkx-modal-head">${escapeHtml(config.title)}</div><div class="gkx-modal-body">${fields}</div><div class="gkx-modal-foot"><button class="gkx-btn" data-close>取消</button><button class="gkx-btn primary" data-confirm>${escapeHtml(config.confirmText || '确认')}</button></div></div>`;
        document.body.appendChild(mask);
        mask.querySelector('[data-close]').onclick = () => mask.remove();
        mask.addEventListener('click', event => { if (event.target === mask) mask.remove(); });
        mask.querySelector('[data-confirm]').onclick = () => {
            const values = {};
            mask.querySelectorAll('[name]').forEach(input => { values[input.name] = input.value.trim(); });
            if (config.required && config.required.some(name => !values[name])) { toast('请填写必填信息'); return; }
            config.onConfirm(values);
            mask.remove();
        };
    }

    function downloadCsv(filename, rows) {
        const content = '\ufeff' + rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
        const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url; link.download = filename; link.click();
        URL.revokeObjectURL(url);
        toast('清单已导出，并记录导出时间');
    }

    function renderDrawer() {
        const body = document.querySelector('.gkx-drawer-body');
        const count = document.querySelector('.gkx-fab-count');
        if (count) count.textContent = state.evidence.length + state.talents.length;
        if (!body) return;
        const taskRows = state.tasks.slice(0, 4).map(task => `<div class="gkx-list-item"><div style="font-size:13px;font-weight:600;color:#334d68">${escapeHtml(task.title)}</div><div class="gkx-meta">${escapeHtml(task.id)} · ${escapeHtml(task.status)} · ${escapeHtml(task.algorithm || '')} ${escapeHtml(task.version || '')}</div></div>`).join('');
        body.innerHTML = `
            <div class="gkx-card"><h4>当前研究上下文</h4><div class="gkx-context-title">${escapeHtml(state.context.problemTitle || state.context.topic)}</div><div class="gkx-meta">问题ID：${escapeHtml(state.context.problemId || '待建立')}<br>部署ID：${escapeHtml(state.context.deploymentId || '尚未纳入部署')}<br>成果ID：${escapeHtml(state.context.resultId || '尚未形成成果')}</div></div>
            <div class="gkx-card"><h4>研究资产</h4><span class="gkx-chip">证据 ${state.evidence.length}</span><span class="gkx-chip">人才 ${state.talents.length}</span><span class="gkx-chip">订阅 ${state.subscriptions.length}</span><div class="gkx-meta">跨模块保留选择结果，进入下一步无需重复检索。</div></div>
            <div class="gkx-card"><h4>最近任务</h4>${taskRows || '<div class="gkx-empty">暂无任务</div>'}<div style="margin-top:10px"><button class="gkx-btn primary" onclick="location.href='0.2研究任务中心.html'">进入任务中心</button></div></div>
            <div class="gkx-card"><h4>基础研究闭环</h4><div class="gkx-meta">问题识别 → 部署清单 → 组织实施 → 成果评估 → 反馈调整</div></div>`;
    }

    function renderWorkspace() {
        if (document.querySelector('.gkx-fab')) return;
        const fab = document.createElement('button');
        fab.className = 'gkx-fab';
        fab.innerHTML = '研究工作区 <span class="gkx-fab-count">0</span>';
        const mask = document.createElement('div');
        mask.className = 'gkx-mask';
        mask.innerHTML = '<aside class="gkx-drawer"><div class="gkx-drawer-head"><strong>研究工作区</strong><button class="gkx-close" aria-label="关闭">×</button></div><div class="gkx-drawer-body"></div></aside>';
        fab.onclick = () => mask.classList.add('open');
        mask.querySelector('.gkx-close').onclick = () => mask.classList.remove('open');
        mask.addEventListener('click', event => { if (event.target === mask) mask.classList.remove('open'); });
        document.body.append(fab, mask);
        renderDrawer();
    }

    /** 研究需求分析：以左侧三级菜单作为唯一切换入口，并补全当前页面路径。 */
    function renderResearchRequirementShell() {
        const tabs = [
            { page: '1.1.1科技实体清单.html', label: '科技实体清单' },
            { page: '1.1.2颠覆性与前沿技术分析.html', label: '颠覆性与前沿技术分析' },
            { page: '1.1.3媒体聚焦.html', label: '媒体聚焦' }
        ];
        if (!tabs.some(tab => tab.page === page)) return;

        const currentTab = tabs.find(tab => tab.page === page);
        if (!currentTab) return;
        const pathHtml = '<span>技术研判服务</span><i class="fas fa-chevron-right"></i><span>研究需求分析</span><i class="fas fa-chevron-right"></i><span>' + currentTab.label + '</span>';
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = pathHtml;
            document.querySelectorAll('.gkx-path-nav').forEach(nav => nav.remove());
            document.body.classList.remove('gkx-path-visible');
        } else {
            let pathNav = document.querySelector('.gkx-path-nav');
            if (!pathNav) {
                pathNav = document.createElement('div');
                pathNav.className = 'gkx-path-nav';
                document.body.appendChild(pathNav);
            }
            pathNav.innerHTML = pathHtml;
            document.body.classList.add('gkx-path-visible');
        }
        // 取消页内三级模块 Tab，避免与左侧三级菜单形成重复入口。
        document.querySelectorAll('.gkx-research-shell').forEach(shell => shell.remove());
        document.body.classList.remove('gkx-research-has-local-nav');
    }

    function renderQuickActions() {
        if (page === '0.2研究任务中心.html' || document.querySelector('.gkx-quick')) return;
        const quick = document.createElement('div');
        quick.className = 'gkx-quick';
        if (/^1\./.test(page)) {
            quick.innerHTML = '<button class="gkx-btn" data-evidence>＋ 加入研究证据</button><button class="gkx-btn primary" data-task>创建分析任务</button>';
            quick.querySelector('[data-evidence]').onclick = () => addEvidence(currentTitle(), '战略分析');
            quick.querySelector('[data-task]').onclick = () => createTask('综合分析', `${state.context.topic}—${currentTitle()}`, currentTitle());
        } else if (/^2\./.test(page) || page === '学科专题.html') {
            quick.innerHTML = '<button class="gkx-btn" data-talent>＋ 加入人才集合</button><button class="gkx-btn primary" data-subscribe>订阅人才动态</button>';
            quick.querySelector('[data-talent]').onclick = () => addTalent(currentTitle());
            quick.querySelector('[data-subscribe]').onclick = () => subscribe(currentTitle(), '人才动态');
        } else if (/^3\./.test(page)) {
            quick.innerHTML = '<button class="gkx-btn" data-evidence>＋ 加入研究证据</button>';
            quick.querySelector('[data-evidence]').onclick = () => addEvidence(currentTitle(), '基础研究');
        }
        if (quick.children.length) document.body.appendChild(quick);
    }

    function journeyStep() {
        if (page.startsWith('3.1.') || page === '3.2.1.1研究问题详情.html') return 1;
        if (page.startsWith('3.2.')) return 2;
        if (page.startsWith('3.3.')) return 3;
        if (page.startsWith('3.4.')) return 4;
        return 0;
    }

    function syncContextFromUrl() {
        ['problemId', 'deploymentId', 'resultId', 'technologyId'].forEach(key => {
            if (params.get(key)) state.context[key] = params.get(key);
        });
        if (params.get('problemTitle')) state.context.problemTitle = params.get('problemTitle');
        saveState();
    }

    function renderJourney() {
        const active = journeyStep();
        if (!active || document.querySelector('.gkx-journey')) return;
        const node = document.createElement('div');
        node.className = 'gkx-journey';
        const steps = ['问题识别', '部署清单', '组织实施', '成果评估'];
        let action = '';
        if (active === 1) action = '<button class="gkx-btn primary" data-next>纳入部署清单</button>';
        if (active === 2) action = '<button class="gkx-btn primary" data-next>开展组织实施分析</button>';
        if (active === 3) action = '<button class="gkx-btn primary" data-next>提交成果评估</button>';
        if (active === 4) action = '<button class="gkx-btn success" data-next>反馈并调整部署</button>';
        node.innerHTML = `<div class="gkx-journey-row"><div class="gkx-journey-title">基础研究决策闭环</div>${steps.map((step, index) => `<span class="gkx-step ${index + 1 < active ? 'done' : index + 1 === active ? 'active' : ''}">${index + 1}. ${step}</span>${index < 3 ? '<span class="gkx-arrow">›</span>' : ''}`).join('')} ${action}</div>`;
        const next = node.querySelector('[data-next]');
        if (next) next.onclick = () => moveToNext(active);
        document.body.appendChild(node);
    }

    function moveToNext(active) {
        if (active === 1) {
            if (!state.context.problemId) state.context.problemId = makeId('BRQ');
            state.context.problemTitle = state.context.problemTitle || currentTitle();
            if (!state.context.deploymentId) state.context.deploymentId = makeId('DEP');
            saveState();
            location.href = `3.2.1基础研究部署清单.html?problemId=${encodeURIComponent(state.context.problemId)}&problemTitle=${encodeURIComponent(state.context.problemTitle)}&deploymentId=${encodeURIComponent(state.context.deploymentId)}`;
        } else if (active === 2) {
            if (!state.context.deploymentId) state.context.deploymentId = makeId('DEP');
            saveState();
            location.href = `3.3.1基础研究组织实施分析.html?problemId=${encodeURIComponent(state.context.problemId)}&deploymentId=${encodeURIComponent(state.context.deploymentId)}`;
        } else if (active === 3) {
            state.context.resultId = state.context.resultId || makeId('RES');
            saveState();
            location.href = `3.4.1基础研究成果评估.html?problemId=${encodeURIComponent(state.context.problemId)}&deploymentId=${encodeURIComponent(state.context.deploymentId)}&resultId=${encodeURIComponent(state.context.resultId)}`;
        } else {
            toast('评估结论已反馈，问题与部署状态已更新为“待调整”');
            setTimeout(() => { location.href = `3.1.1基础研究问题清单.html?problemId=${encodeURIComponent(state.context.problemId)}&feedback=${encodeURIComponent(state.context.resultId)}`; }, 700);
        }
    }

    function installPageOverrides() {
        if (page === '3.1.1基础研究问题清单.html') {
            window.addProblem = () => openForm({
                title: '新增基础研究问题', confirmText: '保存并查看详情', required: ['title'],
                fields: [{ name: 'title', label: '问题名称 *', value: state.context.problemTitle }, { name: 'source', label: '识别来源', value: '论文、专利、项目与专家研判' }, { name: 'description', label: '问题说明', type: 'textarea', placeholder: '填写问题边界与判断依据' }],
                onConfirm: values => {
                    state.context.problemId = makeId('BRQ'); state.context.problemTitle = values.title; saveState();
                    addEvidence(values.source, '问题识别来源', page);
                    location.href = `3.2.1.1研究问题详情.html?problemId=${encodeURIComponent(state.context.problemId)}&problemTitle=${encodeURIComponent(values.title)}`;
                }
            });
            window.viewProblemDetail = id => { location.href = `3.2.1.1研究问题详情.html?problemId=${encodeURIComponent(id || state.context.problemId)}`; };
            window.editProblem = id => openForm({ title: `编辑研究问题 ${id || ''}`, confirmText: '保存', required: ['title'], fields: [{ name: 'title', label: '问题名称 *', value: state.context.problemTitle }, { name: 'basis', label: '调整依据', type: 'textarea' }], onConfirm: values => { state.context.problemTitle = values.title; saveState(); toast('问题信息已更新并记录变更'); } });
            window.exportList = () => downloadCsv('基础研究问题清单.csv', [['问题ID','问题名称','领域','状态'], [state.context.problemId,state.context.problemTitle,'人工智能','重点关注'], ['BRQ-2026-002','量子计算纠错码容错阈值突破','量子信息','持续跟踪']]);
            window.generateTrendReport = () => createTask('趋势报告', `${state.context.problemTitle}—趋势分析报告`, '基础研究问题趋势');
            window.generateCompetitionReport = () => createTask('竞争格局报告', `${state.context.problemTitle}—国内外竞争格局`, '基础研究竞争格局');
        }

        if (page === '3.2.1基础研究部署清单.html') {
            window.addDeployment = () => openForm({
                title: '新增基础研究部署', confirmText: '保存部署', required: ['name'],
                fields: [{ name: 'name', label: '部署名称 *', value: state.context.problemTitle }, { name: 'goal', label: '部署目标', type: 'textarea', value: '形成关键技术突破与高水平科研成果' }, { name: 'owner', label: '建议牵头单位', value: '深圳市重点科研机构' }],
                onConfirm: values => { state.context.deploymentId = state.context.deploymentId || makeId('DEP'); state.context.problemTitle = values.name; saveState(); toast(`部署已保存：${state.context.deploymentId}`); renderJourney(); }
            });
            window.viewDeploymentDetail = id => { state.context.deploymentId = id || state.context.deploymentId || makeId('DEP'); saveState(); openForm({ title: `部署详情 ${state.context.deploymentId}`, confirmText: '开展组织实施分析', fields: [{ name: 'problem', label: '来源问题', value: state.context.problemTitle }, { name: 'target', label: '部署目标', value: '突破大模型高效推理关键技术' }, { name: 'owner', label: '牵头单位', value: '深圳市重点科研机构' }], onConfirm: () => moveToNext(2) }); };
            window.editDeployment = window.addDeployment;
            window.exportDeployment = window.exportDeploymentList = () => downloadCsv('基础研究部署清单.csv', [['部署ID','来源问题ID','部署名称','状态'], [state.context.deploymentId || 'DEP-2026-001',state.context.problemId,state.context.problemTitle,'论证中']]);
            window.generateAssessment = window.generateCapabilityReport = () => createTask('能力评估报告', `${state.context.problemTitle}—科研资源能力评估`, '基础研究部署清单');
            window.generateDistributionReport = () => createTask('资源分布报告', `${state.context.problemTitle}—科研资源分布`, '基础研究部署清单');
        }

        if (page === '1.4.2技术发展路线.html') {
            window.createRoadmap = () => {
                const input = document.getElementById('newRoadmapName');
                const title = input && input.value.trim();
                if (!title) { toast('请输入路线图名称'); return; }
                const task = createTask('技术路线图生成', title, '领域技术路线');
                addEvidence(`${state.context.topic}趋势分析结果`, '路线图输入', page);
                if (typeof window.closeCreateRoadmapModal === 'function') window.closeCreateRoadmapModal();
                toast(`路线图已创建并进入任务中心：${task.id}`);
            };
        }
    }

    function init() {
        addStyles();
        syncContextFromUrl();
        renderWorkspace();
        renderResearchRequirementShell();
        // 部分页的内容容器由页面脚本在加载阶段重排，再次检查以保证路径稳定显示。
        window.setTimeout(renderResearchRequirementShell, 180);
        renderQuickActions();
        renderJourney();
        installPageOverrides();
    }

    window.GKXFlow = {
        getState: () => clone(state),
        saveState: next => { state = next; saveState(); },
        addEvidence, addTalent, subscribe, createTask, moveToNext, toast,
        reset: () => { state = clone(defaultState); saveState(); }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    window.addEventListener('load', () => window.setTimeout(renderResearchRequirementShell, 60));
})();
