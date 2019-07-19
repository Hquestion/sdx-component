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
                :label="t('view.model.createVersionForm.name')"
                prop="name"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.name }}
                </div>
                <sdxu-input
                    v-else
                    v-model="versionInfoForm.name"
                    :placeholder="t('view.model.enterName')"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.model.createVersionForm.framework')"
                prop="framework"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.framework }}
                </div>
                <el-select
                    v-else
                    v-model="versionInfoForm.framework"
                    :placeholder="t('view.model.enterFramework')"
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
                :label="t('view.model.createVersionForm.description')"
                prop="description"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.description }}
                </div>
                <sdxu-input
                    v-else
                    v-model="versionInfoForm.description"
                    type="textarea"
                    :placeholder="t('view.model.enterDescription')"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.model.createVersionForm.runtimeImage')"
                prop="runtimeImage"
            >
                <div v-if="isPublishing">
                    {{ versionInfoForm.runtimeImage }}
                </div>
                <el-select
                    v-else
                    v-model="versionInfoForm.runtimeImage"
                    :placeholder="t('view.model.enterImage')"
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
                :label="t('view.model.createVersionForm.runtimeResource')"
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
                    v-if="!editingVersion && isGpuEnt"
                />
                <ResourceConfig
                    v-model="gpuObj"
                    type="gpu"
                    v-if="editingVersion && isGpuEnt"
                    :read-only="isPublishing"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.model.createVersionForm.modelPath')"
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
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('sdxCommon.Confirm') }}
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'CreateVersion',
    data() {
        return {
            dialogVisible: this.visible,
            title: this.t('view.model.createVersion'),
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
                    { required: true, message: this.t('view.model.enterName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                framework: [
                    { required: true, message: this.t('view.model.enterFramework'), trigger: 'change' },
                ],
                runtimeImage: [
                    { required: true, message: this.t('view.model.enterImage'), trigger: 'change' },
                ],
                runtimeResource: [
                    { required: true, message: this.t('view.model.enterResource'), trigger: 'change' },
                    { validator: this.validateResource, trigger: 'change' }
                ],
                modelPath: [
                    { required: true, message: this.t('view.model.enterModelPath'), trigger: 'blur' },
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
    mixins: [locale],
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    computed: {
        isGpuEnt() {
            if (!this.runtimeImageOptions.length) return false;
            let item = this.runtimeImageOptions.find(item => item.value === this.versionInfoForm.runtimeImage);
            return item && item.label.includes('gpu');
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
            this.title = this.isPublishing ? this.t('view.model.publishVersion') : this.t('view.model.editVersion');
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
            if (value && (!Object.keys(value.cpuObj).length || (this.isGpuEnt && !Object.keys(value.gpuObj).length))) {
                callback(new Error(this.t('view.model.enterResource')));
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
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    if (this.isPublishing) {
                        startVersion(this.$route.params.modelId, this.editingVersion.uuid).then(() => {
                            Message({
                                message: this.t('sdxCommon.OperationSuccess'),
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
                                message: this.t('sdxCommon.UpdateSuccess'),
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        this.versionInfoForm.runtimeResource.cpu = this.versionInfoForm.runtimeResource.cpuObj.cpu * 1000;
                        this.versionInfoForm.runtimeResource.memory = this.versionInfoForm.runtimeResource.cpuObj.memory * 1024 * 1024 * 1024;
                        if (this.isGpuEnt) {
                            this.versionInfoForm.runtimeResource.gpu = this.versionInfoForm.runtimeResource.gpuObj.count;
                            this.versionInfoForm.runtimeResource.gpuModel = this.versionInfoForm.runtimeResource.gpuObj.label;
                        }
                        createVersion(this.$route.params.modelId, this.versionInfoForm).then(() => {
                            Message({
                                message: this.t('sdxCommon.CreateSuccess'),
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
