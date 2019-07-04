<template>
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
            <span v-if="isEditingRow">
                <SdxuInput
                    v-model="_value"
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
                placement="right"
            >
                <div style="max-height: 400px;">
                    <ElScrollbar class="sdxv-file__item-name-scroller">
                        <SdxwFileSelectTree
                            :user-id="row.ownerId"
                            :checkable="false"
                            :root-path="row.path"
                            :load-fn-wrap="zipPreviewFnWrap"
                        />
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

<script>
import { zipPreview } from '@sdx/utils/src/api/file';
import { getFileIcon } from './helper/fileListTool';
import SdxuInput from '@sdx/ui/components/input';
import FileSelect from '@sdx/widget/components/file-select';

export default {
    name: 'FileName',
    inject: {
        fileManager: {
            default: {}
        },
        fileTable: {
            default: null
        }
    },
    props: {
        row: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            getFileIcon,
            newName: '新建文件夹'
        };
    },
    components: {
        SdxuInput,
        SdxwFileSelectTree: FileSelect.FileSelectTree
    },
    computed: {
        editingRow() {
            return this.fileTable && this.fileTable.editingRow;
        },
        isEditingRow() {
            if (!this.fileTable) return false;
            return this.editingRow && (this.row.path === this.editingRow.path);
        },
        _value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        saveEdit() {
            this.$emit('save-rename');
        },
        cancelEdit() {
            this.$emit('cancel-rename');
        },
        zipPreviewFnWrap(rootPath, nodePath, ownerId) {
            return () => zipPreview({ path: rootPath, pathInZip: nodePath, ownerId }).then(res => res.files);
        },
        handlePathNameClick(row) {
            this.$emit('name-click', row);
        }
    }
};
</script>

<style lang="scss">
    @import "~@sdx/utils/src/theme-common/var";
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
    .sdxv-file__item-name-scroller {
        & /deep/ .el-scrollbar__wrap {
            max-height: 400px !important;
        }
    }
</style>
