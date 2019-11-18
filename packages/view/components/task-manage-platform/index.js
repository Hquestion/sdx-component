import TaskView from './src/index';
import TaskManagePlatform from './src/administrator/Admin';
import { t } from '@sdx/utils/src/locale';

TaskManagePlatform.install = vue => {
    vue.component(TaskManagePlatform.name, TaskManagePlatform);
};

const routeCfg = [{
    path: '/sdxv-task-manage-platform',
    name: 'SdxvTaskManagement',
    component: TaskView,
    redirect: '/sdxv-task-manage-platform/sdxv-task-list',
    children: [
        {
            path: 'sdxv-task-list',
            name: 'SdxvTaskManagePlatform',
            component: TaskManagePlatform,
            meta: {
                breadcrumb: t('view.task.TaskManagement'),
                system: 'manage'
            },
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

export default { TaskManagePlatform, viewRouter};
