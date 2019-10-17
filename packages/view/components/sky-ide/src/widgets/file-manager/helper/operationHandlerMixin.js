import { BTN_NAMES } from './fileListTool';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import { deletePath, rename, mkdir, makeFile, move, copy, unzip, download, saveFile, share, shareCancel, sharePatch, shareDetail, pack, shareBatch } from '@sdx/utils/src/api/file';
import { unlock } from '@sdx/utils/src/lockScroll';
import { isString } from '@sdx/utils/src/helper/tool';
import { rootKinds } from './fileListTool';
import { ValidateReg } from '@sdx/utils/src/helper/validate';
import { t } from '@sdx/utils/src/locale';

import SkyCodeCellModel from '../../../model/CodeCell';

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
            shareGroups: [],
            btnStatus: {
                downloading: [],
                batchDownloading: []
            }
        };
    },
    methods: {
        mapLoadingStatus(btn, row) {
            const loadingMap = {
                [BTN_NAMES.DOWNLOAD]: () => this.btnStatus.downloading
            };
            return !!(loadingMap[btn.name] && loadingMap[btn.name]().find(item => item.path === row.path));
        },
        rename(row) {
            if (this.editingRow && !this.editingRow.path) {
                MessageBox.alert.warning({
                    title: t('view.file.YouAreCreatingFolder'),
                    content: t('view.file.PleaseFinishCreatingBefore')
                });
                return;
            }
            this.editingRow = row;
            this.tempRowName = row.name;
        },
        mkFile() {
            const fileName = 'Untitled.ipynb';
            let path = this.fileManager.currentPath.lastIndexOf('/') === this.fileManager.currentPath.length
                ? `${this.fileManager.currentPath}${fileName}`
                : `${this.fileManager.currentPath}/${fileName}`;
            makeFile(path, this.$route.query.ownerId || '').then((res) => {
                let nbContent = {};
                nbContent.cells = [new SkyCodeCellModel({})];
                nbContent.metadata = {
                    'kernelspec': {
                        'display_name': 'Python 3',
                        'language': 'python',
                        'name': 'python3'
                    },
                    'language_info': {
                        'codemirror_mode': {
                            'name': 'ipython',
                            'version': 3
                        },
                        'file_extension': '.py',
                        'mimetype': 'text/x-python',
                        'name': 'python',
                        'nbconvert_exporter': 'python',
                        'pygments_lexer': 'ipython3',
                        'version': '3.6.5'
                    }
                };
                saveFile(JSON.stringify(nbContent), res.path, res.ownerId).then(() => {
                    this.fileManager.enterDirectory(this.fileManager.currentPath, true, res);
                    this.app.openFile(res);
                });
            });
        },
        doRenameOrMakePath() {
            const reg = new ValidateReg({min:1, max:64}, {at: false}).generate();
            if (!reg.test(this.tempRowName)) {
                this.$message.error(t('view.file.IncludingIllegalChar'));
                return;
            }
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
                    this.fileManager.enterDirectory(this.fileManager.currentPath, true);
                }, () => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                });
            }
        },
        deleteRow(row) {
            // 如果传入row，则直接删除row，未传入则获取当前选中的进行删除
            let content = t('view.file.CantRecoveryAfterDel');
            const shareContent = t('view.file.DeleteShareTip');
            if (row) {
                deletePath([row.path], row.ownerId).then(() => {
                    // 删除之后刷新页面
                    // this.fileManager.enterDirectory(this.fileManager.currentPath);
                    this.fileManager.handleFileDelete(row);
                    this.app.handleFileDelete(row.path);
                });
            } else {
                const checkedRows = this.fileManager.checked;
                if (checkedRows.length === 0) return;
                const hasSharedRows = checkedRows.some(item => !!item.fileShareId);
                if (hasSharedRows) {
                    content = shareContent;
                }
                MessageBox.confirm.error({
                    title: t('view.file.ConfirmToDelAll'),
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
        handleCopy(source, target) {
            const targetPath = (!target || target.isFile) ? this.app.file.currentPath : target.path;
            target = target || {};
            return new Promise(resolve => {
                copy([source.path], targetPath, target.ownerId || source.ownerId, source.ownerId).then(() => {
                    resolve();
                });
            });
        },
        handleCut(source, target) {
            const targetPath = (!target || target.isFile) ? this.app.file.currentPath : target.path;
            target = target || {};
            return new Promise(resolve => {
                move(source.path, targetPath, target.ownerId || source.ownerId, source.ownerId).then(() => {
                    resolve();
                });
            });
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
                    this.btnStatus.downloading.push(row);
                    ownerId = row.ownerId;
                    defer = pack([row.path], ownerId);
                } else {
                    // 打包批量的
                    this.btnStatus.batchDownloading = this.btnStatus.batchDownloading.concat(this.fileManager.checked);
                    ownerId = this.fileManager.checked[0].ownerId;
                    defer = pack(this.fileManager.checked.map(item => item.path), ownerId);
                }
                defer.then(res => {
                    this.btnStatus.downloading = [];
                    this.btnStatus.batchDownloading = [];
                    download(res, ownerId);
                });
            }
        },
        path(row) {
            // 复制路径到剪贴板
            Vue.prototype.$copyText(row.path).then(() => {
                Message.success(t('view.file.CopyToClipboard'));
            }, () => {
                Message.error(t('view.file.CopyToClipboardFail'));
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
                        Message.success(t('view.file.ShareSuccess'));
                    });
                } else {
                    return share({
                        path: this.toShareRow.path,
                        isGlobal: shareType === 'PUBLIC',
                        users,
                        groups
                    }).then(res => {
                        Message.success(t('view.file.ShareSuccess'));
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
                title: t('view.file.ConfirmCancelShareTip')
            }).then(() => {
                if (row) {
                    shareCancel(row.fileShareId).then(res => {
                        this.updateCachedShareId(row);
                        Message.success(t('view.file.CancelShareSuccess'));
                    });
                } else {
                    shareCancel(this.fileManager.checked.map(item => item.fileShareId)).then(res => {
                        this.updateCachedShareId(this.fileManager.checked);
                        Message.success(t('view.file.CancelShareSuccess'));
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
