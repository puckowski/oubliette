export class DialogHelper {

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