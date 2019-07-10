<template>
    <SdxuDialog
        title="另存为镜像"
        :visible.sync="dialogVisible"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
        <!-- // todo:  -->
        <el-form
            v-if="task"
            :model="formData"
            label-width="110px"
            @submit.native.prevent
            :rules="rules"
            ref="form"
            class="sdxv-saveas-dialog"
        >
            <el-form-item
                label="镜像名称："
                prop="name"
            >
                <div class="sdxv-saveas-dialog__name">
                    <span class="sdxv-saveas-dialog__name--prefix">{{ name_prefix }}</span>
                    <SdxuInput
                        v-model="formData.name"
                        placeholder="请输入镜像名称"
                        size="small"
                        class="sdxv-saveas-dialog__name--input"
                    />
                </div>
            </el-form-item>
            <el-form-item
                label="镜像版本号："
                prop="version"
            >
                <SdxuInput
                    v-model="formData.version"
                    placeholder="请输入镜像版本号"
                    size="small" 
                />
            </el-form-item>
            <el-form-item label="镜像类型：">
                {{ task.kind }}
            </el-form-item>
        </el-form>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';

import { itemNameValidate, tagNameValidate } from '@sdx/utils/src/helper/validate';

export default {
    name: 'SdxvSaveAsDialog',
    components: {
        SdxuDialog,
        SdxuInput,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        task: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            formData: {
                name: '',
                version: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '镜像名称不能为空',
                    trigger: 'blur'
                }, {
                    validator: itemNameValidate,
                    trigger: 'blur'
                }],
                version: [{
                    required: true,
                    message: '镜像版本号不能为空',
                    trigger: 'blur'
                }, {
                    validator: tagNameValidate,
                    trigger: 'blur'
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
        },
        name_prefix() {
            return this.task && this.task.base_image_base_name && this.task.base_image_base_name + '_' || '';
        }
    },
    methods: {
        handleConfirm() {
            // todo: 
        },
        handleCancel() {
            // todo:
            this.dialogVisible = false;
        }
        // todo: 镜像名称重名校验
    }
};
</script>

<style>

</style>
