window.addEventListener('load',function(){
    var can = document.getElementById('canvas'),
        cxt = can.getContext('2d'),
        container = document.getElementsByClassName('container')[0],
        interFace = document.getElementsByClassName('interface')[0],
        control = document.getElementsByClassName('control')[0],
        box = document.getElementsByClassName('box')[0];
    can.width = interFace.offsetWidth;
    can.height = container.offsetHeight-control.offsetHeight;

    var Game = function(){
        var _this = this,
            grade = 1, // 游戏关卡
            needles = [], // 针数组
            ballCount = 5, // 待插的针
            ball = null, // 小球
            isClick = false, // 判断点击
            isWin = false, // 判断胜利
            isEnd = false; // 判断失败
        cxt.translate(can.width/2,interFace.offsetHeight/2); // 重置中心点
        // 针
        this.Needie = function(){
            this.round_r = 8; // 针头半径
            this.rot = 0; // 旋转
            this.color = '#333'; // 针头颜色
            this.point = box.offsetHeight/2-2; // 起点
            this.end = interFace.offsetHeight/2-(this.round_r*3); // 终点
            // 更新方法
            this.update = function(){
                if (this.rot>360) this.rot=0;
                cxt.save();
                cxt.rotate(Math.PI/180*this.rot);
                cxt.fillStyle = this.color;
                cxt.strokeStyle = this.color;
                cxt.beginPath();
                cxt.moveTo(0,this.point);
                cxt.lineTo(0,this.end);
                cxt.stroke();
                cxt.beginPath();
                cxt.arc(0,this.end,this.round_r,0,Math.PI*2,false);
                cxt.fill();
                cxt.restore();
            };
        };
        // 球
        this.Ball = function(){
            this.r = 8; // 半径
            this.y = can.width-interFace.offsetHeight/2; // y坐标
            this.color = '#333'; // 颜色
            //更新方法
            this.update = function(){
                cxt.beginPath();
                this.y-=10;
                cxt.fillStyle = this.color;
                cxt.arc(0,this.y,this.r,0,Math.PI*2,false);
                cxt.fill();
            }
        };
        // 碰撞检测
        this.Testing = function(){
            needles.forEach(function(el){
                if (el.rot<12 || el.rot>348){
                    isEnd = true;
                }
            });
            if (!isEnd){
                // 没碰到 即添加一支新的针
                needles.push(new _this.Needie());
                needles[needles.length-1].update();
                isClick = false;
                ball = null;
                ballCount--;
            }
        };
        // 初始化
        this.init = function(){
            needles = [];
            for (var i=0;i<grade+2;i++){
                needles.push(new _this.Needie());
                needles[i].rot = i * (360/(grade+2));
                needles[i].update();
            }
            ballCount = 5;
        };
        this.init();
        // 更新
        this.update = function update(){
            cxt.translate(-can.width/2,-interFace.offsetHeight/2);
            cxt.clearRect(0,0,can.width,can.height);
            cxt.translate(can.width/2,interFace.offsetHeight/2);
            needles.forEach(function(el){
                if (!isWin) el.rot++;
                el.update();
            });
            if (ball !== null){
                ball.update();
                isClick = false;
                if (ball.y <= interFace.offsetHeight/2-20){
                    _this.Testing();
                }
            }
            if (isClick){
                ball = new _this.Ball();
            }
            if (ballCount===0){
                isWin = true;
                control.innerHTML = '下一关';
            }
            if (!isEnd){
                requestAnimationFrame(update);
            }else{
                ball = null;
                control.innerHTML = '重新开始';
            }
            box.innerHTML = ballCount;
        };
        control.addEventListener('click',function(){
            if (control.innerHTML === ''){
                isClick = true;
                console.log(1);
            }
            if (control.innerHTML === '开始游戏'){
                _this.update();
                control.innerHTML = '';
            }
            if (control.innerHTML === '下一关'){
               grade++;
               _this.init();
               isWin = false;
               control.innerHTML = '';
            }
            if (control.innerHTML === '重新开始'){
                isEnd = false;
                _this.init();
                _this.update();
                control.innerHTML = '';
            }
        });
    };
    new Game();
});