/**
 * Created by Administrator on 2018/4/23.
 */

var ParticleSystem = (function(CONFIG){

    var _config = {};

    // 圆形 粒子
    var Ball = (function(){

        function B(){
            var vxRange = CONFIG.PARTICLE_SYSTEM_VX_RANDOM_RANGE;
            var rRange = CONFIG.PARTICLE_SYSTEM_VX_RANDOM_RADIUS;
            var color = CONFIG.PARTICLE_SYSTEM_COLOR;
            this.r = random(rRange[0],rRange[1]);
            this.color = typeof color === "function" ? color() : color;
            this.vx = random(vxRange[0],vxRange[1]);
            this.setPos = function(){
                this.x = random(0,_config.w);
                this.y = random(0,_config.h);
                this.vx = random(vxRange[0],vxRange[1]);
                while(!this.vx){
                    this.vx = random(vxRange[0],vxRange[1]);
                }
                this.vy = 0;
            };
            this.setPos();
        }

        B.prototype = {
            draw : function(ctx){
                ctx.beginPath();
                if (this.image){
                    ctx.drawImage(this.image,this.x,this.y,this.r,this.r);
                }else{
                    ctx.fillStyle = this.color;
                    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
                }
                ctx.fill();
            },
            update : function(ctx){
                this.x += this.vx;
                this.y += this.vy;
                this.draw(ctx);
            }
        };

        return B;

    })();

    // 画布类
    var Canvas = (function(){

        function C(){}

        extend(C,PubCanvas);

        return C;

    })();


    // 初始化函数

    return (function(){

        function A(container,config){
            _config = config || {
                w : container.offsetWidth,
                h : container.offsetHeight,
                image : null,
                color: "white",
                count : CONFIG.PARTICLE_SYSTEM_COUNT,
                range : CONFIG.PARTICLE_SYSTEM_LINE_RANGE,
            };
            var s = this;
            s.count = _config.count;
            s.balls = [];
            s.canvas = new Canvas();
            s.canvas.setup(container);
            s.init();
            Q(this.canvas.canvas).on('mousemove',function(e){
                e = e || window.event;
                s.mouseX = e.offsetX;
                s.mouseY = e.offsetY;
            });
        }

        A.prototype.init = function(){

            for (var i=1;i<=this.count;i++){
                this.balls.push(new Ball(_config));
            }

        };

        A.prototype.update = function(){
            var s = this;
            var can = s.canvas;
            var ctx = s.canvas.ctx;
            ctx.clearRect(0,0,can.w,can.h);
            s.balls.forEach(function(el,i){
                if (el.x >= can.w || el.x < 0 || el.y <= 0 || el.y >= can.h){
                    el.setPos();
                }
                if (Math.sqrt(Math.pow((s.balls[i].x - s.mouseX), 2) + Math.pow((s.balls[i].y - s.mouseY), 2)) < _config.range) {
                    ctx.beginPath();
                    ctx.moveTo(s.balls[i].x, s.balls[i].y);
                    ctx.lineTo(s.mouseX, s.mouseY);
                    ctx.strokeStyle = CONFIG.PARTICLE_SYSTEM_LINE_COLOR;
                    ctx.stroke();
                }
                el.update(s.canvas.ctx);
            });
        };

        return A;

    })();

}(CONFIG));