export function getLabels() {
    return Promise.resolve([{
        label: 'tesla'
    }]);
}

export function createModel() {
    return Promise.resolve();
}

export function updateModel() {
    return Promise.resolve();
}

export function removeModel() {
    return Promise.resolve();
}

export function removeGroupModels() {
    return Promise.resolve();
}

export function updateGroupModels() {
    return Promise.resolve();
}

export function getFrameworks() {
    return Promise.resolve(['PMML', 'TENSORFLOW']);
}

export function createVersion() {
    return Promise.resolve();
}

export function updateVersion() {
    return Promise.resolve();
}

export function startVersion() {
    return Promise.resolve();
}

export function getVersionToken() {
    return Promise.resolve({
        token: 'token123456'
    });
}

export function removeVersion() {
    return Promise.resolve();
}

export function shutdownVersion() {
    return Promise.resolve();
}

export function getVersionInputFormat() {
    return Promise.resolve({
        inputs: '1222222222222222222222222222'
    });
}

export function getModelInfo() {
    return Promise.resolve({
        creatorId: '11111111'
    });
}

export function getVersionInfo() {
    return Promise.resolve({
        'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
        'name': 'pppsparkkk',
        'description': '',
        'modelPath': '/02ModelTestSDX/spark_test/test_resource/sparkModel',
        'runtimeImage': 'spark_deployment:1.0',
        'framework': 'SPARK',
        'runtimeResource': {
            'cpu': 2000,
            'memory': 4294967296,
            'gpu': 0,
            'gpuModel': null
        },
        'state': 'RUNNING',
        'restApi': null,
        'serviceId': null,
        'apiKey': 'aa1-7324139r028-',
        'apiCallNum': null,
        'api_call_num': null,
        'error': null,
        'startedAt': null,
        'stoppedAt': null,
        'createdAt': '2019-08-03T09:30:07.143000Z',
        'updatedAt': '2019-08-03T09:30:07.143000Z',
        'creatorId': '292a2b73-3093-4782-8719-a11e01e08398'
    });
}

