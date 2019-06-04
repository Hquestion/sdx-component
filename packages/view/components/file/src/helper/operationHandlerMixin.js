import { BTN_NAMES } from './fileListTool';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import { deletePath, rename, mkdir, move, copy, unzip, download, share, shareCancel, sharePatch } from '@sdx/utils/src/api/file';

export default {
    data() {
        return {
            OPERATION_MAP: {
                [BTN_NAMES.RENAME]: this.rename,
                [BTN_NAMES.DELETE]: this.deleteRow,
                [BTN_NAMES.MOVE]: this.moveAndCopy,
                [BTN_NAMES.COPY]: this.copy,
                [BTN_NAMES.PATH]: this.path,
                [BTN_NAMES.UNZIP]: this.unzip,
                [BTN_NAMES.DOWNLOAD]: this.download,
                [BTN_NAMES.CANCEL_SHARE]: this.cancelShare,
                [BTN_NAMES.SHARE]: this.share
            },
            supportMove: true
        };
    },
    methods: {
        rename(row) {
            if (this.editingRow && !this.editingRow.path) {
                MessageBox.alert.warning({
                    title: '正在新建文件夹！',
                    content: '请先完成文件夹创建'
                });
                return;
            }
            this.editingRow = row;
            this.tempRowName = row.name;
        },
        doRenameOrMakePath() {
            if (this.editingRow.path) {
                rename(this.editingRow.path, this.tempRowName).then(() => {
                    // todo 刷新列表
                    this.editingRow = null;
                    this.tempRowName = '';
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                });
            } else {
                mkdir(this.tempRowName).then(() => {
                    this.editingRow = null;
                    this.tempRowName = '';
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                });
            }
        },
        deleteRow(row) {
            // 如果传入row，则直接删除row，未传入则获取当前选中的进行删除
            let content = '确定删除后不可恢复哦';
            const shareContent = '选中文件已被共享，或包含被共享的文件，如果继续其他用户将无法访问共享内容。';
            if (row) {
                if (row.fileShareDetailId) {
                    content = shareContent;
                }
                MessageBox.confirm.error({
                    title: `确定要删除文件${row.name}吗？`,
                    content
                }).then(() => {
                    deletePath([row.path]).then(() => {
                        // 删除之后刷新页面
                        this.fileManager.enterDirectory(this.fileManager.currentPath);
                    });
                });
            } else {
                const checkedRows = this.fileManager.checked;
                if (checkedRows.length === 0) return;
                const hasSharedRows = checkedRows.some(item => !!item.fileShareDetailId);
                if (hasSharedRows) {
                    content = shareContent;
                }
                MessageBox.confirm.error({
                    title: '确定要删除选中的文件吗？',
                    content
                }).then(() => {
                    deletePath(checkedRows.map(item => item.path)).then(() => {
                        // 删除之后刷新页面
                        this.fileManager.enterDirectory(this.fileManager.currentPath);
                    });
                });
            }
        },
        moveAndCopy(row) {
            this.toMoveOrCopyRow = row;
            this.supportMove = true;
            this.moveVisible = true;
        },
        copy(row) {
            this.toMoveOrCopyRow = row;
            this.supportMove = false;
            this.moveVisible = true;
        },
        handleMove(target) {
            if (this.toMoveOrCopyRow) {
                // 移动单个路径
                move(this.toMoveOrCopyRow.path, target.path).then(() => {
                    // todo 刷新列表
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                });
            } else {
                if (this.fileManager.checked.length > 0) {
                    move(this.fileManager.checked.map(item => item.path), target.path).then(() => {
                        // todo 刷新列表
                        this.fileManager.enterDirectory(this.fileManager.currentPath);
                    });
                }
            }
        },
        handleCopy(target) {
            if (this.toMoveOrCopyRow) {
                copy(this.toMoveOrCopyRow.path, target.path).then(res => {
                    // todo 展示拷贝弹框
                });
            } else {
                if (this.fileManager.checked.length > 0) {
                    copy(this.fileManager.checked.map(item => item.path), target.path).then(() => {
                        // todo 展示拷贝弹框
                    });
                }
            }
        },
        handleCancelMove() {
            this.toMoveOrCopyRow = null;
        },
        unzip(row) {
            if (!row) return;
            unzip(row.path).then(res => {
                // todo 展示解压任务弹框
            });
        },
        download(row) {
            if (row) {
                download(row.path).then(() => {
                    // 暂时不需要做啥
                });
            } else {
                // todo 支持批量操作
            }
        },
        path(row) {
            // 复制路径到剪贴板
            Vue.prototype.$copyText(row.path).then(() => {
                Message.success('文件路径已拷贝到剪贴板');
            }, () => {
                Message.error('文件路径拷贝失败');
            });
        },
        share() {
            // todo
        }
    }
};
