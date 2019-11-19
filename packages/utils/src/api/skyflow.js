import httpService from '../http-service';
import { SKYFLOW_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, SKYFLOW_MANAGE_GATEWAY_BASE_OLD } from './config';
import readAuths from './config';
import { authWrapper } from './helper';

const skyflowApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflows`;

const skyflowExecuteApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_executes`;

const skyflowCrontabApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontabs`;

export const getSkyflowList = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}skyflow-profiles`, params);
}, readAuths.SKYFLOW_FLOW_READ);

export const getNativeSkyflowList = authWrapper(function (params) {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflows`, params);
}, readAuths.SKYFLOW_FLOW_READ);

export const getSkyflowListWithAuth = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}skyflow-profiles`, params);
}, readAuths.SKYFLOW_TEMPLATE_FLOW_READ);

export function getSkyflowTemplates() {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_templates`);
}

export function createWorkflow(params) {
    return httpService.post(skyflowApi, params);
}

export function updateWorkflow(uuid, params) {
    return httpService.patch(`${skyflowApi}/${uuid}`, params);
}

export function getPreviewPath(params) {
    return httpService.get(`${skyflowApi}/execute/preview`, params);
}

export function removeWorkflow(uuid) {
    return httpService.remove(`${skyflowApi}/${uuid}`);
}

export function getSkyflowInfo(uuid) {
    return httpService.get(`${skyflowApi}/${uuid}`);
}

/* export function getGeneralRunningInfo(params) {
    return httpService.get(skyflowExecuteApi, params);
} */

export const getGeneralRunningInfo = authWrapper(function (params) {
    return httpService.get(skyflowExecuteApi, params);
}, readAuths.SKYFLOW_FLOW_RECORD_READ);

/* export function getTimerRunningInfo(params) {
    return httpService.get(skyflowCrontabApi, params);
} */

export const getTimerRunningInfo = authWrapper(function (params) {
    return httpService.get(skyflowCrontabApi, params);
}, readAuths.SKYFLOW_FLOW_RECORD_READ);

export function getTimerSubRunningInfo(params) {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs`, params);
}

export function shutdownGeneralRunningTask(uuid) {
    return httpService.post(`${skyflowExecuteApi}/${uuid}/stop`);
}

export function removeGeneralRunningTask(uuid) {
    return httpService.remove(`${skyflowExecuteApi}/${uuid}`);
}

