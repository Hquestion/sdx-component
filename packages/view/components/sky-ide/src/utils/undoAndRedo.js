class UndoAndRedo {
    constructor() {
        this.operationQueue = {};
        this.revocationQueue = {};
    }

    addOperation(namespace = 'default', operateFn, revokeFn, runtime = null) {
        if (this.operationQueue.hasOwnProperty(namespace)) {
            this.operationQueue[namespace].push({
                operate: operateFn,
                revoke: revokeFn,
                runtime
            });
        } else {
            this.operationQueue[namespace] = [{
                operate: operateFn,
                revoke: revokeFn,
                runtime
            }];
        }
        // 清空撤销队列
        this.clearRevocationQueue(namespace);
        // 执行操作
        operateFn.call(runtime);
    }

    undo(namespace = 'default') {
        if (Array.isArray(this.operationQueue[namespace])) {
            const operation = this.operationQueue[namespace].pop();
            if (operation) {
                // 执行撤销
                operation.revoke.call(operation.runtime);
                if (this.revocationQueue.hasOwnProperty(namespace)) {
                    this.revocationQueue[namespace].push(operation);
                } else {
                    this.revocationQueue[namespace] = [operation];
                }
            }
        }
    }

    redo(namespace = 'default') {
        if (Array.isArray(this.revocationQueue[namespace])) {
            const operation = this.revocationQueue[namespace].pop();
            if (operation) {
                // 执行恢复
                operation.operate.call(operation.runtime);
                this.operationQueue[namespace].push(operation);
            }
        }
    }

    clearRevocationQueue(namespace = 'default') {
        delete this.revocationQueue[namespace];
    }

    clearOperationQueue(namespace = 'default') {
        delete this.operationQueue[namespace];
    }

    clearQueueByNamespace(namespace = 'default') {
        this.clearOperationQueue(namespace);
        this.clearRevocationQueue(namespace);
    }

    clearAll() {
        this.revocationQueue = {};
        this.operationQueue = {};
    }
}

export default new UndoAndRedo();