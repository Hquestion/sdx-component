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
        }
    },
    general: {
        requiredInfo: 'Please fill out all required fields!'
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
            componentState: {
                searchPodPlaceholder: 'Please enter a Pod name',
                PodName: 'Pod Name',
                ComponentState: 'Component State',
                Namespace: 'Namespace',
                Node: 'Node',
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
            ImageVersionInputPlaceholder: 'Please enter the mirror version number',
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
            LogDetail: 'Log Detail'

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
    Revert: 'Revert'
};
