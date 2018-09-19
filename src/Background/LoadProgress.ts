/**
* name 
*/
module LoadProgress {
	import View = Laya.View;
	import Sprite = Laya.Sprite;
	import ProgressBar = Laya.ProgressBar;
	export class Progress extends View {
		constructor() {
			super();

			this.loadArea = new Sprite();
			this.loadArea.size(gloablWidth, gloablHeight);
			this.loadArea.loadImage(GameGlobal.RESOURCES.IMG.LOADAREA, 0, 0, this.loadArea.width, this.loadArea.height);

			this.progressBar = new ProgressBar(GameGlobal.RESOURCES.IMG.PROGRESS);
			this.progressBar.size(gloablWidth * 4 / 5, gloablWidth / 40);
			this.progressBar.pos((gloablWidth - this.progressBar.width) / 2, gloablHeight / 2);
			this.progressBar.value = 0;
			this.loadArea.addChild(this.progressBar);

			this.addChild(this.loadArea);
		}
		private loadArea: Sprite;
		public progressBar: ProgressBar;
	}
}