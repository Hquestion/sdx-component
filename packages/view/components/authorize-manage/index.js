import AuthorizeManage from './src/Index';

// 路由配置

const routeCfg = [
    {
        path: 'role-manage',
        name: 'RoleManage',
        component: AuthorizeManage,
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

export default {AuthorizeManage, viewRouter};
