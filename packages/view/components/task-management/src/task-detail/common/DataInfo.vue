<template>
    <div class="sdxv-data-info">
        <div 
            v-if="datasources.length" 
            class="sdxv-data-info__container"
        >
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
        <div 
            v-if="datasets.length" 
            class="sdxv-data-info__container"
        >
            <span class="sdxv-data-info__container--title">数据集</span>
            <div class="sdxv-data-info__container--content">
                <div
                    v-for="(item, i) in datasets"
                    :key="i"
                    class="sdxv-data-dataset"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SdxvDataInfo',
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
