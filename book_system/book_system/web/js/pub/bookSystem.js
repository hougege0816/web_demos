var bookSystem = {};
(function(){
    bookSystem.login = function(url,indexUrl){
        var verifyCode = new GVerify("v_container");


        $('#login_btn').click(function(){
            var userName = $('#userName').val(),
                userPassword = $('#userPassword').val();
            if (!userName){
                return alert('请输入用户名');
            }
            if (!userPassword){
                return alert('请输入用户密码！');
            }
            var res = verifyCode.validate($('#code_input').val());
            if(!res){
                return alert("验证码错误");
            }

            var data = {
                user_name : userName,
                user_password : userPassword
            };
            bookSystem.send(url,data,null,function(data){
                if (data.success === 'success'){
                    location.href = indexUrl;
                }else{
                    alert(data.success);
                }
            });
        });
    };

    bookSystem.send = function(url,data,method,callback){
        var newData = {};
        newData.method = method;
        for (var i in data){
            newData[i] = data[i];
        }
        $.ajax({
            type : 'post',
            url : url,
            data : newData,
            success : function(data){
                var data = JSON.parse(data);
                callback(data);
            }
        });
    };

    bookSystem.getData = function(url,callback){
        var data = {
            method : 'get'
        };
        this.send(url,data,'',callback);
    };

    bookSystem.addData = function(url,data,callback){
        this.send(url,data,'add',callback);
    };

    bookSystem.removeData = function(url,data,callback){
        this.send(url,data,'remove',callback);
    };

    bookSystem.update = function(url,data,callback){
        this.send(url,data,'update',callback);
    };

    bookSystem.query = function(url,data,callback){
        this.send(url,data,'query',callback);
    };

    bookSystem.resetPassword = function(url,data,callback){
        this.send(url,data,'reset_password',callback);
    };

    bookSystem.displayComment = function(url,data,callback){
        this.send(url,data,'display',callback);
    };

    bookSystem.getBookComment = function(url,data,callback){
        this.send(url,data,'getBookComment',callback);
    };

    bookSystem.openUpdate = function(callback){
        $('.open-update-btn').on('click',function(){
            var result = 0,
                current = '';
            $($(this).attr('data-table')).find('tbody td input[type=checkbox]').map(function(index,el){
                if ($(this).is(':checked')){
                    result++;
                    current=$(this).parent().parent();
                }
            });
            if (result===0){
                alert('请选择要编辑的行');
                return false;
            }
            if (result>1){
                alert('只能选择一行');
                return false;
            }
            callback(current);
        });

    };


    bookSystem.initTable = function(el,data,columns){
        $(el).bootstrapTable('destroy');
        $(el).bootstrapTable({
            data : data,
            method: 'post',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100,'ALL'],        //可供选择的每页的行数（*）
            strictSearch: true,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            columns : columns
        });

    };

    bookSystem.initTr = function(table,modal_el,callback){
        $(table +' tbody tr td').each(function(){
            $(this).attr({
                'data-field' : $(table+' thead tr th:nth-of-type('+ parseInt($(this).index()+1) +')').attr('data-field')
            });
        });

        var tr = $(table+' tbody tr');

        $(tr).attr({
            'data-toggle' : 'modal',
            'data-target' : modal_el
        });
        $(tr).on('click',function(){
            var field = 'td[data-field';

           if (callback){
               callback.call($(this),modal_el,field);
           }
        });
    };

    bookSystem.initDelegate = function(callback){
        $("body").delegate('.fixed-table-pagination .pagination a', 'mouseup', function () {
            setTimeout(function(){
                callback();
            },100);
        });
    };

    bookSystem.check = function(user){
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

}());