<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        title="新建CPU / 内存模板"
        size="small"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        class="sdxv-cpu-template"
    >
        <el-form
            :model="formData"
            ref="form"
            label-width="90px"
        >
            <el-form-item
                label="CPU(核) :"
                prop="cpu"
                required
            >
                <el-input-number
                    v-model="formData.cpu"
                    :min="1"
                />
            </el-form-item>
            <el-form-item
                label="内存(GB) :"
                prop="memory"
                required
            >
                <el-input-number
                    v-model="formData.memory"
                    :min="1"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import { createResourceTmpl } from '@sdx/utils/src/api/resource';

export default {
    name: 'CreateCPUAndMemoryTemplate',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SdxuDialog
    },
    data() {
        return {
            formData: {
                cpu: 1,
                memory: 1
            }
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    },
    methods: {
        handleConfirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = Object.assign({}, this.formData, { templateType: 'CPU'});
                    createResourceTmpl(params).then(data => {
                        this.$refs.form.resetFields();
                        this.dialogVisible = false;
                    });
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

<style lang="scss">
.sdxv-cpu-template {
    .el-input-number {
        width: 250px;
    }
}
</style>
