export class EncounterHelper {
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