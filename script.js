document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ACCORDION (CAIXAS EXPANSÍVEIS) ---
    const disparadores = document.querySelectorAll(".accordion-disparador");

    disparadores.forEach(botao => {
        botao.addEventListener("click", function() {
            const cardItem = this.parentElement;
            const painel = this.nextElementSibling;
            const estaAtivo = cardItem.classList.contains("ativo");

            // Fecha painéis abertos para manter consistência operacional
            document.querySelectorAll(".card-item").forEach(item => {
                item.classList.remove("ativo");
                item.querySelector(".accordion-painel").style.maxHeight = null;
                item.querySelector(".accordion-disparador").setAttribute("aria-expanded", "false");
            });

            // Ativa o item clicado se ele não estava aberto
            if (!estaAtivo) {
                cardItem.classList.add("ativo");
                this.setAttribute("aria-expanded", "true");
                painel.style.maxHeight = painel.scrollHeight + "px";
            }
        });
    });


    // --- 2. CONTROLE DE ACESSIBILIDADE DE FONTES ---
    let escalaFonteAtual = 100;
    const htmlElemento = document.documentElement;
    
    const btnAumentar = document.getElementById("btn-fonte-aumentar");
    const btnDiminuir = document.getElementById("btn-fonte-diminuir");

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


    // --- 3. SPEECH SYNTHESIS API (LEITURA POR VOZ ACESSÍVEL) ---
    const btnFalar = document.getElementById("btn-voz-falar");
    const btnParar = document.getElementById("btn-voz-parar");
    const sinteseDeVoz = window.speechSynthesis;
    let instanciaUtterance = null;

    btnFalar.addEventListener("click", () => {
        const alvoLeitura = document.getElementById("conteudo-principal");
        if (!alvoLeitura) return;

        sinteseDeVoz.cancel(); // Reseta instâncias pendentes

        const textoParaProcessar = alvoLeitura.innerText;
        instanciaUtterance = new SpeechSynthesisUtterance(textoParaProcessar);
        instanciaUtterance.lang = "pt-BR";

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


    // --- 4. ÁREA DE COMENTÁRIOS INTERATIVA ---
    const formComentario = document.getElementById("form-comentario");
    const caixaTextoComentario = document.getElementById("campo-texto-comentario");
    const feedComentarios = document.getElementById("feed-comentarios");

    formComentario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        const conteudoTexto = caixaTextoComentario.value.trim();
        if (conteudoTexto === "") return;

        const containerNovoComentario = document.createElement("div");
        containerNovoComentario.classList.add("comentario-item");
        
        const textoComentarioElemento = document.createElement("p");
        textoComentarioElemento.innerText = conteudoTexto;
        
        containerNovoComentario.appendChild(textoComentarioElemento);
        feedComentarios.insertBefore(containerNovoComentario, feedComentarios.firstChild);

        caixaTextoComentario.value = ""; // Limpeza de código pós-evento
    });

    // Evento de simulação do formulário lateral
    const formSeminario = document.getElementById("form-seminario");
    formSeminario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        alert("Inscrição efetuada com sucesso no banco de dados AgroFuturo!");
        formSeminario.reset();
    });
});