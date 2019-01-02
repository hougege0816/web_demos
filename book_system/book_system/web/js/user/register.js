jQuery(function(){

    $(document).ready(function(){


        var url = '../../php/admin/User.php';


        function check(user){
            if (!/^[\u4e00-\u9fa5 ]{2,20}$/.test(user.name) && !/^[a-z\/ ]{2,20}$/i.test(user.name)){
                return alert('请输入正确的姓名！');
            }
            if (/\s/.test(user.user_name) || user.user_name.length>16){
                return alert('用户名不能包含空格并且长度小于16！');
            }
            if (user.password){
                if (user.password !== user.again_password_){
                    return alert('两次输入的密码不正确！');
                }
                if (user.password.length>16){
                    return alert('密码长度不能大于16！');
                }
            }
            if (parseInt(user.age) > 120 || parseInt(user.age) < 0){
                return alert('请输入正确的年龄！');
            }
            if (!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(user.email)){
                return alert('请输入正确的邮箱！');
            }
            if (!/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/.test(user.phone)){
                return alert('请输入正确的电话号码！');
            }
            return true;
        }


        // 添加数据
        (function(){

            $('#register_btn').click(function(){
                var user = {
                        name : $('#name').val(),
                        user_name : $('#user_name').val(),
                        password : $('#password').val(),
                        again_password_ : $('#again_password').val(),
                        age : $('#age').val(),
                        sex : $('#sex').val(),
                        phone : $('#phone').val(),
                        email : $('#email').val(),
                    },
                    add_aInput = $('.add_aInput'),
                    text =  [
                        '姓名不能为空','用户名不能为空','密码不能为空','密码不能为空',
                        '年龄不能为空','请选择性别','电话不能为空','邮箱不能为空'
                    ];
                for (var i=0;i<$(add_aInput).length;i++){
                    if (!$(add_aInput[i]).val()){
                        alert(text[i]);
                        return false;
                    }
                }
                if (!check(user)){
                    return false;
                }
                var data = {
                    user : user
                };
                bookSystem.addData(url,data,function(data){
                    alert(data.content);
                });

            });

        }());







    });

});