<template>
    <el-table
        class="sdxu-table"
        :data="data"
        :row-class-name="tableRowClassName"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
        ref="elTable"
        :empty-text="t('ui.empty.noData')"
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
        }
    },
    methods: {
        tableRowClassName({row}) {
            if(row.key === this.highlightKey) {
                return 'highlight-row';
            }
            return '';
        }
    }
};
</script>
