import ImageManagementList from './src/ImageManagementList.vue';
import ImageFileBuild from './src/image-file-build/Index.vue';
import ImageManagement from './src/Index.vue';

const routeCfg = [
    {
        path: '/sdxv-image-manage',
        name: 'SdxvImageManagement',
        component: ImageManagement,
        redirect: '/sdxv-image-manage/imageList',
        meta: {
            breadcrumb: '镜像管理'
        },
        children: [
            {
                path: 'imageList',
                name:'imageList',
                component: ImageManagementList,
            },
            {
                path: 'filebuild',
                name:'filebuild',
                component:  ImageFileBuild,
                meta: {
                    breadcrumb: '基于文件构建',
                }
            }]
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routes, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { ImageManagement, viewRouter };
