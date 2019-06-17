<template>
    <el-table
        class="sdxu-table"
        :data="data"
        :row-class-name="tableRowClassName"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
    >
        <slot />
    </el-table>
</template>

<script>
import Table from './el-table';
export default {
    name: 'SdxuTable',
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
