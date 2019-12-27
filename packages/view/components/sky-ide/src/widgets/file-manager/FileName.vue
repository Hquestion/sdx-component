<template>
    <span
        class="skyide-file__item"
        :class="{'is-no-zip-file' : row.isFile}"
    >
        <svg
            class="skyide-file__item-icon"
            aria-hidden="true"
        >
            <use :xlink:href="'#' + getFileIcon(row)" />
        </svg>
        <div class="skyide-file__item-name">
            <span v-if="isEditingRow">
                <SdxuInput
                    v-model="_value"
                    :inline="true"
                    size="small"
                    style="width: 60%;"
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
            <span
                v-else
                @click="handlePathNameClick(row)"
                :title="row.name"
            >{{ row.name }}</span>
        </div>
    </span>
</template>

<script>
import { getFileIcon } from './helper/fileListTool';
import SdxuInput from '@sdx/ui/components/input';
import locale from '@sdx/utils/src/mixins/locale';

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
    mixins: [locale],
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
            newName: this.t('view.file.NewFolder')
        };
    },
    components: {
        SdxuInput
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
        handlePathNameClick(row) {
            if (row.isFile) return;
            this.$emit('name-click', row);
        }
    }
};
</script>

<style lang="scss">
    @import "~@sdx/utils/src/theme-common/var";
    .skyide-file__item {
        display: block;
        overflow: hidden;
        /* &:hover {
            span {
                color: $sdx-primary-color;
                cursor: pointer;
            }
        } */
        &.is-no-zip-file {
            &:hover {
                span {
                    cursor: default;
                }
            }
        }
        .skyide-file__item-icon {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .skyide-file__item-name {
            display: inline-block;
            vertical-align: middle;
            width: 80%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .sdx-icon {
                margin-left: $sdx-margin / 2;
                font-size: $sdx-h1-font-size;
                display: inline-block;
                vertical-align: middle;
                &.accept-icon {
                    color: $sdx-h1-font-size;
                }
                &.cancel-icon {
                    color: $sdx-text-holder-color;
                }
            }
        }
    }
    .skyide-file__item-name-scroller {
        & /deep/ .el-scrollbar__wrap {
            max-height: 400px !important;
        }
    }
</style>
