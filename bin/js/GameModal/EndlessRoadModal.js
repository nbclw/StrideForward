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
* 无尽之路
*/
var EndlessRoadModal;
(function (EndlessRoadModal) {
    var Sprite = Laya.Sprite;
    var EndlessRoad = /** @class */ (function (_super) {
        __extends(EndlessRoad, _super);
        function EndlessRoad(width, height) {
            var _this = _super.call(this) || this;
            _this.signPools = {}; //路标池，用于重复利用
            _this.width = width * 3 / 2;
            _this.height = height;
            _this.ResetConfig();
            return _this;
        }
        EndlessRoad.prototype.ResetConfig = function () {
            this.showMinX = -this.width / 2;
            this.showMaxX = this.width;
        };
        //移动路标
        EndlessRoad.prototype.MoveRoadSignX = function (x, flag) {
            x = Math.abs(x);
            x = flag == LoadDirection.LEFT ? -x : x;
            //已存在的移除或者移动
            for (var i = 0; i < this._childs.length; i++) {
                if (!this.IsShowByX(this._childs[i].x)) {
                    this.RemoveSign(this._childs[i]);
                    i--;
                    continue;
                }
                this._childs[i].x += x;
            }
        };
        //判断是否显示-根据X
        EndlessRoad.prototype.IsShowByX = function (x) {
            if (x < this.showMinX)
                return false;
            if (x > this.showMaxX)
                return false;
            return true;
        };
        //移除路标
        EndlessRoad.prototype.RemoveSign = function (roadSign) {
            this.removeChild(roadSign);
            if (this.signPools[roadSign.signType] == undefined || this.signPools[roadSign.signType] == null)
                this.signPools[roadSign.signType] = [];
            this.signPools[roadSign.signType].push(roadSign);
        };
        //添加路标
        EndlessRoad.prototype.AddSign = function (type, label, x, y, lineWidth, lineColor) {
            x = (x == undefined || x == null) ? 0 : x;
            if (!this.IsShowByX(x))
                return;
            if (this.signPools[type] == undefined || this.signPools[type] == null)
                this.signPools[type] = [];
            var roadSign;
            if (this.signPools[type].length == 0) {
                roadSign = new RoadSign(type);
                roadSign.ShowText();
            }
            else {
                roadSign = this.signPools[type][this.signPools[type].length - 1];
                this.signPools[type].pop();
            }
            roadSign.x = x;
            roadSign.y = (y == undefined || y == null) ? this.height / 2 : y;
            switch (type) {
                case RoadSignType.ROADLINE:
                    this.SetSign_RoadLine(roadSign, label, lineWidth, lineColor);
                    break;
                default:
                    this.signPools[type].push(roadSign);
                    return;
            }
            this.addChild(roadSign);
        };
        EndlessRoad.prototype.SetSign_RoadLine = function (roadSign, label, lineWidth, lineColor) {
            roadSign.height = this.height;
            roadSign.width = (lineWidth == undefined || lineWidth == null || lineWidth <= 0) ? 2 : lineWidth;
            var color = (lineColor == undefined || lineColor == null || lineColor.length <= 0) ? '#D3D3D3' : lineColor;
            var y = roadSign.height / 2;
            roadSign.graphics.drawLine(0, -y, 0, y, color, roadSign.width);
            roadSign.skew(GameGlobal.ROADSIGNSKEW_X, 0);
            roadSign.SetText(label, '#D3D3D3', 20);
        };
        return EndlessRoad;
    }(Sprite));
    EndlessRoadModal.EndlessRoad = EndlessRoad;
})(EndlessRoadModal || (EndlessRoadModal = {}));
//# sourceMappingURL=EndlessRoadModal.js.map