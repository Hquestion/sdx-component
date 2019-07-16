export default {
    ui: {
        button: {
            ok: 'OK',
            cancel: 'Cancel'
        }
    },
    widget: {
        userInfo:{
            title:'user detail',
            username:'username',
            fullname:'fullname',
            password:'password',
            groups:'groups',
            role:'role'
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
            BasicInformation: 'Basic Information',
            RunningInformation: 'Running Information',
            ResourceInformation: 'Resource Information',
            DataInformation: 'Data Information',
            RealTimeMonitor: 'Real Time Monitor',
            DataSourceInformation: 'DataSource Information',
            DataSet: 'DataSet',

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
        }
    },
    ALL: 'ALL',
    all: 'all',
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
    RemoveSuccess: 'Remove succeeded'
};
