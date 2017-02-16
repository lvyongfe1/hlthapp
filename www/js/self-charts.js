/**
 * Created by Cxx on 2016/6/28.
 */
var app = angular.module('ngChart', ['ionic']);
var myChart;
var option;
var names = new Array();
var countNums = new Array();
app.controller("runChartCtrl",function () {});
//初始化柱状图指令
app.directive('bar', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:250px;"></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
            opinions1(names,countNums);
            myChart = echarts.init(document.getElementById($scope.id),'macarons');
            myChart.setOption(option);
        }
    };
})
    .directive('barsleep', function() {
        return {
            scope: {
                id: "@",
                legend: "=",
                item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:250px;"></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                opinions3(names,countNums);
                myChart = echarts.init(document.getElementById($scope.id),'macarons');
                myChart.setOption(option);
            }
        };
    })
    .directive('pie',function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:80px;"></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                opinions2(names,countNums);
                myChart = echarts.init(document.getElementById($scope.id),'macarons');
                myChart.setOption(option);
            }
        };
    })
    .directive('dbchart', function() {
        return {
            scope: {
                id: "@",
                legend: "=",
                item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:100%;"></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                opinions4(names,countNums);
                myChart = echarts.init(document.getElementById($scope.id),'macarons');
                myChart.setOption(option);
            }
        };
    });
//echarts柱状图参数
var opinions1=function(names,countNums){
    option = {
        title : {
            show:false
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        grid: {
            left: '5%',
            right: '8%',
            bottom: '3%',
            containLabel: true
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : names
            }
        ],
        yAxis : [
            {
                type : 'value',
                boundaryGap: [0, 0.01]
            }
        ],
        series : [
            {
                name: '处理事件',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: countNums
            }
        ]
    };
};
//echarts环形图参数
var opinions2=function(names,countNums){
var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        color:"#479cf7",
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [35, 40];
option = {
    legend: {
       show:false
    },
    title : {
        show:false
    },
    toolbox: {
        show : false
    },
    series : [
        {
            type : 'pie',
            center : ['16%', '50%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:46, itemStyle : labelBottom},
                {name:'睡眠时间', value:54,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['50%', '50%'],
            radius : radius,
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:56, itemStyle : labelBottom},
                {name:'深度睡眠', value:44,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['84%', '50%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:85, itemStyle : labelBottom},
                {name:'浅度睡眠', value:15,itemStyle : labelTop}
            ]
        }
    ]
};
};
//sleep图
var opinions3=function(names,countNums){
    option = {
        textStyle:{color:"#7084B1"},
        title : {
            text:'睡眠曲线',
            textStyle:{color:'#7084B1',fontStlye:"Microsoft Yahei",fontWeight:"lighter"},
            x:"center",
            y:0
        },
        tooltip : {
            show:false
        },
        legend: {
            show:false
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日'],
                splitLine: {
                    show: false
                },
                axisTick: {
                    lineStyle: {
                        color: '#7084B1'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#7084B1'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#7084B1'
                    }
                }
            }
        ],
        yAxis : [
            {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#7084B1'
                    }
                },
                axisLabel: {
                    textStyle: {
                    color: '#7084B1'
                }
            }
            }
        ],
        series : [
            {
                name: '处理事件',
                type: 'line',
                smooth:true,
                itemStyle: {normal: {color:'#479cf7',areaStyle: {type: 'default'}}},
                data: [50, 70, 60, 70, 80, 90, 75]
            }
        ]
    };
};
//dashboard图
var opinions4=function(names,countNums){
    var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false}
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };
    option = {
        title: {
            text: '68',
            subtext: '要加强锻炼哦',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : '#fff',
                fontFamily : 'cursive',
                fontSize : 75,
                fontWeight : 'lighter'
            },
            subtextStyle : {
                color : '#fff',
                fontSize : 18,
                fontWeight : 'lighter'
            }
        },
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name:'1',
                type:'pie',
                clockWise:false,
                radius : [110, 125],
                itemStyle : dataStyle,
                data:[
                    {
                        value:68,
                        name:'健康指数',
                        itemStyle:{normal:{color:"#88FFCF"}}
                    },
                    {
                        value:32,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };
};
