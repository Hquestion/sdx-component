import ComponentState from './src/index';

ComponentState.install = vue => {
    vue.component(ComponentState.name, ComponentState);
};

const routeCfg = [{
    path: '/sdxv-component-state',
    name: 'SdxvComponentState',
    component: ComponentState,
    meta: {
        breadcrumb: '组件状态',
        system: 'manage'
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