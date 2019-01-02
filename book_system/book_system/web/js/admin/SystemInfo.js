jQuery(function(){

    $(document).ready(function(){

        var url = '../../php/admin/SystemInfo.php';

        function initTable(data){
            bookSystem.initTable('#system-info-table',data,[{
                checkbox: true
            }, {
                field: 'id',
                title: '信息编号'
            }, {
                field: 'type',
                title: '信息类型'
            }, {
                field: 'created_at',
                title: '发布时间'
            }, {
                field: 'content',
                title: '内容'
            }, ]);
        }

        function initTr(){
            bookSystem.initTr('#system-info-table','#info-message',function(modal_el,field){
                $(modal_el).find('.modal-title').eq(0).html(
                    $(this).find(field+'=type]').eq(0).html());

                $(modal_el).find('.modal-info-content').eq(0).html(
                    $(this).find(field+'=content]').eq(0).html());

                $(modal_el).find('.time').eq(0).html(
                    $(this).find(field+'=created_at]').eq(0).html());
            });
        }

        // 获取数据
        function getData(){
            bookSystem.getData(url,function(data){
                initTable(data.system_info);
                initTr();
                bookSystem.initDelegate(function(){
                    initTr();
                });
            })
        }

        getData();

        // 添加数据
        (function(){

            $('.add-system-info-btn').click(function(){
                var info_type = $('#add_info_type').val(),
                    info_content = $('#add_info_content').val();
                if (!info_content){
                    return alert('系统信息不能为空！');
                }
                var data = {
                    info_type : info_type,
                    info_content : info_content
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

            $('.remove-info-btn').click(function(){
                var aId = [],
                    checkbox = $('#system-info-table tbody tr input[type=checkbox]');
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
                    $('#update_info_type').val($(current).find('td[data-field=type]').html());
                    $('#update_info_content').val($(current).find('td[data-field=content]').html());;
                });
            }
            openUpdate();

            $('.update-btn').click(function(){
                var update_info_type = $('#update_info_type').val(),
                    update_info_content = $('#update_info_content').val();
                if (!update_info_type){
                    alert('请选择信息类型！');
                    return false;
                }
                if (!update_info_content){
                    alert('请输入信息内容！');
                    return false;
                }

                var data = {
                    id : id,
                    type : update_info_type,
                    content : update_info_content
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
                var type = $('#query_info_type').val(),
                    content = $('#query_info_content').val();
                data = {
                    type : type,
                    content : content
                };
                bookSystem.query(url,data,function(data){
                    initTable(data.content);
                    initTr();
                });
            });

        }());

    });

});