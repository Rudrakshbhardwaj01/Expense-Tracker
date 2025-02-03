const expenseInput = document.getElementById("expense");
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById("expense-category");
const addButton = document.getElementById('add');
const deleteButton = document.getElementById('delete');
const displayButton = document.getElementById('display');
const eL = document.getElementById('expense-list');
const expenseList = document.createElement('ul');
eL.appendChild(expenseList);

let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Load existing expenses

addButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    const expenseName = expenseInput.value.trim();
    const expenseAmount = amountInput.value.trim();
    const expenseCategory = categoryInput.value;

    if (expenseName === "" || expenseAmount === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create an expense object
    const expense = {
        id: Date.now(),
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory
    };

    expenses.push(expense); // Add to array
    localStorage.setItem("expenses", JSON.stringify(expenses)); // Save to localStorage
    expenseInput.value = "";
    amountInput.value = "";
    alert(expense.name + ' added successfully!');
    displayExpenses();
});
function deleteExpense() {
    expenses.shift();
}

deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteExpense();
    alert('Expense deleted successfully!');
    e.preventDefault();

})

displayButton.addEventListener("click", (e) => {
    if (eL.style.display === "none" || eL.style.display === "") {
        e.preventDefault();
        displayExpenses();
        eL.style.display = 'block';
    }
    else {
        eL.style.display = 'none';
    }


});

function displayExpenses() {
    let listElement = document.getElementById("expense-list");
    listElement.innerHTML = ""; // Clear previous content
    listElement.innerHTML = '<p id="list">Added Expenses</p>'
    expenses.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.amount} (${item.category})`;
        listElement.appendChild(listItem);
    });
}
