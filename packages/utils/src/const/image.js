/**
 * 镜像相关常量定义
 */

// 源类型
export const SOURCE_TYPE = {
    PIP: 'PIP',
    CONDA: 'CONDA'
};

// 镜像类型
export const IMAGE_TYPE = {
    JUPYTER: 'JUPYTER',
    PYTHON: 'PYTHON',
    SPARK: 'SPARK',
    TENSORFLOW: 'TENSORFLOW',
    TENSORFLOW_SERVING: 'TENSORFLOW_SERVING',
    SPARK_SERVING: 'SPARK_SERVING',
    PMML_SERVING: 'PMML_SERVING',
    CONTAINER_DEV: 'CONTAINER_DEV',
    OTHERS: 'OTHERS',
    H2O: 'H2O',
    NVIDIA_DIGITS: 'NVIDIA_DIGITS'
};

// 分享类型
export const SHARE_TYPE = {
    PUBLIC: 'PUBLIC',               //公共模型
    PRIVATE: 'PRIVATE'              //私有模型
};

// 构建类型
export const BUILD_TYPE = {
    BASIC: 'BASIC',                 //基础镜像
    ONLINE: 'ONLINE',               //在线构建
    TAR: 'TAR',                     //基于tar构建
    DOCKERFILE: 'DOCKERFILE',       //基于DockerFile构建
    TASK: 'TASK'                    //任务转存
};

// 源地址类型
export const SOURCE_URL_TYPE = {
    DEFAULT:  'DEFAULT',            //默认包源
    USER_DEFINED: 'USER_DEFINED',   //自定义包源
    SELECTED: 'SELECTED'
};

// 版本类型
export const VERSION_TYPE = {
    DEFAULT: 'DEFAULT',             //默认
    USER_DEFINED: 'USER_DEFINED',   //自定义
    LATEST: 'LATEST'                //latest
};

// 镜像构建状态
export const DOCKER_IMAGE_BUILD_STATE = {
    CREATED: 'CREATED',
    BUILDING: 'BUILDING',
    BUILDED: 'BUILDED',
    UPLOADING: 'UPLOADING',
    FAILED: 'FAILED',
    FINISHED: 'FINISHED'
};

// 镜像可进行的操作
export const IMAGE_ALLOW_OPERATIONS = {
    REMOVE: 'remove',
    EXTEND: 'extend',
    DETAIL: 'detail',
    EDIT: 'edit'
};