import httpService from '../http-service';

import { COMPOSE_GATEWAY_BASE, DATA_MANAGE_GATEWAY_BASE } from './config';

const dataApi = `${DATA_MANAGE_GATEWAY_BASE}datasets`;

export function createDataset(params) {
    return httpService.post(`${dataApi}`, params);
}

export function getDatasetDetail(uuid) {
    return httpService.get(`${dataApi}/${uuid}`);
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

export function datasetDeleteBatch(uuidList) {
    return httpService.remove(`${COMPOSE_GATEWAY_BASE}dataset-delete-batch`, uuidList);
}

export function datasetShareBatch(uuidList, params) {
    return httpService.patch(`${COMPOSE_GATEWAY_BASE}dataset-share-batch`, uuidList, params);
}
