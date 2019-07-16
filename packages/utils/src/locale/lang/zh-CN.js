export default {
    ui: {
        button: {
            ok: '确定',
            cancel: '取消'
        },
        messageBox: {
            prompt: '提示'
        },
        empty: {
            noData: '暂无数据',
            noSearchResult: '无搜索结果',
            ErrorInYourPage: '您所在的页面出现错误！'
        }
    },
    widget: {
        userInfo:{
            title:'用户信息',
            username:'用户名',
            fullname:'显示名',
            password:'密码',
            groups:'加入组',
            role:'角色',
            noGroup: '暂未加入用户组',
            noRole: '暂无角色'
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
        },
        codeEditor: {
            CodeEditor: '代码编辑器',
            SaveAndRelease: '保存并发布'
        },
        fileSelect: {
            NoFile: '没有文件',
            SelectFile: '选择文件',
            PleaseSelect: '请选择',
            TypeFiles: '类型的文件',
            LocaleFile: '本地文件',
            LocaleFolder: '本地文件夹',
            PlatformFile: '平台文件',
            ExistLargeFiles: '存在超大文件',
            LargeFileNotUpload: '超大文件(大于200MB)将不会上传',
            TooManyFiles: '文件过多',
            SelectMax: '最多选择',
            Files: '个文件',
            UseSearchTip: '没有找到？请使用搜索功能'
        },
        shareForm: {
            ShareToGlobal: '共享至全局：',
            Yes: '是',
            No: '否',
            UserOrGroup: '用户/用户组：'
        },
        userPicker: {
            User: '用户',
            Group: '用户组',
            Role: '角色'
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
        authority: {
            Authority: '权限',
            authorityInputPlaceholder: '请输入权限名',
            AuthorityName: '权限名',
            AuthorityDescription: '权限说明',
            ServiceName: '服务名称',
            ResourceCategory: '资源类别',
            OperationType: '操作类型'
        },
        file: {
            Copying: '拷贝中',
            Pending: '等待中',
            Finish: '已完成',
            CopyFail: '拷贝失败',
            Unziping: '解压中',
            UnzipFail: '解压失败',
            Share: '分享',
            CancelShare: '取消共享',
            Download: '下载',
            Copy: '拷贝',
            Move: '移动',
            MoveOrCopy: '移动/拷贝',
            Rename: '重命名',
            CheckPath: '查看路径',
            Unzip: '解压',
            MyShare: '我的共享',
            AcceptedShare: '接收的共享',
            CooperationProject: '协作项目文件',
            YouAreCreatingFolder: '正在新建文件夹',
            PleaseFinishCreatingBefore: '请先完成文件夹创建',
            IncludingIllegalChar: '文件夹名称含非法字符!',
            CantRecoveryAfterDel: '删除后不可恢复哦',
            DeleteShareTip: '选中文件已被共享，或包含被共享的文件，如果继续其他用户将无法访问共享内容。',
            ConfirmToDel: '确定删除文件',
            ConfirmConditionalWord: '吗？',
            ConfirmToDelAll: '确定要删除选中的文件吗？',
            CopyToClipboard: '文件路径已拷贝到剪贴板',
            CopyToClipboardFail: '文件路径拷贝失败',
            ShareSuccess: '@:(view.file.Share)@:(Success)',
            ShareFail: '@:(view.file.Share)@:(Fail)',
            CancelShareSuccess: '@:(view.file.CancelShare)@:(Success)',
            ConfirmCancelShareTip: '您确定要取消共享选中的文件吗？',
            FileOperationList: '文件操作列表',
            FileUpload: '@:(view.file.File)@:(view.file.Upload)',
            Upload: '上传',
            File: '文件',
            Folder: '文件夹',
            FileCopy: '@:(view.file.File)@:(view.file.Copy)',
            FileDelete: '@:(view.file.File)@:(Delete)',
            ConfirmToDelAllTasks: '您确定要删除所有任务吗?',
            NewFolder: '新建文件夹',
            RemainingTime: '剩余时间',
            Source: '源',
            Target: '目标',
            FileName: '@:(view.file.File)名',
            Uploading: '上传中',
            UploadFail: '@:(view.file.Upload)@:(Fail)',
            Loaded: '已加载',
            Totally: '共',
            Items: '条',
            AllFiles: '@:(ALL)@:(view.file.File)',
            SearchResults: '@:(Search)结果',
            AlreadyChecked: '已选中',
            FileOrFolder: '个@:(view.file.File)/@:(view.file.Folder)',
            InPath: '所在目录',
            FilePath: '文件目录',
            UserName: '用户名',
            SharedAt: '共享时间',
            UpdatedAt: '更新时间',
            PleaseFinishRenameOrMkdir: '请先完成新建或重命名',
            UploadFile: '@:(view.file.Upload)@:(view.file.File)',
            UploadFolder: '@:(view.file.Upload)@:(view.file.Folder)',
            PleaseInputFileName: '请输入文件名称'
        },
        resourceManage: {
            newCpuTemplateTitle: '新建@:(view.resourceManage.CpuTemplate)',
            CpuLabel: 'CPU(核)：',
            MemoryLabel: '内存(GB)：',
            newGpuTemplateTitle: '新建@:(view.resourceManage.GpuTemplate)',
            GpuLabel: 'GPU型号：',
            PieceLabel: 'GPU(块)：',
            PleaseSelectGpuKind: '请选择型号',
            ResourceTemplate: '资源模板',
            newTemplate: '新建模板',
            CpuTemplate: 'CPU / 内存模板',
            GpuTemplate: 'GPU模板',
            GlobalRuleSetting: '全局规则设置',
            RuleTip: '规则适用对象为单个用户',
            Save: '保存修改',
            maxConcurrentTasks: '同时运行的任务总数',
            LessOrEqual: '小于等于',
            NumberUnit: '个',
            TotalConcurrentHighResourceTasks: '同时运行的高资源任务总数',
            MoreOrEqual: '资源设置大于等于',
            CountOfTotalTasksLessOrEqual: '的任务总数小于等于',
            GPUsOccupied: '同时占用GPU总数',
            PieceUnit: '块',
            GpuTaskRunDuration: '单个GPU任务运行时长',
            HourUnit: '小时',
            NonGroupTaskRunDuration: '单个非GPU任务运行时长',
            DayUnit: '天',
            PleaseSelect: '请选择',
            UserRights: '用户特权',
            UserRuleSetting: '用户规则设置',
            User: '用户',
            PleaseSelectUser: '请选择用户',
            IllegalSetting: '配置不合法',
            CheckUserRights: '查看@:(view.resourceManage.UserRights)',
            EditUserRights: '编辑@:(view.resourceManage.UserRights)',
            NewUserRights: '新增@:(view.resourceManage.UserRights)',
            AuthAt: '授权时间',
            AddUserRightsTip: '如有需要，您可以选择添加用户特权哦',
            NewRights: '新建特权',
            ConfirmDeleteUserRights: '确定要删除次用户特权吗？',
            Memory: '内存',
            Model: '型号',
            Core: '核',
            Piece: '块',
            ConfirmDeleteTemplate: '确定要删除此资源模板吗？',
        },
        userManage: {
            OneDay: '一天',
            OneWeek: '一周',
            OneMonth: '一个月',
            ThreeMonths: '三个月',
            HalfYear: '半年',
            OneYear: '一年',
            MaxYears: '99年',
            User: '用户',
            NewUser: '新建用户',
            PleaseInputUsername: '请输入用户名',
            PleaseInputFullName: '请输入@:(view.userManage.FullName)',
            PleaseInputRole: '请选择@:(view.userManage.Role)',
            PleaseInputPassword: '请输入@:(view.userManage.Password)',
            PleaseSelectExpireDate: '请选择@:(view.userManage.ExpiryDate)',
            PleaseInputGroupName: '请输入组名',
            Username: '用户名',
            FullName: '显示名',
            Role: '角色',
            Password: '密码',
            CreatedAt:  '创建时间',
            ConfirmToDelete: '确定删除',
            ConfirmHelper: '吗？',
            DeleteSuccess: '删除成功',
            Activation: '激活',
            ExpiryDate: '有效期',
            NewSuccess: '创建成功',
            EditUser: '编辑用户',
            UpdateSuccess: '修改成功',
            UserGroup: '用户组',
            JoinGroupSetting: '加入组设置',
            UserGroupName: '用户组名',
            EditGroup: '编辑@:(view.userManage.UserGroup)',
            NewGroup: '创建@:(view.userManage.UserGroup)',
            GroupMembers: '组员',
            NoMembers: '暂无用户'
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
    Success: '成功',
    Fail: '失败',
    Status: '状态',
    Size: '大小',
    Stop: '停止',
    Reset: '重置',
    Yes: '是',
    No: '否',
    Edit: '编辑'
};
