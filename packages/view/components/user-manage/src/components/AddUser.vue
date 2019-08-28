<template>
    <!-- 新增用户 -->
    <div class="sdxv-user-manage__userform">
        <sdxu-dialog
            :visible.sync="addUserVisible"
            @close="close"
        >
            <div slot="title">
                {{ t('view.userManage.NewUser') }}
            </div>
            <el-form
                :model="user"
                :label-width="lang$==='en' ? '110px' : '80px'"
                :status-icon="true"
                :rules="rules"
                ref="userForm"
            >
                <div class="userform">
                    <el-form-item
                        :label="t('view.userManage.Username') + '：'"
                        prop="username"
                    >
                        <sdxu-input
                            v-model="user.username"
                            :placeholder="t('view.userManage.PleaseInputUsername')"
                        />
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
                        :label="t('view.userManage.Password') + '：'"
                        prop="password"
                    >
                        <sdxu-input
                            type="password"
                            v-model="user.password"
                            password-visibleness
                            :placeholder="t('view.userManage.PleaseInputPassword')"
                        >
                            <i class="sdx-icon sdx-icon-eye-open" />
                        </sdxu-input>
                    </el-form-item>
                    <el-form-item
                        :label="t('view.userManage.Role') + '：'"
                        prop="roles"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            v-model="user.roles"
                            multiple
                            :placeholder="t('view.userManage.PleaseInputRole')"
                        >
                            <el-option
                                v-for="item in roles"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid"
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
                            v-model="user.expire_at"
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
import { commonNameValidator,passwordValidator , nickNameValidator} from '@sdx/utils/src/helper/validate';
import SdxuInput from '@sdx/ui/components/input';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import { addUser } from '@sdx/utils/src/api/user';
import { getRolesList} from '@sdx/utils/src/api/rolemange';
import ElSelect from 'element-ui/lib/select';
import { EXPIRES_OPTION } from '../config';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    props: {

    },
    mixins: [locale],
    data () {
        return {
            addUserVisible:true,
            EXPIRES_OPTION,
            rules: {
                username: [
                    {required: true,message: this.t('view.userManage.PleaseInputUsername'),trigger: 'blur'},
                    { validator: commonNameValidator, trigger: 'blur' },
                ],
                fullName: [
                    { required: true, message: this.t('view.userManage.PleaseInputFullName'), trigger: 'blur' },
                    { validator: nickNameValidator, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: this.t('view.userManage.PleaseInputPassword'), trigger: 'blur' },
                    { validator: passwordValidator, trigger: 'blur' },
                ],
                role: [
                    { required: true, message: this.t('view.userManage.PleaseInputRole'), trigger: 'change' }
                ]
            },
            user: {
                username: '',
                fullName: '',
                password: '',
                isActive:true,
                roles:[],
                expire_at: 365*24*60*60*1000
            },
            roles: []
        };
    },
    watch:{
        userDetail(nVal) {
            this.user = nVal;
        },
    },
    methods: {
        close() {
            this.$emit('cancelAddUserDialog',false);
            this.$refs['userForm'].resetFields();
        },
        confirm() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    addUser({
                        username: this.user.username,
                        fullName: this.user.fullName,
                        password: this.user.password,
                        groups: [],
                        roles: this.user.roles,
                        permissions: [],
                        isActive: this.user.isActive,
                        expiresAt: new Date(+new Date() + this.user.expire_at).toISOString()
                    })
                        .then( (res => {
                            this.$message({
                                message: this.t('view.userManage.NewSuccess'),
                                type: 'success'
                            });
                            this.$emit('refresh');
                            this.close();
                        }));
                } else {
                    return false;
                }
            });
        },
        _getRolesList() {
            getRolesList()
                .then( res=>{
                    this.roles = res.roles;
                }, () => {
                    this.roles = [];
                });
        }
    },
    components: {
        SdxuInput,
        ElSelect,
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
