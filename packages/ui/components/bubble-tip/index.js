import Manager from './src/manage';
import BubbleTip from './src/BubbleTip';

Manager.install = Vue => {
    Vue.prototype.$bubbleTip = Manager;
    Vue.bubbleTip = Manager;
    Vue.component(BubbleTip.name, BubbleTip);
};

export default Manager;
