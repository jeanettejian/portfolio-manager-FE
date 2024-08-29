let urlAsset = "http://localhost:8081/artists/getstocks";
let urlPortfolio = "http://localhost:8081/artists/getMystocks";
var AssetChart = echarts.init(document.getElementById('linechartAsset'));
var PoChart = echarts.init(document.getElementById('linechartPo'));

// Fetch portfolio value data from the back end
async function fetchData(url, start, end) {
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

async function fetchPortfolio(url) {
    let response = await fetch(url);
    let portfolioJson = response.json();
    return portfolioJson;
}

// 更新Asset图表
function updateAssetChart(data, start, end) {
    let startDate = new Date(start); // 替换为你的开始日期
    let endDate = new Date(end); // 替换为你的结束日期

    let categories = generateWeekdaysArray(startDate, endDate); // 日期数组
    const seriesData = [];

    data.forEach(item => {
        seriesData.push({
            name: item.stock_name,
            type: 'line',
            data: item.price
        });
    });
    console.log('data', data)

    // 更新 ECharts 图表配置
    AssetChart.setOption({
        xAxis: {
            data: categories
        },
        series: seriesData
    });
}

//Update Portfolio Line Chart
function updatePortfolioChart(data, portfolio, start, end) {
    let startDate = new Date(start); // 替换为你的开始日期
    let endDate = new Date(end); // 替换为你的结束日期

    let value_series = [];
    data.forEach(item => {
        let shares = 0;
        portfolio.forEach(asset => {
            if (asset.share_name == item.stock_name) {
                shares = asset.shares;
            }
        })
        console.log(shares);
        let single_values = item.price.map(single_price => single_price*shares);
        value_series.push(single_values);
    })
    
    console.log("value_series:", value_series);
    let value_array = [];
    for(let j=0;j<value_series[0].length;j++){
        let sum_column = 0;
        for(let i=0;i<value_series.length;i++){
            sum_column += value_series[i][j];
        }
        value_array.push(sum_column);
    }
    console.log(value_array)

    let categories = generateWeekdaysArray(startDate, endDate); // 日期数组
    const seriesData = [{
        name: 'Portfolio Monetary Value',
        type: 'line',
        data: value_array
    }];

    // 更新 ECharts 图表配置
    PoChart.setOption({
        xAxis: {
            data: categories
        },
        series: seriesData
    });
}

//update start date and end date from the date picker
function updateDate(sign) {
    if (sign === 'A') {
        var startDateStr = document.getElementById('startDate').value;
        var endDateStr = document.getElementById('endDate').value;
        var resultDiv = document.getElementById('resultDate');
    }
    else {
        var startDateStr = document.getElementById('startDatePo').value;
        var endDateStr = document.getElementById('endDatePo').value;
        var resultDiv = document.getElementById('resultDatePo');
    }

    if (startDateStr && endDateStr) {
        let startDate = new Date(startDateStr);
        let endDate = new Date(endDateStr);
        if (startDate > endDate) {
            // resultDiv.innerHTML = 'Start date cannot be later than end date!';
            alert('Start date cannot be later than end date!');
        } else { // Dates changed
            resultDiv.innerHTML = 'Selected Date Range: ' + startDateStr + ' to ' + endDateStr;
            submitDate(startDateStr, endDateStr, sign);
        }
    } else {
        resultDiv.innerHTML = 'Please select both start date and end date';
    }
}

async function submitDate(startDate, endDate, sign) {
    let data = await fetchData(urlAsset, startDate, endDate);
    if (sign === 'A') {
        updateAssetChart(data, startDate, endDate);
    }
    else {
        let portfolio = await fetchPortfolio(urlPortfolio);
        updatePortfolioChart(data, portfolio, startDate, endDate);
    }
}

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

// 指定图表的初始配置项和数据
var option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {},
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
AssetChart.setOption(option);
PoChart.setOption(option);

// 页面加载时自动调用
window.onload = async function () {
    console.log('window.onload 已执行'); // 在这里添加日志输出

    try {
        //Get data
        const defaultStart = '2023-01-09';
        const defaultEnd = '2023-01-20';
        const data = await fetchData(urlAsset, defaultStart, defaultEnd);
        const portfolio = await fetchPortfolio(urlPortfolio);
        console.log(portfolio);

        // Update charts
        updateAssetChart(data, defaultStart, defaultEnd);
        updatePortfolioChart(data, portfolio,  defaultStart, defaultEnd);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};