import Main from './src/Main';
import { t } from '@sdx/utils/src/locale';

const routeCfg = [
    {
        path: '/sdxv-file-manage',
        name: 'SdxvFileManage',
        component: Main,
        meta: {
            breadcrumb: t('view.file.FileManage'),
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

export default {
    FileManage: Main,
    viewRouter
};
