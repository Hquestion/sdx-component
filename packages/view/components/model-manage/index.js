import ModelManageList from './src/ModelManageList.vue';
import ModelManage from './src/Index.vue';
import VersionManage from './src/version-list-table/index.vue';
import VersionList from './src/version-list-table/VersionList.vue';
import VersionDetail from './src/version-list-table/VersionDetail.vue';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-model-manage',
        name: 'SdxvModelManage',
        component: ModelManage,
        redirect: '/sdxv-model-manage/modelList',
        meta: {
            breadcrumb: t('view.model.model')
        },
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelManageList,
                meta: {
                    breadcrumb: t('view.model.model'),
                    isRoot: true
                }
            },
            {
                path: 'versionList',
                name: 'versionManage',
                redirect: 'versionList/:modelId',
                component: VersionManage,
                meta: {
                    breadcrumb: t('view.model.versionList')
                },
                children: [
                    {
                        path: ':modelId',
                        name: 'versionList',
                        component: VersionList,
                        meta: {
                            breadcrumb: t('view.model.versionList')
                        },
                    },
                    {
                        path: ':modelId/:versionId',
                        name: 'versionDetail',
                        component: VersionDetail,
                        meta: {
                            breadcrumb: t('view.model.modelVersionDetail')
                        }
                    }
                ]
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
