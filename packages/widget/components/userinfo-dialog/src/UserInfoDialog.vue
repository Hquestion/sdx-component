<template>
    <div>
        <sdxu-dialog
            class="sdxw-userinfo"
            :class="[`sdxw-userinfo__${theme}`]"
            :visible.sync="dialogVisible"
            size="small"
            @close="dialogClose"
            :no-footer="dashboardBtn || theme !== 'dashboard'"
            :title="t('widget.userInfo.title')"
            :title-icon="theme == 'dashboard' ? 'sdx-icon-UserInfo' : ''"
            @confirm="confirm"
            @open="open"
        >
            <el-form
                label-width="80px"
                class="sdxw-userinfo__content"
            >
                <el-form-item :label="t('widget.userInfo.username')">
                    <span style="word-break: break-all;">{{ users.username }}</span>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.fullname')">
                    <span
                        v-if="theme == 'user'"
                        style="word-break: break-all;"
                    >
                        {{ users.fullName }}
                    </span>
                    <div
                        class="sdxw-userinfo__full-name"
                        v-if="theme == 'dashboard'"
                    >
                        <SdxuInput
                            class="sdxw-userinfo__full-name-input"
                            type="text"
                            v-model="users.fullName"
                            @focus="focusBtn"
                        />
                    </div>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.role') ">
                    <SdxwFoldLabelGroup
                        v-if="roleNames && roleNames.length > 0"
                        class="sdxw-userinfo__label-group"
                        :list="roleNames"
                        type="default"
                    />
                    <span v-else>{{ t('widget.userInfo.noRole') }}</span>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.groups')">
                    <SdxwFoldLabelGroup
                        v-if="groupNames && groupNames.length > 0"
                        class="sdxw-userinfo__label-group"
                        :list="groupNames"
                        type="default"
                    />
                    <span v-else>{{ t('widget.userInfo.noGroup') }}</span>
                </el-form-item>
            </el-form>
        </sdxu-dialog>
    </div>
</template>
<script>
import {
    getUserDetail ,
    updataUser
} from '@sdx/utils/src/api/user';
import SdxuDialog from '@sdx/ui/components/dialog';
import locale from '@sdx/utils/src/mixins/locale';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuInput from '@sdx/ui/components/input';
import ElForm from 'element-ui/lib/form';
import ElFormItem from 'element-ui/lib/form-item';
export default {
    name:'SdxwUserInfoDialog',
    data () {
        return {
            showInput:false,
            dialogVisible: this.visible,
            dashboardBtn: true,
            users: {}
        };
    },
    mixins:[locale],
    props:{
        visible: {
            type: Boolean,
            default: false
        },
        userInfoData: {
            type: Object,
            default: () => {
                return {
                    username:'',
                    fullName:'',
                    roles:[],
                    group:[]
                };
            }
        },
        theme: {
            type:String,
            default: 'user'
        },
        id: {
            type:String,
            default:''
        }
    },
    computed: {
        roleNames() {
            if (this.users && this.users.roleNames) {
                return this.users.roleNames;
            } else if (this.users && this.users.roles) {
                return this.users.roles.map(item => item.name || item.uuid);
            }else {
                return [];
            }
        },
        groupNames() {
            if (this.users && this.users.groupNames) {
                return this.users.groupNames;
            } else if (this.users && this.users.groups) {
                return this.users.groups.map(item => item.name || item.uuid);
            } else {
                return [];
            }
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        },
        userInfoData:{
            immediate: true,
            deep: true,
            handler(nVal) {
                this.users = JSON.parse(JSON.stringify(nVal));
            }
        },
        id(nVal) {
            this.getData();
        }
    },
    methods:{
        dialogClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
            this.dashboardBtn = true;
            this.users={};
        },
        getData() {
            if(this.id){
                getUserDetail(this.id)
                    .then(( res ) => {
                        this.users = res;
                        this.users.group = res.groupNames;
                        this.users.roles = res.roleNames;
                    });
            }
        },
        focusBtn() {
            this.dashboardBtn = false;
        },
        confirm() {
            if(this.users.fullName!=''){
                updataUser(this.users.uuid, {
                    fullName: this.users.fullName
                }).then((data) => {
                    // 传给业务组件更新vuex
                    this.$emit('confirmUser', data);
                    this.$emit('update:visible', false);
                });
            }
        },
        open() {
            this.users = JSON.parse(JSON.stringify(this.userInfoData));
        }
    },
    components:{
        SdxuInput,
        SdxuDialog,
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup,
        ElForm,
        ElFormItem
    }
};
</script>


