var _a;
/*
* 全局参数类;
*/
var GameGlobal = /** @class */ (function () {
    function GameGlobal() {
    }
    GameGlobal.RAD_VALUE = 2 * Math.PI / 360;
    GameGlobal.TWEENTIME = 500;
    GameGlobal.ROADSIGNSKEW_X = -45;
    GameGlobal.BONE_BODY = 'BONEBODY';
    GameGlobal.BONE_HEAD = 'BONEHEAD';
    GameGlobal.BONE_NECK = 'BONENECK';
    GameGlobal.BONE_RIGHTUPARM = 'BONERIGHTUPARM';
    GameGlobal.BONE_RIGHTDOWNARM = 'BONERIGHTDOWNARM';
    GameGlobal.BONE_RIGHTHAND = 'BONERIGHTHAND';
    GameGlobal.BONE_LEFTUPARM = 'BONELEFTUPARM';
    GameGlobal.BONE_LEFTDOWNARM = 'BONELEFTDOWNARM';
    GameGlobal.BONE_LEFTHAND = 'BONELEFTHAND';
    GameGlobal.BONE_RIGHTUPLEG = 'BONERIGHTUPLEG';
    GameGlobal.BONE_RIGHTDOWNLEG = 'BONERIGHTDOWNLEG';
    GameGlobal.BONE_RIGHTFOOT = 'BONERIGHTFOOT';
    GameGlobal.BONE_LEFTUPLEG = 'BONELEFTUPLEG';
    GameGlobal.BONE_LEFTDOWNLEG = 'BONELEFTDOWNLEG';
    GameGlobal.BONE_LEFTFOOT = 'BONELEFTFOOT';
    GameGlobal.BONESCONFIG = (_a = {},
        _a[GameGlobal.BONE_BODY] = { Rotation: 180, Length: 1 },
        _a[GameGlobal.BONE_HEAD] = { Rotation: 175, Length: 1 },
        _a[GameGlobal.BONE_NECK] = { Rotation: 198, Length: 0.125 },
        _a[GameGlobal.BONE_RIGHTUPARM] = { Rotation: 0, Length: 0.5 },
        _a[GameGlobal.BONE_RIGHTDOWNARM] = { Rotation: 0, Length: 0.3 },
        _a[GameGlobal.BONE_RIGHTHAND] = { Rotation: 0, Length: 0.5 },
        _a[GameGlobal.BONE_LEFTUPARM] = { Rotation: 0, Length: 0.5 },
        _a[GameGlobal.BONE_LEFTDOWNARM] = { Rotation: 0, Length: 0.3 },
        _a[GameGlobal.BONE_LEFTHAND] = { Rotation: 0, Length: 0.5 },
        _a[GameGlobal.BONE_RIGHTUPLEG] = { Rotation: 0, Length: 0.75 },
        _a[GameGlobal.BONE_RIGHTDOWNLEG] = { Rotation: 0, Length: 1 },
        _a[GameGlobal.BONE_RIGHTFOOT] = { Rotation: -90, Length: 0.3 },
        _a[GameGlobal.BONE_LEFTUPLEG] = { Rotation: 0, Length: 0.75 },
        _a[GameGlobal.BONE_LEFTDOWNLEG] = { Rotation: 0, Length: 1 },
        _a[GameGlobal.BONE_LEFTFOOT] = { Rotation: -90, Length: 0.3 },
        _a);
    GameGlobal.RESOURCES = {
        IMG: {
            PROGRESS: '../laya/assets/progress.png',
            PROGRESS_EMPTY: '../laya/assets/progress$bar.png',
            BONESKIN: '../laya/assets/defeaultSkin.png',
            GAMEAREA: '../laya/assets/gamearea.png',
            HITAREA: '../laya/assets/hitarea.png',
            WHITE: '../laya/assets/white.png',
            INITAREA: '../laya/assets/showarea.png',
            LOADAREA: '../laya/assets/loadarea.png',
            ROADBLOCK: '../laya/assets/black.png',
        }
    };
    return GameGlobal;
}());
//# sourceMappingURL=GameGloabl.js.map