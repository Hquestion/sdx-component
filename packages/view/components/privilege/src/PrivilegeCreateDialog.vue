<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        title="新建权限"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
        <el-form
            :model="formData"
            ref="form"
        >
            <el-form-item
                label="权限名"
                name="name"
                required
            >
                <sdxu-input
                    placeholder="请输入权限名称"
                    v-model="formData.name"
                />
            </el-form-item>
            <el-form-item
                label="权限描述"
                name="description"
                required
            >
                <sdxu-input
                    placeholder="请输入权限描述"
                    type="textarea"
                    v-model="formData.description"
                />
            </el-form-item>
            <el-form-item
                label="权限标签"
                name="tags"
                required
            >
                <el-select
                    v-model="formData.tags"
                    multiple
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, i) in tagOption"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="权限操作"
                name="key"
                required
            >
                <el-select
                    v-model="formData.systemType"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, i) in systemOption"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select
                    v-model="formData.resourceType"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, i) in resourceOption"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select
                    v-model="formData.operationType"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, i) in operationOption"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';

export default {
    name: 'PrivilegeCreateDialog',
    components: {
        SdxuDialog,
        SdxuInput
    },
    props: {
        visiable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                key: '',
                tags: [],
                systemType: '',
                resourceType: '',
                operationType: ''
            },
            tagOption: [],
            systemOption: [], 
            resourceOption: [],
            operationOption: []
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visiable;
            },
            set(val) {
                this.$emit('update:visiable', val);
            }
        }
    },
    methods: {
        handleConfirm() {
            // todo: 表单校验
            this.$refs.form.validate(valid => {
                if (valid) {
                    // todo:
                } else {
                    return false;
                }
            });
        },
        handleCancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        }
    }
};
</script>

<style>

</style>
