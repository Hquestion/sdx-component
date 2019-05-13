import UserManage from './src/Home';

const routeCfg = [
    {
        path: '/sdxv-user-manage',
        name: 'SdxvUserManage',
        component: UserManage,
        meta: {
            breadcrumb: '用户',
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

export default { UserManage, viewRouter };
