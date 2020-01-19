<template>
    <div class="sdxw-model-detail-card">
        <div class="sdxw-model-detail-card__info">
            <div>
                <svg
                    aria-hidden="true"
                >
                    <use :xlink:href="`#${meta.icon}`" />
                </svg>
            </div>
            <div>
                <div>
                    {{ meta.title }}
                </div>
                <div>
                    <div
                        :style="`color: ${meta.labelColor}`" 
                        v-if="type === 'model'"
                    >
                        {{ meta.type }}
                    </div>
                    <div
                        v-else
                        class="sdxw-model-detail-card__creator"
                    >
                        <span>
                            {{ `${t('sdxCommon.Creator')}：` }}
                        </span>
                        <span>
                            {{ meta.creator }}
                        </span>
                    </div>
                    <div>
                        <span v-if="type === 'model'">{{ meta.creator }}</span>
                        <span v-if="getUser().userId === meta.owner.uuid && type === 'model'">({{ t('view.project.oneself') }})</span>
                        <span>{{ `${t('view.project.Created')}${dateFormatter(meta && meta.createdAt)}` }}</span>
                        <span v-if="type === 'dataset'">{{ `${t('view.dataManagement.Updated')}${dateFormatter(meta && meta.createdAt)}` }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sdxw-model-detail-card__description">
            {{ (meta && meta.description) ? meta.description : t('widget.projectCard.NoDescriptionAdded') }}
        </div>
        <div
            v-if="meta.labels.length"
            class="sdxw-model-detail-card__labels"
        >
            <div 
                v-for="(item,index) in meta.labels"
                :key="index"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
export default {
    name: 'SdxwModelDetailCard',
    mixins: [locale],
    props: {
        meta: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: 'model'
        }
    },
    methods: {
        dateFormatter,
        getUser
    }
};
</script>