<template>
    <div>
        <SdxuButton @click="open" :loading="false" :plain="true" type="default" :invert="true" :shadow="true">打开用户详情</SdxuButton>
        <sdxw-userInfoDialog 
            :visible.sync="dialogVisible"
            :userInfoData="userInfoData"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '@sdx/widget/components/userInfoDialog'
import httpService from '@sdx/utils/src/http-service';
export default {
    data () {
        return {
            dialogVisible: false,
            userInfoData:{},
        }
    },
    methods:{
        open(){
            this.dialogVisible = true;
            this.getUserInfo();
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
