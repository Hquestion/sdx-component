import Skyflow from './src/Index.vue';
import SkyflowList from './src/SkyflowList.vue';
import RunningInfo from './src/running-info/Index.vue';

Skyflow.install = vue => {
    vue.component(Skyflow.name, Skyflow);
};

const routeCfg = [
    {
        path: '/sdxv-skyflow',
        name: 'SdxvSkyflow',
        redirect: '/sdxv-skyflow/skyflow-list',
        component: Skyflow,
        meta: {
            breadcrumb: 'Skyflow'
        },
        children: [
            {
                path: 'skyflow-list',
                name: 'SdxvSkyflowList',
                component: SkyflowList,
                meta: {
                    breadcrumb: 'SkyFlow',
                    isRoot: true
                },
            },
            {
                path: 'running-info/:id',
                name: 'SdxvRunningInfo',
                component: RunningInfo,
                meta: {
                    breadcrumb: '运行记录',
                    isRoot: false
                },
            }
        ]
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { Skyflow, viewRouter };
