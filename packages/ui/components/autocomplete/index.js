import AutoComplete from './src/AutoComplete';

AutoComplete.install = vue => {
    vue.component(AutoComplete.name, AutoComplete);
};

export default AutoComplete;
