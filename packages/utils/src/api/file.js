import httpService from '@sdx/utils/lib/http-service';
import shareCenter from '@sdx/utils/lib/helper/shareCenter';
import { FILE_MANAGE_GATEWAY_BASE } from './config';
import { isString } from '../helper/tool';

export function getFilesList(params = {}) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        path = '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc'
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files`, {
        userId,
        path,
        start,
        count,
        orderBy,
        order
    });
}

export function searchFiles(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        path = '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc',
        recursive = 1,
        keyword = '',
        filesystem = 'cephfs',
        showHidden = 0
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/search`, {
        userId,
        path,
        start,
        count,
        orderBy,
        order,
        recursive,
        keyword,
        showHidden,
        filesystem
    });
}

export function share(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        ownerId = userInfo.userId,
        sharerId = userInfo.userId,
        path = params.path || '/',
        isGlobal = false,
        users = [],
        groups = []
    } = params;
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        ownerId,
        sharerId,
        path,
        isGlobal,
        users,
        groups
    });
}

export function sharePatch(params) {
    const {
        uuid = '',
        isGlobal = false,
        users = [],
        groups = []
    } = params;
    return httpService.patch(`${FILE_MANAGE_GATEWAY_BASE}file_shares/${uuid}`, {
        isGlobal,
        users,
        groups
    });
}

export function shareCancel(uuids = []) {
    isString(uuids) && (uuids = [uuids]);
    return httpService.remove(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        uuids
    });
}

export function shareDetail(uuid) {
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares/${uuid}`);
}

export function getMyShare(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        sharerId = userInfo.userId,
        path = params.path || '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc'
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        sharerId,
        path,
        start,
        count,
        orderBy,
        order
    });
}

export function getMyAcceptedShare(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        path = params.path || '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc'
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        userId,
        path,
        start,
        count,
        orderBy,
        order
    });
}

export function getProjectShare(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        path = params.path || '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc'
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        userId,
        path,
        start,
        count,
        orderBy,
        order
    });
}

export function mkdir(path) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files`, {
        userId: userInfo.userId,
        path
    });
}

export function rename(path, newName) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/rename`, {
        userId: userInfo.userId,
        path,
        newName
    });
}

export function deletePath(paths) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/delete`, {
        userId: userInfo.userId,
        paths
    });
}

export function move(sourcePaths, targetPath) {
    let userInfo = shareCenter.getUser() || {};
    isString(sourcePaths) && (sourcePaths = [sourcePaths]);
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/move`, {
        userId: userInfo.userId,
        sourcePaths,
        targetPath
    });
}

export function copy(sourcePaths, targetPath) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/copy`, {
        userId: userInfo.userId,
        sourcePaths,
        targetPath
    });
}

export function zipPreview({ path = '/', pathInZip = '/', start = 1, count = -1 }) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/preview`, {
        userId: userInfo.userId,
        path,
        pathInZip,
        start,
        count
    });
}

export function unzip(path) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/extract`, {
        userId: userInfo.userId,
        path,
        targetPath: path.slice(0, path.lastIndexOf('.zip'))
    });
}

export function download(path, filesystem = 'cephfs') {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/download`, {
        userId: userInfo.userId,
        path,
        filesystem
    });
}

export function getCopyTaskList() {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs/`, {
        userId: userInfo.userId,
        jobType: 'COPY'
    });
}

export function getDelTaskList() {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs/`, {
        userId: userInfo.userId,
        jobType: 'DELETE'
    });
}

export function cancelCopyTask(uuid) {
    return httpService.remove(`${FILE_MANAGE_GATEWAY_BASE}jobs/${uuid}`);
}

export default {
    getFilesList,
    searchFiles,
    mkdir,
    rename,
    deletePath,
    move,
    copy,
    zipPreview,
    unzip,
    download,
    getMyShare,
    getMyAcceptedShare,
    getProjectShare,
    getCopyTaskList,
    getDelTaskList,
    share,
    shareCancel,
    sharePatch,
    shareDetail
};
