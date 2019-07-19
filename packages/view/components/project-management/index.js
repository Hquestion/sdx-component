import ProjectManagement from './src/Index.vue';
import ProjectList from './src/ProjectList.vue';
import DataSourceSelect from './src/forms/DataSourceSelect';
import BaseForm from './src/forms/BaseForm';
import { TaskDetailView, TaskLogInfo} from '../task-management';

import FormView from './src/FormView.vue';
import * as forms from './src/forms';
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
                component: ProjectList,
                meta: {
                    breadcrumb: '项目',
                    isRoot: true
                },
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
                path: 'sdxv-project-task-detail/:taskId',
                name: 'SdxvProjectTaskDetail',
                component: TaskDetailView,
                props: true,
                meta: {
                    breadcrumb: '任务详情'
                }
            },
            {
                path: 'sdxv-project-task-log/:method/:podId',
                name: 'SdxvProjectTaskLog',
                props: true,
                component: TaskLogInfo,
                meta: {
                    breadcrumb: '日志详情'
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

export default { ProjectManagement, DataSourceSelect, BaseForm, viewRouter };
