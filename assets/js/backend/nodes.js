define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'nodes/index' + location.search,
                    add_url: 'nodes/add',
                    edit_url: 'nodes/edit',
                    del_url: 'nodes/del',
                    multi_url: 'nodes/multi',
                    import_url: 'nodes/import',
                    table: 'nodes',
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
                        {field: 'color', title: __('Color'), operate: 'LIKE'},
                        {field: 'position', title: __('Position'), operate: 'LIKE'},
                        {field: 'from', title: __('From'), operate: 'LIKE'},
                        {field: 'to', title: __('To'), operate: 'LIKE'},
                        {field: 'text', title: __('Text'), operate: 'LIKE'},
                        {field: 'source', title: __('Source'), operate: 'LIKE'},
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