async function getStockInfo() {
    console.log("clicked")
    const stockSymbol = document.getElementById('stockid').value.trim().toUpperCase();
    document.getElementById('stock-table').style.display = 'table';

    console.log('div:', document.getElementById('stock-table').style);
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

            const tableBody = document.querySelector('#stock-table tbody');
            tableBody.innerHTML += `
                        <tr>
                            <td>${stockInfo.T}</td>
                            <td>${new Date(stockInfo.t).toLocaleDateString()}</td>
                            <td>${stockInfo.v.toLocaleString()}</td>
                            <td>${stockInfo.vw.toFixed(2)}</td>
                            <td>${stockInfo.o}</td>
                            <td>${stockInfo.c}</td>
                            <td>${stockInfo.h}</td>
                            <td>${stockInfo.l}</td>
                            <td>${stockInfo.n}</td>
                        </tr>
                    `;

            document.getElementById('stock-table').style.display = 'table';
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