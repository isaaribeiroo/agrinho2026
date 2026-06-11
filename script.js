// Verifica se o formulário de seminário existe antes de aplicar o evento
if (formSeminario) {
    formSeminario.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        alert(`Inscrição realizada com sucesso, ${nome}! Esperamos você no AgroFuturo.`);
        formSeminario.reset();
    });
}

// Faça a mesma proteção para o formulário de comentários
if (formComentario) {
    formComentario.addEventListener("submit", (e) => {
        // ... seu código de comentário atual ...
    });
}





















