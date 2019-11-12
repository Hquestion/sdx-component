
import httpService from '../http-service';

import { TASK_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, DATA_MANAGE_GATEWAY_BASE } from './config';

import readAuths from './config';
import { authWrapper } from './helper';

const taskApi = `${TASK_MANAGE_GATEWAY_BASE}tasks`;

export const getTaskList = authWrapper(function (params) {
    return httpService.get(taskApi, params);
}, [readAuths.PROJECT_TASK_READ, readAuths.SYSTEM_POD_REAL_RESOURCE_READ, readAuths.SYSTEM_GLOBAL_RESOURCE_READ]);
// full 版本任务列表
export function taskList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-profiles`, params);
}
// full 版本执行列表
export function executionList(params) {
    return httpService.get(`${taskApi}executions`, params);
}

export function removeTask(uuid, params) {
    return httpService.remove(`${taskApi}/${uuid}`, params);
}

export function startTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/start`, params);
}

export function stopTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/stop`, params);
}

export function createTask(params) {
    if(params.projectId) {
        // todo 有项目ID调project-manager的接口
    } else {
        // todo 无项目ID直接调Task-Manager的接口
    }
    return httpService.post(taskApi, params);
}

export function getTaskDetail(uuid) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-detail`, {uuid});
}

// 任务编辑的时候不需要聚合
export function getTaskDetailBackEnd(uuid, params) {
    return httpService.get(`${taskApi}/${uuid}`, params);
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
    removeTask,
    startTask,
    stopTask,
    createTask,
    getTaskDetail,
    updateTask,
    getDataSet,
    getTaskDataSource,
    getTaskDetailBackEnd
};
