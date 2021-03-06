<template>
    <SdxuDialog
        class="create-user-group"
        :visible.sync="groupVisible"
        @open="onOpen"
        :confirm-handler="handleConfirm"
        @closed="onClose"
    >
        <div slot="title">
            {{ title }}
        </div>
        <el-form
            ref="form"
            :model="params"
            :rules="rules"
            :label-width="lang$ === 'en' ? '110px' : '80px'"
            label-position="right"
        >
            <el-form-item
                :label="t('view.userManage.UserGroupName')"
                prop="name"
            >
                <SdxuInput
                    :placeholder="t('view.userManage.PleaseInputGroupName')"
                    v-model="params.name"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.userManage.Role')"
                prop="roles"
            >
                <el-select
                    v-model="params.roles"
                    multiple
                    :placeholder="t('view.userManage.PleaseInputRole')"
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'CreateUserGroup',
    mixins: [locale],
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
                        message: this.t('view.userManage.PleaseInputGroupName'),
                        trigger: 'blur'
                    },
                    { validator: commonNameValidator, trigger: 'blur' },
                ],
                roles: [
                    {
                        required: true,
                        message: this.t('view.userManage.PleaseInputRole'),
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
            return this.params.uuid ? this.t('view.userManage.EditGroup') : this.t('view.userManage.NewGroup');
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
        onClose() {
            this.clearState();
            this.$emit('close');
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
                if (this.params.uuid) {
                    let params = removeSameAttr(this.saveGroupObj, groupData);
                    promise = updateGroups(this.params.uuid, params);
                } else {
                    groupData.permissions = [];
                    promise = createGroup(groupData);
                }
                return promise.then(() => {
                    this.$message({
                        message: this.params.uuid ? this.t('view.userManage.Modified_user_group_successfully') : this.t('view.userManage.User_group_created_successfully'),
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
                    this.params.roles = this.params.roles.map(item => typeof item === 'string' ? item : item.uuid);
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
