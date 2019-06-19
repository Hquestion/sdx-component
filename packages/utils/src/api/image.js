// import httpService from '../http-service';
import httpService from '@sdx/utils/lib/http-service';
import { IMAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config';

const imageApi = `${IMAGE_GATEWAY_BASE}images/`;

const imageTaskApi = `${IMAGE_GATEWAY_BASE}image_builders/`;

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
export function getImageBuildLog(uuid, params) {
    return httpService.get(`${imageTaskApi + uuid}/log`, params);
}

export function getImageList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}image-profiles`, params);
}

export function updateImage(uuid, params) {
    return httpService.patch(imageApi + uuid, params);
}

// 批量更新共享设置, 当有批量设置接口时可删除    // TODO
export function updateGroupImages(images, params) {
    const imageDeferArr = (images || []).map(item => updateImage(item.uuid, params));
    return new Promise(resolve => {
        Promise.all(imageDeferArr).then(() => {
            resolve();
        });
    });
}

export function removeImage(uuid) {
    return httpService.remove(imageApi + uuid);
}

// 根据uuid查询包详情
export function getPackagesByUuid(uuid, params) {
    return httpService.get(imageApi + uuid + '/packages', params);
}

// 获取镜像信息
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
    getImage,
    updateGroupImages
};
