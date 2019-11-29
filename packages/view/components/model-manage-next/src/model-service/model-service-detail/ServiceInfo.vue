<template>
    <div class="sdxv-model-service-info">
        <SdxuArticlePanel :title="t('view.model.BasicInformation')">
            <el-form :label-width="labelWidth">
                <el-form-item :label="t('view.model.ServiceName') + ':'">
                    {{ serviceInfo.name || '-' }}
                </el-form-item>
                <el-form-item :label="t('view.model.ServiceState') + ':'">
                    <SdxwFoldLabel
                        :plain="true"
                        :type="STATE_MAP_FOLD_LABEL_TYPE[serviceInfo.state]"
                    >
                        {{ t(STATE_TYPE_LABEL[serviceInfo.state]) }}
                    </SdxwFoldLabel>
                </el-form-item>
                <el-form-item :label="t('view.model.PublishedTime') + ':'">
                    {{ dateFormatter(serviceInfo.createdAt) || '-' }}
                </el-form-item>
            </el-form>
        </SdxuArticlePanel>
        <SdxuArticlePanel :title="t('view.task.RunningInformation')">
            <el-form :label-width="labelWidth">
                <el-form-item :label="t('view.task.RuntimeEnvironment') + ':'">
                    {{ image.name || '-' }}
                </el-form-item>
                <el-form-item :label="t('view.task.StartupTime') + ':'">
                    {{ dateFormatter(serviceInfo.startedAt) || '-' }}
                </el-form-item>
                <el-form-item :label="t('view.task.StopTime') + ':'">
                    {{ dateFormatter(serviceInfo.stoppedAt) || '-' }}
                </el-form-item>
                <el-form-item :label="t('view.task.RunningTime') + ':'">
                    {{ calculateDateDiffFormatter(serviceInfo.startedAt, serviceInfo.stoppedAt) || '-' }}
                </el-form-item>
            </el-form>
        </SdxuArticlePanel>
        <SdxuArticlePanel :title="t('view.task.ResourceInformation')">
            <el-form :label-width="labelWidth">
                <el-form-item label="CPU:">
                    {{ (serviceInfo && serviceInfo.runtimeResource && parseMilli(serviceInfo.runtimeResource.cpus) || 0) + t('view.task.Core') }}
                </el-form-item>
                <el-form-item :label="t('view.task.Memory') + ':'">
                    {{ serviceInfo && serviceInfo.runtimeResource && byteToGB(serviceInfo.runtimeResource.memory) || 0 }}GB
                </el-form-item>
                <el-form-item label="GPU:">
                    {{ (serviceInfo && serviceInfo.runtimeResource && serviceInfo.runtimeResource.gpus || 0) + t('view.task.Block') }}
                </el-form-item>
                <el-form-item :label="t('view.task.InstanceCount') + ':'">
                    {{ (serviceInfo && serviceInfo.instances || 0) + t('view.task.Count') }}
                </el-form-item>
            </el-form>
        </SdxuArticlePanel>
    </div>
</template>

<script>
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import SdxuArticlePanel from '@sdx/ui/components/article-panel'; 
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import { STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';
import { dateFormatter, calculateDateDiffFormatter, byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'ServiceInfo',
    mixins: [locale],
    components: {
        ElForm,
        ElFormItem,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        SdxuArticlePanel
    },
    props: {
        serviceInfo: {
            type: Object,
            required: true
        },
        image: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            STATE_TYPE_LABEL,
            STATE_MAP_FOLD_LABEL_TYPE
        };
    },
    computed: {
        labelWidth() {
            return this.lang$ === 'en' ? '160px' : '100px';
        }
    },
    methods: {
        dateFormatter(date) {
            return dateFormatter(date);
        },
        calculateDateDiffFormatter(start, stop) {
            return calculateDateDiffFormatter(start, stop);
        },
        byteToGB(memory) {
            return byteToGB(memory);
        },
        parseMilli(cpu) {
            return parseMilli(cpu);
        }
    }
};
</script>

<style>

</style>
