import ProjectManagement from './src/Index.vue';
import ProjectList from './src/ProjectList.vue';
import LogInfo from './src/task-detail/common/LogInfo';

import FormView from './src/FormView.vue';
import * as forms from './src/forms';
import * as details from './src/task-detail';
import ProjectDetail from './src/project-detail/index.vue';

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
            },
            {
                path: 'createTask/:type/:projectId',
                component: FormView,
                name: 'CreateTask',
                meta: {
                    breadcrumb: '新建任务'
                },
                props: ({
                    params
                }) => ({
                    formComp: forms[params.type]
                })
            },
            {
                path: 'modifyTask/:type/:taskId/:projectId',
                component: FormView,
                name: 'EditTask',
                meta: {
                    breadcrumb: '编辑任务'
                },
                props: ({
                    params
                }) => ({
                    formComp: forms[params.type]
                })
            }, {
                path: 'taskInfo/:type/:taskId',
                name: 'TaskInfo',
                component: FormView,
                meta: {
                    breadcrumb: '任务详情'
                },
                props: ({
                    params
                }) => ({
                    formComp: details[params.type]
                })
            },{
                path: 'logInfo/:taskId/:method',
                component: LogInfo,
                meta: {
                    name: '日志详情'
                },
                props: true
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
