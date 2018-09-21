/**
* 游戏控制器 
*/
module GameControl {
	export class Control {
		constructor() {
			this.CreateAction();
		}
		private character: Character;
		private characterControl: CharacterCon;
		private bg: Background;
		private pressUnitTime: number = 50;//按下的单位时间，毫秒为单位
		private pressMaxTime: number = 1000;//按下的最大时间，毫秒为单位
		private pressTime: number;//按下的时间，毫秒为单位

		private CreateAction(): void {
			this.character = new Character('caster', 150, 300);
			this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);

			this.characterControl = new CharacterCon(this.character);

			this.bg = new Background();
		}

		public StageInit(): void {
			Laya.stage.addChild(this.bg);
			this.StageEventInit();
			this.bg.LoadInitArea(LoadDirection.DOWN);
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

		private GameStart(): void {
			this.bg.hitArea.addChild(this.character);
			this.character.pos(10, (this.bg.hitArea.height - this.character.height) / 2)
			this.characterControl.Show();
			this.characterControl.ResetCharacter();
			this.bg.hitArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
			this.bg.hitArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
			this.bg.hitArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);//防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了
		}
		private GameStop(): void {
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
			console.log(pre)
		}
		private LogMouseDownTime(): void {
			this.pressTime += this.pressUnitTime;
		}
	}
}