import ComponentState from './src/index';
import {t} from '../../../utils/src/locale';

ComponentState.install = vue => {
    vue.component(ComponentState.name, ComponentState);
};

const routeCfg = [{
    path: '/sdxv-component-state',
    name: 'SdxvComponentState',
    component: ComponentState,
    meta: {
        breadcrumb: t('routes.compState'),
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

export default { ComponentState, viewRouter };
