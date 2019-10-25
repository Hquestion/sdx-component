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
    return (
        <span
            class={{
                'is-folder': !data.isFile,
                'is-file': !!data.isFile,
                'sdxw-file-select-tree__node': true
            }}
        >
            <svg
                class="sdxw-file-select-tree__node-icon"
                aria-hidden="true"
            >
                <use xlinkHref={'#' + getPathIcon(data)}/>
            </svg>
            {node.label}
        </span>
    );
}
