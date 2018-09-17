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
* name
*/
var BackgroundUI;
(function (BackgroundUI) {
    var View = Laya.View;
    var Button = Laya.Button;
    var Backgrounds = /** @class */ (function (_super) {
        __extends(Backgrounds, _super);
        function Backgrounds() {
            var _this = _super.call(this) || this;
            _this.btnWalk20 = new Button();
            _this.btnWalk20.pos(0, 0);
            _this.btnWalk20.label = '20';
            _this.btnWalk20.loadImage('../laya/assets/white.png');
            _this.btnWalk20.clickHandler.setTo(_this.btnWalk20, _this.asdsdas, [10], false);
            _this.addChild(_this.btnWalk20);
            _this.btnWalk30 = new Button();
            _this.btnWalk30.pos(60, 0);
            _this.btnWalk30.label = '30';
            _this.btnWalk30.loadImage('../laya/assets/white.png');
            _this.addChild(_this.btnWalk30);
            _this.btnWalk50 = new Button();
            _this.btnWalk50.pos(120, 0);
            _this.btnWalk50.label = '50';
            _this.btnWalk50.loadImage('../laya/assets/white.png');
            _this.addChild(_this.btnWalk50);
            return _this;
        }
        Backgrounds.prototype.asdsdas = function (a) {
            console.log(a);
        };
        return Backgrounds;
    }(View));
    BackgroundUI.Backgrounds = Backgrounds;
})(BackgroundUI || (BackgroundUI = {}));
//# sourceMappingURL=BackgroundUI.js.map