import httpService from '@sdx/utils/lib/http-service';

export function getFilesList(params = {}) {
    const {
        userId = '',
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
        return res;
    });
}

export default {
    getFilesList
};
