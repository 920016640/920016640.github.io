define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'channel/account/index' + location.search,
                    add_url: 'channel/account/add',
                    edit_url: 'channel/account/edit',
                    del_url: 'channel/account/del',
                    multi_url: 'channel/account/multi',
                    import_url: 'channel/account/import',
                    table: 'channel_account',
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
                        {field: 'name', title: __('Mch_id'), operate: 'LIKE'},
                        {field: 'channel.name', title: __('Channel_id')},
                        {field: 'status', title: __('Status'), searchList: {"1":__('Status 1'),"0":__('Status 0')}, formatter: Table.api.formatter.status},
                        {field: 'account_type', title: __('Account_type'), searchList: {"0":__('Account_type 0'),"1":__('Account_type 1')}, formatter: Table.api.formatter.normal},
                        {field: 'handler', title: __('Handler'),table: table, searchable:false, buttons:[
                                {
                                    name: 'content',
                                    text: '风控设置',
                                    classname: 'btn btn-xs btn-danger btn-dialog',
                                    'title': function (row) {
                                        return '['+row.name+']风控规则';
                                    },
                                    'url': 'channel/account/setcontrol',
                                    
                                },
                                {
                                    name: 'content',
                                    text: '费率设置',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    'title': function (row) {
                                        return '['+row.name+']通道费率';
                                    },
                                    'url': 'channel/account/setrate',
                                },
                            ], events:Controller.events.handler,formatter: Table.api.formatter.buttons
                        },
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
        setcontrol: function () {
            Controller.api.bindevent();
        },
        setrate: function () {
            Controller.api.bindevent();
        },
        events:{
            handler:{
                //打开设置费率窗口
                'click .btn-getcode':function (e, value, row, index){
                    e.stopPropagation();
                    var title = '获取链接码【'+row.name+'】';
                    var id = row.id;
                    Fast.api.open('api/account/erline/id/'+id,title,{"width":"500px","height":"700px"});
                },
                
                //打开设置费率窗口
                'click .btn-channel':function (e, value, row, index){
                    e.stopPropagation();
                    var title = '费率以及通道设置【'+row.name+'】';
                    var id = row.id;
                    Fast.api.open('account/account/setrate/ids/'+id,title);

                }

            }
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $(document).on("change", "#channel_id .sp_input", function () {
                    var upstream_id = $(this).closest(".sp_container").find(".sp_hidden").val();
                    //获取参数
                    Fast.api.ajax({
                        url:Fast.api.fixurl('channel/channel/get'),
                        data:{id:upstream_id},
                        type:'POST'
                    },function (resp) {
                        var params = resp.params;
                        if(!params){
                            alert("请设置上游接口,必须要有[接口参数]")
                            return false;
                        }
                        //修改select的项为数组
                        for (var index in params){
                            var param = params[index];
                            if(param.type == 'select'){
                                params[index].default = params[index].default.split(',')
                            }
                        }
                        var html = Template('params-tpl',{
                            params:params
                        });
                        $("#params").html(html);
                        Form.events.plupload($("form"));
                       //渲染数据
                        return false;
                    })

                });


            }
        }
    };
    return Controller;
});