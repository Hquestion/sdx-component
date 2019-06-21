import httpService from '../http-service';
import shareCenter from '../helper/shareCenter';
import { FILE_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config';
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
        order = 'asc'
    } = params;
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files`, {
        userId: userId || userInfo.userId,
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
        userId: userId || userInfo.userId,
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
        ownerId: ownerId || userInfo.userId,
        sharerId: sharerId || userInfo.userId,
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
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}file_shares`, {
        userId: userId || userInfo.userId,
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
        pathInArchive: pathInZip,
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
    const origin = location.origin;
    window.open(`${origin}${FILE_MANAGE_GATEWAY_BASE}files/download?userId=${userInfo.userId}&path=${path}&filesystem=${filesystem}`);
    // return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}files/download`, {
    //     userId: userInfo.userId,
    //     path,
    //     filesystem
    // });
}

export function pack(paths) {
    let _resolve, _reject;
    let userInfo = shareCenter.getUser() || {};
    httpService.post(`${FILE_MANAGE_GATEWAY_BASE}files/pack`, {
        userId: userInfo.userId,
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

export function getPackTaskList() {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs`, {
        userId: userInfo.userId,
        jobType: 'PACK'
    });
}

export function getJobDetail(id) {
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs/${id}`);
}

export function getCopyTaskList() {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs`, {
        userId: userInfo.userId,
        jobType: 'COPY'
    });
}

export function getDelTaskList() {
    let userInfo = shareCenter.getUser() || {};
    return httpService.get(`${FILE_MANAGE_GATEWAY_BASE}jobs`, {
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
