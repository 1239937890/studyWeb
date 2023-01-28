import {
  illness1,
  illness2,
  illness3,
  illness4,
  illness5,
  illness6,
  illness7,
  illness8,
  hospital,
  lookupDoctor,
  disease,
  video,
  audio,
  qa,
  live,
} from '@/utils/pic';
const navList = [
  {
    id: 1,
    logo: hospital,
    title: '快速找医院',
    path: '/pages/sub/index/lookup/hospital',
  },
  {
    id: 2,
    logo: lookupDoctor,
    title: '查找医生',
    path: '/pages/sub/index/lookup/doctor',
  },
  {
    id: 3,
    logo: disease,
    title: '疾病百科',
    path: '/pages/sub/index/lookup/illness',
  },
];
const knowledgeList = [
  {
    id: 1,
    title: '科普视频',
    info: '权威医生视频科普',
    logo: video,
    url: '/pages/sub/index/video',
  },
  {
    id: 2,
    title: '专家音频',
    info: '音频解答医疗知识',
    logo: audio,
    url: '/pages/sub/index/audio',
  },
  {
    id: 3,
    title: '名医问答',
    info: '专业医疗知识解答',
    logo: qa,
    url: '/pages/sub/index/ask',
  },
  {
    id: 4,
    title: '医师汇直播',
    info: '近距离与名医互动',
    logo: live,
    url: '/pages/sub/index/live',
  },
];
const illnessLogoList = [
  {
    id: 0,
    title: '全部',
    logo: illness1,
    viewId: 'view0',
    name: 'gaishu',
    engText: 'OVERVIEW',
  },
  {
    id: 1,
    title: '症状',
    logo: illness2,
    viewId: 'view1',
    name: 'zhengzhuang',
    engText: 'SYMPTOM',
  },
  {
    id: 2,
    title: '病因',
    logo: illness3,
    viewId: 'view2',
    name: 'bingyin',
    engText: 'PATHOGENY',
  },
  {
    id: 3,
    title: '就医',
    logo: illness4,
    viewId: 'view3',
    name: 'jiuyi',
    engText: 'SEE THE DOCTOR',
  },
  {
    id: 4,
    title: '治疗',
    logo: illness5,
    viewId: 'view4',
    name: 'zhiliao',
    engText: 'TREAT',
  },
  {
    id: 5,
    title: '日常',
    logo: illness6,
    viewId: 'view5',
    name: 'richang',
    engText: 'DAILY',
  },
  {
    id: 6,
    title: '预防',
    logo: illness7,
    viewId: 'view6',
    name: 'yufang',
    engText: 'PREVENT',
  },
  {
    id: 7,
    title: '诊断',
    logo: illness8,
    viewId: 'view7',
    name: 'zhenduan',
    engText: 'DIAGNOSE',
  },
];
//聚合搜索
const tabList = [
  {
    id: 1,
    name: '推荐',
  },
  {
    id: 2,
    name: '问答',
  },
  {
    id: 3,
    name: '视频',
  },
  {
    id: 4,
    name: '音频',
  },
  {
    id: 5,
    name: '话题',
  },
  {
    id: 6,
    name: '医生',
  },
  {
    id: 6,
    name: '医院',
  },
];
export { navList, knowledgeList, illnessLogoList, tabList };
