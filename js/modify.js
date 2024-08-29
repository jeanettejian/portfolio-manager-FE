// 获取box-body元素

const fetchMyStockURL = 'http://localhost:8081/artists/getMystocks';
const sellStocksURL = 'http://localhost:8081/artists/sellStocks'
const fetchAllStockURL = 'http://localhost:8081/artists/getAllStocksList'
const buyStcokURL = 'http://localhost:8081/artists/addMystocks'
const share_num = document.getElementById('share_num');
const buy_share_num = document.getElementById('share_num2');
const sell_stocks_button = document.getElementById('sell_stocks_button');
const sellboxBody = document.getElementById('sell_collection_box');
const buyboxBody = document.getElementById('buy_collection_box');
const buy_stocks_button = document.getElementById('buy_stocks');


let selectedValue
let selectedBuyName
let selectedBuyPrice
// 异步函数来获取库存
async function fetchMyStocks(URL) {
    try {
        const response = await fetch(URL);

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stockList = await response.json();
        populateSelectBoxForSelling(stockList); // 调用函数来填充 select 元素
        return stockList;
    } catch (error) {
        console.error('Failed to fetch stocks:', error);
        return null;
    }
}

// 函数用于填充 select 元素
function populateSelectBoxForSelling(stockList) {
    // 清空现有的选项
    sellboxBody.innerHTML = '';

    // 遍历 stockList 并添加新的选项
    stockList.forEach(stock => {
        const option = document.createElement('option'); //<option> </option>
        option.textContent = `${stock.share_name} (${stock.shares} shares)`;
        option.value = stock.share_name;
        sellboxBody.appendChild(option);
    });
}

// 添加点击事件监听器
sellboxBody.addEventListener('click', async function () {
    if (sellboxBody.options.length === 0) {const stockList = await fetchMyStocks(fetchMyStockURL);}
    
    
});

sellboxBody.addEventListener('change',function(){
    selectedValue = sellboxBody.value

})

sell_stocks_button.addEventListener('click', async function () {
        // 获取 select 元素中的值
    var stock_name = selectedValue;

    // 获取输入框的值并转换为整数
    const inputValue = share_num.value; 
    const integerValue = parseInt(inputValue, 10); 
 
    // 检查转换结果是否为有效的整数
    if (isNaN(integerValue)) {
        console.error('Please enter a valid number of shares.');
        return; // 如果不是有效数字，退出函数
    }
    try {
        const response = await fetch(sellStocksURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                "stock_name" :stock_name,
                "shares" : integerValue
            })
        });
        console.log(response)

        // 处理响应
        if (response.ok) {
            const result = await response.json();
            console.log('Stock sold successfully:', result);
        } else {
            console.error('Failed to sell stocks:', response.statusText);
        }
    } catch (error) {
        console.error('Error occurred during the fetch:', error);
    }

});

// 函数用于填充 select 元素
function populateSelectBoxForBuying(buystockList) {
    // 清空现有的选项
    buyboxBody.innerHTML = '';

    // 遍历 stockList 并添加新的选项
    buystockList.forEach(stock => {
        const option = document.createElement('option'); //<option> </option>
        option.textContent = `${stock.ticker} (${stock.price} USD )`;
        // 使用 data-* 属性来存储自定义数据
        option.dataset.stockprice = stock.price; // 设置自定义 data-sharevalue 属性
        option.dataset.stockname = stock.ticker; 
        buyboxBody.appendChild(option);
    });
}


// 添加点击事件监听器
buyboxBody.addEventListener('click', async function () {
    
    if (buyboxBody.options.length === 0) {
        const allStockList = await fetchAllStocks(fetchAllStockURL);}
    
});

async function fetchAllStocks(URL) {
    try {
        const response = await fetch(URL);

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buystockList = await response.json();
        populateSelectBoxForBuying(buystockList); // 调用函数来填充 select 元素
        return buystockList;
    } catch (error) {
        console.error('Failed to fetch stocks:', error);
        return null;
    }
}

buyboxBody.addEventListener('change', function() {
    const selectedOption= buyboxBody.options[buyboxBody.selectedIndex];
    selectedBuyName = selectedOption.dataset.stockname; // 访问 data-sharevalue 属性
    selectedBuyPrice = selectedOption.dataset.stockprice;

});


buy_stocks_button.addEventListener('click', async function () {
    // 获取 select 元素中的值
var buy_stock_name = selectedBuyName;
var buy_stock_price = selectedBuyPrice

// 获取输入框的值并转换为整数
const buy_inputValue = buy_share_num.value; 
const buy_integerValue = parseInt(buy_inputValue, 10); 

// 检查转换结果是否为有效的整数
if (isNaN(buy_integerValue)) {
    console.error('Please enter a valid number of shares.');
    return; // 如果不是有效数字，退出函数
}
try {
    console.log('sending side',buy_stock_name,' ',buy_integerValue, ' ',buy_stock_price)
    const response = await fetch(buyStcokURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stock_name: buy_stock_name,
            shares: buy_integerValue,
            price: buy_stock_price
        })
    });buy_integerValue


    // 处理响应
    if (response.ok) {
        const result = await response.json();
        console.log('Stock sold successfully:', result);
    } else {
        console.error('Failed to sell stocks:', response.statusText);
    }
} catch (error) {
    console.error('Error occurred during the fetch:', error);
}

});