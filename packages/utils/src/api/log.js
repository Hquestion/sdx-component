import httpService from '../http-service';

const logsApi = '/api/v1/logs/';

export function getLogs(params) {
    return httpService.get(logsApi, params);
}
