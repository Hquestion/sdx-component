<template>
    <div class="dialog-test">
        <sdxu-pagination
            :current-page.sync="current"
            :page-size="pageSize"
            :total="total"
            @current-change="currentChange"
        />
    </div>
</template>

<script>
import SdxuPagination from '@sdx/ui/components/pagination';
export default {
    name: '',
    data() {
        return {
            current: 1,
            pageSize: 14,
            total: 100
        };
    },
    components: {
        SdxuPagination
    },
    methods: {
        currentChange(val) {
            console.log('currentChange', val);
            console.log('current', this.current);
        }
    }
};
</script>

<style scoped lang="scss">
</style>
