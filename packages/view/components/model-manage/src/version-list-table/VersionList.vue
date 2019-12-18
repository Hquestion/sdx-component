<template>
    <sdxu-content-panel
        class="sdxv-version-list"
        :title="t('view.model.versionList')"
        v-loading="loading"
        fullscreen
    >
        <div slot="right">
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="createVersion"
                v-if="isModelOwner"
                v-auth.model.button="'MODEL_VERSION:CREATE'"
            >
                {{ t('view.model.createVersion') }}
            </SdxuButton>
        </div>
        <sdxu-table
            :data="versionList"
            class="sdxv-version-list__table"
            @sort-change="sortChange"
            :default-sort="{prop: 'createdAt', order: 'descending'}"
        >
            <el-table-column
                prop="name"
                :label="t('view.model.versionColumns.name')"
                key="name"
            />
            <el-table-column
                key="description"
                :label="t('view.model.versionColumns.description')"
            >
                <template slot-scope="scope">
                    <div
                        :title="scope.row.description"
                        style="white-space: nowrap;
                               overflow: hidden;
                               text-overflow: ellipsis;"
                    >
                        {{ scope.row.description }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                key="framework"
                prop="framework"
                :label="t('view.model.versionColumns.framework')"
            />
            <el-table-column
                key="state"
                :label="t('view.model.versionColumns.state')"
            >
                <template slot-scope="scope">
                    <SdxwFoldLabel
                        plain
                        :type="scope.row.label.type"
                        :status="scope.row.label.status"
                    >
                        {{ scope.row.label.text }}
                    </SdxwFoldLabel>
                </template>
            </el-table-column>
            <el-table-column
                key="restApi"
                prop="restApi"
                label="REST API"
            />
            <el-table-column
                key="createdAt"
                prop="createdAt"
                :label="t('view.model.versionColumns.createdTime')"
                sortable="custom"
            >
                <template slot-scope="scope">
                    {{ scope.row.createdAt | dateFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Operation')"
                key="operation"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button-group>
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'publish')"
                            icon="sdx-icon sdx-fabu"
                            :title="t('view.model.publish')"
                            v-if="scope.row.showPublish"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'shutdown')"
                            icon="sdx-icon sdx-xiaxian"
                            :title="t('view.model.offline')"
                            v-if="scope.row.showShutdown"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'test')"
                            icon="sdx-icon sdx-ceshi"
                            :title="t('view.model.test')"
                            v-if="scope.row.showTest"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'download')"
                            icon="sdx-icon sdx-icon--download"
                            :title="t('view.file.Download')"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'detail')"
                            icon="sdx-icon sdx-icon-tickets"
                            :title="t('sdxCommon.Detail')"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'edit')"
                            icon="sdx-icon sdx-icon-edit"
                            :title="t('sdxCommon.Edit')"
                            v-if="scope.row.showEdit"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                            v-if="scope.row.showRemove"
                        />
                    </sdxu-icon-button-group>
                </template>
            </el-table-column>
        </sdxu-table>
        <div
            class="sdxv-version-list__footer"
            slot="footer"
        >
            <div />
            <sdxu-pagination
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <div>
            <create-version
                :visible.sync="createDialogVisible"
                v-if="createDialogVisible"
                @close="dialogClose"
                :editing-version="editingVersion"
                :is-publishing="isPublishing"
            />
        </div>
        <div>
            <test-version
                :visible.sync="testDialogVisible"
                v-if="testDialogVisible"
                :version="editingVersion"
                @close="dialogClose"
            />
        </div>
    </sdxu-content-panel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Table from '@sdx/ui/components/table';
