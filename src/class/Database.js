import { QuickDB, MemoryDriver } from 'quick.db'

export default class extends QuickDB {
    memoryDriver = new MemoryDriver();
    cache = new QuickDB({ driver: this.memoryDriver });

    constructor() {
        super(...arguments)
    }
}