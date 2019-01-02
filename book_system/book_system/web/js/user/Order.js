/**
 * Created by Administrator on 2017/12/19.
 */
jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/user/Order.php';

        function initTable(data){
            bookSystem.initTable('#order-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '订单编号',
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

    });

});