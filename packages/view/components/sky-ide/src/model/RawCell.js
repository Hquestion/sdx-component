import { v4 as uuid } from 'uuid';
export default class RawCell {
    constructor(opt) {
        this.cell_type = 'raw';
        this.execution_count = opt.execution_count || '';
        this.metadata = opt.metadata || {trusted: true};
        this.outputs = opt.outputs || [];
        this.source = opt.source || '';
        this.id = opt.id || uuid();
    }
}
