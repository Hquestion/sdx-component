<template>
    <div class="sdxv-file-table">
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
            height="100%"
            v-loadmore="loadMore"
            v-loading="fileManager.loading"
            row-id="path"
            :highlight-key="editingRow && editingRow.path"
            @row-dblclick="handlePathNameClick"
        >
            <el-table-column
                :label="t('view.file.FileName')"
                :sortable="fileManager.isSearch ? true: 'custom'"
                prop="name"
                :sort-orders="['ascending', 'descending']"
                v-if="true"
            >
                <template #default="{row}">
                    <FileName
                        :row="row"
                        v-model="tempRowName"
                        @save-rename="saveEdit"
                        @cancel-rename="cancelEdit"
                        @name-click="handlePathNameClick"
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
import { getFileIcon, getFileBtn, rootKinds } from './helper/fileListTool';
import Loadmore from './helper/loadmore';
import OperationHandlerMixin from './helper/operationHandlerMixin';
import FileName from './FileName';

const ROW_HEIGHT = 30;
let isFirstSort = true;

export default {
    name: 'FileTable',
    inject: ['fileManager'],
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
            rootKinds
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
            }
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
        getFileBtn(file) {
            return getFileBtn(file, this.fileManager.rootKind, this.fileManager.isShareRoot());
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
.sdxv-file-table {
    height: calc(100% - 100px);
    overflow: hidden;
    & /deep/ .el-checkbox.is-disabled {
        display: none;
    }
    .sdxv-file-table__checkbar {
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