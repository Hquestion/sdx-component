import ResourceManage from './src/Home';

const routeCfg = [
    {
        path: '/sdxv-resource-manage',
        name: 'SdxvResourceManage',
        component: ResourceManage,
        meta: {
            breadcrumb: '资源管理',
            system: 'manage'
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

export default { ResourceManage, viewRouter };
