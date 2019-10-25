import TaskRunningLimit from './src/TaskRunningLimit.vue';

TaskRunningLimit.install = vue => {
    vue.component(TaskRunningLimit.name, TaskRunningLimit);
};

export default TaskRunningLimit;
