<template>
    <sdxu-transfer
        :data="treeData"
        :tags.sync="tmpTags"
        :default-keys="tmpDefaultKeys"
        :tree-node-key="treeNodeKey"
        class="sdxw-select-group-user"
    />
</template>

<script>
import Transfer from '@sdx/ui/components/transfer';
import { getGroups, getUserList } from '@sdx/utils/src/api/user';
export default {
    name: 'SdxwSelectGroupUser',
    data() {
        return {
            treeNodeKey: 'uuid',
            treeData: [],
            tmpTags: [],
            tmpDefaultKeys: []
        };
    },
    watch: {
        tmpTags: {
            handler(nVal) {
                let [tmpGroups, tmpUsers] = [[], []];
                if (!this.mode) {
                    nVal.forEach(item => {
                        item.is_group ? tmpGroups.push(item.uuid) : tmpUsers.push(item.uuid.split('/')[1]);
                    });
                    this.$emit('update:groups', tmpGroups);
                    this.$emit('update:users', tmpUsers);
                } else if (this.mode === 'group') {
                    nVal.forEach(item => {
                        tmpGroups.push(item.uuid);
                    });
                    this.$emit('update:groups', tmpGroups);
                } else {
                    nVal.forEach(item => {
                        tmpUsers.push(item.uuid);
                    });
                    this.$emit('update:users', tmpUsers);
                }
            },
            deep: true
        }
    },
    components: {
        [Transfer.name]: Transfer
    },
    async created() {
        const params = {
            count: -1
        };
        if (!this.mode) {
            // 选择用户和组
            const res = await getGroups(params);
            res.groups.forEach(group => {
                this.treeData.push({
                    uuid: group.uuid,
                    label: group.name,
                    children: []
                });
                group.users.forEach(user => {
                    let item = this.treeData.find(data => data.uuid === group.uuid);
                    if (item) {
                        item.children.push({
                            uuid: group.uuid + '/' + user.uuid,
                            label: user.fullName
                        });
                    }
                });
            });
            this.groups.forEach(group => {
                if (this.tmpDefaultKeys.indexOf(group) === -1) {
                    this.tmpDefaultKeys.push(group);
                }
            });
            this.users.forEach(user => {
                this.treeData.forEach(group => {
                    this.tmpDefaultKeys.push(group.uuid + '/' + user);
                });
            });
        } else if (this.mode === 'group') {
            // 只选择组
            getGroups(params).then((res) => {
                res.groups.forEach(group => {
                    this.treeData.push({
                        uuid: group.uuid,
                        label: group.name
                    });
                });
            });
            this.groups.forEach(group => {
                if (this.tmpDefaultKeys.indexOf(group) === -1) {
                    this.tmpDefaultKeys.push(group);
                }
            });
        } else {
            // 只选择用户
            getUserList(params).then((res) => {
                res.users.forEach(user => {
                    this.treeData.push({
                        uuid: user.uuid,
                        label: user.fullName
                    });
                });
            });
            this.users.forEach(user => {
                if (this.tmpDefaultKeys.indexOf(user) === -1) {
                    this.tmpDefaultKeys.push(user);
                }
            });
        }

    },
    props: {
        mode: {
            type: String,
            default: ''
        },
        users: {
            type: Array,
            default: () => []
        },
        groups: {
            type: Array,
            default: () => []
        }
    },
    methods: {
    }
};
</script>
