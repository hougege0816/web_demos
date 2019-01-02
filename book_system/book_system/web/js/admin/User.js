jQuery(function(){

    $(document).ready(function(){

        (function(){
            $('#modal-user-message').find('.aInput').attr("disabled","disabled");
        }());

        var url = '../../php/admin/User.php';

        function initTable(data){
            bookSystem.initTable('#user-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '用户id'
            }, {
                field: 'name',
                title: '姓名'
            }, {
                field: 'user_name',
                title: '用户名'
            }, {
                field: 'sex',
                title: '性别'
            }, {
                field: 'age',
                title: '年龄 '
            }, {
                field: 'email',
                title: '邮箱'
            }, {
                field: 'phone',
                title: '电话'
            }, {
                field: 'receiving_address',
                title: '收货地址',
            },{
                field: 'created_at',
                title: '注册时间'
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#user-table','#modal-user-message',function(modal_el,field){
                setMessage.call($(this),modal_el,field);
            });
        }
        function setMessage(modal_el,field){
            $(modal_el).find('.modal_message_user_name_title').eq(0).html(
                $(this).find(field+'=user_name]').eq(0).html());
            $(modal_el).find('.modal_message_user_id').eq(0).val(
                $(this).find(field+'=id]').eq(0).html());
            $(modal_el).find('.modal_message_name').eq(0).val(
                $(this).find(field+'=name]').eq(0).html());
            $(modal_el).find('.modal_message_user_name').eq(0).val(
                $(this).find(field+'=user_name]').eq(0).html());
            $(modal_el).find('.modal_message_sex').eq(0).val(
                $(this).find(field+'=sex]').eq(0).html());
            $(modal_el).find('.modal_message_age').eq(0).val(
                $(this).find(field+'=age]').eq(0).html());
            $(modal_el).find('.modal_message_phone').eq(0).val(
                $(this).find(field+'=phone]').eq(0).html());
            $(modal_el).find('.modal_message_email').eq(0).val(
                $(this).find(field+'=email]').eq(0).html());
            $(modal_el).find('.modal_message_receiving_address').eq(0).val(
                $(this).find(field+'=receiving_address]').eq(0).html());
            $(modal_el).find('.modal_message_created_time').eq(0).val(
                $(this).find(field+'=created_at]').eq(0).html());
        }


        // 获取数据
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.user);
                initTr();
                bookSystem.initDelegate(function(){
                    initTr();
                });
            })
        }

        getData();

        // 添加数据
        (function(){

            $('.add-user-btn').click(function(){
                var user = {
                    name : $('#add_name').val(),
                    user_name : $('#add_userName').val(),
                    password : $('#add_password').val(),
                    again_password_ : $('#add_again_password').val(),
                    age : $('#add_age').val(),
                    sex : $('#add_sex').val(),
                    phone : $('#add_phone').val(),
                    email : $('#add_email').val(),
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
                if (!bookSystem.check(user)){
                    return false;
                }
                var data = {
                    user : user
                };
                bookSystem.addData(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                    }else{
                        return false;
                    }
                });

            });

        }());

        // 删除数据
        (function(){

            $('.remove-user-btn').click(function(){
                var aId = [],
                    checkbox = $('#user-table tbody tr input[type=checkbox]');
                $(checkbox).each(function(){
                    if ($(this).is(':checked')){
                        aId.push($(this).parent().parent().attr('data-uniqueid'));
                    }
                });
                if (aId.length === 0){
                    return;
                }
                if (!confirm('删除是不可恢复的，确定吗')){
                    return;
                }
                bookSystem.removeData(url,{aId:aId},function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                    }
                });

            });

        }());

        // 更新数据
        (function(){
            var id = '';
            function openUpdate(){
                bookSystem.openUpdate(function(current){
                    id = $(current).attr('data-uniqueid');
                    var field = 'td[data-field';
                    setMessage.call($(current),$('.open-update-btn').attr('data-target'),field);
                });
            }
            openUpdate();

            $('.update-btn').click(function(){
                var modal = $($('.open-update-btn').attr('data-target')),
                    user = {
                        name : $(modal).find('.modal_message_name').val(),
                        user_name : $(modal).find('.modal_message_user_name').val(),
                        age : $(modal).find('.modal_message_age').val(),
                        sex : $(modal).find('.modal_message_sex').val(),
                        phone : $(modal).find('.modal_message_phone').val(),
                        email : $(modal).find('.modal_message_email').val(),
                        receiving_address : $(modal).find('.modal_message_receiving_address').val(),
                    },
                    add_aInput = $(modal).find('.aInput'),
                    text =  [
                        '姓名不能为空','用户名不能为空', '年龄不能为空','请选择性别','电话不能为空','邮箱不能为空',
                        '收货地址不能为空！'
                    ];
                for (var i=0;i<$(add_aInput).length;i++){
                    if (!$(add_aInput[i]).val()){
                        alert(text[i]);
                        return false;
                    }
                }
                if (!bookSystem.check(user)){
                    return false;
                }
                var data = {
                    id : id,
                    user : user
                };
                bookSystem.update(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                        openUpdate();
                    }else{
                        return false;
                    }
                });
            });

        }());

        // 查询
        (function(){

            $('.query-btn').click(function(){
                var user_id = $('#query_user_id').val(),
                    user_name = $('#query_user_name').val();
                data = {
                    user_id : user_id,
                    user_name : user_name
                };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    initTr();
                });
            });

        }());

    });

});