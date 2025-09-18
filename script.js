/*
 * Script principal para o sistema de perguntas e respostas.
 *
 * Este script lida com o processo de login do administrador,
 * armazenamento e exibição de perguntas e respostas usando
 * a API de LocalStorage do navegador. Não há back‑end, portanto
 * os dados são salvos apenas localmente no dispositivo.
 */

(function() {
    // Chave onde a lista de perguntas e respostas é armazenada
    const DATA_KEY = 'qaData';

    /**
     * Carrega a lista de perguntas e respostas do LocalStorage.
     * @returns {Array<{question: string, answer: string}>} Lista de objetos de pergunta e resposta.
     */
    function loadData() {
        const json = localStorage.getItem(DATA_KEY);
        try {
            return json ? JSON.parse(json) : [];
        } catch (err) {
            console.error('Erro ao ler os dados do localStorage:', err);
            return [];
        }
    }

    /**
     * Salva a lista de perguntas e respostas no LocalStorage.
     * @param {Array<{question: string, answer: string}>} data Lista a ser salva.
     */
    function saveData(data) {
        localStorage.setItem(DATA_KEY, JSON.stringify(data));
    }

    /**
     * Renderiza a lista de perguntas e respostas em um elemento contêiner.
     * @param {HTMLElement} container Elemento onde a lista será inserida.
     */
    function renderList(container) {
        const data = loadData();
        container.innerHTML = '';
        if (!data || data.length === 0) {
            const noItems = document.createElement('p');
            noItems.textContent = 'Nenhuma pergunta cadastrada ainda.';
            container.appendChild(noItems);
            return;
        }
        data.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'qa-item';

            const q = document.createElement('p');
            q.className = 'qa-question';
            q.textContent = item.question;

            const a = document.createElement('p');
            a.className = 'qa-answer';
            a.textContent = item.answer;

            wrapper.appendChild(q);
            wrapper.appendChild(a);
            container.appendChild(wrapper);
        });
    }

    /**
     * Retorna a senha do administrador armazenada ou usa uma senha padrão.
     * A senha pode ser alterada salvando um novo valor em localStorage
     * com a chave 'adminPassword'.
     * @returns {string} Senha do administrador.
     */
    function getAdminPassword() {
        return localStorage.getItem('adminPassword') || 'admin123';
    }

    // Lida com o fluxo da página de login
    const loginForm = document.getElementById('login-form');
    const guestBtn = document.getElementById('guest-btn');
    const errorEl = document.getElementById('login-error');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const passwordInput = document.getElementById('password');
            const password = passwordInput.value;
            if (password === getAdminPassword()) {
                // Guarda uma flag na sessão indicando que o administrador está logado
                sessionStorage.setItem('isAdmin', 'true');
                // Redireciona para a página do administrador
                window.location.href = 'admin.html';
            } else {
                // Mostra a mensagem de erro
                if (errorEl) {
                    errorEl.style.display = 'block';
                }
            }
        });
    }
    if (guestBtn) {
        guestBtn.addEventListener('click', function(event) {
            event.preventDefault();
            // Visitantes vão diretamente para a lista de perguntas
            window.location.href = 'qa.html';
        });
    }

    // Proteção de rota simples: impede acesso à página de admin se não estiver logado
    if (window.location.pathname.endsWith('admin.html')) {
        if (!sessionStorage.getItem('isAdmin')) {
            // Se não houver a flag de admin na sessão, redireciona para a tela de login
            window.location.href = 'index.html';
        }
    }

    // Lida com o formulário de criação de perguntas na página do administrador
    const qaForm = document.getElementById('qa-form');
    if (qaForm) {
        const qaListContainer = document.getElementById('qa-list');
        // Renderiza a lista inicial ao carregar a página
        renderList(qaListContainer);
        qaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const questionInput = document.getElementById('question');
            const answerInput = document.getElementById('answer');
            const question = questionInput.value.trim();
            const answer = answerInput.value.trim();
            if (!question || !answer) {
                return;
            }
            const currentData = loadData();
            currentData.push({ question: question, answer: answer });
            saveData(currentData);
            renderList(qaListContainer);
            // Limpa os campos do formulário
            questionInput.value = '';
            answerInput.value = '';
        });
    }

    // Lida com mudança de senha do administrador
    const changePwdLink = document.getElementById('change-password-link');
    if (changePwdLink) {
        changePwdLink.addEventListener('click', function(event) {
            event.preventDefault();
            const newPwd = prompt('Digite a nova senha de administrador:');
            if (newPwd && newPwd.trim().length > 0) {
                localStorage.setItem('adminPassword', newPwd.trim());
                alert('Senha do administrador atualizada com sucesso!');
            }
        });
    }

    // Se estivermos na página de perguntas (e não na página admin), renderiza a lista
    if (!qaForm) {
        const qaListContainer = document.getElementById('qa-list');
        if (qaListContainer) {
            renderList(qaListContainer);
        }
    }
})();