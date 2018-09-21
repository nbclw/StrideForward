/**
* 角色类 
*/
module CharacterModal {
	import Sprite = Laya.Sprite;
	import Point = Laya.Point;
	export class Character extends Sprite {
		constructor(charName: string, width: number, height: number) {
			super();
			this.InitCharacter(charName, width, height);
		}
		public charName: string;
		public centerPoint: Point;//角色中心点，会变
		public boneLength: number;//骨骼标准长度，不会变

		public upLegRotationOffset: number = -6;//大腿的角度偏移，不会变
		public downLegRotationOffset: number = 6;//小腿的角度偏移，不会变
		public legLength: number;//腿的长度，指正常站立时的长度，因为上下腿存在角度，不会变
		public legHeight: number;//腿的高度，不会变
		public legRotation: number;//腿与水平地面的夹角，不会变
		public walkMaxDistance: number//行走时的最大步长，不会变

		public legsInter: number;//两腿间的间隔，会变
		public legsRotation: number;//两腿间的夹角，左腿在前为正，会变

		public characterBones: Bone[];
		public bodyBone: Bone;
		public neckBone: Bone;
		public headBone: Bone;
		public rightUpArmBone: Bone;
		public rightDownArmBone: Bone;
		public rightHandBone: Bone;
		public leftUpArmBone: Bone;
		public leftDownArmBone: Bone;
		public leftHandBone: Bone;
		public rightUpLegBone: Bone;
		public rightDownLegBone: Bone;
		public rightFootBone: Bone;
		public leftUpLegBone: Bone;
		public leftDownLegBone: Bone;
		public leftFootBone: Bone;

		public ResetConfig() {
			if (this.centerPoint == null || this.centerPoint == undefined)
				this.centerPoint = new Point();
			this.centerPoint.setTo(this.width / 2, this.height / 2 + this.boneLength / 10);
			this.ResetBones();
		}

		private InitCharacter(charName: string, width: number, height: number): void {
			this.charName = charName;
			this.width = width;
			this.height = height;
			this.boneLength = this.height / 4;//设置骨骼默认长度
			this.legsInter = this.boneLength / 5;//两腿间的距离

			//创建人物骨骼
			this.CreateBones();
			this.ResetConfig();
		}

		//获取左脚与右脚的横向距离差
		public GetDistanceByLtoR(): number {
			return this.leftFootBone.endPoint.x - this.rightFootBone.endPoint.x - this.legsInter;
		}
		//获取右脚与左脚的横向距离差
		public GetDistanceByRtoL(): number {
			return this.rightFootBone.endPoint.x - this.leftFootBone.endPoint.x - this.legsInter;
		}

