import Vue from 'vue';
import MessageBoxConstruct from './MessageBox';
import {lock, unlock} from '@sdx/utils/src/lockScroll';

let instance = null;
let vm;

function MessageBox(opt) {
    let _resolve, _reject;
    let {
        title = '',
        content = '',
        type = 'confirm',
        status = 'error',
        hideOnRouting = true
    } = opt;
    if (!instance) {
        const _Construct = Vue.extend(MessageBoxConstruct);
        instance = new _Construct(opt = {});
    }
    instance.title = title;
    instance.content = content;
    if (typeof content === 'function') {
        instance.$slots.content = content(instance.$createElement);
    }
    instance.type = type;
    instance.status = status;
    vm = instance.$mount();
    document.body.appendChild(vm.$el);
    setTimeout(() => {
        instance.visible = true;
        lock(true);
    }, 0);
    vm.$on('cancel', () => {
        MessageBox.close();
        _reject('cancel');
    });
    vm.$on('confirm', () => {
        MessageBox.close();
        _resolve('confirm');
    });
    vm.$on('close', () => {
        MessageBox.close();
    });
    if (hideOnRouting) {
        vm.routeUnwatch = vm.$watch('$route', () => {
            MessageBox.close();
        });
    }
    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
}

MessageBox.close = () => {
    if (!vm) return;
    vm.visible = false;
    setTimeout(() => {
        if(!vm) return;
        vm.$off('cancel');
        vm.$off('confirm');
        vm.$off('close');
        vm.routeUnwatch();
        vm.$el.remove();
        vm = null;
        instance = null;
        unlock(true);
    }, 300);
};

['alert', 'confirm', 'custom'].forEach(type => {
    MessageBox[type] = opt => MessageBox({ ...opt, type });
    ['error', 'info', 'success', 'warning'].forEach(status => {
        MessageBox[type][status] = opt => MessageBox({...opt, type, status});
        MessageBox[status] = opt => MessageBox({...opt, type: 'confirm', status});
    });
});

export default MessageBox;
