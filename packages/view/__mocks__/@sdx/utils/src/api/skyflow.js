export function updateWorkflow() {
    return Promise.resolve();
}

export function createWorkflow() {
    return Promise.resolve();
}

export function removeWorkflow() {
    return Promise.resolve();
}

export function startTimerRunningTask() {
    return Promise.resolve();
}

export function shutdownTimerRunningTask() {
    return Promise.resolve();
}

export function removeTimerRunningTask() {
    return Promise.resolve();
}

export function removeTimerRunningSubTask() {
    return Promise.resolve();
}

export function updateTimerRunningTask() {
    return Promise.resolve();
}

export function getSkyflowTemplates() {
    return Promise.resolve({
        items: [
            {
                name: '风电模板'
            },
            {
                name: '轨道交通模板'
            }
        ]
    });
}

export function getSkyflowInfo() {
    return Promise.resolve({
        processType: 'PATCH'
    });
}

export function getGeneralRunningInfo() {
    return Promise.resolve({
        items: [],
        total: 1
    });
}

export function getTimerRunningInfo() {
    return Promise.resolve({
        items: [],
        total: 1
    });
}

export function getTimerSubRunningInfo() {
    return Promise.resolve({
        items: [],
        total: 1
    });
}

export function getSkyflowList() {
    return Promise.resolve({
        'items': [{
            'createdAt': '2019-08-05T07:07:25.191000Z',
            'crontabInstance': 1,
            'description': '',
            'executeKind': 1,
            'executeType': 0,
            'groups': [],
            'isEditable': true,
            'isTemplate': false,
            'manualInstance': 1,
            'modelJson': {
                'links': [],
                'nodes': []
            },
            'modifiedAt': '2019-08-05T07:07:25.191000Z',
            'name': 'test flow',
            'processType': 'PATCH',
            'skyflowTemplate': '风电模板',
            'state': '',
            'type': 'PRIVATE',
            'updatedAt': '2019-08-05T07:07:25.191000Z',
            'user': {
                'createdAt': '2019-07-29T15:55:54.806000Z',
                'description': '',
                'fullName': '系统管理员2',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.241',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-12T03:39:36.219000Z'
                },
                'permissions': [],
                'recentLogin': '2019-08-12T03:49:44.704000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-05T09:25:50.618000Z',
                'username': 'sysadmin',
                'uuid': '292a2b73-3093-4782-8719-a11e01e08398'
            },
            'users': [],
            'uuid': '5d47d5ad48b950799a160f93'
        }],
        'total': 1
    });
}

export function getSkyflowListWithAuth() {
    return Promise.resolve({
        'items': [{
            'createdAt': '2019-08-05T07:07:25.191000Z',
            'crontabInstance': 1,
            'description': '',
            'executeKind': 1,
            'executeType': 0,
            'groups': [],
            'isEditable': true,
            'isTemplate': false,
            'manualInstance': 1,
            'modelJson': {
                'links': [],
                'nodes': []
            },
            'modifiedAt': '2019-08-05T07:07:25.191000Z',
            'name': 'test flow',
            'processType': 'PATCH',
            'skyflowTemplate': '风电模板',
            'state': '',
            'type': 'PRIVATE',
            'updatedAt': '2019-08-05T07:07:25.191000Z',
            'user': {
                'createdAt': '2019-07-29T15:55:54.806000Z',
                'description': '',
                'fullName': '系统管理员2',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.241',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-12T03:39:36.219000Z'
                },
                'permissions': [],
                'recentLogin': '2019-08-12T03:49:44.704000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-05T09:25:50.618000Z',
                'username': 'sysadmin',
                'uuid': '292a2b73-3093-4782-8719-a11e01e08398'
            },
            'users': [],
            'uuid': '5d47d5ad48b950799a160f93'
        }],
        'total': 1
    });
}
