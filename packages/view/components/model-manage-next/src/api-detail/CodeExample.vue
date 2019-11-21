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
            <SdxuCopyable type="inner" :content="exampleCodes[current]" dark>
                <SdxuCodepan
                    :value="exampleCodes[current] || ''"
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
const LabelMap = {
    curl: 'CURL',
    python: 'PYTHON',
    java: 'JAVA',
    success: '正常返回示例',
    failed: '失败返回示例'
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
            type: Object,
            default: () => ({})
        },
        mode: {
            type: String,
            default: 'request'
        }
    },
    computed: {
        codeModes() {
            return Object.keys(this.exampleCodes);
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
        }
    },
    watch: {
        exampleCodes(val) {
            if (val) {
                this.current = Object.keys(val)[0];
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
