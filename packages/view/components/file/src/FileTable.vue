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
                {{ t('view.file.AlreadyChecked') }}{{ fileManager.checked.length }}{{ t('view.file.FileOrFolder') }}
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
                type="selection"
                :selectable="canRowCheck"
                v-show="!fileManager.isProjectRoot()"
            />
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
                :label="t('view.file.InPath')"
                :sortable="false"
                prop="path"
                width="240"
                v-if="fileManager.isSearch"
            >
                <template #default="{row}">
                    <div
                        style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                        :title="row.path"
                    >
                        {{ row.path }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.file.FilePath')"
                :sortable="false"
                prop="path"
                width="360"
                v-if="fileManager.rootKind === rootKinds.MY_SHARE && !fileManager.isSearch"
            >
                <template #default="{row}">
                    <div
                        style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                        :title="row.path"
                    >
                        {{ row.path }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Size')"
                :sortable="fileManager.isSearch ? true: 'custom'"
                prop="size"
                width="180"
                :sort-orders="['ascending', 'descending']"
                v-if="!fileManager.isProjectRoot() && fileManager.rootKind !== rootKinds.MY_SHARE || fileManager.isSearch"
            >
                <template #default="{row}">
                    <span v-if="row.size && row.size > 0">{{ row.size | byteFormatter }}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('view.file.UserName')"
                :sortable="false"
                prop="size"
                width="180"
                v-if="fileManager.rootKind === rootKinds.ACCEPTED_SHARE"
            >
                <template #default="{row}">
                    {{ row.user.fullName }}
                </template>
            </el-table-column>
            <el-table-column
                :label="fileManager.rootKind === rootKinds.ACCEPTED_SHARE ? t('view.file.SharedAt'): t('view.file.UpdatedAt')"
                :sortable="fileManager.isSearch ? true: 'custom'"
                prop="updatedAt"
                width="240"
                :sort-orders="['ascending', 'descending']"
                v-if="fileManager.rootKind !== rootKinds.MY_SHARE || fileManager.isSearch"
            >
                <template #default="{row}">
                    {{ row.updatedAt | dateFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Operation')"
                width="180"
                v-if="!fileManager.isProjectRoot()"
            >
                <template #default="{row}">
                    <SdxuIconButtonGroup>
                        <SdxuIconButton
                            v-for="(item, index) in getFileBtn(row)"
                            :icon="item.icon"
                            :title="item.title"
                            :key="index"
                            :loading="mapLoadingStatus(item, row)"
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
            source-kind="file"
        />
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import MessageBox from '@sdx/ui/components/message-box';
import SdxwShareSetting from '@sdx/widget/components/share-setting';

import { lock, unlock } from '@sdx/utils/src/lockScroll';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';

import dayjs from 'dayjs';

import SdxvFolderSelect from './popup/FolderSelect';
import { getFileIcon, getFileBtn } from './helper/fileListTool';
import Loadmore from './helper/loadmore';
import checkMixin from './helper/checkMixin';
import OperationHandlerMixin from './helper/operationHandlerMixin';
import { rootKindPathMap, rootKinds } from './helper/fileListTool';
import FileName from './FileName';

const ROW_HEIGHT = 52;
let isFirstSort = true;

export default {
    name: 'FileTable',
    inject: ['fileManager'],
    provide() {
        return {
            fileTable: this
        };
    },
    mixins: [Loadmore, checkMixin, OperationHandlerMixin, transformFilter, locale],
    components: {
        FileName,
        SdxwShareSetting,
        SdxvFolderSelect,
        ElTableColumn,
        SdxuTable,
        SdxuIconButtonGroup,
        SdxuIconButton
    },
    data() {
        return {
            topCount: 0,
            containerCount: 0,
            editingRow: null,
            tempRowName: this.t('NewFolder'),
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
        mkdir(row) {
            if (this.editingRow) {
                MessageBox.alert.warning({
                    title: this.t('view.file.PleaseFinishRenameOrMkdir')
                });
                return;
            }
            const emptyRow = {
                ownerId: '',
                name: this.t('NewFolder'),
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
                            ownerId: row.ownerId || row.user && row.user.uuid
                        };
                    } else {
                        let path = rootKindPathMap[this.fileManager.rootKind] + row.path;
                        if (this.fileManager.rootKind === rootKinds.PROJECT_SHARE) {
                            path = rootKindPathMap[this.fileManager.rootKind] + (this.$route.query.startPath || '') + row.path;
                        }
                        query = {
                            path: path,
                            startPath: this.$route.query.startPath,
                            ownerId: row.ownerId
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
                this.syncRowCheckStatus();
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
.sdxv-file-table {
    height: calc(100% - 88px);
    overflow: hidden;
    & /deep/ .el-checkbox.is-disabled {
        display: none;
    }
    .sdxv-file-table__checkbar {
        padding-left: 10px;
        line-height: 58px;
    }
}
</style>
