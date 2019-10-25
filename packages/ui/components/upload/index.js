import Upload from './src';
import UploadList from './src/upload-list';

Upload.UploadList = UploadList;

Upload.install = function(Vue) {
    Vue.component(Upload.name, Upload);
};

export default Upload;
