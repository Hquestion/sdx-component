import ModelManageList from './src/ModelManageList.vue';
import ModelManage from './src/Index.vue';

const routeCfg = [
    {
        path: '/sdxv-model-manage',
        name: 'SdxvModelManage',
        component: ModelManage,
        redirect: '/sdxv-model-manage/modelList',
        meta: {
            breadcrumb: '模型管理'
        },
        children: [
            {
                path: 'modelList',
                name:'modelList',
                component: ModelManageList,
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
