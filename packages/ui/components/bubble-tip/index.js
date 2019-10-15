import Manager from './src/manage';
console.log(Manager);

Manager.install = Vue => {
    Vue.prototype.$bubbleTip = Manager;
    Vue.bubbleTip = Manager;
};

export default Manager;
