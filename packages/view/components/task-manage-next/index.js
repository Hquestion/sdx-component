import TaskView from './src/index';
import TaskManageAdmin from './src/administrator/Admin';
import TaskDetailView from './src/task-detail/TaskDetailView';
import TaskLogInfo from './src/task-detail/common/LogInfo';
import { t } from '@sdx/utils/src/locale';

TaskView.install = vue => {
    vue.component(TaskView.name, TaskView);
};

const routeCfg = [{
    path: '/sdxv-task-manage-next',
    name: 'SdxvTaskManagement',
    component: TaskView,
    redirect: '/sdxv-task-manage-next/sdxv-task-admin',
    children: [
        {
            path: 'sdxv-task-admin',
            name: 'SdxvTaskAdmin',
            component: TaskManageAdmin,
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

export default { TaskManageAdmin, viewRouter, TaskDetailView, TaskLogInfo };
