<template>
    <div class="sdxv-timing-task-list">
        <div class="sdxv-timing-task-list__filter">
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
                <SdxwSearchItem :label="t('view.task.isOpen') + ':'">
                    <el-select
                        v-model="selectedStartupType"
                        size="medium"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                    >
                        <el-option
                            v-for="item in startupTypeList"
                            :key="item.value"
                            :label="t(item.label)"
                            :value="item.value"
                        />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="sdxv-timing-task-list__table">
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
                    prop="owner.fullName"
                    :label="t('sdxCommon.Creator')"
                    min-width="64px"
                />
                <el-table-column
                    prop="startedAt"
                    :label="t('view.task.startedAt')"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    min-width="120px"
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
                    min-width="120px"
                >
                    <template #default="{ row }">
                        <span>
                            {{ formatDate(row.stopedAt) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="crontab"
                    :label="t('view.task.timingSetting')"
                    min-width="72px"
                />
                <el-table-column
                    prop=""
                    :label="t('view.task.isOpen')"
                    min-width="72px"
                />
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                    fixed="right"
                    min-width="140px"
                >
                    <template #default="{ row }">
                        <SdxuIconButtonGroup>
                            <SdxuButton
                                v-for="(item, i) in getOperationList(row, monitor)"
                                :key="i"
                                :title="t(item.label)"
                                @click="handleOperation(item.value, row)"
                                type="link"
                            >
                                {{ t(item.label) }}
                            </SdxuButton>
                        </SdxuIconButtonGroup>
                    </template>
                </el-table-column>
            </SdxuTable>
            <SdxuPagination
                class="sdxv-timing-task-list__table--pagination"
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
import { TIMING_TASK_STARTUP_STATE } from '@sdx/utils/src/const/task';
import { executionList } from '@sdx/utils/src/api/task';

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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
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
        'startedAt': '2019-10-18T07:50:17.748000Z',
        'stopedAt': '2019-10-18T10:50:17.748000Z',
        'crontab': '* * * * *',
        'owner': {
            fullName: 'zhangsan'
        }
    },
];

// todo: 轮询
export default {
    mixins: [TaskManagementMixin, locale],
    data() {
        return {
            startupTypeList: TIMING_TASK_STARTUP_STATE,
            selectedStartupType: '',
            // taskResourceList: [],
            taskResourceList: data,
            defaultSort: {
                prop: 'startedAt',
                order: 'descending'
            },
            sortOrders: ['descending', 'ascending', null],
            loading: false,
            params: {
                name: '',
                order: 'desc',
                orderBy: 'startedAt',
                ownerId: '',
                start: 1,
                count: 10,
                isOpen: ''
            }
        };
    },
    computed: {
        queryParams() {
            let params = {
                ownerId: this.currentUser.userId
            };
            return Object.assign({}, this.params, params, {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize
            });
        },
    },
    methods: {
        fetchData() {
            this.loading = false;
            executionList(this.queryParams)
                .then(data => {
                    this.taskResourceList = data.data;
                    this.total = data.total;
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
            this.params.name = this.taskName;
            this.params.creator = this.creator;
            this.params.isOpen = this.selectedStartupType;
            this.page = 1;
        },
        handleReset() {
            this.params.name = '';
            this.params.creator = '';
            this.params.isOpen = '';
            this.page = 1;
        }
    },
    created() {
        this.fetchData();
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
