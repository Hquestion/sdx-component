import TabRadioItem from './src/TabRadio';
import TabRadioGroup from './src/TabRadioGroup';

const TabRadio = { TabRadioGroup, TabRadioItem };

TabRadio.install = Vue => {
    Vue.component(TabRadioGroup.name, TabRadioGroup);
    Vue.component(TabRadioItem.name, TabRadioItem);
};

export default TabRadio;

