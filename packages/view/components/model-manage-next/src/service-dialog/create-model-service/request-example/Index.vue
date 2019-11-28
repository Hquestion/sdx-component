<template>
    <div class="sdxv-request-example">
        <div class="sdxv-request-example__item">
            <div class="sdxv-request-example__item--label">
                {{ t('view.model.requestType') }}:
            </div>
            <div class="sdxv-request-example__item--content">
                <div
                    v-for="(item,index) in examples"
                    :key="index"
                >
                    <removable-box @remove="handleRemove(index)">
                        <request-form
                            :ref="`exampleForm${index}`"
                            :data.sync="item"
                        />
                    </removable-box>
                </div>
                <SdxuButton
                    type="default"
                    invert
                    size="small"
                    @click="addExample"
                >
                    <i class="sdx-icon sdx-xinjianhao" />
                    {{ t('view.model.addReqExample') }}
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import RemovableBox from '../RemovableBox';
import RequestForm from './RequestForm';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'RequestExample',
    data() {
        return {
            examples: this.requestExamples
        };
    },
    mixins: [locale],
    props: {
        requestExamples: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        requestExamples(nVal) {
            this.examples = nVal;
        },
        examples(nVal) {
            this.$emit('update:requestExamples', nVal);
        }
    },
    components: {
        [Button.name]: Button,
        RemovableBox,
        RequestForm
    },
    methods: {
        addExample() {
            this.examples.push({
                type: '',
                code: ''
            });
        },
        handleRemove(index) {
            this.examples.splice(index, 1);
        },
        validate() {
            let promises = [];
            promises = this.examples.map((form,index) => {
                return this.$refs[`exampleForm${index}`][0].validate();
            });
            return Promise.all(promises);
        }
    }
};
</script>

<style scoped lang="scss">
.sdxv-request-example {
    padding-left: 16px;
    .sdxv-request-example__item {
        display: flex;
        margin-bottom: 16px;
        .sdxv-request-example__item--label {
            margin-top: 8px;
            width: 100px;
            text-align: end;
            padding-right: 12px;
            font-size: 14px;
            color: #6E7C94;
        }
    }
}
</style>
