export function getPodLog() {
    return Promise.resolve({
        contents: ['first line', 'second line', 'third line'],
        total: 1000
    });
}