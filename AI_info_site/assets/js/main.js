/**
 * Created by Administrator on 2018/4/23.
 */
if (window.AudioContext){
    load.reg(
        musicPanel.init.bind(musicPanel,Q("#music-panel").get(0)),
        function(){
            musicPanel.play(function(){
                requestAnimation.reg("musicPanel",function(){
                    musicPanel.update();
                });
            });
        }
    );
}

load.start(function(){

   Q("main").get(0).classList.remove("hidden");
   Q(".loading").get(0).classList.add("hidden");
   setTimeout(function(){
        toggleBox();
   },10);

   setTimeout(function(){

       var particleSystem = new ParticleSystem(
           Q(".home").get(0)
       );

       requestAnimation.reg("particleSystem",function(){
           particleSystem.update();
       });

   },500);



   requestAnimation.loop();

});