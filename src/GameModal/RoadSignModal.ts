/**
* 道路上的路标 
*/
module RoadSignModal {
	import Sprite = Laya.Sprite;
	import Text = Laya.Text;
	export class RoadSign extends Sprite {
		constructor(type: RoadSignType) {
			super();
			this.signType = type;

			this.txt = new Text();
		}
		public signType: RoadSignType;
		public txt: Text;

		public SetText(txt: string, color: string, fontSize: number): void {
			this.txt.text = txt;
			this.txt.color = color;
			this.txt.fontSize = fontSize;
		}

		public ShowText(): void {
			this.addChild(this.txt);
		}

		public HideText(): void {
			this.removeChild(this.txt)
		}
	}
}