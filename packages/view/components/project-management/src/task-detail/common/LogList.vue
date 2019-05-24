<template>
    <div class="sdxv-log-list">
        <div
            v-for="(item, i) in logList"
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
                    tail查看
                </SdxuButton>
                <SdxuButton
                    :plain="true"
                    :invert="true"
                    size="small"
                    @click="handleGotoLogPage(item.name, 'head')"
                >
                    head查看
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'SdxvLogList',
    components: {
        SdxuButton
    },
    props: {
        pods: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // todo: 待删除
            logList: [{
                taskId: 'sfasfasf',
                name: 'test1'
            }, {
                taskId: 'sfasf',
                name: 'test2'
            }, {
                taskId: 'sdfsag',
                name: 'test3'
            }]
        };
    },
    methods: {
        handleGotoLogPage(podId, method) {
            this.$router.push(`/sdxv-project-manage/logInfo/${method}/${podId}`);
        }
    }
};
</script>

<style>

</style>
