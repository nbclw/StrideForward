import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        
    }
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(600, 400, WebGL);

new GameMain();
//'portrait'
//window.innerWidth
//window.innerHeight