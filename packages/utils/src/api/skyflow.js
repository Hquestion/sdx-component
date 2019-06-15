import httpService from '../http-service';

const skyflowApi = '/api/v1/skyflows/';

export function getSkyflowList(params) {
    return httpService.get(skyflowApi, params);
}

export function getSkyflowTemplates() {
    return httpService.get('/api/v1/skyflow_templates');
}

export function createWorkflow(params) {
    return httpService.post(skyflowApi, params);
}

export function updateWorkflow(uuid, params) {
    return httpService.patch(skyflowApi + uuid, params);
}

export function removeWorkflow(uuid) {
    return httpService.remove(skyflowApi + uuid);
}

export function getSkyflowInfo(uuid) {
    return httpService.get(skyflowApi + uuid);
}

export function getGeneralRunningInfo(params) {
    return httpService.get('/api/v1/skyflow_executes', params);
}

export function getTimerRunningInfo(params) {
    return httpService.get('/api/v1/skyflow_crontabs', params);
}

export function getTimerSubRunningInfo(params) {
    return httpService.get('/api/v1/skyflow_crontab_jobs', params);
}

export function shutdownGeneralRunningTask(uuid) {
    return httpService.post('/api/v1/skyflow_executes/' + uuid + '/stop');
}

export function removeGeneralRunningTask(uuid) {
    return httpService.remove('/api/v1/skyflow_executes/' + uuid);
}

export function removeTimerRunningSubTask(uuid) {
    return httpService.remove('/api/v1/skyflow_crontab_jobs/' + uuid);
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
    removeTimerRunningSubTask
};
