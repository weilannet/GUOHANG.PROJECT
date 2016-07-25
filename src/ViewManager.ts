class ViewManager extends egret.Sprite {
	   public constructor() {
        super();
        this.indexSound = RES.getRes("music_mp3");
        this.soundChannel=  this.indexSound.play(0,-1);
		this.isPlay = true;
    }

    private static instance: ViewManager;
    private tripIndexPanel: TripIndexPanel; // 首页
    private tripPeoplePanel: TripPeoplePanel; //显示星座人物
    private tripSelectPanel: TripSelectPanel; //选择星座
    private tripEndPanel: TripEndPanel; //显示卡片
    private musicPanel: egret.Sprite;
    private indexMusic: egret.Bitmap;
    private indexMusicStop: egret.Bitmap;
    private indexSound: egret.Sound;
    private soundChannel: egret.SoundChannel;
    private isPlay: boolean;

    /**
     * 这里初始化
     */
    private init() {

        this.tripIndexPanel = new TripIndexPanel();
        this.tripPeoplePanel = new TripPeoplePanel();
        this.tripSelectPanel = new TripSelectPanel(); 
        this.tripEndPanel= new TripEndPanel();


        this.tripIndexPanel.width = this.width;
        this.tripIndexPanel.height = this.height;

        this.tripPeoplePanel.width = this.width;
        this.tripPeoplePanel.height = this.height;

        this.tripSelectPanel.width = this.width;
        this.tripSelectPanel.height = this.height;

        this.tripEndPanel.width = this.width;
        this.tripEndPanel.height = this.height;

        //加入音乐部分
        this.indexMusic = new egret.Bitmap(RES.getRes('index_music_png'));
        this.indexMusic.x = this.width - this.indexMusic.width - 30;
        this.indexMusic.y = 20;
        this.indexMusic.touchEnabled = true;

        this.indexMusicStop = new egret.Bitmap(RES.getRes('index_music_stop_png'));
        this.indexMusicStop.x = this.indexMusic.x;
        this.indexMusicStop.y = 20;
        this.indexMusicStop.touchEnabled = false;

        this.musicPanel = new egret.Sprite();
        this.musicPanel.graphics.drawRect(0, 0, this.indexMusicStop.width, this.indexMusicStop.height);
        this.musicPanel.graphics.endFill();
        this.musicPanel.addChild(this.indexMusic);
        this.musicPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMusic, this);
 
        
        this.addChild(this.tripIndexPanel);
        this.addChild(this.musicPanel);
        this.tripIndexPanel.start();

    }

    private onTouchMusic(e: egret.TouchEvent) {
         
        if (this.isPlay) {
            //egret.Tween.pauseTweens(this.indexMusic);
            this.musicPanel.removeChild(this.indexMusic);
            this.musicPanel.addChild(this.indexMusicStop);
            this.indexMusicStop.touchEnabled = true;
            this.indexMusic.touchEnabled = false;
            this.soundChannel.stop();
            this.soundChannel = null;

        } else {
            // egret.Tween.resumeTweens(this.indexMusic);
            this.musicPanel.removeChild(this.indexMusicStop);
            this.musicPanel.addChild(this.indexMusic);
            this.indexMusic.touchEnabled = true;
            this.indexMusicStop.touchEnabled = false;

            if (!this.soundChannel) {
                this.soundChannel = this.indexSound.play(0, -1);
            }
        }
        this.isPlay = !this.isPlay;
    }

    public start() {

        this.init();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    //传入类型与对象
    public order(_type: any, _object: any) {
        var changeEvent: ChangeSceneEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = _type;
        changeEvent.obj = _object;
        this.dispatchEvent(changeEvent);

    }

    public static getInstance(): ViewManager {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }

        return ViewManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent) {

        e.obj.end();
        switch (e.eventType) {
            case TripIndexPanel.TRIP_INDEX:
                this.removeChildren();
                this.tripIndexPanel.start();
                this.addChild(this.tripIndexPanel);

                break;
            case TripSelectPanel.TRIP_SELECT:
             
                this.removeChildren(); 
                this.tripSelectPanel.start();
                this.addChild(this.tripSelectPanel);

                break;
            case TripPeoplePanel.TRIP_PEOPLE:
                // this.removeChildren();
                // this.tripSelectPanel.start();
                // this.addChild(this.tripSelectPanel);
                
                this.tripPeoplePanel.start();
                this.addChild(this.tripPeoplePanel);
                break;
            case TripEndPanel.TripEnd:
                this.removeChildren();
                this.tripEndPanel.start();
                this.addChild(this.tripEndPanel);

                break;
            default:
                break;
        }

        this.addChild(this.musicPanel);
 
    }
}