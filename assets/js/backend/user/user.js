define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'user/user/index',
                    add_url: 'user/user/add',
                    edit_url: 'user/user/edit',
                    del_url: 'user/user/del',
                    multi_url: 'user/user/multi',
                    table: 'user',
                }
            });

            var table = $("#table");

            //当表格数据加载完成时
            table.on('load-success.bs.table', function (e, data) {
                $("#allMoney").text('￥'+data.extend.allMoney);
                $("#allYckbalance").text('￥'+data.extend.allYckbalance);
                $("#allWithDrayMoney").text('￥'+(data.extend.allWithDrayMoney))
            });

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'user.id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'), sortable: true},
                        // {field: 'group.name', title: __('Group')},
                        {field: 'group_id', title: __('Group'), searchList: {"1":'商户',"2":"代理","3":"码商"}, formatter: Table.api.formatter.status},
                        {field: 'username', title: __('Username'), operate: 'LIKE'},
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE'},
                        // {field: 'email', title: __('Email'), operate: 'LIKE'},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        // {field: 'avatar', title: __('Avatar'), events: Table.api.events.image, formatter: Table.api.formatter.image, operate: false},
                        {field: 'parentname', title: '上级用户', operate: 'LIKE'},
                        {field: 'gender', title: __('Gender'), visible: false, searchList: {1: __('Male'), 0: __('Female')}},
                        // {field: 'score', title: __('Score'), operate: 'BETWEEN', sortable: true},
                        {field: 'successions', title: __('Successions'), visible: false, operate: 'BETWEEN', sortable: true},
                        {field: 'maxsuccessions', title: __('Maxsuccessions'), visible: false, operate: 'BETWEEN', sortable: true},
                        {field: 'logintime', title: __('Logintime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        {field: 'loginip', title: __('Loginip'), formatter: Table.api.formatter.search},
                        // {field: 'jointime', title: __('Jointime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        // {field: 'joinip', title: __('Joinip'), formatter: Table.api.formatter.search},
                        {field: 'money', title: __('Money'), operate: 'BETWEEN', sortable: true},
                        {field: 'yckbalance', title: '预存款', operate: 'BETWEEN', sortable: true},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, searchList: {normal: __('Normal'), hidden: __('Hidden')}},
                        {field: 'handler', title: __('Handler'),table: table, searchable:false,events:Controller.events.handler, buttons:[
                                {
                                    name: 'content',
                                    text: __('Reset Key'),
                                    classname: 'btn btn-xs btn-success reset-key'
                                },
                                {
                                    name: 'content',
                                    text: __('Clear GoogleSecret'),
                                    classname: 'btn btn-xs btn-success clear-googlesecret',
                                    //如果没有绑定过谷歌验证码则不显示
                                    hidden:function (row, j) {
                                        return row.googlebind == '0';
                                    }
                                },
                                {
                                    name: 'content',
                                    text: '清除手机号绑定',
                                    classname: 'btn btn-xs btn-success clear-mobilebind',
                                    //如果没有绑定过谷歌验证码则不显示
                                    hidden:function (row, j) {
                                        return row.mobilebind == '0';
                                    }
                                },

                                {
                                    name: 'content',
                                    text: '通道设置',
                                    classname: 'btn btn-xs btn-success setting-channel'
                                },

                                {
                                    name: 'content',
                                    text: '账号指定',
                                    classname: 'btn btn-xs btn-success setting-account'
                                },
                                {
                                    name: 'content',
                                    text: '费率设置',
                                    classname: 'btn btn-xs btn-success setting-per'
                                },

                                


                            ], formatter: Table.api.formatter.buttons
                        },
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, buttons: [
                                {
                                    name: 'ajax',
                                    title: __('增加余额'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa fa-plus-square',
                                    url: 'user/user/plusmoney',
                                    callback: function (data) {
                                        Layer.closeAll();
                                    }
                                },{
                                    name: 'minus',
                                    title: __('减少余额'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa fa-minus-square',
                                    url: 'user/user/minusmoney',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    }
                                }],
                        formatter: Table.api.formatter.operate}
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
        //设置费率以及通道的js
        setchannel:function(){
            Controller.api.bindevent();
        },
        //设置费率以及通道的js
        setper:function(){
            Controller.api.bindevent();
        },
        //设置费率以及通道的js
        setaccount:function(){
            Controller.api.bindevent();
        },
        settlement:function(){
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        },
        formatter: {

        },
        events: {

            // 事件处理
            handler:{
                'click .setting-channel':function (e, value, row, index) {
                    e.stopPropagation();
                    var that = this;
                    var table = $(that).closest('table');
                    var options = table.bootstrapTable('getOptions');
                    var user_id = row[options.pk]
                    url = Fast.api.fixurl('user/user/setchannel/ids/'+user_id);
                    Fast.api.open(url,'通道设置-'+row['username']);

                },
                'click .setting-account':function (e, value, row, index) {
                    e.stopPropagation();
                    var that = this;
                    var table = $(that).closest('table');
                    var options = table.bootstrapTable('getOptions');
                    var user_id = row[options.pk]
                    url = Fast.api.fixurl('user/user/setaccount/ids/'+user_id);
                    Fast.api.open(url,'账号指定-'+row['username']);

                },
                'click .setting-per':function (e, value, row, index) {
                    e.stopPropagation();
                    var that = this;
                    var table = $(that).closest('table');
                    var options = table.bootstrapTable('getOptions');
                    var user_id = row[options.pk]
                    url = Fast.api.fixurl('user/user/setper/ids/'+user_id);
                    Fast.api.open(url,'费率设置-'+row['username']);

                },
                'click .reset-key':function (e, value, row, index){
                    e.stopPropagation();
                    e.preventDefault();
                    var that = this;
                    var top = $(that).offset().top - $(window).scrollTop();
                    var left = $(that).offset().left - $(window).scrollLeft() - 260;
                    if (top + 154 > $(window).height()) {
                        top = top - 154;
                    }
                    if ($(window).width() < 480) {
                        top = left = undefined;
                    }
                    Layer.confirm(
                        __('Are you sure you want to reset this %s md5key?',row['username']),
                        {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                        function (index) {
                            var table = $(that).closest('table');
                            var options = table.bootstrapTable('getOptions');
                            //发送ajajx请求
                            Fast.api.ajax({
                                url:Fast.api.fixurl('user/user/resetmd5key'),
                                data:{
                                    id:row[options.pk]
                                }
                            },function (data, ret) {
                                Layer.close(index);
                            })
                        }
                    );
                },
                //解绑google验证器
                'click .clear-googlesecret':function (e, value, row, index) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.stopPropagation();
                    e.preventDefault();
                    var that = this;
                    var top = $(that).offset().top - $(window).scrollTop();
                    var left = $(that).offset().left - $(window).scrollLeft() - 260;
                    if (top + 154 > $(window).height()) {
                        top = top - 154;
                    }
                    if ($(window).width() < 480) {
                        top = left = undefined;
                    }
                    Layer.confirm(
                        __('Are you sure you want to reset this %s google bingding?',row['merchant_id']),
                        {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                        function (index) {
                            var table = $(that).closest('table');
                            var options = table.bootstrapTable('getOptions');
                            //发送ajajx请求
                            Fast.api.ajax({
                                url:Fast.api.fixurl('user/user/resetGoogleBind'),
                                data:{
                                    id:row[options.pk]
                                }
                            },function (data, ret) {
                                Layer.close(index);
                            })
                        }
                    );
                },
                // 清除手机号绑定
                'click .clear-mobilebind':function (e, value, row, index) {
                    e.stopPropagation();
                    e.preventDefault();
                    var that = this;
                    //获取文档的视口高度
                    var top = $(that).offset().top - $(window).scrollTop();
                    var left = $(that).offset().left - $(window).scrollLeft() - 260;
                    if (top + 154 > $(window).height()) {
                        top = top - 154;
                    }
                    if ($(window).width() < 480) {
                        top = left = undefined;
                    }

                    Layer.confirm(
                        __('您确定取消%s商户的手机绑定，请仔细确认！',row['merchant_id']),
                        {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                        function (index) {
                            var table = $(that).closest('table');
                            var options = table.bootstrapTable('getOptions');
                            //发送ajajx请求
                            Fast.api.ajax({
                                url:Fast.api.fixurl('user/user/clearmobilebind'),
                                data:{
                                    id:row[options.pk]
                                }
                            },function (data, ret) {
                                Layer.close(index);
                            })
                        }
                    );

                }
            }
        }
    };
    return Controller;
});