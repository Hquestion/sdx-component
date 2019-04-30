<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes" />
        <CommonApi :apiData="eventData" title="Events" type="event"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'groupApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'v-model',
                        describe: 'tab-radio的model，会设置焦点状态',
                        type: 'string',
                        optionValue: 'TabRadioItem的name值',
                        defaultValue: '',
                    }
                ],
                eventData: [
                    {
                        params: 'switch',
                        describe: 'tab切换事件',
                        cbparams: '切换至的tab的name',
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
