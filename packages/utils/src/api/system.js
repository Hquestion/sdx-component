import httpService from '../http-service';
// import httpService from '@sdx/utils/lib/http-service';
import { SYSTEM_MANAGE_GETWAY_BASE } from './config';
import readAuths from './config';
import { authWrapper } from './helper';

/**
 * 无参数：集群资源监控
 * 有参数：Pod实时资源使用情况
 * @param {*} params
 */
export function getClusterResourceMonitor(params) {
    return params ? httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'resources', params) : httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'resources');
}

/**
 * 获取Pod实时资源使用情况
 * @param {*} uuid 
 * @param {*} params 
 */
export function getPodResourceStatus(uuid, params) {
    return httpService.get(`${SYSTEM_MANAGE_GETWAY_BASE}resources/${uuid}`, params);
}

/**
 * Pod日志查询
 * @param {*} params
 */
/* export function getPodLog(uuid, params) {
    return httpService.get(`${SYSTEM_MANAGE_GETWAY_BASE}logs/${uuid}`, params);
} */

export const getPodLog = authWrapper(function (uuid, params) {
    return httpService.get(`${SYSTEM_MANAGE_GETWAY_BASE}logs/${uuid}`, params);
}, readAuths.SYSTEM_POD_LOG_READ);

/**
 * 所有系统Pod状态查询
 * @param {*} params
 */
/* export function getPodsStatus(params) {
    return httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'pods', params);
} */

export const getPodsStatus = authWrapper(function (params) {
    return httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'pods', params);
}, readAuths.SYSTEM_POD_STATE_READ);

/**
 * 指定系统Pod状态查询
 * @param {*} uuid
 * @param {*} params
 */
export function getPodStatusByPodId(uuid, params) {
    return httpService.get(SYSTEM_MANAGE_GETWAY_BASE + `pods/${uuid}`, params);
}

export default {
    getClusterResourceMonitor,
    getPodResourceStatus,
    getPodLog,
    getPodsStatus,
    getPodStatusByPodId
};
