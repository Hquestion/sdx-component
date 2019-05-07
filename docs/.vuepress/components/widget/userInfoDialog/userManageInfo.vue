<template>
    <div>
        <a @click.prevent="open">
            用户管理查看用户信息
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
            theme:'userManageInfo',
            dialogVisible: false,
            userInfoData:{
                userName:'zhang',
                fullName:'张某',
                password:'******',
                roles:[
                    '角色A',
                    '角色B',
                    '角色C',
                ],
                group:[
                    'group1',
                    'group2',
                    'group3',
                ]
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
