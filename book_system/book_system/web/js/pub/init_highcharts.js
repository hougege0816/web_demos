jQuery(function(){

    $(document).ready(function(){
        Highcharts.chart('highcharts_container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '图书分类比例图'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: '文学',
                    y: 10
                }, {
                    name: '艺术',
                    y: 8.03,
                    sliced: true,
                    selected: true
                }, {
                    name: '历史、地理',
                    y: 5.38
                }, {
                    name: '哲学',
                    y: 4.77
                }, {
                    name: '政治、法律',
                    y: 0.91
                }, {
                    name: '数学科学和化学',
                    y: 5
                },{
                    name: '社会科学总论',
                    y: 5
                },{
                    name: '网络小说',
                    y: 4.2
                },{
                    name: '世界名著',
                    y: 6.2
                }]
            }]
        });
    });

});