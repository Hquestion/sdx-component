<template>
    <div class="sdxu-transfer">
        <div class="sdxu-transfer__left">
            <SdxuInput
                size="small"
                :placeholder="placeholder"
                type="search"
                v-model="filterText"
            />
            <div
                class="sdxu-transfer__tree"
            >
                <SdxuScroll>
                    <el-tree
                        :data="data"
                        show-checkbox
                        :node-key="treeNodeKey"
                        ref="tree"
                        :filter-node-method="filterNode"
                        check-on-click-node
                        :default-checked-keys="defaultKeys"
                        @check-change="checkChange"
                        v-loading="loading"
                    />
                </SdxuScroll>
            </div>
            <div class="sdxu-transfer__moveall">
                <SdxuButton
                    type="primary"
                    size="regular"
                    :plain="true"
                    @click="moveAllTag"
                >
                    {{ t('ui.transfer.moveAll') }}
                </SdxuButton>
            </div>
        </div>
        <div class="sdxu-transfer__moveicon">
            <i
                @click="movetag"
                :class="['sdx-icon', 'sdx-icon-jiantou',hightIcon ? 'is-highlight' : 'is-normal']"
            />
        </div>
        <div class="sdxu-transfer__right">
            <div class="sdxu-transfer__tag">
                <SdxuScroll>
                    <div style="border: 1px dotted #D8DEEA; height: 270px; padding: 4px;">
                        <div
                            v-if="!tags.length"
                            class="sdxu-transfer__please-select"
                        >
                            请选择
                        </div>
                        <el-tag
                            v-else
                            v-for="tag in tags"
                            :key="tag[treeNodeKey]"
                            closable
                            @close="handleClose(tag)"
                            :class="tag.is_group ? 'is-group' : 'is-user'"
                        >
                            {{ tag.name }}
                        </el-tag>
                    </div>
                </SdxuScroll>
            </div>
            <div class="sdxu-transfer__moveall">
                <SdxuButton
                    type="default"
                    size="regular"
                    :plain="true"
                    @click="removeAllTag"
                    :disabled="tags.length === 0"
                >
                    {{ t('ui.transfer.deleteAll') }}
                </SdxuButton>
            </div>
        </div>
    </div>
</template>

