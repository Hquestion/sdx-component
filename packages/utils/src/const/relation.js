/**
 * 镜像种类列表
 */
export const DOCKER_IMAGE_KIND_LIST = [
    {
        label: 'JUPYTER',
        value: 'JUPYTER'
    },
    {
        label: 'PYTHON',
        value: 'PYTHON'
    },
    {
        label: 'SPARK',
        value: 'SPARK'
    },
    {
        label: 'TENSORFLOW',
        value: 'TENSORFLOW'
    },
    {
        label: 'CONTAINER_DEV',
        value: 'CONTAINER_DEV'
    }/* ,
    {
        label: 'TENSORFLOW_DEPLOYMENT',
        value: 'TENSORFLOW_DEPLOYMENT'
    },
    {
        label: 'PMML_DEPLOYMENT',
        value: 'PMML_DEPLOYMENT'
    },
    {
        label: 'SPARK_DEPLOYMENT',
        value: 'SPARK_DEPLOYMENT'
    } */
];

// 构建任务列表状态映射表
export const imageTaskLabel = {
    BUILDING : 'create',
    BUILDED :'processing',
    UPLOADING :'running',
    FAILED : 'warning',
    FINISHED : 'finish'
};
