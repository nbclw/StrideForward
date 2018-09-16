/**
* 角色操作类
*/
var CharacterControl;
(function (CharacterControl) {
    var Control = /** @class */ (function () {
        function Control(character) {
            this.isReady = false; //角色是否准备好
            this.isAction = false; //角色是否在运动
            this.walkLeg = WalkLegEnum.LEFT; //角色运动的腿，默认左腿
            this.character = character;
            this.frameLength = 16;
            this.ResetConfig();
        }
        //显示
        Control.prototype.Show = function () {
            if (this.isReady)
                return;
            var childs = this.character._childs;
            if (childs.length == 0) {
                for (var i = 0; i < this.character.characterBones.length; i++)
                    this.character.addChild(this.character.characterBones[i]);
            }
            this.ResetConfig();
            this.LoadBonesSkin(this.character.characterBones);
            this.isReady = true;
        };
        //隐藏
        Control.prototype.Hide = function () {
            if (!this.isReady)
                return;
            var childs = this.character._childs;
            if (childs.length > 0) {
                this.character.removeChildren(0, childs.length);
            }
            this.isReady = false;
        };
        //加载骨骼皮肤
        Control.prototype.LoadBonesSkin = function (bones) {
            for (var i = 0; i < bones.length; i++)
                bones[i].loadImage(bones[i].skin, 0, 0, bones[i].boneWidth, bones[i].boneLength);
        };
        //归位某些参数
        Control.prototype.ResetConfig = function () {
        };
        Control.prototype.RenderCharacter = function () {
        };
        Control.prototype.Wlak = function (distance) {
            if (!this.isReady)
                return;
            if (this.isAction)
                return;
            if (this.bodyBone == null || this.bodyBone == undefined)
                this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY);
            this.isAction = true;
            var index = 0;
            var offset = this.character.legsInter / 2;
            distance = this.walkLeg == WalkLegEnum.LEFT ? distance : -distance;
            distance += this.character.GetDistanceByLtoR();
            var frames = this.MathRotation(distance);
            Laya.timer.loop(500 / this.frameLength, this, function () {
                this.Walk1(frames[index], offset, index == (frames.length - 1));
                index++;
                if (index >= frames.length) {
                    Laya.timer.clearAll(this);
                    if (this.walkLeg == WalkLegEnum.LEFT)
                        this.walkLeg = WalkLegEnum.RIGHT;
                    else
                        this.walkLeg = WalkLegEnum.LEFT;
                    this.isAction = false;
                }
            });
        };
        Control.prototype.MathRotation = function (distance) {
            var _a, _b, _c, _d;
            var frames = [];
            var stageDis = distance / 2;
            var rotation = Math.asin(stageDis / this.character.legLength) * 360 / 2 / Math.PI;
            var changeRotation = rotation - this.character.legsRotation;
            this.character.legsRotation = rotation;
            var frameUp, frameDown;
            if (this.walkLeg == WalkLegEnum.LEFT) {
                frameUp = (_a = {},
                    _a[GameGlobal.BONE_RIGHTUPLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_RIGHTFOOT] = 0,
                    _a[GameGlobal.BONE_LEFTUPLEG] = -changeRotation * 4 / this.frameLength,
                    _a[GameGlobal.BONE_LEFTDOWNLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_LEFTFOOT] = changeRotation / this.frameLength,
                    _a);
                frameDown = (_b = {},
                    _b[GameGlobal.BONE_RIGHTUPLEG] = changeRotation / this.frameLength,
                    _b[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation / this.frameLength,
                    _b[GameGlobal.BONE_RIGHTFOOT] = 0,
                    _b[GameGlobal.BONE_LEFTUPLEG] = changeRotation * 2 / this.frameLength,
                    _b[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation * 3 / this.frameLength,
                    _b[GameGlobal.BONE_LEFTFOOT] = -changeRotation / this.frameLength,
                    _b);
            }
            else {
                frameUp = (_c = {},
                    _c[GameGlobal.BONE_RIGHTUPLEG] = changeRotation * 4 / this.frameLength,
                    _c[GameGlobal.BONE_RIGHTDOWNLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_RIGHTFOOT] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTUPLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTFOOT] = 0,
                    _c);
                frameDown = (_d = {},
                    _d[GameGlobal.BONE_RIGHTUPLEG] = -changeRotation * 2 / this.frameLength,
                    _d[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation * 3 / this.frameLength,
                    _d[GameGlobal.BONE_RIGHTFOOT] = changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTUPLEG] = -changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTFOOT] = 0,
                    _d);
            }
            //一阶段，上升
            for (var index = 0; index < this.frameLength / 2; index++) {
                frames.push(frameUp);
            }
            //二阶段，落下
            for (var index = 0; index < this.frameLength / 2; index++) {
                frames.push(frameDown);
            }
            return frames;
        };
        Control.prototype.Walk1 = function (frame, offset, isLast) {
            var lastBone, currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - offset, this.bodyBone.beginPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNLEG]);
            var bx = currBone.endPoint.x;
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTFOOT]);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + offset, this.bodyBone.beginPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTUPLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNLEG]);
            var ex = currBone.endPoint.x;
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTFOOT]);
        };
        //归位骨骼
        Control.prototype.ResetBones = function () {
            if (this.bodyBone == null || this.bodyBone == undefined)
                this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY);
            var lastBone, currBone;
            this.bodyBone.BonePosAndRotation(this.character.centerPoint.x, this.character.height - this.character.legLength, bonesConfig[GameGlobal.BONE_BODY].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_NECK);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_HEAD);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPARM);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.character.boneLength / 8, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNARM);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTHAND);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPARM);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.character.boneLength / 8, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNARM);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTHAND);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.character.legsInter / 2, this.bodyBone.beginPoint.y, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.character.upLegRotationOffset);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.character.downLegRotationOffset);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.character.legsInter / 2, this.bodyBone.beginPoint.y, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.character.upLegRotationOffset);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.character.downLegRotationOffset);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);
            this.character.legsRotation = 0;
        };
        return Control;
    }());
    CharacterControl.Control = Control;
})(CharacterControl || (CharacterControl = {}));
//# sourceMappingURL=CharacterControl.js.map