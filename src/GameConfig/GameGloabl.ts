/*
* 全局参数类;
*/
class GameGlobal {
    public static readonly RAD_VALUE: number = 2 * Math.PI / 360;
    public static readonly TWEENTIME: number = 500;
    public static readonly ROADSIGNSKEW_X: number = -45;

    public static readonly BONE_BODY: string = 'BONEBODY';
    public static readonly BONE_HEAD: string = 'BONEHEAD';
    public static readonly BONE_NECK: string = 'BONENECK';
    public static readonly BONE_RIGHTUPARM: string = 'BONERIGHTUPARM';
    public static readonly BONE_RIGHTDOWNARM: string = 'BONERIGHTDOWNARM';
    public static readonly BONE_RIGHTHAND: string = 'BONERIGHTHAND';
    public static readonly BONE_LEFTUPARM: string = 'BONELEFTUPARM';
    public static readonly BONE_LEFTDOWNARM: string = 'BONELEFTDOWNARM';
    public static readonly BONE_LEFTHAND: string = 'BONELEFTHAND';
    public static readonly BONE_RIGHTUPLEG: string = 'BONERIGHTUPLEG';
    public static readonly BONE_RIGHTDOWNLEG: string = 'BONERIGHTDOWNLEG';
    public static readonly BONE_RIGHTFOOT: string = 'BONERIGHTFOOT';
    public static readonly BONE_LEFTUPLEG: string = 'BONELEFTUPLEG';
    public static readonly BONE_LEFTDOWNLEG: string = 'BONELEFTDOWNLEG';
    public static readonly BONE_LEFTFOOT: string = 'BONELEFTFOOT';
    public static readonly BONESCONFIG = {
        [GameGlobal.BONE_BODY]: { Rotation: 180, Length: 1 },
        [GameGlobal.BONE_HEAD]: { Rotation: 175, Length: 1 },
        [GameGlobal.BONE_NECK]: { Rotation: 198, Length: 0.125 },
        [GameGlobal.BONE_RIGHTUPARM]: { Rotation: 0, Length: 0.5 },
        [GameGlobal.BONE_RIGHTDOWNARM]: { Rotation: 0, Length: 0.3 },
        [GameGlobal.BONE_RIGHTHAND]: { Rotation: 0, Length: 0.5 },
        [GameGlobal.BONE_LEFTUPARM]: { Rotation: 0, Length: 0.5 },
        [GameGlobal.BONE_LEFTDOWNARM]: { Rotation: 0, Length: 0.3 },
        [GameGlobal.BONE_LEFTHAND]: { Rotation: 0, Length: 0.5 },
        [GameGlobal.BONE_RIGHTUPLEG]: { Rotation: 0, Length: 0.75 },
        [GameGlobal.BONE_RIGHTDOWNLEG]: { Rotation: 0, Length: 1 },
        [GameGlobal.BONE_RIGHTFOOT]: { Rotation: -90, Length: 0.3 },
        [GameGlobal.BONE_LEFTUPLEG]: { Rotation: 0, Length: 0.75 },
        [GameGlobal.BONE_LEFTDOWNLEG]: { Rotation: 0, Length: 1 },
        [GameGlobal.BONE_LEFTFOOT]: { Rotation: -90, Length: 0.3 }
    }


    public static readonly RESOURCES = {
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
    }
}