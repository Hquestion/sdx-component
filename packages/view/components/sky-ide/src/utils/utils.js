export function composeFileKey(file) {
    if (!file) return '';
    return `${file.ownerId}@${file.path}`;
}

export function extend(...rest) {
    var src, copyIsArray, copy, name, options, clone,
        target = rest[0] || {},
        i = 1,
        length = rest.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === 'boolean' ) {
        deep = target;

        // skip the boolean and the target
        target = rest[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== 'object' && typeof target !== 'function' ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = rest[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( typeof copy === 'object' || (copyIsArray = Array.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src &&  typeof src === 'object' ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}
