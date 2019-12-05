import { v4 as uuid } from 'uuid';

export class ContextMenuModel {
    constructor(opt = {}) {
        this.groups = opt.groups || [];
    }

    addGroup(group) {
        this.groups.push(group);
    }

    delGroup(uuid) {
        let index = this.groups.findIndex(group => group.uuid === uuid);
        if (index >= 0) {
            this.groups.splice(index, 1);
        }
    }
}

export class ContextMenuGroupModel {
    constructor(opt = {}) {
        this.menus = opt.menus || [];
        this.name = opt.name || '';
        this.uuid = uuid();
    }

    addMenu(menu) {
        this.menus.push(menu);
    }

    delMenu(menu) {
        let index = -1;
        if (typeof menu === 'string') {
            index = this.menus.findIndex(item => item.name === menu);
        } else {
            index = this.menus.findIndex(item => item.name === menu.name);
        }
        if (index >= 0) {
            this.menus.splice(index, 1);
        }
    }
}

export class ContextMenuItemModel {
    constructor(opt = {}) {
        this.label = opt.label;
        this.name = opt.name;
        this.icon = opt.icon;
        this.shortcut = opt.shortcut;
        this.active = opt.active;
        this.commandId = opt.commandId;
        this.disabled = opt.disabled;
        this.callback = opt.callback;
    }

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
    }
}
