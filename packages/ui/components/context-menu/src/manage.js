import Vue from 'vue';
import ContextMenu from './ContextMenu';
import Popper from 'popper.js';

let menu, popper;

export function open(x, y, menus) {
    if (menu) {
        menu.$destroy();
        menu.$el.remove();
    }
    if (popper && popper.destroy) {
        popper.reference.remove();
        popper.popper.remove();
        popper.destroy();
    }
    menu = new Vue(ContextMenu).$mount();
    menu.menuGroups = menus;
    menu.visible = false;
    let ref = document.createElement('div');
    ref.style.position = 'absolute';
    ref.style.left = x + 'px';
    ref.style.top = y + 'px';
    document.body.appendChild(ref);
    document.body.appendChild(menu.$el);
    menu.$nextTick(() => {
        menu.visible = true;
        popper = new Popper(ref, menu.$el, {
            placement: 'bottom-start'
        });

        popper.scheduleUpdate();
    });
}

function close() {

}
