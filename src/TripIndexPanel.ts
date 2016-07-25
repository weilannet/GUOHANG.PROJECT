class TripIndexPanel extends egret.Sprite {
    public static TRIP_INDEX: string = "TRIP_INDEX";
    private bg: egret.Bitmap;// 背景
    private indexGo: egret.Bitmap;//这里我们使用textfield当做按钮
    private indexEarth: egret.Bitmap;
    private indexLogo: egret.Bitmap;
    private indexFont: egret.Bitmap;

 
    public constructor() {
        super();

    }

    //开启监听
    public start() {

        this.init();
       
        this.indexGo.touchEnabled = true;
        this.indexGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    
    }
    //初始化
    private init() {
    //    var music= new Music();
    //    music.start();

    //    Music.MUSIC_SPRITE.width= this.width;
    //    Music.MUSIC_SPRITE.height= this.height;
    //    this.addChild(Music.MUSIC_SPRITE);
       

        if (this.bg){return;}

        var _stageW = this.width;
        var _stageH = this.height;
        

        this.bg = new egret.Bitmap(RES.getRes('index_bg_png'));
        this.bg.width = _stageW;
        this.bg.height = _stageH;
        this.addChild(this.bg);

        this.indexFont = new egret.Bitmap(RES.getRes('index_font_png'));
        this.indexFont.x = (_stageW - this.indexFont.width) * 0.5;
        this.indexFont.y = _stageH*0.1;
        this.addChild(this.indexFont);


        this.indexGo = new egret.Bitmap(RES.getRes('index_go_png'));
        this.indexGo.x = (_stageW - this.indexGo.width) * 0.5;
        this.indexGo.y = (_stageH - this.indexGo.height) * 0.5 - 30;
        this.addChild(this.indexGo);
        var tw = egret.Tween.get(this.indexGo, { loop: true });
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 500).wait(100).to({ scaleX: 1, scaleY: 1 }, 500).wait(100);
       

        this.indexEarth = new egret.Bitmap(RES.getRes('index_earth_png')); 
        this.indexEarth.x = 50;
        this.indexEarth.y = _stageH; 
        this.indexEarth.anchorOffsetX = this.indexEarth.width * 0.5;
        this.indexEarth.anchorOffsetY = this.indexEarth.height * 0.5; 
        this.addChild(this.indexEarth);
        egret.Tween.get(this.indexEarth, { loop: true }).to({ rotation: 360 }, 10800);


        this.indexLogo = new egret.Bitmap(RES.getRes('index_logo_png'));
        this.indexLogo.x = (_stageW - this.indexLogo.width) * 0.5;
        this.indexLogo.y = _stageH - (this.indexLogo.height * 1.5);
        this.addChild(this.indexLogo);

      
      
        
    }
    
    private onTouchTab(e: egret.TouchEvent) {
        ViewManager.getInstance().order(TripSelectPanel.TRIP_SELECT, this);

    }


    //结束界面，释放监听
    public end() {
        this.indexGo.touchEnabled = false;
        if (this.indexGo.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.indexGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    }

}