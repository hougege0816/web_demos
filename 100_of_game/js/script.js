window.addEventListener('load',function(){
    document.addEventListener('contextmenu',function(e){
        e.preventDefault();
    });
    document.addEventListener('touchstart',function(e){
        e.preventDefault();
    });
    var Game = function(){
        var _this = this,
            wrap = document.getElementsByClassName('wrap')[0],
            header = document.getElementsByClassName('header')[0],
            pop = document.getElementsByClassName('pop')[0],
            bridge = document.getElementsByClassName('bridge')[0],
            character = document.getElementsByClassName('character')[0],
            height, source, isEnd, isDown, isUp, isHeight;
        this.init = function(){
            height = 0;
            source = 0;
            isEnd = false;
            isDown = false;
            isUp = false;
            isHeight = false;
            wrap.innerHTML = '';
            character.style.left = '20vw';
            character.style.bottom = '30vh';
            bridge.style.left = '30vw';
            bridge.style.width = 0;
            bridge.style.transform = 'rotate(-90deg)';
            header.innerHTML = source;
            pop.getElementsByTagName('span')[0].innerHTML = source;
            for (var i=0;i<Math.random()*10+100;i++){
                var box = document.createElement('div'),
                    width = Math.random()*10+5,
                    mRight  = Math.random()*20+10;
                if (i===0) width = 30;
                box.setAttribute('info',width+mRight+'vw');
                box.style.width = width + 'vw';
                box.style.marginRight = mRight + 'vw';
                wrap.appendChild(box);
                wrap.getElementsByTagName('div')[0].className = 'current';
                wrap.getElementsByTagName('div')[0].className = 'current';
            }
        };
        this.init();
        this.update = function(){
            var aBox = wrap.getElementsByTagName('div'),
                boxW = parseFloat(getComputedStyle(aBox[0],null).width),
                boxR = parseFloat(getComputedStyle(aBox[0],null).marginRight),
                twoBoxW = parseFloat(getComputedStyle(aBox[1],null).width);
            wrap.addEventListener('mousedown',function(){
                isDown = true;
            });
            wrap.addEventListener('mouseup',function(){
                isDown = false;
                isUp = true;
            });
            wrap.addEventListener('touchstart',function(){
                isDown = true;
            });
            wrap.addEventListener('touchend',function(){
                isDown = false;
                isUp = true;
            });
            if (isDown){
                if (!isHeight){
                    height+=0.2;
                    if (height>45) isHeight = true;
                }
                if (isHeight){
                    height-=0.2;
                    if (height<0) isHeight = false;
                }
                bridge.style.left = boxW + 'px';
                bridge.style.width = height + 'vw';
            }
            if (isUp){
                var bridgeLeft = bridge.offsetLeft + bridge.offsetWidth;
                bridge.style.transform = 'rotate(0deg)';
                setTimeout(function(){
                    character.src = 'image/stick.gif';
                    character.style.left = bridgeLeft - character.offsetWidth +'px';
                },800);
                setTimeout(function(){
                    character.src = 'image/stick_stand.png';
                    if (bridgeLeft<boxW+boxR || bridgeLeft > boxW+boxR+twoBoxW ){
                        bridge.style.transform = 'rotate(90deg)';
                        character.style.bottom = '-15%';
                        pop.style.visibility = 'visible';
                        isEnd = true;
                    }else{
                        source++;
                        header.innerHTML = source;
                        pop.getElementsByTagName('span')[0].innerHTML = source;
                        bridge.style.width = 0;
                        bridge.style.transform = 'rotate(-90deg)';
                        height = 0;
                        wrap.className  += ' move';
                        wrap.style.left = -(boxW+boxR) + 'px';
                        character.style.left = aBox[1].offsetWidth-character.offsetWidth+'px';
                        setTimeout(function(){
                            wrap.className = 'wrap';
                            wrap.style.left = 0;
                            wrap.removeChild(aBox[0]);
                        },800);
                    }
                },1300);
                isUp = false;
            }
            if (!isEnd){
                requestAnimationFrame(_this.update);
            }
        };
        document.getElementsByClassName('reStart')[0].addEventListener('touchend',function(){
            pop.style.visibility = 'hidden';
            _this.init();
            _this.update();
        });
        document.getElementsByClassName('reStart')[0].addEventListener('click',function(){
            pop.style.visibility = 'hidden';
            _this.init();
            _this.update();
        });
        this.update();
    };
    new Game();
});