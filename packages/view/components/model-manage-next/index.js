import ModelManage from './src/Index.vue';
import ModelService from './src/model-service/Index.vue';

import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-model-manage-next',
        name: 'SdxvModelManage',
        component: ModelManage,
        redirect: '/sdxv-model-manage-next/modelService',
        meta: {
            breadcrumb: t('view.model.model')
        },
        children: [
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
