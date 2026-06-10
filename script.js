// Aguarda o DOM estar totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // SISTEMA 1: ACCORDION (SEÇÕES EXPANSÍVEIS)
    // ==========================================================================
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;

            // Fecha outros itens se abertos (Opcional - Estilo Sanfona)
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".accordion-content").style.maxHeight = null;
                }
            });

            // Alterna o estado do item clicado
            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================================================
    // SISTEMA 2: ACESSIBILIDADE (SpeechSynthesis e Fontes)
    // ==========================================================================
    let tamanhoFonteAtual = 100; // Representa em %
    const bodyElement = document.body;

    // Controle de Tamanho de Fonte
    document.getElementById("btn-aumentar").addEventListener("click", () => {
        tamanhoFonteAtual += 10;
        document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
    });

    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if (tamanhoFonteAtual > 70) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Modo Claro / Escuro
    document.getElementById("btn-tema").addEventListener("click", () => {
        bodyElement.classList.toggle("light-mode");
    });

    // Leitura por Voz (SpeechSynthesis API)
    const btnFalar = document.getElementById("btn-falar");
    const btnParar = document.getElementById("btn-parar");
    let synthUtterance = null;

    btnFalar.addEventListener("click", () => {
        // Evita sobreposição de vozes se já estiver lendo
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        // Seleciona exclusivamente o texto do conteúdo principal (ignora formulários, menus, botões)
        const principalEl = document.getElementById("conteudo-leitura");
        if (!principalEl) return;

        const textoParaLer = principalEl.innerText;

        synthUtterance = new SpeechSynthesisUtterance(textoParaLer);
        synthUtterance.lang = "pt-BR";
        synthUtterance.rate = 1.1; // Velocidade levemente ajustada

        window.speechSynthesis.speak(synthUtterance);
    });

    btnParar.addEventListener("click", () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    });

    // ==========================================================================
    // SISTEMA 3: FORMULÁRIO DE INSCRIÇÃO & COMENTÁRIOS (INTERATIVIDADE)
    // ==========================================================================
    const formSeminario = document.getElementById("cadastro-seminario");
    formSeminario.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        alert(`Inscrição realizada com sucesso, ${nome}! Esperamos você no AgroFuturo.`);
        formSeminario.reset();
    });

    const formComentario = document.getElementById("form-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = document.getElementById("txt-comentario").value;

        if (texto.trim() !== "") {
            const novoComentario = document.createElement("div");
            novoComentario.classList.add("comentario-postado");
            novoComentario.innerHTML = `<p><strong>Leitor Anônimo:</strong> ${texto}</p>`;
            
            listaComentarios.prepend(novoComentario);
            document.getElementById("txt-comentario").value = "";
        }
    });
});





















