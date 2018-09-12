/**
 * Created by Administrator on 2018/4/22.
 */

// debug
var log = console.log.bind(console);

var random = function(start,end){
    return Math.floor( Math.random() * (end - start + 1) + start );
};

// dom 节点操作
var Q = (function(){


    var q = function(elem){

        var s = this;
        var elems = [];
        if (typeof elem === 'string'){
            elems = document.querySelectorAll(elem);
        }else if (elem instanceof  HTMLElement){
            elems.push(elem);
        }
        // log(elems);


        return {

            get : function(index){
                return elems[index];
            },

            getAll : function(){
                return elems;
            },

            len : function(){
                return elems.length;
            },

            css : function(obj){

                elems.forEach(function(el){
                   for (var i in obj){
                       el.style[i] = obj[i];
                   }
                });

                return s;

            },

            on : function(ev,fn){
                elems.forEach(function(el){
                    el.addEventListener(ev,fn);
                });

                return s;
            },

        }

    };

    q.create = function(elem){
          return document.createElement(elem);
    };

    return q;

})();

// es5 继承class

function extend(Child, Parent) {

    var F = function(){};

    F.prototype = Parent.prototype;

    Child.prototype = new F();

    Child.prototype.constructor = Child;

    Child.uber = Parent.prototype;

}

// 全部定时器 （ 注册事件传入回调函数 ）

var requestAnimation = (function(){

    var events = [];


    return {
        // 注册
        reg : function(id,callback){
            events.forEach(function(el){
               if (el.id === id) return;
            });
            events.push({
               id : id,
               callback : callback,
            });
        },
        // 取消
        cancel : function(id){
            events.forEach(function(el,index){
               if (el.id === id){
                   events.splice(index,1);
               }
               return false;
            });
        },
        loop : function(){

            events.forEach(function(el){
               el.callback();
            });
            window.requestAnimationFrame(this.loop.bind(this));

        }
    }

}());

// 加载器

var load = (function(){

    var loads = [];

    return {
        reg : function(fn,callback){
            loads.push({
                fn : fn,
                callback : callback,
            });
        },

        start : function(callback){
            var s = this;
            var len = loads.length;
            var count = 0;
            if (!len){
                return callback();
            }
            loads.forEach(function(el){
                el.fn(function(){
                    el.callback && el.callback();
                    count++;
                    s.check(len,count,callback);
                });
            });
        },

        check : function(len,count,callback){
            if (len === count){
                callback();
            }
        }
    }

})();

// 封装 鼠标滚动函数
var scroolEvent = function(el,callback){
    el.onmousewheel = function(e) {
        e = e || window.event;
        e.preventDefault();
        cb(e,e.deltaY);
        return false;
    };
    Q(el).on("DOMMouseScroll", function(e) {
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        e.preventDefault();
        cb(e,e.detail);
        return false;
    });

    function cb(e,y){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        return callback(y > 0 ? 1 : -1);
    }
};
// 切换 content box
var toggleBox = (function(){

    var side_nav_li = Q(".side-nav li").getAll();
    var content_box = Q(".content .content-box").getAll();

    return function(i){
        i = i || 0;
        var index = CONFIG.CURRENT_CONTENT_BOX;
        if (i < 0 || i >= content_box.length) return;
        CONFIG.CURRENT_CONTENT_BOX  = i;
        side_nav_li.forEach(function(el){
            el.classList.remove("current");
        });
        content_box.forEach(function(el){
            el.classList.remove("content-current-box");
        });
        side_nav_li[i].classList.add("current");
        content_box[i].classList.add("content-current-box");
        toggleBodyState();
    }

})();
// 切换body状态 不同状态下有不同的背景图片
var toggleBodyState = function(){
    var i= CONFIG.CURRENT_CONTENT_BOX;
    document.body.setAttribute("data-state",CONFIG.BODY_STATES[i]);
};