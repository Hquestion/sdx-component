<template>
    <div class="sdxv-operation-bar">
        <div class="sdxv-operation-bar__operations">
            <SdxuButton icon="sdx-icon sdx-icon-plus">
                新建文件夹
            </SdxuButton>
            <SdxwFileSelect
                source="local"
                :inline="true"
                :limit="-1"
                style="margin-left: 20px;margin-right: 20px;"
            >
                上传
            </SdxwFileSelect>
            <SdxuButton>
                下载
            </SdxuButton>
            <SdxuButton>
                分享
            </SdxuButton>
            <SdxuButton type="default">
                复制/移动
            </SdxuButton>
            <SdxuButton type="default">
                删除
            </SdxuButton>
        </div>
        <div class="sdxv-operation-bar__search">
            <SdxwSearchLayout @search="handleSearch" :block="false" align="right">
                <SdxwSearchItem>
                    <SdxuInput
                        type="search"
                        size="small"
                        v-model="fileManager.searchKey"
                        placeholder="请输入文件名称"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxwFileSelect from '@sdx/widget/components/file-select';
import SdxwSearch from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';

export default {
    name: 'OperationBar',
    components: {
        SdxuInput,
        SdxuButton,
        [SdxwFileSelect.FileSelectMix.name]: SdxwFileSelect.FileSelectMix,
        [SdxwSearch.SearchLayout.name]: SdxwSearch.SearchLayout,
        [SdxwSearch.SearchItem.name]: SdxwSearch.SearchItem
    },
    inject: ['fileManager'],
    data() {
        return {};
    },
    methods: {
        handleSearch() {

        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log(this.fileManager);
    }
};
</script>

<style lang="scss" scoped>
.sdxv-operation-bar {
    display: flex;
    justify-content: space-between;
    .sdxv-operation-bar__search {
        flex: 1;
    }
}
</style>
