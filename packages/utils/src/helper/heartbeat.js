import httpService from '../http-service';

let instance = null;
const HEARTBEAT_INTERVAL = 5000;
let isCancelled = false;


class Heartbeat {
    constructor(opt) {
        this.interfaces = opt.interfaces;
        this.timer = null;
    }

    static getSingleton(opt) {
        if (instance) {
            return instance;
        }
        return instance = new Heartbeat(opt);
    }

    sendHeartbeat() {
        const results = [];
        let promise = this.interfaces.map(i => {
            const { method, data, url, key } = i;
            results.push(key);
            return httpService[method](url, data, {
                preventError: true
            });
        });
        return Promise.all(promise).then((...rest) => {
            const resultMap = {};
            rest.forEach((res, index) => {
                resultMap[results[index]] = res;
            });
            return resultMap;
        });
    }

    start(callback, isTimer) {
        isCancelled = isTimer ? isCancelled : false;
        if (isCancelled) {
            this.cancel();
            return;
        }
        return this.sendHeartbeat().then(res => {
            callback(res);
            return res;
        }).finally(() => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (!isCancelled) {
                    this.start(callback, true);
                }
            }, HEARTBEAT_INTERVAL);
        });
    }

    cancel() {
        isCancelled = true;
        clearTimeout(this.timer);
    }
}

export default Heartbeat;
