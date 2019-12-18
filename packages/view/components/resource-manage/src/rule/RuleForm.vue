<template>
    <div
        class="rule-form"
        :class="[`rule-form--${mode}`]"
        v-loading="loading"
    >
        <el-form
            :model="params"
            :rules="rules"
            :label-position="labelPosition"
            :label-width="lang$ === 'en' ? '300px' : '255px'"
        >
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentSkyIDETasks')"
                prop="maxConcurrentSkyideTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentSkyideTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentSkyideTasks }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentJupyterTasks')"
                prop="maxConcurrentJupyterTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentJupyterTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentJupyterTasks }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentContainerTasks')"
                prop="maxConcurrentContainerTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentContainerTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentContainerTasks }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentSkyFlowTasks')"
                prop="maxConcurrentSkyflowTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentSkyflowTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentSkyflowTasks }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentModelTasks')"
                prop="maxConcurrentModelTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentModelTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentModelTasks }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.TotalConcurrentHighResourceTasks')"
                prop="heavyTaskArr"
            >
                <span>{{ t('view.resourceManage.MoreOrEqual') }}</span>
                <ElSelect
                    v-if="!readonly"
                    v-model="cpuTplInput"
                    :placeholder="t('view.resourceManage.PleaseSelect')"
                >
                    <ElOption
                        v-for="(item, index) in resourceTmplList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </ElSelect>
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.heavyTaskArr[0] | cpuTplFriendly }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.CountOfTotalTasksLessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.heavyTaskArr[1]"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.heavyTaskArr[1] }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.NumberUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.GPUsOccupied')"
                prop="maxGpus"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    v-if="!readonly"
                    v-model="params.maxGpus"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxGpus }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.PieceUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.GpuTaskRunDuration')"
                prop="maxGpuTime"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    v-if="!readonly"
                    v-model="maxGpuTimeHour"
                />
                <InputReadonly
                    size="regular"
                    v-else
                >
                    {{ params.maxGpuTime | secToHour }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.HourUnit') }}</span>
            </el-form-item>
            <el-form-item
                :label="t('view.resourceManage.NonGroupTaskRunDuration')"
                prop="maxNonGpuTime"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    v-if="!readonly"
                    v-model="maxNonGpuTimeDay"
                />
                <InputReadonly
                    size="regular"
                    v-else
                >
                    {{ params.maxNonGpuTime | secToDay }}
                </InputReadonly>
                <span>{{ t('view.resourceManage.DayUnit') }}</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import InputReadonly from './InputReadonly';

import { deepCopy } from '@sdx/utils/src/helper/tool';
import { getResourceConfigDetail, getResourceTmplList, saveResourceConfig } from '@sdx/utils/src/api/resource';
import { Form, FormItem } from 'element-ui';
import Select from 'element-ui/lib/select';
import { byteToGB, secToHour, secToDay, cpuTplFriendly, hourToSec, dayToSec, parseMilli } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';

const numberReg = /^[1-9]\d*$/;

export default {
    name: 'RuleForm',
    mixins: [locale],
    data() {
        const self = this;
        return {
            params: {
                maxConcurrentSkyideTasks: 0,
                maxConcurrentJupyterTasks: 0,
                maxConcurrentContainerTasks: 0,
                maxConcurrentSkyflowTasks: 0,
                maxConcurrentModelTasks: 0,
                heavyTaskArr: [],
                maxGpus: 0,
                maxGpuTime: 0,
                maxNonGpuTime: 0,
            },
            resourceTmplList: [],
            defaultConfig: {},
            loading: false,
            rules: {
                maxConcurrentSkyideTasks: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxConcurrentJupyterTasks: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxConcurrentContainerTasks: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxConcurrentSkyflowTasks: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxConcurrentModelTasks: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxGpus: [
                    {
                        pattern: numberReg,
                        message: this.t('view.resourceManage.Please input a positive integer'),
                        trigger: 'blur'
                    }
                ],
                maxGpuTime: [
                    {
                        validator(rule, value, callback) {
                            if (value && numberReg.test(value)) {
                                callback();
                            } else {
                                callback(self.t('view.resourceManage.Please input a positive integer'));
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                maxNonGpuTime: [
                    {
                        validator(rule, value, callback) {
                            if (value && numberReg.test(value)) {
                                callback();
                            } else {
                                callback(self.t('view.resourceManage.Please input a positive integer'));
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                heavyTaskArr: [
                    {
                        validator(rule, value, callback) {
                            if (!value[0]) {
                                callback(self.t('view.resourceManage.Please select a resource template'));
                            } else if (!numberReg.test(value[1])) {
                                callback(self.t('view.resourceManage.Task limit can only be a positive integer'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    components: {
        InputReadonly,
        SdxuInput,
        [Select.name]: Select,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'h' // h, v
        },
        userId: {
            type: String,
            default: ''
        }
    },
    computed: {
        labelPosition() {
            return {
                h: 'right',
                v: 'top'
            }[this.mode];
        },
        cpuTplInput: {
            get() {
                const cpuTplInfo = this.params.heavyTaskArr[0];
                if (cpuTplInfo) {
                    return `${cpuTplInfo.cpu}/${cpuTplInfo.memory}`;
                } else {
                    return '';
                }
            },
            set(val) {
                const tplArr = val.split('/');
                this.$set(this.params.heavyTaskArr, 0, {
                    cpu: +tplArr[0],
                    memory: +tplArr[1]
                });
            }
        },
        maxGpuTimeHour: {
            get() {
                return secToHour(this.params.maxGpuTime || 0);
            },
            set(val) {
                this.params.maxGpuTime = hourToSec(+val);
            }
        },
        maxNonGpuTimeDay: {
            get() {
                return secToDay(this.params.maxNonGpuTime || 0);
            },
            set(val) {
                this.params.maxNonGpuTime = dayToSec(+val);
            }
        }
    },
    methods: {
        init() {
            getResourceTmplList(1, -1, 'CPU').then(res => {
                this.resourceTmplList = res.items.map(item => {
                    const { cpu, memory } = item;
                    return {
                        label: `${parseMilli(cpu)}C ${byteToGB(memory)}GB`,
                        value: `${cpu}/${memory}`
                    };
                });
            });
        },
        initResourceConfigDetail() {
            this.loading = true;
            getResourceConfigDetail(this.userId).then(res => {
                const heavyTaskArr = [];
                heavyTaskArr[0] = res.heavyTaskThreshold;
                heavyTaskArr[1] = res.maxConcurrentHeavyTasks || 0;
                res.heavyTaskArr = heavyTaskArr;
                this.params = Object.assign(this.params, res);
                this.defaultConfig = deepCopy(this.params);
            }).finally(() => {
                this.loading = false;
            });
        },
        save() {
            saveResourceConfig(this.userId, {
                maxConcurrentSkyideTasks: +this.params.maxConcurrentSkyideTasks,
                maxConcurrentJupyterTasks: +this.params.maxConcurrentJupyterTasks,
                maxConcurrentContainerTasks: +this.params.maxConcurrentContainerTasks,
                maxConcurrentSkyflowTasks: +this.params.maxConcurrentSkyflowTasks,
                maxConcurrentModelTasks: +this.params.maxConcurrentModelTasks,
                maxConcurrentHeavyTasks: +this.params.heavyTaskArr[1],
                maxGpuTime: +this.params.maxGpuTime,
                maxNonGpuTime: +this.params.maxNonGpuTime,
                maxGpus: +this.params.maxGpus,
                heavyTaskThreshold: this.params.heavyTaskArr[0]
            }).then(() => {
                this.defaultConfig = deepCopy(this.params);
            });
        },
        cancel() {
            this.params = Object.assign(this.params, this.defaultConfig);
        },
        getConfig() {
            return {
                maxConcurrentSkyideTasks: +this.params.maxConcurrentSkyideTasks,
                maxConcurrentJupyterTasks: +this.params.maxConcurrentJupyterTasks,
                maxConcurrentContainerTasks: +this.params.maxConcurrentContainerTasks,
                maxConcurrentSkyflowTasks: +this.params.maxConcurrentSkyflowTasks,
                maxConcurrentModelTasks: +this.params.maxConcurrentModelTasks,
                maxConcurrentHeavyTasks: +this.params.heavyTaskArr[1],
                maxGpuTime: +this.params.maxGpuTime,
                maxNonGpuTime: +this.params.maxNonGpuTime,
                maxGpus: +this.params.maxGpus,
                heavyTaskThreshold: this.params.heavyTaskArr[0],
                resourceUuid: this.params.uuid
            };
        }
    },
    filters: {
        secToHour,
        secToDay,
        cpuTplFriendly
    },
    mounted() {
        this.init();
    },
    watch: {
        userId: {
            immediate: true,
            handler() {
                this.initResourceConfigDetail();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .rule-form {
        & /deep/ .sdxu-input {
            margin: 0 5px;
            input {
                width: 110px;
            }
        }
        & /deep/ .el-select {
            margin: 0 5px;
            width: 110px;
        }
        & /deep/ .input-readonly {
            margin: 0 5px;
        }
        &.rule-form--v {
            & /deep/ .sdxu-input {
                margin: 0 5px;
                input {
                    width: 100px;
                }
            }
            & /deep/ .el-select {
                margin: 0 5px;
                width: 100px;
            }
        }
    }
</style>
