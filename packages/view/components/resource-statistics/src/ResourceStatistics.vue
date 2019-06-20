<template>
    <div class="sdxv-resource-statistics">
        <div class="sdxv-resource-statistics__item">
            <SdxvPlatformResource />
        </div>
        <div class="sdxv-resource-statistics__item">
            <SdxvUserResourceList
                title="用户资源使用Top10"
                :ranking="true"
            />
        </div>
        <div class="sdxv-resource-statistics__item">
            <SdxvTaskResourceRanking />
        </div>
    </div>
</template>

<script>
import SdxvPlatformResource from './PlatformResource';
import SdxvTaskResourceRanking from './TaskResourceRanking';
import SdxvUserResourceList from './UserResourceList';

export default {
    name: 'SdxvResourceStatisticsIndex',
    components: {
        SdxvPlatformResource,
        SdxvUserResourceList,
        SdxvTaskResourceRanking
    }
};
</script>

<style>

</style>
