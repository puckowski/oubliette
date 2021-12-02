import { GameItem } from "./game-item.model.js";

export class Player {
    constructor() {
        this.MIN_ATTACK_BONUS = 2;

        this.health = 25;
        this.healthMax = 25;

        this.magicPoints = 10;
        this.magicPointsMax = 10;

        this.attack = 10;
        this.attackMax = 10;

        this.defence = 10;
        this.defenceMax = 10;

        this.range = 10;
        this.rangeMax = 10;

        this.coins = 10;

        this.lastStatusString = null;

        this.items = [];
        this.MAX_ITEMS = 15;

        this.attackBonus = 2;
        this.mageBonus = 0;
        this.rangeBonus = 0;
        this.armorBonus = 0;

        this.herblaw = 0;
    }

    toJsonObject() {
        const player = {};
        player.health = this.health;
        player.healthMax = this.healthMax;

        player.magicPoints = this.magicPoints;
        player.magicPointsMax = this.magicPointsMax;

        player.attack = this.attack;
        player.attackMax = this.attackMax;

        player.defence = this.defence;
        player.defenceMax = this.defenceMax;

        player.range = this.range;
        player.rangeMax = this.rangeMax;

        player.coins =  this.coins;

        player.lastStatusString = this.lastStatusString;

        player.items = this.items;

        player.attackBonus = this.attackBonus;
        player.mageBonus = this.mageBonus;
        player.rangeBonus = this.rangeBonus;
        player.armorBonus = this.armorBonus;

        player.herblaw = this.herblaw;

        return player;
    }

    fromJsonObject(player, itemMap) {
        this.health = player.health;
        this.healthMax = player.healthMax;

        this.magicPoints = player.magicPoints;
        this.magicPointsMax = player.magicPointsMax;

        this.attack = player.attack;
        this.attackMax = player.attackMax;

        this.defence = player.defence;
        this.defenceMax = player.defenceMax;

        this.range = player.range;
        this.rangeMax = player.rangeMax;

        this.coins = player.coins;

        this.lastStatusString = player.lastStatusString;

        player.items.forEach(item => {
            let newGameItem = new GameItem(item.name, item.imgSrc);
            newGameItem.setAttackBuff(item.attBuff);
            newGameItem.setDefenceBuff(item.defBuff);
            newGameItem.setCoins(item.coins);
            newGameItem.setHealth(item.health);
            newGameItem.setMagicBuff(item.magicBuff);
            newGameItem.setRangeBuff(item.rangeBuff);
            newGameItem.setDescription(item.description);
            newGameItem.setRarity(item.rarity);
            newGameItem.setUsable(item.usable);
            newGameItem.setArmorBonus(item.armorBonus);

            const useItem = itemMap.get(item.name);
            newGameItem.setUseFunction(useItem.getUseFunction());
       
            this.items.push(newGameItem);
        });

        this.attackBonus = player.attackBonus;
        this.mageBonus = player.mageBonus;
        this.rangeBonus = player.rangeBonus;
        this.armorBonus = player.armorBonus;

        this.herblaw = player.herblaw;
        if (!this.herblaw) {
            this.herblaw = 0;
        }
    }

    boostHerblaw(xp) {
        this.herblaw += xp;
    }

    getHerblaw() {
        return this.herblaw;
    }

    getSkillLevel(experience) {
        let lvl = (experience / 100.0) + 1;

        lvl = Math.floor(lvl);

        if (lvl > 100) {
            lvl = 100;
        }

        return lvl;
    }

    getMaxArmorBonus() {
        if (this.items.length === 0) {
            return { name: 'None', getArmorBonus: () => { return 0; } };
        }

        let maxArmorBonus = null, currArmorBonus = null;
        for(let i = 0; i < this.items.length; ++i) {
            currArmorBonus = this.items[i];

            if (!maxArmorBonus) {
                maxArmorBonus = currArmorBonus;
            } else {
                if (currArmorBonus.getArmorBonus() > maxArmorBonus.getArmorBonus()
                    && currArmorBonus.getUsable() === false) {
                    maxArmorBonus = currArmorBonus;
                }
            }
        }
 
        if (maxArmorBonus.getUsable() === true || maxArmorBonus.getArmorBonus() === 0) {
            return { name: 'None', getArmorBonus: () => { return 0; } };
        }

        return maxArmorBonus;
    }

