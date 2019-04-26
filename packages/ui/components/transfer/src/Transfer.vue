<template>
    <div class="sdxu-transfer">
        <div class="sdxu-transfer__tree">
            <el-input
                size="small"
                placeholder="请输入"
                suffix-icon="el-icon-search"
                v-model="filterText"
            />
            <el-scrollbar
                class="sdxu-transfer-scrollbar"
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
                <span @click="moveAllTag">
                    移动全部
                </span>
            </div>
        </div>
        <div class="sdxu-transfer__moveicon">
            <span @click="movetag">
                =
            </span>
        </div>
        <div class="sdxu-transfer__tag">
            <el-input
                size="small"
                placeholder="请输入"
                suffix-icon="el-icon-search"
                v-model="filterTag"
            />
            <div class="sdxu-transfer__tagitem">
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
        </div>
    </div>
</template>

<script>
import {Tree,Input, Tag, Scrollbar} from 'element-ui';
export default {
    name: 'SdxuTransfer',
    data() {
        return {
            data: [{
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
            }],
            filterText: '',
            filterTag: '',
            tags: [],
            currentData: [],
            defaultKeys: [],
            saveTags: ''
        };
    },
    components: {
        [Tree.name]: Tree,
        [Input.name]: Input,
        [Tag.name]: Tag,
        [Scrollbar.name]: Scrollbar
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
            this.saveTags = JSON.stringify(this.tags);
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
            this.saveTags = JSON.stringify(tags);
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        filterTag(val) {
            let tag = JSON.parse(this.saveTags).filter(item => item.name.includes(val));
            this.tags = tag;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
