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
            deleteAll: '删除全部',
            PleaseEnter: '请输入'
        },
        panel: {
            noContent: '暂无内容'
        },
        pagination: {
            showEveryPage: '每页显示',
            unit: '条',
            total: '共',
            page: '页',
            recordCount: '条记录'
        }
    },
    widget: {
        userInfo:{
            title:'用户信息',
            username:'用户名：',
            fullname:'显示名：',
            password:'密码',
            groups:'加入组：',
            role:'角色：',
            noGroup: '暂未加入用户组',
            noRole: '暂无角色',
            noColonRole: '角色'
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
            },
            NoDescriptionAdded: '没有添加描述'
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
            LargeFileNotUpload: '上传的文件中含有大于200MB的超大文件，超大文件的上传请使用WinSCP（或同类工具）操作。',
            TooManyFiles: '文件过多',
            SelectMax: '最多选择',
            Files: '个文件',
            UseSearchTip: '没有找到？请使用搜索功能',
            FileTypeError: '文件类型错误',
            PleaseSelectRightFile: '请选择正确的文件类型！'
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
            Role: '角色',
            userName: '用户名',
            groupName: '用户组名',
            roleName: '角色名',
            allRoleName: '用户/用户组/角色名称',
            plsEnter: '请输入'
        },
        resourceConfig: {
            Please_select: '请选择',
            Core: '核',
            Memory: '内存',
            CPU_Memory: 'CPU/内存',
            Driver_CPU_Memory: '驱动器CPU/内存',
            Actuator_CPU_Memory: '执行器CPU/内存',
            Parametric_Server_CPU_Memory: '参数服务器CPU/内存',
            Computing_Node_CPU_Memory: '计算节点CPU/内存',
            Computing_Node_GPU: '计算节点GPU',
            Main_Node_CPU_Memory: '主节点CPU/内存',
            Model: '型号',
            Number: '数量',
            Piece: '块',
            Please_select_resource_allocation: '请选择资源配置',
            GPU: 'GPU',
            Resource_template_has_been_deleted: '资源模板已被删除，请重新选择'
        },
        taskRunningLimit: {
            info1: '单个GPU任务运行时长超过',
            info2: '小时，单个非GPU任务运行时长超过',
            info3: '天将会被系统自动终止，如有特殊资源需求，请联系管理员。'
        }
    },
    view: {
        task: {
            AccessTensorBoard: '进入TensorBoard',
            ManualExecution: '手动执行',
            TimingExecution: '定时执行',
            MultipleExecution: '多次执行',
            EventTriggering: '事件触发',
            CancellationOfExecution: '取消执行',
            TaskManagementList: '任务管理列表',
            TaskExecuteList: '任务执行列表',
            TimingTaskList: '定时任务列表',
            stopTask: '确定要终止选中的任务吗？',
            deleteTask: '此操作将会永久删除该任务，是否继续？',
            killTask: '此操作将终止该任务，是否继续？',
            saveIntoImage: '将当前任务转存为镜像，再次启动此任务时恢复到当前环境',
            searchName: '名称搜索',
            searchPlaceholder: '请输入任务名称、项目名称或创建人',
            PleaseInput: '请输入',
            taskType: '任务类型',
            taskState: '任务状态',
            taskName: '任务名称',
            taskProject: '所属项目',
            executeType: '执行方式',
            executeTimeRange: '时间',
            startTime: '开始日期',
            stopTime: '结束日期',
            startedAt: '执行开始时间',
            stoppedAt: '执行结束时间',
            executeTime: '执行时长',
            executeID: '执行ID',
            isOpen: '是否启用',
            timingSetting: '定时设置',
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
            DisplayPath: '结果输出',
            TrainingOutputDirectory: '训练输出目录',
            Port: '端口',
            Protocol: '协议',
            Link: '链接',
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
            Instance: '实例',
            CPUUsageRate: 'CPU使用率',
            MemoryUsage: '内存使用量',
            GPUUsageRate: 'GPU使用率',
            GPUMemoryUsage: 'GPU-显存使用量',
            TailView: 'tail查看',
            HeadView: 'head查看',
            AutoPull: '自动拉取',
            RollingFollow: '滚动跟随',
            ReachedTheHeadOfLog: '已经到达日志头部',
            NoNewLogsYet: '暂时没有新的日志',
            BasicInformation: '基本信息',
            RunningLog: '运行日志',
            MonitorInformation: '监控信息',
            RunningInformation: '运行信息',
            ResourceInformation: '资源信息',
            DataInformation: '数据信息',
            RealTimeMonitor: '实时监控',
            DataSource: '数据源',
            LogInformation: '日志信息',
            DataSet: '数据集',
            Core: '核',
            Block: '块',
            Count: '个',
            TaskDetail: '任务详情',
            TaskListTips: '单个GPU任务运行时长超过6小时，单个非GPU任务运行时长超过7天将将会被系统自动终止，如有特殊资源需求，请联系管理员。',
            BasicSetting: '基本配置',
            RelatedProject: '关联项目',
            EnterRelatedProject: '请选择关联项目',
            CreateProject: '创建新项目',
            EnvSetting: '环境配置',
            ImagePacInfo: '镜像中包含版本信息',
            InstanceNum: '实例个数',
            EnterInstanceNum: '请输入实例个数',
            DataSetting: '数据配置',
            DatasetInfo: '将数据集以只读方式挂载进目录',
            DataSourceInfo: '将数据源的设置写入容器的环境变量',
            AdvanceSetting: '高级配置',
            EnvVars: '环境变量',
            ParamName: '参数名',
            ParamValue: '参数值',
            EnvVarsPlaceholder: '--$参数名 参数值, 以空格分隔',
            StartCommand: '启动命令',
            StartParams: '启动参数',
            Params: '参数之间以 / 分隔',
            StartCommandTip: '此处不填写，系统默认启动一个可在页面访问的初始化的容器环境',
            OutputPath: '输出路径',
            OutputPathTip: '存放训练输出的日志或模型等',
            PortRoute: '端口转发',
            PortNumber: '端口号',
            PortRouteTip: '定义容器中的某一端口转发到容器外部',
            WorkflowName: '工作流名称',
            EnterWorkflowName: '请输入工作流名称',
            WorkflowDesc: '工作流描述',
            EnterWorkflowDesc: '请输入工作流描述',
            EnterWorkflowParam: '请输入工作流参数',
            WorkflowParamTip: '工作流的参数, 可以覆盖工作流中节点的同名参数',
            FilePath: '文件目录',
            EnterFilePath: '请选择文件目录',
            AutoRelease: '是否启动自动释放资源',
            KernalReleaseTime: 'Kernel自动释放时间',
            PodReleaseTime: 'Pod自动释放时间',
            ExceedKernalReleaseTime: '超过指定时间Kernel将停止活跃',
            ExceedPodReleaseTime: '超过指定时间所有Kennel将断开连接',
            EnterIde: '进入SkyIDE',
            EnterJupyterlab: '进入Jupyter Lab',
            EnterNotebook: '进入Jupyter NoteBook',
            ShowRunningRecord: '查看执行记录',
            TaskList: '任务列表',
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
                PMML_SERVING: 'PMML模型服务',
                SKYFLOW_EXEC: 'SKYFLOW执行记录',
                MODELSERVICE: '模型服务',
                SKYIDE: 'SKYIDE',
                SKYFLOW: 'SKYFLOW'
            },
            officiaType: {
                TENSORFLOW_DIST: 'TensorFlow分布式',
                TENSORFLOW_AUTO_DIST: 'TensorFlow自动并行',
            },
            state: {
                Created: '创建完成',
                Scheduling: '调度中',
                Pending: '启动中',
                Running: '运行中',
                Terminating: '终止中',
                Terminated: '已终止',
                Succeeded: '成功',
                Failed: '失败',
                Error: '错误'
            },
            operation: {
                start: '运行',
                kill: '停止',
                detail: '查看',
                edit: '编辑',
                remove: '删除',
                entry: '进入画布'
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
                Please_enter_the_number_of_parameter_server_instances: '请输入参数服务器实例个数',
                Need_to_configure_master_CPU_memory: '需要配置主节点CPU/内存'
            },
            tipCard: {
                TotalExecution: '执行总数',
                Manual: '手动',
                Timing: '定时',
                SubordinateGroup: '所属组',
                Type: '类型',
                Detail: '详情'
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
                ResourceStatistics: '资源统计'
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
            project: '项目',
            projectDetail: '项目详情',
            taskDetail: '任务详情',
            logDetail: '日志详情',
            createTask: '新建任务',
            editTask: '编辑任务',
            projectList: '项目列表',
            createProject: '创建新项目',
            editProject: '编辑项目',
            emptyCreate: '创建空白项目',
            templateCreate: '创建模板项目',
            copyCreate: '创建复制项目',
            emptyEdit: '编辑空白项目',
            templateEdit: '编辑模板项目',
            copyEdit: '编辑复制创建',
            sortByCreateTime: '按创建时间排序',
            enterProjectName: '请输入项目名称',
            enterProjectDescription: '请输入项目描述',
            confirmRemove: '确定删除该项目吗？',
            createForm: {
                name: '项目名称：',
                description: '项目描述：',
                setTemplate: '设为模板：'
            },
            selfCreateProject: '私有项目',
            otherProject: '协作项目',
            taskList: '任务列表',
            enterTaskName: '请输入任务名',
            modelDev: '模型开发',
            modelTraining: '模型训练',
            modelAssess: '模型评估',
            template: '模板',
            privateAndShare: '自建与协作',
            templateProject: '模版项目',
            allProject: '所有项目',
            taskCounts: '个任务',
            taskCount: '个任务',
            Created: '创建于',
            oneself: '自己',
            iconName: {
                cooperation: '协作项目',
                private: '私有项目',
                template: '模版项目',
            },
            devTask: '开发任务',
            skyflowTask: '可视化数据分析与建模任务',
            devTool: '开发工具',
            skyflowType: '可视化分析与建模',
            addJupyter: '添加Jupyter任务',
            addSkyIde: '添加SkyIDE任务',
            addContainerDev: '添加自定义容器任务',
            addSkyflow: '添加SkyFlow任务'
        },
        skyflow: {
            skyflowList: '工作流列表',
            createWorkflow: '新建工作流',
            copyWorkflow: '复制工作流',
            editWorkflow: '编辑工作流',
            enterSkyflowName: '请输入工作流名称',
            template: '模板',
            privateAndShare: '私有与共享',
            trafficTemplate: '轨道交通模板',
            windPower: '风电模板',
            removeWorkflowConfirm: '确定要删除该工作流吗？',
            createForm: {
                processType: '工作流处理方式：',
                patchProcess: '批处理',
                streamProcess: '流处理',
                name: '工作流名称：',
                description: '工作流描述：',
                enterDescription: '请输入工作流描述',
                setAsTemplate: '设为模板：',
                templateType: '模板种类：',
                enterTemplateType: '请选择或输入模板种类',
                shareSetting: '共享设置：',
                privateWorkflow: '私有工作流',
                shareWorkflow: '共享工作流',
                triggerFreq: '触发频率：'
            },
            selectTemplate: '选择模板',
            selectWorkflow: '选择工作流',
            canvas: '进入画布',
            runningInfo: '运行记录',
            runningRecordList: '执行记录列表',
            timerRunningList: '定时运行列表',
            taskName: '任务名称：',
            enterTaskName: '请输入任务名称',
            executeKind: '执行方式：',
            enterExecuteKind: '请选择执行方式',
            manual: '手动',
            resume: '续跑',
            state: '工作流状态：',
            enterState: '请选择工作流状态',
            timeRange: '执行时间：',
            startDate: '开始日期',
            endDate: '结束日期',
            columns: {
                name: '工作流名称',
                executeKind: '执行方式',
                state: '状态',
                executeStart: '执行开始时间',
                executeEnd: '执行结束时间',
                executeTime: '执行时长',
                taskName: '任务名称',
                setting: '执行设置',
                submitTime: '提交时间',
                runningSetting: '定时运行设置'
            },
            removeRuntimeConfirm: '确定要删除该执行记录吗？',
            removeTimerTaskConfirm: '确定要删除该定时任务吗？',
            runTaskConfirm: '确定要运行当前定时任务吗？',
            stopTimerTaskConfirm: '确定要停止运行当前定时任务吗？',
            shutdownTaskConfirm: '确定要终止当前工作流任务吗？',
            states: {
                succeeded: '运行完成',
                failed: '运行失败',
                cronRunning: '运行中',
                stopped: '已终止'
            },
            enterFreq: '请输入触发频率',
            example: '示例：“0 0 * * ？”表示每天0点触发执行。',
            taskAbort: '周期内未执行完时：放弃',
            taskAlert: '如果下次触发时, 上一轮任务还没有执行完成, 则直接Kill掉当前任务, 启动新一轮任务。'
        },
        image: {
            // 镜像列表
            ImageManagement: '镜像管理',
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
            MirrorVersion: '镜像版本号：',
            BuildTypes: {
                Basic: '基础镜像',
                Online: '在线构建',
                Tar: '基于tar构建',
                Dockerfile: '基于DockerFile构建',
                Task: '任务转存',
            },
            States: {
                Created: '创建中',
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
                state: '状态',
                compare: '比较',
                viewLog: '查看日志'
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
            ImageType: '镜像类型',
            delete_the_selected_mirror_task: '确定要删除选中的镜像任务吗？',
            can_not_be_restored_after_deletion: '确定删除后不可恢复哦',
            FileAddress: '文件地址',
            FileAddressColon: '文件地址：',
            please_enter_the_file_address: '请输入文件地址',
            in_a_non_networked_environmen: '不联网的环境下，DockerFile中可使用的基础镜像如下表所示：',
            CorePackage: '核心包',
            etc: '等'
        },
        model: {
            New_model_service: '新增模型服务',
            Create_a_new_version: '创建新版本',
            VersionInformation: '版本信息',
            SelectedVersion: '选择版本',
            ModelFile: '模型文件',
            ModelDetail: '模型详情',
            Running_time: '运行时间',
            Instances: '实例数',
            Resource: '资源',
            Weight_ratio: '权重占比',
            Flow_ratio: '流量占比',
            New_gray_level_release: '新增灰度发布',
            Release_to_AI_open_platform: '发布至AI开放平台',
            APIName: 'API名称',
            APIDescription: 'API描述',
            APIType: 'API类型',
            APILabel: 'API标签',
            cover: '封面',
            Click_the_select_Picture_button: '点击选择图片按钮',
            Upload_pictures: '上传图片',
            Select_pictures: '选择图片',
            Support_uploading_JPG_PNG_files: '支持上传.jpg/.png文件，且不超过2MB',
            Online_testing: '在线测试',
            Test_method: '测试方法',
            Image_recognition: '图像识别',
            Machine_learning: '机器学习',
            Service_URL: '服务URL',
            Input: '输入',
            Prediction_results: '预测结果',
            modelVersion: '模型版本',
            serviceList: '服务列表',
            serviceState: '服务状态',
            tabs: {
                all: '全部列表',
                private: '私有模型列表',
                myShare: '我的共享列表',
                otherShare: '他人共享列表'
            },
            model: '模型',
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
            modelVersionDetail: '模型版本详情',
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
                created: '创建成功',
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
            FileManage: '文件管理',
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
            Paste: '粘贴',
            Cut: '剪切',
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
            LastModify: '上次更新',
            PleaseFinishRenameOrMkdir: '请先完成新建或重命名',
            UploadFile: '@:(view.file.Upload)@:(view.file.File)',
            UploadFolder: '@:(view.file.Upload)@:(view.file.Folder)',
            PleaseInputFileName: '请输入文件名称',
            Download_Now: '客户端下载',
            And_install_SkyDiscovery_File_Management_Client: '已安装文件管理客户端，',
            upload_or_download_operation_files_are_large: '当前上传的文件较大，请使用文件管理客户端操作',
            Open_it_immediately: '立即打开',
            PleaseSelectUserOrGroup: '请选择用户或用户组',
            TensorBoard: '进入TensorBoard',
            ModelAnalysis: '模型解析',
            CreateFolder: '新建文件夹',
            SaveFor: '是否要保存对 ',
            Change: ' 的更改？',
            IfNotSave: '如果不保存，更改将丢失。',
            Save: '保存',
            NotSave: '不保存',
            NotSupported: '暂不支持当前文件格式',
            Loading: '加载中...',
            please_download_the_file_client_and_upload_again:'上传的文件夹中存在部分超过200M的大文件，请下载文件客户端重新上传。'
        },
        resourceManage: {
            ResourceManage: '资源管理',
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
            maxConcurrentTasks: '同时运行的任务总数:',
            LessOrEqual: '小于等于',
            NumberUnit: '个',
            TotalConcurrentHighResourceTasks: '同时运行的高资源任务总数:',
            MoreOrEqual: '资源设置大于等于',
            CountOfTotalTasksLessOrEqual: '的任务总数小于等于',
            GPUsOccupied: '同时占用GPU总数:',
            PieceUnit: '块',
            GpuTaskRunDuration: '单个GPU任务运行时长:',
            HourUnit: '小时',
            NonGroupTaskRunDuration: '单个非GPU任务运行时长:',
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
            JoinGroup: '加入组',
            JoinGroupSetting: '加入组设置',
            UserGroupName: '用户组名',
            EditGroup: '编辑@:(view.userManage.UserGroup)',
            NewGroup: '创建@:(view.userManage.UserGroup)',
            GroupMembers: '组员',
            NoMembers: '暂无用户',
            Modified_user_group_successfully: '修改用户组成功',
            User_group_created_successfully: '创建用户组成功',
            UserGroup_colon: '用户组：',
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
            authorization: '授权',
            Are_you_sure_delete_it: '确定删除授权吗？',
            Can_not_be_restored_after_deletion: '删除后不可恢复哦'
        },
        skyide: {
            close: '关闭',
            shear: '剪切',
            paste: '粘贴',
            shift_up: '上移',
            shift_down: '下移',
            Clear_Output: '清除输出',
            Kernel_is_not_connected: 'Kernel未连接',
            Kernel_Connected: 'Kernel已连接',
            save: '保存',
            copy: '复制',
            Turn_to_MD: '转为MD',
            Turn_to_code: '转为code',
            Run_all: '运行全部',
            debug: '调试',
            View_commands: '查看命令',
            code_snippet: '代码片段',
            Memory: '内存',
            Model: '型号',
            Core: '核',
            Piece: '块',
            State_Starting: '启动中...',
            State_Stopped: '未启用',
            State_Stopping: '终止中...'
        }
    },
    sdxCommon: {
        ALL: '全部',
        All: '全部',
        Creator: '创建人',
        CreatedTime: '创建时间',
        UpdatedTime: '更新时间',
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
        PleaseSelect: '请选择',
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
        UserGroup: '协作者/组：',
        requiredInfo: '请输入必填信息！',
        To: '至',
        Index: '序号',
        Run: '运行',
        startUp:'启动',
        More: '更多'
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
        },
        transform: {
            day_ago: '天前',
            days_ago: '天前',
            just: '刚刚',
            minutes_ago: '分钟前',
            minute_ago: '分钟前',
            week_ago: '周前',
            weeks_ago: '周前',
            months_ago: '月前',
            month_ago: '月前',
            year_ago: '年前',
            years_ago: '年前',
            hours_ago: '小时前',
            hour_ago: '小时前',
        }
    }
};
