<template>
    <div class="sdxv-task-execute-list">
        <div class="sdxv-task-execute-list__filter">
            <SdxwSearchLayout
                @search="handleSearch"
                @reset="handleReset"
                :label-width="lang$ ==='en' ? '120px' : '80px'"
            >
                <SdxwSearchItem :label="t('view.task.taskName') + ':'">
                    <SdxuInput
                        v-model="taskName"
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('sdxCommon.Creator') + ':'">
                    <SdxuInput
                        v-model="creator"
                        :placeholder="t('view.task.PleaseInput')"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskType') + ':'">
                    <el-select
                        v-model="selectedType"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in taskTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeType') + ':'">
                    <el-select
                        v-model="selectedExecuteType"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in executeTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.taskState') + ':'">
                    <el-select
                        v-model="selectedState"
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in taskStateList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeTimeRange') + ':'">
                    <el-date-picker
                        v-model="selectedDate"
                        type="daterange"
                        size="large"
                        :start-placeholder="t('view.task.startTime')"
                        :end-placeholder="t('view.task.stopTime')"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-task-execute-list__table">
            <SdxuTable
                :data="taskResourceList"
                @sort-change="handleSortChange"
                :default-sort="defaultSort"
                v-loading="loading"
                :empty-text="t('sdxCommon.NoData')"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                    min-width="112px"
                />
                <el-table-column
                    prop="execution_id"
                    :label="t('view.task.executeID')"
                    min-width="56px"
                />
                <el-table-column
                    prop="type"
                    :label="t('view.task.taskType')"
                    min-width="72px"
                >
                    <template #default="{ row }">
                        {{ t(TASK_TYPE_LABEL[row.type]) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                    min-width="64px"
                />
                <el-table-column
                    prop="execute_type"
                    :label="t('view.task.executeType')"
                    min-width="70px"
                />
                <el-table-column
                    prop="started_at"
                    :label="t('view.task.executeStartTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.started_at) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stoped_at"
                    :label="t('view.task.executeStopTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.stoped_at) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.task.executeTime')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="88px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ dealTime(row.started_at, row.stoped_at) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.task.taskState')"
                    :min-width="lang$ === 'en' ? '100px' : '72px'"
                >
                    <template #default="{ row }">
                        <SdxwFoldLabel
                            :plain="true"
                            :type="STATE_MAP_FOLD_LABEL_TYPE[row.state]"
                            :status="stateIcon(row.state)"
                        >
                            {{ t(STATE_TYPE_LABEL[row.state]) }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    fixed="right"
                    min-width="140px"
                >
                    <template #default="{ row }">
                        <SdxuIconButtonGroup>
                            <SdxuButton
                                v-for="(item, i) in getOperationList(row)"
                                type="link"
                                :key="i"
                                @click="handleOperation(item.value, row)"
                            >
                                {{ t(item.label) }}
                            </SdxuButton>
                        </SdxuIconButtonGroup>
                    </template>
                </el-table-column>
            </SdxuTable>
            <SdxuPagination
                class="sdxv-task-execute-list__table--pagination"
                :current-page.sync="page"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script>
import TaskManagementMixin from './TaskManagementMixin';
import locale from '@sdx/utils/src/mixins/locale';

const data = [
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'CREATED',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'LAUNCHING',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'RUNNING',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'FINISHED',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'KILLED',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'FAILED',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        'execution_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'created_at': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'KILLING',
        'error_handling': 'CANCEL',
        'execute_type': 'MANUAL',
        'home_path': '/test/jupyter',
        'image_id': '96418d42-8e24-4cc1-9462-f7028abab846',
        'name': 'jupyter-task-test',
        'owner_id': '99b3d464-0992-4c2f-b127-370895cab26d',
        'priority': 2,
        'quota': {
            'cpu': 2,
            'gpu': 0,
            'gpu_model': '',
            'memory': 4294967296
        },
        'resource_config': {
            'DEPLOY': {
                'instance': 1,
                'labels': {
                    'gpu.model': ''
                },
                'requests': {
                    'cpu': 2,
                    'memory': 4294967296,
                    'nvidia.com/gpu': 0
                }
            }
        },
        'type': 'JUPYTER',
        'updated_at': '2019-10-18T07:50:17.748000Z',
        'started_at': '2019-10-18T07:50:17.748000Z',
        'stoped_at': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
];     

export default {
    mixins: [TaskManagementMixin, locale],
    data() {
        return {
            loading: false,
            defaultSort: {
                prop: 'started_at',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            taskTypeList: [],
            taskStateList: [],
            executeTypeList: [],
            selectedType: '',
            selectedState: '',
            selectedExecuteType: '',
            selectedDate: '',
            taskResourceList: data,
            // taskResourceList: [],
            params: {
                name: '',
                order: 'desc',
                orderBy: 'started_at',
            }
        };
    },
    methods: {
        fetchData() {

        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'started_at';
            this.page = 1;
        },
        handleSearch() {

        },
        handleReset() {

        }
    }
};
</script>

<style>

</style>
