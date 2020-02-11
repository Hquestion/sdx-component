<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} ContainerDev ${t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="lang$ === 'en' ? 206 : 116"
        icon="sdx-zidingyirongqirenwu"
        @commit="commit"
        :show-create-project="showCreateProject"
        :type="`ContainerDev ${t('view.task.form.task')}`"
        @create-project-close="createProjectClose"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '100px'"
            slot="form"
            @submit.native.prevent
            ref="containerdev"
            :rules="rules"
            :model="params"
        >
            <SdxuArticlePanel :title="t('view.task.BasicSetting')">
                <el-form-item
                    prop="name"
                    :label="`${t('view.task.taskName')}:`"
                >
                    <SdxuInput
                        v-model="params.name"
                        :searchable="true"
                        size="small"
                        :placeholder="t('view.task.form.Please_enter_the_task_name')"
                    />
                </el-form-item>
                <el-form-item
                    prop="description"
                    :label="`${t('view.task.TaskDescription')}:`"
                >
                    <SdxuInput
                        type="textarea"
                        :searchable="true"
                        v-model="params.description"
                        size="small"
                        :placeholder="t('view.task.form.Please_enter_a_task_description')"
                    />
                </el-form-item>
                <el-form-item
                    :label="`${t('view.task.RelatedProject')}:`"
                    prop="project"
                    v-if="!projectId && !params.uuid"
                >
                    <SdxuAppender>
                        <el-select
                            v-model="params.project"
                            size="small"
                            :placeholder="`${t('view.task.EnterRelatedProject')}`"
                            filterable
                            @change="projectSelected"
                        >
                            <el-option
                                v-for="item in projectOptions"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid"
                            />
                        </el-select>
                        <SdxuButton
                            type="primary"
                            invert
                            slot="postfix"
                            size="small"
                            class="create-project-button"
                            @click="createProject"
                        >
                            <i class="sdx-icon sdx-xinjianhao" />
                            {{ t('view.task.CreateProject') }}
                        </SdxuButton>
                    </SdxuAppender>
                </el-form-item>
            </SdxuArticlePanel>
            <SdxuArticlePanel :title="t('view.task.EnvSetting')">
                <el-form-item
                    prop="imageId"
                    :label="`${t('view.task.RuntimeEnvironment')}:`"
                >
                    <SdxuAppender>
                        <el-select
                            v-model="params.imageId"
                            :searchable="true"
                            size="small"
                            @change="getImagePackages"
                            :placeholder="t('view.task.form.Please_select_the_operating_environment')"
                        >
                            <el-option
                                v-for="item in imageOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                        <SdxuDropdownTip
                            :title="`${t('view.task.ImagePacInfo')}`"
                            v-if="packagesList.length"
                            width="260px"
                            slot="postfix"
                        >
                            <SdxuIconButton
                                slot="ref"
                                size="large"
                                icon="sdx-icon sdx-icon-warning"
                            />
                            <div
                                style="height: 300px"
                            >
                                <SdxuScroll>
                                    <div
                                        v-for="(item, index) in packagesList"
                                        :key="index"
                                        class="package-info__item"
                                    >
                                        <div>{{ item.name }}</div>
                                        <div>{{ item.version }}</div>
                                    </div>
                                </SdxuScroll>
                            </div>
                        </SdxuDropdownTip>
                    </SdxuAppender>
                </el-form-item>
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
                        v-model="params.instanceNumber"
                        :min="1"
                    />
                </el-form-item>
            </SdxuArticlePanel>
            <SdxuArticlePanel :title="t('view.task.DataSetting')">
                <el-form-item
                    prop="datasets"
                    :label="`${t('view.task.DataSet')}:`"
                >
                    <el-select
                        v-model="params.datasets"
                        size="small"
                        :placeholder="t('view.task.form.Please_select_the_dataset')"
                        multiple
                    >
                        <el-option
                            v-for="item in datasetsOptions"
                            :key="item.uuid"
                            :label="item.name"
                            :value="item.uuid"
                        />
                    </el-select>
                    <div class="form-tip">
                        {{ t('view.task.DatasetInfo') }}
                    </div>
                </el-form-item>
                <el-form-item
                    v-if="!cooperation"
                    prop="datasources"
                    :label="`${t('view.task.form.DataSource')}:`"
                >
                    <data-source-select v-model="params.datasources" />
                    <div class="form-tip">
                        {{ t('view.task.DataSourceInfo') }}
                    </div>
                </el-form-item>
            </SdxuArticlePanel>
            <SdxuArticlePanel
                :title="t('view.task.AdvanceSetting')"
                expandable
                :expanded.sync="showMoreSetting"
            >
                <div v-show="showMoreSetting">
                    <el-form-item
                        :label="`${t('view.task.EnvVars')}:`"
                    >
                        <!-- <SdxuInput
                        v-model="params.environmentsStr"
                        size="small"
                        :placeholder="`${t('view.task.EnvVarsPlaceholder')}`"
                    /> -->
                        <div>
                            <div
                                v-for="(item, index) in params.environments"
                                :key="index"
                                style="display:flex;justify-content:space-between;width:580px;margin:5px 0;"
                            >
                                <SdxuInput
                                    v-model="item.name"
                                    style="width:230px;"
                                    :placeholder="`${t('view.task.ParamName')}`"
                                />
                                <span>-</span>
                                <SdxuInput
                                    v-model="item.value"
                                    style="width:230px;"
                                    :placeholder="`${t('view.task.ParamValue')}`"
                                />
                                <div style="width:70px;">
                                    <sdxu-button
                                        v-if="!index"
                                        invert
                                        @click="handleEnvironChange(true)"
                                    >
                                        <i class="sdx-icon sdx-icon-plus" />
                                    </sdxu-button>
                                    <sdxu-button
                                        v-if="index===1"
                                        invert
                                        @click="handleEnvironChange()"
                                    >
                                        <i class="sdx-icon sdx-bianzu3" />
                                    </sdxu-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.task.StartCommand')}:`"
                    >
                        <SdxuInput
                            v-model="params.startCommand"
                            size="small"
                            :placeholder="`${t('view.task.StartCommand')}`"
                        />
                        <div class="form-tip">
                            {{ t('view.task.StartCommandTip') }}
                        </div>
                    </el-form-item>
                    <el-form-item
                        v-if="!!params.startCommand"
                        :label="`${t('view.task.StartParams')}:`"
                    >
                        <SdxuInput
                            v-model="params.startArgsStr"
                            size="small"
                            :placeholder="`${t('view.task.Params')}`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.task.OutputPath')}:`"
                    >
                        <div>
                            <SdxwFileSelect
                                v-model="params.displayPath"
                                :string-model="true"
                                check-type="folder"
                                source="ceph"
                            />
                        </div>
                        <div class="form-tip">
                            {{ t('view.task.OutputPathTip') }}
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.task.PortRoute')}:`"
                    >
                        <div>
                            <div
                                v-for="(item, index) in params.forwardPorts"
                                :key="index"
                                style="display:flex;justify-content:space-between;width:580px;margin:5px 0;"
                            >
                                <el-select
                                    v-model="item.protocol"
                                    style="width:230px;"
                                >
                                    <el-option
                                        v-for="option in protocolOptions"
                                        :key="option"
                                        :label="option"
                                        :value="option"
                                    />
                                </el-select>
                                <span>-</span>
                                <SdxuInput
                                    v-model.number="item.port"
                                    style="width:230px;"
                                    :placeholder="`${t('view.task.PortNumber')}`"
                                />
                                <div style="width:70px;">
                                    <sdxu-button
                                        v-if="!index"
                                        invert
                                        @click="handleProtChange(true)"
                                    >
                                        <i class="sdx-icon sdx-icon-plus" />
                                    </sdxu-button>
                                    <sdxu-button
                                        v-if="index===1"
                                        invert
                                        @click="handleProtChange()"
                                    >
                                        <i class="sdx-icon sdx-bianzu3" />
                                    </sdxu-button>
                                </div>
                            </div>
                        </div>
                        <div class="form-tip">
                            {{ t('view.task.PortRouteTip') }}
                        </div>
                    </el-form-item>
                </div>
            </SdxuArticlePanel>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import Button from '@sdx/ui/components/button';
import {Form, FormItem, Select, InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {  createProjectTask, getDataSet} from '@sdx/utils/src/api/project';
import { updateTask } from '@sdx/utils/src/api/task';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import FileSelect from '@sdx/widget/components/file-select';
import Appender from '@sdx/ui/components/appender';
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import IconButton from '@sdx/ui/components/icon-button';
import Scroll from '@sdx/ui/components/scroll';
import ArticlePanel from '@sdx/ui/components/article-panel';

const RESOURCE_KEY = 'DEPLOY';

export default {
    name: 'ContainerDevForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        [Button.name]: Button,
        SdxuInput,
        SdxwResourceConfig,
        [InputNumber.name]: InputNumber,
        DataSourceSelect,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        [Appender.name]: Appender,
        [DropdownTip.name]: DropdownTip,
        [IconButton.name]: IconButton,
        [Scroll.name]: Scroll,
        [ArticlePanel.name]: ArticlePanel
    },
    props: {
        task: {
            type: Object,
            default: null
        },
    },
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
            params: {
                uuid: '',
                name: '',
                description: '',
                type: 'CONTAINER_DEV',
                imageId: '',
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
                datasources: [],
                datasets: [],
                environments: [
                    {
                        name: '',
                        value: ''
                    }
                ],
                startCommand: '',
                startArgs: [],
                startArgsStr: '',
                displayPath: '',
                project: '',
                instanceNumber: 1,
                forwardPorts: [
                    {
                        protocol: 'HTTP',
                        port: ''
                    }
                ]
            },
            projectId: this.$route.params.projectId,
            imageOptions: [],
            cpuObj: {},
            gpuObj: {},
            rules:  {
                name: [
                    { required: true, message: this.t('view.task.form.Please_enter_the_task_name'), trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                project: [
                    { required: true, message: this.t('view.task.EnterRelatedProject'), trigger: 'change'}
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
                ],
                instanceNumber: [
                    { required: true, message: this.t('view.task.EnterInstanceNum'), trigger: 'change'}
                ],
                imageId: [
                    { required: true, message: this.t('view.task.form.Please_select_the_operating_environment'), trigger: 'change' }
                ],
                resourceConfigObj: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
            },
            datasetsOptions: [],
            cooperation:true,
            dataReady: false,
            showMoreSetting: false,
            protocolOptions: ['HTTP', 'TCP']
        };
    },
    computed: {
        isGpuEnt() {
            let isGpuEnt = false;
            for(let i=0; i<this.imageOptions.length; i++) {
                if(this.imageOptions[i].value ===this.params.imageId) {
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
    created() {
        this.imageList();
        this.getDataSetList();
        // 判断是否协作
        this.projectCooperation();
        this.getProjectList();
    },
    methods: {
        // 数据集列表
        handleProtChange(adding) {
            if (adding) {
                this.params.forwardPorts.push({
                    protocol: 'HTTP',
                    port: ''
                });
            } else {
                this.params.forwardPorts.pop();
            }
        },
        handleEnvironChange(adding) {
            if (adding) {
                this.params.environments.push({
                    name: '',
                    value: ''
                });
            } else {
                this.params.environments.pop();
            }
        },
        getDataSetList() {
            getDataSet()
                .then(res => {
                    this.datasetsOptions = res.items;
                });
        },
        projectSelected(project) {
            this.projectCooperation(project);
        },
        imageList() {
            const params = {
                imageType: 'CONTAINER_DEV',
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
        commit() {
            if (!this.isGpuEnt) {
                this.params.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu'] = 0;
                this.params.resourceConfigObj[RESOURCE_KEY].labels['gpu.model'] = '';
            }
            this.params.resourceConfigObj[RESOURCE_KEY].instance = this.params.instanceNumber;
            this.$refs.containerdev.validate().then(() => {
                this.params.resourceConfig = JSON.stringify(this.params.resourceConfigObj);
                this.params.forwardPorts = this.params.forwardPorts.filter(item => !!item.port);
                this.params.environments = this.params.environments.filter(item => !!item.value && !!item.name);
                this.params.startArgs = this.params.startArgsStr.split('/').filter(item => !!item);
                (this.params.uuid ? updateTask(this.params.uuid,this.params) : createProjectTask(this.projectId || this.params.project, this.params))
                    .then (() => {
                        this.$router.go(-1);
                    });
            });
        }
    },

    watch: {
        task(nval) {
            this.params = { ...this.params, ...nval};
            this.params.resourceConfigObj = JSON.parse(this.params.resourceConfig);
            this.params.instanceNumber = this.params.resourceConfigObj[RESOURCE_KEY].instance;
            this.params.startArgsStr = this.params.startArgs.join('/');
            if (!this.params.forwardPorts.length) this.params.forwardPorts = [{protocol: 'HTTP',port: ''}];
            if (!this.params.environments.length) this.params.environments = [{name: '',value: ''}];
            this.cpuObj = {
                cpu: this.params.resourceConfigObj[RESOURCE_KEY].requests.cpu/1000,
                memory: this.params.resourceConfigObj[RESOURCE_KEY].requests.memory / (1024*1024*1024),
                uuid: `${this.params.resourceConfigObj[RESOURCE_KEY].requests.cpu/1000}-${this.params.resourceConfigObj[RESOURCE_KEY].requests.memory / (1024*1024*1024)}`
            };
            this.gpuObj = {
                label: this.params.resourceConfigObj[RESOURCE_KEY].labels['gpu.model'],
                count: this.params.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu'],
                uuid: `${this.params.resourceConfigObj[RESOURCE_KEY].labels['gpu.model']}-${this.params.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu']}`
            };
            this.$nextTick(()=> {
                this.dataReady = true;
            });
        },
        cpuObj(val) {
            this.params.resourceConfigObj = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: val.cpu * 1000,
                        memory: val.memory * 1024* 1024*1024,
                        'nvidia.com/gpu': this.params.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu']
                    },
                    labels: {
                        'gpu.model': this.params.resourceConfigObj[RESOURCE_KEY].labels['gpu.model'],
                    },
                    instance: 1
                }
            };
        },
        gpuObj(val) {
            this.params.resourceConfigObj = {
                [RESOURCE_KEY]: {
                    requests: {
                        cpu: this.params.resourceConfigObj[RESOURCE_KEY].requests.cpu,
                        memory: this.params.resourceConfigObj[RESOURCE_KEY].requests.memory,
                        'nvidia.com/gpu': val.count
                    },
                    labels: {
                        'gpu.model': val.label,
                    },
                    instance: 1
                }
            };
        },
        'params.imageId'() {
            this.$refs.containerdev.clearValidate('resourceConfig');
        }
    }
};
</script>
