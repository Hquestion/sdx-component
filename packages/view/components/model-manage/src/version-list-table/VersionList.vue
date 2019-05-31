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
                prop="description"
                key="description"
                label="版本描述"
            />
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
                prop="createdAt"
                key="createdAt"
                label="创建时间"
                sortable="custom"
            />
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
import CreateVersion from './CreateVersion';
export default {
    name: 'VersionListTable',
    data() {
        return {
            versionList: [],
            total: 1,
            current: 1,
            pageSize: 10,
            order: '',
            orderBy: '',
            loading: false,
            createDialogVisible: false,
            isModelOwner: false,
            editingVersion: null
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
        CreateVersion
    },
    computed: {
        userId() {
            return '1';   // TODO: 获取用户ID
        }
    },
    created() {
        getModelInfo(this.$route.params.modelId).then(res => {
            this.isModelOwner = res.creatorId === this.userId;
            this.initVersionList();
        });
    },
    methods: {
        dialogClose(needRefresh) {
            this.editingVersion = null;
            if (needRefresh) this.initVersionList();
        },
        createVersion() {
            this.createDialogVisible = true;
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initVersionList();
        },
        sortChange(sort) {
            if (sort && sort.prop && sort.order) {
                this.order = sort.prop;
                this.orderBy = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initVersionList();
            }
        },
        initVersionList() {
            this.loading = true;
            const params = {
                name: this.name,
                start: this.current,
                count: this.pageSize,
                order: this.order,
                orderBy: this.orderBy
            };
            getVersionList(params).then((res) => {
                console.log('res', res);
                this.versionList = res.items;
                this.versionList.forEach(item => {
                    item.showPublish = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showShutdown = this.isModelOwner && (item.state === 'RUNNING' || item.state === 'LAUNCHING');
                    item.showEdit = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showRemove = this.isModelOwner && (item.state === 'CREATED' || item.state === 'FAILED' || item.state === 'KILLED');
                    item.showTest = this.isModelOwner && (item.state === 'RUNNING');
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
                    this.dialogVisible = true;
                    this.editingVersion = row;
                    Object.assign(this.shareForm, row);
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
                    break;
                default:
                    break;
                }
            }
        }
    }
};
</script>
