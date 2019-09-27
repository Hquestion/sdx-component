import httpService from '../http-service';
import { IDE_MANAGER_GATEWAY_BASE } from './config';

export function configIDE(taskId, config = {}) {
    return httpService.post(`${IDE_MANAGER_GATEWAY_BASE}/ides`, {
        ...config,
        taskId
    });
}

export function createSession(ideUuid, params) {
    return httpService.post(`${IDE_MANAGER_GATEWAY_BASE}/ides/${ideUuid}/notebook_sessions`, params);
}

export function shutdownSession(ideUuid, sessionId) {
    return httpService.remove(`${IDE_MANAGER_GATEWAY_BASE}/ides/${ideUuid}/notebook_sessions/${sessionId}`);
}

export function createTerminal(ideUuid) {
    return httpService.post(`${IDE_MANAGER_GATEWAY_BASE}ides/${ideUuid}/terminals`);
}

export function getAllTerminals(ideUuid) {
    return httpService.get(`${IDE_MANAGER_GATEWAY_BASE}ides/${ideUuid}/terminals`);
}

export function getTerminalStatus(ideUuid, terminalName) {
    return httpService.get(`${IDE_MANAGER_GATEWAY_BASE}ides/${ideUuid}/terminals/${terminalName}`);
}

export function deleteTerminal(ideUuid, terminalName) {
    return httpService.remove(`${IDE_MANAGER_GATEWAY_BASE}ides/${ideUuid}/terminals/${terminalName}`);
}