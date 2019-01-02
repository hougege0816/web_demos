/**
 * Created by Administrator on 2017/12/19.
 */
jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/Comment.php',
            bookClassUrl = '../../php/admin/BookClass.php';

        function initTable(data){
            bookSystem.initTable('#comment-table',data,[{
                checkbox: true
            }, {
                field: 'user_id',
                title: '用户id'
            }, {
                field: 'user_name',
                title: '用户名'
            }, {
                field: 'book_id',
                title: '书籍id'
            }, {
                field: 'book_name',
                title: '书名'
            }, {
                field: 'book_type',
                title: '图书类型'
            },  {
                field: 'content',
                title: '评论内容'
            },  {
                field: 'created_at',
                title: '评论时间',
            },{
                field: 'state',
                title: '简介'
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#comment-table','#modal-comment-message',function(modal_el,field){
                $(this).find('td[data-field]').each(function(){
                    var _field = $(this).attr('data-field');
                    $(modal_el).find('*[data-field='+ _field +']').val($(this).html());
                    $(modal_el).find('*[data-field]').attr('disabled','disabled');
                });
            });
        }

        function checkComment(state){
            var aId = [],
                checkbox = $('#comment-table tbody tr input[type=checkbox]');
            $(checkbox).each(function(){
                if ($(this).is(':checked')){
                    aId.push($(this).parent().parent().attr('data-uniqueid'));
                }
            });
            if (aId.length === 0){
                alert('请选择行！');
                return false;
            }
            if (!confirm('确定通过评论吗？')){
                return;
            }
            var data = {
                aId : aId,
                state : state
            };
            bookSystem.update(url,data,function(data){
                alert(data.content);
                if (data.success){
                    getData();
                }
            });
        }

        // 获取评论
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.comment);
                initTr();
                bookSystem.initDelegate(function(){
                    initTr();
                });
            })
        }

        getData();


        // 屏蔽评论
        (function(){

            $('.remove-comment-btn').click(function(){
                var aId = [],
                    checkbox = $('#comment-table tbody tr input[type=checkbox]');
                $(checkbox).each(function(){
                    if ($(this).is(':checked')){
                        aId.push($(this).parent().parent().attr('data-uniqueid'));
                    }
                });
                if (aId.length === 0){
                    return;
                }
                if (!confirm('屏蔽是不可恢复的，确定吗')){
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

        // 通过评论
        (function(){
            $('.adopt-comment-btn').click(function(){
                checkComment.call($(this),'已通过');
            });
        }());

        // 查询
        (function(){

            $('.query-btn').click(function(){
                var book_type = $('#query_book_type').val(),
                    book_name = $('#query_book_name').val(),
                data = {
                    book_type : book_type,
                    book_name : book_name,
                };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    initTr();
                });
            });

        }());

        // 显示所有
        (function(){
            $('.display-all-btn').click(function(){
                getData();
            });
        }());

        // 显示待审核
        (function(){
            $('.display-wait-btn').click(function(){
                bookSystem.displayComment(url,{state:'待审核'},function(data){
                    initTable(data.content);
                    initTr();
                });
            });
        }());

        // 显示已通过
        (function(){
            $('.display-adopt-btn').click(function(){
                bookSystem.displayComment(url,{state:'已通过'},function(data){
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
                    $('#query_book_type').html(html).prepend("<option value='all'>全部</option>").val('all');
                });
            }
            getBookClass();

        }());

    });

});