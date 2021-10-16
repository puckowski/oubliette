import { DialogHelper } from "./dialog.helper.js";

(function () {

    let dialogHelper;

    function restartGame() {
        localStorage.removeItem('save');
        showOkDialog('Game data cleared.');
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
        }

        const dialogEle = document.getElementById('dialogContainer');
        dialogEle.removeAttribute('hidden');

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

    window.onload = function () {
        dialogHelper = new DialogHelper();

        const restartButton = this.document.getElementById('restartGameBtn');
        restartButton.onclick = restartGame;
    };
})();