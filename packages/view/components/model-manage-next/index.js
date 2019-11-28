import ModelManage from './src/Index.vue';
import ModelService from './src/model-service/Index.vue';
import ModelList from './src/model-list/Index.vue';
import ModelDetail from './src/model-detail/Index.vue';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-model-manage-next',
        name: 'SdxvModelManage',
        component: ModelManage,
        meta: {
            isRoot: true
        },
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelList,
                meta: {
                    breadcrumb: t('view.model.model'),
                    header: '模型仓库'
                },
                children: [
                    {
                        path: ':modelId',
                        name:'modelDetail',
                        component: ModelDetail,
                        meta: {
                            breadcrumb: t('view.model.ModelDetail'),
                        }
                    },
                ]
            },
            {
                path: 'modelService',
                name:'modelService',
                component: ModelService,
                meta: {
                    breadcrumb: t('view.model.serviceList'),
                }
            },
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
