/**
* 游戏控制器
*/
var GameControl;
(function (GameControl) {
    var Control = /** @class */ (function () {
        function Control() {
            this.linesMetre = 2; //距离标志线之间间隔几米
            this.pressUnitTime = 50; //按下的单位时间，毫秒为单位
            this.pressMaxTime = 1000; //按下的最大时间，毫秒为单位
            this.CreateAction();
        }
        Control.prototype.ResetConfig = function () {
            this.roadDistance = 0;
            this.roadMetre = 0;
            this.roadOffsetX = 0;
            this.walkDistance = 0;
            this.lastBlockX = 0;
            this.LogScore();
            this.character.pos(0, this.bg.redLine.y - this.character.height);
            this.characterControl.ResetCharacter();
            //道路初始化
            this.road.RemoveAll();
            this.ResetRoad(this.character.leftFootBone.endPoint.x + this.character.x);
        };
        Control.prototype.StageInit = function () {
            Laya.stage.addChild(this.bg);
            this.StageEventInit();
            this.bg.LoadInitArea(LoadDirection.DOWN);
        };
        //创建角色场景
        Control.prototype.CreateAction = function () {
            this.isGaming = false;
            this.bg = new Background();
            this.character = new Character('caster', 100, this.bg.hitArea.height / 2);
            this.characterControl = new CharacterCon(this.character);
            this.metreUnit = this.character.height / 2; //角色占地2m，然后计算每米所占的像素
            //this.character.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.character.width, this.character.height);
            this.character.onBoneMove = Handler.create(this, this.CharacterBoneMoveEvent, [this.isGaming], false);
            this.road = new Road(this.bg.hitArea.width, this.bg.hitArea.height / 2);
            this.road.loadImage(GameGlobal.RESOURCES.IMG.WHITE, 0, 0, this.road.width, this.road.height);
        };
        //人物骨骼变化事件
        Control.prototype.CharacterBoneMoveEvent = function (gaming, rightOffsetX, leftOffsetX) {
            if (!gaming)
                return;
            //移动角色场景
            this.MoveAction(rightOffsetX, leftOffsetX);
            //记录分分值
            this.LogScore();
        };
        //移动角色场景
        Control.prototype.MoveAction = function (rightOffsetX, leftOffsetX) {
            var centerX = this.bg.hitArea.width / 2;
            var characterCenterX = this.character.centerPoint.x + this.character.x;
            var dis = 0;
            if (rightOffsetX < 0)
                dis = rightOffsetX;
            else
                dis = leftOffsetX;
            this.walkDistance -= dis;
            if (characterCenterX < centerX)
                this.character.x -= dis;
            else {
                this.road.MoveRoadSignX(dis, LoadDirection.LEFT);
                this.LogWalkDistance(dis);
                this.RoadAddBloack();
            }
        };
        Control.prototype.LogWalkDistance = function (distance) {
            distance = Math.abs(distance);
            this.roadDistance += distance;
            this.roadOffsetX += distance;
            var metre = this.roadDistance / this.metreUnit;
            var count = (metre - this.roadMetre) / this.linesMetre;
            if (count >= 1)
                this.RoadAddLines(count);
        };
        Control.prototype.LogScore = function () {
            this.bg.scoreInfo._childs[0].changeText('score:' + this.walkDistance.toFixed(1));
        };
        //重置道路
        Control.prototype.ResetRoad = function (x) {
            this.roadBeginX = x;
            this.lastBlockX = x;
            //增加路标线
            this.roadDistance = this.road.width - this.roadBeginX + this.roadOffsetX;
            var count = this.roadDistance / this.metreUnit / this.linesMetre;
            this.road.AddSign(RoadSignType.ROADLINE, '起点', this.roadBeginX - this.roadOffsetX);
            this.RoadAddLines(count);
            //增加路障
            this.RoadAddBloack();
        };
        //添加路标线
        Control.prototype.RoadAddLines = function (count) {
            count = Math.floor(count);
            for (var i = 0; i < count; i++) {
                this.roadMetre += this.linesMetre;
                this.road.AddSign(RoadSignType.ROADLINE, this.roadMetre + '米' + this.roadMetre * this.metreUnit, this.roadBeginX + this.roadMetre * this.metreUnit - this.roadOffsetX);
            }
        };
        //增加路障
        Control.prototype.RoadAddBloack = function () {
            while ((this.roadDistance - this.lastBlockX) > this.character.legLength) {
                var offsetX = this.GetRandomInt(40, 80) * this.character.legLength * 2 / 100;
                this.lastBlockX += offsetX;
                this.road.AddSign(RoadSignType.ROADBLOCK, '', this.lastBlockX - this.roadOffsetX);
            }
        };
        //根据最大最小，获取中间随机数，不返回最大值
        Control.prototype.GetRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        Control.prototype.GameStart = function () {
            if (this.isGaming)
                return;
            //加入道路
            this.bg.hitArea.addChild(this.road);
            this.road.pos(0, this.bg.redLine.y - this.road.height / 2);
            //加入角色
            this.bg.hitArea.addChild(this.character);
            this.characterControl.Show();
            this.ResetConfig();
            //监听点击事件
            this.bg.hitArea.on(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
            this.bg.hitArea.on(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
            this.bg.hitArea.on(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent); //防止意外，按住的时候移动到别的位置，就监听不到mouseup事件了
            this.isGaming = true;
            this.character.onBoneMove.args = [true];
        };
        Control.prototype.GameStop = function () {
            if (!this.isGaming)
                return;
            this.isGaming = false;
            this.character.onBoneMove.args = [false];
            //移除角色
            this.characterControl.Hide();
            this.bg.hitArea.removeChild(this.character);
            this.bg.hitArea.off(Laya.Event.MOUSE_DOWN, this, this.MouseDownEvent);
            this.bg.hitArea.off(Laya.Event.MOUSE_UP, this, this.MouseUpEvent);
            this.bg.hitArea.off(Laya.Event.MOUSE_OUT, this, this.MouseOutEvent);
        };
        Control.prototype.GameReset = function () {
            this.isGaming = false;
            this.character.onBoneMove.args = [false];
            this.ResetConfig();
            this.isGaming = true;
            this.character.onBoneMove.args = [true];
        };
        Control.prototype.MouseDownEvent = function (e) {
            this.pressTime = 0;
            Laya.timer.loop(this.pressUnitTime, this, this.LogMouseDownTime);
        };
        Control.prototype.MouseOutEvent = function (e) {
            Laya.timer.clear(this, this.LogMouseDownTime);
        };
        Control.prototype.MouseUpEvent = function (e) {
            Laya.timer.clear(this, this.LogMouseDownTime);
            var pre = this.pressTime < this.pressMaxTime ? this.pressTime / this.pressMaxTime : 1;
            if (!this.characterControl.Wlak(pre)) {
                console.log('game over');
                this.bg.dlgOver.popup();
            }
        };
        Control.prototype.LogMouseDownTime = function () {
            this.pressTime += this.pressUnitTime;
        };
        Control.prototype.StageEventInit = function () {
            this.bg.btnEnter.clickHandler = Handler.create(this, function () {
                this.bg.LoadGameArea(LoadDirection.DOWN);
                this.GameStart();
            }, [], false);
            this.bg.btnRank.clickHandler = Handler.create(this, function () {
                console.log('排行榜');
            }, [], false);
            this.bg.btnBack.clickHandler = Handler.create(this, function () {
                this.GameStop();
                this.bg.LoadInitArea(LoadDirection.UP);
            }, [], false);
            this.bg.btnPause.clickHandler = Handler.create(this, function () {
                this.bg.dlgPause.popup();
            }, [], false);
            this.bg.btnPlay.clickHandler = Handler.create(this, function () {
                this.bg.dlgPause.close();
            }, [], false);
            this.bg.btnRePlay.clickHandler = Handler.create(this, function () {
                this.GameReset();
            }, [], false);
        };
        return Control;
    }());
    GameControl.Control = Control;
})(GameControl || (GameControl = {}));
//# sourceMappingURL=GameControl.js.map