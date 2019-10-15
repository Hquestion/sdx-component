import Manager from './src/manage';
import BubbleTip from './src/BubbleTip';

BubbleTip.install = Vue => {
    Vue.prototype.$bubbleTip = Manager;
    Vue.bubbleTip = Manager;
    Vue.component(BubbleTip.name, BubbleTip);
};

BubbleTip.Manager = Manager;

export default BubbleTip;
