<template>
    <el-table
        class="sdxu-table"
        :data="data"
        :row-style="tableRowStyle"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
        ref="elTable"
        :empty-text="emptyText"
    >
        <slot />
    </el-table>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import Table from './el-table';
export default {
    name: 'SdxuTable',
    mixins: [locale],
    components: {
        [Table.name]: Table
    },
    data() {
        return {};
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        highlightKey: {
            type: String,
            default: ''
        },
        rowId: {
            type: String,
            default: 'uuid'
        },
        emptyLabel: {
            type: String,
            default: ''
        }
    },
    computed: {
        emptyText() {
            return this.emptyLabel || this.t('ui.empty.noData');
        }
    },
    methods: {
        tableRowStyle({row}) {
            if(row[this.rowId] === this.highlightKey) {
                return {
                    background: '#F7FAFF'
                };
            }
            return '';
        }
    }
};
</script>
