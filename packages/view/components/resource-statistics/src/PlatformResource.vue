<template>
    <div class="sdxv-platform-resource">
        <div class="sdxv-platform-resource__title">
            <span>平台资源</span>
        </div>
        <div class="sdxv-platform-resource__chart">
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartProcess
                    :used="used.cpu"
                    :total="allocations.cpu"
                />
                <SdxvResourceInfo
                    type="cpu"
                    :used="used.cpu"
                    :total="allocations.cpu"
                />
            </div>
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartGPU
                    :used="gpuModelUsedMap"
                    :allocations="gpuModelAllocations"
                />
                <SdxvResourceInfo
                    type="gpu"
                    :used="used.gpu"
                    :total="allocations.gpu"
                />
            </div>
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartProcess 
                    :used="used.memory"
                    :total="allocations.memory"
                />
                <SdxvResourceInfo
                    type="mem"
                    :used="used.memory"
                    :total="allocations.memory"
                />
            </div>
        </div>
    </div>
</template>

<script>
import SdxvChartGPU from './ChartGPU';
import SdxvResourceInfo from './ResourceInfo';
import SdxvChartProcess from './ChartProcess';

import { getResourceStates } from '@sdx/utils/src/api/resource';
import { getTaskList } from '@sdx/utils/src/api/project';
import { byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';
import { STATE_TYPE } from '@sdx/utils/src/const/task';

export default {
    name: 'SdxvPlatformResource',
    components: {
        SdxvChartGPU,
        SdxvResourceInfo,
        SdxvChartProcess
    },
    data() {
        return {
            allocations: {
                cpu: 0,
                gpu: 0,
                memory: 0
            },
            used: {
                cpu: 0,
                gpu: 0,
                memory: 0
            },
            gpuModelAllocations: [],
            gpuModelUsedMap: {}
        };
    },
    methods: {
        fetchData() {
            // todo: 轮询？？？
            // 平台资源使用量 参数
            const params = {
                groupBy: 'NAMESPACE',
                states: `${STATE_TYPE.RUNNING},${STATE_TYPE.LAUNCHING},${STATE_TYPE.KILLING}`
            };
            Promise.all([getResourceStates(true), getTaskList(params)]).then(([allocations, usedInfoList]) => {
                this.allocations = {
                    cpu: parseMilli(allocations.cpu),
                    gpu: allocations.gpus.reduce((sum, item) => {
                        return sum + item.count;
                    }, 0),
                    memory: byteToGB(allocations.memory)
                };
                let usedInfo = usedInfoList && usedInfoList.items.length > 0 ? usedInfoList.items[0].quota : {
                    cpu: 0,
                    gpus: {},
                    memory: 0
                };
                this.used = {
                    cpu: parseMilli(usedInfo.cpu),
                    gpu: Object.values(usedInfo.gpus).reduce((sum, value) => {
                        return sum + value;
                    }, 0),
                    memory: byteToGB(usedInfo.memory)
                };
                this.gpuModelAllocations = allocations.gpus;
                this.gpuModelUsedMap = usedInfo.gpus;
            }).catch(() => {
                this.gpuModelAllocations = [];
                this.gpuModelUsedMap = {};
            });
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>

</style>
