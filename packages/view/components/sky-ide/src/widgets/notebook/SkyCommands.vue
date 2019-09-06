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
                <div class="commands">
                    <span>{{ item.commands.label }}</span>
                    <span>{{ item.commands.key }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import {getCommandsTree} from '../../config/commands';
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
            let [res, tree] = [new Set(), getCommandsTree('Notebook')];
            tree.map(item => {
                if (item.category.toLowerCase().includes(this.command.toLowerCase())) {
                    res.add(item);
                }
                item.commands.map(val => {
                    if(val.label.toLowerCase().includes(this.command.toLowerCase())) {
                        res.add(item);
                    }
                });
            });
            return [...res];
        }
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
        }
        .commands {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>