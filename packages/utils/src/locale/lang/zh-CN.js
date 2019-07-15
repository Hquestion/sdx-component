export default {
    ui: {
        button: {
            ok: '确定',
            cancel: '取消'
        },
        messageBox: {
            prompt: '提示'
        }
    },
    widget: {
        userInfo:{
            title:'用户信息',
            username:'用户名',
            fullname:'显示名',
            password:'密码',
            groups:'加入组',
            role:'角色'
        },
        changePassword: {
            title: '修改密码',
            oldPwd: '旧密码：',
            newPwd: '新密码：',
            confirmNewPwd: '确认新密码：'
        },
        projectCard: {
            Template: '模板',
            SelectTemplate: '选择模板',
            SelectProject: '选择项目',
            title: {
                ViewDetail: '查看详情',
                Edit: '编辑',
                Delete: '删除'
            }
        }
    },
    general: {
        requiredInfo: '请输入必填信息！'
    },
    view: {
        task: {
            stopTask: '确定要终止选中的任务吗？',
            deleteTask: '此操作将会永久删除该任务，是否继续？',
            killTask: '此操作将终止该任务，是否继续？',
            saveIntoImage: '将当前任务转存为镜像，再次启动此任务时恢复到当前环境',
            searchName: '名称搜索',
            searchPlaceholder: '请输入任务名称、项目名称或创建人',
            taskType: '任务类型',
            taskState: '任务状态',
            taskName: '任务名称',
            taskProject: '所属项目',
            cpuUsed: '已使用CPU（核）',
            memoryUsed: '已使用内存（GB）',
            gpuUsed: '已使用GPU（块）',
            selectImage: '请选择启动的镜像',
            BasicImage: '基础镜像',
            TemporalImage: '中间镜像',
            type: {
                SPARK: 'SPARK',
                PYTHON: 'PYTHON',
                JUPYTER: 'JUPYTER',
                TENSORBOARD: 'TENSORBOARD',
                TENSORFLOW: 'TENSORFLOW',
                TENSORFLOW_DIST: 'TENSORFLOW分布式',
                TENSORFLOW_AUTO_DIST: 'TENSORFLOW自动并行',
                CONTAINERDEV: '自定义容器',
                DATA_SERVICE: '数据服务',
                TENSORFLOW_SERVING: 'TENSORFLOW模型服务',
                SPARK_SERVING: 'SPARK模型服务',
                PMML_SERVING: 'PMML模型服务'
            },
            state: {
                CREATED: '创建',
                LAUNCHING: '启动中',
                LAUNCH_ABNORMAL: '启动异常',
                RUNNING: '运行中',
                FINISHED: '已完成',
                KILLED: '已终止',
                FAILED: '失败',
                KILLING: '终止中'
            },
            operation: {
                start: '运行',
                kill: '停止',
                detail: '查看',
                edit: '编辑',
                remove: '删除'
            }
        },
        monitor: {
            componentState: {
                searchPodPlaceholder: '请输入Pod名',
                PodName: 'Pod名称',
                ComponentState: '组件状态',
                Namespace: '命名空间',
                Node: '节点',
                state: {
                    running: '运行中',
                    failed: '失败',
                    pending: '等待中',
                    succeeded: '成功',
                    unknown: '未知'
                }
            }
        },
        image: {
            PackageName: '包名称',
            SearchPackagePlaceholder: '请输入包名称搜索',
            SourceType: '源类型',
            SourceUrl: '源URL',
            Default: '默认',
            PresetUrl: '预置URL',
            CustomUrl: '自定义URL',
            CustomInputPlaceholder: '请填写源URL',
            Version: '版本',
            LastestVersion: '最新版本',
            CustomVersion: '自定义版本',
            PackageVersionInputPlaceholder: '请填写版本号',
            ConfirmAdd: '确认添加',
            SimilarPackageTip: '发现已经存在类似的包,请优先选择升级已有包!',
            BuildBaseThis: '基于此构建',
            ImageName: '镜像名称',
            ImageNameInputPlaceholder: '请输入镜像名称',
            ImageVersion: '镜像版本号',
            ImageVersionInputPlaceholder: '请输入镜像版本号',
            PackageChange: '包变更',
            AddNewPackage: '新增包',
            PackageChangeDetail: '包变更详情',
            SaveAndBuild: '保存并构建',
            ImageNameNotBeNull: '镜像名称不能为空',
            ImageVersionNotBeNull: '镜像版本号不能为空',
            UpgradeTo: '升级至',
            ComparisonsOfPackageDetails: '包详情比较',
            ChangeDetail: '变更详情',
            BasicImage: '基础镜像',
            PackageDetail: '包详情',
            ChangeType: '变更类型',
            NewlyAdded: '新增',
            LogDetail: '日志详情'
        }
    },
    ALL: '全部',
    all: '全部',
    Creator: '创建人',
    CreatedTime: '创建时间',
    Operation: '操作',
    Cancel: '取消',
    Confirm: '确认',
    Log: '日志',
    expand: '展开',
    retract: '收起',
    Search: '搜索',
    Upgrade: '升级',
    Delete: '删除',
    Revert: '撤销'
};
