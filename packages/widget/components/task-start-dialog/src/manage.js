import Vue from 'vue';
import TaskStartDialogConstruct from './TaskStartDialog';
import {lock, unlock} from '@sdx/utils/src/lockScroll';

let instance = null;
let vm;

function TaskStartDialog(opt) {
    let _resolve, _reject;
    let {
        image = null,
        autoImage = null,
        visible = false
    } = opt;
    if (!instance) {
        const _Construct = Vue.extend(TaskStartDialogConstruct);
        instance = new _Construct(opt = {});
    }
    instance.image = image;
    instance.autoImage = autoImage;
    instance.visible = visible;

    vm = instance.$mount();
    document.body.appendChild(vm.$el);
    setTimeout(() => {
        lock(true);
    }, 0);

    vm.$on('cancel', () => {
        TaskStartDialog.close();
        _reject('cancel');
    });
    vm.$on('confirm', () => {
        TaskStartDialog.close();
        _resolve('confirm', vm.selectImage);
    });
    vm.$on('update:visible', (value) => {
        vm.visible = value;
    });

    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
}

TaskStartDialog.close = () => {
    vm.dialogVisible = false;
    setTimeout(() => {
        if(vm) {
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

export default TaskStartDialog;
