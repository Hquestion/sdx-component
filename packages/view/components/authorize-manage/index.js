import AuthorizeManage from './src/Index';
import {t} from '../../../utils/src/locale';

// 路由配置

const routeCfg = [
    {
        path: '/sdxv-authorize-manage',
        name: 'SdxvAuthorizeManage',
        component: AuthorizeManage,
        meta: {
            breadcrumb: t('routes.authorize'),
            isRoot: true,
            system: 'manage'
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

export default {AuthorizeManage, viewRouter};
