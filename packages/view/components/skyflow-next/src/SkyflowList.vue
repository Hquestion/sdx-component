<template>
    <div class="sdxv-skyflow-list">
        <div class="title">
            Skyflow任务A执行记录
        </div>
        <div class="condition">
            <SdxwSearchLayout>
                <SdxwSearchItem label="时间：">
                    <el-date-picker
                        type="monthrange"
                        range-separator="-"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        size="medium"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem label="执行方式：">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
            <div class="table">
                <SdxuScroll>
                    <SkyflowTable />
                    <sdxu-pagination
                        class="pagination"
                        :page-size="10"
                        :total="45"
                    />
                </SdxuScroll>
            </div>
        </div>
    </div>
</template>

<script>
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { Select, Option } from 'element-ui';
import SkyflowTable from './SkyflowTable';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuScroll from '@sdx/ui/components/scroll';
export default {
    name: 'SdxvSkyflowList',
    data() {
        return {
          
        };
    },
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [Select.name]: Select,
        [Option.name]: Option,
        SkyflowTable,
        SdxuPagination,
        SdxuScroll
    },
    created() {
       
    },
    mixins: [locale],
    directives: {
        auth
    },
    methods: {
        searchSkyflow() {
           
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-skyflow-list {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .title {
        font-size: 24px;
        color: #13264D;
    }
    .condition {
        .sdxw-search-layout {
            @extend .panel;
        }
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }
    .table {
        @extend .panel;
        padding: 24px;
        height: calc(100vh - 302px);
    }
}
</style>
