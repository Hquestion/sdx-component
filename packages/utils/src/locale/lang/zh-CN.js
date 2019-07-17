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
            confirmNewPwd: '确认新密码：',
            needOldPwd: '请输入旧密码',
            needNewPwd: '请输入新密码',
            needConfirmPwd: '请确认新密码',
            needSamePwd: '请确保两次输入的密码一致',
            changeSuccess: '密码修改成功！'
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
        },
        shareSetting: {
            title: '共享设置',
            shareGlobal: '共享至全局：',
            userGroup: '用户/用户组：'
        }
    },
    general: {
        requiredInfo: '请输入必填信息！',
        yes: '是',
        no: '否'
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
            TaskManagement: '任务管理',
            SaveAsImage: '另存为镜像',
            TaskDescription: '任务描述',
            MainClassName: '主类名称',
            SourceCode: '源代码',
            RuntimeEnvironment: '运行环境',
            LogDirectory: '日志目录',
            InstanceCount: '实例个数',
            StartupParameter: '启动参数',
            TrainingOutputDirectory: '训练输出目录',
            Port: '端口',
            StartupTime: '启动时间',
            StopTime: '停止时间',
            RunningTime: '运行时长',
            PageTerminal: '页面终端',
            ExternalLinks: '外部链接',
            MainNodeCPU: '主节点CPU',
            MainNodeMemory: '主节点内存',
            ParametricServerCPU: '参数服务器CPU',
            ParametricServerMemory: '参数服务器内存',
            ParametricServerInstanceCount: '参数服务器实例个数',
            ComputationalNodeCPU: '计算节点CPU',
            ComputationalNodeMemory: '计算节点内存',
            ComputationalNodeGPU: '计算节点GPU',
            ComputationalNodeInstanceCount: '计算节点实例个数',
            DriverCPU: '驱动器CPU',
            DriverMemory: '驱动器内存',
            ExectorCPU: '执行器CPU',
            ExectorMemory: '执行器内存',
            ExectorInstanceCount: '执行器实例数',
            Memory: '内存',
            NoDataInfo: '暂时还没数据信息哦',
            NoLog: '暂时还没日志哦',
            NoRealMonitor: '暂时还没实时监控哦',
            SelectAnInstance: '请选择实例',
            CPUUsageRate: 'cpu使用率',
            MemoryUsage: '内存使用量',
            GPUUsageRate: 'gpu使用率',
            GPUMemoryUsage: '显存使用量',
            TailView: 'tail查看',
            HeadView: 'head查看',
            AutoPull: '自动拉取',
            RollingFollow: '滚动跟随',
            ReachedTheHeadOfLog: '已经到达日志头部',
            BasicInformation: '基本信息',
            RunningInformation: '运行信息',
            ResourceInformation: '资源信息',
            DataInformation: '数据信息',
            RealTimeMonitor: '实时监控',
            DataSourceInformation: '数据源信息',
            DataSet: '数据集',

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
            resourceStatistic: {
                AllTaskList: '全部任务列表',
                Used: '已使用',
                Unused: '未使用',
                Core: '核',
                Block: '块',
                Usage: '使用情况',
                PlatformResources: '平台资源',
                Memory: '内存',
                CPUTotal: '总核数',
                GPUTotal: '总块数',
                MemoryTotal: '总资源',
                UserResourceUsageTop10: '用户资源使用Top10',
                TaskResourceUsageTop10: '任务资源使用Top10',
                AllUserResourceStatistics: '全部用户资源统计',
                userSearchInputPlaceholder: '请输入用户名',
                UserName: '用户名',
            },
            componentState: {
                searchPodPlaceholder: '请输入Pod名',
                PodName: 'Pod名称',
                ComponentState: '组件状态',
                Namespace: '命名空间',
                Node: '节点',
                BasicComponents: '基础组件',
                MicroserviceComponents: '微服务组件',
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
            // 镜像列表
            ImageList: '镜像列表',
            BuildTaskList: '构建任务列表',
            BuildBasedOnFile: '基于文件构建',
            ImageKind: {
                Basic: '基础镜像',
                Private: '私有镜像',
                MyShare: '我的共享',
                OtherShare: '他人共享',
            },
            SearchImageName: '镜像名称：',
            SearchImageKind: '镜像种类：',
            SearchImageState: '状态：',
            SearchBuildType: '构建方式：',
            BuildTypes: {
                Basic: '基础镜像',
                Online: '在线构建',
                Tar: '基于tar构建',
                Dockerfile: '基于DockerFile构建',
                Task: '任务转存',
            },
            States: {
                Created: '已创建',
                Building: '构建中',
                Builded: '构建完成',
                Uploading: '上传中',
                Failed: '已失败',
                Finished: '已完成',
            },
            Columns: {
                imageName: '镜像名称',
                version: '版本号',
                imageType: '镜像种类',
                buildType: '构建方式',
                creator: '创建人',
                createdAt: '创建时间',
            },
            imagesToShare: '请先选择需要共享的镜像',
            imagesToRemove: '请先选择需要删除的镜像',
            imagesToCancelShare: '请先选择需要取消共享的镜像',
            imageRemoveConfirm: '确定要删除选中的镜像吗？',
            imageCancelShareConfirm: '确定要取消共享选中的镜像吗？',
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
            LogDetail: '日志详情',
            ImageType: '镜像类型'
        },
        model: {
            tabs: {
                all: '全部列表',
                private: '私有模型列表',
                myShare: '我的共享列表',
                otherShare: '他人共享列表'
            },
            createModel: '新建模型',
            editModel: '编辑模型',
            searchModelName: '请输入模型名称',
            modelDescription: '请输入模型描述',
            selectLabel: '请选择模型标签',
            createModelForm: {
                name: '模型名称：',
                description: '模型描述：',
                label: '模型标签：'
            },
            modelColumns: {
                name: '模型名称',
                description: '模型描述',
                label: '模型标签',
                creator: '创建人',
                createdTime: '创建时间'
            },
            modelsToShare: '请先选择需要共享的模型',
            modelsToRemove: '请先选择需要删除的模型',
            modelsToCancelShare: '请先选择需要取消共享的模型',
            modelRemoveConfirm: '确定要删除选中的模型吗？',
            modelCancelShareConfirm: '确定要取消共享选中的模型吗？',
            versionList: '模型版本列表',
            createVersion: '新增模型版本',
            versionColumns: {
                name: '版本名称',
                description: '版本描述',
                framework: '版本类型',
                state: '状态',
                createdTime: '创建时间'
            },
            publish: '发布',
            offline: '下线',
            test: '测试',
            states: {
                created: '已创建',
                running: '运行中',
                launching: '启动中',
                failed: '失败',
                killing: '终止中',
                killed: '已终止'
            },
            versionRemoveConfirm: '确定要删除该模型版本吗？',
            versionOfflineConfirm: '确定要下线该模型版本吗？',
            versionDetail: {
                name: '版本名称',
                state: '版本状态',
                framework: '版本类型',
                creator: '创建人',
                description: '版本描述',
                runtimeImage: '运行环境',
                callNum: '调用次数',
                startTime: '启动时间',
                stopTime: '停止时间',
                runningLength: '运行时长',
                getKey: '获取Key',
                memory: '内存',
                core: '核',
                piece: '块',
                noLog: '暂时还没Log日志哦',
                noMonitor: '暂时还没实时监控哦'
            },
            getParamFormat: '获取入参格式',
            testVersion: '测试模型版本',
            enterParam: '请输入参数',
            apiUrl: 'API地址：',
            input: '输入：',
            result: '返回结果：',
            createVersionForm: {
                name: '版本名称：',
                framework: '版本类型：',
                description: '版本描述：',
                runtimeImage: '发布环境：',
                runtimeResource: '资源环境：',
                modelPath: '模型路径：'
            },
            enterName: '请输入版本名称',
            enterFramework: '请选择版本类型',
            enterDescription: '请输入版本描述',
            enterImage: '请选择发布环境',
            enterResource: '请选择资源环境',
            enterModelPath: '请选择模型路径',
            publishVersion: '发布版本',
            editVersion: '编辑版本'
        },
        authority: {
            Authority: '权限',
            authorityInputPlaceholder: '请输入权限名',
            AuthorityName: '权限名',
            AuthorityDescription: '权限说明',
            ServiceName: '服务名称',
            ResourceCategory: '资源类别',
            OperationType: '操作类型'
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
    Revert: '撤销',
    NoData: '暂无数据',
    Tag: '标签',
    Day: '天',
    Hour: '时',
    Minute: '分钟',
    Second: '秒',
    Days: '天',
    Hours: '时',
    Minutes: '分钟',
    Seconds: '秒',
    ConfirmRemove: '删除后将不可恢复',
    ShareAll: '全部共享',
    CancelShare: '取消共享',
    Detail: '查看详情',
    OperationSuccess: '操作成功',
    SettingSuccess: '设置成功',
    RemoveSuccess: '删除成功',
    UpdateSuccess: '更新成功',
    CreateSuccess: '创建成功',
    Edit: '编辑'
};
