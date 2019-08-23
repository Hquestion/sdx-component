<template>
    <!-- 新增用户 -->
    <div class="sdxv-user-manage__userform">
        <sdxu-dialog
            :visible.sync="visible"
            @close="close"
        >
            <div slot="title">
                {{ t('view.userManage.EditUser') }}
            </div>
            <el-form
                :model="user"
                label-width="100px"
                :status-icon="true"
                :rules="rules"
                ref="userForm"
            >
                <div class="userform">
                    <el-form-item
                        :label="t('view.userManage.Username') + '：'"
                        prop="username"
                    >
                        <span class="sdxv-user-manage__userform--username">{{ user.username }}</span>
                    </el-form-item>
                    <el-form-item
                        :label="t('view.userManage.FullName') + '：'"
                        prop="fullName"
                    >
                        <sdxu-input
                            v-model="user.fullName"
                            :placeholder="t('view.userManage.PleaseInputFullName')"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('view.userManage.Role') + '：'"
                        prop="roles"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            v-model="user.roles"
                            value-key="uuid"
                            multiple
                            :placeholder="t('view.userManage.PleaseInputRole')"
                        >
                            <el-option
                                v-for="item in roles"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="t('view.userManage.Activation') + '：'"
                    >
                        <el-radio-group
                            v-model="user.isActive"
                        >
                            <el-radio :label="true">
                                {{ t('sdxCommon.Yes') }}
                            </el-radio>
                            <el-radio :label="false">
                                {{ t('sdxCommon.No') }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        :label="t('view.userManage.ExpiryDate') + '：'"
                        class="self-item"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            :placeholder="t('view.userManage.PleaseSelectExpireDate')"
                            v-model="user.expireOpt"
                        >
                            <el-option
                                v-for="item in EXPIRES_OPTION"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer">
                <sdxu-button
                    type="default"
                    @click="close"
                >
                    {{ t('sdxCommon.Cancel') }}
                </sdxu-button>
                <sdxu-button
                    type="primary"
                    @click="confirm"
                >
                    {{ t('sdxCommon.Confirm') }}
                </sdxu-button>
            </div>
        </sdxu-dialog>
    </div>
</template>

<script>
import { commonNameValidator, nickNameValidator} from '@sdx/utils/src/helper/validate';
import SdxuInput from '@sdx/ui/components/input';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import { updataUser } from '@sdx/utils/src/api/user';
import { getRolesList} from '@sdx/utils/src/api/rolemange';
import ElSelect from 'element-ui/lib/select';
import ElRadioGroup from 'element-ui/lib/radio-group';
import ElRadio from 'element-ui/lib/radio';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import { EXPIRES_OPTION } from '../config';
import { minAbsIndex } from '@sdx/utils/src/helper/math';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name:'EditUser',
    mixins: [locale],
    data () {
        return {
            visible:true,
            rules: {
                username: [
                    {required: true,message: this.t('view.userManage.PleaseInputUsername'),trigger: 'blur'},
                    { validator: commonNameValidator, trigger: 'blur' },
                ],
                fullName: [
                    { required: true, message: this.t('view.userManage.PleaseInputFullName'), trigger: 'blur' },
                    { validator: nickNameValidator, trigger: 'blur' }
                ],
                roles: [
                    { required: true, message: this.t('view.userManage.PleaseInputRole'), trigger: 'change' }
                ]
            },
            roles:[],
            user: {},
            EXPIRES_OPTION
        };
    },
    props: {
        meta: {
            type: Object,
            default: () => ({})
        }
    },
    watch:{
        meta: {
            immediate: true,
            handler(val) {
                let user = Object.assign({}, val);
                let expiresAt = user.expiresAt;
                let createDate = new Date(user.createdAt);
                let expiresData = new Date(expiresAt);
                let dist = expiresData - createDate;
                let minusArr = this.EXPIRES_OPTION.map(item => item.value - dist);
                let index = minAbsIndex(minusArr);
                if (typeof index !== 'undefined' && index >= 0) {
                    user.expireOpt =  this.EXPIRES_OPTION[index].value;
                } else {
                    user.expireOpt = '';
                }
                this.user = Object.assign({}, user);
            }
        }
    },
    methods: {
        close() {
            this.$emit('cancelEditUserDialog',false);
            this.$refs['userForm'].resetFields();
        },
        confirm() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    let expireAt = '';
                    if (this.user.expireOpt) {
                        expireAt = new Date(+new Date(this.user.createdAt) + this.user.expireOpt).toISOString();
                    }
                    const newUserInfo = {
                        fullName: this.user.fullName,
                        password: this.user.password,
                        groups: [],
                        roles: this.user.roles.map(item => item.uuid),
                        permissions: [],
                        isActive: this.user.isActive,
                        uuid: this.user.uuid
                    };
                    if (expireAt) {
                        newUserInfo.expiresAt = expireAt;
                    }
                    updataUser(this.user.uuid, newUserInfo).then(res => {
                        window.console.log(Object.assign({}, this.meta, newUserInfo));
                        this.$emit('refresh', true);
                        this.$message({
                            message: this.t('view.userManage.UpdateSuccess'),
                            type: 'success'
                        });
                        this.close();
                    });
                } else {
                    return false;
                }
            });
        },
        _getRolesList() {
            getRolesList()
                .then( res=>{
                    this.roles = res.roles.map( (item)=>{
                        return item;
                    });
                });
        }
    },
    components: {
        SdxuInput,
        ElSelect,
        ElRadioGroup,
        ElRadio,
        ElFormItem,
        ElForm,
        SdxuDialog,
        SdxuButton
    },
    mounted() {
        this._getRolesList();
    }
};
</script>

<style lang='scss' scoped>

</style>
