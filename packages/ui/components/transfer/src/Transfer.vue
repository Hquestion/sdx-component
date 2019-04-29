<template>
    <div class="sdxu-transfer">
        <div class="sdxu-transfer__left">
            <el-input
                size="small"
                :placeholder="placeholder"
                suffix-icon="el-icon-search"
                v-model="filterText"
            />
            <el-scrollbar
                class="sdxu-transfer__scrollbar"
                wrap-class="sdxu-transfer__wrap" 
            >
                <el-tree
                    class="sdxu-transfer__eltree"
                    :data="data"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :filter-node-method="filterNode"
                    check-on-click-node
                    :default-checked-keys="defaultKeys"
                />
            </el-scrollbar>
            <div class="sdxu-transfer__moveall">
                <SdxuButton
                    type="default"
                    size="regular"
                    :plain="true"
                    @click="moveAllTag"
                >
                    移动全部
                </SdxuButton>
            </div>
        </div>
        <div class="sdxu-transfer__moveicon">
            <SdxuButton
                type="default"
                size="regular"
                :plain="true"
                @click="movetag"
            >
                =
            </SdxuButton>
        </div>
        <div class="sdxu-transfer__right">
            <div class="sdxu-transfer__tag">
                <el-tag
                    v-for="tag in tags"
                    :key="tag.id"
                    closable
                    @close="handleClose(tag)"
                    :class="tag.is_group ? 'is-group' : 'is-user'"
                >
                    {{ tag.name }}
                </el-tag>
            </div>
            <div class="sdxu-transfer__moveall">
                <SdxuButton
                    type="default"
                    size="regular"
                    :plain="true"
                    @click="moveAllTag"
                >
                    删除全部
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import {Tree,Input, Tag, Scrollbar} from 'element-ui';
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxuTransfer',
    props: {
        data: {
            type: Array,
            default: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }, {
                id: 4,
                label: '一级 3',
                children: [{
                    id: 9,
                    label: '二级 3-1'
                }, {
                    id: 10,
                    label: '二级 3-2'
                }]
            }]
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            filterText: '',
            tags: [],
            currentData: [],
            defaultKeys: [],
         
        };
    },
    components: {
        [Tree.name]: Tree,
        [Input.name]: Input,
        [Tag.name]: Tag,
        [Scrollbar.name]: Scrollbar,
        [Button.name]: Button
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        movetag() {
            let [checkedNodes ,childrenKeys, moveNodes, tags]= [this.$refs.tree.getCheckedNodes(),[], [], []];  
            for(let i =0; i< checkedNodes.length; i ++) {
                if(checkedNodes[i].children ) {
                    for (let j =0; j< checkedNodes[i].children.length; j ++) {
                        childrenKeys.push(checkedNodes[i].children[j].id);
                    }
                }
            }
            moveNodes = checkedNodes.filter(v => !childrenKeys.includes(v.id));
            for (let i =0; i < moveNodes.length ; i++ ) {
                tags.push(
                    {
                        name: moveNodes[i].label,
                        id: moveNodes[i].id,
                        is_group: moveNodes[i].children ? true : false
                    }
                );
            }
            this.tags = tags;
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        moveAllTag() {
            let [tags, keys] = [[], []];
            for (let i =0; i < this.data.length; i ++) {
                tags.push(
                    {
                        name: this.data[i].label,
                        id: this.data[i].id,
                        is_group:  true 
                    }
                );
                keys.push(this.data[i].id);
                if (this.data[i].children) {
                    for(let i =0; i < this.data[i].children.length ; i++) {
                        keys.push(this.data[i].children[i].id);
                    }
                }
            }
            this.defaultKeys = keys;
            this.tags = tags;
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    
    },
};
</script>

<style lang="scss" scoped>

</style>
