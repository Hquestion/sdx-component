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
                prop="name"
                label="镜像名称"
            />
            <el-table-column
                prop="version"
                label="版本号"
            />
            <el-table-column
                prop="sourceType"
                label="镜像来源"
            />
            <el-table-column
                prop="imageType"
                label="镜像种类"
            />
            <el-table-column
                prop="buildType"
                label="构建方式"
            />
            <el-table-column
                prop="owner"
                label="创建人"
            />
            <el-table-column
                prop="createdAt"
                label="创建时间"
            />
            <el-table-column
                label="操作"
            />
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
    components: {
        [Table.name]: Table,
        [Pagination.name]: Pagination
    },
    created() {
        this.initImageList();
    },
    methods: {
        initImageList() {
            this.loading = true;
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
        }
    }
};
</script>

<style scoped lang="scss">
</style>
