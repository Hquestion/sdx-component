
import httpService from '../http-service';

import { TASK_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, DATA_MANAGE_GATEWAY_BASE } from './config';

import readAuths from './config';
import { authWrapper } from './helper';

const taskApi = `${TASK_MANAGE_GATEWAY_BASE}`;

export const getTaskList = authWrapper(function (params) {
    // return httpService.get(`${COMPOSE_GATEWAY_BASE}task-profiles`, params);
    return Promise.resolve({
        items: [
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'Jupyter任务A',
                'description': 'Jupyter任务AJupyter任务AJupyter任务AJupyter任务AJupyter任务A',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'JUPYTER',
                'state':'CREATED',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'Jupyter任务B',
                'description': 'Jupyter任务BJupyter任务BJupyter任务BJupyter任务BJupyter任务B',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'JUPYTER',
                'state':'RUNNING',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'SkyIDE任务A',
                'description': 'SkyIDE任务ASkyIDE任务ASkyIDE任务ASkyIDE任务ASkyIDE任务ASkyIDE任务A',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'SKYIDE',
                'state':'RUNNING',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'SkyIDE任务B',
                'description': 'SkyIDE任务BSkyIDE任务BSkyIDE任务BSkyIDE任务BSkyIDE任务BSkyIDE任务B',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'SKYIDE',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'Container任务A',
                'description': 'Container任务AContainer任务AContainer任务AContainer任务AContainer任务A',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'CONTAINERDEV',
                'state': 'RUNNING',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'Container任务B',
                'description': 'Container任务BContainer任务BContainer任务BContainer任务BContainer任务B',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'CONTAINERDEV',
                'state': 'KILLED',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            },
            {
                'uuid': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'projectId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'name': 'Skyflow任务',
                'description': 'Skyflow任务Skyflow任务Skyflow任务Skyflow任务Skyflow任务',
                owner: { uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242' },
                'ownerName': '张三',
                'imageId': 'c22192b0-c752-4a8e-98d0-3bd15f591b34',
                'quota': {cpu:1, memory:17179869184, gpu:1, 'gpus':[{'label': 'gtx-1080', 'count': 1}]},
                'resourceConfig': {'EXECUTOR_CPU_CORES': 1000,'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1,'EXECUTOR_MEMORY_B': 200000000},
                'type': 'SKYFLOW',
                'createdAt': '2019-04-24 17:45:18',
                'runningAt': '',
                'stoppedAt': '',
                'sourcePaths': ['/SkyDiscovery/cephfs/group/zhhh/wxll/1.jar'],
                'args':'',
                'mainClass': 'test',
                'sparkParams': [],
                'datasources': ['c22192b0-c752-4a8e-98d0-3bd15f591b34', 'c22192b0-c752-4a8e-98d0-3bd15f591b34'],
                'pods': [
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    },
                    {
                        'name':'',
                        'state': '',
                        'reason': '',
                        'startTime': ''
                    }
                ]
            }
        ],
        total: 8
    });
}, [readAuths.PROJECT_TASK_READ, readAuths.SYSTEM_POD_REAL_RESOURCE_READ, readAuths.SYSTEM_GLOBAL_RESOURCE_READ]);

export function removeTask(uuid) {
    return httpService.remove(`${taskApi}/${uuid}`);
}

export function startTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/start`, params);
}

export function stopTask(uuid, params) {
    return httpService.post(`${taskApi}/${uuid}/stop`, params);
}

export function createTask(params) {
    return httpService.post(taskApi, params);
}

export function getTaskDetail(uuid) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}task-detail`, {uuid});
}
// 任务编辑的时候不需要聚合
export function getTaskDetailBackEnd(uuid) {
    return httpService.get(`${taskApi}/${uuid}`);
}

export function updateTask(uuid,params) {
    return httpService.patch(`${taskApi}/${uuid}`, params);
}

// 数据集列表
export function getDataSet(params) {
    return httpService.get(`${DATA_MANAGE_GATEWAY_BASE}dataset/options`, params);
}
// 数据源列表
export function getTaskDataSource(params) {
    return httpService.get(`${DATA_MANAGE_GATEWAY_BASE}datasource/taskOptions`, params);
}

export default {
    getTaskList,
    removeTask,
    startTask,
    stopTask,
    createTask,
    getTaskDetail,
    updateTask,
    getDataSet,
    getTaskDataSource,
    getTaskDetailBackEnd
};
