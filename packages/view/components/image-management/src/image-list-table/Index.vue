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
    props: {
        imageKind: {
            type: String,
            default: 'all'
        }
    },
    components: {
        [Table.name]: Table,
        [Pagination.name]: Pagination
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
        }
    }
};
</script>

<style scoped lang="scss">
</style>
