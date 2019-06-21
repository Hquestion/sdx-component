<template>
    <div class="sdxv-file-table">
        <div
            class="sdxv-file-table__checkbar"
            v-show="fileManager.checked.length > 0"
        >
            <el-checkbox
                v-model="checked"
                :indeterminate="isIndeterminate"
            >
                <span>已选中{{ fileManager.checked.length }}</span>个文件/文件夹
            </el-checkbox>
        </div>
        <SdxuTable
            ref="fileTable"
            :dynamic="true"
            :reverse-selection="true"
            :row-key="setRowKey"
            :data="fileManager.renderFiles"
            :default-sort="{prop: fileManager.orderBy, order: 'descending'}"
            @sort-change="handleSortChange"
            :show-header="fileManager.checked.length === 0"
            @select="handleSelect"
            @select-all="handleSelectAll"
            :dynamic-top-height="topHeight"
            :dynamic-bottom-height="bottomHeight"
            height="100%"
            v-loadmore="loadMore"
            v-loading="fileManager.loading"
        >
            <el-table-column
                v-if="!fileManager.isProjectRoot()"
                type="selection"
                :selectable="canRowCheck"
            />
            <el-table-column
                label="文件名"
                sortable="custom"
                prop="name"
                :sort-orders="['ascending', 'descending']"
            >
                <template #default="{row}">
                    <span
                        class="sdxv-file__item"
                        :class="{'is-no-zip-file': row.isFile && row.fileExtension !== '.zip'}"
                    >
                        <svg
                            class="sdxv-file__item-icon"
                            aria-hidden="true"
                        >
                            <use :xlink:href="'#' + getFileIcon(row)" />
                        </svg>
                        <div class="sdxv-file__item-name">
                            <span v-if="isEditingRow(row)">
                                <SdxuInput
                                    v-model="tempRowName"
                                    :inline="true"
                                />
                                <i
                                    class="sdx-icon sdx-icon-circle-outline accept-icon"
                                    @click="saveEdit"
                                />
                                <i
                                    class="sdx-icon sdx-icon-remove-outline cancel-icon"
                                    @click="cancelEdit"
                                />
                            </span>
                            <ElPopover
                                v-else-if="row.fileExtension === '.zip'"
                                trigger="click"
                                @show="handleZipPreviewShown"
                                placement="right"
                            >
                                <div style="max-height: 400px;">
                                    <ElScrollbar class="sdxv-file__item-name-scroller">
                                        <SdxwFileSelectTree :checkable="false" :root-path="row.path" :load-fn-wrap="zipPreviewFnWrap"/>
                                    </ElScrollbar>
                                </div>
                                <span slot="reference"> {{ row.name }} </span>
                            </ElPopover>
                            <span
                                v-else
                                @click="handlePathNameClick(row)"
                            >{{ row.name }}</span>
                        </div>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="所在目录"
                :sortable="false"
                prop="path"
                width="240"
                v-if="fileManager.isSearch"
            >
                <template #default="{row}">
                    <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="row.path">
                        {{ row.path }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="大小"
                sortable="custom"
                prop="size"
                width="180"
                :sort-orders="['ascending', 'descending']"
            >
                <template #default="{row}">
                    {{ row.size | byteFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                label="更新时间"
                sortable="custom"
                prop="updatedAt"
                width="240"
                :sort-orders="['ascending', 'descending']"
            >
                <template #default="{row}">
                    {{ row.updatedAt | dateFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="180"
            >
                <template #default="{row}">
                    <SdxuIconButtonGroup>
                        <SdxuIconButton
                            v-for="(item, index) in getFileBtn(row)"
                            :icon="item.icon"
                            :title="item.title"
                            :key="index"
                            @click="handleFileAction(row, item)"
                        />
                    </SdxuIconButtonGroup>
                </template>
            </el-table-column>
        </SdxuTable>
        <SdxvFolderSelect
            v-if="moveVisible"
            :visible.sync="moveVisible"
            :support-move="supportMove"
            @move="handleMove"
            @copy="handleCopy"
            @cancel="handleCancelMove"
        />
        <SdxwShareSetting
            v-if="shareVisible"
            :visible.sync="shareVisible"
            :default-users="shareUsers"
            :default-groups="shareGroups"
            :handler="doShare"
        />
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuInput from '@sdx/ui/components/input';
import SdxwShareSetting from '@sdx/widget/components/share-setting';

import { lock, unlock } from '@sdx/utils/src/lockScroll';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';

import dayjs from 'dayjs';

import SdxvFolderSelect from './popup/FolderSelect';
import { getFileIcon, getFileBtn } from './helper/fileListTool';
import { zipPreview } from '@sdx/utils/src/api/file';
import Loadmore from './helper/loadmore';
import checkMixin from './helper/checkMixin';
import OperationHandlerMixin from './helper/operationHandlerMixin';
import FileSelect from '@sdx/widget/components/file-select';
import { rootKindPathMap } from './helper/fileListTool';

const ROW_HEIGHT = 52;
let isFirstSort = true;

export default {
    name: 'FileTable',
    inject: ['fileManager'],
    mixins: [Loadmore, checkMixin, OperationHandlerMixin, transformFilter],
    components: {
        SdxwShareSetting,
        SdxvFolderSelect,
        SdxuInput,
        ElTableColumn,
        SdxuTable,
        SdxuIconButtonGroup,
        SdxuIconButton,
        SdxwFileSelectTree: FileSelect.FileSelectTree
    },
    data() {
        return {
            topCount: 0,
            containerCount: 0,
            editingRow: null,
            tempRowName: '新建文件夹'
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
        mkdir(row) {
            if (this.editingRow) {
                MessageBox.alert.warning({
                    title: '请先完成新建或重命名'
                });
                return;
            }
            const emptyRow = {
                userId: '',
                name: '新建文件夹',
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
                if (this.fileManager.rootKind !== '') {
                    let query;
                    if (this.fileManager.isShareRoot()) {
                        query = {
                            path: rootKindPathMap[this.fileManager.rootKind] + row.path,
                            startPath: row.path,
                            ownerId: row.userId
                        };
                    } else {
                        query = {
                            path: rootKindPathMap[this.fileManager.rootKind] + row.path,
                            startPath: this.$route.query.startPath,
                            ownerId: row.userId
                        };
                    }
                    this.$router.push({
                        name: this.$route.name,
                        query
                    });
                } else {
                    this.$router.push({
                        name: this.$route.name,
                        query: {
                            path: row.path
                        }
                    });
                }
            }
        },
        isEditingRow(row) {
            return this.editingRow && (row.path === this.editingRow.path);
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
            return getFileBtn(file, this.fileManager.rootKind);
        },
        getFileIcon(file) {
            return getFileIcon(file);
        },
        setRowKey(row) {
            return row.path;
        },
        handleSortChange({order, prop}) {
            const orderMap = {
                'descending': 'desc',
                'ascending': 'asc',
                '': ''
            };
            if (isFirstSort) {
                isFirstSort = false;
                return;
            }
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
                this.syncRowCheckStatus();
            });
        },
        handleZipPreviewShown() {
            // todo 有什么要做优化的吗？没有的话可以删掉
        },
        zipPreviewFnWrap(rootPath, nodePath, userId) {
            return () => zipPreview({ path: rootPath, pathInZip: nodePath, userId }).then(res => res.files);
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
            const defer = this.fileManager.loadNextPage();
            if(defer) {
                defer.then(() => {
                    this.checkAndSelectAll();
                });
            }
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
@import "~@sdx/utils/src/theme-common/var";
.sdxv-file-table {
    height: calc(100% - 80px);
    overflow: hidden;
    & /deep/ .el-checkbox.is-disabled {
        display: none;
    }
    .sdxv-file-table__checkbar {
        padding-left: 10px;
        line-height: 58px;
    }
    .sdxv-file__item {
        display: block;
        overflow: hidden;
        &:hover {
            span {
                color: $sdx-primary-color;
                cursor: pointer;
            }
        }
        &.is-no-zip-file {
            &:hover {
                span {
                    color: $sdx-text-regular-color;
                    cursor: default;
                }
            }
        }
        .sdxv-file__item-icon {
            width: 20px;
            height: 20px;
            margin-right: 14px;
            vertical-align: middle;
        }
        .sdxv-file__item-name {
            display: inline-block;
            .sdx-icon {
                margin-left: $sdx-margin / 2;
                font-size: $sdx-h1-font-size;
                display: inline-block;
                vertical-align: middle;
                &.accept-icon {
                    color: $sdx-primary-color;
                }
                &.cancel-icon {
                    color: $sdx-text-holder-color;
                }
            }
        }
    }
}
</style>
<style lang="scss">
    .sdxv-file__item-name-scroller {
        & /deep/ .el-scrollbar__wrap {
            max-height: 400px !important;
        }
    }
</style>
