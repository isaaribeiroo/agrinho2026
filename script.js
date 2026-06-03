document.addEventListener('DOMContentLoaded', () => {

    // --- GERENCIAMENTO DAS SEÇÕES EXPANSÍVEIS (ACCORDION) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const contentId = header.getAttribute('aria-controls');
            const contentBlock = document.getElementById(contentId);

            // Colapsa todos os elementos abertos para criar efeito profissional fluido
            accordionHeaders.forEach(otherHeader => {
                otherHeader.setAttribute('aria-expanded', 'false');
                const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                if (otherContent) otherContent.hidden = true;
            });

            // Alterna o estado do item atual
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                contentBlock.hidden = false;
            }
        });
    });

    // --- CONTROLES DE ACESSIBILIDADE FLUTUANTE ---
    let currentFontSize = 100; // Porcentagem base (%)
    const rootHtml = document.documentElement;
    const bodyElement = document.body;

    // Aumentar Fonte
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentFontSize < 130) {
            currentFontSize += 5;
            rootHtml.style.fontSize = `${currentFontSize}%`;
        }
    });

    // Diminuir Fonte
    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentFontSize > 85) {
            currentFontSize -= 5;
            rootHtml.style.fontSize = `${currentFontSize}%`;
        }
    });

    // Alternador de Temas (Modo Escuro / Claro)
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        bodyElement.classList.toggle('light-theme');
    });

    // --- LEITURA POR VOZ NATIVA (SpeechSynthesis API) ---
    const btnStartTts = document.getElementById('btn-tts-start');
    const btnStopTts = document.getElementById('btn-tts-stop');
    let speechUtterance = null;

    btnStartTts.addEventListener('click', () => {
        // Alvo estrito: captura apenas o texto interno do artigo principal, ignorando formulários/menus
        const mainTextContent = document.getElementById('main-text-content');
        if (!mainTextContent) return;

        const textToRead = mainTextContent.innerText;

        // Cancelar sínteses anteriores ativas para evitar sobreposição
        window.speechSynthesis.cancel();

        speechUtterance = new SpeechSynthesisUtterance(textToRead);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = 1.0;

        // Gerenciamento de estado visual dos botões ao finalizar ou pausar
        speechUtterance.onend = () => {
            btnStartTts.style.display = 'inline-block';
            btnStopTts.style.display = 'none';
        };

        speechUtterance.onerror = () => {
            btnStartTts.style.display = 'inline-block';
            btnStopTts.style.display = 'none';
        };

        window.speechSynthesis.speak(speechUtterance);

        btnStartTts.style.display = 'none';
        btnStopTts.style.display = 'inline-block';
    });

    btnStopTts.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        btnStartTts.style.display = 'inline-block';
        btnStopTts.style.display = 'none';
    });

    // --- PROCESSAMENTO INTERATIVO DOS FORMULÁRIOS ---
    const seminarForm = document.getElementById('seminar-form');
    const formSuccessMsg = document.getElementById('form-success-msg');

    seminarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio com feedback visual moderno
        formSuccessMsg.hidden = false;
        seminarForm.reset();
        
        setTimeout(() => {
            formSuccessMsg.hidden = true;
        }, 5000);
    });

    // Enviar Comentários Dinamicamente
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textArea = document.getElementById('reader-comment');
        const commentText = textArea.value.trim();

        if (commentText) {
            const newComment = document.createElement('div');
            newComment.className = 'comment-item shadow-style';
            newComment.innerHTML = `
                <p class="comment-meta"><strong>Leitor Conectado</strong> • Agora mesmo</p>
                <p class="comment-text">${commentText}</p>
            `;
            
            // Insere o novo comentário no topo da lista
            commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
            textArea.value = '';
        }
    });
});