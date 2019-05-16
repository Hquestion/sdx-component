import httpService from '../http-service';

const imageApi = '/api/v1/images/';

const imageTaskApi = '/api/v1/image_builders/';
// 获取构建任务列表
export function getImageTaskList(params) {
    return httpService.get(imageTaskApi, params);
}
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

export function getImageList(params) {
    return httpService.get(imageApi, params);
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
    removeImage
};
