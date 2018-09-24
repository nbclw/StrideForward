var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 角色类
*/
var CharacterModal;
(function (CharacterModal) {
    var Sprite = Laya.Sprite;
    var Point = Laya.Point;
    var Character = /** @class */ (function (_super) {
        __extends(Character, _super);
        function Character(charName, width, height) {
            var _this = _super.call(this) || this;
            _this.upLegRotationOffset = -6; //大腿的角度偏移，不会变
            _this.downLegRotationOffset = 6; //小腿的角度偏移，不会变
            _this.InitCharacter(charName, width, height);
            return _this;
        }
        Character.prototype.ResetConfig = function () {
            if (this.centerPoint == null || this.centerPoint == undefined)
                this.centerPoint = new Point();
            this.centerPoint.setTo(this.width / 2, this.height / 2 + this.boneLength / 10);
            this.ResetBones();
        };
        Character.prototype.InitCharacter = function (charName, width, height) {
            this.charName = charName;
            this.width = width;
            this.height = height;
            this.boneLength = this.height / 4; //设置骨骼默认长度
            this.legsInter = this.boneLength / 5; //两腿间的距离
            //创建人物骨骼
            this.CreateBones();
            this.ResetConfig();
        };
        //获取左脚与右脚的横向距离差
        Character.prototype.GetDistanceByLtoR = function () {
            return this.leftFootBone.endPoint.x - this.rightFootBone.endPoint.x - this.legsInter;
        };
        //获取右脚与左脚的横向距离差
        Character.prototype.GetDistanceByRtoL = function () {
            return this.rightFootBone.endPoint.x - this.leftFootBone.endPoint.x - this.legsInter;
        };
        //新建骨骼
        Character.prototype.CreateBones = function () {
            this.characterBones = [];
            this.bodyBone = new Bone(GameGlobal.BONE_BODY, this.boneLength * bonesConfig[GameGlobal.BONE_BODY].Length);
            this.bodyBone.cacheAs = 'bitmap';
            this.characterBones.push(this.bodyBone);
            this.neckBone = new Bone(GameGlobal.BONE_NECK, this.boneLength * bonesConfig[GameGlobal.BONE_NECK].Length);
            this.neckBone.cacheAs = 'bitmap';
            this.characterBones.push(this.neckBone);
            this.headBone = new Bone(GameGlobal.BONE_HEAD, this.boneLength * bonesConfig[GameGlobal.BONE_HEAD].Length);
            this.headBone.cacheAs = 'bitmap';
            this.characterBones.push(this.headBone);
            this.rightUpArmBone = new Bone(GameGlobal.BONE_RIGHTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPARM].Length);
            this.rightUpArmBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightUpArmBone);
            this.rightDownArmBone = new Bone(GameGlobal.BONE_RIGHTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Length);
            this.rightDownArmBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightDownArmBone);
            this.rightHandBone = new Bone(GameGlobal.BONE_RIGHTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTHAND].Length);
            this.rightHandBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightHandBone);
            this.leftUpArmBone = new Bone(GameGlobal.BONE_LEFTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPARM].Length);
            this.leftUpArmBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftUpArmBone);
            this.leftDownArmBone = new Bone(GameGlobal.BONE_LEFTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Length);
            this.leftDownArmBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftDownArmBone);
            this.leftHandBone = new Bone(GameGlobal.BONE_LEFTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTHAND].Length);
            this.leftHandBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftHandBone);
            this.rightUpLegBone = new Bone(GameGlobal.BONE_RIGHTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Length, -84);
            this.rightUpLegBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightUpLegBone);
            this.rightDownLegBone = new Bone(GameGlobal.BONE_RIGHTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Length);
            this.rightDownLegBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightDownLegBone);
            this.rightFootBone = new Bone(GameGlobal.BONE_RIGHTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTFOOT].Length);
            this.rightFootBone.cacheAs = 'bitmap';
            this.characterBones.push(this.rightFootBone);
            this.leftUpLegBone = new Bone(GameGlobal.BONE_LEFTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPLEG].Length, -84);
            this.leftUpLegBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftUpLegBone);
            this.leftDownLegBone = new Bone(GameGlobal.BONE_LEFTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Length);
            this.leftDownLegBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftDownLegBone);
            this.leftFootBone = new Bone(GameGlobal.BONE_LEFTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTFOOT].Length);
            this.leftFootBone.cacheAs = 'bitmap';
            this.characterBones.push(this.leftFootBone);
        };
        //归位骨骼
        Character.prototype.ResetBones = function () {
            var _a;
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
                _a[GameGlobal.BONE_RIGHTUPLEG] = bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.upLegRotationOffset,
                _a[GameGlobal.BONE_RIGHTDOWNLEG] = bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.downLegRotationOffset,
                _a[GameGlobal.BONE_RIGHTFOOT] = bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation,
                _a[GameGlobal.BONE_LEFTUPLEG] = bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.upLegRotationOffset,
                _a[GameGlobal.BONE_LEFTDOWNLEG] = bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.downLegRotationOffset,
                _a[GameGlobal.BONE_LEFTFOOT] = bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation,
                _a);
            this.SetBonesRotation(bonesRotation);
            this.legHeight = this.leftDownLegBone.endPoint.y - this.leftUpLegBone.beginPoint.y;
            this.legLength = Math.sqrt(Math.pow(this.leftUpLegBone.beginPoint.x - this.leftDownLegBone.endPoint.x, 2) + Math.pow(this.leftUpLegBone.beginPoint.y - this.leftDownLegBone.endPoint.y, 2));
            this.walkMaxDistance = this.legLength * 8 / 5;
            if (this.legHeight == 0)
                this.legRotation = (this.leftUpLegBone.endPoint.x - this.leftUpLegBone.beginPoint.x) > 0 ? -90 : 90;
            else
                this.legRotation = Math.acos(this.legHeight / this.legLength) / GameGlobal.RAD_VALUE;
            this.legsRotation = 0; //两腿的夹角
        };
        //设置各骨骼角度
        Character.prototype.SetBonesRotation = function (bonesRotation) {
            var b = (this.onBoneMove != undefined && this.onBoneMove != null && this.onBoneMove.args[0]);
            var rX1, lX1, rX2, lX2, cX1, cX2;
            if (b) {
                rX1 = this.rightFootBone.endPoint.x;
                lX1 = this.leftFootBone.endPoint.x;
            }
            this.bodyBone.BonePosAndRotation(this.centerPoint.x, this.centerPoint.y, bonesRotation[GameGlobal.BONE_BODY]);
            this.neckBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_NECK]);
            this.headBone.BonePosAndRotation(this.neckBone.endPoint.x, this.neckBone.endPoint.y, bonesRotation[GameGlobal.BONE_HEAD]);
            this.rightUpArmBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.boneLength / 4, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTUPARM]);
            this.rightDownArmBone.BonePosAndRotation(this.rightUpArmBone.endPoint.x, this.rightUpArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTDOWNARM]);
            this.rightHandBone.BonePosAndRotation(this.rightDownArmBone.endPoint.x, this.rightDownArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTHAND]);
            this.leftUpArmBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.boneLength / 4, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTUPARM]);
            this.leftDownArmBone.BonePosAndRotation(this.leftUpArmBone.endPoint.x, this.leftUpArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTDOWNARM]);
            this.leftHandBone.BonePosAndRotation(this.leftDownArmBone.endPoint.x, this.leftDownArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTHAND]);
            this.rightUpLegBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.legsInter / 2, this.bodyBone.beginPoint.y, bonesRotation[GameGlobal.BONE_RIGHTUPLEG]);
            this.rightDownLegBone.BonePosAndRotation(this.rightUpLegBone.endPoint.x, this.rightUpLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTDOWNLEG]);
            this.rightFootBone.BonePosAndRotation(this.rightDownLegBone.endPoint.x, this.rightDownLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTFOOT]);
            this.leftUpLegBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.legsInter / 2, this.bodyBone.beginPoint.y, bonesRotation[GameGlobal.BONE_LEFTUPLEG]);
            this.leftDownLegBone.BonePosAndRotation(this.leftUpLegBone.endPoint.x, this.leftUpLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTDOWNLEG]);
            this.leftFootBone.BonePosAndRotation(this.leftDownLegBone.endPoint.x, this.leftDownLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTFOOT]);
            if (b) {
                rX2 = this.rightFootBone.endPoint.x;
                lX2 = this.leftFootBone.endPoint.x;
                this.onBoneMove.runWith([rX2 - rX1, lX2 - lX1]);
            }
        };
        return Character;
    }(Sprite));
    CharacterModal.Character = Character;
})(CharacterModal || (CharacterModal = {}));
//# sourceMappingURL=CharacterModal.js.map