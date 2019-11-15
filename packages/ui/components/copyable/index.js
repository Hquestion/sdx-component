import Copyable from './src/Copyable';

Copyable.install = Vue => {
    Vue.component(Copyable.name, Copyable);
};

export default Copyable;
