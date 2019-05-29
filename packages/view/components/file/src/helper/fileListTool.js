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

export function getFileBtn(file, rootKind) {
    if (file.fixed) return [];
    if (rootKind) {
        return ROOT_FILE_BTN_MAP[rootKind];
    } else {
        const baseButton = [iconButtonTypes.DOWNLOAD, iconButtonTypes.MOVE, iconButtonTypes.RENAME, iconButtonTypes.DELETE, iconButtonTypes.PATH];
        if (file.shareId) {
            baseButton.unshift(iconButtonTypes.CANCEL_SHARE);
        } else {
            baseButton.unshift(iconButtonTypes.SHARE);
        }
        if (file.fileExtensions === '.zip') {
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
        if (file.shareId) {
            return 'sdx-yifenxiangwenjian';
        } else {
            return 'sdx-morenwenjian';
        }
    } else {
        if (file.shareId) {
            return 'sdx-yigongxiangwenjianjia';
        } else {
            return 'sdx-wenjianjia';
        }
    }
}
