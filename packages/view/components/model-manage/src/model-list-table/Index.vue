<template>
    <div
        class="sdxv-model-list"
        v-loading="loading"
    >
        <div>
            <SdxuButton
                type="primary"
                size="small"
                @click="share"
                v-if="modelType === 'PRIVATE'"
            >
                全部共享
            </SdxuButton>
            <SdxuButton
                type="primary"
                invert
                size="small"
                @click="remove"
                v-if="modelType === 'PRIVATE'"
            >
                删除
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="cancelShare"
                v-if="modelType === 'MY_SHARE'"
            >
                取消共享
            </SdxuButton>
        </div>
        <sdxu-table
            :data="modelList"
            class="sdxv-model-list__table"
            @selection-change="selectionChange"
            @sort-change="sortChange"
        >
            <el-table-column
                type="selection"
                width="55"
                v-if="modelType === 'MY_SHARE' || modelType === 'PRIVATE'"
            />
            <el-table-column
                prop="name"
                label="模型名称"
                key="name"
            />
            <el-table-column
                prop="description"
                key="description"
                label="模型描述"
            />
            <el-table-column
                key="labels"
                label="模型标签"
            >
                <template slot-scope="scope">
                    <SdxwFoldLabelGroup :list="scope.row.labels" />
                </template>
            </el-table-column>
            <el-table-column
                prop="owner"
                key="owner"
                label="创建人"
                v-if="modelType === 'ALL' || modelType === 'OTHER_SHARE'"
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
                            @click="handleOperation(scope.row, 'share')"
                            icon="sdx-icon sdx-fenxiang"
                            title="共享设置"
                            v-if="scope.row.showShare"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'detail')"
                            icon="sdx-icon sdx-icon-tickets"
                            title="查看详情"
                            v-if="scope.row.showDetail"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            title="删除"
                            v-if="scope.row.showRemove"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'edit')"
                            icon="sdx-icon sdx-icon-edit"
                            title="编辑"
                            v-if="scope.row.showEdit"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'cancelShare')"
                            icon="sdx-icon sdx-quxiaofenxiang"
                            title="取消共享"
                            v-if="scope.row.showCancelShare"
                        />
                    </sdxu-icon-button-group>
                </template>
            </el-table-column>
        </sdxu-table>
        <div class="sdxv-model-list__footer">
            <div />
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <sdxw-share-setting
            :visible.sync="dialogVisible"
            v-if="dialogVisible"
            :default-users="shareForm.users"
            :default-groups="shareForm.groups"
            :default-share-type="shareForm.shareType"
            @confirm-edit="confirmEdit"
        />
        <create-model
            :visible.sync="createDialogVisible"
            v-if="createDialogVisible"
            @close="dialogClose"
            :editing-model="editingModel"
        />
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import Dialog from '@sdx/ui/components/dialog';
import Button from '@sdx/ui/components/button';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';
import FoldLabel from '@sdx/widget/components/fold-label';
import { getModelList, removeModel, updateModel } from '@sdx/utils/src/api/model';
import Pagination from '@sdx/ui/components/pagination';
import ShareSetting from '@sdx/widget/components/share-setting';
import MessageBox from '@sdx/ui/components/message-box';
import CreateModel from '../CreateModel';
import Message from 'element-ui/lib/message';
export default {
    name: 'ModelListTable',
    data() {
        return {
            modelList: [],
            total: 1,
            current: 1,
            pageSize: 10,
            order: '',
            orderBy: '',
            loading: false,
            dialogVisible: false,
            shareForm: {
                shareType: 'PRIVATE',
                users: [],
                groups: []
            },
            editingModel: null,
            selectedModels: [],
            createDialogVisible: false
        };
    },
    props: {
        modelType: {
            type: String,
            default: 'ALL'
        },
        name: {
            type: String,
            default: ''
        }
    },
    components: {
        [Table.name]: Table,
        [Pagination.name]: Pagination,
        SdxuIconButton,
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        SdxuIconButtonGroup,
        CreateModel,
        [ShareSetting.name]: ShareSetting
    },
    computed: {
        userId() {
            return '123'; // TODO: 拿到用户id
        }
    },
    methods: {
        dialogClose(needRefresh) {
            if (needRefresh) this.initModelList();
        },
        share() {
            if (!this.selectedModels.length) {
                Message({
                    message: '请先选择需要共享的模型',
                    type: 'warning'
                });
                return;
            }
            this.dialogVisible = true;
            this.shareForm = {
                shareType: 'PRIVATE',
                users: [],
                groups: []
            };
        },
        remove() {
            if (!this.selectedModels.length) {
                Message({
                    message: '请先选择需要删除的模型',
                    type: 'warning'
                });
                return;
            }
            Message({    // TODO: 换成批量删除接口
                message: '删除成功',
                type: 'success'
            });
            this.initModelList();
        },
        cancelShare() {
            if (!this.selectedModels.length) {
                Message({
                    message: '请先选择需要取消共享的模型',
                    type: 'warning'
                });
                return;
            }
            Message({    // TODO: 换成批量取消共享接口
                message: '取消共享成功',
                type: 'success'
            });
            this.initModelList();
        },
        selectionChange(selection) {
            this.selectedModels = selection;
        },
        confirmEdit(users, groups, shareType) {
            this.shareForm.shareType = shareType;
            this.shareForm.users = [];
            this.shareForm.groups = [];
            if (this.shareForm.shareType !== 'PUBLIC') {
                this.shareForm.users = users;
                this.shareForm.groups = groups;
            }
            if (this.editingModel) {
                // 编辑模型
                updateModel(this.editingModel.uuid, this.shareForm).then(() => {
                    Message({
                        message: '设置成功',
                        type: 'success'
                    });
                    this.editingModel = null;
                    this.dialogVisible = false;
                    this.initModelList();
                });
            } else {
                // 批量共享设置  TODO 换成批量接口
                // updateGroupModels(this.selectedModels, this.shareForm).then(() => {
                Message({
                    message: '全部共享成功',
                    type: 'success'
                });
                this.initModelList();
                this.dialogVisible = false;
                // });
            }
        },
        initModelList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            const params = {
                name: this.name,
                start: this.current,
                count: this.pageSize,
                order: this.order,
                orderBy: this.orderBy,
                shareType: this.modelType
            };
            getModelList(params).then((res) => {
                console.log('res', res);
                this.modelList = res.items;
                this.modelList.forEach(item => {
                    item.showShare = (this.modelType === 'ALL' && item.creatorId === this.userId) || this.modelType === 'PRIVATE';
                    item.showEdit = (this.modelType === 'ALL' && item.creatorId === this.userId) || this.modelType === 'PRIVATE';
                    item.showRemove = (this.modelType === 'ALL' && item.creatorId === this.userId) || this.modelType === 'PRIVATE';
                    item.showCancelShare = this.modelType === 'MY_SHARE';
                    item.showDetail = this.modelType !== 'MY_SHARE';
                });
                this.total = res.total;
                this.loading = false;
            });
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initModelList();
        },
        sortChange(sort) {
            if (sort && sort.prop && sort.order) {
                this.order = sort.prop;
                this.orderBy = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initModelList();
            }
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'detail':
                    this.$router.push({
                        name: 'versionList',
                        params: {
                            modelId: row.uuid
                        }
                    });
                    break;
                case 'share':
                    this.dialogVisible = true;
                    this.editingModel = row;
                    Object.assign(this.shareForm, row);
                    break;
                case 'edit':
                    this.createDialogVisible = true;
                    this.editingModel = row;
                    break;
                case 'remove':
                    MessageBox({
                        title: '确定要删除选中的模型吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeModel(row.uuid).then(() => {
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initModelList();
                        });
                    }).catch(() => {});
                    break;
                default:
                    break;
                }
            }
        }
    }
};
</script>
