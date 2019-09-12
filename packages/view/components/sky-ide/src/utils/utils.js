export function composeFileKey(file) {
    if (!file) return '';
    return `${file.ownerId}@${file.path}`;
}