export function getVersionList() {
    return Promise.resolve({
        'items': [{
            'uuid': '9956afe3-c47d-4b11-87eb-21b3a5b85da8',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'pppsparkkk',
            'description': '',
            'modelPath': '/02ModelTestSDX/spark_test/test_resource/sparkModel',
            'runtimeImage': 'spark_deployment:1.0',
            'framework': 'SPARK',
            'runtimeResource': {
                'cpu': 2000,
                'memory': 4294967296,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'CREATED',
            'restApi': null,
            'serviceId': null,
            'apiKey': 'aa1-7324139r028-',
            'apiCallNum': null,
            'api_call_num': null,
            'error': null,
            'startedAt': null,
            'stoppedAt': null,
            'createdAt': '2019-08-03T09:30:07.143000Z',
            'updatedAt': '2019-08-03T09:30:07.143000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }, {
            'uuid': '16f571dd-7025-4856-a5e2-91caded8f393',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'papaark',
            'description': '',
            'modelPath': '/02ModelTestSDX/spark_test/test_resource/sparkModel',
            'runtimeImage': 'spark_deployment:1.0',
            'framework': 'SPARK',
            'runtimeResource': {
                'cpu': 2000,
                'memory': 4294967296,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'RUNNING',
            'restApi': 'http://10.115.1.130/fa5fd8ce-fac8-4869-84ef-4e074ceff9d0/predict/submit-input',
            'serviceId': 'fa5fd8ce-fac8-4869-84ef-4e074ceff9d0',
            'apiKey': '1-89389rp911-122',
            'apiCallNum': null,
            'api_call_num': null,
            'error': null,
            'startedAt': '2019-08-03T09:29:41.688000Z',
            'stoppedAt': null,
            'createdAt': '2019-08-02T07:29:55.662000Z',
            'updatedAt': '2019-08-03T09:29:45.694000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }, {
            'uuid': '210c3648-959f-4a34-ad1d-f2849fdd72a1',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'ssspark',
            'description': '',
            'modelPath': '/02ModelTestSDX/spark_test/test_resource/sparkModel',
            'runtimeImage': 'spark_deployment:1.0',
            'framework': 'SPARK',
            'runtimeResource': {
                'cpu': 2000,
                'memory': 4294967296,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'RUNNING',
            'restApi': 'http://10.115.1.130/38313a80-0a7d-4105-9824-5796d690ed6c/predict/submit-input',
            'serviceId': '38313a80-0a7d-4105-9824-5796d690ed6c',
            'apiKey': '-19e-272-ke81228',
            'apiCallNum': null,
            'api_call_num': null,
            'error': null,
            'startedAt': '2019-08-02T07:25:15.449000Z',
            'stoppedAt': null,
            'createdAt': '2019-08-02T06:31:49.153000Z',
            'updatedAt': '2019-08-02T07:25:21.661000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }, {
            'uuid': 'b5ba40d5-00a3-4d2e-9f97-9b725ac98c9d',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'spark',
            'description': '',
            'modelPath': '/02ModelTestSDX/spark_test/test_resource/sparkModel',
            'runtimeImage': 'spark_deployment:1.0',
            'framework': 'SPARK',
            'runtimeResource': {
                'cpu': 2000,
                'memory': 4294967296,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'RUNNING',
            'restApi': 'http://10.115.1.130/59f35c40-aa3d-467c-a28b-15bfe7b22919/predict/submit-input',
            'serviceId': '59f35c40-aa3d-467c-a28b-15bfe7b22919',
            'apiKey': 'ea37710-81-s8014',
            'apiCallNum': 3,
            'api_call_num': 3,
            'error': null,
            'startedAt': '2019-08-02T03:08:33.395000Z',
            'stoppedAt': null,
            'createdAt': '2019-07-31T12:08:59.559000Z',
            'updatedAt': '2019-08-02T03:08:38.544000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }, {
            'uuid': '97a1c59d-cde1-424e-9834-70c96cb3efca',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'pmml',
            'description': '',
            'modelPath': '/02ModelTestSDX/pmml_test/ClusterModel/kmeans.pmml',
            'runtimeImage': 'pmml_deployment:1.0',
            'framework': 'PMML',
            'runtimeResource': {
                'cpu': 4000,
                'memory': 8589934592,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'RUNNING',
            'restApi': 'http://10.115.1.130/006ada3a-4c90-42ca-ba2d-3895f7e01fe6/predict/submit-input',
            'serviceId': '006ada3a-4c90-42ca-ba2d-3895f7e01fe6',
            'apiKey': 'e928-m17m9221-01',
            'apiCallNum': 3,
            'api_call_num': 3,
            'error': null,
            'startedAt': '2019-08-02T07:35:26.778000Z',
            'stoppedAt': null,
            'createdAt': '2019-07-31T12:05:15.660000Z',
            'updatedAt': '2019-08-02T07:35:34.842000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }, {
            'uuid': '22784890-2995-47d4-9d9a-b847c63be99d',
            'modelId': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7',
            'name': 'tf-mpg',
            'description': 'fdas',
            'modelPath': '/02ModelTestSDX/tensorflow_test/mpg/mpg_model',
            'runtimeImage': 'tensorflow_deployment:1.0',
            'framework': 'TENSORFLOW',
            'runtimeResource': {
                'cpu': 2000,
                'memory': 4294967296,
                'gpu': 0,
                'gpuModel': null
            },
            'state': 'RUNNING',
            'restApi': 'http://10.115.1.130/e948b82f-7d1c-42af-bb2b-d0864f7b62f2/predict/submit-input',
            'serviceId': 'e948b82f-7d1c-42af-bb2b-d0864f7b62f2',
            'apiKey': '17g9979a0-932-3b',
            'apiCallNum': 2,
            'api_call_num': 2,
            'error': null,
            'startedAt': '2019-07-31T12:19:04.716000Z',
            'stoppedAt': null,
            'createdAt': '2019-07-31T07:50:43.143000Z',
            'updatedAt': '2019-07-31T12:19:46.698000Z',
            'creatorId': '292a2b73-3093-4782-8719-a11e01e08398',
            'label': {}
        }],
        'total': 6
    });
}

export function getModelList() {
    return Promise.resolve({
        'items': [{
            'createdAt': '2019-07-31T06:57:11.940000Z',
            'creator': {
                'createdAt': '2019-07-29T15:55:54.806000Z',
                'description': '',
                'fullName': '系统管理员2',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.211',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-07T02:43:24.573000Z'
                },
                'permissions': [],
                'recentLogin': '2019-08-07T02:53:19.379000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-05T09:25:50.618000Z',
                'username': 'sysadmin',
                'uuid': '292a2b73-3093-4782-8719-a11e01e08398'
            },
            'description': '1111',
            'groups': [],
            'isPublic': false,
            'labels': ['dd'],
            'name': 'mode x',
            'updatedAt': '2019-07-31T06:57:11.939000Z',
            'users': [],
            'uuid': '2d28ed48-8797-4fd1-814b-7333880e6a0d'
        }, {
            'createdAt': '2019-07-31T06:56:26.349000Z',
            'creator': {
                'createdAt': '2019-07-29T15:55:54.806000Z',
                'description': '',
                'fullName': '系统管理员2',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.211',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-07T02:43:24.573000Z'
                },
                'permissions': [],
                'recentLogin': '2019-08-07T02:53:19.379000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-05T09:25:50.618000Z',
                'username': 'sysadmin',
                'uuid': '292a2b73-3093-4782-8719-a11e01e08398'
            },
            'description': '',
            'groups': [],
            'isPublic': false,
            'labels': ['smoke'],
            'name': 'model s',
            'updatedAt': '2019-07-31T06:56:26.349000Z',
            'users': [],
            'uuid': 'c0b12dc4-49a7-491c-8722-ec028d28f817'
        }, {
            'createdAt': '2019-07-31T06:13:51.215000Z',
            'creator': {
                'createdAt': '2019-07-29T15:55:54.806000Z',
                'description': '',
                'fullName': '系统管理员2',
                'groups': [],
                'isActive': true,
                'lastLogin': {
                    'clientAgent': 'Go-http-client/1.1',
                    'clientIP': '198.168.125.211',
                    'clientType': 'Unknown',
                    'loginedAt': '2019-08-07T02:43:24.573000Z'
                },
                'permissions': [],
                'recentLogin': '2019-08-07T02:53:19.379000Z',
                'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'],
                'updatedAt': '2019-08-05T09:25:50.618000Z',
                'username': 'sysadmin',
                'uuid': '292a2b73-3093-4782-8719-a11e01e08398'
            },
            'description': '',
            'groups': [],
            'isPublic': false,
            'labels': ['smoke'],
            'name': 'smoke',
            'updatedAt': '2019-07-31T06:13:51.214000Z',
            'users': [],
            'uuid': 'f1ca4342-08bc-43c7-9664-3ed421bd0fb7'
        }],
        'total': 3
    });
}
