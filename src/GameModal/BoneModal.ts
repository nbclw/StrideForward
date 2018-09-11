/**
* 骨骼 
*/
module BoneModal {
	import Sprite = Laya.Sprite;
	import Point = Laya.Point;
	export class Bone extends Sprite {
		constructor(name: string, length: number, width?: number, skin?: string) {
			super();
			this.name = name;
			this.boneLength = length;
			this.boneWidth = width != undefined ? width : 5;
			if (skin != undefined)
				this.skin = skin;
			else
				this.skin = '../laya/assets/defeaultSkin.png';
		}
		public boneWidth: number;
		public boneLength: number;
		public skin: string;
		public beginPoint: Point;
		public endPoint: Point;

		public BonePosAndRotation(x: number, y: number, rotation: number): void {
			this.SetPos(x, y);
			this.SetRotation(rotation);
		}
		//设置sprite和起点位置
		private SetPos(x: number, y: number): void {
			this.pos(x, y);
			if (this.beginPoint == null)
				this.beginPoint = new Point();
			this.beginPoint.setTo(x, y);
		}
		//设置sprite轴心点、旋转角度和终点位置
		private SetRotation(rotation: number): void {
			this.rotation = rotation;
			this.SetEndPoint(rotation);
		}
		//根据起点，和长度设置终点位置
		private SetEndPoint(rotation: number): void {
			if (this.beginPoint == null) return;

			if (this.endPoint == null)
				this.endPoint = new Point();
			let rad: number = this.rotation * GameGlobal.RAD_VALUE;
			if (this.rotation % 90 == 0) {
				if ((this.rotation / 90) % 2 == 0) //偶数
					this.endPoint.setTo(this.beginPoint.x, this.beginPoint.y + Math.cos(rad) * this.boneLength);
				else //奇数
					this.endPoint.setTo(this.beginPoint.x - Math.sin(rad) * this.boneLength, this.beginPoint.y);
			} else
				this.endPoint.setTo(this.beginPoint.x - Math.sin(rad) * this.boneLength, this.beginPoint.y + Math.cos(rad) * this.boneLength);
		}
		//获取矩形区域的宽度
		public GetWidth(): number {
			if (this.rotation % 90 == 0) {
				if ((this.rotation / 90) % 2 == 0)
					return 0;
				else
					return this.boneLength;
			} else {
				let radian: number = this.rotation * 2 * Math.PI / 360;
				return this.boneLength * Math.abs(Math.sin(radian));
			}
		}
		//获取矩形区域的高度
		public GetHeight(): number {
			if (this.rotation % 90 == 0) {
				if ((this.rotation / 90) % 2 == 0)
					return this.boneLength;
				else
					return 0;
			} else {
				let radian: number = this.rotation * 2 * Math.PI / 360;
				return this.boneLength * Math.abs(Math.cos(radian));
			}
		}
	}
}