function updateResult() {
    var startDateStr = document.getElementById('startDate').value;
    var endDateStr = document.getElementById('endDate').value;
    var resultDiv = document.getElementById('resultDate');

    if (startDateStr && endDateStr) {
        let startDate = new Date(startDateStr);
        let endDate = new Date(endDateStr);
        if (startDate > endDate) {
            resultDiv.innerHTML = 'Start date cannot be later than end date!';
        } else {
            resultDiv.innerHTML = 'Selected Date Range: ' + startDateStr + ' to ' + endDateStr;
        }
    } else {
        resultDiv.innerHTML = 'Please select both start date and end date';
    }
}

document.getElementById('startDate').addEventListener('change', updateResult);
document.getElementById('endDate').addEventListener('change', updateResult);