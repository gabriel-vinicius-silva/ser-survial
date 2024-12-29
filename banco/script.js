// Base de dados dos usuários com H20 e GABRIEL
const users = {
    "GABRIEL": {
        password: "abcdef",
        balance: 75000,
        taxesDue: 300,
        creditLimit: 200,
        debitLimit: 200,
        loan: 0
    },
    "H20": {
        password: "H202564",
        balance: 10, // Saldo inicial de 10 VERSES
        taxesDue: 0,
        creditLimit: 200,
        debitLimit: 200,
        loan: 0,
        maxLoan: 20 // Empréstimo máximo de 20 VERSES
    }
};

// Referências aos elementos da interface
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const accountInfo = document.getElementById("account-info");
const welcomeMessage = document.getElementById("welcome-message");
const balanceDisplay = document.getElementById("balance");
const payTaxesButton = document.getElementById("pay-taxes");
const transactionMessage = document.getElementById("transaction-message");
const loanButton = document.getElementById("loan-button");
const loanAmountInput = document.getElementById("loan-amount");

// Variável para armazenar o usuário atual
let currentUser = null;

// Função para validar login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica se o nome de usuário e a senha estão corretos
    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        loginMessage.textContent = "Login bem-sucedido!";
        loginMessage.style.color = "green";

        // Exibir informações da conta
        welcomeMessage.textContent = `Bem-vindo, ${username}!`;
        balanceDisplay.textContent = `Saldo: R$ ${currentUser.balance} | Empréstimo: R$ ${currentUser.loan}`;
        accountInfo.classList.remove("hidden");
        loginForm.classList.add("hidden");
    } else {
        loginMessage.textContent = "Usuário ou senha inválidos!";
        loginMessage.style.color = "red";
    }
});

// Função para pagar impostos
payTaxesButton.addEventListener("click", () => {
    if (currentUser.taxesDue > 0) {
        if (currentUser.balance >= currentUser.taxesDue) {
            currentUser.balance -= currentUser.taxesDue;
            currentUser.taxesDue = 0;
            transactionMessage.textContent = "Impostos pagos com sucesso!";
            transactionMessage.style.color = "green";
            balanceDisplay.textContent = `Saldo: R$ ${currentUser.balance} | Empréstimo: R$ ${currentUser.loan}`;
        } else {
            transactionMessage.textContent = "Saldo insuficiente para pagar os impostos.";
            transactionMessage.style.color = "red";
        }
    } else {
        transactionMessage.textContent = "Nenhum imposto devido.";
        transactionMessage.style.color = "blue";
    }
});

// Função para pegar empréstimo
loanButton.addEventListener("click", () => {
    const loanAmount = parseFloat(loanAmountInput.value);

    if (loanAmount > 0 && loanAmount <= currentUser.maxLoan) {
        currentUser.loan += loanAmount;
        currentUser.balance += loanAmount;
        transactionMessage.textContent = `Empréstimo de R$ ${loanAmount} aprovado!`;
        transactionMessage.style.color = "green";
        balanceDisplay.textContent = `Saldo: R$ ${currentUser.balance} | Empréstimo: R$ ${currentUser.loan}`;
    } else if (loanAmount > currentUser.maxLoan) {
        transactionMessage.textContent = `Empréstimo máximo é de R$ ${currentUser.maxLoan}.`;
        transactionMessage.style.color = "red";
    } else {
        transactionMessage.textContent = "Valor de empréstimo inválido!";
        transactionMessage.style.color = "red";
    }
});
