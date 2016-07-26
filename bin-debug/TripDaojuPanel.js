var TripDaojuPanel = (function (_super) {
    __extends(TripDaojuPanel, _super);
    function TripDaojuPanel() {
        _super.call(this);
    }
    var d = __define,c=TripDaojuPanel,p=c.prototype;
    //开启监听
    p.start = function () {
        this.init();
        this.daoju1.touchEnabled = true;
        this.daoju1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju2.touchEnabled = true;
        this.daoju2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju3.touchEnabled = true;
        this.daoju3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju4.touchEnabled = true;
        this.daoju4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju5.touchEnabled = true;
        this.daoju5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju6.touchEnabled = true;
        this.daoju6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseTab, this);
    };
    //初始化
    p.init = function () {
        if (this.daoju_Sprite) {
            return;
        }
        this.stageW = this.width;
        this.stageH = this.height;
        //创建弹出层部分内容
        this.showBag();
    };
    p.showBag = function () {
        //以下为弹出层部分内容 
        this.daoju_Sprite = new egret.Sprite();
        this.daoju_Sprite.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.daoju_Sprite.graphics.endFill();
        this.addChild(this.daoju_Sprite);
        //加入纯黑色透明背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.8);
        shp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        shp.graphics.endFill();
        shp.width = this.stageW;
        shp.height = this.stageH;
        this.daoju_Sprite.addChild(shp);
        this.closeBtn = new egret.Bitmap(RES.getRes('daoju_close_png'));
        // this.historyBack.width = _stageW;
        // this.historyBack.height = _stageH;
        this.closeBtn.x = this.stageW * 0.8;
        this.closeBtn.y = 20;
        this.daoju_Sprite.addChild(this.closeBtn);
        this.daojuCenter = new egret.Bitmap(RES.getRes('daoju_bag_png'));
        //若调整了锚点，居中时需要加上锚点的距离
        this.daojuCenter.x = (this.daoju_Sprite.width - this.daojuCenter.width) * 0.5 + this.daojuCenter.width * 0.5;
        //居中的，向上提200个点
        this.daojuCenter.y = (this.daoju_Sprite.height - this.daojuCenter.height) * 0.5 + this.daojuCenter.height * 0.5;
        this.daojuCenter.anchorOffsetX = this.daojuCenter.width * 0.5;
        this.daojuCenter.anchorOffsetY = this.daojuCenter.height * 0.5;
        this.daojuCenter.scaleX = this.daojuCenter.scaleY = 0.7;
        this.daoju_Sprite.addChild(this.daojuCenter);
        var distance = 200;
        this.daoju1 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s1_png'));
        this.daoju1.x = this.daojuCenter.x;
        this.daoju1.y = this.daojuCenter.y - distance;
        this.daoju1.anchorOffsetX = this.daoju1.anchorOffsetY = this.daoju1.width * 0.5;
        this.daoju1.scaleX = this.daoju1.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju1);
        this.daoju1.touchEnabled = true;
        this.daoju1.name = this.getRandomNum();
        this.daoju2 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s2_png'));
        this.daoju2.x = this.daojuCenter.x;
        this.daoju2.y = this.daojuCenter.y + distance;
        this.daoju2.anchorOffsetX = this.daoju2.anchorOffsetY = this.daoju2.width * 0.5;
        this.daoju2.scaleX = this.daoju2.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju2);
        this.daoju2.name = this.getRandomNum();
        this.daoju3 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s3_png'));
        this.daoju3.x = this.daojuCenter.x - 150;
        this.daoju3.y = this.daojuCenter.y - distance;
        this.daoju3.anchorOffsetX = this.daoju3.anchorOffsetY = this.daoju3.width * 0.5;
        this.daoju3.scaleX = this.daoju3.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju3);
        this.daoju3.name = this.getRandomNum();
        this.daoju4 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s4_png'));
        this.daoju4.x = this.daojuCenter.x - 150;
        this.daoju4.y = this.daojuCenter.y + distance;
        this.daoju4.anchorOffsetX = this.daoju4.anchorOffsetY = this.daoju4.width * 0.5;
        this.daoju4.scaleX = this.daoju4.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju4);
        this.daoju4.name = this.getRandomNum();
        this.daoju5 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s5_png'));
        this.daoju5.x = this.daojuCenter.x + 150;
        this.daoju5.y = this.daojuCenter.y - distance;
        this.daoju5.anchorOffsetX = this.daoju5.anchorOffsetY = this.daoju5.width * 0.5;
        this.daoju5.scaleX = this.daoju5.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju5);
        this.daoju5.name = this.getRandomNum();
        this.daoju6 = new egret.Bitmap(RES.getRes(Common.XZ_Name + '_s6_png'));
        this.daoju6.x = this.daojuCenter.x + 150;
        this.daoju6.y = this.daojuCenter.y + distance;
        this.daoju6.anchorOffsetX = this.daoju6.anchorOffsetY = this.daoju6.width * 0.5;
        this.daoju6.scaleX = this.daoju6.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju6);
        this.daoju6.name = this.getRandomNum();
    };
    p.onTouchTab = function (e) {
        // //停掉动画
        // egret.Tween.pauseTweens(this.bagBtn);
        // //取消事件监听
        // this.bagBtn.touchEnabled = false;
        // if (this.bagBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
        //     this.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        // this.addChild(this.daoju_Sprite); 
    };
    p.onDaojuTouch = function (e) {
        console.log(e.target.name);
        //修改全局变量，点到1或2或3道具，加载城市图片  xz_country_1
        Common.XZ_Daoju = e.target.name;
        //将容器remove掉，加载第二个页面
        this.removeChild(this.daoju_Sprite);
        ViewManager.getInstance().order(TripEndPanel.TripEnd, this);
    };
    p.onTouchCloseTab = function (e) {
        ViewManager.getInstance().order(TripPeoplePanel.TRIP_PEOPLE, this);
    };
    //结束界面，释放监听
    p.end = function () {
        //将六个道具的事件监听取消
        this.daoju1.touchEnabled = false;
        this.daoju2.touchEnabled = false;
        this.daoju3.touchEnabled = false;
        this.daoju4.touchEnabled = false;
        this.daoju5.touchEnabled = false;
        this.daoju6.touchEnabled = false;
        this.closeBtn.touchEnabled = false;
        if (this.daoju1.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju2.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju3.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju4.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju5.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju6.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.closeBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseTab, this);
    };
    p.getRandomNum = function () {
        var _num = Math.random() * 10;
        if (_num <= 3) {
            return "1";
        }
        else if (_num <= 6) {
            return "2";
        }
        else if (_num <= 9) {
            return "3";
        }
        else {
            return "1";
        }
    };
    TripDaojuPanel.TRIP_DAOJU = "TRIP_DAOJU";
    return TripDaojuPanel;
}(egret.Sprite));
egret.registerClass(TripDaojuPanel,'TripDaojuPanel');
