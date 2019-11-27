<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        class="sdxv-create-service"
        size="large"
        :title="title"
    >
        <div class="sdxv-create-service__form">
            <el-form
                :label-width="lang$==='en' ? '150px' : '100px'"
                label-position="right"
                :model="serviceInfoForm"
                ref="serviceInfoForm"
                :rules="serviceInfoFormRule"
            >
                <SdxuArticlePanel
                    :title="`${t('view.model.basicInfo')}`"
                    :show-bar="false"
                >
                    <el-form-item
                        :label="`${t('view.model.serviceName')}:`"
                        prop="name"
                    >
                        <SdxuInput
                            v-model="serviceInfoForm.name"
                            size="small"
                            :placeholder="t('view.model.enterServiceName')"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="runtimeImage"
                        :label="`${t('view.task.RuntimeEnvironment')}:`"
                    >
                        <el-select
                            v-model="serviceInfoForm.runtimeImage"
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
                        prop="runtimeResource"
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
                        prop="instances"
                        :label="`${t('view.task.InstanceNum')}:`"
                    >
                        <el-input-number
                            v-model="serviceInfoForm.instances"
                            :min="1"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.model.percent')}:`"
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
                                {{ t('view.model.paramSetting') }}
                            </SdxuTabRadioItem>
                            <SdxuTabRadioItem name="request">
                                {{ t('view.model.requestExample') }}
                            </SdxuTabRadioItem>
                            <SdxuTabRadioItem name="response">
                                {{ t('view.model.respExample') }}
                            </SdxuTabRadioItem>
                        </SdxuTabRadioGroup>
                        <params-setting
                            v-show="settingType === 'params'"
                            :input-params.sync="serviceInfoForm.apiParams.input"
                            :output-params.sync="serviceInfoForm.apiParams.output"
                            ref="paramsSetting"
                        />
                        <request-example
                            v-show="settingType === 'request'"
                            :request-examples.sync="serviceInfoForm.apiExamples.request"
                            ref="requestExample"
                        />
                        <response-example
                            v-show="settingType === 'response'"
                            :response-success.sync="serviceInfoForm.apiExamples.response.success"
                            :response-fail.sync="serviceInfoForm.apiExamples.response.failed"
                            ref="responseExample"
                        />
                    </div>
                </SdxuArticlePanel>
            </el-form>
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
import ElFormItem from 'element-ui/lib/form-item';
import Message from 'element-ui/lib/message';
import ElSelect from 'element-ui/lib/select';
import { getImageList } from '@sdx/utils/src/api/image';
import { updateModel, createService } from '@sdx/utils/src/api/model';
import { nameWithChineseValidator } from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import locale from '@sdx/utils/src/mixins/locale';
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
            title: this.t('view.model.addModelService'),
            imageOptions: [],
            cpuObj: {},
            gpuObj: {},
            serviceInfoForm: {
                name: '',
                runtimeImage: '',
                instances: 1,
                modelId: this.modelId,
                versionName: this.versionName,
                runtimeResource: {
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
                apiParams: {
                    input: [],
                    output: []
                },
                apiExamples: {
                    request: [],
                    response: {
                        success: '',
                        failed: ''
                    }
                }
            },
            serviceInfoFormRule: {
                name: [
                    { required: true, message: this.t('view.model.enterServiceName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                instances: [
                    { required: true, message: this.t('view.task.EnterInstanceNum'), trigger: 'change'}
                ],
                runtimeImage: [
                    { required: true, message: this.t('view.model.selectRunningImage'), trigger: 'change' }
                ],
                runtimeResource: [
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
        editingService: {
            type: Object,
            default: null
        },
        modelId: {
            type: String,
            default: '53193a14-4574-440b-ba97-38fb4ba8b7dd'
        },
        versionName: {
            type: String,
            default: 'v2'
        }
    },
    computed: {
        isGpuEnt() {
            let isGpuEnt = false;
            for(let i=0; i<this.imageOptions.length; i++) {
                if(this.imageOptions[i].value ===this.serviceInfoForm.runtimeImage) {
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
        if (this.editingService) {
            this.title = this.t('view.model.editModel');
            Object.assign(this.serviceInfoForm, this.editingService);
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        },
        cpuObj(val) {
            this.serviceInfoForm.runtimeResource = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: val.cpu * 1000,
                        memory: val.memory * 1024* 1024*1024,
                        'nvidia.com/gpu': this.serviceInfoForm.runtimeResource[RESOURCE_KEY].requests['nvidia.com/gpu']
                    },
                    labels: {
                        'gpu.model': this.serviceInfoForm.runtimeResource[RESOURCE_KEY].labels['gpu.model'],
                    },
                    instance: 1
                }
            };
        },
        gpuObj(val) {
            this.serviceInfoForm.runtimeResource = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: this.serviceInfoForm.runtimeResource[RESOURCE_KEY].requests.cpu,
                        memory: this.serviceInfoForm.runtimeResource[RESOURCE_KEY].requests.memory,
                        'nvidia.com/gpu': val.count
                    },
                    labels: {
                        'gpu.model': val.label,
                    },
                    instance: 1
                }
            };
        },
        'serviceInfoForm.runtimeImage'() {
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
            this.$refs.serviceInfoForm.validate(async valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    try {
                        await this.$refs.paramsSetting.validate();
                    } catch (e) {
                        this.showMoreSetting = true;
                        this.settingType = 'params';
                        Message.error(this.t('sdxCommon.requiredInfo'));
                        return;
                    }
                    try {
                        await this.$refs.requestExample.validate();
                    } catch (e) {
                        this.showMoreSetting = true;
                        this.settingType = 'request';
                        Message.error(this.t('sdxCommon.requiredInfo'));
                        return;
                    }
                    if (this.editingService) {
                        updateModel(this.editingService.uuid, this.serviceInfoForm).then(() => {
                            Message({
                                message: this.t('sdxCommon.UpdateSuccess'),
                                type: 'success'
                            });
                            this.needRefresh = true;
                            this.dialogVisible = false;
                        });
                    } else {
                        this.serviceInfoForm.runtimeResource[RESOURCE_KEY].instance = this.serviceInfoForm.instances;
                        createService(this.serviceInfoForm).then((res) => {
                            console.log('res', res);
                        });
                    }
                }
            });
        }
    }
};
</script>
