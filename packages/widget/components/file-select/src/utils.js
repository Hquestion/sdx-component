export function getPathIcon(path) {
    const DEFAULT_FOLDER_ICON = 'sdx-wenjianjia';
    const DEFAULT_FILE_ICON = 'sdx-icon-tickets';
    let iconClass;
    if (!path.isFile) {
        iconClass = DEFAULT_FOLDER_ICON;
    } else {
        const fileIconMap = {
            'image/png': 'sdx-PNG',
            'text/csv': 'sdx-CSV'
        };
        const matchedIcon = path.mimeType && fileIconMap[path.mimeType.toLowerCase()];
        iconClass = matchedIcon || DEFAULT_FILE_ICON;
    }
    return iconClass;
}

export function renderFileNode(h, node, data) {
    const newFolder = () => {
        const save = () => {
            // todo save
        };
        const cancel = () => {
            window.console.log('cancel');
        };
        return (
            <div class="sdxw-file-select-tree__new-folder">
                <input vModel={data.name} />
                <i class="sdx-icon sdx-icon-circle-outline accept-icon" onClick={save}/>
                <i class="sdx-icon sdx-icon-remove-outline cancel-icon" onClick={cancel}/>
            </div>
        );
    };
    return (
        <span
            class={{
                'is-folder': !data.isFile,
                'is-file': !!data.isFile,
                'sdxw-file-select-tree__node': true,
                'sdxw-file-select-tree__new': !data.path
            }}
        >
            <svg
                class="sdxw-file-select-tree__node-icon"
                aria-hidden="true"
            >
                <use xlinkHref={'#' + getPathIcon(data)}/>
            </svg>
            {data.path ? node.label : newFolder()}
        </span>
    );
}
