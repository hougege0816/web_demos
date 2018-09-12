/**
 * Created by Administrator on 2018/4/23.
 */

function PubCanvas(){
}
PubCanvas.prototype = {
  setup : function(container,config){
      if (!config){
          config = {
              w : 0,
              h : 0,
          }
      }
      var s = this;
      s.canvas = Q.create("canvas");
      s.ctx = s.canvas.getContext("2d");
      s.container = container;
      s.config = config;
      s.setSize();
      container.appendChild(s.canvas);

      window.addEventListener('resize',function(){
         s.setSize();
      });

  },

  setSize : function(){
      var s = this;
      s.w = s.config.w ? s.config.w : s.container.offsetWidth;
      s.h = s.config.h ? s.config.h : s.container.offsetHeight;
      s.canvas.width = s.w;
      s.canvas.height = s.h;
  }
};

function PubToggle(){
    this.nav_container = null;
    this.content_list = null;
    this.btn_list = null;
    this.item_len = 0;
    this.filter_tag = "A";
    this.index_attr = "data-index";
    this.index = 0;

    this.init = function(){
        var s = this;
        Q(s.nav_container).on('click',function(e){
            e.preventDefault();
            var target = e.target;
            if (target.nodeName !== s.filter_tag) return;
            s.index = target.getAttribute(s.index_attr);
            s.toggle();
            return false;
        });
        scroolEvent(s.content_list,function(y){
            s.setIndex(parseInt(s.index)+y);
        });
    };
    this._toggle = function(){
        this.btn_list.forEach(function(el){
            el.classList.remove("current");
        });
        this.btn_list[this.index].classList.add('current');
    };
    this.toggle = function(){
        this._toggle();
    };
    this.setIndex = function(i){
        if (i < 0){
            toggleBox(CONFIG.CURRENT_CONTENT_BOX-1);
            return;
        }
        else if (i >= this.item_len){
            toggleBox(CONFIG.CURRENT_CONTENT_BOX+1);
            return;
        }
        else if (i === this.index) return;
        this.index = i;
        this.toggle();
    }
}