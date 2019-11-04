<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} SkyIDE ${t('view.task.form.task')}`"
        class="form-containerdev"
        :label-width="lang$ === 'en' ? 190 : 160"
        icon="sdx-SkyIDErenwu"
        @commit="commit"
        :show-create-project="showCreateProject"
        :type="`SkyIDE ${t('view.task.form.task')}`"
        @create-project-close="createProjectClose"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '160px'"
            slot="form"
            @submit.native.prevent
            ref="containerdev"
            :rules="rules"
            :model="params"
        >
            <SdxwExpandLabel
                label="基本配置"
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
                label="文件目录:"
                prop="directory"
            >
                <div>
                    <SdxwFileSelect
                        v-model="params.directory"
                        :string-model="true"
                        check-type="folder"
                        source="ceph"
                    />
                </div>
            </el-form-item>
            <el-form-item
                label="关联项目:"
                prop="project"
                v-if="!projectId"
            >
                <SdxuAppender style="width: 560px">
                    <el-select
                        v-model="params.project"
                        size="small"
                        placeholder="请选择关联项目"
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
                        创建新项目
                    </SdxuButton>
                </SdxuAppender>
            </el-form-item>
            <SdxwExpandLabel
                label="环境配置"
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
                        title="镜像中包含版本信息"
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
            <SdxwExpandLabel
                label="数据配置"
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
                    将数据集以只读方式挂载进目录
                </div>
            </el-form-item>
            <el-form-item
                v-if="!cooperation"
                prop="datasources"
                :label="`${t('view.task.form.DataSource')}:`"
            >
                <data-source-select v-model="params.datasources" />
                <div class="form-tip">
                    将数据源的设置写入容器的环境变量
                </div>
            </el-form-item>
            <SdxwExpandLabel
                label="高级配置"
                expandable
                :expanded.sync="showMoreSetting"
            />
            <div v-show="showMoreSetting">
                <el-form-item
                    label="是否启动自动释放资源:"
                >
                    <el-radio-group v-model="params.autoRelease">
                        <el-radio
                            :label="true"
                        >
                            {{ t('widget.shareForm.Yes') }}
                        </el-radio>
                        <el-radio
                            :label="false"
                        >
                            {{ t('widget.shareForm.No') }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="Kernel自动释放时间:"
                >
                    <el-input-number
                        v-model="params.kernelReleaseTime"
                        :min="30"
                        :disabled="!params.autoRelease"
                    />
                    <span
                        class="form-tip"
                        style="margin-left:10px;"
                    >
                        超过指定时间Kernel将停止活跃
                    </span>
                </el-form-item>
                <el-form-item
                    label="Pod自动释放时间:"
                >
                    <el-input-number
                        v-model="params.podReleaseTime"
                        :min="30"
                        :disabled="!params.autoRelease"
                    />
                    <span
                        class="form-tip"
                        style="margin-left:10px;"
                    >
                        超过指定时间所有Kennel将断开连接
                    </span>
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
import {  createTask, updateTask, getDataSet} from '@sdx/utils/src/api/task';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import ExpandLabel from '@sdx/widget/components/expand-label';
import ElRadio from 'element-ui/lib/radio';
import ElRadioGroup from 'element-ui/lib/radio-group';
import FileSelect from '@sdx/widget/components/file-select';
import Appender from '@sdx/ui/components/appender';
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import IconButton from '@sdx/ui/components/icon-button';
import Scroll from '@sdx/ui/components/scroll';
export default {
    name: 'SkyIdeForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [ExpandLabel.name]: ExpandLabel,
        [Select.name]: Select,
        SdxuInput,
        SdxwResourceConfig,
        DataSourceSelect,
        [InputNumber.name]: InputNumber,
        ElRadio,
        ElRadioGroup,
        [Button.name]: Button,
        [Appender.name]: Appender,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
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
                type: 'SKYIDE',
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
                autoRelease: true,
                kernelReleaseTime: 30,
                podReleaseTime: 30,
                project: '',
                directory: ''
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
                    { required: true, message: '请选择关联项目', trigger: 'change'}
                ],
                directory: [
                    { required: true, message: '请选择文件目录', trigger: 'blur'}
                ],
                description: [
                    {
                        validator: descValidator,
                        trigger: 'blur'
                    }
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
