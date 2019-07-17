export default {
    ui: {
        button: {
            ok: 'OK',
            cancel: 'Cancel'
        },
        empty: {
            noData: 'No Data',
            noSearchResult: 'No Search Results',
            ErrorInYourPage: 'Error In This Page!'
        }
    },
    widget: {
        userInfo:{
            title:'User Detail',
            username:'Username',
            fullname:'Full Name',
            password:'Password',
            groups:'Groups',
            role:'Role',
            noGroup: 'Not in groups',
            noRole: 'No role'
        },
        changePassword: {
            title: 'Change Password',
            oldPwd: 'Old Password:',
            newPwd: 'New Password:',
            confirmNewPwd: 'Confirm New Password:',
            needOldPwd: 'Please enter old password',
            needNewPwd: 'Please enter new password',
            needConfirmPwd: 'Please confirm new password',
            needSamePwd: 'Please make sure two new passwords are the same',
            changeSuccess: 'Password is successfully changed!'
        },
        projectCard: {
            Template: 'Template',
            SelectTemplate: 'Select Template',
            SelectProject: 'Select Project',
            title: {
                ViewDetail: 'View Detail',
                Edit: 'Edit',
                Delete: 'Delete'
            }
        },
        shareSetting: {
            title: 'Share Setting',
            shareGlobal: 'Share To All:',
            userGroup: 'User/User Group:'
        },
        codeEditor: {
            CodeEditor: 'Code Editor',
            SaveAndRelease: 'Save and Release'
        },
        fileSelect: {
            NoFile: 'No File',
            SelectFile: 'Select File',
            PleaseSelect: 'Please select files with extensions ',
            TypeFiles: '',
            LocaleFile: 'Local File',
            LocaleFolder: 'Local Folder',
            PlatformFile: 'Platform File',
            ExistLargeFiles: 'Exist Large Files',
            LargeFileNotUpload: 'Large files(>200M) will not upload',
            TooManyFiles: 'Too Many Files',
            SelectMax: 'You can select at most',
            Files: 'Files',
            UseSearchTip: 'Can\'t find your files? Try search.'
        },
        shareForm: {
            ShareToGlobal: 'Global Share:',
            Yes: 'Yes',
            No: 'No',
            UserOrGroup: 'User/Group:'
        },
        userPicker: {
            User: 'User',
            Group: 'Group',
            Role: 'Role'
        }
    },
    general: {
        requiredInfo: 'Please fill out all required fields!',
        yes: 'Yes',
        no: 'No'
    },
    view: {
        task: {
            stopTask: 'Are you sure you want to terminate the selected task?',
            deleteTask: 'This operation will permanently delete the task. Do you want to continue?',
            killTask: 'This operation will terminate the task. Do you want to continue?',
            saveIntoImage: 'Save the current task to a image and restore it to the current environment when it is restarted',
            searchName: 'Name Search',
            searchPlaceholder: 'Please enter a task name, project name, or creator',
            taskType: 'Task Type',
            taskState: 'Task State',
            taskName: 'Task Name',
            taskProject: 'Subordinate Project',
            cpuUsed: 'Used CPU(core)',
            memoryUsed: 'Used Memory(GB)',
            gpuUsed: 'Used GPU',
            selectImage: 'Please select the boot image',
            BasicImage: 'Basic Image',
            TemporalImage: 'Temporal Image',
            TaskManagement: 'Task Management',
            SaveAsImage: 'Save As Image',
            TaskDescription: 'Task Description',
            MainClassName: 'Main Class Name',
            SourceCode: 'Source Code',
            RuntimeEnvironment: 'Runtime Environment',
            LogDirectory: 'Log Directory',
            InstanceCount: 'Instance Count',
            StartupParameter: 'Startup Parameter',
            TrainingOutputDirectory: 'Training Output Directory',
            Port: 'Port',
            StartupTime: 'Startup Time',
            StopTime: 'Stop Time',
            RunningTime: 'Running Time',
            PageTerminal: 'Page Terminal',
            ExternalLinks: 'External Links',
            MainNodeCPU: 'Main Node CPU',
            MainNodeMemory: 'Main Node Memory',
            ParametricServerCPU: 'Parametric Server CPU',
            ParametricServerMemory: 'Parametric Server Memory',
            ParametricServerInstanceCount: 'Parametric Server Instance Count',
            ComputationalNodeCPU: 'Computational Node CPU',
            ComputationalNodeMemory: 'Computational Node Memory',
            ComputationalNodeGPU: 'Computational Node GPU',
            ComputationalNodeInstanceCount: 'Computational Node Instance Count',
            DriverCPU: 'Driver CPU',
            DriverMemory: 'Driver Memory',
            ExectorCPU: 'Exector CPU',
            ExectorMemory: 'Exector Memory',
            ExectorInstanceCount: 'Exector Instance Count',
            Memory: 'Memory',
            NoDataInfo: 'No data yet',
            NoLog: 'No log yet',
            NoRealMonitor: 'No real-time monitoring yet',
            SelectAnInstance: 'Select An Instance',
            CPUUsageRate: 'CPU Usage Rate',
            MemoryUsage: 'Memory Usage',
            GPUUsageRate: 'GPU Usage Rate',
            GPUMemoryUsage: 'GPU Memory Usage',
            TailView: 'Tail View',
            HeadView: 'Head View',
            AutoPull: 'Auto Pull',
            RollingFollow: 'Rolling Follow',
            ReachedTheHeadOfLog: 'Has reached the log head',
            NoNewLogsYet: 'No new logs yet',
            BasicInformation: 'Basic Information',
            RunningInformation: 'Running Information',
            ResourceInformation: 'Resource Information',
            DataInformation: 'Data Information',
            RealTimeMonitor: 'Real Time Monitor',
            DataSourceInformation: 'DataSource Information',
            DataSet: 'DataSet',
            Core: 'Core',
            Block: 'Block',
            Count: '',

            type: {
                SPARK: 'SPARK',
                PYTHON: 'PYTHON',
                JUPYTER: 'JUPYTER',
                TENSORBOARD: 'TENSORBOARD',
                TENSORFLOW: 'TENSORFLOW',
                TENSORFLOW_DIST: 'TENSORFLOW_DIST',
                TENSORFLOW_AUTO_DIST: 'TENSORFLOW_AUTO_DIST',
                CONTAINERDEV: 'CONTAINERDEV',
                DATA_SERVICE: 'DATA_SERVICE',
                TENSORFLOW_SERVING: 'TENSORFLOW_SERVING',
                SPARK_SERVING: 'SPARK_SERVING',
                PMML_SERVING: 'PMML_SERVING'
            },
            state: {
                CREATED: 'CREATED',
                LAUNCHING: 'LAUNCHING',
                LAUNCH_ABNORMAL: 'LAUNCH_ABNORMAL',
                RUNNING: 'RUNNING',
                FINISHED: 'FINISHED',
                KILLED: 'KILLED',
                FAILED: 'FAILED',
                KILLING: 'KILLING'
            },
            operation: {
                start: 'start',
                kill: 'kill',
                detail: 'detail',
                edit: 'edit',
                remove: 'remove'
            },
            form: {
                create: 'Create',
                edit: 'Edit',
                task: 'Task',
                Please_enter_the_task_name: 'Please enter the task name',
                Please_enter_a_task_description: 'Please enter a task description',
                Please_select_the_operating_environment: 'Please select the operating environment',
                ResourceAllocation: 'Resource Allocation',
                DataSource: 'Datasource',
                Please_select_the_dataset: 'Please select the dataset',
                Please_select_the_data_source: 'Please select the data source',
                CPU_Memory_resources_need_to_be_configured: 'CPU/Memory resources need to be configured',
                GPU_resources_need_to_be_configured: 'GPU resources need to be configured',
                Start_up_parameter_holder: 'Please enter the created parameters, ~/ for the home directory,. / for the directory where the code is located',
                Please_select_the_source_code: 'Please select the source code',
                Driver_CPU_memory_needs_to_be_configured: 'Driver CPU/Memory needs to be configured',
                Executor_CPU_memory_needs_to_be_configured: 'Executor CPU/Memory needs to be configured',
                Please_enter_the_number_of_instances: 'Please enter the number of instances',
                Please_enter_the_name_of_the_main_class: 'Please enter the name of the main class',
                Please_select_the_log_directory: 'Please select the log directory',
                ParametricServer: 'Parametric Server',
                Parameter_server_CPU_Memory_need_to_be_configured: 'Parameter server CPU/Memory needs to be configured',
                Computing_node_CPU_Memory_need_to_be_configured: 'Computing node CPU/Memory needs to be configured',
                Computing_node_GPU_needs_to_be_configured: 'Computing node GPU needs to be configured',
                Please_select_the_training_output_directory: 'Please select the training output directory',
                Please_enter_the_parameter_server_calculate_the_number_of_node_instances: 'Please enter the parameter server / calculate the number of node instances',
                Please_enter_the_number_of_calculated_node_instances: 'Please enter the number of calculated node instances',
                Please_enter_the_number_of_parameter_server_instances: 'Please enter the number of parameter server instances'
            }

        },
        monitor: {
            resourceStatistic: {
                AllTaskList: 'All Task List',
                Used: 'Used',
                Unused: 'Unused',
                Core: 'Core',
                Block: 'Block',
                Usage: 'Usage',
                PlatformResources: 'Platform Resources',
                Memory: 'Memory',
                CPUTotal: 'Total',
                GPUTotal: 'Total',
                MemoryTotal: 'Total',
                UserResourceUsageTop10: 'User Resource Usage Top10',
                TaskResourceUsageTop10: 'Task Resource Usage Top10',
                AllUserResourceStatistics: 'All User Resource Statistics',
                userSearchInputPlaceholder: 'Please enter one user name',
                UserName: 'User Name',
            },
            componentState: {
                searchPodPlaceholder: 'Please enter a Pod name',
                PodName: 'Pod Name',
                ComponentState: 'Component State',
                Namespace: 'Namespace',
                Node: 'Node',
                BasicComponents: 'Basic Components',
                MicroserviceComponents: 'Microservice Components',
                state: {
                    running: 'running',
                    failed: 'failed',
                    pending: 'pending',
                    succeeded: 'succeeded',
                    unknown: 'unknown'
                }
            }
        },
        image: {
            // 镜像列表
            ImageList: 'Images List',
            BuildTaskList: 'Build Tasks',
            BuildBasedOnFile: 'Build Based On File',
            ImageKind: {
                Basic: 'Basic Images',
                Private: 'Private Images',
                MyShare: 'My Sharing',
                OtherShare: 'Others Sharing',
            },
            SearchImageName: 'Image Name:',
            SearchImageKind: 'Image Type:',
            SearchImageState: 'State:',
            SearchBuildType: 'Build Type:',
            BuildTypes: {
                Basic: 'Basic Image',
                Online: 'Online',
                Tar: 'Build Based On Tar',
                Dockerfile: 'Build Based On Dockerfile',
                Task: 'Task',
            },
            States: {
                Created: 'Created',
                Building: 'Building',
                Builded: 'Built',
                Uploading: 'Uploading',
                Failed: 'Failed',
                Finished: 'Finished',
            },
            Columns: {
                imageName: 'Image Name',
                version: 'Version',
                imageType: 'Image Type',
                buildType: 'Build Type',
                creator: 'Creator',
                createdAt: 'Created Time',
            },
            imagesToShare: 'Please select images to share',
            imagesToRemove: 'Please select images to remove',
            imagesToCancelShare: 'Please select images to cancel sharing',
            imageRemoveConfirm: 'Are you sure to remove selected images?',
            imageCancelShareConfirm: 'Are you sure to cancel sharing selected images?',
            PackageName: 'Package Name',
            SearchPackagePlaceholder: 'Please enter package name search',
            SourceType: 'Source Type',
            SourceUrl: 'Source Url',
            Default: 'Default',
            PresetUrl: 'Preset URL',
            CustomUrl: 'Custom URL',
            CustomInputPlaceholder: 'Please fill in the source URL',
            Version: 'Version',
            LastestVersion: 'Lastest Version',
            CustomVersion: 'Custom Version',
            PackageVersionInputPlaceholder: 'Please fill in the version number',
            ConfirmAdd: 'Confirm Addition',
            SimilarPackageTip: 'If you find that similar packages already exist, please choose to upgrade existing packages first!',
            BuildBaseThis: 'Based On This Construction',
            ImageName: 'Image Name',
            ImageNameInputPlaceholder: 'Please enter the image name',
            ImageVersion: 'Image Version',
            ImageVersionInputPlaceholder: 'Please enter the image version number',
            PackageChange: 'Package Change',
            AddNewPackage: 'Add New Package',
            PackageChangeDetail: 'Package Change Detail',
            SaveAndBuild: 'Save And Build',
            ImageNameNotBeNull: 'Image name cannot be empty',
            ImageVersionNotBeNull: 'Image version cannot be empty',
            UpgradeTo: 'Upgrade To',
            ComparisonsOfPackageDetails: 'Comparisons Of Package Details',
            ChangeDetail: 'Change Detail',
            BasicImage: 'Basic Image',
            PackageDetail: 'Package Detail',
            ChangeType: 'Change Type',
            NewlyAdded: 'Newly Added',
            LogDetail: 'Log Detail',
            ImageType: 'Image Type'
        },
        authority: {
            Authority: 'Authority',
            authorityInputPlaceholder: 'Please enter the authority name',
            AuthorityName: 'Authority Name',
            AuthorityDescription: 'Authority Description',
            ServiceName: 'Service Name',
            ResourceCategory: 'Resource Category',
            OperationType: 'Operation Type'
        },
        file: {
            Copying: 'Copying',
            Pending: 'Pending',
            Finish: 'Finished',
            CopyFail: 'Copy Failed',
            Unziping: 'Unzipping',
            UnzipFail: 'Unzip Failed',
            Share: 'Share',
            CancelShare: 'Cancel Share',
            Download: 'Download',
            Copy: 'Copy',
            Move: 'Move',
            MoveOrCopy: 'Move/Copy',
            Rename: 'Rename',
            CheckPath: 'Check Path',
            Unzip: 'Unzip',
            MyShare: 'My Share',
            AcceptedShare: 'Accepted Share',
            CooperationProject: 'Cooperation Project Files',
            YouAreCreatingFolder: 'You are creating folder',
            PleaseFinishCreatingBefore: 'Please finish creating first',
            IncludingIllegalChar: 'File name includes illegal characters!',
            CantRecoveryAfterDel: 'Can\'t be recovered after delete',
            DeleteShareTip: 'Checked files have been shared, or include shared files.Users can\'t access the shared files if continue.',
            ConfirmToDel: 'Are you sure to delete the file ',
            ConfirmConditionalWord: '?',
            ConfirmToDelAll: 'Are you sure to delete the checked files?',
            CopyToClipboard: 'Path of the file has been copied to clipboard',
            CopyToClipboardFail: 'Copy the file to clipboard fail',
            ShareSuccess: '@:(view.file.Share) @:(Success)',
            ShareFail: '@:(view.file.Share) @:(Fail)',
            CancelShareSuccess: '@:(view.file.CancelShare) @:(Success)',
            ConfirmCancelShareTip: 'Are you sure to cancel share the checked files?',
            FileOperationList: 'File Operation List',
            FileUpload: '@:(view.file.File) @:(view.file.Upload)',
            Upload: 'Upload',
            File: 'File',
            Folder: 'Folder',
            FileCopy: '@:(view.file.File) @:(view.file.Copy)',
            FileDelete: '@:(view.file.File) @:(Delete)',
            ConfirmToDelAllTasks: 'Are you sure to delete all the tasks?',
            NewFolder: 'New Folder',
            RemainingTime: 'Remaining Time',
            Source: 'Source',
            Target: 'Target',
            FileName: '@:(view.file.File) Name',
            Uploading: 'Uploading',
            UploadFail: '@:(view.file.Upload)@:(Fail)',
            Loaded: 'Loaded ',
            Totally: 'Totally ',
            Items: ' items',
            AllFiles: '@:(ALL) @:(view.file.File)',
            SearchResults: '@:(Search) Results',
            AlreadyChecked: 'Already Checked',
            FileOrFolder: '个@:(view.file.File)/@:(view.file.Folder)',
            InPath: 'Path',
            FilePath: 'File Path',
            UserName: 'Username',
            SharedAt: 'Shared At',
            UpdatedAt: 'Updated At',
            PleaseFinishRenameOrMkdir: 'Please finish rename or new folder first',
            UploadFile: '@:(view.file.Upload) @:(view.file.File)',
            UploadFolder: '@:(view.file.Upload) @:(view.file.Folder)',
            PleaseInputFileName: 'Please input file name'
        },
        resourceManage: {
            newCpuTemplateTitle: 'New @:(view.resourceManage.CpuTemplate)',
            CpuLabel: 'CPU(Core)：',
            MemoryLabel: 'Memory(GB)：',
            newGpuTemplateTitle: 'New @:(view.resourceManage.GpuTemplate)',
            GpuLabel: 'GPU Model：',
            PieceLabel: 'GPU(Piece)：',
            PleaseSelectGpuKind: 'Please Select Model',
            ResourceTemplate: 'Resource Template',
            newTemplate: 'New Template',
            CpuTemplate: 'CPU / Memory Template',
            GpuTemplate: 'GPU Template',
            GlobalRuleSetting: 'Global Rule Setting',
            RuleTip: 'Rules apply to a single user',
            Save: 'Save',
            maxConcurrentTasks: 'Max Concurrent Tasks',
            LessOrEqual: 'less than or equal to',
            NumberUnit: '',
            TotalConcurrentHighResourceTasks: 'Total High-resource Tasks Concurrently',
            MoreOrEqual: 'resource more than or equal to',
            CountOfTotalTasksLessOrEqual: 'total tasks less than or equal to',
            GPUsOccupied: 'Total Gpus Occupied Concurrently',
            PieceUnit: 'Pieces',
            GpuTaskRunDuration: 'Gpu Tasks Run Duration',
            HourUnit: 'Hours',
            NonGroupTaskRunDuration: 'Non-Gpu Tasks Run Duration',
            DayUnit: 'Days',
            PleaseSelect: 'Please Select',
            UserRights: 'User Rights',
            UserRuleSetting: 'User Rule Setting',
            User: 'User',
            PleaseSelectUser: 'Please select user',
            IllegalSetting: 'Illegal setting',
            CheckUserRights: 'Check @:(view.resourceManage.UserRights)',
            EditUserRights: 'Edit @:(view.resourceManage.UserRights)',
            NewUserRights: 'New @:(view.resourceManage.UserRights)',
            AuthAt: 'Authorized At',
            AddUserRightsTip: 'You can add user rights if needed.',
            NewRights: 'New Rights',
            ConfirmDeleteUserRights: 'Are you sure to delete the user rights?',
            Memory: 'Memory',
            Model: 'Model',
            Core: 'Core',
            Piece: 'Piece',
            ConfirmDeleteTemplate: 'Are you sure to delete the resource template?',
        },
        userManage: {
            OneDay: 'One Day',
            OneWeek: 'One Week',
            OneMonth: 'One Month',
            ThreeMonths: 'Three Months',
            HalfYear: 'Half Year',
            OneYear: 'One Year',
            MaxYears: '99 Year',
            User: 'User',
            NewUser: 'New User',
            PleaseInputUsername: 'Please input username',
            PleaseInputFullName: 'Please input full name',
            PleaseInputRole: 'Please select role',
            PleaseInputPassword: 'Please input password',
            PleaseSelectExpireDate: 'Please select expiry date',
            PleaseInputGroupName: 'Please input group name',
            Username: 'Username',
            FullName: 'Full Name',
            Role: 'Role',
            Password: 'Password',
            CreatedAt:  'Created At',
            ConfirmToDelete: 'Are you sure to delete ',
            ConfirmHelper: '?',
            DeleteSuccess: 'Delete success',
            Activation: 'Activation',
            ExpiryDate: 'Expiry Date',
            NewSuccess: 'Create success',
            EditUser: 'Edit User',
            UpdateSuccess: 'Update success',
            UserGroup: 'User Group',
            JoinGroupSetting: 'Join Group Setting',
            UserGroupName: 'Group Name',
            EditGroup: 'Edit @:(view.userManage.UserGroup)',
            NewGroup: 'New @:(view.userManage.UserGroup)',
            GroupMembers: 'Group Members',
            NoMembers: 'No Members'
        }
    },
    ALL: 'ALL',
    all: 'all',
    All: 'All',
    Creator: 'Creator',
    CreatedTime: 'Created Time',
    Operation: 'Operation',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
    Log: 'Log',
    expand: 'expand',
    retract: 'retract',
    Search: 'Search',
    Upgrade: 'Upgrade',
    Delete: 'Delete',
    Revert: 'Revert',
    NoData: 'No Data',
    Tag: 'Tag',
    Day: 'Day',
    Hour: 'Hour',
    Minute: 'Minute',
    Second: 'Second',
    Days: 'Days',
    Hours: 'Hours',
    Minutes: 'Minutes',
    Seconds: 'Seconds',
    ConfirmRemove: 'Operation can not be reverted after removing',
    ShareAll: 'Share All',
    CancelShare: 'Cancel Sharing',
    Detail: 'Show Detail',
    OperationSuccess: 'Operation succeeded',
    SettingSuccess: 'Setting succeeded',
    RemoveSuccess: 'Remove succeeded',
    Success: 'Success',
    Fail: 'Fail',
    Status: 'Status',
    Size: 'Size',
    Stop: 'Stop',
    Reset: 'Reset',
    Yes: '是',
    No: '否',
    Edit: 'Edit'
};
