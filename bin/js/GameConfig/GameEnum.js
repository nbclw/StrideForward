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
//# sourceMappingURL=GameEnum.js.map