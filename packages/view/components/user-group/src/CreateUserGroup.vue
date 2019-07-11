<template>
    <SdxuDialog
        class="create-user-group"
        :visible.sync="groupVisible"
        @open="onOpen"
        :confirm-handler="handleConfirm"
    >
        <div slot="title">
            {{ title }}
        </div>
        <el-form
            ref="form"
            :model="params"
            :rules="rules"
            label-width="80px"
            label-position="right"
        >
            <el-form-item
                label="用户组名"
                prop="name"
            >
                <SdxuInput
                    placeholder="请输入组名"
                    v-model="params.name"
                />
            </el-form-item>
            <el-form-item
                label="角色"
                prop="roles"
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
import ElSelect from 'element-ui/lib/select';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import ElOption from 'element-ui/lib/option';

import { getRolesList } from '@sdx/utils/src/api/rolemange';
import { createGroup, updateGroups } from '@sdx/utils/src/api/user';
import { commonNameValidator } from '@sdx/utils/src/helper/validate';
import { removeSameAttr } from '@sdx/utils/src/helper/tool';
export default {
    name: 'CreateUserGroup',
    components: {
        SdxuDialog,
        SdxuInput,
        ElSelect,
        ElForm,
        ElFormItem,
        ElOption
    },
    data() {
        return {
            params: {
                uuid: '',
                name: '',
                roles: []
            },
            roleList: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入用户组名',
                        trigger: 'blur'
                    },
                    { validator: commonNameValidator, trigger: 'blur' },
                ],
                roles: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    },
                ]
            },
            saveGroupObj: {}
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
        },
        clearState() {
            this.params = {
                uuid: '',
                name: '',
                roles: []
            };
        },
        handleConfirm() {
            return this.$refs.form.validate().then(() => {
                let promise;
                const groupData = {
                    name: this.params.name,
                    roles: this.params.roles.map(item => typeof item === 'string' ? item : item.uuid)
                };
                // 传变化的值给后端
                let params = removeSameAttr(this.saveGroupObj, groupData);
                if (this.params.uuid) {
                    promise = updateGroups(this.params.uuid, params);
                } else {
                    groupData.permissions = [];
                    promise = createGroup(groupData);
                }
                return promise.then(() => {
                    this.clearState();
                    this.$message({
                        message: this.params.uuid ? '修改用户组成功' : '创建用户组成功',
                        type: 'success'
                    });
                    this.$emit('refresh');
                });
            });
        }
    },
    watch: {
        meta: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.params = Object.assign(this.params, val);
                    this.saveGroupObj = JSON.parse(JSON.stringify({
                        name: this.params.name,
                        roles: this.params.roles
                    }));
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
