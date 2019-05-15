import httpService from '../http-service';

const imageApi = '/api/v1/images/';

export function getImageList(params) {
    return httpService.get(imageApi, params);
}

export default {
    getImageList
};

const imageTaskApi = '/api/v1/image_builders/';
// 获取构建任务列表
export function getImageTaskList(params) {
    return httpService.get(imageTaskApi, params);
}
// 删除构建任务
export function removeImageTask(uuid) {
    return httpService.remove(imageTaskApi + uuid);
}
// 基于 tar 文件新建镜像任务
export function buildTar(params) {
    return httpService.post(`${imageTaskApi}build-tar/`, params);
}
// 基于 dockerfile 文件新建镜像任务

export function buildImagefile(params) {
    return httpService.post(`${imageTaskApi}build-imagefile/`, params);
}