<template>
    <search-panel
        class="sky-commands"
        @seach-value="seachValue"
        content-max-height="408px"
    >
        <div
            class="tree"
            v-if="commandTree.length"
        >
            <div
                v-for="(item, index) in commandTree"
                :key="index"
            >
                <div class="category">
                    {{ item.category }}
                </div>
                <div
                    class="commands"
                    v-for="(val, i) in item.commands"
                    :key="i"
                >
                    <div>
                        <span
                            v-for="(itemLabel, indexLabel) in val.label.length"
                            :key="indexLabel"
                            :class="{'highLight': matchingStringIndex(val.label,command).includes(indexLabel)}"
                        >{{ val.label[indexLabel] }}</span>
                    </div>
                    <div>{{ val.key }}</div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="nodata"
        >
            暂无数据
        </div>
    </search-panel>
</template>

<script>
import {getCommandsTree} from '../../config/commands';
import { matchingString, matchingStringIndex } from '@sdx/utils/src/helper/tool';
import SearchPanel from '../search-panel/SearchPanel';
export default {
    name: 'SkyCommands',
    components: {
        SearchPanel
    },
    data() {
        return {
            command: ''
        };
    },
    computed: {
        commandTree() {
            let [res, tree] = [new Set(), getCommandsTree('Notebook')];
            tree.forEach(item => {
                let commands =  new Set();
                if (matchingString(item.category, this.command)) {
                    res.add(item);
                } else {
                    item.commands.forEach(val => {
                        if(matchingString(val.label, this.command)) {
                            commands.add(val);
                        }
                    });
                    if(commands.size) {
                        res.add({
                            category: item.category,
                            commands: [...commands]
                        });
                    }
                }
            });
            return [...res];
        }
    },
    methods: {
        matchingStringIndex,
        seachValue(value) {
            this.command = value;
        }
    }
};
</script>
<style lang="scss" scoped>
.sky-commands {
    color: #DDE5FE;
    .tree {
        letter-spacing: 0.07px;
        .category,.commands {
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
        }
        .category {
            border-bottom: 1px solid #3B64BE;
            font-family: HiraginoSansGB-W6;
        }
        .commands {
            display: flex;
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            height: 24px;
            line-height: 24px;
            .highLight {
                font-weight: 700;
                color: #fff;
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