export default {
    getUser() {
        return {
            allPermissions: [
                'SYSTEM:ALL:ADMIN:',
                ''
            ]
        };
    },
    getAuthSwitcher() {
        return false;
    }
};
