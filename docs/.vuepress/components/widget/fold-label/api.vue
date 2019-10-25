<template>
    <div class="demo-button">
        <CommonApi :apiData="attrData" title="Attributes"/>
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
                        params: 'label',
                        describe: '标签内容',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '空',
                    }, {
                        params: 'type',
                        describe: '标签展示风格',
                        type: 'string',
                        optionValue: 'primary / default/ create / processing / running / finish / dying / die / exception / error',
                        defaultValue: 'primary',
                    }, {
                        params: 'fold',
                        describe: '是否折叠，如果折叠则只显示label的第一个字符',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'ellipse',
                        describe: '是否以省略号的方式展示',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'plain',
                        describe: '是否简洁模式（无背景）',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'status',
                        describe: '状态，用于展示不同的图标，默认无图标',
                        type: 'boolean',
                        optionValue: 'loading / warning',
                        defaultValue: '',
                    }
                ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="less" scoped>

</style>

