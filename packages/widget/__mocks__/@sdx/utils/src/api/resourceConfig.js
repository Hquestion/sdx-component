export function resourceList() {
    return Promise.resolve([
        {
            cpu: 1000,
            memory: 2147483648,
            uuid: '112'
        },
        {
            cpu: 4000,
            memory: 2147483648,
            uuid: '1e12'
        },
        {
            cpu: 2000,
            memory: 2147483648,
            uuid: '11e2'
        }
    ]);
}
