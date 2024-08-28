
// Initialize the chart
var AssetChart = echarts.init(document.getElementById('piechart'));

// Specify the configuration options for the pie chart
var option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: 'Portfolio Percentage',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 25, name: 'GOOG' },
                { value: 15, name: 'AMZN' },
                { value: 30, name: 'AAPL' },
                { value: 20, name: 'META' },
                { value: 10, name: 'NVDA' }
            ]
        }
    ]
};

// Use the specified configuration options and data to render the chart
AssetChart.setOption(option);