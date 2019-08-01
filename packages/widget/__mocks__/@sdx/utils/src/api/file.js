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
        total: 100
    });
}
