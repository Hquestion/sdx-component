<template>
    <div class="sdxu-table">
        <el-table 
            :data="data"
            :row-class-name="tableRowClassName"
            v-bind="params"
            style="width: 100%"
        >
            <slot />
        </el-table>
    </div>
</template>

<script>
import { Table } from 'element-ui';
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
        },
        params: {
            type: Object,
            default() {
                return {};
            }
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
