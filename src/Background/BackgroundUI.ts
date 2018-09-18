/**
* UI 
*/
module BackgroundUI {
	import View = Laya.View;
	import Sprite = Laya.Sprite;
	import Button = Laya.Button;
	export class Backgrounds extends View {
		constructor() {
			super();
			this.gameArea = new Sprite();
			this.gameArea.width = gloablWidth;
			this.gameArea.height = gloablHeight;
			this.gameArea.loadImage('../laya/assets/gamearea.png', 0, 0, this.gameArea.width, this.gameArea.height)
			this.addChild(this.gameArea);

			this.btnWalk20 = new Button();
			this.btnWalk20.pos(0, 0);
			this.btnWalk20.label = '20';
			this.btnWalk20.loadImage('../laya/assets/white.png')
			this.addChild(this.btnWalk20);

			this.btnWalk30 = new Button();
			this.btnWalk30.pos(60, 0);
			this.btnWalk30.label = '30';
			this.btnWalk30.loadImage('../laya/assets/white.png')
			this.addChild(this.btnWalk30);

			this.btnWalk50 = new Button();
			this.btnWalk50.pos(120, 0);
			this.btnWalk50.label = '50';
			this.btnWalk50.loadImage('../laya/assets/white.png')
			this.addChild(this.btnWalk50);

			this.btnWalk100 = new Button();
			this.btnWalk100.pos(180, 0);
			this.btnWalk100.label = '100';
			this.btnWalk100.loadImage('../laya/assets/white.png')
			this.addChild(this.btnWalk100);
		}
		public btnWalk20: Button;
		public btnWalk30: Button;
		public btnWalk50: Button;
		public btnWalk100: Button;
		public gameArea: Sprite;


		
	}
}