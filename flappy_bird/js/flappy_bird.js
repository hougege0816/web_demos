(function(window,document){

    var flappy_bird = function(){

        var BIRDWIDTH = 45, // 小鸟宽度
            BIRDHEIGHT = 33, // 小鸟高度
            COLUMNWIDTH = 60, // 柱子宽度
            COLUMNSPACE = 0.2, // 通过高度 (按容器比例)
            COLUMNSTEP = 10, // 柱子出现的间距 (按每帧加1算)
            BIRDTOPY = 70, // 小鸟一个上升距离
            BIRDBOTTOMY = 1.5, // 小鸟每帧掉下距离
            COLUMNS = [], // 存放柱子的数组
            OIMG = {}; // 存放图片

        var score = 0; // 分数

        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        var birdX = 0, birdY = 0,
            birdState = 1;

        var isDown = false,
            isEnd = true,
            topSpeed = BIRDTOPY/10,
            topCount = 0;

        var w,h;

        var loadImg = function(callback){
            var count = 0,
                size = 0;
            OIMG.column = {
                src:"./image/column.png"
            };
            OIMG.column_reverse = {
                src:"./image/column-reverse.png"
            };

            for (var o=1;o<=3;o++){
                OIMG["bird_"+o] = {
                    src:"./image/bird-"+o+".png"
                };
            }

            for (var key in OIMG){
                if (OIMG[key]) size++;
            }
            for (var i in OIMG){
                OIMG[i].img = new Image();
                OIMG[i].img.src = OIMG[i].src;
                (function(img){
                    img.onload = function(){
                        count++;
                        if (count===size){
                            callback();
                        }
                    }
                }(OIMG[i].img));
            }

        };

        var resize = function(container){
            w = canvas.width = container.getBoundingClientRect().width;

            h = canvas.height = container.getBoundingClientRect().height;

            birdX = ~~(w*0.4);

            birdY = ~~(h*0.5);
        };

        var getScore = function(){};

        var drawBird = function(){

            var draw = function(img){
                ctx.drawImage(img,birdX,birdY,BIRDWIDTH,BIRDHEIGHT);
            };

            birdState+=0.2;
            if (birdState>=4){
                birdState=1;
            }
            draw(OIMG["bird_"+~~(birdState)].img);
        };

        function Column(){
            this.x=~~(w+1);
            this.y=~~((Math.random()*0.3+0.3)*h);
            this.speed = 1;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.isCache = false;
            this.width = this.canvas.width = COLUMNWIDTH;
            this.height = this.canvas.height = canvas.height;
            this.ctx.beginPath();
            this.ctx.drawImage(OIMG.column_reverse.img,0,this.y-h,COLUMNWIDTH,h);
            this.ctx.drawImage(OIMG.column.img,0,this.y+(COLUMNSPACE*h),COLUMNWIDTH,h);
            this.isCache=true;
        }

        Column.prototype = {
            draw : function(ctx){
                if (!this.isCache) return;
                ctx.drawImage(this.canvas,this.x,0,this.width,this.height);
            },
        };

        var end = function(){
            var _play = setInterval(function(){
                birdY+=5;
                if (birdY>h){
                    clearInterval(_play);
                    isEnd=true;
                }
            },16);
        };

        function update(){

            ctx.clearRect(0,0,w,h);

            birdY+=BIRDBOTTOMY;

            if (isDown){
                birdY-=topSpeed;
                topCount+=topSpeed;
                if (topCount===BIRDTOPY){
                    topCount=0;
                    isDown=false;
                }
            }

            COLUMNSTEP++;
            if (COLUMNSTEP>~~(Math.random()*50+200)){
                COLUMNS.push(new Column());
                COLUMNSTEP=0;
            }

            drawBird();

            COLUMNS.forEach(function(el,index){

                if (el.x < -COLUMNWIDTH){
                    COLUMNS.splice(index,1);
                }
                el.x-=el.speed;
                el.draw(ctx);

                if (el.x < birdX+BIRDWIDTH && el.x+COLUMNWIDTH > birdX){
                    if (el.y>birdY || el.y+(COLUMNSPACE*h) < birdY+BIRDHEIGHT){
                        return end();
                    }
                    return;
                }
                if (el.x+COLUMNWIDTH === birdX){
                    getScore(++score);
                }

            });

            if (birdY<=0 || birdY>h){
                return end();
            }

            if (!isEnd){
                window.requestAnimationFrame(update);
            }

        }

        var start = function(){

            loadImg(function(){
                update();
            });

            var _start = function(){
                isDown=true;
                if (isEnd){
                    isEnd=false;
                    update();
                }
            };

            document.addEventListener('keydown',function(e){
                if (e.keyCode===32){
                    _start();
                }
            });
            canvas.addEventListener('mousedown',function(){
                _start();
            });
            canvas.addEventListener('touchstart',function(){
                _start();
            });

        };

        return (function(container){

            window.addEventListener('resize',function(){
                resize(container);
            });

            resize(container);

            container.appendChild(canvas);

            return {
                start : start,
                getScore : function(callback){
                    getScore = callback;
                }
            }

        });

    };

    window.Flappy_bird = flappy_bird();

}(window,document));