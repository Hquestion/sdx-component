<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-service"
        size="large"
        :title="title"
    >
        <div :style="{height: editingModel ? '290px' : 'calc(45vh)'}">
            <SdxuScroll>
                <div class="sdxv-create-service__form">
                    <el-form
                        :label-width="lang$==='en' ? '150px' : '100px'"
                        label-position="right"
                        :model="serviceInfoForm"
                        ref="serviceInfoForm"
                        :rules="serviceInfoFormRule"
                    >
                        <SdxuArticlePanel
                            :title="`基本信息`"
                            :show-bar="false"
                        >
                            <el-form-item
                                :label="`服务名称:`"
                                prop="name"
                            >
                                <SdxuInput
                                    v-model="serviceInfoForm.name"
                                    size="small"
                                    :placeholder="`请输入服务名称`"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="imageId"
                                :label="`${t('view.task.RuntimeEnvironment')}:`"
                            >
                                <el-select
                                    v-model="serviceInfoForm.imageId"
                                    :searchable="true"
                                    size="small"
                                    :placeholder="t('view.task.form.Please_select_the_operating_environment')"
                                >
                                    <el-option
                                        v-for="item in imageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </el-form-item>
                        </SdxuArticlePanel>
                        <SdxuArticlePanel
                            :title="t('view.task.EnvSetting')"
                            :show-bar="false"
                        >
                            <el-form-item
                                prop="resourceConfigObj"
                                :label="`${t('view.task.form.ResourceAllocation')}:`"
                            >
                                <i class="icon">*</i>
                                <SdxwResourceConfig
                                    v-if="!isGpuEnt"
                                    v-model="cpuObj"
                                    type="onlycpu"
                                    :data-ready="dataReady"
                                />

                                <div v-if="isGpuEnt">
                                    <SdxwResourceConfig
                                        v-model="cpuObj"
                                        type="cpu"
                                        :data-ready="dataReady"
                                    />
                                    <SdxwResourceConfig
                                        v-model="gpuObj"
                                        type="gpu"
                                        :data-ready="dataReady"
                                    />
                                </div>
                            </el-form-item>
                            <el-form-item
                                prop="instanceNumber"
                                :label="`${t('view.task.InstanceNum')}:`"
                            >
                                <el-input-number
                                    v-model="serviceInfoForm.instanceNumber"
                                    :min="1"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="`流量占比:`"
                            >
                                100%
                            </el-form-item>
                        </SdxuArticlePanel>
                        <SdxuArticlePanel
                            :title="t('view.task.AdvanceSetting')"
                            expandable
                            :expanded.sync="showMoreSetting"
                            :show-bar="false"
                            class="sdxv-create-service__advanced"
                        >
                            <div v-show="showMoreSetting">
                                <SdxuTabRadioGroup
                                    v-model="settingType"
                                    style="margin-bottom: 16px;"
                                >
                                    <SdxuTabRadioItem name="params">
                                        参数设置
                                    </SdxuTabRadioItem>
                                    <SdxuTabRadioItem name="request">
                                        请求示例
                                    </SdxuTabRadioItem>
                                    <SdxuTabRadioItem name="response">
                                        返回示例
                                    </SdxuTabRadioItem>
                                </SdxuTabRadioGroup>
                                <params-setting
                                    v-show="settingType === 'params'"
                                    :input-params.sync="serviceInfoForm.inputParams"
                                    :output-params.sync="serviceInfoForm.outputParams"
                                    ref="paramsSetting"
                                />
                                <request-example
                                    v-show="settingType === 'request'"
                                    :request-examples.sync="serviceInfoForm.requestExamples"
                                    ref="requestExample"
                                />
                                <response-example
                                    v-show="settingType === 'response'"
                                    :response-success.sync="serviceInfoForm.responseSuccess"
                                    :response-fail.sync="serviceInfoForm.responseFail"
                                    ref="responseExample"
                                />
                            </div>
                        </SdxuArticlePanel>
                    </el-form>
                </div>
            </SdxuScroll>
        </div>

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
import Scroll from '@sdx/ui/components/scroll';
import ElFormItem from 'element-ui/lib/form-item';
import Message from 'element-ui/lib/message';
import ShareForm from '@sdx/widget/components/share-form';
import ElSelect from 'element-ui/lib/select';
import { getImageList } from '@sdx/utils/src/api/image';
import { createModel, updateModel, createVersion } from '@sdx/utils/src/api/model';
import { nameWithChineseValidator } from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import locale from '@sdx/utils/src/mixins/locale';
import FileSelect from '@sdx/widget/lib/file-select';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import ArticlePanel from '@sdx/ui/components/article-panel';
import TabRadio from '@sdx/ui/components/tab-radio';
import ParamsSetting from './params-setting/Index';
import RequestExample from './request-example/Index';
import ResponseExample from './response-example/Index';

