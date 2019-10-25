export function getPackagesByUuid() {
    return Promise.resolve({
        'data': [
            {
                'name': 'Babel',
                'sourceType': 'PIP',
                'uuid': '84ba8a2d-71ef-4781-953d-008d67c0449a',
                'version': '2.6.0'
            },
            {
                'name': 'Click',
                'sourceType': 'PIP',
                'uuid': '5cfda0d3-0bac-4ab5-a996-e6be5800dba6',
                'version': '7.0'
            },
            {
                'name': 'Cython',
                'sourceType': 'PIP',
                'uuid': '2ef368e2-54e7-4eae-a4c5-4ffc492f60fb',
                'version': '0.28.5'
            },
            {
                'name': 'Flask',
                'sourceType': 'PIP',
                'uuid': '42aa703b-34ea-4216-b098-d9db7b7621fb',
                'version': '0.12.2'
            },
            {
                'name': 'Flask-Cors',
                'sourceType': 'PIP',
                'uuid': '1ce77007-f8cb-4396-af3f-4e12afb898de',
                'version': '3.0.7'
            }
        ],
        'total': 574
    });
}

export function getImageBuildLog() {
    return Promise.resolve({
        'content': '\nstart to build image(dockerfile111:ddd)\n(1/5)build docker image(dockerfile111:ddd) from DockerFile(/SkyDiscovery/cephfs/data/user/volume-2eb136e0-2b0d-43f9-9b51-6ed62758a279/dockerfile/Dockerfile)...\n',
        'length': 2507
    });
}

export function getSourceRepos() {
    return Promise.resolve([
        {
            'sourceName': 'aliyun',
            'sourceType': 'PIP',
            'sourceUrl': 'https://mirrors.aliyun.com/pypi/simple/'
        },
        {
            'sourceName': 'douban',
            'sourceType': 'PIP',
            'sourceUrl': 'https://pypi.douban.com/simple/'
        },
        {
            'sourceName': 'tsinghua',
            'sourceType': 'PIP',
            'sourceUrl': 'https://pypi.tuna.tsinghua.edu.cn/simple/'
        },
        {
            'sourceName': 'ustc',
            'sourceType': 'PIP',
            'sourceUrl': 'https://pypi.mirrors.ustc.edu.cn/simple/'
        },
        {
            'sourceName': 'tsinghua',
            'sourceType': 'CONDA',
            'sourceUrl': 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/'
        }
    ]);
}

export function getImage() {
    return Promise.resolve({
        'buildType': 'BASIC',
        'createdAt': '2019-04-20T17:46:14+00:00',
        'groups': null,
        'imageType': 'TENSORFLOW',
        'name': 'tensorflow1.12.0_py2.7_cpu',
        'operations': [
            'extend'
        ],
        'ownerId': null,
        'packages': [
            '6e8b01dc-e7f9-4c59-b3d1-c24bee0d7091',
            '33096248-dbbb-4a09-b641-7d8d826701a5',
            '1f69858c-bcf5-4343-9b2b-eecb9501db14'
        ],
        'projectName': 'skyintelligent',
        'shareType': 'PUBLIC',
        'updatedAt': '2019-08-02T06:25:30.191000+00:00',
        'users': null,
        'uuid': '3b4c386c-0f81-414c-abbb-36ae96f5c5dd',
        'version': 'latest'
    }
    );
}

export function getImageList() {
    return Promise.resolve({
        data: [],
        total: 3
    });
}

export function buildImageBasic() {
    return Promise.resolve({

    });
}

export function getImageTaskList() {
    return Promise.resolve({
        total: 66,
        data: [
            {
                baseImage: null,
                buildType: 'ONLINE',
                createdAt: '2019-08-02T01:51:18.598000Z',
                errorMsg: 'image build runtime error',
                imageType: 'JUPYTER',
                installPackages: [],
                name: 'tar123',
                operations: ['remove', 'log'],
                owner: {createdAt: '2019-07-30T08:19:24.031000Z', description: '', expiresAt: '2020-07-29T08:19:24.031000Z'},
                projectName: 'af0ef5df-e867-4f34-9a98-940013a462ef',
                state: {content: '已失败', label: 'FAILED', needPull: false},
                uninstallPackages: [],
                updatedAt: '2019-08-02T01:51:19.760000Z',
                upgradePackages: [],
                uuid: '72d1393a-86e1-467c-a935-e28c1ee01b41',
                version: 'v1',
                showDiff: true,
                showLog: true,
                showRemove: true
            }
        ]
    });
}
