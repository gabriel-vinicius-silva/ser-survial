// Função para verificar se o servidor está online
function verificarStatus() {
    const url = 'https://api.aternos.org/server?name=Erasurvival-NYvs&port=63367'; // Atualize conforme necessário
    const statusElement = document.getElementById('server-status'); // O id onde será exibido o status

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'online') {
                statusElement.textContent = "Servidor Online";
                statusElement.style.color = "green"; // Verde para online
            } else {
                statusElement.textContent = "Servidor Offline";
                statusElement.style.color = "red"; // Vermelho para offline
            }
        })
        .catch(error => {
            console.error('Erro ao verificar status:', error);
            statusElement.textContent = "Erro ao verificar o status";
            statusElement.style.color = "orange"; // Laranja para erro
        });
}

// Executar a função ao carregar a página
document.addEventListener('DOMContentLoaded', verificarStatus);
