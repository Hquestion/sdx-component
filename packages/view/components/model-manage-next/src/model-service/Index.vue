<template>
    <div class="sdxv-model-service">
        <div class="title">
            {{ t('view.model.serviceList') }}
        </div>
        <div class="condition">
            <SdxwSearchLayout @search="handleSearch">
                <SdxwSearchItem :label="`${t('view.task.taskName')}：`">
                    <sdxu-input
                        v-model="params.name"
                        type="search"
                        :placeholder="t('view.project.enterProjectName')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="`${t('view.model.serviceState')}：`">
                    <sdxu-input
                        v-model="params.state"
                        type="search"
                        :placeholder="t('view.project.enterProjectName')"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="table">
            <sdxu-table
                :data="table"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
            >
                <el-table-column
                  
                    :label="t('view.authority.ServiceName')"
                />
                <el-table-column
                  
                    :label="t('view.task.taskName')"
                /> 
                <el-table-column
                  
                    :label="t('view.model.modelVersion')"
                />
                <el-table-column
                    prop="apiUrl"
                    label="URL"
                /> 
                <el-table-column
                    prop="state"
                    :label="t('sdxCommon.Status')"
                /> 
                
            
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="172px"
                >
                    <template #default="{ row }">
                        <SdxuButton
                            size="regular"
                            type="link"
                        >
                            {{ t('view.task.tipCard.Detail') }} 
                        </SdxuButton>
                        <SdxuButton
                            type="link"
                            size="regular"
                        >
                            {{ t('sdxCommon.Delete') }}
                        </SdxuButton>
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <OnlineTesting :visible.sync="onlineTestingVisible" />
        <PublishPlatform :visible.sync="publishPlatformVisible" />
        <GrayscaleRelease :visible.sync="grayscaleReleaseVisible" />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { getServiceList } from '@sdx/utils/src/api/model';
import { paginate } from '@sdx/utils/src/helper/tool';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import OnlineTesting from '../service-dialog/OnlineTesting';
import PublishPlatform from '../service-dialog/PublishPlatform';
import GrayscaleRelease from '../service-dialog/GrayscaleRelease';
export default {
    name: 'SdxvModelService',
    mixins: [locale],
    data() {
        return {
            params: {
                name: '',
                state: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'updatedAt'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            onlineTestingVisible: false,
            publishPlatformVisible:false,
            grayscaleReleaseVisible:false
        };
    },
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        SdxuPagination,
        OnlineTesting,
        PublishPlatform,
        GrayscaleRelease
    },
    created() {
        this.getServices();
    },
    methods: {
        getServices() {
            const params = Object.assign({}, this.params, {
                ...paginate(this.current, this.pageSize),
            });
            getServiceList(params).then(res => {
                
            });
        },
        handleSearch() {
            // this.onlineTestingVisible = true;
            // this.publishPlatformVisible = true;
            this.grayscaleReleaseVisible = true;
            this.current = 1; 
            this.getServices();
        },
    }
    
};
</script>

<style lang="scss" scoped>
.sdxv-model-service {
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 32px;
    }
    .table {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
        padding: 24px;
        margin-top: 24px;
    }
}
</style>