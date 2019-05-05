<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <!-- <CommonApi :apiData="slotData" title="Slots" type="slot"/>
        <CommonApi :apiData="eventData" title="Events" type="event"/> -->
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'InputApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'size',
                        describe: '尺寸',
                        type: 'string',
                        optionValue: 'regular / small ',
                        defaultValue: 'regular',
                    }, {
                        params: 'searchable',
                        describe: '搜索图标',
                        type: 'boolean',
                        optionValue: 'true / false ',
                        defaultValue: 'false',
                    }, {
                        params: 'passwordVisibleness',
                        describe: '密码可见性图标',
                        type: 'boolean',
                        optionValue: 'true / false ',
                        defaultValue: 'false',
                    }, {
                        params: 'passwordStrength',
                        describe: '密码强度',
                        type: 'boolean',
                        optionValue: 'true / false ',
                        defaultValue: 'false',
                    }
                ],
                // eventData: [
                //     {
                //         params: 'click',
                //         describe: '鼠标点击事件',
                //         cbparams: '—',
                //     }
                // ],
                // slotData: [
                //     {
                //         params: 'default',
                //         describe: '默认插槽，按钮内容'
                //     },
                //     {
                //         params: 'dropdown',
                //         describe: 'dropdown插槽，dropdown内容，按钮插入时会以block方式展示'
                //     }
                // ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>
