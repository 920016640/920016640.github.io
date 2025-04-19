define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'echarts', 'echarts-theme'], function ($, undefined, Backend, Table, Form, Echarts) {

    var Controller = {
        index: function () {

            //数据渲染
            var myChart = {},option = {},formatter;
            for(i = 0,len = Config.totalChart.length; i < len; i++) {
                if(Config.totalChart[i].chart_type == 'pie'){
                    option[i] = {
                        title: {
                            text: Config.totalChart[i].title,
                            subtext: Config.totalChart[i].subtext
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}：{c}' + Config.totalChart[i].unit + '（{d}%）'
                        },
                        legend: {
                            show: false,
                            data: Config.totalChart[i].category
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: false},
                                saveAsImage: {show: true}
                            }
                        },
                        series: [
                            {
                                name: Config.totalChart[i].legend_title,
                                type: 'pie',
                                radius: ['20%', '60%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'left',
                                        formatter: '{b}：{c}' + Config.totalChart[i].unit + '（{d}%）',
                                    }
                                },
                                normal: {
                                    show: false,//是否显示标签
                                },
                                data: Config.totalChart[i].data
                            }
                        ]
                    };
                } else if (Config.totalChart[i].chart_type == 'graph') {
                    option[i] = {
                        title: {
                            text: Config.totalChart[i].title,
                            subtext: Config.totalChart[i].subtext
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b}<br>{a0} : {c0} ' + Config.totalChart[i].unit
                        },
                        legend: {
                            data: [Config.totalChart[i].legend_title]
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        grid: [{
                            top: 65
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                data: Config.totalChart[i].category
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: Config.totalChart[i].legend_title,
                                type: 'line',
                                data: Config.totalChart[i].data,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            }
                        ]
                    };
                } else {
                    option[i] = {
                        title: {
                            text: Config.totalChart[i].title,
                            subtext: Config.totalChart[i].subtext
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b}<br>{a0} : {c0} ' + Config.totalChart[i].unit
                        },
                        legend: {
                            data: [Config.totalChart[i].legend_title]
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        grid: [{
                            top: 65
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                data: Config.totalChart[i].category
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: Config.totalChart[i].legend_title,
                                type: 'bar',
                                data: Config.totalChart[i].data,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            }
                        ]
                    };
                }

                myChart[i] = Echarts.init($('#echarts' + Config.totalChart[i].id)[0], 'walden');
                myChart[i].setOption(option[i]);
            }


            //绑定搜索表单
            Form.api.bindevent($("#form1"));

            //自定义时间范围
            $("#customcharts_datetimerange").data("callback", function (start, end) {
                var date = start.format(this.locale.format) + " - " + end.format(this.locale.format);
                $(this.element).val(date);
                refresh_echart(date);
            });

            //重新查询数据
            var refresh_echart = function (date) {
                Fast.api.ajax({
                    url: 'customcharts/show/index',
                    data: {date: date},
                    loading: false
                }, function (data) {
                    for(j = 0,len = data.length; j < len; j++) {
                        if (option[j].legend != undefined) {
                            option[j].legend.data = data[j].category;
                        }
                        if (option[j].xAxis != undefined) {
                            option[j].xAxis[0].data = data[j].category;
                        }
                        option[j].series[0].data = data[j].data;
                        myChart[j].clear();
                        myChart[j].setOption(option[j], true);
                    }
                    return false;
                });
            };

            //点击按钮
            $(document).on("click", ".btn-filter", function () {
                var label = $(this).text();
                var obj = $(this).closest("form").find("#customcharts_datetimerange").data("daterangepicker");
                var dates = obj.ranges[label];
                obj.startDate = dates[0];
                obj.endDate = dates[1];
                obj.clickApply();
            });

            //点击刷新
            $(document).on("click", ".btn-refresh", function () {
                var date = $('#customcharts_datetimerange').val();
                refresh_echart(date);
            });
            //每隔一分钟定时刷新图表
            setInterval(function () {
                $(".btn-refresh").trigger("click");
            }, 60000);
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