import Dialog from '@sdx/ui/components/dialog';
import Button from '@sdx/ui/components/button';
import FoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import { getVersionList, removeVersion, shutdownVersion, getModelInfo, downloadVersion } from '@sdx/utils/src/api/model';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import { removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
import CreateVersion from './CreateVersion';
import TestVersion from './TestVersion';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import auth from '@sdx/widget/components/auth';
import TimerFilter from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'VersionListTable',
    data() {
        return {
            versionList: [],
            total: 0,
            current: 1,
            pageSize: 10,
            order: '',
            orderBy: '',
            refreshTimer: null,
            loading: false,
            createDialogVisible: false,
            testDialogVisible: false,
            isModelOwner: false,
            editingVersion: null,
            isPublishing: false
        };
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        SdxuIconButtonGroup,
        [Dialog.name]: Dialog,
        [Table.name]: Table,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuIconButton,
        CreateVersion,
        TestVersion
    },
    created() {
        getModelInfo(this.$route.params.modelId).then(res => {
            this.isModelOwner = res.creatorId === getUser().userId;
            this.initVersionList();
        });
    },
    directives: {
        auth
    },
    mixins: [TimerFilter, locale],
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
    methods: {
        dialogClose(needRefresh) {
            this.editingVersion = null;
            this.isPublishing = false;
            if (needRefresh) this.initVersionList();
        },
        createVersion() {
            this.createDialogVisible = true;
        },
        testVersion() {
            this.testDialogVisible = true;
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initVersionList();
        },
        sortChange(sort) {
            this.orderBy = 'createdAt';
            if (sort&& sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initVersionList();
            }
        },
        initVersionList(hideLoading) {
            if (this._isDestroyed) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            this.loading = hideLoading ? false : true;
            const params = {
                name: this.name,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy
            };
            removeBlankAttr(params);
            getVersionList(this.$route.params.modelId, params).then((res) => {
                this.versionList = res.items;
                this.versionList.forEach(item => {
                    item.showPublish = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showShutdown = this.isModelOwner && (item.state === 'RUNNING' || item.state === 'LAUNCHING');
                    item.showEdit = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showRemove = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showTest = item.state === 'RUNNING';
                    item.label = {};
                    switch(item.state) {
                    case 'CREATED':
                        item.label.text = this.t('view.model.states.created');
                        item.label.type = 'create';
                        item.label.status = '';
                        break;
                    case 'RUNNING':
                        item.label.text = this.t('view.model.states.running');
                        item.label.type = 'running';
                        item.label.status = 'loading';
                        break;
                    case 'LAUNCHING':
                        item.label.text = this.t('view.model.states.launching');
                        item.label.type = 'processing';
                        item.label.status = 'loading';
                        break;
                    case 'FAILED':
                        item.label.text = this.t('view.model.states.failed');
                        item.label.type = 'error';
                        item.label.status = 'warning';
                        break;
                    case 'KILLING':
                        item.label.text = this.t('view.model.states.killing');
                        item.label.type = 'dying';
                        item.label.status = 'loading';
                        break;
                    case 'KILLED':
                        item.label.text = this.t('view.model.states.killed');
                        item.label.type = 'die';
                        item.label.status = '';
                        break;
                    default:
                        break;
                    }
                });
                this.total = res.total;
                if (this.versionList.length && this.versionList.find(item => (item.state === 'LAUNCHING' || item.state === 'RUNNING' || item.state === 'KILLING'))) {
                    if (!this.refreshTimer) {
                        this.refreshTimer = setInterval(this.initVersionList, 3000, true);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                    this.refreshTimer = null;
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'detail':
                    this.$router.push({
                        name: 'versionDetail',
                        params: {
                            modelId: this.$route.params.modelId,
                            versionId: row.uuid
                        }
                    });
                    break;
                case 'edit':
                    this.createDialogVisible = true;
                    this.editingVersion = row;
                    break;
                case 'download':
                    downloadVersion(row.modelPath, row.creatorId);
                    break;
                case 'remove':
                    MessageBox({
                        title: this.t('view.model.versionRemoveConfirm'),
                        content: this.t('sdxCommon.ConfirmRemove')
                    }).then(() => {
                        removeVersion(this.$route.params.modelId, row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.initVersionList();
                        });
                    }).catch(() => {});
                    break;
                case 'test':
                    this.testDialogVisible = true;
                    this.editingVersion = row;
                    break;
                case 'shutdown':
                    MessageBox({
                        title: this.t('view.model.versionOfflineConfirm'),
                        status: 'warning'
                    }).then(() => {
                        shutdownVersion(this.$route.params.modelId, row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.OperationSuccess'),
                                type: 'success'
                            });
                            this.initVersionList();
                        });
                    }).catch(() => {});
                    break;
                case 'publish':
                    this.createDialogVisible = true;
                    this.editingVersion = row;
                    this.isPublishing = true;
                    break;
                default:
                    break;
                }
            }
        }
    }
};
</script>
