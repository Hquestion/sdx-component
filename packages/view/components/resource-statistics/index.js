import ResourceStatistics from './src/index';
import ResourceStatisticsIndex from './src/ResourceStatistics';
import AllTaskList from './src/AllTaskList';
import UserResourceList from './src/UserResourceList';
import { t } from '@sdx/utils/src/locale';

ResourceStatistics.install = vue => {
    vue.component(ResourceStatistics.name, ResourceStatistics);
};

const routeCfg = [{
    path: '/sdxv-resource-statistics',
    name: 'SdxvResourceStatistics',
    redirect: '/sdxv-resource-statistics/index',
    component: ResourceStatistics,
    meta: {
        system: 'manage'
    },
    children: [{
        path: 'index',
        name: 'index',
        component: ResourceStatisticsIndex,
        meta: {
            system: 'manage',
            breadcrumb: t('view.monitor.resourceStatistic.ResourceStatistics'),
            isRoot: true,
        }
    }, {
        path: 'all-task-list',
        name: 'SdxvAllTaskList',
        component: AllTaskList,
        meta: {
            breadcrumb: t('view.monitor.resourceStatistic.AllTaskList'),
            system: 'manage'
        }
    }, {
        path: 'user-resource-list',
        name: 'SdxvUserResourceList',
        component: UserResourceList,
        meta: {
            breadcrumb: t('view.monitor.resourceStatistic.AllUserResourceStatistics'),
            system: 'manage'
        }
    }]
}];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { ResourceStatistics, viewRouter };
