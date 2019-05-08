import httpService from '../http-service';

const projectApi = 'api/v1/projects/';

function getProjectList(params) {
    return httpService.get(projectApi, params);
}

function getProjectDetail(uuid) {
    return httpService.get(projectApi + uuid);
}

function createProject(params) {
    return httpService.post(projectApi, params);
}

function updateProject(uuid, params) {
    return httpService.patch(projectApi + uuid, params);
}

function removeProject(uuid) {
    return httpService.remove(projectApi + uuid);
}

export default {
    getProjectList,
    getProjectDetail,
    createProject,
    updateProject,
    removeProject
};
