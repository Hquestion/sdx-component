import ProjectManagement from './src/ProjectManagement.vue';

ProjectManagement.install = vue => {
    vue.component(ProjectManagement.name, ProjectManagement);
};

const routeCfg = [
    {
        path: 'project-management',
        name: 'ProjectManagement',
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
