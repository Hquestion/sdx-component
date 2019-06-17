

<template>
    <div>
        <sdxu-dialog
            class="sdxw-userinfo"
            :class="[`sdxw-userinfo__${theme}`]"
            :visible.sync="dialogVisible"
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
                    <span>{{ users.username }}</span>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.fullname')">
                    <span v-if="theme == 'user'" style="word-break: break-all;">
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
                        v-if="users && users.roleNames && users.roleNames.length > 0"
                        class="sdxw-userinfo__label-group"
                        :list="users.roleNames"
                        type="default"
                    />
                    <span v-else>暂无角色</span>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.groups')">
                    <SdxwFoldLabelGroup
                        v-if="users && users.groupNames && users.groupNames.length > 0"
                        class="sdxw-userinfo__label-group"
                        :list="users.groupNames"
                        type="default"
                    />
                    <span v-else>暂未加入用户组</span>
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
        userInfoData:{
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
        theme:{
            type:String,
            default:''
        },
        id:{
            type:String,
            default:''
        }
    },
    computed: {

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
            this.user={};
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
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup
    }
};
</script>


