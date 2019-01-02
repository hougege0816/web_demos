jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/BookClass.php';


        function initTable(data){
            bookSystem.initTable('#book-class-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '图书分类编号'
            }, {
                field: 'book_class_name',
                title: '图书分类名称'
            }, {
                field: 'created_at',
                title: '添加时间'
            }, {
                field: 'remarks',
                title: '备注'
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#book-class-table');
        }

        // 获取数据
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.book_class);
                initTr();
                bookSystem.initDelegate(function(){
                    initTr();
                });
            })
        }

        getData();

        // 添加数据
        (function(){

            $('.add-book-class-btn').click(function(){
                var class_name = $('#add_class_name').val(),
                    class_message = $('#add_class_message').val();
                if (!class_name){
                    alert('分类名称不能为空！');
                    return false;
                }if (!class_message){
                    alert('备注不能为空！');
                    return false;
                }

                var data = {
                    class_name : class_name,
                    class_message : class_message
                };
                bookSystem.addData(url,data,function(data){
                    alert(data.content);
                    if (data.success){
                        getData();
                    }
                });

            });

        }());

        // 删除数据
        (function(){

            $('.remove-book-class-btn').click(function(){
                var aId = [],
                    checkbox = $('#book-class-table tbody tr input[type=checkbox]');
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
                    $('#update_class_name').val($(current).find('td[data-field=book_class_name]').html());
                    $('#update_class_message').val($(current).find('td[data-field=remarks]').html());;
                });
            }
            openUpdate();

            $('.update-btn').click(function(){
                var update_class_name = $('#update_class_name').val(),
                    update_class_message = $('#update_class_message').val();
                if (!update_class_name){
                    alert('分类名称不能为空！');
                    return false;
                }if (!update_class_message){
                    alert('备注不能为空！');
                    return false;
                }

                var data = {
                    id : id,
                    class_name : update_class_name,
                    class_message : update_class_message
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
                var class_id = $('#query_class_id').val(),
                    class_name = $('#query_class_name').val();
                data = {
                    class_id : class_id,
                    class_name : class_name
                };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    bookSystem.initTr('#book-class-table');
                });
            });

        }());

    });

});