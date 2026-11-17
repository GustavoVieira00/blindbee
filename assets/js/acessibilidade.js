/* BLINDBEE — áudio opcional ao passar o mouse e ao focar com Tab.
   Requer Web Speech API (speechSynthesis), não coleta nem envia dados.
   Não substitui leitores de tela, como NVDA ou VoiceOver. */
(() => {
  'use strict';

  // Use as versões PNG das imagens da marca e da ilustração, disponíveis em assets/img.
  document.querySelectorAll('img[src]').forEach(imagem => {
    const origem = imagem.getAttribute('src');
    if (origem.endsWith('abelha-blindbee.svg')) {
      imagem.setAttribute('src', origem.replace('abelha-blindbee.svg', 'abelha-blindbee.png'));
    } else if (origem.endsWith('aprender-ingles.svg')) {
      imagem.setAttribute('src', origem.replace('aprender-ingles.svg', 'aprender-ingles.png'));
    }
  });

  const botao = document.getElementById('blindbee-voz-toggle');
  if (!botao) return;
  const status = document.querySelector('.blindbee-status-voz');
  const apiDisponivel = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  if (!apiDisponivel) {
    botao.disabled = true;
    botao.textContent = '🔇 Leitura indisponível';
    if (status) status.textContent = 'Este navegador não oferece síntese de voz.';
    return;
  }

  const sintese = window.speechSynthesis;
  let ligado = false;
  let temporizador = null;
  let apontado = null;
  let destacado = null;
  let falaAtual = null;
  let ultimoFoco = null;

  function textoDoElemento(el) {
    if (!el) return '';
    if (el.matches('input, select, textarea')) {
      const rotulo = el.labels && el.labels[0] ? el.labels[0].textContent : '';
      return ('Campo: ' + (el.getAttribute('aria-label') || rotulo || el.placeholder || 'sem rótulo')).trim();
    }
    // Comandos de pronúncia inglês usam rótulo do botão, NÃO a frase da lição.
    const texto = el.getAttribute('data-fala') ||
      el.getAttribute('aria-label') ||
      el.getAttribute('title') ||
      el.textContent || '';
    return texto.replace(/[\u2190-\u21ff\u25b6\u25ba]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 350);
  }

  function candidato(origem) {
    if (!(origem instanceof Element)) return null;
    // Vai da ação mais específica aos textos importantes (inclusive parágrafos).
    const elemento = origem.closest('a,button,summary,input,select,textarea,[role="button"],[data-fala],h1,h2,h3,h4,p,label');
    if (!elemento || elemento === botao) return null;
    if (elemento.closest('[hidden],[inert],[aria-hidden="true"]')) return null;
    if (elemento.matches(':disabled')) return null;
    if (elemento.closest('video,audio')) return null;
    return elemento;
  }

  function retirarDestaque() {
    if (destacado) destacado.removeAttribute('data-blindbee-lendo');
    destacado = null;
  }
  function parar() {
    window.clearTimeout(temporizador);
    temporizador = null;
    apontado = null;
    retirarDestaque();
    if (falaAtual) {
      falaAtual.onend = null;
      falaAtual.onerror = null;
      falaAtual = null;
    }
    sintese.cancel();
  }
  function falar(texto, alvo) {
    if (!ligado || !texto) return;
    // Interrompe a leitura anterior para nunca formar uma fila longa de frases.
    parar();
    try {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'pt-BR';
      u.rate = 0.9;
      u.pitch = 1;
      const vozes = sintese.getVoices();
      const pt = vozes.find(v => v.lang.toLowerCase() === 'pt-br') ||
                 vozes.find(v => v.lang.toLowerCase().startsWith('pt'));
      if (pt) u.voice = pt;
      falaAtual = u;
      if (alvo) {
        destacado = alvo;
        alvo.setAttribute('data-blindbee-lendo', 'true');
      }
      u.onend = u.onerror = () => {
        if (falaAtual === u) {
          falaAtual = null;
          retirarDestaque();
        }
      };
      sintese.speak(u);
    } catch (_) {
      retirarDestaque();
      if (status) status.textContent = 'Não foi possível reproduzir a leitura.';
    }
  }
  function agendar(el, atraso = 320) {
    if (!ligado || !el || !textoDoElemento(el)) return;
    if (el === apontado) return;
    window.clearTimeout(temporizador);
    apontado = el;
    temporizador = window.setTimeout(() => {
      if (ligado && apontado === el) falar(textoDoElemento(el), el);
    }, atraso);
  }

  function atualizar() {
    botao.setAttribute('aria-pressed', String(ligado));
    botao.textContent = ligado ? '🔊 Desativar leitura' : '🔈 Ativar leitura';
    if (status) status.textContent = ligado ? 'Leitura em voz alta ativada.' : 'Leitura em voz alta desativada.';
  }

  botao.addEventListener('click', () => {
    ligado = !ligado;
    parar();
    atualizar();
    // O clique é intencional, então inicia a síntese sem depender de autoplay.
    if (ligado) falar('Leitura ativada. Passe o mouse sobre botões ou textos. Para navegar com teclado, use Tab.', null);
  });

  // Não anuncia os componentes em celulares sem mouse, onde hover não existe.
  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return;
    agendar(candidato(event.target));
  });
  document.addEventListener('pointerout', event => {
    if (event.pointerType !== 'mouse') return;
    const anterior = candidato(event.target);
    const posterior = candidato(event.relatedTarget);
    if (anterior && anterior === apontado && anterior !== posterior) {
      window.clearTimeout(temporizador);
      temporizador = null;
      apontado = null;
    }
  });

  // O usuário pode explorar com Tab + leitor opcional, mesmo sem mouse.
  document.addEventListener('focusin', event => {
    const el = candidato(event.target);
    if (el && el !== botao && el !== ultimoFoco) agendar(el, 150);
    ultimoFoco = el;
  });
  document.addEventListener('focusout', event => {
    if (ultimoFoco === candidato(event.target)) ultimoFoco = null;
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') parar();
  });
  document.addEventListener('click', event => {
    // Não competir com a síntese de pronúncia das aulas (data-falar).
    if (event.target instanceof Element && event.target.closest('[data-fala]')) parar();
  }, true);
  window.addEventListener('pagehide', parar);
  atualizar();
})();
