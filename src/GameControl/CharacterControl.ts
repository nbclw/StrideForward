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
		private isAction: boolean = false;
		private bodyBone: Bone;

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

		//归位某些参数
		private ResetConfig(): void {

		}

		private RenderCharacter(): void {


		}










		public Wlak(): void {
			if (!this.isReady) return;
			// if (this.isAction) return;

			if (this.bodyBone == null) this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY) as Bone;
			this.isAction = true;
			let index: number = 0;
			var distance = this.character.boneLength;
			var offset = this.character.boneLength / 10;
			var frames = [
				{
					[GameGlobal.BONE_RIGHTUPLEG]: 0,
					[GameGlobal.BONE_RIGHTDOWNLEG]: 12,
					[GameGlobal.BONE_RIGHTFOOT]: -90,
					[GameGlobal.BONE_LEFTUPLEG]: -45,
					[GameGlobal.BONE_LEFTDOWNLEG]: 45,
					[GameGlobal.BONE_LEFTFOOT]: -45,
				},
				{
					[GameGlobal.BONE_RIGHTUPLEG]: 8,
					[GameGlobal.BONE_RIGHTDOWNLEG]: 20,
					[GameGlobal.BONE_RIGHTFOOT]: -70,
					[GameGlobal.BONE_LEFTUPLEG]: -45,
					[GameGlobal.BONE_LEFTDOWNLEG]: 0,
					[GameGlobal.BONE_LEFTFOOT]: -80,
				},
				{
					[GameGlobal.BONE_RIGHTUPLEG]: 20,
					[GameGlobal.BONE_RIGHTDOWNLEG]: 45,
					[GameGlobal.BONE_RIGHTFOOT]: -60,
					[GameGlobal.BONE_LEFTUPLEG]: -40,
					[GameGlobal.BONE_LEFTDOWNLEG]: -15,
					[GameGlobal.BONE_LEFTFOOT]: -115,
				}
			]

			Laya.timer.loop(1000, this, function () {
				this.Walk1(frames[index], offset);
				index++;
				if (index >= frames.length)
					Laya.timer.clearAll(this);
			});
		}
		private Walk1(frame, offset): void {
			let lastBone: Bone, currBone: Bone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - offset, this.bodyBone.beginPoint.y + offset, frame[GameGlobal.BONE_RIGHTUPLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_RIGHTDOWNLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_RIGHTFOOT]);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + offset, this.bodyBone.beginPoint.y + offset, frame[GameGlobal.BONE_LEFTUPLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_LEFTDOWNLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, frame[GameGlobal.BONE_LEFTFOOT]);
		}


		//归位骨骼
		public ResetBones(): void {
			if (this.bodyBone == null) this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY) as Bone;
			let lastBone: Bone, currBone: Bone;

			this.bodyBone.BonePosAndRotation(this.character.centerPoint.x, this.character.centerPoint.y, bonesConfig[GameGlobal.BONE_BODY].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_NECK) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_HEAD) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPARM) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.character.boneLength / 8, this.bodyBone.endPoint.y + this.character.boneLength / 5, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNARM) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTHAND) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPARM) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.character.boneLength / 8, this.bodyBone.endPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNARM) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTHAND) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.character.boneLength / 10, this.bodyBone.beginPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.character.boneLength / 10, this.bodyBone.beginPoint.y + this.character.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);
		}
	}
}