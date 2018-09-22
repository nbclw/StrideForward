/**
* 枚举类型
*/
//行走时迈哪只腿
var WalkLegEnum;
(function (WalkLegEnum) {
    WalkLegEnum[WalkLegEnum["LEFT"] = 0] = "LEFT";
    WalkLegEnum[WalkLegEnum["RIGHT"] = 1] = "RIGHT";
})(WalkLegEnum || (WalkLegEnum = {}));
//背景的状态
var BackgroundStatus;
(function (BackgroundStatus) {
    BackgroundStatus[BackgroundStatus["LOADING"] = 0] = "LOADING";
    BackgroundStatus[BackgroundStatus["INIT"] = 1] = "INIT";
    BackgroundStatus[BackgroundStatus["GAMING"] = 2] = "GAMING";
    BackgroundStatus[BackgroundStatus["PAUSE"] = 3] = "PAUSE";
})(BackgroundStatus || (BackgroundStatus = {}));
//方向
var LoadDirection;
(function (LoadDirection) {
    LoadDirection[LoadDirection["UP"] = 0] = "UP";
    LoadDirection[LoadDirection["DOWN"] = 1] = "DOWN";
    LoadDirection[LoadDirection["LEFT"] = 2] = "LEFT";
    LoadDirection[LoadDirection["RIGHT"] = 3] = "RIGHT";
})(LoadDirection || (LoadDirection = {}));
//路上标志物类型：路障、shit、香蕉、炸弹、金、标志线、
var RoadSignType;
(function (RoadSignType) {
    RoadSignType[RoadSignType["ROADBLOCK"] = 0] = "ROADBLOCK";
    RoadSignType[RoadSignType["BOOM"] = 1] = "BOOM";
    RoadSignType[RoadSignType["SHIT"] = 2] = "SHIT";
    RoadSignType[RoadSignType["BANANA"] = 3] = "BANANA";
    RoadSignType[RoadSignType["GLOD"] = 4] = "GLOD";
    RoadSignType[RoadSignType["ROADLINE"] = 5] = "ROADLINE";
})(RoadSignType || (RoadSignType = {}));
//# sourceMappingURL=GameEnum.js.map