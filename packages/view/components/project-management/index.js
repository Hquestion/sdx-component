import ProjectManagement from './src/Index.vue';

ProjectManagement.install = vue => {
    vue.component(ProjectManagement.name, ProjectManagement);
};

const routeCfg = [
    {
        path: '/sdxv-project-manage',
        name: 'SdxvProjectManagement',
        component: ProjectManagement,
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
