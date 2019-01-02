window.addEventListener('load',function(){
    /* 数字界面 */
    var num_wrap = document.getElementsByClassName('num_wrap')[0],
        // 弹出游戏结束界面
        pop = document.getElementsByClassName('pop')[0],
        // 显示当前分数栏
        current_source = document.getElementsByClassName('current_source')[0],
        // 显示最高分数栏
        highest_source = document.getElementsByClassName('highest')[0],
        // 重新排序按钮
        new_game = document.getElementsByClassName('new_game')[0],
        // 上一步按钮
        back_btn = document.getElementsByClassName('back')[0];

    /* 初始化界面 */
    !function(){
        num_wrap.style.height = num_wrap.offsetWidth + 'px';
        num_wrap.style.visibility = 'visible';
        pop.style.width = num_wrap.offsetWidth+'px';
        pop.style.height = num_wrap.offsetHeight+'px';
        pop.style.top = num_wrap.offsetTop+'px';
        pop.style.left = num_wrap.offsetLeft+'px';
        // 生成数字界面
        var tHtml = '';
        for (var i=0;i<16;i++){
            tHtml += '<div class="num_box"><span id="'+i+'" data-num=" "></span></div>';
        }
        num_wrap.innerHTML = tHtml;
    }();

    /* 数字数组 */
    var num_span = Array.prototype.slice.call(num_wrap.getElementsByTagName('span'));

    !function(){

        // 保存按下的键
        var key = null,

        // 保存每一次移动后的数字数组 用于本地储存
        num_arr = [],

        // 用于保存上一步数字情况
        before_num_arr = [],

        // 用于判断按下后的操作是否完成 防止按键过快
        isDown = true,

        // 判断是否本次操作是否有改变
        isChange = true,

        // 判断是否可点击上一步

        isBack = false,

        // 判断已判断列或行的数量
        count = 0,

        // 保存数字界面上有多少个数字
        numCount = 0,

        // 当前分数
        source = 0,

        // 用于保存之前分数

        before_source = 0,

        // 最高分数
        highest = 150,

        // 用于保存之前最高分数

        before_highest = 0,

        // 判断结束
        end = false;

        // 各数字背景颜色
        var colors = {2:'#EEE4DA',4:'#EDE0C8',8:'#F2B179',16:'#F59563',32:'#F67C5F',
            64:'#F65E3B',128:'#EDCF72',256:'#EDCC61',512:'#EDC416',1024:'#EDC416',
            2048:'#EDC416',4096:'#EDC416'};


        /* 根据数字改变颜色 */
        var changeColor = function(){
            num_span.forEach(function(el){
                for (var num in colors){
                    if (el.getAttribute('data-num') === num){
                        el.style.background = colors[num];
                        if (el.getAttribute('data-num') >= 1024){
                            el.style.fontSize = '25px';
                        }else{
                            el.style.fontSize = '30px';
                        }
                        break;
                    }else{
                        el.style.background = 'rgba(0,0,0,0)';
                    }
                }
            });
        };

        /* 随机在没数字的格子里出现数字 */
        var randomAdd = function(){
            var arr = [];
            num_span.forEach(function(el){
                if (el.getAttribute('data-num') === ' '){
                    arr.push(el);
                }
            });
            if (arr.length!==0){
                var random = ~~(Math.random()*arr.length);
                arr[random].style.transform = 'scale(.5)';
                arr[random].setAttribute('data-num',2);
                arr[random].innerHTML = 2;
                setTimeout(function(){
                    arr[random].style.transform = 'scale(1)';
                },100);
            }
            isChange = false;
        };
        /* 获得以x轴分割的4*4数组 */
        var chunkX = function(arr){
            var arr2 = [];
            for (var i=0;i<arr.length;i+=4){
                arr2.push(arr.slice(i,i+4));
            }
            return arr2;
        };
        /* 获得以y轴分割的4*4数组 */
        var chunkY = function(arr){
            var arr2 = [[],[],[],[]];
            for (var i=0;i<arr.length;i++){
                for (var j=0;j<arr[i].length;j++){
                    arr2[j][i] = arr[i][j];
                }
            }
            return arr2;
        };
        /* 计算两个格子内的数字并返回和 */
        var numAdd = function(num1,num2){

            return (parseInt(num_span[num1].getAttribute('data-num'))+
            parseInt(num_span[num2].getAttribute('data-num')));

        };
        /* 对一个格子设置数字 */
        var setNum = function(index,num){
            num_span[index].setAttribute('data-num',parseInt(num)>=0 ? num : ' ');
            num_span[index].innerHTML = parseInt(num)>=0 ? num : '';
        };
        /* 创建一个p用于滑动效果 */
        var createBox = function(index,end,num,fn){
            var box = document.createElement('p');
            box.style.top = num_span[index].offsetTop+'px';
            box.style.left = num_span[index].offsetLeft+'px';
            box.style.width = num_span[index].offsetWidth+'px';
            box.style.height = num_span[index].offsetHeight+'px';
            box.innerHTML = num;
            for (var _num in colors){
                if (num === parseInt(_num) ){
                    box.style.background = colors[_num];
                }
            }
            num_wrap.appendChild(box);
            fn(box);
        };
        /* 开始移动 */
        var move = function(index,end,num,state){
            num_span[end].setAttribute('data-num',num);
            createBox(index,end,num,function(box){
                box.style.top = num_span[end].offsetTop+'px';
                box.style.left = num_span[end].offsetLeft+'px';
                setTimeout(function(){
                    box.style.background = 'yellow';
                    var _num = num_span[end].getAttribute('data-num');
                    num_span[end].innerHTML = _num>=0 ? _num : '';
                    num_wrap.removeChild(box);
                    // 判断本次移动是否是增加 如果是 出现扩大的效果
                    if (state){
                        num_span[end].style.transform = 'scale(1.1)';
                        setTimeout(function(){
                            num_span[end].style.transform = 'scale(1)';
                            // 每一次增加数字加15分
                            source+=15;
                            before_source+=15;
                            // 当前分数超过最高分数时 更新最高分数
                            if (source>highest){
                                highest = source;
                                highest_source.innerHTML = highest;
                            }
                            // 更新当前分数
                            current_source.innerHTML = source;
                        },150);
                    }
                },150);
            });
            isChange = true;
        };
        /* 判断本次移动的开始位置和结束位置是否一样 如果是 将不用移动 */
        var isMove = function(arr,inner,index,num,end,state){
            var currentIndex = inner[index].index,
                destination = arr[end].id;
            if (num_span[currentIndex].id !== num_span[destination].id){
                move(currentIndex,destination,num,state);
            }else{
                setNum(currentIndex,num);
            }
        };

        /* 判断是否有可移动的数字 无则游戏结束 */
        var isEnd = function(){
            var arrX = chunkX(num_arr),
                arrY = chunkY(arrX),
                state = true;
            var isEquals = function(arr){
                for(var i=0;i<arr.length;i++){
                    for(var j=0;j<arr.length-1;j++){
                        if (arr[i][j].num === arr[i][j+1].num){
                            state = false;
                            break;
                        }
                    }
                }
            };
            isEquals(arrX);
            isEquals(arrY);
            return state;
        };

        /* 判断格子内的数字 */
        var judge = function(arr){
            var inner = [];
            arr.forEach(function(el){
                if (el.getAttribute('data-num') !== ' '){
                    inner.push({index:el.id,num:el.getAttribute('data-num')});
                }
            });
            var len = inner.length,
                num = null;

            /* 枚举所有可能出现的情况 */
            switch (len){
                // 当此列只有1个数字时 直接移动
                case 1:
                    setNum(inner[0].index);
                    isMove(arr,inner,0,inner[0].num,0);
                    break;
                // 当此列有2个数字时
                case 2:
                    if (inner[0].num === inner[1].num){
                        num = numAdd(inner[0].index,inner[1].index);
                        setNum(inner[0].index);
                        setNum(inner[1].index);
                        isMove(arr,inner,1,num,0,true);
                    }else{
                        setNum(inner[0].index);
                        isMove(arr,inner,0,inner[0].num,0);
                        setNum(inner[1].index);
                        isMove(arr,inner,1,inner[1].num,1);
                    }
                    break;
                // 当此列有3个数字时
                case 3:
                    if (inner[0].num === inner[1].num){
                        num = numAdd(inner[0].index,inner[1].index);
                        setNum(inner[0].index);
                        setNum(inner[1].index);
                        isMove(arr,inner,1,num,0,true);
                        setNum(inner[2].index);
                        isMove(arr,inner,2,inner[2].num,1);
                    }else if (inner[1].num === inner[2].num){
                        setNum(inner[0].index);
                        isMove(arr,inner,0,inner[0].num,0);
                        num = numAdd(inner[1].index,inner[2].index);
                        setNum(inner[1].index);
                        setNum(inner[2].index);
                        isMove(arr,inner,2,num,1,true);
                    }else{
                        setNum(inner[0].index);
                        isMove(arr,inner,0,inner[0].num,0);
                        setNum(inner[1].index);
                        isMove(arr,inner,1,inner[1].num,1);
                        setNum(inner[2].index);
                        isMove(arr,inner,2,inner[2].num,2);
                    }
                    break;
                // 当此列有4个数字时
                case 4:
                    if (inner[0].num === inner[1].num){
                        num = numAdd(inner[0].index,inner[1].index);
                        setNum(inner[0].index);
                        setNum(inner[1].index);
                        isMove(arr,inner,1,num,0,true);
                        if (inner[2].num === inner[3].num){
                            num = numAdd(inner[2].index,inner[3].index);
                            setNum(inner[2].index);
                            setNum(inner[3].index);
                            isMove(arr,inner,2,num,1,true);
                        }else{
                            setNum(inner[2].index);
                            isMove(arr,inner,2,inner[2].num,1);
                            setNum(inner[3].index);
                            isMove(arr,inner,3,inner[3].num,2);
                        }
                    }
                    else if (inner[1].num === inner[2].num){
                        num = numAdd(inner[1].index,inner[2].index);
                        setNum(inner[1].index);
                        setNum(inner[2].index);
                        isMove(arr,inner,2,num,1,true);
                        setNum(inner[3].index);
                        isMove(arr,inner,3,inner[3].num,2);
                    }
                    else if (inner[2].num === inner[3].num){
                        num = numAdd(inner[2].index,inner[3].index);
                        setNum(inner[2].index);
                        setNum(inner[3].index);
                        isMove(arr,inner,3,num,2,true);
                    }
                    break;
            }

            count++;
            // 已经移动完时
            if (count===4){
                setTimeout(function(){
                    // 如果本次操作有改变
                    if (isChange){
                        numCount = 0;
                        // 随机增加
                        randomAdd();
                        // 将目前的数字情况保存到数组 并计算一共有多少数字
                        num_arr = [];
                        num_span.forEach(function(el){
                            num_arr.push({index:el.id,num:el.getAttribute('data-num')});
                            if (el.getAttribute('data-num') !== ' '){
                                numCount++;
                            }
                        });
                        // 如果数字已经满时 则判断是否还有可移动的数字 无则游戏结束 弹出游戏结束界面
                        if (numCount===16){
                            if (isEnd(num_arr)){
                                setTimeout(function(){
                                    pop.style.opacity = '1';
                                    pop.style.filter = 'alpha(opacity=100)';
                                    end = true;
                                },100);
                            }
                        }

                    }
                    // 每次改变更新各数字的背景颜色
                    changeColor();
                    count=0;
                    isDown = true;
                },50);
                // 每次改变将最新结果进行本地存储
                setTimeout(function(){
                    var game = {num_arr:num_arr,source:source,highest:highest,start:!end};
                    localStorage.game = JSON.stringify(game);
                },400);
            }
        };


        /* 按下时判断键值 分别按x轴或y轴取数组 */
        function keyDown(){
            before_num_arr = [];
            num_span.forEach(function(el){
                before_num_arr.push({index:el.id,num:el.getAttribute('data-num')});
                if (el.getAttribute('data-num') !== ' '){
                    numCount++;
                }
            });
            before_source = source;
            before_highest = highest;
            isBack = true;
            var arrX = chunkX(num_span),
                arrY = chunkY(arrX);
            switch (key){
                case 0:
                    arrX.forEach(function(el){
                        judge(el);
                    });
                    break;
                case 1:
                    arrY.forEach(function(el){
                        judge(el);
                    });
                    break;
                case 2:
                    arrX.forEach(function(el){
                        el.reverse();
                        judge(el);
                    });
                    break;
                case 3:
                    arrY.forEach(function(el){
                        el.reverse();
                        judge(el);
                    });
                    break;
            }



        }

        /* 开始 随机出现两个数字 */
        var start = function(fn){

            // 如果当前还没有进行过本地存储 则开始
            if (!localStorage.game){
                for (var i=0;i<2;i++){
                    randomAdd();
                }
            }else{
                var game = JSON.parse(localStorage.game);
                // 否则判断当前存储是否在游戏中
                if (game.start){
                    // 是的话 将数字情况重新放进数字界面
                    num_span.forEach(function(el,index){
                        el.style.transform = 'scale(.5)';
                        setNum(index,game.num_arr[index].num);
                    });
                    setTimeout(function(){
                        num_span.forEach(function(el){
                            el.style.transform = 'scale(1)';
                        });
                    },10);
                    // 设置当前分数和最高分
                    source = game.source;
                    current_source.innerHTML = source;
                    highest = game.highest;
                 // 当前存储已经结束游戏时 重新开始
                }else{
                    for (var j=0;j<2;j++){
                        randomAdd();
                    }
                    highest = game.highest;
                }
                // 更新最高分
                highest_source.innerHTML = game.highest;
            }
            changeColor();

        };
        start();

        /* 用户按键操作 */
        document.addEventListener('keydown',function(e){
            if (isDown){
                if (e.keyCode-37>=0 && e.keyCode-37<=3){
                    key = e.keyCode-37;
                    keyDown();
                }
                isDown = false;
            }
        });

        var beforeX = 0,beforeY = 0,currentX = 0, currentY = 0;

        /* 手机端用户操作 */
        // 开始触摸时 保存当前的x和y坐标
        num_wrap.addEventListener('touchstart',function(e){
            beforeX = e.touches[0].pageX;
            beforeY = e.touches[0].pageY;
        });
        // 移动时 保存当前的x和y坐标
        num_wrap.addEventListener('touchmove',function(e){
            currentX = e.touches[0].pageX;
            currentY = e.touches[0].pageY;
        });
        // 移动结束时
        num_wrap.addEventListener('touchend',function(){
            var x = currentX - beforeX,
                y = currentY - beforeY;
            // 分别判断触摸时移动的方向 设置键值 执行事件
            if (x < 0 && Math.abs(x) > Math.abs(y)){
                key = 0;
            }
            if (x > 0 && Math.abs(x) > Math.abs(y)){
                key = 2;
            }
            if (y < 0 && Math.abs(y) > Math.abs(x)){
                key = 1;
            }
            if (y > 0 && Math.abs(y) > Math.abs(x)){
                key = 3;
            }
            keyDown();
        });


        /* 上一步 */

        back_btn.addEventListener('click',function(){
            if (!isBack) return;
            num_span.forEach(function(el,index){
                el.style.transform = 'scale(.5)';
                setNum(index,before_num_arr[index].num);
            });
            setTimeout(function(){
                num_span.forEach(function(el){
                    el.style.transform = 'scale(1)';
                });
            },10);
            source = before_source;
            current_source.innerHTML = source;
            highest = before_highest;
            highest_source.innerHTML = highest;
            changeColor();
            isBack = false;
        });

        /* 新游戏 */
        new_game.addEventListener('click',function(){
            pop.style.opacity = '0';
            pop.style.filter = 'alpha(opacity=0)';
            num_span.forEach(function(el,index){
                setNum(index,' ');
            });
            end = true;
            source = 0;
            current_source.innerHTML = source;
            var game = {num_arr:num_arr,source:source,highest:highest,start:!end};
            localStorage.game = JSON.stringify(game);
            start();
        });

    }();

    /* 浏览器大小改变时 重设数字界面的高度 */
    window.addEventListener('resize',function(){
        num_wrap.style.height = num_wrap.offsetWidth + 'px';
        pop.style.width = num_wrap.offsetWidth+'px';
        pop.style.height = num_wrap.offsetHeight+'px';
        pop.style.top = num_wrap.offsetTop+'px';
        pop.style.left = num_wrap.offsetLeft+'px';
    });

});