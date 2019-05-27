<template>
    <div class="sdxv-data-info">
        <div class="sdxv-data-info__container">
            <span class="sdxv-data-info__container--title">数据源信息</span>
            <div class="sdxv-data-info__container--content">
                <div
                    v-for="(item, i) in datasources"
                    :key="i"
                    class="sdxv-data-datasource"
                >
                    <div class="sdxv-data-datasource__name">
                        {{ item.name }}
                    </div>
                    <div class="sdxv-data-datasource__info">
                        <div class="sdxv-data-datasource__info--item">
                            <span>SKYTSDB_HOST: </span>
                            <span>{{ item.host }}</span>
                        </div>
                        <div class="sdxv-data-datasource__info--item">
                            <span>SKYTSDB_PORT: </span>
                            <span>{{ item.port }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sdxv-data-info__container">
            <span class="sdxv-data-info__container--title">数据集</span>
            <div class="sdxv-data-info__container--content">
                <div
                    v-for="(item, i) in datasets"
                    :key="i"
                    class="sdxv-data-dataset"
                >
                    <SdxuButton
                        :plain="true"
                        @click="handleGotoDataset(item)"
                    >
                        {{ item.name }}
                    </SdxuButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'SdxvDataInfo',
    components: {
        SdxuButton
    },
    props: {
        datasources: {
            type: Array,
            default: () => []
        },
        datasets: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleGotoDataset(item) {
            // todo:
        }
    }
};
</script>

<style>

</style>
