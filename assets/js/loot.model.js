export class LootInventory {

    constructor() {
        this.MODE_TAKE = 0;
        this.MODE_INSPECT = 1;

        this.mode = this.MODE_TAKE;
    }

    isInspectMode() {
        return this.mode === this.MODE_INSPECT;
    }

    setInspectMode() {
        this.mode = this.MODE_INSPECT;
    }
    
    isTakeMode() {
        return this.mode === this.MODE_TAKE;   
    }

    setTakeMode() {
        this.mode = this.MODE_TAKE;
    }
}
