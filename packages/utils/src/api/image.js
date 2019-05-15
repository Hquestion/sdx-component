import httpService from '../http-service';

const imageBaseUrl = '/api/v1/images/';

// 根据uuid查询包详情
export function getPackagesByUuid(uuid, params) {
    return httpService.get(imageBaseUrl + uuid + '/packages/', params);
}

// 获取镜像信息
export function getImage(uuid) {
    return httpService.get(imageBaseUrl + uuid + '/');
}