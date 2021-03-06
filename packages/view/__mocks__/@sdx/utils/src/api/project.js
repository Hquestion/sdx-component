export function getTaskList(params) {
    if (params.groupBy && params.groupBy === 'NAMESPACE') {
        return Promise.resolve({'items':[{'quota':{'cpu':61000,'gpus':{},'memory':130996502528}}],'total':1});
    } else if (params.groupBy && params.groupBy === 'USER') {
        return Promise.resolve({
            'items':[
                {'owner':{'createdAt':'2019-07-30T06:42:16.263000Z','description':'','expiresAt':'2020-07-29T06:42:45.494000Z','fullName':'张霞','groups':[],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.241','clientType':'Unknown','loginedAt':'2019-08-07T09:58:36.236000Z'},'permissions':['9fdff30d-da5f-443b-a8f4-6339c12eb7b4'],'recentLogin':'2019-08-08T07:58:47.147000Z','roles':['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c','75c71638-36bb-4d19-91d6-edc9811b8278'],'updatedAt':'2019-08-02T08:52:47.781000Z','username':'xia.zhang','uuid':'67ee5756-e983-4a45-bd3a-b4e2f9667363'},'quota':{'cpu':22000,'gpus':{},'memory':47244640256}},
                {'owner':{'createdAt':'2019-07-29T15:55:54.806000Z','description':'','fullName':'系统管理员2','groups':[],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.211','clientType':'Unknown','loginedAt':'2019-08-07T02:53:19.379000Z'},'permissions':[],'recentLogin':'2019-08-08T07:20:27.747000Z','roles':['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c','75c71638-36bb-4d19-91d6-edc9811b8278'],'updatedAt':'2019-08-05T09:25:50.618000Z','username':'sysadmin','uuid':'292a2b73-3093-4782-8719-a11e01e08398'},'quota':{'cpu':21000,'gpus':{},'memory':45097156608}},
                {'owner':{'createdAt':'2019-07-30T08:19:24.031000Z','description':'','expiresAt':'2020-07-29T08:19:24.031000Z','fullName':'ya.zhang','groups':[],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.241','clientType':'Unknown','loginedAt':'2019-08-07T04:57:03.701000Z'},'permissions':[],'recentLogin':'2019-08-08T02:49:27.267000Z','roles':['75c71638-36bb-4d19-91d6-edc9811b8278'],'updatedAt':'2019-08-01T11:44:54.531000Z','username':'ya.zhang','uuid':'af0ef5df-e867-4f34-9a98-940013a462ef'},'quota':{'cpu':14000,'gpus':{},'memory':30064771072}},
                {'owner':{'createdAt':'2019-08-02T21:06:19.129000Z','description':'','expiresAt':'2020-08-01T21:06:18.665000Z','fullName':'chunyiguo','groups':[],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.216','clientType':'Unknown','loginedAt':'2019-08-02T21:06:45.380000Z'},'permissions':[],'recentLogin':'2019-08-06T17:34:24.650000Z','roles':['75c71638-36bb-4d19-91d6-edc9811b8278','64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c'],'username':'chunyi.guo','uuid':'d2242bed-0a42-4179-9209-6e43404a0259'},'quota':{'cpu':2000,'gpus':{},'memory':4294967296}},
                {'owner':{'createdAt':'2019-07-30T06:01:02.942000Z','description':'','expiresAt':'2020-07-29T06:01:02.728000Z','fullName':'zz11','groups':[],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.241','clientType':'Unknown','loginedAt':'2019-08-08T03:36:49.459000Z'},'permissions':[],'recentLogin':'2019-08-08T03:37:48.152000Z','roles':['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c','75c71638-36bb-4d19-91d6-edc9811b8278'],'username':'zz11','uuid':'3a8e9d8b-7a0a-4441-9074-1b9327d4a746'},'quota':{'cpu':1000,'gpus':{},'memory':2147483648}},
                {'owner':{'createdAt':'2019-08-05T05:45:07.143000Z','description':'','expiresAt':'2020-08-04T05:45:06.915000Z','fullName':'shenxiaoliu','groups':['a4d64783-394c-4d57-a359-96b9bcc4da70'],'isActive':true,'lastLogin':{'clientAgent':'Go-http-client/1.1','clientIP':'198.168.125.235','clientType':'Unknown','loginedAt':'2019-08-05T09:07:45.263000Z'},'permissions':[],'recentLogin':'2019-08-05T11:36:37.130000Z','roles':['75c71638-36bb-4d19-91d6-edc9811b8278'],'updatedAt':'2019-08-05T06:35:10.637000Z','username':'sjl','uuid':'3e1704f5-3aea-46d6-b3ce-008beec63560'},'quota':{'cpu':1000,'gpus':{},'memory':2147483648}}
            ],
            'total':6
        });
    } else {
        return Promise.resolve({
            'items': [
                { '_cls': 'apis.v1.task.models.data_service.DataService', 'args': '', 'createdAt': '2019-07-31T12:14:52.711000Z', 'description': '', 'error': '', 'executionId': '46db7563-4995-4be7-985b-e54cfaa5b69d', 'image': { 'uuid': '77769a23-d544-478d-9e99-b27e7376spark' }, 'mainClass': 'cn.skydata.skyintelligent.BaseApplication', 'name': 'ddd', 'nodeId': 'deploy-2d686a17-32f3-44b7-b10b-015b26d60410', 'owner': { 'createdAt': '2019-07-29T15:55:54.806000Z', 'description': '', 'fullName': '系统管理员2', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-01T12:19:03.339000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T01:44:06.468000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'updatedAt': '2019-07-30T12:22:59.764000Z', 'username': 'sysadmin', 'uuid': '292a2b73-3093-4782-8719-a11e01e08398' }, 'pods': [{ 'name': 'deploy-2d686a17-32f3-44b7-b10b-015b26d60410-1564710873602-exec-1', 'reason': '', 'startTime': '', 'state': '' }, { 'name': 'deploy-2d686a17-32f3-44b7-b10b-015b26d60410-driver', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 8000, 'gpu': 0, 'gpuModel': '', 'memory': 17179869184 }, 'resourceConfig': { 'SPARK_DRIVER_CPUS': 4000, 'SPARK_DRIVER_MEMORY': 8589934592, 'SPARK_EXECUTOR_CPUS': 4000, 'SPARK_EXECUTOR_INSTANCES': 1, 'SPARK_EXECUTOR_MEMORY': 8589934592 }, 'service_list': [{ 'internal_port': 8080, 'protocol': 'TCP', 'service': 'http://service-deploy-2d686a17-32f3-44b7-b10b-015b26d60410.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/share/bin/skyflow.jar'], 'sparkParams': '', 'startedAt': '2019-08-02T01:54:05.594000Z', 'state': 'RUNNING', 'type': 'DATA_SERVICE', 'updatedAt': '2019-08-02T01:55:24.166000Z', 'uuid': '2277c8e1-3649-4883-bd79-194bf2df4c97' },
                { '_cls': 'apis.v1.task.models.tensorboard.TensorboardTask', 'createdAt': '2019-07-31T05:49:43.302000Z', 'description': 'rrr', 'error': '', 'executionId': '4ad4ee81-ec80-4720-a7c1-003db8a3582f', 'externalUrl': 'http://10.115.1.130/4ada9929-9e5a-4c3a-a12c-e7b1cd6b7770', 'external_url': 'http://10.115.1.130/4ada9929-9e5a-4c3a-a12c-e7b1cd6b7770', 'image': { 'uuid': '96012f9a-8b81-42c7-930b-a3c268f21f01' }, 'logPaths': ['/'], 'name': 'rrrra', 'nodeId': 'deploy-3a45230e-99f3-4deb-9d12-81f1577b014e', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-3a45230e-99f3-4deb-9d12-81f1577b014e-666d95649f-fvjtq', 'reason': '', 'startTime': '', 'state': '' }], 'project': { 'uuid': '0cc26a9f-1a89-4c1a-8015-858311693602' }, 'quota': { 'cpu': 4000, 'gpu': 0, 'gpuModel': '', 'memory': 8589934592 }, 'resourceConfig': { 'EXECUTOR_CPUS': 4000, 'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1, 'EXECUTOR_MEMORY': 8589934592, 'GPU_MODEL': '' }, 'service_list': [{ 'internal_port': 19996, 'protocol': 'TCP', 'proxy_port': 43303, 'service': 'http://service-deploy-3a45230e-99f3-4deb-9d12-81f1577b014e.skydiscovery-app' }], 'startedAt': '2019-07-31T05:49:48.711000Z', 'state': 'RUNNING', 'type': 'TENSORBOARD', 'updatedAt': '2019-07-31T05:49:52.237000Z', 'uuid': '4ada9929-9e5a-4c3a-a12c-e7b1cd6b7770' },
                { '_cls': 'apis.v1.task.models.model_serving.TensorflowServing', 'createdAt': '2019-08-01T06:46:42.621000Z', 'error': '', 'executionId': '6ea9f1b0-8d81-4735-ad24-74b0ebfdd21c', 'image': { 'uuid': 'tensorflow_deployment:1.0' }, 'name': 'ModelServing-9976f0fd-43e3-4306-9395-e23bc2632b5e', 'nodeId': 'deploy-efe119dc-2958-4c9c-b517-4e10dd488c94', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-efe119dc-2958-4c9c-b517-4e10dd488c94-965965ccd-6ppwm', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 4000, 'gpu': null, 'gpuModel': null, 'memory': 8589934592 }, 'resourceConfig': { 'EXECUTOR_CPUS': 4000, 'EXECUTOR_GPUS': null, 'EXECUTOR_MEMORY': 8589934592, 'GPU_MODEL': null }, 'serviceList': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 42708, 'service': 'http://service-deploy-efe119dc-2958-4c9c-b517-4e10dd488c94.skydiscovery-app' }], 'service_list': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 42708, 'service': 'http://service-deploy-efe119dc-2958-4c9c-b517-4e10dd488c94.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/data/user/volume-2eb136e0-2b0d-43f9-9b51-6ed62758a279/测试文件/02ModelTestSDX/tensorflow_test/mpg/mpg_model'], 'startedAt': '2019-08-01T06:46:42.711000Z', 'state': 'RUNNING', 'type': 'TENSORFLOW_SERVING', 'updatedAt': '2019-08-01T06:46:47.791000Z', 'uuid': 'ec840e51-806c-4a9b-9619-5c0d62c3a61e' },
                { '_cls': 'apis.v1.task.models.tensorboard.TensorboardTask', 'createdAt': '2019-08-02T02:08:49.280000Z', 'description': '', 'error': '', 'executionId': 'f038b46b-4b1d-4f85-b5b3-8a1c8529a615', 'externalUrl': 'http://10.115.1.130/b08bbd51-a7a8-4716-b069-a41ee1869576', 'external_url': 'http://10.115.1.130/b08bbd51-a7a8-4716-b069-a41ee1869576', 'image': { 'uuid': '96012f9a-8b81-42c7-930b-a3c268f21f01' }, 'logPaths': ['/logs'], 'name': 'tb', 'nodeId': 'deploy-495d0024-0552-416d-8370-3b8f3c589395', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-495d0024-0552-416d-8370-3b8f3c589395-6cb8b697b5-99rp8', 'reason': '', 'startTime': '', 'state': '' }], 'project': { 'createdAt': '2019-08-01T06:35:24.335000Z', 'description': 'dd', 'groups': [], 'isTemplate': false, 'name': 'new', 'ownerId': '67ee5756-e983-4a45-bd3a-b4e2f9667363', 'type': 'private', 'updatedAt': '2019-08-01T06:35:24.335000Z', 'users': [], 'uuid': '10a9ffd7-6648-4849-9cb2-9c9aedf408c3' }, 'quota': { 'cpu': 4000, 'gpu': 0, 'gpuModel': '', 'memory': 8589934592 }, 'resourceConfig': { 'EXECUTOR_CPUS': 4000, 'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1, 'EXECUTOR_MEMORY': 8589934592, 'GPU_MODEL': '' }, 'service_list': [{ 'internal_port': 19996, 'protocol': 'TCP', 'proxy_port': 40014, 'service': 'http://service-deploy-495d0024-0552-416d-8370-3b8f3c589395.skydiscovery-app' }], 'startedAt': '2019-08-02T02:15:18.427000Z', 'state': 'RUNNING', 'type': 'TENSORBOARD', 'updatedAt': '2019-08-02T02:15:20.684000Z', 'uuid': 'b08bbd51-a7a8-4716-b069-a41ee1869576' },
                { '_cls': 'apis.v1.task.models.data_service.DataService', 'args': '', 'createdAt': '2019-08-02T02:22:59.387000Z', 'description': 'sss', 'error': '', 'executionId': '58aba60b-3756-4718-9489-ff14458f49fc', 'image': { 'uuid': '77769a23-d544-478d-9e99-b27e7376spark' }, 'mainClass': 'cn.skydata.skyintelligent.BaseApplication', 'name': '数据服务', 'nodeId': 'deploy-6b00e825-a35b-4e99-9f28-809f341a4448', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-6b00e825-a35b-4e99-9f28-809f341a4448-1564712593510-exec-1', 'reason': '', 'startTime': '', 'state': '' }, { 'name': 'deploy-6b00e825-a35b-4e99-9f28-809f341a4448-driver', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 4000, 'gpu': 0, 'gpuModel': '', 'memory': 8589934592 }, 'resourceConfig': { 'SPARK_DRIVER_CPUS': 2000, 'SPARK_DRIVER_MEMORY': 4294967296, 'SPARK_EXECUTOR_CPUS': 2000, 'SPARK_EXECUTOR_INSTANCES': 1, 'SPARK_EXECUTOR_MEMORY': 4294967296 }, 'service_list': [{ 'internal_port': 8080, 'protocol': 'TCP', 'service': 'http://service-deploy-6b00e825-a35b-4e99-9f28-809f341a4448.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/share/bin/skyflow.jar'], 'sparkParams': '', 'startedAt': '2019-08-02T02:23:01.420000Z', 'state': 'RUNNING', 'type': 'DATA_SERVICE', 'updatedAt': '2019-08-02T02:24:01.303000Z', 'uuid': 'f25ab58d-bcfb-44a3-b3dd-c14907c8acd1' },
                { '_cls': 'apis.v1.task.models.container_dev.ContainerDevTask', 'createdAt': '2019-07-30T08:27:39.486000Z', 'datasets': [], 'datasources': [], 'description': '', 'error': '', 'executionId': '0e6f3af5-8b75-4113-896d-a8f85149f2eb', 'externalUrl': 'http://10.115.1.130/64e15722-ff0d-47ba-a7db-61f600155cd2', 'external_url': 'http://10.115.1.130/64e15722-ff0d-47ba-a7db-61f600155cd2', 'image': { 'uuid': '3ce75221-9081-4a88-a9da-92e7daf4320a' }, 'name': 'eeee', 'nodeId': 'deploy-740bf5b3-31a2-4617-a6a0-d76b3080b8a8', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-740bf5b3-31a2-4617-a6a0-d76b3080b8a8-57b7db8c85-tqn7n', 'reason': '', 'startTime': '', 'state': '' }], 'project': { 'uuid': '0cc26a9f-1a89-4c1a-8015-858311693602' }, 'quota': { 'cpu': 2000, 'gpu': 0, 'gpuModel': '', 'memory': 4294967296 }, 'resourceConfig': { 'EXECUTOR_CPUS': 2000, 'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1, 'EXECUTOR_MEMORY': 4294967296, 'GPU_MODEL': '' }, 'service_list': [{ 'internal_port': 3000, 'protocol': 'TCP', 'proxy_port': 45229, 'service': 'http://service-deploy-740bf5b3-31a2-4617-a6a0-d76b3080b8a8.skydiscovery-app' }], 'startedAt': '2019-07-31T07:26:31.221000Z', 'state': 'RUNNING', 'type': 'CONTAINERDEV', 'updatedAt': '2019-07-31T07:26:35.540000Z', 'uuid': '64e15722-ff0d-47ba-a7db-61f600155cd2' },
                { '_cls': 'apis.v1.task.models.model_serving.TensorflowServing', 'createdAt': '2019-07-31T12:19:04.615000Z', 'error': '', 'executionId': '62522e48-8f43-4cd5-ba09-607f0eeee97f', 'image': { 'uuid': 'tensorflow_deployment:1.0' }, 'name': 'ModelServing-22784890-2995-47d4-9d9a-b847c63be99d', 'nodeId': 'deploy-0b00b52d-d271-4217-9893-53bb565d85d0', 'owner': { 'createdAt': '2019-07-29T15:55:54.806000Z', 'description': '', 'fullName': '系统管理员2', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-01T12:19:03.339000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T01:44:06.468000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'updatedAt': '2019-07-30T12:22:59.764000Z', 'username': 'sysadmin', 'uuid': '292a2b73-3093-4782-8719-a11e01e08398' }, 'pods': [{ 'name': 'deploy-0b00b52d-d271-4217-9893-53bb565d85d0-698dcfcd58-sgdhr', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 2000, 'gpu': null, 'gpuModel': null, 'memory': 4294967296 }, 'resourceConfig': { 'EXECUTOR_CPUS': 2000, 'EXECUTOR_GPUS': null, 'EXECUTOR_MEMORY': 4294967296, 'GPU_MODEL': null }, 'serviceList': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 41393, 'service': 'http://service-deploy-0b00b52d-d271-4217-9893-53bb565d85d0.skydiscovery-app' }], 'service_list': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 41393, 'service': 'http://service-deploy-0b00b52d-d271-4217-9893-53bb565d85d0.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/data/user/volume-ab8b2093-838a-4cd5-8465-a6018a3ab1df/02ModelTestSDX/tensorflow_test/mpg/mpg_model'], 'startedAt': '2019-07-31T12:19:04.712000Z', 'state': 'RUNNING', 'type': 'TENSORFLOW_SERVING', 'updatedAt': '2019-07-31T12:19:44.481000Z', 'uuid': 'e948b82f-7d1c-42af-bb2b-d0864f7b62f2' },
                { '_cls': 'apis.v1.task.models.model_serving.PmmlServing', 'createdAt': '2019-07-31T12:28:30.740000Z', 'error': '', 'executionId': 'f1dedaba-e16c-4534-8f5d-19321f5ccc0f', 'image': { 'uuid': 'pmml_deployment:1.0' }, 'name': 'ModelServing-97a1c59d-cde1-424e-9834-70c96cb3efca', 'nodeId': 'deploy-4b23c4b4-ff9d-4f7e-84bb-b6065f338292', 'owner': { 'createdAt': '2019-07-29T15:55:54.806000Z', 'description': '', 'fullName': '系统管理员2', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-01T12:19:03.339000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T01:44:06.468000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'updatedAt': '2019-07-30T12:22:59.764000Z', 'username': 'sysadmin', 'uuid': '292a2b73-3093-4782-8719-a11e01e08398' }, 'pods': [{ 'name': 'deploy-4b23c4b4-ff9d-4f7e-84bb-b6065f338292-7d7d8d7fbc-d9xdd', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 2000, 'gpu': null, 'gpuModel': null, 'memory': 4294967296 }, 'resourceConfig': { 'EXECUTOR_CPUS': 2000, 'EXECUTOR_GPUS': null, 'EXECUTOR_MEMORY': 4294967296, 'GPU_MODEL': null }, 'serviceList': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 41653, 'service': 'http://service-deploy-4b23c4b4-ff9d-4f7e-84bb-b6065f338292.skydiscovery-app' }], 'service_list': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 41653, 'service': 'http://service-deploy-4b23c4b4-ff9d-4f7e-84bb-b6065f338292.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/data/user/volume-ab8b2093-838a-4cd5-8465-a6018a3ab1df/02ModelTestSDX/pmml_test/RegressionModel/lr.pmml'], 'startedAt': '2019-07-31T12:28:30.843000Z', 'state': 'RUNNING', 'type': 'PMML_SERVING', 'updatedAt': '2019-07-31T12:28:33.793000Z', 'uuid': '5b27d965-a7a6-42a6-8555-8f04c9e47e32' },
                { '_cls': 'apis.v1.task.models.model_serving.PmmlServing', 'createdAt': '2019-08-01T06:47:36.896000Z', 'error': '', 'executionId': '6a9825b1-dd56-48fe-b4ec-6ff1efff5ed6', 'image': { 'uuid': 'pmml_deployment:1.0' }, 'name': 'ModelServing-980bb85f-d930-406f-b2e2-4c8062e53f93', 'nodeId': 'deploy-10ff1d86-1240-47a3-885b-55839fb389d0', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-10ff1d86-1240-47a3-885b-55839fb389d0-576cfd48cc-dpnwc', 'reason': '', 'startTime': '', 'state': '' }], 'project': '', 'quota': { 'cpu': 2000, 'gpu': null, 'gpuModel': null, 'memory': 4294967296 }, 'resourceConfig': { 'EXECUTOR_CPUS': 2000, 'EXECUTOR_GPUS': null, 'EXECUTOR_MEMORY': 4294967296, 'GPU_MODEL': null }, 'serviceList': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 46691, 'service': 'http://service-deploy-10ff1d86-1240-47a3-885b-55839fb389d0.skydiscovery-app' }], 'service_list': [{ 'internal_port': 5500, 'protocol': 'TCP', 'proxy_port': 46691, 'service': 'http://service-deploy-10ff1d86-1240-47a3-885b-55839fb389d0.skydiscovery-app' }], 'sourcePaths': ['/SkyDiscovery/cephfs/data/user/volume-2eb136e0-2b0d-43f9-9b51-6ed62758a279/测试文件/02ModelTestSDX/pmml_test/RegressionModel/lr.pmml'], 'startedAt': '2019-08-01T06:47:36.986000Z', 'state': 'RUNNING', 'type': 'PMML_SERVING', 'updatedAt': '2019-08-01T06:47:47.363000Z', 'uuid': '1c10242e-5926-4131-9078-ddd5cc10fe27' },
                { '_cls': 'apis.v1.task.models.jupyter.JupyterTask', 'createdAt': '2019-08-02T01:53:20.362000Z', 'datasets': [], 'datasources': [], 'description': 'ddd', 'error': '', 'executionId': '4e087293-4b65-4f4a-9fde-8f3aa9c55553', 'externalUrl': 'http://10.115.1.130/c80677f1-9724-4990-b02c-08a8dd0688cd', 'external_url': 'http://10.115.1.130/c80677f1-9724-4990-b02c-08a8dd0688cd', 'image': { 'uuid': 'a21f700f-1679-4f13-b3e0-0e4737d0a523' }, 'name': 'jupyter', 'nodeId': 'deploy-d9d53212-ded3-48b6-9ae4-3d334984dbe4', 'owner': { 'createdAt': '2019-07-30T06:42:16.263000Z', 'description': '', 'expiresAt': '2020-07-29T06:42:45.494000Z', 'fullName': '张霞', 'groups': [], 'isActive': true, 'lastLogin': { 'clientAgent': 'Go-http-client/1.1', 'clientIP': '198.168.125.216', 'clientType': 'Unknown', 'loginedAt': '2019-08-02T02:24:24.038000Z' }, 'permissions': [], 'recentLogin': '2019-08-02T02:25:05.307000Z', 'roles': ['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c', '75c71638-36bb-4d19-91d6-edc9811b8278'], 'username': 'xia.zhang', 'uuid': '67ee5756-e983-4a45-bd3a-b4e2f9667363' }, 'pods': [{ 'name': 'deploy-d9d53212-ded3-48b6-9ae4-3d334984dbe4-795bfc8b7-tddkz', 'reason': '', 'startTime': '', 'state': '' }], 'project': { 'createdAt': '2019-08-01T06:35:24.335000Z', 'description': 'dd', 'groups': [], 'isTemplate': false, 'name': 'new', 'ownerId': '67ee5756-e983-4a45-bd3a-b4e2f9667363', 'type': 'private', 'updatedAt': '2019-08-01T06:35:24.335000Z', 'users': [], 'uuid': '10a9ffd7-6648-4849-9cb2-9c9aedf408c3' }, 'quota': { 'cpu': 2000, 'gpu': 0, 'gpuModel': '', 'memory': 4294967296 }, 'resourceConfig': { 'EXECUTOR_CPUS': 2000, 'EXECUTOR_GPUS': 0, 'EXECUTOR_INSTANCES': 1, 'EXECUTOR_MEMORY': 4294967296, 'GPU_MODEL': '' }, 'service_list': [{ 'internal_port': 19994, 'protocol': 'TCP', 'proxy_port': 44206, 'service': 'http://service-deploy-d9d53212-ded3-48b6-9ae4-3d334984dbe4.skydiscovery-app' }], 'startedAt': '2019-08-02T02:15:46.882000Z', 'state': 'RUNNING', 'type': 'JUPYTER', 'updatedAt': '2019-08-02T02:15:50.879000Z', 'uuid': 'c80677f1-9724-4990-b02c-08a8dd0688cd' }
            ],
            'total': 13
        });
    }
}

export function getTaskDetail() {
    return Promise.resolve({
        '_cls':'apis.v1.task.models.spark.SparkTask',
        'args':'',
        'createdAt':'2019-08-02T01:53:01.213000Z',
        'description':'dddd',
        'error':'',
        'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
        'image':{'buildType':'BASIC',
            'createdAt':'2019-08-01T02:14:26+00:00',
            'groups':null,
            'imageType':'SPARK',
            'name':'spark2.4.0_py2.7_cpu',
            'operations':[],
            'ownerId':null,
            'packages':null,
            'projectName':'skyintelligent',
            'shareType':'PUBLIC',
            'updatedAt':'2019-08-02T06:23:03.937000+00:00',
            'users':null,
            'uuid':'4bae7888-37a7-425f-823c-f8fb450169d1',
            'version':'latest'},
        'mainClass':'org.apache.spark.examples.SparkPi ',
        'name':'spark',
        'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
        'owner':{'createdAt':'2019-07-30T06:42:16.263000Z',
            'description':'',
            'expiresAt':'2020-07-29T06:42:45.494000Z',
            'fullName':'张霞',
            'groups':[],
            'isActive':true,
            'lastLogin':{'clientAgent':'Go-http-client/1.1',
                'clientIP':'198.168.125.241',
                'clientType':'Unknown',
                'loginedAt':'2019-08-08T09:52:58.374000Z'},
            'permissions':['9fdff30d-da5f-443b-a8f4-6339c12eb7b4'],
            'recentLogin':'2019-08-09T02:07:27.964000Z',
            'roles':['64e5b6c6-8e47-4e4a-b0de-f3c0eb47dc4c',
                '75c71638-36bb-4d19-91d6-edc9811b8278'],
            'updatedAt':'2019-08-02T08:52:47.781000Z',
            'username':'xia.zhang',
            'uuid':'67ee5756-e983-4a45-bd3a-b4e2f9667363'},
        'pods':[
            {
                'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver',
                'reason':'',
                'startTime':'',
                'state':''
            }
        ],
        'project':{
            'createdAt':'2019-08-01T06:35:24.335000Z',
            'description':'dd',
            'groups':[],
            'isTemplate':false,
            'name':'new',
            'ownerId':'67ee5756-e983-4a45-bd3a-b4e2f9667363',
            'type':'private',
            'updatedAt':'2019-08-01T06:35:24.335000Z',
            'users':[],
            'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
        'quota':{
            'cpu':24000,
            'gpu':0,
            'gpuModel':'',
            'memory':51539607552
        },
        'resourceConfig':{
            'SPARK_DRIVER_CPUS':12000,
            'SPARK_DRIVER_MEMORY':25769803776,
            'SPARK_EXECUTOR_CPUS':12000,
            'SPARK_EXECUTOR_INSTANCES':1,
            'SPARK_EXECUTOR_MEMORY':25769803776
        },
        'sourcePaths':['/test.py'],
        'sparkParams':'',
        'startedAt':'2019-08-02T07:57:50.370000Z',
        'state':'FINISHED',
        'stoppedAt':'2019-08-02T07:58:51.493000Z',
        'type':'SPARK',
        'updatedAt':'2019-08-02T08:08:20.874000Z',
        'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b'
    });
}

export function getDataSet() {
    return Promise.resolve({
        data: {
            options: []
        },
        error_code: 0,
        success: true
    });
}

export function getProjectDetail() {
    return Promise.resolve({
        data: {
            createdAt: '2019-08-02T01:42:30.144000Z',
            description: 'dddd',
            groups: [],
            isTemplate: true,
            name: '模板项目',
            ownerId: '67ee5756-e983-4a45-bd3a-b4e2f9667363',
            type: 'private',
            updatedAt: '2019-08-02T01:42:30.144000Z',
            users: [],
            uuid: '267da0dc-4c47-4343-8a83-ccebce092c78',
        }
    });
}

export function getTaskDataSource() {
    return Promise.resolve({
        data: {
            options: []
        },
        error_code: 0,
        success: true
    });
}

export function createProject() {
    return Promise.resolve();
}

export function getSelfCreatedProjects() {
    return Promise.resolve({
        data: {
            items: [],
            total: 2
        },
        total: 2
    });
}

export function getSharingProjects() {
    return Promise.resolve({
        data: {
            items: [],
            total: 2
        },
        total: 2
    });
}

export function getProjectTemplates() {
    return Promise.resolve({
        data: {
            items: [],
            total: 2
        },
        total: 2
    });
}
