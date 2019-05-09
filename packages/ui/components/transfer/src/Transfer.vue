<template>
    <div class="sdxu-transfer">
        <div class="sdxu-transfer__left">
            <SdxuInput
                size="small"
                :placeholder="placeholder"
                type="search"
                v-model="filterText"
            />
            <el-scrollbar
                class="sdxu-transfer__scrollbar"
                wrap-class="sdxu-transfer__wrap" 
            >
                <div
                    class="sdxu-transfer__tree"
                >
                    <el-tree
                        :data="data"
                        show-checkbox
                        :node-key="treeNodeKey"
                        ref="tree"
                        :filter-node-method="filterNode"
                        check-on-click-node
                        :default-checked-keys="defaultKeys"
                        @check="checkChange"
                    />
                </div>
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
            <i
                @click="movetag"
                :class="['sdx-icon', 'iconicon-jiantou',hightIcon ? 'is-highlight' : 'is-normal']"
            />
        </div>
        <div class="sdxu-transfer__right">
            <div class="sdxu-transfer__tag">
                <el-tag
                    v-for="tag in tags"
                    :key="tag[treeNodeKey]"
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
                    @click="removeAllTag"
                >
                    删除全部
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import {Tree, Tag, Scrollbar} from 'element-ui';
import Button from '@sdx/ui/components/button';
import Input from '@sdx/ui/components/input';
export default {
    name: 'SdxuTransfer',
    props: {
        data: {
            type: Array,
            default:() => []
        },
        placeholder: {
            type: String,
            default: ''
        },
        tags: {
            type: Array,
            default:() => []
        },
        defaultKeys: {
            type: Array,
            default:() => []
        },
        treeNodeKey: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            filterText: '',
            checkedTags: [],
            is_moveall: false
        };
    },
    components: {
        [Tree.name]: Tree,
        [Input.name]: Input,
        [Tag.name]: Tag,
        [Scrollbar.name]: Scrollbar,
        [Button.name]: Button,
        [Input.name]: Input
    },
    computed: {
        hightIcon() {
            let [hightIcon, tagsKey, checkKeys] = [false, [],[]];
            for (let i = 0; i< this.tags.length; i++) {
                tagsKey.push(this.tags[i][this.treeNodeKey]);
            }
            for (let i = 0; i< this.checkedTags.length; i++) {
                checkKeys.push(this.checkedTags[i][this.treeNodeKey]);
            }
            if(this.is_moveall) {
                hightIcon =  false;
            }else if(tagsKey.sort().toString() == checkKeys.sort().toString()) {
                hightIcon =  false;
            } else {
                hightIcon = true;
            }
            return hightIcon;
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        getTags() {
            let [checkedNodes ,childrenKeys, moveNodes, tags]= [this.$refs.tree.getCheckedNodes(),[], [], []];  
            for(let i =0; i< checkedNodes.length; i ++) {
                if(checkedNodes[i].children ) {
                    for (let j =0; j< checkedNodes[i].children.length; j ++) {
                        childrenKeys.push(checkedNodes[i].children[j][this.treeNodeKey]);
                    }
                }
            }
            moveNodes = checkedNodes.filter(v => !childrenKeys.includes(v[this.treeNodeKey]));
            for (let i =0; i < moveNodes.length ; i++ ) {
                tags.push(
                    {
                        name: moveNodes[i].label,
                        [this.treeNodeKey]: moveNodes[i][this.treeNodeKey],
                        is_group: moveNodes[i].children ? true : false
                    }
                );
            }
            return tags;
        },
        movetag() {
            this.$emit('update:tags',this.getTags());
        },
        handleClose(tag) {
            let [tags,keys]= [this.tags, []];
            tags.splice(this.tags.indexOf(tag), 1);
            this.$emit('update:tags',tags);

            for(let i =0; i<tags.length; i++) {
                keys.push(tags[i][this.treeNodeKey]);
            }
            this.$refs.tree.setCheckedKeys(keys);
            this.$emit('update:defaultKeys',keys);
            this.checkedTags = this.getTags();
        },
        moveAllTag() {
            this.checkedTags = this.getTags();
            let [tags, keys] = [[], []];
            for (let i =0; i < this.data.length; i ++) {
                tags.push(
                    {
                        name: this.data[i].label,
                        [this.treeNodeKey]: this.data[i][this.treeNodeKey],
                        is_group:  true 
                    }
                );
                keys.push(this.data[i][this.treeNodeKey]);
                if (this.data[i].children) {
                    for(let i =0; i < this.data[i].children.length ; i++) {
                        keys.push(this.data[i].children[i][this.treeNodeKey]);
                    }
                }
            }
            this.is_moveall = true;
            this.$emit('update:defaultKeys',keys);
            this.$emit('update:tags',tags);
        },
        checkChange(data, obj) {
            this.is_moveall = false;
            this.checkedTags = this.getTags();
            this.$emit('update:defaultKeys',obj.checkedKeys);
        },
        removeAllTag() { 
            this.checkedTags = []; 
            this.$emit('update:tags',[]);
            this.$emit('update:defaultKeys',[]);
            this.$refs.tree.setCheckedKeys([]);
        }
    },
    mounted() {
        this.checkedTags = this.getTags();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
};
</script>


