<template>
    <div class="api">
        <CommonApi :apiData="slotData" title="Slots" type="slot"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'ButtonApi',
        data() {
            return {
                slotData: [
                    {
                        params: 'default',
                        describe: '默认插槽，一段文字或者其他任意内容。默认为"暂无内容"'
                    }
                ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>
