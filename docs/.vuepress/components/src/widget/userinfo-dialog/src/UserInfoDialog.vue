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
                    <use xlink:href="#sdx-icon-UserInfo" />
                </svg>
                <span>{{ t('widget.userInfo.title') }} </span>
            </div>
            <el-form label-width="80px" class="sdxw-userinfo__content">
                <el-form-item :label="t('widget.userInfo.username')">
                    <span>{{ users.userName }}</span>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.fullname')">
                    <span v-if="theme == 'user'">
                        {{ users.fullName }}
                    </span>
                    <SdxuInput
                        v-if="theme == 'dashboard'"
                        type="text"
                        v-model="users.fullName"
                    >
                    </SdxuInput>
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.role') ">
                    <SdxwFoldLabelGroup
                        :list="users.roleNames"
                        type="default"
                    />
                </el-form-item>
                <el-form-item :label="t('widget.userInfo.groups')">
                    <SdxwFoldLabelGroup
                        :list="users.groupNames"
                        type="default"
                    />
                </el-form-item>
            </el-form>
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
import SdxuDialog from '../../../ui/Dialog';
import locale from '@sdx/utils/src/mixins/locale';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuInput from "@sdx/ui/components/input";
export default {
    name:'SdxwUserInfoDialog',
    data () {
        return {
            showInput:false,
            dialogVisible: this.visible,
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
                    userName:'',
                    fullName:'',
                    roleNames:[],
                    groupNames:[]
                };
            }
        },
        theme:{
            type:String,
            default:'user'
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
            document.getElementById('fullName').focus();
        },
        //隐藏fullName input框
        hideFullNameInput() {
            this.showInput = false;
            document.getElementById('fullName').blur();
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
                    });
            }
        }
    },
    components:{
        SdxuInput,
        SdxuDialog,
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup
    }
};
</script>
