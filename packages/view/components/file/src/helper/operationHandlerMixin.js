import { BTN_NAMES } from './fileListTool';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import { deletePath, rename, mkdir, move, copy, unzip, download, share, shareCancel, sharePatch, shareDetail, pack, shareBatch } from '@sdx/utils/src/api/file';
import { unlock } from '@sdx/utils/src/lockScroll';
import { isString } from '@sdx/utils/src/helper/tool';
import { rootKinds } from './fileListTool';

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
            moveVisible: false,
            supportMove: true,
            shareVisible: false,
            shareUsers: [],
            shareGroups: []
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
                rename(this.editingRow.path, this.tempRowName, this.editingRow.ownerId).then(() => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                    this.editingRow = null;
                    this.tempRowName = '';
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                }, () => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                });
            } else {
                let path = this.fileManager.currentPath.lastIndexOf('/') === this.fileManager.currentPath.length
                    ? `${this.fileManager.currentPath}${this.tempRowName}`
                    : `${this.fileManager.currentPath}/${this.tempRowName}`;
                // 协作项目共享的文件需特殊处理
                if (this.fileManager.rootKind === rootKinds.PROJECT_SHARE) {
                    path = '/' + path.split('/').slice(3).join('/');
                }
                mkdir(path, this.$route.query.ownerId || '').then(() => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                    this.editingRow = null;
                    this.tempRowName = '';
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                }, () => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                });
            }
        },
        deleteRow(row) {
            // 如果传入row，则直接删除row，未传入则获取当前选中的进行删除
            let content = '确定删除后不可恢复哦';
            const shareContent = '选中文件已被共享，或包含被共享的文件，如果继续其他用户将无法访问共享内容。';
            if (row) {
                if (row.fileShareId) {
                    content = shareContent;
                }
                MessageBox.confirm.error({
                    title: `确定要删除文件${row.name}吗？`,
                    content
                }).then(() => {
                    deletePath([row.path], row.ownerId).then(() => {
                        // 删除之后刷新页面
                        this.fileManager.enterDirectory(this.fileManager.currentPath);
                    });
                });
            } else {
                const checkedRows = this.fileManager.checked;
                if (checkedRows.length === 0) return;
                const hasSharedRows = checkedRows.some(item => !!item.fileShareId);
                if (hasSharedRows) {
                    content = shareContent;
                }
                MessageBox.confirm.error({
                    title: '确定要删除选中的文件吗？',
                    content
                }).then(() => {
                    deletePath(checkedRows.map(item => item.path), checkedRows[0].ownerId).then(() => {
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
                move(this.toMoveOrCopyRow.path, target.path, target.ownerId, this.toMoveOrCopyRow.ownerId).then(() => {
                    this.moveVisible = false;
                    this.fileManager.enterDirectory(this.fileManager.currentPath);
                });
            } else {
                if (this.fileManager.checked.length > 0) {
                    move(this.fileManager.checked.map(item => item.path), target.path, target.ownerId, this.fileManager.checked[0].ownerId).then(() => {
                        this.moveVisible = false;
                        this.fileManager.enterDirectory(this.fileManager.currentPath);
                    });
                }
            }
        },
        handleCopy(target) {
            if (this.toMoveOrCopyRow) {
                copy([this.toMoveOrCopyRow.path], target.path, target.ownerId, this.toMoveOrCopyRow.ownerId).then(res => {
                    this.moveVisible = false;
                    this.fileManager.resetCheck();
                    this.fileManager.$refs.fileTask.checkTab('COPY');
                });
            } else {
                if (this.fileManager.checked.length > 0) {
                    copy(this.fileManager.checked.map(item => item.path), target.path, target.ownerId, this.fileManager.checked[0].ownerId).then(() => {
                        this.moveVisible = false;
                        this.fileManager.resetCheck();
                        this.fileManager.$refs.fileTask.checkTab('COPY');
                    });
                }
            }
        },
        handleCancelMove() {
            this.toMoveOrCopyRow = null;
        },
        unzip(row, targetPath) {
            if (!row) return;
            unzip(row.path, this.fileManager.currentPath, row.ownerId).then(res => {
                this.fileManager.$refs.fileTask.checkTab('UNZIP');
            });
        },
        download(row) {
            if (row && row.isFile) {
                download(row.path, row.ownerId);
            } else {
                // 打包，然后下载
                let defer, ownerId;
                if (row) {
                    // 打包文件夹
                    ownerId = row.ownerId;
                    defer = pack([row.path], ownerId);
                } else {
                    // 打包批量的
                    ownerId = this.fileManager.checked[0].ownerId;
                    defer = pack(this.fileManager.checked.map(item => item.path), ownerId);
                }
                defer.then(res => {
                    download(res, ownerId);
                });
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
        share(row) {
            this.toShareRow = row;
            if (row) {
                // 获取分享详情，初始化shareUsers 和 shareGroups
                if (row.fileShareId) {
                    shareDetail(row.fileShareId).then(res => {
                        this.shareUsers = res.users || [];
                        this.shareGroups = res.groups || [];
                        this.shareVisible = true;
                    });
                } else {
                    this.shareUsers = [];
                    this.shareGroups = [];
                    this.shareVisible = true;
                }
            } else {
                if (this.fileManager.checked.length > 0) {
                    this.shareVisible = true;
                    this.shareUsers = [];
                    this.shareGroups = [];
                }
            }
        },
        doShare(users, groups, shareType) {
            if (this.toShareRow) {
                if (this.toShareRow.fileShareId) {
                    return sharePatch({
                        uuid: this.toShareRow.fileShareId,
                        isGlobal: shareType === 'PUBLIC',
                        users,
                        groups
                    }).then(res => {
                        Message.success('分享成功');
                    });
                } else {
                    return share({
                        path: this.toShareRow.path,
                        isGlobal: shareType === 'PUBLIC',
                        users,
                        groups
                    }).then(res => {
                        Message.success('分享成功');
                        this.updateCachedShareId(this.toShareRow, res.uuid);
                    });
                }
            } else {
                // 批量共享
                return shareBatch({
                    paths: this.fileManager.checked.map(item => item.path),
                    isGlobal: shareType === 'PUBLIC',
                    users,
                    groups
                }).then(res => {
                    this.fileManager.checked.forEach((item, index) => {
                        this.updateCachedShareId(item.path, res[index]);
                    });
                });
            }
        },
        cancelShare(row) {
            MessageBox.confirm.warning({
                title: '您确定要取消共享选中的文件吗？'
            }).then(() => {
                if (row) {
                    shareCancel(row.fileShareId).then(res => {
                        this.updateCachedShareId(row);
                        Message.success('取消分享成功');
                    });
                } else {
                    shareCancel(this.fileManager.checked.map(item => item.fileShareId)).then(res => {
                        this.updateCachedShareId(this.fileManager.checked);
                        Message.success('取消分享成功');
                        // 清空选中的项
                        this.fileManager.resetCheck();
                    });
                }
            });
        },
        updateCachedShareId(rows, shareId = '') {
            // 暂且暴力处理，如果需要优化，需要在请除fileShareId后，删除此条记录，以刷新页面
            if (!shareId) {
                this.fileManager.enterDirectory(this.fileManager.currentPath);
                return;
            }
            if (typeof rows === 'object') {
                if (!Array.isArray(rows)) {
                    rows = [rows];
                }
                rows.forEach(row => {
                    if (isString(row)) {
                        this.updateCachedShareId(row, shareId);
                    } else {
                        this.updateCachedShareId(row.path, shareId);
                    }
                });
            } else if (isString(rows)) {
                let path = rows;
                let meta = this.fileManager.renderFiles.find(item => item.path === path);
                this.$set(meta, 'fileShareId', shareId);
                this.fileManager.db.list.where('path').equals(meta.path).modify({fileShareId: shareId});
            }
        }
    }
};
