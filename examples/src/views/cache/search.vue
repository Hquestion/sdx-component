<template>
    <div class="table">
        <sdxw-search-layout
            @search="search"
            @reset="reset"
        >
            <sdxw-search-item lable="镜像名称1:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称2:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称3:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称4:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
        </sdxw-search-layout>
    </div>
</template>

<script>

import SearchLayout from  '@sdx/widget/components/search-layout';
import Input from '@sdx/ui/components/input';
export default {
    data () {
        return {
        };
    },
    components: {
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        Input
    },
    methods: {
        search() {
            console.log('search');
        },
        reset() {
            console.log('reset');
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table {
    background: #fafbfc;
    height: 100vh;
    width: 100%;
}
</style>
