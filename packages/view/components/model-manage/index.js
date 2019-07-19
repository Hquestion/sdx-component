import ModelManageList from './src/ModelManageList.vue';
import ModelManage from './src/Index.vue';
import VersionManage from './src/version-list-table/index.vue';
import VersionList from './src/version-list-table/VersionList.vue';
import VersionDetail from './src/version-list-table/VersionDetail.vue';

const routeCfg = [
    {
        path: '/sdxv-model-manage',
        name: 'SdxvModelManage',
        component: ModelManage,
        redirect: '/sdxv-model-manage/modelList',
        meta: {
            breadcrumb: '模型'
        },
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelManageList,
                meta: {
                    breadcrumb: '模型',
                    isRoot: true
                }
            },
            {
                path: 'versionList',
                name: 'versionManage',
                redirect: 'versionList/:modelId',
                component: VersionManage,
                meta: {
                    breadcrumb: '模型版本列表'
                },
                children: [
                    {
                        path: ':modelId',
                        name: 'versionList',
                        component: VersionList,
                        meta: {
                            breadcrumb: '模型版本列表'
                        },
                    },
                    {
                        path: ':modelId/:versionId',
                        name: 'versionDetail',
                        component: VersionDetail,
                        meta: {
                            breadcrumb: '模型版本详情'
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
