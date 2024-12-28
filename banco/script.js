// Simples base de dados dos usuários
const users = {
    "VTZIN": {
        password: "123456",
        balance: 100000,
        taxesDue: 200
    },
    "GABRIEL": {
        password: "abcdef",
        balance: 75000,
        taxesDue: 300
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

// Variável para armazenar o usuário atual
let currentUser = null;

// Função para validar login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        loginMessage.textContent = "Login bem-sucedido!";
        loginMessage.style.color = "green";

        // Exibir informações da conta
        welcomeMessage.textContent = `Bem-vindo, ${username}!`;
        balanceDisplay.textContent = `R$ ${currentUser.balance}`;
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
            balanceDisplay.textContent = `R$ ${currentUser.balance}`;
        } else {
            transactionMessage.textContent = "Saldo insuficiente para pagar os impostos.";
            transactionMessage.style.color = "red";
        }
    } else {
        transactionMessage.textContent = "Nenhum imposto devido.";
        transactionMessage.style.color = "blue";
    }
});
