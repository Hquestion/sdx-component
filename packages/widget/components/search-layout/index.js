import SearchLayout from './src/Search';
import SearchItem from './src/SearchItem';


const _SearchLayout = {
    SearchLayout,
    SearchItem,
    install(Vue) {
        Vue.component(SearchLayout.name, SearchLayout);
        Vue.component(SearchItem.name, SearchItem);
    }
};

export default _SearchLayout;