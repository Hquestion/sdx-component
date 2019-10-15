<template>
    <div class="sdxv-data-info">
        <div 
            v-if="datasources.length" 
            class="sdxv-data-info__container"
        >
            <span class="sdxv-data-info__container--title">{{ t('view.task.DataSourceInformation') }}</span>
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
            <span class="sdxv-data-info__container--title">{{ t('view.task.DataSet') }}</span>
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
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvDataInfo',
    mixins: [locale],
    props: {
        datasources: {
            type: Array,
            default: () => []
        },
        datasets: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>

</style>
