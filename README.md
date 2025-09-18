# Sistema de Perguntas e Respostas

Este repositório contém um pequeno site estático em HTML, CSS e JavaScript que permite a um administrador cadastrar perguntas e respostas e disponibilizá‑las para qualquer pessoa que acesse o site. O objetivo é oferecer uma forma simples de compartilhar dicas e explicações para trabalhos escolares a partir de um navegador sem a necessidade de um servidor backend.

## Funcionalidades

* **Autenticação simples:** A página inicial (`index.html`) permite que o administrador insira uma senha para acessar o painel de administração. Há também um botão para que visitantes entrem diretamente na lista de perguntas.
* **Cadastro de perguntas e respostas:** No painel de administração (`admin.html`), o administrador pode adicionar novas perguntas e respostas. As entradas são exibidas imediatamente em uma lista na mesma página.
* **Visualização pública:** A página `qa.html` exibe todas as perguntas e respostas cadastradas. Visitantes não podem editar nem excluir conteúdo.
* **Alteração de senha:** O administrador pode alterar a senha clicando em “Alterar senha” na barra de navegação do painel. A nova senha é gravada no armazenamento local do navegador.
* **Armazenamento local:** Todas as perguntas, respostas e a senha do administrador são salvas no [LocalStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) do navegador. Isso elimina a necessidade de um banco de dados externo, mas significa que os dados são armazenados apenas no dispositivo de quem está usando o site.

> **Limitação importante:** Como o site não possui back‑end, os dados não são sincronizados entre diferentes computadores ou navegadores. Cada visitante mantém sua própria cópia local das perguntas e respostas. Se você precisa que as perguntas e respostas sejam compartilhadas entre todos os usuários, será necessário integrar o site a um serviço externo (por exemplo, Firebase, Supabase, planilha do Google etc.).

## Como hospedar no GitHub Pages

Para disponibilizar o site na internet (e possivelmente acessar pela rede Wi‑Fi da escola), você pode utilizar o GitHub Pages. Siga os passos abaixo:

1. **Crie um repositório no GitHub:** faça login na sua conta do GitHub, clique em **New repository** e escolha um nome (por exemplo, `perguntas-e-respostas`). Deixe o repositório como _public_ ou _private_, conforme preferir.
2. **Envie os arquivos:** faça download ou clone este repositório e copie o conteúdo da pasta `qa-site` para dentro do seu repositório no GitHub. Garanta que os arquivos `index.html`, `admin.html`, `qa.html`, `style.css`, `script.js` e `README.md` estejam na raiz do repositório.
3. **Faça o commit e push:** se estiver utilizando Git localmente, execute:

   ```bash
   git add .
   git commit -m "Publicar site de perguntas e respostas"
   git push origin main
   ```

   Alternativamente, você pode enviar os arquivos diretamente pela interface web do GitHub (botão **Add file** > **Upload files**).
4. **Ative o GitHub Pages:**

   1. Acesse a página do repositório no GitHub e clique em **Settings**.
   2. No menu lateral, escolha **Pages** (ou **Pages and deployment** em algumas versões).
   3. Em **Build and deployment**, selecione **Deploy from a branch**.
   4. Selecione a branch `main` (ou a branch padrão que você estiver usando) e a pasta raiz (`/`), depois clique em **Save**.
   5. O GitHub irá gerar uma URL do tipo `https://seu-usuario.github.io/nome-do-repositorio/`. Em poucos minutos o site estará disponível nesse endereço.

Agora você pode acessar a URL fornecida pelo GitHub Pages no navegador da escola para visualizar e gerenciar o conteúdo.

## Mudando a senha do administrador

Por padrão, a senha inicial do administrador é **`admin123`**. Após fazer login no painel, clique em **Alterar senha** para definir uma nova senha. A alteração é armazenada localmente no navegador em que você estiver logado. Se limpar os dados do navegador (limpar cache ou usar navegação anônima), a senha voltará ao valor padrão ou ao último valor salvo nesse dispositivo.

Se desejar definir uma senha inicial diferente do `admin123` para todos os usuários, você pode editar diretamente o arquivo `script.js`. Procure a função `getAdminPassword()` e altere o valor retornado quando não houver senha salva no LocalStorage.

## Personalização e melhorias

Este projeto é intencionalmente simples para facilitar a publicação em um ambiente estático. Algumas melhorias que você pode implementar caso tenha familiaridade com programação web:

* **Sincronização de dados:** integrar o site com um banco de dados em tempo real (por exemplo, Firebase) para que todos os usuários vejam as mesmas perguntas e respostas.
* **Design responsivo avançado:** ajustar o layout e as cores conforme as preferências da sua turma ou escola.
* **Funcionalidades extras:** permitir edição e exclusão de perguntas, categorização de assuntos, campo de pesquisa ou ordem de exibição por data.

Sinta‑se à vontade para adaptar e expandir o projeto conforme as suas necessidades!