jQuery(function(){

    $(document).ready(function(){
        var url = '../../php/user/Personal.php';

        bookSystem.getData(url,function(data){
            var user = data.user[0];
           for (var key in user){
               $('#user_info_box').find('*[data-field='+ key +']').val(user[key]);
           }
        });

        function disabled(){
            $('.aInput').attr("disabled","disabled");
        }
        function edit(){
            $('.aInput').removeAttr("disabled");
            $('#message_user_name').attr("disabled","disabled");
            $('#message_created_at').attr("disabled","disabled");
        }
        disabled();

        $('.edit-btn').click(function(){
            if ($(this).attr('data-start') === '0'){
                $(this).attr('data-start','1');
                $(this).html('保存');
                edit();
            }else{
                var user = {
                        name : $('#message_name').val(),
                        user_name : $('#message_user_name').val(),
                        age : $('#message_age').val(),
                        sex : $('#message_sex').val(),
                        phone : $('#message_phone').val(),
                        email : $('#message_email').val(),
                        receiving_address : $('#message_receiving_address').val(),
                    },
                    aInput = $('.aInput'),
                    text =  [
                        '姓名不能为空','用户名不能为空', '请选择性别','年龄不能为空','电话不能为空','邮箱不能为空',
                        '收货地址不能为空'
                    ];
                for (var i=0;i<$(aInput).length;i++){
                    if (!$(aInput[i]).val()){
                        alert(text[i]);
                        return false;
                    }
                }
                if (!bookSystem.check(user)){
                    return false;
                }
                var data = {
                    user : user
                };
                bookSystem.update(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        location.reload();
                    }
                });
                $(this).attr('data-start','0');
                $(this).html('编辑');
                disabled();
            }
        });

        $('.reset-password-btn').click(function(){
            var user = {
                    old_password : $('#reset_old_password').val(),
                    password : $('#reset_password').val(),
                    again_password : $('#reset_again_password').val(),
                },
                aInput = $('.reset_aInput'),
                text =  [
                    '请输入旧密码！','请输入新密码！', '请再次输入新密码！'
                ];
            for (var i=0;i<$(aInput).length;i++){
                if (!$(aInput[i]).val()){
                    alert(text[i]);
                    return false;
                }
            }
            if (user.password !== user.again_password){
                alert('密码不一致！');
                return false;
            }
            var data = {
                user : user
            };
            bookSystem.resetPassword(url,data,function(data){
                alert(data.content);
                if (data.success){
                    location.reload();
                }
            })

        });
    })

});