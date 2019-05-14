<template>
    <div class="api">
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
                        params: 'size',
                        describe: '大小',
                        type: 'string',
                        optionValue: 'large / regular / small',
                        defaultValue: 'regular',
                    }, {
                        params: 'color',
                        describe: 'placeholder块级元素的背景色',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '#FAFBFC',
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
