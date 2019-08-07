const files = [
    {
        name: 'file1',
        path: '/file1',
        isFile: '1',
        ownerId: '111'
    },
    {
        name: 'file2',
        path: '/file2',
        isFile: '0',
        ownerId: '111'
    }
];

export function searchFiles(options) {
    return Promise.resolve({
        files,
        total: 100
    });
}

export function getFilesList(options) {
    return Promise.resolve({
        children: files,
        childrenCount: 100
    });
}

export function getCopyTaskList() {
    return Promise.resolve({
        jobs: [],
        total: 0
    });
}

export function getUnzipTaskList() {
    return Promise.resolve({
        jobs: [],
        total: 0
    });
}
