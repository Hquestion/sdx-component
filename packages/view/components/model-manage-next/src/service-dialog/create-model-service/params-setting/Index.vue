<template>
    <div class="sdxv-params-setting">
        <div class="sdxv-params-setting__item">
            <div class="sdxv-params-setting__item--label">
                {{ t('view.model.inputParams') }}:
            </div>
            <div class="sdxv-params-setting__item--content">
                <div
                    v-for="(item,index) in inputParams"
                    :key="index"
                >
                    <removable-box @remove="handleRemove(index, true)">
                        <param-form
                            :ref="`inputForm${index}`"
                            :data.sync="item"
                        />
                    </removable-box>
                </div>
                <SdxuButton
                    type="default"
                    invert
                    size="small"
                    @click="addInput"
                >
                    <i class="sdx-icon sdx-xinjianhao" />
                    {{ t('view.model.addInputParams') }}
                </SdxuButton>
            </div>
        </div>
        <div class="sdxv-params-setting__item">
            <div class="sdxv-params-setting__item--label">
                {{ t('view.model.outputParams') }}:
            </div>
            <div class="sdxv-params-setting__item--content">
                <div
                    v-for="(item,index) in outputParams"
                    :key="index"
                >
                    <removable-box @remove="handleRemove(index)">
                        <param-form
                            :ref="`outputForm${index}`"
                            :data.sync="item"
                        />
                    </removable-box>
                </div>
                <SdxuButton
                    type="default"
                    invert
                    size="small"
                    @click="addOutput"
                >
                    <i class="sdx-icon sdx-xinjianhao" />
                    {{ t('view.model.addOutputParams') }}
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import RemovableBox from '../RemovableBox';
import ParamForm from './ParamForm';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'ParamsSetting',
    data() {
        return {
            input: this.inputParams,
            output: this.outputParams
        };
    },
    mixins: [locale],
    props: {
        inputParams: {
            type: Array,
            default: () => []
        },
        outputParams: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        inputParams(nVal) {
            this.input = nVal;
        },
        outputParams(nVal) {
            this.output = nVal;
        },
        input(nVal) {
            this.$emit('update:inputParams', nVal);
        },
        output(nVal) {
            this.$emit('update:outputParams', nVal);
        }
    },
    components: {
        [Button.name]: Button,
        RemovableBox,
        ParamForm
    },
    methods: {
        addInput() {
            this.input.push({
                name: '',
                type: '',
                paramFrom: '',
                paramTo: '',
                default: '',
                description: ''
            });
        },
        addOutput() {
            this.output.push({
                name: '',
                type: '',
                paramFrom: '',
                paramTo: '',
                default: '',
                description: ''
            });
        },
        handleRemove(index, fromInput) {
            fromInput ? this.input.splice(index, 1) : this.output.splice(index, 1);
        },
        validate() {
            let promises = [];
            promises = [...this.output.map((form,index) => {
                return this.$refs[`outputForm${index}`][0].validate();
            }), ...this.input.map((form,index) => {
                return this.$refs[`inputForm${index}`][0].validate();
            })];
            return Promise.all(promises);
        }
    }
};
</script>

<style scoped lang="scss">
.sdxv-params-setting {
    padding-left: 16px;
    .sdxv-params-setting__item {
        display: flex;
        margin-bottom: 16px;
        .sdxv-params-setting__item--label {
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
