/**
* 枚举类型 
*/
//行走时迈哪只腿
enum WalkLegEnum {
	LEFT,
	RIGHT
}

//背景的状态
enum BackgroundStatus {
	LOADING,
	INIT,
	GAMING,
	PAUSE
}

//方向
enum LoadDirection {
	UP, DOWN, LEFT, RIGHT
}

//路上标志物类型：路障、shit、香蕉、炸弹、金、标志线、
enum RoadSignType {
	ROADBLOCK,
	BOOM,
	SHIT,
	BANANA,
	GLOD,
	ROADLINE
}