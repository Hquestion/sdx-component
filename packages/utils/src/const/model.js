export const DEFAULT_MODEL_TYPE_ICON = 'sdx-zidingyimoxing';

export const MODEL_TYPES_ICON = [
    {
        name: '自然语言处理',
        label: 'view.model.types.naturalProcess',
        icon: 'sdx-ziranyuyanchuli',
        color: '#5243AA'
    },
    {
        name: '特征转换',
        label: 'view.model.types.featureConversion',
        icon: 'sdx-tezhengzhuanhuan',
        color: '#00A3BF'
    },
    {
        name: '异常检测',
        label: 'view.model.types.abnormalDetection',
        icon: 'sdx-yichangjiance',
        color: '#00875A'
    },
    {
        name: '回归类型',
        label: 'view.model.types.regressionType',
        icon: 'sdx-huiguileixing',
        color: '#00875A'
    },
    {
        name: '自动建模',
        label: 'view.model.types.automaticModel',
        icon: 'sdx-zidongjianmo',
        color: '#FF991F'
    },
    {
        name: '推荐类型',
        label: 'view.model.types.recommendType',
        icon: 'sdx-tuijianleixing',
        color: '#FF991F'
    },
    {
        name: '关联规则',
        label: 'view.model.types.associationRule',
        icon: 'sdx-guanlianguize',
        color: '#1144AB'
    },
    {
        name: '时间序列',
        label: 'view.model.types.timeSequence',
        icon: 'sdx-shijianxulie',
        color: '#FF991F'
    },
    {
        name: '聚类类型',
        label: 'view.model.types.clusterType',
        icon: 'sdx-juleileixing',
        color: '#5243AA'
    },
    {
        name: '分类类型',
        label: 'view.model.types.classificationType',
        icon: 'sdx-fenleileixing',
        color: '#00A3BF'
    },
];

export function getLabelByName(name) {
    const type = MODEL_TYPES_ICON.find(item => item.name === name);
    return type ? type.label : '';
}

// 模型服务列表中状态对应的操作数组
export const STATE_MODEL_SERVICE_OPERATION = {
    Created: ['start', 'remove', 'edit'],
    Scheduling: [],
    Pending: ['stop'],
    Running: ['stop', 'test', 'release', 'offline', 'gray'],
    Succeeded: ['start', 'edit', 'remove'],
    Terminating: [],
    Terminated: ['start', 'edit', 'remove'],
    Failed: ['start', 'edit', 'remove'],
    Error: ['stop'],
};

// 操作信息
export const OPERATION_INFO = {
    start: {
        label: 'sdxCommon.startUp',
        value: 'start',
    },
    stop: {
        label: 'sdxCommon.Stop',
        value: 'stop',
    },
    edit: {
        label: 'sdxCommon.Edit',
        value: 'edit',
    },
    remove: {
        label: 'sdxCommon.Delete',
        value: 'remove',
    },
    test: {
        label: 'view.mode.Online_testing',
        value: 'test',
    },
    release: {
        label: 'view.model.Release_to_AI_open_platform',
        value: 'release'
    },
    offline: {
        label: 'view.model.Offline_from_AI_open_platform',
        value: 'release'
    },
    gray: {
        label: 'view.model.New_gray_level_release',
        value: 'release'
    }
};