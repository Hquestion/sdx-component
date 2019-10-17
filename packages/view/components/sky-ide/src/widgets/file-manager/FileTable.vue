<template>
    <div
        class="skyide-file-table"
        @contextmenu="handleEmptyContextMenu"
    >
        <SdxuTable
            ref="fileTable"
            :dynamic="true"
            :reverse-selection="true"
            :row-key="setRowKey"
            :data="fileManager.renderFiles"
            :default-sort="{prop: fileManager.orderBy, order: 'descending'}"
            @sort-change="handleSortChange"
            :row-class-name="getTableRowClassName"
            height="100%"
            v-loadmore="loadMore"
            row-id="path"
            :highlight-key="editingRow && editingRow.path"
            @row-dblclick="handlePathNameClick"
            @row-click="handleRowClick"
            @row-contextmenu="handleContextMenu"
            :empty-label="emptyLabel"
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
                width="140"
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
import Clusterize from 'clusterize.js';

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
            copyingRow: null,
            cuttingRow: null,
            emptyLabel: ''
        };
    },
    computed: {
        topHeight() {
            return 0;
        },
        bottomHeight() {
            return 0;
        }
    },
    methods: {
        handleEmptyContextMenu() {
            this.selectedRows = [];
            event.preventDefault();
            this.openContextMenu();
        },
        handleContextMenu(row, event) {
            this.handleRowClick(row);
            event.preventDefault();
            event.stopPropagation();
            this.openContextMenu();
        },
        openContextMenu() {
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
            // this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
            this.selectedRows = [];
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
                    this.handleRowClick(this.editingRow);
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
            if (this.editingRow && this.editingRow !== row) this.cancelEdit();
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
                // this.calcViewportVisible();
            }
        },
        loadNextPage() {
            this.fileManager.loadNextPage();
        },
        scrollToTop() {
            this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
        },
        getTableRowClassName({row}) {
            if (this.selectedRows.some(item => (item && item.path) === (row && row.path))) {
                return 'highlight-file-row';
            }
            return '';
        },
        scrollToRow(file) {
            if (file.path[0] !== '/') {
                file.path = `/${file.path}`;
            }
            const index = this.fileManager.renderFiles.findIndex(item => item.path === file.path);
            setTimeout(() => {
                this.$el.querySelector('.el-table__body-wrapper').scrollTop = (index - 10) * ROW_HEIGHT;
                this.selectedRows.splice(0, 1, this.fileManager.renderFiles[index]);
            }, 500);
        }
    },
    mounted() {
        this.init();
        setTimeout(() => {
            new Clusterize({
                rows: document.querySelectorAll('.el-table__row'),
                scrollElem: document.getElementById('scroll-area'),
                contentElem: document.querySelector('.el-table__body tbody')
            });
        },2000);
    },
    beforeDestroy() {
        isFirstSort = true;
    }
};
</script>

<style lang="scss" scoped>
.skyide-file-table {
    height: calc(100% - 80px);
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

        &.el-table th > .cell,
        &.el-table .cell {
            background-color: #314065;
        }
        &.el-table td {
            color: #DDE5FE;
            font-size: 12px;
        }
        &.el-table th > .cell {
            font-size: 14px;
            color: #A0A5B8;
            font-weight: 400;
        }
        &.el-table tr,
        &.el-table th {
            background-color: #314065;
        }
        &.el-table .ascending .sort-caret.ascending {
            border-bottom-color: #fff;
        }
        &.el-table .descending .sort-caret.descending {
            border-top-color: #fff;
        }
        .el-table__body tr:hover > td,
        &.el-table tr:hover .cell{
            background-color: #34539B;
        }
        &.el-table .highlight-file-row,
        &.el-table .highlight-file-row .cell {
            background-color: #34539B!important;
        }
        .el-table__empty-block {
            background-color: #314065;
            border-top: none;
        }
        .el-table__body-wrapper.is-scrolling-none,
        .el-table__body-wrapper.is-scrolling-left,
        .el-table__body-wrapper.is-scrolling-right,
        .el-table__body-wrapper.is-scrolling-middle {
            background-color: #314065;
        }
    }
}
</style>
