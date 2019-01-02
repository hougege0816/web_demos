jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/Book.php',
            commentUrl = '../../php/admin/Comment.php',
            orderUrl = '../../php/user/Order.php',
            bookClassUrl = '../../php/admin/BookClass.php',
            personalUrl = '../../php/user/Personal.php',
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

        // 添加书评
        (function(){
            $('.add-comment-btn').click(function(){
                comment.content = $('#modal_add_comment_content').val();
                if (!comment.content){
                    alert('请输入评论！');
                    return false;
                }
                bookSystem.addData(commentUrl,comment,function(data){
                    alert(data.content);
                    if (data.success){
                        $('#modal_add_comment_content').val('');
                    }
                });
            });
        }());
        

        // 订购
        (function(){
            var order = [];
            function setOrderCount(price,index){
                var total = 0;
                $('.modal_order_price').eq(index).html(price);
                $('.modal_order_price').each(function(){
                   total+=parseFloat($(this).html());
                });
                order[index].price = price;
                setTotal(total);
            }
            function setTotal(price){
                $('#modal_order_total').html(price);
            }

            $('.open-order-btn').on('click',function(){
                var html = '',
                    total = 0;
                $($(this).attr('data-table')).find('tbody td input[type=checkbox]').map(function(){
                    if ($(this).is(':checked')){
                        var tr = $(this).parent().parent();
                        order.push({
                            book_id : $(tr).attr('data-uniqueid'),
                            book_name : $(tr).find('td[data-field=book_name]').html(),
                            author : $(tr).find('td[data-field=author]').html(),
                            price : parseFloat($(tr).find('td[data-field=price]').html()),
                            order_count : 1
                        });
                    }
                });
                if (!order.length){
                    alert('请选中行！');
                    return false;
                }
                $(order).each(function(index,el){
                    html += '<div class="order_message_box row" data-price="'+el.price+'"><div class="col-md-12 form-group">' +
                        '<div class="col-md-3"><label for="">书名</label></div><div class="col-md-9">' +
                        '<input type="text" class="form-control" value="'+el.book_name+'" disabled="disabled"></div></div>' +
                        '<div class="col-md-12 form-group">' +
                        '<div class="col-md-3"><label for="">作者</label></div><div class="col-md-9">' +
                        '<input type="text" class="form-control" value="'+el.author+'" disabled="disabled"></div></div>' +
                        '<div class="col-md-12 form-group">' +
                        '<div class="col-md-3"><label for="">订购数量</label></div><div class="col-md-9">' +
                        '<input type="number" class="set_order_count form-control" data-index="'+index+'" min="1" max="100" value="1">' +
                        '</div></div><div class="col-md-12 form-group"><h5 class="pull-right">价钱：￥<span class="modal_order_price ">'+el.price+'</span></h5></div></div>';
                    total+=parseFloat(el.price);
                });
                bookSystem.getData(personalUrl,function(data){
                    $('#modal_order_user_name').val(data.user[0].name);
                    $('#modal_order_phone').val(data.user[0].phone);
                    $('#modal_order_receiving_address').html(data.user[0].receiving_address);
                });
                $('#modal_order_message_container').html(html);
                setTotal(total);
            });

            $('#modal_order_message_container').on('change input','.set_order_count',function(){
                var index = $(this).attr('data-index'),
                    price = parseFloat($(this).val()*$('.order_message_box[data-price]').eq(index).attr('data-price'));
                order[index].order_count = parseFloat($(this).val());
                setOrderCount(price,index);
            });


            $('.order-btn').click(function(){
                $(order).each(function(index,el){
                    el.user_name = $('#modal_order_user_name').val();
                    el.phone = $('#modal_order_phone').val();
                    el.receiving_address = $('#modal_order_receiving_address').val();
                    el.content = $('#modal_order_comment_content').val();
                });
                var data = {
                    order:order
                };
                bookSystem.addData(orderUrl,data,function(data){
                    alert(data.content);
                    if (!data.success){
                        return false;
                    }
                });


            });

        }());


    });

});