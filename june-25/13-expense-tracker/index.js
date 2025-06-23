// script.js

const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");
const downloadBtn = document.getElementById("download-btn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    const transaction = {
        id: Date.now(),
        name,
        amount,
        type,
        date,
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    form.reset();
    renderTransactions();
    updateSummary();
    renderCharts();
});

function renderTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach((txn) => {
        const div = document.createElement("div");
        div.className = `transaction ${txn.type}`;
        div.innerHTML = `
      <span>${txn.name} (${txn.type})</span>
      <span>₹${txn.amount}</span>
      <span>${txn.date}</span>
      <button onclick="editTransaction(${txn.id})">Edit</button>
      <button onclick="deleteTransaction(${txn.id})">Delete</button>
    `;
        transactionList.appendChild(div);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter((txn) => txn.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    updateSummary();
    renderCharts();
}

function editTransaction(id) {
    const txn = transactions.find((t) => t.id === id);
    document.getElementById("name").value = txn.name;
    document.getElementById("amount").value = txn.amount;
    document.getElementById("type").value = txn.type;
    document.getElementById("date").value = txn.date;
    deleteTransaction(id);
}

function updateSummary() {
    const income = transactions.filter(t => t.type === "income").reduce((acc, cur) => acc + cur.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
    const balance = income - expense;

    totalIncomeEl.textContent = income.toFixed(2);
    totalExpenseEl.textContent = expense.toFixed(2);
    balanceEl.textContent = balance.toFixed(2);
}

function groupByPeriod(transactions, period) {
    const grouped = {};
    for (const txn of transactions) {
        const d = new Date(txn.date);
        let key = "";
        if (period === "day") {
            key = d.toISOString().split("T")[0];
        } else if (period === "week") {
            const weekStart = new Date(d);
            weekStart.setDate(d.getDate() - d.getDay());
            key = weekStart.toISOString().split("T")[0];
        } else if (period === "month") {
            key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        } else if (period === "year") {
            key = d.getFullYear();
        }
        if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
        grouped[key][txn.type] += txn.amount;
    }
    return grouped;
}

let dailyChart;
function renderCharts() {
    const daily = groupByPeriod(transactions, "day");

    if (dailyChart) dailyChart.destroy();
    const ctx = document.getElementById("dailyChart");
    dailyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Object.keys(daily),
            datasets: [
                {
                    label: "Income",
                    data: Object.values(daily).map(v => v.income),
                    borderColor: "#4caf50",
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    fill: true,
                },
                {
                    label: "Expense",
                    data: Object.values(daily).map(v => v.expense),
                    borderColor: "#f44336",
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    fill: true,
                }
            ]
        }
    });

    // Pie chart
    const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);

    if (window.pieChart) window.pieChart.destroy();
    const pieCtx = document.getElementById("dailyPieChart");
    window.pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [
                {
                    data: [totalIncome, totalExpense],
                    backgroundColor: ["#4caf50", "#f44336"]
                }
            ]
        }
    });
}

function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "expense_data.xlsx");
}

renderTransactions();
updateSummary();
renderCharts();
downloadBtn.addEventListener("click", downloadExcel);
