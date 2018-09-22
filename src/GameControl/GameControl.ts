/**
* 游戏控制器 
*/
module GameControl {
	export class Control {
		constructor() {
			this.CreateAction();
		}
		private readonly linesMetre: number = 2;//距离标志线之间间隔几米
		private bg: Background;
		private character: Character;
		private characterControl: CharacterCon;
		private road: Road;

		private pressUnitTime: number = 50;//按下的单位时间，毫秒为单位
		private pressMaxTime: number = 1000;//按下的最大时间，毫秒为单位
		private pressTime: number;//按下的时间，毫秒为单位
		private beginX: number;

		private metreUnit: number;//每米所占的像素多少，游戏开始后不会变

		private roadDistance: number;
		private roadMetre: number;
		private walkDistance: number;
		private isGaming: boolean;

		private ResetConfig(): void {
			this.roadDistance = 0;
			this.roadMetre = 0;
			this.walkDistance = 0;
		}

		public StageInit(): void {
			Laya.stage.addChild(this.bg);
			this.StageEventInit();
			this.bg.LoadInitArea(LoadDirection.DOWN);
		}
		//创建角色场景
		private CreateAction(): void {
			this.isGaming = false;
			this.bg = new Background();

			this.character = new Character('caster', 100, this.bg.hitArea.height / 2);
			this.characterControl = new CharacterCon(this.character);
			this.metreUnit = this.character.height / 2;//角色占地2m，然后计算每米所占的像素
			//this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);
			this.character.onBoneMove = Handler.create(this, this.CharacterBoneMoveEvent, [this.isGaming], false)

			this.road = new Road(this.bg.hitArea.width, this.bg.hitArea.height / 2);
			this.road.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.road.width, this.road.height);
		}
		//人物骨骼变化事件
		private CharacterBoneMoveEvent(gaming: boolean, rightOffsetX: number, leftOffsetX: number): void {
			if (!gaming) return;
			//移动角色场景
			this.MoveAction(rightOffsetX, leftOffsetX);
		}
		//移动角色场景
		private MoveAction(rightOffsetX: number, leftOffsetX: number): void {
			var centerX = this.bg.hitArea.width / 2;
			var characterCenterX = this.character.centerPoint.x + this.character.x;
			if (characterCenterX < centerX)
				this.characterControl.CharacterMove(rightOffsetX, leftOffsetX);
			else {
				this.road.MoveRoadSignX(rightOffsetX, LoadDirection.LEFT);
				this.LogWalkDistance(rightOffsetX);
			}
		}
		private LogWalkDistance(distance: number): void {
			distance = Math.abs(distance);
			this.roadDistance += distance;
			this.walkDistance += distance;
			var metre = this.roadDistance / this.metreUnit;
			var count = (metre - this.roadMetre) / this.linesMetre;
			if (count >= 1)
				this.RoadAddLines(count);
		}

		//重置道路
		private ResetRoad(x: number): void {
			this.beginX = x;
			this.roadDistance = this.road.width - this.beginX + this.walkDistance;
			var count = this.roadDistance / this.metreUnit / this.linesMetre;
			this.road.AddSign(RoadSignType.ROADLINE, '起点', this.beginX - this.walkDistance);
			this.RoadAddLines(count);
		}
		//添加路标线
		private RoadAddLines(count: number): void {
			count = Math.floor(count);
			for (var i = 0; i < count; i++) {
				this.roadMetre += this.linesMetre;
				this.road.AddSign(RoadSignType.ROADLINE, this.roadMetre + '米', this.beginX + this.roadMetre * this.metreUnit - this.walkDistance);
			}
		}

		private GameStart(): void {
			if (this.isGaming) return;

			this.ResetConfig();
			//加入道路
			this.bg.hitArea.addChild(this.road);
			this.road.pos(0, this.bg.redLine.y - this.road.height / 2);
			//加入角色
			this.bg.hitArea.addChild(this.character);
			this.character.pos(10, this.bg.redLine.y - this.character.height);
			this.characterControl.Show();
			this.characterControl.ResetCharacter();
			//道路初始化
			this.ResetRoad(this.character.leftFootBone.endPoint.x + this.character.x);
			//监听点击事件
			this.bg.hitArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
			this.bg.hitArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
			this.bg.hitArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);//防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了

			this.isGaming = true;
			this.character.onBoneMove.args = [true];
		}

		private GameStop(): void {
			if (!this.isGaming) return;
			this.isGaming = false;
			this.character.onBoneMove.args = [false];
			//移除角色
			this.characterControl.Hide();
			this.bg.hitArea.removeChild(this.character);
			this.bg.hitArea.off(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
			this.bg.hitArea.off(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
			this.bg.hitArea.off(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);
		}
		private GameReset(): void {
			this.characterControl.ResetCharacter();
		}

		private MouseDownEvent(e: Event): void {
			this.pressTime = 0;
			Laya.timer.loop(this.pressUnitTime, this, this.LogMouseDownTime);
		}
		private MouseOutEvent(e: Event): void {
			Laya.timer.clear(this, this.LogMouseDownTime);
		}
		private MouseUpEvent(e: Event): void {
			Laya.timer.clear(this, this.LogMouseDownTime);
			var pre = this.pressTime < this.pressMaxTime ? this.pressTime / this.pressMaxTime : 1;
			this.characterControl.Wlak(pre);
		}
		private LogMouseDownTime(): void {
			this.pressTime += this.pressUnitTime;
		}

		private StageEventInit(): void {
			this.bg.btnEnter.clickHandler = Handler.create(this, function () {
				this.bg.LoadGameArea(LoadDirection.DOWN);
				this.GameStart();
			}, [], false);

			this.bg.btnRank.clickHandler = Handler.create(this, function () {
				console.log('排行榜')
			}, [], false);

			this.bg.btnBack.clickHandler = Handler.create(this, function () {
				this.GameStop();
				this.bg.LoadInitArea(LoadDirection.UP);
			}, [], false);

			this.bg.btnPause.clickHandler = Handler.create(this, function () {
				this.bg.dlgPause.popup();
			}, [], false);

			this.bg.btnPlay.clickHandler = Handler.create(this, function () {
				this.bg.dlgPause.close();
			}, [], false);

			this.bg.btnRePlay.clickHandler = Handler.create(this, function () {
				this.GameReset();
			}, [], false);
		}
	}
}