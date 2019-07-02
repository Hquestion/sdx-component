<template>
    <div class="sdxv-resource-statistics">
        <div
            v-auth.system.button="'GLOBAL_RESOURCE:READ'"
            class="sdxv-resource-statistics__item"
        >
            <SdxvPlatformResource />
        </div>
        <div
            v-auth.system.button="'POD_REAL_RESOURCE:READ'"
            class="sdxv-resource-statistics__item"
        >
            <SdxvUserResourceList
                title="用户资源使用Top10"
                :ranking="true"
            />
        </div>
        <div
            v-auth.system.button="'POD_REAL_RESOURCE:READ'"
            class="sdxv-resource-statistics__item"
        >
            <SdxvTaskResourceRanking />
        </div>
    </div>
</template>

<script>
import SdxvPlatformResource from './PlatformResource';
import SdxvTaskResourceRanking from './TaskResourceRanking';
import SdxvUserResourceList from './UserResourceList';
import auth from '@sdx/widget/components/auth';

export default {
    name: 'SdxvResourceStatisticsIndex',
    directives: { auth },
    components: {
        SdxvPlatformResource,
        SdxvUserResourceList,
        SdxvTaskResourceRanking
    }
};
</script>

<style>

</style>
