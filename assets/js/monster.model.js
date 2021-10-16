export class Monster {
    constructor() {
        this.maxAttack = 0;
        this.health = 0;
        this.maxDebuff = 0;
        this.healthMax = -1;

        this.items = [];
    }

    setMaxDebuff(maxDebuff) {
        this.maxDebuff = maxDebuff;
    }

    getMaxDebuff() {
        return this.maxDebuff;
    }

    getAttackDebuff(defence, defenceMax) {
        return Math.floor(Math.random() * (this.maxDebuff * (defence / defenceMax)));
    }

    setMaxAttack(maxAttack) {
        this.maxAttack = maxAttack;
    }

    getMaxAttack() {
        return this.maxAttack;
    }

    getAttackDamage(defence, defenceMax) {
        return Math.floor(Math.random() * (this.maxAttack * (defence / defenceMax)));
    }

    getHealthMax() {
        return this.healthMax;
    }
    
    getHealth() {
        return this.health;
    }

    setHealth(health) {
        if (this.healthMax === -1) {
            this.healthMax = health;
        }

        this.health = health;
    }

    setItems(items) {
        this.items = items;
    }

    removeItemAtIndex(index) {
        this.items.splice(index, 1);
    }

    getItems() {
        const itemsToReturn = [];
        
        this.items.forEach(item => {
            let threshold = Math.random();
            if (threshold < item.rarity) {
                itemsToReturn.push(item);
            }
        });

        while (itemsToReturn.length > 5) {
            itemsToReturn.splice(Math.floor(Math.random() * itemsToReturn.length), 1);
        }

        return itemsToReturn;
    }
}