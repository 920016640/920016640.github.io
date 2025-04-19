define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'bankcard/bankcard/index' + location.search,
                    add_url: 'bankcard/bankcard/add',
                    edit_url: 'bankcard/bankcard/edit',
                    del_url: 'bankcard/bankcard/del',
                    multi_url: 'bankcard/bankcard/multi',
                    table: 'bankcard',
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
                        {field: 'user_id', title: __('User_id')},
                        {field: 'user.nickname', title: __('User.nickname')},
                        {field: 'name', title: __('Name')},
                        {field: 'bankname', title: __('Bankname'),formatter: Table.api.formatter.search},
                        {field: 'bankcode', title: __('Bankcode'),formatter: Table.api.formatter.search},
                        {field: 'cardtype', title: __('Cardtype'),formatter: Table.api.formatter.search},
                        {field: 'bankimg', title: __('Bankimg'),formatter: Table.api.formatter.search},
                        {field: 'bank', title: __('Bank'),formatter: Table.api.formatter.search},
                        {field: 'bankbranch', title: __('Bankbranch'),formatter: Table.api.formatter.search},
                        {field: 'cardtypename', title: __('Cardtypename'),formatter: Table.api.formatter.search},
                        {field: 'idcard', title: __('Idcard')},
                        {field: 'phone', title: __('Phone')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, searchList: {"2": __("Unaudited"), "1": __('Pass'), "0": __('Down')}},
                        {field: 'memo', title: __('Memo')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'publishtime', title: __('Publishtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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