export function getResourceTmplList(start, count, type) {
    let res = null;
    
    if (type === 'GPU') {
        res = Promise.resolve({
            items:  [
                {
                    label: 'XX',
                    count: 1,
                    uuid: 'XX-1'
                },
                {
                    label: 'XX1',
                    count: 2,
                    uuid: '112'
                },
                {
                    label: 'XX2',
                    count: 3,
                    uuid: '112'
                }
            ]
        }
        );
    } else if (type === 'CPU') {
        res = Promise.resolve({
            items: [
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
            ]
        });
    }
    return res;
}
