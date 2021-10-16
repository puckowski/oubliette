export class PlayerInventory {

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