import DatasetView from './src/DatasetView';
import DatasetList from './src/DatasetList';
import { t } from '@sdx/utils/src/locale';
import DataPreview from './src/data-preview/Index.vue';
DatasetList.install = vue => {
    vue.component(DatasetList.name, DatasetList);
};

const routeCfg = [
    {
        path: '/sdxv-data-management',
        name: 'SdxvDataManagement',
        redirect: '/sdxv-data-management/dataset-list',
        component: DatasetView,
        children: [
            {
                path: 'dataset-list',
                name: 'SdxvDatasetList',
                component: DatasetList,
                meta: {
                    breadcrumb: t('view.dataManagement.Dataset'),
                    isRoot: true
                }
            },
            {
                path: 'datasetView/:uuid',
                name: 'datasetView',
                component: DataPreview,
                meta: {
                    breadcrumb: t('view.dataManagement.Dataset_Preview'),
                    header: t('view.dataManagement.Dataset_Preview')
                }
            }
        ]
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { DatasetList, viewRouter };