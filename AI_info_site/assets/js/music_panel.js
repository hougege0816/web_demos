/**
 * Created by Administrator on 2018/4/23.
 */
window.AudioContext= window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

var musicPanel = (function(CONFIG){

    function Canvas(){}

    extend(Canvas,PubCanvas);

    Canvas.prototype.init = function(app){
        this.color = CONFIG.MUSIC_PANEL_CANVAS_COLOR;
        this.fWidth = CONFIG.MUSIC_PANEL_CANVAS_F_WIDTH;
        this.fHeight = CONFIG.MUSIC_PANEL_CANVAS_F_HEIGHT;
        this.app = app;
    };

    Canvas.prototype.render = function(){
            var s = this;
            var app = this.app;
            var x = 0;
            if (app.isPlaying) app.audio.analyser.getByteFrequencyData(app.audio.frequencyData);
            s.ctx.clearRect(0, 0, s.w, s.h);
            s.ctx.fillStyle = s.color;
            s.ctx.beginPath();
            for (var i = 0; i < 512; i++) {
                s.fHeight = app.audio.frequencyData[i] / 3;
                if (app.audio.frequencyData[i] > 0 && !app.isPlaying) {
                    app.audio.frequencyData[i] -= app.audio.frequencyData[i] / 20;
                }

                s.ctx.lineTo(x, s.h - s.fHeight);
                x += s.fWidth;
            }

            s.ctx.lineTo(s.w, s.h);
            s.ctx.lineTo(0, s.h);

            s.ctx.fill();
            s.ctx.closePath();
    };

    function AudioClass(){}
    AudioClass.prototype = {
        init: function() {
            this.context = new AudioContext();
            this.gainNode = null;
            this.analyser=null;
            this.bufferLength=null;
            this.frequencyData=null;
            this.bufferNode=null;
            this.bufferContainer = [];
            this.track = 0;

            this.hasMute = false;

            this.trackList = CONFIG.MUSIC_LIST;
        },

        loadTrack: function(callback) {
            var s = this;

            if (s.bufferContainer.length > 0) s.bufferContainer[0].disconnect();

            s.bufferContainer = s.bufferContainer.filter(function() {
                return false;
            });

            var bufferSource = s.context.createBufferSource();
            bufferSource.loop = true;

            s.bufferContainer.push(bufferSource);

            s.bufferNode = s.bufferContainer[0];

            s.analyser = s.context.createAnalyser();
            s.gainNode = s.context.createGain();
            s.gainNode.value = 1;

            var track = s.track;

            var request = new XMLHttpRequest();
            request.open('GET', this.trackList[track].url, true);
            request.responseType = 'arraybuffer';

            request.onload = function() {
                s.context.decodeAudioData(request.response, function(buffer) {
                    s.bufferNode.buffer = buffer;

                    s.duration = buffer.duration;
                    s.loaded = true;
                    callback();
                });
            };

            request.send();

            s.analyser.connect(s.gainNode);
            s.gainNode.connect(s.context.destination);
            s.bufferNode.start();

            s.bufferLength = s.analyser.frequencyBinCount;
            s.frequencyData = new Uint8Array(512);
        },

        play: function() {
            this.bufferNode.connect(this.analyser);
        },
        toggleMute : function(){
            this.hasMute = !this.hasMute;
            this.gainNode.gain.setValueAtTime(this.hasMute ? 0 : 1, this.context.currentTime);
            return this.hasMute;
        }
    };

    var app = {
        init: function(container,callback) {
            this.firstRender = true;
            this.firstLoad = true;
            this.firstPlay = true;
            this.isPlaying = false;
            this.canvas = new Canvas();
            this.canvas.setup(container,{
                w : CONFIG.MUSIC_PANEL_CANVAS_WIDTH,
                h : CONFIG.MUSIC_PANEL_CANVAS_HEIGHT
            });
            this.canvas.init(this);
            this.audio = new AudioClass();
            this.audio.init(this);
            this.load = this.audio.loadTrack.bind(this.audio,callback);
            this.load();

        },

        play: function(callback) {
            if (this.firstPlay && !this.firstLoad) this.load();
            if (this.firstRender) callback();
            this.audio.play();
            this.firstRender = false;
            this.firstLoad = false;
            this.firstPlay = false;
            this.isPlaying = true;
        },

        update : function(){
            this.canvas.render();
        }
    };

    return app;

})(CONFIG);