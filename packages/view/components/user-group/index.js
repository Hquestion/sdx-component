import UserGroupManage from './src/UserGroup';

const routeCfg = [
    {
        path: '/sdxv-user-group',
        name: 'SdxvUserGroupManage',
        component: UserGroupManage,
        meta: {
            breadcrumb: '用户组',
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

export default { UserGroupManage, viewRouter };
