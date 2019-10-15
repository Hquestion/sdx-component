import { getBodyScrollTop, getNodeScrollTop } from '../helper/dom';

let scrollTop = 0;
let parentOriginPosition, originOverflow, originTop;

export function lock(target = true, distToTop = 0) {
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
        // parentOriginPosition = target.parentNode.style.position;
        // originOverflow = target.style.overflow;
        // originTop = target.style.top;
        // target.parentNode.style.position = 'relative';
        // target.style.top = distToTop + 'px';
        // target.firstElementChild.style.transform = `translateY(${-1*scrollTop}px)`;
        // target.style.position = 'absolute';
        target.style.overflow = 'hidden';
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
        target.style.overflow = originOverflow || 'auto';
        // target.style.position = 'static';
        // target.style.top = originTop || null;
        // target.parentNode.style.position = parentOriginPosition;
        // target.scrollTop = scrollTop;
    }
    scrollTop = 0;
}
