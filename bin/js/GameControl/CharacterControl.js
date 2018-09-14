/**
* 角色操作类
*/
var CharacterControl;
(function (CharacterControl) {
    var Control = /** @class */ (function () {
        function Control(character) {
            this.isReady = false; //角色是否准备好
            this.isAction = false;
            this.character = character;
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
        Control.prototype.Wlak = function () {
            var _a, _b, _c;
            if (!this.isReady)
                return;
            // if (this.isAction) return;
            if (this.bodyBone == null)
                this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY);
            this.isAction = true;
            var index = 0;
            var distance = this.character.boneLength;
            var offset = this.character.boneLength / 10;
            var frames = [
                (_a = {},
                    _a[GameGlobal.BONE_RIGHTUPLEG] = 0,
                    _a[GameGlobal.BONE_RIGHTDOWNLEG] = 12,
                    _a[GameGlobal.BONE_RIGHTFOOT] = -90,
                    _a[GameGlobal.BONE_LEFTUPLEG] = -45,
                    _a[GameGlobal.BONE_LEFTDOWNLEG] = 45,
                    _a[GameGlobal.BONE_LEFTFOOT] = -45,
                    _a),
                (_b = {},
                    _b[GameGlobal.BONE_RIGHTUPLEG] = 8,
                    _b[GameGlobal.BONE_RIGHTDOWNLEG] = 20,
                    _b[GameGlobal.BONE_RIGHTFOOT] = -70,
                    _b[GameGlobal.BONE_LEFTUPLEG] = -45,
                    _b[GameGlobal.BONE_LEFTDOWNLEG] = 0,
                    _b[GameGlobal.BONE_LEFTFOOT] = -80,
                    _b),
                (_c = {},
                    _c[GameGlobal.BONE_RIGHTUPLEG] = 20,
                    _c[GameGlobal.BONE_RIGHTDOWNLEG] = 45,
                    _c[GameGlobal.BONE_RIGHTFOOT] = -60,
                    _c[GameGlobal.BONE_LEFTUPLEG] = -40,
                    _c[GameGlobal.BONE_LEFTDOWNLEG] = -15,
                    _c[GameGlobal.BONE_LEFTFOOT] = -115,
                    _c)
            ];
            Laya.timer.loop(1000, this, function () {
                this.Walk1(frames[index], offset);
                index++;
                if (index >= frames.length)
                    Laya.timer.clearAll(this);
            });
        };
        Control.prototype.Walk1 = function (frame, offset) {
            var lastBone, currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - offset, this.bodyBone.beginPoint.y + offset, frame[GameGlobal.BONE_RIGHTUPLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_RIGHTDOWNLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_RIGHTFOOT]);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + offset, this.bodyBone.beginPoint.y + offset, frame[GameGlobal.BONE_LEFTUPLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_LEFTDOWNLEG]);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_LEFTFOOT]);
        };
        //归位骨骼
        Control.prototype.ResetBones = function () {
            if (this.bodyBone == null)
                this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY);
            var lastBone, currBone;
            this.bodyBone.BonePosAndRotation(this.character.centerPoint.x, this.character.centerPoint.y, bonesConfig[GameGlobal.BONE_BODY].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_NECK);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_HEAD);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPARM);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.character.boneLength / 8, this.bodyBone.endPoint.y + this.character.boneLength / 5, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNARM);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTHAND);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPARM);
            currBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.character.boneLength / 8, this.bodyBone.endPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNARM);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTHAND);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.character.boneLength / 10, this.bodyBone.beginPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG);
            currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.character.boneLength / 10, this.bodyBone.beginPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation);
            lastBone = currBone;
            currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT);
            currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);
        };
        return Control;
    }());
    CharacterControl.Control = Control;
})(CharacterControl || (CharacterControl = {}));
//# sourceMappingURL=CharacterControl.js.map