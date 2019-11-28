import ModelManage from './src/Index.vue';
import ModelService from './src/model-service/Index.vue';
import ModelList from './src/model-list/Index.vue';
import ModelDetail from './src/model-detail/Index.vue';
import ApiDetail from './src/api-detail/ApiDetail';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-model-manage-next',
        name: 'SdxvModelManage',
        component: ModelManage,
        meta: {
            breadcrumb: t('view.model.model')
        },
        redirect: '/sdxv-model-manage-next/modelList',
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelList,
                meta: {
                    breadcrumb: t('view.model.model'),
                    header: t('view.model.ModelRepo'),
                    isRoot: true
                }
            },
            {
                path: 'modelDetail/:modelId',
                name:'modelDetail',
                component: ModelDetail,
                meta: {
                    breadcrumb: t('view.model.ModelDetail'),
                }
            }
        ]
    },
    {
        path: '/sdxv-model-manage-service',
        name: 'modelService',
        component: ModelService,
        meta: {
            breadcrumb: t('view.model.serviceList'),
            isRoot: true
        }
    },
    {
        path: '/api-detail/:serviceId',
        name: 'APIDetail',
        component: ApiDetail,
        props: true,
        meta: {
            name: t('view.model.apiDetail'),
            breadcrumb: t('view.model.apiDetail'),
            header: t('view.model.apiDetail')
        }
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
