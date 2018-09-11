/**
* 角色操作类
*/
var CharacterControl;
(function (CharacterControl) {
    var Control = /** @class */ (function () {
        function Control(character) {
            this.isReady = false; //角色是否准备好
            this.character = character;
            this.ResetConfig();
        }
        //归位某些参数
        Control.prototype.ResetConfig = function () {
        };
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
        return Control;
    }());
    CharacterControl.Control = Control;
})(CharacterControl || (CharacterControl = {}));
//# sourceMappingURL=CharacterControl.js.map