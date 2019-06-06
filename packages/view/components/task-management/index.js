import TaskManagement from './src/TaskManagement';

TaskManagement.install = vue => {
    vue.component(TaskManagement.name, TaskManagement);
};

const routeCfg = [{
    path: '/sdxv-task-management',
    name: 'SdxvTaskManagement',
    component: TaskManagement,
    meta: {
        breadcrumb: '任务管理'
    }
}];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { TaskManagement, viewRouter };