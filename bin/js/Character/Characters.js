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
* 操作角色
*/
var Characters;
(function (Characters) {
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
            _this.InitCharacter();
            return _this;
        }
        Character.prototype.InitCharacter = function () {
            this.CreateBones();
        };
        Character.prototype.CreateBones = function () {
            if (this.bones == undefined)
                this.bones = new CharacterBones(this);
        };
        Character.prototype.CharacterPos = function (x, y) {
            this.pos(x - this.width / 2, y - this.height / 2);
        };
        return Character;
    }(Sprite));
    Characters.Character = Character;
    var CharacterBones = /** @class */ (function () {
        function CharacterBones(character) {
            this.bones = [];
            this.InitBones(character);
            this.LoadBonesSkin();
        }
        CharacterBones.prototype.InitBones = function (character) {
            if (this.bones.length > 0)
                return;
            var boneLength = character.height / 4; //设置骨骼默认长度，约为角色本身长度的四分之一
            //设置骨骼中心点
            if (this.centerPoint == null)
                this.centerPoint = new Point();
            this.centerPoint.setTo(character.width / 2, character.height / 2 + boneLength / 10);
            this.body = new Bone('body', boneLength);
            this.body.BonePosAndRotation(this.centerPoint.x, this.centerPoint.y, 167);
            character.addChild(this.body);
            this.bones.push(this.body);
            this.neck = new Bone('neck', boneLength / 4);
            this.neck.BonePosAndRotation(this.body.endPoint.x, this.body.endPoint.y, 198);
            character.addChild(this.neck);
            this.bones.push(this.neck);
            this.head = new Bone('head', boneLength);
            this.head.BonePosAndRotation(this.neck.endPoint.x, this.neck.endPoint.y, 175);
            character.addChild(this.head);
            this.bones.push(this.head);
            this.rightUpArm = new Bone('rightUpArm', boneLength / 2);
            this.rightUpArm.BonePosAndRotation(this.body.endPoint.x - boneLength / 8, this.body.endPoint.y + boneLength / 10, -2);
            character.addChild(this.rightUpArm);
            this.bones.push(this.rightUpArm);
            this.rightDowmArm = new Bone('rightDowmArm', boneLength / 4);
            this.rightDowmArm.BonePosAndRotation(this.rightUpArm.endPoint.x, this.rightUpArm.endPoint.y, -20);
            character.addChild(this.rightDowmArm);
            this.bones.push(this.rightDowmArm);
            this.rightHand = new Bone('rightHand', boneLength / 2);
            this.rightHand.BonePosAndRotation(this.rightDowmArm.endPoint.x, this.rightDowmArm.endPoint.y, -30);
            character.addChild(this.rightHand);
            this.bones.push(this.rightHand);
            this.leftUpArm = new Bone('leftUpArm', boneLength / 2);
            this.leftUpArm.BonePosAndRotation(this.body.endPoint.x + boneLength / 8, this.body.endPoint.y + boneLength / 10, -24);
            character.addChild(this.leftUpArm);
            this.bones.push(this.leftUpArm);
            this.leftDowmArm = new Bone('leftDowmArm', boneLength / 4);
            this.leftDowmArm.BonePosAndRotation(this.leftUpArm.endPoint.x, this.leftUpArm.endPoint.y, -47);
            character.addChild(this.leftDowmArm);
            this.bones.push(this.leftDowmArm);
            this.leftHand = new Bone('leftHand', boneLength / 2);
            this.leftHand.BonePosAndRotation(this.leftDowmArm.endPoint.x, this.leftDowmArm.endPoint.y, -48);
            character.addChild(this.leftHand);
            this.bones.push(this.leftHand);
            this.rightUpLeg = new Bone('rightUpLeg', boneLength * 3 / 4);
            this.rightUpLeg.BonePosAndRotation(this.body.beginPoint.x - boneLength / 10, this.body.beginPoint.y + boneLength / 10, 6);
            character.addChild(this.rightUpLeg);
            this.bones.push(this.rightUpLeg);
            this.rightDowmLeg = new Bone('rightDowmLeg', boneLength);
            this.rightDowmLeg.BonePosAndRotation(this.rightUpLeg.endPoint.x, this.rightUpLeg.endPoint.y, 8);
            character.addChild(this.rightDowmLeg);
            this.bones.push(this.rightDowmLeg);
            this.rightFoot = new Bone('rightFoot', boneLength / 2);
            this.rightFoot.BonePosAndRotation(this.rightDowmLeg.endPoint.x, this.rightDowmLeg.endPoint.y, -80);
            character.addChild(this.rightFoot);
            this.bones.push(this.rightFoot);
            this.leftUpLeg = new Bone('leftUpLeg', boneLength * 3 / 4);
            this.leftUpLeg.BonePosAndRotation(this.body.beginPoint.x + boneLength / 10, this.body.beginPoint.y + boneLength / 10, -17);
            character.addChild(this.leftUpLeg);
            this.bones.push(this.leftUpLeg);
            this.leftDowmLeg = new Bone('leftDowmLeg', boneLength);
            this.leftDowmLeg.BonePosAndRotation(this.leftUpLeg.endPoint.x, this.leftUpLeg.endPoint.y, 3);
            character.addChild(this.leftDowmLeg);
            this.bones.push(this.leftDowmLeg);
            this.leftFoot = new Bone('leftFoot', boneLength / 2);
            this.leftFoot.BonePosAndRotation(this.leftDowmLeg.endPoint.x, this.leftDowmLeg.endPoint.y, -80);
            character.addChild(this.leftFoot);
            this.bones.push(this.leftFoot);
        };
        CharacterBones.prototype.LoadBonesSkin = function () {
            for (var index = 0; index < this.bones.length; index++)
                this.bones[index].loadImage(this.bones[index].skin, 0, 0, this.bones[index].boneWidth, this.bones[index].boneLength);
        };
        return CharacterBones;
    }());
})(Characters || (Characters = {}));
//# sourceMappingURL=Characters.js.map