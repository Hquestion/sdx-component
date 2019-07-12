import TaskView from './src/index';
import TaskManagement from './src/TaskManagement';
import TaskDetailView from './src/task-detail/TaskDetailView';
import TaskLogInfo from './src/task-detail/common/LogInfo';

TaskManagement.install = vue => {
    vue.component(TaskManagement.name, TaskManagement);
};

const routeCfg = [{
    path: '/sdxv-task-management',
    name: 'SdxvTaskManagement',
    component: TaskView,
    redirect: '/sdxv-task-management/sdxv-task-list',
    meta: {
        breadcrumb: '任务管理'
    },
    children: [
        {
            path: 'sdxv-task-list',
            name: 'SdxvTaskList',
            component: TaskManagement
        },
        {
            path: 'sdxv-task-detail/:taskId',
            name: 'SdxvTaskManagementTaskDetail',
            component: TaskDetailView,
            props: true,
            meta: {
                breadcrumb: '任务详情'
            }
        },
        {
            path: 'sdxv-task-log/:method/:podId',
            name: 'SdxvTaskManagementTaskLog',
            props: true,
            component: TaskLogInfo,
            meta: {
                breadcrumb: '日志详情'
            }
        }
    ]
}];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { TaskManagement, viewRouter, TaskDetailView, TaskLogInfo };
