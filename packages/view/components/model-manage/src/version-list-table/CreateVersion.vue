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
            :rules="isPublishing ? {} : versionInfoFormRule"
        >
            <el-form-item
                label="版本名称："
                prop="name"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.name }}
                </div>
                <sdxu-input
                    v-else
                    v-model="versionInfoForm.name"
                    placeholder="请输入版本名称"
                />
            </el-form-item>
            <el-form-item
                label="版本类型："
                prop="framework"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.framework }}
                </div>
                <el-select
                    v-else
                    v-model="versionInfoForm.framework"
                    placeholder="请选择版本类型"
                    @change="frameworkChange"
                    :disabled="!!editingVersion"
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
                <div v-if="isPublishing">
                    {{ versionInfoForm.description }}
                </div>
                <sdxu-input
                    v-else
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
                <div v-if="isPublishing">
                    {{ versionInfoForm.runtimeImage }}
                </div>
                <el-select
                    v-else
                    v-model="versionInfoForm.runtimeImage"
                    placeholder="请选择发布环境"
                    :disabled="!versionInfoForm.framework || !!editingVersion"
                >
                    <el-option
                        v-for="(item,index) in runtimeImageOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="资源环境："
                prop="runtimeResource"
            >
                <ResourceConfig
                    v-model="versionInfoForm.runtimeResource.cpuObj"
                    type="cpu"
                    v-if="!editingVersion"
                />
                <ResourceConfig
                    v-model="cpuObj"
                    type="cpu"
                    v-else
                    :read-only="isPublishing"
                />
                <ResourceConfig
                    v-model="versionInfoForm.runtimeResource.gpuObj"
                    type="gpu"
                    v-if="!editingVersion"
                />
                <ResourceConfig
                    v-model="gpuObj"
                    type="gpu"
                    v-else
                    :read-only="isPublishing"
                />
            </el-form-item>
            <el-form-item
                label="模型路径："
                prop="modelPath"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.modelPath }}
                </div>
                <SdxwFileSelect
                    v-else
                    v-model="versionInfoForm.modelPath"
                    source="ceph"
                    check-type="folder"
                    :disabled="!!editingVersion"
                    string-model
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
import ResourceConfig from '../../../project-management/src/forms/ResourceConfig';
import { getFrameworks, createVersion, updateVersion, startVersion } from '@sdx/utils/src/api/model';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
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
                modelPath: '',
                runtimeResource: {
                    cpuObj: {},
                    gpuObj: {},
                }
            },
            cpuObj: {},
            gpuObj: {},
            runtimeImageOptions: [],
            versionInfoFormRule: {
                name: [
                    { required: true, message: '请输入版本名称', trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                framework: [
                    { required: true, message: '请选择版本类型', trigger: 'change' },
                ],
                runtimeImage: [
                    { required: true, message: '请选择发布环境', trigger: 'change' },
                ],
                runtimeResource: [
                    { required: true, message: '请选择资源环境', trigger: 'change' },
                    { validator: this.validateResource, trigger: 'change' }
                ],
                modelPath: [
                    { required: true, message: '请选择模型路径', trigger: 'blur' },
                ],
                description: [
                    {
                        max: 256,
                        message: '最多输入256个字符',
                        trigger: 'change'
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
        },
        isPublishing: {
            type: Boolean,
            default: false
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
        ElSelect,
        ResourceConfig
    },
    created() {
        getFrameworks().then(res => {
            this.frameworks = res;
        });
        if (this.editingVersion) {
            this.title = this.isPublishing ? '发布版本' : '编辑版本';
            this.frameworkChange(this.editingVersion.framework);
            Object.assign(this.versionInfoForm, this.editingVersion);
            const cpu = this.versionInfoForm.runtimeResource.cpu / 1000;
            const memory = this.versionInfoForm.runtimeResource.memory / 1024 / 1024 / 1024;
            this.cpuObj = {
                cpu,
                memory,
                uuid: `${cpu}-${memory}`
            };
            const count = this.versionInfoForm.runtimeResource.gpu;
            const label = this.versionInfoForm.runtimeResource.gpuModel;
            this.gpuObj = {
                count,
                label,
                uuid: `${label}-${count}`
            };
        }
    },
    methods: {
        validateResource(rule, value, callback) {
            if (this.editingVersion) {
                callback();
                return;
            }
            if (value && (!Object.keys(value.cpuObj).length || !Object.keys(value.gpuObj).length)) {
                callback(new Error('请选择资源环境'));
            } else {
                callback();
            }
        },
        frameworkChange(nVal) {
            this.versionInfoForm.runtimeImage = '';
            const params = {
                imageType: nVal + '_DEPLOYMENT',
                start: 1,
                count: -1
            };
            getImageList(params).then((res) => {
                this.imageList = res.data;
                res.data.forEach(item => this.runtimeImageOptions.push({
                    label: item.name,
                    value: item.name + ':' + item.version
                }));
            });
        },
        dialogClose() {
            this.versionInfoForm = {};
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
                    if (this.isPublishing) {
                        startVersion(this.$route.params.modelId, this.editingVersion.uuid).then(() => {
                            Message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                        return;
                    }
                    if (this.editingVersion) {
                        this.versionInfoForm.runtimeResource.cpu = this.cpuObj.cpu * 1000;
                        this.versionInfoForm.runtimeResource.memory = this.cpuObj.memory * 1024 * 1024 * 1024;
                        this.versionInfoForm.runtimeResource.gpu = this.gpuObj.count;
                        this.versionInfoForm.runtimeResource.gpuModel = this.gpuObj.label;
                        updateVersion(this.$route.params.modelId, this.editingVersion.uuid, this.versionInfoForm).then(() => {
                            Message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        this.versionInfoForm.runtimeResource.cpu = this.versionInfoForm.runtimeResource.cpuObj.cpu * 1000;
                        this.versionInfoForm.runtimeResource.memory = this.versionInfoForm.runtimeResource.cpuObj.memory * 1024 * 1024 * 1024;
                        this.versionInfoForm.runtimeResource.gpu = this.versionInfoForm.runtimeResource.gpuObj.count;
                        this.versionInfoForm.runtimeResource.gpuModel = this.versionInfoForm.runtimeResource.gpuObj.label;
                        createVersion(this.$route.params.modelId, this.versionInfoForm).then(() => {
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
