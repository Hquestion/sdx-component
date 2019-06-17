<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Slots" type="slot"/>
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
                        params: '—',
                        describe: '默认插槽，将所有的IconButton按钮放在这里'
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
