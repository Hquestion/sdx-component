import Select from './src/select';
import Option from './src/option';

const _Select = {
    Select,
    Option,
    install(Vue) {
        Vue.component(Select.name, Select);
        Vue.component(Option.name, Option);
    }
};

export default _Select;
