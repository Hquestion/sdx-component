import httpService from '../http-service';

import { COMPOSE_GATEWAY_BASE, DATA_MANAGE_GATEWAY_BASE } from './config';

const dataApi = `${DATA_MANAGE_GATEWAY_BASE}datasets`;

export function createDataset(params) {
    return httpService.post(`${dataApi}`, params);
}

export function getDatasetDetail(uuid) {
    return httpService.get(`${dataApi}/${uuid}`);
}

export function datasetPreview(params) {
    return httpService.post(`${DATA_MANAGE_GATEWAY_BASE}preview`,params);
}

export function updateDataset(uuid, params) {
    return httpService.patch(`${dataApi}/${uuid}`, params);
}

export function getDatasetList(params) {
    return httpService.get(`${dataApi}/`, params);
}

export function deleteDataset(uuid, params) {
    return httpService.remove(`${dataApi}/${uuid}`, params);
}

export function getLabels() {
    return httpService.get(`${DATA_MANAGE_GATEWAY_BASE}labels`);
}
/**
 * 批量删除 - 聚合
 * @param {{Array}} uuidList 
 */
export function datasetDeleteBatch(uuidList) {
    return httpService.post(`${COMPOSE_GATEWAY_BASE}dataset-delete-batch`, {
        uuids: uuidList
    });
}
/**
 * 批量分享 - 聚合
 * @param {{Array}} uuidList 
 * @param {{Object}} params 
 */
export function datasetShareBatch(uuidList, params) {
    return httpService.post(`${COMPOSE_GATEWAY_BASE}dataset-share-batch`, {
        uuids: uuidList,
        setting: params
    });
}

/**
 * 获取数据集列表 - 聚合
 * @param {{Object}} params 
 */
export function datasetListProfiles(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}datasets-profiles`, params);
}
