import { v4 as uuid } from 'uuid';
export default class CodeCell {
    constructor(opt) {
        this.cell_type = 'markdown';
        this.metadata = opt.metadata || {trusted: true, editable: true};
        this.source = opt.source || '';
        this.id = opt.id || uuid();
    }
}
