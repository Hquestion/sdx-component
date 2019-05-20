import httpService from '../http-service';

export function getFilesList(params) {
    const {
        userId,
        path = '/',
        start = 1,
        count = -1,
        orderBy = 'name',
        order = 'asc'
    } = params;
    return httpService.get('/api/v1/files', {
        userId,
        path,
        start,
        count,
        orderBy,
        order
    });
}

export function searchFiles(params) {
    return getFilesList(params).then(res => {
        return res.children;
    });
}

export default {
    getFilesList
};
