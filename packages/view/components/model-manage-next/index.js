import ModelManage from './src/Index.vue';
import ModelService from './src/model-service/Index.vue';
import ModelList from './src/model-list/Index.vue';

import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-model-manage-next',
        name: 'SdxvModelManage',
        component: ModelManage,
        redirect: '/sdxv-model-manage-next/modelList',
        meta: {
            breadcrumb: t('view.model.model'),
        },
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelList,
                meta: {
                    breadcrumb: t('view.model.model'),
                    isRoot: true
                }
            },
            {
                path: 'modelService',
                name:'modelService',
                component: ModelService,
                meta: {
                    breadcrumb: t('view.model.model'),
                    isRoot: true
                }
            }
        ]
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routes, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { ModelManage, viewRouter };
