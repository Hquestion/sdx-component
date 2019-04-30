<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'itemApi',
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
                        params: 'name',
                        describe: 'tab名称，用于切换tab',
                        type: 'string',
                        optionValue: '—',
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

<style lang="scss" scoped>

</style>
