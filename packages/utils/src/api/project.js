// 等调试完改
import httpService from '@sdx/utils/lib/http-service';

import { PROJECT_MANAGE_GATWAY_BASE } from './config';

const taskApi = '/api/v1/tasks/';

export function getProjectList(params) {
    return httpService.get(PROJECT_MANAGE_GATWAY_BASE, params);
}

export function getTaskList(params) {
    return httpService.get(taskApi, params);
}

export function getProjectDetail(uuid) {
    return httpService.get(PROJECT_MANAGE_GATWAY_BASE + uuid);
}

export function createProject(params) {
    return httpService.post(PROJECT_MANAGE_GATWAY_BASE, params);
}

export function updateProject(uuid, params) {
    return httpService.patch(PROJECT_MANAGE_GATWAY_BASE + uuid, params);
}

export function removeProject(uuid) {
    return httpService.remove(PROJECT_MANAGE_GATWAY_BASE + uuid);
}

export function removeTask(uuid) {
    return httpService.remove(taskApi + uuid);
}

export function startTask(uuid, params) {
    return httpService.post(taskApi + uuid + '/start', params);
}

export function stopTask(uuid, params) {
    return httpService.post(taskApi + uuid + '/stop', params);
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
