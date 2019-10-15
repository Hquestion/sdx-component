export function getResourceTmplList(start, count, type) {
    let res = null;

    if (type === 'GPU') {
        res = Promise.resolve({
            items: [
                {
                    label: 'XX',
                    count: 1,
                    uuid: 'XX-1'
                },
                {
                    label: 'XX1',
                    count: 2,
                    uuid: '112'
                },
                {
                    label: 'XX2',
                    count: 3,
                    uuid: '112'
                }
            ]
        }
        );
    } else if (type === 'CPU') {
        res = Promise.resolve({
            items: [
                {
                    cpu: 1000,
                    memory: 2147483648,
                    uuid: '112'
                },
                {
                    cpu: 4000,
                    memory: 2147483648,
                    uuid: '1e12'
                },
                {
                    cpu: 2000,
                    memory: 2147483648,
                    uuid: '11e2'
                }
            ]
        });
    } else {
        res = Promise.resolve({
            items: [
                {
                    cpu: 1000,
                    memory: 2147483648,
                    uuid: '112',
                    templateType: 'CPU'
                },
                {
                    cpu: 4000,
                    memory: 2147483648,
                    uuid: '1e12',
                    templateType: 'CPU'
                },
                {
                    cpu: 2000,
                    memory: 2147483648,
                    uuid: '11e2',
                    templateType: 'CPU'
                }
            ]
        });
    }
    return res;
}

export function getTotalResource() {
    return Promise.resolve({
        cpu: 10000,
        memory: 2147483648,
        gpu: 5
    });
}

export function getGpuModels() {
    return Promise.resolve(['gtx-800', 'gtx-900']);
}

export function getResourceConfigDetail() {
    return Promise.resolve({
        maxConcurrentTasks: 3,
        maxConcurrentHeavyTasks: 3,
        maxGpuTime: 60 * 60,
        maxCpuTime: 3600 * 24,
        maxGpus: 5,
        heavyTaskThreshold: {
            cpu: 1000,
            memory: 2147483648
        }
    });
}

export function getResourceConfigs() {
    return Promise.resolve({
        'items': [{
            'createdAt': '2019-08-02T07:54:08.457000',
            'heavyTaskThreshold': {'cpu': 12000, 'memory': 25769803776},
            'maxConcurrentHeavyTasks': 2,
            'maxConcurrentTasks': 4,
            'maxCpuTime': 86400,
            'maxGpuTime': 3600,
            'maxGpus': 2,
            'parameterType': 'USER',
            'updatedAt': '2019-08-02T07:54:08.457000',
            'user': {
                'createdAt': '2019-07-30T06:42:16.263000Z',
                'description': '',
                'expiresAt': '2020-07-29T06:42:45.494000Z',
                'fullName': '张霞',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.211',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-06T08:16:49.048000Z'
                },
                'permissions': ['9fdff30d-da5f-443b-a8f4-6339c12eb7b4'],
                'recentLogin': '2019-08-06T08:34:55.800000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-02T08:52:47.781000Z',
                'username': 'xia.zhang',
                'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363'
            },
            'uuid': '6862985e-38b9-4c0e-9012-b867c3987f65'
        }], 'total': 1
    });
}
