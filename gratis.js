
// ---------- helpers de cookie ----------
function setCookie(name, value, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + (minutes*60*1000));
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// ---------- configuração ----------
const COOLDOWN_MS = 30 * 60 * 1000; // 2 minutos
let cliques = parseInt(getCookie('cliques') || '0', 10) || 0;
let ultimoFechamento = parseInt(getCookie('ultimoFechamento') || '0', 10) || 0;

// ---------- cria overlay ----------
const overlay = document.createElement("div");
overlay.id = "overlayBloqueio";
overlay.innerHTML = `
  <div id="bloqueioBox">
    <button id="botao">ASSISTIR EM MODO GRÁTIS</button>
    <div id="status">Clique 3 vezes para desbloquear</div>
  </div>
`;
document.body.appendChild(overlay);

// ---------- estilos ----------
const estilo = document.createElement("style");
estilo.textContent = `
  #overlayBloqueio{
    position:fixed;
    top:0; left:0;
    width:100%; height:100%;
    background:rgba(0,0,0,0.95);
    z-index:999999;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
  }
  #bloqueioBox{
    text-align:center;
    color:#fff;
  }
  #botao{
    padding:18px 36px;
    font-size:1.2rem;
    border-radius:10px;
    border:0;
    cursor:pointer;
    background:linear-gradient(90deg,#ff5722,#ff9800);
    color:#fff;
    font-weight:700;
    box-shadow:0 8px 24px rgba(255,152,0,0.12);
  }
  #status{
    margin-top:16px;
    font-size:1rem;
    min-height:1.2em;
  }
`;
document.head.appendChild(estilo);

const botao = overlay.querySelector("#botao");
const status = overlay.querySelector("#status");

// ---------- lógica ----------
function estaEmCooldown() {
  if (!ultimoFechamento) return false;
  return (Date.now() - ultimoFechamento) < COOLDOWN_MS;
}

function atualizarStatusTexto() {
  if (cliques === 0) status.innerText = "Clique 3 vezes para desbloquear";
  else if (cliques === 1) status.innerText = "Faltam 2 cliques";
  else if (cliques === 2) status.innerText = "Falta 1 clique";
}

function liberarPagina() {
  overlay.style.display = "none"; // remove o bloqueio
}

function processarClique() {
  if (estaEmCooldown()) return;

  cliques = (parseInt(getCookie('cliques') || '0', 10) || cliques) + 1;
  setCookie('cliques', cliques, 60); // guarda por 60 min

  if (cliques === 1) {
    link1();
    atualizarStatusTexto();
  } else if (cliques === 2) {
    link2();
    atualizarStatusTexto();
  } else if (cliques === 3) {
    const agora = Date.now();
    setCookie('ultimoFechamento', String(agora), 60);
    ultimoFechamento = agora;

    setCookie('cliques', '0', 60);
    cliques = 0;

    link3();
    liberarPagina(); // libera a página depois do 3º clique
  }
}

botao.addEventListener("click", processarClique);

// ---------- links ----------
function link1() {
  setTimeout(function() {
    window.open(window.location.href, '_blank');
    window.location = 'https://otieu.com/4/7346534';
  }, 100);
}
function link2() {
  setTimeout(function() {
    window.open(window.location.href, '_blank');
    window.location = 'https://echonverforrinho.info?tid=1075418';
  }, 100);
}
function link3() {
  setTimeout(function() {
    window.open(window.location.href, '_blank');
    window.location = 'https://vida6579.blogspot.com/2024/08/em-um-reino-antigo-e-encantado-onde-as.html?m=1';
  }, 100);
}

// ---------- inicialização ----------
if (estaEmCooldown()) {
  overlay.style.display = "none"; // se já passou, não bloqueia
} else {
  atualizarStatusTexto();
}
setInterval(() => {
  cliques = parseInt(getCookie('cliques') || '0', 10) || 0;
  ultimoFechamento = parseInt(getCookie('ultimoFechamento') || '0', 10) || 0;
  if (!estaEmCooldown() && overlay.style.display !== "none") {
    atualizarStatusTexto();
  }
}, 1000);
