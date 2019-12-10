<template>
    <div class="sdxv-dataset-card">
        <div class="sdxv-dataset-card__main">
            <div class="sdxv-dataset-card__main--info sdxv-dataset-card__info">
                <div class="sdxv-dataset-card__info--icon">
                    <img
                        :src="datasetInfo.image || ''"
                        alt="icon"
                    >
                </div>
                <div class="sdxv-dataset-card__info--detail sdxv-dataset-card__detail">
                    <div class="sdxv-dataset-card__detail--first">
                        <div @click="handleClickName">
                            {{ datasetInfo.name }}
                        </div>
                        <div>
                            <span>{{ datasetInfo.count + t('view.dataManagement.Count') + ' ' }}<b>{{ datasetInfo.fileType }}</b>{{ ' ' + t('view.dataManagement.Files') + ' ' + byteToMB(datasetInfo.size) + 'MB' }}</span>
                        </div>
                    </div>
                    <div class="sdxv-dataset-card__detail--second">
                        {{ datasetInfo.creator + ' ' + t('view.dataManagement.created_in') + dateFormatter(datasetInfo.createdAt) }}
                    </div>
                </div>
                <div class="sdxv-dataset-card__info--state">
                    <!-- // todo: 状态映射 -->
                    <SdxwFoldLabel
                        :plain="true"
                        type="die"
                    >
                        成功
                    </SdxwFoldLabel>
                </div>
            </div>
            <div class="sdxv-dataset-card__main--desc">
                {{ datasetInfo.description }}
            </div>
            <div class="sdxv-dataset-card__main--tags">
                <div
                    class="sdxv-dataset-card__tag"
                    v-for="item in datasetInfo.tags"
                    :key="item.name"
                >
                    <div>{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="sdxv-dataset-card__operation">
            <!-- // todo: 操作映射 -->
            <SdxuButton
                v-for="item in datasetInfo.operations"
                :key="item.value"
                :icon="item.icon"
                type="text"
                @click="handleOperate(item.value)"
            >
                {{ item.label }}
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import { byteToMB, dateFormatter } from '@sdx/utils/src/helper/transform';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'DatasetCard',
    mixins: [locale],
    components: {
        SdxuButton,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
    },
    props: {
        datasetInfo: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleOperate(operation) {
            // todo:
            this.$emit('operate', operation, this.datasetInfo);
        }, 
        handleClickName() {
            // todo:
            this.$emit('detail', this.datasetInfo.uuid);
        },
        byteToMB,
        dateFormatter
    }
};
</script>

<style>

</style>
