<template>
    <el-alert
        v-if="maxCpuTime && maxGpuTime"
        :title="t('widget.taskRunningLimit.info1') + maxGpuTime + t('widget.taskRunningLimit.info2') + maxCpuTime + t('widget.taskRunningLimit.info3')"
        type="info"
        show-icon
        :closable="false"
    />
</template>

<script>
import ElAlert from 'element-ui/lib/alert';
import locale from '@sdx/utils/src/mixins/locale';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { getResourceConfigDetail } from '@sdx/utils/src/api/resource';
export default {
    name: 'SdxwTaskRunningLimit',
    data() {
        return {
            maxCpuTime: '',
            maxGpuTime: '',
        };
    },
    mixins: [locale],
    components: {
        ElAlert
    },
    created() {
        this.fetchUserResource();
    },
    methods: {
        fetchUserResource() {
            getResourceConfigDetail(getUser().userId).then(res => {
                this.maxGpuTime = res.maxGpuTime ? res.maxGpuTime / 3600 : '';
                this.maxCpuTime = res.maxCpuTime ? res.maxCpuTime / 3600 / 24 : '';
            });
        }
    }
};
</script>
