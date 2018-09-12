window.addEventListener('load',function(){

        var oContainer = document.getElementById('container'),
            oScore = document.getElementById('score');

        var flappy = window.Flappy_bird(oContainer);

        flappy.start();

        flappy.getScore(function(score){
            oScore.innerHTML = score;
        });

});