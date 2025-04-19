define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'product/product/index' + location.search,
                    add_url: 'product/product/add',
                    edit_url: 'product/product/edit',
                    del_url: 'product/product/del',
                    multi_url: 'product/product/multi',
                    import_url: 'product/product/import',
                    table: 'product',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'code', title: __('Code'), operate: 'LIKE'},
                        {field: 'polling', title: __('Polling'), searchList: {"0":__('Polling 0'),"1":__('Polling 1')}, formatter: Table.api.formatter.normal},
                        {field: 'producttype.name', title: __('Paytype')},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));

                $(document).on('change','#c-paytype',function () {
                    var api_type_id = $(this).closest(".sp_container").find(".sp_hidden").val();

                    Fast.api.ajax({
                        url:Fast.api.fixurl('product/product/getChannel'),
                        data:{id:api_type_id},
                        type:'POST'
                    },function (resp) {
                       //渲染表单
                       var html = '';
                        var channels=resp;
                        var polling=$('input[name="row[polling]"]:checked').val();
                        if (polling == '0') {
                            $('#selmodel').css('display','');
                            $('#pdtable').css('display','none');
                            html += '<option value="">直接选择或搜索选择</option>';
                            for(var i in channels){
                                
                                    html += '<option value='+channels[i].id+'>'+channels[i].name+'</option>';
                                
                            }
                            $('#channels').html(html);
                        }else if (polling == '1') {
                            $('#selmodel').css('display','none');
                            $('#pdtable').css('display','');
                            for(var i in channels){
                                
                                    html += '<tr>';
                                    html += '<td><input type="checkbox" name="w['+channels[i].id+'][pid]" lay-skin="primary" value="'+channels[i].id+'"></td>';
                                    html += '<td>'+channels[i].id+'</td>'
                                    html += '<td>'+channels[i].name+'</td>';
                                    html += '<td><input type="number" min="0" max="9" name="w['+channels[i]
                                            .id+'][weight]" class="form-control" value="1"></td>';
                                    html += '</tr>';
                                
                            }
                            $('#pdtable > tbody').html(html);
                        }
                        return false;
                    });

                })


            }
        }
    };
    return Controller;
});