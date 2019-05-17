<template>
    <!-- 新增用户 -->
    <div class="sdxv-user-manage__userform">
        <sdxu-dialog
            :visible.sync="visible"
            @close="close"
        >
            <div slot="title">
                编辑用户
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
                        <span>{{ user.username }}</span>
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
                        label="角色："
                        prop="role"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            v-model="user.role"
                            multiple
                            placeholder="请选择用户角色"
                        >
                            <el-option
                                v-for="item in roles"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="激活："
                    >
                        <el-radio-group
                            v-model="user.isActive"
                        >
                            <el-radio label="true">
                                是
                            </el-radio>
                            <el-radio label="false">
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
                                v-for="item in user.timeGroups"
                                :key="item"
                                :label="item"
                                :value="item"
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
import { nameValidate, cNameValidate } from '../validate';
import SdxuInput from '@sdx/ui/components/input';
import { getUserDetail , updataUser } from '@sdx/utils/src/api/user';
import { getRolesList} from '@sdx/utils/src/api/rolemange';
export default {
    name:'EditUser',
    data () {
        return {
            visible:true,
            rules: {
                username: [
                    {required: true,message: '请输入用户名',trigger: 'blur'},
                    { validator: nameValidate, trigger: 'blur' },
                ],
                fullName: [
                    { required: true, message: '请输入显示名', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ]
            },
            user: {
                username: '',
                fullName: '',
                isActive:false,
                timeGroups:[],
                role:[],
                expire_at:''
            },
            roles:[]
        };
    },
    watch:{
        userDetail(nVal) {
            this.user = nVal;
        },
    },
    methods: {
        close() {
            this.$emit('cancelEditUserDialog',false);
            this.$refs['userForm'].resetFields();
        },
        confirm() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    updataUser(this.user)
                        .then( (res => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }));
                    this.close();
                } else {
                    return false;
                }
            });
        },
        _getGroups() {
            getUserDetail(this.$route.query.uuid)
                .then( res => {
                    this.user = res;
                    this.user.role = res.roleNames;
                });
        },
        _getRolesList() {
            getRolesList()
                .then( res=>{
                    this.roles = res.roles.map( (item)=>{
                        return item.name;
                    });
                });
        }
    },
    components: {
        SdxuInput
    },
    mounted() {
        this._getGroups();
        this._getRolesList();
    }
};
</script>

<style lang='scss' scoped>

</style>
