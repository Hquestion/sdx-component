<template>
    <div class="sdxv-model-service">
        <div class="title">
            {{ t('view.model.serviceList') }}
        </div>
        <div class="condition">
            <SdxwSearchLayout @search="handleSearch">
                <SdxwSearchItem :label="`${t('view.authority.ServiceName')}：`">
                    <sdxu-input
                        v-model="params.name"
                        :placeholder="t('ui.transfer.PleaseEnter')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="`${t('sdxCommon.Status')}：`">
                    <el-select
                        size="large"
                        v-model="params.state"
                    >
                        <el-option
                            v-for="item in STATE_TYPE"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="table">
            <sdxu-table
                :data="table"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
                v-loading="tableLoading"
            >
                <el-table-column type="expand">
                    <template #default="{row}">
                        <sdxu-table light>
                            <el-table-column
                                
                                :label="t('view.model.modelVersion')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Instances')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Resource')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Flow_ratio')"
                            />
                            <el-table-column
                                
                                :label="t('view.model.Running_time')"
                            />
                            <el-table-column
                                
                                :label="t('view.file.UpdatedAt')"
                            />
                            <el-table-column
                                
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
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="t('view.authority.ServiceName')"
                />
                <el-table-column
                    prop="modelName"
                    :label="t('view.model.modelColumns.name')"
                /> 
                <el-table-column
                    prop="versionName"
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
            <SdxuPagination
                v-if="total"
                :current-page.sync="page"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
            />
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
import { paginate,removeBlankAttr} from '@sdx/utils/src/helper/tool';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import OnlineTesting from '../service-dialog/OnlineTesting';
import PublishPlatform from '../service-dialog/PublishPlatform';
import GrayscaleRelease from '../service-dialog/GrayscaleRelease';
import { Select } from 'element-ui';
import { STATE_TYPE } from '@sdx/utils/src/const/task';
export default {
    name: 'SdxvModelService',
    mixins: [locale],
    data() {
        return {
            STATE_TYPE,
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
            tableLoading: false,
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
        GrayscaleRelease,
        [Select.name]: Select,
    },
    created() {
        this.getServices();
    },
    methods: {
        getServices() {
            this.tableLoading = true;
            const params = Object.assign({}, this.params, {
                ...paginate(this.current, this.pageSize),
            });
            removeBlankAttr(params);
            getServiceList(params).then(res => {
                this.table = res.items;
                this.total = res.total;
                this.tableLoading = false;
            }).catch(() => {
                this.table = [];
                this.total = 0;
                this.tableLoading = false;
            });
        },
        handleSearch() {
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
    .sdxu-pagination {
        margin-top: 24px;
    }
}
</style>