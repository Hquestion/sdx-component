import httpService from '../http-service';
// import httpService from '@sdx/utils/lib/http-service';
import { SYSTEM_MANAGE_GETWAY_BASE } from './config';

/**
 * 无参数：集群资源监控
 * 有参数：Pod实时资源使用情况
 * @param {*} params 
 */
export function getClusterResourceMonitor(params) {
    return params ? httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'resources', params) : httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'resources');
}

/**
 * Pod日志查询
 * @param {*} params 
 */
export function getPodLog(params) {
    return httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'logs', params);
}

/**
 * 所有系统Pod状态查询
 * @param {*} params 
 */
export function getPodsStatus(params) {
    return httpService.get(SYSTEM_MANAGE_GETWAY_BASE + 'pods', params);
}

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
    getPodLog,
    getPodsStatus,
    getPodStatusByPodId
};