var Oubliette = window.Oubliette || {};
Oubliette.Gui = Oubliette.Gui || {};

Oubliette.Gui.MiniMap = function(width, height, parent) {
    this.parent = parent;
    this.width = width;
    this.height = height;
    this.blockSize = {
        width: 5,
        height: 5
    };

    this.playerPosition = {
        x: 0,
        y: 0
    };

    this.miniMap = document.createElement("canvas");
    this.ctx = this.miniMap.getContext("2d");

    this.create = function(top, left, position) {
        var domElement = document.getElementById(this.parent);

        var stylePosition = "position:absolute;";
        var styleTop = (top || domElement.clientHeight + 6) + "px;";
        var styleLeft = (left || "10") + "px;";

        this.miniMap.setAttribute("width", this.width * this.blockSize.width);
        this.miniMap.setAttribute("height", this.height * this.blockSize.height);
        this.miniMap.setAttribute("id", "miniMap");
        this.miniMap.setAttribute("style", stylePosition + "top:" + styleTop + "left:" + styleLeft);

        var mapElement = document.getElementById('miniMap');
        if (domElement !== "undefined" && mapElement) {
            domElement.removeChild(mapElement);
        }
        domElement.appendChild(this.miniMap);
    };

    this.updatePosition = function() {
        setTimeout(() => {
            var domElement = document.getElementById(this.parent);

            const statusBarEle = document.getElementById('statusbarContainer');
            const statusBarHeight = statusBarEle.offsetHeight;
    
            var stylePosition = "position:absolute;";
            var styleTop = (statusBarHeight + 6) + "px;";
            var styleLeft = "10px;";
    
            this.miniMap.setAttribute("style", stylePosition + "top:" + styleTop + "left:" + styleLeft);
        }, 0);
    }

    this.draw = function(x, y, id) {
        if (id == 1 || id === 20) {
            this.ctx.fillStyle = "rgb(230, 230, 230)";
        } else if (id == 'D') {
            this.ctx.fillStyle = "rgb(50, 168, 72)";
            this.playerPosition = {
                x: x,
                y: y
            };
        } else if (id == 'J') {
            this.ctx.fillStype = "yellow";
        } else if (typeof id === 'string' && id.startsWith('A') === true) {
            this.ctx.fillStyle = "rgb(0, 0, 153)";
        } else if (id == 'P') {
            this.ctx.fillStyle = "rgb(0, 153, 0)";
        } else if (typeof id === 'number' && id < 0) {
            this.ctx.fillStyle = 'rgb(204, 0, 153)';
        } else {
            this.ctx.fillStyle = "rgb(140, 140, 140)";
        }

        this.ctx.fillRect(x * 5, y * 5, 5, 5);
    };

    this.update = function(newPlayerPosition) {
        this.ctx.fillStyle = "rgb(230, 230, 230)";
        this.ctx.fillRect(this.playerPosition.x * this.blockSize.width, this.playerPosition.y * this.blockSize.height, this.blockSize.width, this.blockSize.height);
        this.ctx.fillStyle = "rgb(50, 168, 72)";
        this.ctx.fillRect(newPlayerPosition.x * this.blockSize.width, newPlayerPosition.y * this.blockSize.height, this.blockSize.width, this.blockSize.height);
        this.playerPosition = newPlayerPosition;
    };

    this.drawAt = function(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.blockSize.width, y * this.blockSize.height, this.blockSize.width, this.blockSize.height);
    };
};