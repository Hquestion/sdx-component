import TaskView from './src/index';
import TaskManagement from './src/TaskManagementView';
import TaskDetailView from './src/task-detail/TaskDetailView';
import { t } from '@sdx/utils/src/locale';

TaskManagement.install = vue => {
    vue.component(TaskManagement.name, TaskManagement);
};

const routeCfg = [{
    path: '/sdxv-task-management',
    name: 'SdxvTaskManagement',
    component: TaskView,
    redirect: '/sdxv-task-management/sdxv-task-list',
    children: [
        {
            path: 'sdxv-task-list',
            name: 'SdxvTaskList',
            component: TaskManagement,
            meta: {
                breadcrumb: t('view.task.TaskManagement'),
                isRoot: true
            },
        },
        {
            path: 'sdxv-task-detail/:taskId',
            name: 'SdxvTaskManagementTaskDetail',
            component: TaskDetailView,
            props: true,
            meta: {
                breadcrumb: t('view.task.TaskDetail')
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

export default { TaskManagement, viewRouter, TaskDetailView };
