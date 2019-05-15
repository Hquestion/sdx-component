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
                        title="分享"
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
    </div>
</template>

<script>
import Table from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { getImageList } from '@sdx/utils/src/api/image';
import Pagination from '@sdx/ui/components/pagination';
export default {
    name: 'ImageListTable',
    data() {
        return {
            imageList: [],
            total: 1,
            current: 1,
            pageSize: 10,
            loading: false
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
        SdxuIconButton
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
            this.$emit('operation', row.uuid, type);
        }
    }
};
</script>

<style scoped lang="scss">
</style>
