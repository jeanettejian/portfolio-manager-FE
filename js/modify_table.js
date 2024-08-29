let urlPortfolio = "http://localhost:8081/artists/getMystocks";

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
    updateTable();
}