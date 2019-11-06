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
            :label-width="lang$ ==='en' ? '120px' : '100px'"
        >
            <SdxwSearchItem :label="`${t('view.task.taskName')}：`">
                <SdxuInput
                    :placeholder="t('view.task.PleaseInput')"
                    v-model="params.name"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Creator')}：`">
                <SdxuInput
                    v-model="params.ownerId"
                    :placeholder="t('view.task.PleaseInput')"
                />
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.SubordinateGroup')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.groupId"
                >
                    <el-option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.tipCard.Type')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.type"
                >
                    <el-option
                        v-for="item in taskType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('view.task.executeType')}：`">
                <el-select
                    size="large"
                    :placeholder="t('sdxCommon.PleaseSelect')"
                    v-model="params.type"
                >
                    <el-option
                        v-for="item in executeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem :label="`${t('sdxCommon.Status')}：`">
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
                    value-format="yyyy-MM-dd"
                />
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <div class="table">
            <sdxu-table
                :data="table"
            >
                <el-table-column

                    :label="t('view.task.executeID')"
                />
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.tipCard.Type')"
                />
                <el-table-column
                    prop="ownerId"
                    :label="t('sdxCommon.Creator')"
                />
                <el-table-column

                    :label="t('view.task.tipCard.SubordinateGroup')"
                />
                <el-table-column
                    prop="executeType"
                    :label="t('view.task.executeType')"
                />
                <el-table-column
                    prop="cronStartTime"
                    :label="t('view.task.executeStartTime')"
                    sortable
                    min-width="130px"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.cronStartTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cronEndTime"
                    :label="t('view.task.executeStopTime')"
                    sortable
                    min-width="130px"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ dateFormatter(scope.row.cronEndTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    min-width="100px"
                    prop="repeat_times"
                    :label="t('view.task.executeTime')"
                >
                    <template #default="{ row }">
                        {{ timeDuration(row.cronStartTime, row.cronEndTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    :label="t('sdxCommon.Status')"
                />
                <el-table-column
                    prop="state"
                    :label="t('sdxCommon.Status')"
                />
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    min-width="130px"
                >
                    <template #default="{ row }">
                        <SdxuIconButtonGroup>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                            >
                                {{ t('view.task.CancellationOfExecution') }}
                            </SdxuButton>
                            <SdxuButton
                                type="primary"
                                size="regular"
                                :plain="true"
                            >
                                {{ t('view.task.tipCard.Detail') }}
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
import { taskType, executeType } from '../tool/config';
import { getGroups } from '@sdx/utils/src/api/user';
export default {
    name: 'SdxvExecuteList',
    data() {
        return {
            taskType,
            executeType,
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
            table: [],
            current: 1,
            pageSize: 10,
            total: 0,
            groups: [],
            params: {
                name: '',
                ownerId: '',
                groupId: '',
                type: '',
                executionType: '',
                state: '',
                cronStartTime: '',
                cronEndTime: '',
                order: 'desc',
                orderBy: 'cronStartTime',
                start: 1,
                count: 10,
            }
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
        getGroupList(){
            const params = {
                start: 1,
                count: -1,
                order: 'desc',
                orderBy: 'createdAt',
            };
            getGroups(params).then(res => {
                res.groups.forEach(item => {
                    this.groups.push({
                        value: item.uuid,
                        label: item.name
                    });
                });
            });
        },
    },
    created() {
        this.getGroupList();
        this.table = [
            {
                '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
                'createdAt': '2019-10-17T08:49:14.195000Z',
                'updatedAt': '2019-10-17T08:49:14.194000Z',
                'ownerId': '99b3d464-0992-4c2f-b127-370895cab26d',
                'name': 'dylan-jupyter',
                'description': null,
                'imageId': 'bd774322-98d3-4912-8af5-70cf01a66e9f',
                'autoImageId': null,
                'type': 'JUPYTER',
                'quota': {
                    'cpu': 2,
                    'gpu': 1,
                    'memory': 4294967296,
                    'gpu_model': ''
                },
                'resourceConfig': {
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
                'executeType': 'MANUAL',
                'delay': 0,
                'trigger': null,
                'priority': 2,
                'crontab': null,
                'cronStartTime': '2019-10-17T08:49:14.194000Z',
                'cronEndTime': '2019-10-17T08:59:12.194000Z',
                'repeatTimes': null,
                'concurrentType': 'SKIP',
                'errorHandling': 'CANCEL',
                'notifications': {},
                'taskId': '1e82f0b3-c7fe-4008-ae6d-48798dd84034',
                'state': 'CREATED',
                'datasources': [],
                'datasets': [],
                'homePath': '/usr/dylan'
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
                width: calc(100% - 60px);
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
