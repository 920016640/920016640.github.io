define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'gz/index' + location.search,
                    add_url: 'gz/add',
                    edit_url: 'gz/edit',
                    del_url: 'gz/del',
                    multi_url: 'gz/multi',
                    import_url: 'gz/import',
                    table: 'gz',
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
                        {field: 'xm.name', title: __('Xm.name'), operate: 'LIKE'},
                        {field: 'xm_ids', title: __('Xm_ids'), operate: 'LIKE'},
                        {field: 'jj', title: __('Jj'), operate: 'LIKE'},
                        {field: 'yjsy', title: __('Yjsy'), operate: 'LIKE'},
                        {field: 'gzry', title: __('Gzry'), operate: 'LIKE'},
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