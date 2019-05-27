import LazyList from './src/LazyList';

LazyList.install = Vue => {
    Vue.component(LazyList.name, LazyList);
};

export default LazyList;
