<template>
    <div>
        <sdxu-dialog
            class="sdxw-userinfo"
            :class="[`sdxw-userinfo__${theme}`]"
            size='small'
            :visible.sync="dialogVisible"
            @close="dialogClose"
            no-footer
        >
            <div  v-if="theme == 'user'" slot="title" :class="`sdxw-userinfo__user--title`">
                {{t('widget.userInfo.title')}} 
            </div>
            <div v-if="theme == 'dashboard'" slot="title" :class="`sdxw-userinfo__dashboard--title`">
                <svg
                    class="icon"
                    aria-hidden="true"
                >
                    <use xlink:href="#iconicon-UserInfo" />
                </svg>
                <span>{{t('widget.userInfo.title')}} </span>
            </div>
            <div class="sdxw-userinfo__content">
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.username')}}：
                    </span> 
                    <span class="sdxw-userinfo__item--data">
                        {{users.userName}}
                    </span>
                </div>
                <div class="sdxw-userinfo__item" :class="[`sdxw-userinfo__item--${theme}fullname`]">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.fullname')}}：
                    </span>
                    <span  v-if="theme == 'user'" class="sdxw-userinfo__item--data">
                        {{users.fullName}}
                    </span>
                    <input v-if="theme == 'dashboard'" type="text" id="" v-model="users.fullName">
                </div>
                <div v-if="theme == 'user'" class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.password')}}：
                    </span>
                    <span class="sdxw-userinfo__item--data">
                        {{users.password}}
                    </span>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.role')}}：
                    </span>
                    <div class="sdxw-userinfo__item--role">
                        <SdxwFoldLabelGroup 
                            :list="users.roles" 
                            type="default"
                        >
                        </SdxwFoldLabelGroup>
                    </div>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.groups')}}：
                    </span>
                    <div class="sdxw-userinfo__item--group">
                        <SdxwFoldLabelGroup 
                            :list="users.group" 
                            type="default"
                        >
                        </SdxwFoldLabelGroup>
                    </div>
                </div>
            </div>
        </sdxu-dialog>
    </div>
</template>
<script>
import { userApi } from '@sdx/utils/src/api';
import SdxuDialog from '@sdx/ui/components/dialog';
import locale from '@sdx/utils/src/mixins/locale';
import httpService from '@sdx/utils/src/http-service';
import SdxwFoldLabelGroup from '@sdx/widget/components/fold-label/src/FoldLabelGroup';
export default {
    name:'SdxwUserInfoDialog',
    data () {
        return {
            dialogVisible: this.visible,
            users:this.userInfoData,
        }
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
                    password:'',
                    roles:[],
                    group:[]
                }
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
        getData(){
            if(this.id){
                userApi.getUserDetail(this.id)
                    .then(( res ) => {
                        this.users = res;    
                    }).catch(() => {
                    
                    });
            }
        }
    },
    components:{
        SdxuDialog,
        SdxwFoldLabelGroup
    }
}
</script>
