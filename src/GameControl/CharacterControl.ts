/**
* 角色操作类 
*/
module CharacterControl {
	import Sprite = Laya.Sprite;
	import Point = Laya.Point;
	export class Control {
		constructor(character: Character) {
			this.character = character;

			this.ResetConfig();
		}

		private character: Character;//控制的角色
		private isReady: boolean = false;//角色是否准备好

		//归位某些参数
		private ResetConfig(): void {

		}

		//显示
		public Show(): void {
			if (this.isReady) return;

			let childs: Sprite[] = this.character._childs
			if (childs.length == 0) {
				for (var i = 0; i < this.character.characterBones.length; i++)
					this.character.addChild(this.character.characterBones[i]);
			}
			this.ResetConfig();
			this.LoadBonesSkin(this.character.characterBones);
			this.isReady = true;
		}
		//隐藏
		public Hide(): void {
			if (!this.isReady) return;

			let childs: Sprite[] = this.character._childs
			if (childs.length > 0) {
				this.character.removeChildren(0, childs.length);
			}
			this.isReady = false;
		}
		//加载骨骼皮肤
		private LoadBonesSkin(bones: Bone[]): void {
			for (var i = 0; i < bones.length; i++)
				bones[i].loadImage(bones[i].skin, 0, 0, bones[i].boneWidth, bones[i].boneLength);
		}

		private RenderCharacter():void{

			
		}
	}
}