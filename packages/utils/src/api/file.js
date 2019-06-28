import httpService from '../http-service';
import { getProjectList } from './project';
import shareCenter from '../helper/shareCenter';
import { FILE_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, PROJECT_MANAGE_GATEWAY_BASE } from './config';
import { isString } from '../helper/tool';
import { asyncJobStatus } from '../const/file';
import { Notification } from 'element-ui';

export function getFilesList(params = {}) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        path = '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc',
        filesystem = 'cephfs',
        fileExtension = '',
        onlyDirectory = 0,
        onlyFile = 0
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files`, {
        userId: userId || userInfo.userId,
        path,
        start,
        count,
        orderBy,
        order,
        filesystem,
        fileExtensions: fileExtension ? fileExtension.split(',') : undefined,
        onlyDirectory: +onlyDirectory,
        onlyFile: +onlyFile
    });
}

export function searchFiles(params) {
    let _resolve, _reject;
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
        showHidden = 0,
        fileExtension = '',
        onlyDirectory = false,
        onlyFile = false
    } = params;
    httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/search`, {
        userId: userId || userInfo.userId,
        path,
        start,
        count,
        orderBy,
        order,
        recursive,
        keyword,
        showHidden,
        filesystem,
        fileExtensions:  fileExtension ? fileExtension.split(',') : undefined,
        onlyDirectory: +onlyDirectory,
        onlyFile: +onlyFile
    }).then(res => {
        let jobId = res.jobId;
        let timer = null;
        (function pullJob() {
            getJobDetail(jobId).then(res => {
                if (res.state === asyncJobStatus.SUCCESS || res.state === asyncJobStatus.FAILURE) {
                    clearTimeout(timer);
                    if (res.state === asyncJobStatus.SUCCESS) {
                        _resolve(res.extra);
                    } else {
                        Notification.error({
                            title: '出错了！',
                            message: '搜索失败！'
                        });
                        _reject();
                    }
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(pullJob, 1000);
                }
            }, () => {
                clearTimeout(timer);
                _reject();
            });
        })();
    }, _reject);
    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
}

export function searchShareFiles(params) {
    let userInfo = shareCenter.getUser() || {};
    let _resolve, _reject;
    httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares/search`, {
        ownerId: userInfo.userId,
        ...params
    }).then(res => {
        let jobId = res.jobId;
        let timer = null;
        (function pullJob() {
            getJobDetail(jobId).then(res => {
                if (res.state === asyncJobStatus.SUCCESS || res.state === asyncJobStatus.FAILURE) {
                    clearTimeout(timer);
                    if (res.state === asyncJobStatus.SUCCESS) {
                        _resolve(res.extra);
                    } else {
                        Notification.error({
                            title: '出错了！',
                            message: '搜索失败！'
                        });
                        _reject();
                    }
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(pullJob, 1000);
                }
            }, () => {
                clearTimeout(timer);
                _reject();
            });
        })();
    }, res => {
        _reject(res);
    });
    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
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
        ownerId: ownerId || userInfo.userId,
        sharerId: sharerId || userInfo.userId,
        path,
        isGlobal,
        users,
        groups
    });
}

export function shareBatch(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        ownerId = userInfo.userId,
        sharerId = userInfo.userId,
        paths = params.paths || [],
        isGlobal = false,
        users = [],
        groups = []
    } = params;
    if (paths.length === 0) {
        return Promise.reject('no path defined');
    }
    return httpService.post(`${COMPOSE_GATEWAY_BASE}file-share-batch`, {
        ownerId: ownerId || userInfo.userId,
        sharerId: sharerId || userInfo.userId,
        paths,
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
        ownerId = userInfo.userId,
        start = 1,
        count = -1
    } = params;
    return httpService.get(`${COMPOSE_GATEWAY_BASE}file-share-profiles`, {
        ownerId: ownerId || userInfo.userId,
        start,
        count
    });
}

export function getMyAcceptedShare(params) {
    let userInfo = shareCenter.getUser() || {};
    const {
        userId = userInfo.userId,
        start = 1,
        count = -1
    } = params;
    return httpService.get(`${COMPOSE_GATEWAY_BASE}file-share-profiles`, {
        userId: userId || userInfo.userId,
        start,
        count
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
    // return httpService.get(`${COMPOSE_GATEWAY_BASE}project-share-profiles`, {
    //     userId: userId || userInfo.userId,
    //     path,
    //     start,
    //     count,
    //     orderBy,
    //     order
    // });
    return getProjectList({
        type: 'public',
        start: 1,
        count: -1
    }).then(res => {
        let body = {children: [], childrenCount: res.data.total};
        body.children = res.data.items.map(item => ({
            userId: item.uuid,
            name: item.name,
            path: `/${item.name}`,
            filesystem: 'cephfs',
            isFile: false,
            mimeType: 'text/directory',
            fileExtension: '',
            fileShareId: '',
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            size: 0
        }));
        return body;
    });
}

export function mkdir(path, ownerId) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files`, {
        userId: ownerId || userInfo.userId,
        path
    });
}

