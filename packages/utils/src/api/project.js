import httpService from '../http-service';

const projectApi = 'api/v1/projects/';

export function getProjectList(params) {
    return httpService.get(projectApi, params);
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
