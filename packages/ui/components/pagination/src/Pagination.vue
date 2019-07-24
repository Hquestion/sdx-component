<template>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="current"
        :page-size="pageSize"
        :disabled="disabled"
        :pager-count="pagerCount"
        @current-change="currentChange"
        class="sdxu-pagination"
    />
</template>

<script>
import Pagination from 'element-ui/lib/pagination';
export default {
    name: 'SdxuPagination',
    data() {
        return {
            current: this.currentPage
        };
    },
    watch: {
        currentPage(nVal) {
            this.current = nVal;
        }
    },
    components: {
        [Pagination.name]: Pagination
    },
    props: {
        total: {
            type: Number,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pagerCount: {
            type: Number,
            default: 7
        }
    },
    methods: {
        currentChange(nVal) {
            this.$emit('update:currentPage', nVal);
            this.$emit('current-change', nVal);
        }
    }
};
</script>
