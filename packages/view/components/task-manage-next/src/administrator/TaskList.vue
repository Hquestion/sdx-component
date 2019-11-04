<template>
    <div class="sdxv-task-manage-tasklist">
        <SdxwSearchLayout ref="searchLayout">
            <SdxwSearchItem :label="`${t('view.task.taskName')}：`">
                <SdxuInput
                    
                    size="large"
                    type="search"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Creator')}：`">
                <SdxuInput
                   
                    size="large"
                    type="search"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.SubordinateGroup')}：`">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.Type')}：`">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <div class="table">
            <sdxu-table
                :data="table"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.taskType')"
                /> 
                <el-table-column
                    prop="owner_id"
                    :label="t('sdxCommon.Creator')"
                />
                <el-table-column
                    prop="quota.cpu"
                    :label="'CPU'"
                    sortable
                /> 
                <el-table-column
                    prop="quota.memory"
                    :label="t('view.task.Memory')"
                    sortable
                />
                <el-table-column
                    prop="quota.gpu"
                    :label="'GPU'"
                    sortable
                />
                
                <el-table-column
               
                    :label="'所属组'"
                />
                <el-table-column
                    prop="created_at"
                    :label="t('sdxCommon.CreatedTime')"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="172px"
                >
                    <template #default="{ row }">
                        <SdxuButton
                            type="primary"
                            size="regular"
                            :plain="true"
                        >
                            {{ '详情' }} 
                        </SdxuButton>
                        <SdxuButton
                            type="primary"
                            size="regular"
                            :plain="true"
                        >
                            {{ t('sdxCommon.Delete') }}
                        </SdxuButton>
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuScroll from '@sdx/ui/components/scroll';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxvTaskList',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Button.name]: Button,
        SdxuPagination,
        SdxuScroll
    },
    data() {
        return {
            table: []
        };
    },
    methods: {
        dateFormatter,
    },
    mounted() {
        
    },
    created() {
        this.table = [
            {
                '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
                'created_at': '2019-10-17T08:49:14.195000Z',
                'updated_at': '2019-10-17T08:49:14.194000Z',
                'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
                'name': 'dylan-jupyter',
                'description': null,
                'image_id': 'bd774322-98d3-4912-8af5-70cf01a66e9f',
                'auto_image_id': null,
                'type': 'JUPYTER',
                'quota': {
                    'cpu': 2,
                    'gpu': 1,
                    'memory': 4294967296,
                    'gpu_model': ''
                },
                'resource_config': {
                    'DEPLOY': {
                        'requests': {
                            'cpu': 2,
                            'memory': 4294967296,
                            'nvidia.com/gpu': 0
                        },
                        'labels': {
                            'gpu.model': ''
                        },
                        'instance': 1
                    }
                },
                'execute_type': 'MANUAL',
                'delay': 0,
                'trigger': null,
                'priority': 2,
                'crontab': null,
                'cron_start_time': null,
                'cron_end_time': null,
                'repeat_times': null,
                'concurrent_type': 'SKIP',
                'error_handling': 'CANCEL',
                'notifications': {},
                'task_id': '1e82f0b3-c7fe-4008-ae6d-48798dd84034',
                'state': 'CREATED',
                'datasources': [],
                'datasets': [],
                'home_path': '/usr/dylan'
            },
            {
                '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
                'created_at': '2019-10-17T08:49:14.195000Z',
                'updated_at': '2019-10-17T08:49:14.194000Z',
                'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
                'name': 'dylan-jupyter',
                'description': null,
                'image_id': 'bd774322-98d3-4912-8af5-70cf01a66e9f',
                'auto_image_id': null,
                'type': 'JUPYTER',
                'quota': {
                    'cpu': 2,
                    'gpu': 1,
                    'memory': 4294967296,
                    'gpu_model': ''
                },
                'resource_config': {
                    'DEPLOY': {
                        'requests': {
                            'cpu': 2,
                            'memory': 4294967296,
                            'nvidia.com/gpu': 0
                        },
                        'labels': {
                            'gpu.model': ''
                        },
                        'instance': 1
                    }
                },
                'execute_type': 'MANUAL',
                'delay': 0,
                'trigger': null,
                'priority': 2,
                'crontab': null,
                'cron_start_time': null,
                'cron_end_time': null,
                'repeat_times': null,
                'concurrent_type': 'SKIP',
                'error_handling': 'CANCEL',
                'notifications': {},
                'task_id': '1e82f0b3-c7fe-4008-ae6d-48798dd84034',
                'state': 'CREATED',
                'datasources': [],
                'datasets': [],
                'home_path': '/usr/dylan'
            },
            {
                '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
                'created_at': '2019-10-17T08:49:14.195000Z',
                'updated_at': '2019-10-17T08:49:14.194000Z',
                'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
                'name': 'dylan-jupyter',
                'description': null,
                'image_id': 'bd774322-98d3-4912-8af5-70cf01a66e9f',
                'auto_image_id': null,
                'type': 'JUPYTER',
                'quota': {
                    'cpu': 2,
                    'gpu': 1,
                    'memory': 4294967296,
                    'gpu_model': ''
                },
                'resource_config': {
                    'DEPLOY': {
                        'requests': {
                            'cpu': 2,
                            'memory': 4294967296,
                            'nvidia.com/gpu': 0
                        },
                        'labels': {
                            'gpu.model': ''
                        },
                        'instance': 1
                    }
                },
                'execute_type': 'MANUAL',
                'delay': 0,
                'trigger': null,
                'priority': 2,
                'crontab': null,
                'cron_start_time': null,
                'cron_end_time': null,
                'repeat_times': null,
                'concurrent_type': 'SKIP',
                'error_handling': 'CANCEL',
                'notifications': {},
                'task_id': '1e82f0b3-c7fe-4008-ae6d-48798dd84034',
                'state': 'CREATED',
                'datasources': [],
                'datasets': [],
                'home_path': '/usr/dylan'
            }
        ];
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-tasklist {
    & /deep/ {
        .__view {
            width: 100% !important;
        }
    }
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .table {
        @extend .panel;
        margin-top: 24px;
        height: calc(100vh - 378px);
        padding: 24px;
        .sdxu-button {
            padding: 0;
        }
    }
    .pagination {
        margin-top: 24px;
    }
}
</style>