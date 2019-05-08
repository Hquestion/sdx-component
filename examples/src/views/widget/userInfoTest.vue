<template>
    <div>
        <SdxuButton @click="open('dashboard')" :loading="false" :plain="true" type="default" :invert="true" :shadow="true">dashboard用户信息(直接渲染)</SdxuButton>
        <SdxuButton @click="open('user')" :loading="false" :plain="true" type="default" :invert="true" :shadow="true">userManage用户信息（传入ID）</SdxuButton>
        <sdxw-userInfoDialog 
            :visible.sync="dialogVisible"
            :userInfoData="userInfoData"
            :theme="theme"
            :id="id"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '@sdx/widget/components/userinfo-dialog'
import httpService from '@sdx/utils/src/http-service';
export default {
    data () {
        return {
            dialogVisible: false,
            userInfoData:{},
            theme:'dashboard',  //dashboard user
            id:''
        }
    },
    methods:{
        open(theme){
            this.theme = theme;
            this.dialogVisible = true;
            if(theme == 'dashboard'){
                this.getUserInfo();
            }else if(theme == 'user'){
                this.id = '123';
            }
        },
        getUserInfo(){
            httpService.get('http://10.115.1.130:3000/user')
                .then(res=>{
                    this.userInfoData = res;
                });
        }
    },
    components:{
        SdxwUserInfoDialog
    }
}
</script>
