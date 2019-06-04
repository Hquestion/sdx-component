<template>
    <div class="sdxui-sort-search">
        <SdxuSortSearch
            title="按创建时间排序"
            @sortChange="sortChange"
            :order="order"
        />
    </div>
</template>

<script>
import SortSearch from '@sdx/ui/components/sort-search';
export default {
    name: 'ButtonDemo',
    data() {
        return {
            order: 'desc',
        };
    },
    components: {
        [SortSearch.name]:SortSearch
    },
    methods: {
        sortChange(order) {
            this.order =  order;
        },
    }
}
</script>

<style lang="scss" scoped>
   
</style>
