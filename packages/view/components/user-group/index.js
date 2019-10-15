import UserGroupManage from './src/UserGroup';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-user-group',
        name: 'SdxvUserGroupManage',
        component: UserGroupManage,
        meta: {
            breadcrumb: t('view.userManage.UserGroup'),
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

export default { UserGroupManage, viewRouter };
