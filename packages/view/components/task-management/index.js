import TaskView from './src/index';
import TaskManagement from './src/TaskManagement';
import TaskDetailView from './src/task-detail/TaskDetailView';
import TaskLogInfo from './src/task-detail/common/LogInfo';
import { t } from '@sdx/utils/src/locale';

TaskManagement.install = vue => {
    vue.component(TaskManagement.name, TaskManagement);
};

const routeCfg = [{
    path: '/sdxv-task-management',
    name: 'SdxvTaskManagement',
    component: TaskView,
    redirect: '/sdxv-task-management/sdxv-task-list',
    meta: {
        breadcrumb: t('view.task.TaskManagement')
    },
    children: [
        {
            path: 'sdxv-task-list',
            name: 'SdxvTaskList',
            component: TaskManagement,
            meta: {
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
        },
        {
            path: 'sdxv-task-log/:method/:podName',
            name: 'SdxvTaskManagementTaskLog',
            props: true,
            component: TaskLogInfo,
            meta: {
                breadcrumb: t('view.image.LogDetail')
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
