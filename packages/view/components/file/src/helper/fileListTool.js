export const rootKinds = {
    'MY_SHARE': 'MY_SHARE',
    'ACCEPTED_SHARE': 'ACCEPTED_SHARE',
    'PROJECT_SHARE': 'PROJECT_SHARE'
};

export const BTN_NAMES = {
    SHARE: 'SHARE',
    CANCEL_SHARE: 'CANCEL_SHARE',
    DOWNLOAD: 'DOWNLOAD',
    COPY: 'COPY',
    MOVE: 'MOVE',
    RENAME: 'RENAME',
    DELETE: 'DELETE',
    PATH: 'PATH',
    UNZIP: 'UNZIP'
};

export const iconButtonTypes = {
    SHARE: {
        icon: 'sdx-icon sdx-fenxiang',
        title: '分享',
        name: BTN_NAMES.SHARE
    },
    CANCEL_SHARE: {
        icon: 'sdx-icon sdx-quxiaofenxiang',
        title: '取消分享',
        name: BTN_NAMES.CANCEL_SHARE
    },
    DOWNLOAD: {
        icon: 'sdx-icon sdx-icon--download',
        title: '下载',
        name: BTN_NAMES.DOWNLOAD
    },
    COPY: {
        icon: 'sdx-icon sdx-kaobei',
        title: '拷贝',
        name: BTN_NAMES.COPY
    },
    MOVE: {
        icon: 'sdx-icon sdx-kaobei',
        title: '移动/拷贝',
        name: BTN_NAMES.MOVE
    },
    RENAME: {
        icon: 'sdx-icon sdx-rename',
        title: '重命名',
        name: BTN_NAMES.RENAME
    },
    DELETE: {
        icon: 'sdx-icon sdx-icon-delete',
        title: '删除',
        name: BTN_NAMES.DELETE
    },
    PATH: {
        icon: 'sdx-icon sdx-icon-tickets',
        title: '查看路径',
        name: BTN_NAMES.PATH
    },
    UNZIP: {
        icon: 'sdx-icon sdx-yasuowenjian',
        title: '解压',
        name: BTN_NAMES.UNZIP
    }
};

export const ROOT_FILE_BTN_MAP = {
    [rootKinds.MY_SHARE]: [iconButtonTypes.CANCEL_SHARE],
    [rootKinds.ACCEPTED_SHARE]: [iconButtonTypes.DOWNLOAD, iconButtonTypes.COPY, iconButtonTypes.PATH],
    [rootKinds.PROJECT_SHARE]: [iconButtonTypes.DOWNLOAD, iconButtonTypes.COPY, iconButtonTypes.RENAME, iconButtonTypes.DELETE, iconButtonTypes.PATH]
};

export const fixedRowsNameMap = {
    '/fe-fixed-my-share': '我的共享',
    '/fe-fixed-accepted-share': '收到的共享',
    '/fe-fixed-project-share': '协作项目文件'
};

export const fixedRowsKeyMap = {
    '/fe-fixed-my-share': rootKinds.MY_SHARE,
    '/fe-fixed-accepted-share': rootKinds.ACCEPTED_SHARE,
    '/fe-fixed-project-share': rootKinds.PROJECT_SHARE,
};

export const fixedRows = [
    {name: fixedRowsNameMap['/fe-fixed-my-share'], isFile: false, path: '/fe-fixed-my-share', fixed: true, key: fixedRowsKeyMap['/fe-fixed-my-share']},
    {name: fixedRowsNameMap['/fe-fixed-accepted-share'], isFile: false, path: '/fe-fixed-accepted-share', fixed: true, key: fixedRowsKeyMap['/fe-fixed-accepted-share']},
    {name: fixedRowsNameMap['/fe-fixed-project-share'], isFile: false, path: '/fe-fixed-project-share', fixed: true, key: fixedRowsKeyMap['/fe-fixed-project-share']}
];

export function getFileBtn(file, rootKind) {
    if (file.fixed) return [];
    if (rootKind) {
        return ROOT_FILE_BTN_MAP[rootKind];
    } else {
        const baseButton = [iconButtonTypes.DOWNLOAD, iconButtonTypes.MOVE, iconButtonTypes.RENAME, iconButtonTypes.DELETE, iconButtonTypes.PATH];
        baseButton.unshift(iconButtonTypes.SHARE);
        if (file.fileExtension === '.zip') {
            baseButton.push(iconButtonTypes.UNZIP);
        }
        return baseButton;
    }
}

export function getFileIcon(file) {
    if (file.fixed) {
        return 'sdx-gongxiangwenjianjia';
    }
    if (file.isFile) {
        if (file.fileShareDetailId) {
            return 'sdx-yifenxiangwenjian';
        } else {
            return 'sdx-morenwenjian';
        }
    } else {
        if (file.fileShareDetailId) {
            return 'sdx-yigongxiangwenjianjia';
        } else {
            return 'sdx-wenjianjia';
        }
    }
}

export function isDirFixed(path) {
    return Object.keys(fixedRowsNameMap).includes(path);
}

export function getDirRootKind(path) {
    if (path.startsWith('/')) {
        path = '/' + path.split('/')[1];
    } else {
        path = '/' + path.split('/')[0];
    }
    if (isDirFixed(path)) {
        return fixedRowsKeyMap[path];
    } else {
        return '';
    }
}

export function getPathName(path) {
    let tempPath;
    if (!path.startsWith('/')) {
        tempPath = '/' + path;
    }
    if (isDirFixed(tempPath)) {
        return fixedRowsNameMap[tempPath];
    } else {
        return path;
    }
}
