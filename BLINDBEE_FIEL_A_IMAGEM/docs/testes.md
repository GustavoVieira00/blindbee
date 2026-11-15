# Plano de testes e evidências — executar antes da entrega

**Atenção:** as caixas abaixo estão propositalmente **desmarcadas**; a presença de arquivos não prova testes com navegador real nem certificação WCAG.

## Validação
- [ ] Abrir as 10 páginas no https do site publicado, sem links quebrados.
- [ ] Executar [W3C Nu Validator](https://validator.w3.org/nu/) nas 10 páginas e guardar captura de zero erros (corrigir quaisquer erros).
- [ ] Executar Lighthouse no desktop e no celular e guardar notas/prints.
- [ ] Testar navegação somente com Tab, Shift+Tab, Enter, Espaço e Escape.
- [ ] Testar foco visível em menu, links, campos, quiz, controles de mídia e botões.
- [ ] Testar alto contraste e fonte 100/125/150%, com recarga e persistência.
- [ ] Testar leitor de tela **NVDA no Windows** e **VoiceOver no iPhone** (e registrar resultados reais).
- [ ] Testar leitura por mouse e Tab com voz disponível, após ativação manual; comportamento sem voz disponível.
- [ ] Testar em celular com largura 375 px e zoom 200%, sem rolagem horizontal.
- [ ] Testar formulário com valores inválidos e verificar foco/mensagens; preencher corretamente e verificar status de **simulação**.
- [ ] Testar rascunho opcional por localStorage e recarregar a página.
- [ ] Testar quiz e persistência; reproduzir áudio e vídeo com legendas; usar iframe.
- [ ] Conferir contraste AA em texto comum (>= 4,5:1) e em textos grandes (>=3:1), incluindo hover/focus.

## Evidências sugeridas
Salve arquivos reais em `evidencias/`: `home-desktop.png`, `home-mobile.png`, `form-erro.png`, `form-valido.png`, `localstorage.png`, `teclado.png`, `w3c-10-paginas.png`, `lighthouse.png`, `github-commits.png`, `github-pr.png`, `deploy-https.png`.

**Resultado dos testes:** preencher data, dispositivo/navegador, pessoa testadora, achado e correção efetuada.
