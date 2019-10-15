<template>
    <div
        class="sdxv-image-list"
        v-loading="loading"
    >
        <div class="sdxv-image-list__content">
            <div>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="share"
                    v-show="imageKind === 'private'"
                    v-auth.image.button="'IMAGE:SHARE'"
                >
                    {{ t('sdxCommon.ShareAll') }}
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    invert
                    size="small"
                    @click="remove"
                    v-if="imageKind === 'private'"
                >
                    {{ t('sdxCommon.Delete') }}
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="cancelShare"
                    v-show="imageKind === 'myShare'"
                    v-auth.image.button="'IMAGE:SHARE'"
                >
                    {{ t('sdxCommon.CancelShare') }}
                </SdxuButton>
            </div>
            <sdxu-table
                :data="imageList"
                class="sdxv-image-list__table"
                @selection-change="selectionChange"
                @sort-change="sortChange"
                :default-sort="{prop: 'createdAt', order: 'descending'}"
            >
                <el-table-column
                    type="selection"
                    width="55"
                    v-if="imageKind === 'myShare' || imageKind === 'private'"
                />
                <el-table-column
                    prop="name"
                    :label="t('view.image.Columns.imageName')"
                    key="name"
                />
                <el-table-column
                    prop="version"
                    key="version"
                    :label="t('view.image.Columns.version')"
                />
                <el-table-column
                    prop="imageType"
                    key="imageType"
                    :label="t('view.image.Columns.imageType')"
                />
                <el-table-column
                    prop="buildTypeText"
                    key="buildTypeText"
                    :label="t('view.image.Columns.buildType')"
                    v-if="imageKind !== 'basic'"
                />
                <el-table-column
                    key="owner"
                    :label="t('view.image.Columns.creator')"
                    v-if="imageKind === 'all' || imageKind === 'otherShare'"
                >
                    <template slot-scope="scope">
                        {{ (scope.row.owner && scope.row.owner.fullName) || '' }}
                    </template>
                </el-table-column>
                <el-table-column
                    key="createdAt"
                    :label="t('view.image.Columns.createdAt')"
                    sortable="custom"
                    prop="createdAt"
                >
                    <template slot-scope="scope">
                        {{ scope.row.createdAt | dateFormatter }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                >
                    <template slot-scope="scope">
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'edit')"
                            icon="sdx-icon sdx-fenxiang"
                            :title="t('widget.shareSetting.title')"
                            v-if="scope.row.showEdit"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'extend')"
                            icon="sdx-icon sdx-kaobei"
                            :title="t('view.image.BuildBaseThis')"
                            v-if="scope.row.showExtend"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'detail')"
                            icon="sdx-icon sdx-icon-tickets"
                            :title="t('sdxCommon.Detail')"
                            v-if="scope.row.showDetail"
                        />
                        <sdxu-icon-button
                            @click="handleOperation(scope.row, 'remove')"
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                            v-if="scope.row.showRemove"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <div class="sdxv-image-list__footer">
            <div />
            <sdxu-pagination
                v-if="!!total"
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
            source-kind="image"
        />
        <SdxvPackageDetailDialog
            :visible.sync="detailDialogVisible"
            :basic-image-name="imageName"
            :image-id="imageId"
        />
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import Dialog from '@sdx/ui/components/dialog';
import Button from '@sdx/ui/components/button';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { getImageList, removeImage, updateImage, updateGroupImages, removeGroupImages } from '@sdx/utils/src/api/image';
import { removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import ImageDetail from './PackageDetailDialog';
import Message from 'element-ui/lib/message';
import ShareSetting from '@sdx/widget/components/share-setting';
import Filters from '@sdx/utils/src/mixins/transformFilter';
import auth from '@sdx/widget/components/auth';
import { BUILD_TYPE_LABEL } from '@sdx/utils/src/const/image';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'ImageListTable',
    data() {
        return {
            imageList: [],
            total: 0,
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
            editingImage: null,
            selectedImages: [],
            detailDialogVisible: false,
            imageName: '',
            imageId: ''
        };
    },
    directives: {
        auth
    },
    props: {
        imageKind: {
            type: String,
            default: 'all'
        },
        name: {
            type: String,
            default: ''
        },
        imageType: {
            type: String,
            default: ''
        },
        shareType: {
            type: String,
            default: ''
        },
        buildType: {
            type: String,
            default: ''
        },
        taskType: {
            type: String,
            default: ''
        },
        isOwner: {
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
        [ImageDetail.name]: ImageDetail,
        [ShareSetting.name]: ShareSetting
    },
    mixins: [Filters, locale],
    methods: {
        share() {
            if (!this.selectedImages.length) {
                Message({
                    message: this.t('view.image.imagesToShare'),
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
            if (!this.selectedImages.length) {
                Message({
                    message: this.t('view.image.imagesToRemove'),
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: this.t('view.image.imageRemoveConfirm'),
                content: this.t('sdxCommon.ConfirmRemove')
            }).then(() => {
                const uuids = [];
                this.selectedImages.forEach(item => uuids.push(item.uuid));
                removeGroupImages({ uuids }).then(() => {
                    Message({
                        message: this.t('sdxCommon.RemoveSuccess'),
                        type: 'success'
                    });
                    this.initImageList();
                });
            }).catch(() => {});
        },
        cancelShare() {
            if (!this.selectedImages.length) {
                Message({
                    message: this.t('view.image.imagesToCancelShare'),
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: this.t('view.image.imageCancelShareConfirm'),
            }).then(() => {
                const uuids = [];
                this.selectedImages.forEach(item => uuids.push(item.uuid));
                const params = {
                    uuids,
                    setting: {
                        shareType: 'PRIVATE',
                        users: [],
                        groups: []
                    }
                };
                updateGroupImages(params).then(() => {
                    Message({
                        message: this.t('sdxCommon.OperationSuccess'),
                        type: 'success'
                    });
                    this.initImageList();
                });
            }).catch(() => {});
        },
        selectionChange(selection) {
            this.selectedImages = selection;
        },
        confirmEdit(users, groups, shareType) {
            this.shareForm.shareType = (shareType === 'PUBLIC' || users.length || groups.length) ? 'PUBLIC' : 'PRIVATE';
            this.shareForm.users = users;
            this.shareForm.groups = groups;
            if (this.editingImage) {
                // 编辑镜像
                updateImage(this.editingImage.uuid, this.shareForm).then(() => {
                    Message({
                        message: this.t('sdxCommon.SettingSuccess'),
                        type: 'success'
                    });
                    this.editingImage = null;
                    this.dialogVisible = false;
                    this.initImageList();
                });
            } else {
                // 批量共享设置  TODO 换成批量接口
                const uuids = [];
                this.selectedImages.forEach(item => uuids.push(item.uuid));
                const params = {
                    uuids,
                    setting: this.shareForm
                };
                updateGroupImages(params).then(() => {
                    Message({
                        message: this.t('sdxCommon.SettingSuccess'),
                        type: 'success'
                    });
                    this.initImageList();
                    this.dialogVisible = false;
                });
            }
        },
        initImageList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            const params = {
                name: this.name,
                imageType: this.imageType,
                shareType: this.shareType,
                buildType: this.buildType,
                taskType: this.taskType,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy
            };
            removeBlankAttr(params);
            const currentUser = getUser();
            if (this.isOwner || this.imageKind === 'all') {
                if (this.isOwner === 'true' || this.imageKind === 'all') {
                    params.ownerId = currentUser.userId || '';
                } else {
                    params.excludeOwnerId = currentUser.userId || '';
                }
            }
            getImageList(params).then((res) => {
                this.imageList = res.data;
                this.imageList.forEach(item => {
                    const isOwnImage = (item.owner && item.owner.uuid) === currentUser.userId;
                    item.showEdit = isOwnImage && auth.checkAuth('IMAGE-MANAGER:IMAGE:SHARE', 'BUTTON');
                    item.showExtend = item.buildType === 'BASIC' && item.packages && item.packages.length && (item.imageType === 'JUPYTER' || item.imageType === 'PYTHON' || item.imageType === 'TENSORFLOW' || item.imageType === 'CONTAINER_DEV');
                    item.showRemove = isOwnImage;
                    item.showDetail = (item.buildType === 'BASIC' && (item.imageType === 'JUPYTER' || item.imageType === 'PYTHON' || item.imageType === 'TENSORFLOW' || item.imageType === 'CONTAINER_DEV')) || ((isOwnImage || item.shareType === 'PUBLIC') && item.buildType === 'ONLINE');
                    if (item.buildType === 'BASIC') {
                        item.owner = {
                            fullName : 'system'
                        };
                    }
                    item.buildTypeText = BUILD_TYPE_LABEL[item.buildType];
                });
                this.total = res.total;
                this.loading = false;
            }, () => {
                this.imageList = [];
                this.total = 0;
                this.loading = false;
            });
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initImageList();
        },
        sortChange(sort) {
            this.orderBy = 'createdAt';
            if (sort &&  sort.order) {
                this.order = sort.order === 'ascending' ? 'asc' : 'desc';
                this.initImageList();
            }
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'detail':
                    this.imageId = row.uuid;
                    this.imageName = row.name;
                    this.detailDialogVisible = true;
                    break;
                case 'edit':
                    this.dialogVisible = true;
                    this.editingImage = row;
                    Object.assign(this.shareForm, row);
                    this.shareForm.users = this.shareForm.users || [];
                    this.shareForm.groups = this.shareForm.groups || [];
                    if (this.shareForm.users.length || this.shareForm.groups.length) this.shareForm.shareType = 'PRIVATE';
                    break;
                case 'extend':
                    this.$router.push({
                        name: 'basicbuild',
                        params: {
                            imageId: row.uuid
                        }
                    });
                    break;
                case 'remove':
                    MessageBox({
                        title: this.t('view.image.imageRemoveConfirm'),
                        content: this.t('sdxCommon.ConfirmRemove')
                    }).then(() => {
                        removeImage(row.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.RemoveSuccess'),
                                type: 'success'
                            });
                            this.initImageList();
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
