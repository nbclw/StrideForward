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
			this.SetButtonEvent();

			this.bgStatus = BackgroundStatus.LOADING;
		}
		public btnWalk20: Button;
		public btnWalk30: Button;
		public btnWalk50: Button;
		public btnWalk100: Button;

		private btnWidth: number;
		private btnHeight: number;
		private bgStatus: BackgroundStatus;
		private currArea: Sprite = null;//当前的区域

		private initArea: Sprite;//初始化区域
		private btnEnter: Button;//进入游戏按钮，进入游戏区域
		private btnRank: Button;//查看排行按钮

		private gameArea: Sprite;//游戏区域
		private btnBack: Button;//返回按钮，进入初始化区域
		private btnPause: Button;//暂停按钮
		private btnPlay: Button;//继续按钮
		private btnRePlay: Button;//重玩按钮

		public LoadInitArea(dir: LoadDirection): void {
			if (this.bgStatus == BackgroundStatus.INIT) return;
			var btns = [this.btnRank, this.btnEnter]
			this.SetButtonsDisabled(btns, true);
			this.LoadArea(this.initArea, dir, btns);
			this.bgStatus = BackgroundStatus.INIT;
		}

		public LoadGameArea(dir: LoadDirection): void {
			if (this.bgStatus == BackgroundStatus.GAMING) return;
			var btns = [this.btnBack]
			this.SetButtonsDisabled(btns, true);
			this.LoadArea(this.gameArea, dir, btns);
			this.bgStatus = BackgroundStatus.GAMING;
		}

		//区域画面的进出
		private LoadArea(area: Sprite, dir: LoadDirection, btns: Button[], banTween?: boolean): void {
			this.addChild(area);
			if (banTween) {
				if (this.currArea != null)
					this.removeChild(this.currArea);
				this.currArea = area;
				this.SetButtonsDisabled(btns, false);
			} else {
				var initX = 0, initY = 0;
				switch (dir) {
					case LoadDirection.UP:
						initY = -this.height;
						break;
					case LoadDirection.DOWN:
						initY = this.height;
						break;
					case LoadDirection.LEFT:
						initX = -this.width;
						break;
					case LoadDirection.RIGHT:
						initX = this.width;
						break;
				}
				if (initX > 0 || initY > 0) {
					area.pos(initX, initY);
					if (this.currArea != null) {
						Tween.to(this.currArea, { x: -initX, y: -initY }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
							this.removeChild(this.currArea);
						}));
					} else
						this.currArea = area;
					Tween.to(area, { x: 0, y: 0 }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
						this.currArea = area;
						this.SetButtonsDisabled(btns, false);
					}));
				} else {
					if (this.currArea != null)
						this.removeChild(this.currArea);
					this.currArea = area;
					this.SetButtonsDisabled(btns, false);
				}
			}
		}

		private SetButtonsDisabled(btns: Button[], disabled: boolean): void {
			for (var i = 0; i < btns.length; i++) btns[i].disabled = disabled;
		}

		private SetButtonEvent(): void {
			this.btnEnter.clickHandler = Handler.create(this, function () {
				this.LoadGameArea(LoadDirection.DOWN);
			}, [], false);
			this.btnRank.clickHandler = Handler.create(this, function () {
				console.log('排行榜')
			}, [], false);

			this.btnBack.clickHandler = Handler.create(this, function () {
				this.LoadInitArea(LoadDirection.UP);
			}, [], false);
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
			this.btnPause.size(2 * this.btnWidth, this.btnHeight);
			this.btnPause.pos(this.btnWidth + this.btnHeight, this.btnHeight);
			this.btnPause.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPause.width, this.btnPause.height);
			this.btnPause.label = '暂停';
			this.gameArea.addChild(this.btnPause);

			this.btnRePlay = new Button();
			this.btnRePlay.size(this.btnWidth, this.btnHeight);
			this.btnRePlay.pos(2 * (this.btnWidth + this.btnHeight) + this.btnWidth, this.btnHeight);
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