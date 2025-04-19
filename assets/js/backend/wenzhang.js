define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wenzhang/index' + location.search,
                    add_url: 'wenzhang/add',
                    edit_url: 'wenzhang/edit',
                    del_url: 'wenzhang/del',
                    multi_url: 'wenzhang/multi',
                    import_url: 'wenzhang/import',
                    table: 'wenzhang',
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
                        {field: 'bt', title: __('Bt'), operate: 'LIKE'},
                        {field: 'gjz', title: __('Gjz'), operate: 'LIKE'},
                        {field: 'nr', title: __('Nr')},
                        {field: 'img', title: __('Img'), operate: 'LIKE'},
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
            }
        }
    };
    return Controller;
});