		//新建骨骼
		private CreateBones(): void {
			this.characterBones = [];
			this.bodyBone = new Bone(GameGlobal.BONE_BODY, this.boneLength * bonesConfig[GameGlobal.BONE_BODY].Length);
			this.characterBones.push(this.bodyBone);
			this.neckBone = new Bone(GameGlobal.BONE_NECK, this.boneLength * bonesConfig[GameGlobal.BONE_NECK].Length);
			this.characterBones.push(this.neckBone);
			this.headBone = new Bone(GameGlobal.BONE_HEAD, this.boneLength * bonesConfig[GameGlobal.BONE_HEAD].Length);
			this.characterBones.push(this.headBone);
			this.rightUpArmBone = new Bone(GameGlobal.BONE_RIGHTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPARM].Length);
			this.characterBones.push(this.rightUpArmBone);
			this.rightDownArmBone = new Bone(GameGlobal.BONE_RIGHTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNARM].Length);
			this.characterBones.push(this.rightDownArmBone);
			this.rightHandBone = new Bone(GameGlobal.BONE_RIGHTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTHAND].Length);
			this.characterBones.push(this.rightHandBone);
			this.leftUpArmBone = new Bone(GameGlobal.BONE_LEFTUPARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPARM].Length);
			this.characterBones.push(this.leftUpArmBone);
			this.leftDownArmBone = new Bone(GameGlobal.BONE_LEFTDOWNARM, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNARM].Length);
			this.characterBones.push(this.leftDownArmBone);
			this.leftHandBone = new Bone(GameGlobal.BONE_LEFTHAND, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTHAND].Length);
			this.characterBones.push(this.leftHandBone);
			this.rightUpLegBone = new Bone(GameGlobal.BONE_RIGHTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Length, -84);
			this.characterBones.push(this.rightUpLegBone);
			this.rightDownLegBone = new Bone(GameGlobal.BONE_RIGHTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Length);
			this.characterBones.push(this.rightDownLegBone);
			this.rightFootBone = new Bone(GameGlobal.BONE_RIGHTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_RIGHTFOOT].Length);
			this.characterBones.push(this.rightFootBone);
			this.leftUpLegBone = new Bone(GameGlobal.BONE_LEFTUPLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTUPLEG].Length, -84);
			this.characterBones.push(this.leftUpLegBone);
			this.leftDownLegBone = new Bone(GameGlobal.BONE_LEFTDOWNLEG, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Length);
			this.characterBones.push(this.leftDownLegBone);
			this.leftFootBone = new Bone(GameGlobal.BONE_LEFTFOOT, this.boneLength * bonesConfig[GameGlobal.BONE_LEFTFOOT].Length);
			this.characterBones.push(this.leftFootBone);
		}
		//归位骨骼
		private ResetBones(): void {
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
				[GameGlobal.BONE_RIGHTUPLEG]: bonesConfig[GameGlobal.BONE_RIGHTUPLEG].Rotation + this.upLegRotationOffset,
				[GameGlobal.BONE_RIGHTDOWNLEG]: bonesConfig[GameGlobal.BONE_RIGHTDOWNLEG].Rotation + this.downLegRotationOffset,
				[GameGlobal.BONE_RIGHTFOOT]: bonesConfig[GameGlobal.BONE_RIGHTFOOT].Rotation,
				[GameGlobal.BONE_LEFTUPLEG]: bonesConfig[GameGlobal.BONE_LEFTUPLEG].Rotation + this.upLegRotationOffset,
				[GameGlobal.BONE_LEFTDOWNLEG]: bonesConfig[GameGlobal.BONE_LEFTDOWNLEG].Rotation + this.downLegRotationOffset,
				[GameGlobal.BONE_LEFTFOOT]: bonesConfig[GameGlobal.BONE_LEFTFOOT].Rotation,
			}
			this.SetBonesRotation(bonesRotation);
			this.legHeight = this.leftDownLegBone.endPoint.y - this.leftUpLegBone.beginPoint.y;
			this.legLength = Math.sqrt(Math.pow(this.leftUpLegBone.beginPoint.x - this.leftDownLegBone.endPoint.x, 2) + Math.pow(this.leftUpLegBone.beginPoint.y - this.leftDownLegBone.endPoint.y, 2));
			this.walkMaxDistance = this.legLength * 8 / 5;
			if (this.legHeight == 0)
				this.legRotation = (this.leftUpLegBone.endPoint.x - this.leftUpLegBone.beginPoint.x) > 0 ? -90 : 90;
			else
				this.legRotation = Math.acos(this.legHeight / this.legLength) / GameGlobal.RAD_VALUE;

			this.legsRotation = 0;//两腿的夹角
		}
		//设置各骨骼角度
		public SetBonesRotation(bonesRotation): void {
			this.bodyBone.BonePosAndRotation(this.centerPoint.x, this.centerPoint.y, bonesRotation[GameGlobal.BONE_BODY]);
			this.neckBone.BonePosAndRotation(this.bodyBone.endPoint.x, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_NECK]);
			this.headBone.BonePosAndRotation(this.neckBone.endPoint.x, this.neckBone.endPoint.y, bonesRotation[GameGlobal.BONE_HEAD]);
			this.rightUpArmBone.BonePosAndRotation(this.bodyBone.endPoint.x - this.boneLength / 4, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTUPARM]);
			this.rightDownArmBone.BonePosAndRotation(this.rightUpArmBone.endPoint.x, this.rightUpArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTDOWNARM]);
			this.rightHandBone.BonePosAndRotation(this.rightDownArmBone.endPoint.x, this.rightDownArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTHAND]);
			this.leftUpArmBone.BonePosAndRotation(this.bodyBone.endPoint.x + this.boneLength / 4, this.bodyBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTUPARM]);
			this.leftDownArmBone.BonePosAndRotation(this.leftUpArmBone.endPoint.x, this.leftUpArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTDOWNARM]);
			this.leftHandBone.BonePosAndRotation(this.leftDownArmBone.endPoint.x, this.leftDownArmBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTHAND]);
			this.rightUpLegBone.BonePosAndRotation(this.bodyBone.beginPoint.x - this.legsInter / 2, this.bodyBone.beginPoint.y, bonesRotation[GameGlobal.BONE_RIGHTUPLEG]);
			this.rightDownLegBone.BonePosAndRotation(this.rightUpLegBone.endPoint.x, this.rightUpLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTDOWNLEG]);
			this.rightFootBone.BonePosAndRotation(this.rightDownLegBone.endPoint.x, this.rightDownLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_RIGHTFOOT]);
			this.leftUpLegBone.BonePosAndRotation(this.bodyBone.beginPoint.x + this.legsInter / 2, this.bodyBone.beginPoint.y, bonesRotation[GameGlobal.BONE_LEFTUPLEG]);
			this.leftDownLegBone.BonePosAndRotation(this.leftUpLegBone.endPoint.x, this.leftUpLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTDOWNLEG]);
			this.leftFootBone.BonePosAndRotation(this.leftDownLegBone.endPoint.x, this.leftDownLegBone.endPoint.y, bonesRotation[GameGlobal.BONE_LEFTFOOT]);
		}
	}
}