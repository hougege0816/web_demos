jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/Book.php',
            commentUrl = '../../php/admin/Comment.php',
            bookClassUrl = '../../php/admin/BookClass.php',
            comment = {};

        function initTable(data){
            bookSystem.initTable('#book-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '图书编号'
            }, {
                field: 'book_name',
                title: '书名'
            }, {
                field: 'author',
                title: '作者'
            }, {
                field: 'publishing_time',
                title: '出版时间'
            },  {
                field: 'press',
                title: '出版社'
            },  {
                field: 'book_type',
                title: '图书类型'
            },  {
                field: 'price',
                title: '价格'
            },  {
                field: 'state',
                title: '状态'
            },  {
                field: 'stock',
                title: '库存'
            },  {
                field: 'message',
                title: '简介'
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#book-table','#modal-book-message',function(modal_el,field){
                $(modal_el).find('#modal_book_name').eq(0).html(
                    $(this).find(field+'=book_name]').eq(0).html());

                $(modal_el).find('#modal_book_message').eq(0).html(
                    $(this).find(field+'=message]').eq(0).html());
                comment.book_id = $(this).attr('data-uniqueid');
                comment.book_name = $(this).find(field+'=book_name]').eq(0).html();
                comment.book_type = $(this).find(field+'=book_type]').eq(0).html();
                var data = {
                    book_id : comment.book_id
                };
                bookSystem.getBookComment(commentUrl,data,function(data){
                    var html = '';
                    $(data.content).each(function(index,el){
                        html += '<div class="comment-box"><h5>' +
                            '<span class="comment_name">'+el.user_name+'</span>：</h5>' +
                            '<p class="comment_message">'+el.content+'</p>' +
                            '<p class="time">'+el.created_at+'</p></div>'
                    });
                    $('.book_message_comment_container').html(html);
                });
            });
        }

        // 获取数据
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.book);
                initTr();
                bookSystem.initDelegate(function(){
                    initTr();
                });
            })
        }

        getData();

        // 添加数据
        (function(){

            $('.add-book-btn').click(function(){
                var book_name = $('#add_book_name').val(),
                    author = $('#add_author').val(),
                    book_type = $('#add_book_type').val(),
                    publishing_time = $('#add_publishing_time').val(),
                    press = $('#add_press').val(),
                    price = $('#add_price').val(),
                    stock = $('#add_stock').val(),
                    message = $('#add_message').val(),
                    aInput = $('.add_aInput'),
                    text = [
                        '书名不能为空','作者不能为空','图书类型不能为空','出版时间不能为空','出版社不能为空',
                        '价格不能为空','库存不能为空','简介不能为空'
                    ];
                for (var i=0;i<$(aInput).length;i++){
                    if (!$(aInput[i]).val()){
                        alert(text[i]);
                        return false;
                    }
                }
                var data = {
                    book_name : book_name,
                    author : author,
                    book_type : book_type,
                    publishing_time : publishing_time,
                    press : press,
                    price : price,
                    stock : stock,
                    message : message,
                };
                bookSystem.addData(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                        $('#modal-add-book').find('.add_aInput').val('').html('');
                    }
                });

            });

        }());

        // 删除数据
        (function(){

            $('.remove-book-btn').click(function(){
                var aId = [],
                    checkbox = $('#book-table tbody tr input[type=checkbox]');
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
                    $('#update_book_name_title').html($(current).find('td[data-field=book_name]').html());
                    $('#update_book_name').val($(current).find('td[data-field=book_name]').html());
                    $('#update_author').val($(current).find('td[data-field=author]').html());
                    $('#update_book_type').val($(current).find('td[data-field=book_type]').html());
                    $('#update_publishing_time').val($(current).find('td[data-field=publishing_time]').html());
                    $('#update_press').val($(current).find('td[data-field=press]').html());
                    $('#update_price').val($(current).find('td[data-field=price]').html());
                    $('#update_stock').val($(current).find('td[data-field=stock]').html());
                    $('#update_message').val($(current).find('td[data-field=message]').html());
                });
            }
            openUpdate();

            $('.update-btn').click(function(){

                var book_name = $('#update_book_name').val(),
                    author = $('#update_author').val(),
                    book_type = $('#update_book_type').val(),
                    publishing_time = $('#update_publishing_time').val(),
                    press = $('#update_press').val(),
                    price = $('#update_price').val(),
                    stock = $('#update_stock').val(),
                    message = $('#update_message').val(),
                    aInput = $('.update_aInput'),
                    text = [
                        '书名不能为空','作者不能为空','图书类型不能为空','出版时间不能为空','出版社不能为空',
                        '价格不能为空','库存不能为空','简介不能为空'
                    ];
                for (var i=0;i<$(aInput).length;i++){
                    if (!$(aInput[i]).val()){
                        return alert(text[i]);
                    }
                }
                var data = {
                    id : id,
                    book_name : book_name,
                    author : author,
                    book_type : book_type,
                    publishing_time : publishing_time,
                    press : press,
                    price : price,
                    stock : stock,
                    message : message,
                };
                bookSystem.update(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                    }else{
                        return false;
                    }
                });
            });

        }());

        // 查询
        (function(){

            $('.query-btn').click(function(){
                var book_class = $('#query_book_class').val(),
                    book_name = $('#query_book_name').val(),
                    author = $('#query_author').val();
                data = {
                    book_class : book_class,
                    book_name : book_name,
                    author : author,
                };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    initTr();
                });
            });

        }());

        // 获取图书分类
        (function(){

            function getBookClass(){
                bookSystem.getData(bookClassUrl,function(data){
                    var html = '';
                    data.book_class.forEach(function(el){
                        var option = "<option value='"+ el.book_class_name +"'>"+ el.book_class_name +"</option>";
                        html+=option;
                    });
                    $('.book-class-wrap').html(html);
                    $(".all-book-class").prepend("<option value='all'>全部</option>").val('all');
                });
            }
            getBookClass();
            $('.get-class-btn').click(function(){

                getBookClass();

            });

        }());


    });

});