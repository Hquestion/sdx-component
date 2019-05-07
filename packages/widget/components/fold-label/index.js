import FoldLabelGroup from './src/FoldLabelGroup';
import FoldLabel from './src/FoldLabel';

const _FoldLabel = {
    FoldLabel,
    FoldLabelGroup,
    install(Vue) {
        Vue.component(FoldLabel.name, FoldLabel);
        Vue.component(FoldLabelGroup.name, FoldLabelGroup);
    }
};

export default _FoldLabel;
