<template>
    <sdxu-transfer
        :data="treeData"
        :tags.sync="tmpTags"
        :default-keys.sync="tmpDefaultKeys"
        :tree-node-key="treeNodeKey"
        class="sdxw-select-group-user"
    />
</template>

<script>
import Transfer from '@sdx/ui/components/transfer';
import { getUserList } from '@sdx/utils/src/api/user';
export default {
    name: 'SdxwSelectGroupUser',
    data() {
        return {
            treeNodeKey: 'uuid',
            treeData: [],
            tmpTags: this.tags,
            tmpDefaultKeys: this.defaultCheckedKeys
        };
    },
    watch: {
        tmpTags: {
            handler(nVal) {
                this.$emit('update:tags', nVal);
            },
            deep: true
        },
        tags(nVal) {
            this.tmpTags = nVal;
        },
        defaultCheckedKeys: {
            handler(nVal) {
                this.tmpDefaultKeys = nVal;
            },
            immediate: true
        }
    },
    components: {
        [Transfer.name]: Transfer
    },
    created() {
        const params = {
            count: -1
        };
        getUserList(params).then((res) => {
            res.users.forEach(user => {
                user.groups.forEach(group => {
                    let item = this.treeData.find(data => data.uuid === group.uuid);
                    if (item) {
                        item.children.push({
                            uuid: group.uuid + '/' + user.uuid,
                            label: user.fullName
                        });
                    } else {
                        this.treeData.push({
                            uuid: group.uuid,
                            label: group.name,
                            children: [{
                                uuid: group.uuid + '/' + user.uuid,
                                label: user.fullName
                            }]
                        });
                    }
                });
            });
        });
    },
    props: {
        tags: {                // TODO: 改为根据tags取出users和groups并且向外传递
            type: Array,
            default: () => []
        },
        defaultCheckedKeys: {  // TODO: 改为传入users和groups 内部判断defaultCheckedKeys
            type: Array,
            default: () => []
        }
    },
    methods: {
    }
};
</script>
