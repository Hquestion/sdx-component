<template>
    <SdxuContentPanel
        :title="method + t('sdxCommon.Log')"
        class="sdxv-log-info"
    >
        <template
            v-if="method === 'tail'"
            #right
        >
            <div class="sdxv-log-info__switch">
                <div class="sdxv-log-info__switch--item">
                    <span>{{ t('view.task.AutoPull') }}：</span>
                    <el-switch
                        v-model="autoPull"
                    />
                </div>
                <div class="sdxv-log-info__switch--item">
                    <span>{{ t('view.task.RollingFollow') }}：</span>
                    <el-switch
                        v-model="followScroll"
                    />
                </div>
            </div>
        </template>
        <template #default>
            <SdxwPodLog
                :auto-pull="autoPull"
                :follow-scroll="followScroll"
                :method="method"
                :pod-name="podName"
            />
        </template>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxwPodLog from '@sdx/widget/components/pod-log';
import ElSwitch from 'element-ui/lib/switch';

import locale from '@sdx/utils/src/mixins/locale';


export default {
    name: 'SdxvLogInfo',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxwPodLog,
        ElSwitch
    },
    props: {
        podName: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            autoPull: false,
            followScroll: false
        };
    }
};
</script>

<style>

</style>
