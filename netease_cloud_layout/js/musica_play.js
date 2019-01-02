window.addEventListener('load',function(){
    NeteaseCloud.player = {
        playMusic : function(){
            var audio = new Audio(),
                musicPrigress = new NeteaseCloud.player.ProgressBar('music_progressBar'),
                controlBtn = document.querySelectorAll('.control_bottom span'),
                currentTime = document.getElementsByClassName('currentTime')[0],
                endTime = document.getElementsByClassName('endTime')[0],
                albumPic = document.getElementsByClassName('albumPic')[0],
                _this = this;
            this.setUrl = function(src){
                audio.src = src;
            };
            this.setTime = function(time,state){
                time && (audio.currentTime = audio.duration*time);
                currentTime.innerHTML = changeTime(audio.currentTime);
                endTime.innerHTML = changeTime(audio.duration);
                if(!state) musicPrigress.set(audio.currentTime/audio.duration);
            };
            this.setUrl('music/1.mp3');
            this.play = 0;
            function startPlay(){
                _this.play = setInterval(function(){
                    _this.setTime();
                },1000);
            }
            setTimeout(function(){
                _this.setTime();
            },300);

            function changeTime(time){
                var m = (Number.parseInt(time)/60).toFixed(0),
                    s = Number.parseInt(time)%60;
                return (m<10?'0'+m:m)+':'+(s<10?'0'+s:s);
            }

            controlBtn[2].addEventListener('click',function(){
                if (audio.paused){
                    controlBtn[2].innerHTML = '暂停';
                    audio.play();
                    startPlay();
                }else{
                    controlBtn[2].innerHTML = '播放';
                    audio.pause();
                    clearInterval(_this.play);
                }
            });
        },
        ProgressBar : function(elem){
            var progressBar = document.getElementById(elem),
                already = document.createElement('div'),
                radius = document.createElement('div'),
                touch_down = false,
                mouse_down = false;

            already.appendChild(radius);
            progressBar.appendChild(already);
            progressBar.className += ' progressBar';
            already.className += ' already';
            radius.className += ' radius';

            this.set = function(v){
                if (v<0) v=0;
                if (v>1) v=1;
                this.progress = v;
                already.style.width = this.progress*100+'%';
            };
            this.get = function(){
                return this.progress;
            };
            var self = this;
            progressBar.addEventListener('click',function(e){
                var progressBarLeft = progressBar.offsetLeft,
                    progressBarWidth = progressBar.offsetWidth;
                self.set(((e.clientX - progressBarLeft)/progressBarWidth).toFixed(2));
                clearInterval(NeteaseCloud.nplayer.play);
                NeteaseCloud.nplayer.setTime(self.get(),true);
            });
            radius.addEventListener('touchstart',function(e){
                touch_down = true;
            });
            document.addEventListener('touchmove',function(e){
                if (!touch_down) return;
                var progressBarLeft = progressBar.offsetLeft,
                    progressBarWidth = progressBar.offsetWidth;
                self.set(((e.touches[0].pageX - progressBarLeft)/progressBarWidth).toFixed(2));
                clearInterval(NeteaseCloud.nplayer.play);
                NeteaseCloud.nplayer.setTime(self.get(),true);
            });
            document.addEventListener('touchend',function(e){
                touch_down = false;
            });
            radius.addEventListener('mousedown',function(e){
                mouse_down = true;
            });
            document.addEventListener('mousemove',function(e){
                if (!mouse_down) return;
                var progressBarLeft = progressBar.offsetLeft,
                    progressBarWidth = progressBar.offsetWidth;
                self.set(((e.clientX - progressBarLeft)/progressBarWidth).toFixed(2));
                clearInterval(NeteaseCloud.nplayer.play);
                NeteaseCloud.nplayer.setTime(self.get(),true);
            });
            document.addEventListener('mouseup',function(){
                mouse_down = false;
            });

        }
    };
    NeteaseCloud.nplayer =  new NeteaseCloud.player.playMusic();
});
