<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        title="新建GPU模板"
        size="small"
        :confirm-handler="handleConfirm"
        @cancel="handleCancel"
        class="sdxv-gpu-template"
    >
        <el-form
            :model="formData"
            ref="form"
            label-width="90px"
            :rules="rules"
        >
            <el-form-item
                label="GPU型号 :"
                prop="label"
                required
            >
                <el-select v-model="formData.name">
                    <el-option
                        v-for="(item, i) in GPUList"
                        :key="i"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="GPU(块) :"
                prop="count"
                required
            >
                <el-input-number
                    v-model="formData.count"
                    :min="1"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import { createResourceTmpl } from '@sdx/utils/src/api/resource';

import { InputNumber, Form, FormItem, Select } from 'element-ui';

export default {
    name: 'CreateGPUTemplate',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SdxuDialog,
        [InputNumber.name]: InputNumber,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select
    },
    data() {
        return {
            formData: {
                label: '',
                count: 1
            },
            GPUList: [],
            rules: {
                label: [{
                    validator: this.validateLabel, trigger: 'change'
                }]
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
            return this.$refs.form.validate().then(() => {
                const params = Object.assign({}, this.formData, { templateType: 'GPU'});
                return createResourceTmpl(params).then(() => {
                    this.$refs.form.resetFields();
                    this.$emit('refresh');
                    this.dialogVisible = false;
                });
            });
        },
        handleCancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        fetchGpuList() {
            // todo:
        },
        validateLabel(rule, value, callback) {
            if (value === '') {
                callback(new Error('请选择型号'));
            } else {
                callback();
            }
        }
    },
    created() {
        this.fetchGpuList();
    }
};
</script>

<style lang="scss">
.sdxv-gpu-template {
    .el-input-number {
        width: 250px;
    }

    .el-select {
        width: 250px;
    }
}
</style>
