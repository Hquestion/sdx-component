import SdxvPrivilege from './src/Privilege';
import { t } from '@sdx/utils/src/locale';
const routeCfg = [{
    path: '/sdxv-privilege',
    name: 'SdxvPrivilege',
    component: SdxvPrivilege,
    meta: {
        breadcrumb: t('view.authority.Authority'),
        system: 'manage',
        isRoot: true,
    }
}];


const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { SdxvPrivilege, viewRouter };
