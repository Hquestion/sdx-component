<template>
    <div>
        <button @click.prevent="open">
            点击打开用户详情
        </button>
        <sdxw-userInfoDialog
            :visible.sync="dialogVisible"
            :userInfoData="userInfoData"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '../../src/widget/userinfo-dialog'
import SdxuButton from '@sdx/ui/components/button'
export default {
    data () {
        return {
            dialogVisible: false,
            userInfoData:{
                userName:'zhang',
                fullName:'张某',
                roleNames: ['管理员','普通用户'],
                groupNames:[
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
