class TripSelectPanel extends egret.Sprite {
    public static TRIP_SELECT: string = "TRIP_SELECT";
    private loadingView: LoadingUI;

    private bg: egret.Bitmap;// 背景
    private selectGo: egret.Bitmap;//这里我们使用textfield当做按钮
    private selectAirplane: egret.Bitmap;
    private historyBack: egret.Bitmap;
    private xzSlideSp:XZSlide;

    public constructor() {
        super();

    }

    //开启监听
    public start() {
        //进行初始化
        this.init();
        this.historyBack.touchEnabled = true;
        this.historyBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);


    }
    //初始化
    private init() {

        if (this.bg) { return; }
        var _stageW = this.width;
        var _stageH = this.height;

        this.bg = new egret.Bitmap(RES.getRes('select_bg_png'));
        this.bg.width = _stageW;
        this.bg.height = _stageH;
        this.addChild(this.bg);

         this.historyBack = new egret.Bitmap(RES.getRes('history_back_png'));
        // this.historyBack.width = _stageW;
        // this.historyBack.height = _stageH;
        this.historyBack.x=20;
        this.historyBack.y=20;
        this.addChild(this.historyBack);

        this.selectAirplane = new egret.Bitmap(RES.getRes('select_airplane_png'));
        this.selectAirplane.x = _stageW;
        this.selectAirplane.y = 100;
        this.addChild(this.selectAirplane);
        egret.Tween.get(this.selectAirplane, { loop: false })
            .to({ x: (_stageW - this.selectAirplane.width) * 0.5 }, 3000);


        this.xzSlideSp = new XZSlide();
        this.xzSlideSp.width = _stageW;
        this.xzSlideSp.height = _stageH;
        this.xzSlideSp.init();
        this.addChild(this.xzSlideSp);


    }
  
     private onTouchBackTab(e: egret.TouchEvent) {
        ViewManager.getInstance().order(TripIndexPanel.TRIP_INDEX, this);
    }

    //结束界面，释放监听
    public end() {
        this.historyBack.touchEnabled = false;
        if (this.historyBack.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.historyBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
            
    }

}