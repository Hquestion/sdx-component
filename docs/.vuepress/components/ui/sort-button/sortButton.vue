<template>
    <div class="sdxui-sort-button">
        <SdxuSortButton
            title="按创建时间排序"
            @sortChange="sortChange"
            :order.sync="order"
        />
    </div>
</template>

<script>
import SortButton from '@sdx/ui/components/sort-button';
export default {
    name: 'ButtonDemo',
    data() {
        return {
            order: 'desc',
        };
    },
    components: {
        [SortButton.name]:SortButton
    },
    methods: {
        sortChange() {
           
        },
    }
}
</script>

<style lang="scss" scoped>
   
</style>
