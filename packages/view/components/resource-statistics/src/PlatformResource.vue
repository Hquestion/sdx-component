<template>
    <div class="sdxv-platform-resource">
        <div class="sdxv-platform-resource__title">
            <span>平台资源</span>
        </div>
        <div class="sdxv-platform-resource__chart">
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartProcess
                    :total="110"
                    :used="65"
                />
                <SdxvResourceInfo
                    type="cpu"
                    :total="110"
                    :used="65"
                />
            </div>
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartGPU />
                <SdxvResourceInfo
                    type="gpu"
                    :total="21"
                    :used="13"
                />
            </div>
            <div class="sdxv-platform-resource__chart--item">
                <SdxvChartProcess 
                    :total="216"
                    :used="173"
                />
                <SdxvResourceInfo
                    type="mem"
                    :total="216"
                    :used="173"
                />
            </div>
        </div>
    </div>
</template>

<script>
import SdxvChartGPU from './ChartGPU';
import SdxvResourceInfo from './ResourceInfo';
import SdxvChartProcess from './ChartProcess';

export default {
    name: 'SdxvPlatformResource',
    components: {
        SdxvChartGPU,
        SdxvResourceInfo,
        SdxvChartProcess
    }
};
</script>

<style>

</style>
