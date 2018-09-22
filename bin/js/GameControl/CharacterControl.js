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
            this.ResetConfig();
        }
        Control.prototype.ResetConfig = function () {
            this.frameLength = 16;
            this.actionTime = 400;
            this.walkLeg = WalkLegEnum.LEFT;
        };
        Control.prototype.CharacterMove = function (rightOffsetX, leftOffsetX) {
            var x = 0;
            if (this.walkLeg == WalkLegEnum.LEFT)
                this.character.x += -rightOffsetX;
            else
                this.character.x += -leftOffsetX;
        };
        //显示
        Control.prototype.Show = function () {
            if (this.isReady)
                return;
            for (var i = 0; i < this.character.characterBones.length; i++)
                this.character.addChild(this.character.characterBones[i]);
            this.isReady = true;
        };
        //重置
        Control.prototype.ResetCharacter = function () {
            this.isReady = false;
            this.character.ResetConfig();
            this.ResetConfig();
            this.ResetBones();
            this.LoadBonesSkin(this.character.characterBones);
            this.isReady = true;
        };
        //隐藏
        Control.prototype.Hide = function () {
            if (!this.isReady)
                return;
            for (var i = 0; i < this.character.characterBones.length; i++)
                this.character.removeChild(this.character.characterBones[i]);
            this.isReady = false;
        };
        //加载骨骼皮肤
        Control.prototype.LoadBonesSkin = function (bones) {
            for (var i = 0; i < bones.length; i++)
                bones[i].loadImage(bones[i].skin, -bones[i].boneWidth / 2, 0, bones[i].boneWidth, bones[i].boneLength);
        };
        //行走
        Control.prototype.Wlak = function (pre) {
            if (!this.isReady)
                return;
            if (this.isAction)
                return;
            var distance = pre * this.character.walkMaxDistance * 2;
            if (distance == 0)
                return;
            this.isAction = true;
            var index = 0;
            var offset = this.character.legsInter / 2;
            distance = this.walkLeg == WalkLegEnum.LEFT ? distance : -distance;
            distance += this.character.GetDistanceByLtoR();
            var frames = this.MathRotation(distance);
            if (frames.length == 0) {
                this.isAction = false;
                return;
            }
            Laya.timer.loop(this.actionTime / this.frameLength, this, function () {
                this.SetBones(frames[index], offset, index == (frames.length - 1));
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
        Control.prototype.SetBones = function (frame, offset, isLast) {
            var _a;
            var bonesRotation = (_a = {},
                _a[GameGlobal.BONE_BODY] = this.character.bodyBone.boneRotation + frame[GameGlobal.BONE_BODY],
                _a[GameGlobal.BONE_NECK] = this.character.neckBone.boneRotation + frame[GameGlobal.BONE_NECK],
                _a[GameGlobal.BONE_HEAD] = this.character.headBone.boneRotation + frame[GameGlobal.BONE_HEAD],
                _a[GameGlobal.BONE_RIGHTUPARM] = this.character.rightUpArmBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPARM],
                _a[GameGlobal.BONE_RIGHTDOWNARM] = this.character.rightDownArmBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNARM],
                _a[GameGlobal.BONE_RIGHTHAND] = this.character.rightHandBone.boneRotation + frame[GameGlobal.BONE_RIGHTHAND],
                _a[GameGlobal.BONE_LEFTUPARM] = this.character.leftUpArmBone.boneRotation + frame[GameGlobal.BONE_LEFTUPARM],
                _a[GameGlobal.BONE_LEFTDOWNARM] = this.character.leftDownArmBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNARM],
                _a[GameGlobal.BONE_LEFTHAND] = this.character.leftHandBone.boneRotation + frame[GameGlobal.BONE_LEFTHAND],
                _a[GameGlobal.BONE_RIGHTUPLEG] = this.character.rightUpLegBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPLEG],
                _a[GameGlobal.BONE_RIGHTDOWNLEG] = this.character.rightDownLegBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNLEG],
                _a[GameGlobal.BONE_RIGHTFOOT] = this.character.rightFootBone.boneRotation + frame[GameGlobal.BONE_RIGHTFOOT],
                _a[GameGlobal.BONE_LEFTUPLEG] = this.character.leftUpLegBone.boneRotation + frame[GameGlobal.BONE_LEFTUPLEG],
                _a[GameGlobal.BONE_LEFTDOWNLEG] = this.character.leftDownLegBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNLEG],
                _a[GameGlobal.BONE_LEFTFOOT] = this.character.leftFootBone.boneRotation + frame[GameGlobal.BONE_LEFTFOOT],
                _a);
            var yOffset = 0;
            if (this.walkLeg == WalkLegEnum.LEFT) {
                yOffset = this.GetCenterHeight(this.character.legRotation) - this.GetCenterHeight(this.character.legRotation + frame[GameGlobal.BONE_RIGHTUPLEG]);
                this.character.legRotation += frame[GameGlobal.BONE_RIGHTUPLEG];
            }
            else {
                this.character.legRotation -= frame[GameGlobal.BONE_LEFTUPLEG];
                yOffset = -this.GetCenterHeight(this.character.legRotation) + this.GetCenterHeight(this.character.legRotation + frame[GameGlobal.BONE_LEFTUPLEG]);
            }
            this.character.centerPoint.setTo(this.character.centerPoint.x, this.character.centerPoint.y + yOffset);
            this.character.SetBonesRotation(bonesRotation);
        };
        //获取角色中心点与脚底板的距离
        Control.prototype.GetCenterHeight = function (rotation) {
            if (rotation % 90 == 0) {
                if ((rotation / 90) % 2 == 0)
                    return this.character.legLength;
                else
                    return 0;
            }
            else {
                var radian = rotation * GameGlobal.RAD_VALUE;
                return this.character.legLength * Math.abs(Math.cos(radian));
            }
        };
        //归位骨骼
        Control.prototype.ResetBones = function () {
            var _a;
            this.character.centerPoint.setTo(this.character.centerPoint.x, this.character.height - this.character.legHeight);
            var bonesRotation = (_a = {},
                _a[GameGlobal.BONE_BODY] = bonesConfig[GameGlobal.BONE_BODY].Rotation,
                _a[GameGlobal.BONE_NECK] = bonesConfig[GameGlobal.BONE_NECK].Rotation,
                _a[GameGlobal.BONE_HEAD] = bonesConfig[GameGlobal.BONE_HEAD].Rotation,
                _a[GameGlobal.BONE_RIGHTUPARM] = bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation,
                _a[GameGlobal.BONE_RIGHTDOWNARM] = bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation,
                _a[GameGlobal.BONE_RIGHTHAND] = bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation,
                _a[GameGlobal.BONE_LEFTUPARM] = bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation,
                _a[GameGlobal.BONE_LEFTDOWNARM] = bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation,
                _a[GameGlobal.BONE_LEFTHAND] = bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation,
                _a[GameGlobal.BONE_RIGHTUPLEG] = bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.character.upLegRotationOffset,
                _a[GameGlobal.BONE_RIGHTDOWNLEG] = bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.character.downLegRotationOffset,
                _a[GameGlobal.BONE_RIGHTFOOT] = bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation,
                _a[GameGlobal.BONE_LEFTUPLEG] = bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.character.upLegRotationOffset,
                _a[GameGlobal.BONE_LEFTDOWNLEG] = bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.character.downLegRotationOffset,
                _a[GameGlobal.BONE_LEFTFOOT] = bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation,
                _a);
            this.character.SetBonesRotation(bonesRotation);
            this.character.legsRotation = 0;
        };
        //计算行走过程中的角度变化
        Control.prototype.MathRotation = function (distance) {
            var _a, _b, _c, _d;
            var frames = [];
            //计算原理是走路结束时，两腿一样的角度，一样的长
            var stageDis = distance / 2;
            stageDis = Math.abs(stageDis) > Math.abs(this.character.legLength) ? this.character.legLength : stageDis;
            var rotation = Math.asin(stageDis / this.character.legLength) / GameGlobal.RAD_VALUE;
            var changeRotation = rotation - this.character.legsRotation;
            this.character.legsRotation = rotation;
            var frameUp, frameDown, sign;
            if (this.walkLeg == WalkLegEnum.LEFT) {
                sign = 1;
                frameUp = (_a = {},
                    _a[GameGlobal.BONE_BODY] = 0,
                    _a[GameGlobal.BONE_HEAD] = 0,
                    _a[GameGlobal.BONE_NECK] = 0,
                    _a[GameGlobal.BONE_RIGHTUPARM] = 0,
                    _a[GameGlobal.BONE_RIGHTDOWNARM] = 0,
                    _a[GameGlobal.BONE_RIGHTHAND] = 0,
                    _a[GameGlobal.BONE_LEFTUPARM] = 0,
                    _a[GameGlobal.BONE_LEFTDOWNARM] = 0,
                    _a[GameGlobal.BONE_LEFTHAND] = 0,
                    _a[GameGlobal.BONE_RIGHTUPLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_RIGHTFOOT] = 0,
                    _a[GameGlobal.BONE_LEFTUPLEG] = -changeRotation * 4 / this.frameLength,
                    _a[GameGlobal.BONE_LEFTDOWNLEG] = changeRotation / this.frameLength,
                    _a[GameGlobal.BONE_LEFTFOOT] = changeRotation / this.frameLength,
                    _a);
                frameDown = (_b = {},
                    _b[GameGlobal.BONE_BODY] = 0,
                    _b[GameGlobal.BONE_HEAD] = 0,
                    _b[GameGlobal.BONE_NECK] = 0,
                    _b[GameGlobal.BONE_RIGHTUPARM] = 0,
                    _b[GameGlobal.BONE_RIGHTDOWNARM] = 0,
                    _b[GameGlobal.BONE_RIGHTHAND] = 0,
                    _b[GameGlobal.BONE_LEFTUPARM] = 0,
                    _b[GameGlobal.BONE_LEFTDOWNARM] = 0,
                    _b[GameGlobal.BONE_LEFTHAND] = 0,
                    _b[GameGlobal.BONE_RIGHTUPLEG] = changeRotation / this.frameLength,
                    _b[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation / this.frameLength,
                    _b[GameGlobal.BONE_RIGHTFOOT] = 0,
                    _b[GameGlobal.BONE_LEFTUPLEG] = changeRotation * 2 / this.frameLength,
                    _b[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation * 3 / this.frameLength,
                    _b[GameGlobal.BONE_LEFTFOOT] = -changeRotation / this.frameLength,
                    _b);
            }
            else {
                sign = -1;
                frameUp = (_c = {},
                    _c[GameGlobal.BONE_BODY] = 0,
                    _c[GameGlobal.BONE_HEAD] = 0,
                    _c[GameGlobal.BONE_NECK] = 0,
                    _c[GameGlobal.BONE_RIGHTUPARM] = 0,
                    _c[GameGlobal.BONE_RIGHTDOWNARM] = 0,
                    _c[GameGlobal.BONE_RIGHTHAND] = 0,
                    _c[GameGlobal.BONE_LEFTUPARM] = 0,
                    _c[GameGlobal.BONE_LEFTDOWNARM] = 0,
                    _c[GameGlobal.BONE_LEFTHAND] = 0,
                    _c[GameGlobal.BONE_RIGHTUPLEG] = changeRotation * 4 / this.frameLength,
                    _c[GameGlobal.BONE_RIGHTDOWNLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_RIGHTFOOT] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTUPLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation / this.frameLength,
                    _c[GameGlobal.BONE_LEFTFOOT] = 0,
                    _c);
                frameDown = (_d = {},
                    _d[GameGlobal.BONE_BODY] = 0,
                    _d[GameGlobal.BONE_HEAD] = 0,
                    _d[GameGlobal.BONE_NECK] = 0,
                    _d[GameGlobal.BONE_RIGHTUPARM] = 0,
                    _d[GameGlobal.BONE_RIGHTDOWNARM] = 0,
                    _d[GameGlobal.BONE_RIGHTHAND] = 0,
                    _d[GameGlobal.BONE_LEFTUPARM] = 0,
                    _d[GameGlobal.BONE_LEFTDOWNARM] = 0,
                    _d[GameGlobal.BONE_LEFTHAND] = 0,
                    _d[GameGlobal.BONE_RIGHTUPLEG] = -changeRotation * 2 / this.frameLength,
                    _d[GameGlobal.BONE_RIGHTDOWNLEG] = changeRotation * 3 / this.frameLength,
                    _d[GameGlobal.BONE_RIGHTFOOT] = changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTUPLEG] = -changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTDOWNLEG] = -changeRotation / this.frameLength,
                    _d[GameGlobal.BONE_LEFTFOOT] = 0,
                    _d);
            }
            var count = this.frameLength / 2;
            //一阶段，上升
            for (var index = 0; index < count; index++) {
                frames.push(frameUp);
                if (index == 0) {
                    frames[index][GameGlobal.BONE_BODY] = -sign * changeRotation / this.frameLength;
                    frames[index][GameGlobal.BONE_HEAD] = -sign * changeRotation / this.frameLength;
                    frames[index][GameGlobal.BONE_NECK] = -sign * changeRotation / this.frameLength;
                    frames[index][GameGlobal.BONE_RIGHTUPARM] = sign * changeRotation / this.frameLength / 4;
                    frames[index][GameGlobal.BONE_RIGHTDOWNARM] = sign * changeRotation / this.frameLength / 2;
                    frames[index][GameGlobal.BONE_RIGHTHAND] = sign * changeRotation / this.frameLength;
                    frames[index][GameGlobal.BONE_LEFTUPARM] = sign * changeRotation / this.frameLength / 4;
                    frames[index][GameGlobal.BONE_LEFTDOWNARM] = sign * changeRotation / this.frameLength / 2;
                    frames[index][GameGlobal.BONE_LEFTHAND] = sign * changeRotation / this.frameLength;
                }
            }
            //二阶段，落下
            for (var index = 0; index < count; index++) {
                frames.push(frameDown);
                if (index == 0) {
                    frames[count + index][GameGlobal.BONE_BODY] = sign * changeRotation / this.frameLength;
                    frames[count + index][GameGlobal.BONE_HEAD] = sign * changeRotation / this.frameLength;
                    frames[count + index][GameGlobal.BONE_NECK] = sign * changeRotation / this.frameLength;
                    frames[count + index][GameGlobal.BONE_RIGHTUPARM] = -sign * changeRotation / this.frameLength / 4;
                    frames[count + index][GameGlobal.BONE_RIGHTDOWNARM] = -sign * changeRotation / this.frameLength / 2;
                    frames[count + index][GameGlobal.BONE_RIGHTHAND] = -sign * changeRotation / this.frameLength;
                    frames[count + index][GameGlobal.BONE_LEFTUPARM] = -sign * changeRotation / this.frameLength / 4;
                    frames[count + index][GameGlobal.BONE_LEFTDOWNARM] = -sign * changeRotation / this.frameLength / 2;
                    frames[count + index][GameGlobal.BONE_LEFTHAND] = -sign * changeRotation / this.frameLength;
                }
            }
            return frames;
        };
        return Control;
    }());
    CharacterControl.Control = Control;
})(CharacterControl || (CharacterControl = {}));
//# sourceMappingURL=CharacterControl.js.map