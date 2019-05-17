<template>
    <div class="table">
        <Jupyter />
    </div>
</template>

<script>

import Jupyter from '@sdx/view/components/project-management/src/forms/JupyterForm';

export default {
    data () {
        return {
        };
    },
    components: {
        Jupyter
    },
    methods: {
       
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table {
    background: #fafbfc;
    height: 100vh;
    width: 100%;
}
</style>
