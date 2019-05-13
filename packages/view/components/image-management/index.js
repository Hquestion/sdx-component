import ImageManagement from './src/Index.vue';

ImageManagement.install = vue => {
    vue.component(ImageManagement.name, ImageManagement);
};

const routeCfg = [
    {
        path: 'sdxv-image-manage',
        name: 'SdxvImageManagement',
        component: ImageManagement,
        meta: {
            breadcrumb: '镜像管理'
        }
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { ImageManagement, viewRouter };
