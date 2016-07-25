/**
 * Created by maliquan on 16/7/1.
 */
class Demo extends egret.Sprite {
    public constructor() {
        super();

        this.touchChildren = false;
        this.touchEnabled = true;
    }
    private loadingView: LoadingUI;
    private spList: egret.Sprite[] = [];
    private mouseX_old: number = 0;

    private picWidth: number = 0;
    private picHeight: number = 0;
    private isMove: boolean = false;
    private sp_center_x: number = 0;
    private sp_center_y: number = 0;
    private totalCount = 0; 
    private xzPic: egret.Bitmap;
    private currentIdx: number;

    public init(): void {
        this.picWidth = this.width * 0.6;
        this.picHeight = this.height * 0.5;
        this.sp_center_x = this.width * 0.5 - this.picWidth * 0.5;
        this.sp_center_y = this.height * 0.5 - this.picHeight * 0.5 + 40;
        this.initSp();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }

    private beginHandler(e: egret.TouchEvent): void {
        this.mouseX_old = e.localX;

    }
    private touchChange(name): void {

        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //判断点击的星座，加载不同的资源
        RES.loadGroup(`xz_${name}load`);
    }

    private endHandler(e: egret.TouchEvent): void {
        if (!this.isMove) {
            var that = this;
            this.isMove = true;
            var len: number = this.spList.length;
            var distance = e.localX - this.mouseX_old;
            if (distance == 0) {

                console.log(this.spList[this.currentIdx].name);
                var _name=this.spList[this.currentIdx].name;
                //赋值全局变量 
                Common.XZ_Name=_name;
                this.touchChange(_name);
                return;
            }
            var isLeft = distance < 0;
            console.log(e.localX - this.mouseX_old);
            isLeft ? this.spList.push(this.spList.shift()) : this.spList.unshift(this.spList.pop());

            for (var i: number = 0; i < len; i++) {
                var vo: moveVo = new moveVo(i, this.picWidth, this.totalCount);
                var pic: egret.Sprite = this.spList[i];
                this.addChildAt(pic, vo.childIdx);

                egret.Tween.get(pic).to({ x: that.sp_center_x + vo.x + this.picWidth * 0.5, scaleX: vo.scale, scaleY: vo.scale, alpha: vo.alpha }, 200);

                if (vo.scale == 1.2) {

                    this.currentIdx = vo.currentIdx;
                }
            }
            if (!isLeft) {
                //修正层级
                this.addChildAt(this.spList[0], 0);
            }
            egret.Tween.get(this).to({}, 200).call(function () {
                that.isMove = false;
            }, this)
        }
    }

    private initSp(): void {
        
        var arrXZ: string[] = ["baiyang", "jinniu", "shuangzi", "juxie", "shizi", "chunv", "tianping", "tianxie", "sheshou", "mojie", "shuiping", "shuangyu"];
        this.totalCount = arrXZ.length;
        for (var i: number = 0; i < arrXZ.length; i++) {
            var spr: egret.Sprite = new egret.Sprite();

            spr.graphics.drawRect(0, 0, this.picWidth, this.picHeight);
            spr.graphics.endFill();
            spr.anchorOffsetX = this.picWidth * 0.5;
            spr.anchorOffsetY = this.picHeight * 0.5;
            spr.name = arrXZ[i];
            this.spList.push(spr);

            //星座背景图
              this.xzPic = new egret.Bitmap(RES.getRes(`select_${arrXZ[i]}_png`));
            this.xzPic.width = spr.width;
            this.xzPic.height = spr.height;
            spr.addChild(this.xzPic);

           

            var vo: moveVo = new moveVo(i, this.picWidth, this.totalCount);

            spr.x = this.sp_center_x + vo.x + this.picWidth * 0.5;
            spr.y = this.sp_center_y + this.picHeight * 0.6;
            spr.scaleX = spr.scaleY = vo.scale;
            spr.alpha = vo.alpha;
            this.addChildAt(spr, vo.childIdx);

            if (vo.scale == 1.2) {
                this.currentIdx = vo.currentIdx;
            }

        }
    }

    private end(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }
    /**
  * preload资源组加载完成
  * Preload resource group is loaded
  */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == `xz_${Common.XZ_Name}load`) {
            this.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //资源加载完成后，进行跳转
            ViewManager.getInstance().order(TripPeoplePanel.TRIP_PEOPLE, this);
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == `xz_${Common.XZ_Name}load`) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}

class moveVo {
    public x: number = 0;
    public scale: number = 1;
    public alpha: number = 1;
    public childIdx: number = 0;
    public currentIdx: number = 0;

    public constructor(i: number, w: number, total: number) {
        //var idx:number = i-3;
        var idx: number = i - Math.floor(total / 2);
        var idx_abs: number = Math.abs(idx);
        this.x = w * 0.8 * idx;
        this.scale = 1 - idx_abs * 1 / total;
        this.alpha = 0.5;
        this.childIdx = Math.floor(total / 2) - idx_abs;

        if (idx == 0) {
            this.alpha = 1;
            this.scale = 1.2;
            this.currentIdx = i;

        }
    }
}
