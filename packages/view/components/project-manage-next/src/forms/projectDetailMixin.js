import { getProjectDetail, getProjectList } from '@sdx/utils/src/api/project';
export default {
    data() {
        return {
            showCreateProject: false,
            projectOptions: [],
            projectCreated: ''
        };
    },
    watch: {
        projectCreated(nVal) {
            this.projectCooperation(nVal);
            this.getProjectList(nVal);
        }
    },
    methods: {
        projectCooperation(projectCreated) {
            if (!this.$route.params.projectId && !projectCreated) return;
            getProjectDetail(this.$route.params.projectId || projectCreated)
                .then(res => {
                    if(res.data.groups.length > 0 || res.data.users.length > 0) {
                        this.cooperation = true;
                    } else {
                        this.cooperation = false;
                    }
                });
        },
        getProjectList(projectCreated) {
            if (this.$route.params.projectId && !projectCreated) return;
            const params = {
                start: 1,
                count: -1
            };
            getProjectList(params).then(res => {
                this.projectOptions = res.data.items;
                if (projectCreated) this.$set(this.params, 'project', projectCreated);
            });
        },
        createProject() {
            this.showCreateProject = true;
        },
        createProjectClose(args) {
            this.projectCreated = args[1] || '';
            this.showCreateProject = false;
        }

    }
};
