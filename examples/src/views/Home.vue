<template>
    <div class="home">
        <img
            alt="Vue logo"
            src="../assets/logo.png"
        >
        <SdxFilePop></SdxFilePop>
        <SdxwFileSelectMain check-type="file" v-model="files" accept="img/png;.py"></SdxwFileSelectMain>
    </div>
</template>

<script>
// @ is an alias to /src
import SdxFilePop from '@sdx/widget/components/file-select/src/FileSelectPop';
import SdxwFileSelectMain from '@sdx/widget/components/file-select/src/FileSelectMix';

export default {
    name: 'Home',
    components: {
        SdxFilePop,
        SdxwFileSelectMain
    },
    data() {
        return {
            checkedNodes: [],
            searchCheckedNodes: [],
            files: []
        };
    }
};
</script>
