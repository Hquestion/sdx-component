<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <!-- <CommonApi :apiData="slotData" title="Slots" type="slot"/>-->
        <CommonApi :apiData="eventData" title="Events" type="event"/> 
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
                        params: 'type',
                        describe: '类型，新增“search”为一个搜索框,其他类型不变',
                        type: 'string',
                        optionValue: 'search / (other)',
                        defaultValue: 'text'
                    },
                    {
                        params: 'size',
                        describe: '尺寸（element中size类型失效）',
                        type: 'string',
                        optionValue: 'regular / small ',
                        defaultValue: 'regular',
                    }, {
                        params: 'searchable',
                        describe: '搜索图标是否可以点击',
                        type: 'boolean',
                        optionValue: 'true / false ',
                        defaultValue: 'false',
                    }, {
                        params: 'passwordVisibleness',
                        describe: '密码可见性图标（element中show-password属性失效）',
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
                eventData: [
                    {
                        params: 'search',
                        describe: '点击图标搜索事件',
                        cbparams: '—',
                    }
                ],
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
