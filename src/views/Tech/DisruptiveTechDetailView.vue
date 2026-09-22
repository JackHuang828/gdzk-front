<script setup>
// 技术详情（1.1.2.1）：技术研判服务 → 研究需求分析 → 颠覆性与前沿技术分析 → 技术详情。
// 1:1 还原 HTML 原型 1.1.2.1技术详情页.html：头部信息 + 技术原理 + 发展路径 + 全球竞争格局
// + 产业链结构图（可交互）+ 最新研究成果 + 代表性论文 + 核心指标。
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// ==================== 技术详情数据 ====================
// icon/impact/growth/heat/maturity/principle 与原型 techDetails 对齐；
// 其余技术（清单页每个卡片均可点入）使用同构数据，数值与清单页 techData/frontierTechData 对齐。
const TECH_DETAILS = {
  '大语言模型': {
    icon: 'fa-comments', category: '人工智能',
    impact: 98, growth: '156%', heat: 99, maturity: '快速发展期',
    stats: { patents: '8,920', papers: '15,680', projects: '456', entities: '89' },
    apps: ['智能问答', '内容创作', '代码辅助'],
    principle: [
      '大语言模型是一类基于海量文本与代码数据训练的人工智能模型，通常采用 Transformer 等深度学习架构，通过预测下一个词学习语言规律、知识结构和任务模式。',
      '大语言模型能够理解和生成自然语言，并在问答、摘要、翻译、代码辅助、知识检索等任务中提供通用能力。通过指令微调、检索增强和工具调用，模型可以进一步适配专业场景。',
      '当前大语言模型正从单一文本生成向多模态理解、长上下文处理和智能体协作发展，重点关注准确性、可解释性、安全合规与部署成本等问题。'
    ],
    path: [
      { year: '2017年', text: 'Transformer 架构提出，为大规模语言预训练和高效并行计算奠定基础' },
      { year: '2018年', text: '预训练语言模型快速发展，通用语言表示开始迁移到问答、分类等下游任务' },
      { year: '2020年', text: '超大规模语言模型展示少样本学习能力，通用生成式人工智能进入公众视野' },
      { year: '2022年', text: '对话式大语言模型产品普及，人工智能开始深入知识工作和内容生产场景' },
      { year: '2023—2024年', text: '长上下文、多模态、检索增强和智能体能力持续演进，大模型应用平台逐步成熟' }
    ],
    achievements: [
      { title: '长上下文大语言模型的高效推理方法', dir: '推理优化', date: '2024-06' },
      { title: '检索增强生成的大模型知识更新框架', dir: '知识增强', date: '2024-04' },
      { title: '面向政务场景的大模型安全评测方法', dir: '安全合规', date: '2024-02' }
    ],
    papers: [
      { title: 'Attention Is All You Need', meta: 'NeurIPS | 2017-06 | 代表性论文 | Transformer 架构' },
      { title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', meta: 'NAACL | 2019-06 | 代表性论文 | 预训练语言模型' },
      { title: 'Language Models are Few-Shot Learners', meta: 'NeurIPS | 2020-11 | 代表性论文 | 少样本学习' }
    ]
  },
  '量子计算': {
    icon: 'fa-atom', category: '量子技术', comp: 'quantum',
    impact: 96, growth: '68%', heat: 95, maturity: '成长期',
    stats: { patents: '4,520', papers: '2,340', projects: '156', entities: '28' },
    apps: ['金融建模', '药物研发', '密码分析'],
    principle: [
      '量子计算是一种遵循量子力学规律调控量子信息单元进行计算的新型计算模式。与传统计算机使用比特（0或1）不同，量子计算机使用量子比特（qubit），可以同时处于0和1的叠加状态。',
      '量子计算的核心优势在于利用量子叠加和量子纠缠等特性，实现对特定问题（如因数分解、数据库搜索、量子模拟等）的指数级加速。这使得量子计算机在密码学、药物研发、材料科学、人工智能等领域具有巨大的应用潜力。',
      '目前，量子计算的主要实现技术路线包括超导量子比特、离子阱、光量子、硅基量子点等，各技术路线各有优劣，正处于快速发展阶段。'
    ],
    path: [
      { year: '20世纪80年代', text: '费曼等科学家提出量子计算概念，设想利用量子系统本身完成计算' },
      { year: '1994年', text: 'Shor 算法提出，证明量子计算可对大整数因数分解实现指数级加速' },
      { year: '2016年', text: '超导量子计算路线快速发展，通用量子处理器比特规模持续提升' },
      { year: '2019年', text: '谷歌宣布实现"量子优越性"，量子计算原型机在特定任务上超越经典超算' },
      { year: '2023—2024年', text: '千比特级处理器、量子纠错与容错计算取得重要进展' }
    ]
  },
  '基因编辑': {
    icon: 'fa-dna', category: '生物技术', comp: 'bio',
    impact: 94, growth: '52%', heat: 88, maturity: '成长期',
    stats: { patents: '2,890', papers: '3,450', projects: '124', entities: '35' },
    apps: ['遗传病治疗', '农业育种', '药物研发'],
    principle: [
      '基因编辑技术是指能够对生物体基因组特定目标基因进行精确修饰的技术。CRISPR-Cas9系统是目前最广泛使用的基因编辑工具，它利用向导RNA引导Cas9蛋白识别并切割特定的DNA序列。',
      '基因编辑技术的核心优势在于其高效、精准、低成本的特点，使得科学家能够以前所未有的精度对基因进行添加、删除或修改。这为治疗遗传疾病、改良农作物、开发新药等提供了强大的工具。',
      '目前，基因编辑技术已在基础研究、临床治疗、农业育种等领域展现出巨大的应用前景，但同时也面临着伦理、安全等方面的挑战。'
    ],
    path: [
      { year: '2012年', text: 'CRISPR-Cas9 基因编辑系统被证明可在体外高效定点切割 DNA' },
      { year: '2015年', text: '人类胚胎基因编辑研究引发全球伦理讨论，监管框架逐步建立' },
      { year: '2020年', text: 'CRISPR 基因编辑技术获诺贝尔化学奖' },
      { year: '2023年', text: '首款 CRISPR 基因编辑疗法获批上市，用于治疗镰刀型细胞贫血病' }
    ]
  },
  '脑机接口': {
    icon: 'fa-brain', category: '人工智能', comp: 'bio',
    impact: 91, growth: '45%', heat: 82, maturity: '萌芽期',
    stats: { patents: '1,560', papers: '890', projects: '45', entities: '18' },
    apps: ['神经修复', '智能假肢', '人机交互'],
    principle: [
      '脑机接口（Brain-Computer Interface, BCI）是一种不依赖于外周神经和肌肉，直接实现大脑与外部设备之间信息交互的技术。它通过采集大脑神经信号，经过信号处理和模式识别，将其转换为控制指令。',
      '脑机接口技术的核心在于如何高精度、高带宽地采集神经信号，并准确解码大脑的意图。目前主要的技术路线包括侵入式（如微电极阵列）和非侵入式（如脑电图EEG）两种。',
      '脑机接口技术在医疗康复（帮助瘫痪患者控制假肢）、人机交互、增强现实等领域具有广阔的应用前景，是连接人类智能与人工智能的重要桥梁。'
    ],
    path: [
      { year: '1924年', text: '人类首次记录脑电信号，为非侵入式脑机接口奠定基础' },
      { year: '2006年', text: 'BrainGate 项目帮助瘫痪患者通过意念控制电脑光标' },
      { year: '2017年', text: '高带宽侵入式接口在动物实验中实现复杂运动解码' },
      { year: '2024年', text: '首例人体植入设备实现意念控制光标与设备交互，临床试验持续推进' }
    ]
  },
  '生成式AI': {
    icon: 'fa-robot', category: '人工智能', comp: 'ai',
    impact: 98, growth: '156%', heat: 99, maturity: '快速发展期',
    stats: { patents: '8,920', papers: '15,680', projects: '456', entities: '89' },
    apps: ['内容创作', '代码开发', '图像生成'],
    principle: [
      '生成式人工智能（Generative AI）是指能够基于已有数据生成新的文本、图像、音频、视频等内容的人工智能技术。核心技术包括大型语言模型（LLM）、扩散模型（Diffusion Model）、生成对抗网络（GAN）等。',
      '生成式AI的核心能力在于理解和生成自然语言、代码、图像等多种形式的内容。通过海量数据的预训练，模型能够学习到丰富的知识和模式，从而生成高质量、富有创意的输出。',
      '当前，生成式AI已在内容创作、代码开发、知识问答、图像生成等领域展现出强大的能力，正在深刻改变内容生产方式和知识工作模式。'
    ],
    path: [
      { year: '2014年', text: '生成对抗网络（GAN）提出，开启深度生成模型快速发展阶段' },
      { year: '2020年', text: '大规模预训练模型与扩散模型相继出现，文本、图像生成质量显著提升' },
      { year: '2022年', text: '对话式大模型与文生图产品普及，生成式AI进入大众应用' },
      { year: '2023—2024年', text: '多模态生成、视频生成与AI智能体加速落地' }
    ]
  },
  '固态电池': {
    icon: 'fa-battery-full', category: '新能源', comp: 'energy',
    impact: 92, growth: '78%', heat: 85, maturity: '成长期',
    stats: { patents: '3,450', papers: '2,180', projects: '198', entities: '42' },
    apps: ['电动汽车', '储能系统', '消费电子'],
    principle: [
      '固态电池是一种使用固体电解质替代传统锂离子电池中液态电解质的电池技术。固体电解质通常采用陶瓷、硫化物或聚合物材料，能够有效解决液态电解质的安全隐患。',
      '固态电池的核心优势在于更高的能量密度、更长的循环寿命和更好的安全性。由于使用固体电解质，可以有效防止锂枝晶生长和电解液泄漏，大幅降低电池起火爆炸的风险。',
      '固态电池被认为是下一代动力电池的重要方向，在新能源汽车、可穿戴设备、航空航天等领域具有广阔的应用前景。目前仍面临电解质离子电导率、界面稳定性等技术挑战。'
    ],
    path: [
      { year: '2011年', text: '硫化物固态电解质的高离子电导率被验证，成为主流技术路线之一' },
      { year: '2017年', text: '主要车企与电池企业发布固态电池路线图，产业化预期升温' },
      { year: '2024年', text: '半固态电池实现量产装车，全固态工程化样品陆续发布' },
      { year: '未来展望', text: '围绕界面稳定、规模制备与成本下降持续攻关，目标实现全固态大规模装车' }
    ]
  },
  '新材料': {
    icon: 'fa-cubes', category: '材料科学', comp: 'material',
    impact: 89, growth: '42%', heat: 76, maturity: '多阶段并行',
    stats: { patents: '12,850', papers: '8,920', projects: '324', entities: '156' },
    apps: ['航空航天', '电子信息', '生物医药'],
    principle: [
      '新材料是指新出现的或正在发展中的具有传统材料所不具备的优异性能或特殊功能的材料。新材料的研究范围涵盖高性能合金、先进陶瓷、碳纳米材料、生物医用材料等众多领域。',
      '新材料的核心价值在于其独特的物理、化学或机械特性，能够满足尖端技术发展的需求。如石墨烯具有超高强度和导电性，碳化硅具有优异的半导体性能，生物材料能够与人体组织良好相容。',
      '新材料是支撑战略性新兴产业发展的基础，在航空航天、电子信息、生物医药、新能源等领域发挥着关键作用。新材料的研发周期长、投入大，但一旦突破将带来巨大的经济社会效益。'
    ],
    path: [
      { year: '2004年', text: '石墨烯被成功分离，二维材料研究进入快速发展期' },
      { year: '2010年', text: '新材料产业被列为战略性新兴产业，研发投入持续加大' },
      { year: '2020年', text: '第三代半导体碳化硅、氮化镓器件进入规模化应用' },
      { year: '2024年', text: '智能材料、超材料与生物医用材料在高端装备和医疗领域加速落地' }
    ]
  },
  '生物技术': {
    icon: 'fa-dna', category: '生物技术', comp: 'bio',
    impact: 94, growth: '58%', heat: 87, maturity: '成熟期',
    stats: { patents: '25,600', papers: '18,340', projects: '512', entities: '234' },
    apps: ['医药健康', '现代农业', '生物制造'],
    principle: [
      '生物技术是利用生物系统、生物体或其衍生物来开发或制造产品的技术体系。涵盖基因工程、细胞工程、酶工程、发酵工程等多个分支领域。',
      '生物技术的核心在于对生命信息的读取、理解和运用。通过基因测序、基因编辑、蛋白质工程等技术手段，科学家能够精准地改造生物体或开发新型生物制品。',
      '生物技术已广泛应用于医药健康（疫苗、抗体药物、基因治疗）、农业（转基因作物、分子育种）、环境保护（生物降解、生物修复）、工业制造（生物制造、绿色化工）等领域，是21世纪最具发展潜力的战略性新兴产业之一。'
    ],
    path: [
      { year: '1953年', text: 'DNA 双螺旋结构发现，现代分子生物学诞生' },
      { year: '1973年', text: '重组 DNA 技术建立，基因工程时代开启' },
      { year: '1990年', text: '人类基因组计划启动，生命科学进入组学时代' },
      { year: '2020年', text: 'mRNA 疫苗在新冠防控中大规模应用，生物技术平台价值凸显' },
      { year: '2024年', text: '合成生物制造、细胞与基因治疗进入产业化加速期' }
    ]
  },
  '可控核聚变': {
    icon: 'fa-sun', category: '新能源', comp: 'energy',
    impact: 89, growth: '42%', heat: 78, maturity: '萌芽期',
    stats: { patents: '5,678', papers: '2,134', projects: '1,567', entities: '98' },
    apps: ['清洁能源', '电力供应', '航天推进'],
    principle: [
      '可控核聚变是在人工可控条件下让轻原子核（如氘、氚）聚合成较重原子核并释放能量的技术，其原理与太阳发光发热相同，被视为人类未来的终极能源方向之一。',
      '实现聚变能需要同时满足极高温度、足够密度和能量约束时间。当前主流技术路线包括磁约束（托卡马克、仿星器）和惯性约束（激光点火）两大类，工程上还要解决第一壁材料、氚自持与长时间稳定运行等难题。',
      '聚变燃料氘在海水中储量丰富，反应过程不排放温室气体，也不会发生堆芯熔毁。一旦实现商业化，将为基荷电力、工业供能和深海深空探索提供近乎无限的清洁能源。'
    ],
    path: [
      { year: '1952年', text: '人类首次通过氢弹实现不可控聚变释放，可控聚变研究随即起步' },
      { year: '1968年', text: '托卡马克装置取得突破性高温等离子体参数，成为磁约束主流路线' },
      { year: '1985年', text: '国际热核聚变实验堆（ITER）计划启动，多国联合攻关' },
      { year: '2022年', text: '美国国家点火装置首次实现聚变输出能量大于激光输入能量' },
      { year: '2023—2024年', text: '紧凑型托卡马克创业公司获得大额投资，商业聚变时间表加速' }
    ]
  },
  '6G通信技术': {
    icon: 'fa-broadcast-tower', category: '人工智能', comp: 'ai',
    impact: 87, growth: '48%', heat: 85, maturity: '萌芽期',
    stats: { patents: '6,892', papers: '2,456', projects: '1,234', entities: '178' },
    apps: ['全息通信', '空天一体化', '数字孪生'],
    principle: [
      '6G通信技术是第五代移动通信之后的新一代通信系统，预计工作在太赫兹等更高频段，提供Tbps级峰值速率、亚毫秒级时延和通感算一体能力。',
      '6G将融合地面蜂窝、卫星互联网和空中平台，构建空天地海一体化网络，并通过AI原生设计实现网络自优化，支撑全息通信、数字孪生和沉浸式交互等新业务。',
      '当前6G整体处于愿景形成与关键技术验证阶段，太赫兹器件、智能超表面、星地融合协议等方向是研究热点，预计2030年前后实现商用。'
    ],
    path: [
      { year: '2019年', text: '6G 概念开始出现，各国启动下一代通信前期研究' },
      { year: '2022年', text: '6G 愿景与应用场景白皮书发布，明确空天地一体与AI内生方向' },
      { year: '2024年', text: '太赫兹通信、智能超表面等关键技术完成外场试验验证' },
      { year: '2030年前后', text: '预计实现规模化商用部署' }
    ]
  },
  '钙钛矿太阳能电池': {
    icon: 'fa-solar-panel', category: '新能源', comp: 'energy',
    impact: 83, growth: '38%', heat: 72, maturity: '成长期',
    stats: { patents: '4,567', papers: '1,987', projects: '876', entities: '123' },
    apps: ['光伏发电', '建筑一体化', '便携能源'],
    principle: [
      '钙钛矿太阳能电池是以钙钛矿型金属卤化物材料作为光吸收层的新型薄膜电池，可采用溶液涂布、蒸镀等低温工艺制备，原材料成本低、生产流程短。',
      '该技术的突出优势是吸光系数高、带隙可调，既可制成柔性轻质组件用于建筑光伏一体化，也可与晶硅叠层，突破单结晶硅电池的效率上限。',
      '目前钙钛矿电池效率已从最初的3.8%提升到25%以上，叠层效率突破33%。商业化仍需解决大面积均匀制备、长期稳定性和铅元素环保处理等问题。'
    ],
    path: [
      { year: '2009年', text: '钙钛矿首次用于光伏器件，光电转换效率仅 3.8%' },
      { year: '2015年', text: '实验室效率突破 20%，引发产业界广泛关注' },
      { year: '2022年', text: '钙钛矿/晶硅叠层电池效率突破 32%，超过单晶电池理论极限' },
      { year: '2024年', text: '百兆瓦级中试产线陆续投产，进入规模化验证阶段' }
    ]
  },
  'mRNA疫苗技术': {
    icon: 'fa-syringe', category: '生物技术', comp: 'bio',
    impact: 90, growth: '62%', heat: 88, maturity: '成熟期',
    stats: { patents: '7,823', papers: '4,234', projects: '1,567', entities: '198' },
    apps: ['传染病疫苗', '肿瘤治疗', '免疫疾病'],
    principle: [
      'mRNA疫苗技术是将编码抗原蛋白的信使核糖核酸（mRNA）通过脂质纳米颗粒等递送系统送入人体细胞，由细胞自身合成抗原并激发免疫应答。',
      '与传统疫苗相比，mRNA平台具有研发周期短、可快速重编程、容易规模化生产等优势，同一技术平台可快速适配新发病原体，并向肿瘤个体化新抗原疫苗等方向拓展。',
      '该技术的关键在于mRNA修饰、序列优化和递送系统。新冠疫情中mRNA疫苗完成了大规模安全性与有效性验证，后续在传染病、肿瘤和罕见病领域的应用正在临床推进。'
    ],
    path: [
      { year: '1990年', text: '科学家首次证明体外转录的 mRNA 可在动物体内表达蛋白' },
      { year: '2005年', text: '核苷修饰技术显著降低 mRNA 的免疫原性，成为产业化关键' },
      { year: '2020年', text: '新冠 mRNA 疫苗完成紧急使用授权并实现数十亿剂接种' },
      { year: '2023—2024年', text: '个性化肿瘤 mRNA 疫苗进入后期临床试验，应用边界持续拓展' }
    ]
  },
  '量子通信': {
    icon: 'fa-key', category: '量子技术', comp: 'quantum',
    impact: 88, growth: '52%', heat: 75, maturity: '快速发展期',
    stats: { patents: '6,234', papers: '2,876', projects: '1,234', entities: '145' },
    apps: ['安全通信', '量子密钥', '量子网络'],
    principle: [
      '量子通信利用量子态携带信息，代表性技术量子密钥分发（QKD）依据量子不可克隆原理，使窃听行为必然被通信双方发现，从而提供理论上无条件安全的密钥协商能力。',
      '量子通信可与经典加密体系结合，用于政务、金融、电力等高安全等级网络，也可通过量子中继、可信中继扩展到城际和星地尺度，最终走向量子互联网。',
      '当前光纤QKD距离达数百公里，星地自由空间链路已实现千公里级密钥分发，工程重点在于提升成码率、降低设备成本与建设广域量子保密网络。'
    ],
    path: [
      { year: '1984年', text: 'BB84 量子密钥分发协议提出，奠定量子保密通信理论基础' },
      { year: '2016年', text: '全球首颗量子科学实验卫星"墨子号"发射，实现星地量子通信' },
      { year: '2017年', text: '北京—上海量子保密通信骨干线路开通并开展行业应用' },
      { year: '2022年以后', text: '星地一体广域量子网络持续扩展，行业应用从金融政务向更多领域延伸' }
    ]
  },
  '石墨烯材料': {
    icon: 'fa-gem', category: '材料科学', comp: 'material',
    impact: 86, growth: '35%', heat: 70, maturity: '快速发展期',
    stats: { patents: '9,876', papers: '3,456', projects: '1,234', entities: '267' },
    apps: ['柔性电子', '复合材料', '储能器件'],
    principle: [
      '石墨烯是由单层碳原子以蜂窝状结构构成的二维材料，是目前已知最薄、最坚硬的材料之一，同时具有极高的电子迁移率、导热性和比表面积。',
      '石墨烯可作为导电添加剂、导热膜、防腐涂层和柔性传感材料使用，在消费电子散热、新能源电池、复合材料增强等场景已实现规模化应用。',
      '产业发展的关键在于高质量、低成本的规模化制备以及下游应用验证。当前机械剥离、氧化还原和化学气相沉积等制备路线并行发展。'
    ],
    path: [
      { year: '2004年', text: '科学家通过胶带剥离获得单层石墨烯，二维材料时代开启' },
      { year: '2010年', text: '石墨烯研究获诺贝尔物理学奖，全球研发投入快速增加' },
      { year: '2015年', text: '石墨烯薄膜与粉体的规模化制备工艺逐步成熟' },
      { year: '2023—2024年', text: '导热膜、导电浆料和新能源应用形成稳定市场，高端应用持续拓展' }
    ]
  },
  '合成生物学': {
    icon: 'fa-flask', category: '生物技术', comp: 'bio',
    impact: 89, growth: '58%', heat: 78, maturity: '成长期',
    stats: { patents: '8,234', papers: '3,567', projects: '1,456', entities: '234' },
    apps: ['生物制造', '医药生产', '农业育种'],
    principle: [
      '合成生物学以工程化理念设计和构建人工生物系统，通过改造底盘细胞、设计基因线路和代谢通路，让微生物像"细胞工厂"一样定向生产目标产物。',
      '它融合了基因编辑、高通量测序、生物信息学和自动化实验平台，使能技术包括DNA合成、基因元件库和人工智能辅助设计，可显著缩短菌株构建周期。',
      '合成生物学已在医药中间体、可降解材料、食品蛋白和农业投入品等领域落地，被视为推动绿色制造和碳减排的关键技术，同时需要重视生物安全监管。'
    ],
    path: [
      { year: '2000年', text: '人工基因线路（双稳态开关、振荡子）构建成功，合成生物学正式起步' },
      { year: '2010年', text: '首个含人工合成基因组的细胞诞生，人工生命设计能力获验证' },
      { year: '2021年', text: '中国科研团队实现二氧化碳人工合成淀粉，引发广泛关注' },
      { year: '2024年', text: '生物制造示范工程扩大，化工、材料与食品领域产业化进程提速' }
    ]
  },
  '空间太阳能发电': {
    icon: 'fa-satellite', category: '新能源', comp: 'energy',
    impact: 84, growth: '35%', heat: 85, maturity: '萌芽期',
    stats: { patents: '1,245', papers: '682', projects: '86', entities: '34' },
    apps: ['地面供电', '空间站供电', '偏远地区能源'],
    principle: [
      '空间太阳能发电（SSPS）是在地球轨道部署大型光伏发电装置，将太阳能转化为电能后，通过微波或激光无线输电方式传回地面接收站并并网使用。',
      '空间光照强度高且不受昼夜、天气和大气遮挡影响，发电利用小时数远高于地面光伏；技术难点集中在超大型结构的在轨组装、高效率无线输电和发射成本。',
      '该方向可为地面基荷供电、灾害应急供电、偏远地区以及深空任务提供能源，目前处于关键技术验证和系统方案论证阶段。'
    ],
    path: [
      { year: '1968年', text: '空间太阳能电站概念被提出，论证轨道发电与无线输电可行性' },
      { year: '2008年', text: '多国启动空间太阳能系统方案研究与关键技术攻关' },
      { year: '2015年', text: '中国提出空间太阳能电站发展路线图并开展地面验证' },
      { year: '2023—2024年', text: '无线能量传输、轻量化结构与在轨组装等关键技术持续试验验证' }
    ]
  },
  '基因治疗递送系统': {
    icon: 'fa-dna', category: '生物技术', comp: 'bio',
    impact: 86, growth: '32%', heat: 83, maturity: '成长期',
    stats: { patents: '2,680', papers: '1,340', projects: '128', entities: '42' },
    apps: ['遗传病治疗', '肿瘤治疗', '罕见病用药'],
    principle: [
      '基因治疗递送系统负责将治疗性基因或基因编辑工具安全、高效地送入靶细胞，主要包括病毒载体（如腺相关病毒AAV、慢病毒）和非病毒载体（如脂质纳米颗粒LNP）两大类。',
      '递送系统决定了基因治疗的靶向性、表达持久性和安全性。AAV适合体内长期表达，LNP在mRNA药物与肝脏靶向递送中表现突出，新型载体正朝着低免疫原性和组织特异靶向方向发展。',
      '随着多款体内基因疗法获批，递送技术已成为基因药物从临床走向规模化的核心瓶颈和产业竞争焦点。'
    ],
    path: [
      { year: '1972年', text: '基因治疗概念正式提出，载体递送成为核心研究问题' },
      { year: '1990年', text: '首例人体基因治疗临床试验实施' },
      { year: '2017年', text: '多款 AAV 体内基因疗法获批上市，病毒载体平台成熟' },
      { year: '2023—2024年', text: 'LNP 靶向递送与新型工程化载体推动肝外组织给药取得突破' }
    ]
  },
  '光子芯片': {
    icon: 'fa-microchip', category: '材料科学', comp: 'ai',
    impact: 85, growth: '45%', heat: 78, maturity: '萌芽期',
    stats: { patents: '1,890', papers: '760', projects: '92', entities: '38' },
    apps: ['光通信互连', 'AI算力加速', '光传感'],
    principle: [
      '光子芯片以光子而非电子作为信息载体，利用硅光、铌酸锂薄膜等集成光路实现数据的传输、调制与运算，具有高带宽、低时延、低功耗的特点。',
      '在数据中心光模块和共封装光学（CPO）中，光子芯片已规模商用；在计算领域，光矩阵乘法和光交换网络有望缓解AI算力的功耗与互连瓶颈。',
      '当前需要解决光源集成、光电协同封装、标准化工艺和计算精度等问题，硅光产线与成熟CMOS工艺兼容是产业化的重要基础。'
    ],
    path: [
      { year: '2004年', text: '硅基光子学概念成熟，光电器件在硅平台上集成成为可能' },
      { year: '2016年', text: '100G/400G 硅光模块进入商用，数据中心互连率先落地' },
      { year: '2020年', text: '光计算与光交换芯片在 AI 加速场景完成原理验证' },
      { year: '2024年', text: '共封装光学（CPO）与薄膜铌酸锂方案进入规模化部署' }
    ]
  },
  '高空风能发电': {
    icon: 'fa-wind', category: '新能源', comp: 'energy',
    impact: 80, growth: '22%', heat: 77, maturity: '成长期',
    stats: { patents: '980', papers: '420', projects: '64', entities: '26' },
    apps: ['偏远地区供电', '海岛能源', '应急电源'],
    principle: [
      '高空风能发电利用数百米至数千米高空稳定且强劲的风能，通过浮空式风力机组、爬升式风筝机组等装置捕获风能，再将电力通过缆绳或其他方式送回地面。',
      '高空风能资源密度高、波动小，装置材料用量远低于传统风机，理论度电成本低，适合偏远地区、海岛和应急场景的分布式供电。',
      '该技术的工程挑战包括长时间自主飞行控制、强风天气安全性、缆绳输电和空域管理，目前多家团队已完成兆瓦级样机试验。'
    ],
    path: [
      { year: '20世纪80年代', text: '高空风能概念提出，开始论证高空风资源的可利用性' },
      { year: '2014年', text: '多家科技公司完成发电型浮空机组试飞验证' },
      { year: '2020年', text: '兆瓦级高空风能机组进入地面与空中联合试验' },
      { year: '2024年', text: '并网示范与商业化试点推进，自主飞行控制系统持续成熟' }
    ]
  },
  '神经形态计算': {
    icon: 'fa-network-wired', category: '人工智能', comp: 'ai',
    impact: 84, growth: '38%', heat: 75, maturity: '成长期',
    stats: { patents: '2,140', papers: '1,180', projects: '105', entities: '45' },
    apps: ['边缘智能', '脑模拟', '低功耗推理'],
    principle: [
      '神经形态计算（类脑计算）借鉴生物大脑的神经元与突触结构，采用事件驱动、存算一体和脉冲神经网络等方式进行计算，在处理感知和时序任务时能效突出。',
      '与传统冯·诺依曼架构相比，类脑芯片将存储与计算融合，减少了数据搬运能耗，适合在低功耗边缘设备上实时处理视觉、语音和传感器信号。',
      '当前类脑硬件已有多款流片，软件栈与算法生态仍在发展中，与大模型结合的低功耗推理是新的研究热点。'
    ],
    path: [
      { year: '1989年', text: 'Carver Mead 提出神经形态工程概念，倡导仿脑硅电路' },
      { year: '2014年', text: '百万神经元级类脑芯片 TrueNorth 发布' },
      { year: '2017年', text: '自主学习类脑芯片 Loihi 推出，脉冲神经网络生态发展' },
      { year: '2024年', text: '类脑芯片与存算一体方案在边缘 AI、低功耗大模型推理中加速应用' }
    ]
  }
};

// 清单页名称 → 详情数据键名
const NAME_ALIASES = {
  '基因编辑技术': '基因编辑',
  '6G通信': '6G通信技术',
  '空间太阳能': '空间太阳能发电'
};

// 全球竞争格局预设（按类别）
const COMPETITION_PRESETS = {
  quantum: [
    { flag: '🇺🇸', country: '美国', status: 'IBM、Google 等领先', score: 95 },
    { flag: '🇨🇳', country: '中国', status: '中科大、本源量子积极布局', score: 90 },
    { flag: '🇪🇺', country: '欧盟', status: 'IQM、Pasqal 等特色发展', score: 82 }
  ],
  ai: [
    { flag: '🇺🇸', country: '美国', status: '头部科技企业领先', score: 95 },
    { flag: '🇨🇳', country: '中国', status: '华为、百度、阿里等积极布局', score: 88 },
    { flag: '🇪🇺', country: '欧盟', status: '特色企业与科研机构跟进', score: 82 }
  ],
  bio: [
    { flag: '🇺🇸', country: '美国', status: '研发与产业生态领先', score: 94 },
    { flag: '🇪🇺', country: '欧盟', status: '临床与基础研究积淀深厚', score: 87 },
    { flag: '🇨🇳', country: '中国', status: '临床转化快速跟进', score: 85 }
  ],
  energy: [
    { flag: '🇨🇳', country: '中国', status: '产业链与应用示范领先', score: 92 },
    { flag: '🇺🇸', country: '美国', status: '创新企业活跃', score: 88 },
    { flag: '🇪🇺', country: '欧盟', status: '政策驱动、标准先行', score: 84 }
  ],
  material: [
    { flag: '🇨🇳', country: '中国', status: '制造规模与应用市场领先', score: 90 },
    { flag: '🇺🇸', country: '美国', status: '原创研发能力强', score: 86 },
    { flag: '🇯🇵', country: '日本', status: '精细材料具有传统优势', score: 83 }
  ]
};

const techName = computed(() => {
  const raw = route.params.name || '大语言模型';
  return NAME_ALIASES[raw] || raw;
});

const detail = computed(() => TECH_DETAILS[techName.value] || TECH_DETAILS['大语言模型']);
const competition = computed(() => COMPETITION_PRESETS[detail.value.comp] || COMPETITION_PRESETS.ai);

// 未提供定制成果/论文时，按模板生成，保持与原型一致的卡片风格
const achievements = computed(() => {
  if (detail.value.achievements) return detail.value.achievements;
  const [a1, a2] = detail.value.apps;
  return [
    { title: `面向${a1}场景的${techName.value}关键技术研究`, dir: a1, date: '2024-06' },
    { title: `${techName.value}核心器件与系统优化方法`, dir: detail.value.category, date: '2024-03' },
    { title: `${techName.value}在${a2}中的示范应用框架`, dir: a2, date: '2024-01' }
  ];
});
const papers = computed(() => {
  if (detail.value.papers) return detail.value.papers;
  const [a1, a2] = detail.value.apps;
  return [
    { title: `${techName.value}研究进展与未来展望`, meta: `中国科学 | 2024-02 | 代表性论文 | ${detail.value.category}` },
    { title: `${techName.value}关键技术综述`, meta: `自动化学报 | 2023-09 | 代表性论文 | ${a1}` },
    { title: `面向${a2}的${techName.value}方法与实践`, meta: `中国工程科学 | 2023-04 | 代表性论文 | 应用研究` }
  ];
});

// ==================== 产业链结构图（与原型一致：上/中/下/配套 四组）====================
const chainGroups = [
  {
    id: 'upstream', label: '上游', color: '#1677d2',
    branches: [
      { id: 'ai-chip', label: 'AI算力芯片', companies: ['英伟达', 'AMD', '华为昇腾', '海光信息', '寒武纪'] },
      { id: 'data-center', label: '服务器与数据中心', companies: ['浪潮信息', '中科曙光', '新华三', '工业富联'] },
      { id: 'training-data', label: '训练数据与语料', companies: ['科大讯飞', '中文在线', '万兴科技', '人民网'] },
      { id: 'cloud-infrastructure', label: '云计算基础设施', companies: ['阿里云', '腾讯云', '华为云', '百度智能云'] }
    ]
  },
  {
    id: 'middle', label: '中游', color: '#52c41a',
    branches: [
      { id: 'foundation-model', label: '基础大模型研发', companies: ['OpenAI', '百度', '阿里云', '智谱AI', '月之暗面'] },
      { id: 'pretraining-alignment', label: '预训练与对齐', companies: ['北京智源', '清华大学', '商汤科技', '科大讯飞'] },
      { id: 'inference-service', label: '推理部署与模型服务', companies: ['百度智能云', '阿里云', '火山引擎', '腾讯云'] }
    ]
  },
  {
    id: 'downstream', label: '下游', color: '#fa8c16',
    branches: [
      { id: 'smart-office', label: '智能办公与知识管理', companies: ['科大讯飞', '金山办公', '泛微网络', '用友网络'] },
      { id: 'search-content', label: '搜索问答与内容生成', companies: ['百度', '字节跳动', '知乎', '中文在线'] },
      { id: 'industry-research', label: '工业与科研应用', companies: ['华为', '海尔智家', '联想集团', '中国科学院'] },
      { id: 'government-service', label: '政务与公共服务', companies: ['浪潮软件', '数字政通', '太极股份', '科大讯飞'] }
    ]
  },
  {
    id: 'supporting', label: '配套', color: '#722ed1',
    branches: [
      { id: 'data-labeling', label: '数据标注与治理', companies: ['海天瑞声', '数据堂', '云测数据', '标贝科技'] },
      { id: 'evaluation-safety', label: '模型评测与安全合规', companies: ['360', '安恒信息', '奇安信', '启明星辰'] },
      { id: 'application-platform', label: 'AI应用开发平台', companies: ['科大讯飞', '第四范式', '拓尔思', '商汤科技'] },
      { id: 'smart-hardware', label: '终端与智能硬件', companies: ['联想集团', '传音控股', '科大讯飞', '汇川技术'] }
    ]
  }
];

// 复刻原型几何布局：graphWidth 720 / graphHeight 600
const GW = 720;
const GH = 600;
const CORE_X = 24;
const CORE_W = 108;
const BRANCH_X = 170;
const BRANCH_W = 510;

const chainLayout = computed(() => {
  const links = [];
  const cores = [];
  const branches = [];
  chainGroups.forEach((group, gi) => {
    const coreY = 75 + gi * 150;
    const spread = Math.max(0, (group.branches.length - 1) * 42);
    const startY = coreY - spread / 2;
    cores.push({ id: group.id, label: group.label, color: group.color, x: CORE_X, y: coreY, w: CORE_W });
    group.branches.forEach((b, bi) => {
      const branchY = startY + (group.branches.length > 1 ? (spread * bi) / (group.branches.length - 1) : 0);
      links.push({ id: `${group.id}-${b.id}`, x1: CORE_X + CORE_W, y1: coreY, x2: BRANCH_X, y2: branchY });
      branches.push({ id: b.id, groupId: group.id, groupLabel: group.label, label: b.label, x: BRANCH_X, y: branchY, w: BRANCH_W, companies: b.companies });
    });
  });
  return { links, cores, branches };
});

const selection = ref({ kind: 'branch', id: 'ai-chip' });
function isActiveBranch(id) { return selection.value.kind === 'branch' && selection.value.id === id; }
function selectBranch(b) { selection.value = { kind: 'branch', id: b.id }; }
function selectCore(g) { selection.value = { kind: 'core', id: g.id }; }

const selectedInfo = computed(() => {
  if (selection.value.kind === 'core') {
    const group = chainGroups.find(g => g.id === selection.value.id);
    const companies = [];
    group.branches.forEach(b => b.companies.forEach(c => companies.push(c)));
    return { title: `${group.label} · 全部关键企业`, companies: Array.from(new Set(companies)) };
  }
  const b = chainLayout.value.branches.find(x => x.id === selection.value.id);
  return b ? { title: `${b.groupLabel} · ${b.label}`, companies: b.companies } : { title: '请选择左侧产业链节点', companies: [] };
});

// ==================== 操作 ====================
function goBack() { router.push({ name: 'disruptiveTech' }); }
function exportReport() {
  alert('正在生成技术报告，请稍候...');
  setTimeout(() => alert('报告导出成功！'), 1500);
}

onMounted(() => { window.scrollTo(0, 0); });
</script>

<template>
  <div class="tech-detail-page">
    <div class="main-content">
      <!-- 返回按钮 -->
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        <span>返回</span>
      </button>

      <!-- 头部信息 -->
      <div class="detail-header">
        <div class="header-top">
          <div class="tech-icon"><i class="fas" :class="detail.icon"></i></div>
          <div class="tech-info">
            <div class="tech-name">{{ techName }}</div>
            <div class="tech-meta">
              <div class="tech-meta-item"><span class="impact-badge-large">影响指数 {{ detail.impact }}</span></div>
              <div class="tech-meta-item"><i class="fas fa-chart-line"></i> 年增长率: <span>{{ detail.growth }}</span></div>
              <div class="tech-meta-item"><i class="fas fa-fire"></i> 市场热度: <span>{{ detail.heat }}</span></div>
              <div class="tech-meta-item"><i class="fas fa-leaf"></i> 成熟度: <span>{{ detail.maturity }}</span></div>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-action btn-secondary" @click="exportReport"><i class="fas fa-download"></i> 导出报告</button>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="left-panel">
          <!-- 技术原理 -->
          <div class="section-card">
            <div class="section-title"><i class="fas fa-book" style="color: #1890ff;"></i> 技术原理</div>
            <div class="principle-content">
              <p v-for="(p, i) in detail.principle" :key="i">{{ p }}</p>
            </div>
          </div>

          <!-- 发展路径 -->
          <div class="section-card">
            <div class="section-title"><i class="fas fa-road" style="color: #52c41a;"></i> 发展路径</div>
            <div class="timeline">
              <div v-for="(item, i) in detail.path" :key="i" class="timeline-item">
                <div class="timeline-year">{{ item.year }}</div>
                <div class="timeline-content">{{ item.text }}</div>
              </div>
            </div>
          </div>

          <!-- 全球竞争格局 -->
          <div class="section-card">
            <div class="section-title"><i class="fas fa-globe" style="color: #faad14;"></i> 全球竞争格局</div>
            <div class="competition-grid">
              <div v-for="c in competition" :key="c.country" class="competition-item">
                <div class="competition-flag">{{ c.flag }}</div>
                <div class="competition-country">{{ c.country }}</div>
                <div class="competition-status">{{ c.status }}</div>
                <div class="competition-score">{{ c.score }}</div>
              </div>
            </div>
          </div>

          <!-- 产业链结构图 -->
          <div class="section-card industry-chain-section">
            <div class="section-title industry-chain-heading">
              <span><i class="fas fa-sitemap" style="color: #1677d2;"></i> 产业链结构图</span>
              <span class="industry-chain-hint">{{ techName }}产业链示例 · 点击分支查看关键企业</span>
            </div>
            <div class="industry-chain-layout">
              <div class="industry-chain-graph-panel">
                <div class="industry-chain-graph">
                  <svg :viewBox="`0 0 ${GW} ${GH}`" role="img" :aria-label="`${techName}产业链节点链接图`">
                    <defs>
                      <marker id="industry-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                        <path d="M0,0 L8,4 L0,8 Z" fill="#b8c4d4" />
                      </marker>
                    </defs>
                    <line v-for="l in chainLayout.links" :key="l.id" class="industry-link"
                      :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" marker-end="url(#industry-arrow)" />
                    <g v-for="b in chainLayout.branches" :key="b.id" class="industry-branch-node"
                      :class="{ active: isActiveBranch(b.id) }" tabindex="0" role="button"
                      @click="selectBranch(b)" @keydown.enter.prevent="selectBranch(b)" @keydown.space.prevent="selectBranch(b)">
                      <title>{{ b.groupLabel }}：{{ b.label }}</title>
                      <rect :x="b.x" :y="b.y - 16" :width="b.w" height="32" rx="4" />
                      <text :x="b.x + 16" :y="b.y + 5">{{ b.label }}</text>
                    </g>
                    <g v-for="g in chainLayout.cores" :key="g.id" class="industry-core-node"
                      tabindex="0" role="button"
                      @click="selectCore(g)" @keydown.enter.prevent="selectCore(g)" @keydown.space.prevent="selectCore(g)">
                      <title>{{ g.label }}产业链</title>
                      <rect :x="g.x" :y="g.y - 23" :width="g.w" height="46" rx="7" :fill="g.color" />
                      <text :x="g.x + g.w / 2" :y="g.y + 5" text-anchor="middle">{{ g.label }}</text>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="industry-chain-list-panel">
                <div class="industry-chain-list-title">关键企业</div>
                <div class="industry-chain-selected">{{ selectedInfo.title }}</div>
                <div class="industry-chain-list">
                  <div v-for="(c, i) in selectedInfo.companies" :key="c" class="industry-enterprise-item">
                    <span class="industry-enterprise-rank">{{ i + 1 }}</span><span>{{ c }}</span>
                  </div>
                  <div v-if="!selectedInfo.companies.length" class="industry-chain-empty">暂无关键企业数据</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 最新研究成果 -->
          <div class="section-card">
            <div class="section-title"><i class="fas fa-flask" style="color: #722ed1;"></i> 最新研究成果</div>
            <div class="patent-list">
              <div v-for="(a, i) in achievements" :key="i" class="patent-item">
                <div class="patent-info">
                  <div class="patent-title">{{ a.title }}</div>
                  <div class="patent-meta">研究方向: {{ a.dir }} | 示例研究成果 | {{ a.date }}</div>
                </div>
                <span class="patent-status">最新</span>
              </div>
            </div>
          </div>

          <!-- 代表性论文 -->
          <div class="section-card">
            <div class="section-title"><i class="fas fa-file-alt" style="color: #eb2f96;"></i> 代表性论文</div>
            <div class="paper-list">
              <div v-for="(p, i) in papers" :key="i" class="paper-item">
                <div class="paper-title">{{ p.title }}</div>
                <div class="paper-meta">{{ p.meta }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <!-- 核心指标 -->
          <div class="info-card">
            <div class="info-title">核心指标</div>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ detail.stats.patents }}</div>
                <div class="stat-label">相关专利</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ detail.stats.papers }}</div>
                <div class="stat-label">学术论文</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ detail.stats.projects }}</div>
                <div class="stat-label">科研项目</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ detail.stats.entities }}</div>
                <div class="stat-label">参与实体</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1:1 复刻原型 1.1.2.1技术详情页.html 的样式 */
