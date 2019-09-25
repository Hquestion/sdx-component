<template>
    <div
        class="skyide-file-table"
    >
        <SdxuTable
            ref="fileTable"
            :dynamic="true"
            :reverse-selection="true"
            :row-key="setRowKey"
            :data="fileManager.renderFiles"
            :default-sort="{prop: fileManager.orderBy, order: 'descending'}"
            @sort-change="handleSortChange"
            :dynamic-top-height="topHeight"
            :dynamic-bottom-height="bottomHeight"
            :row-class-name="getTableRowClassName"
            height="100%"
            v-loadmore="loadMore"
            row-id="path"
            :highlight-key="editingRow && editingRow.path"
            @row-dblclick="handlePathNameClick"
            @row-click="handleRowClick"
            @row-contextmenu="handleContextMenu"
        >
            <el-table-column
                :label="t('view.file.FileName')"
                :sortable="fileManager.isSearch ? true: 'custom'"
                prop="name"
                :sort-orders="['ascending', 'descending']"
                v-if="true"
                min-width="200"
            >
                <template #default="{row}">
                    <FileName
                        :row="row"
                        v-model="tempRowName"
                        @save-rename="saveEdit"
                        @cancel-rename="cancelEdit"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.file.LastModify')"
                :sortable="'custom'"
                prop="updatedAt"
                width="120"
                :sort-orders="['ascending', 'descending']"
            >
                <template #default="{row}">
                    {{ row.updatedAt | getDateDiff }}
                </template>
            </el-table-column>
        </SdxuTable>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import MessageBox from '@sdx/ui/components/message-box';

import { lock, unlock } from '@sdx/utils/src/lockScroll';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';

import dayjs from 'dayjs';
import { getFileIcon, contextButtons, rootKinds } from './helper/fileListTool';
import Loadmore from './helper/loadmore';
import OperationHandlerMixin from './helper/operationHandlerMixin';
import FileName from './FileName';

import contextMenu from '@sdx/ui/components/context-menu';
import { ContextMenuItemModel, ContextMenuModel, ContextMenuGroupModel } from '@sdx/ui/components/context-menu';

const ROW_HEIGHT = 30;
let isFirstSort = true;

