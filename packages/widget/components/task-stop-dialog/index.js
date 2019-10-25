import TaskStopDialog from './src/manage';

TaskStopDialog.install = Vue => {
    Vue.SdxwTaskStopDialog = TaskStopDialog;
};

export default TaskStopDialog;