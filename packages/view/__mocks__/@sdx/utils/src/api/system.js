export function getPodLog() {
    return Promise.resolve({
        contents: ['first line', 'second line', 'third line'],
        total: 1000
    });
}

export function getPodsStatus() {
    return Promise.resolve({
        'status_list': [
            {'podId': 'b5ecf972-b217-11e9-a56a-d094667446bd', 'podName': 'kube-apiserver-sdx-app-1.localdomain', 'namespace': 'kube-system', 'status': 'running', 'nodeName': 'sdx-app-1.localdomain', 'nodeIp': '10.115.1.130', 'podIp': '10.115.1.130'}, 
            {'podId': 'b08fdfac-b217-11e9-a56a-d094667446bd', 'podName': 'kube-controller-manager-sdx-app-1.localdomain', 'namespace': 'kube-system', 'status': 'running', 'nodeName': 'sdx-app-1.localdomain', 'nodeIp': '10.115.1.130', 'podIp': '10.115.1.130'}, 
            {'podId': 'b2f202fd-b217-11e9-a56a-d094667446bd', 'podName': 'kube-scheduler-sdx-app-1.localdomain', 'namespace': 'kube-system', 'status': 'running', 'nodeName': 'sdx-app-1.localdomain', 'nodeIp': '10.115.1.130', 'podIp': '10.115.1.130'}, 
            {'podId': 'bc8891ff-b217-11e9-a56a-d094667446bd', 'podName': 'calico-node-klgkd', 'namespace': 'kube-system', 'status': 'running', 'nodeName': 'sdx-app-1.localdomain', 'nodeIp': '10.115.1.130', 'podIp': '10.115.1.130'}
        ]});
}

export function getClusterResourceMonitor() {
    return Promise.resolve({
        'total': {
            'cpu': 160, 
            'memory': 539566981120, 
            'gpu': 6, 
            'gpuModels': ['Tesla-K80', 'Tesla-K80', 'Tesla-K80', 'Tesla-K80', 'GeForce-GTX-1080-Ti', 'GeForce-GTX-1080-Ti'], 
            'gpuMemory': 71430832128
        }, 
        'used': {
            'cpu': 0.012547222222266674, 
            'memory': 223331786752, 
            'gpu': 0.0, 
            'gpuMemory': 0
        }
    });
}