export function removeTimerRunningSubTask(uuid, params) {
    return httpService.remove(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs/${uuid}`, params);
}

export function removeTimerRunningTask(uuid) {
    return httpService.remove(`${skyflowCrontabApi}/${uuid}`);
}

export function shutdownTimerRunningTask(uuid) {
    return httpService.post(`${skyflowCrontabApi}/${uuid}/deactivate`);
}

export function startTimerRunningTask(uuid) {
    return httpService.post(`${skyflowCrontabApi}/${uuid}/activate`);
}

export function updateTimerRunningTask(uuid, params) {
    return httpService.patch(`${skyflowCrontabApi}/${uuid}`, params);
}

// editor

export function getWorkflowSnapshot(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/snapshot', {
        execute_id: id
    });
}

export function stopExecuteWorkflow(execute_id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/stop', {
        execute_id
    });
}

/**
 * 获取数据集列表
 */
export function getDatasetList(processType) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/dataset', { processType });
}

/**
 * 获取平台组件列表
 */
export function getPlatformComponentList(processType) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/platform', { processType });
}

/**
 * 获取收藏组件列表
 */
export function getFavoriteComponentList(processType) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/favorite', { processType });
}

/**
 * 获取公共组件列表
 */
export function getPublicComponentList(processType) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/public/', { processType });
}

/**
 * 获取自定义组件列表
 */
export function getCustomComponentList(processType) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/custom', { processType });
}

/**
 * 获取组件类型
 */
export function getComponentOptions() {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/options');
}

/**
 * 创建自定义组件
 * @param {Object} params {name: '', description: '', component_type_id: '', input_params: '', output_param: '', exec_params: '', runtime_id: '', runtime_env: '', resource: ''}
 */
export function createCustomComponent(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/create', params);
}

/**
 * 编辑自定义组件
 * @param {Object} params {component_id:'', name: '', description: '', component_type_id: '', input_params: '', output_param: '', exec_params: '', runtime_id: '', runtime_env: '', resource: ''}
 */
export function updateCustomComponent(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/update', params);
}

/**
 * 删除自定义组件
 * @param {Object} params {component_id:''}
 */
export function removeCustomComp(component_id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/rm', { component_id });
}

/**
 *
 * 获取组件日志
 * @param {Object} params  {component_id:'', offset:'' , nid:''}
 */
export function getCompLog(params) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/node_log', params);
}
/**
 *
 * 获取工作流日志
 * @param {Object} params  {component_id:'', offset:'' }
 */
export function getWorkFlowLog(params) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/log', params);
}

/**
 * 获取运行环境
 */
export function getRunTimeOptions() {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/runtime/options');
}

/**
 * 根据名称搜索组件
 * @param {String} name component-name
 */
export function searchComponents(processType, name) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component', {
        processType,
        name
    });
}

/**
 * 画布保存
 * @param {Object} params {skyflow_id: '', model_json: ''}
 */
export function saveModelJson(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/update/model_json', params);
}

/**
 * schema推导
 * @param {Object} params {output_schema: '', component_id: ''}
 */
export function computeSchema(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/schema/compute', params);
}

/**
 * 画布另存为
 * @param {Object} params  {model_json: '', name: '', description: '', skyflow_project_id: ''}
 */
export function modelSaveas(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/save_as', params);
}

/**
 * 启动工作流
 * @param {Object} params {skyflow_id: ''}
 */
export function createExecution(skyflow_id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/createExecution', {
        skyflow_id
    });
}

/**
 * 停止工作流
 * @param {Object} params {skyflow_id: '', node_id: ''}
 */
export function stopWorkflow(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/stop', params);
}

/**
 * 设置执行方式
 * @param {Object} params {skyflow_id: '', execute_type: ''}
 */
export function setExecuteType(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/set_execute_type', params);
}

/**
 * 运行多实例设置
 * @param {Object} params {skyflow_id: '', rerun_instance: 1, manual_instance: 1, crontab_instance: 1}
 */
export function setInstance(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/set_instance', params);
}

/**
 * 组件收藏
 * @param {Object} componentJson
 */
export function addFavorite(componentJson) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/favorite/add', componentJson);
}

/**
 * 组件取消收藏
 * @param {String} id component_id
 */
export function removeFavorite(id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/favorite/rm', {
        component_id: id
    });
}

/**
 * 组件分享
 * @param {Object} params {component_json: '', name: '', description: '', type: '', share_kind: ''}
 */
export function shareComponent(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/share', params);
}

/**
 * 组件取消分享
 * @param {String} id component_id
 */
export function unshareComponent(id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/unshare', {
        component_id: id
    });
}

/**
 * 输入预览
 * @param {String} id node_id
 */
export function previewInput(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/input_preview', {
        node_id: id
    });
}

/**
 * 输出预览
 * @param {String} id node_id
 */
export function previewOutput(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/output_preview', {
        node_id: id
    });
}

/**
 * 组件日志
 * @param {String} id node_id
 */
export function componentLog(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/log', {
        node_id: id
    });
}

/**
 * 工作流日志
 * @param {String} id skyflow_id
 */
export function skyflowLog(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/log', {
        skyflow_id: id
    });
}

/**
 * 获取画布信息
 */
export function getflowInfo(id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/get', {
        skyflow_id: id
    });
}

/**
 * 检测skyflow project下是否存在同名的工作流
 *
 * @param {Object} params {skyflow_project_id: '', name: ''}
 */
export function testSkyflowNameExist(params) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/exist', params);
}

/**
 * 运行执行记录
 * @param {String} execute_id
 */
export function startExecuteRecord(execute_id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/start', {
        execute_id
    });
}

/**
 * 继续运行执行记录
 * @param {String} execute_id
 */
export function resumeExecuteRecord(execute_id) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/resume', {
        execute_id
    });
}

/**
 * 获取执行列表运行状态
 *
 * @param {Array} executions [execute_id, execute_id...]
 */
export function getExecuteListState(executions) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/state', {
        executions
    });
}

/**
 * 保存执行记录model_json
 * @param {Object} params {execute_id: '', model_json: ''}
 */
export function saveExecuteModelJson(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/update', params);
}

/**
 * 组件导出
 * @param {Object} params
 */
export function componentExport(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/export', params);
}

export function getCompOutputPreview(nid, execute_id) {
    let params = { nid, execute_id };
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/preview', params);
}

/**
 * 检测正在运行实例数量
 * @param {String} skyflow_id
 */
export function checkRunningInstance(skyflow_id) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/check_instance', {
        skyflow_id
    });
}

/**
 * 测试收藏组件名称是否存在
 * @param {String} label
 */
export function testFavoriteExist(label) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/component/favorite/exist', {
        label
    });
}

/**
 * 设置定时运行配置
 * @param {{ skyflow_id: String, crontab_name: String, crontab: String, handle_type: Number, timeout: Number, cron_type: Number, dateList: Array }} params
 */
export function setCrontabs(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/crontabs', params);
}

/**
 * 获取定时任务列表
 * @param {{ skyflow_project_id: String, name: String, order: String, order_by: String, page: Number, page_size: Number }} params
 */
export function getCrontabs(params) {
    return httpService.get(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/crontabs', params);
}

/**
 * 更新定时运行配置
 * @param {{ execution_id: String, crontab: String, handle_type: Number, timeout: Number, cron_type: Number, dateList: Array }} params
 */
export function updateCrontabs(params) {
    return httpService.put(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/crontabs', params);
}

/**
 * 删除指定定时任务
 * @param {{ execution_id: String }} params
 */
export function deleteCrontabs(params) {
    return httpService.delete(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/crontabs', { params });
}

/**
 * 定时任务名称重名检查
 * @param {{ crontab_name: String }} params
 */
export function checkDuplicateCrontabName(params) {
    return httpService.post(SKYFLOW_MANAGE_GATEWAY_BASE_OLD + 'task/skyflow/execute/crontabs/name', params);
}

export default {
    getSkyflowList,
    getNativeSkyflowList,
    getSkyflowTemplates,
    updateWorkflow,
    createWorkflow,
    removeWorkflow,
    getSkyflowInfo,
    getGeneralRunningInfo,
    shutdownGeneralRunningTask,
    removeGeneralRunningTask,
    getTimerRunningInfo,
    getTimerSubRunningInfo,
    removeTimerRunningSubTask,
    removeTimerRunningTask,
    startTimerRunningTask,
    updateTimerRunningTask
};