const RESOURCE_KEY = 'DEPLOY';
export default {
    name: 'CreateModelService',
    data() {
        const resourceValidate = (rule, value, callback) => {
            if(this.isGpuEnt) {
                if(value[RESOURCE_KEY].requests.cpu === 0 || value[RESOURCE_KEY].requests.cpu === null || isNaN(value[RESOURCE_KEY].requests.cpu)) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else if (!value[RESOURCE_KEY].labels['gpu.model'] || !value[RESOURCE_KEY].requests['nvidia.com/gpu']) {
                    callback(new Error(this.t('view.task.form.GPU_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            } else {
                if(value[RESOURCE_KEY].requests.cpu === 0 || value[RESOURCE_KEY].requests.cpu === null || isNaN(value[RESOURCE_KEY].requests.cpu)) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            }
        };
        return {
            dialogVisible: this.visible,
            title: '新增模型服务',
            imageOptions: [],
            cpuObj: {},
            gpuObj: {},
            serviceInfoForm: {
                name: '',
                imageId: '',
                instanceNumber: 1,
                resourceConfigObj: {
                    [RESOURCE_KEY]: {
                        requests: {
                            cpu: 0,
                            memory: 0,
                            'nvidia.com/gpu': 0
                        },
                        labels: {
                            'gpu.model': '',
                        },
                        instance: 1
                    }
                },
                inputParams: [],
                outputParams: [],
                requestExamples: [],
                responseSuccess: '',
                responseFail: ''
            },
            serviceInfoFormRule: {
                name: [
                    { required: true, message: '请输入服务名称', trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                instanceNumber: [
                    { required: true, message: this.t('view.task.EnterInstanceNum'), trigger: 'change'}
                ],
                imageId: [
                    { required: true, message: '请选择运行环境', trigger: 'change' }
                ],
                resourceConfigObj: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
            },
            needRefresh: false,
            dataReady: false,
            showMoreSetting: true,
            settingType: 'params'
        };
    },
    mixins: [locale],
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
    computed: {
        isGpuEnt() {
            let isGpuEnt = false;
            for(let i=0; i<this.imageOptions.length; i++) {
                if(this.imageOptions[i].value ===this.serviceInfoForm.imageId) {
                    if(this.imageOptions[i].label.includes('gpu')) {
                        isGpuEnt =true;
                    } else {
                        isGpuEnt = false;
                    }
                }
            }
            return isGpuEnt;
        }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        [ShareForm.name]: ShareForm,
        [Scroll.name]: Scroll,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        ElForm,
        ElFormItem,
        ElSelect,
        [ArticlePanel.name]: ArticlePanel,
        SdxwResourceConfig,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        ParamsSetting,
        RequestExample,
        ResponseExample
    },
    created() {
        this.imageList();
        if (this.editingModel) {
            this.title = this.t('view.model.editModel');
            Object.assign(this.serviceInfoForm, this.editingModel);
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        },
        cpuObj(val) {
            this.serviceInfoForm.resourceConfigObj = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: val.cpu * 1000,
                        memory: val.memory * 1024* 1024*1024,
                        'nvidia.com/gpu': this.serviceInfoForm.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu']
                    },
                    labels: {
                        'gpu.model': this.serviceInfoForm.resourceConfigObj[RESOURCE_KEY].labels['gpu.model'],
                    },
                    instance: 1
                }
            };
        },
        gpuObj(val) {
            this.serviceInfoForm.resourceConfigObj = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: this.serviceInfoForm.resourceConfigObj[RESOURCE_KEY].requests.cpu,
                        memory: this.serviceInfoForm.resourceConfigObj[RESOURCE_KEY].requests.memory,
                        'nvidia.com/gpu': val.count
                    },
                    labels: {
                        'gpu.model': val.label,
                    },
                    instance: 1
                }
            };
        },
        'serviceInfoForm.imageId'() {
            this.$refs.serviceInfoForm.clearValidate('resourceConfig');
        }
    },
    methods: {
        dialogClose() {
            this.serviceInfoForm = {
                name: '',
                description: '',
                labels: []
            };
            this.$refs.serviceInfoForm.clearValidate();
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        imageList() {
            const params = {
                imageType: 'JUPYTER',
                start: 1,
                count: -1,
                ownerId: getUser().userId || ''
            };
            getImageList(params)
                .then(data => {
                    for(let i=0; i<data.data.length; i++) {
                        this.imageOptions.push({value: data.data[i].uuid, label:data.data[i].name});
                    }
                });
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$refs.serviceInfoForm.validate(valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    if (!this.$refs.paramsSetting.validate()) {
                        this.showMoreSetting = true;
                        this.settingType = 'params';
                        Message.error(this.t('sdxCommon.requiredInfo'));
                        return;
                    }
                    if (!this.$refs.requestExample.validate()) {
                        this.showMoreSetting = true;
                        this.settingType = 'request';
                        Message.error(this.t('sdxCommon.requiredInfo'));
                        return;
                    }
                    if (this.editingModel) {
                        updateModel(this.editingModel.uuid, this.serviceInfoForm).then(() => {
                            Message({
                                message: this.t('sdxCommon.UpdateSuccess'),
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        if (this.serviceInfoForm.shareType === 'PUBLIC') {
                            this.serviceInfoForm.users = [];
                            this.serviceInfoForm.groups = [];
                            this.serviceInfoForm.isPublic = true;
                        }
                        createModel(this.serviceInfoForm).then((res) => {
                            const params = {
                                description: this.serviceInfoForm.versionDescription,
                                modelPath: this.serviceInfoForm.modelPath
                            };
                            createVersion(res.uuid, params).then(() => {
                                Message({
                                    message: this.t('sdxCommon.CreateSuccess'),
                                    type: 'success'
                                });
                                this.needRefresh = true;
                                this.dialogVisible = false;
                            });
                        });
                    }
                }
            });
        }
    }
};
</script>
