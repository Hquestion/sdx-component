<template>
    <search-panel
        class="sky-code-snippet"
        @seach-value="seachValue"
        content-max-height="200px"
    >
        <div
            class="tree"
            v-if="result.length"
        >
            <div
                v-for="(item, index) in result"
                :key="index"
                @click="addSnippet(index)"
            >
                <div class="value">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div
            v-else
            class="nodata"
        >
            {{ t('sdxCommon.NoData') }}
        </div>
    </search-panel>
</template>

<script>
import { matchingString } from '@sdx/utils/src/helper/tool';
import SearchPanel from '../search-panel/SearchPanel';
import locale from '@sdx/utils/src/mixins/locale';
import sinppets from '../../config/snippets';
import SkyCodeCellModel from '../../model/CodeCell';
export default {
    name: 'SkyCodeSnippets',
    mixins: [locale],
    components: {
        SearchPanel
    },
    data() {
        return {
            search: ''
        };
    },
    inject: {
        snb: {
            default: {}
        }
    },
    computed: {
        result() {
            let res = new Set();
            sinppets.forEach(item => {
                if (matchingString(item.name, this.search)) {
                    res.add(item);
                }
            });
            return [...res];
        }
    },
    methods: {
        seachValue(value) {
            this.search = value;
        },
        addSnippet(index) {
            this.snb.insertCell('code', new SkyCodeCellModel({
                source: sinppets[index].code
            }));
            this.$emit('close');
        }
    }
};
</script>
<style lang="scss" scoped>
.sky-code-snippet {
    color: #DDE5FE;
    .tree {
        letter-spacing: 0.07px;
        .value {
            height: 24px;
            line-height: 24px;
            &:hover {
                background: #34539B;
            }
        }
    }
    .nodata {
        text-align: center;
        height: 100px;
        line-height: 100px;
        font-family: HiraginoSansGB-W6;
        font-size: 12px;
    }
}
</style>
