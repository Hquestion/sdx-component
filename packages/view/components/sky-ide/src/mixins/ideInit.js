import { TaskManager } from '@skyide/services';

export default {
    data() {
        return {
            taskManager: null
        };
    },
    methods: {
        async prepareEnv() {
            if (!this.taskId) {
                window.console.warn('SkyIDE need a task to run code and terminal! No taskId passed to SkyIDE, you can\'t debug your code!');
                return;
            }
            this.taskManager = new TaskManager(this.taskId);
            return await this.taskManager.setupIDE();
        }
    }
};
