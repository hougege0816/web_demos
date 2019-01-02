jQuery(function(){

    $(document).ready(function(){

        (function(){
            var setContentNavAction = function(){
                var active = $('.content-nav .button-action');
                return (function(){
                    $('.content-nav .top span').css({
                        width : $(active).outerWidth(true),
                        left : $(active).position().left
                    });
                }());
            };

            setContentNavAction();

            $('.content-nav .button').click(function(){
                $(this).siblings().removeClass('button-action');
                $(this).addClass('button-action');
                $('.content-wrap').css({
                    marginLeft : -(($(this).index()-1)*100) + '%'
                });
                setContentNavAction();
            });
        }());

        $('#shutdown-btn').on('click',function(){
            bookSystem.getData('../php/admin/Shutdown.php',function(){

            });
        });

    });

});