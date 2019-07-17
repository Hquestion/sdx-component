<template>
    <SdxvTaskDetail :task="task" />
</template>

<script>
import SdxvTaskDetail from '@sdx/view/components/task-management/src/task-detail/TaskDetail';

export default {
    components: {
        SdxvTaskDetail
    },
    data() {
        return {
            task: {
                name: 'jupyter',
                type: 'JUPYTER',
                state: 'RUNNING',
                owner: {
                    name: 'creator'
                },
                description: 'xxxxdsfsfsaf阿迪沙发发烧的xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高xxxxdsfsfsaf阿迪沙发发烧的发烧发烧发烧到了风急浪高发烧发烧发烧到了风急浪高觉得是浪费感觉啊都说了割发代首',
                image: {
                    name: 'sadfasfljlkjlfkjasklga'
                },
                resourceConfig: {
                    EXECUTOR_INSTANCES: 1,
                    EXECUTOR_CPUS: 4000,
                    EXECUTOR_GPUS: 3,
                    EXECUTOR_MEMORY: 128849018880,
                    TF_MASTER_CPUS: 4000,
                    TF_MASTER_MEMORY: 128849018880,
                    TF_PS_CPUS: 4000,
                    TF_PS_MEMORY: 128849018880,
                    TF_EXECUTOR_INSTANCES: 1,
                    TF_WORKER_CPUS: 3000,
                    TF_WORKER_MEMORY: 128849018880,
                    TF_WORKER_GPUS: 5,
                    SPARK_EXECUTOR_INSTANCES: 1,
                    SPARK_EXECUTOR_MEMORY: 128849018880,
                    SPARK_EXECUTOR_CPUS: 4000,
                    SPARK_DRIVER_MEMORY: 128849018880,
                    SPARK_DRIVER_CPUS: 4000,
                },
                runningAt: '2019-04-04 12:00:00',
                stoppedAt: '2019-04-05 12:00:00',
                externalUrl: 'www.baidu.com',
                sourcePaths: ['system/code'],
                args: 'arg1',
                ip: '127.0.0.1',
                assignedPort: 3306,
                outputPaths: ['system/output'],
                datasources: [{
                    name: 'Skytsdb',
                    host: '10.0.0.14',
                    port: 38724
                }, {
                    name: 'Skytsdbsdms',
                    host: '10.0.0.14',
                    port: 38725
                }],
                datasets: [{
                    name: 'Skytsdb'
                }, {
                    name: 'Skytsdbsdms'
                }],
                pods: [{
                    'name':'ddf22857-4a1c-11e9-ad36-d094667446bd'
                }, {
                    'name': 'jupyter-36435234523'
                }]
            }
        };
    }
};
</script>

<style>

</style>
