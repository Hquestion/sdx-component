import SdxvPrivilege from './src/Privilege';

const routeCfg = [{
    path: '/sdxv-privilege',
    name: 'SdxvPrivilege',
    component: SdxvPrivilege,
    meta: {

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
