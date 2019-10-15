<template>
    <div class="sdxv-platform-resource">
        <div class="sdxv-platform-resource__title">
            <span>{{ t('view.monitor.resourceStatistic.PlatformResources') }}</span>
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

import { getTaskList } from '@sdx/utils/src/api/project';
import { getClusterResourceMonitor } from '@sdx/utils/src/api/system';
import { byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';
import { STATE_TYPE } from '@sdx/utils/src/const/task';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvPlatformResource',
    mixins: [locale],
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
            gpuModelAllocations: {},
            gpuModelUsedMap: {}
        };
    },
    methods: {
        fetchData() {
            // 平台资源使用量 参数
            const params = {
                groupBy: 'NAMESPACE',
                states: `${STATE_TYPE.RUNNING},${STATE_TYPE.LAUNCHING},${STATE_TYPE.KILLING}`
            };
            Promise.all([getClusterResourceMonitor(), getTaskList(params)]).then(([clusterResource, usedInfoList]) => {
                const total = clusterResource && clusterResource.total || {
                    cpu: 0,
                    gpu: 0,
                    memory: 0,
                    gpuModels: []
                };
                const gpuModels = {};
                this.allocations = {
                    cpu: total.cpu,
                    gpu: total.gpu,
                    memory: byteToGB(total.memory)
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
                total.gpuModels.forEach(item => {
                    if (gpuModels.hasOwnProperty(item)) {
                        gpuModels[item]++;
                    } else {
                        gpuModels[item] = 1;
                    }
                });
                this.gpuModelAllocations = gpuModels;
                this.gpuModelUsedMap = usedInfo.gpus;
            }).catch(() => {
                this.gpuModelAllocations = {};
                this.gpuModelUsedMap = {};
                this.allocations = {
                    cpu: 0,
                    gpu: 0,
                    memory: 0
                };
                this.used = {
                    cpu: 0,
                    gpu: 0,
                    memory: 0
                };
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
