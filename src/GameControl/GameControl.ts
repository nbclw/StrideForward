/**
* 游戏控制器 
*/
module GameControl {
	let b = false;
	export class Control {
		constructor(character: Character, characterControl: CharacterCon, bg: Background) {
			this.character = character;
			this.characterControl = characterControl;
			this.bg = bg;
		}
		private character:Character;
		private characterControl:CharacterCon;
		private bg:Background;

		public StageInit():void{
			Laya.stage.addChild(this.character);
			Laya.stage.addChild(this.bg);
		}

		public StageEventInit():void{
			 Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.rightMouseHandler);
			 this.bg.btnWalk20.clickHandler = Handler.create(this,this.mouseHandler,[20],false);
			 this.bg.btnWalk30.clickHandler = Handler.create(this,this.mouseHandler,[30],false);
			 this.bg.btnWalk50.clickHandler = Handler.create(this,this.mouseHandler,[50],false);
		}

		private mouseHandler(dis: number, e: Event): void {
			if (b) {
				this.characterControl.Wlak(dis);
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