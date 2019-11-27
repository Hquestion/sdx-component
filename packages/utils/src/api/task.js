
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
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-execution-profiles`, params);
}
export function executionNativeList(params) {
    return httpService.get(`${TASK_MANAGE_GATEWAY_BASE}executions`, params);
}
// full 版本删task
export function deleteTask(uuid, params) {
    return httpService.remove(`${taskApi}/${uuid}`, params);
}
// full 停止task执行记录   type	必填string任务类型
export function stopExecution(taskUuid, executionUuid, params) {
    return httpService.post(`${taskApi}/${taskUuid}/executions/${executionUuid}/stop`, params);
}
// full 启动task执行记录   type	必填string任务类型
export function startExecution(taskUuid, executionUuid, params) {
    return httpService.post(`${taskApi}/${taskUuid}/executions/${executionUuid}/start`, params);
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

// 根据uuid获取任务信息
export function getTask(uuid, params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}tasks/${uuid}`, params);
}
// 根据taskId和uuid获取任务执行记录信息
export function getExecution(taskId, uuid, params) {
    return httpService.get(`${taskApi}/${taskId}/executions/${uuid}`, params);
}

// 删除执行记录
export function removeExecution(taskId, uuid, params) {
    return httpService.remove(`${taskApi}/${taskId}/executions/${uuid}`, params);
}

// 获取任务详情
export function getTaskDetail(uuid, type) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-detail`, {uuid, type});
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

// 任务资源统计
export function getTaskResourceStatistics(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}/task-resource-profiles`, params);
}

export default {
    getTaskList,
    taskList,
    executionList,
    executionNativeList,
    deleteTask,
    stopExecution,
    startExecution,
    removeTask,
    startTask,
    stopTask,
    createTask,
    getTaskDetail,
    updateTask,
    getDataSet,
    getTaskDataSource,
    getTaskDetailBackEnd,
    getTaskResourceStatistics
};
