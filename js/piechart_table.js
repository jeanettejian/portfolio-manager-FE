
// Initialize the chart
var pieChart = echarts.init(document.getElementById('piechart'));
let urlPortfolio = "http://localhost:8081/stocks/getMystocks";

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
            data: []
        }
    ]
};

function getDate(dateString) {
    const date = new Date(dateString);
    const dateOnly = date.toISOString().split('T')[0];
    return dateOnly;
}

async function fetchPortfolio(url) {
    let response = await fetch(url);
    let portfolioJson = response.json();
    return portfolioJson;
}

async function updatePieChart() {
    let portfolioData = await fetchPortfolio(urlPortfolio);
    let chartData = [];
    await portfolioData.forEach(asset => {
        let assetValue = asset.buy_in_price * asset.shares;
        chartData.push({
            value: assetValue,
            name: asset.share_name
        })
    })
    option.series[0].data = chartData;
    pieChart.setOption(option);
}

async function updateTable() {
    let portfolioData = await fetchPortfolio(urlPortfolio);
    console.log(portfolioData)

    const tableBody = document.getElementById('assetTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    portfolioData.forEach(row => {
        row.buy_in_date = getDate(row.buy_in_date);
        const tr = document.createElement('tr');
        Object.values(row).forEach(cellText => {
            const td = document.createElement('td');
            td.textContent = cellText;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

window.onload = async function () {
    console.log('window.onload executed');

    updatePieChart();
    updateTable();
}