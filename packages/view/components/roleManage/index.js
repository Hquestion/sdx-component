import RoleManage from './src/index';

// 路由配置

const routeCfg = [
    {
        path: 'role-manage',
        name: 'RoleManage',
        component: RoleManage,
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
