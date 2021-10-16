/** @namespace */
var Oubliette = Oubliette || {};

Oubliette.Input = function() {
    this.keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        enter: false,
        control: false,
        alt: false,
        shift: false,
        num_0: false,
        num_1: false,
        num_2: false,
        num_3: false,
        num_4: false,
        num_5: false,
        num_6: false,
        num_7: false,
        num_8: false,
        num_9: false,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
        k_0: false,
        k_1: false,
        k_2: false,
        k_3: false,
        k_4: false,
        k_5: false,
        k_6: false,
        k_7: false,
        k_8: false,
        k_9: false
    };

    this.keyboardState = {
        current: null,
        last: null
    };

    this.joykeys = {
        up: false,
        down: false,
        left: false,
        right: false,
        upLeft: false,
        upRight: false,
        downLeft: false,
        downRight: false,
        actionA: false,
        actionB: false,
        actionC: false,
        actionX: false,
        actionY: false,
        actionZ: false,
        triggerL: false,
        triggerR: false,
        start: false,
        select: false
    };

    this.joykeyState = {
        current: null,
        last: null
    };

    var _this = this;

    this._onKeyboardDown = function(event) {
        _this._onKeyStateChange(event, false);
    };

    this._onKeyboardUp = function(event) {
        _this._onKeyStateChange(event, true);
    };

    document.addEventListener('keydown', this._onKeyboardDown, false);
    document.addEventListener('keyup', this._onKeyboardUp, false);

    this.virtualJoyKeys = document.getElementsByClassName("joykey");

    this._onJoykeyDown = function(event) {
        _this._onJoykeyStateChange(event, true);
    };

    this._onJoykeyUp = function(event) {
        _this._onJoykeyStateChange(event, false);
    };

    for (var i = 0, l = this.virtualJoyKeys.length; i < l; i++) {
        this.virtualJoyKeys[i].addEventListener("mousedown", this._onJoykeyDown, false);
        //this.virtualJoyKeys[i].addEventListener("mouseup", this._onJoykeyUp, false);
        this.virtualJoyKeys[i].addEventListener("touchstart", this._onJoykeyDown, false);
        //this.virtualJoyKeys[i].addEventListener("touchend", this._onJoykeyUp, false);
    }
};

Oubliette.Input.prototype.destroy = function() {
    document.removeEventListener('keydown', this._onKeyboardDown, false);
    document.removeEventListener('keyup', this._onKeyboardUp, false);

    for (var i = 0, l = this.virtualJoyKeys.length; i < l; i++) {
        this.virtualJoyKeys[i].removeEventListener("mousedown", this._onJoykeyDown, false);
        this.virtualJoyKeys[i].removeEventListener("mouseup", this._onJoykeyUp, false);
        this.virtualJoyKeys[i].removeEventListener("touchstart", this._onJoykeyDown, false);
        this.virtualJoyKeys[i].removeEventListener("touchend", this._onJoykeyUp, false);
    }
};

