/**
 * Created by Administrator on 2017/12/19.
 */
jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/Order.php';

        function initTable(data){
            bookSystem.initTable('#order-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '订单编号',
            },{
                field: 'user_id',
                title: '用户id',
            },{
                field: 'login_name',
                title: '用户登录名',
            },{
                field: 'user_name',
                title: '收货人名字',
            }, {
                field: 'phone',
                title: '联系电话',
            }, {
                field: 'book_id',
                title: '书籍id',
            }, {
                field: 'book_name',
                title: '书名',
            }, {
                field: 'author',
                title: '作者',
            }, {
                field: 'book_type',
                title: '图书类型',
            },  {
                field: 'order_count',
                title: '订购数量',
            }, {
                field: 'total',
                title: '总价',
            }, {
                field: 'receiving_address',
                title: '收货地址',
            }, {
                field: 'message',
                title: '备注',
            },  {
                field: 'state',
                title: '状态',
            }, {
                field: 'created_at',
                title: '订购时间',
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#order-table','#modal-order-message',function(modal_el,field){
                $(this).find('td[data-field]').each(function(){
                    var _field = $(this).attr('data-field');
                    $(modal_el).find('*[data-field='+ _field +']').val($(this).html());
                    $(modal_el).find('*[data-field]').attr('disabled','disabled');
                });
            });
        }

        function checkComment(state){
            var aId = [],
                checkbox = $('#order-table tbody tr input[type=checkbox]');
            $(checkbox).each(function(){
                if ($(this).is(':checked')){
                    aId.push($(this).parent().parent().attr('data-uniqueid'));
                }
            });
            if (aId.length === 0){
                alert('请选择行！');
                return false;
            }
            if (!confirm('确定发货吗？')){
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



        // 获取订单
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.order);
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
                var order_id = $('#query_order_id').val(),
                    book_name = $('#query_book_name').val(),
                    data = {
                        order_id : order_id,
                        book_name : book_name,
                    };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    initTr();
                });
            });

        }());
        // 屏蔽评论
        (function(){

            $('.remove-comment-btn').click(function(){
                var aId = [],
                    checkbox = $('#order-table tbody tr input[type=checkbox]');
                $(checkbox).each(function(){
                    if ($(this).is(':checked')){
                        aId.push($(this).parent().parent().attr('data-uniqueid'));
                    }
                });
                if (aId.length === 0){
                    return;
                }
                if (!confirm('拒绝发货是不可恢复的，确定吗')){
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

        // 发货
        (function(){
            $('.deliver-comment-btn').click(function(){
                checkComment.call($(this),'已发货');
            });
        }());

        // 显示所有
        (function(){
            $('.display-all-btn').click(function(){
                getData();
            });
        }());

        // 显示待发货
        (function(){
            $('.display-wait-btn').click(function(){
                bookSystem.displayComment(url,{state:'待发货'},function(data){
                    initTable(data.content);
                    initTr();
                });
            });
        }());

        // 显示已发货
        (function(){
            $('.display-adopt-btn').click(function(){
                bookSystem.displayComment(url,{state:'已发货'},function(data){
                    initTable(data.content);
                    initTr();
                });
            });
        }());



    });

});