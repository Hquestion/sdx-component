<template>
    <div class="home">
        <img
            alt="Vue logo"
            src="../assets/logo.png"
        >
        <SdxFilePop></SdxFilePop>
        <SdxwFileSelectMain check-type="file" v-model="files" accept="img/png;.py"></SdxwFileSelectMain>
        <SdxuLazyList :load="loadData" item-key="uuid" store-name="file" store-keys="uuid,name" :item-height="50" style="height: 400px;">
            <template #default="{data}">
                <div >{{data.name}}</div>
            </template>
        </SdxuLazyList>
    </div>
</template>

<script>
// @ is an alias to /src
import SdxFilePop from '@sdx/widget/components/file-select/src/FileSelectPop';
import SdxwFileSelectMain from '@sdx/widget/components/file-select/src/FileSelectMix';
import SdxuLazyList from '@sdx/ui/components/lazy-list/src/LazyList';

export default {
    name: 'Home',
    components: {
        SdxuLazyList,
        SdxFilePop,
        SdxwFileSelectMain
    },
    data() {
        return {
            checkedNodes: [],
            searchCheckedNodes: [],
            files: []
        };
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
                }, 3000);
            });
        }
    }
};
</script>
