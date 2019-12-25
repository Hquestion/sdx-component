<template>
    <div class="sdxv-dataset-card">
        <div class="sdxv-dataset-card__container">
            <div
                v-if="checkable"
                class="sdxv-dataset-card__checkbox"
                @click="isChecked = !isChecked"
            >
                <div
                    class="sdxv-dataset-card__checkbox--content" 
                    :class="{
                        'is-checked': isChecked
                    }"
                />
            </div>
            <div 
                class="sdxv-dataset-card__main" 
                :class="{'is-checkable': checkable}"
            >
                <div class="sdxv-dataset-card__main--info sdxv-dataset-card__info">
                    <div class="sdxv-dataset-card__info--icon">
                        <img
                            :src="datasetInfo.coverImg || defaultImgCover"
                            alt="icon"
                        >
                    </div>
                    <div class="sdxv-dataset-card__info--detail sdxv-dataset-card__detail">
                        <div>
                            <span 
                                @click="handleClickName" 
                                :title="datasetInfo.name"
                            >
                                {{ datasetInfo.name }}
                            </span>
                        </div>
                        <div>
                            <span>{{ (datasetInfo.fileCount || 0) + t('view.dataManagement.Count') + ' ' }}<b>{{ datasetInfo.dataFormat }}</b>{{ ' ' + t('view.dataManagement.Files') + ' ' + byteFormatter(datasetInfo.dataSize) }}</span>
                        </div>
                    </div>
                    <div class="sdxv-dataset-card__info--state">
                        <SdxwFoldLabel
                            :plain="true"
                            :type="STATE_MAP_FOLD_LABEL_TYPE[datasetInfo.state]"
                        >
                            {{ t(STATE_TYPE_LABEL[datasetInfo.state]) }}
                        </SdxwFoldLabel>
                    </div>
                </div>
                <div class="sdxv-dataset-card__create-info">
                    {{ (datasetInfo.creator && datasetInfo.creator.fullName) + ' ' + t('view.dataManagement.created_in') + dateFormatter(datasetInfo.createdAt) }}
                </div>
                <div
                    class="sdxv-dataset-card__desc"
                    :title="datasetInfo.description"
                >
                    {{ datasetInfo.description || t('view.dataManagement.NoDescription') }}
                </div>
                <div class="sdxv-dataset-card__tags">
                    <div
                        class="sdxv-dataset-card__tags--item"
                        v-for="(item, i) in datasetInfo.labels"
                        :key="i"
                    >
                        <div>{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sdxv-dataset-card__operation">
            <SdxuButton
                v-for="item in getOperationList(datasetInfo.state)"
                :key="OPERATION_INFO[item].value"
                :icon="OPERATION_INFO[item].icon"
                type="text"
                @click="handleOperate(OPERATION_INFO[item].value)"
            >
                {{ t(OPERATION_INFO[item].label) }}
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import { byteFormatter, dateFormatter } from '@sdx/utils/src/helper/transform';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import { STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE_LABEL, STATE_TYPE_OPERATION, OPERATION_INFO, MY_SHARE_OPERATION } from './config';
import locale from '@sdx/utils/src/mixins/locale';
import defaultImgCover from '@sdx/utils/src/theme-common/static/defaultImgCover.svg';

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
        },
        shareType: {
            type: String,
            default: 'ALL',
            validator: value => {
                return ['ALL', 'PRIVATE', 'MY_SHARE', 'OTHER_SHARE'].includes(value);
            }
        },
        checkedList: {
            type: Array,
            default: () => []
        },
        userId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            OPERATION_INFO,
            STATE_TYPE_LABEL,
            STATE_MAP_FOLD_LABEL_TYPE,
            defaultImgCover
        };
    },
    computed: {
        checkable() {
            return ['PRIVATE', 'MY_SHARE'].includes(this.shareType);
        },
        isChecked: {
            get() {
                return this.checkedList.includes(this.datasetInfo.uuid);
            },
            set(nval) {
                if (nval) {
                    if (!this.checkedList.includes(this.datasetInfo.uuid)) {
                        this.checkedList.push(this.datasetInfo.uuid);
                    }
                } else {
                    if (this.checkedList.includes(this.datasetInfo.uuid)) {
                        this.checkedList.splice(this.checkedList.indexOf(this.datasetInfo.uuid), 1);
                    }
                }
            }
        }
    },
    methods: {
        handleOperate(operation) {
            this.$emit('operate', operation, this.datasetInfo);
        }, 
        handleClickName() {
            this.$emit('detail', this.datasetInfo.uuid);
        },
        getOperationList(state) {
            if (this.shareType === 'MY_SHARE') {
                return MY_SHARE_OPERATION;
            } else if (this.datasetInfo && this.datasetInfo.creator && this.datasetInfo.creator.uuid !== this.userId) {
                return [];
            } else {
                return STATE_TYPE_OPERATION[state];
            }
        },
        byteFormatter,
        dateFormatter
    }
};
</script>

<style>

</style>
