
<template>
    <div class="sdxv-project-task-resource">
        <div v-if="type === 'cpu'">
            <div class="title">
                {{ cpulabel }}
            </div>
            <el-select
                :searchable="true"
                size="small"
                :placeholder="`请选择${cpulabel}`"
                v-model="__value"
                value-key="uuid"
                :popper-append-to-body="false"
                :disabled="readOnly"
            >
                <el-option
                    v-for="(item) in dealCPU(resourceCPU)"
                    :key="item.uuid"
                    :value="item.value"
                    :label="item.label"
                >
                    <div class="selectOption">
                        <i class="icon" />
                        <div>
                            <span>CPU</span> <span>{{ `${item.value.cpu}核` }}</span>
                        </div>
                        <div>
                            <span>内存</span><span>{{ `${item.value.memory}GB` }}</span>
                        </div>
                    </div>
                </el-option>
            </el-select>
        </div>
        <div v-if="type === 'gpu'">
            <div class="title">
                {{ gpulabel }}
            </div>
            <el-select
                size="small"
                placeholder="请选择GPU"
                v-model="__value"
                value-key="uuid"
                :popper-append-to-body="false"
                :disabled="readOnly"
            >
                <el-option
                    v-for="(item) in dealGPU(resourceGPU)"
                    :key="item.uuid"
                    :value="item.value"
                    :label="item.label"
                >
                    <div class="selectOption">
                        <i class="icon" />
                        <div>
                            <span>型号</span> <span>{{ item.value.label }}</span>
                        </div>
                        <div>
                            <span>数量</span><span>{{ `${item.value.count}块` }}</span>
                        </div>
                    </div>
                </el-option>
            </el-select>
        </div>
        <div v-if="type === 'onlycpu'">
            <el-select
                size="small"
                placeholder="请选择资源配置"
                v-model="__value"
                value-key="uuid"
                :popper-append-to-body="false"
                :disabled="readOnly"
            >
                <el-option
                    v-for="(item) in dealCPU(resourceCPU)"
                    :key="item.uuid"
                    :value="item.value"
                    :label="item.label"
                >
                    <div class="selectOption">
                        <i class="icon" />
                        <div>
                            <span>CPU</span> <span>{{ `${item.value.cpu}核` }}</span>
                        </div>
                        <div>
                            <span>内存</span><span>{{ `${item.value.memory}GB` }}</span>
                        </div>
                    </div>
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>

import { Select } from 'element-ui';
import { getResourceTmplList } from '@sdx/utils/src/api/resource';

export default {
    name: 'ResourceConfig',
    props: {
        type: {
            type: String,
            default: 'onlycpu'
        },
        value: {
            type: Object,
            default: ()=> {}
        },
        cpulabel: {
            type: String,
            default: 'CPU/内存'
        },
        gpulabel: {
            type: String,
            default: 'GPU'
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            resourceCPU: [],
            resourceGPU: []
        };
    },
    components: {
        [Select.name]: Select,
    },
    computed: {
        __value: {
            get() {
                return this.value;
            },
            set(nval) {
                this.$emit('input', nval);
            }
        },
    },
    methods: {
        dealCPU(list) {
            const CPU = list.map(item => {
                const { cpu, memory ,uuid} = item;
                return {
                    label: `${ cpu/1000}C   ${memory / (1024*1024*1024)}GB`,
                    value: {
                        cpu: cpu/1000,
                        memory: memory / (1024*1024*1024),
                        uuid: `${cpu/1000}-${ memory / (1024*1024*1024)}`
                    },
                    uuid: `${cpu/1000}-${ memory / (1024*1024*1024)}`
                };
            });
            return CPU;
        },
        dealGPU(list) {
            const GPU = list.map(item => {
                const { label, count ,uuid} = item;
                return {
                    label: `${label}   ${count}块`,
                    value: {
                        label,
                        count,
                        uuid: `${label}-${count}`
                    },
                    uuid: `${label}-${count}`
                };
            });
            return GPU;
        }
    },
    created() {
        getResourceTmplList()
            .then(data=> {
                for (let i= 0; i<data.items.length; i++) {
                    if(data.items[i].templateType === 'CPU') {
                        this.resourceCPU.push(data.items[i]);
                    } else if (data.items[i].templateType === 'GPU') {
                        this.resourceGPU.push(data.items[i]);
                    }
                }
            });

    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .sdxv-project-task-resource {
       .title {
            color: #909399;
        }
        .selectOption {
            & > div {
                width: 130px;
                display: inline-block;
                vertical-align: middle;
                span:first-child {
                    color:#606266;
                    font-size: 13px;
                    padding: 0 12px 0 6px;
                }
                span:last-child {
                    color:#262B3E;
                    font-size: 14px;
                    font-weight:500;
                }
            }
            .icon {
                width: 4px;
                height: 4px;
                border-radius: 100%;
                display: inline-block;
                background: #457FF6;
                vertical-align: middle;
            }
        }
        .sdxw-file-select {
            max-width: 560px;
        }
    }
</style>
