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
export function removeImageTask(uuid) {
    return httpService.remove(imageTaskApi + uuid);
}
