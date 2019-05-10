import httpService from '../http-service';
import { getUserSimpleInfo } from './user';

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
    return httpService.get('/api/v1/resource_config', {
        uuid
    });
}

export function createResourceTmpl(params) {
    return httpService.post('/api/v1/resource_templates', params);
}

export function getResourceConfigs(start = 1, count = -1, parameterType = 'USER') {
    return httpService.get('/api/v1/resource_configs', {
        start,
        count,
        parameterType
    }).then(res => {
        const { items } = res;
        const userInfoDeferArr = items.map(item => getUserSimpleInfo(item.user_Id));
        return new Promise(resolve => {
            Promise.all(userInfoDeferArr).then(resp => {
                items.forEach((item, index) => {
                    item.userName = resp[index].fullName;
                });
                resolve(res);
            }, () => {
                resolve(res);
            });
        });
    });
}

export default {
    getResourceTmplList,
    deleteResourceTmpl,
    getResourceConfigDetail,
    createResourceTmpl,
    getResourceConfigs
};
