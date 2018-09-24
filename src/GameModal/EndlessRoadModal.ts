/**
* 无尽之路 
*/
module EndlessRoadModal {
	import Sprite = Laya.Sprite;
	export class EndlessRoad extends Sprite {
		constructor(width: number, height: number) {
			super();
			this.width = width * 3 / 2;
			this.height = height;
			this.ResetConfig();
		}

		private signPools = {};//路标池，用于重复利用

		private showMinX: number;//路标显示的最小x
		private showMaxX: number;//路标显示的最大x

		private ResetConfig(): void {
			this.showMinX = -this.width / 2;
			this.showMaxX = this.width;
		}

		//移动路标
		public MoveRoadSignX(x: number, flag: LoadDirection): void {
			x = Math.abs(x);
			x = flag == LoadDirection.LEFT ? -x : x;
			//已存在的移除或者移动
			for (var i = 0; i < this._childs.length; i++) {
				if (!this.IsShowByX(this._childs[i].x)) {
					this.RemoveSign(this._childs[i]);
					i--;
					continue;
				}
				this._childs[i].x += x;
			}
		}

		//判断是否显示-根据X
		private IsShowByX(x: number): boolean {
			if (x < this.showMinX) return false;
			if (x > this.showMaxX) return false;
			return true;
		}

		//移除路标
		private RemoveSign(roadSign: RoadSign): void {
			this.removeChild(roadSign);
			if (this.signPools[roadSign.signType] == undefined || this.signPools[roadSign.signType] == null) this.signPools[roadSign.signType] = [];
			this.signPools[roadSign.signType].push(roadSign);
		}

		//移除全部
		public RemoveAll(): void {
			for (var i = 0; i < this._childs.length; i++) {
				this.RemoveSign(this._childs[i]);
				i--;
			}
		}

		//添加路标
		public AddSign(type: RoadSignType, label: string, x?: number, y?: number, lineWidth?: number, lineColor?: string): void {
			x = (x == undefined || x == null) ? 0 : x;
			if (!this.IsShowByX(x)) return;

			if (this.signPools[type] == undefined || this.signPools[type] == null) this.signPools[type] = [];

			let roadSign: RoadSign;
			if (this.signPools[type].length == 0) {
				roadSign = new RoadSign(type);
				roadSign.cacheAs = 'bitmap';
				roadSign.ShowText();
			} else {
				roadSign = this.signPools[type][this.signPools[type].length - 1];
				this.signPools[type].pop();
			}
			roadSign.x = x;
			roadSign.y = (y == undefined || y == null) ? this.height / 2 : y;

			switch (type) {
				case RoadSignType.ROADLINE:
					this.SetSign_RoadLine(roadSign, label, lineWidth, lineColor);
					break;
				default:
					this.signPools[type].push(roadSign);
					return;
			}

			this.addChild(roadSign);
		}

		private SetSign_RoadLine(roadSign: RoadSign, label: string, lineWidth?: number, lineColor?: string): void {
			roadSign.height = this.height;
			roadSign.width = (lineWidth == undefined || lineWidth == null || lineWidth <= 0) ? 2 : lineWidth;
			var color = (lineColor == undefined || lineColor == null || lineColor.length <= 0) ? '#D3D3D3' : lineColor;
			var y = roadSign.height / 2;
			roadSign.graphics.drawLine(0, -y, 0, y, color, roadSign.width);
			roadSign.skewX = GameGlobal.ROADSIGNSKEW_X;

			roadSign.SetText(label, '#D3D3D3', 20);
			roadSign.txt.pos(-roadSign.txt.text.length / 2 * 20, -y - roadSign.txt.fontSize);
		}

		private SetSign_RoadBlock():void{
			
		}
	}
}