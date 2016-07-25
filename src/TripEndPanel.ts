// TypeScript file

 class TripEndPanel extends egret.Sprite {
    public static TripEnd: string = "TRIP_END";

    public constructor() {
        super();

    }
    private stageW: number;
    private stageH: number;
    private card_Sprite: egret.Sprite;
    


    //开启监听
    public start() {
        this.init();
        this.card_Sprite.touchEnabled = true;
        this.card_Sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
       
    }
    //初始化
    private init() {
        if (this.card_Sprite) { return; }
        this.stageW = this.width;
        this.stageH = this.height;
        //daoju_Sprite
        this.card_Sprite = new egret.Sprite();
        this.card_Sprite.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.card_Sprite.graphics.endFill();
        this.addChild(this.card_Sprite);

        //加入纯黑色透明背景
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        shp.graphics.endFill();
        shp.width = this.stageW;
        shp.height = this.stageH;
        this.card_Sprite.addChild(shp);
 

    }

    private onTouchTab(e: egret.TouchEvent) {
        console.log('送好友明信片');
        

    }
 

    //结束界面，释放监听
    public end() {
        this.card_Sprite.touchEnabled = false;
        if (this.card_Sprite.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.card_Sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.card_Sprite.touchEnabled = false;
        if (this.card_Sprite.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.card_Sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);

    }

}