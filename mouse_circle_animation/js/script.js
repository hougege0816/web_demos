window.addEventListener('load',function(){
    let W = window.innerWidth,
        H = window.innerHeight,
        container = document.getElementsByClassName('container')[0],
        css = document.getElementById('css'),
        isState = 0;

    /*
    * 切换状态
    * */
    !function(){
        document.getElementById('btn').addEventListener('click',function(e){
            isState++;
            isState >= 3 && (isState=0);
            e.target.value = isState===0 ? '自动' : (isState === 1 ? '手动' : '一起动' );
        });
    }();


    /*
    * 自动
    * */
    !function(){
        let x = Math.random()*W-70,
            y = Math.random()*H-70,
            time = null,
            ulook = true, nlook = true;
        time = setInterval(()=>{
            if (isState===1) return;
            if (x<0){
                ulook = false;
            }else if (x>W-70){
                ulook = true;
            }if (y<0){
                nlook = false;
            }else if (y>H-70){
                nlook = true;
            }

            let box = document.createElement('span');
            box.style.top = y+'px';
            box.style.left = x+'px';
            container.appendChild(box);
            let lastBox = document.querySelector('.container span:nth-last-child(1)');
            setTimeout(()=>{
                lastBox.className += 'last';
            },50);
            setTimeout(()=>{
                container.removeChild(lastBox);
            },500);

            let xmin = Math.random()*20,
                xmax = Math.random()*20,
                ymin = Math.random()*20,
                ymax = Math.random()*20;
            ulook ? x-=Math.random()*xmax+xmin : x+=Math.random()*xmax+xmin;
            nlook ? y-=Math.random()*ymax+ymax : y+=Math.random()*ymax+ymin;
        },1000/60);
        !function(){
            setInterval(()=>{
                let color = 'rgba('+~~(Math.random()*256)+','+~~(Math.random()*256)+','+~~(Math.random()*256)+',.9)';
                css.innerHTML += '.container span{ background:'+color+'}';
            },1000/6);
        }();
    }();


    /*
    * 手动
    * */
    document.addEventListener('mousemove',function(e){
        if (isState===0) return;
        let x = e.clientX-35,
            y = e.clientY-35;

        let box = document.createElement('span');
        box.style.top = y+'px';
        box.style.left = x+'px';
        container.appendChild(box);
        let lastBox = document.querySelector('.container span:nth-last-child(1)');
        setTimeout(()=>{
            lastBox.className += 'last';
        },150);
        setTimeout(()=>{
            container.removeChild(lastBox);
        },1000);
    });
});