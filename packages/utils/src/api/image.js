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

export function getImageList(params) {
    return httpService.get(imageApi, params);
}

export function removeImage(uuid) {
    return httpService.remove(imageApi + uuid);
}

export default {
    getImageList,
    getImageTaskList,
    removeImageTask,
    removeImage
};
