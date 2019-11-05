<template>
    <div class="sdxv-task-manage-executelist">
        <div class="info">
            <div
                v-for="(item) in infoList"
                :key="item.title"
                :class="item.class"
            >
                <div>
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="total">
                        {{ item.total }}
                    </div>
                    <div class="progress">
                        <span>{{ t('view.task.tipCard.Manual') }}</span>
                        <el-progress
                            :stroke-width="8"
                            :percentage="50"
                            color="#1144AB"
                            :show-text="false"
                        />
                        <span>{{ t('view.task.tipCard.Dispatch') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <SdxwSearchLayout
            :label-width="lang$ ==='en' ? '120px' : '80px'"
        >
            <SdxwSearchItem label="类型:">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="状态">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="状态">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
                
            <SdxwSearchItem :label="`${t('view.task.executeTimeRange')}：`">
                <el-date-picker
                   
                    type="daterange"
                    size="large"
                    :start-placeholder="t('view.task.startTime')"
                    :end-placeholder="t('view.task.stopTime')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem label="状态">
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
                 
                    label="执行ID"
                />
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
               
                    :label="'所属组'"
                />
                <el-table-column
                    prop="execute_type"
                    :label="t('view.task.executeType')"
                /> 
                <el-table-column
                    prop="cron_start_time"
                    :label="t('view.task.executeStartTime')"
                    sortable
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cron_end_time"
                    :label="t('view.task.executeStopTime')"
                    sortable
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column 
                    sortable
                    prop="repeat_times"
                    :label="t('view.task.executeTime')"
                />
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="172px"
                >
                    <template #default="{ row }">
                        <SdxuIconButtonGroup>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                            >
                                {{ '取消执行' }} 
                            </SdxuButton>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                            >
                                {{ '详情' }}
                            </SdxuButton>
                        </SdxuIconButtonGroup>
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
import { Row, Col, Progress } from 'element-ui';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
export default {
    name: 'SdxvExecuteList',
    data() {
        return {
            infoList: [
                {
                    total: 123,
                    title: this.t('view.task.tipCard.TotalExecution'),
                    manual: 63,
                    dispatch: 60,
                    class: 'execute'
                },
                {
                    total: 123,
                    title:  this.t('view.task.tipCard.Queuing'),
                    manual: 63,
                    dispatch: 60,
                    class: 'queuing'
                },
                {
                    total: 123,
                    title: this.t('view.task.state.RUNNING'),
                    manual: 63,
                    dispatch: 60,
                    class: 'running'
                },
                {
                    total: 123,
                    title:  this.t('view.task.tipCard.SuccessfulOperation'),
                    manual: 63,
                    dispatch: 60,
                    class: 'success'
                },
                {
                    total: 123,
                    title:  this.t('view.task.tipCard.OperationFailure'),
                    manual: 63,
                    dispatch: 60,
                    class: 'fail'
                },
            ],
            table: []
        };
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Row.name]: Row,
        [Col.name]: Col,
        [Progress.name]: Progress
    },
    methods: {
        dateFormatter,
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
.sdxv-task-manage-executelist {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .info {
        margin:0  -12px;
        height: 152px;
        margin-bottom: 24px;
        &>div {
            width: 20%;
            text-align: center;
            padding: 0 12px;
            height: 152px;
            float: left;
            &>div {
                height: 152px;
                @extend .panel;
                padding: 20px;
                box-sizing: border-box;
                .total {
                    font-size: 48px;
                    height: 74px;
                    line-height: 74px;
                }
                .title {
                    display: inline-block;
                }
                .progress {
                    span {
                        font-size: 12px;
                        color: #6E7C94;
                    }
                }
            }
        }
        .execute {
            .total, .title {
                color: #1144AB;
            }
        }
        .queuing, .running {
            .total, .title {
                color: #FF9400;;
            }
        }
        .success {
            .total, .title {
                color: #008A56;
            }
        }
        .fail {
            .total, .title {
                color: #F11600;
            }
        }
        & /deep/ {
            .el-progress {
                display: inline-block;
                width: calc(100% - 116px);
                margin: 0 6px;
            }
        }
    }
    .table {
        @extend .panel;
        padding: 24px;
        margin-top: 24px;
        .sdxu-button {
            padding: 0;
        }
    }
    /deep/ {
        .el-date-editor--daterange.el-input__inner {
            width: auto;
            .el-range-input {
                &::placeholder {
                    color: #8E9BB1;
                }
            }
        }
    }
}
</style>