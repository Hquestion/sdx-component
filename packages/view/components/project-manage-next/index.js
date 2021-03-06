import ProjectManagement from './src/Index.vue';
import ProjectList from './src/ProjectList.vue';
import DataSourceSelect from './src/forms/DataSourceSelect';
import BaseForm from './src/forms/BaseForm';
import TaskManageMent from '../task-management';

import FormView from './src/FormView.vue';
import * as forms from './src/forms';
import ProjectDetail from './src/project-detail/index.vue';
import { t } from '@sdx/utils/src/locale';

ProjectManagement.install = vue => {
    vue.component(ProjectManagement.name, ProjectManagement);
};

const routeCfg = [
    {
        path: '/sdxv-project-manage-next',
        name: 'SdxvProjectManagementNext',
        redirect: '/sdxv-project-manage-next/project-list',
        component: ProjectManagement,
        meta: {
            breadcrumb: t('view.project.project')
        },
        children: [
            {
                path: 'project-list',
                name: 'SdxvProjectListNext',
                component: ProjectList,
                meta: {
                    breadcrumb: t('view.project.project'),
                    isRoot: true,
                    header: t('view.project.projectList')
                },
            },
            {
                path: 'project-detail/:id',
                name: 'ProjectDetailNext',
                component: ProjectDetail,
                meta: {
                    breadcrumb: t('view.project.projectDetail'),
                    header: ''
                }
            },
            {
                path: 'sdxv-project-task-detail/:taskId',
                name: 'SdxvProjectTaskDetail',
                component: TaskManageMent.TaskDetailView,
                props: true,
                meta: {
                    breadcrumb: t('view.project.taskDetail')
                }
            },
            {
                path: 'sdxv-project-task-log/:method/:podId',
                name: 'SdxvProjectTaskLog',
                props: true,
                component: TaskManageMent.TaskLogInfo,
                meta: {
                    breadcrumb: t('view.project.logDetail')
                }
            },
            {
                path: 'createTask/:type/:projectId?',
                component: FormView,
                name: 'CreateTaskNext',
                meta: {
                    breadcrumb: t('view.project.createTask'),
                    header: ''
                },
                props: ({
                    params
                }) => ({
                    formComp: forms[params.type]
                })
            },
            {
                path: 'modifyTask/:type/:taskId/:projectId?',
                component: FormView,
                name: 'EditTaskNext',
                meta: {
                    breadcrumb: t('view.project.editTask'),
                    header: ''
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