.tech-detail-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #d8e7fc;
  min-height: 100vh;
}
/* 让出固定面包屑栏高度（48px - App .content 顶部 20px） */
.main-content { flex: 1; padding: 28px 0 0; overflow-x: hidden; }

/* 返回按钮 */
.back-button {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; background: #fff; border: 1px solid #d9d9d9; border-radius: 4px;
  font-size: 14px; color: #666; cursor: pointer; transition: all 0.3s; margin-bottom: 16px;
}
.back-button:hover { border-color: #1890ff; color: #1890ff; background: #f0f5ff; }
.back-button i { font-size: 14px; }

/* 头部信息 */
.detail-header { background: #fff; border-radius: 4px; padding: 24px; margin-bottom: 20px; }
.header-top { display: flex; align-items: flex-start; gap: 20px; }
.tech-icon {
  width: 80px; height: 80px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; color: #fff; background: linear-gradient(135deg, #fa8c16, #ff9c6e);
}
.tech-info { flex: 1; min-width: 0; }
.tech-name { font-size: 24px; font-weight: 600; color: #333; margin-bottom: 8px; }
.tech-meta { display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #666; }
.tech-meta-item { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.impact-badge-large { padding: 4px 16px; background: linear-gradient(135deg, #fa8c16, #ff9c6e); color: #fff; border-radius: 20px; font-size: 14px; font-weight: 500; }
.header-actions { display: flex; gap: 12px; flex-shrink: 0; }
.btn-action { height: 36px; padding: 0 20px; border-radius: 4px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; }
.btn-primary { background: #1890ff; color: #fff; border: none; }
.btn-primary:hover { background: #40a9ff; }
.btn-secondary { background: #fff; color: #666; border: 1px solid #d9d9d9; }
.btn-secondary:hover { border-color: #1890ff; color: #1890ff; }

/* 内容网格 */
.content-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 20px; }
.left-panel, .right-panel { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.section-card { background: #fff; border-radius: 4px; padding: 24px; }
.section-title {
  font-size: 16px; font-weight: 600; color: #333; margin-bottom: 16px;
  padding-left: 12px; border-left: 3px solid #1890ff;
  display: flex; align-items: center; gap: 8px;
}

/* 技术原理 */
.principle-content { font-size: 14px; color: #666; line-height: 1.8; }
.principle-content p { margin-bottom: 12px; }
.principle-content p:last-child { margin-bottom: 0; }

/* 发展路径时间线 */
.timeline { position: relative; padding-left: 24px; }
.timeline::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: #e8e8e8; }
.timeline-item { position: relative; padding-bottom: 20px; }
.timeline-item:last-child { padding-bottom: 0; }
.timeline-item::before {
  content: ''; position: absolute; left: -22px; top: 4px; width: 12px; height: 12px;
  background: #1890ff; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 2px #1890ff;
}
.timeline-year { font-size: 14px; font-weight: 600; color: #1890ff; margin-bottom: 4px; }
.timeline-content { font-size: 13px; color: #666; line-height: 1.6; }

/* 全球竞争格局 */
.competition-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.competition-item { background: #f8fafc; border-radius: 4px; padding: 16px; text-align: center; }
.competition-flag { font-size: 24px; margin-bottom: 8px; }
.competition-country { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 4px; }
.competition-status { font-size: 12px; color: #666; min-height: 32px; }
.competition-score { font-size: 20px; font-weight: 600; color: #1890ff; margin-top: 8px; }

/* 专利与论文 */
.patent-list, .paper-list { display: flex; flex-direction: column; gap: 12px; }
.patent-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 4px; }
.patent-info { flex: 1; min-width: 0; }
.patent-title { font-size: 13px; color: #333; margin-bottom: 4px; }
.patent-meta { font-size: 12px; color: #999; }
.patent-status { flex-shrink: 0; padding: 2px 8px; background: #f6ffed; color: #52c41a; border-radius: 4px; font-size: 11px; }
.paper-item { padding: 12px; background: #f8fafc; border-radius: 4px; }
.paper-title { font-size: 13px; font-weight: 500; color: #333; margin-bottom: 4px; }
.paper-meta { font-size: 12px; color: #999; }

/* 产业链结构图 */
.industry-chain-section { overflow: hidden; }
.industry-chain-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.industry-chain-hint { color: #999; font-size: 12px; font-weight: 400; }
.industry-chain-layout { display: grid; grid-template-columns: minmax(0, 3fr) minmax(250px, 1fr); gap: 20px; min-height: 520px; }
.industry-chain-graph-panel, .industry-chain-list-panel { min-width: 0; border: 1px solid #e8e8e8; border-radius: 4px; background: #fafafa; }
.industry-chain-graph-panel { padding: 8px; }
.industry-chain-graph { width: 100%; height: 600px; min-height: 600px; }
.industry-chain-graph svg { display: block; width: 100%; height: 100%; }
.industry-link { stroke: #b8c4d4; stroke-width: 1.5; }
.industry-core-node, .industry-branch-node { cursor: pointer; outline: none; }
.industry-core-node rect { stroke-width: 2; }
.industry-core-node text { fill: #fff; font-size: 15px; font-weight: 600; pointer-events: none; }
.industry-branch-node rect { fill: #fff; stroke: #c8d1dc; stroke-width: 1.5; transition: fill .2s, stroke .2s; }
.industry-branch-node text { fill: #333; font-size: 13px; pointer-events: none; }
.industry-branch-node:hover rect, .industry-branch-node:focus rect { fill: #f0f7ff; stroke: #69b1ff; }
.industry-branch-node.active rect { fill: #e6f4ff; stroke: #1677d2; stroke-width: 2.5; }
.industry-branch-node.active text { fill: #0958d9; font-weight: 600; }
.industry-chain-list-panel { padding: 20px; display: flex; flex-direction: column; }
.industry-chain-list-title { color: #333; font-size: 14px; font-weight: 600; margin-bottom: 6px; }
.industry-chain-selected { color: #1677d2; font-size: 13px; line-height: 1.5; min-height: 39px; }
.industry-chain-list { display: flex; flex: 1; min-height: 0; flex-direction: column; gap: 8px; margin-top: 14px; overflow-y: auto; }
.industry-enterprise-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #fff; border: 1px solid #edf0f5; border-radius: 4px; color: #333; font-size: 13px; }
.industry-enterprise-rank {
  width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center;
  flex: 0 0 20px; border-radius: 50%; background: #e6f4ff; color: #1677d2; font-size: 11px; font-weight: 600;
}
.industry-chain-empty { padding: 24px 8px; color: #999; text-align: center; font-size: 13px; }

/* 右侧信息卡片 */
.info-card { background: #fff; border-radius: 4px; padding: 20px; }
.info-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 16px; }
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.stat-item { background: #f8fafc; padding: 16px; border-radius: 4px; text-align: center; }
.stat-value { font-size: 24px; font-weight: 600; color: #1890ff; }
.stat-label { font-size: 12px; color: #666; margin-top: 4px; }

@media (max-width: 900px) {
  .industry-chain-layout { grid-template-columns: 1fr; }
  .industry-chain-list { max-height: 360px; }
  .industry-chain-hint { display: none; }
  .content-grid { grid-template-columns: 1fr; }
}
</style>
