/**
* 角色类 
*/
module CharacterModal {
	import Sprite = Laya.Sprite;
	import Point = Laya.Point;
	export class Character extends Sprite {
		constructor(charName: string, width: number, height: number, actionTime?: number) {
			super();
			this.InitCharacter(charName, width, height, actionTime);
		}
		private actionTime: number;
		public centerPoint: Point;//角色中心点

		public charName: string;
		//骨骼标准长度
		public boneLength: number;

		public characterBones: Bone[];

		private InitCharacter(charName: string, width: number, height: number, actionTime?: number): void {
			this.charName = charName;
			this.actionTime = actionTime > 0 ? actionTime : 1000;
			this.width = width;
			this.height = height;
			this.characterBones = [];
			this.boneLength = this.height / 4;//设置骨骼默认长度，约为角色本身长度的四分之一
			if (this.centerPoint == null)
				this.centerPoint = new Point();
			this.centerPoint.setTo(this.width / 2, this.height / 2 + this.boneLength / 10);
			//创建人物骨骼
			this.CreateBones();
		}

		//定位角色
		public CharacterPos(x: number, y: number): void {
			this.pos(x - this.width / 2, y - this.height / 2);
		}

		private CreateBones(): void {
			if (this.characterBones.length > 0) return;

			let bodyBone: Bone = new Bone(GameGlobal.BONE_BODY, this.boneLength * bonesConfig[GameGlobal.BONE_BODY].Length)
			bodyBone.BonePosAndRotation(this.centerPoint.x, this.centerPoint.y, bonesConfig[GameGlobal.BONE_BODY].Rotation);
			this.characterBones.push(bodyBone);

			let neckBone: Bone = new Bone(GameGlobal.BONE_NECK, this.boneLength * bonesConfig[GameGlobal.BONE_NECK].Length)
			neckBone.BonePosAndRotation(bodyBone.endPoint.x, bodyBone.endPoint.y, bonesConfig[GameGlobal.BONE_NECK].Rotation);
			this.characterBones.push(neckBone);

			let headBone: Bone = new Bone(GameGlobal.BONE_HEAD, this.boneLength * bonesConfig[GameGlobal.BONE_HEAD].Length)
			headBone.BonePosAndRotation(neckBone.endPoint.x, neckBone.endPoint.y, bonesConfig[GameGlobal.BONE_HEAD].Rotation);
			this.characterBones.push(headBone);

			let rightUpArm: Bone = new Bone(GameGlobal.BONE_RIGHTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPARM].Length)
			rightUpArm.BonePosAndRotation(bodyBone.endPoint.x - this.boneLength / 8, bodyBone.endPoint.y + this.boneLength / 5, bonesConfig[GameGlobal.BONE_RIGHTUPARM].Rotation);
			this.characterBones.push(rightUpArm);

			let rightDownArm: Bone = new Bone(GameGlobal.BONE_RIGHTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Length)
			rightDownArm.BonePosAndRotation(rightUpArm.endPoint.x, rightUpArm.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Rotation);
			this.characterBones.push(rightDownArm);

			let rightHand: Bone = new Bone(GameGlobal.BONE_RIGHTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTHAND].Length)
			rightHand.BonePosAndRotation(rightDownArm.endPoint.x, rightDownArm.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTHAND].Rotation);
			this.characterBones.push(rightHand);

			let leftUpArm: Bone = new Bone(GameGlobal.BONE_LEFTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPARM].Length)
			leftUpArm.BonePosAndRotation(bodyBone.endPoint.x + this.boneLength / 8, bodyBone.endPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPARM].Rotation);
			this.characterBones.push(leftUpArm);

			let leftDownArm: Bone = new Bone(GameGlobal.BONE_LEFTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Length)
			leftDownArm.BonePosAndRotation(leftUpArm.endPoint.x, leftUpArm.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Rotation);
			this.characterBones.push(leftDownArm);

			let leftHand: Bone = new Bone(GameGlobal.BONE_LEFTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTHAND].Length)
			leftHand.BonePosAndRotation(leftDownArm.endPoint.x, leftDownArm.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTHAND].Rotation);
			this.characterBones.push(leftHand);

			let rightUpLeg: Bone = new Bone(GameGlobal.BONE_RIGHTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Length)
			rightUpLeg.BonePosAndRotation(bodyBone.beginPoint.x - this.boneLength / 10, bodyBone.beginPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation);
			this.characterBones.push(rightUpLeg);

			let rightDownLeg: Bone = new Bone(GameGlobal.BONE_RIGHTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Length)
			rightDownLeg.BonePosAndRotation(rightUpLeg.endPoint.x, rightUpLeg.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation);
			this.characterBones.push(rightDownLeg);

			let rightFoot: Bone = new Bone(GameGlobal.BONE_RIGHTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTFOOT].Length)
			rightFoot.BonePosAndRotation(rightDownLeg.endPoint.x, rightDownLeg.endPoint.y, bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation);
			this.characterBones.push(rightFoot);


			let leftUpLeg: Bone = new Bone(GameGlobal.BONE_LEFTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPLEG].Length)
			leftUpLeg.BonePosAndRotation(bodyBone.beginPoint.x + this.boneLength / 10, bodyBone.beginPoint.y + this.boneLength / 10, bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation);
			this.characterBones.push(leftUpLeg);

			let leftDownLeg: Bone = new Bone(GameGlobal.BONE_LEFTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Length)
			leftDownLeg.BonePosAndRotation(leftUpLeg.endPoint.x, leftUpLeg.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation);
			this.characterBones.push(leftDownLeg);

			let leftFoot: Bone = new Bone(GameGlobal.BONE_LEFTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTFOOT].Length)
			leftFoot.BonePosAndRotation(leftDownLeg.endPoint.x, leftDownLeg.endPoint.y, bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation);
			this.characterBones.push(leftFoot);
		}
	}
}