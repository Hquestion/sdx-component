import ImageManagementList from './src/ImageManagementList.vue';
import ImageFileBuild from './src/image-file-build/Index.vue';
import ImageBasicBuild from './src/image-build-basic/index.vue';
import ImageManagement from './src/Index.vue';
import { t } from '@sdx/utils/src/locale';
const routeCfg = [
    {
        path: '/sdxv-image-manage',
        name: 'SdxvImageManagement',
        component: ImageManagement,
        redirect: '/sdxv-image-manage/imageList/imageTab',
        meta: {
            breadcrumb: t('view.image.ImageManagement')
        },
        children: [
            {
                path: 'imageList/:tab',
                name:'imageList',
                component: ImageManagementList,
                meta: {
                    breadcrumb: t('view.image.ImageManagement'),
                    isRoot: true
                },
            },
            {
                path: 'filebuild',
                name:'filebuild',
                component:  ImageFileBuild,
                meta: {
                    breadcrumb: t('view.image.BuildBasedOnFile'),
                }
            },
            {
                path: 'basicbuild/:imageId',
                name:'basicbuild',
                component:  ImageBasicBuild,
                meta: {
                    breadcrumb: t('view.image.BuildBaseThis'),
                },
                props: true
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
