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
    return type ? type.label : name;
}
