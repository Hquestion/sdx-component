import httpService from '../http-service';
import { SKYFLOW_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config';

const skyflowApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflows`;

const skyflowExecuteApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_executes`;

const skyflowCrontabApi = `${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontabs`;

export function getSkyflowList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}skyflow-profiles`, params);
}

export function getSkyflowTemplates() {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_templates`);
}

export function createWorkflow(params) {
    return httpService.post(skyflowApi, params);
}

export function updateWorkflow(uuid, params) {
    return httpService.patch(`${skyflowApi}/${uuid}`, params);
}

export function removeWorkflow(uuid) {
    return httpService.remove(`${skyflowApi}/${uuid}`);
}

export function getSkyflowInfo(uuid) {
    return httpService.get(`${skyflowApi}/${uuid}`);
}

export function getGeneralRunningInfo(params) {
    return httpService.get(skyflowExecuteApi, params);
}

export function getTimerRunningInfo(params) {
    return httpService.get(skyflowCrontabApi, params);
}

export function getTimerSubRunningInfo(params) {
    return httpService.get(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs`, params);
}

export function shutdownGeneralRunningTask(uuid) {
    return httpService.post(`${skyflowExecuteApi}/${uuid}/stop`);
}

export function removeGeneralRunningTask(uuid) {
    return httpService.remove(`${skyflowExecuteApi}/${uuid}`);
}

export function removeTimerRunningSubTask(uuid) {
    return httpService.remove(`${SKYFLOW_MANAGE_GATEWAY_BASE}skyflow_crontab_jobs/${uuid}`);
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

export default {
    getSkyflowList,
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

// todo: 接口参数、基地址替换

/**
 * 获取skyflow列表
 * @param {Object} params {name: '', order_by: '', pageIndex: ''}
 */
export function getSkyflowList1(params) {
    return httpService.get('/v2/task/skyflow_project/', {
        params
    });
}

/**
 * skyflow下拉框（copy工作流时，筛选当前用户的skyflow project，可以用于‘另存至’skyflow项目）
 */
export function getSkyflowOptions() {
    return httpService.get('/v2/task/skyflow_project/options');
}

/**
 * 新建skyflow
 * @param {Object} params {name: '', description: '', share_kind: ''}
 */
export function createSkyflow(params) {
    return httpService.post('/v2/task/skyflow_project/create', params);
}

/**
 * 编辑skyflow
 * @param {Object} params {name: '', description: '', share_kind: ''}
 */
export function updateSkyflow(params) {
    return httpService.post('/v2/task/skyflow_project/update', params);
}

/**
 * 删除skyflow
 * @param {String} id skyflow_project_id
 */
export function removeSkyflow({
    skyflow_project_id
}) {
    return httpService.post('/v2/task/skyflow_project/rm', {
        skyflow_project_id
    });
}

/**
 * 获取skyflow项目详情
 * @param {String} id skyflow_project_id
 */
export function getSkyflowDetail(id) {
    return httpService.get('/v2/task/skyflow_project/get', {
        params: {
            skyflow_project_id: id
        }
    });
}

/**
 * 获取工作流列表
 * @param {Object} params 分页信息{pageIndex: ''}
 */
export function getWorkflowList(params) {
    return httpService.get('/v2/task/skyflow/', {
        params
    });
}

/**
 * 新建工作流
 * @param {Object} params {name: '', description: ''}
 */
export function createWorkflow1(params) {
    return httpService.post('/v2/task/skyflow/create', params);
}

/**
 * 拷贝工作流
 * @param {Object} params {skyflow_id: '', name: '', description: '', dest_id: ''}
 */
export function copyWorkflow(params) {
    return httpService.post('/v2/task/skyflow/copy', params);
}

/**
 * 编辑工作流
 * @param {Object} params {name: ''}
 */
export function updateWorkflow1(params) {
    return httpService.post('/v2/task/skyflow/update', params);
}

/**
 * 删除工作流
 * @param {String} id skyflow_id
 */
export function removeWorkflow1(params) {
    return httpService.post('/v2/task/skyflow/rm', params);
}

/**
 * 获取指定项目下工作流列表
 * @param {String} id skyflow_project_id
 */
export function getWorkflowSelections(id) {
    return httpService.get('/v2/task/skyflow/options', {
        params: {
            skyflow_project_id: id
        }
    });
}

/**
 * 获取执行列表
 * @param {Object} params {skyflow_id: '', execute_kind: '', state: '', execute_start_date: '', execute_end_date: '', pageIndex: ''}
 */
export function getExecuteList(params) {
    return httpService.get('/v2/task/skyflow/execute/', {
        params
    });
}

/**
 * 查看执行工作流快照
 * @param {String} id execute_id
 */
export function getWorkflowSnapshot(id) {
    return httpService.get('/v2/task/skyflow/execute/snapshot', {
        params: {
            execute_id: id
        }
    });
}

/**
 * 拷贝执行工作流
 * @param {String} params {execute_id: '', name: '', description: '', dest_id: ''}
 */
export function copyExecute(params) {
    return httpService.post('/v2/task/skyflow/execute/copy', params);
}

/**
 * 删除执行工作流
 * @param {String} id execute_id
 */
export function removeExecuteWorkflow(execute_id) {
    return httpService.post('/v2/task/skyflow/execute/rm', {
        execute_id
    });
}

/**
 * 停止执行工作流
 * @param {String} id  execute_id
 */
export function stopExecuteWorkflow(execute_id) {
    return httpService.post('/v2/task/skyflow/execute/stop', {
        execute_id
    });
}

/**
 * 获取数据集列表
 */
export function getDatasetList() {
    return httpService.get('/v2/task/skyflow/dataset/');
}

/**
 * 获取平台组件列表
 */
export function getPlatformComponentList() {
    return httpService.get('/v2/task/skyflow/component/platform/');
}

/**
 * 获取收藏组件列表
 */
export function getFavoriteComponentList() {
    return httpService.get('/v2/task/skyflow/component/favorite/');
}

/**
 * 获取公共组件列表
 */
export function getPublicComponentList() {
    return httpService.get('/v2/task/skyflow/component/public/');
}

/**
 * 获取自定义组件列表
 */
export function getCustomComponentList() {
    return httpService.get('/v2/task/skyflow/component/custom/');
}

/**
 * 获取组件类型
 */
export function getComponentOptions() {
    return httpService.get('/v2/task/skyflow/component/options');
}

/**
 * 创建自定义组件
 * @param {Object} params {name: '', description: '', component_type_id: '', input_params: '', output_param: '', exec_params: '', runtime_id: '', runtime_env: '', resource: ''}
 */
export function createCustomComponent(params) {
    return httpService.post('/v2/task/skyflow/component/create', params);
}

/**
 * 编辑自定义组件
 * @param {Object} params {component_id:'', name: '', description: '', component_type_id: '', input_params: '', output_param: '', exec_params: '', runtime_id: '', runtime_env: '', resource: ''}
 */
export function updateCustomComponent(params) {
    return httpService.post('/v2/task/skyflow/component/update', params);
}

/**
 * 删除自定义组件
 * @param {Object} params {component_id:''}
 */
export function removeCustomComp(component_id) {
    return httpService.post('/v2/task/skyflow/component/rm', { component_id });
}

/**
 *
 * 获取组件日志
 * @param {Object} params  {component_id:'', offset:'' , nid:''}
 */
export function getCompLog(params) {
    return httpService.get('/v2/task/skyflow/execute/node_log',
        { params });
}
/**
 *
 * 获取工作流日志
 * @param {Object} params  {component_id:'', offset:'' }
 */
export function getWorkFlowLog(params) {
    return httpService.get('/v2/task/skyflow/execute/log',
        { params });
}

/**
 * 获取运行环境
 */
export function getRunTimeOptions() {
    return httpService.get('/v2/task/skyflow/runtime/options');
}

/**
 * 根据名称搜索组件
 * @param {String} name component-name
 */
export function searchComponents(name) {
    return httpService.get('/v2/task/skyflow/component/', {
        params: {
            name
        }
    });
}

/**
 * 画布保存
 * @param {Object} params {skyflow_id: '', model_json: ''}
 */
export function saveModelJson(params) {
    return httpService.post('/v2/task/skyflow/update/model_json', params);
}

/**
 * schema推导
 * @param {Object} params {output_schema: '', component_id: ''}
 */
export function computeSchema(params) {
    return httpService.post('/v2/task/skyflow/schema/compute', params);
}

/**
 * 画布另存为
 * @param {Object} params  {model_json: '', name: '', description: '', skyflow_project_id: ''}
 */
export function modelSaveas(params) {
    return httpService.post('/v2/task/skyflow/save_as', params);
}

/**
 * 启动工作流
 * @param {Object} params {skyflow_id: ''}
 */
export function createExecution(skyflow_id) {
    return httpService.post('/v2/task/skyflow/createExecution', {
        skyflow_id
    });
}

/**
 * 停止工作流
 * @param {Object} params {skyflow_id: '', node_id: ''}
 */
export function stopWorkflow(params) {
    return httpService.post('/v2/task/skyflow/stop', params);
}

/**
 * 设置执行方式
 * @param {Object} params {skyflow_id: '', execute_type: ''}
 */
export function setExecuteType(params) {
    return httpService.post('/v2/task/skyflow/set_execute_type', params);
}

/**
 * 运行多实例设置
 * @param {Object} params {skyflow_id: '', rerun_instance: 1, manual_instance: 1, crontab_instance: 1}
 */
export function setInstance(params) {
    return httpService.post('/v2/task/skyflow/set_instance', params);
}

/**
 * 组件收藏
 * @param {Object} componentJson
 */
export function addFavorite(componentJson) {
    return httpService.post('/v2/task/skyflow/component/favorite/add', componentJson);
}

/**
 * 组件取消收藏
 * @param {String} id component_id
 */
export function removeFavorite(id) {
    return httpService.post('/v2/task/skyflow/component/favorite/rm', {
        component_id: id
    });
}

/**
 * 组件分享
 * @param {Object} params {component_json: '', name: '', description: '', type: '', share_kind: ''}
 */
export function shareComponent(params) {
    return httpService.post('/v2/task/skyflow/component/share', params);
}

/**
 * 组件取消分享
 * @param {String} id component_id
 */
export function unshareComponent(id) {
    return httpService.post('/v2/task/skyflow/component/unshare', {
        component_id: id
    });
}

/**
 * 输入预览
 * @param {String} id node_id
 */
export function previewInput(id) {
    return httpService.get('/v2/task/skyflow/component/input_preview', {
        params: {
            node_id: id
        }
    });
}

/**
 * 输出预览
 * @param {String} id node_id
 */
export function previewOutput(id) {
    return httpService.get('/v2/task/skyflow/component/output_preview', {
        params: {
            node_id: id
        }
    });
}

/**
 * 组件日志
 * @param {String} id node_id
 */
export function componentLog(id) {
    return httpService.get('/v2/task/skyflow/component/log', {
        params: {
            node_id: id
        }
    });
}

/**
 * 工作流日志
 * @param {String} id skyflow_id
 */
export function skyflowLog(id) {
    return httpService.get('/v2/task/skyflow/log', {
        params: {
            skyflow_id: id
        }
    });
}

/**
 * 获取画布信息
 */
export function getflowInfo(id) {
    return httpService.get('/v2/task/skyflow/get', {
        params: {
            skyflow_id: id
        }
    });
}


/**
 * skyflow 工作流列表
 *
 * 创建服务
 * @param {Service} service 服务对象
 */
export function createService(service) {
    return httpService
        .post('/v2/task/skyflow/create', service)
    ;
}

/**
 * 更新服务
 * @param {Service} service 服务对象
 */
export function updateService(service) {
    return httpService
        .post('/v2/task/skyflow/update', service)
    ;
}

/**
 * 获取所有的service作为下拉单选择项目
 */
export function getServiceOptions() {
    return httpService.get('/v2/task/skyflow_data_service/options');
}

/**
 * 检测skyflow project下是否存在同名的工作流
 *
 * @param {Object} params {skyflow_project_id: '', name: ''}
 */
export function testSkyflowNameExist(params) {
    return httpService.get('/v2/task/skyflow/exist', {
        params
    });
}

/**
 * 获取执行列表运行状态
 *
 * @param {Array} executions [execute_id, execute_id...]
 */
export function getExecuteListState(executions) {
    return httpService.post('/v2/task/skyflow/execute/state', {
        executions
    });
}

/**
 * 运行执行记录
 * @param {String} execute_id
 */
export function startExecuteRecord(execute_id) {
    return httpService.post('/v2/task/skyflow/execute/start', {
        execute_id
    });
}

/**
 * 继续运行执行记录
 * @param {String} execute_id
 */
export function resumeExecuteRecord(execute_id) {
    return httpService.post('/v2/task/skyflow/execute/resume', {
        execute_id
    });
}

/**
 * 保存执行记录model_json
 * @param {Object} params {execute_id: '', model_json: ''}
 */
export function saveExecuteModelJson(params) {
    return httpService.post('/v2/task/skyflow/execute/update', params);
}

/**
 * 组件导出
 * @param {Object} params
 */
export function componentExport(params) {
    return httpService.post('/v2/task/skyflow/execute/export', params);
}

export function getCompOutputPreview(nid, execute_id) {
    let params = { nid, execute_id };
    return httpService.get('/v2/task/skyflow/execute/preview', {
        params
    });
}

/**
 * 检测正在运行实例数量
 * @param {String} skyflow_id
 */
export function checkRunningInstance(skyflow_id) {
    return httpService.get('/v2/task/skyflow/check_instance', {
        params: {
            skyflow_id
        }
    });
}

/**
 * 测试收藏组件名称是否存在
 * @param {String} label
 */
export function testFavoriteExist(label) {
    return httpService.get('/v2/task/skyflow/component/favorite/exist', {
        params: {
            label
        }
    });
}

/**
 * 设置定时运行配置
 * @param {{ skyflow_id: String, crontab_name: String, crontab: String, handle_type: Number, timeout: Number, cron_type: Number, dateList: Array }} params
 */
export function setCrontabs(params) {
    return httpService.post('/v2/task/skyflow/execute/crontabs', params);
}

/**
 * 获取定时任务列表
 * @param {{ skyflow_project_id: String, name: String, order: String, order_by: String, page: Number, page_size: Number }} params
 */
export function getCrontabs(params) {
    return httpService.get('/v2/task/skyflow/execute/crontabs', {
        params
    });
}

/**
 * 更新定时运行配置
 * @param {{ execution_id: String, crontab: String, handle_type: Number, timeout: Number, cron_type: Number, dateList: Array }} params
 */
export function updateCrontabs(params) {
    return httpService.put('/v2/task/skyflow/execute/crontabs', params);
}

/**
 * 删除指定定时任务
 * @param {{ execution_id: String }} params
 */
export function deleteCrontabs(params) {
    return httpService.delete('/v2/task/skyflow/execute/crontabs', { params });
}

/**
 * 获取调度任务列表
 * @param {{ execution_id: String, page: Number, page_size: Number }} params
 */
export function getScheduleJobs(params) {
    return httpService.get('/v2/task/skyflow/execute/crontabs/scheduleJobs', {
        params
    });
}

/**
 * 取消定时工作流
 * @param {{ execution_id: String }} params
 */
export function cancelCrontab(params) {
    return httpService.post('/v2/task/skyflow/execute/crontabs/cancel', params);
}

/**
 * 启动定时工作流
 * @param {{ execution_id: String }} params
 */
export function activeCrontab(params) {
    return httpService.post('/v2/task/skyflow/execute/crontabs/active', params);
}

/**
 * 定时任务名称重名检查
 * @param {{ crontab_name: String }} params
 */
export function checkDuplicateCrontabName(params) {
    return httpService.post('/v2/task/skyflow/execute/crontabs/name', params);
}

/**
 * 删除调度的job
 * @param {{ job_id: String, execution_id: String }} params
 */
export function deleteScheduleJob(params) {
    return httpService.delete('/v2/task/skyflow/execute/crontabs/scheduleJobs', { params });
}

/**
 * 测试数据库连接
 * @param params
 * @returns {*}
 */
export function testDataSourceConnection(params) {
    return httpService.post('/v2/datasource/test', { ...params });
}

export function isDatasetNameExist(name) {
    return httpService.get('/v2/dataset/exist', {
        params: {
            name
        }
    });
}

export function fetchDbTablesBySource(datasource) {
    return httpService.get('/v2/datasource/dbTables', {
        params: {
            datasource
        }
    });
}

/**
 * 获取总资源和已使用资源
 *
 * @returns Object
 */
export function getResources() {
    return httpService.get('/v2/resource/stat/overview');
}