export default {
    name: 'FileTable',
    inject: ['fileManager', 'app'],
    provide() {
        return {
            fileTable: this
        };
    },
    mixins: [Loadmore, OperationHandlerMixin, transformFilter, locale],
    components: {
        FileName,
        ElTableColumn,
        SdxuTable
    },
    data() {
        return {
            topCount: 0,
            containerCount: 0,
            editingRow: null,
            tempRowName: this.t('view.file.NewFolder'),
            rootKinds,
            selectedRows: [],
            contextMenuOpen: false,
            copyingRow: null,
            cuttingRow: null
        };
    },
    computed: {
        topHeight() {
            return this.topCount * ROW_HEIGHT;
        },
        bottomHeight() {
            return (this.fileManager.loadedTotal - this.topCount - this.containerCount) * ROW_HEIGHT;
        }
    },
    methods: {
        handleContextMenu(row, event) {
            this.selectedRows.splice(0, 1, row);
            event.preventDefault();
            this.contextMenuOpen = true;

            const ins = new ContextMenuModel();

            contextButtons.forEach(buttonGroup => {
                const menus = [];
                buttonGroup.buttons && buttonGroup.buttons.forEach(button => {
                    button.callback && (button.callback = button.callback.bind(this));
                    button.disabled && (button.disabled = button.disabled.bind(this));
                    const itemModel = new ContextMenuItemModel(button);
                    menus.push(itemModel);
                });
                const group = new ContextMenuGroupModel({
                    name: buttonGroup.group,
                    menus
                });
                ins.addGroup(group);
            });

            contextMenu.open(event.clientX, event.clientY, ins, menu => {
                // 这里也可以定义点击menu的回调，可以对命令做一些处理
                this.contextMenuOpen = false;
            });
        },
        copyFile() {
            this.copyingRow = this.selectedRows[0];
            this.cuttingRow = null;
        },
        pasteFile() {
            if (this.copyingRow && !this.cuttingRow) {
                this.handleCopy(this.copyingRow, this.selectedRows[0]).then(() => {
                    this.fileManager.refresh();
                });
            } else if (this.cuttingRow && !this.copyingRow) {
                this.handleCut(this.cuttingRow, this.selectedRows[0]).then(() => {
                    this.fileManager.refresh();
                });
                this.cuttingRow = null;
            }
        },
        cutFile() {
            this.cuttingRow = this.selectedRows[0];
            this.copyingRow = null;
        },
        downloadFile() {
            if (this.selectedRows.length !== 1) return;
            this.download(this.selectedRows[0]);
        },
        renameFile() {
            if (this.selectedRows.length !== 1) return;
            this.rename(this.selectedRows[0]);
        },
        removeFile() {
            if (this.selectedRows.length !== 1) return;
            this.deleteRow(this.selectedRows[0]);
        },
        init() {
            this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
        },
        mkdir() {
            if (this.editingRow) {
                MessageBox.alert.warning({
                    title: this.t('view.file.PleaseFinishRenameOrMkdir')
                });
                return;
            }
            const emptyRow = {
                ownerId: '',
                name: this.t('view.file.NewFolder'),
                path: '',
                filesystem: 'cephfs',
                isFile: false,
                mimeType: 'text/directory',
                fileExtension: '',
                fileShareId: '',
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
                size: 0
            };

            this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
            lock(this.$el.querySelector('.el-table__body-wrapper'));
            this.$nextTick(() => {
                setTimeout(() => {
                    if (this.fileManager.isRoot) {
                        this.fileManager.renderFiles.splice(this.fileManager.fixedRows.length, 0, emptyRow);
                    } else {
                        this.fileManager.renderFiles.unshift(emptyRow);
                    }
                    this.editingRow = emptyRow;
                    this.tempRowName = emptyRow.name;
                    setTimeout(() => {
                        lock(this.$el.querySelector('.el-table__body-wrapper'));
                    }, 0);
                }, 100);
            });
        },
        handlePathNameClick(row) {
            if (!row.isFile) {
                unlock(this.$el.querySelector('.el-table__body-wrapper'));
                if (row.path[0] !== '/') {
                    this.fileManager.currentPath = `/${row.path}`;
                } else {
                    this.fileManager.currentPath = row.path;
                }
            } else {
                this.$parent.$emit('open-file', row);
                this.selectedRows.splice(0, 1, row);
                this.$refs.fileTable.$children[0].doLayout();
            }
        },
        handleRowClick(row) {
            this.selectedRows.splice(0, 1, row);
            this.$nextTick(() => {
                this.$refs.fileTable.$children[0].doLayout();
            });
        },
        makeFile() {
            this.mkFile();
        },
        saveEdit() {
            // todo: 保存修改,然后清空editingRow,刷新列表
            this.doRenameOrMakePath();
        },
        cancelEdit() {
            if (!this.editingRow.path) {
                if (this.fileManager.isRoot) {
                    this.fileManager.renderFiles.splice(this.fileManager.fixedRows.length, 1);
                } else {
                    this.fileManager.renderFiles.shift();
                }
                this.$nextTick(() => {
                    unlock(this.$el.querySelector('.el-table__body-wrapper'));
                });
            }
            this.editingRow = null;
            this.tempRowName = '';
        },
        getFileIcon(file) {
            return getFileIcon(file);
        },
        setRowKey(row) {
            return row.path;
        },
        handleSortChange({ order, prop }) {
            const orderMap = {
                descending: 'desc',
                ascending: 'asc',
                '': ''
            };
            if (isFirstSort) {
                isFirstSort = false;
                return;
            }
            if (this.fileManager.isSearch) return;
            if (this.fileManager.orderBy === prop && this.fileManager.order === orderMap[order]) {
                return;
            }
            this.fileManager.orderBy = prop;
            this.fileManager.order = orderMap[order];
            this.fileManager.enterDirectory(this.fileManager.currentPath);
        },
        handleFileAction(row, { name }) {
            return this.OPERATION_MAP[name] && this.OPERATION_MAP[name](row);
        },
        calcViewportVisible() {
            const target = this.$el.querySelector('.el-table__body-wrapper');
            const listHeight = ROW_HEIGHT * this.fileManager.loadedTotal;
            const viewportHeight = target.offsetHeight;
            const scrollTop = target.scrollTop;
            let topCount = Math.floor(scrollTop / ROW_HEIGHT);
            let bottomCount = Math.floor((listHeight - scrollTop - viewportHeight) / ROW_HEIGHT);
            topCount = topCount - 5 >= 0 ? topCount - 5 : 0;
            bottomCount = bottomCount - 5 > 0 ? bottomCount - 5 : 0;
            // 获取当前视口区域的文件列表并渲染
            const containerCount = this.fileManager.loadedTotal - topCount - bottomCount;
            this.fileManager.getRenderList(topCount, containerCount).then(res => {
                this.containerCount = containerCount;
                this.topCount = topCount;
                this.fileManager.renderFiles = res.slice();
            }, () => {
                this.containerCount = containerCount;
                this.topCount = topCount;
                this.fileManager.renderFiles = [];
            }).then(() => {
                this.$refs.fileTable.$children[0].doLayout();
            });
        },
        loadMore(direction, scrollDistance, isReachBottom) {
            let isScrollDown = false;
            this.currentScrollTop = scrollDistance;
            isScrollDown = !!(this.lastScrollTop && this.currentScrollTop - this.lastScrollTop > 0);
            this.lastScrollTop = this.currentScrollTop;
            if (direction === 'vertical') {
                if (isReachBottom && isScrollDown) {
                    this.loadNextPage();
                }
                this.calcViewportVisible();
            }
        },
        loadNextPage() {
            this.fileManager.loadNextPage();
        },
        scrollToTop() {
            this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
        },
        getTableRowClassName({row}) {
            if (this.selectedRows.some(item => item.path === row.path)) {
                return 'highlight-row';
            }
            return '';
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        isFirstSort = true;
    }
};
</script>

<style lang="scss" scoped>
.skyide-file-table {
    height: calc(100% - 100px);
    margin-bottom: 20px;
    overflow: hidden;
    & /deep/ .el-checkbox.is-disabled {
        display: none;
    }
    .skyide-file-table__checkbar {
        padding-left: 10px;
        line-height: 58px;
    }
    & /deep/ .sdxu-table {
        border-bottom: none;
        table {
            border-bottom: none;
        }
    }
}
</style>