Oubliette.Input.prototype._onKeyStateChange = function(event, pressed) {
    event.preventDefault();

    switch (event.keyCode) {
        case 13:
            this.keys.enter = pressed;
            break; 
        case 16:
            this.keys.shift = pressed;
            break;    
        case 17:
            this.keys.control = pressed;
            break; 
        case 18:
            this.keys.alt = pressed;
            break;                        
        case 32:
            this.keys.space = pressed;
            break; 
        case 37:
            this.keys.left = pressed;
            break; 
        case 38:
            this.keys.up = pressed;
            break; 
        case 39:
            this.keys.right = pressed;
            break; 
        case 40:
            this.keys.down = pressed;
            break; 
        case 48:
            this.keys.k_0 = pressed;
            break; 
        case 49:
            this.keys.k_1 = pressed;
            break; 
        case 50:
            this.keys.k_2 = pressed;
            break; 
        case 51:
            this.keys.k_3 = pressed;
            break; 
        case 52:
            this.keys.k_4 = pressed;
            break; 
        case 53:
            this.keys.k_5 = pressed;
            break; 
        case 54:
            this.keys.k_6 = pressed;
            break; 
        case 55:
            this.keys.k_7 = pressed;
            break; 
        case 56:
            this.keys.k_8 = pressed;
            break; 
        case 57:
            this.keys.k_9 = pressed;
            break; 
        case 65:
            this.keys.a = pressed;
            break; 
        case 65:
            this.keys.b = pressed;
            break; 
        case 65:
            this.keys.c = pressed;
            break; 
        case 68:
            this.keys.d = pressed;
            break; 
        case 69:
            this.keys.e = pressed;
            break; 
        case 70:
            this.keys.f = pressed;
            break; 
        case 71:
            this.keys.g = pressed;
            break; 
        case 72:
            this.keys.h = pressed;
            break; 
        case 73:
            this.keys.i = pressed;
            break; 
        case 74:
            this.keys.j = pressed;
            break; 
        case 75:
            this.keys.k = pressed;
            break; 
        case 76:
            this.keys.l = pressed;
            break; 
        case 77:
            this.keys.m = pressed;
            break; 
        case 78:
            this.keys.n = pressed;
            break; 
        case 79:
            this.keys.o = pressed;
            break; 
        case 80:
            this.keys.p = pressed;
            break; 
        case 81:
            this.keys.q = pressed;
            break; 
        case 82:
            this.keys.r = pressed;
            break; 
        case 83:
            this.keys.s = pressed;
            break; 
        case 84:
            this.keys.t = pressed;
            break; 
        case 85:
            this.keys.u = pressed;
            break;
        case 86:
            this.keys.v = pressed;
            break; 
        case 87:
            this.keys.w = pressed;
            break; 
        case 88:
            this.keys.x = pressed;
            break; 
        case 89:
            this.keys.y = pressed;
            break; 
        case 90:
            this.keys.z = pressed;
            break; 
        case 96:
            this.keys.num_0 = pressed;
            break; 
        case 97:
            this.keys.num_1 = pressed;
            break; 
        case 98:
            this.keys.num_2 = pressed;
            break; 
        case 99:
            this.keys.num_3 = pressed;
            break; 
        case 100:
            this.keys.num_4 = pressed;
            break; 
        case 101:
            this.keys.num_5 = pressed;
            break; 
        case 102:
            this.keys.num_6 = pressed;
            break; 
        case 103:
            this.keys.num_7 = pressed;
            break; 
        case 104:
            this.keys.num_8 = pressed;
            break; 
        case 105:
            this.keys.num_9 = pressed;
            break; 
    }
};

Oubliette.Input.prototype._onJoykeyStateChange = function(event, pressed) {
    event.preventDefault();
    var id = event.currentTarget.id;

    switch (id) {
        case "keyinv":
            this.joykeys.inv = pressed;
            this.joykeys.hasInput = true;
            break;
         case "keymelee":
            this.joykeys.melee = pressed;
            this.joykeys.hasInput = true;
            break;  
        case "keyrange":
            this.joykeys.range = pressed;
            this.joykeys.hasInput = true;
            break;
        case "keymage":
            this.joykeys.mage = pressed;
            this.joykeys.hasInput = true;
            break; 
        case "keystats":
            this.joykeys.stats = pressed;
            this.joykeys.hasInput = true;
            break;
            
        case "keyup":
            this.joykeys.up = pressed;
            this.joykeys.hasInput = true;
            break;
        case "keydown":
            this.joykeys.down = pressed;
            this.joykeys.hasInput = true;
            break;
        case "keyleft":
            this.joykeys.left = pressed;
            this.joykeys.hasInput = true;
            break;
        case "keyright":
            this.joykeys.right = pressed;
            this.joykeys.hasInput = true;
            break;

        case "keyActionA":
            this.joykeys.A = pressed;
            break;
        case "keyActionB":
            this.joykeys.B = pressed;
            break;
        case "keyActionC":
            this.joykeys.C = pressed;
            break;
        case "keyActionX":
            this.joykeys.X = pressed;
            break;
        case "keyActionY":
            this.joykeys.Y = pressed;
            break;
        case "keyActionZ":
            this.joykeys.Z = pressed;
            break;

        case "keyTriggerL":
            this.joykeys.triggerL = pressed;
            break;
        case "keyTriggerR":
            this.joykeys.triggerR = pressed;
            break;

        case "keyButtonStart":
            this.joykeys.start = pressed;
            break;
        case "keyButtonSelect":
            this.joykeys.select = pressed;
            break;
    }
};

Oubliette.Input.prototype.pressed = function(key) {
    return this.keys[key];
};