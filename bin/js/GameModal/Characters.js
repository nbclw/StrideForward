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
        function Character(charName, width, height, actionTime) {
            var _this = _super.call(this) || this;
            _this.isAction = false;
            _this.charName = charName;
            _this.actionTime = actionTime > 0 ? actionTime : 1000;
            _this.width = width;
            _this.height = height;
            _this.characterBones = [];
            _this.boneLength = _this.height / 4; //设置骨骼默认长度，约为角色本身长度的四分之一
            if (_this.centerPoint == null)
                _this.centerPoint = new Point();
            _this.centerPoint.setTo(_this.width / 2, _this.height / 2 + _this.boneLength / 10);
            _this.InitCharacter();
            return _this;
        }
        Character.prototype.InitCharacter = function () {
            this.CreateBones();
        };
        Character.prototype.CreateBones = function () {
            if (this.characterBones.length > 0)
                return;
            var bonesConfig = GameGlobal.BONESCONFIG;
            var bodyBone = new Bone(GameGlobal.BONE_BODY, this.boneLength * bonesConfig[GameGlobal.BONE_BODY].Length);
            bodyBone.BonePosAndRotation(this.centerPoint.x, this.centerPoint.y, bonesConfig[GameGlobal.BONE_BODY].Rotation);
            this.characterBones.push(bodyBone);
            var neckBone = new Bone(GameGlobal.BONE_NECK, this.boneLength * bonesConfig[GameGlobal.BONE_NECK].Length);
            neckBone.BonePosAndRotation(bodyBone.endPoint.x, bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
            this.characterBones.push(neckBone);
            var headBone = new Bone(GameGlobal.BONE_HEAD, this.boneLength * bonesConfig[GameGlobal.BONE_HEAD].Length);
            headBone.BonePosAndRotation(neckBone.endPoint.x, neckBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);
            this.characterBones.push(headBone);
            var rightUpArm = new Bone(GameGlobal.BONE_RIGHTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPARM].Length);
            rightUpArm.BonePosAndRotation(bodyBone.endPoint.x - this.boneLength / 8, bodyBone.endPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
            this.characterBones.push(rightUpArm);
            var rightDownArm = new Bone(GameGlobal.BONE_RIGHTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Length);
            rightDownArm.BonePosAndRotation(rightUpArm.endPoint.x, rightUpArm.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
            this.characterBones.push(rightDownArm);
            var rightHand = new Bone(GameGlobal.BONE_RIGHTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTHAND].Length);
            rightHand.BonePosAndRotation(rightDownArm.endPoint.x, rightDownArm.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);
            this.characterBones.push(rightHand);
            var leftUpArm = new Bone(GameGlobal.BONE_LEFTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPARM].Length);
            leftUpArm.BonePosAndRotation(bodyBone.endPoint.x + this.boneLength / 8, bodyBone.endPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
            this.characterBones.push(leftUpArm);
            var leftDownArm = new Bone(GameGlobal.BONE_LEFTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Length);
            leftDownArm.BonePosAndRotation(leftUpArm.endPoint.x, leftUpArm.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
            this.characterBones.push(leftDownArm);
            var leftHand = new Bone(GameGlobal.BONE_LEFTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTHAND].Length);
            leftHand.BonePosAndRotation(leftDownArm.endPoint.x, leftDownArm.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);
            this.characterBones.push(leftHand);
            var rightUpLeg = new Bone(GameGlobal.BONE_RIGHTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Length);
            rightUpLeg.BonePosAndRotation(bodyBone.beginPoint.x - this.boneLength / 10, bodyBone.beginPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation);
            this.characterBones.push(rightUpLeg);
            var rightDownLeg = new Bone(GameGlobal.BONE_RIGHTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Length);
            rightDownLeg.BonePosAndRotation(rightUpLeg.endPoint.x, rightUpLeg.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation);
            this.characterBones.push(rightDownLeg);
            var rightFoot = new Bone(GameGlobal.BONE_RIGHTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTFOOT].Length);
            rightFoot.BonePosAndRotation(rightDownLeg.endPoint.x, rightDownLeg.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);
            this.characterBones.push(rightFoot);
            var leftUpLeg = new Bone(GameGlobal.BONE_LEFTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPLEG].Length);
            leftUpLeg.BonePosAndRotation(bodyBone.beginPoint.x + this.boneLength / 10, bodyBone.beginPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation);
            this.characterBones.push(leftUpLeg);
            var leftDownLeg = new Bone(GameGlobal.BONE_LEFTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Length);
            leftDownLeg.BonePosAndRotation(leftUpLeg.endPoint.x, leftUpLeg.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation);
            this.characterBones.push(leftDownLeg);
            var leftFoot = new Bone(GameGlobal.BONE_LEFTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTFOOT].Length);
            leftFoot.BonePosAndRotation(leftDownLeg.endPoint.x, leftDownLeg.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);
            this.characterBones.push(leftFoot);
        };
        Character.prototype.CharacterPos = function (x, y) {
            this.pos(x - this.width / 2, y - this.height / 2);
        };
        return Character;
    }(Sprite));
    CharacterModal.Character = Character;
})(CharacterModal || (CharacterModal = {}));
//# sourceMappingURL=Characters.js.map