import Skyflow from './src/Index.vue';
import SkyflowList from './src/SkyflowList.vue';
import RunningInfo from './src/running-info/Index.vue';
import { t } from '@sdx/utils/src/locale';

Skyflow.install = vue => {
    vue.component(Skyflow.name, Skyflow);
};

const routeCfg = [
    {
        path: '/sdxv-skyflow-next',
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
                    breadcrumb: t('view.skyflow.runningInfo'),
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
