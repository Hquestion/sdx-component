export default {
    methods: {
        openFile(file) {
            this.$refs.docManager.openFile(file);
        },
        handleFileDelete(path) {
            this.$refs.docManager.handleFileDelete(path);
        },
        handleRename(file, newName) {
            this.$refs.docManager.handleRename(file, newName);
        }
    }
};
