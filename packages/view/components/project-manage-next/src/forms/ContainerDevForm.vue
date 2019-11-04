<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} ContainerDev ${t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="lang$ === 'en' ? 190 : 100"
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
            <SdxwExpandLabel
                :label="t('view.task.BasicSetting')"
            />
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
                v-if="!projectId"
            >
                <SdxuAppender style="width: 560px">
                    <el-select
                        v-model="params.project"
                        size="small"
                        :placeholder="`${t('view.task.EnterRelatedProject')}`"
                        style="width:420px;margin-right:10px;"
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
            <SdxwExpandLabel
                :label="`${t('view.task.EnvSetting')}`"
            />
            <el-form-item
                prop="imageId"
                :label="`${t('view.task.RuntimeEnvironment')}:`"
            >
                <SdxuAppender style="width: 560px;">
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
                        width="260px"
                        :disabled="!packagesList.length"
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
                prop="resourceConfig"
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
            <SdxwExpandLabel
                :label="`${t('view.task.DataSetting')}`"
            />
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
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
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
            <SdxwExpandLabel
                :label="`${t('view.task.AdvanceSetting')}`"
                expandable
                :expanded.sync="showMoreSetting"
            />
            <div v-show="showMoreSetting">
                <el-form-item
                    :label="`${t('view.task.EnvVars')}:`"
                >
                    <SdxuInput
                        v-model="params.environments"
                        size="small"
                        :placeholder="`${t('view.task.EnvVarsPlaceholder')}`"
                    />
                </el-form-item>
                <el-form-item
                    :label="`${t('view.task.StartCommand')}:`"
                >
                    <div style="display:flex;justify-content:space-between;width:560px;">
                        <SdxuInput
                            v-model="params.environments"
                            size="small"
                            :placeholder="`${t('view.task.StartCommand')}`"
                            style="width:270px"
                        />
                        <span>-</span>
                        <SdxuInput
                            v-model="params.environments"
                            size="small"
                            :placeholder="`${t('view.task.Params')}`"
                            style="width:270px"
                        />
                    </div>
                    <div class="form-tip">
                        {{ t('view.task.StartCommandTip') }}
                    </div>
                </el-form-item>
                <el-form-item
                    :label="`${t('view.task.OutputPath')}:`"
                >
                    <div>
                        <SdxwFileSelect
                            v-model="params.outputPaths"
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
                        <SdxuInput
                            v-model="params.environments"
                            size="small"
                        />
                    </div>
                    <div class="form-tip">
                        {{ t('view.task.PortRouteTip') }}
                    </div>
                </el-form-item>
            </div>
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import Button from '@sdx/ui/components/button';
import {Form, FormItem, Select, InputNumber} from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {  createTask, updateTask, getDataSet} from '@sdx/utils/src/api/project';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import ExpandLabel from '@sdx/widget/components/expand-label';
import FileSelect from '@sdx/widget/components/file-select';
import Appender from '@sdx/ui/components/appender';
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import IconButton from '@sdx/ui/components/icon-button';
import Scroll from '@sdx/ui/components/scroll';

export default {
    name: 'ContainerDevForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [ExpandLabel.name]: ExpandLabel,
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
                if(value.EXECUTOR_CPUS === 0 || value.EXECUTOR_CPUS === null || isNaN(value.EXECUTOR_CPUS)) {
                    callback(new Error(this.t('view.task.form.CPU_Memory_resources_need_to_be_configured')));
                } else if (value.EXECUTOR_GPUS === 0 || value.EXECUTOR_GPUS === null || isNaN(value.EXECUTOR_GPUS)) {
                    callback(new Error(this.t('view.task.form.GPU_resources_need_to_be_configured')));
                } else {
                    callback();
                }
            } else {
                if(value.EXECUTOR_CPUS === 0 || value.EXECUTOR_CPUS === null || isNaN(value.EXECUTOR_CPUS)) {
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
                type: 'CONTAINERDEV',
                imageId: '',
                resourceConfig: {
                    'EXECUTOR_INSTANCES': 1,
                    'EXECUTOR_CPUS': 0,
                    'EXECUTOR_GPUS': 0,
                    'EXECUTOR_MEMORY': 0,
                    'GPU_MODEL': ''
                },
                datasources: [],
                datasets: [],
                environments: '',
                outputPaths: '',
                project: '',
                instanceNumber: 1
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
                resourceConfig: [
                    {
                        validator: resourceValidate,
                        trigger: 'change'
                    }
                ],
            },
            datasetsOptions: [],
            cooperation:true,
            dataReady: false,
            showMoreSetting: true
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
        getDataSetList() {
            getDataSet({ share_kinds: '1,2,3' })
                .then(data => {
                    this.datasetsOptions = data.data.options;
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
                this.params.resourceConfig.EXECUTOR_GPUS = 0;
                this.params.resourceConfig.GPU_MODEL = '';
            }
            this.$refs.containerdev.validate().then(() => {
                (this.params.uuid ? updateTask(this.params.uuid,this.params) : createTask(this.params))
                    .then (() => {
                        this.$router.go(-1);
                    });
            });
        }
    },

    watch: {
        task(nval) {
            this.params = { ...this.params, ...nval};
            this.cpuObj = {
                cpu: this.params.resourceConfig.EXECUTOR_CPUS/1000,
                memory: this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024),
                uuid: `${this.params.resourceConfig.EXECUTOR_CPUS/1000}-${this.params.resourceConfig.EXECUTOR_MEMORY / (1024*1024*1024)}`
            };
            this.gpuObj = {
                label:this.params.resourceConfig.GPU_MODEL,
                count: this.params.resourceConfig.EXECUTOR_GPUS,
                uuid: `${this.params.resourceConfig.GPU_MODEL}-${this.params.resourceConfig.EXECUTOR_GPUS}`
            };
            this.$nextTick(()=> {
                this.dataReady = true;
            });
        },
        cpuObj(val) {
            this.params.resourceConfig = {
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': val.cpu * 1000,
                'EXECUTOR_GPUS': this.params.resourceConfig.EXECUTOR_GPUS,
                'EXECUTOR_MEMORY': val.memory * 1024* 1024*1024,
                'GPU_MODEL': this.params.resourceConfig.GPU_MODEL
            };
        },
        gpuObj(val) {
            this.params.resourceConfig = {
                'EXECUTOR_INSTANCES': 1,
                'EXECUTOR_CPUS': this.params.resourceConfig.EXECUTOR_CPUS,
                'EXECUTOR_GPUS': val.count,
                'EXECUTOR_MEMORY': this.params.resourceConfig.EXECUTOR_MEMORY,
                'GPU_MODEL': val.label
            };
        },
        'params.imageId'() {
            this.$refs.containerdev.clearValidate('resourceConfig');
        }
    }
};
</script>
