var Music = (function (_super) {
    __extends(Music, _super);
    //public static MUSIC_SPRITE:egret.Sprite;
    function Music() {
        _super.call(this);
        this.indexSound = RES.getRes("music_mp3");
        this.soundChannel = this.indexSound.play(0, -1);
        this.isPlay = true;
    }
    var d = __define,c=Music,p=c.prototype;
    p.start = function () {
        // if (Music.MUSIC_SPRITE){
        //     return;
        // }
        this.indexMusic = new egret.Bitmap(RES.getRes('index_music_png'));
        this.indexMusic.x = this.width - this.indexMusic.width - 30;
        this.indexMusic.y = 20;
        this.indexMusic.touchEnabled = true;
        // this.indexMusic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMusic, this);
        this.indexMusicStop = new egret.Bitmap(RES.getRes('index_music_stop_png'));
        this.indexMusicStop.x = this.width - this.indexMusic.width - 30;
        this.indexMusicStop.y = 20;
        this.indexMusicStop.touchEnabled = false;
        // this.indexMusicStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMusic, this);
    };
    p.onTouchMusic = function (e) {
        //   Music.MUSIC_SPRITE = new egret.Sprite();
        //   Music.MUSIC_SPRITE.graphics.drawRect(0, 0, this.width, this.height);
        //   Music.MUSIC_SPRITE.graphics.endFill();
        if (this.isPlay) {
            //egret.Tween.pauseTweens(this.indexMusic);
            this.removeChild(this.indexMusic);
            this.addChild(this.indexMusicStop);
            this.indexMusicStop.touchEnabled = true;
            this.indexMusic.touchEnabled = false;
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        else {
            // egret.Tween.resumeTweens(this.indexMusic);
            this.removeChild(this.indexMusicStop);
            this.addChild(this.indexMusic);
            this.indexMusic.touchEnabled = true;
            this.indexMusicStop.touchEnabled = false;
            if (!this.soundChannel) {
                this.soundChannel = this.indexSound.play(0, -1);
            }
        }
        this.isPlay = !this.isPlay;
    };
    return Music;
}(egret.Sprite));
egret.registerClass(Music,'Music');
