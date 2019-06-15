// 等调试完改
import httpService from '@sdx/utils/lib/http-service';

import { PROJECT_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE} from './config';

const projectApi = `${PROJECT_MANAGE_GATEWAY_BASE}projects/`;

const taskApi = `${PROJECT_MANAGE_GATEWAY_BASE}tasks/`;

// 聚合拿到project
export function getProjectList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}project-profiles/`, params);
}

export function getTaskList(params) {
    return httpService.get(taskApi, params);
}

export function getProjectDetail(uuid) {
    return httpService.get(projectApi + uuid);
}

export function createProject(params) {
    return httpService.post(projectApi, params);
}

export function updateProject(uuid, params) {
    return httpService.patch(projectApi + uuid, params);
}

export function removeProject(uuid) {
    return httpService.remove(projectApi + uuid);
}

export function removeTask(uuid) {
    return httpService.remove(taskApi + uuid);
}

export function startTask(uuid) {
    return httpService.post(taskApi + uuid + '/start');
}

export function stopTask(uuid) {
    return httpService.post(taskApi + uuid + '/stop');
}
export function createTask(params) {
    return httpService.post(taskApi, params);
}
export function getTaskDetail(uuid) {
    return httpService.get(taskApi + uuid);
}
export function updateTask(uuid,params) {
    return httpService.patch(taskApi + uuid, params);
}

// 数据集列表
export function getDataSet(params) {
    return httpService.get('/v2/dataset/options/', params);
}
// 数据源列表
export function getTaskDataSource(params) {
    return httpService.get('/v2/datasource/taskOptions/', params);
}

export default {
    getProjectList,
    getProjectDetail,
    createProject,
    updateProject,
    removeProject,
    getTaskList,
    removeTask,
    startTask,
    stopTask,
    createTask,
    getTaskDetail,
    updateTask,
    getDataSet,
    getTaskDataSource
};
