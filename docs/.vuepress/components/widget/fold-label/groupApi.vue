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
                        params: 'list',
                        describe: '标签组列表， 如["label1", "label2"]',
                        type: 'Array',
                        optionValue: '—',
                        defaultValue: '[]',
                    }, {
                        params: 'mode',
                        describe: '标签展示模式，默认list。（inline: 会在一行内展示，宽度依赖外部容器，宽度不足时...展示；list: 会作为列表展示，宽度不足时换行展示）',
                        type: 'string',
                        optionValue: 'list / inline',
                        defaultValue: 'list',
                    }, {
                        params: 'type',
                        describe: '标签的风格，目前两种风格',
                        type: 'string',
                        optionValue: 'primary / default',
                        defaultValue: 'primary',
                    }, {
                        params: 'inlineMaxShow',
                        describe: 'mode为inline时，最多展示多少个标签（如果标签列表长度>inlineShowMax，则会替换为...展示）',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '3',
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
