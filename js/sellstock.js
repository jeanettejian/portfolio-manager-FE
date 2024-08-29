let sellurl ="http://localhost:8081/stocks/sellStocks";

async function sellShares(){
    const sellAmountInput = document.getElementById('share_num');
    const sellAmount =parseInt(sellAmountInput.value.trim());

    //validate the sell amount
    if (isNaN(sellAmount) || sellAmount <= 0) {
        alert('Please enter a valid number of shares to sell.');
        return;
    }

    // Data to be sent to the backend
    const data = {
        stock_name: 'AAPL', // Example ticker, this could be dynamic
        shares: sellAmount
    };

    try {
        const response = await fetch(sellurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Check for a successful response
        if (response.ok) {
            document.getElementById('result-message').innerText = result.message;
        } else {
            document.getElementById('result-message').innerText = 'Error: ' + result.message;
        }

        // Optionally, clear the input field
        sellAmountInput.value = '';

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result-message').innerText = 'Error selling shares. Please try again.';
    }
}

// Adding click event listener to the sell button
document.getElementById('sell-button').addEventListener('click', sellShares);
