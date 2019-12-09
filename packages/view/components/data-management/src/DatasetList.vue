<template>
    <div class="sdxv-dataset-list">
        <div class="sdxv-dataset-list__title">
            文件数据集
        </div>
        <div class="sdxv-dataset-list__tabs">
            <SdxuTabRadioGroup v-model="currentTab">
                <SdxuTabRadioItem name="all">
                    所有数据集
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="self">
                    私有数据集
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="my-share">
                    我的共享
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="others-share">
                    他人共享
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
        </div>
        <div class="sdxv-dataset-list__filter">
            <SdxwSearchLayout
                @search="handleSearch"
                @reset="handleReset"
                :label-width="lang$ === 'en' ? '120px' : '80px'"
            >
                <SdxwSearchItem label="模型名称:">
                    <SdxuInput
                        v-model="name"
                        placeholder="请输入模型名称"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem label="模型类型:">
                    <el-select
                        v-model="selectedType"
                        size="large"
                    >
                        <el-option
                            v-for="item in modelTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="模型标签:">
                    <el-select
                        v-model="selectedTag"
                        size="large"
                    >
                        <el-option
                            v-for="item in tagList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-dataset-list__list">
            <!-- // todo: card list-->
            <SdxuPagination
                :current-page.sync="page"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuTabRadio from '@sdx/ui/components/tab-radio';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import SdxuPagination from '@sdx/ui/components/pagination';

import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';

export default {
    name: 'DatasetList',
    mixins: [locale],
    components: {
        [SdxuTabRadio.TabRadioGroup.name]: SdxuTabRadio.TabRadioGroup,
        [SdxuTabRadio.TabRadioItem.name]: SdxuTabRadio.TabRadioItem,
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuInput,
        SdxuPagination,
        ElSelect,
        ElOption
    },
    data() {
        return {
            currentTab: 'all',
            selectedType: '',
            selectedTag: '',
            name: '',
            modelTypeList: [],
            tagList: [],
            page: 1,
            pageSize: 10,
            total: 0,
        };
    },
    methods: {
        handlePageChange(page) {
            this.page = page;
        },
        handleSearch() {
            // todo:
        },
        handleReset() {
            // todo:
        }
    }
};
</script>

<style>

</style>
