export default {
    methods: {
        refreshTree() {
            this.$refs.fileManager.refresh();
        },
        makeFile() {
            this.$refs.fileManager.makeFile();
        }
    }
};
