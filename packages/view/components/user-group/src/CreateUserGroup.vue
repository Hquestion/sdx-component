<template>
    <SdxuDialog
        class="create-user-group"
        :visible.sync="groupVisible"
        @open="onOpen"
    >
        <div slot="title">
            {{ title }}
        </div>
        <el-form
            ref="form"
            :model="params"
            label-width="80px"
            label-position="right"
        >
            <el-form-item
                label="用户组名"
                prop="name"
                required
            >
                <SdxuInput
                    placeholder="请输入组名"
                    v-model="params.name"
                />
            </el-form-item>
            <el-form-item
                label="角色"
                prop="roles"
                required
            >
                <el-select
                    v-model="params.roles"
                    multiple
                    placeholder="请选择角色"
                    style="width: 100%"
                >
                    <el-option
                        v-for="(role, index) in roleList"
                        :key="index"
                        :label="role.name"
                        :value="role.uuid"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </SdxuDialog>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuDialog from '@sdx/ui/components/dialog';

import { getRolesList } from '@sdx/utils/src/api/rolemange';
export default {
    name: 'CreateUserGroup',
    components: {SdxuDialog, SdxuInput},
    data() {
        return {
            params: {
                uuid: '',
                name: '',
                roles: []
            },
            roleList: []
        };
    },
    computed: {
        groupVisible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
        },
        title() {
            return this.params.uuid ? '编辑用户组' : '创建用户组';
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        meta: {
            type: Object,
            default: undefined
        }
    },
    methods: {
        init() {
            getRolesList().then(res => {
                this.roleList = res.roles;
            });
        },
        onOpen() {
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        }
    },
    watch: {
        meta: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.params = Object.assign(this.params, val);
                } else {
                    this.params = {
                        uuid: '',
                        name: '',
                        roles: []
                    };
                }
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>

</style>
