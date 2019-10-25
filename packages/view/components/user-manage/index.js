import UserManage from './src/Home';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-user-manage',
        name: 'SdxvUserManage',
        component: UserManage,
        meta: {
            breadcrumb: t('view.userManage.User'),
            system: 'manage',
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

export default { UserManage, viewRouter };
