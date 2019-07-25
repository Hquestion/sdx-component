
<template>
    <div class="sdxw-resource-config">
        <div v-if="type === 'cpu'">
            <div class="sdxw-resource-config__title">
                <span v-if="required">*</span>  {{ cpulabel }}
            </div>
            <el-select
                :searchable="true"
                size="small"
                :placeholder="`${t('widget.resourceConfig.Please_select')}${cpulabel}`"
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
                            <span>CPU</span> <span>{{ `${item.value.cpu} ${t('widget.resourceConfig.Core')}` }}</span>
                        </div>
                        <div>
                            <span>{{ t('widget.resourceConfig.Memory') }}</span><span>{{ `${item.value.memory} GB` }}</span>
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
                :placeholder="`${t('widget.resourceConfig.Please_select')}${t('widget.resourceConfig.GPU')}`"
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
                            <span>{{ t('widget.resourceConfig.Model') }}</span> <span>{{ item.value.label }}</span>
                        </div>
                        <div>
                            <span>{{ t('widget.resourceConfig.Number') }}</span><span>{{ `${item.value.count} ${t('widget.resourceConfig.Piece')}` }}</span>
                        </div>
                    </div>
                </el-option>
            </el-select>
        </div>
        <div v-if="type === 'onlycpu'">
            <el-select
                size="small"
                :placeholder="t('widget.resourceConfig.Please_select_resource_allocation')"
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
                            <span>CPU</span> <span>{{ `${item.value.cpu} ${t('widget.resourceConfig.Core')}` }}</span>
                        </div>
                        <div>
                            <span>{{ t('widget.resourceConfig.Memory') }}</span><span>{{ `${item.value.memory} GB` }}</span>
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
import locale from '@sdx/utils/src/mixins/locale';
import { t } from '@sdx/utils/src/locale';
export default {
    name: 'ResourceConfig',
    mixins: [locale],
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
            default: () => t('widget.resourceConfig.CPU_Memory') // 'CPU/内存'
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
        },
        showError: {
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
                    label: `${ Math.ceil(cpu/1000)} C   ${Math.ceil(memory / (1024*1024*1024))} GB`,
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
                    label: `${label}   ${Math.ceil(count)} ${this.t('widget.resourceConfig.Piece')}`,
                    value: {
                        label,
                        count: Math.ceil(count),
                        uuid: `${label}-${count}`
                    },
                    uuid: `${label}-${count}`
                };
            });
            return GPU;
        },
        getResourceList (start, count, type, params) {
            getResourceTmplList(start, count, type, params)
                .then(data => {
                    for (let i= 0; i<data.items.length; i++) {
                        if(type === 'CPU') {
                            this.resourceCPU.push(data.items[i]);
                        } else if (type === 'GPU') {
                            this.resourceGPU.push(data.items[i]);
                        }
                    }

                    let [uuidCPUArr, uuidGPUArr]=[[], []];
                    this.dealCPU(this.resourceCPU).map(item => {
                        uuidCPUArr.push(item.uuid);
                    });
                    this.dealGPU(this.resourceGPU).map(item => {
                        uuidGPUArr.push(item.uuid);
                    });
                    if(!uuidGPUArr.includes(this.value.uuid) && this.value.uuid) {
                        this.$emit('input', {
                            label: '0',
                            count: 0,
                            uuid: '0-0'
                        });
                    }
                    if(!uuidCPUArr.includes(this.value.uuid) && this.value.uuid) {
                        this.$emit('input', {
                            cpu: 0,
                            memory: 0,
                            uuid: '0-0'
                        });
                    }
                    
                });
        }
    },
    created() {
        this.getResourceList(1, -1, 'CPU', {order: 'asc', orderBy:'cpu'});
        this.getResourceList(1, -1, 'GPU', {order: 'asc', orderBy: 'gpu'});

    }
};
</script>

