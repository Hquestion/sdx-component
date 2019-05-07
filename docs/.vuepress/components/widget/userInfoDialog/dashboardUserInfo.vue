<template>
    <div>
        <a @click.prevent="open">
            dashboard查看用户信息
        </a>
        <sdxw-userInfoDialog 
            :visible.sync="dialogVisible"
            :userInfoData="userInfoData"
            :theme="theme"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '@sdx/widget/components/userinfo-dialog'
import SdxuButton from '@sdx/ui/components/button'
export default {
    data () {
        return {
            theme:'dashboardUserInfo',
            dialogVisible: false,
            userInfoData:{
                userName:'zhang',
                fullName:'张某',
                password:'******',
                group:[
                    'group1',
                    'group2',
                    'group3',
                ],
                role:'普通用户'
            },
        }
    },
    methods:{
        open(){
            this.dialogVisible = true;
        }
    },
    components:{
        SdxwUserInfoDialog,
        SdxuButton
    }
}
</script>
