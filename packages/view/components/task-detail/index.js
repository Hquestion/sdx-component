import * as TaskDetails from './src/';
import DetailView from './src/DetailView';

const routeCfg = [{
    path: '/task-detail/:type/:taskId',
    name: 'TaskDetail',
    component: DetailView,
    meta: {
        breadcrumb: '任务详情'
    },
    props: ({
        params
    }) => ({
        comp: TaskDetails[params.type]
    })
}];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { DetailView, viewRouter };