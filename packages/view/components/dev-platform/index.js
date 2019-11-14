import DevPlatform from './src/Index';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-dev-platform',
        name: 'SdxvDevPlatform',
        component: DevPlatform,
        meta: {
            breadcrumb: '开发工作台',
            isRoot: true
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

export default { DevPlatform, viewRouter };
