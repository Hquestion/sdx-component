<template>
    <sdxu-dialog
        class="sdxw-userInfo"
        size='small'
        :visible.sync="dialogVisible"
        @close="dialogClose"
        no-footer
    >
        <div slot="title">
            {{t('widget.userInfo.title')}}
        </div>
        <div class="sdxw-userInfo__content">
            <div class="sdxw-userInfo__item">
                <span class="sdxw-userInfo__item--title">
                    {{t('widget.userInfo.username')}}：
                </span> 
                <span class="sdxw-userInfo__item--data">
                    {{userInfoData.userName}}
                </span>
            </div>
            <div class="sdxw-userInfo__item">
                <span class="sdxw-userInfo__item--title">
                    {{t('widget.userInfo.fullname')}}：
                </span>
                <span class="sdxw-userInfo__item--data">
                    {{userInfoData.fullName}}
                </span>
            </div>
            <div class="sdxw-userInfo__item">
                <span class="sdxw-userInfo__item--title">
                    {{t('widget.userInfo.password')}}：
                </span>
                <span class="sdxw-userInfo__item--data">
                    {{userInfoData.password}}
                </span>
            </div>
            <div class="sdxw-userInfo__item">
                <span class="sdxw-userInfo__item--title">
                    {{t('widget.userInfo.groups')}}：
                </span>
                <div class="sdxw-userInfo__item--group">
                    <span 
                        v-for="item in userInfoData.group" 
                        :key="item"
                    >
                        {{item}}
                    </span>
                </div>
            </div>
        </div>
    </sdxu-dialog>
</template>
<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    data () {
        return {
            dialogVisible: this.visible
        }
    },
    mixins:[locale],
    props:{
        visible: {
            type: Boolean,
            default: false
        },
        userInfoData:{
            type: Object
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    methods:{
        dialogClose() {
            this.$emit('update:visible', false); 
            this.$emit('close');
        }
    },
    components:{
        SdxuDialog
    }
}
</script>
