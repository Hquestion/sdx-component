import httpService from '../http-service';
import { SKYFLOW_MANAGE_GATEWAY_BASE } from './config';

const skyflowApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflows`;

const skyflowExecuteApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_executes`;

const skyflowCrontabApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontabs`;

export function getSkyflowList(params) {
    return httpService.get(skyflowApi, params);
}

export function getSkyflowTemplates() {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_templates`);
}

export function createWorkflow(params) {
    return httpService.post(skyflowApi, params);
}

export function updateWorkflow(uuid, params) {
    return httpService.patch(`${skyflowApi}/${uuid}`, params);
}

export function removeWorkflow(uuid) {
    return httpService.remove(`${skyflowApi}/${uuid}`);
}

export function getSkyflowInfo(uuid) {
    return httpService.get(`${skyflowApi}/${uuid}`);
}

export function getGeneralRunningInfo(params) {
    return httpService.get(skyflowExecuteApi, params);
}

export function getTimerRunningInfo(params) {
    return httpService.get(skyflowCrontabApi, params);
}

export function getTimerSubRunningInfo(params) {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs`, params);
}

export function shutdownGeneralRunningTask(uuid) {
    return httpService.post(skyflowExecuteApi + uuid + '/stop');
}

export function removeGeneralRunningTask(uuid) {
    return httpService.remove(`${skyflowExecuteApi}/${uuid}`);
}

export function removeTimerRunningSubTask(uuid) {
    return httpService.remove(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs/${uuid}`);
}

export function removeTimerRunningTask(uuid) {
    return httpService.remove(`${skyflowCrontabApi}/${uuid}`);
}

export function shutdownTimerRunningTask(uuid) {
    return httpService.post(`${skyflowCrontabApi}/${uuid}/deactivate`);
}

export function startTimerRunningTask(uuid) {
    return httpService.post(`${skyflowCrontabApi}/${uuid}/activate`);
}

export function updateTimerRunningTask(uuid, params) {
    return httpService.patch(`${skyflowCrontabApi}/${uuid}`, params);
}

export default {
    getSkyflowList,
    getSkyflowTemplates,
    updateWorkflow,
    createWorkflow,
    removeWorkflow,
    getSkyflowInfo,
    getGeneralRunningInfo,
    shutdownGeneralRunningTask,
    removeGeneralRunningTask,
    getTimerRunningInfo,
    getTimerSubRunningInfo,
    removeTimerRunningSubTask,
    removeTimerRunningTask,
    startTimerRunningTask,
    updateTimerRunningTask
};
