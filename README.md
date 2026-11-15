# 🐝 Blindbee — Site acadêmico de inglês acessível (UNICID)

## Abrir o projeto
1. Extraia o ZIP inteiro, **sem retirar os arquivos da pasta `assets`**.
2. Abra a pasta `BLINDBEE_REFINADO_UNICID` no VS Code.
3. Abra `index.html` usando a extensão Live Server ou um servidor local. Ex.: `python -m http.server 8000` e acesse `http://localhost:8000/`.
4. Use `Tab` / `Enter` para navegar. Clique em **Ativar leitura** para a narração opcional por mouse ou foco de teclado, se houver suporte do navegador.

## Páginas (10)
- `index.html` — Página inicial e acesso rápido ao estudo
- `sobre.html` — Problema social, público e ODS
- `projetos.html` — Aulas com síntese de fala e exercício interativo
- `voluntariado.html` — Formulário demonstrativo
- `doacoes.html` — Apoie a iniciativa (sem pagamentos reais)
- `noticias.html` — Conteúdo filtrável
- `galeria.html` — Biblioteca de áudio, vídeo legendado e iframe
- `transparencia.html` — Limites do protótipo e dados
- `faq.html` — Dúvidas com FAQ interativa
- `contato.html` — Formulário demonstrativo e rascunho opcional

## Estrutura de arquivos
- `assets/css/style.css` — CSS-base
- `assets/css/acessibilidade.css` — Ampliação de alvos e foco visível
- `assets/css/tema-blindbee.css` — Identidade visual amarelo, preto e branco, carregada por último
- `assets/js/main.js` — Interações, forms, localStorage, quiz, voz de inglês
- `assets/js/acessibilidade.js` — Narração opcional ao passar o mouse ou focar com Tab
- `assets/img/` — Mascote vetorial, favos, ilustração e favicon
- `assets/midia/` — Gravações e vídeo demonstrativo
- `docs/` — Escopo, melhoria, IA, testes, orçamento, deploy, diário e roteiro dos slides
- `evidencias/` — Orientações para salvar capturas reais de testes
- `entrega/` — Arquivos para preencher com a equipe/URL/repositório

## Natureza do projeto
O Blindbee é uma ONG **fictícia e um protótipo acadêmico**, não presta serviços reais, não recebe dinheiro e não envia formulários para servidores. Dados de rascunho, progresso e preferências ficam apenas no navegador por `localStorage` e podem ser apagados limpando dados do site.

## Antes da entrega
A equipe deve: inserir integrantes e RAs; comprovar correções solicitadas do MVP; validar HTML de todas as 10 páginas no W3C; testar voz, acessibilidade, teclado e navegação responsiva com navegador e tecnologias assistivas reais; publicar em HTTPS; criar commits de todos e PR; registrar evidências/prints; fornecer URL, GitHub e slides de 14 páginas com conteúdo real. Não declarar testes como executados sem fazê-los.


## Página inicial fiel à referência visual
A página `index.html` utiliza `assets/css/home-referencia.css` para recriar a composição de referência: cabeçalho amarelo, navegação preta, barra de acessibilidade, conteúdo introdutório preto com mascote e três cards claros na mesma seção. As ilustrações SVG redesenhadas são originais ao projeto e as listras acompanham o corpo da abelha. Os recursos de teclado, alto contraste e leitura em voz alta permanecem disponíveis.
