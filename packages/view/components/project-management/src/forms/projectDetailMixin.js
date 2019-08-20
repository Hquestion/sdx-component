import { getProjectDetail } from '@sdx/utils/src/api/project';

export default {
    methods: {
        projectCooperation() {
            getProjectDetail(this.$route.params.projectId)
                .then(res => {
                    if(res.data.groups.length > 0 || res.data.users.length > 0) {
                        this.cooperation = true;
                    } else {
                        this.cooperation = false;
                    }
                });
        }
    }
};
