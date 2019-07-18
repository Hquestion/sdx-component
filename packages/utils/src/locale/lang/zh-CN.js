export default {
    ui: {
        button: {
            ok: '确定',
            cancel: '取消'
        },
        empty: {
            noData: '暂无数据',
            noSearchResult: '无搜索结果',
            ErrorInYourPage: '您所在的页面出现错误！'
        },
        transfer: {
            moveAll: '移动全部',
            deleteAll: '删除全部'
        },
        panel: {
            noContent: '暂无内容'
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
            NoNewLogsYet: '暂时没有新的日志',
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
                CREATED: '创建成功',
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
            },
            form: {
                create: '新建',
                edit: '编辑',
                task: '任务',
                Please_enter_the_task_name: '请输入任务名称',
                Please_enter_a_task_description: '请输入任务描述',
                Please_select_the_operating_environment: '请选择运行环境',
                ResourceAllocation: '资源配置',
                DataSource: '数据源',
                Please_select_the_dataset: '请选择数据集',
                Please_select_the_data_source: '请选择数据源',
                CPU_Memory_resources_need_to_be_configured: '需要配置CPU/内存资源',
                GPU_resources_need_to_be_configured: '需要配置GPU资源',
                Start_up_parameter_holder: '请输入创建的参数，~/ 代表家目录， ./ 代表代码所在的目录',
                Please_select_the_source_code: '请选择源代码',
                Driver_CPU_memory_needs_to_be_configured: '需要配置驱动器CPU/内存',
                Executor_CPU_memory_needs_to_be_configured: '需要配置执行器CPU/内存',
                Please_enter_the_number_of_instances: '请输入实例个数',
                Please_enter_the_name_of_the_main_class: '请输入主类名称',
                Please_select_the_log_directory: '请选择日志目录',
                ParametricServer: '参数服务器',
                Parameter_server_CPU_Memory_need_to_be_configured: '需要配置参数服务器CPU/内存',
                Computing_node_CPU_Memory_need_to_be_configured: '需要配置计算节点CPU/内存',
                Computing_node_GPU_needs_to_be_configured: '需要配置计算节点GPU',
                Please_select_the_training_output_directory: '请选择训练输出目录',
                Please_enter_the_parameter_server_calculate_the_number_of_node_instances: '请输入参数服务器/计算节点实例个数',
                Please_enter_the_number_of_calculated_node_instances: '请输入计算节点实例个数',
                Please_enter_the_number_of_parameter_server_instances: '请输入参数服务器实例个数'
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
        project: {
            projectList: '项目列表',
            createProject: '新建项目',
            editProject: '编辑项目',
            emptyCreate: '空白创建',
            templateCreate: '模板创建',
            copyCreate: '复制创建',
            sortByCreateTime: '按创建时间排序',
            enterProjectName: '请输入项目名称',
            enterProjectDescription: '请输入项目描述',
            confirmRemove: '确定删除该项目吗？',
            createForm: {
                name: '项目名称：',
                description: '项目描述：',
                setTemplate: '设为模板：'
            },
            selfCreateProject: '自建项目',
            otherProject: '其他项目',
            taskList: '任务列表',
            enterTaskName: '请输入任务名',
            modelDev: '模型开发',
            modelTraining: '模型训练',
            modelAssess: '模型评估'
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
            ShareSuccess: '@:(view.file.Share)@:(sdxCommon.Success)',
            ShareFail: '@:(view.file.Share)@:(sdxCommon.Fail)',
            CancelShareSuccess: '@:(view.file.CancelShare)@:(sdxCommon.Success)',
            ConfirmCancelShareTip: '您确定要取消共享选中的文件吗？',
            FileOperationList: '文件操作列表',
            FileUpload: '@:(view.file.File)@:(view.file.Upload)',
            Upload: '上传',
            File: '文件',
            Folder: '文件夹',
            FileCopy: '@:(view.file.File)@:(view.file.Copy)',
            FileDelete: '@:(view.file.File)@:(sdxCommon.Delete)',
            ConfirmToDelAllTasks: '您确定要删除所有任务吗?',
            NewFolder: '新建文件夹',
            RemainingTime: '剩余时间',
            Source: '源',
            Target: '目标',
            FileName: '@:(view.file.File)名',
            Uploading: '上传中',
            UploadFail: '@:(view.file.Upload)@:(sdxCommon.Fail)',
            Loaded: '已加载',
            Totally: '共',
            Items: '条',
            AllFiles: '@:(sdxCommon.All)@:(view.file.File)',
            SearchResults: '@:(sdxCommon.Search)结果',
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
        },
        authorizeManage: {
            user_authorization_list: '用户授权列表',
            user_group_authorization_list: '用户组授权列表',
            role_authorization_list: '角色授权列表',
            new_authorization: '新建授权',
            editorial_authorization: '编辑授权',
            authorized_object: '授权对象',
            permission_settings: '权限设置',
            please_enter_the_authorization_object: '请输入授权对象',
            please_set_permission_settings: '请设置权限设置',
            please_enter_the_user_group_name: '请输入用户组名',
            please_enter_the_role_name: '请输入角色名',
            role_name: '角色名',
            new_roles: '新建角色',
            role_description: '角色说明',
            editorial_role: '编辑角色',
            please_enter_a_role_description: '请输入角色说明',
            determine_the_deletion_role: '确定删除角色',
            this_action_deletes_the_authorization_items: '此操作会同时删除与此角色关联的授权项',
        }
    },
    sdxCommon: {
        ALL: '全部',
        All: '全部',
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
        Success: '成功',
        Fail: '失败',
        Status: '状态',
        Size: '大小',
        Stop: '停止',
        Reset: '重置',
        Yes: '是',
        No: '否',
        Edit: '编辑',
        UserGroup: '协作者/组：'
    },
    utils: {
        validator: {
            commonNameValidator: '请填写1到64位，英文字母，数字、空格、下划线、点、连字符组成的字符串',
            nickNameValidator: '请填写1到64位，汉字、英文字母、数字、@、空格、点、连字符组成的字符串',
            passwordValidator: '请填写6到16位，英文字母、数字及特殊符号组成的字符串',
            nameWithChineseValidator: '请填写1到64位，汉字、英文字母、数字、空格、下划线、点、连字符组成的字符串',
            descValidator: '请填写0到256位字符串',
            nameStartWithLowerCaseValidator: '请填写1到64位，小写字母开头，小写英文字母、数字、下划线、点、连字符组成的字符串',
            nameStartWithLetterValidator: '请填写1到64位，英文字母开头，英文字母、数字、空格、下划线、点、连字符组成的字符串',
            tagValidator: '请填写1到10位，英文字母、数字、中文组成的字符串',
            tagArrayValidator: '请填写1到10位，英文字母、数字、中文组成的字符串',
            nameValidate: '请填写4到20位，字母开头，数字、字母、下划线、点组成的字符串',
            cNameValidate: '请填写1到24位，汉字、字母、数字、@、-、点、下划线组成的字符串',
            itemNameValidate: '请填写1-24位，小写字母开头，数字、小写字母、点与下划线组成的字符串',
            imageNameValidate: '请填写长度为1-64个字符，小写英文字母开头，允许小写英文字母、数字、"."、"_"或"-"',
            imageVersionValidate: '请填写长度为1-64个字符，允许英文字母、数字、"."、"_"或"-"',
            tagNameValidate: '请填写1-10位，字母或数字开头，字母、数字与点组成的字符串',
            testNumber: '请输入正整数'
        }
    }
};
