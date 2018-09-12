window.addEventListener('load',function(){
    var can = document.getElementById('canvas'),
        cxt = can.getContext('2d');
    can.width = document.body.clientWidth;
    can.height = document.body.clientHeight;


    var Game = function(){
        var _this = this;

        /*敌方爆炸小球*/
        this.Ball = function(x,y){
            this.x = x;
            this.y = y;
            this.r = 3;
            this.vx = Math.random()*-10+5;
            this.vy = Math.random()*-10+5;
            this.liftX = this.vx < 0 ? this.vx*-25 : this.vx*25;
            this.liftY = this.vy < 0 ? this.vy*-25 : this.vy*25;
            this.initX = this.x;
            this.initY = this.y;
            this.rgb = 'rgba('+~~(Math.random()*256)+','+~~(Math.random()*256)+','+~~(Math.random()*256);
            this.alpha = 1;
            this.draw = function(){
                cxt.beginPath();
                cxt.fillStyle = this.rgb+','+this.alpha+')';
                cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false);
                cxt.fill();
            };
        };
        /*玩家*/
        this.Brick = function(color){
            this.width = can.width/10;
            this.height = can.height/55;
            this.x = can.width/2-(this.width/2);
            this.y = can.height-this.height-5;
            this.vx = Math.random()>0.5 ? -2.5 : 2.5;
            this.isVx = true; //判断敌方撞到边界
            this.rgb= 'rgba(255,255,255';
            this.alpha = 1;
            this.balls = []; //敌方死亡出现的小球
            this.bullets = []; //子弹数组
            this.interval = Math.random()*50+100; //敌方发射子弹的间隔
            this.setp = Math.random()*1.5+1.5;
            this.lift = 10; //玩家生命
            /*更新方法*/
            this.updata = function(){
                cxt.beginPath();
                cxt.fillStyle = this.rgb+','+this.alpha+')';
                cxt.fillRect(this.x,this.y,this.width,this.height);
            };
            /*死亡方法*/
            this.disappear = function(){
                for (var i=0;i<50;i++){
                    this.balls.push(new _this.Ball(this.x+(this.width/2+2),this.y-5));
                    this.balls[i].draw();
                }
            }
        };

        /*子弹*/
        this.Bullet = function(x,y,color,dir){
            this.width = 5;
            this.height = 15;
            this.x = x;
            this.y = y;
            this.color = color;
            this.dir = dir; //判断是哪一方的子弹
            this.updata = function(){
                this.dir ? this.y-=10 : this.y+=10;
                if (this.dir && _this.player.bullets[_this.player.bullets.length-1].y<can.height-(_this.player.height*3)){
                    _this.isLaunchState = true;
                }
                cxt.beginPath();
                cxt.fillStyle = this.color;
                // cxt.fillRect(this.x,this.y,this.width,this.height);
                cxt.arc(this.x,this.y,this.width,0,Math.PI*2,false);
                cxt.fill();
            }
        };


        this.end = false; // 游戏结束
        this.source = 0; //分数
        this.player = new this.Brick(); //玩家
        this.player.width = can.width/20; //重设宽度
        this.enemyPlayer = []; //敌方
        this.isToLeft = false; //玩家移动方向
        this.isToRight = false;
        this.isLaunch = false; //发射
        this.isLaunchState = true; //为限制发射间隔

        /*初始化敌方*/
        for (var i=0;i<5;i++){
            var enemy = new this.Brick();
            enemy.x = Math.random()*150+(i*enemy.width*2);
            enemy.y = Math.random()*120;
            enemy.rgb = 'rgba('+~~(Math.random()*256)+','+~~(Math.random()*256)+','+~~(Math.random()*256);
            this.enemyPlayer.push(enemy);
        }

        this.judge = function(){
            if (this.isToLeft){//玩家向左移动
                if (this.player.x>=0){
                    this.player.x -= 10;
                }
            }
            else if (this.isToRight){ //玩家向右移动
                if (this.player.x+this.player.width<=can.width){
                    this.player.x += 10;
                }
            }
            if (this.isLaunch && this.isLaunchState){ //玩家发射
                var x = this.player.x+(this.player.width/2)-5,
                    y = this.player.y,
                    color = this.player.color;
                this.isLaunchState = false;
                this.player.bullets.push(new this.Bullet(x,y,color,true));
            }
            /*玩家子弹*/
            _this.player.bullets.forEach(function(el,index,arr){
                el.updata();
                _this.enemyPlayer.forEach(function(enemy,eIndex,eArr){
                    //判断杀敌
                    if (el.y < enemy.y && el.x>enemy.x && el.x<enemy.x+enemy.width){
                        _this.source += 10; //增加分数
                        enemy.disappear(); //死亡方法
                        enemy.alpha = 0; //敌方消失
                        arr.splice(index,1); //子弹消失
                    }
                    //判断玩家子弹与敌方子弹相撞
                    enemy.bullets.forEach(function(bBull,bIndex,bArr){
                        if (el.x === bBull.x && el.y === bBull.y){
                            bArr.splice(bIndex);
                            arr.splice(index,1);
                        }
                    });
                });
                //玩家子弹飞出屏幕即从子弹数组删除
                if (el.y<0){
                    arr.splice(index,1);
                }
            });
            /* 敌方 */
            _this.enemyPlayer.forEach(function(el,index,arr){
                el.isVx ? el.x+=el.vx : el.x-=el.vx; //敌方移动
                if (el.x<0 || el.x+el.width>can.width){ //撞到边界
                    el.isVx = !el.isVx;
                }
                if (el.balls.length>0){ //爆炸小球
                    el.balls.forEach(function(ball,bIndex,bArr){
                        ball.x += ball.vx;
                        ball.y += ball.vy;
                        //小球生命周期
                        if (Math.abs(ball.x-ball.initX)>ball.liftX || Math.abs(ball.y-ball.initY)>ball.liftY){
                            ball.alpha -= 0.1;
                            if (ball.alpha<0) bArr.splice(bIndex,1);
                            if (bArr.length===0){
                                arr.splice(index,1);
                            }
                        }
                        ball.draw();
                    });
                }
                //敌方发射子弹
                el.interval+=el.setp;
                if ( el.interval > 100){
                    el.interval = 0;
                    el.setp = Math.random()*1.5+1.5;
                    var x = el.x+(el.width/2)-5,
                        y = el.y,
                        color = el.color;
                    el.bullets.push(new _this.Bullet(x,y,color,false));
                }
                el.bullets.forEach(function(bull,bbIndex,bbArr){
                    bull.updata();
                    if (bull.y>can.height){ //敌方子弹飞出屏幕即删除
                        bbArr.splice(bbIndex,1);
                    }
                    //敌方子弹撞到玩家 玩家生命减一
                    if (bull.y > _this.player.y && bull.x>_this.player.x && bull.x<_this.player.x+_this.player.width){
                        bbArr.splice(bbIndex,1);
                        _this.player.lift -= 1;
                    }
                });
                el.updata();
            });
            //补充敌方
            if (_this.enemyPlayer.length<5){
                var enemy = new this.Brick();
                enemy.x = Math.random()*50+(Math.random()* 4*enemy.width*2);
                enemy.y = Math.random()*120;
                enemy.rgb = 'rgba('+~~(Math.random()*256)+','+~~(Math.random()*256)+','+~~(Math.random()*256);
                this.enemyPlayer.push(enemy);
            }
            //玩家生命变少时颜色变浅
            _this.player.alpha = _this.player.lift*0.1;
            //玩家生命耗光 游戏结束
            if (_this.player.lift===0){
                _this.end = true;
            }
        };
        //游戏更新
        this.updata = function(){
            cxt.clearRect(0,0,can.width,can.height);
            _this.judge();
            _this.player.updata();
            source.innerHTML = _this.source; //输出分数
            life.innerHTML = _this.player.lift; //输出玩家生命
            //判断游戏是否结束
            if (!_this.end){
                requestAnimationFrame(_this.updata);
            //重新开始
            }else{
                alert('Game Over！');
                game = new Game();
                game.updata();
            }
        }
    };

    var source = document.getElementsByClassName('source')[0],
        life = document.getElementsByClassName('life')[0];

    var game = new Game();
    game.updata();

    //键盘操控玩家移动方向和发射
    window.addEventListener('keydown',function(e){
        if (e.keyCode===37){
            if (!game.isToLeft) game.isToLeft = true;
        }
        if (e.keyCode===39){
            if (!game.isToRight) game.isToRight = true;
        }
        if (e.keyCode===32){
            if (!game.isLaunch) game.isLaunch = true;
        }
    });
    window.addEventListener('keyup',function(e){
        if (e.keyCode===37){
            if (game.isToLeft) game.isToLeft = false;
        }
        if (e.keyCode===39){
            if (game.isToRight) game.isToRight = false;
        }
        if (e.keyCode===32){
            if (game.isLaunch) game.isLaunch = false;
        }

    });

});