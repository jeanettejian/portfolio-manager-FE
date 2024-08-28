// 工具函数：判断是否为工作日（周一到周五）
function isWeekday(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 为周日，6 为周六
}

// 工具函数：生成日期范围内的所有工作日
function generateWeekdaysArray(startDate, endDate) {
    const categories = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isWeekday(currentDate)) {
            categories.push(currentDate.toISOString().split('T')[0]); // 将日期格式化为 YYYY-MM-DD
        }
        currentDate.setDate(currentDate.getDate() + 1); // 将日期加一天
    }

    return categories;
}
// 基于准备好的 DOM，初始化 ECharts 实例

var myChart = echarts.init(document.getElementById('linechart'));

// 指定图表的初始配置项和数据
var option = {
    title: {
        text: '股票价格趋势'
    },
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
window.onload = async function () {
    console.log('window.onload 已执行'); // 在这里添加日志输出

    try {
        // 发起 GET 请求获取数据
        const response = await fetch('http://localhost:8081/artists/getstocks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate: '2023-01-09',
                endDate: '2023-01-20'
            })
        });

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
    const startDate = new Date('2023-01-09'); // 替换为你的开始日期
    const endDate = new Date('2023-01-22'); // 替换为你的结束日期
    
    const categories = generateWeekdaysArray(startDate,endDate); // 日期数组
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