// TypeScript file
var TripEndPanel = (function (_super) {
    __extends(TripEndPanel, _super);
    function TripEndPanel() {
        _super.call(this);
    }
    var d = __define,c=TripEndPanel,p=c.prototype;
    //开启监听
    p.start = function () {
        this.init();
        this.card_Sprite.touchEnabled = true;
        this.card_Sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.historyBack.touchEnabled = true;
        this.historyBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
    };
    //初始化
    p.init = function () {
        this.stageW = this.width;
        this.stageH = this.height;
        this.removeChildren();
        //daoju_Sprite
        this.card_Sprite = new egret.Sprite();
        this.card_Sprite.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.card_Sprite.graphics.endFill();
        this.addChild(this.card_Sprite);
        //加入纯黑色透明背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        shp.graphics.endFill();
        shp.width = this.stageW;
        shp.height = this.stageH;
        this.card_Sprite.addChild(shp);
        this.historyBack = new egret.Bitmap(RES.getRes('history_back_png'));
        // this.historyBack.width = _stageW;
        // this.historyBack.height = _stageH;
        this.historyBack.x = 20;
        this.historyBack.y = 20;
        this.addChild(this.historyBack);
    };
    p.onTouchTab = function (e) {
        console.log('送好友明信片');
    };
    p.onTouchBackTab = function (e) {
        ViewManager.getInstance().order(TripDaojuPanel.TRIP_DAOJU, this);
    };
    //结束界面，释放监听
    p.end = function () {
        this.card_Sprite.touchEnabled = false;
        if (this.card_Sprite.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.card_Sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.historyBack.touchEnabled = false;
        if (this.historyBack.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.historyBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
    };
    TripEndPanel.TripEnd = "TRIP_END";
    return TripEndPanel;
}(egret.Sprite));
egret.registerClass(TripEndPanel,'TripEndPanel');
