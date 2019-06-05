import { rootKinds } from './fileListTool';

export default {
    inject: ['fileManager'],
    methods: {
        isProjectRoot() {
            return this.fileManager.isProjectRoot();
        },
        canMkdir() {
            return !this.fileManager.isSearch && this.fileManager.rootKind !== rootKinds.MY_SHARE && this.fileManager.rootKind !== rootKinds.ACCEPTED_SHARE && !this.isProjectRoot();
        },
        canUpload() {
            return !this.fileManager.isSearch && this.fileManager.rootKind !== rootKinds.MY_SHARE && this.fileManager.rootKind !== rootKinds.ACCEPTED_SHARE && !this.isProjectRoot();
        },
        canShare() {
            if ([rootKinds.MY_SHARE, rootKinds.ACCEPTED_SHARE, rootKinds.PROJECT_SHARE].includes(this.fileManager.rootKind)) {
                return false;
            } else {
                return this.fileManager.checked.length > 0 && this.fileManager.checked.every(item => !item.fileShareDetailId);
            }
        },
        canCancelShare() {
            if (this.fileManager.checked.length === 0) {
                return false;
            }
            if (this.fileManager.rootKind === rootKinds.MY_SHARE) {
                return true;
            }
            if ([rootKinds.ACCEPTED_SHARE, rootKinds.PROJECT_SHARE].includes(this.fileManager.rootKind)) return false;
            // return this.fileManager.checked.every(item => !!item.fileShareDetailId);
            return false;
        },
        canDownload() {
            return this.fileManager.checked.length > 0 && this.fileManager.rootKind !== rootKinds.MY_SHARE;
        },
        canCopy() {
            return this.fileManager.checked.length > 0 && this.fileManager.rootKind === rootKinds.ACCEPTED_SHARE;
        },
        canMove() {
            return this.fileManager.checked.length > 0 && ![rootKinds.ACCEPTED_SHARE, rootKinds.MY_SHARE].includes(this.fileManager.rootKind) && !this.isProjectRoot();
        },
        canDelete() {
            return this.fileManager.checked.length > 0 && ![rootKinds.ACCEPTED_SHARE, rootKinds.MY_SHARE].includes(this.fileManager.rootKind) && !this.isProjectRoot();
        }
    }
};
