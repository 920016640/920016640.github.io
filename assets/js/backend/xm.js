define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'xm/index' + location.search,
                    add_url: 'xm/add',
                    edit_url: 'xm/edit',
                    del_url: 'xm/del',
                    multi_url: 'xm/multi',
                    import_url: 'xm/import',
                    table: 'xm',
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
                        {field: 'xm', title: __('Xm'), operate: 'LIKE'},
                        {field: 'jj', title: __('Jj'), operate: 'LIKE'},
                        {field: 'yjsy', title: __('Yjsy')},
                        {field: 'zdtdpz', title: __('Zdtdpz')},
                        {field: 'yjrjsy', title: __('Yjrjsy')},
                        {field: 'img', title: __('Img'), operate: 'LIKE'},
                        {field: 'gz_ids', title: __('Gz_ids'), operate: 'LIKE'},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'gz.name', title: __('Gz.name'), operate: 'LIKE'},
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