import MessageBox from './src/manage';

MessageBox.install = Vue => {
    Vue.sdxuMessageBox = MessageBox;
    Vue.prototype.$sdxuMessageBox = MessageBox;
};

export default MessageBox;
