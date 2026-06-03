document.addEventListener("DOMContentLoaded", () => {

    // --- 1. MECÂNICA DE SEÇÕES EXPANSÍVEIS (ACCORDION) ---
    const disparadores = document.querySelectorAll(".accordion-disparador");

    disparadores.forEach(botao => {
        botao.addEventListener("click", function() {
            const cardItem = this.parentElement;
            const painel = this.nextElementSibling;
            const estaAtivo = cardItem.classList.contains("ativo");

            // Fecha todos os painéis abertos de forma limpa (Garantindo comportamento consistente)
            document.querySelectorAll(".card-item").forEach(item => {
                item.classList.remove("ativo");
                item.querySelector(".accordion-painel").style.maxHeight = null;
                item.querySelector(".accordion-disparador").setAttribute("aria-expanded", "false");
            });

            // Se o item clicado não estava ativo, abre ele
            if (!estaAtivo) {
                cardItem.classList.add("ativo");
                this.setAttribute("aria-expanded", "true");
                painel.style.maxHeight = painel.scrollHeight + "px";
            }
        });
    });


    // --- 2. PAINEL DE ACESSIBILIDADE DE FONTES E TEMA CLARO/ESCURO ---
    let escalaFonteAtual = 100; // Percentual base
    const htmlElemento = document.documentElement;
    
    const btnAumentar = document.getElementById("btn-fonte-aumentar");
    const btnDiminuir = document.getElementById("btn-fonte-diminuir");
    const btnAlternarTema = document.getElementById("btn-alternar-tema");

    btnAumentar.addEventListener("click", () => {
        if (escalaFonteAtual < 140) {
            escalaFonteAtual += 10;
            htmlElemento.style.fontSize = `${escalaFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (escalaFonteAtual > 80) {
            escalaFonteAtual -= 10;
            htmlElemento.style.fontSize = `${escalaFonteAtual}%`;
        }
    });

    btnAlternarTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-claro");
    });


    // --- 3. SPEECH SYNTHESIS API (SISTEMA DE LEITURA POR VOZ) ---
    const btnFalar = document.getElementById("btn-voz-falar");
    const btnParar = document.getElementById("btn-voz-parar");
    const sinteseDeVoz = window.speechSynthesis;
    let instanciaUtterance = null;

    btnFalar.addEventListener("click", () => {
        // REQUISITO: Isolamento semântico. Lê apenas o miolo informativo contido em <main>
        const alvoLeitura = document.getElementById("conteudo-principal");
        
        if (!alvoLeitura) return;

        // Limpa instâncias anteriores se houver travamento
        sinteseDeVoz.cancel();

        const textoParaProcessar = alvoLeitura.innerText;
        instanciaUtterance = new SpeechSynthesisUtterance(textoParaProcessar);
        instanciaUtterance.lang = "pt-BR";

        // Gerenciamento de estado dos botões da interface
        instanciaUtterance.onend = () => {
            btnFalar.disabled = false;
            btnParar.disabled = true;
        };

        instanciaUtterance.onerror = () => {
            btnFalar.disabled = false;
            btnParar.disabled = true;
        };

        sinteseDeVoz.speak(instanciaUtterance);
        btnFalar.disabled = true;
        btnParar.disabled = false;
    });

    btnParar.addEventListener("click", () => {
        if (sinteseDeVoz.speaking) {
            sinteseDeVoz.cancel();
            btnFalar.disabled = false;
            btnParar.disabled = true;
        }
    });


    // --- 4. INTERAÇÃO DO LEITOR (SISTEMA DE COMENTÁRIOS VIA EVENTLISTENER) ---
    const formComentario = document.getElementById("form-comentario");
    const caixaTextoComentario = document.getElementById("campo-texto-comentario");
    const feedComentarios = document.getElementById("feed-comentarios");

    formComentario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        const conteudoTexto = caixaTextoComentario.value.trim();
        if (conteudoTexto === "") return;

        // Construção do elemento de feedback visual limpo
        const containerNovoComentario = document.createElement("div");
        containerNovoComentario.classList.add("comentario-item");
        
        const textoComentarioElemento = document.createElement("p");
        textoComentarioElemento.innerText = conteudoTexto;
        
        containerNovoComentario.appendChild(textoComentarioElemento);
        
        // Insere o novo comentário no topo do feed interativo
        feedComentarios.insertBefore(containerNovoComentario, feedComentarios.firstChild);

        // Boas Práticas: Limpeza e liberação de memória de logs desnecessários
        caixaTextoComentario.value = "";
    });

    // Simulador de Inscrição (Evita recarregamento de página sem tratamento)
    const formSeminario = document.getElementById("form-seminario");
    formSeminario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        alert("Inscrição registrada com sucesso no sistema AgroFuturo 2026!");
        formSeminario.reset();
    });
});