<template>
    <div class="sky-commands">
        <SdxuInput
            size="small"
            type="search"
            v-model="command"
        />
        <div class="tree">
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
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import {getCommandsTree} from '../../config/commands';
import { matchingString, matchingStringIndex } from '@sdx/utils/src/helper/tool';
export default {
    name: 'SkyCommands',
    components: {
        SdxuInput
    },
    data() {
        return {
            command: ''
        };
    },
    computed: {
        commandTree() {
            let trees = [
                { category: 'note',
                    commands: [
                        {
                            label: 'notebook',
                            key: 1
                        },
                        {
                            label: 'notebook2',
                            key: 1
                        },
                        {
                            label: 'notebook3',
                            key: 1
                        },
                    ]
                },
                { category: 'gg',
                    commands: [
                        {
                            label: 'hh',
                            key: 4
                        },
                        {
                            label: 'hh4',
                            key: 5
                        },
                        {
                            label: 'bb',
                            key: 6
                        },
                    ]
                }
            ];
            let [res, tree] = [new Set(), trees, getCommandsTree('Notebook')];
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
        matchingStringIndex
    }
};
</script>
<style lang="scss" scoped>
.sky-commands {
    .tree {
        .category,.commands {
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
        }
        .category {
            border-bottom: 1px solid #ccc;
            font-weight: 700;
        }
        .commands {
            display: flex;
            justify-content: space-between;
            .highLight {
                font-weight: 700;
            }
        }
    }
}
</style>