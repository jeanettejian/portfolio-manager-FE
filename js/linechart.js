let urlPortfolio = "http://localhost:8081/artists/getstocks";

// Fetch portfolio value data from the back end
async function fetchPortfolio(url, start, end) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            startDate: start,
            endDate: end
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = response.json();
    return data;
}

// 更新图表数据
function updateChart(data, start, end) {
    let startDate = new Date(start); // 替换为你的开始日期
    let endDate = new Date(end); // 替换为你的结束日期
    
    let categories = generateWeekdaysArray(startDate,endDate); // 日期数组
    console.log(categories)
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

//update start date and end date from the date picker
function updateDate() {
    var startDateStr = document.getElementById('startDate').value;
    var endDateStr = document.getElementById('endDate').value;
    var resultDiv = document.getElementById('resultDate');

    if (startDateStr && endDateStr) {
        let startDate = new Date(startDateStr);
        let endDate = new Date(endDateStr);
        if (startDate > endDate) {
            // resultDiv.innerHTML = 'Start date cannot be later than end date!';
            alert('Start date cannot be later than end date!');
        } else { // Dates changed
            resultDiv.innerHTML = 'Selected Date Range: ' + startDateStr + ' to ' + endDateStr;
            submitDate(urlPortfolio, startDateStr, endDateStr);
        }
    } else {
        resultDiv.innerHTML = 'Please select both start date and end date';
    }
}

async function submitDate(url, startDate, endDate){
    let data = await fetchPortfolio(url, startDate, endDate);
    console.log(startDate, endDate);
    updateChart(data, startDate, endDate);
}

// document.getElementById('startDate').addEventListener('change', updateDate);
// document.getElementById('endDate').addEventListener('change', updateDate);

// let valueJson = await fetchPortfolio(urlPortfolio);
// console.log(valueJson);

// let values = [];
// let dates = [];
// valueJson.forEach(item => {
//     let {portfolioValue, time} = item;
//     values.push(portfolioValue);
//     dates.push(time);
// })

// console.log(values)
// console.log(dates)

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
            console.log(categories)
        }
        currentDate.setDate(currentDate.getDate() + 1); // 将日期加一天
    }
    console.log("cat:", categories)
    return categories;
}
// 基于准备好的 DOM，初始化 ECharts 实例

var myChart = echarts.init(document.getElementById('linechart'));

// 指定图表的初始配置项和数据
var option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:[],
    },
    xAxis: {
        type: 'category',
        data: []
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
        // const response = await fetch('http://localhost:8081/artists/getstocks', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         startDate: '2023-01-09',
        //         endDate: '2023-01-20'
        //     })
        // });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        const defaultStart = '2023-01-09';
        const defaultEnd = '2023-01-20';
        const data = await fetchPortfolio(urlPortfolio, defaultStart, defaultEnd);


        // 处理和更新数据
        updateChart(data, defaultStart, defaultEnd);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};