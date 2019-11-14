<template>
    <BaseForm
        :title="`${params.uuid || params.Id ? t('view.task.form.edit'):t('view.task.form.create')} Jupyter ${t('view.task.form.task')}`"
        class="form-jupyter"
        :label-width="lang$ === 'en' ? 190 : 100"
        icon="sdx-Jupyterrenwu"
        @commit="commit"
        :show-create-project="showCreateProject"
        :type="`Jupyter ${t('view.task.form.task')}`"
        @create-project-close="createProjectClose"
    >
        <el-form
            label-position="right"
            :label-width="lang$ === 'en' ? '190px' : '100px'"
            slot="form"
            @submit.native.prevent
            ref="jupyter"
            :rules="rules"
            :model="params"
        >
            <SdxwExpandLabel
                :label="t('view.task.BasicSetting')"
            />
            <el-form-item
                :label="`${t('view.task.taskName')}:`"
                prop="name"
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
                <SdxuAppender style="width: 560px;">
                    <el-select
                        v-model="params.project"
                        size="small"
                        :placeholder="t('view.task.EnterRelatedProject')"
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
                :label="t('view.task.EnvSetting')"
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
                        :title="t('view.task.ImagePacInfo')"
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
            <SdxwExpandLabel
                :label="t('view.task.DataSetting')"
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
        </el-form>
    </BaseForm>
</template>

<script>

import BaseForm from './BaseForm';
import Button from '@sdx/ui/components/button';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import Select from 'element-ui/lib/select';
import SdxuInput from '@sdx/ui/components/input';
import { getImageList } from '@sdx/utils/src/api/image';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import { getDataSet, createProjectTask} from '@sdx/utils/src/api/project';
import { updateTask } from '@sdx/utils/src/api/task';
import { nameWithChineseValidator, descValidator } from '@sdx/utils/src/helper/validate';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import ExpandLabel from '@sdx/widget/components/expand-label';
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import IconButton from '@sdx/ui/components/icon-button';
import Scroll from '@sdx/ui/components/scroll';
import Appender from '@sdx/ui/components/appender';

const RESOURCE_KEY = 'DEPLOY';

export default {
    name: 'JupyterForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [Button.name]: Button,
        [FormItem.name]: FormItem,
        [ExpandLabel.name]: ExpandLabel,
        [Select.name]: Select,
        [DropdownTip.name]: DropdownTip,
        [IconButton.name]: IconButton,
        [Scroll.name]: Scroll,
        SdxuInput,
        SdxwResourceConfig,
        DataSourceSelect,
        [Appender.name]: Appender,
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
                } else if (value[RESOURCE_KEY].labels['gpu.model'] === 0 || value[RESOURCE_KEY].labels['gpu.model'] === null || isNaN(value[RESOURCE_KEY].labels['gpu.model'])) {
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
                name: '',
                description: '',
                type: 'JUPYTER',
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
                project: ''
            },
            projectId: this.$route.params.projectId,
            imageOptions: [],
            cpuObj: {},
            gpuObj: {},
            cooperation:true,
            datasetsOptions: [],
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
            dataReady: false
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
        this.projectCooperation();
        this.getDataSetList();
        this.getProjectList();
    },
    methods: {
        // 数据集列表
        getDataSetList() {
            let params = '';
            if (this.cooperation === false) {
                params = '1,2,3';
            } else if (this.cooperation === true) {
                params = '1,3';
            }
            getDataSet({ share_kinds: params })
                .then(data => {
                    this.datasetsOptions = data.data.options;
                });
        },
        projectSelected(project) {
            this.projectCooperation(project);
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
        commit() {
            if (!this.isGpuEnt) {
                this.params.resourceConfigObj[RESOURCE_KEY].requests['nvidia.com/gpu'] = 0;
                this.params.resourceConfigObj[RESOURCE_KEY].labels['gpu.model'] = '';
            }
            this.$refs.jupyter.validate().then(() => {
                this.params.resourceConfig = JSON.stringify(this.params.resourceConfigObj);
                const id = this.params.uuid || this.params.Id;
                (id ? updateTask(id,this.params) : createProjectTask(this.projectId || this.params.project, this.params))
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
            this.$refs.jupyter.clearValidate('resourceConfig');
        }
    }
};
</script>

<style lang="scss">
.package-info__item {
    height: 30px;
    padding: 10px;
    border-bottom: 1px solid #D8DEEA;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
