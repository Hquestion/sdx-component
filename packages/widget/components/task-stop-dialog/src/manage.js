import Vue from 'vue';
import TaskStopDialogConstruct from './TaskStopDialog';
import {lock, unlock} from '@sdx/utils/src/lockScroll';

let instance = null;
let vm;

function TaskStopDialog(opt) {
    let _resolve, _reject;
    let {
        visible = false
    } = opt;
    if (!instance) {
        const _Construct = Vue.extend(TaskStopDialogConstruct);
        instance = new _Construct(opt = {});
    }
    instance.visible = visible;

    vm = instance.$mount();
    document.body.appendChild(vm.$el);
    setTimeout(() => {
        lock(true);
    }, 0);

    vm.$on('cancel', () => {
        TaskStopDialog.close();
        _reject('cancel');
    });
    vm.$on('confirm', () => {
        TaskStopDialog.close();
        _resolve(vm.isAutoSave);
    });
    vm.$on('update:visible', value => {
        vm.visible = value;
    });

    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
}

TaskStopDialog.close = () => {
    vm.dialogVisible = false;
    setTimeout(() => {
        if (vm) {
            vm.$off('cancel');
            vm.$off('confirm');
            vm.$off('update:visible');
            vm.$el.remove();
            vm = null;
            instance = null;
            unlock(true);
        }
    }, 0);
};

export default TaskStopDialog;
