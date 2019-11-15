import CodeMirror from 'codemirror';
require('codemirror/mode/meta.js');

export function extname(file) {
    let names = file.name.split('.');
    return names[names.length - 1];
}

export function findFileMode(file) {
    let ext = extname(file);
    return CodeMirror.findModeByExtension(ext);
}

export function findModeByName(name) {
    return CodeMirror.findModeByName(name);
}

export default {
    extname,
    findFileMode,
    findModeByName
};
