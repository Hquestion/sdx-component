<template>
    <div class="sdxv-data-info">
        <SdxuEmpty
            v-if="isEmpty"
            :empty-content="t('view.task.NoDataInfo')"
            empty-type="sdx-wushuju"
        />
        <template v-else>
            <SdxvInfoContainer 
                v-if="datasets.length"
            >
                <SdxvInfoItem
                    :label="t('view.task.DataSet')"
                    :whole-line="true"
                    :multi-line="true"
                    :strip="false"
                >
                    <template #value>
                        <div class="sdxv-data-info__container">
                            <div
                                v-for="(item, i) in datasets"
                                :key="i"
                                class="sdxv-data-info__container--item sdxv-data-dataset"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </template>
                </SdxvInfoItem>
            </SdxvInfoContainer>
            <SdxvInfoContainer 
                v-if="datasources.length"
            >
                <SdxvInfoItem
                    :label="t('view.task.DataSource')"
                    :whole-line="true"
                    :multi-line="true"
                    :strip="false"
                >
                    <template #value>
                        <div class="sdxv-data-info__container">
                            <div
                                v-for="(item, i) in datasources"
                                :key="i"
                                class="sdxv-data-info__container--item sdxv-data-datasource"
                            >
                                <div class="sdxv-data-datasource__name">
                                    {{ item.name }}
                                </div>
                                <div class="sdxv-data-datasource__info">
                                    <div class="sdxv-data-datasource__info--item">
                                        <span>SKYTSDB_HOST:</span>
                                        <span>{{ item.host }}</span>
                                    </div>
                                    <div class="sdxv-data-datasource__info--item">
                                        <span>SKYTSDB_PORT:</span>
                                        <span>{{ item.port }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </SdxvInfoItem>
            </SdxvInfoContainer>
        </template>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuEmpty from '@sdx/ui/components/empty';
import SdxvInfoItem from './InfoItem';
import SdxvInfoContainer from './InfoContainer';

export default {
    name: 'SdxvDataInfo',
    mixins: [locale],
    components: {
        SdxuEmpty,
        SdxvInfoContainer,
        SdxvInfoItem
    },
    props: {
        isEmpty: {
            type: Boolean,
            defualt: false
        },
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
