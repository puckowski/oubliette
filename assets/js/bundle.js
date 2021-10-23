(function () {
    'use strict';

    class GameItem {
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

    class Player {
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

            return player;
        }

        fromJsonObject(player) {
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
           
                this.items.push(newGameItem);
            });

            this.attackBonus = player.attackBonus;
            this.mageBonus = player.mageBonus;
            this.rangeBonus = player.rangeBonus;
            this.armorBonus = player.armorBonus;
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

    class DialogHelper {

        constructor() {
            this.okCallback = null;
            this.yesCallback = null;
            this.noCallback = null;

            this.lastText = null;
            this.currentText = null;
            this.printIndex = 0;
            this.lastPrintIndex = 0;
        }

        reset() {
            this.okCallback = null;
            this.yesCallback = null;
            this.noCallback = null;
            updateLastPrintIndex();
        }
        
        isOkButton() {
            if (this.yesCallback && this.noCallback) {
                return false;
            } else {
                return true;
            }
        }

        setCurrentText(text) {
            this.currentText = text;
            this.printIndex++;
        }

        getPrintIndex() {
            return this.printIndex;
        }

        getLastPrintIndex() {
            return this.lastPrintIndex;
        }

        updateLastPrintIndex() {
            this.lastPrintIndex = this.printIndex;
        }
    }

    class PlayerInventory {

        constructor() {
            this.MODE_USE = 0;
            this.MODE_DROP = 1;
            this.MODE_INSPECT = 2;

            this.mode = this.MODE_USE;
        }

        isInspectMode() {
            return this.mode === this.MODE_INSPECT;
        }

        setInspectMode() {
            this.mode = this.MODE_INSPECT;
        }

        isUseMode() {
            return this.mode === this.MODE_USE;
        }

        isDropMode() {
            return this.mode === this.MODE_DROP;
        }

        setDropMode() {
            this.mode = this.MODE_DROP;
        }

        setUseMode() {
            this.mode = this.MODE_USE;
        }

        useItem(player, item, soundHelper, audioListener, audioLoader, soundMap, soundObj) {
            const newAttack = player.getAttack() + item.getAttackBuff();
            const newHealth = player.getHealth() + item.getHealth();
            const newDefence = player.getDefence() + item.getDefenceBuff();
            const newMagicPoints = player.getMagicPoints() + item.getMagicBuff();
            const newRange = player.getRange() + item.getRangeBuff();

            if (item.getCoins() > 0 && soundHelper 
                && item.getAttackBuff() === 0 && item.getHealth() === 0 
                && item.getDefenceBuff() === 0 && item.getMagicBuff() === 0 
                && item.getRangeBuff() === 0
                && item.getName().toLowerCase().includes('coin')) {
                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'coin');

                player.setCoins(player.getCoins() + item.getCoins());
            }

            if (newRange > player.getRangeMax()) {
                player.setRange(newRange); // player.getRangeMax());
            } else {
                player.setRange(newRange);
            }

            if (newAttack > player.getAttackMax()) {
                player.setAttack(newAttack); // player.getAttackMax());
            } else {
                player.setAttack(newAttack);
            }

            if (newDefence > player.getDefenceMax()) {
                player.setDefence(newDefence); // player.getDefenceMax());
            } else {
                player.setDefence(newDefence);
            }

            if (newHealth > player.getHealthMax()) {
                player.setHealth(player.getHealthMax());
            } else {
                player.setHealth(newHealth);
            }

            if (newMagicPoints > player.getMagicPointsMax()) {
                player.setMagicPoints(newMagicPoints); // player.getMagicPointsMax());
            } else {
                player.setMagicPoints(newMagicPoints);
            }

            let reloadInv = false;

            if (item.getUseFunction()) {
                const useFunc = item.getUseFunction();
                reloadInv = useFunc(soundObj);
            }

            return reloadInv;
        }
    }

    class Monster {
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

    class EncounterHelper {
        constructor() {
            this.encounterType = 0;
            this.hasEncounter = false;
            this.monster = null;
            this.x = null;
            this.y = null;
            this.healthBar = document.createElement('canvas');
            this.healthBarContext = this.healthBar.getContext('2d');

            //
            this.updateHealthBarPosition();
        }

        fillHealthBar() {
            let healthPercent = this.monster.getHealth() / this.monster.getHealthMax();
            let greenFill = Math.ceil(healthPercent * this.healthBarWidth);
            let redFill = Math.ceil(this.healthBarWidth - greenFill);

            this.healthBarContext.fillStyle = "rgb(0, 170, 0)";
            this.healthBarContext.fillRect(0, 0, greenFill, this.healthBarHeight);

            this.healthBarContext.fillStyle = "rgb(170, 0, 0)";
            this.healthBarContext.fillRect(greenFill, 0, redFill, this.healthBarHeight);
        }

        removeHealthBar() {
            const statusBarEle = document.getElementById('statusbarContainer');
            const existingHealthBar = document.getElementById('healthBar');
            if (existingHealthBar) {
                statusBarEle.removeChild(existingHealthBar);
            }
        }

        updateHealthBarPosition() {
            let oneVh = Math.round(window.innerHeight / 100);
            let oneVw = Math.round(window.innerWidth / 100);

            this.healthBarWidth = oneVw * 20;
            let healthBarX = (window.innerWidth / 2) - (this.healthBarWidth / 2);
            this.healthBarHeight = oneVh * 3;
            const statusBarEle = document.getElementById('statusbarContainer');
            const existingHealthBar = document.getElementById('healthBar');
            if (existingHealthBar) {
                statusBarEle.removeChild(existingHealthBar);
            }
            statusBarEle.appendChild(this.healthBar);
            let statusBarHeight = statusBarEle.offsetHeight;
            let healthBarY = statusBarHeight + 6;

            var stylePosition = "position:fixed;";
            var styleTop = healthBarY + "px;";
            var styleLeft = healthBarX + "px;";

            this.healthBar.setAttribute("width", this.healthBarWidth);
            this.healthBar.setAttribute("height", this.healthBarHeight);
            this.healthBar.setAttribute("id", "healthBar");
            this.healthBar.setAttribute("style", stylePosition + "top:" + styleTop + "left:" + styleLeft + ";z-index:300");

            if (this.hasEncounter === true) {
                this.fillHealthBar();
            }
        }

        getX() {
            return this.x;
        }

        setX(x) {
            this.x = x;
        }

        getY() {
            return this.y;
        }

        setY(y) {
            this.y = y;
        }
        
        setHasEncounter(hasEncounter) {
            this.hasEncounter = hasEncounter;
        }

        getHasEncounter() {
            return this.hasEncounter;
        }

        getEncounterType() {
            return this.encounterType;
        }

        setEncounterType(encounterType) {
            this.encounterType = encounterType;
        }

        setMonster(monster) {
            this.monster = monster;

            if (this.hasEncounter) {
                this.healthBar.removeAttribute("hidden");
                this.updateHealthBarPosition();
            } else {
                this.healthBar.setAttribute("hidden", true);
            }
        }

        getMonster() {
            return this.monster;
        }
    }

    class LootInventory {

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

    class SoundHelper {
        constructor() {

        }

        playSoundTemporal(audioListener, audioLoader, soundMap, soundName) {
            if (audioListener && audioLoader && soundMap) {
                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get(soundName);

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }
            }
        }
    }

    /**
     * Basic Animator Class
     *
     * allows to animate texture in loop
     *
     * @example
     * const spriteTexture = new THREE.TextureLoader().load('sprite-texture.png')
     * const animator = new PlainAnimator(spriteTexture, 4, 4, 10, 15);
     * const texture = animator.init();
     * animator.animate();
     *
     * @see {@link https://github.com/MaciejWWojcik/three-plain-animator/tree/master/src/examples/simple-2d-animation/src/index.ts)}
     */
    class PlainAnimator {
        /**
         * Create a PlainAnimator
         * @param {Texture} texture - THREE Texture object with sprite image loaded
         * @param {number} tilesAmountHorizontally - number of columns in your sprite image
         * @param {number} tilesAmountVertically - number of rows in your sprite image
         * @param {number} tilesTotalAmount - number of frames in your sprite image
         * @param {number} framesPerSecond - number of frames per second, for example 15
         */
        constructor(texture, tilesAmountHorizontally, tilesAmountVertically, tilesTotalAmount, framesPerSecond) {
            this.texture = texture;
            this.tilesAmountHorizontally = tilesAmountHorizontally;
            this.tilesAmountVertically = tilesAmountVertically;
            this.tilesTotalAmount = tilesTotalAmount;
            this.currentFrameDisplayTime = 0;
            this.currentFrame = 0;
            this.clock = new THREE.Clock();
            this.tilesTotalAmount -= 1; // indexing from 0
            this.frameDisplayDuration = 1000 / framesPerSecond;
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set(1 / tilesAmountHorizontally, 1 / tilesAmountVertically);
        }
        /**
         * Initializes Animator,
         * @param {number} startFrame - optional parameter for setting the start position of animation (frame number)
         * @return {Texture} a Texture object that will display animation
         */
        init(startFrame = 0) {
            this.currentFrame = startFrame;
            this.currentFrameDisplayTime = 0;
            this.clock = new THREE.Clock();
            this.updateFrame();
            return this.texture;
        }
        /**
         * Updates current frame in Texture, should be invoked in loop to allow updating the texture
         *
         * @example
         * function animate() {
         *    animator.animate();
         *    requestAnimationFrame(animate);
         *  }
         *
         */
        animate() {
            this.currentFrameDisplayTime += this.clock.getDelta() * 1000;
            while (this.currentFrameDisplayTime > this.frameDisplayDuration) {
                this.currentFrameDisplayTime -= this.frameDisplayDuration;
                this.currentFrame = this.currentFrame < this.tilesTotalAmount ? this.currentFrame + 1 : 0;
                this.updateFrame();
            }
        }

        updateFrame() {
            const tileHeight = 1 / this.tilesAmountVertically;
            const currentColumn = this.currentFrame % this.tilesAmountHorizontally;
            const currentRow = Math.floor(this.currentFrame / this.tilesAmountHorizontally);
            this.texture.offset.x = currentColumn / this.tilesAmountHorizontally;
            this.texture.offset.y = 1 - currentRow / this.tilesAmountVertically - tileHeight;
        }
    }

    class TextureHelper {

        constructor() {
            this.sizeX = 0;
            this.sizeY = 0;
            this.sizeZ = 0;
            this.platformWidth = 0;
            this.platformHeight = 0;
        }

        setSizeX(sizeX) {
            this.sizeX = sizeX;
        }

        setSizeY(sizeY) {
            this.sizeY = sizeY;
        }

        setSizeZ(sizeZ) {
            this.sizeZ = sizeZ;
        }

        setPlatformWidth(platformWidth) {
            this.platformWidth = platformWidth;
        }

        setPlatformHeight(platformHeight) {
            this.platformHeight = platformHeight;
        }

        buildMonsterTextures(monsterTextureMap, animators) {
            const loader = new THREE.TextureLoader();

            const animDragonTexturePath =  'assets/images/sprites/dragon_3.png';
            const animDragonTexture = new  THREE.TextureLoader().load(animDragonTexturePath);
            const dragonAnimator =  new  PlainAnimator(animDragonTexture, 10, 14, 140, 10);
            const animDragonTextureFinal = dragonAnimator.init();  

            const animDragonGeometry = new THREE.PlaneGeometry(150, 150);
            const animDragon1Material = new THREE.MeshBasicMaterial({
                map: animDragonTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('dragon_3', { geometry: animDragonGeometry, material: animDragon1Material });
            animators.push(dragonAnimator);

            const animDragon2TexturePath =  'assets/images/sprites/dragon_4.png';
            const animDragon2Texture = new  THREE.TextureLoader().load(animDragon2TexturePath);
            const dragon2Animator =  new  PlainAnimator(animDragon2Texture, 2, 2, 4, 4);
            const animDragonTexture2Final = dragon2Animator.init();  

            const animDragon2Geometry = new THREE.PlaneGeometry(100, 100);
            const animDragon2Material = new THREE.MeshBasicMaterial({
                map: animDragonTexture2Final,
                transparent: true
            });
            monsterTextureMap.set('dragon_4', { geometry: animDragon2Geometry, material: animDragon2Material });
            animators.push(dragon2Animator);

            const animDemonTexturePath =  'assets/images/sprites/demon_1.png';
            const animDemonTexture = new  THREE.TextureLoader().load(animDemonTexturePath);
            const demonAnimator =  new  PlainAnimator(animDemonTexture, 1, 18, 18, 10);
            const animDemonTextureFinal = demonAnimator.init();  

            const animDemonGeometry = new THREE.PlaneGeometry(100, 100);
            const animDemon1Material = new THREE.MeshBasicMaterial({
                map: animDemonTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('demon_1', { geometry: animDemonGeometry, material: animDemon1Material });
            animators.push(demonAnimator);

            const animOrcTexturePath =  'assets/images/sprites/orc_3.png';
            const animOrcTexture = new  THREE.TextureLoader().load(animOrcTexturePath);
            const orcAnimator =  new  PlainAnimator(animOrcTexture, 1, 7, 7, 7);
            const animOrcTextureFinal = orcAnimator.init();  

            const animOrcGeometry = new THREE.PlaneGeometry(80, 80);
            const animOrc1Material = new THREE.MeshBasicMaterial({
                map: animOrcTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('orc_3', { geometry: animOrcGeometry, material: animOrc1Material });
            animators.push(orcAnimator);

            const animOrc2TexturePath =  'assets/images/sprites/orc_4.png';
            const animOrc2Texture = new  THREE.TextureLoader().load(animOrc2TexturePath);
            const orc2Animator =  new  PlainAnimator(animOrc2Texture, 1, 7, 7, 7);
            const animOrc2TextureFinal = orc2Animator.init();  

            const animOrc2Geometry = new THREE.PlaneGeometry(80, 80);
            const animOrc2Material = new THREE.MeshBasicMaterial({
                map: animOrc2TextureFinal,
                transparent: true
            });
            monsterTextureMap.set('orc_4', { geometry: animOrc2Geometry, material: animOrc2Material });
            animators.push(orc2Animator);

            const animOrc3TexturePath =  'assets/images/sprites/orc_5.png';
            const animOrc3Texture = new  THREE.TextureLoader().load(animOrc3TexturePath);
            const orc3Animator =  new  PlainAnimator(animOrc3Texture, 1, 10, 10, 10);
            const animOrc3TextureFinal = orc3Animator.init();  

            const animOrc3Geometry = new THREE.PlaneGeometry(80, 80);
            const animOrc3Material = new THREE.MeshBasicMaterial({
                map: animOrc3TextureFinal,
                transparent: true
            });
            monsterTextureMap.set('orc_5', { geometry: animOrc3Geometry, material: animOrc3Material });
            animators.push(orc3Animator);

            const animOrc4TexturePath =  'assets/images/sprites/orc_7.png';
            const animOrc4Texture = new  THREE.TextureLoader().load(animOrc4TexturePath);
            const orc4Animator =  new  PlainAnimator(animOrc4Texture, 1, 8, 8, 8);
            const animOrc4TextureFinal = orc4Animator.init();  

            const animOrc4Geometry = new THREE.PlaneGeometry(80, 80);
            const animOrc4Material = new THREE.MeshBasicMaterial({
                map: animOrc4TextureFinal,
                transparent: true
            });
            monsterTextureMap.set('orc_6', { geometry: animOrc4Geometry, material: animOrc4Material });
            animators.push(orc4Animator);

            const animWizardTexturePath =  'assets/images/sprites/wizard_2.png';
            const animWizardTexture = new  THREE.TextureLoader().load(animWizardTexturePath);
            const wizardAnimator =  new  PlainAnimator(animWizardTexture, 1, 5, 5, 5);
            const animWizardTextureFinal = wizardAnimator.init();  

            const animWizardGeometry = new THREE.PlaneGeometry(80, 80);
            const animWizardMaterial = new THREE.MeshBasicMaterial({
                map: animWizardTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('wizard_2', { geometry: animWizardGeometry, material: animWizardMaterial });
            animators.push(wizardAnimator);

            const animWizard2TexturePath =  'assets/images/sprites/wizard_3.png';
            const animWizard2Texture = new  THREE.TextureLoader().load(animWizard2TexturePath);
            const wizard2Animator =  new  PlainAnimator(animWizard2Texture, 1, 5, 5, 5);
            const animWizard2TextureFinal = wizard2Animator.init();  

            const animWizard2Geometry = new THREE.PlaneGeometry(80, 80);
            const animWizard2Material = new THREE.MeshBasicMaterial({
                map: animWizard2TextureFinal,
                transparent: true
            });
            monsterTextureMap.set('wizard_3', { geometry: animWizard2Geometry, material: animWizard2Material });
            animators.push(wizard2Animator);

            const animSkeletonTexturePath =  'assets/images/sprites/skeleton_2.png';
            const animSkeletonTexture = new  THREE.TextureLoader().load(animSkeletonTexturePath);
            const skeletonAnimator =  new  PlainAnimator(animSkeletonTexture, 1, 8, 8, 8);
            const animSkeletonTextureFinal = skeletonAnimator.init();  

            const animSkeletonGeometry = new THREE.PlaneGeometry(100, 100);
            const animSkeletonMaterial = new THREE.MeshBasicMaterial({
                map: animSkeletonTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('skeleton_1', { geometry: animSkeletonGeometry, material: animSkeletonMaterial });
            animators.push(skeletonAnimator);

            const animReaperTexturePath =  'assets/images/sprites/reaper_2.png';
            const animReaperTexture = new  THREE.TextureLoader().load(animReaperTexturePath);
            const reaperAnimator =  new  PlainAnimator(animReaperTexture, 1, 8, 8, 8);
            const animReaperTextureFinal = reaperAnimator.init();  

            const animReaperGeometry = new THREE.PlaneGeometry(80, 80);
            const animReaperMaterial = new THREE.MeshBasicMaterial({
                map: animReaperTextureFinal,
                transparent: true
            });
            monsterTextureMap.set('reaper_2', { geometry: animReaperGeometry, material: animReaperMaterial });
            animators.push(reaperAnimator);

            const ratGeometry = new THREE.PlaneGeometry(100, 50);
            const rat1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/monster_rat.png'),
                transparent: true
            });
            monsterTextureMap.set('rat_1', { geometry: ratGeometry, material: rat1Material });

            const reaperGeometry = new THREE.PlaneGeometry(80, 80);
            const reaper1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/reaper_1.png'),
                transparent: true
            });
            monsterTextureMap.set('reaper_1', { geometry: reaperGeometry, material: reaper1Material });

            const dragonGeometry = new THREE.PlaneGeometry(100, 100);
            const dragon1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/dragon_1.png'),
                transparent: true
            });
            monsterTextureMap.set('dragon_1', { geometry: dragonGeometry, material: dragon1Material });

            const dragon2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/dragon_2.png'),
                transparent: true
            });
            monsterTextureMap.set('dragon_2', { geometry: dragonGeometry, material: dragon2Material });
            
            const orcGeometry = new THREE.PlaneGeometry(80, 80);
            const orc1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/orc_2.png'),
                transparent: true
            });
            monsterTextureMap.set('orc_1', { geometry: orcGeometry, material: orc1Material });

            const orc2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/orc_1.png'),
                transparent: true
            });
            monsterTextureMap.set('orc_2', { geometry: orcGeometry, material: orc2Material });

            const ogre1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/ogre_1.png'),
                transparent: true
            });
            monsterTextureMap.set('ogre_1', { geometry: orcGeometry, material: ogre1Material });

            const personGeometry = new THREE.PlaneGeometry(100, 100);
            const wizard1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/sprites/wizard_1.png'),
                transparent: true
            });
            monsterTextureMap.set('wizard_1', { geometry: personGeometry, material: wizard1Material });
        }

        buildFloorTextures(floorTextureMap) {
            const loader = new THREE.TextureLoader();

            const floorGeometry = new THREE.BoxGeometry(this.platformWidth, 5, this.platformHeight);
            
            const floor1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/ground_diffuse.jpg'),
            }));
            floorTextureMap.set('floor_1', { geometry: floorGeometry, material: floor1Material });

            const dirt1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/dirt_1.png'),
            }));
            floorTextureMap.set('dirt_1', { geometry: floorGeometry, material: dirt1Material });

            const dirt2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/dirt_2.png'),
            }));
            floorTextureMap.set('dirt_2', { geometry: floorGeometry, material: dirt2Material });

            const grass1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/grass_1.jpg'),
            }));
            floorTextureMap.set('grass_1', { geometry: floorGeometry, material: grass1Material });

            const grass2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/grass_3.jpg'),
            }));
            floorTextureMap.set('grass_2', { geometry: floorGeometry, material: grass2Material });

            const stone1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_3.png'),
            }));
            floorTextureMap.set('stone_1', { geometry: floorGeometry, material: stone1Material });

            const stone2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_4.png'),
            }));
            floorTextureMap.set('stone_2', { geometry: floorGeometry, material: stone2Material });
        }

        buildSkyTextures(skyTextureMap) {
            const loader = new THREE.TextureLoader();

            const skyGeometry = new THREE.BoxGeometry(this.platformWidth, 5, this.platformHeight);

            const sky1Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/roof_diffuse.jpg'),
            }));
            skyTextureMap.set('roof_1', { geometry: skyGeometry, material: sky1Material });

            const sky2Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_1.jpg'),
            }));
            skyTextureMap.set('sky_1', { geometry: skyGeometry, material: sky2Material });

            const sky3Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_2.jpg'),
            }));
            skyTextureMap.set('sky_2', { geometry: skyGeometry, material: sky3Material });

            const sky4Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_3.png'),
            }));
            skyTextureMap.set('sky_3', { geometry: skyGeometry, material: sky4Material });

            const sky5Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_4.jpg'),
            }));
            skyTextureMap.set('sky_4', { geometry: skyGeometry, material: sky5Material });

            const sky6Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_5.png'),
            }));
            skyTextureMap.set('sky_5', { geometry: skyGeometry, material: sky6Material });
        }

        buildWallTextures(wallTextureMap, animators) {
            const loader = new THREE.TextureLoader();
            const wallGeometry = new THREE.BoxGeometry(this.sizeX, this.sizeY, this.sizeZ);

            const sky1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/roof_diffuse.jpg'),
            });
            wallTextureMap.set('roof_1', { geometry: wallGeometry, material: sky1Material });

            const sky2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_1.jpg'),
            });
            wallTextureMap.set('sky_1', { geometry: wallGeometry, material: sky2Material });

            const sky3Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_2.jpg'),
            });
            wallTextureMap.set('sky_2', { geometry: wallGeometry, material: sky3Material });

            const sky4Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_3.png'),
            });
            wallTextureMap.set('sky_3', { geometry: wallGeometry, material: sky4Material });

            const sky5Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_4.jpg'),
            });
            wallTextureMap.set('sky_4', { geometry: wallGeometry, material: sky5Material });

            const sky6Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/sky_5.png')
            });
            wallTextureMap.set('sky_5', { geometry: wallGeometry, material: sky6Material });

            const torchTexturePath =  'assets/images/sprites/torch_1.png';
            const torchTexture = new  THREE.TextureLoader().load(torchTexturePath);
            const torchAnimator =  new  PlainAnimator(torchTexture, 9, 1, 9, 15);
            const torchTextureFinal = torchAnimator.init();  

            const torchGeometry = new THREE.PlaneGeometry(25, 25);
            const torch1Material = new THREE.MeshBasicMaterial({
                map: torchTextureFinal,
                transparent: true
            });
            wallTextureMap.set('torch_1', { geometry: torchGeometry, material: torch1Material });
            animators.push(torchAnimator);

            const animMan1TexturePath =  'assets/images/sprites/man_5.png';
            const animMan1Texture = new  THREE.TextureLoader().load(animMan1TexturePath);
            const animMan1Animator =  new  PlainAnimator(animMan1Texture, 5, 2, 10, 10);
            const animMan1TextureFinal = animMan1Animator.init();  

            const animMan1Geometry = new THREE.PlaneGeometry(80, 80);
            const animMan1Material = new THREE.MeshBasicMaterial({
                map: animMan1TextureFinal,
                transparent: true
            });
            wallTextureMap.set('man_5', { geometry: animMan1Geometry, material: animMan1Material });
            animators.push(animMan1Animator);

            const animWoman1TexturePath =  'assets/images/sprites/woman_3.png';
            const animWoman1Texture = new  THREE.TextureLoader().load(animWoman1TexturePath);
            const animWoman1Animator =  new  PlainAnimator(animWoman1Texture, 1, 10, 10, 10);
            const animWoman1TextureFinal = animWoman1Animator.init();  

            const animWoman1Geometry = new THREE.PlaneGeometry(80, 80);
            const animWoman1Material = new THREE.MeshBasicMaterial({
                map: animWoman1TextureFinal,
                transparent: true
            });
            wallTextureMap.set('woman_3', { geometry: animWoman1Geometry, material: animWoman1Material });
            animators.push(animWoman1Animator);

            const animWoman2TexturePath =  'assets/images/sprites/woman_4.png';
            const animWoman2Texture = new  THREE.TextureLoader().load(animWoman2TexturePath);
            const animWoman2Animator =  new  PlainAnimator(animWoman2Texture, 1, 10, 10, 10);
            const animWoman2TextureFinal = animWoman2Animator.init();  

            const animWoman2Geometry = new THREE.PlaneGeometry(80, 80);
            const animWoman2Material = new THREE.MeshBasicMaterial({
                map: animWoman2TextureFinal,
                transparent: true
            });
            wallTextureMap.set('woman_4', { geometry: animWoman2Geometry, material: animWoman2Material });
            animators.push(animWoman2Animator);

            const accentGeometry = new THREE.PlaneGeometry(50, 50);
            const bush1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/bush_1.png'),
                transparent: true
            });
            wallTextureMap.set('bush_1', { geometry: accentGeometry, material: bush1Material });

            const bush2Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/bush_2.png'),
                transparent: true
            });
            wallTextureMap.set('bush_2', { geometry: accentGeometry, material: bush2Material });

            const bush3Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/bush_3.png'),
                transparent: true
            });
            wallTextureMap.set('bush_3', { geometry: accentGeometry, material: bush3Material });

            const sign1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/sign_1.png'),
                transparent: true
            });
            wallTextureMap.set('sign_1', { geometry: accentGeometry, material: sign1Material });

            const sign2Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/sign_2.png'),
                transparent: true
            });
            wallTextureMap.set('sign_2', { geometry: accentGeometry, material: sign2Material });

            const treeGeometry = new THREE.PlaneGeometry(200, 200);
            const tree1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_1.png'),
                transparent: true
            });
            wallTextureMap.set('tree_1', { geometry: treeGeometry, material: tree1Material });

            const tree2Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_2.png'),
                transparent: true
            });
            wallTextureMap.set('tree_2', { geometry: treeGeometry, material: tree2Material });

            const tree3Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_3.png'),
                transparent: true
            });
            wallTextureMap.set('tree_3', { geometry: treeGeometry, material: tree3Material });

            const tree4Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_4.png'),
                transparent: true
            });
            wallTextureMap.set('tree_4', { geometry: treeGeometry, material: tree4Material });

            const tree5Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_5.png'),
                transparent: true
            });
            wallTextureMap.set('tree_5', { geometry: treeGeometry, material: tree5Material });

            const tree6Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_6.png'),
                transparent: true
            });
            wallTextureMap.set('tree_6', { geometry: treeGeometry, material: tree6Material });

            const tree7Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_7.png'),
                transparent: true
            });
            wallTextureMap.set('tree_7', { geometry: treeGeometry, material: tree7Material });

            const tree8Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_8.png'),
                transparent: true
            });
            wallTextureMap.set('tree_8', { geometry: treeGeometry, material: tree8Material });

            const tree9Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_9.png'),
                transparent: true
            });
            wallTextureMap.set('tree_9', { geometry: treeGeometry, material: tree9Material });

            const tree10Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/textures/tree_10.png'),
                transparent: true
            });
            wallTextureMap.set('tree_10', { geometry: treeGeometry, material: tree10Material });

            const brick1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/brick_1.png')
            });
            wallTextureMap.set('brick_1', { geometry: wallGeometry, material: brick1Material });

            const teleport1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/teleport_1.png'),
                transparent: true
            });
            wallTextureMap.set('teleport_1', { geometry: wallGeometry, material: teleport1Material });

            const door1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/door_1.png'),
            });
            wallTextureMap.set('door_1', { geometry: wallGeometry, material: door1Material });

            const forest1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/forest_3.png')
            });
            wallTextureMap.set('forest_1', { geometry: wallGeometry, material: forest1Material });

            const forest2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/forest_2.png')
            });
            wallTextureMap.set('forest_2', { geometry: wallGeometry, material: forest2Material });

            const forest7Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/forest_7.jpg')
            });
            wallTextureMap.set('forest_7', { geometry: wallGeometry, material: forest7Material });

            const forest8Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/forest_8.jpg')
            });
            wallTextureMap.set('forest_8', { geometry: wallGeometry, material: forest8Material });

            const stone1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_1.png')
            });
            wallTextureMap.set('stone_1', { geometry: wallGeometry, material: stone1Material });

            const stone2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_2.png')
            });
            wallTextureMap.set('stone_2', { geometry: wallGeometry, material: stone2Material });

            const stone3Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_3.png')
            });
            wallTextureMap.set('stone_3', { geometry: wallGeometry, material: stone3Material });

            const stone4Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_4.png')
            });
            wallTextureMap.set('stone_4', { geometry: wallGeometry, material: stone4Material });

            const stone5Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/stone_5.jpg')
            });
            wallTextureMap.set('stone_5', { geometry: wallGeometry, material: stone5Material });

            const stone6Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/wall_diffuse.jpg')
            });
            wallTextureMap.set('stone_6', { geometry: wallGeometry, material: stone6Material });

            const wood1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/wood_1.jpg')
            });
            wallTextureMap.set('wood_1', { geometry: wallGeometry, material: wood1Material });

            const wood2Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/wood_2.png')
            });
            wallTextureMap.set('wood_2', { geometry: wallGeometry, material: wood2Material });

            const wood3Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/wood_3.png')
            });
            wallTextureMap.set('wood_3', { geometry: wallGeometry, material: wood3Material });

            const bookcase1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/bookcase_1.png')
            });
            wallTextureMap.set('bookcase_1', { geometry: wallGeometry, material: bookcase1Material });

            const ruins1Material = new THREE.MeshPhongMaterial({
                map: loader.load('assets/images/textures/ruins_2.png')
            });
            wallTextureMap.set('ruins_1', { geometry: wallGeometry, material: ruins1Material });

            const tableGeometry = new THREE.PlaneGeometry(50, 50);
            const table1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/table_1.gif'),
                transparent: true
            });
            wallTextureMap.set('table_1', { geometry: tableGeometry, material: table1Material });

            const personGeometry = new THREE.PlaneGeometry(80, 80);
            const man1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/man_1.png'),
                transparent: true
            });
            wallTextureMap.set('man_1', { geometry: personGeometry, material: man1Material });

            const man2Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/man_2.png'),
                transparent: true
            });
            wallTextureMap.set('man_2', { geometry: personGeometry, material: man2Material });

            const man3Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/man_3.png'),
                transparent: true
            });
            wallTextureMap.set('man_3', { geometry: personGeometry, material: man3Material });

            const man4Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/man_4.png'),
                transparent: true
            });
            wallTextureMap.set('man_4', { geometry: personGeometry, material: man4Material });

            const woman1Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/woman_1.png'),
                transparent: true
            });
            wallTextureMap.set('woman_1', { geometry: personGeometry, material: woman1Material });

            const woman2Material = new THREE.MeshBasicMaterial({
                map: loader.load('assets/images/sprites/woman_2.png'),
                transparent: true
            });
            wallTextureMap.set('woman_2', { geometry: personGeometry, material: woman2Material });
        }
    }

    class ItemHelper {
        constructor() {

        }

        intializeGameItems(itemMap, player) {
            let gameItem1 = new GameItem('Glass of Beer', 'assets/images/sprites/beer_1.png');
            gameItem1.setAttackBuff(1);
            gameItem1.setDefenceBuff(-1);
            gameItem1.setCoins(1);
            gameItem1.setHealth(2);
            gameItem1.setMagicBuff(0);
            gameItem1.setRangeBuff(0);
            gameItem1.setDescription('A glass of beer.');
            gameItem1.setUsable(true);
            itemMap.set(gameItem1.getName(), gameItem1);

            let gameItem2 = new GameItem('Mug of Beer', 'assets/images/sprites/beer_2.png');
            gameItem2.setAttackBuff(2);
            gameItem2.setDefenceBuff(-2);
            gameItem2.setCoins(2);
            gameItem2.setHealth(3);
            gameItem2.setMagicBuff(0);
            gameItem2.setRangeBuff(0);
            gameItem2.setDescription('A mug of beer.');
            gameItem2.setUsable(true);
            itemMap.set(gameItem2.getName(), gameItem2);

            let gameItem3 = new GameItem('Simple Bow', 'assets/images/sprites/bow_1.png');
            gameItem3.setAttackBuff(0);
            gameItem3.setDefenceBuff(0);
            gameItem3.setCoins(10);
            gameItem3.setHealth(0);
            gameItem3.setMagicBuff(0);
            gameItem3.setRangeBuff(3);
            gameItem3.setDescription('A simple bow.');
            itemMap.set(gameItem3.getName(), gameItem3);

            let gameItem4 = new GameItem('Recurve Bow', 'assets/images/sprites/bow_2.png');
            gameItem4.setAttackBuff(0);
            gameItem4.setDefenceBuff(0);
            gameItem4.setCoins(12);
            gameItem4.setHealth(0);
            gameItem4.setMagicBuff(0);
            gameItem4.setRangeBuff(4);
            gameItem4.setDescription('A powerful recurve bow.');
            itemMap.set(gameItem4.getName(), gameItem4);

            let gameItem5 = new GameItem('Freiyan Bow', 'assets/images/sprites/bow_3.png');
            gameItem5.setAttackBuff(0);
            gameItem5.setDefenceBuff(0);
            gameItem5.setCoins(14);
            gameItem5.setHealth(0);
            gameItem5.setMagicBuff(0);
            gameItem5.setRangeBuff(5);
            gameItem5.setDescription('A Freiyan bow from the south.');
            itemMap.set(gameItem5.getName(), gameItem5);

            let gameItem6 = new GameItem('Axagon Bow', 'assets/images/sprites/bow_4.png');
            gameItem6.setAttackBuff(0);
            gameItem6.setDefenceBuff(0);
            gameItem6.setCoins(16);
            gameItem6.setHealth(0);
            gameItem6.setMagicBuff(0);
            gameItem6.setRangeBuff(6);
            gameItem6.setDescription('An Axagon bow from the northwest.');
            itemMap.set(gameItem6.getName(), gameItem6);

            let gameItem7 = new GameItem('Tyhrann Bow', 'assets/images/sprites/bow_5.png');
            gameItem7.setAttackBuff(0);
            gameItem7.setDefenceBuff(0);
            gameItem7.setCoins(20);
            gameItem7.setHealth(0);
            gameItem7.setMagicBuff(0);
            gameItem7.setRangeBuff(8);
            gameItem7.setDescription('A Thyrann bow from the Dark Isles.');
            itemMap.set(gameItem7.getName(), gameItem7);

            let gameItem8 = new GameItem('Elven Bow', 'assets/images/sprites/bow_6.png');
            gameItem8.setAttackBuff(0);
            gameItem8.setDefenceBuff(0);
            gameItem8.setCoins(18);
            gameItem8.setHealth(0);
            gameItem8.setMagicBuff(0);
            gameItem8.setRangeBuff(7);
            gameItem8.setDescription('An Elven bow from the north.');
            itemMap.set(gameItem8.getName(), gameItem8);

            let gameItem9 = new GameItem('Cheese', 'assets/images/sprites/cheese_1.png');
            gameItem9.setAttackBuff(0);
            gameItem9.setDefenceBuff(0);
            gameItem9.setCoins(2);
            gameItem9.setHealth(3);
            gameItem9.setMagicBuff(0);
            gameItem9.setRangeBuff(0);
            gameItem9.setDescription('A wheel of cheese.');
            gameItem9.setUsable(true);
            itemMap.set(gameItem9.getName(), gameItem9);

            let gameItem10 = new GameItem('Coins', 'assets/images/sprites/coins_1.png');
            gameItem10.setAttackBuff(0);
            gameItem10.setDefenceBuff(0);
            gameItem10.setCoins(1);
            gameItem10.setHealth(0);
            gameItem10.setMagicBuff(0);
            gameItem10.setRangeBuff(0);
            gameItem10.setDescription('Some coins.');
            gameItem10.setUsable(true);
            itemMap.set(gameItem10.getName(), gameItem10);

            let gameItem11 = new GameItem('Meat', 'assets/images/sprites/meat_1.png');
            gameItem11.setAttackBuff(0);
            gameItem11.setDefenceBuff(0);
            gameItem11.setCoins(4);
            gameItem11.setHealth(6);
            gameItem11.setMagicBuff(0);
            gameItem11.setRangeBuff(0);
            gameItem11.setDescription('Some meat.');
            gameItem11.setUsable(true);
            itemMap.set(gameItem11.getName(), gameItem11);

            let gameItem12 = new GameItem('Liver', 'assets/images/sprites/meat_2.png');
            gameItem12.setAttackBuff(0);
            gameItem12.setDefenceBuff(0);
            gameItem12.setCoins(3);
            gameItem12.setHealth(5);
            gameItem12.setMagicBuff(0);
            gameItem12.setRangeBuff(0);
            gameItem12.setDescription('A liver.');
            gameItem12.setUsable(true);
            itemMap.set(gameItem12.getName(), gameItem12);

            let gameItem13 = new GameItem('Health Potion', 'assets/images/sprites/potion_1.png');
            gameItem13.setAttackBuff(0);
            gameItem13.setDefenceBuff(0);
            gameItem13.setCoins(7);
            gameItem13.setHealth(8);
            gameItem13.setMagicBuff(0);
            gameItem13.setRangeBuff(0);
            gameItem13.setDescription('A health potion.');
            gameItem13.setUsable(true);
            itemMap.set(gameItem13.getName(), gameItem13);

            let gameItem14 = new GameItem('Defence Potion', 'assets/images/sprites/potion_2.png');
            gameItem14.setAttackBuff(0);
            gameItem14.setDefenceBuff(8);
            gameItem14.setCoins(7);
            gameItem14.setHealth(0);
            gameItem14.setMagicBuff(0);
            gameItem14.setRangeBuff(0);
            gameItem14.setDescription('A defence potion.');
            gameItem14.setUsable(true);
            itemMap.set(gameItem14.getName(), gameItem14);

            let gameItem15 = new GameItem('Range Potion', 'assets/images/sprites/potion_3.png');
            gameItem15.setAttackBuff(0);
            gameItem15.setDefenceBuff(0);
            gameItem15.setCoins(7);
            gameItem15.setHealth(0);
            gameItem15.setMagicBuff(0);
            gameItem15.setRangeBuff(8);
            gameItem15.setDescription('A range potion.');
            gameItem15.setUsable(true);
            itemMap.set(gameItem15.getName(), gameItem15);

            let gameItem16 = new GameItem('Mage Potion', 'assets/images/sprites/potion_4.png');
            gameItem16.setAttackBuff(0);
            gameItem16.setDefenceBuff(0);
            gameItem16.setCoins(7);
            gameItem16.setHealth(0);
            gameItem16.setMagicBuff(8);
            gameItem16.setRangeBuff(0);
            gameItem16.setDescription('A mage potion.');
            gameItem16.setUsable(true);
            itemMap.set(gameItem16.getName(), gameItem16);

            let gameItem17 = new GameItem('Restore Potion', 'assets/images/sprites/potion_5.png');
            gameItem17.setAttackBuff(5);
            gameItem17.setDefenceBuff(5);
            gameItem17.setCoins(20);
            gameItem17.setHealth(10);
            gameItem17.setMagicBuff(5);
            gameItem17.setRangeBuff(5);
            gameItem17.setDescription('A restore potion. Cures all types of ailments.');
            gameItem17.setUsable(true);
            itemMap.set(gameItem17.getName(), gameItem17);

            let gameItem18 = new GameItem('Sandwich', 'assets/images/sprites/sandwich_1.png');
            gameItem18.setAttackBuff(0);
            gameItem18.setDefenceBuff(0);
            gameItem18.setCoins(3);
            gameItem18.setHealth(5);
            gameItem18.setMagicBuff(0);
            gameItem18.setRangeBuff(0);
            gameItem18.setDescription('A lovely sandwich.');
            gameItem18.setUsable(true);
            itemMap.set(gameItem18.getName(), gameItem18);

            let gameItem19 = new GameItem('Earth Staff', 'assets/images/sprites/staff_1.png');
            gameItem19.setAttackBuff(0);
            gameItem19.setDefenceBuff(0);
            gameItem19.setCoins(10);
            gameItem19.setHealth(0);
            gameItem19.setMagicBuff(3);
            gameItem19.setRangeBuff(0);
            gameItem19.setDescription('An earth staff.');
            itemMap.set(gameItem19.getName(), gameItem19);

            let gameItem20 = new GameItem('Fire Staff', 'assets/images/sprites/staff_3.png');
            gameItem20.setAttackBuff(0);
            gameItem20.setDefenceBuff(0);
            gameItem20.setCoins(12);
            gameItem20.setHealth(0);
            gameItem20.setMagicBuff(4);
            gameItem20.setRangeBuff(0);
            gameItem20.setDescription('A fire staff.');
            itemMap.set(gameItem20.getName(), gameItem20);

            let gameItem21 = new GameItem('Air Staff', 'assets/images/sprites/staff_4.png');
            gameItem21.setAttackBuff(0);
            gameItem21.setDefenceBuff(0);
            gameItem21.setCoins(14);
            gameItem21.setHealth(0);
            gameItem21.setMagicBuff(5);
            gameItem21.setRangeBuff(0);
            gameItem21.setDescription('An air staff.');
            itemMap.set(gameItem21.getName(), gameItem21);

            let gameItem22 = new GameItem('Dark Staff', 'assets/images/sprites/staff_5.png');
            gameItem22.setAttackBuff(0);
            gameItem22.setDefenceBuff(0);
            gameItem22.setCoins(16);
            gameItem22.setHealth(0);
            gameItem22.setMagicBuff(6);
            gameItem22.setRangeBuff(0);
            gameItem22.setDescription('A dark staff.');
            itemMap.set(gameItem22.getName(), gameItem22);

            let gameItem23 = new GameItem('Light Staff', 'assets/images/sprites/staff_6.png');
            gameItem23.setAttackBuff(0);
            gameItem23.setDefenceBuff(0);
            gameItem23.setCoins(20);
            gameItem23.setHealth(0);
            gameItem23.setMagicBuff(8);
            gameItem23.setRangeBuff(0);
            gameItem23.setDescription('A staff of light.');
            itemMap.set(gameItem23.getName(), gameItem23);

            let gameItem24 = new GameItem('Water Staff', 'assets/images/sprites/staff_7.png');
            gameItem24.setAttackBuff(0);
            gameItem24.setDefenceBuff(0);
            gameItem24.setCoins(18);
            gameItem24.setHealth(0);
            gameItem24.setMagicBuff(7);
            gameItem24.setRangeBuff(0);
            gameItem24.setDescription('A water staff.');
            itemMap.set(gameItem24.getName(), gameItem24);

            let gameItem25 = new GameItem('Long Sword', 'assets/images/sprites/sword_1.png');
            gameItem25.setAttackBuff(3);
            gameItem25.setDefenceBuff(0);
            gameItem25.setCoins(10);
            gameItem25.setHealth(0);
            gameItem25.setMagicBuff(0);
            gameItem25.setRangeBuff(0);
            gameItem25.setDescription('A basic sword.');
            itemMap.set(gameItem25.getName(), gameItem25);

            let gameItem26 = new GameItem('Freiyan Sword', 'assets/images/sprites/sword_2.png');
            gameItem26.setAttackBuff(4);
            gameItem26.setDefenceBuff(0);
            gameItem26.setCoins(12);
            gameItem26.setHealth(0);
            gameItem26.setMagicBuff(0);
            gameItem26.setRangeBuff(0);
            gameItem26.setDescription('A Freiyan sword from the south.');
            itemMap.set(gameItem26.getName(), gameItem26);

            let gameItem27 = new GameItem('Axagon Sword', 'assets/images/sprites/sword_3.png');
            gameItem27.setAttackBuff(5);
            gameItem27.setDefenceBuff(0);
            gameItem27.setCoins(14);
            gameItem27.setHealth(0);
            gameItem27.setMagicBuff(0);
            gameItem27.setRangeBuff(0);
            gameItem27.setDescription('An Axagon sword from the northwest.');
            itemMap.set(gameItem27.getName(), gameItem27);

            let gameItem28 = new GameItem('Broad Sword', 'assets/images/sprites/sword_4.png');
            gameItem28.setAttackBuff(6);
            gameItem28.setDefenceBuff(0);
            gameItem28.setCoins(16);
            gameItem28.setHealth(0);
            gameItem28.setMagicBuff(0);
            gameItem28.setRangeBuff(0);
            gameItem28.setDescription('A powerful broad sword.');
            itemMap.set(gameItem28.getName(), gameItem28);

            let gameItem29 = new GameItem('Blessed Sword', 'assets/images/sprites/sword_5.png');
            gameItem29.setAttackBuff(8);
            gameItem29.setDefenceBuff(0);
            gameItem29.setCoins(22);
            gameItem29.setHealth(0);
            gameItem29.setMagicBuff(0);
            gameItem29.setRangeBuff(0);
            gameItem29.setDescription('A mighty blessed sword.');
            itemMap.set(gameItem29.getName(), gameItem29);

            let gameItem30 = new GameItem('Tyhrann Sword', 'assets/images/sprites/sword_6.png');
            gameItem30.setAttackBuff(7);
            gameItem30.setDefenceBuff(0);
            gameItem30.setCoins(18);
            gameItem30.setHealth(0);
            gameItem30.setMagicBuff(0);
            gameItem30.setRangeBuff(0);
            gameItem30.setDescription('A Tyhrann sword from the Dark Isles.');
            itemMap.set(gameItem30.getName(), gameItem30);

            let gameItem31 = new GameItem('Priest\'s Book', 'assets/images/sprites/book_1.png');
            gameItem31.setAttackBuff(0);
            gameItem31.setDefenceBuff(0);
            gameItem31.setCoins(2);
            gameItem31.setHealth(0);
            gameItem31.setMagicBuff(0);
            gameItem31.setRangeBuff(0);
            gameItem31.setDescription('The crypts imbue the creatures with magic. If engaged, they may drain your stamina. The Sorcerer\'s minions all have this effect. Only peril in the great forests.');
            itemMap.set(gameItem31.getName(), gameItem31);

            let gameItem32 = new GameItem('Adventurer\'s Log', 'assets/images/sprites/book_2.png');
            gameItem32.setAttackBuff(0);
            gameItem32.setDefenceBuff(0);
            gameItem32.setCoins(2);
            gameItem32.setHealth(0);
            gameItem32.setMagicBuff(0);
            gameItem32.setRangeBuff(0);
            gameItem32.setDescription('Strong weapons of all varieties will be needed to take down the mighty Dragon. Attacking the Dragon bravely with only sword is futile.');
            itemMap.set(gameItem32.getName(), gameItem32);

            let gameItem33 = new GameItem('Guard\'s Log', 'assets/images/sprites/book_3.png');
            gameItem33.setAttackBuff(0);
            gameItem33.setDefenceBuff(0);
            gameItem33.setCoins(2);
            gameItem33.setHealth(0);
            gameItem33.setMagicBuff(0);
            gameItem33.setRangeBuff(0);
            gameItem33.setDescription('Talking to townsfolk multiple times entices them to offer up goods they normally wouldn\'t sell. This is needed to stay stocked with ample supplies.');
            itemMap.set(gameItem33.getName(), gameItem33);

            let gameItem34 = new GameItem('History of Ar\'kahl', 'assets/images/sprites/book_4.png');
            gameItem34.setAttackBuff(0);
            gameItem34.setDefenceBuff(0);
            gameItem34.setCoins(2);
            gameItem34.setHealth(0);
            gameItem34.setMagicBuff(0);
            gameItem34.setRangeBuff(0);
            gameItem34.setDescription('The King offers a reward to whoever slays the Dragon. The Dragon resides in the depths of the Tyhrann Dungeon.');
            itemMap.set(gameItem34.getName(), gameItem34);

            let gameItem35 = new GameItem('Magic Tome', 'assets/images/sprites/book_5.png');
            gameItem35.setAttackBuff(0);
            gameItem35.setDefenceBuff(0);
            gameItem35.setCoins(2);
            gameItem35.setHealth(0);
            gameItem35.setMagicBuff(0);
            gameItem35.setRangeBuff(0);
            gameItem35.setDescription('Different staffs empower the user with different magic potency. The rarer the staff, the stronger your spells.');
            itemMap.set(gameItem35.getName(), gameItem35);

            let gameItem36 = new GameItem('History of An\'tihl', 'assets/images/sprites/book_6.png');
            gameItem36.setAttackBuff(0);
            gameItem36.setDefenceBuff(0);
            gameItem36.setCoins(2);
            gameItem36.setHealth(0);
            gameItem36.setMagicBuff(0);
            gameItem36.setRangeBuff(0);
            gameItem36.setDescription('One of the Sorcerer\'s mightiest minions is the Great Dragon which controls the Tyhrann Dungeon. Defeat the Dragon, and the Sorcerer becomes vulnerable.');
            itemMap.set(gameItem36.getName(), gameItem36);

            let gameItem37 = new GameItem('Historical Volume', 'assets/images/sprites/book_7.png');
            gameItem37.setAttackBuff(0);
            gameItem37.setDefenceBuff(0);
            gameItem37.setCoins(2);
            gameItem37.setHealth(0);
            gameItem37.setMagicBuff(0);
            gameItem37.setRangeBuff(0);
            gameItem37.setDescription('The City of Freiya is one of the oldest human settlements and is least affected by the Sorcerer\s evil magic.');
            itemMap.set(gameItem37.getName(), gameItem37);

            let gameItem38 = new GameItem('Huckleberries', 'assets/images/sprites/berry_1.png');
            gameItem38.setAttackBuff(0);
            gameItem38.setDefenceBuff(0);
            gameItem38.setCoins(1);
            gameItem38.setHealth(2);
            gameItem38.setMagicBuff(0);
            gameItem38.setRangeBuff(0);
            gameItem38.setDescription('Some huckleberries.');
            gameItem38.setUsable(true);
            itemMap.set(gameItem38.getName(), gameItem38);

            let gameItem39 = new GameItem('Cough Remedy', 'assets/images/sprites/potion_6.gif');
            gameItem39.setAttackBuff(0);
            gameItem39.setDefenceBuff(0);
            gameItem39.setCoins(1);
            gameItem39.setHealth(0);
            gameItem39.setMagicBuff(0);
            gameItem39.setRangeBuff(0);
            gameItem39.setDescription('A cough remedy.');
            gameItem39.setUsable(true);
            itemMap.set(gameItem39.getName(), gameItem39);

            let gameItem40 = new GameItem('Fancy Cheese', 'assets/images/sprites/cheese_2.png');
            gameItem40.setAttackBuff(0);
            gameItem40.setDefenceBuff(0);
            gameItem40.setCoins(3);
            gameItem40.setHealth(4);
            gameItem40.setMagicBuff(0);
            gameItem40.setRangeBuff(0);
            gameItem40.setDescription('Some fancy cheese.');
            gameItem40.setUsable(true);
            itemMap.set(gameItem40.getName(), gameItem40);

            let gameItem41 = new GameItem('Freiyan Dagger', 'assets/images/sprites/dagger_1.png');
            gameItem41.setAttackBuff(3);
            gameItem41.setDefenceBuff(0);
            gameItem41.setCoins(6);
            gameItem41.setHealth(0);
            gameItem41.setMagicBuff(0);
            gameItem41.setRangeBuff(0);
            gameItem41.setDescription('A Freiyan dagger.');
            gameItem41.setUsable(false);
            itemMap.set(gameItem41.getName(), gameItem41);

            let gameItem42 = new GameItem('Axagon Mace', 'assets/images/sprites/mace_1.png');
            gameItem42.setAttackBuff(4);
            gameItem42.setDefenceBuff(0);
            gameItem42.setCoins(9);
            gameItem42.setHealth(0);
            gameItem42.setMagicBuff(0);
            gameItem42.setRangeBuff(0);
            gameItem42.setDescription('An Axagon spiky mace.');
            gameItem42.setUsable(false);
            itemMap.set(gameItem42.getName(), gameItem42);

            let gameItem43 = new GameItem('Staff of Wisdom', 'assets/images/sprites/staff_8.png');
            gameItem43.setAttackBuff(0);
            gameItem43.setDefenceBuff(0);
            gameItem43.setCoins(14);
            gameItem43.setHealth(0);
            gameItem43.setMagicBuff(5);
            gameItem43.setRangeBuff(0);
            gameItem43.setDescription('A staff wielded by wise wizards.');
            gameItem43.setUsable(false);
            itemMap.set(gameItem43.getName(), gameItem43);

            let gameItem44 = new GameItem('Compound Bow', 'assets/images/sprites/bow_7.png');
            gameItem44.setAttackBuff(0);
            gameItem44.setDefenceBuff(0);
            gameItem44.setCoins(16);
            gameItem44.setHealth(0);
            gameItem44.setMagicBuff(0);
            gameItem44.setRangeBuff(5);
            gameItem44.setDescription('A powerful compound bow.');
            gameItem44.setUsable(false);
            itemMap.set(gameItem44.getName(), gameItem44);

            let gameItem45 = new GameItem('Mana Ring', 'assets/images/sprites/ring_1.png');
            gameItem45.setAttackBuff(0);
            gameItem45.setDefenceBuff(1);
            gameItem45.setCoins(30);
            gameItem45.setHealth(2);
            gameItem45.setMagicBuff(2);
            gameItem45.setRangeBuff(0);
            gameItem45.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
            gameItem45.setUsable(true);
            itemMap.set(gameItem45.getName(), gameItem45);

            let gameItem46 = new GameItem('Ring of Fire', 'assets/images/sprites/ring_2.png');
            gameItem46.setAttackBuff(1);
            gameItem46.setDefenceBuff(0);
            gameItem46.setCoins(32);
            gameItem46.setHealth(0);
            gameItem46.setMagicBuff(1);
            gameItem46.setRangeBuff(2);
            gameItem46.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
            gameItem46.setUsable(true);
            itemMap.set(gameItem46.getName(), gameItem46);

            let gameItem47 = new GameItem('Ring of Life', 'assets/images/sprites/ring_3.png');
            gameItem47.setAttackBuff(0);
            gameItem47.setDefenceBuff(1);
            gameItem47.setCoins(40);
            gameItem47.setHealth(8);
            gameItem47.setMagicBuff(0);
            gameItem47.setRangeBuff(0);
            gameItem47.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
            gameItem47.setUsable(true);
            itemMap.set(gameItem47.getName(), gameItem47);

            let gameItem48 = new GameItem('Dragon Bow', 'assets/images/sprites/bow_8.png');
            gameItem48.setAttackBuff(0);
            gameItem48.setDefenceBuff(0);
            gameItem48.setCoins(25);
            gameItem48.setHealth(0);
            gameItem48.setMagicBuff(0);
            gameItem48.setRangeBuff(8);
            gameItem48.setUsable(false);
            gameItem48.setDescription('A rare bow designed for the hunting of dragons.');
            itemMap.set(gameItem48.getName(), gameItem48);

            let gameItem49 = new GameItem('Burning Ring', 'assets/images/sprites/ring_4.png');
            gameItem49.setAttackBuff(0);
            gameItem49.setDefenceBuff(1);
            gameItem49.setCoins(45);
            gameItem49.setHealth(12);
            gameItem49.setMagicBuff(0);
            gameItem49.setRangeBuff(0);
            gameItem49.setUsable(true);
            gameItem49.setDescription('An ornate, uncommon magic ring. Inscription says it disintegrates upon use.');
            itemMap.set(gameItem49.getName(), gameItem49);

            let gameItem50 = new GameItem('King\'s Reward Scroll', 'assets/images/sprites/scroll_5.png');
            gameItem50.setAttackBuff(0);
            gameItem50.setDefenceBuff(0);
            gameItem50.setCoins(0);
            gameItem50.setHealth(0);
            gameItem50.setMagicBuff(0);
            gameItem50.setRangeBuff(0);
            gameItem50.setUsable(false);
            gameItem50.setDescription('Brave adventurer, thank you for slaying the Dragon threatening the City of Tyhr. Here is a kingly reward for your efforts.');
            itemMap.set(gameItem50.getName(), gameItem50);

            let gameItem51 = new GameItem('Attack Potion', 'assets/images/sprites/potion_7.png');
            gameItem51.setAttackBuff(8);
            gameItem51.setDefenceBuff(0);
            gameItem51.setCoins(7);
            gameItem51.setHealth(0);
            gameItem51.setMagicBuff(0);
            gameItem51.setRangeBuff(0);
            gameItem51.setDescription('An attack potion.');
            gameItem51.setUsable(true);
            itemMap.set(gameItem51.getName(), gameItem51);

            let gameItem52 = new GameItem('Ring of Bounty', 'assets/images/sprites/ring_5.png');
            gameItem52.setAttackBuff(0);
            gameItem52.setDefenceBuff(0);
            gameItem52.setCoins(20);
            gameItem52.setHealth(0);
            gameItem52.setMagicBuff(0);
            gameItem52.setRangeBuff(0);
            gameItem52.setDescription('A magic ring which creates food.');
            gameItem52.setUsable(true);
            gameItem52.setUseFunction((soundObj) => {
                const meat = itemMap.get('Meat');
                for (let i = 0; i < 3; ++i) {
                    if (player.canAddItem() === true) {
                        player.addItem(meat);
                    }
                }

                const soundHelper = soundObj.helper;
                const audioListener = soundObj.listener;
                const audioLoader = soundObj.loader;
                const soundMap = soundObj.map;

                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'bounty');

                return true;
            });
            itemMap.set(gameItem52.getName(), gameItem52);

            let gameItem53 = new GameItem('Iron Platebody', 'assets/images/sprites/platebody_1.png');
            gameItem53.setAttackBuff(0);
            gameItem53.setDefenceBuff(0);
            gameItem53.setCoins(17);
            gameItem53.setHealth(0);
            gameItem53.setMagicBuff(0);
            gameItem53.setRangeBuff(0);
            gameItem53.setDescription('A sturdy iron platebody.');
            gameItem53.setUsable(false);
            gameItem53.setArmorBonus(4);
            itemMap.set(gameItem53.getName(), gameItem53);

            let gameItem54 = new GameItem('Iron Chainmail', 'assets/images/sprites/mail_1.png');
            gameItem54.setAttackBuff(0);
            gameItem54.setDefenceBuff(0);
            gameItem54.setCoins(14);
            gameItem54.setHealth(0);
            gameItem54.setMagicBuff(0);
            gameItem54.setRangeBuff(0);
            gameItem54.setDescription('An iron chainbody made of many rings.');
            gameItem54.setUsable(false);
            gameItem54.setArmorBonus(2);
            itemMap.set(gameItem54.getName(), gameItem54);

            let gameItem55 = new GameItem('Leather Body', 'assets/images/sprites/platebody_2.png');
            gameItem55.setAttackBuff(0);
            gameItem55.setDefenceBuff(0);
            gameItem55.setCoins(12);
            gameItem55.setHealth(0);
            gameItem55.setMagicBuff(0);
            gameItem55.setRangeBuff(0);
            gameItem55.setDescription('A defensive leather body. Helps protect against magic.');
            gameItem55.setUsable(false);
            gameItem55.setArmorBonus(2);
            itemMap.set(gameItem55.getName(), gameItem55);

            let gameItem56 = new GameItem('Gambeson Breastplate', 'assets/images/sprites/gambeson_1.png');
            gameItem56.setAttackBuff(0);
            gameItem56.setDefenceBuff(0);
            gameItem56.setCoins(19);
            gameItem56.setHealth(0);
            gameItem56.setMagicBuff(0);
            gameItem56.setRangeBuff(0);
            gameItem56.setDescription('An iron breastplate gambeson.');
            gameItem56.setUsable(false);
            gameItem56.setArmorBonus(2);
            itemMap.set(gameItem56.getName(), gameItem56);

            let gameItem57 = new GameItem('Chicken', 'assets/images/sprites/meat_3.png');
            gameItem57.setAttackBuff(0);
            gameItem57.setDefenceBuff(0);
            gameItem57.setCoins(3);
            gameItem57.setHealth(5);
            gameItem57.setMagicBuff(0);
            gameItem57.setRangeBuff(0);
            gameItem57.setDescription('Some chicken.');
            gameItem57.setUsable(true);
            itemMap.set(gameItem57.getName(), gameItem57);

            let gameItem58 = new GameItem('Round Shield', 'assets/images/sprites/shield_1.png');
            gameItem58.setAttackBuff(0);
            gameItem58.setDefenceBuff(0);
            gameItem58.setCoins(15);
            gameItem58.setHealth(0);
            gameItem58.setMagicBuff(0);
            gameItem58.setRangeBuff(0);
            gameItem58.setDescription('A small defensive round shield.');
            gameItem58.setUsable(false);
            gameItem58.setArmorBonus(2);
            itemMap.set(gameItem58.getName(), gameItem58);

            let gameItem59 = new GameItem('Kite Shield', 'assets/images/sprites/shield_2.png');
            gameItem59.setAttackBuff(0);
            gameItem59.setDefenceBuff(0);
            gameItem59.setCoins(16);
            gameItem59.setHealth(0);
            gameItem59.setMagicBuff(0);
            gameItem59.setRangeBuff(0);
            gameItem59.setDescription('A large defensive kite shield.');
            gameItem59.setUsable(false);
            gameItem59.setArmorBonus(2);
            itemMap.set(gameItem59.getName(), gameItem59);

            let gameItem60 = new GameItem('Great Shield', 'assets/images/sprites/shield_3.png');
            gameItem60.setAttackBuff(0);
            gameItem60.setDefenceBuff(0);
            gameItem60.setCoins(24);
            gameItem60.setHealth(0);
            gameItem60.setMagicBuff(0);
            gameItem60.setRangeBuff(0);
            gameItem60.setDescription('A large defensive great shield.');
            gameItem60.setUsable(false);
            gameItem60.setArmorBonus(4);
            itemMap.set(gameItem60.getName(), gameItem60);
        }
    }

    class CombatHelper {
        constructor() {
            this.splatTimeout;
            this.kingDragonDefeated = false;
        }

        getKingDragonDefeated() {
            return this.kingDragonDefeated;
        }

        showLoot(encounterHelper, lootInventory, dialogHelper, player, soundHelper, audioListener, audioLoader, soundMap) {
            const lootEle = document.getElementById('lootContainer');
            const lootItemsEle = document.getElementById('loot');

            while (lootItemsEle.firstChild) {
                lootItemsEle.removeChild(lootItemsEle.lastChild);
            }

            if (lootEle.hasAttribute('hidden') === true) {
                lootEle.removeAttribute('hidden');

                //let oneVh = Math.round(window.innerHeight / 100);
                //let oneVw = Math.round(window.innerWidth / 100);

                /*
                lootEle.style.marginLeft = (15 * oneVw) + 'px';
                lootEle.style.marginRight = (15 * oneVw) + 'px';
                lootEle.style.marginTop = (30 * oneVh) + 'px';
                lootEle.style.marginBottom = (30 * oneVh) + 'px';
                */
                let top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
                let left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
                lootEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
                lootEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
                lootEle.style.top = top + 'px';
                lootEle.style.left = left + 'px';

                encounterHelper.getMonster().getItems().forEach((item, index) => {
                    const parentItem = document.createElement('DIV');
                    parentItem.classList.add('tooltip-ex');

                    const ele = document.createElement('IMG');
                    ele.src = item.getImageSource();
                    ele.style.width = '64px';
                    ele.style.height = '64px';

                    parentItem.appendChild(ele);

                    const tooltip = document.createElement('SPAN');
                    tooltip.classList.add('tooltip-ex-text');
                    tooltip.classList.add('tooltip-ex-top');
                    tooltip.innerText = item.getName();
                    parentItem.appendChild(tooltip);

                    lootItemsEle.appendChild(parentItem);

                    parentItem.onclick = () => {
                        if (lootInventory.isTakeMode() === true) {
                            const itemAdded = player.addItem(item);

                            if (itemAdded === true) {
                                lootItemsEle.removeChild(parentItem);
                                encounterHelper.getMonster().removeItemAtIndex(index);

                                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'take');

                                if (lootItemsEle.children.length === 0) {
                                    closeButton.style.border = '3px outset rgba(255,255,255,1)';
                                    lootEle.setAttribute('hidden', true);

                                    while (lootItemsEle.lastElementChild) {
                                        lootItemsEle.removeChild(lootItemsEle.lastElementChild);
                                    }
                                }
                            }
                        } else {
                            dialogHelper.setCurrentText(item.getDescriptionLong());
                        }
                    };
                });

                const takeButton = document.getElementById('lootTakeBtn');
                const closeButton = document.getElementById('lootCloseBtn');
                const inspectButton = document.getElementById('lootInspectBtn');

                takeButton.style.border = '3px outset rgba(255,255,255,1)';

                takeButton.onclick = () => {
                    lootInventory.setTakeMode();

                    takeButton.style.border = '3px outset rgba(255,255,255,1)';
                    closeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                };

                inspectButton.onclick = () => {
                    lootInventory.setInspectMode();

                    takeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    closeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    inspectButton.style.border = '3px outset rgba(255,255,255,1)';
                };

                closeButton.onclick = () => {
                    closeButton.style.border = '3px outset rgba(255,255,255,1)';
                    lootEle.setAttribute('hidden', true);

                    while (lootItemsEle.lastElementChild) {
                        lootItemsEle.removeChild(lootItemsEle.lastElementChild);
                    }
                };
            } else {
                lootEle.setAttribute('hidden', true);

                while (lootItemsEle.lastElementChild) {
                    lootItemsEle.removeChild(lootItemsEle.lastElementChild);
                }
            }
        }

        attackMelee(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                const playerAttack = player.getMeleeAttackDamage();
                return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                    soundHelper, audioListener, audioLoader, soundMap, itemMap);
            }

            return true;
        }

        attackMage(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                const playerAttack = player.getMageAttackDamage();
                return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                    soundHelper, audioListener, audioLoader, soundMap, itemMap);
            }

            return true;
        }

        attackRange(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                const playerAttack = player.getRangeAttackDamage();
                return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                    soundHelper, audioListener, audioLoader, soundMap, itemMap);
            }

            return true;
        }

        attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
            let running = true;

            const monster = encounterHelper.getMonster();

            const monsterAttack = monster.getAttackDamage(player.getDefence(), player.getDefenceMax());
            let monsterDebuff = monster.getAttackDebuff(player.getDefence(), player.getDefenceMax());

            const maxArmorItem = player.getMaxArmorBonus();
            let armorBonus = 0;
            if (maxArmorItem.getArmorBonus) {
                armorBonus = maxArmorItem.getArmorBonus();
            }
            armorBonus /= 2;
            monsterDebuff -= armorBonus;

            const playerSplat = document.getElementById('playerAttackSplat');
            const monsterSplat = document.getElementById('monsterAttackSplat');
            const playerDamage = document.getElementById('playerAttackDamage');
            const monsterDamage = document.getElementById('monsterAttackDamage');

            document.getElementById('playerDebuffSplat');
            const monsterSplatDebuffEle = document.getElementById('monsterDebuffSplat');
            document.getElementById('monsterAttackDebuff');
            const monsterDebuffEle = document.getElementById('monsterAttackDebuff');

            playerDamage.innerText = playerAttack;
            monsterDamage.innerText = 'Self: ' + monsterAttack;
            monsterDebuffEle.innerText = 'Self: ' + monsterDebuff;

            let newHealth = player.getHealth() - monsterAttack;
            if (newHealth < 0) {
                newHealth = 0;
            }
            player.setHealth(newHealth);
            monster.setHealth(monster.getHealth() - playerAttack);

            let oneVw = Math.round(window.innerWidth / 100);
            const imgSplatEles = document.querySelectorAll('.img-splat');
            for (let i = 0; i < imgSplatEles.length; ++i) {
                imgSplatEles[i].style.maxWidth = (oneVw * 30) + 'px';
                imgSplatEles[i].style.maxHeight = (oneVw * 30) + 'px';
            }

            const splatContainer = document.querySelectorAll('.div-attack-splat-container');
            splatContainer[0].style.width = window.innerWidth + 'px';
            splatContainer[0].style.height = window.innerHeight + 'px';

            playerSplat.removeAttribute('hidden');
            monsterSplat.removeAttribute('hidden');
            playerDamage.removeAttribute('hidden');
            monsterDamage.removeAttribute('hidden');

            if (monsterDebuff > 0) {
                monsterSplatDebuffEle.removeAttribute('hidden');
                monsterDebuffEle.removeAttribute('hidden');

                player.applyDebuff(monsterDebuff);
            }

            if (monster.getHealth() <= 0) {
                if (map[encounterHelper.getY()][encounterHelper.getX()] === -5) {
                    this.kingDragonDefeated = true;
                    player.setCoins(player.getCoins() + 200);
                    const kingScroll = itemMap.get('King\'s Reward Scroll');
                    if (player.canAddItem() === true) {
                        player.addItem(kingScroll);
                    }
                }

                map[encounterHelper.getY()][encounterHelper.getX()] = 1;

                const name = String(encounterHelper.getY()) + String(encounterHelper.getX()) + '_monster';
                const selectedObject = scene.getObjectByName(name);
                scene.remove(selectedObject);

                encounterHelper.setHasEncounter(false);
                encounterHelper.removeHealthBar();

                this.showLoot(encounterHelper, lootInventory, dialogHelper, player, soundHelper, audioListener, audioLoader, soundMap);

                miniMap.drawAt(encounterHelper.getX(), encounterHelper.getY(), 'rgb(230, 230, 230)');
            }

            if (player.getHealth() <= 0) {
                running = false;
            }

            if (this.splatTimeout) {
                clearTimeout(this.splatTimeout);
            }

            this.splatTimeout = setTimeout(() => {
                playerSplat.setAttribute('hidden', true);
                monsterSplat.setAttribute('hidden', true);
                playerDamage.setAttribute('hidden', true);
                monsterDamage.setAttribute('hidden', true);

                monsterSplatDebuffEle.setAttribute('hidden', true);
                monsterDebuffEle.setAttribute('hidden', true);
            }, 2200);

            encounterHelper.fillHealthBar();

            return running;
        }
    }

    class SaveHelper {
        constructor() {
            this.lastSaveTime = new Date();
        }

        restore(camera, player, cameraHelper, questHelper) {
            const saveStr = localStorage.getItem('save');
            const saveObj = JSON.parse(saveStr);
            const pos = saveObj.position;
            const lastPositionSaved = saveObj.lastPosition;

            camera.position.set(pos.x, pos.y, pos.z);
            camera.rotation.y = pos.rotation;

            cameraHelper.origin.position.x = pos.x;
            cameraHelper.origin.position.y = pos.y;
            cameraHelper.origin.position.z = pos.z;
            cameraHelper.origin.position.mapX = lastPositionSaved.x;
            cameraHelper.origin.position.mapY = lastPositionSaved.y;
            cameraHelper.origin.position.mapZ = lastPositionSaved.z;

            player.fromJsonObject(saveObj.playerData);

            questHelper.restoreFromJson(saveObj.questData);

            return { pos: lastPositionSaved, level: saveObj.currentLevel, direction: saveObj.currDirection };
        }

        save(level, player, camera, lastPosition, currDirection, questHelper) {
            const currTime = new Date();
            let timeDiff = currTime - this.lastSaveTime;
            timeDiff /= 1000;

            if (timeDiff > 2) {
                const pos = {
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z,
                    rotation: camera.rotation.y
                };

                const playerJson = player.toJsonObject();

                const saveObj = {
                    position: pos,
                    playerData: playerJson,
                    currentLevel: level,
                    lastPosition: lastPosition,
                    currDirection: currDirection,
                    questData: questHelper.getQuestJson()
                };

                localStorage.setItem('save', JSON.stringify(saveObj));
            }
        }
    }

    class QuestHelper {
        constructor() {
            this.questData = [
                {
                    level: 1,
                    person: 105,
                    started: false,
                    initialIndex: 3,
                    name: 'Guardian Angel',
                    index: 3,
                    levelAssigner: (player, level, person) => {
                        const items = player.getItems();

                        const matchByLevel = this.questData.filter(quest => quest.level === level);
                        const matchByPerson = matchByLevel.filter(quest => quest.person === person);
                        if (matchByPerson && matchByPerson.length > 0 && matchByPerson[0].index === 4) {
                            return -1;
                        }

                        for (let i = 0; i < items.length; ++i) {
                            if (items[i].getName() === 'Cough Remedy') {
                                return 4;
                            }
                        }

                        return -1;
                    }
                },
                {
                    level: 3,
                    person: 100,
                    started: false,
                    initialIndex: 1,
                    name: 'Orc Hunter',
                    index: 1,
                    levelAssigner: (player, level, person) => {
                        const items = player.getItems();

                        const matchByLevel = this.questData.filter(quest => quest.level === level);
                        const matchByPerson = matchByLevel.filter(quest => quest.person === person);
                        if (matchByPerson && matchByPerson.length > 0 && matchByPerson[0].index === 2) {
                            return -1;
                        }

                        for (let i = 0; i < items.length; ++i) {
                            if (items[i].getName() === 'Axagon Mace') {
                                return 2;
                            }
                        }

                        return -1;
                    }
                }
            ];
        }

        getQuestJson() {
            let questJson = [];

            this.questData.forEach(quest => {
                const questObj = { started: quest.started, index: quest.index };

                questJson.push(questObj);
            });

            return questJson;
        }

        restoreFromJson(json) {
            if (!json) {
                return;
            }

            json.forEach((questObj, index) => {
                this.questData[index].started = questObj.started;
                this.questData[index].index = questObj.index;
            });
        }

        startQuest(level, person) {
            const questsForLevel = this.questData.filter(questObj => questObj.level === level);

            let retQuest = null;

            questsForLevel.forEach(quest => {
                if (quest.person === person) {
                    quest.started = true;
                    retQuest = quest;
                }
            });

            return retQuest;
        }

        resetQuestPrompts(personMap, level) {
            const levelObject = personMap.get(level);

            const questsForLevel = this.questData.filter(questObj => questObj.level === level);

            if (levelObject) {
                for (const [key, value] of Object.entries(levelObject)) {
                    questsForLevel.forEach(quest => {
                        if (quest.person === Number(key)) {
                            if (quest.started === false) {
                                levelObject['dialog'][key] = quest.initialIndex;
                            }
                        }
                    });
                }
            }
        }

        incrementQuestIndex(personMap, level) {
            const levelObject = personMap.get(level);

            const questsForLevel = this.questData.filter(questObj => questObj.level === level);

            if (levelObject) {
                for (const [key, value] of Object.entries(levelObject)) {
                    questsForLevel.forEach(quest => {
                        if (quest.person === Number(key)) {
                            quest.index++;
                        }
                    });
                }
            }
        }

        checkQuestPrompt(personMap, level, player) {
            const levelObject = personMap.get(level);

            const questsForLevel = this.questData.filter(questObj => questObj.level === level);

            if (levelObject) {
                for (const [key, value] of Object.entries(levelObject)) {
                    questsForLevel.forEach(quest => {
                        if (quest.person === Number(key)) {
                            if (quest.started === true) {
                                const nextIndex = quest.levelAssigner(player, level, Number(key));
                                if (nextIndex !== -1) {
                                    levelObject['dialog'][key] = nextIndex;
                                }
                            }
                        }
                    });
                }
            }
        }
    }

    (function () {
        var width = window.innerWidth * 1.0;
        var height = window.innerHeight * 0.91;

        var renderer, camera, scene;

        var input, miniMap, levelHelper, cameraHelper, player, dialogHelper, playerInventory, encounterHelper, lootInventory, soundHelper, textureHelper, itemHelper, combatHelper,
            saveHelper, questHelper;

        var audioLoader, firstStepInLevel = true, soundGlobal, audioListener;

        let hasNotice = true;

        let resizeTimeout = null;

        let removedItemSet = [];

        const backgroundSoundMap = new Map([
            [1, 'assets/sound/town_theme.mp3'],
            [2, 'assets/sound/forest_theme.mp3'],
            [3, 'assets/sound/axagon_theme.mp3'],
            [4, 'assets/sound/dungeon_theme.mp3'],
            [5, 'assets/sound/town_theme.mp3'],
            [6, 'assets/sound/dungeon_theme.mp3'],
            [7, 'assets/sound/forest_theme.mp3'],
            [8, 'assets/sound/battle_theme.mp3'],
            [9, 'assets/sound/tyhr_theme.mp3'],
            [10, 'assets/sound/tavern_theme.mp3']
        ]);
        const soundMap = new Map([
            ['coin', 'assets/sound/handleCoins.ogg'],
            ['metal-click', 'assets/sound/metalClick.ogg'],
            ['leather', 'assets/sound/handleSmallLeather2.ogg'],
            ['drop', 'assets/sound/cloth2.ogg'],
            ['take', 'assets/sound/handleSmallLeather.ogg'],
            ['attack_melee', 'assets/sound/knifeSlice.ogg'],
            ['attack_mage', 'assets/sound/magicSmite.wav'],
            ['attack_range', 'assets/sound/shootBow.ogg'],
            ['bounty', 'assets/sound/sound_bounty.ogg'],
            ['demon_encounter', 'assets/sound/demon_encounter.mp3'],
            ['orc_encounter', 'assets/sound/orc_encounter.wav'],
            ['rat_encounter', 'assets/sound/rat_encounter.ogg'],
            ['reaper_encounter', 'assets/sound/reaper_encounter.mp3'],
            ['dragon_small_encounter', 'assets/sound/dragon_small_encounter.wav'],
            ['dragon_encounter', 'assets/sound/dragon_encounter.wav'],
            ['wizard_encounter', 'assets/sound/wizard_encounter.mp3']
        ]);

        let level;
        let previousLevel;
        let isTutorial;

        var map = new Array();
        var running = true;

        const levelFloorMap = new Map([
            [1, 7],
            [2, 5],
            [3, 6],
            [4, 1],
            [5, 4],
            [6, 3],
            [7, 2],
            [8, 7],
            [9, 1],
            [10, 6]
        ]);
        const levelSkyMap = new Map([
            [1, 2],
            [2, 5],
            [3, 4],
            [4, 1],
            [5, 2],
            [6, 6],
            [7, 4],
            [8, 5],
            [9, 2],
            [10, 1]
        ]);
        const levelAttributeMap = new Map([
            [2, {
                rain: true,
            }],
            [3, {
                rain: true
            }],
            [5, {
                fairy: true
            }]
        ]);
        const welcomeMap = new Map([
            [1, 'Welcome to the City of Freiya'],
            [2, 'Freiyan Forest'],
            [3, 'Welcome to the City of Axagon'],
            [4, 'Axagon Dungeon'],
            [5, 'Windswept Fairy Valley'],
            [6, 'Colossal Forgotten Ruins'],
            [7, 'Muck Forest'],
            [8, 'Tyhrann Dungeon'],
            [9, 'Welcome to the City of Tyhr'],
            [10, 'Welcome to the Tyhrann Tavern']
        ]);
        const lightingMap = new Map([
            [1, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)],
            [5, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)],
            [9, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)]
        ]);
        const floorMap = new Map();
        const skyMap = new Map();
        const wallMap = new Map();
        const monsterMap = new Map();
        const itemMap = new Map();
        let animatorList = [];
        let planeList = [];
        const engageMap = new Map([
            [9, {
                dialog: {
                    101: 0,
                    102: 0,
                    100: 0,
                    104: 0,
                    105: 0,
                    108: 0
                },
                101: [
                    {
                        question: 'Brave adventurer, will you help our city and slay the Dragon?',
                        okCallback: () => {

                        }
                    }
                ],
                108: [
                    {
                        question: 'Would you like to buy some chicken to eat? Only 6 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 6 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 6);
                                player.addItem(itemMap.get('Chicken'));

                                showOkDialog('You buy some chicken.');
                            } else if (player.getCoins() <= 5) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'I hope the city can soon return to normal, as it was before the darkness crept in.',
                        okCallback: () => {

                        }
                    }
                ],
                102: [
                    {
                        question: 'The King is looking for a brave adventurer to slay the Dragon. You look like you are up to the task.',
                        okCallback: () => {

                        }
                    }
                ],
                100: [
                    {
                        question: 'Orcs have been raiding villages and camping in the forests lately. The Sorcerer\'s doing, no doubt.',
                        okCallback: () => {

                        }
                    }
                ],
                104: [
                    {
                        question: 'The Sorcerer is said to be recruiting evil wizards to aid him in the takeover of our land.',
                        okCallback: () => {

                        }
                    }
                ],
                105: [
                    {
                        question: 'Would you like to buy some berries? Only 1 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 1 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 1);
                                player.addItem(itemMap.get('Huckleberries'));

                                showOkDialog('You buy some berries.');
                            } else if (player.getCoins() <= 0) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                ]
            }],
            [5, {
                dialog: {
                    106: 0,
                    105: 0
                },
                105: [
                    {
                        question: 'Would you like to buy a sandwich? Only 7 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 7 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 7);
                                player.addItem(itemMap.get('Sandwich'));

                                showOkDialog('You buy a sandwich.');
                            } else if (player.getCoins() <= 6) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a glass of beer? Only 2 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 2 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 2);
                                player.addItem(itemMap.get('Glass of Beer'));

                                showOkDialog('You buy a glass of beer.');
                            } else if (player.getCoins() <= 1) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a mug of beer? Only 5 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 5 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 5);
                                player.addItem(itemMap.get('Mug of Beer'));

                                showOkDialog('You bug a mug of beer.');
                            } else if (player.getCoins() <= 4) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                ],
                106: [
                    {
                        question: 'Would you like to buy a range potion? Only 12 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 12 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 12);
                                player.addItem(itemMap.get('Range Potion'));

                                showOkDialog('You buy a range potion.');
                            } else if (player.getCoins() <= 11) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a mage potion? Only 14 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 14 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 14);
                                player.addItem(itemMap.get('Mage Potion'));

                                showOkDialog('You buy a mage potion.');
                            } else if (player.getCoins() <= 13) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a potent restore potion? Only 35 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 35 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 35);
                                player.addItem(itemMap.get('Restore Potion'));

                                showOkDialog('You buy a restore potion.');
                            } else if (player.getCoins() <= 34) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy an attack potion? Only 10 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 10 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 10);
                                player.addItem(itemMap.get('Attack Potion'));

                                showOkDialog('You buy an attack potion.');
                            } else if (player.getCoins() <= 9) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a cough remedy? Only 10 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 10 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 10);
                                player.addItem(itemMap.get('Cough Remedy'));

                                showOkDialog('You buy a cough remedy.');
                            } else if (player.getCoins() <= 9) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ]
            }],
            [3, {
                dialogMax: {
                    100: 0
                },
                dialog: {
                    100: 0,
                    101: 0,
                    102: 0,
                    105: 0,
                    104: 0,
                    109: 0
                },
                100: [
                    {
                        question: 'Did you hear about the Dragon threatening the City of Tyhr?',
                        okCallback: () => {

                        }
                    },
                    {
                        question: 'I am looking for an Axagon Mace. I hear large orcs have stolen many from the Axagon armory. Perhaps you could procure one for me?',
                        yesCallback: () => {
                            const quest = questHelper.startQuest(level, 100);
                            if (quest) {
                                showOkDialog('Quest added: ' + quest.name);
                            }
                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'You\'ve found a mace! Would you please sell it to me so I can protect my farm?',
                        yesCallback: () => {
                            player.setCoins(player.getCoins() + 10);
                            showOkDialog('Thank you adventurer! Here is a small reward for your efforts.');
                            player.removeItemByName('Axagon Mace');
                            if (player.canAddItem() === true) {
                                player.addItem(itemMap.get('Burning Ring'));
                            }
                            questHelper.incrementQuestIndex(engageMap, level);
                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ],
                101: [
                    {
                        question: 'I hear the King of Tyhr is offering a great reward for defeat of the Dragon.',
                        okCallback: () => {

                        }
                    }
                ],
                102: [
                    {
                        question: 'I hear the Sorcerer allied with a lesser dragon in the colossal ruins. If nothing is done, soon no city nor village will be safe.',
                        okCallback: () => {

                        }
                    }
                ],
                105: [
                    {
                        question: 'Would you like to buy a health potion? Only 15 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 15 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 15);
                                player.addItem(itemMap.get('Health Potion'));

                                showOkDialog('You buy a health potion.');
                            } else if (player.getCoins() <= 14) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ],
                104: [
                    {
                        question: 'Would you like to buy a defence potion? Only 20 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 15 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 15);
                                player.addItem(itemMap.get('Defence Potion'));

                                showOkDialog('You buy a defence potion.');
                            } else if (player.getCoins() <= 14) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ],
                109: [
                    {
                        question: 'It is dangerous in the Axagon Dungeon. Would you like to buy a shield to help defend yourself?',
                        yesCallback: () => {
                            if (player.getCoins() >= 15 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 15);
                                player.addItem(itemMap.get('Round Shield'));

                                showOkDialog('You buy a round shield.');
                            } else if (player.getCoins() <= 14) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ],
            }],
            [2, {
                dialog: {
                    101: 0,
                },
                101: [
                    {
                        question: 'Would you like to buy some meat? Only 8 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 8 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 8);
                                player.addItem(itemMap.get('Meat'));

                                showOkDialog('You buy some meat.');
                            } else if (player.getCoins() <= 7) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ]
            }],
            [10, {
                dialog: {
                    100: 0,
                    101: 0,
                    102: 0,
                    104: 0,
                    105: 0
                },
                100: [
                    {
                        question: 'Would you like to buy a glass of beer? Only 2 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 2 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 2);
                                player.addItem(itemMap.get('Glass of Beer'));

                                showOkDialog('You buy a glass of beer.');
                            } else if (player.getCoins() <= 1) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy a mug of beer? Only 3 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 3 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 3);
                                player.addItem(itemMap.get('Mug of Beer'));

                                showOkDialog('You buy a mug of beer.');
                            } else if (player.getCoins() <= 2) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ],
                104: [
                    {
                        question: 'This is, by far, the best tavern in miles. Cheap beer!',
                        okCallback: () => {

                        }
                    },
                ],
                101: [
                    {
                        question: 'Hey mate! Will you buy me a glass of beer?',
                        yesCallback: () => {
                            if (player.getCoins() >= 3) {
                                player.setCoins(player.getCoins() - 3);

                                showOkDialog('You buy the man a glass of beer.');
                            } else if (player.getCoins() <= 2) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'I practice my fighting skills on giant rats. Easy to beat.',
                        okCallback: () => {

                        }
                    },
                ],
                102: [
                    {
                        question: 'I hear ogres have begun camping in Muck Forest. Travelers need to be wary.',
                        okCallback: () => {

                        }
                    },
                ],
                105: [
                    {
                        question: 'This music is great. Care for some dancing?',
                        okCallback: () => {

                        }
                    },
                ]
            }],
            [1,
                {
                    dialog: {
                        100: 0,
                        105: 3,
                        107: 0
                    },
                    dialogMax: {
                        105: 2
                    },
                    107: [
                        {
                            question: 'Greetings adventurer! Would you like to buy a fine gambeson?',
                            yesCallback: () => {
                                if (player.getCoins() > 20 && player.canAddItem() === true) {
                                    player.setCoins(player.getCoins() - 0);
                                    player.addItem(itemMap.get('Gambeson Breastplate'));

                                    showOkDialog('You buy a gambeson breastplate.');
                                } else if (player.getCoins() <= 19) {
                                    showOkDialog('Sorry. You don\'t have enough gold.');
                                } else if (player.canAddItem() === false) {
                                    showOkDialog('You are carrying too many things already.');
                                }

                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'Did you know? Different types of armor can protect you against magical debuffs.',
                            okCallback: () => {

                            }
                        }
                    ],
                    100: [
                        {
                            question: 'Would you like to buy some cheese? Only 2 gold.',
                            yesCallback: () => {
                                if (player.getCoins() > 2 && player.canAddItem() === true) {
                                    player.setCoins(player.getCoins() - 2);
                                    player.addItem(itemMap.get('Cheese'));

                                    showOkDialog('You buy some cheese.');
                                } else if (player.getCoins() <= 1) {
                                    showOkDialog('Sorry. You don\'t have enough gold.');
                                } else if (player.canAddItem() === false) {
                                    showOkDialog('You are carrying too many things already.');
                                }

                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'Would you like to buy some fancy cheese? Only 5 gold.',
                            yesCallback: () => {
                                if (player.getCoins() >= 5 && player.canAddItem() === true) {
                                    player.setCoins(player.getCoins() - 5);
                                    player.addItem(itemMap.get('Fancy Cheese'));

                                    showOkDialog('You buy some fancy cheese.');
                                } else if (player.getCoins() <= 4) {
                                    showOkDialog('Sorry. You don\'t have enough gold.');
                                } else if (player.canAddItem() === false) {
                                    showOkDialog('You are carrying too many things already.');
                                }

                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'I hear there is a witch in the magic valley that sells potions to cure all types of ailments.',
                            okCallback: () => {

                            }
                        }
                    ],
                    105: [
                        {
                            question: 'Would you like to buy some cheese? Only 2 gold.',
                            yesCallback: () => {
                                if (player.getCoins() >= 2 && player.canAddItem() === true) {
                                    player.setCoins(player.getCoins() - 2);
                                    player.addItem(itemMap.get('Cheese'));

                                    showOkDialog('You buy some cheese.');
                                } else if (player.getCoins() <= 1) {
                                    showOkDialog('Sorry. You don\'t have enough gold.');
                                } else if (player.canAddItem() === false) {
                                    showOkDialog('You are carrying too many things already.');
                                }

                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'Would you like to buy some fancy cheese? Only 5 gold.',
                            yesCallback: () => {
                                if (player.getCoins() >= 5 && player.canAddItem() === true) {
                                    player.setCoins(player.getCoins() - 5);
                                    player.addItem(itemMap.get('Fancy Cheese'));

                                    showOkDialog('You buy some fancy cheese.');
                                } else if (player.getCoins() <= 4) {
                                    showOkDialog('Sorry. You don\'t have enough gold.');
                                } else if (player.canAddItem() === false) {
                                    showOkDialog('You are carrying too many things already.');
                                }

                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'I hear there is a witch in the magic valley that sells potions to cure all types of ailments.',
                            okCallback: () => {

                            }
                        },
                        {
                            question: 'Brave adventurer! Would you please help me? My daughter is ill and requires a cough remedy. The remedy is not sold in Freiya. Perhaps you could' +
                                ' acquire one for me?',
                            yesCallback: () => {
                                const quest = questHelper.startQuest(level, 105);
                                if (quest) {
                                    showOkDialog('Quest added: ' + quest.name);
                                }
                                return true;
                            },
                            noCallback: () => {

                            }
                        },
                        {
                            question: 'The remedy! You\'ve brought one! Would you please give it to me so I can cure my daughter?',
                            yesCallback: () => {
                                player.setCoins(player.getCoins() + 25);
                                showOkDialog('Thank you adventurer! Here is a small reward for your efforts.');
                                player.removeItemByName('Cough Remedy');
                                questHelper.incrementQuestIndex(engageMap, level);
                                return true;
                            },
                            noCallback: () => {

                            }
                        }
                    ]
                }
            ]
        ]);

        let position = {
            x: 0,
            y: 0,
            z: 0
        };

        let requestedNewLevel;
        let lastPosition = null;
        let isFirstUpdate = true;
        let currDirection = 'N';

        let rainMasterObj = {
            rainGeo: null,
            rainCount: 15000,
            rainMaterial: null,
            rain: null,
            flash: null,
            rangeX: 0,
            rangeZ: 0,
            midX: 0,
            midZ: 0
        };

        let fairyMasterObj = {
            fairyGeo: null,
            fairyCount: 10000,
            fairyMaterial: null,
            fairyScreen: null
        };

        const tutorial = {
            index: 0,
            messages: [
                'Use the arrow keys on the keyboard or click on the arrow buttons to move. Green indicates your location.',
                'Use the combat icons to attack enemies standing in front of you.',
                'The bonuses button will show you how effective each attack style will be. Lower levels yields lower damage.',
                'Signs tell you where you may travel to when you stand in front of them. Navy blue indicates a travel tile.'
            ]
        };

        function initializeEngine() {
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            renderer.setSize(width, height);
            renderer.clear();

            scene = new THREE.Scene();
            // scene.fog = new THREE.Fog(0x777777, 25, 1000);

            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.y = 50;

            document.getElementById("canvasContainer").appendChild(renderer.domElement);

            input = new Oubliette.Input();
            levelHelper = new Oubliette.GameHelper.LevelHelper();
            cameraHelper = new Oubliette.GameHelper.CameraHelper(camera);

            window.addEventListener("resize", function () {
                updateCanvasPosition(true);
            });
        }

        function initializeScene(saveData) {
            planeList = [];

            scene.fog = new THREE.Fog(0x777777, 25, 1000);

            audioListener = new THREE.AudioListener();
            camera.add(audioListener);

            soundGlobal = new THREE.Audio(audioListener);

            audioLoader = new THREE.AudioLoader();

            miniMap = new Oubliette.Gui.MiniMap(map[0].length, map.length, "statusbarContainer");
            miniMap.create();

            var platformWidth = map[0].length * 100;
            var platformHeight = map.length * 100;

            textureHelper.setPlatformWidth(platformWidth);
            textureHelper.setPlatformHeight(platformHeight);

            floorMap.clear();
            textureHelper.buildFloorTextures(floorMap);

            skyMap.clear();
            textureHelper.buildSkyTextures(skyMap);

            const floorCode = levelFloorMap.get(level);
            let floorDataObj = null;

            switch (floorCode) {
                case 1: {
                    floorDataObj = floorMap.get('floor_1');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 2: {
                    floorDataObj = floorMap.get('dirt_1');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 3: {
                    floorDataObj = floorMap.get('dirt_2');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 4: {
                    floorDataObj = floorMap.get('grass_1');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 5: {
                    floorDataObj = floorMap.get('grass_2');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 6: {
                    floorDataObj = floorMap.get('stone_1');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                case 7: {
                    floorDataObj = floorMap.get('stone_2');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
                default: {
                    floorDataObj = floorMap.get('floor_1');
                    repeatTexture(floorDataObj.material.material.map, 2);

                    break;
                }
            }

            floorDataObj.material.position.set(-50, 1, -50);
            scene.add(floorDataObj.material);

            const skyCode = levelSkyMap.get(level);
            let skyDataObj = null;

            switch (skyCode) {
                case 1: {
                    skyDataObj = skyMap.get('roof_1');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                case 2: {
                    skyDataObj = skyMap.get('sky_1');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                case 3: {
                    skyDataObj = skyMap.get('sky_2');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                case 4: {
                    skyDataObj = skyMap.get('sky_3');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                case 5: {
                    skyDataObj = skyMap.get('sky_4');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                case 6: {
                    skyDataObj = skyMap.get('sky_5');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
                default: {
                    skyDataObj = skyMap.get('roof_1');
                    repeatTexture(skyDataObj.material.material.map, 16);

                    break;
                }
            }

            skyDataObj.material.position.set(-50, 200, -50);
            scene.add(skyDataObj.material);

            const size = {
                x: 100,
                y: 100,
                z: 100
            };

            // map gen
            let maxX = 0, maxZ = 0, minX = 0, minZ = 0;
            for (var y = 0, ly = map.length; y < ly; y++) {
                for (var x = 0, lx = map[x].length; x < lx; x++) {
                    position.x = -platformWidth / 2 + size.x * x;
                    position.y = 50;
                    position.z = -platformHeight / 2 + size.z * y;

                    maxX = Math.max(maxX, position.x);
                    maxZ = Math.max(maxZ, position.z);
                    minX = Math.min(minX, position.x);
                    minZ = Math.min(minZ, position.z);

                    if (x == 0 && y == 0) {
                        cameraHelper.origin.x = position.x;
                        cameraHelper.origin.y = position.y;
                        cameraHelper.origin.z = position.z;
                    }

                    let initialMapCode = map[y][x];
                    let secondaryMapCode = -1;
                    let tertiaryMapCode = 0;
                    if (typeof initialMapCode === 'string' && initialMapCode.startsWith('A') === false) {
                        secondaryMapCode = initialMapCode.substring(initialMapCode.indexOf('_') + 1, initialMapCode.length);

                        if (secondaryMapCode.includes('_') === true) {
                            tertiaryMapCode = secondaryMapCode.substring(secondaryMapCode.indexOf('_') + 1, secondaryMapCode.length);
                            tertiaryMapCode = Number(tertiaryMapCode);
                            secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('_'));
                        }

                        if (secondaryMapCode.includes('-') === true) {
                            secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('-'));
                        }

                        secondaryMapCode = Number(secondaryMapCode);
                        initialMapCode = Number(initialMapCode.substring(0, initialMapCode.indexOf('_')));
                    }

                    switch (initialMapCode) {
                        case 100: {
                            const wallObj = wallMap.get('man_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 101: {
                            const wallObj = wallMap.get('man_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 102: {
                            const wallObj = wallMap.get('man_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 104: {
                            const wallObj = wallMap.get('man_4');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 105: {
                            const wallObj = wallMap.get('woman_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 106: {
                            const wallObj = wallMap.get('woman_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 107: {
                            const wallObj = wallMap.get('man_5');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 108: {
                            const wallObj = wallMap.get('woman_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 109: {
                            const wallObj = wallMap.get('woman_4');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case -1: {
                            const monsterObj = monsterMap.get('skeleton_1');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -2: {
                            const monsterObj = monsterMap.get('orc_3');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -3: {
                            const monsterObj = monsterMap.get('orc_6');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -4: {
                            const monsterObj = monsterMap.get('dragon_4');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -5: {
                            const monsterObj = monsterMap.get('dragon_3');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -6: {
                            const monsterObj = monsterMap.get('wizard_2');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -7: {
                            const monsterObj = monsterMap.get('reaper_2');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -8: {
                            const monsterObj = monsterMap.get('ogre_1');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -9: {
                            const monsterObj = monsterMap.get('dragon_3');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -10: {
                            const monsterObj = monsterMap.get('demon_1');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -11: {
                            const monsterObj = monsterMap.get('orc_4');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case -12: {
                            const monsterObj = monsterMap.get('orc_5');
                            const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                            monster.position.set(position.x, position.y, position.z);
                            monster.name = String(y) + String(x) + '_monster';
                            scene.add(monster);
                            planeList.push(monster);

                            break;
                        }
                        case 2: {
                            const wallObj = wallMap.get('stone_6');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 3: {
                            const wallObj = wallMap.get('wood_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 4: {
                            const wallObj = wallMap.get('wood_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 5: {
                            const wallObj = wallMap.get('wood_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 6: {
                            const wallObj = wallMap.get('stone_5');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 7: {
                            const wallObj = wallMap.get('stone_4');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 8: {
                            const wallObj = wallMap.get('stone_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 9: {
                            const wallObj = wallMap.get('stone_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 10: {
                            const wallObj = wallMap.get('stone_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 11: {
                            const wallObj = wallMap.get('forest_8');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 12: {
                            const wallObj = wallMap.get('forest_7');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 13: {
                            const wallObj = wallMap.get('forest_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 14: {
                            const wallObj = wallMap.get('forest_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 15: {
                            const wallObj = wallMap.get('door_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 16: {
                            const wallObj = wallMap.get('brick_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 17: {
                            const wallObj = wallMap.get('bookcase_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 18: {
                            const wallObj = wallMap.get('ruins_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y, position.z);
                            scene.add(wall);

                            break;
                        }
                        case 19: {
                            const wallObj = wallMap.get('table_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            wall.position.set(position.x, position.y - 25, position.z);
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                    }

                    switch (secondaryMapCode) {
                        case 1: {
                            const wallObj = wallMap.get('bush_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y - 20, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y - 20, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 2: {
                            const wallObj = wallMap.get('bush_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y - 20, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y - 20, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 3: {
                            const wallObj = wallMap.get('bush_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y - 20, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y - 20, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 4: {
                            const wallObj = wallMap.get('sign_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y - 28, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y - 28, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 5: {
                            const wallObj = wallMap.get('sign_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y - 28, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y - 28, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 6: {
                            const wallObj = wallMap.get('tree_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 7: {
                            const wallObj = wallMap.get('tree_2');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 8: {
                            const wallObj = wallMap.get('tree_3');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 40, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 40, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 9: {
                            const wallObj = wallMap.get('tree_4');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 30, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 30, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 10: {
                            const wallObj = wallMap.get('tree_5');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 11: {
                            const wallObj = wallMap.get('torch_1');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                if (Math.abs(tertiaryMapCode) < 100) {
                                    wall.position.set(position.x, position.y, position.z + tertiaryMapCode);
                                } else {
                                    if (tertiaryMapCode > 100) {
                                        tertiaryMapCode -= 100;
                                    } else {
                                        tertiaryMapCode += 100;
                                    }

                                    wall.position.set(position.x + tertiaryMapCode, position.y, position.z);
                                }
                            } else {
                                wall.position.set(position.x, position.y, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 12: {
                            const wallObj = wallMap.get('tree_6');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 13: {
                            const wallObj = wallMap.get('tree_7');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 14: {
                            const wallObj = wallMap.get('tree_8');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 15: {
                            const wallObj = wallMap.get('tree_9');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                        case 16: {
                            const wallObj = wallMap.get('tree_10');
                            const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                            if (initialMapCode !== 1) {
                                wall.position.set(position.x, position.y + 50, position.z + 50);
                            } else {
                                wall.position.set(position.x, position.y + 50, position.z);
                            }
                            scene.add(wall);
                            planeList.push(wall);

                            break;
                        }
                    }

                    if (typeof map[y][x] === 'string' && map[y][x].startsWith('A_') === true) {
                        const wallObj = wallMap.get('teleport_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                    }

                    if (map[y][x] === 'D' && ((saveData === undefined || saveData === null) || isFirstUpdate === false)) {
                        camera.position.set(position.x, position.y, position.z);
                        cameraHelper.origin.position.x = position.x;
                        cameraHelper.origin.position.y = position.y;
                        cameraHelper.origin.position.z = position.z;
                        cameraHelper.origin.position.mapX = x;
                        cameraHelper.origin.position.mapY = y;
                        cameraHelper.origin.position.mapZ = 0;

                        lastPosition = {
                            x: x,
                            y: y,
                            z: 0
                        };
                    }

                    miniMap.draw(x, y, map[y][x]);
                }
            }

            var y = 0;
            for (var x = 0, lx = map[x].length; x < lx; x++) {
                position.x = -platformWidth / 2 + size.x * x;
                position.y = 150;
                position.z = -platformHeight / 2 + size.z * y;

                switch (skyCode) {
                    case 1: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('sky_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('sky_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('sky_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('sky_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('sky_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    default: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                }
            }

            y = map.length - 1;
            for (var x = 0, lx = map[x].length; x < lx; x++) {
                position.x = -platformWidth / 2 + size.x * x;
                position.y = 150;
                position.z = -platformHeight / 2 + size.z * y;

                switch (skyCode) {
                    case 1: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('sky_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('sky_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('sky_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('sky_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('sky_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    default: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                }
            }

            for (var y = 0, ly = map.length; y < ly; y++) {
                var x = 0;
                position.x = -platformWidth / 2 + size.x * x;
                position.y = 150;
                position.z = -platformHeight / 2 + size.z * y;

                switch (skyCode) {
                    case 1: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('sky_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('sky_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('sky_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('sky_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('sky_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    default: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                }
            }

            for (var y = 0, ly = map.length; y < ly; y++) {
                var x = map[0].length - 1;
                position.x = -platformWidth / 2 + size.x * x;
                position.y = 150;
                position.z = -platformHeight / 2 + size.z * y;

                switch (skyCode) {
                    case 1: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('sky_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('sky_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('sky_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('sky_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('sky_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    default: {
                        const wallObj = wallMap.get('roof_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                }
            }

            // Lights
            if (lightingMap.get(level)) {
                var directionalLight = lightingMap.get(level);
                directionalLight.position.set(1, 1, 0);
                scene.add(directionalLight);
            } else {
                var directionalLight = new THREE.HemisphereLight(0x192F3F, 0x28343A, 2);
                directionalLight.position.set(1, 1, 0);
                scene.add(directionalLight);
            }

            // Rain
            if (levelAttributeMap.get(level)) {
                const attribObj = levelAttributeMap.get(level);

                if (attribObj.rain === true) {
                    let midX = (Math.abs(maxX) + Math.abs(minX)) / 2;
                    let midZ = (Math.abs(maxZ) + Math.abs(minZ)) / 2;
                    let rangeX = (Math.abs(maxX) + Math.abs(minX));
                    let rangeZ = (Math.abs(maxZ) + Math.abs(minZ));

                    rainMasterObj.midX = midX;
                    rainMasterObj.midZ = midZ;
                    rainMasterObj.rangeX = rangeX;
                    rainMasterObj.rangeZ = rangeZ;

                    rainMasterObj.rainGeo = new THREE.Geometry();
                    for (let i = 0; i < rainMasterObj.rainCount; i++) {
                        let rainDrop = new THREE.Vector3(
                            Math.floor(Math.random() * rangeX) - midX,
                            Math.random() * (100 - 0) + 0,
                            Math.floor(Math.random() * rangeZ) - midZ,
                        );
                        rainDrop.velocity = {};
                        rainDrop.velocity = 0;
                        rainMasterObj.rainGeo.vertices.push(rainDrop);
                    }
                    rainMasterObj.rainMaterial = new THREE.PointsMaterial({
                        color: 0xaaaaaa,
                        size: 0.4,
                        transparent: true
                    });
                    rainMasterObj.rain = new THREE.Points(rainMasterObj.rainGeo, rainMasterObj.rainMaterial);
                    rainMasterObj.rain.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                    scene.add(rainMasterObj.rain);

                    rainMasterObj.flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
                    rainMasterObj.flash.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                    scene.add(rainMasterObj.flash);
                }
            }
            //

            // Fairy
            if (levelAttributeMap.get(level)) {
                const attribObj = levelAttributeMap.get(level);

                if (attribObj.fairy === true) {
                    let midX = (Math.abs(maxX) + Math.abs(minX)) / 2;
                    let midZ = (Math.abs(maxZ) + Math.abs(minZ)) / 2;
                    let rangeX = (Math.abs(maxX) + Math.abs(minX));
                    let rangeZ = (Math.abs(maxZ) + Math.abs(minZ));

                    fairyMasterObj.fairyGeo = new THREE.Geometry();
                    for (let i = 0; i < fairyMasterObj.fairyCount; i++) {
                        let fairySpot = new THREE.Vector3(
                            Math.floor(Math.random() * rangeX) - midX,
                            Math.random() * (100 - 0) + 0,
                            Math.floor(Math.random() * rangeZ) - midZ,
                        );
                        fairySpot.velocity = {};
                        fairySpot.velocity = 0;
                        fairyMasterObj.fairyGeo.vertices.push(fairySpot);
                    }
                    fairyMasterObj.fairyMaterial = new THREE.PointsMaterial({
                        color: 0xffffff,
                        size: 0.4,
                        transparent: true
                    });
                    fairyMasterObj.fairyScreen = new THREE.Points(fairyMasterObj.fairyGeo, fairyMasterObj.fairyMaterial);
                    fairyMasterObj.fairyScreen.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                    scene.add(fairyMasterObj.fairyScreen);
                }
            }
        }

        function showStats() {
            const statsEle = document.getElementById('statsContainer');
            const statsTextEle = document.getElementById('stats');

            if (statsEle.hasAttribute('hidden') === true) {
                hideInterfaces();

                statsEle.removeAttribute('hidden');

                //let oneVh = Math.round(window.innerHeight / 100);
                //let oneVw = Math.round(window.innerWidth / 100);

                /*
                statsEle.style.marginLeft = (25 * oneVw) + 'px';
                statsEle.style.marginRight = (25 * oneVw) + 'px';
                statsEle.style.marginTop = (30 * oneVh) + 'px';
                statsEle.style.marginBottom = (30 * oneVh) + 'px';
                */
                let top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
                let left = Math.round(((window.innerWidth / 2) / 2) - 19);
                statsEle.style.width = Math.round(window.innerWidth / 2) + 'px';
                statsEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
                statsEle.style.top = top + 'px';
                statsEle.style.left = left + 'px';

                const maxMeleeItem = player.getMaxMeleeItem();
                const maxMageItem = player.getMaxMageItem();
                const maxRangeItem = player.getMaxRangeItem();
                const maxArmorItem = player.getMaxArmorBonus();

                let meleeBonus = 0;
                if (maxMeleeItem.getAttackBuff) {
                    meleeBonus = maxMeleeItem.getAttackBuff();
                }

                let mageBonus = 0;
                if (maxMageItem.getMagicBuff) {
                    mageBonus = maxMageItem.getMagicBuff();
                }

                let rangeBonus = 0;
                if (maxRangeItem.getRangeBuff) {
                    rangeBonus = maxRangeItem.getRangeBuff();
                }

                let armorBonus = 0;
                if (maxArmorItem.getArmorBonus) {
                    armorBonus = maxArmorItem.getArmorBonus();
                }

                let bonusText = 'Combat setup:<br>Melee bonus: ' + meleeBonus + '<br>Melee item: ' + maxMeleeItem.name
                    + '<br>Range bonus: ' + rangeBonus + '<br>Range item: ' + maxRangeItem.name
                    + '<br>Mage bonus: ' + mageBonus + '<br>Mage item: ' + maxMageItem.name
                    + '<br>Armor bonus: ' + armorBonus + '<br>Armor item: ' + maxArmorItem.name;

                bonusText += '<br>' + player.getHealthStringLong()
                    + '<br>' + player.getAttackStringLong()
                    + '<br>' + player.getDefenceStringLong()
                    + '<br>' + player.getMagicPointsStringLong()
                    + '<br>' + player.getRangeStringLong();

                statsTextEle.innerHTML = bonusText;
            } else {
                statsEle.setAttribute('hidden', true);
            }
        }

        function showInventory() {
            removedItemSet = [];

            const invEle = document.getElementById('inventoryContainer');
            const invItemsEle = document.getElementById('inventory');

            if (invEle.hasAttribute('hidden') === true) {
                hideInterfaces();

                invEle.removeAttribute('hidden');

                //let oneVh = Math.round(window.innerHeight / 100);
                //let oneVw = Math.round(window.innerWidth / 100);

                /*
                invEle.style.marginLeft = (15 * oneVw) + 'px';
                invEle.style.marginRight = (15 * oneVw) + 'px';
                invEle.style.marginTop = (30 * oneVh) + 'px';
                invEle.style.marginBottom = (30 * oneVh) + 'px';
                */
                let top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
                let left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
                invEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
                invEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
                invEle.style.top = top + 'px';
                invEle.style.left = left + 'px';

                player.items.forEach((item, index) => {
                    const parentItem = document.createElement('DIV');
                    parentItem.classList.add('tooltip-ex');

                    const ele = document.createElement('IMG');
                    ele.src = item.getImageSource();
                    ele.style.width = '64px';
                    ele.style.height = '64px';

                    parentItem.appendChild(ele);

                    const tooltip = document.createElement('SPAN');
                    tooltip.classList.add('tooltip-ex-text');
                    tooltip.classList.add('tooltip-ex-top');
                    tooltip.innerText = item.getName();
                    parentItem.appendChild(tooltip);

                    invItemsEle.appendChild(parentItem);

                    parentItem.onclick = () => {
                        if (playerInventory.isUseMode() === true && item.getUsable() === true) {
                            const reloadInv = playerInventory.useItem(player, item, soundHelper, audioListener, audioLoader, soundMap, {
                                listener: audioListener,
                                loader: audioLoader,
                                map: soundMap,
                                helper: soundHelper
                            });
                            invItemsEle.removeChild(parentItem);

                            removedItemSet.forEach(removedIndex => {
                                if (removedIndex < index) {
                                    index--;
                                }
                            });

                            player.removeItem(index);
                            removedItemSet.push(index);
                            if (reloadInv) {
                                showInventory();
                                showInventory();
                            }
                        } else if (playerInventory.isInspectMode() === true) {
                            dialogHelper.setCurrentText(item.getDescriptionLong());
                        } else if (playerInventory.isDropMode() === true) {
                            invItemsEle.removeChild(parentItem);
                            player.removeItem(index);

                            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'drop');
                        }
                    };
                });

                const useButton = document.getElementById('inventoryUseBtn');
                const dropButton = document.getElementById('inventoryDropBtn');
                const inspectButton = document.getElementById('inventoryInspectBtn');

                useButton.onclick = () => {
                    playerInventory.setUseMode();

                    useButton.style.border = '3px outset rgba(255,255,255,1)';
                    dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                };
                dropButton.onclick = () => {
                    playerInventory.setDropMode();

                    dropButton.style.border = '3px outset rgba(255,255,255,1)';
                    useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                };
                inspectButton.onclick = () => {
                    playerInventory.setInspectMode();

                    inspectButton.style.border = '3px outset rgba(255,255,255,1)';
                    dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                };

                if (playerInventory.isUseMode() === true) {
                    useButton.style.border = '3px outset rgba(255,255,255,1)';
                    dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                } else {
                    dropButton.style.border = '3px outset rgba(255,255,255,1)';
                    useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                }
            } else {
                invEle.setAttribute('hidden', true);

                while (invItemsEle.lastElementChild) {
                    invItemsEle.removeChild(invItemsEle.lastElementChild);
                }
            }
        }

        function showConfirmDialog(yesCallback, noCallback, message) {
            dialogHelper.yesCallback = () => {
                const retainDialog = yesCallback();

                if (retainDialog !== true) {
                    const yesBtnEle = document.getElementById('dialogYesBtn');
                    yesBtnEle.setAttribute('hidden', true);
                    const noBtnEle = document.getElementById('dialogNoBtn');
                    noBtnEle.setAttribute('hidden', true);

                    const dialogContainerEle = document.getElementById('dialogContainer');
                    dialogContainerEle.setAttribute('hidden', true);
                }
            };
            dialogHelper.noCallback = () => {
                const retainDialog = noCallback();

                if (retainDialog !== true) {
                    const yesBtnEle = document.getElementById('dialogYesBtn');
                    yesBtnEle.setAttribute('hidden', true);
                    const noBtnEle = document.getElementById('dialogNoBtn');
                    noBtnEle.setAttribute('hidden', true);

                    const dialogContainerEle = document.getElementById('dialogContainer');
                    dialogContainerEle.setAttribute('hidden', true);
                }
            };

            const dialogEle = document.getElementById('dialogContainer');
            dialogEle.removeAttribute('hidden');

            //let oneVh = Math.round(window.innerHeight / 100);
            //let oneVw = Math.round(window.innerWidth / 100);

            /*
            dialogEle.style.marginLeft = (25 * oneVw) + 'px';
            dialogEle.style.marginRight = (25 * oneVw) + 'px';
            dialogEle.style.marginTop = (30 * oneVh) + 'px';
            dialogEle.style.marginBottom = (30 * oneVh) + 'px';
            */
            let top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
            let left = Math.round(((window.innerWidth / 2) / 2) - 19);
            dialogEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            dialogEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
            dialogEle.style.top = top + 'px';
            dialogEle.style.left = left + 'px';

            dialogHelper.updateLastPrintIndex();

            document.getElementById('dialog').innerHTML = message;
            dialogHelper.lastText = message;

            const yesBtnEle = document.getElementById('dialogYesBtn');
            yesBtnEle.onclick = dialogHelper.yesCallback;
            yesBtnEle.removeAttribute('hidden');
            const noBtnEle = document.getElementById('dialogNoBtn');
            noBtnEle.onclick = dialogHelper.noCallback;
            noBtnEle.removeAttribute('hidden');

            const okBtnEle = document.getElementById('dialogOkBtn');
            okBtnEle.setAttribute('hidden', true);
        }

        function showOkDialog(newDialogHtml, okCallback = null) {
            dialogHelper.okCallback = () => {
                let retainDialog = false;

                if (okCallback) {
                    retainDialog = okCallback();
                }

                if (retainDialog !== true) {
                    const okBtnEle = document.getElementById('dialogOkBtn');
                    okBtnEle.setAttribute('hidden', true);

                    const dialogContainerEle = document.getElementById('dialogContainer');
                    dialogContainerEle.setAttribute('hidden', true);

                    dialogHelper.lastText = dialogHelper.currentText;
                }
            };

            const dialogEle = document.getElementById('dialogContainer');
            dialogEle.removeAttribute('hidden');

            dialogHelper.updateLastPrintIndex();

            document.getElementById('dialog').innerHTML = newDialogHtml;
            // dialogHelper.lastText = newDialogHtml;
            const okBtnEle = document.getElementById('dialogOkBtn');
            okBtnEle.onclick = dialogHelper.okCallback;
            okBtnEle.removeAttribute('hidden');

            const yesBtnEle = document.getElementById('dialogYesBtn');
            yesBtnEle.setAttribute('hidden', true);
            const noBtnEle = document.getElementById('dialogNoBtn');
            noBtnEle.setAttribute('hidden', true);
        }

        function updateCanvasPosition(rebuildCamera = false) {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            resizeTimeout = setTimeout(() => {
                const statusbar = document.getElementById('statusbar');
                const dialog = document.getElementById('dialog');
                const welcome = document.getElementById('welcome');
                if (window.innerHeight < 480 || window.innerWidth < 540) {
                    statusbar.style.fontSize = '0.8rem';
                    dialog.style.fontSize = '0.7rem';
                    welcome.style.fontSize = '1.1rem';

                    if (window.innerWidth < 540) {
                        const controlItemList = document.querySelectorAll('.div-control-item');
                        for (let i = 0; i < controlItemList.length; ++i) {
                            controlItemList[i].classList.add('div-control-item-narrow');
                        }
                    }
                } else {
                    statusbar.style.fontSize = '1.2rem';
                    dialog.style.fontSize = '1.1rem';
                    welcome.style.fontSize = '2.2rem';

                    const controlItemList = document.querySelectorAll('.div-control-item');
                    for (let i = 0; i < controlItemList.length; ++i) {
                        controlItemList[i].classList.remove('div-control-item-narrow');
                    }
                }

                const statusBarEle = document.getElementById('statusbarContainer');
                const statusBarHeight = statusBarEle.offsetHeight;

                let oneVh = Math.round(window.innerHeight / 100);
                let oneVw = Math.round(window.innerWidth / 100);

                const listOfControls = document.querySelectorAll('.div-control-item');
                const proposedHeight = (9 * oneVh);
                let proposedWidth = (12.5 * oneVw);
                if (proposedWidth > proposedHeight) {
                    proposedWidth = proposedHeight;
                }
                for (let i = 0; i < listOfControls.length; ++i) {
                    listOfControls[i].style.height = proposedHeight + 'px';
                    listOfControls[i].style.width = proposedWidth + 'px';
                }

                const divControlContainerTop = document.querySelectorAll('.div-control-container-top');
                divControlContainerTop[0].style.bottom = ((9 * oneVh) + 6) + 'px';

                //
                const welcomeEle = document.getElementById('welcomeContainer');
                let top = Math.round(((window.innerHeight / 2) / 2) - 19);
                let left = Math.round(((window.innerWidth / 2) / 2) - 19);
                welcomeEle.style.width = Math.round(window.innerWidth / 2) + 'px';
                welcomeEle.style.height = Math.round(window.innerHeight / 2) + 'px';
                welcomeEle.style.top = top + 'px';
                welcomeEle.style.left = left + 'px';

                const dialogEle = document.getElementById('dialogContainer');
                top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
                left = Math.round(((window.innerWidth / 2) / 2) - 19);
                dialogEle.style.width = Math.round(window.innerWidth / 2) + 'px';
                dialogEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
                dialogEle.style.top = top + 'px';
                dialogEle.style.left = left + 'px';

                const statsEle = document.getElementById('statsContainer');
                top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
                left = Math.round(((window.innerWidth / 2) / 2) - 19);
                statsEle.style.width = Math.round(window.innerWidth / 2) + 'px';
                statsEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
                statsEle.style.top = top + 'px';
                statsEle.style.left = left + 'px';

                const invEle = document.getElementById('inventoryContainer');
                top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
                left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
                invEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
                invEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
                invEle.style.top = top + 'px';
                invEle.style.left = left + 'px';

                const lootEle = document.getElementById('lootContainer');
                /*
                lootEle.style.marginLeft = (15 * oneVw) + 'px';
                lootEle.style.marginRight = (15 * oneVw) + 'px';
                lootEle.style.marginTop = (30 * oneVh) + 'px';
                lootEle.style.marginBottom = (30 * oneVh) + 'px';
                */
                top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
                left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
                lootEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
                lootEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
                lootEle.style.top = top + 'px';
                lootEle.style.left = left + 'px';
                //

                const canvasHeight = window.innerHeight - (9 * oneVh) - statusBarHeight;
                const canvasEle = document.getElementById('canvasContainer');
                canvasEle.style.top = statusBarHeight + 'px';

                let newWidth = window.innerWidth * 1.0;
                renderer.setSize(newWidth, canvasHeight);

                if (rebuildCamera) {
                    const posClone = camera.position.clone();
                    const rotation = camera.rotation.y;
                    camera = new THREE.PerspectiveCamera(45, newWidth / canvasHeight, 1, 10000);
                    camera.position.set(posClone.x, posClone.y, posClone.z);
                    camera.add(audioListener);
                    camera.rotation.y = rotation;
                }
            
                // renderer.setSize(window.innerWidth, window.innerHeight);
                miniMap.updatePosition();

                encounterHelper.updateHealthBarPosition();
            }, 200);
        }

        function update() {
            if ((input.keys.up || input.keys.down || input.keys.left || input.keys.right || input.joykeys.hasInput) && firstStepInLevel) {
                firstStepInLevel = false;
                const soundFile = backgroundSoundMap.get(level);

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundGlobal.setBuffer(buffer);
                        soundGlobal.setLoop(true);
                        soundGlobal.setVolume(1);
                        soundGlobal.play();
                    });
                }
            }

            if (input.keys.up) {
                moveCamera("up");
                input.keys.up = false;
            } else if (input.keys.down) {
                moveCamera("down");
                input.keys.down = false;
            } else if (input.keys.left) {
                moveCamera("left");
                input.keys.left = false;
            } else if (input.keys.right) {
                moveCamera("right");
                input.keys.right = false;
            }

            var params = {
                rotation: 0.05,
                translation: 5
            };

            if (input.joykeys.up) {
                moveCamera("up", params);
                input.joykeys.up = false;
            } else if (input.joykeys.down) {
                moveCamera("down", params);
                input.joykeys.down = false;
            } else if (input.joykeys.left) {
                moveCamera("left", params);
                input.joykeys.left = false;
            } else if (input.joykeys.right) {
                moveCamera("right", params);
                input.joykeys.right = false;
            }

            if (input.joykeys.melee) {
                if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                    soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_melee');
                }
                running = combatHelper.attackMelee(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap);

                input.joykeys.melee = false;
            }
            if (input.joykeys.mage) {
                if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                    soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_mage');
                }
                running = combatHelper.attackMage(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap);

                input.joykeys.mage = false;
            }
            if (input.joykeys.range) {
                if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                    soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_range');
                }
                running = combatHelper.attackRange(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap);

                input.joykeys.range = false;
            }

            if (input.joykeys.inv) {
                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'leather');

                // hideInterfaces();
                showInventory();

                input.joykeys.inv = false;
            }

            if (input.joykeys.stats) {
                // hideInterfaces();
                showStats();

                input.joykeys.stats = false;
            }

            const currStatusBarHtml = player.lastStatusString;
            const newStatusBarHtml = player.getStatusString();
            if (currStatusBarHtml != newStatusBarHtml || isFirstUpdate) {
                document.getElementById('statusbar').innerHTML = newStatusBarHtml;
                // miniMap.updatePosition();

                updateCanvasPosition();
            }

            const currDialogHtml = dialogHelper.lastText;
            const newDialogHtml = dialogHelper.currentText;
            if (currDialogHtml != newDialogHtml || dialogHelper.getPrintIndex() !== dialogHelper.getLastPrintIndex()) {
                if (dialogHelper.isOkButton() === true) {
                    showOkDialog(newDialogHtml);
                }
            }

            isFirstUpdate = false;
        }

        function draw() {
            renderer.render(scene, camera);

            for (let i = 0; i < animatorList.length; ++i) {
                animatorList[i].animate();
            }

            planeList.forEach(plane => {
                plane.quaternion.copy(camera.quaternion);
            });

            if (levelAttributeMap.get(level)) {
                const attribObj = levelAttributeMap.get(level);

                if (attribObj.rain === true) {
                    rainMasterObj.rainGeo.vertices.forEach(p => {
                        p.velocity -= 0.1 + Math.random() * 0.1;
                        p.y += p.velocity;
                        if (p.y < 0) {
                            p.y = 100;
                            p.velocity = 0;
                        }
                    });
                    rainMasterObj.rainGeo.verticesNeedUpdate = true;
                    rainMasterObj.rain.rotation.y += 0.002;

                    if (Math.random() > 0.93 || rainMasterObj.flash.power > 50) {
                        if (rainMasterObj.flash.power < 50)
                            rainMasterObj.flash.position.set(
                                Math.floor(Math.random() * rainMasterObj.rangeX) - rainMasterObj.midX,
                                Math.random() * (100 - 0) + 0,
                                Math.floor(Math.random() * rainMasterObj.rangeZ) - rainMasterObj.midZ,
                            );
                        rainMasterObj.flash.power = 25 + Math.random() * 100;
                    }
                }
                else if (attribObj.fairy === true) {
                    fairyMasterObj.fairyGeo.verticesNeedUpdate = true;
                    fairyMasterObj.fairyScreen.rotation.y += 0.006;
                }
            }
        }

        function getMonster(code) {
            let monster = new Monster();

            switch (code) {
                case -1: {
                    // Rat
                    monster.setHealth(6);
                    monster.setMaxAttack(2);
                    monster.setMaxDebuff(1);

                    let items = [];
                    const cheese = itemMap.get('Cheese');
                    const coins = itemMap.get('Coins');
                    const book = itemMap.get('Priest\'s Book');
                    const healthPot = itemMap.get('Health Potion');
                    const longSword = itemMap.get('Long Sword');
                    const book2 = itemMap.get('Historical Volume');
                    const cheese2 = itemMap.get('Fancy Cheese');
                    const dagger = itemMap.get('Freiyan Dagger');
                    const berry = itemMap.get('Huckleberries');
                    const attackPot = itemMap.get('Attack Potion');
                    const bounty = itemMap.get('Ring of Bounty');
                    const leatherBody = itemMap.get('Leather Body');
                    coins.setCoins(3);
                    book.setRarity(0.7);
                    items.push(leatherBody);
                    items.push(bounty);
                    items.push(cheese);
                    items.push(cheese);
                    items.push(cheese);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(book);
                    items.push(healthPot);
                    items.push(longSword);
                    items.push(book2);
                    items.push(cheese2);
                    items.push(dagger);
                    items.push(berry);
                    items.push(attackPot);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('rat_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -2: {
                    // Orc 1
                    monster.setHealth(10);
                    monster.setMaxAttack(3);
                    monster.setMaxDebuff(2);

                    let items = [];
                    const beer = itemMap.get('Glass of Beer');
                    const liver = itemMap.get('Liver');
                    const coins = itemMap.get('Coins');
                    const defencePot = itemMap.get('Defence Potion');
                    const rangePot = itemMap.get('Range Potion');
                    const sandwich = itemMap.get('Sandwich');
                    const book = itemMap.get('Magic Tome');
                    const healthPot = itemMap.get('Health Potion');
                    const berry = itemMap.get('Huckleberries');
                    const attackPot = itemMap.get('Attack Potion');
                    const bounty = itemMap.get('Ring of Bounty');
                    const ironChain = itemMap.get('Iron Chainmail');
                    coins.setCoins(6);
                    items.push(ironChain);
                    items.push(bounty);
                    items.push(beer);
                    items.push(liver);
                    items.push(liver);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(defencePot);
                    items.push(rangePot);
                    items.push(sandwich);
                    items.push(sandwich);
                    items.push(book);
                    items.push(healthPot);
                    items.push(berry);
                    items.push(berry);
                    items.push(attackPot);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('orc_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -3: {
                    // Orc 2
                    monster.setHealth(12);
                    monster.setMaxAttack(4);
                    monster.setMaxDebuff(3);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const magePot = itemMap.get('Mage Potion');
                    const simpleBow = itemMap.get('Simple Bow');
                    const recurveBow = itemMap.get('Recurve Bow');
                    const freiyanSword = itemMap.get('Freiyan Sword');
                    const earthStaff = itemMap.get('Earth Staff');
                    const book = itemMap.get('Adventurer\'s Log');
                    const mace = itemMap.get('Axagon Mace');
                    const bounty = itemMap.get('Ring of Bounty');
                    const ironPlate = itemMap.get('Iron Platebody');
                    coins.setCoins(10);
                    items.push(ironPlate);
                    items.push(bounty);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(magePot);
                    items.push(simpleBow);
                    items.push(recurveBow);
                    items.push(freiyanSword);
                    items.push(earthStaff);
                    items.push(book);
                    items.push(mace);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('orc_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -4: {
                    // Dragon 1
                    monster.setHealth(50);
                    monster.setMaxAttack(8);
                    monster.setMaxDebuff(4);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const broadSword = itemMap.get('Broad Sword');
                    const darkStaff = itemMap.get('Dark Staff');
                    const axagonBow = itemMap.get('Axagon Bow');
                    const lightStaff = itemMap.get('Light Staff');
                    const book = itemMap.get('History of An\'tihl');
                    const ring2 = itemMap.get('Ring of Fire');
                    const ring3 = itemMap.get('Ring of Life');
                    const dragonBow = itemMap.get('Dragon Bow');
                    const shield2 = itemMap.get('Kite Shield');
                    const shield3 = itemMap.get('Great Shield');
                    coins.setCoins(25);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(broadSword);
                    items.push(darkStaff);
                    items.push(axagonBow);
                    items.push(lightStaff);
                    items.push(book);
                    items.push(ring2);
                    items.push(ring3);
                    items.push(dragonBow);
                    items.push(shield2);
                    items.push(shield3);
                    items.push(shield3);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('dragon_small_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -5: {
                    // Dragon 2
                    monster.setHealth(100);
                    monster.setMaxAttack(10);
                    monster.setMaxDebuff(4);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const tyhrannBow = itemMap.get('Tyhrann Bow');
                    const elvenBow = itemMap.get('Elven Bow');
                    const waterStaff = itemMap.get('Water Staff');
                    const blessedSword = itemMap.get('Blessed Sword');
                    const tyhrannSword = itemMap.get('Tyhrann Sword');
                    coins.setCoins(50);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(tyhrannBow);
                    items.push(elvenBow);
                    items.push(waterStaff);
                    items.push(blessedSword);
                    items.push(tyhrannSword);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('dragon_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -6: {
                    // Wizard
                    monster.setHealth(15);
                    monster.setMaxAttack(5);
                    monster.setMaxDebuff(4);

                    let items = [];
                    const beer = itemMap.get('Glass of Beer');
                    const liver = itemMap.get('Liver');
                    const coins = itemMap.get('Coins');
                    const book = itemMap.get('Guard\'s Log');
                    const fireStaff = itemMap.get('Fire Staff');
                    const airStaff = itemMap.get('Air Staff');
                    const restorePot = itemMap.get('Restore Potion');
                    const freiyanBow = itemMap.get('Freiyan Bow');
                    const book2 = itemMap.get('History of Ar\'kahl');
                    const sword = itemMap.get('Axagon Sword');
                    const wisdomStaff = itemMap.get('Staff of Wisdom');
                    coins.setCoins(15);
                    items.push(beer);
                    items.push(liver);
                    items.push(coins);
                    items.push(liver);
                    items.push(coins);
                    items.push(coins);
                    items.push(beer);
                    items.push(liver);
                    items.push(coins);
                    items.push(book);
                    items.push(fireStaff);
                    items.push(airStaff);
                    items.push(restorePot);
                    items.push(freiyanBow);
                    items.push(book2);
                    items.push(sword);
                    items.push(wisdomStaff);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('wizard_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -7: {
                    // Reaper
                    monster.setHealth(24);
                    monster.setMaxAttack(7);
                    monster.setMaxDebuff(3);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const magePot = itemMap.get('Mage Potion');
                    const simpleBow = itemMap.get('Simple Bow');
                    const recurveBow = itemMap.get('Recurve Bow');
                    const freiyanSword = itemMap.get('Freiyan Sword');
                    const earthStaff = itemMap.get('Earth Staff');
                    const book = itemMap.get('Adventurer\'s Log');
                    const healthPot = itemMap.get('Health Potion');
                    const compoundBow = itemMap.get('Compound Bow');
                    const shield2 = itemMap.get('Kite Shield');
                    coins.setCoins(20);
                    items.push(beer);
                    items.push(meat);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(magePot);
                    items.push(simpleBow);
                    items.push(recurveBow);
                    items.push(freiyanSword);
                    items.push(earthStaff);
                    items.push(book);
                    items.push(healthPot);
                    items.push(healthPot);
                    items.push(compoundBow);
                    items.push(shield2);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('reaper_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -8: {
                    // Ogre 1
                    monster.setHealth(20);
                    monster.setMaxAttack(5);
                    monster.setMaxDebuff(3);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const magePot = itemMap.get('Mage Potion');
                    const simpleBow = itemMap.get('Simple Bow');
                    const recurveBow = itemMap.get('Recurve Bow');
                    const freiyanSword = itemMap.get('Freiyan Sword');
                    const earthStaff = itemMap.get('Earth Staff');
                    const book = itemMap.get('Adventurer\'s Log');
                    const healthPot = itemMap.get('Health Potion');
                    const broadSword = itemMap.get('Broad Sword');
                    const ring1 = itemMap.get('Mana Ring');
                    const shield1 = itemMap.get('Round Shield');
                    coins.setCoins(18);
                    items.push(beer);
                    items.push(meat);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(magePot);
                    items.push(simpleBow);
                    items.push(recurveBow);
                    items.push(freiyanSword);
                    items.push(earthStaff);
                    items.push(book);
                    items.push(healthPot);
                    items.push(book);
                    items.push(healthPot);
                    items.push(broadSword);
                    items.push(ring1);
                    items.push(shield1);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('orc_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -10: {
                    // Demon 1
                    monster.setHealth(20);
                    monster.setMaxAttack(5);
                    monster.setMaxDebuff(3);

                    let items = [];
                    const beer = itemMap.get('Mug of Beer');
                    const meat = itemMap.get('Meat');
                    const coins = itemMap.get('Coins');
                    const magePot = itemMap.get('Mage Potion');
                    const simpleBow = itemMap.get('Simple Bow');
                    const recurveBow = itemMap.get('Recurve Bow');
                    const freiyanSword = itemMap.get('Freiyan Sword');
                    const earthStaff = itemMap.get('Earth Staff');
                    const book = itemMap.get('Adventurer\'s Log');
                    const healthPot = itemMap.get('Health Potion');
                    const broadSword = itemMap.get('Broad Sword');
                    const ring1 = itemMap.get('Mana Ring');
                    const ironPlate = itemMap.get('Iron Platebody');
                    const fireStaff = itemMap.get('Fire Staff');
                    const shield1 = itemMap.get('Round Shield');
                    coins.setCoins(18);
                    items.push(beer);
                    items.push(meat);
                    items.push(beer);
                    items.push(meat);
                    items.push(meat);
                    items.push(coins);
                    items.push(meat);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(magePot);
                    items.push(simpleBow);
                    items.push(recurveBow);
                    items.push(freiyanSword);
                    items.push(earthStaff);
                    items.push(book);
                    items.push(healthPot);
                    items.push(book);
                    items.push(healthPot);
                    items.push(broadSword);
                    items.push(ring1);
                    items.push(ironPlate);
                    items.push(fireStaff);
                    items.push(fireStaff);
                    items.push(shield1);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('demon_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -11: {
                    // Orc 4
                    monster.setHealth(10);
                    monster.setMaxAttack(3);
                    monster.setMaxDebuff(2);

                    let items = [];
                    const beer = itemMap.get('Glass of Beer');
                    const liver = itemMap.get('Liver');
                    const coins = itemMap.get('Coins');
                    const defencePot = itemMap.get('Defence Potion');
                    const rangePot = itemMap.get('Range Potion');
                    const sandwich = itemMap.get('Sandwich');
                    const book = itemMap.get('Magic Tome');
                    const healthPot = itemMap.get('Health Potion');
                    const berry = itemMap.get('Huckleberries');
                    const attackPot = itemMap.get('Attack Potion');
                    const bounty = itemMap.get('Ring of Bounty');
                    const ironChain = itemMap.get('Iron Chainmail');
                    coins.setCoins(6);
                    items.push(ironChain);
                    items.push(bounty);
                    items.push(beer);
                    items.push(beer);
                    items.push(liver);
                    items.push(liver);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(defencePot);
                    items.push(rangePot);
                    items.push(sandwich);
                    items.push(sandwich);
                    items.push(book);
                    items.push(healthPot);
                    items.push(berry);
                    items.push(berry);
                    items.push(attackPot);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('orc_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
                case -12: {
                    // Orc 5
                    monster.setHealth(10);
                    monster.setMaxAttack(3);
                    monster.setMaxDebuff(2);

                    let items = [];
                    const beer = itemMap.get('Glass of Beer');
                    const liver = itemMap.get('Liver');
                    const coins = itemMap.get('Coins');
                    const defencePot = itemMap.get('Defence Potion');
                    const rangePot = itemMap.get('Range Potion');
                    const sandwich = itemMap.get('Sandwich');
                    const book = itemMap.get('Magic Tome');
                    const healthPot = itemMap.get('Health Potion');
                    const berry = itemMap.get('Huckleberries');
                    const attackPot = itemMap.get('Attack Potion');
                    const bounty = itemMap.get('Ring of Bounty');
                    const ironChain = itemMap.get('Iron Chainmail');
                    coins.setCoins(6);
                    items.push(ironChain);
                    items.push(bounty);
                    items.push(beer);
                    items.push(beer);
                    items.push(liver);
                    items.push(liver);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(coins);
                    items.push(defencePot);
                    items.push(rangePot);
                    items.push(sandwich);
                    items.push(sandwich);
                    items.push(book);
                    items.push(healthPot);
                    items.push(berry);
                    items.push(berry);
                    items.push(attackPot);

                    monster.setItems(items);

                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('orc_encounter');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }

                    break;
                }
            }

            return monster;
        }

        function personEncounterRandom(newTy2, newTx2) {
            questHelper.checkQuestPrompt(engageMap, level, player);

            const personMap = engageMap.get(level);

            if (personMap) {
                const personArray = personMap[map[newTy2][newTx2]];
                const indexTracker = personMap['dialog'][map[newTy2][newTx2]];

                if (indexTracker !== undefined) {
                    const questionObj = personArray[indexTracker];

                    if (questionObj.okCallback) {
                        showOkDialog(questionObj.question, questionObj.okCallback);
                    } else {
                        showConfirmDialog(questionObj.yesCallback, questionObj.noCallback, questionObj.question);
                    }

                    personMap['dialog'][map[newTy2][newTx2]]++;

                    let maxDialogCount = undefined;

                    if (personMap['dialogMax']) {
                        maxDialogCount = personMap['dialogMax'][map[newTy2][newTx2]];
                    }

                    if (maxDialogCount !== undefined && personMap['dialog'][map[newTy2][newTx2]] >= maxDialogCount) {
                        personMap['dialog'][map[newTy2][newTx2]] = 0;
                    }
                    else if (personMap['dialog'][map[newTy2][newTx2]] >= personArray.length) {
                        personMap['dialog'][map[newTy2][newTx2]] = 0;
                    }
                } else if (personArray && personArray.length > 0) {
                    let idx = Math.round(Math.random() * (personArray.length - 1));

                    const questionObj = personArray[idx];

                    if (questionObj.okCallback) {
                        showOkDialog(questionObj.question, questionObj.okCallback);
                    } else {
                        showConfirmDialog(questionObj.yesCallback, questionObj.noCallback, questionObj.question);
                    }
                }
            }
        }

        function onMove(position, newTx, newTy) {
            if (map[newTx][newTy] === 1 || map[newTx][newTy] === 'D') {
                camera.position.x = position.x;
                camera.position.z = position.z;

                miniMap.update({
                    x: newTy,
                    y: newTx
                });

                lastPosition.x = newTx;
                lastPosition.y = newTy;

                saveHelper.save(level, player, camera, lastPosition, currDirection, questHelper);
            }
        }

        function hideInterfaces() {
            const lootEle = document.getElementById('lootContainer');
            lootEle.setAttribute('hidden', true);

            const invEle = document.getElementById('inventoryContainer');
            invEle.setAttribute('hidden', true);

            const invItemsEle = document.getElementById('inventory');
            while (invItemsEle.lastElementChild) {
                invItemsEle.removeChild(invItemsEle.lastElementChild);
            }

            const dialogEle = document.getElementById('dialogContainer');
            dialogEle.setAttribute('hidden', true);

            const playerSplat = document.getElementById('playerAttackSplat');
            const monsterSplat = document.getElementById('monsterAttackSplat');
            const playerDamage = document.getElementById('playerAttackDamage');
            const monsterDamage = document.getElementById('monsterAttackDamage');

            const monsterSplatDebuffEle = document.getElementById('monsterDebuffSplat');
            const monsterDebuffEle = document.getElementById('monsterAttackDebuff');

            playerSplat.setAttribute('hidden', true);
            monsterSplat.setAttribute('hidden', true);
            playerDamage.setAttribute('hidden', true);
            monsterDamage.setAttribute('hidden', true);

            monsterSplatDebuffEle.setAttribute('hidden', true);
            monsterDebuffEle.setAttribute('hidden', true);

            const welcomeEle = document.getElementById('welcomeContainer');
            welcomeEle.setAttribute('hidden', true);
            welcomeEle.style.display = 'none';

            const welcomeTextEle = document.getElementById('welcome');
            welcomeTextEle.setAttribute('hidden', true);

            const statsEle = document.getElementById('statsContainer');
            statsEle.setAttribute('hidden', true);
        }

        function isSignValue(value) {
            if (typeof value !== 'string') {
                return false;
            }

            if (value.includes('1_4-') === true || value.includes('1_5-') === true) {
                return true;
            }

            return false;
        }

        function moveCamera(direction, delta, simulated = false) {
            if (!input.joykeys.down && direction === "down") ;
            if (encounterHelper && encounterHelper.getHasEncounter() && direction === "up") {
                return;
            }

            var collides = false;
            var position = {
                x: camera.position.x,
                z: camera.position.z
            };
            var rotation = camera.rotation.y;
            var offset = 50;

            var moveParamaters = {
                translation: (typeof delta != "undefined") ? delta.translation : cameraHelper.translation,
                rotation: (typeof delta != "undefined") ? delta.rotation : cameraHelper.rotation
            };

            moveParamaters.translation = 100;
            moveParamaters.rotation = 90 * Math.PI / 180;

            let isLeft = false;
            let isRight = false;
            let isUp = false;

            switch (direction) {
                case "up":
                    position.x -= Math.sin(-camera.rotation.y) * -moveParamaters.translation;
                    position.z -= Math.cos(-camera.rotation.y) * moveParamaters.translation;
                    isUp = true;

                    break;
                case "down":
                    position.x -= Math.sin(camera.rotation.y) * -moveParamaters.translation;
                    position.z += Math.cos(camera.rotation.y) * moveParamaters.translation;

                    break;
                case "left":
                    rotation += moveParamaters.rotation;
                    isLeft = true;

                    switch (currDirection) {
                        case 'N': {
                            currDirection = 'W';
                            break;
                        }
                        case 'W': {
                            currDirection = 'S';
                            break;
                        }
                        case 'S': {
                            currDirection = 'E';
                            break;
                        }
                        case 'E': {
                            currDirection = 'N';
                            break;
                        }
                    }

                    break;
                case "right":
                    rotation -= moveParamaters.rotation;
                    isRight = true;

                    switch (currDirection) {
                        case 'N': {
                            currDirection = 'E';
                            break;
                        }
                        case 'E': {
                            currDirection = 'S';
                            break;
                        }
                        case 'S': {
                            currDirection = 'W';
                            break;
                        }
                        case 'W': {
                            currDirection = 'N';
                            break;
                        }
                    }

                    break;
            }

            // Current position on the map
            Math.abs(Math.floor(((cameraHelper.origin.x + (camera.position.x * -1)) / 100)));
            Math.abs(Math.floor(((cameraHelper.origin.z + (camera.position.z * -1)) / 100)));

            // next position
            var newTx = Math.abs(Math.floor(((cameraHelper.origin.x + (position.x * -1) + (offset)) / 100)));
            var newTy = Math.abs(Math.floor(((cameraHelper.origin.z + (position.z * -1) + (offset)) / 100)));

            let posXCopy = position.x;
            let posZCopy = position.z;
            posXCopy -= Math.sin(-camera.rotation.y) * -moveParamaters.translation;
            posZCopy -= Math.cos(-camera.rotation.y) * moveParamaters.translation;

            // next position, forcibly plus one
            Math.abs(Math.floor(((cameraHelper.origin.x + (posXCopy * -1) + (offset)) / 100)));
            Math.abs(Math.floor(((cameraHelper.origin.z + (posZCopy * -1) + (offset)) / 100)));

            // Stay on the map
            if (newTx >= map[0].length) {
                newTx = map[0].length;
            }
            if (newTx < 0) {
                newTx = 0;
            }
            if (newTy >= map.length) {
                newTy = map.length;
            }
            if (newTy < 0) {
                newTy = 0;
            }

            let hasEncounter = false;

            //
            hideInterfaces();
            //

            if (isTutorial === true && (isUp === true || (isLeft === false && isRight === false)) && tutorial.index > 0) {
                showOkDialog(tutorial.messages[tutorial.index]);
                tutorial.index++;

                if (tutorial.index >= tutorial.messages.length) {
                    tutorial.index = 0;
                }
            }

            let northSouth = currDirection === 'N' || currDirection === 'S';

            let initialMapCode = map[newTy][newTx];
            let secondaryMapCode = -1;
            if (typeof initialMapCode === 'string' && initialMapCode.startsWith('A') === false) {
                secondaryMapCode = initialMapCode.substring(initialMapCode.indexOf('_') + 1, initialMapCode.length);
                if (secondaryMapCode.includes('_') === true) {
                    secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('_'));
                }

                if (secondaryMapCode.includes('-') === true) {
                    secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('-'));
                }

                secondaryMapCode = Number(secondaryMapCode);
                initialMapCode = Number(initialMapCode.substring(0, initialMapCode.indexOf('_')));
            }
            
            if (typeof map[newTy][newTx] === 'string' && map[newTy][newTx].includes('_') && map[newTy][newTx].includes('A') === false
                && (initialMapCode != 1 || secondaryMapCode != -1)) {
                collides = true;
            } else if (map[newTy][newTx] != 1 && !isNaN(map[newTy][newTx])) {
                collides = true;
            } else if (typeof map[newTy][newTx] === 'string' && map[newTy][newTx].startsWith('A') === true) {
                let fullStr = map[newTy][newTx];

                if (fullStr.includes('_') === true) {
                    requestedNewLevel = fullStr.substring(fullStr.indexOf('_') + 1, fullStr.length);
                } else {
                    requestedNewLevel = null;
                }

                running = false;
            } else if (map[newTy][newTx] === 'P') {
                previousLevel = true;
            }

            // person
            if (isUp === true && collides) {
                if (map[newTy][newTx] >= 100) {
                    collides = true;
                    personEncounterRandom(newTy, newTx);
                }
                else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                    collides = true;
                    personEncounterRandom(newTy, newTx - 1);
                } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                    collides = true;
                    personEncounterRandom(newTy, newTx + 1);
                } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                    collides = true;
                    personEncounterRandom(newTy - 1, newTx);
                } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                    collides = true;
                    personEncounterRandom(newTy + 1, newTx);
                }
            } else if (isUp === true && !collides) {
                if (map[newTy][newTx] >= 100) {
                    collides = true;
                    personEncounterRandom(newTy, newTx);
                    //onMove(position, newTy, newTx);
                }
                else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                    collides = true;
                    personEncounterRandom(newTy, newTx - 1);
                    onMove(position, newTy, newTx);
                } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                    collides = true;
                    personEncounterRandom(newTy, newTx + 1);
                    onMove(position, newTy, newTx);
                } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                    collides = true;
                    personEncounterRandom(newTy - 1, newTx);
                    onMove(position, newTy, newTx);
                } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                    collides = true;
                    personEncounterRandom(newTy + 1, newTx);
                    onMove(position, newTy, newTx);
                }
            } else if (!collides) {
                if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                    collides = true;
                    personEncounterRandom(newTy, newTx - 1);
                    onMove(position, newTy, newTx);
                } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                    collides = true;
                    personEncounterRandom(newTy, newTx + 1);
                    onMove(position, newTy, newTx);
                } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                    collides = true;
                    personEncounterRandom(newTy - 1, newTx);
                    onMove(position, newTy, newTx);
                } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                    collides = true;
                    personEncounterRandom(newTy + 1, newTx);
                    onMove(position, newTy, newTx);
                }
            }

            // monster
            if (isUp === true && !collides) {
                if (map[newTy][newTx] < 0) {
                    collides = true;
                    //onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy][newTx]);
                    encounterHelper.setMonster(getMonster(map[newTy][newTx]));
                    encounterHelper.setX(newTx);
                    encounterHelper.setY(newTy);
                    //}

                    hasEncounter = true;
                }
                else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] < 0 && (northSouth === false) && currDirection === 'W') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy][newTx - 1]);
                    encounterHelper.setMonster(getMonster(map[newTy][newTx - 1]));
                    encounterHelper.setX(newTx - 1);
                    encounterHelper.setY(newTy);
                    //}

                    hasEncounter = true;
                } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] < 0 && (northSouth === false) && currDirection === 'E') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy][newTx + 1]);
                    encounterHelper.setMonster(getMonster(map[newTy][newTx + 1]));
                    encounterHelper.setX(newTx + 1);
                    encounterHelper.setY(newTy);
                    //}

                    hasEncounter = true;
                } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] < 0 && (northSouth === true) && currDirection === 'N') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy - 1][newTx]);
                    encounterHelper.setMonster(getMonster(map[newTy - 1][newTx]));
                    encounterHelper.setX(newTx);
                    encounterHelper.setY(newTy - 1);
                    //}

                    hasEncounter = true;
                } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] < 0 && (northSouth === true) && currDirection === 'S') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy + 1][newTx]);
                    encounterHelper.setMonster(getMonster(map[newTy + 1][newTx]));
                    encounterHelper.setX(newTx);
                    encounterHelper.setY(newTy + 1);
                    //}

                    hasEncounter = true;
                }
            } else if (!collides) {
                if ((newTx - 1) >= 0 && map[newTy][newTx - 1] < 0 && (northSouth === false) && currDirection === 'W') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy][newTx - 1]);
                    encounterHelper.setMonster(getMonster(map[newTy][newTx - 1]));
                    encounterHelper.setX(newTx - 1);
                    encounterHelper.setY(newTy);
                    //}

                    hasEncounter = true;
                } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] < 0 && (northSouth === false) && currDirection === 'E') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy][newTx + 1]);
                    encounterHelper.setMonster(getMonster(map[newTy][newTx + 1]));
                    encounterHelper.setX(newTx + 1);
                    encounterHelper.setY(newTy);
                    //}

                    hasEncounter = true;
                } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] < 0 && (northSouth === true) && currDirection === 'N') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy - 1][newTx]);
                    encounterHelper.setMonster(getMonster(map[newTy - 1][newTx]));
                    encounterHelper.setX(newTx);
                    encounterHelper.setY(newTy - 1);
                    //}

                    hasEncounter = true;
                } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] < 0 && (northSouth === true) && currDirection === 'S') {
                    collides = true;
                    onMove(position, newTy, newTx);

                    //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                    encounterHelper = new EncounterHelper();
                    encounterHelper.setHasEncounter(true);
                    encounterHelper.setEncounterType(map[newTy + 1][newTx]);
                    encounterHelper.setMonster(getMonster(map[newTy + 1][newTx]));
                    encounterHelper.setX(newTx);
                    encounterHelper.setY(newTy + 1);
                    //}

                    hasEncounter = true;
                }
            }

            // sign
            if (isUp === true && !collides) {
                if (isSignValue(map[newTy][newTx]) === true) {
                    const signValue = map[newTy][newTx].substring(map[newTy][newTx].indexOf('-') + 1, map[newTy][newTx].length);
                    showOkDialog(signValue);

                    collides = true;
                }
                else if ((newTx - 1) >= 0 && isSignValue(map[newTy][newTx - 1]) === true && (northSouth === false) && currDirection === 'W') {
                    const signValue = map[newTy][newTx - 1].substring(map[newTy][newTx - 1].indexOf('-') + 1, map[newTy][newTx - 1].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTx + 1) < map.length && isSignValue(map[newTy][newTx + 1]) === true && (northSouth === false) && currDirection === 'E') {
                    const signValue = map[newTy][newTx + 1].substring(map[newTy][newTx + 1].indexOf('-') + 1, map[newTy][newTx + 1].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTy - 1) >= 0 && isSignValue(map[newTy - 1][newTx]) === true && (northSouth === true) && currDirection === 'N') {
                    const signValue = map[newTy - 1][newTx].substring(map[newTy - 1][newTx].indexOf('-') + 1, map[newTy - 1][newTx].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTy + 1) < map.length && isSignValue(map[newTy + 1][newTx]) === true && (northSouth === true) && currDirection === 'S') {
                    const signValue = map[newTy + 1][newTx].substring(map[newTy + 1][newTx].indexOf('-') + 1, map[newTy + 1][newTx].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                }
            } else if (!collides) {
                if ((newTx - 1) >= 0 && isSignValue(map[newTy][newTx - 1]) === true && (northSouth === false) && currDirection === 'W') {
                    const signValue = map[newTy][newTx - 1].substring(map[newTy][newTx - 1].indexOf('-') + 1, map[newTy][newTx - 1].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTx + 1) < map.length && isSignValue(map[newTy][newTx + 1]) === true && (northSouth === false) && currDirection === 'E') {
                    const signValue = map[newTy][newTx + 1].substring(map[newTy][newTx + 1].indexOf('-') + 1, map[newTy][newTx + 1].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTy - 1) >= 0 && isSignValue(map[newTy - 1][newTx]) === true && (northSouth === true) && currDirection === 'N') {
                    const signValue = map[newTy - 1][newTx].substring(map[newTy - 1][newTx].indexOf('-') + 1, map[newTy - 1][newTx].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                } else if ((newTy + 1) < map.length && isSignValue(map[newTy + 1][newTx]) === true && (northSouth === true) && currDirection === 'S') {
                    const signValue = map[newTy + 1][newTx].substring(map[newTy + 1][newTx].indexOf('-') + 1, map[newTy + 1][newTx].length);
                    showOkDialog(signValue);

                    collides = true;
                    onMove(position, newTy, newTx);
                }
            }

            if (hasEncounter === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(false);
            }

            camera.rotation.y = rotation;

            if (collides == false) {
                onMove(position, newTy, newTx);
            } else {
                document.getElementById("bumpSound").play();

                //remove below?
                /*
                if (hasEncounter === false && isUp === false) {
                    // dup onmove?
                    miniMap.update({
                        x: tx,
                        y: ty
                    });

                    lastPosition.x = tx;
                    lastPosition.y = ty;

                    saveHelper.save(level, player, camera, lastPosition, currDirection);
                    // dup onmove?
                }*/
            }
        }

        function removeLoadingNotice() {
            const notice = document.getElementById('loadingNotice');
            notice.style.display = 'none';
            hasNotice = false;
        }

        function mainLoop(time) {
            //console.log(time);

            if (combatHelper.getKingDragonDefeated() === true) {
                if (soundGlobal.isPlaying === true) {
                    soundGlobal.stop();
                }

                window.location.href = 'victory.html';
            } else if (previousLevel === true) {
                previousLevel = false;
                // animatorList = [];
                goPreviousLevel();
            } else if (running) {
                if (hasNotice) removeLoadingNotice();
                update();
                draw();
                window.requestAnimationFrame(mainLoop, renderer.domElement);

                // can remove all other save instances
                saveHelper.save(level, player, camera, lastPosition, currDirection, questHelper);
            } else {
                // animatorList = [];
                endScreen();
            }
        }

        function goPreviousLevel() {
            if (soundGlobal.isPlaying === true) {
                soundGlobal.stop();
            }

            for (var i = 0, l = scene.children.length; i < l; i++) {
                scene.remove(scene.children[i]);
            }
            renderer.clear();
            scene = new THREE.Scene();

            level = levelHelper.getPrevious();
            loadLevel(level);
        }

        function endScreen() {
            if (player.getHealth() <= 0) {
                if (soundGlobal.isPlaying === true) {
                    soundGlobal.stop();
                }

                window.location.href = 'gameover.html';
            } else {
                if (soundGlobal.isPlaying === true) {
                    soundGlobal.stop();
                }

                for (var i = 0, l = scene.children.length; i < l; i++) {
                    scene.remove(scene.children[i]);
                }
                renderer.clear();
                scene = new THREE.Scene();
                level = levelHelper.getNext();

                if (requestedNewLevel !== null) {
                    level = Number(requestedNewLevel);
                }

                loadLevel(level);
                running = true;
            }
        }

        function loadLevel(level) {
            hasNotice = true;
            const notice = document.getElementById('loadingNotice');
            notice.style.display = '';

            var ajax = new XMLHttpRequest();
            ajax.open("GET", "assets/maps/maze3d-" + level + ".json", true);
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    map = JSON.parse(ajax.responseText);
                    launch();

                    if (firstStepInLevel === false) {
                        let soundTemporal = new THREE.Audio(audioListener);
                        const soundFile = soundMap.get('metal-click');

                        if (soundFile) {
                            audioLoader.load(soundFile, function (buffer) {
                                soundTemporal.setBuffer(buffer);
                                soundTemporal.setLoop(false);
                                soundTemporal.setVolume(1);
                                soundTemporal.play();
                            });
                        }
                    }

                    firstStepInLevel = true;
                }
            };
            ajax.send(null);
        }

        function repeatTexture(texture, size) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.x = size;
            texture.repeat.y = size;
            return texture;
        }

        function initializePlayer() {
            player = new Player();
        }

        function addPlayerItems() {
            const saveState = localStorage.getItem('save');

            if (saveState === undefined || saveState === null) {
                for (let i = 0; i < 4; ++i) {
                    const meat = itemMap.get('Meat');
                    player.addItem(meat);
                }

                player.addItem(itemMap.get('Ring of Bounty'));
                const coins = itemMap.get('Coins');
                coins.setCoins(3);
                player.addItem(coins);
                player.addItem(coins);
            }
        }

        function initializeDialogHelper() {
            dialogHelper = new DialogHelper();
        }

        function initializePlayerInventory() {
            playerInventory = new PlayerInventory();
        }

        function intializeLootInventory() {
            lootInventory = new LootInventory();
        }

        function initializeSoundHelper() {
            soundHelper = new SoundHelper();
        }

        function initializeTextureHelper() {
            textureHelper = new TextureHelper();

            const size = {
                x: 100,
                y: 100,
                z: 100
            };

            textureHelper.setSizeX(size.x);
            textureHelper.setSizeY(size.y);
            textureHelper.setSizeZ(size.z);

            textureHelper.buildWallTextures(wallMap, animatorList);
            textureHelper.buildMonsterTextures(monsterMap, animatorList);
        }

        function initializeItemHelper() {
            itemHelper = new ItemHelper();
            itemHelper.intializeGameItems(itemMap, player);
        }

        function initializeCombatHelper() {
            combatHelper = new CombatHelper();
        }

        function initializeSaveHelper() {
            saveHelper = new SaveHelper();
        }

        function initializeQuestHelper() {
            questHelper = new QuestHelper();
        }

        function showWelcomeMessage() {
            const welcomeMessage = welcomeMap.get(level);

            if (welcomeMessage) {
                const welcomeEle = document.getElementById('welcomeContainer');
                welcomeEle.removeAttribute('hidden');
                welcomeEle.style.display = 'flex';

                let top = Math.round(((window.innerHeight / 2) / 2) - 19);
                let left = Math.round(((window.innerWidth / 2) / 2) - 19);

                welcomeEle.style.width = Math.round(window.innerWidth / 2) + 'px';
                welcomeEle.style.height = Math.round(window.innerHeight / 2) + 'px';
                welcomeEle.style.top = top + 'px';
                welcomeEle.style.left = left + 'px';

                const welcomeTextEle = document.getElementById('welcome');
                welcomeTextEle.removeAttribute('hidden');
                welcomeTextEle.innerText = welcomeMessage;

                const welcomeOkEle = document.getElementById('welcomeOkBtn');
                welcomeOkEle.onclick = () => {
                    const welcomeEle = document.getElementById('welcomeContainer');
                    welcomeEle.setAttribute('hidden', true);
                    welcomeEle.style.display = 'none';

                    const welcomeTextEle = document.getElementById('welcome');
                    welcomeTextEle.setAttribute('hidden', true);
                };
            }
        }

        function launch() {
            // updateCanvasPosition();

            const saveState = localStorage.getItem('save');
            initializeScene(saveState);
            initializeDialogHelper();
            initializePlayerInventory();
            intializeLootInventory();
            initializeSoundHelper();
            initializeCombatHelper();
            questHelper.resetQuestPrompts(engageMap, level);

            if (isFirstUpdate) {
                moveCamera("dummy", undefined, true);
            }

            showWelcomeMessage();

            if (level > 0) {
                isTutorial = false;
            }

            if (isTutorial === true && tutorial.index === 0) {
                showOkDialog(tutorial.messages[tutorial.index]);
                tutorial.index++;
            }

            mainLoop();
        }

        function startNewGame() {
            lastPosition = {
                x: 0,
                y: 0,
                z: 0
            };

            if (level === 0) {
                levelHelper.current = level;
                levelHelper.next = level + 1;
                isTutorial = true;
                loadLevel(level);
            } else if (level > 0 || level <= levelHelper.count) {
                levelHelper.current = level;
                levelHelper.next = level + 1;
                isTutorial = false;
                loadLevel(level);
            } else {
                levelHelper.current = 1;
                levelHelper.next = 2;
                isTutorial = false;
                loadLevel(1);
            }
        }

        window.onload = function () {
            initializeQuestHelper();
            initializeEngine();
            initializeSaveHelper();
            initializeTextureHelper();
            initializePlayer();
            initializeItemHelper();
            addPlayerItems();

            level = 0; // Get parameter
            isTutorial = true;

            const saveState = localStorage.getItem('save');
            if (saveState) {
                const saveData = saveHelper.restore(camera, player, cameraHelper, questHelper);
                level = saveData.level;
                lastPosition = saveData.pos;
                currDirection = saveData.direction;

                if (player.getHealth() <= 0) {
                    localStorage.removeItem('save');
                    level = 0;
                    isTutorial = false;
                    initializePlayer();
                    startNewGame();
                } else {
                    if (level === 0) {
                        levelHelper.current = level;
                        levelHelper.next = level + 1;
                        isTutorial = true;
                        loadLevel(level);
                    } else if (level > 0 || level <= levelHelper.count) {
                        levelHelper.current = level;
                        levelHelper.next = level + 1;
                        isTutorial = false;
                        loadLevel(level);
                    } else {
                        levelHelper.current = 1;
                        levelHelper.next = 2;
                        isTutorial = false;
                        loadLevel(1);
                    }
                }
            } else {
                startNewGame();
            }
        };
    })();

})();
