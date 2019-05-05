import { getBodyScrollTop, getNodeScrollTop } from "@sdx/utils/src/helper/dom";

let scrollTop = 0;

export function lock(target = true) {
    if (!target) {
        return;
    }
    if (typeof target === 'boolean') {
        scrollTop = getBodyScrollTop();
        document.body.style.top = -1 * scrollTop + 'px';
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
    } else if (typeof target === 'string'){
        const lockEl = document.querySelector(target);
        if (lockEl) {
            scrollTop = getNodeScrollTop(lockEl);
            lockEl.style.top = -1 * scrollTop + 'px';
            lockEl.style.position = 'fixed';
        } else {
            throw new Error(`${target}节点不存在！`);
        }
    } else if (typeof target === 'object' && target instanceof HTMLElement) {
        scrollTop = getNodeScrollTop(target);
        target.style.top = -1 * scrollTop + 'px';
        target.style.position = 'fixed';
    }
}

export function unlock(target) {
    if (!target) {
        return;
    }
    if (typeof target === 'boolean') {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        document.body.style.top = null;
        if (document.documentElement) {
            document.documentElement.scrollTop = scrollTop;
        } else if (window.pageYOffset) {
            window.pageYOffset = scrollTop;
        } else {
            document.body.scrollTop = scrollTop;
        }
    } else if (typeof target === 'string'){
        const lockEl = document.querySelector(target);
        lockEl.style.overflow = 'auto';
        lockEl.style.position = 'static';
        lockEl.style.top = null;
        lockEl.scrollTop = scrollTop;
    } else if (typeof target === 'object' && target instanceof HTMLElement) {
        target.style.overflow = 'auto';
        target.style.position = 'static';
        target.style.top = null;
        target.scrollTop = scrollTop;
    }
    scrollTop = 0;
}
