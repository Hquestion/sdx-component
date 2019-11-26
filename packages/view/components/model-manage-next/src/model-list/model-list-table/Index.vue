<template>
    <div
        class="sdxw-model-list-table"
        v-loading="loading"
    >
        <div v-if="modelList.length">
            <div>
                <sdxw-subject-card-list
                    class="sdxw-model-list-table__container"
                >
                    <sdxw-subject-card
                        v-for="(item, index) in modelList"
                        :key="index"
                        :card-icon="false"
                        :meta="item.meta"
                        class="sdxw-model-list-table__container--element"
                        @operate="handleDetail"
                    >
                        <template #cardLabel>
                            <!-- <SdxwFoldLabelGroup :list="item.labels" /> -->
                            <div class="sdxw-model-list-table__container--type">
                                <div style="margin-right: 24px;">
                                    <el-tag>
                                        <svg
                                            class="icon"
                                            aria-hidden="true"
                                            style="margin-right: 2px;"
                                        >
                                            <use :xlink:href="`#${item.modelTypeIcon}`" />
                                        </svg>
                                        {{ item.modelType }}
                                    </el-tag>
                                </div>
                                <div>
                                    <el-tag
                                        v-for="(label, i) in item.labels"
                                        :key="i"
                                    >
                                        {{ label }}
                                    </el-tag>
                                </div>
                            </div>
                        </template>
                        <template #footerRight>
                            <sdxu-button
                                icon="sdx-icon sdx-fenxiang"
                                @click="handleOperation(item, 'share')"
                                type="text"
                                v-if="item.showShare"
                                v-auth.model.button="'MODEL:SHARE'"
                            >
                                共享
                            </sdxu-button>
                            <sdxu-button
                                icon="sdx-icon sdx-icon-edit"
                                @click="handleOperation(item, 'edit')"
                                type="text"
                                v-if="item.showEdit"
                            >
                                {{ t('sdxCommon.Edit') }}
                            </sdxu-button>
                            <sdxu-button
                                icon="sdx-icon sdx-icon-delete"
                                @click="handleOperation(item, 'remove')"
                                type="text"
                                v-if="item.showRemove"
                            >
                                {{ t('sdxCommon.Delete') }}
                            </sdxu-button>
                        </template>
                    </sdxw-subject-card>
                </sdxw-subject-card-list>
            </div>
        </div>
        <SdxuEmpty v-else />
        <div
            class="sdxw-model-list-table__footer"
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
        <sdxw-share-setting
            :visible.sync="dialogVisible"
            v-if="dialogVisible"
            :default-users="shareForm.users"
            :default-groups="shareForm.groups"
            :default-share-type="shareForm.shareType"
            @confirm-edit="confirmEdit"
            source-kind="model"
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
import Button from '@sdx/ui/components/button';
import Dialog from '@sdx/ui/components/dialog';
import Pagination from '@sdx/ui/components/pagination';
import Empty from '@sdx/ui/components/empty';
import { getModelList, removeModel, updateModel, removeGroupModels, updateGroupModels } from '@sdx/utils/src/api/model';
import SubCard from '@sdx/widget/components/subject-card';
import { removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
import CreateModel from '../CreateModel';
import ShareSetting from '@sdx/widget/components/share-setting';
import FoldLabel from '@sdx/widget/components/fold-label';
import MessageBox from '@sdx/ui/components/message-box';
import auth from '@sdx/widget/components/auth';
import Message from 'element-ui/lib/message';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import ElTag from 'element-ui/lib/tag';
import { MODEL_TYPES_ICON, DEFAULT_MODEL_TYPE_ICON } from '@sdx/utils/src/const/model';

export default {
    name: 'ModelListTable',
    mixins: [locale],
    data() {
        return {
            current: 1,
            pageSize: 10,
            total: 0,
            refreshTimer: null,
            modelList: [],
            loading: false,
            taskList: [],
            dialogVisible: false,
            shareForm: {
                shareType: 'PRIVATE',
                users: [],
                groups: []
            },
            editingModel: null,
            createDialogVisible: false
        };
    },
    components: {
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        [Dialog.name]: Dialog,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        CreateModel,
        [Empty.name]: Empty,
        [SubCard.SubjectCard.name]: SubCard.SubjectCard,
        [SubCard.SubjectCardList.name]: SubCard.SubjectCardList,
        [ShareSetting.name]: ShareSetting,
        ElTag
    },
    directives: {
        auth
    },
    created() {
        this.initModelList();
    },
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        order: {
            type: String,
            default: ''
        },
        orderBy: {
            type: String,
            default: ''
        },
        shareType: {
            type: String,
            default: 'ALL'
        },
        modelType: {
            type: String,
            default: ''
        },
        searchLabels: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleDetail(operate) {
            this.$router.push({
                path: '/sdxv-model-manage-next/modelDetail',
                params: {
                    uuid: operate.id
                }
            });
        },
        initModelList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            const params = {
                name: this.name,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
                shareType: this.shareType,
                searchLabels: this.searchLabels,
                modelType: this.modelType
            };
            removeBlankAttr(params);
            getModelList(params).then((res) => {
                this.modelList = res.items;
                this.modelList.forEach(item => {
                    const userId = getUser().userId;
                    item.showShare = item.showEdit = item.showRemove = item.creator.uuid === userId;

                    let icon = MODEL_TYPES_ICON.find(icon => icon.name === item.modelType);
                    item.modelTypeIcon = icon ? icon.icon : DEFAULT_MODEL_TYPE_ICON;
                    item.meta = {
                        uuid: item.uuid,
                        owner: item.creator,
                        title: item.name,
                        description: item.description,
                        creator: item.creator.fullName,
                        createdAt: item.createdAt,
                        state: {}
                    };
                });
                this.total = res.total;
            }).finally(() => {
                this.loading = false;
            });
        },
        dialogClose(needRefresh) {
            if (needRefresh) this.initModelList();
            this.editingModel = null;
        },
        share() {
            if (!this.selectedModels.length) {
                Message({
                    message: this.t('view.model.modelsToShare'),
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
                    message: this.t('view.model.modelsToRemove'),
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: this.t('view.model.modelRemoveConfirm'),
                content: this.t('sdxCommon.ConfirmRemove')
            }).then(() => {
                const uuids = [];
                this.selectedModels.forEach(item => uuids.push(item.uuid));
                removeGroupModels({ uuids }).then(() => {
                    Message({
                        message: this.t('sdxCommon.RemoveSuccess'),
                        type: 'success'
                    });
                    this.initModelList();
                });
            }).catch(() => {});
        },
        cancelShare() {
            if (!this.selectedModels.length) {
                Message({
                    message: this.t('view.model.modelsToCancelShare'),
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: this.t('view.model.modelCancelShareConfirm'),
            }).then(() => {
                const uuids = [];
                this.selectedModels.forEach(item => uuids.push(item.uuid));
                const params = {
                    uuids,
                    setting: {
                        shareType: 'PRIVATE',
                        users: [],
                        groups: [],
                        isPublic: false
                    }
                };
                updateGroupModels(params).then(() => {
                    Message({
                        message: this.t('sdxCommon.OperationSuccess'),
                        type: 'success'
                    });
                    this.initModelList();
                });
            }).catch(() => {});
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
                this.shareForm.isPublic = false;
            } else {
                this.shareForm.isPublic = true;
            }
            if (this.editingModel) {
                // 编辑模型
                updateModel(this.editingModel.uuid, this.shareForm).then(() => {
                    Message({
                        message: this.t('sdxCommon.OperationSuccess'),
                        type: 'success'
                    });
                    this.editingModel = null;
                    this.dialogVisible = false;
                    this.initModelList();
                });
            } else {
                const uuids = [];
                this.selectedModels.forEach(item => uuids.push(item.uuid));
                const params = {
                    uuids,
                    setting: this.shareForm
                };
                updateGroupModels(params).then(() => {
                    Message({
                        message: this.t('sdxCommon.SettingSuccess'),
                        type: 'success'
                    });
                    this.initModelList();
                    this.dialogVisible = false;
                });
            }
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initModelList();
        },
        sortChange(sort) {
            this.orderBy = 'createdAt';
            if (sort && sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
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
                        this.editingModel = row;
                        Object.assign(this.shareForm, {
                            shareType: row.isPublic ? 'PUBLIC' : 'PRIVATE',
                            users: row.users,
                            groups: row.groups
                        });
                        this.dialogVisible = true;
                        break;
                    case 'edit':
                        this.createDialogVisible = true;
                        this.editingModel = row;
                        break;
                    case 'remove':
                        MessageBox({
                            title: this.t('view.model.modelRemoveConfirm'),
                            content: this.t('sdxCommon.ConfirmRemove')
                        }).then(() => {
                            removeModel(row.uuid).then(() => {
                                Message({
                                    message: this.t('sdxCommon.RemoveSuccess'),
                                    type: 'success'
                                });
                                this.initModelList();
                            });
                        }).catch(() => {});
                        break;
                    case 'cancelShare':
                        MessageBox({
                            title: this.t('view.model.modelCancelShareConfirm')
                        }).then(() => {
                            this.editingModel = row;
                            this.confirmEdit([], [], 'PRIVATE');
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
