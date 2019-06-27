import { isUndefined } from '@sdx/utils/src/helper/tool';

export default {
    computed: {
        checked: {
            get() {
                return this.fileManager.checked.length > 0;
            },
            set(val) {
                if (!val) {
                    if (this.isIndeterminate) {
                        this.doSelectAll().then(this.syncRowCheckStatus);
                    } else {
                        this.doUnselectAll();
                        this.syncRowCheckStatus();
                    }
                } else {
                    this.doSelectAll().then(this.syncRowCheckStatus);
                }
            }
        },
        isIndeterminate() {
            const canCheckTotal = this.fileManager.isRoot ? this.fileManager.loadedTotal - this.fileManager.fixedRows.length : this.fileManager.loadedTotal;
            return this.fileManager.checked.length > 0 && this.fileManager.checked.length < canCheckTotal;
        }
    },
    methods: {
        canRowCheck(row, index) {
            return !row.fixed && !!row.path;
        },
        handleSelect(selection, row) {
            let checkedIndex = this.fileManager.checkedMap[row.path];
            if (!isUndefined(checkedIndex) && checkedIndex >= 0) {
                delete this.fileManager.checkedMap[row.path];
                const indexInArray = this.fileManager.checked.findIndex(item => item.path === row.path);
                this.fileManager.checked.splice(indexInArray, 1);
                // this.this.$refs.fileTable.$children[0].toggleRowSelection(row, false);
                // this.isCheckAll = false;
            } else {
                this.fileManager.checked.push(row);
                this.fileManager.checkedMap[row.path] = this.fileManager.checked.length - 1;
            }
        },
        handleSelectAll() {
            if (this.fileManager.isCheckAll) {
                this.doUnselectAll();
            } else {
                this.doSelectAll();
            }
        },
        doSelectAll() {
            this.fileManager.isCheckAll = true;
            // 获取所有文件，使用indexedDB时需修改成从indexedDB获取
            return this.fileManager.getRenderList(0, this.fileManager.loadedTotal).then(res => {
                this.fileManager.checked = res.slice().filter(item => !item.fixed);
                this.fileManager.checkedMap = {};
                this.fileManager.checked.forEach((item, index) => {
                    this.fileManager.checkedMap[item.path] = index;
                });
            });
        },
        doUnselectAll() {
            this.fileManager.resetCheck();
        },
        syncRowCheckStatus() {
            this.$nextTick(() => {
                if (this.fileManager.checked.length > 0) {
                    // this.fileManager.checked.forEach(item => {
                    //     this.$refs.fileTable.$children[0].toggleRowSelection(item, true);
                    // });
                    this.fileManager.renderFiles.forEach(item => {
                        if (this.fileManager.checkedMap[item.path] >= 0) {
                            this.$refs.fileTable.$children[0].toggleRowSelection(item, true);
                        }
                    });
                } else {
                    this.$refs.fileTable.$children[0].clearSelection();
                }
            });
        },
        checkAndSelectAll() {
            if (this.fileManager.isCheckAll) {
                this.doSelectAll().then(this.syncRowCheckStatus);
            }
        }
    }
};
