export default {
    methods: {
        openFile(file) {
            this.$refs.docManager.openFile(file);
        },
        handleFileDelete(path) {
            this.$refs.docManager.handleFileDelete(path);
        }
    }
};
