<template>
    <div class="">
        <SdxuTable
            :data="tableData"  
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
                prop="imageType"
                label="镜像种类"
            />
            <el-table-column
                prop="buildType"
                label="构建方式"
            />
            <el-table-column
                label="状态"
                prop="state"
            >
                <template
                    slot-scope="scope"
                >
                    {{ scope.row.content }}
                </template>
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间"
            />
            <el-table-column
                style="width: 15%"
                label="操作"
            >
                <template
                    slot-scope="scope"
                    class="icon"
                >
                    <i
                        class="sdx-icon iconicon-edit1 icon"
                        @click="editRole(scope.row.uuid)"
                    />
                    <i
                        class="sdx-icon iconicon-delete1 icon"
                        @click="removeRole(scope.row.uuid, scope.row.name)"
                    />
                </template>
            </el-table-column>
            <el-table-column
                type="expand"
            >
                <template slot-scope="props">
                    <div class="expand">
                        <span>角色说明:</span>
                        <span>{{ props.row.description }}</span>
                    </div>
                </template>
            </el-table-column>
        </SdxuTable>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
export default {
    name: '',
    data() {
        return {};
    },
    components: {
        SdxuTable
    },
    created() {
        
    }
};
</script>

<style scoped lang="scss">
</style>
