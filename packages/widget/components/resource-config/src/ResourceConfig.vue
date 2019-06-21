
<template>
    <div class="sdxw-resource-config">
        <div v-if="type === 'cpu'">
            <div class="sdxw-resource-config__title">
                <span v-if="required">*</span>  {{ cpulabel }}
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
                    <div class="sdxw-resource-config__selectoption">
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
            <div class="sdxw-resource-config__title">
                <span v-if="required">*</span> {{ gpulabel }}
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
                    <div class="sdxw-resource-config__selectoption">
                        <i class="sdxw-resource-config__icon" />
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
                    <div class="sdxw-resource-config__selectoption">
                        <i class="sdxw-resource-config__icon" />
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

import Select from 'element-ui/lib/select';
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
        },
        required: {
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
                    label: `${ Math.ceil(cpu/1000)}C   ${Math.ceil(memory / (1024*1024*1024))}GB`,
                    value: {
                        cpu: Math.ceil(cpu/1000),
                        memory:  Math.ceil(memory / (1024*1024*1024)),
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
                    label: `${label}   ${Math.ceil(count)}块`,
                    value: {
                        label,
                        count: Math.ceil(count),
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

