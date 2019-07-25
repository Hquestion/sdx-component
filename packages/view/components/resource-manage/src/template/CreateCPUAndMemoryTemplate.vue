<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.resourceManage.newCpuTemplateTitle')"
        size="small"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        class="sdxv-cpu-template"
    >
        <el-form
            :model="formData"
            ref="form"
            label-width="100px"
        >
            <el-form-item
                :label="t('view.resourceManage.CpuLabel')"
                prop="cpu"
                required
            >
                <el-input-number
                    v-model="formData.cpu"
                    :min="1"
                    :max="maxCpu"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.MemoryLabel')"
                prop="memory"
                required
            >
                <el-input-number
                    v-model="formData.memory"
                    :min="1"
                    :max="maxMemory"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import {createResourceTmpl, getTotalResource} from '@sdx/utils/src/api/resource';
import { gbToByte, toMilli } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';

import InputNumber from 'element-ui/lib/input-number';
import FormItem from 'element-ui/lib/form-item';
import Form from 'element-ui/lib/form';

export default {
    name: 'CreateCPUAndMemoryTemplate',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    mixins: [locale],
    components: {
        SdxuDialog,
        [InputNumber.name]: InputNumber,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        return {
            formData: {
                cpu: 1,
                memory: 1
            },
            maxCpu: 1,
            maxMemory: 1
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
                    const params = {
                        cpu: toMilli(this.formData.cpu),
                        memory: gbToByte(this.formData.memory),
                        templateType: 'CPU'
                    };
                    createResourceTmpl(params).then(() => {
                        this.$refs.form.resetFields();
                        this.$emit('refresh');
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
        },
        initTotalLimit() {
            getTotalResource().then(res => {
                this.maxCpu = res.cpu;
                this.maxMemory = toMilli(res.memory);
            });
        }
    },
    created() {
        this.initTotalLimit();
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
