/**
* UI 
*/
module BackgroundUI {
	import View = Laya.View;
	import Sprite = Laya.Sprite;
	import Button = Laya.Button;
	import Dialog = Laya.Dialog;
	export class Backgrounds extends View {
		constructor() {
			super();
			this.size(gloablWidth, gloablHeight);
			this.btnWidth = this.width / 10;
			this.btnHeight = this.btnWidth / 2;

			this.CreateUI();

			this.bgStatus = BackgroundStatus.LOADING;
		}

		private btnWidth: number;
		private btnHeight: number;
		private bgStatus: BackgroundStatus;
		private currArea: Sprite = null;//当前的区域

		private initArea: Sprite;//初始化区域
		public btnEnter: Button;//进入游戏按钮，进入游戏区域
		public btnRank: Button;//查看排行按钮

		public gameArea: Sprite;//游戏区域
		public hitArea: Sprite;//游戏点击区域
		public btnBack: Button;//返回按钮，进入初始化区域
		public btnPause: Button;//暂停按钮
		public btnRePlay: Button;//重玩按钮

		public dlgPause: Dialog;//暂停弹出框
		public btnPlay: Button;//继续按钮

		public redLine: Sprite;//角色与路面的基准线

		public scoreInfo: Sprite;//分数信息


		public LoadInitArea(dir: LoadDirection): void {
			if (this.bgStatus == BackgroundStatus.INIT) return;
			var btns = [this.btnRank, this.btnEnter]
			this.SetButtonsDisabled(btns, true);
			this.LoadArea(this.initArea, dir, btns);
			this.bgStatus = BackgroundStatus.INIT;
		}

		public LoadGameArea(dir: LoadDirection): void {
			if (this.bgStatus == BackgroundStatus.GAMING) return;
			var btns = [this.btnBack, this.btnPause, this.btnRePlay]
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
				if (initX != 0 || initY != 0) {
					area.pos(initX, initY);
					if (this.currArea != null) {
						Tween.to(this.currArea, { x: -initX, y: -initY }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
							this.removeChild(this.currArea);
							this.currArea = area;
						}));
					} else
						this.currArea = area;
					Tween.to(area, { x: 0, y: 0 }, GameGlobal.TWEENTIME, Ease['expoOut'], Handler.create(this, function () {
						this.SetButtonsDisabled(btns, false);
					}));
				} else {
					area.pos(0, 0);
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

			this.hitArea = new Sprite();
			this.hitArea.size(this.gameArea.width, this.gameArea.height - this.btnHeight);
			this.hitArea.pos(0, this.btnHeight);
			this.hitArea.loadImage(GameGlobal.RESOURCES.IMG.HITAREA, 0, 0, this.gameArea.width, this.gameArea.height - this.btnHeight);
			this.gameArea.addChild(this.hitArea);

			this.redLine = new Sprite();
			this.redLine.pos(0, this.hitArea.height * 11 / 16);
			this.redLine.graphics.drawLine(0, 0, this.hitArea.width, 0, 'red', 2);
			this.redLine.alpha = 0.3;
			this.hitArea.addChild(this.redLine);
			this.redLine.zOrder = 999;

			var txt = new Laya.Text();
			txt.text = 'score:0';
			txt.fontSize = 20;
			this.scoreInfo = new Sprite();
			this.scoreInfo.pos(this.width / 2, 0)
			this.scoreInfo.addChild(txt);
			this.hitArea.addChild(this.scoreInfo);

			this.btnBack = new Button();
			this.btnBack.size(this.btnWidth, this.btnHeight);
			this.btnBack.pos(this.btnHeight, 0);
			this.btnBack.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnBack.width, this.btnBack.height);
			this.btnBack.label = '返回';
			this.gameArea.addChild(this.btnBack);

			this.btnPause = new Button();
			this.btnPause.size(this.btnWidth, this.btnHeight);
			this.btnPause.pos(this.btnWidth + 2 * this.btnHeight, 0);
			this.btnPause.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPause.width, this.btnPause.height);
			this.btnPause.label = '暂停';
			this.gameArea.addChild(this.btnPause);

			this.btnRePlay = new Button();
			this.btnRePlay.size(this.btnWidth, this.btnHeight);
			this.btnRePlay.pos(2 * (this.btnWidth + this.btnHeight) + this.btnHeight, 0);
			this.btnRePlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnRePlay.width, this.btnRePlay.height);
			this.btnRePlay.label = '重玩';
			this.gameArea.addChild(this.btnRePlay);

			this.dlgPause = new Dialog();
			this.dlgPause.size(this.width, this.height);

			this.btnPlay = new Button();
			this.btnPlay.size(this.btnWidth, this.btnHeight);
			this.btnPlay.pos((this.dlgPause.width - this.btnPlay.width) / 2, (this.dlgPause.height - this.btnPlay.height) / 2)
			this.btnPlay.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.btnPlay.width, this.btnPlay.height);
			this.btnPlay.label = '继续';
			this.dlgPause.addChild(this.btnPlay);
		}
	}
}