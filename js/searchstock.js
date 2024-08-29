async function getStockInfo() {
    console.log("clicked")
    const stockSymbol = document.getElementById('stockid').value.trim().toUpperCase();
    document.getElementById('stock-table').innerHTML = '';

    if (!stockSymbol) {
        alert('Please enter a stock symbol.');
        return;
    }

    const apiKey = 'WFw96CiqAne4EVWwHAHhmzLlYiWGwIAb';
    const url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?adjusted=true&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const stockInfo = data.results[0];

            // const tableBody = document.querySelector('#stock-table tbody');
            const tableBody = document.getElementById("stock-table");
            tableBody.style = "display:flex;flex-direction:column;justify-content:space-around";
            // tableBody.innerHTML += `
            //             <tr>
            //                 <td>${stockInfo.T}</td>
            //                 <td>${new Date(stockInfo.t).toLocaleDateString()}</td>
            //                 <td>${stockInfo.v.toLocaleString()}</td>
            //                 <td>${stockInfo.vw.toFixed(2)}</td>
            //                 <td>${stockInfo.o}</td>
            //                 <td>${stockInfo.c}</td>
            //                 <td>${stockInfo.h}</td>
            //                 <td>${stockInfo.l}</td>
            //                 <td>${stockInfo.n}</td>
            //             </tr>
            //         `;
            tableBody.innerHTML += `
            <div class="row" style="color:white">
                <h1><b>${stockInfo.T}</b></h1>
                <h4>Date - <b>${new Date(stockInfo.t).toLocaleDateString()}</b></h4>
                <h3>Volume - <b>${stockInfo.v.toLocaleString()}</b></h3>
                <h3>Trades - <b>${stockInfo.n.toLocaleString()}</b></h3>
            </div>

            <div class="row" style="margin-top:20px">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-aqua"><i class="fa-solid fa-face-smile"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Open</span>
                            <span class="info-box-number">${stockInfo.o}</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-red"><i class="fa-solid fa-face-surprise"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Close</span>
                            <span class="info-box-number">${stockInfo.c}</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-green"><i class="fa-solid fa-face-laugh"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">High</span>
                            <span class="info-box-number">${stockInfo.h}</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-yellow"><i class="fa-solid fa-face-flushed"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Low</span>
                            <span class="info-box-number">${stockInfo.l}</span>
                        </div>
                    </div>
                </div>
            </div>
            `

            // document.getElementById('stock-table').style.display = 'table';
        } else {
            document.getElementById('stock-table').innerHTML = '<p>No data found for this stock symbol.</p>';
            console.log('div ->',document.getElementById('stock-table'))
            document.getElementById('stock-table').style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching stock data:', error, document.getElementById('stock-table'));
        document.getElementById('stock-table').innerHTML = `<p>Error: ${error.message}</p>`;
        document.getElementById('stock-table').style.display = 'none';
       
    }
}