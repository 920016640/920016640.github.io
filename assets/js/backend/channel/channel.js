define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'channel/channel/index' + location.search,
                    add_url: 'channel/channel/add',
                    edit_url: 'channel/channel/edit',
                    del_url: 'channel/channel/del',
                    multi_url: 'channel/channel/multi',
                    import_url: 'channel/channel/import',
                    table: 'channel',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                onLoadSuccess:function(){
                    // 这里就是数据渲染结束后的回调函数
                    $(".btn-editone,.btn-add").data("area", ['80%','80%']);
                    $(".btn-editone,.btn-add").data("shade", [0.5,"#000"]);
                },
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'code', title: __('Code'), operate: 'LIKE'},
                        {field: 'name', title: __('Title'), operate: 'LIKE'},
                        {field: 'producttype.name', title: __('Paytype')},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'status', title: __('Status'), searchList: {"1":__('Status 1'),"0":__('Status 0')}, formatter: Table.api.formatter.status},
                        {field: 'handler', title: __('Handler'),table: table, searchable:false,events:Controller.events.handler, buttons:[
                                {
                                    name: 'content',
                                    text: __('Open Children'),
                                    classname: 'btn btn-xs btn-success open-main',
                                },
                                {
                                    name: 'content',
                                    text: __('Set Control'),
                                    classname: 'btn btn-xs btn-danger btn-dialog',
                                    'title': function (row) {
                                        return '['+row.name+']风控规则';
                                    },
                                    'url': 'channel/channel/setcontrol/ids/{ids}',
                                    
                                },
                                {
                                    name: 'content',
                                    text: __('Set Rate'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    'title': function (row) {
                                        return '['+row.name+']通道费率';
                                    },
                                    'url': 'channel/channel/setrate',
                                },

                            ], formatter: Table.api.formatter.buttons
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        },
        events: {
            // 事件处理
            handler:{
               'click .open-main':function (e, value, row, index){
                    e.stopPropagation();
                    e.preventDefault();
                    url = "account?ref=addtabs&channel_id=" + row["id"];
                    window.top.location.href=url;
                },
            }
        }
    };
    return Controller;
});