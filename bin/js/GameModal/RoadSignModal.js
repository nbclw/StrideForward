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
* 道路上的路标
*/
var RoadSignModal;
(function (RoadSignModal) {
    var Sprite = Laya.Sprite;
    var Text = Laya.Text;
    var RoadSign = /** @class */ (function (_super) {
        __extends(RoadSign, _super);
        function RoadSign(type) {
            var _this = _super.call(this) || this;
            _this.signType = type;
            _this.txt = new Text();
            _this.txt.text = '';
            return _this;
        }
        RoadSign.prototype.SetText = function (txt, color, fontSize) {
            this.txt.changeText(txt);
            this.txt.color = color;
            this.txt.fontSize = fontSize;
        };
        RoadSign.prototype.ShowText = function () {
            this.addChild(this.txt);
        };
        RoadSign.prototype.HideText = function () {
            this.removeChild(this.txt);
        };
        return RoadSign;
    }(Sprite));
    RoadSignModal.RoadSign = RoadSign;
})(RoadSignModal || (RoadSignModal = {}));
//# sourceMappingURL=RoadSignModal.js.map