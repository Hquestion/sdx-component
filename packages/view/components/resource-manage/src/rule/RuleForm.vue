<template>
    <div
        class="rule-form"
        :class="[`rule-form--${mode}`]"
        v-loading="loading"
    >
        <el-form
            :model="params"
            :label-position="labelPosition"
            :label-width="lang$ === 'en' ? '270px' : '185px'"
        >
            <el-form-item
                :label="t('view.resourceManage.maxConcurrentTasks')"
                prop="maxConcurrentTasks"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
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
                prop="maxCpuTime"
            >
                <span>{{ t('view.resourceManage.LessOrEqual') }}</span>
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

export default {
    name: 'RuleForm',
    mixins: [locale],
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
            defaultConfig: {},
            loading: false
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
