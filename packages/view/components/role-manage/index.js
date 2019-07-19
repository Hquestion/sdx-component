import RoleManage from './src/Index';

// 路由配置

const routeCfg = [
    {
        path: '/sdxv-role-manage',
        name: 'SdxvRoleManage',
        component: RoleManage,
        meta: {
            breadcrumb: '角色',
            system: 'manage',
            isRoot: true
        }
    }
];


// 注册到应用路由的方法

const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routes, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default {RoleManage, viewRouter};
