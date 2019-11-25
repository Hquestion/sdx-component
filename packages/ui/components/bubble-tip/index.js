import Manager from './src/manage';

Manager.install = Vue => {
    Vue.prototype.$bubbleTip = Manager;
    Vue.bubbleTip = Manager;
};

export default Manager;
