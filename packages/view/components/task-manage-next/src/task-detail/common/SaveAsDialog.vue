<template>
    <SdxuDialog
        :title="t('view.task.SaveAsImage')"
        :visible.sync="dialogVisible"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
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
                :label="t('view.image.ImageName')+ ':'"
                prop="name"
            >
                <div class="sdxv-saveas-dialog__name">
                    <span class="sdxv-saveas-dialog__name--prefix">{{ name_prefix }}</span>
                    <SdxuInput
                        v-model="formData.name"
                        :placeholder="t('view.image.ImageNameInputPlaceholder')"
                        size="small"
                        class="sdxv-saveas-dialog__name--input"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="t('view.image.ImageVersion')+ ':'"
                prop="version"
            >
                <SdxuInput
                    v-model="formData.version"
                    :placeholder="t('view.image.ImageVersionInputPlaceholder')"
                    size="small" 
                />
            </el-form-item>
            <el-form-item :label="t('view.image.ImageType')+ ':'">
                {{ task.type }}
            </el-form-item>
        </el-form>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuInput from '@sdx/ui/components/input';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import locale from '@sdx/utils/src/mixins/locale';
import { buildImageBasic } from '@sdx/utils/src/api/image';

import { itemNameValidate, tagNameValidate } from '@sdx/utils/src/helper/validate';

export default {
    name: 'SdxvSaveAsDialog',
    mixins: [locale],
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
                    message: this.t('view.image.ImageNameNotBeNull'),
                    trigger: 'blur'
                }, {
                    validator: itemNameValidate,
                    trigger: 'blur'
                }],
                version: [{
                    required: true,
                    message: this.t('view.image.ImageVersionNotBeNull'),
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
            return this.task && this.task.image && this.task.image.name + '_' || '';
        }
    },
    methods: {
        handleConfirm() {
            buildImageBasic({
                baseImage: this.task && (this.task.imageId || this.task.image && this.task.image.uuid) || '',
                name: this.name_prefix + this.formData.name,
                version: this.formData.version
            }).then(() => {
                this.dialogVisible = false;
            }).catch(e => {
                window.console.error(e);
            });
        },
        handleCancel() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style>

</style>
