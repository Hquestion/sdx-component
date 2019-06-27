import ResourceStatistics from './src/index';
import ResourceStatisticsIndex from './src/ResourceStatistics';
import AllTaskList from './src/AllTaskList';
import UserResourceList from './src/UserResourceList';

ResourceStatistics.install = vue => {
    vue.component(ResourceStatistics.name, ResourceStatistics);
};

const routeCfg = [{
    path: '/sdxv-resource-statistics',
    name: 'SdxvResourceStatistics',
    redirect: '/sdxv-resource-statistics/index',
    component: ResourceStatistics,
    meta: {
        breadcrumb: '资源统计',
        system: 'manage'
    },
    children: [{
        path: 'index',
        name: 'index',
        component: ResourceStatisticsIndex,
        meta: {
            system: 'manage'
        }
    }, {
        path: 'all-task-list',
        name: 'SdxvAllTaskList',
        component: AllTaskList,
        meta: {
            breadcrumb: '全部任务列表',
            system: 'manage'
        }
    }, {
        path: 'user-resource-list',
        name: 'SdxvUserResourceList',
        component: UserResourceList,
        meta: {
            breadcrumb: '全部用户资源统计',
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