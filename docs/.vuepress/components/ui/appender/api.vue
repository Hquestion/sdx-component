<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <CommonApi :apiData="slotData" title="Slots" type="slot"/>
        <CommonApi :apiData="eventData" title="Events" type="event"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'ButtonApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'prefix',
                        describe: '前缀图标',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '--',
                    }, {
                        params: 'postfix',
                        describe: '后缀图标',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '--',
                    }
                ],
                eventData: [
                    {
                        params: 'click.pre',
                        describe: '前缀鼠标点击事件',
                        cbparams: '—',
                    },
                    {
                        params: 'click.post',
                        describe: '后缀鼠标点击事件',
                        cbparams: '—',
                    }
                ],
                slotData: [
                    {
                        params: 'default',
                        describe: '默认插槽，内容主体'
                    },
                    {
                        params: 'prefix',
                        describe: '前缀插槽，也可以通过prefix属性设置前缀图标'
                    },
                    {
                        params: 'postfix',
                        describe: '后缀插槽，也可以通过postfix属性设置后缀图标'
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
