import { rootKinds } from './fileListTool';
import auth from '@sdx/widget/components/auth';

export default {
    inject: ['fileManager'],
    methods: {
        isProjectRoot() {
            return this.fileManager.isProjectRoot();
        },
        isAcceptedRoot() {
            return this.fileManager.isAcceptedRoot();
        },
        isMyShareRoot() {
            return this.fileManager.isMyShareRoot();
        },
        canMkdir() {
            return !this.fileManager.isSearch && this.fileManager.rootKind !== rootKinds.MY_SHARE && this.fileManager.rootKind !== rootKinds.ACCEPTED_SHARE && !this.isProjectRoot();
        },
        canUpload() {
            return !this.fileManager.isSearch && this.fileManager.rootKind !== rootKinds.MY_SHARE && this.fileManager.rootKind !== rootKinds.ACCEPTED_SHARE && !this.isProjectRoot() && auth.checkAuth('FILE-MANAGER:FILE:UPLOAD:""', 'BUTTON');
        },
        canShare() {
            if ([rootKinds.MY_SHARE, rootKinds.ACCEPTED_SHARE, rootKinds.PROJECT_SHARE].includes(this.fileManager.rootKind)) {
                return false;
            } else {
                return this.fileManager.checked.length > 0 && this.fileManager.checked.every(item => !item.fileShareId) && auth.checkAuth('FILE-MANAGER:FILE:SHARE:""', 'BUTTON');
            }
        },
        // 除了我的共享的根目录下，都不能取消分享
        canCancelShare() {
            if (this.fileManager.checked.length === 0) {
                return false;
            }
            if (this.isMyShareRoot()) {
                return true;
            }
            if ([rootKinds.ACCEPTED_SHARE, rootKinds.PROJECT_SHARE].includes(this.fileManager.rootKind)) return false;
            // return this.fileManager.checked.every(item => !!item.fileShareId);
            return false;
        },
        canDownload() {
            return this.fileManager.checked.length > 0 && this.fileManager.rootKind !== rootKinds.MY_SHARE && !this.isAcceptedRoot() && !this.isProjectRoot() && auth.checkAuth('FILE-MANAGER:FILE:DOWNLOAD:""', 'BUTTON');
        },
        canCopy() {
            return this.fileManager.checked.length > 0 && (this.fileManager.rootKind === rootKinds.ACCEPTED_SHARE && !this.isAcceptedRoot());
        },
        canMove() {
            return this.fileManager.checked.length > 0 && ![rootKinds.ACCEPTED_SHARE, rootKinds.MY_SHARE].includes(this.fileManager.rootKind) && !this.isProjectRoot();
        },
        canDelete() {
            return this.fileManager.checked.length > 0 && ![rootKinds.ACCEPTED_SHARE, rootKinds.MY_SHARE].includes(this.fileManager.rootKind) && !this.isProjectRoot();
        }
    }
};
