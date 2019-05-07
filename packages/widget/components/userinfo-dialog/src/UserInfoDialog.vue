<template>
    <div>
        <sdxu-dialog
            class="sdxw-userinfo"
            size='small'
            v-if="theme == 'user'"
            :visible.sync="dialogVisible"
            @close="dialogClose"
            no-footer
        >
            <div slot="title">
                {{t('widget.userInfo.title')}} 
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
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.fullname')}}：
                    </span>
                    <span class="sdxw-userinfo__item--data">
                        {{users.fullName}}
                    </span>
                </div>
                <div class="sdxw-userinfo__item">
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
                        <span 
                            v-for="item in users.roles" 
                            :key="item"
                        >
                            {{item}}
                        </span>
                    </div>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.groups')}}：
                    </span>
                    <div class="sdxw-userinfo__item--group">
                        <span 
                            v-for="item in users.group" 
                            :key="item"
                        >
                            {{item}}
                        </span>
                    </div>
                </div>
            </div>
        </sdxu-dialog>

        <sdxu-dialog
            class="sdxw-userinfo sdxw-userinfo__dashborad"
            size='small'
            v-if="theme == 'dashboard'"
            :visible.sync="dialogVisible"
            @close="dialogClose"
            no-footer
        >
            <div slot="title" class="sdxw-userinfo__title">
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
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.fullname')}}：
                    </span>
                    <span class="sdxw-userinfo__item--data sdxw-userinfo__item--fullname">
                        {{users.fullName}}
                    </span>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.role')}}：
                    </span>
                    <span class="sdxw-userinfo__item--data">
                        {{users.role}}
                    </span>
                </div>
                <div class="sdxw-userinfo__item">
                    <span class="sdxw-userinfo__item--title">
                        {{t('widget.userInfo.groups')}}：
                    </span>
                    <div class="sdxw-userinfo__item--group">
                        <span 
                            v-for="item in users.group" 
                            :key="item"
                        >
                            {{item}}
                        </span>
                    </div>
                </div>
            </div>
        </sdxu-dialog>

    </div>
</template>
<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import locale from '@sdx/utils/src/mixins/locale';
import httpService from '@sdx/utils/src/http-service';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
export default {
    name:'SdxwUserInfoDialog',
    data () {
        return {
            dialogVisible: this.visible,
            users:this.userInfoData
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
                    role:'',
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
                httpService.get('https://easy-mock.com/mock/5cd04685adb0973be6a3d969/api/v1/users/:uuid')
                .then(res=>{
                    this.users = res;
                });
            }
        }
    },
    components:{
        SdxuDialog
    }
}
</script>
