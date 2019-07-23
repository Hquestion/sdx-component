<template>
    <div class="sdxv-log-list">
        <div
            v-for="(item, i) in pods"
            :key="i"
            class="sdxv-log-list__item"
        >
            <span class="sdxv-log-list__item--name">{{ item.name }}</span>
            <div class="sdxv-log-list__item--btn">
                <SdxuButton
                    :plain="true"
                    :invert="true"
                    size="small"
                    @click="handleGotoLogPage(item.name, 'tail')"
                >
                    {{ t('view.task.TailView') }}
                </SdxuButton>
                <SdxuButton
                    :plain="true"
                    :invert="true"
                    size="small"
                    @click="handleGotoLogPage(item.name, 'head')"
                >
                    {{ t('view.task.HeadView') }}
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvLogList',
    mixins: [locale],
    components: {
        SdxuButton
    },
    props: {
        pods: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleGotoLogPage(podId, method) {
            this.$router.push({name: 'SdxvTaskManagementTaskLog', params: {
                method: method,
                podName: podId
            }});
        }
    }
};
</script>

<style>

</style>
