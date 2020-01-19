<template>
    <div class="code-example">
        <SdxuTabRadioGroup v-model="current">
            <SdxuTabRadio
                v-for="(item, index) in codeModes"
                :key="index"
                :name="item"
            >
                {{ LabelMap[item] }}
            </SdxuTabRadio>
        </SdxuTabRadioGroup>
        <div class="code-present-area">
            <SdxuCopyable type="inner" :content="showCodes" dark>
                <SdxuCodepan
                    :value="showCodes || ''"
                    readonly
                    light
                    :type="type"
                />
            </SdxuCopyable>
        </div>
    </div>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import Codepan from '@sdx/ui/components/codepan';
import SdxuCopyable from '@sdx/ui/components/copyable';
import { t } from '@sdx/utils/src/locale';
import {isArray} from '@sdx/utils/src/helper/tool';
const LabelMap = {
    curl: 'curl' + t('view.model.requestExample'),
    python: 'Python' + t('view.model.requestExample'),
    java: 'Java' + t('view.model.requestExample'),
    success: t('view.model.successExample'),
    failed: t('view.model.failExample')
};
export default {
    name: 'CodeExample',
    components: {
        SdxuTabRadio: TabRadio.TabRadioItem,
        SdxuTabRadioGroup: TabRadio.TabRadioGroup,
        SdxuCodepan: Codepan,
        SdxuCopyable
    },
    data() {
        return {
            current: '',
            LabelMap
        };
    },
    props: {
        exampleCodes: {
            type: [Array, Object],
            default: () => ([])
        },
        mode: {
            type: String,
            default: 'request'
        }
    },
    computed: {
        codeModes() {
            if (isArray(this.exampleCodes)) {
                return this.exampleCodes.map(item => item.type.toLowerCase());
            } else {
                return ['success', 'failed'];
            }
        },
        type() {
            if (this.mode === 'request') {
                const map = {
                    curl: 'shell',
                    python: 'python',
                    java: 'java'
                };
                return map[this.current] || 'Plain Text';
            } else {
                return 'javascript';
            }
        },
        showCodes() {
            if (isArray(this.exampleCodes)) {
                if (this.current) {
                    return this.exampleCodes.find(code => code.type.toLowerCase() === this.current).code;
                } else {
                    return '';
                }
            } else {
                return this.exampleCodes[this.current];
            }
        }
    },
    watch: {
        exampleCodes(val) {
            if (val) {
                if (isArray(val)) {
                    return val[0].type;
                } else {
                    this.current = 'success';
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.code-present-area {
    margin-top: 16px;
}
</style>
