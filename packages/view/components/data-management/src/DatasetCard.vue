<template>
    <div class="sdxv-dataset-card">
        <div class="sdxv-dataset-card__main">
            <div class="sdxv-dataset-card__main--info sdxv-dataset-card__info">
                <div class="sdxv-dataset-card__info--icon">
                    <img
                        src=""
                        alt="icon"
                    >
                </div>
                <div class="sdxv-dataset-card__info--detail sdxv-dataset-card__detail">
                    <div class="sdxv-dataset-card__detail--first">
                        <div>name</div>
                        <div>
                            <span>file</span>
                        </div>
                    </div>
                    <div class="sdxv-dataset-card__detail--second">
                        creator
                    </div>
                </div>
                <div class="sdxv-dataset-card__info--state">
                    staus
                </div>
            </div>
            <div class="sdxv-dataset-card__main--desc">
                desc
            </div>
            <div class="sdxv-dataset-card__main--tags">
                <div
                    class="sdxv-dataset-card__tag"
                    v-for="item in tags"
                    :key="item.value"
                >
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
        <div class="sdxv-dataset-card__operation">
            <SdxuButton
                v-for="item in operationList"
                :key="item.value"
                :icon="item.icon"
                type="text"
                @click="handleOperate(item)"
            >
                {{ item.label }}
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

export default {
    name: 'DatasetCard',
    components: {
        SdxuButton
    },
    methods: {
        handleOperate(operation) {
            // todo:
            this.$emit('operate', operation);
        }
    }
};
</script>

<style>

</style>
