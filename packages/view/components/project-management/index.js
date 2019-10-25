import ProjectManagement from './src/Index.vue';
import ProjectList from './src/ProjectList.vue';
import DataSourceSelect from './src/forms/DataSourceSelect';
import BaseForm from './src/forms/BaseForm';
import { TaskDetailView, TaskLogInfo} from '../task-management';

import FormView from './src/FormView.vue';
import * as forms from './src/forms';
import ProjectDetail from './src/project-detail/index.vue';
import { t } from '@sdx/utils/src/locale';

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
            breadcrumb: t('view.project.project')
        },
        children: [
            {
                path: 'project-list',
                name: 'SdxvProjectList',
                component: ProjectList,
                meta: {
                    breadcrumb: t('view.project.project'),
                    isRoot: true
                },
            },
            {
                path: 'project-detail/:id',
                name: 'ProjectDetail',
                component: ProjectDetail,
                meta: {
                    breadcrumb: t('view.project.projectDetail')
                }
            },
            {
                path: 'sdxv-project-task-detail/:taskId',
                name: 'SdxvProjectTaskDetail',
                component: TaskDetailView,
                props: true,
                meta: {
                    breadcrumb: t('view.project.taskDetail')
                }
            },
            {
                path: 'sdxv-project-task-log/:method/:podId',
                name: 'SdxvProjectTaskLog',
                props: true,
                component: TaskLogInfo,
                meta: {
                    breadcrumb: t('view.project.logDetail')
                }
            },
            {
                path: 'createTask/:type/:projectId',
                component: FormView,
                name: 'CreateTask',
                meta: {
                    breadcrumb: t('view.project.createTask')
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
                    breadcrumb: t('view.project.editTask')
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
