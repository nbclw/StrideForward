/**
* 游戏控制器 
*/
module GameControl {
	let b = false;
	export class Control {
		constructor() {
			this.ActionInit();
		}
		private character: Character;
		private characterControl: CharacterCon;
		private bg: Background;
		private pressUnitTime: number = 100;//按下的单位时间，毫秒为单位
		private pressMaxTime: number = 4000;//按下的最大时间，毫秒为单位
		private pressTime: number;//按下的时间，毫秒为单位

		private ActionInit(): void {
			this.character = new Character('caster', 150, 300);
			this.character.CharacterPos(gloablWidth / 2, gloablHeight / 2);
			this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);

			this.characterControl = new CharacterCon(this.character);

			this.bg = new Background();
		}

		public StageInit(): void {
			Laya.stage.addChild(this.bg);
			this.bg.LoadInitArea(LoadDirection.DOWN);

			//Laya.stage.addChild(this.character);
		}

		public StageEventInit(): void {
			//Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler);
			this.bg.btnWalk20.clickHandler = Handler.create(this, this.btnClick, [0.2], false);
			this.bg.btnWalk30.clickHandler = Handler.create(this, this.btnClick, [0.3], false);
			this.bg.btnWalk50.clickHandler = Handler.create(this, this.btnClick, [0.5], false);
			this.bg.btnWalk100.clickHandler = Handler.create(this, this.btnClick, [1], false);
		}

		public GameStart(): void {
			// this.bg.gameArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
			// this.bg.gameArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
			// this.bg.gameArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);//防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了
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




		private btnClick(pre: number, e: Event): void {
			if (b) {
				this.characterControl.Wlak(pre);
			}
		}
		private rightMouseHandler(e: Event): void {
			if (b)
				this.characterControl.Hide();
			else {
				this.characterControl.Show();
				this.characterControl.ResetBones();
			}
			b = !b;
		}
	}
}