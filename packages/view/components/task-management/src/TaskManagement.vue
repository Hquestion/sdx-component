<template>
    <SdxuContentPanel
        :title="t('view.task.TaskManagement')"
        :fullscreen="true"
    >
        <SdxwTaskResourceList :owner-id="currentUser && currentUser.userId || ''" />
    </SdxuContentPanel>
</template>

<script>
import SdxwTaskResourceList from '@sdx/widget/components/task-list';
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvTaskManagement',
    mixins: [locale],
    components: {
        SdxwTaskResourceList,
        SdxuContentPanel
    },
    data() {
        return {
            currentUser: getUser()
        };
    }
};
</script>

<style>

</style>
