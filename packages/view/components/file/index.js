import Main from './src/Main';

const routeCfg = [
    {
        path: '/sdxv-file-manage',
        name: 'SdxvFileManage',
        component: Main,
        meta: {
            breadcrumb: '文件管理'
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

export default {
    FileManage: Main,
    viewRouter
};
