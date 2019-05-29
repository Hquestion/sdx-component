<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-model"
        :title="title"
    >
        <el-form
            label-width="110px"
            label-position="right"
            :model="modelInfoForm"
            ref="modelInfoForm"
            :rules="modelInfoFormRule"
        >
            <el-form-item
                label="模型名称："
                prop="name"
            >
                <sdxu-input
                    v-model="modelInfoForm.name"
                    placeholder="请输入模型名称"
                />
            </el-form-item>
            <el-form-item
                label="模型描述："
                prop="description"
            >
                <sdxu-input
                    v-model="modelInfoForm.description"
                    type="textarea"
                    placeholder="请输入模型描述，最多可输入256个字符"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                label="模型标签："
                prop="labels"
            >
                <el-select
                    v-model="modelInfoForm.labels"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择模型标签"
                    :multiple-limit="2"
                >
                    <el-option
                        v-for="item in labelOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                确认
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import Message from 'element-ui/lib/message';
import ElSelect from 'element-ui/lib/select';
import { getLabels, createModel, updateModel } from '@sdx/utils/src/api/model';
export default {
    name: 'CreateModel',
    data() {
        return {
            dialogVisible: this.visible,
            title: '新建模型',
            labelOptions: [],
            modelInfoForm: {
                name: '',
                description: '',
                labels: []
            },
            modelInfoFormRule: {
                name: [
                    { required: true, message: '请输入模型名称', trigger: 'blur' },
                ],
                description: [
                    {
                        max: 256,
                        message: '最多输入256个字符',
                        trigger: 'blur'
                    }
                ],
                labels: [
                    { required: true, message: '请选择模型标签', trigger: 'change' },
                ]
            },
            needRefresh: false
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        editingModel: {
            type: Object,
            default: null
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        ElForm,
        ElFormItem,
        ElSelect
    },
    created() {
        getLabels().then(res => {
            this.labelOptions = res.items;
        });
        if (this.editingModel) {
            this.title = '编辑模型';
            Object.assign(this.modelInfoForm, this.editingModel);
        }
    },
    methods: {
        dialogClose() {
            this.modelInfoForm = {
                name: '',
                description: '',
                labels: []
            };
            this.$refs.modelInfoForm.clearValidate();
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.modelInfoForm.validate(valid => {
                if (!valid) {
                    Message.error('请输入必填信息');
                } else {
                    if (this.editingModel) {
                        updateModel(this.editingModel.uuid, this.modelInfoForm).then(() => {
                            Message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        createModel(this.modelInfoForm).then(() => {
                            Message({
                                message: '创建成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    }
                }
            });
        }
    }
};
</script>
