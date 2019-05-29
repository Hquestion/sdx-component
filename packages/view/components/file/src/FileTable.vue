<template>
    <div class="sdxv-file-table">
        <div class="sdxv-file-table__checkbar" v-show="fileManager.checked.length > 0">
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
            :data="fileManager.fileList"
            @sort-change="handleSortChange"
            :show-header="fileManager.checked.length === 0"
            @select="handleSelect"
            @select-all="handleSelectAll"
            :dynamic-top-height="topHeight"
            :dynamic-bottom-height="bottomHeight"
            height="calc(100% - 100px)"
            v-loadmore="loadMore"
        >
            <el-table-column type="selection" />
            <el-table-column
                label="文件名"
                sortable="custom"
                prop="name"
            >
                <template #default="{row}">
                    <span class="sdxv-file__item">
                        <svg
                            class="sdxv-file__item-icon"
                            aria-hidden="true"
                        >
                            <use :xlink:href="'#' + getFileIcon(row)" />
                        </svg>
                        <span>{{ row.name }}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="大小"
                sortable="custom"
                prop="size"
            />
            <el-table-column
                label="更新时间"
                sortable="custom"
                prop="updatedAt"
            />
            <el-table-column label="操作">
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
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import ElTableColumn from 'element-ui/lib/table-column';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import SdxuIconButton from '@sdx/ui/components/icon-button';

import { rootKinds, getFileIcon, getFileBtn } from './helper/fileListTool';
import Loadmore from './helper/loadmore';
import {isUndefined} from '@sdx/utils/src/helper/tool';

export default {
    name: 'FileTable',
    inject: ['fileManager'],
    mixins: [Loadmore],
    components: {
        ElTableColumn,
        SdxuTable,
        SdxuIconButtonGroup,
        SdxuIconButton
    },
    data() {
        return {
            topHeight: 0,
            bottomHeight: 0
        };
    },
    computed: {
        checked: {
            get() {
                return this.fileManager.checked.length > 0;
            },
            set(val) {
                if (!val) {
                    if (this.isIndeterminate) {
                        this.doSelectAll();
                    } else {
                        this.doUnselectAll();
                    }
                } else {
                    this.doSelectAll();
                }
                this.syncRowCheckStatus();
            }
        },
        isIndeterminate() {
            return this.fileManager.checked.length > 0 && this.fileManager.checked.length < this.fileManager.fileList.length;
        }
    },
    methods: {
        getFileBtn(file) {
            return getFileBtn(file, this.fileManager.rootKind);
        },
        getFileIcon(file) {
            return getFileIcon(file);
        },
        setRowKey(row) {
            return row.path;
        },
        handleSortChange() {},
        handleFileAction(row, { name }) {
            // eslint-disable-next-line
            console.log(name);
        },
        handleSelect(selection, row) {
            // eslint-disable-next-line
            console.log(selection);
            let checkedIndex = this.fileManager.checkedMap[row.path];
            if (!isUndefined(checkedIndex) && checkedIndex >= 0) {
                delete this.fileManager.checkedMap[row.path];
                this.fileManager.checked.splice(checkedIndex, 1);
            } else {
                this.fileManager.checked.push(row);
                this.fileManager.checkedMap[row.path] = this.fileManager.checked.length - 1;
            }
        },
        handleSelectAll(selection) {
            if (this.fileManager.isCheckAll) {
                this.doUnselectAll();
            } else {
                this.doSelectAll();
            }
        },
        doSelectAll() {
            this.fileManager.isCheckAll = true;
            // 获取所有文件，使用indexedDB时需修改成从indexedDB获取
            this.fileManager.checked = this.fileManager.fileList.slice(0);
            this.fileManager.checkedMap = {};
            this.fileManager.checked.forEach((item, index) => {
                this.fileManager.checkedMap[item.path] = index;
            });
        },
        doUnselectAll() {
            this.fileManager.isCheckAll = false;

            this.fileManager.checked = [];
            this.fileManager.checkedMap = {};
        },
        syncRowCheckStatus() {
            if (this.fileManager.checked.length > 0) {
                this.fileManager.checked.forEach(item => {
                    this.$refs.fileTable.$children[0].toggleRowSelection(item, true);
                });
            } else {
                this.$refs.fileTable.$children[0].clearSelection();
            }
        },
        loadMore(direction, scrollDistance, isReachBottom) {
            // console.log(direction, scrollDistance, isReachBottom);
            if (direction === 'vertical') {
                if (isReachBottom) {
                    this.loadNextPage();
                }
                let topCount = Math.floor(scrollDistance / this.rowHeight);
                this.topCount = topCount - 5 > 0 ? topCount - 5 : 0;
            }
        },
        loadNextPage() {

        }
    },
    mounted() {

    }
};
</script>

<style lang="scss" scoped>
@import "~@sdx/utils/src/theme-common/var";
.sdxv-file-table {
    height: 100%;
    .sdxv-file-table__checkbar {
        padding-left: 10px;
        line-height: 58px;
    }
    .sdxv-file__item {
        display: inline-block;
        &:hover {
            span {
                color: $sdx-primary-color;
                cursor: pointer;
            }
        }
        .sdxv-file__item-icon {
            width: 20px;
            height: 20px;
            margin-right: 14px;
            vertical-align: middle;
        }
    }
}
</style>
