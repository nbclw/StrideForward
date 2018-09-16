/**
* 角色操作类 
*/
module CharacterControl {
	import Sprite = Laya.Sprite;
	import Point = Laya.Point;
	export class Control {
		constructor(character: Character) {
			this.character = character;
			this.frameLength = 16;

			this.ResetConfig();
		}

		private character: Character;//控制的角色
		private isReady: boolean = false;//角色是否准备好
		private isAction: boolean = false;//角色是否在运动
		private bodyBone: Bone;
		private walkLeg: WalkLegEnum = WalkLegEnum.LEFT;//角色运动的腿，默认左腿
		private frameLength:number;

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










		public Wlak(distance: number): void {
			if (!this.isReady) return;
			if (this.isAction) return;

			if (this.bodyBone == null || this.bodyBone == undefined) this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY) as Bone;
			this.isAction = true;
			let index: number = 0;
			var offset = this.character.legsInter / 2;

			distance = this.walkLeg == WalkLegEnum.LEFT ? distance : -distance;
			distance += this.character.GetDistanceByLtoR();

			var frames = this.MathRotation(distance);

			Laya.timer.loop(500 / this.frameLength, this, function () {
				this.Walk1(frames[index], offset, index == (frames.length - 1));
				index++;
				if (index >= frames.length) {
					Laya.timer.clearAll(this);
					if (this.walkLeg == WalkLegEnum.LEFT)
						this.walkLeg = WalkLegEnum.RIGHT;
					else
						this.walkLeg = WalkLegEnum.LEFT;
					this.isAction = false;
				}
			});
		}
		private MathRotation(distance: number): any {
			var frames = [];
			var stageDis = distance / 2;
			var rotation = Math.asin(stageDis / this.character.legLength) * 360 / 2 / Math.PI;
			var changeRotation = rotation - this.character.legsRotation;
			this.character.legsRotation = rotation;

			var frameUp, frameDown;
			if (this.walkLeg == WalkLegEnum.LEFT) {
				frameUp = {
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: 0,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation * 4 / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: changeRotation / this.frameLength,
				}
				frameDown = {
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: 0,
					[GameGlobal.BONE_LEFTUPLEG]: changeRotation * 2 / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation * 3 / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: -changeRotation / this.frameLength,
				}
			} else {
				frameUp = {
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation * 4 / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: 0,
				}
				frameDown = {
					[GameGlobal.BONE_RIGHTUPLEG]: -changeRotation * 2 / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation * 3 / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: 0,
				}
			}
			//一阶段，上升
			for (var index = 0; index < this.frameLength / 2; index++) {
				frames.push(frameUp);
			}
			//二阶段，落下
			for (var index = 0; index < this.frameLength / 2; index++) {
				frames.push(frameDown);
			}

			return frames;
		}
		private Walk1(frame, offset, isLast): void {
			let lastBone: Bone, currBone: Bone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - offset, this.bodyBone.beginPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNLEG]);
			var bx = currBone.endPoint.x;
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_RIGHTFOOT]);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + offset, this.bodyBone.beginPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTUPLEG]);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNLEG]);
			var ex = currBone.endPoint.x;
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, currBone.boneRotation + frame[GameGlobal.BONE_LEFTFOOT]);
		}


		//归位骨骼
		public ResetBones(): void {
			if (this.bodyBone == null || this.bodyBone == undefined) this.bodyBone = this.character.getChildByName(GameGlobal.BONE_BODY) as Bone;
			let lastBone: Bone, currBone: Bone;

			this.bodyBone.BonePosAndRotation(this.character.centerPoint.x, this.character.height - this.character.legLength, bonesConfig[GameGlobal.BONE_BODY].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_NECK) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_HEAD) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPARM) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.character.boneLength / 8, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNARM) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTHAND) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPARM) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.character.boneLength / 8, this.bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNARM) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTHAND) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);


			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.character.legsInter / 2, this.bodyBone.beginPoint.y, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.character.upLegRotationOffset);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.character.downLegRotationOffset);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_RIGHTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);

			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTUPLEG) as Bone;
			currBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.character.legsInter / 2, this.bodyBone.beginPoint.y, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.character.upLegRotationOffset);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTDOWNLEG) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.character.downLegRotationOffset);
			lastBone = currBone;
			currBone = this.character.getChildByName(GameGlobal.BONE_LEFTFOOT) as Bone;
			currBone.BonePosAndRotation(lastBone.endPoint.x, lastBone.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);


			this.character.legsRotation = 0;
		}
	}
}