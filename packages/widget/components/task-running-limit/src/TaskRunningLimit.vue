<template>
    <el-alert
        v-if="maxCpuTime && maxGpuTime"
        type="info"
        :closable="false"
        style="height: 50px;background-color: #DEEBFF;color: #13264D;"
    >
        <div slot="title">
            <svg
                style="width: 1em; height: 1em;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                        font-size: 14px;
                        margin-right: 4px;"
                aria-hidden="true"
            >
                <use xlink:href="#sdx-tiaofutishi" />
            </svg>
            {{ t('widget.taskRunningLimit.info1') + maxGpuTime + t('widget.taskRunningLimit.info2') + maxCpuTime + t('widget.taskRunningLimit.info3') }}
        </div>
    </el-alert>
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
