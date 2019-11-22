<template>
    <div class="sdxv-log-view">
        <div class="sdxv-log-view__content">
            <SdxuEmpty
                v-if="isEmpty"
                :empty-content="t('view.task.NoLog')"
                empty-type="sdx-wushuju"
            />
            <template v-else>
                <div class="sdxv-log-view__bar">
                    <div class="sdxv-log-view__bar--select">
                        <span>{{ t('view.task.Instance') }}：</span>
                        <el-select
                            v-if="pods.length > 1"
                            v-model="currentPod"
                            size="small"
                        >
                            <el-option
                                v-for="pod in pods"
                                :key="pod"
                                :value="pod"
                                :label="pod"
                            />
                        </el-select>
                        <span v-else>
                            {{ currentPod }}
                        </span>
                    </div>
                    <div class="sdxv-log-view__bar--method">
                        <TabRadioGroup v-model="currentMethod">
                            <TabRadioItem name="tail">
                                {{ t('view.task.TailView') }}
                            </TabRadioItem>
                            <TabRadioItem name="head">
                                {{ t('view.task.HeadView') }}
                            </TabRadioItem>
                        </TabRadioGroup>
                    </div>
                </div>
                <SdxvLogInfo
                    :pod-name="currentPod"
                    :method="currentMethod"
                    :is-dark="true"
                />
            </template>
        </div>
    </div>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuEmpty from '@sdx/ui/components/empty';
import SdxvLogInfo from './LogInfo';

export default {
    name: 'SdxvLogView',
    mixins: [locale],
    components: {
        SdxuEmpty,
        TabRadioGroup: TabRadio.TabRadioGroup,
        TabRadioItem: TabRadio.TabRadioItem,
        SdxvLogInfo
    },
    props: {
        isEmpty: {
            type: Boolean,
            default: false
        },
        pods: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentPod: this.pods[0] || '',
            currentMethod: 'tail'
        };
    }
};
</script>

<style>

</style>
