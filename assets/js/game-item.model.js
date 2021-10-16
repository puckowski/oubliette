export class GameItem {
    constructor(name, imgSrc) {
        this.name = name;
        this.imgSrc = imgSrc;

        this.attBuff = 0;
        this.defBuff = 0;
        this.coins = 0;
        this.health = 0;
        this.magicBuff = 0;
        this.rangeBuff = 0;
        this.description = '';
        this.rarity = 0.2;
        this.usable = false;
        this.useFunction = null;
        this.armorBonus = 0;
    }

    getArmorBonus() {
        return this.armorBonus;
    }

    setArmorBonus(armorBonus) {
        this.armorBonus = armorBonus;
    }
    
    getUseFunction() {
        return this.useFunction;
    }

    setUseFunction(useFunction) {
        this.useFunction = useFunction;
    }
    
    getUsable() {
        return this.usable;
    }

    setUsable(usable) {
        this.usable = usable;
    }

    setRarity(rarity) {
        this.rarity = rarity;
    }

    getRarity() {
        return this.rarity;
    }
    
    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    getDescriptionLong() {
        return this.description + ' Att: ' + this.attBuff + ', Def: ' + this.defBuff + ', MP: ' + this.magicBuff 
            + ', Rng: ' + this.rangeBuff + ', HP: ' + this.health + ', Coins: ' + this.coins; 
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getImageSource() {
        return this.imgSrc;
    }

    setImageSource(imgSrc) {
        this.imgSrc = imgSrc;
    }

    setAttackBuff(attackBuff) {
        this.attBuff = attackBuff;
    }

    getAttackBuff() {
        return this.attBuff;
    }

    setDefenceBuff(defenceBuff) {
        this.defBuff = defenceBuff;
    }

    getDefenceBuff() {
        return this.defBuff;
    }

    setCoins(coins) {
        this.coins = coins;
    }

    getCoins() {
        return this.coins;
    }

    setHealth(health) {
        this.health = health;
    }

    getHealth() {
        return this.health;
    }

    setMagicBuff(magicBuff) {
        this.magicBuff = magicBuff;
    }

    getMagicBuff() {
        return this.magicBuff;
    }

    setRangeBuff(rangeBuff) {
        this.rangeBuff = rangeBuff;
    }

    getRangeBuff() {
        return this.rangeBuff;
    }
}