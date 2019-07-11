import auth from '@sdx/widget/components/auth';

export const rootKinds = {
    'MY_SHARE': 'MY_SHARE',
    'ACCEPTED_SHARE': 'ACCEPTED_SHARE',
    'PROJECT_SHARE': 'PROJECT_SHARE'
};

export const MY_SHARE_PATH = '/fe-fixed-my-share';
export const ACCEPTED_SHARE_PATH = '/fe-fixed-accepted-share';
export const PROJECT_SHARE_PATH = '/fe-fixed-project-share';

export const rootKindPathMap = {
    [rootKinds.MY_SHARE]: MY_SHARE_PATH,
    [rootKinds.ACCEPTED_SHARE]: ACCEPTED_SHARE_PATH,
    [rootKinds.PROJECT_SHARE]:PROJECT_SHARE_PATH
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

const authIconButtonMap = {
    [BTN_NAMES.SHARE]: 'FILE-MANAGER:FILE:SHARE:""',
    [BTN_NAMES.DOWNLOAD]: 'FILE-MANAGER:FILE:DOWNLOAD:""'
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
        name: BTN_NAMES.DOWNLOAD,
        loading: false
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
    [rootKinds.PROJECT_SHARE]: [iconButtonTypes.DOWNLOAD, iconButtonTypes.MOVE, iconButtonTypes.RENAME, iconButtonTypes.DELETE, iconButtonTypes.PATH]
};

export const fixedRowsNameMap = {
    [MY_SHARE_PATH]: '我的共享',
    [ACCEPTED_SHARE_PATH]: '收到的共享',
    [PROJECT_SHARE_PATH]: '协作项目文件'
};

export const fixedRowsKeyMap = {
    [MY_SHARE_PATH]: rootKinds.MY_SHARE,
    [ACCEPTED_SHARE_PATH]: rootKinds.ACCEPTED_SHARE,
    [PROJECT_SHARE_PATH]: rootKinds.PROJECT_SHARE,
};

export const fixedRows = [
    {name: fixedRowsNameMap[MY_SHARE_PATH], isFile: false, path: MY_SHARE_PATH, fixed: true, key: fixedRowsKeyMap[MY_SHARE_PATH]},
    {name: fixedRowsNameMap[ACCEPTED_SHARE_PATH], isFile: false, path: ACCEPTED_SHARE_PATH, fixed: true, key: fixedRowsKeyMap[ACCEPTED_SHARE_PATH]},
    {name: fixedRowsNameMap[PROJECT_SHARE_PATH], isFile: false, path: PROJECT_SHARE_PATH, fixed: true, key: fixedRowsKeyMap[PROJECT_SHARE_PATH]}
];

export function getFileBtn(file, rootKind, isShareRoot) {
    if (file.fixed) return [];
    if (rootKind) {
        // 我的共享子目录下没有可操作按钮
        if (!isShareRoot && rootKind === rootKinds.MY_SHARE) {
            return [];
        } else {
            return ROOT_FILE_BTN_MAP[rootKind].filter(item => {
                if (authIconButtonMap[item.name]) {
                    return auth.checkAuth(authIconButtonMap[item.name], 'BUTTON');
                }
                return true;
            });
        }
    } else {
        const baseButton = [iconButtonTypes.DOWNLOAD, iconButtonTypes.MOVE, iconButtonTypes.RENAME, iconButtonTypes.DELETE, iconButtonTypes.PATH];
        baseButton.unshift(iconButtonTypes.SHARE);
        if (file.fileExtension === '.zip') {
            baseButton.push(iconButtonTypes.UNZIP);
        }
        return baseButton.filter(item => {
            if (authIconButtonMap[item.name]) {
                return auth.checkAuth(authIconButtonMap[item.name], 'BUTTON');
            }
            return true;
        });
    }
}

export function getFileIcon(file) {
    if (file.fixed) {
        return 'sdx-gongxiangwenjianjia';
    }
    if (file.isFile) {
        if (file.fileShareId) {
            return 'sdx-yifenxiangwenjian';
        } else if (file.fileExtension === '.zip') {
            return 'sdx-yasuowenjian';
        } else {
            return 'sdx-morenwenjian';
        }
    } else {
        if (file.fileShareId) {
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

export function transShareList(shareItem) {
    return {

    };
}
