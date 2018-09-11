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
* 骨骼
*/
var BoneModal;
(function (BoneModal) {
    var Sprite = Laya.Sprite;
    var Point = Laya.Point;
    var Bone = /** @class */ (function (_super) {
        __extends(Bone, _super);
        function Bone(name, length, width, skin) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.boneLength = length;
            _this.boneWidth = width != undefined ? width : 5;
            if (skin != undefined)
                _this.skin = skin;
            else
                _this.skin = '../laya/assets/defeaultSkin.png';
            return _this;
        }
        Bone.prototype.BonePosAndRotation = function (x, y, rotation) {
            this.SetPos(x, y);
            this.SetRotation(rotation);
        };
        //设置sprite和起点位置
        Bone.prototype.SetPos = function (x, y) {
            this.pos(x, y);
            if (this.beginPoint == null)
                this.beginPoint = new Point();
            this.beginPoint.setTo(x, y);
        };
        //设置sprite轴心点、旋转角度和终点位置
        Bone.prototype.SetRotation = function (rotation) {
            this.rotation = rotation;
            this.SetEndPoint(rotation);
        };
        //根据起点，和长度设置终点位置
        Bone.prototype.SetEndPoint = function (rotation) {
            if (this.beginPoint == null)
                return;
            if (this.endPoint == null)
                this.endPoint = new Point();
            var rad = this.rotation * GameGloabl.RAD_VALUE;
            if (this.rotation % 90 == 0) {
                if ((this.rotation / 90) % 2 == 0) //偶数
                    this.endPoint.setTo(this.beginPoint.x, this.beginPoint.y + Math.cos(rad) * this.boneLength);
                else //奇数
                    this.endPoint.setTo(this.beginPoint.x - Math.sin(rad) * this.boneLength, this.beginPoint.y);
            }
            else
                this.endPoint.setTo(this.beginPoint.x - Math.sin(rad) * this.boneLength, this.beginPoint.y + Math.cos(rad) * this.boneLength);
        };
        //获取矩形区域的宽度
        Bone.prototype.GetWidth = function () {
            if (this.rotation % 90 == 0) {
                if ((this.rotation / 90) % 2 == 0)
                    return 0;
                else
                    return this.boneLength;
            }
            else {
                var radian = this.rotation * 2 * Math.PI / 360;
                return this.boneLength * Math.abs(Math.sin(radian));
            }
        };
        //获取矩形区域的高度
        Bone.prototype.GetHeight = function () {
            if (this.rotation % 90 == 0) {
                if ((this.rotation / 90) % 2 == 0)
                    return this.boneLength;
                else
                    return 0;
            }
            else {
                var radian = this.rotation * 2 * Math.PI / 360;
                return this.boneLength * Math.abs(Math.cos(radian));
            }
        };
        return Bone;
    }(Sprite));
    BoneModal.Bone = Bone;
})(BoneModal || (BoneModal = {}));
//# sourceMappingURL=BoneModal.js.map