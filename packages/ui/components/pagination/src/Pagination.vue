<template>
    <div class="sdxu-pagination">
        <div class="sdxu-pagination__count">
            <span>{{t('ui.pagination.showEveryPage')}}</span>
            {{pageSize}}
            <span>{{t('ui.pagination.unit')}}</span>,
            <span>{{t('ui.pagination.total')}}</span>
            {{pagerCount}}
            <span>{{t('ui.pagination.page')}}</span>,
            {{total}}
            <span>{{t('ui.pagination.recordCount')}}</span>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="current"
            :page-size="pageSize"
            :disabled="disabled"
            :pager-count="pagerCount"
            @current-change="currentChange"
        />
    </div>

</template>

<script>
import Pagination from 'element-ui/lib/pagination';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxuPagination',
    data() {
        return {
            current: this.currentPage
        };
    },
    mixins: [locale],
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
