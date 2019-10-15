import { TaskManager, Session } from '@skyide/services';
import { getSessionSpecs, getAllTerminals } from '@sdx/utils/src/api/skyide';
import emitter from '@sdx/utils/src/mixins/emitter';
const fetch = require('node-fetch');

export default {
    data() {
        return {
            taskManager: null,
            sessionList: [],
            terminalSessionList: [],
            nbSessionMap: {}
        };
    },
    mixins: [emitter],
    methods: {
        async prepareEnv() {
            if (!this.taskId) {
                window.console.warn('SkyIDE need a task to run code and terminal! No taskId passed to SkyIDE, you can\'t debug your code!');
                return;
            }
            this.taskManager = new TaskManager(this.taskId);
            return await this.taskManager.setupIDE();
        },
        makeSettings() {
            return {
                baseUrl: this.taskManager.task.externalUrl,
                wsUrl: this.taskManager.task.externalUrl.replace('http://', 'ws://'),
                ideUuid: this.taskManager.ideUuid,
                WebSocket: WebSocket,
                init: {cache: 'no-store', credentials: 'same-origin' },
                Request: fetch.Request,
                fetch: fetch
            };
        },
        async sessionSpecs(ideUuid) {
            if (!this.taskManager) return;
            if (this.taskManager.isStopped() || this.taskManager.isStopping()) {
                return;
            }
            await this.taskManager.run();
            const sessionList = await getSessionSpecs(ideUuid);
            const terminalSessionList = await getAllTerminals(ideUuid);
            this.sessionList = sessionList.data;
            this.terminalSessionList = terminalSessionList.data;
            this.broadcast('SkyNotebook', 'sessionReady', this.sessionList);
            this.broadcast('SkyTerminalPanel', 'terminalSessionReady', this.terminalSessionList);
            return [this.sessionList, this.terminalSessionList];
        },
        getAllNotebookVms() {
            console.log(this.doc.openFiles);
            return this.doc && this.doc.openFiles || [];
        },
        getAllTerminalVms() {
            return this.terminal && this.terminal.tabTerminal || [];
        }
    }
};
