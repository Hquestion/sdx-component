<template>
    <div>
        <sdxu-dialog
            class="sdxw-userinfo"
            :class="[`sdxw-userinfo__${theme}`]"
            size="small"
            :visible.sync="dialogVisible"
            @close="dialogClose"
            no-footer
        >
            <div
                v-if="theme == 'user'"
                slot="title"
                :class="`sdxw-userinfo__user--title`"
            >
                {{ t('widget.userInfo.title') }}
            </div>
            <div
                v-if="theme == 'dashboard'"
                slot="title"
                :class="`sdxw-userinfo__dashboard--title`"
            >
                <svg
                    class="icon"
                    aria-hidden="true"
                >
                    <use xlink:href="#iconicon-UserInfo" />
                </svg>
                <span>{{ t('widget.userInfo.title') }} </span>
            </div>
            <div class="sdxw-userinfo__content">
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{ t('widget.userInfo.username') }}：
                    </span>
                    <span class="sdxw-userinfo__item--data">
                        {{ users.username }}
                    </span>
                </div>
                <div
                    class="sdxw-userinfo__item"
                    :class="[`sdxw-userinfo__item--${theme}fullname`]"
                >
                    <span class="sdxw-userinfo__item--title">
                        {{ t('widget.userInfo.fullname') }}：
                    </span>
                    <span
                        v-if="theme == 'user'"
                        class="sdxw-userinfo__item--data"
                    >
                        {{ users.fullName }}
                    </span>
                    <input
                        :class="[showInput == true? 'sdxw-userinfo__item--input' : '']"
                        @mouseover="showFullNameInput"
                        @mouseout="hideFullNameInput"
                        @keydown.enter="changeFullName"
                        v-if="theme == 'dashboard'"
                        id="fullName"
                        type="text"
                        v-model="users.fullName"
                    >
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{ t('widget.userInfo.role') }}：
                    </span>
                    <div class="sdxw-userinfo__item--role">
                        <SdxwFoldLabelGroup
                            :list="users.roles"
                            type="default"
                        />
                    </div>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{ t('widget.userInfo.groups') }}：
                    </span>
                    <div class="sdxw-userinfo__item--group">
                        <SdxwFoldLabelGroup
                            :list="users.group"
                            type="default"
                        />
                    </div>
                </div>
            </div>
        </sdxu-dialog>
    </div>
</template>
<script>
import {
    getUserDetail ,
    getGroupDetail,
    getRoleDetail,
    changeUserInfo
} from '@sdx/utils/src/api/user';
import SdxuDialog from '@sdx/ui/components/dialog';
import locale from '@sdx/utils/src/mixins/locale';
import httpService from '@sdx/utils/src/http-service';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
export default {
    name:'SdxwUserInfoDialog',
    data () {
        return {
            showInput:false,
            dialogVisible: this.visible,
            users:this.userInfoData
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
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        },
        userInfoData(nVal) {
            this.users = nVal;
        },
        id(nVal) {
            this.getData();
        }
    },
    methods:{
        dialogClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        //显示fullName input框
        showFullNameInput() {
            this.showInput = true;
            document.getElementById("fullName").focus();
        },
        //隐藏fullName input框
        hideFullNameInput() {
            this.showInput = false;
            document.getElementById("fullName").blur();
        },
        //修改fullName的值
        changeFullName() {
            if(this.users.fullName!=''){
                changeUserInfo(this.users)
                    .then((res) => {
                        this.$message({
                            message: '显示名修改成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                    });
            }
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
        }
    },
    components:{
        SdxuDialog,
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup
    }
};
</script>
