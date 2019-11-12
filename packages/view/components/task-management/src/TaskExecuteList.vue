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
                            :label="item.label"
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
                            :label="item.label"
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
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem :label="t('view.task.executeTimeRange') + ':'">
                    <el-date-picker
                        v-model="selectedDate"
                        type="daterange"
                        size="large"
                        value-format="yyyy-MM-dd"
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
                :row-key="row => row.taskId || row._id"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.task.taskName')"
                    min-width="112px"
                />
                <el-table-column
                    prop="_id"
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
                    prop="executeType"
                    :label="t('view.task.executeType')"
                    min-width="70px"
                />
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.startedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.startedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stopedAt"
                    :label="t('view.task.stopedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="132px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.stopedAt) }}
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
                            {{ dealTime(row.startedAt, row.stopedAt) }}
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
import { executionList } from '@sdx/utils/src/api/task';
import locale from '@sdx/utils/src/mixins/locale';
import { TASK_TYPE, EXECUTE_TYPE, STATE_TYPE, TASK_POLLING_STATE_TYPE } from '@sdx/utils/src/const/task';

import TaskManagementMixin from './TaskManagementMixin';

// todo: 操作

const data = [
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'CREATED',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'LAUNCHING',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'RUNNING',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'FINISHED',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'KILLED',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'FAILED',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
    {
        'task_id': '69c80e50-e27a-44fc-9b18-ae22eb798e6b',
        '_id': '538199c3-3473-42b7-bcec-bac629b21e3e',
        'concurrent_type': 'SKIP',
        'createdAt': '2019-10-18T07:50:17.748000Z',
        'delay': 0, 'state': 'KILLING',
        'error_handling': 'CANCEL',
        'executeType': 'MANUAL',
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T08:50:17.748000Z',
        'owner': {
            fullName: 'zhangsan'
        }
    },
];     

const POLLING_PERIOD = 3 * 1000;

export default {
    mixins: [TaskManagementMixin, locale],
    data() {
        return {
            loading: false,
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            taskTypeList: TASK_TYPE,
            taskStateList: STATE_TYPE,
            executeTypeList: EXECUTE_TYPE,
            selectedType: '',
            selectedState: '',
            selectedExecuteType: '',
            selectedDate: '',
            // taskResourceList: data,
            taskResourceList: [],
            params: {
                name: '',
                order: 'desc',
                orderBy: 'startedAt',
                ownerId: '',
                type: '',
                executionType: '',
                state: '',
                cronStartTime: '',
                cronEndTime: '',
                start: 1, 
                count: 10
            },
            pollingId: 0
        };
    },
    computed: {
        queryParams() {
            let params = {
                ownerId: this.currentUser.userId
            };
            if (Array.isArray(this.selectedDate)) {
                params.cronStartTime = this.selectedDate[0];
                params.cronEndTime = this.selectedDate[1];
            }
            return Object.assign({}, this.params, params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        },
        needPolling() {
            return this.taskResourceList.some(item =>  {
                return TASK_POLLING_STATE_TYPE.includes(item.state);
            });
        }
    },
    methods: {
        fetchData(showLoading = true) {
            this.loading = showLoading;
            executionList(this.queryParams)
                .then(data => {
                    this.taskResourceList = data.data;
                    this.total = data.total;
                    this.loading = false;
                    if (this.taskResourceList.some(item =>  {
                        return TASK_POLLING_STATE_TYPE.includes(item.state);
                    })) {
                        this.startPolling();
                    }
                })
                .catch(err => {
                    window.console.error(err);
                    this.taskResourceList = [];
                    this.loading = false;
                });
        },
        handleSortChange({prop, order}) {
            this.params.order = order === 'ascending' ? 'asc' : 'desc';
            this.params.orderBy = prop || 'startedAt';
            this.page = 1;
        },
        handleSearch() {
            this.params.type = this.selectedType;
            this.params.executionType = this.selectedExecuteType;
            this.params.state = this.selectedState;
            this.params.name = this.taskName;
            // todo: creator
            this.params.creator = this.creator;
            this.page = 1;
        },
        handleReset() {
            this.params.name = '';
            this.params.type = '';
            this.params.executionType = '';
            this.params.state = '';
            this.params.creator = '';
            this.selectedDate = '';
            this.page = 1;
        },
        startPolling() {
            if (!this._isDestroyed) {
                this.pollingId && clearTimeout(this.pollingId);
                this.pollingId = setTimeout(() => {
                    this.fetchData(false);
                }, POLLING_PERIOD);
            }
        },
        stopPolling() {
            this.pollingId && clearTimeout(this.pollingId);
            this.pollingId = null;
        }
    },
    created() {
        this.fetchData();
    },
    beforeDestroy() {
        this.stopPolling();
    },
    watch: {
        queryParams() {
            this.fetchData();
        }
    }
};
</script>

<style>

</style>
