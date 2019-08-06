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