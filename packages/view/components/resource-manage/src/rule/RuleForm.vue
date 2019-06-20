<template>
    <div
        class="rule-form"
        :class="[`rule-form--${mode}`]"
    >
        <el-form
            :model="params"
            :label-position="labelPosition"
            label-width="185px"
        >
            <el-form-item
                label="同时运行的任务总数"
                prop="maxConcurrentTasks"
            >
                <span>小于等于</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    :min="-1"
                    v-if="!readonly"
                    v-model="params.maxConcurrentTasks"
                />
                <InputReadonly
                    v-else
                    size="regular"
                >
                    {{ params.maxConcurrentTasks }}
                </InputReadonly>
                <span>个</span>
            </el-form-item>
            <el-form-item
                label="同时运行的高资源任务总数"
                prop="heavyTaskArr"
            >
                <span>资源设置大于等于</span>
                <ElSelect
                    v-if="!readonly"
                    v-model="cpuTplInput"
                    placeholder="请选择"
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
                <span>的任务总数小于等于</span>
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
                <span>个</span>
            </el-form-item>
            <el-form-item
                label="同时占用GPU总数"
                prop="maxGpus"
            >
                <span>小于等于</span>
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
                <span>块</span>
            </el-form-item>
            <el-form-item
                label="单个GPU任务运行时长"
                prop="maxGpuTime"
            >
                <span>小于等于</span>
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
                <span>小时</span>
            </el-form-item>
            <el-form-item
                label="单个非GPU任务运行时长"
                prop="maxCpuTime"
            >
                <span>小于等于</span>
                <SdxuInput
                    :inline="true"
                    type="number"
                    v-if="!readonly"
                    v-model="maxCpuTimeDay"
                />
                <InputReadonly
                    size="regular"
                    v-else
                >
                    {{ params.maxCpuTime | secToDay }}
                </InputReadonly>
                <span>天</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import InputReadonly from './InputReadonly';

import { deepCopy } from '@sdx/utils/src/helper/tool';
import { getResourceConfigDetail, getResourceTmplList, saveResourceConfig } from '@sdx/utils/src/api/resource';
import { Select, Form, FormItem } from 'element-ui';
import { byteToGB, secToHour, secToDay, cpuTplFriendly, hourToSec, dayToSec, parseMilli } from '@sdx/utils/src/helper/transform';

export default {
    name: 'RuleForm',
    data() {
        return {
            params: {
                maxConcurrentTasks: 0,
                heavyTaskArr: [],
                maxGpus: 0,
                maxGpuTime: 0,
                maxCpuTime: 0,
            },
            resourceTmplList: [],
            defaultConfig: {}
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
        maxCpuTimeDay: {
            get() {
                return secToDay(this.params.maxCpuTime || 0);
            },
            set(val) {
                this.params.maxCpuTime = dayToSec(+val);
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
            getResourceConfigDetail(this.userId).then(res => {
                const heavyTaskArr = [];
                heavyTaskArr[0] = res.heavyTaskThreshold;
                heavyTaskArr[1] = res.maxConcurrentHeavyTasks || 0;
                res.heavyTaskArr = heavyTaskArr;
                this.params = Object.assign(this.params, res);
                this.defaultConfig = deepCopy(this.params);
            });
        },
        save() {
            saveResourceConfig(this.params.uuid, {
                maxConcurrentTasks: +this.params.maxConcurrentTasks,
                maxConcurrentHeavyTasks: +this.params.heavyTaskArr[1],
                maxGpuTime: +this.params.maxGpuTime,
                maxCpuTime: +this.params.maxCpuTime,
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
                maxConcurrentTasks: +this.params.maxConcurrentTasks,
                maxConcurrentHeavyTasks: +this.params.heavyTaskArr[1],
                maxGpuTime: +this.params.maxGpuTime,
                maxCpuTime: +this.params.maxCpuTime,
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
