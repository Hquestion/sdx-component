import httpService from '../http-service';

const projectApi = '/api/v1/projects/';

const taskApi = '/api/v1/tasks/';

export function getProjectList(params) {
    return httpService.get(projectApi, params);
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
    getTaskDetail
};
