const snippets = [
    {
        name: 'main',
        code: '1111'
    },
    {
        name: 'pthon',
        code: `
        import os.path
        import pkgutil
        import shutil
        import sys
        import struct
        import tempfile

        # Useful for very coarse version differentiation.
        PY2 = sys.version_info[0] == 2
        PY3 = sys.version_info[0] == 3
        `
    }
];

export default snippets;
