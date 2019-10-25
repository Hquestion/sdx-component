<template>
    <div class="sdxv-skyflow-list">
        <div class="title">
            Skyflow任务A执行记录
        </div>
        <div class="condition">
            <SdxwSearchLayout>
                <SdxwSearchItem label="时间">
                    <el-date-picker
                        type="monthrange"
                        range-separator="-"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        size="medium"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem label="选择实例">
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
            <SkyflowTable />
            <sdxu-pagination
                class="pagination"
                v-if="false"
            />
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
        SdxuPagination
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
    .condition {
        .sdxw-search-layout {
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #C2CDDE;
            margin: 24px 0;
        }
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
    }
}
</style>
