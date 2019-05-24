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
                prop="owner"
                key="owner"
                label="创建人"
                v-if="imageKind === 'all' || imageKind === 'otherShare'"
            />
            <el-table-column
                prop="createdAt"
                key="createdAt"
                label="创建时间"
                sortable="custom"
            />
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'edit')"
                        icon="sdx-icon sdx-fenxiang"
                        title="共享设置"
                        v-if="scope.row.operations.indexOf('edit') > -1"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'extend')"
                        icon="sdx-icon sdx-kaobei"
                        title="基于此创建"
                        v-if="scope.row.operations.indexOf('extend') > -1"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'detail')"
                        icon="sdx-icon sdx-icon-tickets"
                        title="查看详情"
                        v-if="scope.row.operations.indexOf('detail') > -1"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'remove')"
                        icon="sdx-icon sdx-icon-delete"
                        title="删除"
                        v-if="scope.row.operations.indexOf('remove') > -1"
                    />
                </template>
            </el-table-column>
        </sdxu-table>
        <div class="sdxv-image-list__footer">
            <div />
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <sdxu-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            @confirm="confirmEdit"
            v-if="dialogVisible"
        >
            <el-form
                label-width="110px"
                label-position="left"
                :model="shareForm"
                v-if="dialogTitle === '共享设置'"
            >
                <el-form-item
                    label="共享至全局："
                    v-if="isAdmin"
                >
                    <el-switch
                        v-model="shareForm.shareType"
                        active-value="PUBLIC"
                        inactive-value="PRIVATE"
                    />
                </el-form-item>
                <el-form-item
                    label="用户/用户组："
                    v-show="shareForm.shareType !== 'PUBLIC'"
                >
                    <sdxw-select-group-user
                        :users="selectedUsers"
                        :groups="selectedGroups"
                    />
                </el-form-item>
            </el-form>
        </sdxu-dialog>
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
import { getImageList, removeImage, updateImage, updateGroupImages } from '@sdx/utils/src/api/image';
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import ImageDetail from './PackageDetailDialog';
import { Message } from 'element-ui';
export default {
    name: 'ImageListTable',
    data() {
        return {
            imageList: [],
            total: 1,
            current: 1,
            pageSize: 10,
            order: '',
            orderBy: '',
            loading: false,
            dialogVisible: false,
            dialogTitle: '',
            shareForm: {
                shareType: 'PRIVATE',
                users: [],
                groups: []
            },
            selectedGroups: [],
            selectedUsers: [],
            defaultUserGroupKeys: [],
            editingImage: null,
            selectedImages: [],
            detailDialogVisible: false,
            imageName: '',
            imageId: ''
        };
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
        [SelectGroupUser.name]: SelectGroupUser,
        [Button.name]: Button,
        [ImageDetail.name]: ImageDetail
    },
    created() {
        this.initImageList();
    },
    computed: {
        isAdmin() {
            return true; // TODO: 判断用户是否是管理员用户
        }
    },
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
            this.dialogTitle = '共享设置';
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
            Message({    // TODO: 换成批量删除接口
                message: '删除成功',
                type: 'success'
            });
            this.initImageList();
        },
        cancelShare() {
            if (!this.selectedImages.length) {
                Message({
                    message: '请先选择需要取消共享的镜像',
                    type: 'warning'
                });
                return;
            }
            Message({    // TODO: 换成批量取消共享接口
                message: '取消共享成功',
                type: 'success'
            });
            this.initImageList();
        },
        selectionChange(selection) {
            this.selectedImages = selection;
        },
        confirmEdit() {
            this.shareForm.users = [];
            this.shareForm.groups = [];
            if (this.shareForm.shareType !== 'PUBLIC') {
                this.shareForm.users = this.selectedUsers;
                this.shareForm.groups = this.selectedGroups;
            }
            if (this.editingImage) {
                // 编辑镜像
                updateImage(this.editingImage.uuid, this.shareForm).then(() => {
                    Message({
                        message: '设置成功',
                        type: 'success'
                    });
                    this.editingImage = null;
                    this.initImageList();
                });
            } else {
                // 批量共享设置  TODO 换成批量接口
                // updateGroupImages(this.selectedImages, this.shareForm).then(() => {
                Message({
                    message: '全部共享成功',
                    type: 'success'
                });
                this.initImageList();
                // });
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
                start: this.current,
                count: this.pageSize,
                order: this.order,
                orderBy: this.orderBy
            };
            if (this.isOwner) {
                if (this.isOwner === 'true') {
                    params.ownerId = '';  // TODO: 有用户ID时传入用户ID
                } else {
                    params.excludeOwnerId = ''; // TODO: 有用户ID时传入用户ID
                }
            }
            getImageList(params).then((res) => {
                this.imageList = res.data;
                this.total = res.total;
                this.loading = false;
            });
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initImageList();
        },
        sortChange(sort) {
            if (sort && sort.prop && sort.order) {
                this.order = sort.prop;
                this.orderBy = sort.order === 'ascending' ? 'asc' : 'desc';
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
                    this.dialogTitle = '共享设置';
                    this.editingImage = row;
                    Object.assign(this.shareForm, row);
                    this.selectedGroups = row.groups;
                    this.selectedUsers = row.users;
                    break;
                case 'extend':
                    this.$router.push({ name: 'basicbuild' });
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

<style scoped lang="scss">
</style>
