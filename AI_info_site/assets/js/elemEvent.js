/**
 * Created by Administrator on 2018/4/23.
 */


(function(CONFIG){

    var c = CONFIG;

    // control buttons function

    (function(){

        Q("#control-group").on('click',function(e){
            e.preventDefault();
            var target = e.target;
            if (target.nodeName !== "A") return;
            switch (target.id){
                case "full-btn" :
                    toggleFullScreen(document.body,target);
                    break;
                case "music-btn":
                    toggleMute(target);
                    break;
            }

            return false;
        });

        function toggleFullScreen(el,target){
            var is = target.classList.toggle('enabled');
            if(is){
                fullScreen(el);
            }else{
                exitFullScreen(el);
            }
        }

        function toggleMute(target){
            musicPanel.audio.toggleMute();
            target.classList.toggle('enabled');
        }

        function fullScreen(el) {
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
                wscript;

            if(typeof rfs !== "undefined" && rfs) {
                rfs.call(el);
                return;
            }

            if(typeof window.ActiveXObject !== "undefined") {
                wscript = new ActiveXObject("WScript.Shell");
                if(wscript) {
                    wscript.SendKeys("{F11}");
                }
            }
        }

        function exitFullScreen() {
            var el= document,
                cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
                wscript;

            if (typeof cfs !== "undefined" && cfs) {
                cfs.call(el);
                return;
            }

            if (typeof window.ActiveXObject !== "undefined") {
                wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }

    })();

    // nav toggle

    (function(){

        Q(".side-nav").on('click',function(e){
            e.preventDefault();
            var target = e.target;
            if (target.nodeName === "SPAN"){
                target = target.parentNode;
            }
            var i = target.getAttribute("data-index");
            toggleBox(i);
        });

        scroolEvent(Q('#main').get(0),function(y){
            toggleBox(parseInt(c.CURRENT_CONTENT_BOX)+y);
        });

    })();

    // What is AI

    (function(){

        var box_2_toggle = new PubToggle();
        box_2_toggle.nav_container = Q(".what-is-ai .box-side-nav").get(0);
        box_2_toggle.content_list = Q(".what-is-ai .content-list").get(0);
        box_2_toggle.btn_list = Q(".what-is-ai .box-side-nav li").getAll();
        box_2_toggle.item_len = Q(".what-is-ai:nth-of-type(2) .content-list .content-item").len();
        box_2_toggle.filter_tag = "A";
        box_2_toggle.index = 0;
        var item = Q('.what-is-ai .content-item').get(0);
        box_2_toggle.toggle = function(){
            var s = this;
            s._toggle();
            var height = window.getComputedStyle(item,null).height;
            height = height.substr(0,height.length-2);
            var mt = Math.floor(s.index * height);
            s.content_list.style.cssText += ` margin-top:-${ mt }px`;
        };
        box_2_toggle.init();

    })();

    // Future AI

    (function(){

        var box_2_toggle = new PubToggle();
        box_2_toggle.nav_container = Q(".future-ai .box-side-nav").get(0);
        box_2_toggle.content_list = Q(".future-ai .content-list").get(0);
        box_2_toggle.btn_list = Q(".future-ai .box-side-nav li").getAll();
        box_2_toggle.item_len = Q(".future-ai .content-list .content-item").len();
        box_2_toggle.filter_tag = "A";
        box_2_toggle.index = 0;
        var item = Q('.future-ai .content-item').get(0);
        box_2_toggle.toggle = function(){
            var s = this;
            s._toggle();
            var height = window.getComputedStyle(item,null).height;
            height = height.substr(0,height.length-2);
            var mt = Math.floor(s.index * height);
            s.content_list.style.cssText += ` margin-top:-${ mt }px`;
        };
        box_2_toggle.init();

    })();


    // Area

    (function(){

        var box_3_toggle = new PubToggle();
        box_3_toggle.nav_container = Q(".area .box-side-nav").get(0);
        box_3_toggle.content_list = Q(".area .content-list").get(0);
        box_3_toggle.btn_list = Q(".area .box-side-nav li").getAll();
        box_3_toggle.item_len = Q(".area .content-list .content-item-wrap").len();
        box_3_toggle.filter_tag = "A";
        box_3_toggle.index = 0;
        var item = Q('.area .inner-box .content-item-wrap').get(0);
        box_3_toggle.toggle = function(){
            var s = this;
            s._toggle();
            var width = window.getComputedStyle(item,null).width;
            width = width.substr(0,width.length-2);
            var mt = Math.floor(s.index * width);
            s.content_list.style.cssText += ` margin-left:-${ mt }px`;
            s.content_list.classList.add("toggle");
            setTimeout(function(){
                s.content_list.classList.remove("toggle");
            },1000);
        };
        box_3_toggle.init();

    })();


})(CONFIG);