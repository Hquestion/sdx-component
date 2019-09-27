import CodeMirror from 'codemirror';

function findMimeTypeByExtension(ext) {
    return CodeMirror.findModeByExtension(ext);
}

export default {
    methods: {
        makeMetadataByLang(lang) {
            if (lang === 'python3') {
                return {
                    'kernelspec': {
                        'display_name': 'Python 3',
                        'language': 'python',
                        'name': 'python3'
                    },
                    'language_info': {
                        'codemirror_mode': {
                            'name': 'ipython',
                            'version': 3
                        },
                        'file_extension': '.py',
                        'mimetype': 'text/x-python',
                        'name': 'python',
                        'nbconvert_exporter': 'python',
                        'pygments_lexer': 'ipython3',
                        'version': '3.6.5'
                    }
                };
            } else if (lang === 'ir') {
                return {
                    'kernelspec': {
                        'display_name': 'R',
                        'language': 'R',
                        'name': 'ir'
                    },
                    'language_info': {
                        'codemirror_mode': 'r',
                        'file_extension': '.r',
                        'mimetype': 'text/x-r-source',
                        'name': 'R',
                        'pygments_lexer': 'r',
                        'version': '3.6.1'
                    }
                };
            } else {
                window.console.error(`language ${lang} not support!` );
                return {};
            }
        },

        updateNotebookMimeType() {
            let extension = this.notebook.metadata.language_info && this.notebook.metadata.language_info.fileExtension || '.py';
            this.notebook.cells.forEach(cell => {
                if (cell.cell_type === 'code') {
                    let cellWidget = this.cellMap[cell.order];
                    cellWidget && (cellWidget.model.mimeType = findMimeTypeByExtension(extension.slice(1)));
                }
            });
        }
    }
};
