<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-version"
        :title="title"
    >
        <el-form
            label-width="110px"
            label-position="right"
            :model="versionInfoForm"
            ref="versionInfoForm"
            :rules="versionInfoFormRule"
        >
            <el-form-item
                label="版本名称："
                prop="name"
            >
                <sdxu-input
                    v-model="versionInfoForm.name"
                    placeholder="请输入版本名称"
                />
            </el-form-item>
            <el-form-item
                label="版本类型："
                prop="framework"
            >
                <el-select
                    v-model="versionInfoForm.framework"
                    placeholder="请选择版本类型"
                >
                    <el-option
                        v-for="item in frameworks"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="版本描述："
                prop="description"
            >
                <sdxu-input
                    v-model="versionInfoForm.description"
                    type="textarea"
                    placeholder="请输入版本描述，最多可输入256个字符"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                label="发布环境："
                prop="runtimeImage"
            >
                <el-select
                    v-model="versionInfoForm.runtimeImage"
                    placeholder="请选择发布环境"
                >
                    <el-option
                        v-for="item in frameworks"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="模型路径："
                prop="modelPath"
            >
                <SdxwFileSelect
                    v-model="versionInfoForm.modelPath"
                    source="ceph"
                    check-type="folder"
                />
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
import FileSelect from '@sdx/widget/components/file-select';
import { getFrameworks, createVersion, updateVersion } from '@sdx/utils/src/api/model';
export default {
    name: 'CreateVersion',
    data() {
        return {
            dialogVisible: this.visible,
            title: '新增模型版本',
            frameworks: [],
            versionInfoForm: {
                name: '',
                description: '',
                framework: '',
                runtimeImage: '',
                modelPath: []
            },
            versionInfoFormRule: {
                name: [
                    { required: true, message: '请输入版本名称', trigger: 'blur' },
                ],
                framework: [
                    { required: true, message: '请选择版本类型', trigger: 'change' },
                ],
                runtimeImage: [
                    { required: true, message: '请选择发布环境', trigger: 'change' },
                ],
                description: [
                    {
                        max: 256,
                        message: '最多输入256个字符',
                        trigger: 'blur'
                    }
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
        editingVersion: {
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
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        ElForm,
        ElFormItem,
        ElSelect
    },
    created() {
        getFrameworks().then(res => {
            this.frameworks = res.data;
        });
        if (this.editingVersion) {
            this.title = '编辑版本';
            Object.assign(this.versionInfoForm, this.editingVersion);
        }
    },
    methods: {
        dialogClose() {
            this.versionInfoForm = {
                name: '',
                description: '',
                labels: []
            };
            this.$refs.versionInfoForm.clearValidate();
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.versionInfoForm.validate(valid => {
                if (!valid) {
                    Message.error('请输入必填信息');
                } else {
                    if (this.editingVersion) {
                        updateVersion(this.editingVersion.uuid, this.versionInfoForm).then(() => {
                            Message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        createVersion(this.versionInfoForm).then(() => {
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
