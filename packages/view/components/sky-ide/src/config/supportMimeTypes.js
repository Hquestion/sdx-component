import CodeMirror from 'codemirror';
require('codemirror/mode/meta.js');

export const EditorSupportMimeTypes = [
    ...CodeMirror.modeInfo
];

export const notebookSupportMimeTypes = [
    {name: 'Sky Notebook', mime: 'text/x-python', mode: 'python', ext: ['ipynb']},
    {name: 'Python', mime: 'text/x-python', mode: 'python', ext: ['py']}
];

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

export function isFormatSupport(file) {
    let ext = extname(file);
    let isCMSupport = CodeMirror.findModeByExtension(ext);
    let isSNbSupport = notebookSupportMimeTypes.some(item => item.ext.includes(ext));
    return !!isCMSupport || !!isSNbSupport;
}

export function isSNbSupport(file) {
    let ext = extname(file);
    return notebookSupportMimeTypes.some(item => item.ext.includes(ext));
}

export function isCMSupport(file) {
    let ext = extname(file);
    return !!CodeMirror.findModeByExtension(ext);
}
