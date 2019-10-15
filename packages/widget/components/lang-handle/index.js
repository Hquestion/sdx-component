import langHandle from './src/langHandle';

langHandle.install = Vue => {
    Vue.mixin(langHandle);
};

export default langHandle;
