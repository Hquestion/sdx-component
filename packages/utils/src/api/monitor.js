import httpService from '../http-service';

const podsApi = '/api/v1/pods/';

export function getPodsList(params) {
    return httpService.get(podsApi, params);
}