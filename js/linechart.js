var myChart = echarts.init(document.getElementById('linechart'));

        // 指定图表的初始配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['2023-01-10', '2023-01-11', '2023-01-12', '2023-01-13']
            },
            yAxis: {
                type: 'value'
            },
            series: [] // 初始时没有数据
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);

        // 页面加载时自动调用
        window.onload = async function() {
            console.log('window.onload 已执行'); // 在这里添加日志输出

            try {
                // 发起 GET 请求获取数据
                const response = await fetch('http://localhost:8081/artists/getstocks');
                console.log('fetching',response.json)
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();

                // 处理和更新数据
                updateChart(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        // 更新图表数据
        function updateChart(data) {
            const categories = ['2023-01-10', '2023-01-11', '2023-01-12', '2023-01-13']; // 日期数组
            const seriesData = [];

            data.forEach(item => {
                seriesData.push({
                    name: item.stock_name,
                    type: 'line',
                    data: item.price
                });
            });

            // 更新 ECharts 图表配置
            myChart.setOption({
                xAxis: {
                    data: categories
                },
                series: seriesData
            });
        }