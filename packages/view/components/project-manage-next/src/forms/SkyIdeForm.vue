<template>
    <BaseForm
        :title="`${params.uuid ? t('view.task.form.edit') : t('view.task.form.create')} SkyIDE ${t('view.task.form.task')}`"
        class="form-skyide"
        :label-width="lang$ === 'en' ? 206 : 176"
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
            ref="skyide"
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
                    :label="`${t('view.task.FilePath')}:`"
                    prop="displayPath"
                >
                    <div>
                        <SdxwFileSelect
                            v-model="params.displayPath"
                            :string-model="true"
                            check-type="folder"
                            source="ceph"
                        />
                    </div>
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
                            :title="t('view.task.ImagePacInfo')"
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
            </SdxuArticlePanel>
            <SdxuArticlePanel
                :title="t('view.task.AdvanceSetting')"
                expandable
                :expanded.sync="showMoreSetting"
            >
                <div v-show="showMoreSetting">
                    <el-form-item
                        :label="`${t('view.task.AutoRelease')}:`"
                    >
                        <el-radio
                            :label="true"
                            v-model="autoRelease"
                        >
                            {{ t('widget.shareForm.Yes') }}
                        </el-radio>
                        <el-radio
                            :label="false"
                            v-model="autoRelease"
                        >
                            {{ t('widget.shareForm.No') }}
                        </el-radio>
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.task.KernalReleaseTime')}:`"
                        v-if="autoRelease"
                    >
                        <el-input-number
                            v-model="notebookKernelExpireTime"
                            :min="3"
                        />
                        <span
                            class="form-tip"
                            style="margin-left:10px;"
                        >
                            {{ t('view.task.ExceedKernalReleaseTime') }}
                        </span>
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.task.PodReleaseTime')}:`"
                        v-if="autoRelease"
                    >
                        <el-input-number
                            v-model="podExpireTime"
                            :min="30"
                        />
                        <span
                            class="form-tip"
                            style="margin-left:10px;"
                        >
                            {{ t('view.task.ExceedPodReleaseTime') }}
                        </span>
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
import { updateTask, getDataSet } from '@sdx/utils/src/api/task';
import { createProjectTask } from '@sdx/utils/src/api/project';
import { getImageList } from '@sdx/utils/src/api/image';
import { nameWithChineseValidator, descValidator} from '@sdx/utils/src/helper/validate';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
import DataSourceSelect from './DataSourceSelect';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import projectDetailMixin from './projectDetailMixin';
import ElRadio from 'element-ui/lib/radio';
import FileSelect from '@sdx/widget/components/file-select';
import Appender from '@sdx/ui/components/appender';
import DropdownTip from '@sdx/ui/components/dropdown-tip';
import IconButton from '@sdx/ui/components/icon-button';
import Scroll from '@sdx/ui/components/scroll';
import ArticlePanel from '@sdx/ui/components/article-panel';

const RESOURCE_KEY = 'DEPLOY';

export default {
    name: 'SkyIdeForm',
    mixins: [locale, projectDetailMixin],
    components: {
        BaseForm,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        SdxuInput,
        SdxwResourceConfig,
        DataSourceSelect,
        [InputNumber.name]: InputNumber,
        ElRadio,
        [Button.name]: Button,
        [Appender.name]: Appender,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
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
                uuid: '',
                name: '',
                description: '',
                type: 'SKYIDE',
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
                project: '',
                displayPath: ''
            },
            projectId: this.$route.params.projectId,
            autoRelease: true,
            notebookKernelExpireTime: 3,
            podExpireTime: 30,
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
                displayPath: [
                    { required: true, message: this.t('view.task.EnterFilePath'), trigger: 'blur'}
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
            this.params.notebookKernelExpireTime = !this.autoRelease ? 0 : this.notebookKernelExpireTime * 60;
            this.params.podExpireTime = !this.autoRelease ? 0 : this.podExpireTime * 60;
            this.$refs.skyide.validate().then(() => {
                this.params.resourceConfig = JSON.stringify(this.params.resourceConfigObj);
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
            this.autoRelease = this.params.notebookKernelExpireTime !== 0 && this.params.podExpireTime !== 0;
            this.notebookKernelExpireTime = this.params.notebookKernelExpireTime / 60;
            this.podExpireTime = this.params.podExpireTime / 60;
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
            this.$refs.skyide.clearValidate('resourceConfig');
        }
    }
};
</script>
