
import httpService from '../http-service';

import { PROJECT_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, DATA_MANAGE_GATEWAY_BASE} from './config';

import readAuths from './config';
import { authWrapper } from './helper';

const projectApi = `${PROJECT_MANAGE_GATEWAY_BASE}projects`;

const taskApi = `${PROJECT_MANAGE_GATEWAY_BASE}tasks`;

// 聚合拿到project
// export function getProjectList(params) {
//     return httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles`, params);
// }
export const getProjectList = authWrapper(params =>  httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles`, params),
    readAuths.PROJECT_PROJECT_READ
);
export const getProjectTemplates = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles`, params);
}, readAuths.PROJECT_TEMPLATE_PROJECT_READ);

export const getSelfCreatedProjects = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles`, params);
}, readAuths.PROJECT_PROJECT_READ);

export const getSharingProjects = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles`, params);
}, readAuths.PROJECT_COOPERATE_PROJECT_READ);

export const getTaskList = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-profiles`, params);
}, [readAuths.PROJECT_TASK_READ, readAuths.SYSTEM_POD_REAL_RESOURCE_READ, readAuths.SYSTEM_GLOBAL_RESOURCE_READ]);

export function getProjectTasks(uuid, params) {
    return httpService.get(`${projectApi}/${uuid}/tasks`, params);
}

export function createProjectTask(uuid, params) {
    return httpService.post(`${projectApi}/${uuid}/tasks`, params);
}

export function removeProjectTask(uuid, taskId) {
    return httpService.remove(`${projectApi}/${uuid}/tasks/${taskId}`);
}

export function getProjectDetail(uuid, mock) {
    if (mock) {
        return Promise.resolve({
            name: '风电项目'
        });
    } else {
        return httpService.get(`${projectApi}/${uuid}`);
    }
}

export function createProject(params) {
    return httpService.post(projectApi, params);
}

export function updateProject(uuid, params) {
    return httpService.patch(`${projectApi}/${uuid}`, params);
}

export function removeProject(uuid) {
    return httpService.remove(`${projectApi}/${uuid}`);
}

export function removeTask(uuid) {
    return httpService.remove(`${taskApi}/${uuid}`);
}

export function startTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/start`, params);
}

export function stopTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/stop`, params);
}

export function createTask(params) {
    return httpService.post(taskApi, params);
}

export function getTaskDetail(uuid) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-detail`, {uuid});
}
// 任务编辑的时候不需要聚合
export function getTaskDetailBackEnd(uuid) {
    return httpService.get(`${taskApi}/${uuid}`);
}
export function updateTask(uuid,params) {
    return httpService.patch(`${taskApi}/${uuid}`, params);
}

// 数据集列表
export function getDataSet(params) {
    return httpService.get(`${DATA_MANAGE_GATEWAY_BASE}dataset/options`, params);
}
// 数据源列表
export function getTaskDataSource(params) {
    return httpService.get(`${DATA_MANAGE_GATEWAY_BASE}datasource/taskOptions`, params);
}

export default {
    getTaskList,
    getProjectList,
    getProjectDetail,
    createProject,
    updateProject,
    removeProject,
    removeTask,
    startTask,
    stopTask,
    createTask,
    getTaskDetail,
    updateTask,
    getDataSet,
    getTaskDataSource,
    getTaskDetailBackEnd,
    getProjectTasks,
    createProjectTask,
    removeProjectTask
};
