export default {
    ui: {
        button: {
            ok: 'OK'
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
        projectCard: {
            Template: 'Template',
            SelectTemplate: 'Select Template',
            SelectProject: 'Select Project',
            title: {
                ViewDetail: 'View Detail',
                Edit: 'Edit',
                Delete: 'Delete'
            }
        }
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
                CPU_Memory_resources_need_to_be_configured: 'CPU/Memory resources need to be configured',
                GPU_resources_need_to_be_configured: 'GPU resources need to be configured',
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
    Seconds: 'Seconds'
};
