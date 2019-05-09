import httpService from '@sdx/utils/lib/http-service';

export function getResourceTmplList(start = 1, count = -1, templateType) {
    return httpService.get('/api/v1/resource_templates', {
        start,
        count,
        templateType
    });
}

export function deleteResourceTmpl(uuid) {

}

export function getResourceConfigDetail(uuid) {
    return httpService.get(`/api/v1/resource_configs`, {
        uuid
    });
}

export default {
    getResourceTmplList,
    deleteResourceTmpl,
    getResourceConfigDetail
};