export function rename(path, newName, ownerId) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/rename`, {
        userId: ownerId || userInfo.userId,
        path,
        newName
    });
}

export function deletePath(paths, ownerId) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/delete`, {
        userId: ownerId || userInfo.userId,
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

export function zipPreview({ path = '/', pathInZip = '/', ownerId, start = 1, count = -1 }) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/preview`, {
        userId: ownerId || userInfo.userId,
        path,
        pathInArchive: pathInZip,
        start,
        count
    });
}

export function unzip(path, targetPath, ownerId) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/extract`, {
        userId: ownerId || userInfo.userId,
        path,
        targetPath
    });
}

export function download(path, ownerId, filesystem = 'cephfs') {
    let userInfo = shareCenter.getUser() || {};
    const origin = location.origin;
    window.open(`${origin}${FILE_MANAGE_GATEWAY_BASE}files/download?userId=${ownerId || userInfo.userId}&path=${path}&filesystem=${filesystem}`);
    // return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/download`, {
    //     userId: userInfo.userId,
    //     path,
    //     filesystem
    // });
}

export function pack(paths, ownerId) {
    let _resolve, _reject;
    let userInfo = shareCenter.getUser() || {};
    httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/pack`, {
        userId: ownerId || userInfo.userId,
        paths,
        targetPath: '/.download/__' + +new Date()
    }).then(res => {
        const jobId = res.jobId;
        let timer = null;
        (function pullJob() {
            getJobDetail(jobId).then(res => {
                if (res.state === asyncJobStatus.SUCCESS || res.state === asyncJobStatus.FAILURE) {
                    clearTimeout(timer);
                    if (res.state === asyncJobStatus.SUCCESS) {
                        _resolve(res.args.targetPath);
                    } else {
                        Notification.error({
                            title: '出错了！',
                            message: '下载失败！'
                        });
                        _reject();
                    }
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(pullJob, 1000);
                }
            }, () => {
                clearTimeout(timer);
                _reject();
            });
        })();
    }, _reject);
    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
}

export function getAsyncJobList(jobType) {
    return function() {
        let userInfo = shareCenter.getUser() || {};
        return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs`, {
            userId: userInfo.userId,
            jobType
        });
    };
}

export const getPackTaskList = getAsyncJobList('PACK');
export const getCopyTaskList = getAsyncJobList('COPY');
export const getDelTaskList = getAsyncJobList('DELETE');
export const getUnzipTaskList = getAsyncJobList('UNPACK');

export function getJobDetail(id) {
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs/${id}`);
}

export function cancelTask(uuid) {
    return httpService.remove(`${FILE_MANAGE_GATEWAY_BASE}jobs/${uuid}`);
}

export function deleteTask(uuid) {
    return httpService.remove(`${FILE_MANAGE_GATEWAY_BASE}jobs/${uuid}`);
}

export function deleteTaskType(jobType) {
    let userInfo = shareCenter.getUser() || {};
    return httpService.remove(`${FILE_MANAGE_GATEWAY_BASE}jobs/all`, {
        jobType,
        userId: userInfo.userId
    });
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
    shareDetail,
    getUnzipTaskList,
    getPackTaskList,
    searchShareFiles
};
