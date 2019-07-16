import PodLog from './src/PodLog';

PodLog.install = vue => {
    vue.component(PodLog.name, PodLog);
};

export default PodLog;