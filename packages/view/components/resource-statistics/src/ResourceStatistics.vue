<template>
    <div class="sdxv-resource-statistics">
        <div class="sdxv-resource-statistics__item">
            <SdxvPlatformResource />
        </div>
        <div class="sdxv-resource-statistics__item">
            <SdxvUserResourceRanking />
        </div>
        <div class="sdxv-resource-statistics__item">
            <SdxvTaskResourceRanking />
        </div>
    </div>
</template>

<script>
import SdxvPlatformResource from './PlatformResource';
import SdxvUserResourceRanking from './UserResourceRanking';
import SdxvTaskResourceRanking from './TaskResourceRanking';

export default {
    name: 'SdxvResourceStatisticsIndex',
    components: {
        SdxvPlatformResource,
        SdxvUserResourceRanking,
        SdxvTaskResourceRanking
    }
};
</script>

<style>

</style>