    getMaxMeleeItem() {
        if (this.items.length === 0) {
            return { name: 'Fist', getAttackBuff: () => { return 2; } };
        }

        let maxMelee = null, currMelee = null;
        for(let i = 0; i < this.items.length; ++i) {
            currMelee = this.items[i];

            if (!maxMelee) {
                maxMelee = currMelee;
            } else {
                if (currMelee.getAttackBuff() > maxMelee.getAttackBuff()
                    && currMelee.getUsable() === false) {
                    maxMelee = currMelee;
                }
            }
        }
 
        if (maxMelee.getUsable() === true || maxMelee.getAttackBuff() === 0) {
            return { name: 'Fist', getAttackBuff: () => { return 2; } };
        }

        return maxMelee;
    }

    computeAttackBonus() {
        if (this.items.length === 0) {
            return this.MIN_ATTACK_BONUS;
        }

        let highest = this.getMaxMeleeItem().getAttackBuff();

        return highest;
    }

    getMaxMageItem() {
        if (this.items.length === 0) {
            return { name: 'None', getMagicBuff: () => { return 0; } };
        }

        let maxMage = null, currMage = null;
        for(let i = 0; i < this.items.length; ++i) {
            currMage = this.items[i];

            if (!maxMage) {
                maxMage = currMage;
            } else {
                if (currMage.getMagicBuff() > maxMage.getMagicBuff()
                    && currMage.getUsable() === false) {
                    maxMage = currMage;
                }
            }
        }
 
        if (maxMage.getUsable() === true || maxMage.getMagicBuff() === 0) {
            return { name: 'None', getMagicBuff: () => { return 0; } };
        }

        return maxMage;
    }

    computeMageBonus() {
        if (this.items.length === 0) {
            return 0;
        }

        return this.getMaxMageItem().getMagicBuff();
    }

    getMaxRangeItem() {
        if (this.items.length === 0) {
            return { name: 'None', getRangeBuff: () => { return 0; } };
        }

        let maxRange = null, currRange = null;
        for(let i = 0; i < this.items.length; ++i) {
            currRange = this.items[i];

            if (!maxRange) {
                maxRange = currRange;
            } else {
                if (currRange.getRangeBuff() > maxRange.getRangeBuff()
                    && currRange.getUsable() === false) {
                    maxRange = currRange;
                }
            }
        }
 
        if (maxRange.getUsable() === true || maxRange.getRangeBuff() === 0) {
            return { name: 'None', getRangeBuff: () => { return 0; } };
        }

        return maxRange;
    }

    computeRangeBonus() {
        if (this.items.length === 0) {
            return 0;
        }
        
        return this.getMaxRangeItem().getRangeBuff();
    }

    getMeleeAttackDamage() {
        let ratio = (this.attack / this.attackMax);
        let max = Math.random() * this.computeAttackBonus();
        return Math.round(max * ratio);
    }

    getRangeAttackDamage() {
        return Math.round(Math.random() * this.computeRangeBonus() * (this.range / this.rangeMax));
    }

    getMageAttackDamage() {
        return Math.round(Math.random() * this.computeMageBonus() * (this.magicPoints / this.magicPointsMax));
    }

    setRange(range) {
        this.range = range;
    }

    getRange() {
        return this.range;
    }

    setRangeMax(rangeMax) {
        this.rangeMax = rangeMax;
    }

    getRangeMax() {
        return this.rangeMax;
    }

    getCoins() {
        return this.coins;
    }

    setCoins(coins) {
        this.coins = coins;
    }

