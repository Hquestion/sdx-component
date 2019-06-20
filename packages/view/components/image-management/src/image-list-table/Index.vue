<template>
    <div
        class="sdxv-image-list"
        v-loading="loading"
    >
        <div>
            <SdxuButton
                type="primary"
                size="small"
                @click="share"
                v-if="imageKind === 'private'"
            >
                全部共享
            </SdxuButton>
            <SdxuButton
                type="primary"
                invert
                size="small"
                @click="remove"
                v-if="imageKind === 'private'"
            >
                删除
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="cancelShare"
                v-if="imageKind === 'myShare'"
            >
                取消共享
            </SdxuButton>
        </div>
        <sdxu-table
            :data="imageList"
            class="sdxv-image-list__table"
            @selection-change="selectionChange"
            @sort-change="sortChange"
        >
            <el-table-column
                type="selection"
                width="55"
                v-if="imageKind === 'myShare' || imageKind === 'private'"
            />
            <el-table-column
                prop="name"
                label="镜像名称"
                key="name"
            />
            <el-table-column
                prop="version"
                key="version"
                label="版本号"
            />
            <el-table-column
                prop="imageType"
                key="imageType"
                label="镜像种类"
            />
            <el-table-column
                prop="buildType"
                key="buildType"
                label="构建方式"
                v-if="imageKind !== 'basic'"
            />
            <el-table-column
                key="owner"
                label="创建人"
                v-if="imageKind === 'all' || imageKind === 'otherShare'"
            >
                <template slot-scope="scope">
                    {{ (scope.row.owner && scope.row.owner.fullName) || '' }}
                </template>
            </el-table-column>
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
            >
                <template slot-scope="scope">
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'edit')"
                        icon="sdx-icon sdx-fenxiang"
                        title="共享设置"
                        v-if="scope.row.showEdit"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'extend')"
                        icon="sdx-icon sdx-kaobei"
                        title="基于此创建"
                        v-if="scope.row.showExtend"
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
                </template>
            </el-table-column>
        </sdxu-table>
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
import { Message } from 'element-ui';
import ShareSetting from '@sdx/widget/components/share-setting';
import Filters from '@sdx/utils/src/mixins/transformFilter';
import auth from '@sdx/widget/components/auth';
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
    mounted() {
        this.initImageList();
    },
    mixins: [Filters],
    methods: {
        share() {
            if (!this.selectedImages.length) {
                Message({
                    message: '请先选择需要共享的镜像',
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
                    message: '请先选择需要删除的镜像',
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: '确定要删除选中的镜像吗？',
                content: '删除后将不可恢复'
            }).then(() => {
                const uuids = [];
                this.selectedImages.forEach(item => uuids.push(item.uuid));
                removeGroupImages({ uuids }).then(() => {
                    Message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.initImageList();
                });
            }).catch(() => {});
        },
        cancelShare() {
            if (!this.selectedImages.length) {
                Message({
                    message: '请先选择需要取消共享的镜像',
                    type: 'warning'
                });
                return;
            }
            MessageBox({
                title: '确定要取消共享选中的镜像吗？'
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
                        message: '操作成功',
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
            this.shareForm.shareType = shareType;
            this.shareForm.users = [];
            this.shareForm.groups = [];
            if (this.shareForm.shareType !== 'PUBLIC') {
                this.shareForm.users = users;
                this.shareForm.groups = groups;
            }
            if (this.editingImage) {
                // 编辑镜像
                updateImage(this.editingImage.uuid, this.shareForm).then(() => {
                    Message({
                        message: '设置成功',
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
                        message: '设置成功',
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
            if (this.isOwner) {
                if (this.isOwner === 'true') {
                    params.ownerId = currentUser.userId || '';
                } else {
                    params.excludeOwnerId = currentUser.userId || '';
                }
            }
            getImageList(params).then((res) => {
                this.imageList = res.data;
                this.imageList.forEach(item => {
                    const isOwnImage = (item.owner && item.owner.uuid) === currentUser.userId;
                    item.showEdit = isOwnImage && auth.$auth('IMAGE-MANAGER:IMAGE:SHARE:""', 'BUTTON');
                    item.showExtend = item.buildType === 'BASIC' && item.packages && item.packages.length;
                    item.showRemove = isOwnImage && item.buildType !== 'BASIC' && item.shareType === 'PRIVATE';
                    item.showDetail = (isOwnImage || item.shareType === 'PUBLIC') && item.buildType === 'ONLINE';
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
                    break;
                case 'extend':
                    this.$router.push({
                        path: `basicbuild/${row.uuid}`
                    });
                    break;
                case 'remove':
                    MessageBox({
                        title: '确定要删除选中的镜像吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeImage(row.uuid).then(() => {
                            Message({
                                message: '删除成功',
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
