define(['jquery', 'bootstrap', 'backend', 'table', 'form','echarts'], function ($, undefined, Backend, Table, Form,Echarts) {

    var Controller = {
        index: function () {
                        var myChart = Echarts.init(document.getElementById('echart'), 'walden');

            // 基于准备好的dom，初始化echarts实例
            var myChart = Echarts.init(document.getElementById('echart'), 'walden');


            var getChartData= function(){
                Fast.api.ajax(Fast.api.fixurl('trade/trade/chart'), function (result) {

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '实时订单统计',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        legend: {
                            data:['订单总量','成功数量','成功率']
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        xAxis: {
                            data: result.mins,
                            type: 'category',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        yAxis: [
                            {
                                type: 'value',
                                name: '交易量',
                                min: 0,
                                max: 1000,
                                interval: 100,
                                axisLabel: {
                                    formatter: '{value} 单'
                                }
                            },
                            {
                                type: 'value',
                                name: '成功率',
                                min: 0,
                                max: 100,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value} %'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'订单总量',
                                type:'bar',
                                data:result.allList,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        formatter:"总数：{c}单"
                                    }
                                },
                            },
                            {
                                name:'成功数量',
                                type:'bar',
                                data:result.succList,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        formatter:"成功：{c}单"
                                    },

                                },
                            },
                            {
                                name:'成功率',
                                type:'line',
                                yAxisIndex: 1,
                                data:result.succRateList,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        formatter:"{c}%"
                                    }
                                },
                            }
                        ]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option,true);
                    return false;
                })
            };

            getChartData();


            $(window).resize(function () {
                myChart.resize();
            });

            //每5分钟获取一次
            setInterval(function () {
                getChartData()
            },1000 * 60 * 5);
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'trade/trade/index' + location.search,
                    add_url: 'trade/trade/add',
                    edit_url: 'trade/trade/edit',
                    del_url: 'trade/trade/del',
                    multi_url: 'trade/trade/multi',
                    import_url: 'trade/trade/import',
                    table: 'trade',
                }
            });

            var table = $("#table");

            //当表格数据加载完成时
            table.on('load-success.bs.table', function (e, data) {

                $("#todayMoney").text('￥'+data.extend.todayMoney);
                $("#expenseMoney").text('￥'+(data.extend.todayExpenseMoney))

                $("#allMoney").text('￥'+data.extend.allMoney)

                $("#allExpenseMoney").text('￥'+data.extend.allExpenseMoney)

                $("#listMoney").text('￥' + data.extend.listMoney)
                $("#listHaveMoney").text('￥' + data.extend.listHaveMoney)

            });

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'pay_memberid', title: __('Pay_memberid'), operate: 'LIKE'},
                        {field: 'pay_orderid', title: __('Pay_orderid'), operate: 'LIKE'},
                        {field: 'out_trade_id', title: '下游订单号', operate: 'LIKE'},
                        {field: 'pay_amount', title: __('Pay_amount'), operate:'BETWEEN'},
                        {field: 'pay_trueamount', title: '实际金额', operate:'BETWEEN'},
                        {field: 'pay_poundage', title: __('Pay_poundage'), operate:'BETWEEN'},
                        {field: 'pay_applytime', title: __('Pay_applytime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'pay_successtime', title: __('Pay_successtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'pay_bankname', title: __('Pay_bankname'), operate: 'LIKE'},
                        {field: 'pay_status', title: __('Pay_status'), searchList: {"0":__('Pay_status 0'),"1":__('Pay_status 1'),"2":__('Pay_status 2'),"3":__('Pay_status 3')}, formatter: Table.api.formatter.status},
                        {field: 'accountname', title: __('Accountname'), operate: 'LIKE'},
                        {field: 'is_budan', title: __('Is_budan'), searchList: {"0":__('Is_budan 0'),"1":__('Is_budan 1')}, formatter: Table.api.formatter.normal},
                        {field: 'pay_tjip', title: '提交IP',operate: 'LIKE'},
                        {
                            field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate, buttons: [
                                {
                                    name: 'budan',
                                    text: '补单',
                                    icon: 'fa fa-snapchat-square',
                                    classname: 'btn btn-info btn-xs btn-ajax',
                                    url: 'trade/trade/budan',
                                    confirm: '确认补单',
                                    visible: function (row) {
                                     //返回true时按钮显示,返回false隐藏
                                        if (row.pay_status==0 || row.pay_status==3){
                                            return true;
                                        }
                                        return false;
                                    },
                                    success: function (data, ret) {
                                        window.location.reload();
                                        //如果需要阻止成功提示，则必须使用return false;
                                        //return false;
                                    },
                                    error: function (data, ret) {
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'tongzhi',
                                    text: '通知',
                                    icon: 'fa fa-refresh',
                                    classname: 'btn btn-danger btn-xs btn-ajax',
                                    url: 'trade/trade/budan',
                                    confirm: '确认重新发送通知',
                                    visible: function (row) {
                                     //返回true时按钮显示,返回false隐藏
                                        if (row.pay_status==1){
                                            return true;
                                        }
                                        return false;
                                    },
                                    success: function (data, ret) {
                                        window.location.reload();
                                        //如果需要阻止成功提示，则必须使用return false;
                                        //return false;
                                    },
                                    error: function (data, ret) {
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                }
                                
                            ],
                            formatter:function (value, row, index) {
                                var that = $.extend({}, this);
                                $(table).data("operate-del", null); // 列表页面隐藏 .编辑operate-edit  - 删除按钮operate-del
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            }
                        }
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