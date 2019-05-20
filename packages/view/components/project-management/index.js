import ProjectManagement from './src/Index.vue';
import ProjectList from './src/ProjectList.vue';
import ProjectDetail from './src/ProjectDetail.vue';

ProjectManagement.install = vue => {
    vue.component(ProjectManagement.name, ProjectManagement);
};

const routeCfg = [
    {
        path: '/sdxv-project-manage',
        name: 'SdxvProjectManagement',
        redirect: '/sdxv-project-manage/project-list',
        component: ProjectManagement,
        meta: {
            breadcrumb: '项目'
        },
        children: [
            {
                path: 'project-list',
                name: 'SdxvProjectList',
                component: ProjectList
            },
            {
                path: 'project-detail/:id',
                name: 'ProjectDetail',
                component: ProjectDetail,
                meta: {
                    breadcrumb: '项目详情'
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

export default { ProjectManagement, viewRouter };
