<template>
    <div>
        <a @click.prevent="open">
            点击打开用户详情
        </a>
        <sdxw-userInfoDialog 
            :visible.sync="dialogVisible"
            :userInfoData="userInfoData"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '@sdx/widget/components/userInfoDialog'
import SdxuButton from '@sdx/ui/components/button'
export default {
    data () {
        return {
            dialogVisible: false,
            userInfoData:{
                userName:'zhang',
                fullName:'张某',
                password:'******',
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
