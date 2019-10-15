import FileSelectTree from './src/FileSelectTree';
import FileSelectMix from './src/FileSelectMix';
import FileSelectSearch from './src/FileSelectSearch';
import FileSelectPop from './src/FileSelectPop';
import FileSelectMain from './src/FileSelectMain';

const FileSelect = {
    FileSelectTree,
    FileSelectMix,
    FileSelectSearch,
    FileSelectPop,
    FileSelectMain,
    install(Vue) {
        Vue.component(FileSelectTree.name, FileSelectTree);
        Vue.component(FileSelectMix.name, FileSelectMix);
        Vue.component(FileSelectSearch.name, FileSelectSearch);
        Vue.component(FileSelectPop.name, FileSelectPop);
        Vue.component(FileSelectMain.name, FileSelectMain);
    }
};

export default FileSelect;
