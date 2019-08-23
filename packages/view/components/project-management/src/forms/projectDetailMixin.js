import { getProjectDetail } from '@sdx/utils/src/api/project';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
export default {
    computed: {
        uploadParams() {
            if (this.cooperation) {
                return {
                    ownerId: this.$route.params.projectId
                };
            } else {
                return {
                    ownerId: getUser().userId || ''
                };
            }
        }
    },
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
