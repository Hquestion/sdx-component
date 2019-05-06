import httpService from '@sdx/utils/src/http-service';

const changePasswordApi = 'api/v1/user/changePassword'; // 目前后端暂时不能确定, 之后需要再做修改

const getUserInfoApi = 'api/v1/user/info'; // 目前后端暂时不能确定, 之后需要再做修改

function changePassword(params) {
    return httpService.post(changePasswordApi, params);
}

function getUserInfo(params) {
    return httpService.get(getUserInfoApi, params);
}

export default {
    changePassword,
    getUserInfo
};
