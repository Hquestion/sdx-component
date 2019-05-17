import httpService from '../http-service';

const imageApi = '/api/v1/images/';

const imageTaskApi = '/api/v1/image_builders/';
// 获取构建任务列表
export function getImageTaskList(params) {
    return httpService.get(imageTaskApi, params);
}

// 删除构建任务
export function removeImageTask(uuid) {
    return httpService.remove(imageTaskApi + uuid);
}

// 基于基础镜像新建镜像任务
export function buildImageBasic(params) {
    return httpService.post(imageTaskApi + 'build-basic', params);
}

// 获取所有镜像源
export function getSourceRepos() {
    return httpService.get(imageTaskApi + 'source_repos');
}

// 基于 tar 文件新建镜像任务
export function buildTar(params) {
    return httpService.post(`${imageTaskApi}build-tar/`, params);
}

// 基于 dockerfile 文件新建镜像任务

export function buildImagefile(params) {
    return httpService.post(`${imageTaskApi}build-imagefile/`, params);
}

// 获取构建日志
export function getImageBuildLog(uuid) {
    return httpService.get(`${imageTaskApi + uuid}/log/`);
}

export function getImageList(params) {
    return httpService.get(imageApi, params);
}

export function updateImage(uuid, params) {
    return httpService.patch(imageApi + uuid, params);
}

export function removeImage(uuid) {
    return httpService.remove(imageApi + uuid);
}

// 根据uuid查询包详情
export function getPackagesByUuid(uuid, params) {
    return httpService.get(imageApi + uuid + '/packages', params);
}

// 获取镜像信息
export function getImage(uuid) {
    return httpService.get(imageApi + uuid);
}

export default {
    getImageList,
    getImageTaskList,
    removeImageTask,
    removeImage,
    buildTar,
    buildImagefile,
    getPackagesByUuid,
    getImage
};