<script>
import {Tree, Tag, Scrollbar} from 'element-ui';
import Button from '@sdx/ui/components/button';
import Input from '@sdx/ui/components/input';
import SdxuScroll from '@sdx/ui/components/scroll';
import locale from '@sdx/utils/src/mixins/locale';
import {t} from '@sdx/utils/src/locale';
export default {
    name: 'SdxuTransfer',
    mixins: [locale],
    props: {
        data: {
            type: Array,
            default:() => []
        },
        placeholder: {
            type: String,
            default: () => t('ui.transfer.PleaseEnter')
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
        },
        loading: {
            type: Boolean,
            default: false
        },
        needShowTags: {
            type: Boolean,
            default: false
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
        [Input.name]: Input,
        SdxuScroll
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
            }else if(tagsKey.sort().toString() === checkKeys.sort().toString()) {
                hightIcon =  false;
            } else if(this.defaultKeys.length === this.tags.length) {
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
            let [checkedNodes ,childrenKeys, moveNodes, tags]= [this.$refs.tree && this.$refs.tree.getCheckedNodes() || [],[], [], []];
            for(let i =0; i< checkedNodes.length; i ++) {
                if(checkedNodes[i].children ) {
                    for (let j =0; j< checkedNodes[i].children.length; j ++) {
                        childrenKeys.push(checkedNodes[i].children[j][this.treeNodeKey]);
                    }
                }
            }
            moveNodes = checkedNodes.filter(v => !childrenKeys.includes(v[this.treeNodeKey]));
            for (let i =0; i < moveNodes.length ; i++ ) {
                // if (tags.find(item => item.name === moveNodes[i].label)) continue;
                if (tags.find(item => item[this.treeNodeKey] === moveNodes[i][this.treeNodeKey])) continue;
                if (!moveNodes[i].isGroup
                    && tags.find(item => {
                        if (item[this.treeNodeKey].split('/')[1]) {
                            return item[this.treeNodeKey].split('/')[1] === moveNodes[i][this.treeNodeKey].split('/')[1];
                        } else {
                            return false;
                        }
                    })
                ) continue;
                tags.push(
                    {
                        name: moveNodes[i].label,
                        [this.treeNodeKey]: moveNodes[i][this.treeNodeKey],
                        is_group: moveNodes[i].isGroup ? true : false
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
            this.$refs.tree && this.$refs.tree.setCheckedKeys(keys);
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
                        is_group:  this.data[i].isGroup ? true : false
                    }
                );
                keys.push(this.data[i][this.treeNodeKey]);
                if (this.data[i].children) {
                    for(let j =0; j < this.data[i].children.length ; j++) {
                        keys.push(this.data[i].children[j][this.treeNodeKey]);
                    }
                }
            }
            this.is_moveall = true;
            this.$emit('update:defaultKeys',keys);
            this.$emit('update:tags',tags);
        },
        checkChange(data, checked) {
            this.is_moveall = false;
            if (!checked) {
                if (data.isGroup) return;
                let userIds = [];
                if (!data.isGroup) {
                    userIds.push(data.uuid.split('/')[1]);
                } else {
                    data.children.forEach(item => {
                        userIds.push(item.uuid.split('/')[1]);
                    });
                }
                let checkedKeys = this.$refs.tree.getCheckedKeys();
                let tmp = [];
                for (let key of checkedKeys) {
                    this.data.forEach(item => {
                        if (item.children) {
                            for (let j = 0; j < item.children.length; j++) {
                                let id = item.children[j][this.treeNodeKey].split('/')[1];
                                if ((id === key.split('/')[1]) && !userIds.includes(id)) {
                                    !tmp.includes(item.children[j][this.treeNodeKey]) && tmp.push(item.children[j][this.treeNodeKey]);
                                }
                            }
                        }
                        if (!item.isGroup && (item[this.treeNodeKey].split('/')[1] === key.split('/')[1]) && !userIds.includes(item[this.treeNodeKey].split('/')[1])) {
                            !tmp.includes(item[this.treeNodeKey]) && tmp.push(item[this.treeNodeKey]);
                        }
                    });
                }
                this.$refs.tree.setCheckedKeys(tmp);
            } else {
                this.updateSameUserInGroups();
            }

        },
        removeAllTag() {
            this.checkedTags = [];
            this.$emit('update:tags',[]);
            this.$emit('update:defaultKeys',[]);
            this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
        },
        updateSameUserInGroups() {
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            let tmp = [...checkedKeys];
            for (let key of checkedKeys) {
                if (!key.includes('/')) {
                    !tmp.includes(key) && tmp.push(key);
                } else {
                    this.data.forEach(item => {
                        if (item.children) {
                            for (let j = 0; j < item.children.length; j++) {
                                if ((item.children[j][this.treeNodeKey].split('/')[1] === key.split('/')[1])) {
                                    !tmp.includes(item.children[j][this.treeNodeKey]) && tmp.push(item.children[j][this.treeNodeKey]);
                                }
                            }
                        }
                        if (!item.isGroup && (item[this.treeNodeKey].split('/')[1] === key.split('/')[1])) {
                            !tmp.includes(item[this.treeNodeKey]) && tmp.push(item[this.treeNodeKey]);
                        }
                    });
                }
            }
            this.$refs.tree.setCheckedKeys(tmp);
        }
    },
    mounted() {
        this.checkedTags = this.getTags();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        data: {
            handler(nVal) {
                if (!nVal || nVal.length === 0) return;
                this.$nextTick(() => {
                    this.$refs.tree && this.$refs.tree.setCheckedKeys(this.defaultKeys);
                    this.movetag();
                });
            },
            immediate: true
        },
        needShowTags() {
            this.$nextTick(() => {
                this.$refs.tree && this.$refs.tree.setCheckedKeys(this.defaultKeys);
                this.movetag();
            });
        }
    },
};
</script>


