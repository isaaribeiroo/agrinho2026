// Executa quando todo o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CONTROLE DO INTERFÁCE DO ACCORDION (EXPANSÍVEL)
       ========================================================================== */
    const headersAccordion = document.querySelectorAll(".accordion-header");

    headersAccordion.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const painel = header.nextElementSibling;
            const estaAberto = item.classList.contains("aberto");

            // Fecha todos os outros painéis para manter a interface limpa
            document.querySelectorAll(".accordion-item").forEach(outroItem => {
                outroItem.classList.remove("aberto");
                outroItem.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
                outroItem.querySelector(".accordion-content").setAttribute("hidden", "");
            });

            // Inverte o estado atual do clicado
            if (!estaAberto) {
                item.classList.add("aberto");
                header.setAttribute("aria-expanded", "true");
                painel.removeAttribute("hidden");
            }
        });
    });

    /* ==========================================================================
       2. ACESSIBILIDADE: PAINEL FLUTUANTE, TAMANHO DA FONTE E MODO ESCURO
       ========================================================================== */
    const togglePainel = document.getElementById("toggle-painel-acessibilidade");
    const painelAcessibilidade = document.getElementById("painel-acessibilidade");
    const btnAumentarFonte = document.getElementById("btn-aumentar-fonte");
    const btnDiminuirFonte = document.getElementById("btn-diminuir-fonte");
    const btnModoEscuro = document.getElementById("btn-modo-escuro");

    let tamanhoFonteAtual = 100; // percentual

    // Abre/Fecha painel flutuante
    togglePainel.addEventListener("click", () => {
        const expandido = togglePainel.getAttribute("aria-expanded") === "true";
        togglePainel.setAttribute("aria-expanded", !expandido);
        painelAcessibilidade.classList.toggle("ativo");
    });

    // Aumentar e Diminuir fonte de maneira proporcional e segura
    btnAumentarFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual < 130) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuirFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual > 85) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Alternar modo claro/escuro
    btnModoEscuro.addEventListener("click", () => {
        document.body.classList.toggle("modo-escuro");
    });

    /* ==========================================================================
       3. ACESSIBILIDADE: LEITURA POR VOZ (SPEECH SYNTHESIS API)
       ========================================================================== */
    const btnVozLer = document.getElementById("btn-voz-ler");
    const btnVozParar = document.getElementById("btn-voz-parar");
    const areaTexto = document.getElementById("area-leitura-voz");
    
    let trackerFala = null;

    btnVozLer.addEventListener("click", () => {
        // Se já estiver falando, cancela antes de reiniciar
        window.speechSynthesis.cancel();

        // Extrai o texto limpo ignorando botões, inputs, menus ocultos e svgs
        // Cria uma cópia do conteúdo para processar com segurança
        const cloneArea = areaTexto.cloneNode(true);
        
        // Remove elementos indesejados da cópia de leitura
        cloneArea.querySelectorAll("button, form, textarea, input, svg, .accordion-numero, .imagem").forEach(el => el.remove());
        
        const textoParaLer = cloneArea.innerText.trim();

        if (textoParaLer) {
            trackerFala = new SpeechSynthesisUtterance(textoParaLer);
            trackerFala.lang = "pt-BR";
            trackerFala.rate = 1.0; // Velocidade natural

            trackerFala.onstart = () => {
                btnVozLer.disabled = true;
                btnVozParar.disabled = false;
            };

            trackerFala.onend = () => {
                btnVozLer.disabled = false;
                btnVozParar.disabled = true;
            };

            trackerFala.onerror = () => {
                btnVozLer.disabled = false;
                btnVozParar.disabled = true;
            };

            window.speechSynthesis.speak(trackerFala);
        }
    });

    btnVozParar.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        btnVozLer.disabled = false;
        btnVozParar.disabled = true;
    });

    // Previne que a fala continue se o usuário fechar ou recarregar a aba
    window.addEventListener("beforeunload", () => {
        window.speechSynthesis.cancel();
    });

    /* ==========================================================================
       4. FORMULÁRIO DE INSCRIÇÃO DO SEMINÁRIO
       ========================================================================== */
    const formSeminario = document.getElementById("form-seminario");
    const msgSucessoForm = document.getElementById("msg-sucesso-form");

    formSeminario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarregamento real da página
        
        // Simulação de processamento de dados do formulário
        msgSucessoForm.removeAttribute("hidden");
        formSeminario.reset();

        setTimeout(() => {
            msgSucessoForm.setAttribute("hidden", "");
        }, 5000);
    });

    /* ==========================================================================
       5. RECURSO DE INTERAÇÃO COM O LEITOR: ENVIAR COMENTÁRIOS
       ========================================================================== */
    const formComentario = document.getElementById("form-comentario");
    const txtComentario = document.getElementById("txt-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const texto = txtComentario.value.trim();
        if (texto) {
            // Cria elemento de comentário moderno dinamicamente
            const novoComentario = document.createElement("div");
            novoComentario.className = "comentario-item";
            
            // Obtém data simplificada
            const agora = new Date();
            const dataFormatada = agora.toLocaleDateString("pt-BR") + " às " + agora.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'});

            novoComentario.innerHTML = `
                <div class="comentario-meta"><strong>Leitor Anônimo</strong> • ${dataFormatada}</div>
                <div class="comentario-texto">${texto}</div>
            `;

            // Adiciona no topo da lista
            listaComentarios.insertBefore(novoComentario, listaComentarios.firstChild);
            
            // Limpa o campo
            txtComentario.value = "";
        }
    });
});