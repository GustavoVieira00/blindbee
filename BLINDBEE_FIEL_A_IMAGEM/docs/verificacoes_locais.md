# Verificações técnicas locais — 10/11/2026

**Escopo:** revisão de integridade e comportamento local automatizado da versão `BLINDBEE_REFINADO_UNICID`. Resultados **não substituem** os testes reais de W3C, Lighthouse, tecnologia assistiva ou publicação HTTPS.

- **Páginas:** 10 HTML na raiz, cada uma com uma navegação de 10 links e um `h1` principal.
- **Arquivos locais:** inspeção dos `href` e `src` internos para páginas, imagens, JS, CSS, iframe e legendas: **zero referências a arquivo inexistente**.
- **Identidade:** imagens SVG da mascote, hero, favicon e favos analisadas por parser XML, sem erros de sintaxe XML.
- **JavaScript:** `node --check` concluiu sem erros nos dois scripts (`main.js` e `acessibilidade.js`).
- **Mídias:** `ffprobe` reconheceu o vídeo de demonstração e os três áudios `.ogg`.
- **Navegador automatizado (Chromium headless):** conferência usando HTML, CSS, SVG e JavaScript incorporados para o teste local, em resoluções **1440×900** e **390×844**. Sem erros de execução JavaScript capturados; sem rolagem horizontal nas telas testadas; botões principais com **76 px** de altura.
- **Menu e ferramentas:** menu móvel apresentou `aria-expanded=true` após ativar; alternância de classe de alto contraste e ajuste de tamanho de texto para 125% foram verificados.
- **Formulário:** envio vazio na página Contato resultou em cinco campos marcados com `aria-invalid=true` no teste.
- **ZIP:** integridade do arquivo compactado verificada sem entradas corrompidas.

## Limites de verificação

A execução automatizada direta pelo servidor HTTP local não pôde ser realizada neste ambiente de testes, e a inspeção visual foi feita com recursos incorporados na página de teste. Portanto, ainda devem ser feitos testes no Live Server, GitHub Pages e dispositivos reais. A saída de voz efetiva não foi verificada por audição. W3C, Lighthouse, NVDA, VoiceOver e revisão por usuários reais **permanecem pendentes**.
