function salvarId() {
    const nome = document.querySelector('input[name="nome"]').value;
    localStorage.setItem('username', nome);
    console.log('Usuário salvo no localStorage:', nome);
}