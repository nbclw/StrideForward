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

		private actionTime: number;
		private character: Character;//控制的角色
		private isReady: boolean = false;//角色是否准备好
		private isAction: boolean = false;//角色是否在运动
		private walkLeg: WalkLegEnum = WalkLegEnum.LEFT;//角色运动的腿，默认左腿
		private frameLength: number;

		private ResetConfig(): void {
			this.frameLength = 16;
			this.actionTime = 400;
			this.walkLeg = WalkLegEnum.LEFT;
		}

		//显示
		public Show(): void {
			if (this.isReady) return;

			for (var i = 0; i < this.character.characterBones.length; i++)
				this.character.addChild(this.character.characterBones[i]);

			this.ResetConfig();
			this.LoadBonesSkin(this.character.characterBones);
			this.ResetBones();
			this.isReady = true;
		}

		//重置
		public ResetCharacter(): void {
			this.isReady = false;
			this.character.ResetConfig();
			this.ResetConfig();
			this.LoadBonesSkin(this.character.characterBones);
			this.ResetBones();
			this.isReady = true;
		}

		//隐藏
		public Hide(): void {
			if (!this.isReady) return;

			for (var i = 0; i < this.character.characterBones.length; i++)
				this.character.removeChild(this.character.characterBones[i]);
			this.isReady = false;
		}

		//加载骨骼皮肤
		private LoadBonesSkin(bones: Bone[]): void {
			for (var i = 0; i < bones.length; i++)
				bones[i].loadImage(bones[i].skin, 0, 0, bones[i].boneWidth, bones[i].boneLength);
		}

		//行走
		public Wlak(pre: number): void {
			if (!this.isReady) return;
			if (this.isAction) return;
			var distance = pre * this.character.walkMaxDistance;
			if (distance == 0) return;

			this.isAction = true;
			var index = 0;
			var offset = this.character.legsInter / 2;
			distance = this.walkLeg == WalkLegEnum.LEFT ? distance : -distance;
			distance += this.character.GetDistanceByLtoR();

			var frames = this.MathRotation(distance);
			if (frames.length == 0) {
				this.isAction = false;
				return;
			}

			var tweenValue = frames[0][GameGlobal.BONE_BODY];

			Laya.timer.loop(this.actionTime / this.frameLength, this, function () {
				this.SetBones(frames[index], offset, index == (frames.length - 1));
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

		private SetBones(frame, offset, isLast): void {
			var bonesRotation = {
				[GameGlobal.BONE_BODY]: this.character.bodyBone.boneRotation + frame[GameGlobal.BONE_BODY],
				[GameGlobal.BONE_NECK]: this.character.neckBone.boneRotation + frame[GameGlobal.BONE_NECK],
				[GameGlobal.BONE_HEAD]: this.character.headBone.boneRotation + frame[GameGlobal.BONE_HEAD],
				[GameGlobal.BONE_RIGHTUPARM]: this.character.rightUpArmBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPARM],
				[GameGlobal.BONE_RIGHTDOWNARM]: this.character.rightDownArmBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNARM],
				[GameGlobal.BONE_RIGHTHAND]: this.character.rightHandBone.boneRotation + frame[GameGlobal.BONE_RIGHTHAND],
				[GameGlobal.BONE_LEFTUPARM]: this.character.leftUpArmBone.boneRotation + frame[GameGlobal.BONE_LEFTUPARM],
				[GameGlobal.BONE_LEFTDOWNARM]: this.character.leftDownArmBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNARM],
				[GameGlobal.BONE_LEFTHAND]: this.character.leftHandBone.boneRotation + frame[GameGlobal.BONE_LEFTHAND],
				[GameGlobal.BONE_RIGHTUPLEG]: this.character.rightUpLegBone.boneRotation + frame[GameGlobal.BONE_RIGHTUPLEG],
				[GameGlobal.BONE_RIGHTDOWNLEG]: this.character.rightDownLegBone.boneRotation + frame[GameGlobal.BONE_RIGHTDOWNLEG],
				[GameGlobal.BONE_RIGHTFOOT]: this.character.rightFootBone.boneRotation + frame[GameGlobal.BONE_RIGHTFOOT],
				[GameGlobal.BONE_LEFTUPLEG]: this.character.leftUpLegBone.boneRotation + frame[GameGlobal.BONE_LEFTUPLEG],
				[GameGlobal.BONE_LEFTDOWNLEG]: this.character.leftDownLegBone.boneRotation + frame[GameGlobal.BONE_LEFTDOWNLEG],
				[GameGlobal.BONE_LEFTFOOT]: this.character.leftFootBone.boneRotation + frame[GameGlobal.BONE_LEFTFOOT],
			}
			var yOffset = 0;
			if (this.walkLeg == WalkLegEnum.LEFT) {
				yOffset = this.GetCenterHeight(this.character.legRotation) - this.GetCenterHeight(this.character.legRotation + frame[GameGlobal.BONE_RIGHTUPLEG]);
				this.character.legRotation += frame[GameGlobal.BONE_RIGHTUPLEG]
			}
			else {
				this.character.legRotation -= frame[GameGlobal.BONE_LEFTUPLEG]
				yOffset = -this.GetCenterHeight(this.character.legRotation) + this.GetCenterHeight(this.character.legRotation + frame[GameGlobal.BONE_LEFTUPLEG]);
			}

			this.character.centerPoint.setTo(this.character.centerPoint.x, this.character.centerPoint.y + yOffset);
			this.character.SetBonesRotation(bonesRotation);
		}

		//获取角色中心点与脚底板的距离
		private GetCenterHeight(rotation: number): number {
			if (rotation % 90 == 0) {
				if ((rotation / 90) % 2 == 0)
					return this.character.legLength;
				else
					return 0;
			} else {
				let radian: number = rotation * GameGlobal.RAD_VALUE;
				return this.character.legLength * Math.abs(Math.cos(radian));
			}
		}

		//归位骨骼
		private ResetBones(): void {
			this.character.centerPoint.setTo(this.character.centerPoint.x, this.character.height - this.character.legHeight);
			var bonesRotation = {
				[GameGlobal.BONE_BODY]: bonesConfig[GameGlobal.BONE_BODY].Rotation,
				[GameGlobal.BONE_NECK]: bonesConfig[GameGlobal.BONE_NECK].Rotation,
				[GameGlobal.BONE_HEAD]: bonesConfig[GameGlobal.BONE_HEAD].Rotation,
				[GameGlobal.BONE_RIGHTUPARM]: bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation,
				[GameGlobal.BONE_RIGHTDOWNARM]: bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation,
				[GameGlobal.BONE_RIGHTHAND]: bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation,
				[GameGlobal.BONE_LEFTUPARM]: bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation,
				[GameGlobal.BONE_LEFTDOWNARM]: bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation,
				[GameGlobal.BONE_LEFTHAND]: bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation,
				[GameGlobal.BONE_RIGHTUPLEG]: bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.character.upLegRotationOffset,
				[GameGlobal.BONE_RIGHTDOWNLEG]: bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.character.downLegRotationOffset,
				[GameGlobal.BONE_RIGHTFOOT]: bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation,
				[GameGlobal.BONE_LEFTUPLEG]: bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.character.upLegRotationOffset,
				[GameGlobal.BONE_LEFTDOWNLEG]: bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.character.downLegRotationOffset,
				[GameGlobal.BONE_LEFTFOOT]: bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation,
			}
			this.character.SetBonesRotation(bonesRotation);
			this.character.legsRotation = 0;
		}

		//计算行走过程中的角度变化
		private MathRotation(distance: number): any {
			var frames = [];
			//计算原理是走路结束时，两腿一样的角度，一样的长
			var stageDis = distance / 2;
			var rotation = Math.asin(stageDis / this.character.legLength) / GameGlobal.RAD_VALUE;
			var changeRotation = rotation - this.character.legsRotation;
			this.character.legsRotation = rotation;

			var frameUp, frameDown, sign;
			if (this.walkLeg == WalkLegEnum.LEFT) {
				sign = 1;
				frameUp = {
					[GameGlobal.BONE_BODY]: 0,
					[GameGlobal.BONE_HEAD]: 0,
					[GameGlobal.BONE_NECK]: 0,
					[GameGlobal.BONE_RIGHTUPARM]: 0,
					[GameGlobal.BONE_RIGHTDOWNARM]: 0,
					[GameGlobal.BONE_RIGHTHAND]: 0,
					[GameGlobal.BONE_LEFTUPARM]: 0,
					[GameGlobal.BONE_LEFTDOWNARM]: 0,
					[GameGlobal.BONE_LEFTHAND]: 0,
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: 0,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation * 4 / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: changeRotation / this.frameLength,
				}
				frameDown = {
					[GameGlobal.BONE_BODY]: 0,
					[GameGlobal.BONE_HEAD]: 0,
					[GameGlobal.BONE_NECK]: 0,
					[GameGlobal.BONE_RIGHTUPARM]: 0,
					[GameGlobal.BONE_RIGHTDOWNARM]: 0,
					[GameGlobal.BONE_RIGHTHAND]: 0,
					[GameGlobal.BONE_LEFTUPARM]: 0,
					[GameGlobal.BONE_LEFTDOWNARM]: 0,
					[GameGlobal.BONE_LEFTHAND]: 0,
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: 0,
					[GameGlobal.BONE_LEFTUPLEG]: changeRotation * 2 / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation * 3 / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: -changeRotation / this.frameLength,
				}
			} else {
				sign = -1;
				frameUp = {
					[GameGlobal.BONE_BODY]: 0,
					[GameGlobal.BONE_HEAD]: 0,
					[GameGlobal.BONE_NECK]: 0,
					[GameGlobal.BONE_RIGHTUPARM]: 0,
					[GameGlobal.BONE_RIGHTDOWNARM]: 0,
					[GameGlobal.BONE_RIGHTHAND]: 0,
					[GameGlobal.BONE_LEFTUPARM]: 0,
					[GameGlobal.BONE_LEFTDOWNARM]: 0,
					[GameGlobal.BONE_LEFTHAND]: 0,
					[GameGlobal.BONE_RIGHTUPLEG]: changeRotation * 4 / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: 0,
				}
				frameDown = {
					[GameGlobal.BONE_BODY]: 0,
					[GameGlobal.BONE_HEAD]: 0,
					[GameGlobal.BONE_NECK]: 0,
					[GameGlobal.BONE_RIGHTUPARM]: 0,
					[GameGlobal.BONE_RIGHTDOWNARM]: 0,
					[GameGlobal.BONE_RIGHTHAND]: 0,
					[GameGlobal.BONE_LEFTUPARM]: 0,
					[GameGlobal.BONE_LEFTDOWNARM]: 0,
					[GameGlobal.BONE_LEFTHAND]: 0,
					[GameGlobal.BONE_RIGHTUPLEG]: -changeRotation * 2 / this.frameLength,
					[GameGlobal.BONE_RIGHTDOWNLEG]: changeRotation * 3 / this.frameLength,
					[GameGlobal.BONE_RIGHTFOOT]: changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTUPLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTDOWNLEG]: -changeRotation / this.frameLength,
					[GameGlobal.BONE_LEFTFOOT]: 0,
				}
			}
			var count = this.frameLength / 2;
			//一阶段，上升
			for (var index = 0; index < count; index++) {
				frames.push(frameUp);
				if (index == 0) {
					frames[index][GameGlobal.BONE_BODY] = -sign * changeRotation / this.frameLength;
					frames[index][GameGlobal.BONE_HEAD] = -sign * changeRotation / this.frameLength;
					frames[index][GameGlobal.BONE_NECK] = -sign * changeRotation / this.frameLength;
					frames[index][GameGlobal.BONE_RIGHTUPARM] = sign * changeRotation / this.frameLength / 4;
					frames[index][GameGlobal.BONE_RIGHTDOWNARM] = sign * changeRotation / this.frameLength / 2;
					frames[index][GameGlobal.BONE_RIGHTHAND] = sign * changeRotation / this.frameLength;
					frames[index][GameGlobal.BONE_LEFTUPARM] = sign * changeRotation / this.frameLength / 4;
					frames[index][GameGlobal.BONE_LEFTDOWNARM] = sign * changeRotation / this.frameLength / 2;
					frames[index][GameGlobal.BONE_LEFTHAND] = sign * changeRotation / this.frameLength;
				}
			}
			//二阶段，落下
			for (var index = 0; index < count; index++) {
				frames.push(frameDown);
				if (index == 0) {
					frames[count + index][GameGlobal.BONE_BODY] = sign * changeRotation / this.frameLength;
					frames[count + index][GameGlobal.BONE_HEAD] = sign * changeRotation / this.frameLength;
					frames[count + index][GameGlobal.BONE_NECK] = sign * changeRotation / this.frameLength;
					frames[count + index][GameGlobal.BONE_RIGHTUPARM] = -sign * changeRotation / this.frameLength / 4;
					frames[count + index][GameGlobal.BONE_RIGHTDOWNARM] = -sign * changeRotation / this.frameLength / 2;
					frames[count + index][GameGlobal.BONE_RIGHTHAND] = -sign * changeRotation / this.frameLength;
					frames[count + index][GameGlobal.BONE_LEFTUPARM] = -sign * changeRotation / this.frameLength / 4;
					frames[count + index][GameGlobal.BONE_LEFTDOWNARM] = -sign * changeRotation / this.frameLength / 2;
					frames[count + index][GameGlobal.BONE_LEFTHAND] = -sign * changeRotation / this.frameLength;
				}
			}

			return frames;
		}
	}
}