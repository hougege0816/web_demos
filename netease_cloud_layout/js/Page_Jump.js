window.addEventListener('load',function(){
   Array.prototype.slice.call(document.getElementsByTagName('img')).forEach(function(el){
        el.addEventListener('click',function(e){
            e.preventDefault();
        });
   });
    /*界面跳转
    * 菜单的打开及关闭 支持滑动关闭
    * 主容器之间的切换 支持点击切换 滑动切换
    * 音乐容器里的各容器之间的切换 支持点击切换 滑动切换
    * 搜索界面的打开和关闭
    * 音乐播放界面的打开和关闭
    * */
    var nMusicStateLeft = false,nMusicStateRight = false;
    NeteaseCloud.PageJump = {
        /*菜单*/
        Togglemenu : function(){
            var aHeadList = Array.prototype.slice.call(document.querySelectorAll('.header li')),
                Menu = document.getElementsByClassName('menu')[0],
                MenuContainer = document.getElementsByClassName('menu_container')[0],
                MenuRight = document.getElementsByClassName('menu_right')[0],
                start = false , beforeX = 0;
            aHeadList[0].addEventListener('click',function(){
                Menu.style.visibility = 'inherit';
                MenuContainer.style.marginLeft = '0';
            });
            MenuRight.addEventListener('click',function(){
                closeMenu();
            });
            Menu.addEventListener('touchstart',function(e){
                if (e.target.className === 'menu_right') {
                    closeMenu();
                    return;
                }
                e.preventDefault();
                start = true;
                beforeX = e.touches[0].pageX;
            });
            Menu.addEventListener('touchmove',function(e){
                if (!start) return;
                e.preventDefault();
                if (e.touches[0].pageX < beforeX){
                    MenuContainer.style.transition = 'none';
                    MenuContainer.style.marginLeft = e.touches[0].pageX - beforeX + 'px';
                }
            });
            Menu.addEventListener('touchend',function(e){
                if (e.target.className === 'menu_right') {
                    closeMenu();
                    return;
                }
                e.preventDefault();
                start = false;
                if (MenuContainer.offsetLeft < -MenuContainer.offsetWidth/3){
                   MenuContainer.style.transition = 'all .5s';
                   MenuContainer.style.marginLeft = '-100%';
                    setTimeout(function(){
                       Menu.style.visibility = 'hidden';
                    },400);
                }else{
                    MenuContainer.style.marginLeft = 0;
                }
            });
            function closeMenu(){
                MenuContainer.style.marginLeft = '-100%';
                setTimeout(function(){
                    Menu.style.visibility = 'hidden';
                },400);
            }
        },
        /*主内容*/
        Togglecontent : function(){
            var aHeadList = Array.prototype.slice.call(document.querySelectorAll('.header li')),
                containerWrap = document.getElementsByClassName('content_wrap')[0],
                aContentBox = Array.prototype.slice.call(document.querySelectorAll('.content_wrap > div')),
                musicContainer = document.getElementsByClassName('music_box')[0],
                musicHeadList = Array.prototype.slice.call(document.querySelectorAll('.music_header li')),
                start = false , beforeX = 0 , currentX = 0 , beforeY = 0 , currentY = 0,
                state = false;
            /*点击切换*/
            aHeadList.forEach(function(el,index,arr){
                if (index>0&&index<4){
                    el.addEventListener('click',function(){
                        arr.forEach(function(el){el.className=''});
                        el.className = 'current';
                        containerWrap.style.marginLeft = -(index-1)+'00%';
                        musicContainer.style.marginLeft = 0;
                        musicHeadList.forEach(function(el){el.className=''});
                        musicHeadList[0].className += 'current';
                        nMusicStateRight = false;
                    });
                }
            });
            /*滑动切换*/
            aContentBox.forEach(function(el,index,arr){
                el.addEventListener('touchstart',function(e){
                  //  e.preventDefault();
                    if (index===0) {
                        musicContainer.style.marginLeft = 0;
                        musicHeadList.forEach(function(el){el.className=''});
                        musicHeadList[0].className += 'current';
                        nMusicStateRight = false;
                    }
                    if (index===2) {
                        musicContainer.style.marginLeft = '-300%';
                        musicHeadList.forEach(function(el){el.className=''});
                        musicHeadList[3].className += 'current';
                        nMusicStateLeft = false;
                    }
                    start = true;
                    beforeX = e.touches[0].pageX;
                    beforeY = e.touches[0].pageY;
                    el.addEventListener('touchmove',function(e){
                        if (!start) return;
                        //  e.preventDefault();
                        containerWrap.style.transition = 'none';
                        currentX = e.touches[0].pageX;
                        currentY = e.touches[0].pageY;
                        if (Math.abs(currentY-beforeY)>50){
                            //el.ontouchmove = null;
                        }else{
                            if (currentX < beforeX && currentX - beforeX < -10 && !nMusicStateRight){
                                e.preventDefault();
                                if (index!==2){
                                    containerWrap.style.marginLeft = currentX-beforeX+(-index*el.offsetWidth)+'px';
                                }
                                state = true;
                            }
                            else if (currentX > beforeX && !nMusicStateLeft){
                                e.preventDefault();
                                if (index!==0){
                                    containerWrap.style.marginLeft = currentX-beforeX+(-index*el.offsetWidth)+'px';
                                }
                                state = true;
                            }
                        }

                    });
                });
                el.addEventListener('touchend',function(e){
                    start = false;
                    containerWrap.style.transition = 'margin .1s';
                    if (currentX < beforeX && !nMusicStateRight){
                        if (index!==2){
                            if (currentX - beforeX < -el.offsetWidth/4 && state){
                                state = false;
                                containerWrap.style.marginLeft = -(index+1)+'00%';
                                aHeadList.forEach(function(el){el.className=''});
                                aHeadList[index+2].className += ' current';

                            }else{
                                containerWrap.style.marginLeft = -(index)+'00%';
                            }
                        }
                    }
                    if (currentX > beforeX && !nMusicStateLeft){
                        if (index!==0){
                            if (currentX - beforeX > el.offsetWidth/4 && state){
                                state = false;
                                containerWrap.style.marginLeft = -(index-1)+'00%';
                                aHeadList.forEach(function(el){el.className=''});
                                aHeadList[index].className += ' current';
                            }else{
                                containerWrap.style.marginLeft = -(index)+'00%';
                            }
                        }
                    }
                    currentX = 0,currentY =0, beforeX =0 , beforeY = 0;
                });
            });
        },
        /*音乐容器里的容器之间的切换*/
        ToggleMusicContainer : function(){
            var musicContainer = document.getElementsByClassName('music_box')[0],
                musicHeadList = Array.prototype.slice.call(document.querySelectorAll('.music_header li')),
                musicBox = Array.prototype.slice.call(document.querySelectorAll('.music_box > div')),
                currentX = 0, currentY = 0, beforeX = 0, beforeY = 0,
                start = false, state = false;
            musicHeadList.forEach(function(el,index,arr){
                el.addEventListener('click',function(){
                    arr.forEach(function(el){el.className=''});
                    el.className = 'current';
                    musicContainer.style.marginLeft = -(index)+'00%';
                });
            });
            musicBox.forEach(function(el,index){
                el.addEventListener('touchstart',function(e){
                    start = true;
                    beforeX = e.touches[0].pageX;
                    beforeY = e.touches[0].pageY;
                    el.addEventListener('touchmove',function(e){
                        if(!start) return;
                        musicContainer.style.transition = 'none';
                        currentX = e.touches[0].pageX;
                        currentY = e.touches[0].pageY;
                        if (Math.abs(currentY-beforeY)>50){
                           // el.ontouchmove = null;
                        }else{
                            if (currentX<beforeX && currentX-beforeX<-10){
                                if (index===3){
                                    nMusicStateRight = false;
                                }else{
                                    e.preventDefault();
                                    nMusicStateRight = true;
                                    musicContainer.style.marginLeft = currentX-beforeX+(-index*el.offsetWidth)+'px';
                                }
                            }
                            if (currentX>beforeX && currentX-beforeX>10){
                                if (index===0){
                                    nMusicStateLeft = false;
                                }else{
                                    e.preventDefault();
                                    nMusicStateLeft = true;
                                    musicContainer.style.marginLeft = currentX-beforeX+(-index*el.offsetWidth)+'px';
                                }
                            }
                        }
                    });
                });
                el.addEventListener('touchend',function(){
                    start = false;
                    musicContainer.style.transition = 'margin .1s';
                    if (currentX<beforeX){
                        if (currentX - beforeX < -el.offsetWidth/4){
                            musicContainer.style.marginLeft = -(index+1)+'00%';
                            musicHeadList.forEach(function(el){el.className=''});
                            if(index!==3)musicHeadList[index+1].className += ' current';
                        }else{
                            musicContainer.style.marginLeft = -(index)+'00%';
                        }
                    }
                    if (currentX>beforeX){
                        if (currentX - beforeX > el.offsetWidth/4){
                            musicContainer.style.marginLeft = -(index-1)+'00%';
                            musicHeadList.forEach(function(el){el.className=''});
                           if (index!==0) musicHeadList[index-1].className += ' current';
                        }else{
                            musicContainer.style.marginLeft = -(index)+'00%';
                        }
                    }
                });
            });
        },
        /*搜索界面*/
        ToggleSearch : function(){
            var searchContainer = document.getElementsByClassName('search')[0],
                back = document.querySelector('.search .back'),
                aHeadList = Array.prototype.slice.call(document.querySelectorAll('.header li'));
             aHeadList[aHeadList.length-1].addEventListener('click',function(){
                searchContainer.style.display = 'block';
             });
             back.addEventListener('click',function(){
                searchContainer.style.display = 'none';
             });

        },
        /*音乐播放界面*/
        MusicPlayContainer : function(){
            var music_play = document.getElementsByClassName('music_play')[0],
                goMusic_play = document.querySelector('.bottom .left'),
                back = document.querySelector('.music_play .back');
            goMusic_play.addEventListener('click',function(){
                //music_play.style.visibility = 'inherit;';
                music_play.style.transform = 'rotate(0deg)';
            });
            back.addEventListener('click',function(){
                music_play.style.transform = 'rotate(90deg)';
            });
        },
    };
    NeteaseCloud.PageJump.Togglemenu();
    NeteaseCloud.PageJump.Togglecontent();
    NeteaseCloud.PageJump.ToggleMusicContainer();
    NeteaseCloud.PageJump.ToggleSearch();
    NeteaseCloud.PageJump.MusicPlayContainer();
});