<template>
    <div
        class="sdxv-log-info"
        :class="{'is-dark': isDark}"
    >
        <div class="sdxv-log-info__switch">
            <div class="sdxv-log-info__switch--item">
                <span>{{ t('view.task.AutoPull') }}：</span>
                <el-switch
                    v-model="autoPull"
                    active-color="#3a845d"
                    inactive-color="#6B778C"
                />
            </div>
            <div class="sdxv-log-info__switch--item">
                <span>{{ t('view.task.RollingFollow') }}：</span>
                <el-switch
                    v-model="followScroll"
                    active-color="#3a845d"
                    inactive-color="#6B778C"
                />
            </div>
        </div>
        <SdxwPodLog
            :auto-pull="autoPull"
            :follow-scroll="followScroll"
            :method="method"
            :pod-name="podName"
            :is-dark="!isDark"
            :started-at="startedAt"
        />
    </div>
</template>

<script>
import SdxwPodLog from '@sdx/widget/components/pod-log';
import ElSwitch from 'element-ui/lib/switch';

import locale from '@sdx/utils/src/mixins/locale';


export default {
    name: 'SdxvLogInfo',
    mixins: [locale],
    components: {
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
        },
        startedAt: {
            type: String,
            required: true
        },
        isDark: {
            type: Boolean,
            default: false
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
