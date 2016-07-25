var TripSelectPanel = (function (_super) {
    __extends(TripSelectPanel, _super);
    // private xz_mojieSprite: egret.Sprite;
    // private xz_mojiePic: egret.Bitmap;
    // private xz_tianxieSprite: egret.Sprite;
    // private xz_tianxiePic: egret.Bitmap;
    // private xz_baiyangSprite: egret.Sprite;
    // private xz_baiyangPic: egret.Bitmap;
    function TripSelectPanel() {
        _super.call(this);
    }
    var d = __define,c=TripSelectPanel,p=c.prototype;
    //开启监听
    p.start = function () {
        //进行初始化
        this.init();
        this.historyBack.touchEnabled = true;
        this.historyBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
    };
    //初始化
    p.init = function () {
        if (this.bg) {
            return;
        }
        var _stageW = this.width;
        var _stageH = this.height;
        this.bg = new egret.Bitmap(RES.getRes('select_bg_png'));
        this.bg.width = _stageW;
        this.bg.height = _stageH;
        this.addChild(this.bg);
        this.historyBack = new egret.Bitmap(RES.getRes('history_back_png'));
        // this.historyBack.width = _stageW;
        // this.historyBack.height = _stageH;
        this.historyBack.x = 20;
        this.historyBack.y = 20;
        this.addChild(this.historyBack);
        this.selectAirplane = new egret.Bitmap(RES.getRes('select_airplane_png'));
        this.selectAirplane.x = _stageW;
        this.selectAirplane.y = 100;
        this.addChild(this.selectAirplane);
        egret.Tween.get(this.selectAirplane, { loop: false })
            .to({ x: (_stageW - this.selectAirplane.width) * 0.5 }, 3000);
        var demoSp = new Demo();
        demoSp.width = _stageW;
        demoSp.height = _stageH;
        demoSp.init();
        this.addChild(demoSp);
        // //星座容器
        // this.xz_mojieSprite = new egret.Sprite();
        // //容器宽高为屏幕的60%
        // this.xz_mojieSprite.graphics.drawRect(0, 0, _stageW * 0.6, _stageH * 0.6);
        // this.xz_mojieSprite.graphics.endFill();
        // //X居中显示
        // this.xz_mojieSprite.x = (_stageW - this.xz_mojieSprite.width) * 0.5 + this.xz_mojieSprite.width * 0.5;
        // //Y居中显示，向下30像素
        // this.xz_mojieSprite.y = (_stageH - this.xz_mojieSprite.height) * 0.6 + this.xz_mojieSprite.height * 0.5;
        // this.xz_mojieSprite.anchorOffsetX = this.xz_mojieSprite.width * 0.5;
        // this.xz_mojieSprite.anchorOffsetY = this.xz_mojieSprite.height * 0.5;
        // this.addChild(this.xz_mojieSprite);
        // //星座背景图
        // this.selectGo = new egret.Bitmap(RES.getRes('select_card_png'));
        // this.selectGo.width = this.xz_mojieSprite.width;
        // this.selectGo.height = this.xz_mojieSprite.height;
        // this.xz_mojieSprite.addChild(this.selectGo);
        // //星座图标
        // this.xz_mojiePic = new egret.Bitmap(RES.getRes('select_mojie_png'));
        // this.xz_mojiePic.x = (this.xz_mojieSprite.width - this.xz_mojiePic.width) * 0.5;
        // this.xz_mojiePic.y = (this.xz_mojieSprite.height - this.xz_mojiePic.height) * 0.5;
        // this.xz_mojieSprite.addChild(this.xz_mojiePic); 
    };
    p.onTouchTab = function (e) {
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //判断点击的星座，加载不同的资源
        RES.loadGroup("xz_mojieload");
    };
    p.onTouchBackTab = function (e) {
        ViewManager.getInstance().order(TripIndexPanel.TRIP_INDEX, this);
    };
    //结束界面，释放监听
    p.end = function () {
        this.historyBack.touchEnabled = false;
        if (this.historyBack.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.historyBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackTab, this);
    };
    /**
    * preload资源组加载完成
    * Preload resource group is loaded
    */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "xz_mojieload") {
            this.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //资源加载完成后，进行跳转
            ViewManager.getInstance().order(TripSelectPanel.TRIP_SELECT, this);
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    TripSelectPanel.TRIP_SELECT = "TRIP_SELECT";
    return TripSelectPanel;
}(egret.Sprite));
egret.registerClass(TripSelectPanel,'TripSelectPanel');
