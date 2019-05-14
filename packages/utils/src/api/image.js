import httpService from '../http-service';

const imageApi = '/api/v1/images/';

export function getImageList(params) {
    return httpService.get(imageApi, params);
}

export default {
    getImageList
};
