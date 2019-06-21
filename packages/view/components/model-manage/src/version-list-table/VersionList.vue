<template>
    <sdxu-content-panel
        class="sdxv-version-list"
        title="模型版本列表"
        v-loading="loading"
    >
        <div slot="right">
            <SdxuButton
                type="primary"
                icon="sdx-icon-plus"
                size="small"
                @click="createVersion"
                v-auth.model.button="'MODEL_VERSION:CREATE'"
            >
                新增模型版本
            </SdxuButton>
        </div>
        <sdxu-table
            :data="versionList"
            class="sdxv-version-list__table"
            @sort-change="sortChange"
        >
            <el-table-column
                prop="name"
                label="版本名称"
                key="name"
            />
            <el-table-column
                key="description"
                label="版本描述"
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
                label="版本类型"
            />
            <el-table-column
                key="state"
                label="状态"
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
                label="创建时间"
                sortable="custom"
            >
                <template slot-scope="scope">
                    {{ scope.row.createdAt | dateFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                key="operation"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button-group>
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'detail')"
                            icon="sdx-icon sdx-icon-tickets"
                            title="查看详情"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'edit')"
                            icon="sdx-icon sdx-icon-edit"
                            title="编辑"
                            v-if="scope.row.showEdit"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            title="删除"
                            v-if="scope.row.showRemove"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'shutdown')"
                            icon="sdx-icon sdx-xiaxian"
                            title="下线"
                            v-if="scope.row.showShutdown"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'test')"
                            icon="sdx-icon sdx-ceshi"
                            title="测试"
                            v-if="scope.row.showTest"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'publish')"
                            icon="sdx-icon sdx-quxiaofenxiang"
                            title="发布"
                            v-if="scope.row.showPublish"
                        />
                    </sdxu-icon-button-group>
                </template>
            </el-table-column>
        </sdxu-table>
        <div class="sdxv-version-list__footer">
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
import { getVersionList, removeVersion, shutdownVersion, getModelInfo } from '@sdx/utils/src/api/model';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import Message from 'element-ui/lib/message';
import { removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
import CreateVersion from './CreateVersion';
import TestVersion from './TestVersion';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import auth from '@sdx/widget/components/auth';
import TimerFilter from '@sdx/utils/src/mixins/transformFilter';
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
    mixins: [TimerFilter],
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
        initVersionList() {
            this.loading = true;
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
                    item.showTest = this.isModelOwner && item.state === 'RUNNING' && item.framework === 'TENSORFLOW';
                    item.label = {};
                    switch(item.state) {
                    case 'CREATED':
                        item.label.text = '新建';
                        item.label.type = 'create';
                        item.label.status = '';
                        break;
                    case 'RUNNING':
                        item.label.text = '运行中';
                        item.label.type = 'running';
                        item.label.status = 'loading';
                        break;
                    case 'LAUNCHING':
                        item.label.text = '启动中';
                        item.label.type = 'processing';
                        item.label.status = 'loading';
                        break;
                    case 'FAILED':
                        item.label.text = '失败';
                        item.label.type = 'error';
                        item.label.status = 'warning';
                        break;
                    case 'KILLING':
                        item.label.text = '终止中';
                        item.label.type = 'dying';
                        item.label.status = 'loading';
                        break;
                    case 'KILLED':
                        item.label.text = '已终止';
                        item.label.type = 'die';
                        item.label.status = '';
                        break;
                    default:
                        break;
                    }
                });
                this.total = res.total;
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
                case 'remove':
                    MessageBox({
                        title: '确定要删除该模型版本吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeVersion(this.$route.params.modelId, row.uuid).then(() => {
                            Message({
                                message: '删除成功',
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
                        title: '确定要下线该模型版本吗？',
                        status: 'warning'
                    }).then(() => {
                        shutdownVersion(this.$route.params.modelId, row.uuid).then(() => {
                            Message({
                                message: '操作成功',
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
