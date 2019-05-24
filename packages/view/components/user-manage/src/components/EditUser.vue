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
                        prop="roles"
                    >
                        <el-select
                            class="sdxv-user-manage__userform--select"
                            v-model="user.roles"
                            value-key="uuid"
                            multiple
                            placeholder="请选择用户角色"
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
import { updataUser } from '@sdx/utils/src/api/user';
import { getRolesList} from '@sdx/utils/src/api/rolemange';
import ElSelect from 'element-ui/lib/select';
import ElRadioGroup from 'element-ui/lib/radio-group';
import ElRadio from 'element-ui/lib/radio';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
import { EXPIRES_OPTION } from '../config';
import { minAbsIndex } from '@sdx/utils/src/helper/math';

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
                roles: [
                    { required: true, message: '请选择角色', trigger: 'change' }
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
                            message: '修改成功',
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
        ElForm
    },
    mounted() {
        this._getRolesList();
    }
};
</script>

<style lang='scss' scoped>

</style>
