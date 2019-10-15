import ResourceManage from './src/Home';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-resource-manage',
        name: 'SdxvResourceManage',
        component: ResourceManage,
        meta: {
            breadcrumb: t('view.resourceManage.ResourceManage'),
            system: 'manage',
            isRoot: true,
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

export default { ResourceManage, viewRouter };
