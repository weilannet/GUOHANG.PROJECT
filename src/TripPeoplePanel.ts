class TripPeoplePanel extends egret.Sprite {
    public static TRIP_PEOPLE: string = "TRIP_PEOPLE";

    public constructor() {
        super();

    }
    private bg: egret.Bitmap;// 背景
    private historyBack: egret.Bitmap;

    private stageW: number;
    private stageH: number;
    private bagBtn: egret.Bitmap;
    private xz_Sprite: egret.Sprite;
    private xz_peoplePic: egret.Bitmap;
    private xz_fontPic:egret.Bitmap;
    private xz_des:egret.Bitmap;


    private showCard: egret.Bitmap;
 

    //开启监听
    public start() {
        this.init();
        this.bagBtn.touchEnabled = true;
        this.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        

        this.historyBack.touchEnabled = true;
        this.historyBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
         
    }
    //初始化
    private init() {
        if (this.xz_Sprite) { return; }
        this.stageW = this.width;
        this.stageH = this.height;

        this.bg = new egret.Bitmap(RES.getRes('select_bg_png'));
        this.bg.width = this.stageW;
        this.bg.height = this.stageH ;
        this.addChild(this.bg);

         this.historyBack = new egret.Bitmap(RES.getRes('history_back_png'));
        // this.historyBack.width = _stageW;
        // this.historyBack.height = _stageH;
        this.historyBack.x=20;
        this.historyBack.y=20;
        this.addChild(this.historyBack);

        this.xz_Sprite = new egret.Sprite();
        //this.xz_mojieSprite.graphics.beginFill(0xffffff);
        //容器宽高为屏幕的60%
        this.xz_Sprite.graphics.drawRect(0, 0, this.stageW * 0.8, this.stageH * 0.8);
        this.xz_Sprite.graphics.endFill();
        //X居中显示
        this.xz_Sprite.x = (this.stageW - this.xz_Sprite.width) * 0.5;
        //Y居中显示
        this.xz_Sprite.y = (this.stageH - this.xz_Sprite.height) * 0.7;
        this.addChild(this.xz_Sprite);


        this.showCard = new egret.Bitmap(RES.getRes('people_bg_png'));
        // var rect:egret.Rectangle = new egret.Rectangle(50,100,this.xz_mojieSprite.width-100,this.xz_mojieSprite.height-100);
        // this.selectGo.scale9Grid =rect;
        this.showCard.width = this.xz_Sprite.width;
        this.showCard.height = this.xz_Sprite.height;
        this.xz_Sprite.addChild(this.showCard);

        this.xz_peoplePic = new egret.Bitmap(RES.getRes(Common.XZ_Name+'_people_png'));
         
        this.xz_peoplePic.x = (this.xz_Sprite.width - this.xz_peoplePic.width) * 0.5 + this.xz_peoplePic.width * 0.5;
        this.xz_peoplePic.y = this.xz_Sprite.height * 0.6 ;
        this.xz_peoplePic.anchorOffsetX = this.xz_peoplePic.width * 0.5;
        this.xz_peoplePic.anchorOffsetY = this.xz_peoplePic.height * 0.5;
        this.xz_peoplePic.scaleX = this.xz_peoplePic.scaleY = 0.9;
        this.xz_Sprite.addChild(this.xz_peoplePic);

        this.bagBtn = new egret.Bitmap(RES.getRes(Common.XZ_Name+'_bag_png'));
        //若调整了锚点，居中时需要加上锚点的距离
        this.bagBtn.x = (this.xz_Sprite.width - this.bagBtn.width) * 0.5 + this.bagBtn.width * 0.5;
        this.bagBtn.y =  this.bagBtn.height * 0.2;
        this.bagBtn.anchorOffsetX = this.bagBtn.width * 0.5;
        this.bagBtn.anchorOffsetY = this.bagBtn.height * 0.5;
        this.bagBtn.scaleX = this.bagBtn.scaleY = 0.7; 
        this.xz_Sprite.addChild(this.bagBtn);
        
        this.xz_des = new egret.Bitmap(RES.getRes('select_des_png'));
        this.xz_des.x= (this.xz_Sprite.width - this.xz_des.width) * 0.5 +this.xz_des.width * 0.5;
        this.xz_des.y= this.xz_peoplePic.y +this.xz_des.height * 0.5;
        this.xz_des.anchorOffsetX = this.xz_des.width * 0.5;
        this.xz_des.anchorOffsetY = this.xz_des.height * 0.5;
        this.xz_des.scaleX = 0.8; 
        this.xz_Sprite.addChild(this.xz_des);

        this.xz_fontPic = new egret.Bitmap(RES.getRes(Common.XZ_Name+ '_font_png'));
        this.xz_fontPic.x= this.xz_des.x+10;
        this.xz_fontPic.y= this.xz_des.y
        this.xz_fontPic.anchorOffsetX = this.xz_fontPic.width * 0.5;
        this.xz_fontPic.anchorOffsetY = this.xz_fontPic.height * 0.5;
        
        this.xz_Sprite.addChild(this.xz_fontPic);

 
    }
    
    private onTouchTab(e: egret.TouchEvent) {
       
        //取消事件监听
        this.bagBtn.touchEnabled = false;
        if (this.bagBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
         this.historyBack.touchEnabled = false;
        if (this.historyBack.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.historyBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
 
        ViewManager.getInstance().order(TripDaojuPanel.TRIP_DAOJU, this);

    }
    
     private onTouchBackTab(e: egret.TouchEvent) {

        ViewManager.getInstance().order(TripSelectPanel.TRIP_SELECT, this);
    }


    //结束界面，释放监听
    public end() {
        //将六个道具的事件监听取消
       

    }

 
}