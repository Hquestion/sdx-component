export default {
    getUser() {
        return {
            allPermissions: [
                'SYSTEM:ALL:ADMIN:',
                ''
            ],
            userId: '121212121'
        };
    },
    getAuthSwitcher() {
        return false;
    }
};

export function getUser() {
    return Promise.resolve({
        allPermissions: [
            'SYSTEM:ALL:ADMIN:',
            ''
        ],
        userId: '121212121'
    });
}
