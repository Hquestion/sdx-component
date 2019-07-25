<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.resourceManage.newGpuTemplateTitle')"
        size="small"
        :confirm-handler="handleConfirm"
        @cancel="handleCancel"
        class="sdxv-gpu-template"
    >
        <el-form
            :model="formData"
            ref="form"
            label-width="100px"
            :rules="rules"
        >
            <el-form-item
                :label="t('view.resourceManage.GpuLabel')"
                prop="label"
                required
            >
                <el-select v-model="formData.label">
                    <el-option
                        v-for="(item, i) in GPUList"
                        :key="i"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.PieceLabel')"
                prop="count"
                required
            >
                <el-input-number
                    v-model="formData.count"
                    :min="1"
                    :max="maxGpu"
                />
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import {createResourceTmpl, getGpuModels, getTotalResource} from '@sdx/utils/src/api/resource';
import locale from '@sdx/utils/src/mixins/locale';

import { InputNumber, Form, FormItem, Select } from 'element-ui';

export default {
    name: 'CreateGPUTemplate',
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
            },
            maxGpu: 1
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
            getGpuModels().then(res => {
                this.GPUList = res;
            });
        },
        validateLabel(rule, value, callback) {
            if (value === '') {
                callback(new Error(this.t('view.resourceManage.PleaseSelectGpuKind')));
            } else {
                callback();
            }
        },
        initTotalLimit() {
            getTotalResource().then(res => {
                this.maxGpu = res.gpu;
            });
        }
    },
    created() {
        this.fetchGpuList();
        this.initTotalLimit();
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
