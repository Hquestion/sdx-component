<template>
    <!-- 新增用户 -->
    <div class="sdxv-user-manage__userform">
        <sdxu-dialog
            :visible.sync="addUserVisible"
            @close="close"
        >
            <div slot="title">
                新建用户
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
                        label="用户名："
                        prop="username"
                    >
                        <sdxu-input
                            v-model="user.username"
                            placeholder="请输入用户名"
                        />
                    </el-form-item>
                    <el-form-item
                        label="显示名："
                        prop="fullName"
                    >
                        <sdxu-input
                            v-model="user.fullName"
                            placeholder="请输入显示名"
                        />
                    </el-form-item>
                    <el-form-item
                        label="密码："
                        prop="password"
                    >
                        <sdxu-input
                            type="password"
                            v-model="user.password"
                            password-visibleness
                            placeholder="请输入密码"
                        >
                            <i class="sdx-icon sdx-icon-eye-open" />
                        </sdxu-input>
                    </el-form-item>
                    <el-form-item
                        label="角色："
                        prop="roles"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            v-model="user.roles"
                            multiple
                            placeholder="请选择用户角色"
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
                        label="激活："
                    >
                        <el-radio-group
                            v-model="user.isActive"
                        >
                            <el-radio :label="true">
                                是
                            </el-radio>
                            <el-radio :label="false">
                                否
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="有效期："
                        class="self-item"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            placeholder="请选择有效期"
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
                    取 消
                </sdxu-button>
                <sdxu-button
                    type="primary"
                    @click="confirm"
                >
                    确定
                </sdxu-button>
            </div>
        </sdxu-dialog>
    </div>
</template>

<script>
import { nameValidate } from '../validate';
import SdxuInput from '@sdx/ui/components/input';
import { addUser } from '@sdx/utils/src/api/user';
import { getRolesList} from '@sdx/utils/src/api/rolemange';
import ElSelect from 'element-ui/lib/select';
import { EXPIRES_OPTION } from '../config';
export default {
    props: {

    },
    data () {
        return {
            addUserVisible:true,
            EXPIRES_OPTION,
            rules: {
                username: [
                    {required: true,message: '请输入用户名',trigger: 'blur'},
                    { validator: nameValidate, trigger: 'blur' },
                ],
                fullName: [
                    { required: true, message: '请输入显示名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ]
            },
            user: {
                username: '',
                fullName: '',
                password: '',
                isActive:false,
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
                                message: '创建成功',
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
        ElSelect
    },
    mounted() {
        this._getRolesList();
    }
};
</script>

<style lang='scss' scoped>

</style>
