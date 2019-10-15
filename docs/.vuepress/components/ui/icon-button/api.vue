<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
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
                        params: 'size',
                        describe: '尺寸',
                        type: 'string',
                        optionValue: 'large / regular / small ',
                        defaultValue: 'regular',
                    }, {
                        params: 'icon',
                        describe: 'iconfont图标class类名',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }, {
                        params: 'active',
                        describe: '是否激活状态',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'disable',
                        describe: '是否禁用',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'title',
                        describe: '原生title属性',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }
                ],
                eventData: [
                    {
                        params: 'click',
                        describe: '鼠标点击事件',
                        cbparams: '—',
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
