import RoleManage from './src/Index';

// 路由配置

const routeCfg = [
    {
        path: '/sdxv-role-manage',
        name: 'SdxvRoleManage',
        component: RoleManage,
        meta: {
            breadcrumbName: '角色管理',
            system: 'manage'
        }
    }
];


// 注册到应用路由的方法

const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default {RoleManage, viewRouter};
