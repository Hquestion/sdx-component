<template>
    <div
        class="sdxv-image-list"
        v-loading="loading"
    >
        <sdxu-table
            :data="imageList"
            class="sdxv-image-list__table"
        >
            <el-table-column
                type="selection"
                width="55"
                v-if="imageKind === 'myShare'"
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
                prop="sourceType"
                key="sourceType"
                label="镜像来源"
                v-if="imageKind === 'all'"
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
            />
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'share')"
                        icon="sdx-icon sdx-fenxiang"
                        title="共享设置"
                        v-if="scope.row.operations.indexOf('share') > -1"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'extend')"
                        icon="sdx-icon sdx-kaobei"
                        title="基于此创建"
                        v-if="scope.row.operations.indexOf('extend') > -1"
                    />
                    <sdxu-icon-button
                        @click="handleOperation(scope.row, 'edit')"
                        icon="sdx-icon sdx-icon-edit"
                        title="编辑"
                        v-if="scope.row.operations.indexOf('edit') > -1"
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
        >
            <el-form
                label-width="110px"
                label-position="left"
                :model="shareForm"
                v-if="dialogTitle === '共享设置'"
            >
                <el-form-item
                    label="共享至全局："
                >
                    <el-switch
                        v-model="shareForm.shareGlobal"
                    />
                </el-form-item>
                <el-form-item
                    label="用户/用户组："
                    v-show="!shareForm.shareGlobal"
                >
                    <sdxw-select-group-user
                        :tags.sync="userGroupTags"
                        :default-checked-keys="defaultUserGroupKeys"
                    />
                </el-form-item>
            </el-form>
        </sdxu-dialog>
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import Dialog from '@sdx/ui/components/dialog';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { getImageList, removeImage } from '@sdx/utils/src/api/image';
import SelectGroupUser from '@sdx/widget/components/select-group-user';
import Pagination from '@sdx/ui/components/pagination';
import MessageBox from '@sdx/ui/components/message-box';
import { Message } from 'element-ui';
export default {
    name: 'ImageListTable',
    data() {
        return {
            imageList: [],
            total: 1,
            current: 1,
            pageSize: 10,
            loading: false,
            dialogVisible: false,
            dialogTitle: '',
            shareForm: {
                shareGlobal: false,
                users: [],
                groups: []
            },
            userGroupTags: [],
            defaultUserGroupKeys: []
        };
    },
    props: {
        imageKind: {
            type: String,
            default: 'all'
        }
    },
    components: {
        [Table.name]: Table,
        [Pagination.name]: Pagination,
        SdxuIconButton,
        [Dialog.name]: Dialog,
        [SelectGroupUser.name]: SelectGroupUser
    },
    created() {
        this.initImageList();
    },
    methods: {
        initImageList(reset) {
            this.loading = true;
            if (reset) this.current = 1;
            const params = {
                name: this.searchName,
                imageType: this.imageType,
                shareType: this.shareType,
                buildType: this.buildType,
                taskType: this.taskType,
                start: this.current,
                count: this.pageSize
            };
            getImageList(params).then((res) => {
                console.log('res', res);
                this.imageList = res.data;
                this.total = res.total;
                this.loading = false;
            });
        },
        currentChange(nVal) {
            this.current = nVal;
            this.initImageList();
        },
        handleOperation(row, type) {
            if (type && row.uuid) {
                switch (type) {
                case 'detail':
                    break;
                case 'share':
                    this.dialogVisible = true;
                    this.dialogTitle = '共享设置';
                    break;
                case 'extend':
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
                case 'edit':
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