    setDefence(defence) {
        this.defence = defence;
    }

    getDefence() {
        return this.defence;
    }

    setDefenceMax(defenceMax) {
        this.defenceMax = defenceMax;
    }

    getDefenceMax() {
        return this.defenceMax;
    }

    setAttack(attack) {
        this.attack = attack;
    }

    getAttack() {
        return this.attack;
    }

    setAttackMax(attackMax) {
        this.attackMax = attackMax;
    }

    getAttackMax() {
        return this.attackMax;
    }

    setHealth(health) {
        this.health = health;
    }

    getHealth() {
        return this.health;
    }

    setHealthMax(healthMax) {
        this.healthMax = healthMax;
    }

    getHealthMax() {
        return this.healthMax;
    }

    setMagicPoints(magicPoints) {
        this.magicPoints = magicPoints;
    }

    getMagicPoints() {
        return this.magicPoints;
    }

    setMagicPointsMax(magicPointsMax) {
        this.magicPointsMax = magicPointsMax;
    }

    getMagicPointsMax() {
        return this.magicPointsMax;
    }

    getItems() {
        return this.items;
    }

    canAddItem() {
        if (this.items.length <= this.MAX_ITEMS) {
            return true;
        }

        return false;
    }

    addItem(item) {
        if (this.items.length <= this.MAX_ITEMS) {
            this.items.push(item);

            return true;
        }
    
        return false;
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    removeItemByName(name) {
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].getName() === name) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

    getHealthStringLong() {
        return 'Health: ' + this.health + '/' + this.healthMax;
    }

    getHealthString() {
        return 'HP: ' + this.health + '/' + this.healthMax;
    }

    getMagicPointsStringLong() {
        return 'Mana Points: ' + this.magicPoints + '/' + this.magicPointsMax;
    }

    getMagicPointsString() {
        return 'MP: ' + this.magicPoints + '/' + this.magicPointsMax;
    }
    
    getAttackStringLong() {
        return 'Attack: ' + this.attack + '/' + this.attackMax;
    }

    getAttackString() {
        return 'Att: ' + this.attack + '/' + this.attackMax;
    }

    getDefenceStringLong() {
        return 'Defence: ' + this.defence + '/' + this.defenceMax;
    }

    getDefenceString() {
        return 'Def: ' + this.defence + '/' + this.defenceMax;
    }

    getCoinsString() {
        return 'Coins: ' + this.coins;
    }

    getRangeStringLong() {
        return 'Range: ' + this.range + '/' + this.rangeMax;
    }

    getRangeString() {
        return 'Rng: ' + this.range + '/' + this.rangeMax;
    }

    getStatusString() {
        this.lastStatusString = this.getHealthString() + '&emsp;&emsp;' + this.getAttackString() + '&emsp;&emsp;' + this.getDefenceString() 
            + '&emsp;&emsp;' + this.getMagicPointsString() + '&emsp;&emsp;' + this.getRangeString() + '&emsp;&emsp;' + this.getCoinsString();

        return this.lastStatusString;
    }

    applyDebuff(debuff) {
        const skill = Math.round(Math.random() * (4 - 1) + 1);

        switch(skill) {
            case 1: {
                let newAttack = this.getAttack() - debuff;
                if (newAttack < 1) {
                    newAttack = 1;
                }
                this.setAttack(newAttack);

                break;
            }
            case 2: {
                let newDefence = this.getDefence() - debuff;
                if (newDefence < 1) {
                    newDefence = 1;
                }
                this.setDefence(newDefence);

                break;
            }
            case 3: {
                let newMage = this.getMagicPoints() - debuff;
                if (newMage < 1) {
                    newMage = 1;
                }
                this.setMagicPoints(newMage);

                break;
            }
            case 4: {
                let newRange = this.getRange() - debuff;
                if (newRange < 1) {
                    newRange = 1;
                }
                this.setRange(newRange);

                break;
            }
        }
    }
}
