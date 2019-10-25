import GeneralTaskList from './src/GeneralTaskList';

GeneralTaskList.install = Vue => {
    Vue.component(GeneralTaskList.name, GeneralTaskList);
};

export default GeneralTaskList;
