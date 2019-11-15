import CodeMirror from 'codemirror';
require('codemirror/mode/meta.js');

import codemirrorMode from '@sdx/utils/src/helper/codemirrorMode';

export const EditorSupportMimeTypes = [
    ...CodeMirror.modeInfo
];

export const notebookSupportMimeTypes = [
    {name: 'Sky Notebook', mime: 'text/x-python', mode: 'python', ext: ['ipynb']},
    {name: 'Python', mime: 'text/x-python', mode: 'python', ext: ['py']}
];

export const extname = codemirrorMode.extname;

export const findFileMode = codemirrorMode.findFileMode;

export const findModeByName = codemirrorMode.findModeByName;

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
