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

import { getTaskResourceStatistics } from '@sdx/utils/src/api/task';
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
            Promise.all([getClusterResourceMonitor(), getTaskResourceStatistics({ all: true })]).then(([clusterResource, usedInfoList]) => {
                const total = clusterResource && clusterResource.total || {
                    cpu: 0,
                    gpu: 0,
                    memory: 0,
                    gpuModels: []
                };
                this.allocations = {
                    cpu: total.cpu,
                    gpu: total.gpu,
                    memory: byteToGB(total.memory)
                };

                const gpuModels = {};
                total.gpuModels.forEach(item => {
                    if (gpuModels.hasOwnProperty(item)) {
                        gpuModels[item]++;
                    } else {
                        gpuModels[item] = 1;
                    }
                });
                this.gpuModelAllocations = gpuModels;

                const usedInfo = usedInfoList && usedInfoList.data.length > 0 ? usedInfoList.data[0] : {
                    cpu: 0,
                    gpus: {},
                    memory: 0
                };
                this.used = {
                    cpu: parseMilli(usedInfo.cpu),
                    gpu: usedInfo.gpu,
                    memory: byteToGB(usedInfo.memory)
                };
                
                const usedMap = {};
                usedInfo.gpu_detail.forEach(item => {
                    if (item.gpu_model) {
                        usedMap[item.gpu_model] = item.num;
                    }
                });
                this.gpuModelUsedMap = usedMap;
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
