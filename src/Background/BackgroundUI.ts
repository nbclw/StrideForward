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
			this.size(gloablWidth, gloablHeight);

			this.btnWidth = this.width / 10;
			this.btnHeight = this.btnWidth / 2;

			this.CreateUI();
			this.addChild(this.initArea);
			this.bgStatus = BackgroundStatus.LOADING;
		}
		public btnWalk20: Button;
		public btnWalk30: Button;
		public btnWalk50: Button;
		public btnWalk100: Button;

		private btnWidth: number;
		private btnHeight: number;
		private bgStatus: BackgroundStatus;

		public initArea: Sprite;//初始化区域
		private btnEnter: Button;//进入游戏按钮，进入游戏区域
		private btnRank: Button;//查看排行按钮

		public gameArea: Sprite;//游戏区域
		private btnBack: Button;//返回按钮，进入初始化区域
		private btnPause: Button;//暂停按钮
		private btnPlay: Button;//继续按钮
		private btnRePlay: Button;//重玩按钮

		public LoadInitArea(): void {
			if (this.bgStatus == BackgroundStatus.INIT) return;
			this.RemoveAllArea();

			this.addChild(this.initArea);
		}

		public LoadGameArea(): void {
			if (this.bgStatus == BackgroundStatus.GAMING) return;
			this.RemoveAllArea();

			this.addChild(this.gameArea);
		}

		private RemoveAllArea(): void {
			for (var i = 0; i < this._childs.length; i++)
				this.removeChild(this._childs[i]);
		}

		//创建各个元素
		private CreateUI(): void {

			this.initArea = new Sprite();
			this.initArea.size(this.width, this.height);
			this.initArea.loadImage(GameGlobal.RESOURCES.IMG.INITAREA, 0, 0, this.initArea.width, this.initArea.height);

			this.btnEnter = new Button();
			this.btnEnter.size(this.btnWidth, this.btnHeight);
			this.btnEnter.pos((this.width - this.btnWidth) / 2, this.height / 2 - 2 * this.btnHeight);
			this.btnEnter.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnEnter.width, this.btnEnter.height);
			this.btnEnter.label = '开始游戏';
			this.initArea.addChild(this.btnEnter);

			this.btnRank = new Button();
			this.btnRank.size(this.btnWidth, this.btnHeight);
			this.btnRank.pos((this.width - this.btnWidth) / 2, this.height / 2);
			this.btnRank.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRank.width, this.btnRank.height);
			this.btnRank.label = '排行榜';
			this.initArea.addChild(this.btnRank);


			this.gameArea = new Sprite();
			this.gameArea.size(this.width, this.height);
			this.gameArea.loadImage(GameGlobal.RESOURCES.IMG.GAMEAREA, 0, 0, this.gameArea.width, this.gameArea.height);

			this.btnBack = new Button();
			this.btnBack.size(this.btnWidth, this.btnHeight);
			this.btnBack.pos(this.btnHeight, this.btnHeight);
			this.btnBack.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnBack.width, this.btnBack.height);
			this.btnBack.label = '返回';
			this.gameArea.addChild(this.btnBack);

			this.btnPause = new Button();
			this.btnPause.size(this.btnWidth, this.btnHeight);
			this.btnPause.pos(this.btnWidth + this.btnHeight, this.btnHeight);
			this.btnPause.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPause.width, this.btnPause.height);
			this.btnPause.label = '暂停';
			this.gameArea.addChild(this.btnPause);

			this.btnRePlay = new Button();
			this.btnRePlay.size(this.btnWidth, this.btnHeight);
			this.btnRePlay.pos(2 * (this.btnWidth + this.btnHeight), this.btnHeight);
			this.btnRePlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRePlay.width, this.btnRePlay.height);
			this.btnRePlay.label = '重玩';
			this.gameArea.addChild(this.btnRePlay);



			this.btnPlay = new Button();
			this.btnPlay.size(this.btnWidth, this.btnHeight);
			this.btnPlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPlay.width, this.btnPlay.height);
			this.btnPlay.label = '继续';
		}
	}
}