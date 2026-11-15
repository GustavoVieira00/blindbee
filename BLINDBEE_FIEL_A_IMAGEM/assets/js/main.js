/* Blindbee — interações essenciais sem dependências externas.
   O projeto é uma simulação acadêmica; dados não são enviados a servidores. */
(()=>{
'use strict';
document.body.classList.add('js-ativa');
const $=id=>document.getElementById(id);
const storage={
  get(k){try{return localStorage.getItem(k)}catch{return null}},
  set(k,v){try{localStorage.setItem(k,v);return true}catch{return false}},
  remove(k){try{localStorage.removeItem(k)}catch{}}
};

// Menu no celular + fechamento por Escape e clique fora.
const menu=document.querySelector('.menu-botao'), nav=$('navegacao');
if(menu&&nav){
  const setMenu=(open)=>{
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Fechar menu de navegação':'Abrir menu de navegação');
    nav.dataset.aberta=String(open);
  };
  setMenu(false);
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  document.addEventListener('click',e=>{if(!e.target.closest('.cabecalho')&&menu.getAttribute('aria-expanded')==='true')setMenu(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus()}});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
}

// Preferências de leitura.
const contraste=$('contraste'), aumentar=$('aumentarFonte');
let alto=storage.get('blindbee-contraste-v1')==='true';
let fonte=Number(storage.get('blindbee-fonte-v1'))||100;
if(![100,125,150].includes(fonte)) fonte=100;
function aplicarPreferencias(){
 document.body.classList.toggle('alto-contraste',alto);
 document.documentElement.style.fontSize=fonte+'%';
 if(contraste){contraste.setAttribute('aria-pressed',String(alto));contraste.textContent=alto?'Desativar alto contraste':'Ativar alto contraste'}
 if(aumentar){aumentar.textContent='Texto: '+fonte+'%';aumentar.setAttribute('aria-label','Aumentar tamanho do texto. Atual: '+fonte+' por cento')}
}
aplicarPreferencias();
contraste?.addEventListener('click',()=>{alto=!alto;storage.set('blindbee-contraste-v1',String(alto));aplicarPreferencias()});
aumentar?.addEventListener('click',()=>{fonte=fonte===100?125:fonte===125?150:100;storage.set('blindbee-fonte-v1',String(fonte));aplicarPreferencias()});

// Áudio das frases em inglês; independente do leitor opcional de interface.
const vozStatus=$('vozStatus');
const falaDisponivel='speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
document.querySelectorAll('[data-falar]').forEach(botao=>{
 botao.addEventListener('click',()=>{
   const texto=botao.getAttribute('data-falar');
   if(!falaDisponivel){if(vozStatus)vozStatus.textContent='Voz do navegador indisponível. Use os áudios gravados na Biblioteca.';return}
   try{
     speechSynthesis.cancel();
     const voz=new SpeechSynthesisUtterance(texto);
     voz.lang=botao.getAttribute('data-lang')||'en-US';voz.rate=.83;
     const voices=speechSynthesis.getVoices();
     const v=voices.find(v=>v.lang.toLowerCase()==='en-us')||voices.find(v=>v.lang.toLowerCase().startsWith('en'));
     if(v)voz.voice=v;
     if(vozStatus)vozStatus.textContent='Reproduzindo: '+texto;
     voz.onerror=()=>{if(vozStatus)vozStatus.textContent='Não foi possível reproduzir esta frase. Ouça a versão gravada na Biblioteca.'};
     speechSynthesis.speak(voz);
   }catch{if(vozStatus)vozStatus.textContent='Áudio de voz indisponível neste navegador.'}
 });
});

// Quiz de inglês com progresso local.
const quiz=$('quizAula'), resposta=$('respostaQuiz'), progresso=$('progressoAula');
if(progresso && storage.get('blindbee-aula1-completa-v1')==='true')progresso.textContent='Parabéns! Você já concluiu a primeira atividade neste navegador.';
quiz?.addEventListener('submit',e=>{
 e.preventDefault();
 const marcada=quiz.querySelector('input[name="traducao"]:checked');
 if(!marcada){resposta.textContent='Escolha uma das respostas antes de conferir.';quiz.querySelector('input[name="traducao"]')?.focus();return}
 if(marcada.value==='bom-dia'){
   resposta.textContent='Resposta correta! Good morning significa Bom dia.';
   if(progresso)progresso.textContent='Atividade concluída! Progresso salvo neste navegador.';
   storage.set('blindbee-aula1-completa-v1','true');
 }else resposta.textContent='Ainda não. Tente novamente: good morning é uma saudação usada no início do dia.';
});

// Busca e filtro de notícias.
const busca=$('buscaNoticias'), filtro=$('filtroNoticias'), resultados=$('resultadoNoticias'), semNoticias=$('semNoticias');
if(busca&&filtro){
 const cards=[...document.querySelectorAll('[data-noticia]')];
 const normalizar=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const atualizar=()=>{
   let contagem=0;const termo=normalizar(busca.value.trim());
   cards.forEach(card=>{
     const visivel=(filtro.value==='todas'||card.dataset.categoria===filtro.value) && normalizar(card.textContent).includes(termo);
     card.hidden=!visivel;if(visivel)contagem++;
   });
   if(resultados) resultados.textContent=contagem+(contagem===1?' conteúdo encontrado.':' conteúdos encontrados.');
   if(semNoticias)semNoticias.hidden=contagem!==0;
 };
 busca.addEventListener('input',atualizar);filtro.addEventListener('change',atualizar);atualizar();
}

// FAQ com respostas fixas e sem chamadas externas.
const pergunta=$('perguntaBot'), botaoResposta=$('responderBot'), saida=$('respostaBot');
const respostas={
 gratis:'Sim. As atividades disponíveis nesta demonstração acadêmica são gratuitas e não exigem cadastro.',
 leitor:'Sim. É possível navegar com Tab, Shift + Tab, Enter e Espaço. Testes completos com leitores de tela ainda são necessários.',
 audio:'Acesse Aulas e ative o botão Ouvir da frase, ou vá à Biblioteca para escutar gravações com transcrição.',
 ong:'Não. Blindbee é um protótipo acadêmico e ainda não é uma ONG registrada.',
 dados:'Preferências e progresso ficam no navegador. Rascunhos de formulário só são salvos se você marcar a opção de salvamento.'
};
if(botaoResposta&&pergunta&&saida)botaoResposta.addEventListener('click',()=>{saida.textContent=respostas[pergunta.value]||'Escolha uma pergunta antes de continuar.'});

// Validação acessível e armazenamento opt-in de rascunhos.
document.querySelectorAll('form[data-form="sim"]').forEach(form=>{
 const chave=form.dataset.storage;
 const status=form.querySelector('[data-status]');
 const guardar=form.querySelector('#guardar');
 const concordo=form.querySelector('#concordo');
 const campos=[...form.querySelectorAll('input:not([type="checkbox"]),select,textarea')];
 const campoErro=campo=>form.querySelector('#erro-'+campo.id);
 const setErro=(campo,mensagem)=>{
   const erro=campoErro(campo);if(erro)erro.textContent=mensagem;
   campo.setAttribute('aria-invalid',String(Boolean(mensagem)));
 };
 const lerRascunho=()=>{
   try{
     const raw=storage.get(chave);if(!raw)return;
     const rascunho=JSON.parse(raw);
     if(!rascunho||typeof rascunho!=='object')return;
     campos.forEach(c=>{if(typeof rascunho[c.name]==='string')c.value=rascunho[c.name]});
     if(guardar)guardar.checked=true;
     if(status)status.textContent='Rascunho deste dispositivo recuperado. Você pode continuar editando.';
   }catch{}
 };
 lerRascunho();
 const salvar=()=>{
   if(!guardar?.checked) return;
   const r={};campos.forEach(c=>r[c.name]=c.value);
   if(!storage.set(chave,JSON.stringify(r))&&status)status.textContent='Não foi possível salvar o rascunho neste navegador.';
 };
 campos.forEach(c=>{
   c.addEventListener('input',()=>{setErro(c,'');salvar()});
   c.addEventListener('change',salvar);
 });
 guardar?.addEventListener('change',()=>{
    if(guardar.checked){salvar();if(status)status.textContent='O rascunho será salvo apenas neste dispositivo.'}
    else{storage.remove(chave);if(status)status.textContent='Salvamento desativado. Rascunho anterior removido.'}
 });
 concordo?.addEventListener('change',()=>{const erro=form.querySelector('#erro-concordo');if(erro)erro.textContent='';concordo.removeAttribute('aria-invalid')});
 form.querySelector('[data-limpar-rascunho]')?.addEventListener('click',()=>{
   storage.remove(chave);form.reset();
   campos.forEach(c=>setErro(c,''));
   const erroConcordo=form.querySelector('#erro-concordo');if(erroConcordo)erroConcordo.textContent='';
   concordo?.removeAttribute('aria-invalid');
   if(status)status.textContent='Rascunho apagado deste navegador.';
 });
 form.addEventListener('submit',e=>{
   e.preventDefault();let primeiro=null;
   campos.forEach(c=>{
     let erro='';
     if(!c.value.trim())erro='Este campo é obrigatório.';
     else if(c.type==='email'&&!c.validity.valid)erro='Digite um e-mail válido.';
     else if(c.hasAttribute('minlength')&&c.value.trim().length<Number(c.getAttribute('minlength')))erro='Escreva pelo menos '+c.getAttribute('minlength')+' caracteres.';
     setErro(c,erro);
     if(erro&&!primeiro)primeiro=c;
   });
   const erroConcordo=form.querySelector('#erro-concordo');
   if(!concordo.checked){if(erroConcordo)erroConcordo.textContent='Confirme que entendeu que o formulário é apenas uma simulação.';concordo.setAttribute('aria-invalid','true');if(!primeiro)primeiro=concordo;}
   else{if(erroConcordo)erroConcordo.textContent='';concordo.removeAttribute('aria-invalid')}
   if(primeiro){if(status)status.textContent='Há campos que precisam ser corrigidos.';primeiro.focus();return}
   salvar();
   if(status)status.textContent='Dados validados com sucesso! Esta é uma simulação: nenhuma mensagem foi enviada.';
 });
});
})();
