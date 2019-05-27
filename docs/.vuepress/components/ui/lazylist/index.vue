<template>
    <div class="index">
        <SdxuLazyList :load="loadData" item-key="uuid" store-name="file" store-keys="uuid,name" :item-height="50" style="height: 400px;">
            <template #default="{data}">
                <div >{{data.name}}</div>
            </template>
        </SdxuLazyList>
    </div>
</template>

<script>
import SdxuLazyList from '@sdx/ui/components/lazy-list';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        SdxuLazyList
    },
    methods: {
        loadData(pageIndex) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        data: [
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                        ],
                        total: 100
                    });
                }, 1000);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 100%;
    }
</style>
