import Main from './src/Main';
import SkyNotebook from './src/widgets/notebook/SkyNotebook';

const routeCfg = [
    {
        path: '/sdxv-skyide/:taskId',
        name: 'SdxvSkyIDE',
        component: Main,
        meta: {
            system: 'user',
            isRoot: true
        },
        props: true
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

export default {
    Main,
    SkyNotebook,
    viewRouter
};
